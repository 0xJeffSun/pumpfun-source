"""In-memory mutation controls for the linker preservation contract."""
from pathlib import Path
import argparse,copy,importlib.util,json,struct,tempfile,unittest
P=Path(__file__).resolve().parent;ROOT=P.parents[1]
s=importlib.util.spec_from_file_location('qualified_test_verify',P/'verify.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v)

class Scope(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.before=v.raw(P/'artifacts/baseline/symbols.so.gz');cls.after=v.raw(P/'artifacts/recovered/symbols.so.gz');cls.t=v.module('qualified_test_translation',P/'translation.py');cls.c=v.module('qualified_test_config',P/'config.py');cls.plan=v.load(P/'config/plan.json');cls.pre=cls.t.sections(P/'maps/baseline.map');cls.post=cls.t.sections(P/'maps/recovered.map')
  cls.default=(P/'config/default.ld').read_text();cls.ordered=(P/'config/ordered.ld').read_text()
 def compare(self,after):
  with tempfile.TemporaryDirectory()as td:
   a=Path(td)/'before';b=Path(td)/'after';a.write_bytes(self.before);b.write_bytes(after);return self.t.compare(a,b,P/'maps/baseline.map',P/'maps/recovered.map')
 def reject(self,at,data):
  b=bytearray(self.after);b[at:at+len(data)]=data
  with self.assertRaises((AssertionError,KeyError,IndexError,struct.error)):self.compare(bytes(b))
 def elf(self):
  # The parser retains input bytes; the temporary file can be removed afterward.
  with tempfile.TemporaryDirectory()as td:
   p=Path(td)/'image';p.write_bytes(self.after);return self.t.m.Elf(p)
 def test_unchanged(self):self.assertTrue(self.compare(self.after)['result']['entire_file_accounted_for'])
 def test_entrypoint(self):self.reject(24,struct.pack('<Q',483024))
 def test_text_opcode(self):self.reject(288,b'\x18')
 def test_direct_call(self):
  e=self.elf();p=next(x['value']for x in e.symbols if x['info']&15==2 and x['size']>=32 and e.window(x['value'],x['value']+x['size'])['direct']);s=next(x for x in e.symbols if x['value']==p and x['size']>=32);d=e.window(p,p+s['size'])['direct'][0];self.reject(d['pc']+4,struct.pack('<i',0))
 def test_local_branch(self):
  e=self.elf();found=None
  for s in e.symbols:
   if s['info']&15==2 and s['size']>=8:
    branches=e.window(s['value'],s['value']+s['size'])['branches']
    if branches:found=branches[0];break
  self.assertIsNotNone(found);pc=found['pc'];off=struct.unpack_from('<h',self.after,pc+2)[0];self.reject(pc+2,struct.pack('<h',off+1))
 def test_data_pointer(self):
  report=v.load(P/'translation.json')[1]['result'];s=next(s for s in report['data_and_scaffold']if s['section']=='.data.rel.ro');d=next(x for x in s['pointers']if x['target_moved']);self.reject(d['site']+4,struct.pack('<I',d['before']))
 def test_rodata(self):
  e=self.elf();p=e.sec['.rodata']['offset'];self.reject(p,bytes([self.after[p]^1]))
 def test_relocation(self):
  e=self.elf();p=e.sec['.rel.dyn']['offset'];self.reject(p+8,struct.pack('<Q',9))
 def test_dynsym(self):
  e=self.elf();s=next(s for s in e.symbols if s['table']=='.dynsym'and e.lo<s['value']<e.hi);self.reject(s['record_offset']+8,struct.pack('<Q',s['value']+8))
 def test_symbol_table(self):
  e=self.elf();s=next(s for s in e.symbols if s['table']=='.symtab'and e.lo<s['value']<e.hi);self.reject(s['record_offset']+8,struct.pack('<Q',s['value']+8))
 def test_script_padding(self):
  with self.assertRaises(AssertionError):self.c.check(self.default,self.ordered.replace('  .text : {','  .text : { BYTE(0);',1),self.plan,self.pre,self.post)
 def test_duplicate_section(self):
  p=copy.deepcopy(self.plan);p['ordered'][-1]=p['ordered'][0]
  with self.assertRaises(AssertionError):self.c.check(self.default,self.ordered,p,self.pre,self.post)
 def test_duplicate_original_hypothesis(self):
  p=copy.deepcopy(self.plan);p['ordered'][1]['original']=p['ordered'][0]['original']
  with self.assertRaises(AssertionError):self.c.check(self.default,self.ordered,p,self.pre,self.post)
 def test_linker_other_argument(self):
  p=v.load(P/'builds/recovered/linker-invocation.json');p['forwarded'][0]='unexpected'
  with self.assertRaises(AssertionError):v.check_invocation(p)
 def test_nested_manifest(self):
  with tempfile.TemporaryDirectory()as td:
   p=Path(td);(p/'manifest.json').write_text('{}');(p/'nested').mkdir();(p/'nested/manifest.json').write_text('{}')
   with self.assertRaises(AssertionError):v.manifest(p)

if __name__=='__main__':
 p=argparse.ArgumentParser(add_help=False);p.add_argument('--repository-root',type=Path,default=ROOT);a,rest=p.parse_known_args();ROOT=a.repository_root.resolve();unittest.main(argv=[__file__]+rest)
