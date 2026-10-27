"""Scope regressions for historical parser/source and retained compiler evidence."""
from pathlib import Path
import importlib.util
import json
import os
import shutil
import subprocess
import sys
import tempfile
import unittest

sys.dont_write_bytecode = True
P = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('parser_verifier', P/'verify.py')
v = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)


class EvidenceTests(unittest.TestCase):
    def test_retained_evidence(self):
        self.assertEqual(v.verify(), v.read(P/'report.json'))

    def history(self):
        return [v.raw(P/'provenance/anchor-utils-before-gate.rs'), v.read(P/'provenance/anchor-gate-change.json'),
                v.raw(P/'provenance/public-pump.json'), v.read(P/'provenance/public-idl-origin.json')]

    def test_unverified_historical_source_rejected(self):
        args = self.history(); args[0] = args[0].replace(b'try_from_slice', b'try_from_bytes')
        with self.assertRaisesRegex(ValueError, 'historical gate blob'):
            v.history_check(*args)

    def test_extra_idl_newline_rejected(self):
        args = self.history(); args[2] += b'\n'
        with self.assertRaisesRegex(ValueError, 'public IDL blob'):
            v.history_check(*args)

    def test_wrong_history_revision_rejected(self):
        args = self.history(); args[1]['revision'] = args[1]['parent']
        with self.assertRaisesRegex(ValueError, 'history revisions'):
            v.history_check(*args)

    def test_gate_is_the_only_parser_control_difference(self):
        source = self.history()[0].decode()
        enabled = v.render(source, ['CreateEvent'], False)
        gated = v.render(source, ['CreateEvent'], True)
        self.assertEqual(gated, enabled.replace(b'\npub mod ', b'\n'+v.GATE.encode()+b'pub mod ',1))
        self.assertNotIn(b'cfg(', enabled)

    def test_invalid_or_duplicate_event_names_rejected(self):
        for names in (['CreateEvent','CreateEvent'], ['x; panic!()'], []):
            with self.subTest(names=names), self.assertRaisesRegex(ValueError,'event names'):
                v.render(self.history()[0].decode(), names, False)

    def test_source_change_outside_curve_rejected(self):
        parent = {r['path']:{k:r[k] for k in ('bytes','sha256')} for r in v.read(P/'reference/source-inputs.json')['source_files']}
        after = v.read(P/'direct/parser-create/source-after.json'); after['Cargo.toml']['bytes'] += 1
        with self.assertRaisesRegex(ValueError,'source scope'):
            v.source_check(parent, after, {})

    def test_missing_source_rejected(self):
        parent = {r['path']:{k:r[k] for k in ('bytes','sha256')} for r in v.read(P/'reference/source-inputs.json')['source_files']}
        after = dict(parent); after.pop('Cargo.toml')
        with self.assertRaisesRegex(ValueError,'source cohort'):
            v.source_check(parent, after, {})

    def outputs(self):
        return [v.raw(P/'builds/full-parser-01/symbols.so.gz'), v.raw(P/'builds/full-parser-01/candidate-v154-strip.so.gz'),
                v.raw(P/'reference/zeroed.so.gz'), v.raw(P/'reference/zeroed-strip.so.gz'), True]

    def test_stripped_output_cannot_replace_raw(self):
        args = self.outputs(); args[0] = args[1]
        with self.assertRaisesRegex(ValueError,'raw ELF'):
            v.output_check(*args)

    def test_parent_stripped_output_cannot_replace_positive(self):
        args = self.outputs(); args[1] = v.raw(P/'reference/parent-strip.so.gz')
        with self.assertRaisesRegex(ValueError,'stripped comparison'):
            v.output_check(*args)

    def trace(self):
        records = v.read(P/'builds/full-parser-01/records.json.gz')
        mappings = {(a,n):b for a,b,n in (line.split('\t') for line in v.raw(P/'controller-enabled/metadata-map.tsv').decode().splitlines())}
        paths = [tuple(line.split('\t')) for line in v.raw(P/'controller-enabled/path-map.tsv').decode().splitlines()]
        return records, mappings, paths

    def test_missing_crate_compilation_rejected(self):
        records, mappings, paths = self.trace()
        records.pop(next(i for i,r in enumerate(records) if v.q.v.is_compile(r['before'])))
        with self.assertRaisesRegex(ValueError,'incomplete compiler trace'):
            v.q.v.check_records(records, 'published-with-paths-relative', mappings, paths)

    def test_compiler_optimization_mutation_rejected(self):
        records, mappings, paths = self.trace(); records[0]['after'].append('-Copt-level=0')
        with self.assertRaisesRegex(ValueError,'forwarded argument'):
            v.q.v.check_records(records, 'published-with-paths-relative', mappings, paths)

    def test_wrong_map_extent_rejected(self):
        with self.assertRaisesRegex(ValueError,'text map extent'):
            v.q.map_sections(v.raw(P/'builds/full-parser-01/link/link.map.gz'), 664384)

    def test_manifest_covers_nested_manifest_and_cache(self):
        for name in ('nested/manifest.json','__pycache__/unlisted.pyc'):
            with self.subTest(name=name), tempfile.TemporaryDirectory() as td:
                root = Path(td); (root/'manifest.json').write_text('{"files":{}}', encoding='utf8')
                p = root/name; p.parent.mkdir(); p.write_bytes(b'{}')
                with self.assertRaisesRegex(ValueError,'packet manifest'):
                    v.manifest_check(root)

    def test_symlink_rejected(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td); (root/'manifest.json').write_text('{"files":{}}', encoding='utf8')
            try:
                (root/'alias').symlink_to(root/'manifest.json')
            except OSError as exc:
                self.skipTest(str(exc))
            with self.assertRaisesRegex(ValueError,'symlink'):
                v.manifest_check(root)

    @unittest.skipUnless(hasattr(os,'mkfifo'), 'FIFO creation is POSIX-only')
    def test_special_file_rejected(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td); (root/'manifest.json').write_text('{"files":{}}', encoding='utf8'); os.mkfifo(root/'fifo')
            with self.assertRaisesRegex(ValueError,'special file'):
                v.manifest_check(root)

    def test_relocated_self_contained_replay(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)/'packet with spaces'; shutil.copytree(P,root)
            result = subprocess.run([sys.executable,'-I','-B',str(root/'verify.py')], cwd=td, capture_output=True)
            self.assertEqual(result.returncode,0,result.stderr.decode(errors='replace'))
            self.assertEqual(json.loads(result.stdout),v.read(P/'report.json'))


if __name__ == '__main__':
    unittest.main()
