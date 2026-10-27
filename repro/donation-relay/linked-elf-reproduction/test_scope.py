from pathlib import Path
import gzip,hashlib,importlib.util,json,shutil,tempfile,unittest
from unittest.mock import patch
HERE=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('linked_verify',HERE/'verify.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v)
class Tests(unittest.TestCase):
 def changed_candidate(self,change):
  with tempfile.TemporaryDirectory()as tmp:
   folder=Path(tmp);shutil.copytree(HERE,folder,dirs_exist_ok=True);meta=json.loads((folder/'metadata.json').read_bytes());row=meta['variants']['recovered']['artifacts']['candidate'];p=folder/row['path'];raw=change(gzip.decompress(p.read_bytes()));row['sha256']=hashlib.sha256(raw).hexdigest();row['bytes']=len(raw);p.write_bytes(gzip.compress(raw,mtime=0));(folder/'metadata.json').write_text(json.dumps(meta))
   with patch.object(v,'HERE',folder),self.assertRaises(AssertionError):v.analyze()
 def test_changed_instruction_even_after_rehash_is_rejected(self):
  def change(raw):
   rows=v.read(HERE/'analysis/recovered/original-function-ledger.json.gz');f=next(f for f in rows if f['direct_calls']);call=f['direct_calls'][0];parser=v.module('negative_link_call',v.ROOT/'repro/donation-relay/swap-receipt-coordinate-recovery/analyze.py');e=parser.Elf(raw);section=e.by_name['.text'];at=section['offset']+call['pc']-section['address']+4;b=bytearray(raw);b[at]^=1;other=parser.Elf(bytes(b));self.assertEqual(e.function(f['start'],f['bytes'],[])['normalized_sha256'],other.function(f['start'],f['bytes'],[])['normalized_sha256']);return bytes(b)
  self.changed_candidate(change)
 def test_appended_capture_tail_is_rejected(self):self.changed_candidate(lambda b:b+bytes(12168))
 def test_changed_layout_selector_is_rejected(self):
  with tempfile.TemporaryDirectory()as tmp:
   folder=Path(tmp);shutil.copytree(HERE,folder,dirs_exist_ok=True);p=folder/'layout/ordered.ld';p.write_text(p.read_text().replace('.text._ZN','.wrong._ZN',1))
   with patch.object(v,'HERE',folder),self.assertRaises(AssertionError):v.validate_layout()
if __name__=='__main__':unittest.main()
