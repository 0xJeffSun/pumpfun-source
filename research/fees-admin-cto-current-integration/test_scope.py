from pathlib import Path
import importlib.util,tempfile,unittest
from unittest.mock import patch
HERE=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('admin_verify',HERE/'verify.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v)
class Tests(unittest.TestCase):
 def test_composition(self):
  r=v.sources();self.assertEqual(r['origins'],r['repeat']);self.assertEqual(sum(r['control'][n]!=b for n,b in r['origins'].items()),4)
 def test_extra_packet_file_rejected(self):
  with tempfile.TemporaryDirectory()as t:
   p=Path(t);(p/'manifest.json').write_text('{}');(p/'extra').write_text('x')
   with patch.object(v,'HERE',p),self.assertRaises(AssertionError):v.verify()
 def test_changed_root_include_rejected_even_after_rehash(self):
  e=v.read(HERE/'experiment.json');n='programs/pump-fees/src/lib.rs';raw=(HERE/e['variants']['origins']['overrides'][n]).read_bytes()+b'\nfn extra(){}\n';original=v.read
  with tempfile.TemporaryDirectory()as t:
   p=Path(t)/'root.rs';p.write_bytes(raw);e['variants']['origins']['overrides'][n]=str(p);e['variants']['origins']['input_sha256'][n]=v.sha(raw)
   with patch.object(v,'read',side_effect=lambda p:e if p==HERE/'experiment.json'else original(p)),self.assertRaises(AssertionError):v.sources()
if __name__=='__main__':unittest.main()
