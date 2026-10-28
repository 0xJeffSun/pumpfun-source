#!/usr/bin/env python3
"""Counterexamples for the static proof boundaries and saved build provenance."""
from pathlib import Path
import gzip, importlib.util, io, json, shutil, socket, struct, subprocess, tarfile, tempfile, unittest
from unittest.mock import patch

P = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('native436_verify', P / 'verify.py')
v = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)


def save(p, value):
    b = (json.dumps(value, indent=2) + '\n').encode()
    p.write_bytes(gzip.compress(b, mtime=0) if p.suffix == '.gz' else b)


def archive(files):
    out = io.BytesIO()
    with tarfile.open(fileobj=out, mode='w') as tf:
        for n, b in files.items():
            m = tarfile.TarInfo(n)
            m.size = len(b)
            tf.addfile(m, io.BytesIO(b))
    return gzip.compress(out.getvalue(), mtime=0)


class EvidenceTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.c = v.module('test436_closure', P / 'reference/closure.py')
        cls.reader = v.module('test436_reader', P / 'reference/reader.py')

    def packet(self):
        temp = tempfile.TemporaryDirectory()
        self.addCleanup(temp.cleanup)
        target = Path(temp.name) / 'independent-packet'
        shutil.copytree(P, target)
        return target

    def elf(self, data):
        temp = tempfile.TemporaryDirectory()
        self.addCleanup(temp.cleanup)
        p = Path(temp.name) / 'image.so'
        p.write_bytes(data)
        return self.reader.Elf(p)

    def test_saved_packet(self):
        r = v.verify()
        self.assertEqual(sum(x['compilation_commands'] for x in r['compilation_commands'].values()), 978)

    def test_relocated_replay_without_network_or_subprocess(self):
        p = self.packet()
        with patch.object(socket, 'socket', side_effect=AssertionError('network forbidden')), \
                patch.object(subprocess, 'Popen', side_effect=AssertionError('execution forbidden')):
            self.assertEqual(v.verify(p)['target_executions'], 0)

    def test_source_edit_rejected_without_relying_on_manifest(self):
        p = self.packet()
        target = p / 'controller/sources/Cargo.toml.gz'
        target.write_bytes(gzip.compress(v.raw(target) + b'\n', mtime=0))
        with self.assertRaisesRegex(ValueError, 'source bytes'):
            v.source_inputs(p)

    def test_unexpected_file_rejected(self):
        p = self.packet()
        (p / 'unexpected').write_bytes(b'new')
        with self.assertRaisesRegex(ValueError, 'manifest'):
            v.verify_manifest(p)

    def test_output_edit_rejected_by_build_receipt(self):
        p = self.packet()
        target = p / 'builds/build-05-v2path/symbols.so.gz'
        b = bytearray(v.raw(target)); b[-1] ^= 1
        target.write_bytes(gzip.compress(bytes(b), mtime=0))
        with self.assertRaisesRegex(ValueError, 'output binding'):
            v.provenance(p, v.source_inputs(p))

    def test_wrong_seed_rejected_even_with_complete_command_count(self):
        p = self.packet()
        target = p / 'builds/build-05-v2path/wrapper-records.tar.gz'
        files = v.unpack(target)
        for name, data in files.items():
            row = json.loads(data)
            if '--crate-name' in row['after'] and row['after'][row['after'].index('--crate-name') + 1] == 'curve_accounts':
                i = next(i for i, a in enumerate(row['after']) if a.startswith('metadata='))
                row['after'][i] = 'metadata=0000000000000000'
                files[name] = json.dumps(row).encode()
                break
        else:
            self.fail('curve command absent')
        target.write_bytes(archive(files))
        with self.assertRaisesRegex(ValueError, 'metadata mapping'):
            v.provenance(p, v.source_inputs(p))

    def test_missing_root_compilation_rejected(self):
        p = self.packet()
        target = p / 'builds/build-01/wrapper-records.tar.gz'
        files = v.unpack(target)
        victim = next(n for n, b in files.items() if 'mayhem_recovered' in json.loads(b)['after'])
        del files[victim]
        target.write_bytes(archive(files))
        with self.assertRaisesRegex(ValueError, 'compile cohort'):
            v.provenance(p, v.source_inputs(p))

    def test_changed_section_selector_rejected(self):
        p = self.packet()
        target = p / 'controller/ordered-native.ld'
        b = target.read_bytes()
        target.write_bytes(b.replace(b'(".text', b'(".wrong', 1))
        with self.assertRaisesRegex(ValueError, 'section selectors'):
            v.selector_evidence(p)

    def test_missing_observed_member_rejected(self):
        p = self.packet()
        target = p / 'provenance/final-link-bindings.json'
        row = v.read(target)
        witness = next(w for w in row['witnesses'] if 'archive' in w)
        row['archive_tables'][witness['archive']]['members'].remove(witness['member'])
        save(target, row)
        with self.assertRaisesRegex(ValueError, 'archive member'):
            v.selector_evidence(p)

    def test_traversal_archive_rejected(self):
        temp = tempfile.TemporaryDirectory(); self.addCleanup(temp.cleanup)
        target = Path(temp.name) / 'unsafe.tar.gz'
        target.write_bytes(archive({'../escape': b'x'}))
        with self.assertRaisesRegex(ValueError, 'archive member'):
            v.unpack(target)

    def test_real_equal_shape_does_not_imply_equal_raw_function(self):
        upstream = self.elf(v.raw(P / 'upstream/builds/first/symbols.so.gz'))
        native = self.elf(v.raw(P / 'builds/build-05-v2path/symbols.so.gz'))
        uw, _ = self.c.tables(upstream); nw, _ = self.c.tables(native)
        self.assertEqual(self.c.key(uw[543192]), self.c.key(nw[687744]))
        self.assertNotEqual(uw[543192]['raw_sha256'], nw[687744]['raw_sha256'])
        a = next(x for x in uw[543192]['direct'] if x['offset'] == 312)
        b = next(x for x in nw[687744]['direct'] if x['offset'] == 312)
        self.assertEqual((a['target'], b['target']), (542880, 687432))

    def test_source_string_change_does_not_change_code_shape(self):
        data = v.raw(P / 'builds/build-05-v2path/symbols.so.gz')
        old = b'src/bpf_writer.rs\0'; new = b'src/xxx_writer.rs\0'
        self.assertEqual(data.count(old), 1)
        before, after = self.elf(data), self.elf(data.replace(old, new))
        bw, _ = self.c.tables(before); aw, _ = self.c.tables(after)
        changed = [a for a in bw if self.c.profile(before, bw[a]) != self.c.profile(after, aw[a])]
        self.assertTrue(changed)
        self.assertTrue(all(self.c.key(bw[a]) == self.c.key(aw[a]) and bw[a]['raw_sha256'] == aw[a]['raw_sha256'] for a in bw))

    def test_retargeted_call_keeps_shape_but_breaks_direct_closure(self):
        upstream = self.elf(v.raw(P / 'upstream/builds/first/symbols.so.gz'))
        data = v.raw(P / 'builds/build-05-v2path/symbols.so.gz')
        native = self.elf(data)
        mutated = bytearray(data)
        call = 687744 + 312
        struct.pack_into('<i', mutated, call + 4, (288 - call - 8) // 8)
        changed = self.elf(bytes(mutated))
        uw, _ = self.c.tables(upstream); nw, _ = self.c.tables(native); cw, _ = self.c.tables(changed)
        self.assertEqual(self.c.key(nw[687744]), self.c.key(cw[687744]))
        _, _, before, _ = self.c.relation(uw, nw)
        _, _, after, _ = self.c.relation(uw, cw)
        self.assertIn((543192, 687744), before)
        self.assertNotIn((543192, 687744), after)


if __name__ == '__main__':
    unittest.main()
