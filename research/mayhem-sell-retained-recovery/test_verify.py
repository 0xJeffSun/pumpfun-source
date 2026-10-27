"""Exercise the matcher boundary independently of the sealed file manifest."""
import gzip
import json
import os
from pathlib import Path
import struct
import subprocess
import sys
import tempfile
import unittest
import verify as v


class MatcherBoundary(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.w = v.module('quote_mutation_windows', v.P / 'window_map.py')
        cls.image = gzip.decompress((v.P / 'captures/sell-retained-initializer-union/symbols.so.gz').read_bytes())
        cls.catalog = cls.w.windows(cls.image)
        cls.body = next(x for x in cls.catalog if x['name'] and 'state10sell_quote' in x['name'])
        cls.instructions = cls.w.m.instructions(cls.image, cls.body['address'], cls.body['bytes'])
        cls.section = next(s for s in cls.w.m.elf_layout(cls.image)['sections']
                           if s['name'] == '.text')

    def mutate(self, row, relative, raw):
        image = bytearray(self.image)
        offset = self.section['offset'] + self.body['address'] - self.section['address'] + row['offset'] + relative
        image[offset:offset + len(raw)] = raw
        return bytes(image)

    def counterpart(self, image):
        return next(x for x in self.w.windows(image) if x['address'] == self.body['address'])

    def test_scalar_is_retained(self):
        row = next(x for x in self.instructions if x['opcode'] == 0xb7)
        self.assertNotEqual(self.body['signature'], self.counterpart(
            self.mutate(row, 4, struct.pack('<i', row['immediate'] + 1)))['signature'])

    def test_register_is_retained(self):
        row = next(x for x in self.instructions if x['opcode'] == 0xbf)
        raw = bytes.fromhex(row['raw'])
        self.assertNotEqual(self.body['signature'], self.counterpart(
            self.mutate(row, 1, bytes([raw[1] ^ 1])))['signature'])

    def test_stack_offset_is_retained(self):
        row = next(x for x in self.instructions if x['opcode'] == 0x7b and x['destination'] == 10)
        self.assertNotEqual(self.body['signature'], self.counterpart(
            self.mutate(row, 2, struct.pack('<h', row['displacement'] - 8)))['signature'])

    def test_branch_offset_is_retained(self):
        row = next(x for x in self.instructions if x['opcode'] == 0x35)
        self.assertNotEqual(self.body['signature'], self.counterpart(
            self.mutate(row, 2, struct.pack('<h', row['displacement'] - 1)))['signature'])

    def test_actual_local_call_is_checked_separately(self):
        row = next(x for x in self.instructions if 'call_target' in x)
        target = next(x for x in self.catalog if x['address'] == row['call_target'])
        other = next(x for x in self.catalog if x['signature'] != target['signature'])
        immediate = (other['address'] - self.body['address'] - row['offset'] - 8) // 8
        image = self.mutate(row, 4, struct.pack('<i', immediate))
        body = self.counterpart(image)
        self.assertEqual(self.body['signature'], body['signature'])
        before = v.calls(self.w, self.image, self.body, self.catalog)
        after = v.calls(self.w, image, body, self.w.windows(image))
        self.assertNotEqual(list(map(v.identity, before)), list(map(v.identity, after)))

    def test_declared_relocated_pointer_is_opaque(self):
        offset = next(x[0] for x in self.body['annotations'] if x[1] == 'opaque_relocated_pointer')
        row = next(x for x in self.instructions if x['offset'] == offset)
        image = self.mutate(row, 4, struct.pack('<I', (row['lddw_value'] & 0xffffffff) + 8))
        # Intentional positive boundary: no unexamined pointed-to data closure is claimed.
        self.assertEqual(self.body['signature'], self.counterpart(image)['signature'])

    def test_import_name_is_bound(self):
        image = bytearray(self.image)
        strings = next(s for s in self.w.m.elf_layout(image)['sections'] if s['name'] == '.dynstr')
        offset = image.index(b'abort\0', strings['offset'], strings['offset'] + strings['size'])
        image[offset] = ord('z')
        old = {x['address']: x['signature'] for x in self.catalog if any(
            a[1:] == ['import', 'abort'] for a in x['annotations'])}
        self.assertTrue(old)
        new = {x['address']: x['signature'] for x in self.w.windows(bytes(image))}
        self.assertTrue(all(old[a] != new[a] for a in old))

    def test_actual_source_descriptor_corruption(self):
        import tempfile
        from pathlib import Path
        typed = v.module('sell_corruption_reader', v.P / 'typed_data_reader.py')
        elfmod = v.module('sell_corruption_elf', v.ROOT / 'repro/mayhem/global-params-layout-recovery/tools/layer01.py')
        source = v.P / 'captures/sell-retained-initializer-union/symbols.so.gz'
        image = gzip.decompress(source.read_bytes())
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'symbols.so'
            path.write_bytes(image)
            elf = elfmod.Elf(path)
            refs = elf.window(self.body['address'], self.body['address'] + self.body['bytes'])['data_references']
            target = refs[2]['target']
            mutant = bytearray(image)
            line = struct.unpack_from('<I', mutant, target + 16)[0]
            struct.pack_into('<I', mutant, target + 16, line + 1)
            path.write_bytes(mutant)
            result = typed.inspect(path)
            self.assertTrue(result['whole_body_normalized_equal'])
            self.assertFalse(result['typed_data_multiset_equal'])

    def test_root_source_change_is_rejected(self):
        scope = v.load(v.P / 'scope.json')
        original = v.P
        import tempfile
        import shutil
        from pathlib import Path
        with tempfile.TemporaryDirectory() as t:
            p = Path(t)
            shutil.copytree(original / 'captures', p / 'captures')
            scope['variants']['sell-retained-initializer-parent']['changed'] = ['src/lib.rs']
            f = p / 'captures/sell-retained-initializer-parent/overrides/src/lib.rs.gz'
            f.parent.mkdir(parents=True, exist_ok=True)
            b = v.sources(v.load(original / 'scope.json'), 'sell-retained-initializer-parent')['src/lib.rs']
            f.write_bytes(gzip.compress(b + b'\n'))
            try:
                v.P = p
                with self.assertRaises(AssertionError):
                    v.sources(scope, 'sell-retained-initializer-parent')
            finally:
                v.P = original


class IntegrityBoundary(unittest.TestCase):
    def test_retained_manifest(self):
        v.manifest_check()

    def test_unlisted_nested_manifest_and_cache(self):
        for name in ['nested/manifest.json','__pycache__/unlisted.pyc']:
            with self.subTest(name=name), tempfile.TemporaryDirectory() as td:
                root=Path(td)
                (root/'manifest.json').write_text('{}')
                path=root/name
                path.parent.mkdir()
                path.write_bytes(b'{}')
                with self.assertRaisesRegex(AssertionError,'packet manifest'):
                    v.manifest_check(root)

    def test_symlink_rejected(self):
        with tempfile.TemporaryDirectory() as td:
            root=Path(td)
            (root/'manifest.json').write_text('{}')
            try:
                (root/'alias').symlink_to(root/'manifest.json')
            except OSError as exc:
                self.skipTest(str(exc))
            with self.assertRaisesRegex(AssertionError,'packet symlink'):
                v.manifest_check(root)

    @unittest.skipUnless(hasattr(os,'mkfifo'),'FIFO creation is POSIX-only')
    def test_special_file_rejected(self):
        with tempfile.TemporaryDirectory() as td:
            root=Path(td)
            (root/'manifest.json').write_text('{}')
            os.mkfifo(root/'fifo')
            with self.assertRaisesRegex(AssertionError,'packet special file'):
                v.manifest_check(root)

    def test_optimized_python_rejected(self):
        result=subprocess.run([sys.executable,'-I','-O','-B',str(v.P/'verify.py')],capture_output=True,text=True,timeout=10)
        self.assertNotEqual(result.returncode,0)
        self.assertIn('Optimized Python disables evidence assertions',result.stderr)


if __name__ == '__main__':
    unittest.main()
