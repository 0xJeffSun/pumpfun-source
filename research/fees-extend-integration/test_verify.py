"""Reject coherent packet mutations, after authenticating the parent once."""
from pathlib import Path
import gzip, hashlib, importlib.util, json, os, shutil, struct, subprocess, sys, tempfile, unittest

HERE = Path(__file__).resolve().parent
def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result
BASE = module('extend_test_base', HERE / 'verify.py')

class SourceTransformTests(unittest.TestCase):
    def parent_source(self):
        return BASE.parent_state()[1][BASE.FILES[0]]

    def test_exact_transform_hash(self):
        before = self.parent_source()
        after = BASE.transform_source(before)
        self.assertEqual(BASE.sha(after), BASE.AFTER_SHA256)
        self.assertEqual(before.count(b'\n'), after.count(b'\n'))

    def test_wrong_parent_rejected(self):
        with self.assertRaisesRegex(AssertionError, 'unexpected parent'):
            BASE.transform_source(self.parent_source() + b'\n')

class MutationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        BASE.verify()
        cls.windows = BASE.module('extend_test_windows', BASE.ROOT / 'research/fees-composed-frontier188/window_map.py')

    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix='fees-extend-negative-')
        self.copy = Path(self.temp.name) / 'packet'
        shutil.copytree(HERE, self.copy)
        self.verifier = module('extend_test_copy', self.copy / 'verify.py')
        self.verifier.ROOT = BASE.ROOT
        self.verifier.PARENT = BASE.PARENT
        self.verifier.parent_state = BASE.parent_state

    def tearDown(self): self.temp.cleanup()
    def write_json(self, name, value):
        (self.copy / name).write_text(json.dumps(value, indent=2) + '\n')
    def reject(self, expected=None):
        self.write_json('manifest.json', {
            str(p.relative_to(self.copy)): hashlib.sha256(p.read_bytes()).hexdigest()
            for p in self.copy.rglob('*') if p.is_file() and p != self.copy / 'manifest.json'})
        if expected:
            with self.assertRaisesRegex(AssertionError, expected): self.verifier.verify()
        else:
            with self.assertRaises((AssertionError, ValueError, KeyError)): self.verifier.verify()

    def mutate_native(self, section, relative, pointer=None):
        for role in ['candidate', 'repeat']:
            values = {}
            for file in ['symbols.so', 'candidate.so']:
                path = self.copy / 'builds' / role / (file + '.gz')
                image = bytearray(gzip.decompress(path.read_bytes()))
                sec = next(s for s in self.windows.m.elf_layout(bytes(image))['sections'] if s['name'] == section)
                if pointer is None: image[sec['offset'] + relative] ^= 1
                else: struct.pack_into('<I', image, sec['offset'] + relative, pointer)
                path.write_bytes(gzip.compress(image, mtime=0))
                values[file] = hashlib.sha256(image).hexdigest()
            receipt = json.loads((self.copy / 'builds' / role / 'result.json').read_bytes())
            receipt['symbols_sha256'] = values['symbols.so']
            receipt['candidate_sha256'] = values['candidate.so']
            self.write_json('builds/' + role + '/result.json', receipt)

    def test_source_change(self):
        path = self.copy / 'overrides/programs/pump-fees/src/instructions/admin/extend_fee_config.rs'
        path.write_bytes(path.read_bytes() + b'\n')
        self.reject()

    def test_missing_error_propagation(self):
        path = self.copy / 'overrides' / BASE.FILES[0]
        before = b'.map_err(|_| error!(FeeError::InvalidFeeConfigAccount))?;'
        self.assertIn(before, path.read_bytes())
        path.write_bytes(path.read_bytes().replace(before, b'.map_err(|_| error!(FeeError::InvalidFeeConfigAccount)).unwrap();', 1))
        self.reject()

    def test_discriminator_guard_removed(self):
        path = self.copy / 'overrides' / BASE.FILES[0]
        before = b'require!(data.starts_with(<crate::types::FeeConfig as anchor_lang::Discriminator>::DISCRIMINATOR), FeeError::InvalidFeeConfigAccount);'
        self.assertIn(before, path.read_bytes())
        path.write_bytes(path.read_bytes().replace(before, b'let _ = data.starts_with(<crate::types::FeeConfig as anchor_lang::Discriminator>::DISCRIMINATOR);', 1))
        self.reject()

    def test_extra_override_rejected(self):
        path = self.copy / 'overrides/programs/pump-fees/src/unrequested.rs'
        path.write_text('// unrequested source\n')
        self.reject()

    def test_program_reference_wrong(self):
        old = BASE.read(HERE / 'builds/candidate/symbols.so')
        function = self.windows.windows(old)[127]
        self.assertEqual(function['bytes'], 6312)
        pointer = self.windows.m.instructions(old, function['address'] + 32, 16)[0]['lddw_value'] + 8
        sec = next(s for s in self.windows.m.elf_layout(old)['sections'] if s['name'] == '.text')
        self.mutate_native('.text', function['address'] + 32 - sec['address'] + 4, pointer)
        self.reject('original pointer')

    def test_seed_reference_wrong(self):
        old = BASE.read(HERE / 'builds/candidate/symbols.so')
        function = self.windows.windows(old)[127]
        pointer = self.windows.m.instructions(old, function['address'] + 1360, 16)[0]['lddw_value'] + 1
        sec = next(s for s in self.windows.m.elf_layout(old)['sections'] if s['name'] == '.text')
        self.mutate_native('.text', function['address'] + 1360 - sec['address'] + 4, pointer)
        self.reject('original pointer')

    def test_unrelated_instruction_change(self):
        self.mutate_native('.text', 4)
        self.reject()

    def test_readonly_constant_change(self):
        self.mutate_native('.rodata', 10)
        self.reject('readonly payload')

    def test_wrong_build_target(self):
        receipt = json.loads((self.copy / 'builds/candidate/launch.json').read_bytes())
        index = receipt['command'].index('--target') + 1
        receipt['command'][index] = 'x86_64-unknown-linux-gnu'
        self.write_json('builds/candidate/launch.json', receipt)
        self.reject()

    def test_added_layout_padding(self):
        path = self.copy / 'layout/ordered.ld'
        path.write_bytes(path.read_bytes().replace(b'  .rodata : {', b'  .rodata : { BYTE(0);', 1))
        self.reject()

    def test_missing_runtime_case(self):
        path = self.copy / 'runtime.json.gz'
        report = json.loads(gzip.decompress(path.read_bytes()))
        report['suites']['queries']['cases'].pop()
        path.write_bytes(gzip.compress(json.dumps(report).encode(), mtime=0))
        self.reject()

    def test_unlisted_nested_manifest_and_cache(self):
        for name in ('nested/manifest.json', '__pycache__/extra.pyc'):
            path = self.copy / name
            path.parent.mkdir(exist_ok=True)
            path.write_bytes(b'{}')
            with self.assertRaises(AssertionError): self.verifier.check_manifest()
            path.unlink()

    def test_symlink_rejected(self):
        (self.copy / 'alias').symlink_to(self.copy / 'manifest.json')
        with self.assertRaisesRegex(AssertionError, 'symlink'):
            self.verifier.check_manifest()

    @unittest.skipUnless(hasattr(os, 'mkfifo'), 'POSIX-only FIFO creation')
    def test_special_file_rejected(self):
        os.mkfifo(self.copy / 'fifo')
        with self.assertRaisesRegex(AssertionError, 'special file'):
            self.verifier.check_manifest()

    def test_optimized_python_rejected(self):
        result = subprocess.run([sys.executable, '-I', '-O', '-B', str(self.copy / 'verify.py')],
                                capture_output=True, text=True)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('verification requires assertions', result.stderr)

if __name__ == '__main__': unittest.main()
