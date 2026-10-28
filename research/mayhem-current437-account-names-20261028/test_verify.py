"""Mutation controls against counted argument data and instruction operands."""
from pathlib import Path
import copy,gzip,json,os,shutil,struct,tempfile,unittest
import proof
P=Path(__file__).resolve().parent
R=next(p for p in P.parents if (p/'evidence/original/mayhem/deployed.so').is_file())
class AccountNames(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  base=proof.reader(R);cls.original=(R/'evidence/original/mayhem/deployed.so').read_bytes();cls.candidate=base.inputs(R,'mayhem-current437-composition-20261028');prefix,_,_=base.readers(R/proof.BASE,R);cls.o,cls.c=prefix.elves(cls.original,cls.candidate);cls.cw,_=prefix.q.tables(cls.c);cls.rows=json.loads(gzip.decompress((P/'observations.json.gz').read_bytes()))
 def mutate(self,row,kind):
  b=bytearray(self.candidate);d=row['candidate'];pc=row['candidate_owner']+d['offset']
  if kind=='byte':
   s=next(s for s in self.c.sections if s['name']=='.rodata');b[s['offset']+d['pointer']-s['address']]^=1
  elif kind=='length':struct.pack_into('<i',b,pc+20,d['length']+1)
  else:
   p=d['pointer']+1;struct.pack_into('<I',b,pc+4,p&0xffffffff);struct.pack_into('<I',b,pc+12,p>>32)
  e=copy.copy(self.c);e.b=bytes(b);return e
 def test_all_sites_detect_mutations(self):
  for row in self.rows:
   for kind in ('byte','length','pointer'):
    with self.subTest(owner=row['owner'],offset=row['candidate']['offset'],kind=kind):
     e=self.mutate(row,kind);d=proof.descriptor(e,self.cw[row['candidate_owner']],row['candidate']['offset'])
     self.assertNotEqual((d['bytes_hex'],d['length']),(row['original']['bytes_hex'],row['original']['length']))
 def test_full_inspection_rejects_byte_and_pointer(self):
  for kind in ('byte','pointer','length'):
   with self.subTest(kind=kind),self.assertRaises(AssertionError):proof.inspect(self.original,self.mutate(self.rows[0],kind).b,R)
 def test_after_bound(self):
  row=self.rows[0];d=row['candidate'];b=bytearray(self.candidate);s=next(s for s in self.c.sections if s['name']=='.rodata');b[s['offset']+d['pointer']+d['length']-s['address']]^=1;e=copy.copy(self.c);e.b=bytes(b)
  self.assertEqual(proof.descriptor(e,self.cw[row['candidate_owner']],d['offset']),d)
 def test_report_rejected_after_reseal(self):
  with tempfile.TemporaryDirectory() as td:
   p=Path(td)/'packet';shutil.copytree(P,p);rows=json.loads(gzip.decompress((p/'observations.json.gz').read_bytes()));rows[0]['candidate']['length']+=1;(p/'observations.json.gz').write_bytes(gzip.compress(json.dumps(rows).encode(),mtime=0));(p/'manifest.json').write_text(json.dumps({str(f.relative_to(p)):proof.sha(f.read_bytes()) for f in p.rglob('*') if f.is_file() and f!=p/'manifest.json'}))
   with self.assertRaises(AssertionError):proof.check(p,R)
 def test_delta_rejected_after_reseal(self):
  with tempfile.TemporaryDirectory() as td:
   p=Path(td)/'packet';shutil.copytree(P,p);d=json.loads((p/'coverage-delta.json').read_bytes());d['new_rodata_bytes']+=1;(p/'coverage-delta.json').write_text(json.dumps(d));(p/'manifest.json').write_text(json.dumps({str(f.relative_to(p)):proof.sha(f.read_bytes()) for f in p.rglob('*') if f.is_file() and f!=p/'manifest.json'}))
   with self.assertRaises(AssertionError):proof.check(p,R)
 def test_inventory_rejects_symlink(self):
  with tempfile.TemporaryDirectory() as td:
   p=Path(td)/'packet';shutil.copytree(P,p);(p/'alias').symlink_to('inputs.json')
   with self.assertRaises(AssertionError):proof.check(p,R)
 def test_packet(self):
  s=proof.check(P,R);self.assertEqual((s['sites'],s['new_rodata_bytes']),(125,774))
if __name__=='__main__':unittest.main(verbosity=2)
