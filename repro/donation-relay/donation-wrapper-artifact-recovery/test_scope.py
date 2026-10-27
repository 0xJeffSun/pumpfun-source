"""Negative control against accepting corrupted bytes after rehashing metadata."""
from pathlib import Path
import gzip,hashlib,importlib.util,json,shutil,tempfile,unittest
from unittest.mock import patch
HERE=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('wrapper_verify',HERE/'verify.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v)
class Tests(unittest.TestCase):
 def test_wrapper_raw_matches_are_explicit(self):
  rows=json.loads((HERE/'analysis/recovered/match-ledger.json').read_bytes())
  for i in [92,93,94,95]:self.assertEqual(rows[i]['raw_candidate_indices'],[i])
 def test_rehashed_mutation_still_fails_comparison(self):
  meta=json.loads((HERE/'metadata.json').read_bytes())
  with tempfile.TemporaryDirectory()as temp:
   d=Path(temp);shutil.copytree(HERE,d,dirs_exist_ok=True)
   row=meta['variants']['recovered']['artifacts']['candidate'];file=d/row['path'];raw=bytearray(gzip.decompress(file.read_bytes()))
   parser=v.module('negative_wrapper_parser',v.ROOT/'repro/donation-relay/swap-receipt-coordinate-recovery/analyze.py');elf=parser.Elf(bytes(raw));section=elf.by_name['.text'];at=section['offset']+70200-section['address'];raw[at+1]^=1
   row['sha256']=hashlib.sha256(raw).hexdigest();file.write_bytes(gzip.compress(raw,mtime=0));(d/'metadata.json').write_text(json.dumps(meta))
   with patch.object(v,'HERE',d),self.assertRaises(AssertionError):v.analyze()
if __name__=='__main__':unittest.main()
