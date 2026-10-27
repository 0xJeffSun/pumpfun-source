from pathlib import Path
import base64,gzip,hashlib,importlib.util,json,os,shutil,subprocess,sys,tempfile,unittest
P=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('current_ownership',P/'verify.py');V=importlib.util.module_from_spec(s);s.loader.exec_module(V)
class Tests(unittest.TestCase):
 @classmethod
 def setUpClass(cls):cls.good=V.verify()
 def setUp(self):
  self.tmp=tempfile.TemporaryDirectory();self.addCleanup(self.tmp.cleanup);self.p=Path(self.tmp.name)/'packet';shutil.copytree(P,self.p);old=V.P;V.P=self.p;self.addCleanup(setattr,V,'P',old)
 def seal(self):
  (self.p/'manifest.json').write_text(json.dumps({str(p.relative_to(self.p)):hashlib.sha256(p.read_bytes()).hexdigest()for p in self.p.rglob('*')if p.is_file()and p!=self.p/'manifest.json'}))
 def rejects(self):
  with self.assertRaises((AssertionError,ValueError,KeyError)):V.verify()
 def test_scope(self):self.assertEqual(self.good['new_complete_matches'],0)
 def test_special(self):os.mkfifo(self.p/'extra.pipe');self.rejects()
 def test_symlink(self):(self.p/'broken').symlink_to('missing');self.rejects()
 def test_optimized(self):
  r=subprocess.run([sys.executable,'-O','-B',str(P/'verify.py')],capture_output=True,text=True);self.assertNotEqual(r.returncode,0);self.assertIn('verification requires assertions',r.stderr)
 def test_source(self):
  p=self.p/'sources/qualified.rs';p.write_bytes(p.read_bytes()+b'\n');self.seal();self.rejects()
 def test_artifact(self):
  p=self.p/'builds/qualified/candidate.so.gz';b=bytearray(gzip.decompress(p.read_bytes()));b[288]^=1;p.write_bytes(gzip.compress(b,mtime=0));self.seal();self.rejects()
 def test_case(self):
  p=self.p/'runtime/buy.json.gz';d=json.loads(gzip.decompress(p.read_bytes()));d['cases'].pop();p.write_bytes(gzip.compress(json.dumps(d).encode(),mtime=0));self.seal();self.rejects()
 def test_program_attestation(self):
  p=self.p/'runtime/buy.json.gz';d=json.loads(gzip.decompress(p.read_bytes()));d['cases'][0]['candidate']['before']['MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e']['data_sha256']='0'*64;p.write_bytes(gzip.compress(json.dumps(d).encode(),mtime=0));self.seal();self.rejects()
if __name__=='__main__':unittest.main()
