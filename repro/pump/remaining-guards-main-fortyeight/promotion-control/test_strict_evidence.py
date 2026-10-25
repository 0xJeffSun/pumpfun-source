"""Filesystem-verifier unit checks only; no program/VM/case fixture."""
from pathlib import Path
import tempfile,json,hashlib,unittest
from strict_evidence import strict_package
class Strict(unittest.TestCase):
 def setUp(self):
  self.temp=tempfile.TemporaryDirectory();self.root=Path(self.temp.name).resolve();self.p=self.root/'packet';self.p.mkdir();(self.p/'payload').write_bytes(b'x');m={'payload':{'sha256':hashlib.sha256(b'x').hexdigest(),'bytes':1}};(self.p/'manifest.json').write_text(json.dumps(m));self.seal=hashlib.sha256((self.p/'manifest.json').read_bytes()).hexdigest();(self.p/'manifest.sha256').write_text(self.seal+'  manifest.json\n')
 def tearDown(self):self.temp.cleanup()
 def test_valid(self):strict_package(self.p,self.seal)
 def test_wrong_external_seal(self):
  with self.assertRaises(AssertionError):strict_package(self.p,'0'*64)
 def test_unrecorded_empty_directory(self):
  (self.p/'extra').mkdir()
  with self.assertRaises(AssertionError):strict_package(self.p,self.seal)
 def test_cache_directory(self):
  (self.p/'__pycache__').mkdir()
  with self.assertRaises(AssertionError):strict_package(self.p,self.seal)
 def test_symlink_ancestor(self):
  (self.root/'alias').symlink_to(self.p,target_is_directory=True)
  with self.assertRaises(AssertionError):strict_package(self.root/'alias',self.seal)
 def test_symlink_payload(self):
  (self.root/'outside').write_bytes(b'x');(self.p/'payload').unlink();(self.p/'payload').symlink_to(self.root/'outside')
  with self.assertRaises(AssertionError):strict_package(self.p,self.seal)
 def test_sidecar(self):
  (self.p/'manifest.sha256').write_text(self.seal+'  other\n')
  with self.assertRaises(AssertionError):strict_package(self.p,self.seal)
if __name__=='__main__':unittest.main()
