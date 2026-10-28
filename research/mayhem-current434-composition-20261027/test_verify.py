"""Real source, image, record and signature corruption controls; never runs a target."""
from pathlib import Path
import base64,copy,gzip,importlib.util,json,shutil,struct,subprocess,sys,tempfile,unittest
P=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('composition_verifier',P/'verify.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v)
class Evidence(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.origin,cls.source=v.sources();cls.out=v.images(cls.origin,cls.source);cls.result,cls.typed=v.static(cls.out);cls.m=v.module('test_reader',v.MACRO/'reader.py');cls.utility=v.module('test_base',v.MACRO/'verify.py')
 def rejects(self,fn):
  with self.assertRaises((AssertionError,ValueError,RuntimeError)):fn()
 def image(self):return bytearray(self.out['first'][1])
 def mutate(self,change,both=True):
  data=self.image();change(data);out=dict(self.out)
  if both:
   symbols=bytes(data);candidate=bytearray(self.out['first'][0]);base=self.out['first'][1]
   # Preserve both images' allocation change at the same file offsets in this recipe.
   for i,(a,b)in enumerate(zip(base,symbols)):
    if a!=b:candidate[i]=b
   out['first']=(bytes(candidate),symbols)
  else:out['first']=(self.out['first'][0],bytes(data))
  return out
 def counterpart(self,id):return next(r['counterparts'][0]['start']for r in self.result['first']['inventory']if r['id']==id)
 def offset(self,address):
  with tempfile.TemporaryDirectory()as d:
   p=Path(d)/'a.so';p.write_bytes(self.out['first'][1]);e=self.m.Elf(p)
   sec=next(s for s in e.sections if s['address']<=address<s['address']+s['size']and s['type']!=8);return sec['offset']+address-sec['address']
 def copied(self,change,action):
  with tempfile.TemporaryDirectory()as d:
   p=Path(d)/'packet';shutil.copytree(P,p);change(p);old=v.P;v.P=p
   try:self.rejects(action)
   finally:v.P=old
 def test_positive_partition(self):
  self.assertEqual(self.result['first']['counts'],{'raw':141,'normalized':293,'unmatched':7});self.assertEqual(self.result['first']['direct_closed'],425)
 def test_owning_window_register_mutation(self):
  at=self.offset(self.counterpart('O0073'));out=self.mutate(lambda b:b.__setitem__(at+1,b[at+1]^1));self.rejects(lambda:v.static(out))
 def test_masked_call_target_mutation(self):
  with tempfile.TemporaryDirectory()as d:
   p=Path(d)/'a.so';p.write_bytes(self.out['first'][1]);e=self.m.Elf(p);table,names=self.utility.tables(e);start=self.counterpart('O0075');call=table[start]['direct'][0];target=next(a for a,w in table.items()if self.utility.key(w)!=self.utility.key(table[call['target']]))
  at=self.offset(start+call['offset']);imm=(target-start-call['offset']-8)//8
  out=self.mutate(lambda b:struct.pack_into('<i',b,at+4,imm));self.rejects(lambda:v.static(out))
 def test_masked_source_payload_mutation(self):
  with tempfile.TemporaryDirectory()as d:
   p=Path(d)/'a.so';p.write_bytes(self.out['first'][1]);e=self.m.Elf(p);start=self.counterpart('O0073');w=e.window(start,start+912);ref=next(x for x in w['data_references']if self.utility.source(e,x['target']));pointer=int.from_bytes(e.b[self.offset(ref['target'])+4:self.offset(ref['target'])+8],'little')
  at=self.offset(pointer);out=self.mutate(lambda b:b.__setitem__(at,b[at]^1));self.rejects(lambda:v.static(out))
 def test_allocated_image_divergence(self):
  at=self.offset(self.counterpart('O0073'));out=self.mutate(lambda b:b.__setitem__(at+1,b[at+1]^1),False);self.rejects(lambda:v.static(out))
 def test_original_as_compiler_input(self):
  def change(p):
   path=p/'builds/first/builds.json';j=json.loads(path.read_bytes());j[0]['command'].append('/evidence/original/mayhem/deployed.so');path.write_text(json.dumps(j))
  self.copied(change,lambda:v.images(self.origin,self.source))
 def test_source_override_outside_recovery(self):
  self.copied(lambda p:(p/'overrides/src/lib.rs').write_bytes((p/'overrides/src/lib.rs').read_bytes()+b'\n'),v.sources)
 def test_unlisted_file_rejected(self):self.copied(lambda p:(p/'unexpected').write_text('x'),v.manifest)
 def test_optimized_verification_rejected(self):
  r=subprocess.run([sys.executable,'-O','-B',str(P/'verify.py'),'--static-only'],capture_output=True,text=True);self.assertNotEqual(r.returncode,0);self.assertIn('assertions are required',r.stderr)
if __name__=='__main__':unittest.main()
