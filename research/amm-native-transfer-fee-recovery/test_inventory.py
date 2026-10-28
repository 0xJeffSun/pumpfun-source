"""Exercise the verifier's actual inventory guard on temporary filesystem entries."""
from pathlib import Path
import ast,os,tempfile,unittest

P=Path(__file__).resolve().parent
tree=ast.parse((P/'verify.py').read_bytes())
function=next(n for n in tree.body if isinstance(n,ast.FunctionDef)and n.name=='verify_inventory')
namespace={}
exec(compile(ast.Module(body=[function],type_ignores=[]),str(P/'verify.py'),'exec'),namespace)
verify_inventory=namespace['verify_inventory']

class InventoryTests(unittest.TestCase):
    def setUp(self):
        self.temporary=tempfile.TemporaryDirectory();self.root=Path(self.temporary.name)
        (self.root/'MANIFEST.json').write_text('{}');(self.root/'artifact.bin').write_bytes(b'fixed bytes')
        self.entries={'artifact.bin':'digest is checked separately by the full verifier'}
    def tearDown(self):self.temporary.cleanup()
    def rejects(self):
        with self.assertRaises(AssertionError):verify_inventory(self.root,self.entries)
    def test_exact_inventory(self):verify_inventory(self.root,self.entries)
    def test_unlisted_file(self):
        (self.root/'extra.json').write_text('{}');self.rejects()
    def test_unlisted_cache(self):
        p=self.root/'__pycache__/module.pyc';p.parent.mkdir();p.write_bytes(b'unbound');self.rejects()
    def test_nested_manifest_is_not_exempt(self):
        p=self.root/'nested/MANIFEST.json';p.parent.mkdir();p.write_text('{}');self.rejects()
    def test_missing_artifact(self):
        (self.root/'artifact.bin').unlink();self.rejects()
    @unittest.skipUnless(hasattr(os,'mkfifo'),'POSIX FIFO control')
    def test_unlisted_fifo(self):os.mkfifo(self.root/'extra.fifo');self.rejects()
    @unittest.skipUnless(hasattr(os,'symlink'),'symlink control')
    def test_dangling_symlink(self):
        (self.root/'extra-link').symlink_to('absent');self.rejects()
    @unittest.skipUnless(hasattr(os,'symlink'),'symlink control')
    def test_listed_symlink(self):
        (self.root/'alias').symlink_to('artifact.bin');self.entries['alias']='same bytes';self.rejects()

if __name__=='__main__':unittest.main(verbosity=2)
