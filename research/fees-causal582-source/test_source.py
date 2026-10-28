"""Pure source/manifest/path mutation tests; no compiler, VM or network."""
if not __debug__:
    raise RuntimeError('Tests require ordinary Python')
from pathlib import Path
import json,os,shutil,subprocess,sys,tempfile,unittest
sys.dont_write_bytecode=True
import source_tools as s
HERE=Path(__file__).resolve().parent

class SourceTests(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory(prefix='fees-causal582-source-test-')
        self.root=Path(self.temp.name)
        self.packet=self.root/'packet'
        shutil.copytree(HERE,self.packet)
    def tearDown(self):self.temp.cleanup()
    def reseal(self):
        files=s.inventory(self.packet)
        files.pop('manifest.json')
        (self.packet/'manifest.json').write_text(json.dumps(files,indent=2,sort_keys=True)+'\n')
    def reject_change(self,name,change,reseal=True):
        path=self.packet/name;path.write_bytes(change(path.read_bytes()))
        if reseal:self.reseal()
        with self.assertRaises((ValueError,KeyError,UnicodeError)):s.stages(self.packet)
    def test_snapshot_and_both_stages(self):
        m,b,a=s.stages(self.packet)
        self.assertEqual(len(a),48);self.assertEqual(sum(a[n]==b[n]for n in a),46)
        self.assertEqual({n:s.sha(v)for n,v in b.items()},m['before'])
        self.assertEqual({n:s.sha(v)for n,v in a.items()},m['after'])
    def test_after_materialization(self):
        r=s.materialize(self.packet,self.root/'after')
        self.assertTrue(r['exact_source_materialization_verified']);self.assertFalse(r['native_build_verified'])
        self.assertEqual(len(s.inventory(self.root/'after')),48)
    def test_before_materialization(self):
        r=s.materialize(self.packet,self.root/'before','before')
        self.assertTrue(r['exact_source_materialization_verified']);self.assertFalse(r['runtime_verified'])
    def test_two_changed_files_only(self):
        m,b,a=s.stages(self.packet);self.assertEqual({n for n in a if a[n]!=b[n]},s.CHANGES)
    def test_source_corruption_even_resealed(self):
        name=next(n for n in s.stages(self.packet)[0]['after']if n.endswith('/crank_donation_fee_pda.rs'))
        self.reject_change('source/'+name,lambda b:b.replace(b'drop(a); drop(b); drop(c)',b'drop(c); drop(b); drop(a)'))
    def test_unchanged_source_corruption(self):
        self.reject_change('source/Cargo.toml',lambda b:b+b'\n')
    def test_patch_corruption(self):self.reject_change('source.patch',lambda b:b.replace(b'invoke_result?',b'invoke_result!'))
    def test_metadata_native_claim(self):
        def change(b):
            v=json.loads(b);v['verification_scope']['native_build']=True;return json.dumps(v).encode()
        self.reject_change('source-inputs.json',change)
    def test_metadata_before_map_mutation(self):
        def change(b):
            v=json.loads(b);v['before']['Cargo.toml']='0'*64;return json.dumps(v).encode()
        self.reject_change('source-inputs.json',change)
    def test_metadata_after_map_mutation(self):
        def change(b):
            v=json.loads(b);v['after']['Cargo.toml']='0'*64;return json.dumps(v).encode()
        self.reject_change('source-inputs.json',change)
    def test_false_public_provenance(self):self.reject_change('provenance.json',lambda b:b.replace(b'2310e96d',b'00000000'))
    def test_extra_file_rejected(self):
        (self.packet/'unexpected.txt').write_text('Unexpected packet entry')
        self.reseal()
        with self.assertRaises(ValueError):s.stages(self.packet)
    def test_missing_source(self):
        (self.packet/'source/Cargo.toml').unlink();self.reseal()
        with self.assertRaises(ValueError):s.stages(self.packet)
    def test_incorrect_manifest(self):
        self.reject_change('README.md',lambda b:b+b'\n',reseal=False)
    def test_output_existing(self):
        out=self.root/'existing';out.mkdir()
        with self.assertRaises(ValueError):s.materialize(self.packet,out)
    def test_output_inside_packet(self):
        with self.assertRaises(ValueError):s.materialize(self.packet,self.packet/'new-output')
    def test_output_stage(self):
        with self.assertRaises(ValueError):s.materialize(self.packet,self.root/'out','invalid')
    def test_output_symlink_parent(self):
        real=self.root/'real';real.mkdir();link=self.root/'link';link.symlink_to(real,target_is_directory=True)
        with self.assertRaises(ValueError):s.materialize(self.packet,link/'out')
    def test_source_symlink(self):
        p=self.packet/'source/Cargo.toml';b=p.read_bytes();p.unlink();(self.root/'file').write_bytes(b);p.symlink_to(self.root/'file')
        with self.assertRaises(ValueError):s.stages(self.packet)
    @unittest.skipUnless(hasattr(os,'mkfifo'),'POSIX special-file check')
    def test_special_file(self):
        os.mkfifo(self.packet/'pipe')
        with self.assertRaises(ValueError):s.stages(self.packet)
    def test_unsafe_relative_paths(self):
        for p in ['', '.', '../x','/tmp/x','a/../b','a//b','a\\b']:
            with self.subTest(p=p),self.assertRaises(ValueError):s.relative(p)
    def test_patch_path_escape(self):
        with self.assertRaises(ValueError):s.parse_patch('--- a/../x\n+++ b/../x\n@@ -1 +1 @@\n-a\n+b\n')
    def test_patch_different_paths(self):
        with self.assertRaises(ValueError):s.parse_patch('--- a/a\n+++ b/b\n@@ -1 +1 @@\n-a\n+b\n')
    def test_truncated_patch(self):
        with self.assertRaises(ValueError):s.parse_patch('--- a/a\n+++ b/a\n@@ -1 +1 @@\n-a\n')
    def test_wrong_patch_context(self):
        h=s.parse_patch('--- a/a\n+++ b/a\n@@ -1 +1 @@\n-a\n+b\n')['a']
        with self.assertRaises(ValueError):s.apply_file(b'other\n',h)
    def test_both_directions_of_patch(self):
        h=s.parse_patch('--- a/a\n+++ b/a\n@@ -1 +1 @@\n-a\n+b\n')['a']
        self.assertEqual(s.apply_file(b'a\n',h),b'b\n');self.assertEqual(s.apply_file(b'b\n',h,True),b'a\n')
    def test_wrong_scope(self):
        _,b,a=s.stages(self.packet);a=dict(a);a['Cargo.toml']+=b'\n'
        with self.assertRaises(ValueError):s.check_scope(b,a)
    def test_public_blob_mismatch(self):
        with self.assertRaises((FileNotFoundError,ValueError)):s.verify_public_provenance(self.packet,self.root)
    def test_optimized_python_rejected(self):
        p=subprocess.run([sys.executable,'-B','-O',str(self.packet/'source_tools.py')],capture_output=True,text=True)
        self.assertNotEqual(p.returncode,0);self.assertIn('not -O',p.stderr)

if __name__=='__main__':unittest.main()
