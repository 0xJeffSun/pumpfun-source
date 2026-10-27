"""Bound the last three saved account-cohort references, without output edits."""
from pathlib import Path
import argparse,gzip,hashlib,importlib.util,json,re,struct,tempfile

P=Path(__file__).resolve().parent;R=P.parents[1]
PRIOR=R/'research/mayhem-account-data-extents'
PARENT=R/'research/mayhem-sell-quote-call-recovery'
sha=lambda b:hashlib.sha256(b).hexdigest()

def module(name,path):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m

def llvm_bytes(text):
 out=bytearray();i=0
 while i<len(text):
  if text[i]=='\\':out.append(int(text[i+1:i+3],16));i+=3
  else:out.append(ord(text[i]));i+=1
 return bytes(out)

def abi(label="probe-01"):
 receipt=json.loads((P/label/'result.json').read_bytes());launch=json.loads((P/label/'launch.json').read_bytes())
 ir=(P/label/'abi_probe.ll').read_bytes();assert sha(ir)==receipt['llvm_ir_sha256']
 assert sha((P/'abi_probe.rs').read_bytes())==launch['source_sha256']
 assert receipt['returncode']==0 and receipt['source_unchanged'] and receipt['compiler_unchanged']
 assert launch['target_inventory']==json.loads((R/'research/mayhem-source-data-recovery/provenance/target-libraries.json').read_bytes())
 compiler_hashes=[h for p,h in json.loads((R/'research/mayhem-source-data-recovery/builds/recovered/launch.json').read_bytes())['checked_tools'].items()if p.endswith('/bin/rustc')]
 assert compiler_hashes==[launch['compiler_sha256']]
 assert sha((P/label/'stdout').read_bytes())==receipt['stdout_sha256'] and sha((P/label/'stderr').read_bytes())==receipt['stderr_sha256']
 assert launch['command'][1:-2]==['--crate-name','mayhem_data_abi','--edition','2021','--crate-type','lib','--target','sbpf-solana-solana','-C','opt-level=3','-C','panic=abort','-C','overflow-checks=on','--emit=llvm-ir','-o']
 if label=='probe-02':
  assert receipt['target_libraries_unchanged'] and launch['controller_sha256']==sha((P/'build_probe.py').read_bytes())
 t=ir.decode();get=lambda n:llvm_bytes(re.search(r'@'+n+r' = .*? c"([^\n]*)", align',t).group(1))
 io=list(struct.unpack('<7Q',get('IO_LAYOUT')));hs=list(struct.unpack('<2Q',get('HASHSET_LAYOUT')))
 assert io==[24,8,0,16,1,8,37] and hs==[48,8]
 empty=re.search(r'(@[^ ]+) = private unnamed_addr constant <\{ ptr, \[24 x i8\] \}> <\{ ptr (@[^,]+), \[24 x i8\] zeroinitializer \}>, align 8',t)
 assert empty
 ctrl=empty[2];assert re.search(re.escape(ctrl)+r' = .*? \[8 x i8\] c"'+re.escape('\\FF'*8)+r'", align 8',t)
 body=re.search(r'define void @empty_key_set\([^\n]*\) [^{]*\{(.*?)\n\}',t,re.S).group(1)
 assert 'sret([48 x i8])' in t and 'dereferenceable(32) '+empty[1] in body and 'i64 32, i1 false' in body
 assert re.search(r'getelementptr[^\n]*i64 32',body) and re.search(r'@llvm.memset[^\n]*i8 0, i64 16',body)
 eof=re.search(r'define noundef nonnull ptr @known_eof\([^\n]*\) [^{]*\{\s*start:\s*ret ptr (@[^\s]+)',t).group(1)
 assert re.search(re.escape(eof)+r' = .*? <\{ ptr, \[9 x i8\], \[7 x i8\] \}>',t)
 return {'io_layout':io,'hashset_layout':hs,'empty_control_bytes':8,'ir_sha256':sha(ir),'compiler_sha256':launch['compiler_sha256'],'source_sha256':launch['source_sha256']}

