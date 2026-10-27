from pathlib import Path
import copy,importlib.util,tempfile,unittest
from unittest.mock import patch
HERE=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('cpi_verify',HERE/'verify.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v)
a=v.module('cpi_analysis_tests',HERE/'analyze.py')
class Tests(unittest.TestCase):
 def test_source_maps(self):self.assertEqual(len(v.sources()),13)
 def test_copy_mapping(self):
  p=v.read(HERE/'analysis.json.gz')['copy_proofs']['235304'];self.assertEqual(a.copy_effect(p['original']),a.copy_effect(p['candidate']))
 def test_changed_copy_load(self):
  p=copy.deepcopy(v.read(HERE/'analysis.json.gz')['copy_proofs']['235304']['candidate']);p[0]['displacement']=24
  with self.assertRaises(AssertionError):a.copy_effect(p)
 def test_changed_copy_store(self):
  p=copy.deepcopy(v.read(HERE/'analysis.json.gz')['copy_proofs']['235304']['candidate']);p[3]['source']=p[4]['source'];self.assertNotEqual(a.copy_effect(p),{0:0,8:8,16:16})
 def test_extra_packet_file(self):
  with tempfile.TemporaryDirectory()as t:
   d=Path(t);(d/'manifest.json').write_text('{}');(d/'extra').write_text('x')
   with patch.object(v,'HERE',d),self.assertRaises(AssertionError):v.verify()
if __name__=='__main__':unittest.main()
