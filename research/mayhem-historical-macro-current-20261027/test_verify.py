"""Reject source, binary and evidence-boundary mutations after resealing."""
from pathlib import Path
import gzip,hashlib,importlib.util,json,os,shutil,subprocess,sys,tempfile,unittest
P=Path(__file__).resolve().parent
def module(path):
 s=importlib.util.spec_from_file_location('macro_test',path);v=importlib.util.module_from_spec(s);s.loader.exec_module(v);return v
BASE=module(P/'verify.py')
class Tests(unittest.TestCase):
 @classmethod
 def setUpClass(cls):BASE.verify()
 def setUp(self):
  self.tmp=tempfile.TemporaryDirectory();self.p=Path(self.tmp.name)/'packet';shutil.copytree(P,self.p);self.v=module(self.p/'verify.py');self.v.ROOT=BASE.ROOT
 def tearDown(self):self.tmp.cleanup()
 def reseal(self):
  d={p.relative_to(self.p).as_posix():hashlib.sha256(p.read_bytes()).hexdigest()for p in self.p.rglob('*')if p.is_file()and p!=self.p/'manifest.json'};(self.p/'manifest.json').write_text(json.dumps(d))
 def test_source_change(self):
  p=self.p/'sources/src/state.rs.gz';p.write_bytes(gzip.compress(gzip.decompress(p.read_bytes())+b'\n'));self.reseal()
  with self.assertRaises(AssertionError):self.v.verify()
 def test_binary_change(self):
  p=self.p/'program/enabled/candidate.so.gz';b=bytearray(gzip.decompress(p.read_bytes()));b[400]^=1;p.write_bytes(gzip.compress(b));self.reseal()
  with self.assertRaises(AssertionError):self.v.verify()
 def test_macro_change(self):
  p=self.p/'host/enabled/macro.dylib.gz';b=bytearray(gzip.decompress(p.read_bytes()));b[-100]^=1;p.write_bytes(gzip.compress(b));self.reseal()
  with self.assertRaises(AssertionError):self.v.verify()
 def test_layout_change(self):
  p=self.p/'layout/ordered.ld';p.write_bytes(p.read_bytes()+b'\n');self.reseal()
  with self.assertRaisesRegex(AssertionError,'qualified layout changed'):self.v.verify()
 def test_false_identity_claim(self):
  p=self.p/'summary.json';d=json.loads(p.read_bytes());d['original_source_authenticated']=True;p.write_text(json.dumps(d));self.reseal()
  with self.assertRaises(AssertionError):self.v.verify()
 def test_unlisted_nested_manifest(self):
  p=self.p/'extra/manifest.json';p.parent.mkdir();p.write_text('{}')
  with self.assertRaisesRegex(AssertionError,'packet manifest'):self.v.verify()
 def test_symlink(self):
  (self.p/'alias').symlink_to(self.p/'summary.json')
  with self.assertRaisesRegex(AssertionError,'symlink'):self.v.verify()
 @unittest.skipUnless(hasattr(os,'mkfifo'),'POSIX FIFO')
 def test_special_file(self):
  os.mkfifo(self.p/'fifo')
  with self.assertRaisesRegex(AssertionError,'special file'):self.v.verify()
 def test_optimized_python(self):
  r=subprocess.run([sys.executable,'-I','-B','-O',str(self.p/'verify.py')],capture_output=True,text=True);self.assertNotEqual(r.returncode,0);self.assertIn('verification requires assertions',r.stderr)
if __name__=='__main__':unittest.main()
