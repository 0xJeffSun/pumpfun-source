"""Pure text/materialization tests. Set FEES_SOURCE_PARENT to the exact PR302 source directory."""
from pathlib import Path
import os,shutil,tempfile,unittest,json
import source_tools as s
P=Path(__file__).resolve().parent
class ParserTests(unittest.TestCase):
    def test_paths(self):
        for x in ['../x','/x','a/../b','a\\b','.','']:
            with self.subTest(path=x),self.assertRaises(ValueError):s.relative(x)
    def test_exact_and_reverse(self):
        p=s.parse_patch('--- a/x\n+++ b/x\n@@ -1 +1 @@\n-a\n+b\n')['x']
        self.assertEqual(s.apply_file(b'a\n',p),b'b\n');self.assertEqual(s.apply_file(b'b\n',p,True),b'a\n')
        with self.assertRaises(ValueError):s.apply_file(b'wrong\n',p)
    def test_bad_patch(self):
        for p in ['--- a/../x\n+++ b/../x\n','--- a/x\n+++ b/y\n','--- a/x\n+++ b/x\n@@ -1 +1 @@\n-a\n']:
            with self.subTest(p=p),self.assertRaises(ValueError):s.parse_patch(p)
    def test_packet(self):self.assertEqual(len(s.packet(P)['stages']),5)
class MaterializerTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        parent=os.environ.get('FEES_SOURCE_PARENT')
        if not parent:raise unittest.SkipTest('Set FEES_SOURCE_PARENT for exact48-input integration checks')
        cls.parent=Path(parent).resolve();s.stages(P,cls.parent)
    def setUp(self):self.tmp=tempfile.TemporaryDirectory();self.root=Path(self.tmp.name)
    def tearDown(self):self.tmp.cleanup()
    def test_all_stages(self):
        for name in ['sweep','event','capacity','box','donation']:
            with self.subTest(stage=name):
                out=self.root/name;v=s.materialize(P,self.parent,out,name);self.assertEqual(v['source_files'],48);self.assertFalse(v['native_build_verified'])
    def test_existing_output(self):
        with self.assertRaises(ValueError):s.materialize(P,self.parent,self.root,'capacity')
    def test_output_in_parent(self):
        with self.assertRaises(ValueError):s.materialize(P,self.parent,self.parent/'forbidden-output','capacity')
    def test_unknown_stage(self):
        with self.assertRaises(ValueError):s.materialize(P,self.parent,self.root/'out','unknown')
    def mutated_parent(self):
        p=self.root/'parent';shutil.copytree(self.parent,p);return p
    def test_extra_parent_file(self):
        p=self.mutated_parent();(p/'extra').write_text('x')
        with self.assertRaises(ValueError):s.stages(P,p)
    def test_missing_parent_file(self):
        p=self.mutated_parent();(p/'Cargo.lock').unlink()
        with self.assertRaises(ValueError):s.stages(P,p)
    def test_changed_parent_file(self):
        p=self.mutated_parent();(p/'Cargo.lock').write_text('wrong')
        with self.assertRaises(ValueError):s.stages(P,p)
    def test_symlink_parent(self):
        p=self.root/'link';p.symlink_to(self.parent,target_is_directory=True)
        with self.assertRaises(ValueError):s.stages(P,p)
    def test_symlink_file(self):
        p=self.mutated_parent();(p/'Cargo.lock').unlink();(p/'Cargo.lock').symlink_to(self.parent/'Cargo.lock')
        with self.assertRaises(ValueError):s.stages(P,p)
    def test_symlink_output_ancestor(self):
        p=self.root/'link';p.symlink_to(self.root,target_is_directory=True)
        with self.assertRaises(ValueError):s.materialize(P,self.parent,p/'out','capacity')
    def test_changed_patch(self):
        p=self.root/'packet';shutil.copytree(P,p);f=p/'crank-safe-capacity.patch';f.write_text(f.read_text()+'\n')
        with self.assertRaises(ValueError):s.stages(p,self.parent)
    def test_changed_map(self):
        p=self.root/'packet';shutil.copytree(P,p);f=p/'source-stages.json';f.write_text(f.read_text()+'\n')
        with self.assertRaises(ValueError):s.stages(p,self.parent)
    def test_extra_packet_file(self):
        p=self.root/'packet';shutil.copytree(P,p);(p/'extra').write_text('x')
        with self.assertRaises(ValueError):s.stages(p,self.parent)
if __name__=='__main__':unittest.main()
