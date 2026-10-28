"""Pure source/provenance tests. No compiler, VM, network or receipt access."""
from pathlib import Path
import hashlib, json, os, shutil, subprocess, sys, tempfile, types, unittest
HERE=Path(__file__).resolve().parent
s=types.ModuleType('amm_source_tools');s.__file__=str(HERE/'source_tools.py')
exec(compile(Path(s.__file__).read_bytes(),s.__file__,'exec'),s.__dict__)
class Tests(unittest.TestCase):
    def test_packet(self):
        m,_=s.verify(HERE);self.assertEqual(len(m['base_workspace']),52)
    def test_forward_reverse(self):
        m,parsed=s.verify(HERE);data=s.transformed(HERE)
        self.assertEqual({k:s.sha(v) for k,v in data.items()},m['composed_workspace'])
        for name,hunks in parsed.items():self.assertEqual(s.apply_file(data[name],hunks,True),s.read_under(HERE/'base',name))
    def test_exact_two_paths(self):
        m,_=s.verify(HERE)
        self.assertEqual({k for k in m['base_workspace'] if m['base_workspace'][k]!=m['composed_workspace'][k]},set(m['changed_paths']))
    def test_materialize_base(self):
        with tempfile.TemporaryDirectory() as d:
            out=Path(d)/'out';r=s.materialize(HERE,out,'base')
            self.assertEqual(s.inventory(out),s.verify(HERE)[0]['base_workspace']);self.assertFalse(r['native_build_verified'])
    def test_materialize_harvest(self):
        with tempfile.TemporaryDirectory() as d:
            out=Path(d)/'out';s.materialize(HERE,out)
            self.assertEqual(s.inventory(out),s.verify(HERE)[0]['composed_workspace'])
    def test_existing_output(self):
        with tempfile.TemporaryDirectory() as d:
            with self.assertRaises(ValueError):s.materialize(HERE,Path(d))
    def test_inside_packet_output(self):
        with self.assertRaises(ValueError):s.materialize(HERE,HERE/'never-create-output')
    def test_unknown_stage(self):
        with self.assertRaises(ValueError):s.transformed(HERE,'unknown')
    def test_helper_ownership(self):
        before=s.transformed(HERE,'base');after=s.transformed(HERE)
        token='programs/pump-amm/src/utils/token.rs';boost='programs/pump-amm/src/boost_burn.rs'
        tail=after[token][len(before[token])+1:]
        self.assertEqual(len(tail),563);self.assertEqual(tail.count(b'token_program.clone()'),2)
        self.assertEqual(tail.count(b'mint.clone()'),1);self.assertEqual(tail.count(b'source.clone()'),1)
        self.assertIn(b'vec![source.clone()]',tail);self.assertNotIn(b'new_with_signer',tail)
        self.assertEqual(len(before[boost].splitlines()),len(after[boost].splitlines()))
        for bad in [b'unsafe',b'asm!',b'include_bytes!',b'link_section',b'#[inline']:self.assertNotIn(bad,tail)
    def copy_packet(self,d):
        p=Path(d)/'packet';shutil.copytree(HERE,p);return p
    def reseal(self,p):
        m={str(f.relative_to(p)):s.sha(f.read_bytes()) for f in p.rglob('*') if f.is_file() and f.name!='manifest.json'}
        (p/'manifest.json').write_text(json.dumps(m,indent=2,sort_keys=True)+'\n')
    def test_missing_input(self):
        with tempfile.TemporaryDirectory() as d:
            p=self.copy_packet(d);(p/'base/Cargo.lock').unlink()
            with self.assertRaises(ValueError):s.verify(p)
    def test_extra_payload(self):
        with tempfile.TemporaryDirectory() as d:
            p=self.copy_packet(d);(p/'unexpected.so').write_bytes(b'not executable')
            with self.assertRaises(ValueError):s.verify(p)
    def test_modified_input(self):
        with tempfile.TemporaryDirectory() as d:
            p=self.copy_packet(d);(p/'base/Cargo.toml').write_text('changed')
            with self.assertRaises(ValueError):s.verify(p)
    def test_resealed_input(self):
        with tempfile.TemporaryDirectory() as d:
            p=self.copy_packet(d);(p/'base/Cargo.toml').write_text('changed');self.reseal(p)
            with self.assertRaises(ValueError):s.verify(p)
    def test_resealed_metadata(self):
        with tempfile.TemporaryDirectory() as d:
            p=self.copy_packet(d);m=json.loads((p/'source-inputs.json').read_text());m['default_runtime_verified']=True
            (p/'source-inputs.json').write_text(json.dumps(m));self.reseal(p)
            with self.assertRaises(ValueError):s.verify(p)
    def test_resealed_canonical_manifest(self):
        with tempfile.TemporaryDirectory() as d:
            p=self.copy_packet(d);f=p/'standalone-Cargo.toml';f.write_bytes(f.read_bytes()+b'\n');self.reseal(p)
            with self.assertRaises(ValueError):s.verify(p)
    def test_symlink_input(self):
        with tempfile.TemporaryDirectory() as d:
            p=self.copy_packet(d);f=p/'base/Cargo.lock';data=f.read_bytes();f.unlink();target=Path(d)/'lock';target.write_bytes(data);f.symlink_to(target)
            with self.assertRaises(ValueError):s.verify(p)
    def test_symlink_root(self):
        with tempfile.TemporaryDirectory() as d:
            alias=Path(d)/'alias';alias.symlink_to(HERE,target_is_directory=True)
            with self.assertRaises(ValueError):s.verify(alias)
    def test_source_paths(self):
        for name in ['../x','/tmp/x','a/../b','a\\b','', 'a//b']:
            with self.subTest(name=name):
                with self.assertRaises(ValueError):s.relative(name)
    def test_patch_path_escape(self):
        with self.assertRaises(ValueError):s.parse_patch('--- a/../x\n+++ b/../x\n@@ -1 +1 @@\n-a\n+b\n')
    def test_patch_duplicate_file(self):
        patch='--- a/x\n+++ b/x\n@@ -1 +1 @@\n-a\n+b\n'
        with self.assertRaises(ValueError):s.parse_patch(patch+patch)
    def test_patch_truncated(self):
        with self.assertRaises(ValueError):s.parse_patch('--- a/x\n+++ b/x\n@@ -1,2 +1,2 @@\n-a\n+b\n')
    def test_wrong_context(self):
        patch=s.parse_patch('--- a/x\n+++ b/x\n@@ -1 +1 @@\n-a\n+b\n')
        with self.assertRaises(ValueError):s.apply_file(b'wrong\n',patch['x'])
    def test_invalid_utf8(self):
        with self.assertRaises(UnicodeDecodeError):s.apply_file(b'\xff',[])
    def test_optimized_rejected(self):
        r=subprocess.run([sys.executable,'-O','-B',str(HERE/'source_tools.py')],capture_output=True,text=True,env=dict(os.environ,PYTHONDONTWRITEBYTECODE='1'))
        self.assertNotEqual(r.returncode,0);self.assertIn('Assertions require normal Python',r.stderr)
if __name__=='__main__':unittest.main()