class Refinement:
 def __init__(self,o,c):
  self.o,self.c=o,c
  rows=json.loads((R/'research/mayhem-full-curve-recovery/audit.json').read_bytes())['rows']
  self.ow={x['start']:o.window(x['start'],x['end'])for x in rows}
  self.cw={s['value']:c.window(s['value'],s['value']+s['size'])for s in c.symbols if s['info']&15==2 and s['size']>=8 and c.lo<=s['value']<c.hi}
  self.layout=abi()
 @staticmethod
 def key(w):return [w['end']-w['start'],w['normalized_sha256'],json.dumps(w['normalization_pattern'],sort_keys=True)]
 @staticmethod
 def insn(e,p):return struct.unpack_from('<BBhi',e.b,p)
 @staticmethod
 def pointer(e,p):
  assert e.rel[p]['type']==8;zero,target=struct.unpack_from('<II',e.b,p);assert zero==0;return target
 def call(self,e,start,offset,expected):
  windows=self.ow if e is self.o else self.cw;w=windows[start]
  d=next(x for x in w['direct']if x['offset']==offset)
  assert d['target']in windows and self.key(windows[d['target']])==self.key(self.ow[expected])
  return d['target']
 def close_io(self,ref):
  values=[];consumers=[]
  for e,start,p in [(self.o,ref['original_body'],ref['original_target']),(self.c,ref['candidate_body'],ref['candidate_target'])]:
   assert p%self.layout['io_layout'][1]==0
   w=(self.ow if e is self.o else self.cw)[start]
   assert any(d['offset']==ref['offset'] and d['target']==p for d in w['data_references'])
   assert self.insn(e,start+ref['offset'])[:2]==(0x18,1)
   target=self.call(e,start,ref['offset']+16,665904)
   assert self.insn(e,target+8)==(0x57,6,0,3) # tagged Error mask
   assert self.insn(e,target+24)[:2]==(0x55,6) and self.insn(e,target+24)[3]==0
   assert self.insn(e,target+32)==(0x71,0x12,16,0) # SimpleMessage.kind: one byte
   assert self.insn(e,target+48)[:2]==(0x55,2) and self.insn(e,target+48)[3]==37
   message=self.pointer(e,p);length=struct.unpack_from('<Q',e.b,p+8)[0]
   assert length==27
   values.append({'object_bytes':24,'tag':p&3,'message_bytes':length,'message_hex':e.b[message:message+length].hex(),'kind':e.b[p+16],'padding_observed_hex':e.b[p+17:p+24].hex()})
   consumers.append({'target':target,'kind_read_offset':32,'kind_read_bytes':1,'object_field_offset':16})
  equal=values[0]==values[1] and values[0]['message_hex']==b'failed to fill whole buffer'.hex() and values[0]['kind']==37
  return {'kind':'tag0_std_io_SimpleMessage','original':values[0],'candidate':values[1],'consumers':consumers,'padding_note':'Seven ABI padding bytes are not assigned semantics; their saved bytes are compared separately.','equal':equal}
 def close_hash(self,ref):
  values=[];consumers=[]
  for e,start,p in [(self.o,ref['original_body'],ref['original_target']),(self.c,ref['candidate_body'],ref['candidate_target'])]:
   at=start+ref['offset'];assert self.insn(e,at)[:2]==(0x18,1)
   assert any(d['offset']==ref['offset'] and d['target']==p for d in (self.ow if e is self.o else self.cw)[start]['data_references'])
   stores=[]
   for load,store,field,register in [(16,24,24,0x12),(32,40,16,0x12),(48,56,8,0x12),(64,72,0,0x11)]:
    assert self.insn(e,at+load)==(0x79,register,field,0)
    op,regs,slot,imm=self.insn(e,at+store);assert op==0x7b and regs==((register&15)<<4)|10 and imm==0
    stores.append((field,slot))
   base=dict(stores)[0];assert all(slot==base+field for field,slot in stores)
   assert self.insn(e,at+80)==(0x7a,10,base+32,0) and self.insn(e,at+88)==(0x7a,10,base+40,0)
   assert self.insn(e,at+136)==(0xb7,3,0,48)
   self.call(e,start,ref['offset']+144,697736) # completed48-byte set copied with memcpy
   insert=self.call(e,start,ref['offset']+248,43888)
   assert self.insn(e,at+240)==(0xbf,0x91,0,0) # same set pointer r9 passed as r1
   ctrl=self.pointer(e,p);zeros=e.b[p+8:p+32]
   assert ctrl%8==0
   values.append({'header_bytes':32,'scalar_tail_hex':zeros.hex(),'control_bytes':8,'control_hex':e.b[ctrl:ctrl+8].hex(),'constructed_set_bytes':48,'hasher_zero_bytes':16})
   consumers.append({'header_load_fields':[24,16,8,0],'memcpy_offset':ref['offset']+144,'insert_offset':ref['offset']+248,'insert_target':insert})
  expected_zero=bytes(24).hex();expected_ctrl=(b'\xff'*8).hex()
  equal=values[0]==values[1] and values[0]['scalar_tail_hex']==expected_zero and values[0]['control_hex']==expected_ctrl
  return {'kind':'empty_hashbrown_RawTable_header','original':values[0],'candidate':values[1],'consumers':consumers,'equal':equal}
 def close(self,ref):
  assert self.key(self.ow[ref['original_body']])==self.key(self.cw[ref['candidate_body']])
  if ref['original_target']==0xb1220:return self.close_io(ref)
  if ref['original_target']==0xb1340:return self.close_hash(ref)
  raise AssertionError('out of scope')

def generate():
 m=module('data_refinement_elf',R/'repro/mayhem/global-params-layout-recovery/tools/layer01.py')
 with tempfile.TemporaryDirectory()as temp:
  p=Path(temp)/'symbols.so';p.write_bytes(gzip.decompress((PARENT/'artifacts/recovered/symbols.so.gz').read_bytes()))
  o,c=m.Elf(R/'evidence/original/mayhem/deployed.so'),m.Elf(p)
  prior=json.loads((PRIOR/'audit.json').read_bytes());assert sha(c.b)==prior['symbols_sha256'] and sha(o.b)==prior['original_sha256']
  audit=Refinement(o,c);refs=[r for r in prior['references']if r['equal']is None];assert len(refs)==3
  repeat_abi=abi('probe-02');assert repeat_abi==audit.layout
  proofs=[dict(reference=r,**audit.close(r))for r in refs]
  assert all(r['equal']for r in proofs)
  return {'original_sha256':sha(o.b),'symbols_sha256':sha(c.b),'candidate_sha256':prior['candidate_sha256'],'abi':audit.layout,'repeat_abi':repeat_abi,'proofs':proofs,'summary':{'new_typed_equal':3,'remaining_in_saved_cohort':0,'total_typed_equal':prior['summary']['total_typed_equal']+3},'scope':'Only the three saved account-cohort references. Typed object bounds and pointer-target contents, not raw pointer equality, arbitrary data, graph or whole-ELF identity.'}

if __name__=='__main__':
 parser=argparse.ArgumentParser();parser.add_argument('--check',action='store_true');args=parser.parse_args()
 out=(json.dumps(generate(),indent=2)+'\n').encode()
 if args.check:assert (P/'audit.json').read_bytes()==out
 else:(P/'audit.json').write_bytes(out)
 print(json.loads(out)['summary'])
