from pathlib import Path
import importlib.util,json,tempfile,unittest
from unittest.mock import patch
HERE=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('visibility_verify',HERE/'verify.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v)
class Tests(unittest.TestCase):
 def test_only_visibility_changed(self):
  src=v.sources();a,b=src['control'],src['origins'];self.assertEqual([n for n in a if a[n]!=b[n]],['programs/pump-fees/src/lib.rs'])
 def test_semantic_edit_rejected_after_rehash(self):
  e=v.read(HERE/'experiment.json');data=v.sources();name='programs/pump-fees/src/lib.rs'
  with tempfile.TemporaryDirectory()as tmp:
   d=Path(tmp);p=d/'edit.rs';raw=data['origins'][name]+b'\nfn extra() {}\n';p.write_bytes(raw);e['variants']['origins']['overrides'][name]=str(p);e['variants']['origins']['input_sha256'][name]=v.sha(raw);original=v.read
   with patch.object(v,'read',side_effect=lambda p:e if p==HERE/'experiment.json'else original(p)),self.assertRaises(AssertionError):v.sources()
 def test_manifest_extra_rejected(self):
  with tempfile.TemporaryDirectory()as tmp:
   d=Path(tmp);(d/'manifest.json').write_text('{}');(d/'unexpected').write_text('x')
   with patch.object(v,'HERE',d),self.assertRaises(AssertionError):v.verify()
if __name__=='__main__':unittest.main()
