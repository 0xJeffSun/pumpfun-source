"""Negative controls for the actual composed images and source/build records."""
from pathlib import Path
import gzip, json, struct, tempfile, unittest
import restore
import verify_frontier as v

class FrontierTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.api = v.helpers(v.ROOT)

    def test_current_static_proof(self):
        result = v.verify(runtime=False)
        self.assertEqual((result['normalized'],result['raw_local']), (429,139))
        self.assertFalse(result['runtime_verified'])
        self.assertFalse(result['original_source_authenticated'])

    def test_old_checkpoint_cannot_stand_in_for_new_frontier(self):
        with tempfile.TemporaryDirectory() as td:
            work = Path(td)
            path = work/'layout-root-parser-qualified-01-build/symbols.so'
            path.parent.mkdir()
            path.write_bytes(gzip.decompress((v.ROOT/'research/mayhem-sizing-panic-recovery/artifacts/recovered/symbols.so.gz').read_bytes()))
            with self.assertRaises(AssertionError):
                v.frontier(v.ROOT,work,self.api)

    def test_allocator_mutation_rejected(self):
        with tempfile.TemporaryDirectory() as td:
            work = Path(td)/'work'
            restore.verify_or_restore(work,'layout-root-parser-qualified-01-build/')
            path = work/'layout-root-parser-qualified-01-build/symbols.so'
            elf = self.api['reader'].Elf(path)
            symbol, = [s for s in elf.symbols if 'finish_grow17h728583255202ce8aE' in s['name']]
            self.assertEqual(symbol['size'],328)
            body = bytearray(elf.b)
            site = next(p for p in range(symbol['value'],symbol['value']+symbol['size'],8)
                        if struct.unpack_from('<BBhi',body,p)[0]==0xb7
                        and struct.unpack_from('<BBhi',body,p)[3] in (0,1))
            value = struct.unpack_from('<i',body,site+4)[0]
            struct.pack_into('<i',body,site+4,1-value)
            path.write_bytes(body)
            with self.assertRaises(AssertionError):
                v.frontier(v.ROOT,work,self.api)

    def test_unexpected_source_change_rejected(self):
        with tempfile.TemporaryDirectory() as td:
            work = Path(td)/'work'
            restore.verify_or_restore(work,'allocator-current-parser-')
            path = work/'allocator-current-parser-enabled/programs/mayhem/curve-accounts/src/lib.rs'
            path.write_bytes(path.read_bytes()+b'// unapproved source drift\n')
            with self.assertRaises(AssertionError):
                v.check_builds(v.ROOT,work)

    def test_missing_offline_build_constraint_rejected(self):
        with tempfile.TemporaryDirectory() as td:
            work = Path(td)/'work'
            restore.verify_or_restore(work,v.PREFIXES)
            path = work/'layout-root-parser-qualified-01-build/launch.json'
            launch = json.loads(path.read_bytes())
            launch['command'].remove('--offline')
            path.write_text(json.dumps(launch))
            with self.assertRaises(AssertionError):
                v.check_builds(v.ROOT,work)

if __name__ == '__main__':
    unittest.main()
