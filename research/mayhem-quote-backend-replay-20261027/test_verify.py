from pathlib import Path
import gzip,hashlib,importlib.util,json,os,shutil,subprocess,sys,tempfile,unittest
P=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('backend_verify',P/'verify.py');V=importlib.util.module_from_spec(s);s.loader.exec_module(V)
class Tests(unittest.TestCase):
 @classmethod
 def setUpClass(cls):cls.good=V.verify()
 def setUp(self):
  self.tmp=tempfile.TemporaryDirectory();self.addCleanup(self.tmp.cleanup);self.p=Path(self.tmp.name)/'packet';shutil.copytree(P,self.p);old=V.P;V.P=self.p;self.addCleanup(setattr,V,'P',old)
 def seal(self):(self.p/'manifest.json').write_text(json.dumps({str(p.relative_to(self.p)):hashlib.sha256(p.read_bytes()).hexdigest()for p in self.p.rglob('*')if p.is_file()and p!=self.p/'manifest.json'}))
 def reject(self):
  with self.assertRaises((AssertionError,ValueError,KeyError)):V.verify()
 def test_scope(self):self.assertEqual(self.good['new_matched_windows'],0)
 def test_special(self):os.mkfifo(self.p/'extra.pipe');self.reject()
 def test_link(self):(self.p/'broken').symlink_to('missing');self.reject()
 def test_optimized(self):
  r=subprocess.run([sys.executable,'-O','-B',str(P/'verify.py')],capture_output=True,text=True);self.assertNotEqual(r.returncode,0);self.assertIn('verification requires assertions',r.stderr)
 def test_ir(self):
  p=self.p/'input.ll.gz';p.write_bytes(gzip.compress(gzip.decompress(p.read_bytes())+b'\n'));self.seal();self.reject()
 def test_object(self):
  p=self.p/'outputs/v154.o.gz';b=bytearray(gzip.decompress(p.read_bytes()));b[-1]^=1;p.write_bytes(gzip.compress(b));self.seal();self.reject()
 def test_count(self):
  p=self.p/'comparison.json';d=json.loads(p.read_text());d[1]['same_position_slots']=140;p.write_text(json.dumps(d));self.seal();self.reject()
if __name__=='__main__':unittest.main()
