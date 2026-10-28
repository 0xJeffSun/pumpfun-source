from pathlib import Path
import copy,gzip,json,os,shutil,struct,tempfile,unittest
import proof
P=Path(__file__).resolve().parent
R=next(p for p in P.parents if(p/'evidence/original/mayhem/deployed.so').is_file())
class Printable(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.previous=proof.prior(R);cls.names=cls.previous.prior(R).prior(R).prior(R);cls.data=cls.names.base_reader(R)
  cls.original=(R/'evidence/original/mayhem/deployed.so').read_bytes();cls.candidate=cls.data.inputs(R,'mayhem-current437-composition-20261028')
  cls.prefix,_,_=cls.data.readers(R/cls.names.BASE,R);cls.o,cls.c=cls.prefix.elves(cls.original,cls.candidate);cls.cw,_=cls.prefix.q.tables(cls.c)
  cls.report=proof.inspect(P,cls.original,cls.candidate,R);cls.rows=cls.report['observations'];cls.owner=cls.rows[0]['candidate_owner'];cls.window=cls.cw[cls.owner]
 def elf(self,b):e=copy.copy(self.c);e.b=bytes(b);return e
 def offset(self,address):
  s=next(s for s in self.c.sections if s['type']!=8 and s['address']<=address<s['address']+s['size']);return s['offset']+address-s['address']
 def mutate(self,row,kind):
  d=row['candidate'];b=bytearray(self.candidate)
  if kind=='byte':b[self.offset(d['pointer']+d['byte_count']//2)]^=1
  elif kind=='pointer':
   pc=self.owner+d['pointer_offset'];ptr=d['pointer']+1;struct.pack_into('<I',b,pc+4,ptr&0xffffffff);struct.pack_into('<I',b,pc+12,ptr>>32)
  return b
 def test_complete(self):self.assertEqual(proof.check(P,R)['table_bytes'],1449)
 def test_every_table_byte_and_pointer(self):
  for row in self.rows:
   for kind in('byte','pointer'):
    with self.subTest(table=row['name'],kind=kind):
     got,_=proof.slices(self.elf(self.mutate(row,kind)),self.window,self.report['source_context']['tables'])
     selected=next(r for r in got if r['name']==row['name']);self.assertNotEqual(selected['bytes_hex'],row['original']['bytes_hex'])
 def test_relation_rejects_byte_pointer(self):
  for kind in('byte','pointer'):
   with self.subTest(kind=kind):
    got=proof.inspect(P,self.original,bytes(self.mutate(self.rows[0],kind)),R)
    self.assertEqual((got['summary']['normalized_windows'],got['summary']['base_pairs']),(437,581));self.assertNotIn([proof.OWNER,self.owner],got['active_pairs'])
 def test_all_six_count_operands(self):
  for offset in(88,96,128,192,200,232):
   with self.subTest(offset=offset):
    b=bytearray(self.candidate);at=self.owner+offset+4;n=struct.unpack_from('<i',b,at)[0];struct.pack_into('<i',b,at,n+1)
    with self.assertRaises(AssertionError):proof.slices(self.elf(b),self.window,self.report['source_context']['tables'])
 def test_plane_guard_and_consumer_stride(self):
  b=bytearray(self.candidate);struct.pack_into('<i',b,self.owner+56+4,65535)
  with self.assertRaises(AssertionError):proof.slices(self.elf(b),self.window,self.report['source_context']['tables'])
  consumer=self.report['consumer_paths'][0]['candidate'];start=consumer['start'];b=bytearray(self.candidate);struct.pack_into('<i',b,start+8+4,2)
  with self.assertRaises(AssertionError):proof.consumer(self.elf(b),self.cw[start])
 def test_after_all_tables_is_unclaimed(self):
  end=max(r['candidate']['pointer']+r['candidate']['byte_count']for r in self.rows);b=bytearray(self.candidate);b[self.offset(end)]^=1
  rows,_=proof.slices(self.elf(b),self.window,self.report['source_context']['tables']);self.assertEqual(rows,[r['candidate']for r in self.rows])
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
   r=json.loads(gzip.decompress((p/'observations.json.gz').read_bytes()));r['observations'][0]['candidate']['byte_count']+=1;(p/'observations.json.gz').write_bytes(gzip.compress(json.dumps(r).encode(),mtime=0))
  self.copied(change,True)
 def test_resealed_coverage(self):
  def change(p):
   r=json.loads((p/'coverage-delta.json').read_bytes());r['new_payload_bytes']+=1;(p/'coverage-delta.json').write_text(json.dumps(r))
  self.copied(change,True)
 def test_resealed_source(self):self.copied(lambda p:(p/'source-context/printable.rs').write_bytes((p/'source-context/printable.rs').read_bytes()+b'\n//changed\n'),True)
if __name__=='__main__':unittest.main(verbosity=2)
