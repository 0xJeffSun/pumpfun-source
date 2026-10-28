"""Corruption controls for source, whole windows, direct targets and Source data."""
from pathlib import Path
import gzip, importlib.util, json, os, shutil, struct, subprocess, sys, tempfile, unittest
P=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('q436_verify',P/'verify.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v)
class Evidence(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.base,cls.source=v.sources();cls.out=v.images(cls.source);cls.result,cls.typed=v.static(cls.out)
  cls.reader=v.module('q436_test_reader',v.MACRO/'reader.py');cls.matcher=v.module('q436_test_matcher',v.MACRO/'verify.py')
 def reject(self,fn):
  with self.assertRaises((AssertionError,RuntimeError,ValueError)):fn()
 def counterpart(self,ident):return next(r['counterparts'][0]['start']for r in self.result['first']['inventory']if r['id']==ident)
 def image(self):
  with tempfile.TemporaryDirectory()as d:
   p=Path(d)/'symbol.so';p.write_bytes(self.out['first'][1]);return self.reader.Elf(p)
 def offset(self,e,address):
  z=next(z for z in e.sections if z['type']!=8 and z['address']<=address<z['address']+z['size']);return z['offset']+address-z['address']
 def changed_image(self,mutate,both=True):
  symbols=bytearray(self.out['first'][1]);mutate(symbols);candidate=bytearray(self.out['first'][0])
  if both:
   for i,(a,b)in enumerate(zip(self.out['first'][1],symbols)):
    if a!=b:candidate[i]=b
  out=dict(self.out);out['first']=bytes(candidate),bytes(symbols);return out
 def copied(self,change,fn,manifest=False):
  with tempfile.TemporaryDirectory()as td:
   d=Path(td)/'packet';shutil.copytree(P,d)
   if manifest:(d/'manifest.json').write_text(json.dumps({p.relative_to(d).as_posix():v.sha(p.read_bytes())for p in d.rglob('*')if p.is_file()and p.name!='manifest.json'}))
   change(d);old=v.P;v.P=d
   try:self.reject(fn)
   finally:v.P=old
 def test_exact_partition_and_gains(self):
  self.assertEqual(self.result['first']['counts'],{'raw':141,'normalized':295,'unmatched':5})
  self.assertEqual(self.result['delta']['matched'],{'gains':['O0081','O0082'],'losses':[]})
  self.assertEqual(self.result['first']['direct_closed'],429)
 def test_legacy_buy_real_instruction_corruption(self):
  at=self.offset(self.image(),self.counterpart('O0081'));out=self.changed_image(lambda b:b.__setitem__(at+1,b[at+1]^1));self.reject(lambda:v.static(out))
 def test_legacy_sell_masked_direct_target(self):
  e=self.image();table,names=self.matcher.tables(e);start=self.counterpart('O0082');call=table[start]['direct'][0]
  target=next(a for a,w in table.items()if self.matcher.key(w)!=self.matcher.key(table[call['target']]))
  at=self.offset(e,call['pc']);imm=(target-call['pc']-8)//8
  out=self.changed_image(lambda b:struct.pack_into('<i',b,at+4,imm));self.reject(lambda:v.static(out))
 def test_legacy_source_payload_corruption(self):
  e=self.image();table,_=self.matcher.tables(e);start=self.counterpart('O0081');ref=next(x for x in table[start]['data_references']if self.matcher.source(e,x['target']))
  at=self.offset(e,ref['target'])+16
  out=self.changed_image(lambda b:b.__setitem__(at,b[at]^1));self.reject(lambda:v.static(out))
 def test_allocator_target_preservation(self):
  e=self.image();table,_=self.matcher.tables(e);start=self.counterpart('O0210');call=table[start]['direct'][0]
  target=next(a for a,w in table.items()if self.matcher.key(w)!=self.matcher.key(table[call['target']]))
  at=self.offset(e,call['pc']);out=self.changed_image(lambda b:struct.pack_into('<i',b,at+4,(target-call['pc']-8)//8));self.reject(lambda:v.static(out))
 def test_allocated_symbol_and_executable_divergence(self):
  at=self.offset(self.image(),self.counterpart('O0081'));out=self.changed_image(lambda b:b.__setitem__(at+1,b[at+1]^1),False);self.reject(lambda:v.static(out))
 def test_source_override_corruption(self):
  self.copied(lambda d:(d/'overrides/src/state.rs').write_bytes((d/'overrides/src/state.rs').read_bytes()+b'\n'),v.sources)
 def test_original_is_never_compiler_input(self):
  def change(d):
   p=d/'builds/first/launch.json';j=json.loads(p.read_text());j['command'].append('/evidence/original/mayhem/deployed.so');p.write_text(json.dumps(j))
  self.copied(change,lambda:v.images(self.source))
 def test_unlisted_file_rejected(self):self.copied(lambda d:(d/'unexpected.txt').write_text('x'),v.manifest,True)
 def test_unlisted_fifo_rejected(self):self.copied(lambda d:os.mkfifo(d/'unexpected.fifo'),v.manifest,True)
 def test_symlink_rejected(self):self.copied(lambda d:(d/'unexpected').symlink_to('source.patch'),v.manifest,True)
 def test_optimized_assertions_rejected(self):
  r=subprocess.run([sys.executable,'-O','-B',str(P/'verify.py'),'--static-only'],capture_output=True,text=True);self.assertNotEqual(r.returncode,0);self.assertIn('assertions are required',r.stderr)
if __name__=='__main__':unittest.main(verbosity=2)
