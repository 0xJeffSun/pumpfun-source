"""Corrupt actual image strings, descriptors and selection operands."""
from pathlib import Path
import copy,gzip,json,os,shutil,struct,tempfile,unittest
import proof
P=Path(__file__).resolve().parent
R=next(p for p in P.parents if(p/'evidence/original/mayhem/deployed.so').is_file())
class Display(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.names=proof.prior(R);cls.data=cls.names.base_reader(R)
  cls.original=(R/'evidence/original/mayhem/deployed.so').read_bytes();cls.candidate=cls.data.inputs(R,'mayhem-current437-composition-20261028')
  cls.prefix,_,_=cls.data.readers(R/cls.names.BASE,R);cls.o,cls.c=cls.prefix.elves(cls.original,cls.candidate);cls.cw,_=cls.prefix.q.tables(cls.c)
  cls.report=proof.inspect(cls.original,cls.candidate,R);cls.rows=cls.report['observations'];cls.owner=cls.rows[0]['candidate_owner'];cls.window=cls.cw[cls.owner];cls.decoded=proof.instructions(cls.c,cls.window)
 def offset(self,address):
  s=next(s for s in self.c.sections if s['type']!=8 and s['address']<=address<s['address']+s['size']);return s['offset']+address-s['address']
 def elf(self,b):e=copy.copy(self.c);e.b=bytes(b);return e
 def mutate(self,row,kind):
  d=row['candidate'];b=bytearray(self.candidate)
  if kind=='byte':b[self.offset(d['pointer'])]^=1
  elif kind=='length':struct.pack_into('<Q',b,self.offset(d['descriptor']+8),d['length']+1)
  elif kind=='data_pointer':struct.pack_into('<Q',b,self.offset(d['descriptor']),(d['pointer']+1)<<32)
  elif kind=='selection_pointer':
   target=next(x['candidate']['descriptor']for x in self.rows if x['candidate']['descriptor']!=d['descriptor']);pc=self.owner+d['pointer_offset'];struct.pack_into('<I',b,pc+4,target&0xffffffff);struct.pack_into('<I',b,pc+12,target>>32)
  return b
 def test_complete(self):
  s=proof.check(P,R);self.assertEqual((s['literal_bytes'],s['descriptor_records']),(3568,77))
 def test_every_byte_length_and_both_pointer_levels(self):
  for row in self.rows:
   for kind in('byte','length','data_pointer','selection_pointer'):
    with self.subTest(tag=row['tag'],kind=kind):
     e=self.elf(self.mutate(row,kind));d=proof.instructions(e,self.window)if kind=='selection_pointer'else self.decoded
     t=proof.trace(e,self.window,d,row['tag']);self.assertNotEqual(t['bytes_hex'],row['message'].encode().hex())
 def test_full_relation_rejects_each_mutation_kind(self):
  for kind in('byte','length','data_pointer','selection_pointer'):
   with self.subTest(kind=kind):
    r=proof.inspect(self.original,bytes(self.mutate(self.rows[0],kind)),R)
    self.assertEqual((r['summary']['normalized_windows'],r['summary']['base_pairs']),(437,581))
    self.assertNotIn([proof.OWNER,self.owner],r['active_pairs']);self.assertGreater(r['summary']['rejected_pairs'],0)
 def test_piece_count_and_argument_count_are_fixed(self):
  for shift in(16,24):
   with self.subTest(shift=shift):
    b=bytearray(self.candidate);struct.pack_into('<i',b,self.decoded[1]+shift+4,2)
    with self.assertRaises(AssertionError):proof.instructions(self.elf(b),self.window)
 def test_descriptor_zero_word_is_required(self):
  d=self.rows[0]['candidate'];b=bytearray(self.candidate);b[self.offset(d['descriptor'])]=1
  with self.assertRaises(AssertionError):proof.counted_descriptor(self.elf(b),d['descriptor'])
 def test_descriptor_relocation_type_is_required(self):
  d=self.rows[0]['candidate'];b=bytearray(self.candidate);rel=self.c.rel[d['descriptor']];struct.pack_into('<I',b,rel['record_offset']+8,9)
  _,e=self.prefix.elves(self.original,bytes(b))
  with self.assertRaises(AssertionError):proof.counted_descriptor(e,d['descriptor'])
 def test_descriptor_relocation_symbol_is_required(self):
  d=self.rows[0]['candidate'];b=bytearray(self.candidate);rel=self.c.rel[d['descriptor']];struct.pack_into('<I',b,rel['record_offset']+12,1)
  _,e=self.prefix.elves(self.original,bytes(b))
  with self.assertRaises(AssertionError):proof.counted_descriptor(e,d['descriptor'])
 def test_following_byte_is_excluded(self):
  row=max(self.rows,key=lambda r:r['candidate']['pointer']+r['candidate']['length']);d=row['candidate'];b=bytearray(self.candidate);b[self.offset(d['pointer']+d['length'])]^=1
  self.assertEqual(proof.trace(self.elf(b),self.window,self.decoded,row['tag']),d)
 def test_consumer_length_load_and_callback_register(self):
  row=self.report['consumer_paths'][0]['candidate'];start=row['start'];w=self.cw[start]
  for offset,field,value in((912,2,0),(952,4,3)):
   with self.subTest(offset=offset):
    b=bytearray(self.candidate)
    if field==2:struct.pack_into('<h',b,start+offset+field,value)
    else:struct.pack_into('<i',b,start+offset+field,value)
    with self.assertRaises(AssertionError):proof.consumer(self.elf(b),w)
 def copied(self,change,reseal=False):
  with tempfile.TemporaryDirectory()as td:
   p=Path(td)/'packet';shutil.copytree(P,p);change(p)
   if reseal:(p/'manifest.json').write_text(json.dumps({str(f.relative_to(p)):proof.sha(f.read_bytes())for f in p.rglob('*')if f.is_file()and f!=p/'manifest.json'}))
   with self.assertRaises((AssertionError,ValueError)):proof.check(p,R)
 def test_unlisted_file(self):self.copied(lambda p:(p/'extra').write_bytes(b'x'))
 def test_symlink(self):self.copied(lambda p:(p/'alias').symlink_to('inputs.json'))
 def test_fifo(self):self.copied(lambda p:os.mkfifo(p/'pipe'))
 def test_report_tamper_after_reseal(self):
  def change(p):
   q=json.loads(gzip.decompress((p/'observations.json.gz').read_bytes()));q['observations'][0]['candidate']['length']+=1;(p/'observations.json.gz').write_bytes(gzip.compress(json.dumps(q).encode(),mtime=0))
  self.copied(change,True)
 def test_coverage_tamper_after_reseal(self):
  def change(p):
   q=json.loads((p/'coverage-delta.json').read_bytes());q['new_payload_bytes']+=1;(p/'coverage-delta.json').write_text(json.dumps(q))
  self.copied(change,True)
if __name__=='__main__':unittest.main(verbosity=2)
