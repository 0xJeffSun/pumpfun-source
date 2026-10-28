from pathlib import Path
import hashlib,json,os,shutil,struct,tempfile,unittest
import proof
P=Path(__file__).resolve().parent
R=next(p for p in P.parents if(p/'evidence/original/mayhem/deployed.so').is_file())
class Controls(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.original,cls.candidate=proof.inputs(R);cls.report=proof.inspect(cls.original,cls.candidate,R)
  base=proof.module('literal_test_base',R/'research/mayhem-current436-selected-prefixes-20261027/reader.py');cls.o,cls.c=base.elves(cls.original,cls.candidate)
 def test_complete_packet(self):self.assertEqual(proof.check(P,R)['literal_bytes'],553)
 def test_portable_packet(self):
  with tempfile.TemporaryDirectory()as td:
   p=Path(td)/'packet';shutil.copytree(P,p);self.assertEqual(proof.check(p,R)['literal_pairs'],579)
 def test_every_counted_literal(self):
  for row in self.report['observations']:
   with self.subTest(owner=row['original_owner']):
    d=row['candidate'];address=d['pointer']+d['length']//2
    sec=next(s for s in self.c.sections if s['type']!=8 and s['address']<=address<s['address']+s['size'])
    data=bytearray(self.candidate);data[sec['offset']+address-sec['address']]^=1
    changed=proof.inspect(self.original,bytes(data),R)
    self.assertEqual(changed['summary']['base_pairs'],579)
    self.assertEqual(changed['summary']['normalized_windows'],436)
    self.assertNotIn([row['original_owner'],row['candidate_owner']],changed['active_pairs'])
 def test_redirected_literal_pointer(self):
  row=self.report['observations'][0];target=self.report['observations'][1]['candidate']['pointer'];at=row['candidate_owner']+row['candidate']['lddw_offset']
  data=bytearray(self.candidate);struct.pack_into('<I',data,at+4,target&0xffffffff);struct.pack_into('<I',data,at+12,target>>32)
  changed=proof.inspect(self.original,bytes(data),R);self.assertEqual(changed['summary']['base_pairs'],579)
  self.assertNotIn([row['original_owner'],row['candidate_owner']],changed['active_pairs'])
 def test_byte_outside_counted_interval_is_not_counted(self):
  row=next(r for r in self.report['observations']if bytes.fromhex(r['original']['bytes_hex'])==b'Instruction: ResetStableDeployed')
  d=row['candidate'];address=d['pointer']+d['length'];sec=next(s for s in self.c.sections if s['type']!=8 and s['address']<=address<s['address']+s['size'])
  data=bytearray(self.candidate);data[sec['offset']+address-sec['address']]^=1
  base=proof.module('outside_base',R/'research/mayhem-current436-selected-prefixes-20261027/reader.py');_,image=base.elves(self.original,bytes(data));window=image.window(row['candidate_owner'],row['candidate_owner']+next(w['bytes']for w in json.loads((base.M/'original-windows.json').read_bytes())if w['start']==row['original_owner']))
  self.assertEqual(proof.descriptor(image,window),d)
 def test_source_archive_corruption_after_reseal(self):
  with tempfile.TemporaryDirectory()as td:
   p=Path(td)/'packet';shutil.copytree(P,p);f=p/'source-context/solana-msg-3.1.0.crate';data=bytearray(f.read_bytes());data[-1]^=1;f.write_bytes(data)
   (p/'manifest.json').write_text(json.dumps({str(f.relative_to(p)):hashlib.sha256(f.read_bytes()).hexdigest()for f in p.rglob('*')if f.is_file()and f!=p/'manifest.json'}))
   with self.assertRaises(AssertionError):proof.check(p,R)
 def test_unlisted_file(self):
  with tempfile.TemporaryDirectory()as td:
   p=Path(td)/'packet';shutil.copytree(P,p);(p/'extra.pyc').write_bytes(b'x')
   with self.assertRaisesRegex(AssertionError,'inventory'):proof.check(p,R)
 def test_symlink(self):
  with tempfile.TemporaryDirectory()as td:
   p=Path(td)/'packet';shutil.copytree(P,p);(p/'link').symlink_to('README.md')
   with self.assertRaisesRegex(AssertionError,'symlink'):proof.check(p,R)
 def test_fifo(self):
  with tempfile.TemporaryDirectory()as td:
   p=Path(td)/'packet';shutil.copytree(P,p);os.mkfifo(p/'fifo')
   with self.assertRaisesRegex(AssertionError,'special'):proof.check(p,R)
if __name__=='__main__':unittest.main(verbosity=2)
