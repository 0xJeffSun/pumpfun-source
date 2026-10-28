from pathlib import Path
import copy,gzip,json,os,shutil,struct,tempfile,unittest
import proof
P=Path(__file__).resolve().parent
R=next(p for p in P.parents if(p/'evidence/original/mayhem/deployed.so').is_file())
class ProgramError(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.previous=proof.prior(R);cls.names=cls.previous.prior(R);cls.data=cls.names.base_reader(R)
  cls.original=(R/'evidence/original/mayhem/deployed.so').read_bytes();cls.candidate=cls.data.inputs(R,'mayhem-current437-composition-20261028')
  cls.prefix,_,_=cls.data.readers(R/cls.names.BASE,R);cls.o,cls.c=cls.prefix.elves(cls.original,cls.candidate);cls.cw,_=cls.prefix.q.tables(cls.c)
  cls.report=proof.inspect(P,cls.original,cls.candidate,R);cls.rows=cls.report['observations'];cls.owner=cls.rows[0]['candidate_owner'];cls.window=cls.cw[cls.owner]
 def elf(self,b):e=copy.copy(self.c);e.b=bytes(b);return e
 def offset(self,address):
  s=next(s for s in self.c.sections if s['type']!=8 and s['address']<=address<s['address']+s['size']);return s['offset']+address-s['address']
 def mutate(self,row,kind):
  d=row['candidate'];b=bytearray(self.candidate)
  if kind=='byte':b[self.offset(d['pointer'])]^=1
  elif kind=='length':struct.pack_into('<i',b,self.owner+d['length_offset']+4,d['length']+1)
  elif kind=='pointer':
   pc=self.owner+d['pointer_offset'];pointer=d['pointer']+1;struct.pack_into('<I',b,pc+4,pointer&0xffffffff);struct.pack_into('<I',b,pc+12,pointer>>32)
  return b
 def test_complete(self):
  self.assertEqual(proof.check(P,R)['literal_bytes'],1105)
 def test_all_literal_bytes_counts_and_pointers(self):
  for row in self.rows:
   for kind in('byte','length','pointer'):
    with self.subTest(tag=row['observed_tag'],kind=kind):
     t=proof.trace(self.elf(self.mutate(row,kind)),self.window,row['observed_tag']);self.assertNotEqual(t['bytes_hex'],row['message'].encode().hex())
 def test_byte_and_pointer_remove_owner_and_dependents(self):
  for kind in('byte','pointer'):
   with self.subTest(kind=kind):
    r=proof.inspect(P,self.original,bytes(self.mutate(self.rows[0],kind)),R)
    self.assertEqual((r['summary']['normalized_windows'],r['summary']['base_pairs']),(437,581))
    self.assertNotIn([proof.OWNER,self.owner],r['active_pairs']);self.assertGreater(r['summary']['rejected_pairs'],0)
 def test_length_changes_normalized_body(self):
  r=proof.inspect(P,self.original,bytes(self.mutate(self.rows[0],'length')),R)
  self.assertEqual(r['summary']['normalized_windows'],436);self.assertNotIn([proof.OWNER,self.owner],r['active_pairs'])
 def test_custom_tag_is_excluded(self):
  with self.assertRaises(AssertionError):proof.trace(self.c,self.window,0)
 def test_writer_slot_and_callback_register(self):
  a=self.rows[0]['candidate']['call_target'];w=self.cw[a]
  for offset,width,value in((18,'h',16),(36,'i',4)):
   with self.subTest(offset=offset):
    b=bytearray(self.candidate);struct.pack_into('<'+width,b,a+offset,value)
    with self.assertRaises(AssertionError):proof.writer(self.elf(b),w)
 def test_after_bound_is_excluded(self):
  row=max(self.rows,key=lambda x:x['candidate']['pointer']+x['candidate']['length']);d=row['candidate'];b=bytearray(self.candidate);b[self.offset(d['pointer']+d['length'])]^=1
  self.assertEqual(proof.trace(self.elf(b),self.window,row['observed_tag']),d)
 def copied(self,change,reseal=False):
  with tempfile.TemporaryDirectory()as td:
   p=Path(td)/'packet';shutil.copytree(P,p);change(p)
   if reseal:(p/'manifest.json').write_text(json.dumps({str(f.relative_to(p)):proof.sha(f.read_bytes())for f in p.rglob('*')if f.is_file()and f!=p/'manifest.json'}))
   with self.assertRaises((AssertionError,ValueError)):proof.check(p,R)
 def test_unlisted_file(self):self.copied(lambda p:(p/'extra').write_bytes(b'x'))
 def test_symlink(self):self.copied(lambda p:(p/'alias').symlink_to('inputs.json'))
 def test_fifo(self):self.copied(lambda p:os.mkfifo(p/'pipe'))
 def test_resealed_report(self):
  def change(p):
   r=json.loads(gzip.decompress((p/'observations.json.gz').read_bytes()));r['observations'][0]['candidate']['length']+=1;(p/'observations.json.gz').write_bytes(gzip.compress(json.dumps(r).encode(),mtime=0))
  self.copied(change,True)
 def test_resealed_coverage(self):
  def change(p):
   r=json.loads((p/'coverage-delta.json').read_bytes());r['new_payload_bytes']+=1;(p/'coverage-delta.json').write_text(json.dumps(r))
  self.copied(change,True)
 def test_resealed_native_archive(self):
  def change(p):
   f=p/'source-context/solana-program-error-3.0.1.crate';b=bytearray(f.read_bytes());b[-1]^=1;f.write_bytes(b)
  self.copied(change,True)
if __name__=='__main__':unittest.main(verbosity=2)
