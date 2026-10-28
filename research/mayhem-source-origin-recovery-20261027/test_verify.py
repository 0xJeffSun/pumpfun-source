"""Reject corruption of source scope, executable bytes and claimed Source repairs."""
from pathlib import Path
import base64,gzip,hashlib,io,json,lzma,shutil,struct,tarfile,tempfile,unittest
import verify as v

def seal(p):(p/'manifest.json').write_text(json.dumps({x.relative_to(p).as_posix():v.sha(x.read_bytes())for x in p.rglob('*')if x.is_file()and x!=p/'manifest.json'},indent=2)+'\n')
def update_hashes(p,changes):
 def rec(x):
  if isinstance(x,str):return changes.get(x,x)
  if isinstance(x,list):return[rec(y)for y in x]
  if isinstance(x,dict):return{k:rec(y)for k,y in x.items()}
  return x
 for f in p.rglob('*.json'):
  if f.name!='manifest.json':f.write_text(json.dumps(rec(json.loads(f.read_text())),indent=2)+'\n')
def images(p,change):
 replace={}
 for role in ['first','repeat']:
  for name in ['candidate.so','symbols.so']:
   f=p/'builds'/role/(name+'.gz');old=v.raw(f);new=bytes(change(bytearray(old)));f.write_bytes(gzip.compress(new,mtime=0));replace[v.sha(old)]=v.sha(new)
 update_hashes(p,replace)
def source(p,name,change):
 a=v.archive(p/'source.tar.gz');old=a[name];a[name]=change(old);stream=io.BytesIO()
 with tarfile.open(fileobj=stream,mode='w')as t:
  for n,b in sorted(a.items()):m=tarfile.TarInfo(n);m.size=len(b);m.mode=0o644;t.addfile(m,io.BytesIO(b))
 (p/'source.tar.gz').write_bytes(gzip.compress(stream.getvalue(),mtime=0));update_hashes(p,{v.sha(old):v.sha(a[name])})
