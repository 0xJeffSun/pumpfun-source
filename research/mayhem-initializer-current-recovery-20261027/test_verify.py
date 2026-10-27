from pathlib import Path
import gzip,hashlib,importlib.util,json,os,shutil,subprocess,sys,tempfile,unittest
P=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('current_verify',P/'verify.py');V=importlib.util.module_from_spec(s);s.loader.exec_module(V)
class Tests(unittest.TestCase):
 @classmethod
 def setUpClass(cls):cls.valid=V.verify(False)
 def setUp(self):
  self.temp=tempfile.TemporaryDirectory();self.addCleanup(self.temp.cleanup);self.p=Path(self.temp.name)/'packet';shutil.copytree(P,self.p);old=V.P;V.P=self.p;self.addCleanup(setattr,V,'P',old)
 def seal(self):
  (self.p/'manifest.json').write_text(json.dumps({str(p.relative_to(self.p)):hashlib.sha256(p.read_bytes()).hexdigest() for p in self.p.rglob('*') if p.is_file() and p!=self.p/'manifest.json'}))
 def reject(self):
  with self.assertRaises((AssertionError,ValueError,KeyError)):V.verify(False)
 def test_positive(self):self.assertEqual(self.valid['current']['normalized'],430)
 def test_special_file(self):os.mkfifo(self.p/'unlisted.pipe');self.reject()
 def test_broken_link(self):(self.p/'broken').symlink_to('missing');self.reject()
 def test_nested_manifest(self):
  (self.p/'unlisted').mkdir();(self.p/'unlisted/manifest.json').write_text('{}');self.reject()
 def test_optimized(self):
  r=subprocess.run([sys.executable,'-O','-B',str(P/'verify.py')],capture_output=True,text=True);self.assertNotEqual(r.returncode,0);self.assertIn('verification requires assertions',r.stderr)
 def test_changed_build_source(self):
  p=self.p/'builds/current/launch.json';d=json.loads(p.read_text());d['source_inputs']['src/state.rs']='0'*64;p.write_text(json.dumps(d));self.seal();self.reject()
 def test_changed_body_claim(self):
  p=self.p/'analysis/current-body.json';d=json.loads(p.read_text());d['snapshot']['typed_data']['vtable_scalars']=[0,16,4];p.write_text(json.dumps(d));self.seal();self.reject()
 def test_missing_runtime_execution(self):
  p=self.p/'runtime/current/pump-cpi.json.gz';d=json.loads(gzip.decompress(p.read_bytes()));d['cases'][0]['candidate_executions'].pop();p.write_bytes(gzip.compress(json.dumps(d).encode(),mtime=0))
  m=V.module('mutated_runtime',self.p/'runtime_check.py')
  with self.assertRaises(AssertionError):m.verify(V.ROOT,self.p,False,V.HASHES['current'][0],'current')
if __name__=='__main__':unittest.main()
