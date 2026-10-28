"""Counterexamples for the historical ELF recheck and strict file inventory."""
from pathlib import Path
import gzip,hashlib,importlib.util,json,os,shutil,struct,subprocess,sys,tempfile,unittest
P=Path(__file__).resolve().parent
R=next(p for p in P.parents if (p/'evidence/original/mayhem/deployed.so').is_file())
s=importlib.util.spec_from_file_location('historical417_tests',P/'elf_check.py');q=importlib.util.module_from_spec(s);s.loader.exec_module(q)
class Evidence(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.result=q.inspect(R,P)
  cls.candidate=gzip.decompress((P/'builds/candidate.so.gz').read_bytes());cls.symbols=gzip.decompress((P/'builds/symbols.so.gz').read_bytes())
  m=R/'research/mayhem-current-macro-call-closure-20261027';cls.reader=q.module('h417_test_reader',m/'reader.py');cls.matcher=q.module('h417_test_matcher',m/'verify.py')
 def image(self):
  with tempfile.TemporaryDirectory()as d:
   p=Path(d)/'image.so';p.write_bytes(self.symbols);return self.reader.Elf(p)
 def offset(self,e,address):
  z=next(z for z in e.sections if z['type']!=8 and z['address']<=address<z['address']+z['size']);return z['offset']+address-z['address']
 def reject_image(self,change):
  b=bytearray(self.symbols);change(b);c=bytearray(self.candidate)
  for i,(old,new)in enumerate(zip(self.symbols,b)):
   if old!=new:c[i]=new
  with self.assertRaises((AssertionError,ValueError)):q.inspect(R,P,bytes(c),bytes(b))
 def test_full_body_and_census(self):
  self.assertEqual(self.result['candidate']['counts'],{'raw':100,'normalized':337,'unmatched':4})
  self.assertEqual(self.result['O0079']['bytes'],17312);self.assertFalse(self.result['O0079']['raw_equal'])
 def test_real_instruction_corruption(self):
  e=self.image();at=self.offset(e,self.result['O0079']['candidate_starts'][0]);self.reject_image(lambda b:b.__setitem__(at+1,b[at+1]^1))
 def test_masked_call_target_corruption(self):
  e=self.image();table,_=self.matcher.tables(e);start=self.result['O0079']['candidate_starts'][0];call=table[start]['direct'][0]
  target=next(a for a,w in table.items()if self.matcher.key(w)!=self.matcher.key(table[call['target']]))
  at=self.offset(e,call['pc']);self.reject_image(lambda b:struct.pack_into('<i',b,at+4,(target-call['pc']-8)//8))
 def test_Source_corruption(self):
  e=self.image();table,_=self.matcher.tables(e);start=self.result['O0079']['candidate_starts'][0];ref=next(x for x in table[start]['data_references']if self.matcher.source(e,x['target']))
  at=self.offset(e,ref['target'])+16;self.reject_image(lambda b:b.__setitem__(at,b[at]^1))
 def run_copy(self,change,message,reseal=False):
  with tempfile.TemporaryDirectory(dir=P.parent)as d:
   p=Path(d)/'packet';shutil.copytree(P,p);change(p)
   if reseal:seal(p)
   r=subprocess.run([sys.executable,'-B',str(p/'verify.py')],capture_output=True,text=True)
   self.assertNotEqual(r.returncode,0);self.assertIn(message,r.stderr)
 def test_inventory_rejects_unlisted_fifo(self):self.run_copy(lambda p:os.mkfifo(p/'unexpected.fifo'),'manifest rejects special files')
 def test_inventory_rejects_symlink(self):self.run_copy(lambda p:(p/'unexpected').symlink_to('source.patch'),'manifest rejects symlinks')
 def test_saved_census_cannot_substitute_for_ELF(self):
  def change(p):
   f=p/'measurement/recomputed-elf.json';v=json.loads(f.read_text());v['candidate']['counts']['unmatched']=0;f.write_text(json.dumps(v))
  self.run_copy(change,'actual ELF: full 441-window census',True)
 def test_optimized_assertions_rejected(self):
  r=subprocess.run([sys.executable,'-O','-B',str(P/'verify.py')],capture_output=True,text=True);self.assertNotEqual(r.returncode,0);self.assertIn('assertions enabled',r.stderr)

def seal(p):
 h=lambda b:hashlib.sha256(b).hexdigest()
 (p/'SHA256SUMS.txt').write_text(''.join(h(x.read_bytes())+'  '+x.relative_to(p).as_posix()+'\n'for x in sorted(p.rglob('*'))if x.is_file()and x!=p/'SHA256SUMS.txt'))
if __name__=='__main__':unittest.main(verbosity=2)