class Tests(unittest.TestCase):
 def copy(self):
  td=tempfile.TemporaryDirectory(prefix='source-origin-negative-');self.addCleanup(td.cleanup);p=Path(td.name)/'packet';shutil.copytree(v.P,p);return p
 def reject(self,p,pattern):
  seal(p)
  with self.assertRaisesRegex((AssertionError,ValueError),pattern):v.verify(p,include_runtime=False)
 def test_positive_static(self):self.assertEqual(v.verify(include_runtime=False)['positive_Sources'],[456,458])
 def test_nested_manifest(self):
  p=self.copy();(p/'analysis/manifest.json').write_text('{}')
  with self.assertRaisesRegex(ValueError,'packet manifest'):v.verify(p,include_runtime=False)
 def test_symlink(self):
  p=self.copy();(p/'alias').symlink_to('source.tar.gz');self.reject(p,'symlink')
 def test_unrelated_source(self):
  p=self.copy();source(p,'src/state.rs',lambda b:b+b'\n// unrelated\n');self.reject(p,'source scope')
 def test_event_line_change(self):
  p=self.copy();source(p,'src/instructions/extend_account.rs',lambda b:b.replace(b'#[event(',b'\n#[event(',1));self.reject(p,'source transformation')
 def test_broad_remap(self):
  p=self.copy();source(p,'Cargo.toml',lambda b:b.replace(b'vendor/anchor-lang/src/bpf_writer.rs=src/bpf_writer.rs',b'vendor/anchor-lang/src/=src/'));self.reject(p,'source transformation')
 def test_restored_source_record(self):
  p=self.copy();reader=v.module('change_reader',p/'reader.py')
  with tempfile.TemporaryDirectory()as td:
   f=Path(td)/'x.so';f.write_bytes(v.raw(p/'builds/first/symbols.so.gz'));e=reader.Elf(f);base=v.module('change_base',v.R/v.BASE/'verify.py');table,_=base.tables(e);a=next(s['value']for s in e.symbols if 'BpfWriter'in s['name']and'9write_all'in s['name']);at=next(d['target']for d in table[a]['data_references']if d['offset']==256)
  def change(b):struct.pack_into('<I',b,at+16,34);return b
  images(p,change);self.reject(p,'target Source correction')
 def test_nested_debug_header(self):
  p=self.copy();at=v.read(p/'analysis/nested-debug.json')['selected_data'][1]['nested_vtable']+8
  def change(b):b[at]^=1;return b
  images(p,change);self.reject(p,'scalar vtable header')
 def test_instruction_change(self):
  p=self.copy()
  def change(b):b[0x120+1]^=0x10;return b
  images(p,change);self.reject(p,'body match|raw match|existing function shape|positive edge loss|physical function shape')
 def test_qualified_name_binding(self):
  p=self.copy();f=p/'layout/symbol-renames.json';j=v.read(f);j[next(iter(j))]='not_an_emitted_symbol';f.write_text(json.dumps(j,indent=2)+'\n');self.reject(p,'symbol rename scope')
 def test_anchor_baseline(self):
  p=self.copy();f=p/'controls/baseline-anchor.rlib.gz';b=bytearray(v.raw(f));b[-8]^=1;f.write_bytes(gzip.compress(b,mtime=0));self.reject(p,'unchanged anchor baseline')
 def test_runtime_artifact_binding(self):
  p=self.copy();f=p/'runtime/status.json';j=v.read(f);j['candidate_sha256']='0'*64;f.write_text(json.dumps(j,indent=2)+'\n');self.reject(p,'runtime artifact binding')
 def test_remap_scope_in_compiler_record(self):
  p=self.copy();f=p/'builds/first/builds.json';j=v.read(f);j[-1]['command'].append('--remap-path-prefix=vendor/anchor-lang/src/bpf_writer.rs=src/bpf_writer.rs');f.write_text(json.dumps(j,indent=2)+'\n');self.reject(p,'exact-file remap scope')
 def test_original_not_compiler_input(self):
  p=self.copy();f=p/'builds/first/builds.json';j=v.read(f);j[-1]['command'].append(str(v.R/'evidence/original/mayhem/deployed.so'));f.write_text(json.dumps(j,indent=2)+'\n');self.reject(p,'original used as compiler input')
 def runtime_change(self,p,name,change):
  f=p/'runtime'/name
  raw=lzma.decompress(f.read_bytes())if f.suffix=='.xz'else gzip.decompress(f.read_bytes())
  report=json.loads(raw);change(report);body=(json.dumps(report,sort_keys=True)+'\n').encode()
  f.write_bytes(lzma.compress(body,preset=0)if f.suffix=='.xz'else gzip.compress(body,mtime=0))
  inputs=p/'runtime/inputs.json';j=v.read(inputs);j['staged_files'][name]=v.sha(f.read_bytes());inputs.write_text(json.dumps(j,indent=2)+'\n');seal(p);v.package(p)
 def signature(self,encoded):
  raw=bytearray(base64.b64decode(encoded));self.assertTrue(0<raw[0]<128);raw[1]^=1;return base64.b64encode(raw).decode()
 def runtime_base(self,p):
  return v.module('negative_runtime_base',v.R/v.BASE/'runtime_verifier.py').check(p,v.R,v.raw(p/'builds/first/candidate.so.gz'))
 def test_positive_runtime(self):
  self.assertEqual(v.runtime(v.P,v.R,{'first':[v.raw(v.P/'builds/first/candidate.so.gz')]},True)['total_signed_records'],14042)
 def test_trade_signature_resealed(self):
  p=self.copy()
  def change(j):
   row=j['cases'][0];bad=self.signature(row['original']['transaction_base64'])
   for label in ['original','candidate']:row[label]['transaction_base64']=bad
  self.runtime_change(p,'trades/buy.json.xz',change)
  with self.assertRaises(AssertionError):self.runtime_base(p)
 def test_trade_complete_case_resealed(self):
  p=self.copy()
  def change(j):
   row=j['cases'][0];row['case']['unrecorded_flag']=True
   for label in ['original','candidate']:
    if 'case'in row[label]:row[label]['case']['unrecorded_flag']=True
  self.runtime_change(p,'trades/buy.json.xz',change)
  with self.assertRaises(AssertionError):self.runtime_base(p)
 def test_trade_program_identity_resealed(self):
  p=self.copy()
  def change(j):j['cases'][0]['candidate']['before']['MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e']['data_sha256']='0'*64
  self.runtime_change(p,'trades/buy.json.xz',change)
  with self.assertRaisesRegex(ValueError,'actual Mayhem program'):self.runtime_base(p)
 def test_extend_signature_resealed(self):
  p=self.copy()
  def change(j):
   row=j['cases'][0];bad=self.signature(row['original_transaction_base64'])
   for label in ['original','candidate']:row[label+'_transaction_base64']=bad
  self.runtime_change(p,'extend/report.json.gz',change)
  with self.assertRaisesRegex(ValueError,'extension signature'):
   v.module('negative_extend_runtime',p/'runtime_verify.py').check_extend(p,v.R,v.raw(p/'builds/first/candidate.so.gz'))
 def test_initializer_signature_resealed(self):
  p=self.copy()
  def change(j):
   row=j['cases'][0];bad=self.signature(row['original']['signed_transaction_base64'])
   for label in ['original','candidate']:
    row[label]['signed_transaction_base64']=bad
    row[label+'_executions'][0]['signed_transaction_base64']=bad
  self.runtime_change(p,'first/rejections.json.gz',change)
  with self.assertRaises(AssertionError):
   v.module('negative_init_runtime',p/'runtime/initializer_check.py').verify(v.R,p,True,v.sha(v.raw(p/'builds/first/candidate.so.gz')),'first')
if __name__=='__main__':unittest.main()
