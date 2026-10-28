"""Pure text/materialization tests. Set FEES_SOURCE_PARENT to the exact materialized PR320 box source directory."""
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
    def test_packet(self):self.assertEqual(len(s.packet(P)['stages']),3)
class MaterializerTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        parent=os.environ.get('FEES_SOURCE_PARENT')
        if not parent:raise unittest.SkipTest('Set FEES_SOURCE_PARENT for exact48-input integration checks')
        cls.parent=Path(parent).resolve();s.stages(P,cls.parent)
    def setUp(self):self.tmp=tempfile.TemporaryDirectory();self.root=Path(self.tmp.name)
    def tearDown(self):self.tmp.cleanup()
    def test_all_stages(self):
        for name in ['direct_outer','explicit_branches','pool_first']:
            with self.subTest(stage=name):
                out=self.root/name;v=s.materialize(P,self.parent,out,name);self.assertEqual(v['source_files'],48);self.assertFalse(v['native_build_verified'])
    def test_branches_are_independent(self):
        meta=s.packet(P);self.assertTrue(all(meta['stages'][n]['parent']=='parent' for n in ['direct_outer','explicit_branches']))
        data=s.stages(P,self.parent);self.assertNotEqual(data['direct_outer'],data['explicit_branches'])
    def test_third_stage_parent(self):
        self.assertEqual(s.packet(P)['stages']['pool_first']['parent'],'explicit_branches')
        d=s.stages(P,self.parent);self.assertNotEqual(d['pool_first'],d['explicit_branches'])
        self.assertEqual(sum(d['pool_first'][n]!=d['explicit_branches'][n] for n in d['pool_first']),1)
    def test_pool_first_arm_text(self):
        d=s.stages(P,self.parent);n='programs/pump-fees/src/instructions/fee_sharing/create_donation_fee_pda.rs'
        a=d['explicit_branches'][n].decode().splitlines();b=d['pool_first'][n].decode().splitlines()
        self.assertEqual(len(a),224);self.assertEqual(len(b),224)
        self.assertEqual(a[139:175],b[139:175]);self.assertEqual(a[133:138],b[176:181])
    def test_reserve_truth_and_read_prefix(self):
        import itertools
        for bits in itertools.product([False,True],repeat=4):
            old_reads=[];new_reads=[]
            def old_read(i):old_reads.append(i);return bits[i]
            def new_read(i):new_reads.append(i);return not bits[i]
            live=old_read(0) or old_read(1) or old_read(2) or old_read(3)
            pool=new_read(0) and new_read(1) and new_read(2) and new_read(3)
            self.assertEqual(live,not pool);self.assertEqual(old_reads,new_reads)
    def test_third_patch_rejects_wrong_branch(self):
        m=s.packet(P);d=s.stages(P,self.parent);n=m['stages']['pool_first']['changed_paths'][0]
        hunks=s.parse_patch((P/'pool_first.patch').read_text())[n]
        with self.assertRaises(ValueError):s.apply_file(d['direct_outer'][n],hunks)
    def test_composition_parent_rejected(self):
        out=self.root/'direct';s.materialize(P,self.parent,out,'direct_outer')
        with self.assertRaises(ValueError):s.stages(P,out)
    def test_existing_output(self):
        with self.assertRaises(ValueError):s.materialize(P,self.parent,self.root,'explicit_branches')
    def test_output_in_parent(self):
        with self.assertRaises(ValueError):s.materialize(P,self.parent,self.parent/'forbidden-output','explicit_branches')
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
        with self.assertRaises(ValueError):s.materialize(P,self.parent,p/'out','explicit_branches')
    def test_changed_patch(self):
        p=self.root/'packet';shutil.copytree(P,p);f=p/'explicit_branches.patch';f.write_text(f.read_text()+'\n')
        with self.assertRaises(ValueError):s.stages(p,self.parent)
    def test_changed_map(self):
        p=self.root/'packet';shutil.copytree(P,p);f=p/'source-stages.json';f.write_text(f.read_text()+'\n')
        with self.assertRaises(ValueError):s.stages(p,self.parent)
    def test_extra_packet_file(self):
        p=self.root/'packet';shutil.copytree(P,p);(p/'extra').write_text('x')
        with self.assertRaises(ValueError):s.stages(p,self.parent)
if __name__=='__main__':unittest.main()
