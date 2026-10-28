"""Actual437 data and bounded-range mutations; never executes a target."""
from pathlib import Path
import gzip,hashlib,json,os,shutil,struct,tempfile,unittest
import reader
P=Path(__file__).resolve().parent
R=next(p for p in P.parents if(p/'evidence/original/mayhem/deployed.so').is_file())
class Data(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.original=(R/'evidence/original/mayhem/deployed.so').read_bytes();cls.candidate=reader.inputs(R,'mayhem-current437-composition-20261028')
  cls.prefix,cls.writer,cls.literal=reader.readers(P,R);cls.o,cls.c=cls.prefix.elves(cls.original,cls.candidate)
  cls.cw,_=cls.prefix.q.tables(cls.c);cls.report=reader.inspect(P,R,cls.original,cls.candidate)
 def offset(self,address):
  s=next(s for s in self.c.sections if s['type']!=8 and s['address']<=address<s['address']+s['size']);return s['offset']+address-s['address']
 def copied(self,change,reseal=False):
  with tempfile.TemporaryDirectory()as td:
   p=Path(td)/'packet';shutil.copytree(P,p);change(p)
   if reseal:(p/'manifest.json').write_text(json.dumps({str(f.relative_to(p)):reader.sha(f.read_bytes())for f in p.rglob('*')if f.is_file()and f!=p/'manifest.json'}))
   with self.assertRaises((AssertionError,ValueError)):reader.check(p,R)
 def test_complete_and_expanded_sweep_scope(self):
  r=reader.check(P,R);self.assertEqual(r['selected32']['source_sites'],499);self.assertEqual(r['writer48']['selected_original_sites'],48)
  self.assertTrue(any(bytes.fromhex(x['original']['bytes_hex'])==b'Instruction: SweepFees'for x in self.report['counted_literals']['observations']))
 def test_portable_packet(self):
  with tempfile.TemporaryDirectory()as td:
   p=Path(td)/'packet';shutil.copytree(P,p);self.assertEqual(reader.check(p,R)['counted_literals']['literal_bytes'],575)
 def test_all_added_writer_slots(self):
  records={r['candidate']['address']:r for r in self.report['writer48']['records']};active={tuple(p)for p in self.report['writer48']['active_pairs']};count=0
  for address,row in records.items():
   for slot in (32,40):
    with self.subTest(address=address,slot=slot):
     edge=next(m for m in row['methods']if m['slot']==slot);wrong=next(a for a in self.cw if(edge['original'],a)not in active)
     data=bytearray(self.candidate);struct.pack_into('<Q',data,self.offset(address+slot),wrong<<32)
     got=self.writer.inspect(self.original,bytes(data),R)
     self.assertEqual(got['summary']['normalized_windows'],437);self.assertEqual(got['summary']['base_selected_pairs'],581)
     self.assertNotIn([row['original_owner'],row['candidate_owner']],got['active_pairs']);count+=1
  self.assertEqual(count,10)
 def test_all_counted_literals(self):
  for row in self.report['counted_literals']['observations']:
   with self.subTest(owner=row['original_owner']):
    d=row['candidate'];data=bytearray(self.candidate);data[self.offset(d['pointer']+d['length']//2)]^=1
    got=self.literal.inspect(self.original,bytes(data),R)
    self.assertEqual(got['summary']['normalized_windows'],437);self.assertEqual(got['summary']['base_pairs'],581)
    self.assertNotIn([row['original_owner'],row['candidate_owner']],got['active_pairs'])
 def test_new_sweep_prefix_scalar(self):
  row=next(r for r in self.report['selected32']['prefixes']if r['original']==77200 and r['pair_closed']);data=bytearray(self.candidate);data[self.offset(row['right']['address']+8)]^=1
  got=self.prefix.inspect(self.original,bytes(data));self.assertEqual(got['summary']['normalized_windows'],437);self.assertNotIn([row['original'],row['candidate']],got['active_pairs'])
 def test_new_sweep_source_coordinate(self):
  window=self.cw[77200];ref=next(x for x in window['data_references']if self.prefix.q.source(self.c,x['target']));data=bytearray(self.candidate);data[self.offset(ref['target']+16)]^=1
  got=self.prefix.inspect(self.original,bytes(data));self.assertEqual(got['summary']['normalized_windows'],437);self.assertFalse(any(p[0]==77200 for p in got['active_pairs']))
 def test_code_target_interior_is_rejected(self):
  row=next((r,x)for r in self.report['selected32']['active_pairs']for x in self.cw[r[1]]['data_references']if x['kind']=='code');pair,ref=row;data=bytearray(self.candidate);target=ref['target']+8
  struct.pack_into('<I',data,ref['pc']+4,target&0xffffffff);struct.pack_into('<I',data,ref['pc']+12,target>>32)
  got=self.prefix.inspect(self.original,bytes(data));self.assertEqual(got['summary']['normalized_windows'],437);self.assertNotIn(pair,got['active_pairs'])
 def test_literal_bound_excludes_following_byte(self):
  row=next(x for x in self.report['counted_literals']['observations']if bytes.fromhex(x['original']['bytes_hex'])==b'Instruction: ResetStableDeployed');d=row['candidate'];data=bytearray(self.candidate);data[self.offset(d['pointer']+d['length'])]^=1
  _,image=self.prefix.elves(self.original,bytes(data));w=self.cw[row['candidate_owner']]
  self.assertEqual(self.literal.descriptor(image,w),d)
 def test_unlisted_file(self):self.copied(lambda p:(p/'extra.pyc').write_bytes(b'x'))
 def test_symlink(self):self.copied(lambda p:(p/'alias').symlink_to('inputs.json'))
 def test_fifo(self):self.copied(lambda p:os.mkfifo(p/'pipe'))
 def test_reader_drift_even_after_reseal(self):self.copied(lambda p:(p/'helpers/literals.py').write_bytes((p/'helpers/literals.py').read_bytes()+b'\n# altered\n'),True)
 def test_native_archive_drift_even_after_reseal(self):
  def change(p):
   f=p/'source-context/solana-msg-3.1.0.crate';data=bytearray(f.read_bytes());data[-1]^=1;f.write_bytes(data)
  self.copied(change,True)
if __name__=='__main__':unittest.main(verbosity=2)
