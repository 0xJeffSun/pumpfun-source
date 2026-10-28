from pathlib import Path
import copy,gzip,json,os,shutil,struct,tempfile,unittest
import proof
P=Path(__file__).resolve().parent
R=next(p for p in P.parents if(p/'evidence/original/mayhem/deployed.so').is_file())
class ErrorKind(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.previous=proof.prior(R);cls.data=cls.previous.prior(R).prior(R).base_reader(R)
  cls.original=(R/'evidence/original/mayhem/deployed.so').read_bytes();cls.candidate=cls.data.inputs(R,'mayhem-current437-composition-20261028')
  cls.names=cls.previous.prior(R).prior(R);cls.prefix,_,_=cls.data.readers(R/cls.names.BASE,R)
  cls.o,cls.c=cls.prefix.elves(cls.original,cls.candidate);cls.cw,_=cls.prefix.q.tables(cls.c)
  cls.report=proof.inspect(P,cls.original,cls.candidate,R);cls.rows=cls.report['observations'];cls.owner=cls.rows[0]['candidate_owner'];cls.window=cls.cw[cls.owner];cls.decoded=proof.decoder(cls.c,cls.window)
 def elf(self,b):e=copy.copy(self.c);e.b=bytes(b);return e
 def offset(self,address):
  s=next(s for s in self.c.sections if s['type']!=8 and s['address']<=address<s['address']+s['size']);return s['offset']+address-s['address']
 def mutate(self,row,kind):
  d=row['candidate'];b=bytearray(self.candidate)
  if kind=='byte':b[self.offset(d['pointer'])]^=1
  elif kind=='length':struct.pack_into('<Q',b,self.offset(d['length_slot']),d['length']+1)
  elif kind=='pointer':struct.pack_into('<Q',b,self.offset(d['pointer_slot']),(d['pointer']+1)<<32)
  return b
 def test_complete(self):
  r=proof.check(P,R);self.assertEqual((r['selected_entries'],r['literal_bytes']),(42,542))
 def test_every_string_length_and_pointer(self):
  for row in self.rows:
   for kind in('byte','length','pointer'):
    with self.subTest(index=row['index'],kind=kind):
     got=proof.entry(self.elf(self.mutate(row,kind)),self.decoded,row['index']);self.assertNotEqual(got['bytes_hex'],row['name'].encode().hex())
 def test_relation_prunes_each_mutation_type(self):
  for kind in('byte','length','pointer'):
   with self.subTest(kind=kind):
    got=proof.inspect(P,self.original,bytes(self.mutate(self.rows[0],kind)),R)
    self.assertEqual((got['summary']['normalized_windows'],got['summary']['base_pairs']),(437,581));self.assertNotIn([proof.OWNER,self.owner],got['active_pairs']);self.assertGreater(got['summary']['rejected_pairs'],0)
 def test_index_42_is_rejected_before_read(self):
  with self.assertRaises(AssertionError):proof.entry(self.c,self.decoded,42)
  with self.assertRaises(AssertionError):proof.entry(self.c,self.decoded,-1)
 def test_width_shift_and_count_register(self):
  for offset,value in((8,0x79),(20,4),(81,0x32)):
   with self.subTest(offset=offset):
    b=bytearray(self.candidate)
    if offset==20:struct.pack_into('<i',b,self.owner+offset,value)
    else:b[self.owner+offset]=value
    with self.assertRaises(AssertionError):proof.decoder(self.elf(b),self.window)
 def test_pointer_zero_word(self):
  d=self.rows[0]['candidate'];b=bytearray(self.candidate);b[self.offset(d['pointer_slot'])]=1
  with self.assertRaises(AssertionError):proof.entry(self.elf(b),self.decoded,0)
 def test_pointer_relocation_type_and_symbol(self):
  d=self.rows[0]['candidate'];rel=self.c.rel[d['pointer_slot']]
  for delta,value in((8,9),(12,1)):
   with self.subTest(delta=delta):
    b=bytearray(self.candidate);struct.pack_into('<I',b,rel['record_offset']+delta,value);_,e=self.prefix.elves(self.original,bytes(b))
    with self.assertRaises(AssertionError):proof.entry(e,self.decoded,0)
 def test_beyond_selected_tables_is_unclaimed(self):
  for key in('length_table','pointer_table'):
   with self.subTest(table=key):
    b=bytearray(self.candidate);b[self.offset(self.decoded[key]+42*8)]^=1;e=self.elf(b)
    self.assertEqual([proof.entry(e,self.decoded,i)for i in range(42)],[r['candidate']for r in self.rows])
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
 def test_resealed_source(self):self.copied(lambda p:(p/'source-context/error.rs').write_bytes((p/'source-context/error.rs').read_bytes()+b'\n//changed\n'),True)
if __name__=='__main__':unittest.main(verbosity=2)
