"""Reject coherent packet mutations, after authenticating the parent once."""
from pathlib import Path
import gzip, hashlib, importlib.util, json, shutil, struct, tempfile, unittest

HERE = Path(__file__).resolve().parent
def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result
BASE = module('ids_test_base', HERE / 'verify.py')

class MutationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        BASE.verify()
        cls.windows = BASE.module('ids_test_windows', BASE.ROOT / 'research/fees-composed-frontier188/window_map.py')

    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix='fees-id-negative-')
        self.copy = Path(self.temp.name) / 'packet'
        shutil.copytree(HERE, self.copy)
        self.verifier = module('ids_test_copy', self.copy / 'verify.py')
        self.verifier.ROOT = BASE.ROOT
        self.verifier.PARENT = BASE.PARENT
        self.verifier.parent_state = BASE.parent_state

    def tearDown(self): self.temp.cleanup()
    def write_json(self, name, value):
        (self.copy / name).write_text(json.dumps(value, indent=2) + '\n')
    def reject(self):
        self.write_json('manifest.json', {
            str(p.relative_to(self.copy)): hashlib.sha256(p.read_bytes()).hexdigest()
            for p in self.copy.rglob('*') if p.is_file() and p != self.copy / 'manifest.json'})
        with self.assertRaises((AssertionError, ValueError, KeyError)):
            self.verifier.verify()

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
        path = self.copy / 'overrides/programs/pump-fees/src/donation.rs'
        path.write_bytes(path.read_bytes() + b'\n')
        self.reject()

    def test_removed_vendor_retention(self):
        path = self.copy / 'vendor/src/declare_program/mod.rs'
        path.write_bytes(path.read_bytes().replace(b'        #[used]\n', b'', 1))
        hashes = json.loads((self.copy / 'vendor-inputs.json').read_bytes())
        hashes['src/declare_program/mod.rs'] = hashlib.sha256(path.read_bytes()).hexdigest()
        self.write_json('vendor-inputs.json', hashes)
        self.reject()

    def test_program_reference_reverted(self):
        old = BASE.read(BASE.PARENT / 'builds/candidate/symbols.so')
        target = self.windows.m.instructions(old, 73544 + 144, 16)[0]['lddw_value']
        sec = next(s for s in self.windows.m.elf_layout(old)['sections'] if s['name'] == '.text')
        self.mutate_native('.text', 73544 + 144 - sec['address'] + 4, target)
        self.reject()

    def test_unrelated_instruction_change(self):
        self.mutate_native('.text', 4)
        self.reject()

    def test_readonly_constant_change(self):
        self.mutate_native('.rodata', 10)
        self.reject()

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

if __name__ == '__main__': unittest.main()
