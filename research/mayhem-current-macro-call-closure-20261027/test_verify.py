"""Temporary corruption controls; accepted artifacts are never modified."""
from pathlib import Path
import base64,copy,gzip,hashlib,io,json,lzma,shutil,struct,tarfile,tempfile,unittest
import verify as v

def seal(p):
 (p/'manifest.json').write_text(json.dumps({x.relative_to(p).as_posix():v.sha(x.read_bytes())for x in sorted(p.rglob('*'))if x.is_file()and x!=p/'manifest.json'},indent=2)+'\n')
def replace_json_hashes(p,changes):
 def walk(x):
  if isinstance(x,str):return changes.get(x,x)
  if isinstance(x,list):return[walk(y)for y in x]
  if isinstance(x,dict):return{k:walk(z)for k,z in x.items()}
  return x
 for path in p.rglob('*.json'):
  if path.name=='manifest.json':continue
  path.write_text(json.dumps(walk(json.loads(path.read_text())),indent=2)+'\n')
def mutate_images(p,fn):
 replacements={}
 for role in ['first','repeat']:
  for name in ['candidate.so','symbols.so']:
   f=p/'builds'/role/(name+'.gz');old=v.raw(f);new=fn(bytearray(old));f.write_bytes(gzip.compress(bytes(new),mtime=0));replacements[v.sha(old)]=v.sha(bytes(new))
 replace_json_hashes(p,replacements)
def mutate_source(p,name,fn):
 f=p/'source/composed.tar.gz';files=v.unpack(f);old=files[name];files[name]=fn(old);out=io.BytesIO()
 with tarfile.open(fileobj=out,mode='w')as tf:
  for n,data in files.items():
   info=tarfile.TarInfo(n);info.size=len(data);info.mode=0o644;tf.addfile(info,io.BytesIO(data))
 f.write_bytes(gzip.compress(out.getvalue(),mtime=0));replace_json_hashes(p,{v.sha(old):v.sha(files[name])})
