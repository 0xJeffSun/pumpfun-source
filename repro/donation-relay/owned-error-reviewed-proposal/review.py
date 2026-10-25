#!/usr/bin/env python3
"""Version-bound static evidence for an uncompiled owned-error proposal."""
import json,hashlib,struct
from pathlib import Path
from analyze import Elf
from disasm import render
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
ROOTS=[17,18,19,20,125,130,141,145,147,149,153,155,158,169,178,185,282,285,286,287,288,289,290,296,297,298]
def generate():
 e=Elf((P/'inputs/build06/original.so').read_bytes());fs=json.loads((P/'inputs/build06/original-function-ledger.json').read_text())
 starts={f['start']:f for f in fs};out={};roots=[]
 for i in ROOTS:
  f=fs[i];fresh=e.function(f['start'],f['bytes'],[]);assert all(f[k]==v for k,v in fresh.items())
  roots.append(f);out[f'evidence/original-{i}.asm']=render(e,f['start'],f['end'])
 def ins(pc):
  b=e.at(pc,8);op,r,off,imm=struct.unpack('<BBhi',b);return {'pc':pc,'raw_hex':b.hex(),'opcode':op,'registers':r,'offset':off,'immediate':imm}
 def value(pc,n):
  x=ins(pc);assert x['opcode']==0xb7 and x['immediate']==n;return x
 alloc=[]
 for role,size,p1,p2,call in [('AnchorError',160,665624,665632,665640),('ProgramErrorWithOrigin',128,652544,652552,652560)]:
  a,b=value(p1,size),value(p2,8);x=ins(call);assert call+8+x['immediate']*8==566472
  alloc.append({'role':role,'bytes':size,'alignment':8,'size_operand':a,'alignment_operand':b,'allocator_call':x})
 sites=[]
 for account,i,call,release in [('debouncer',17,14848,14888),('tracker',18,15816,15856),('distribution',20,17624,17664),('receipt',153,466592,466632),('whitelist shared boundary',158,504544,504584)]:
  assert any(x['pc']==call and x['target']==665312 for x in fs[i]['direct_calls']);assert release>call
  assert ins(release)['opcode']==0x7b
  sites.append({'account':account,'original_ordinal':i,'code_operand':value(call-8,3004),'constructor_call':ins(call),'borrow_release_store':ins(release)})
 def obj(addr,n):return {'address':addr,'bytes':n,'hex':e.at(addr,n).hex(),'sha256':H(e.at(addr,n))}
 def pieces(addr,n):
  rows=[]
  for i in range(n):
   a=addr+16*i;lo,ptr,z=struct.unpack('<IIQ',e.at(a,16));assert lo==0 and e.relocations[a]['type']==8
   rows.append({'descriptor':obj(a,16),'relocation':e.relocations[a],'literal':obj(ptr,z),'text':e.at(ptr,z).decode()})
  return rows
 names={'name':obj(762107,22),'message':pieces(776568,1)}
 assert bytes.fromhex(names['name']['hex'])==b'AccountDidNotSerialize'
 assert names['message'][0]['text']=='Failed to serialize the account'
 formats={k:pieces(a,n)for k,a,n in [('anchor_none',775328,4),('anchor_source',775392,6),('anchor_account',775488,5),('program_none',775056,4),('program_source',775120,6),('program_account',775216,5)]}
 # Original tags/offsets are raw evidence, not guarantees for the new compile.
 layout={'AnchorError':{'bytes':160,'origin':0,'name':32,'message':56,'compared_values':80,'code':152,'drop_order':['name','message','account-name origin if present','owned compared values if present','box']},'ProgramErrorWithOrigin':{'bytes':128,'origin':0,'program_error':32,'compared_values':56,'consuming_conversion':'move ProgramError out, drop owned origin/compared values and box'},'Error':{'anchor_tag':0,'program_tag':1,'pointer_offset':8},'origin_tags':{'source':0,'account_name':1,'none':2},'compared_tags':{'values':0,'pubkeys':1,'none':2},'limitations':'Observed original layout from producers, decorators, loggers and consuming converter. Natural Rust declarations, no repr or padding; new layout and actual targets require a future authorized build.'}
 edges=[{'caller_ordinal':f['ordinal'],'caller_start':f['start'],**x,'callee_ordinal':starts[x['target']]['ordinal']if x['target']in starts else None}for f in roots for x in f['direct_calls']]
 out.update({'original-roots.json':roots,'direct-target-ledger.json':edges,'allocation-witnesses.json':alloc,'serializer-error-order.json':sites,'error-literals.json':names,'format-piece-ledger.json':formats,'observed-original-layout.json':layout})
 return out
if __name__=='__main__':
 for n,v in generate().items():
  p=P/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(v if isinstance(v,str)else json.dumps(v,indent=2,sort_keys=True)+'\n')
 print('Static owned-error witnesses regenerated; no target execution.')
