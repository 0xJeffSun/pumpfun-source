"""Reject incorrect Source recovery, data bounds and changes to executable bytes."""
import importlib.util
import io
from pathlib import Path
import struct
import tarfile
import tempfile
import unittest

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('origins_verify', HERE / 'verify.py')
v = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)


class OriginEvidenceTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.original = self.elf('original', v.raw(HERE / 'reference/original.so.gz'))
        self.baseline = self.elf('baseline', v.raw(HERE / 'builds/baseline/symbols.so.gz'))
        self.fixed = self.elf('fixed', v.raw(HERE / 'builds/origin-only/symbols.so.gz'))

    def elf(self, name, data):
        path = self.root / (name + '.so')
        path.write_bytes(data)
        return v.layer.Elf(path)

    def changed(self, at, data):
        b = bytearray(self.fixed.b)
        b[at:at + len(data)] = data
        return self.elf('mutated', bytes(b))

    def test_exact_three_bytes(self):
        report = v.exact_change(self.baseline, self.fixed)
        self.assertEqual(report['raw_byte_positions'], [684176, 684180, 684236])
        self.assertTrue(report['raw_text_equal'])

    def test_unchanged_parent_is_not_correction(self):
        with self.assertRaisesRegex(ValueError, 'three Source fields'):
            v.exact_change(self.baseline, self.baseline)

    def test_extra_data_edit_rejected(self):
        at = self.fixed.sec['.rodata']['offset']
        mutated = self.changed(at, bytes([self.fixed.b[at] ^ 1]))
        with self.assertRaisesRegex(ValueError, 'three Source fields'):
            v.exact_change(self.baseline, mutated)

    def test_code_edit_rejected(self):
        at = v.initializer(self.fixed)['start'] + 4
        mutated = self.changed(at, bytes([self.fixed.b[at] ^ 1]))
        with self.assertRaisesRegex(ValueError, 'executable bytes'):
            v.exact_change(self.baseline, mutated)

    def test_wrong_corrected_field_rejected(self):
        mutated = self.changed(684180, b'!')
        with self.assertRaisesRegex(ValueError, 'field values'):
            v.exact_change(self.baseline, mutated)

    def test_four_typed_observations(self):
        report = v.typed_initializer(self.original, self.fixed)
        self.assertEqual(len(report['data']), 4)
        self.assertEqual(len(report['direct_callees']), 5)
        self.assertFalse(report['normalized_body_equal'])

    def test_parent_panic_origins_rejected(self):
        with self.assertRaisesRegex(ValueError, 'Source differs'):
            v.typed_initializer(self.original, self.baseline)

    def test_missing_source_relocation_rejected(self):
        target = v.initializer(self.fixed)['data_references'][0]['target']
        self.fixed.rel.pop(target)
        with self.assertRaisesRegex(ValueError, 'missing data relocation'):
            v.typed_initializer(self.original, self.fixed)

    def test_source_filename_length_rejected(self):
        target = v.initializer(self.fixed)['data_references'][0]['target']
        mutated = self.changed(target + 8, struct.pack('<Q', 36))
        with self.assertRaisesRegex(ValueError, 'filename extent'):
            v.typed_initializer(self.original, mutated)

    def test_unwrap_literal_rejected(self):
        target = v.initializer(self.fixed)['data_references'][1]['target']
        with self.assertRaisesRegex(ValueError, 'unwrap literal'):
            v.typed_initializer(self.original, self.changed(target, b'C'))

    def test_formatter_target_rejected(self):
        target = v.initializer(self.fixed)['data_references'][2]['target'] + 24
        address = v.pointer(self.fixed, target)
        with self.assertRaisesRegex(ValueError, 'formatter body'):
            v.typed_initializer(self.original, self.changed(target + 4, struct.pack('<I', address + 8)))

    def test_direct_callee_rejected(self):
        call = v.initializer(self.fixed)['direct'][0]
        imm = struct.unpack_from('<i', self.fixed.b, call['pc'] + 4)[0]
        with self.assertRaisesRegex(ValueError, 'direct callee'):
            v.typed_initializer(self.original, self.changed(call['pc'] + 4, struct.pack('<i', imm + 1)))

    def test_exact_source_reconstruction(self):
        parent = v.archive_sources((HERE / 'parent/source.tar.gz').read_bytes())
        after = v.corrected_source(parent['src/state.rs'])
        self.assertEqual(after, v.raw(HERE / 'sources/src/state.rs.gz'))
        self.assertEqual(b''.join(after.split()), b''.join(parent['src/state.rs'].split()))

    def test_unrelated_parent_source_rejected(self):
        parent = v.archive_sources((HERE / 'parent/source.tar.gz').read_bytes())['src/state.rs']
        with self.assertRaisesRegex(ValueError, 'parent initializer'):
            v.corrected_source(parent.replace(b'now+duration_hours*3600', b'now+duration_hours*3601'))

    def test_source_archive_escape_rejected(self):
        buf = io.BytesIO()
        with tarfile.open(fileobj=buf, mode='w:gz') as archive:
            member = tarfile.TarInfo('../escape.rs')
            member.size = 1
            archive.addfile(member, io.BytesIO(b'x'))
        with self.assertRaisesRegex(ValueError, 'unsafe source archive'):
            v.archive_sources(buf.getvalue())

    def latest_elves(self):
        before = self.elf('latest-parent', v.raw(HERE / 'latest/builds/baseline/symbols.so.gz'))
        after = self.elf('latest-fixed', v.raw(HERE / 'latest/builds/corrected/symbols.so.gz'))
        return before, after

    def test_latest_exact_three_bytes(self):
        before, after = self.latest_elves()
        report = v.exact_change(before, after, (684096, 684100, 684156))
        self.assertEqual(report['raw_byte_positions'], [684096, 684100, 684156])
        self.assertTrue(report['raw_text_equal'])

    def test_five_prior_trade_sources_preserved(self):
        _, after = self.latest_elves()
        latest = v.module('latest_test', HERE / 'latest_verify.py')
        self.assertEqual(len(latest.preserve_trade_sources(v, self.original, after)), 5)

    def test_wrong_prior_trade_source_rejected(self):
        _, after = self.latest_elves()
        evidence = v.read(HERE / 'latest/parent/data.json')
        at = evidence['retained']['handlers'][0]['matching_source_records'][0]['target'] + 16
        data = bytearray(after.b)
        data[at] ^= 1
        latest = v.module('latest_negative', HERE / 'latest_verify.py')
        with self.assertRaisesRegex(ValueError, 'trade Source changed'):
            latest.preserve_trade_sources(v, self.original, self.elf('wrong-trade-source', bytes(data)))

    def test_accounting_baseline_cannot_replace_latest(self):
        _, after = self.latest_elves()
        with self.assertRaises(ValueError):
            v.exact_change(self.baseline, after, (684096, 684100, 684156))

    def test_latest_source_preserves_retained_helper(self):
        parent = v.archive_sources((HERE / 'latest/parent/source.tar.gz').read_bytes())
        after = v.corrected_source(parent['src/state.rs'])
        self.assertEqual(after, v.raw(HERE / 'latest/sources/src/state.rs.gz'))
        self.assertIn(b'pub(crate) fn retained_basis_points', after)
        self.assertEqual(b''.join(after.split()), b''.join(parent['src/state.rs'].split()))

    def test_unlisted_nested_manifest_rejected(self):
        packet = self.root / 'packet'
        (packet / 'nested').mkdir(parents=True)
        (packet / 'manifest.json').write_text('{}', encoding='utf8')
        v.check_manifest(packet)
        (packet / 'nested/manifest.json').write_text('{}', encoding='utf8')
        with self.assertRaisesRegex(ValueError, 'packet membership/content differs'):
            v.check_manifest(packet)


if __name__ == '__main__':
    unittest.main()