class PacketTests(unittest.TestCase):
 def copy(self):
  td=tempfile.TemporaryDirectory(prefix='macro-closure-negative-');self.addCleanup(td.cleanup);p=Path(td.name)/'packet';shutil.copytree(v.P,p);return p
 def rejects(self,p,pattern):
  seal(p)
  with self.assertRaisesRegex((ValueError,AssertionError),pattern):v.verify(p,v.ROOT,include_runtime=False)
 def test_positive(self):self.assertEqual(v.verify(include_runtime=False)['body_and_closure']['direct_closed_windows'],422)
 def test_nested_manifest_is_not_exempt(self):
  p=self.copy();(p/'curve/manifest.json').write_text('{}');
  with self.assertRaisesRegex(ValueError,'manifest differs'):v.verify(p,v.ROOT,include_runtime=False)
 def test_symlink_rejected(self):
  p=self.copy();(p/'source/link').symlink_to('inputs.json');self.rejects(p,'symlink')
 def test_function_status_inventory_corruption(self):
  p=self.copy();f=p/'inventory.json';j=v.read(f);j['rows'][0]['direct_closed']=not j['rows'][0]['direct_closed'];f.write_text(json.dumps(j,indent=2)+'\n');self.rejects(p,'function inventory differs')
 def test_unrelated_source_drift(self):
  p=self.copy();mutate_source(p,'src/state.rs',lambda b:b+b'\n// corruption\n');self.rejects(p,'source binding differs')
 def test_wrong_macro_invocation(self):
  p=self.copy();mutate_source(p,'curve-accounts/src/interface_definition.rs',lambda b:b.replace(b'historical_anchor_program::declare_program!',b'wrong_macro::declare_program!'));self.rejects(p,'macro invocation differs')
 def test_historical_event_field_drift(self):
  p=self.copy()
  def change(b):
   j=json.loads(b);j['events'][0]['name']='WrongEvent';return(json.dumps(j,indent=2)+'\n').encode()
  mutate_source(p,'curve-accounts/idls/pump.json',change);self.rejects(p,'historical IDL composition differs')
 def test_wrong_masked_allocator_target(self):
  p=self.copy();saved=v.read(p/'analysis/verification.json');r=next(x for x in saved['body_and_closure']['reserve_counterparts']if x['closed']);at=r['start']+528
  helper=next(x for x in saved['body_and_closure']['reserve_counterparts']if not x['closed']and x['calls'][3]['candidate_bytes']==312)['calls'][3]['candidate_target']
  def change(b):struct.pack_into('<i',b,at+4,(helper-at-8)//8);return b
  mutate_images(p,change);self.rejects(p,'positive call/Source coverage differs|preservation differs|direct closure differs')
 def test_transitive_equal_body_wrong_provider(self):
  p=self.copy();saved=v.read(p/'analysis/verification.json')['body_and_closure'];reader=v.module('transitive_reader',p/'reader.py')
  good=next(x['start']for x in saved['reserve_counterparts']if x['closed']);bad=next(x['start']for x in saved['reserve_counterparts']if not x['closed']);rows=v.read(p/'original-windows.json');selected=None
  with tempfile.TemporaryDirectory()as td:
   f=Path(td)/'c.so';f.write_bytes(v.raw(p/'builds/first/symbols.so.gz'));e=reader.Elf(f);cw,_=v.tables(e)
   f=Path(td)/'o.so';f.write_bytes((v.ROOT/'evidence/original/mayhem/deployed.so').read_bytes());o=reader.Elf(f)
   self.assertEqual(v.key(cw[good]),v.key(cw[bad]))
   for row in rows:
    record=next(x for x in saved['closure_rows']if x['id']==row['id']);ow=o.window(row['start'],row['start']+row['bytes'])
    for a in record['after']:
     if cw[a]['raw_sha256']==ow['raw_sha256']:continue
     for call in cw[a]['direct']:
      if call['target']==good:selected=call['pc'];break
     if selected is not None:break
    if selected is not None:break
  self.assertIsNotNone(selected)
  def change(b):struct.pack_into('<i',b,selected+4,(bad-selected-8)//8);return b
  mutate_images(p,change);self.rejects(p,'direct closure differs')
 def test_source_record_corruption_after_hash_updates(self):
  p=self.copy();reader=v.module('mutation_reader',p/'reader.py')
  with tempfile.TemporaryDirectory()as td:
   f=Path(td)/'a.so';f.write_bytes(v.raw(p/'builds/first/symbols.so.gz'));e=reader.Elf(f);t,_=v.tables(e);at=next(d['target']for w in t.values()for d in w['data_references']if v.source(e,d['target']))
  def change(b):old=struct.unpack_from('<I',b,at+16)[0];struct.pack_into('<I',b,at+16,old+1);return b
  mutate_images(p,change);self.rejects(p,'preservation differs|linked Source profile differs')
 def test_stripped_only_data_corruption(self):
  p=self.copy();reader=v.module('stripped_data_reader',p/'reader.py');changes={}
  with tempfile.TemporaryDirectory()as td:
   f=Path(td)/'s.so';f.write_bytes(v.raw(p/'builds/first/candidate.so.gz'));e=reader.Elf(f);at=e.sec['.rodata']['offset']
  for role in ['first','repeat']:
   f=p/'builds'/role/'candidate.so.gz';old=v.raw(f);new=bytearray(old);new[at]^=1;new=bytes(new);f.write_bytes(gzip.compress(new,mtime=0));changes[v.sha(old)]=v.sha(new)
  replace_json_hashes(p,changes);self.rejects(p,'allocated section payload differs')
 def test_stripped_entrypoint_corruption(self):
  p=self.copy();changes={}
  for role in ['first','repeat']:
   f=p/'builds'/role/'candidate.so.gz';old=v.raw(f);new=bytearray(old);entry=struct.unpack_from('<Q',new,24)[0];struct.pack_into('<Q',new,24,entry+8);new=bytes(new);f.write_bytes(gzip.compress(new,mtime=0));changes[v.sha(old)]=v.sha(new)
  replace_json_hashes(p,changes);self.rejects(p,'execution header differs')
 def test_partial_handler_instruction_corruption(self):
  p=self.copy();reader=v.module('instruction_reader',p/'reader.py')
  with tempfile.TemporaryDirectory()as td:
   f=Path(td)/'a.so';f.write_bytes(v.raw(p/'builds/first/symbols.so.gz'));e=reader.Elf(f);at=next(s['value']for s in e.symbols if'legacy_buy_handler'in s['name'])
  def change(b):b[at+1]^=0x10;return b
  mutate_images(p,change);self.rejects(p,'unexpected changed linked function')
 def test_curve_object_must_bind_linked_helper(self):
  p=self.copy();repl={}
  for name in ['first','repeat']:
   f=p/'curve'/(name+'.rlib.gz');old=v.raw(f);needle=v.executable_sections(old)['.text.unlikely.'+v.FINISH];require_count=old.count(needle);self.assertEqual(require_count,1);at=old.index(needle);new=bytearray(old);new[at+1]^=0x10;new=bytes(new);f.write_bytes(gzip.compress(new,mtime=0));repl[v.sha(old)]=v.sha(new)
  replace_json_hashes(p,repl);self.rejects(p,'linked helper differs from compiler archive')
 def test_quote_vtable_scalar_corruption(self):
  p=self.copy();reader=v.module('typed_quote_reader',p/'reader.py')
  with tempfile.TemporaryDirectory()as td:
   f=Path(td)/'s.so';f.write_bytes(v.raw(p/'builds/first/symbols.so.gz'));e=reader.Elf(f);table,_=v.tables(e);start=next(z['value']for z in e.symbols if '9buy_quote17'in z['name']);body=table[start]
   at=next(d['target']+8 for d in body['data_references']if d['target']not in e.rel and d['target']+24 in e.rel)
  def change(b):b[at]^=1;return b
  mutate_images(p,change);self.rejects(p,'quote typed contracts differ')
 def test_initializer_overflow_message_corruption(self):
  p=self.copy();reader=v.module('typed_init_reader',p/'reader.py')
  with tempfile.TemporaryDirectory()as td:
   f=Path(td)/'s.so';f.write_bytes(v.raw(p/'builds/first/symbols.so.gz'));e=reader.Elf(f);table,_=v.tables(e);start=next(z['value']for z in e.symbols if 'state10initialize17'in z['name']);body=table[start];callee=table[next(d['target']for d in body['direct']if d['offset']==752)];record=next(d['target']for d in callee['data_references']if d['offset']==8);at=struct.unpack_from('<I',e.b,record+4)[0]
  def change(b):b[at]^=1;return b
  mutate_images(p,change);self.rejects(p,'')
 def test_link_map_address_corruption(self):
  p=self.copy();f=p/'builds/first/link.map.gz';lines=v.raw(f).decode().splitlines(True)
  for i,line in enumerate(lines):
   if ':(.text.'in line:
    fields=line.split();fields[0]=format(int(fields[0],16)+8,'x');lines[i]=' '.join(fields)+'\n';break
  f.write_bytes(gzip.compress(''.join(lines).encode(),mtime=0));self.rejects(p,'link map function extents differ')
 def test_original_cannot_be_compiler_input(self):
  p=self.copy();f=p/'builds/first/launch.json';j=v.read(f);j['command'].append(str(v.ROOT/'evidence/original/mayhem/deployed.so'));f.write_text(json.dumps(j,indent=2)+'\n');self.rejects(p,'original binary used as compiler input')
 def test_runtime_status_binding_corruption(self):
  p=self.copy();f=p/'runtime/status.json';j=v.read(f);j['candidate_sha256']='0'*64;f.write_text(json.dumps(j,indent=2)+'\n');self.rejects(p,'runtime completion binding differs')
 def corrupt_trade(self,transform):
  p=self.copy();f=p/'runtime/trades/buy.json.xz';old=f.read_bytes();j=json.loads(lzma.decompress(old));transform(j);new=lzma.compress(json.dumps(j).encode());f.write_bytes(new);replace_json_hashes(p,{v.sha(old):v.sha(new)});seal(p);return p
 def test_runtime_signature_corruption(self):
  def change(j):
   row=j['cases'][0];tx=bytearray(base64.b64decode(row['original']['transaction_base64']));tx[1]^=1;bad=base64.b64encode(tx).decode();row['original']['transaction_base64']=row['candidate']['transaction_base64']=bad
  p=self.corrupt_trade(change)
  with self.assertRaises((AssertionError,ValueError)):v.verify(p,v.ROOT)
 def test_runtime_full_case_corruption(self):
  p=self.corrupt_trade(lambda j:j['cases'][0]['case'].update({'unexpected_case_field':1}))
  with self.assertRaises((AssertionError,ValueError)):v.verify(p,v.ROOT)
 def test_runtime_executable_program_binding_corruption(self):
  p=self.corrupt_trade(lambda j:j['cases'][0]['candidate']['before']['MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'].update({'data_sha256':'0'*64}))
  with self.assertRaisesRegex(ValueError,'actual Mayhem program binding'):v.verify(p,v.ROOT)
 def test_pruning_preserves_supported_recursion(self):
  pairs={(1,10),(2,20)};self.assertEqual(v.prune(pairs,{(1,10):[(2,20)],(2,20):[(1,10)]})[0],pairs)
 def test_pruning_propagates_one_missing_child(self):
  pairs={(1,10),(2,20),(3,30)};self.assertEqual(v.prune(pairs,{(1,10):[(2,20)],(2,20):[(3,30)],(3,30):[(4,40)]})[1],[1,1,1])
if __name__=='__main__':unittest.main()
