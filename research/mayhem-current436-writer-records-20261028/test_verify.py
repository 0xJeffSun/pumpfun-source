"""Real data-pointer and filesystem controls for the 48-byte extension."""
from pathlib import Path
import hashlib,json,os,shutil,struct,tempfile,unittest
import proof
P=Path(__file__).resolve().parent
R=next(p for p in P.parents if(p/'evidence/original/mayhem/deployed.so').is_file())
class Controls(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.original,cls.candidate=proof.inputs(R)
  cls.report=proof.inspect(cls.original,cls.candidate,R)
  cls.base=proof.module('extension_test_base',R/'research/mayhem-current436-selected-prefixes-20261027/reader.py')
  cls.o,cls.c=cls.base.elves(cls.original,cls.candidate)
  cls.cw,_=cls.base.q.tables(cls.c)
  cls.active={tuple(p)for p in cls.report['active_pairs']}
 def test_complete_packet(self):self.assertEqual(proof.check(P,R)['selected_original_records'],5)
 def test_portable_packet(self):
  with tempfile.TemporaryDirectory()as td:
   p=Path(td)/'packet';shutil.copytree(P,p);self.assertEqual(proof.check(p,R)['extended_pairs'],579)
 def test_unlisted_file(self):
  with tempfile.TemporaryDirectory()as td:
   p=Path(td)/'packet';shutil.copytree(P,p);(p/'extra.pyc').write_bytes(b'unbound')
   with self.assertRaisesRegex(AssertionError,'inventory'):proof.check(p,R)
 def test_symlink(self):
  with tempfile.TemporaryDirectory()as td:
   p=Path(td)/'packet';shutil.copytree(P,p);(p/'link').symlink_to('README.md')
   with self.assertRaisesRegex(AssertionError,'symlink'):proof.check(p,R)
 def test_fifo(self):
  with tempfile.TemporaryDirectory()as td:
   p=Path(td)/'packet';shutil.copytree(P,p);os.mkfifo(p/'fifo')
   with self.assertRaisesRegex(AssertionError,'special'):proof.check(p,R)
 def test_every_added_method_pointer(self):
  records={r['candidate']['address']:r for r in self.report['records']};count=0
  for address,row in records.items():
   for slot in (32,40):
    with self.subTest(address=address,slot=slot):
     method=next(m for m in row['methods']if m['slot']==slot)
     wrong=next(a for a in self.cw if(method['original'],a)not in self.active)
     sec=next(s for s in self.c.sections if s['address']<=address and address+48<=s['address']+s['size']and s['type']!=8)
     data=bytearray(self.candidate);struct.pack_into('<Q',data,sec['offset']+address-sec['address']+slot,wrong<<32)
     changed=proof.inspect(self.original,bytes(data),R)
     self.assertEqual(changed['summary']['normalized_windows'],436)
     self.assertEqual(changed['summary']['base_selected_pairs'],579)
     self.assertNotIn([row['original_owner'],row['candidate_owner']],changed['active_pairs']);count+=1
  self.assertEqual(count,10)
 def test_added_method_relocation(self):
  row=self.report['records'][0];address=row['candidate']['address'];rel=self.c.rel[address+40]
  data=bytearray(self.candidate);old=struct.unpack_from('<Q',data,rel['record_offset']+8)[0];struct.pack_into('<Q',data,rel['record_offset']+8,(old&~0xffffffff)|1)
  changed=proof.inspect(self.original,bytes(data),R)
  self.assertEqual(changed['summary']['base_selected_pairs'],579)
  self.assertNotIn([row['original_owner'],row['candidate_owner']],changed['active_pairs'])
 def test_source_context_tamper_after_reseal(self):
  with tempfile.TemporaryDirectory()as td:
   p=Path(td)/'packet';shutil.copytree(P,p);source=p/'source-context/core-fmt.rs';source.write_text(source.read_text().replace('fn write_char(','fn wrong_char(',1))
   (p/'manifest.json').write_text(json.dumps({str(f.relative_to(p)):hashlib.sha256(f.read_bytes()).hexdigest()for f in p.rglob('*')if f.is_file()and f!=p/'manifest.json'}))
   with self.assertRaises(AssertionError):proof.check(p,R)
if __name__=='__main__':unittest.main(verbosity=2)
