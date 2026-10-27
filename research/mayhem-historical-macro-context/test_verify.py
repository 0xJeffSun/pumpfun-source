"""Regressions for historical-source scope, compiler bindings and byte claims."""
from pathlib import Path
import importlib.util
import json
import os
import shutil
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch

sys.dont_write_bytecode = True
P = Path(__file__).resolve().parent
s = importlib.util.spec_from_file_location('whole_parser_verifier',P/'verify.py')
v = importlib.util.module_from_spec(s); s.loader.exec_module(v)


class EvidenceTests(unittest.TestCase):
    def test_retained_evidence(self):
        self.assertEqual(v.verify(),v.read(P/'report.json'))

    def test_gate_rejects_modified_template(self):
        b = v.raw(P/('historical/'+v.UTILS+'.gz')).replace(b'try_from_slice',b'try_from_bytes')
        with self.assertRaisesRegex(ValueError,'gated blob'):
            v.gate(b)

    def test_gate_rejects_already_gated_source(self):
        b = v.raw(P/('historical/'+v.UTILS+'.gz'))
        with self.assertRaisesRegex(ValueError,'gate boundary'):
            v.gate(v.gate(b))

    def source_case(self):
        parent = {r['path']:{k:r[k] for k in ('bytes','sha256')} for r in v.read(P/'reference/source-inputs.json')['source_files']}
        current = v.read(P/'direct/old-historical-create/launch.json.gz')['source_inputs']
        changed = {n:v.raw(P/('direct/old-historical-create/source/'+n+'.gz')) for n in (v.IDL,v.INTERFACE)}
        return parent,current,changed

    def test_unrelated_source_change_rejected(self):
        a,b,c = self.source_case(); b['Cargo.toml']['bytes'] += 1
        with self.assertRaisesRegex(ValueError,'source scope'):
            v.source_scope(a,b,c)

    def test_event_definition_change_rejected(self):
        a,b,c = self.source_case(); c[v.IDL] += b'\n'
        with self.assertRaisesRegex(ValueError,'changed source binding'):
            v.source_scope(a,b,c)

    def test_missing_source_rejected(self):
        a,b,c = self.source_case(); b.pop('Cargo.toml')
        with self.assertRaisesRegex(ValueError,'source cohort'):
            v.source_scope(a,b,c)

    def root(self):
        return v.read(P/'roots/root-enabled-01-search-paths/launch.json.gz')

    def test_root_codegen_override_rejected(self):
        launch = self.root(); launch['command'].append('-Copt-level=0')
        with self.assertRaisesRegex(ValueError,'root compiler arguments'):
            v.root_arguments(launch,launch['curve_archive']['path'],True,'host-build-03')

    def test_missing_root_search_path_rejected(self):
        launch = self.root(); launch['command'] = launch['command'][:-2]
        with self.assertRaisesRegex(ValueError,'root compiler arguments'):
            v.root_arguments(launch,launch['curve_archive']['path'],True,'host-build-03')

    def test_gated_macro_search_directory_rejected_for_positive(self):
        launch = self.root()
        with self.assertRaisesRegex(ValueError,'root compiler arguments'):
            v.root_arguments(launch,launch['curve_archive']['path'],True,'host-build-04-gated')

    def outputs(self):
        return [v.raw(P/'roots/root-enabled-01-search-paths/symbols.so.gz'),v.raw(P/'roots/root-enabled-01-search-paths/stripped.so.gz'),
                v.raw(P/'reference/zeroed.so.gz'),v.raw(P/'reference/zeroed-strip.so.gz'),True]

    def test_stripped_cannot_replace_raw(self):
        args = self.outputs(); args[0] = args[1]
        with self.assertRaisesRegex(ValueError,'raw output'):
            v.check_output(*args)

    def test_gated_strip_cannot_replace_positive(self):
        args = self.outputs(); args[1] = v.raw(P/'reference/parent-strip.so.gz')
        with self.assertRaisesRegex(ValueError,'stripped output'):
            v.check_output(*args)

    def test_missing_host_compiler_record_rejected(self):
        reader = v.read
        def changed(path):
            data = reader(path)
            return data[:-1] if path==P/'host/host-build-03/compiler-commands.json.gz' else data
        with patch.object(v,'read',side_effect=changed), self.assertRaisesRegex(ValueError,'host compiler trace'):
            v.verify(False)

    def test_changed_host_macro_dll_binding_rejected(self):
        reader = v.read
        def changed(path):
            data = reader(path)
            if path==P/'host/host-build-03/result.json.gz':
                data['outputs']['target/release/anchor_attribute_program.dll']['sha256']='0'*64
            return data
        with patch.object(v,'read',side_effect=changed), self.assertRaisesRegex(ValueError,'host macro output'):
            v.verify(False)

    def test_manifest_covers_nested_manifest_and_cache(self):
        for name in ('nested/manifest.json','__pycache__/extra.pyc'):
            with self.subTest(name=name), tempfile.TemporaryDirectory() as td:
                root = Path(td); (root/'manifest.json').write_text('{"files":{}}',encoding='utf8')
                p = root/name; p.parent.mkdir(); p.write_bytes(b'{}')
                with self.assertRaisesRegex(ValueError,'packet manifest'):
                    v.h.manifest_check(root)

    def test_symlink_rejected(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td); (root/'manifest.json').write_text('{"files":{}}',encoding='utf8')
            try: (root/'alias').symlink_to(root/'manifest.json')
            except OSError as exc: self.skipTest(str(exc))
            with self.assertRaisesRegex(ValueError,'symlink'):
                v.h.manifest_check(root)

    @unittest.skipUnless(hasattr(os,'mkfifo'),'POSIX-only FIFO creation')
    def test_special_file_rejected(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td); (root/'manifest.json').write_text('{"files":{}}',encoding='utf8'); os.mkfifo(root/'fifo')
            with self.assertRaisesRegex(ValueError,'special file'):
                v.h.manifest_check(root)

    def test_relocated_offline_replay(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)/'packet with spaces'; shutil.copytree(P,root)
            result = subprocess.run([sys.executable,'-I','-B',str(root/'verify.py')],cwd=td,capture_output=True)
            self.assertEqual(result.returncode,0,result.stderr.decode(errors='replace'))
            self.assertEqual(json.loads(result.stdout),v.read(P/'report.json'))


if __name__=='__main__': unittest.main()
