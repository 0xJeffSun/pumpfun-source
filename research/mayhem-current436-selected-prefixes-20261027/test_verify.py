"""Actual data, target and filesystem mutation controls for the bounded relation."""
from pathlib import Path
import importlib.util,json,os,shutil,struct,tempfile,unittest
P=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('selected_prefix_verify',P/'verify.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v)
class Controls(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.original,cls.candidate=v.inputs();cls.m=v.load_reader();cls.base=cls.m.inspect(cls.original,cls.candidate);cls.o,cls.c=cls.m.elves(cls.original,cls.candidate);cls.cw,_=cls.m.q.tables(cls.c);cls.closed={tuple(x)for x in cls.base['active_pairs']}
  cls.selected={p['right']['address']:p for p in cls.base['prefixes']if p['pair_closed']}
 def offset(self,address):
  s=next(s for s in self.c.sections if s['type']!=8 and s['address']<=address<s['address']+s['size']);return s['offset']+address-s['address']
 def result(self,change):
  b=bytearray(self.candidate);change(b);return self.m.inspect(self.original,bytes(b))
 def rejects_pair(self,p,result):
  self.assertEqual(result['summary']['normalized_windows'],436)
  self.assertNotIn([p['original'],p['candidate']],result['active_pairs'])
 def test_current_relation(self):
  self.assertEqual(v.verify(),self.base['summary']);self.assertEqual(len(self.selected),30)
 def test_all_size_words(self):
  for addr,p in self.selected.items():
   with self.subTest(address=addr):
    at=self.offset(addr)+8;self.rejects_pair(p,self.result(lambda b:struct.pack_into('<Q',b,at,struct.unpack_from('<Q',b,at)[0]^1)))
 def test_all_alignment_words(self):
  for addr,p in self.selected.items():
   with self.subTest(address=addr):
    at=self.offset(addr)+16;self.rejects_pair(p,self.result(lambda b:struct.pack_into('<Q',b,at,0)))
 def test_all_complete_callback_targets(self):
  for addr,p in self.selected.items():
   with self.subTest(address=addr):
    old=p['right']['targets'][1];target=next(a for a,w in self.cw.items()if self.m.q.key(w)!=self.m.q.key(self.cw[old]));at=self.offset(addr)+24
    self.rejects_pair(p,self.result(lambda b:struct.pack_into('<Q',b,at,target<<32)))
 def test_interior_callback_target(self):
  addr,p=next(iter(self.selected.items()));at=self.offset(addr)+24;target=p['right']['targets'][1]+1
  self.rejects_pair(p,self.result(lambda b:struct.pack_into('<Q',b,at,target<<32)))
 def test_missing_callback_relocation(self):
  addr,p=next(iter(self.selected.items()));rel=self.c.rel[addr+24];at=rel['record_offset']+8
  self.rejects_pair(p,self.result(lambda b:struct.pack_into('<Q',b,at,struct.unpack_from('<Q',b,at)[0]&~0xffffffff)))
 def test_source_coordinate(self):
  for a,b in sorted(self.closed):
   row=next(x for x in json.loads((self.m.M/'original-windows.json').read_text())if x['start']==a)
   ow=self.o.window(a,a+row['bytes']);cw=self.cw[b];rd={x['offset']:x for x in cw['data_references']}
   refs=[x for x in ow['data_references']if self.m.q.source(self.o,x['target'])]
   if refs:
    ref=rd[refs[0]['offset']];at=self.offset(ref['target'])+16;out=self.result(lambda image:image.__setitem__(at,image[at]^1));self.assertNotIn([a,b],out['active_pairs']);self.assertEqual(out['summary']['normalized_windows'],436);return
  self.fail('no tested Source coordinate')
 def fs_reject(self,change,message):
  with tempfile.TemporaryDirectory()as td:
   d=Path(td)/'packet';shutil.copytree(P,d);change(d);old=v.P;v.P=d
   try:
    with self.assertRaisesRegex(AssertionError,message):v.verify()
   finally:v.P=old
 def test_unlisted_file(self):self.fs_reject(lambda d:(d/'unlisted.pyc').write_bytes(b'cache'),'packet inventory differs')
 def test_unlisted_fifo(self):self.fs_reject(lambda d:os.mkfifo(d/'pipe'),'packet special file')
 def test_symlink(self):self.fs_reject(lambda d:(d/'link').symlink_to('reader.py'),'packet symlink')
if __name__=='__main__':unittest.main(verbosity=2)
