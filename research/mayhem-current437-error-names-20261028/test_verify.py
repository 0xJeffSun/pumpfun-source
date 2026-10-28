"""Actual image corruption controls for the bounded ErrorCode-name proof."""
from pathlib import Path
import copy,gzip,json,os,shutil,struct,tempfile,unittest
import proof
P=Path(__file__).resolve().parent
R=next(p for p in P.parents if(p/'evidence/original/mayhem/deployed.so').is_file())
class Names(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.base=proof.base_reader(R);cls.original=(R/'evidence/original/mayhem/deployed.so').read_bytes();cls.candidate=cls.base.inputs(R,'mayhem-current437-composition-20261028')
  cls.prefix,_,_=cls.base.readers(R/proof.BASE,R);cls.o,cls.c=cls.prefix.elves(cls.original,cls.candidate)
  cls.cw,_=cls.prefix.q.tables(cls.c);cls.report=proof.inspect(cls.original,cls.candidate,R)
  cls.rows=cls.report['observations'];cls.owner=cls.rows[0]['candidate_owner'];cls.window=cls.cw[cls.owner]
  cls.decoded=proof.instructions(cls.c,cls.window)
 def offset(self,address):
  s=next(s for s in self.c.sections if s['type']!=8 and s['address']<=address<s['address']+s['size']);return s['offset']+address-s['address']
 def elf(self,data):
  e=copy.copy(self.c);e.b=bytes(data);return e
 def mutate(self,row,kind):
  d=row['candidate'];b=bytearray(self.candidate)
  if kind=='byte':b[self.offset(d['pointer'])]^=1
  elif kind=='length':struct.pack_into('<i',b,self.owner+d['length_offset']+4,d['length']+1)
  elif kind=='pointer':
   at=self.owner+d['pointer_offset'];ptr=d['pointer']+1;struct.pack_into('<I',b,at+4,ptr&0xffffffff);struct.pack_into('<I',b,at+12,ptr>>32)
  return b
 def test_complete_and_all_source_paths(self):
  self.assertEqual(proof.check(P,R)['literal_bytes'],2010)
  self.assertEqual(len(self.rows),77);self.assertTrue(all(r['owner_closed']for r in self.rows))
 def test_all_literal_bytes(self):
  for row in self.rows:
   with self.subTest(tag=row['tag']):
    e=self.elf(self.mutate(row,'byte'));t=proof.trace(e,self.window,self.decoded,row['tag'])
    self.assertNotEqual(t['bytes_hex'],row['name'].encode().hex())
 def test_all_pointer_operands(self):
  for row in self.rows:
   with self.subTest(tag=row['tag']):
    e=self.elf(self.mutate(row,'pointer'));t=proof.trace(e,self.window,proof.instructions(e,self.window),row['tag'])
    self.assertEqual(t['pointer'],row['candidate']['pointer']+1);self.assertNotEqual(t['bytes_hex'],row['name'].encode().hex())
 def test_all_length_operands(self):
  for row in self.rows:
   with self.subTest(tag=row['tag']):
    e=self.elf(self.mutate(row,'length'));t=proof.trace(e,self.window,proof.instructions(e,self.window),row['tag'])
    self.assertEqual(t['length'],len(row['name'])+1);self.assertNotEqual(t['bytes_hex'],row['name'].encode().hex())
 def test_byte_and_pointer_reject_owner_and_dependents(self):
  for kind in ('byte','pointer'):
   with self.subTest(kind=kind):
    result=proof.inspect(self.original,bytes(self.mutate(self.rows[0],kind)),R)
    self.assertEqual(result['summary']['normalized_windows'],437)
    self.assertEqual(result['summary']['base_pairs'],581)
    self.assertNotIn([proof.ORIGINAL_OWNER,self.owner],result['active_pairs'])
    self.assertGreater(result['summary']['rejected_pairs'],0)
 def test_length_changes_normalized_body_and_excludes_owner(self):
  result=proof.inspect(self.original,bytes(self.mutate(self.rows[0],'length')),R)
  self.assertEqual(result['summary']['normalized_windows'],436)
  self.assertNotIn([proof.ORIGINAL_OWNER,self.owner],result['active_pairs'])
 def test_after_bound_is_not_part_of_literal(self):
  row=self.rows[-1];d=row['candidate'];b=bytearray(self.candidate);b[self.offset(d['pointer']+d['length'])]^=1
  self.assertEqual(proof.trace(self.elf(b),self.window,self.decoded,row['tag']),d)
 def test_unsupported_instruction_rejected(self):
  b=bytearray(self.candidate);b[self.owner]=0xbf
  with self.assertRaises(AssertionError):proof.instructions(self.elf(b),self.window)
 def copied(self,change,reseal=False):
  with tempfile.TemporaryDirectory()as td:
   p=Path(td)/'packet';shutil.copytree(P,p);change(p)
   if reseal:(p/'manifest.json').write_text(json.dumps({str(f.relative_to(p)):proof.sha(f.read_bytes())for f in p.rglob('*')if f.is_file()and f!=p/'manifest.json'}))
   with self.assertRaises((AssertionError,ValueError)):proof.check(p,R)
 def test_unlisted_file(self):self.copied(lambda p:(p/'extra').write_bytes(b'x'))
 def test_symlink(self):self.copied(lambda p:(p/'alias').symlink_to('inputs.json'))
 def test_fifo(self):self.copied(lambda p:os.mkfifo(p/'pipe'))
 def test_report_change_rejected_after_reseal(self):
  def change(p):
   q=json.loads(gzip.decompress((p/'observations.json.gz').read_bytes()));q['observations'][0]['candidate']['length']+=1
   (p/'observations.json.gz').write_bytes(gzip.compress(json.dumps(q).encode(),mtime=0))
  self.copied(change,True)
 def test_coverage_change_rejected_after_reseal(self):
  def change(p):
   q=json.loads((p/'coverage-delta.json').read_bytes());q['new_rodata_bytes']+=1
   (p/'coverage-delta.json').write_text(json.dumps(q))
  self.copied(change,True)
if __name__=='__main__':unittest.main(verbosity=2)
