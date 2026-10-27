#!/usr/bin/env python3
"""Resolve two concrete core::fmt::write callback contexts and conditional drop effects."""
from pathlib import Path
import collections,hashlib,json,struct,sys
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'repro/pump_amm/claim-self-transfer-v144/static-tool'))
from elf_reader import Elf
BASE=ROOT/'repro/pump_amm/diagnostic-parity-20261027/results'
CLOSURE=ROOT/'repro/pump_amm/call-closure-audit-20261027/results.json'

def ptr(e,at):return struct.unpack_from('<I',e.b,at+4)[0]|struct.unpack_from('<I',e.b,at+12)[0]<<32
def val(e,at):
 raw=struct.unpack_from('<Q',e.b,at)[0]
 if e.relocations.get(at)=={'type':8,'symbol':''}:assert raw&0xffffffff==0;return raw>>32
 return raw

def block(e,start,end):
 regs={r:('input',r)for r in range(10)};regs[10]=('stack',0);memory={};at=start
 while at<end:
  op=e.b[at];dst=e.b[at+1]&15;src=e.b[at+1]>>4;off=struct.unpack_from('<h',e.b,at+2)[0];imm=struct.unpack_from('<i',e.b,at+4)[0]
  if op==0x18:regs[dst]=('absolute',ptr(e,at));at+=16;continue
  if op==0xbf:regs[dst]=regs[src]
  elif op==0xb7:regs[dst]=('int',imm)
  elif op==0x07:
   kind,v=regs[dst];regs[dst]=(kind,v+imm)if kind in ('stack','int','absolute')else('unknown',at)
  elif op in (0x7b,0x63,0x73):
   base=regs[dst];assert base[0]=='stack';memory[(base[1]+off,{0x7b:8,0x63:4,0x73:1}[op])]=regs[src]
  elif op in (0x7a,0x62,0x72):
   base=regs[dst];assert base[0]=='stack';memory[(base[1]+off,{0x7a:8,0x62:4,0x72:1}[op])]=('int',imm)
  elif op in (0x79,0x61,0x71):
   base=regs[src];regs[dst]=memory.get((base[1]+off,{0x79:8,0x61:4,0x71:1}[op]),('unknown',at))if base[0]=='stack'else('unknown',at)
  else:raise AssertionError((hex(at),hex(op)))
  at+=8
 assert at==end and regs[3][0]=='stack'
 args=regs[3][1]
 def field(i):return memory.get((args+i,8),('unwritten',i))
 pieces,count,arguments,argument_count,fmt,fmt_count=[field(i)for i in range(0,48,8)]
 assert pieces[0]=='absolute'and count==('int',1)and arguments[0]=='stack'and argument_count==('int',1)
 callback=memory[(arguments[1]+8,8)];assert callback[0]=='absolute'
 if fmt==('int',0):index=0;path='unformatted';site=232
 else:
  assert fmt[0]=='stack'and fmt_count==('int',1);index_value=memory[(fmt[1]+32,8)];assert index_value==('int',0);index=0;path='formatted';site=480
 piece_ptr=val(e,pieces[1]);n=val(e,pieces[1]+8);assert n<=256
 data=e.b[piece_ptr:piece_ptr+n]if n else b'';assert len(data)==n
 return {'argument_count':1,'pieces_count':1,'prefix_hex':data.hex(),'format_path':path,'argument_index':index,'formatter_callback':callback[1],'core_format_callback_offset':site,'argument_value':memory[(arguments[1],8)]}

def audit():
 o=Elf(ROOT/'evidence/original/pump_amm/deployed.so');c=Elf(BASE/'build/candidate.so');s=Elf(BASE/'build/unstripped.so');cl=json.loads(CLOSURE.read_text());pairs={(p['original'],p['candidate']):p for p in cl['pairs']};names=collections.defaultdict(list)
 for f in s.funcs:names[f['start']].append(f['name'])
 contexts=[]
 specs=[('ProgramError IO-error display',0x109500,136012*8,136033*8),('Account-data hexadecimal debug',0x108918,135465*8,135497*8)]
 for label,owner,start,end in specs:
  possible=[p for p in cl['pairs']if p['original']==owner];assert len(possible)==1;p=possible[0];cs=p['candidate']+start-owner;ce=p['candidate']+end-owner
  a,b=block(o,start,end),block(c,cs,ce)
  assert {k:v for k,v in a.items()if k!='formatter_callback'}=={k:v for k,v in b.items()if k!='formatter_callback'}
  callback=pairs[(a['formatter_callback'],b['formatter_callback'])];assert callback['in_internal_direct_closure']
  ot=o.calls[end];ct=c.calls[ce];write=pairs[(ot,ct)];assert ot==0x1144e0 and write['in_internal_direct_closure'] and write['bytes']==1056
  assert a['core_format_callback_offset']in write['indirect_call_offsets']
  # Verify each selected generic call site loads the function at +8 of the
  # selected 16-byte (value pointer, function pointer) argument entry.
  site=ot+a['core_format_callback_offset'];assert o.b[site]==0x8d
  if a['format_path']=='unformatted':assert o.b[site-24:site-16]==bytes.fromhex('7983000000000000')
  else:assert o.b[site-24:site-16]==bytes.fromhex('7923080000000000')
  contexts.append({'label':label,'original_owner':owner,'candidate_owner':p['candidate'],'original_builder_start':start,'candidate_builder_start':cs,'original_format_call':end,'candidate_format_call':ce,'arguments':{k:v for k,v in a.items()if k!='argument_value'},'candidate_callback':b['formatter_callback'],'callback_names':names[b['formatter_callback']],'callback_body_bytes':callback['bytes'],'callback_body_and_direct_calls_match':True,'scope':'Concrete initial one-argument builder context. Dispatch resolution is conditional on the argument descriptors retaining their constructed values until loaded; arbitrary intervening writer/callback mutation is not ruled out. Other instantiations remain unresolved.'})
 # Three alternate String drops are genuine extra-load/call implementations,
 # but their only called function is a literal return-only deallocator.
 drops=[]
 for table,drop in [(0x1203f8,0xf4008),(0x120608,0xfd548),(0x121620,0x10e260)]:
  assert val(c,table)==drop;assert struct.unpack_from('<Q',c.b,table+8)[0]==24 and struct.unpack_from('<Q',c.b,table+16)[0]==8
  f=next(f for f in s.funcs if f['start']==drop);assert f['size']==48
  raw=c.b[drop:drop+48];expected=bytes.fromhex('791200000000000015020300000000007911080000000000b70300000100000085100000000000009500000000000000');normalized=bytearray(raw);normalized[36:40]=bytes(4);assert bytes(normalized)==expected
  target=c.calls[drop+32];tf=next(f for f in s.funcs if f['start']==target);assert tf['name']=='__rust_dealloc'and tf['size']==8 and c.b[target:target+8]==bytes.fromhex('9500000000000000')
  drops.append({'candidate_table':table,'candidate_drop':drop,'bytes':48,'deallocator':target,'deallocator_bytes':8,'conditional_effect':'For a readable 16-byte String header, both branch paths perform no memory writes, logs or syscalls and return; the nonzero-capacity path calls a literal return-only deallocator. The original drop is itself return-only. Invalid input pointers can differ, and byte identity remains false.'})
 pad_methods=[]
 for offset,original_size in [(24,168),(32,688)]:
  target=val(c,0x121820+offset);symbol=next(f for f in s.funcs if f['start']==target);assert 'PadAdapter'in symbol['name'] and symbol['size']!=original_size
  pad_methods.append({'vtable_offset':offset,'candidate_target':target,'candidate_name':symbol['name'],'original_body_bytes':original_size,'candidate_body_bytes':symbol['size'],'same_complete_body_impossible':True})
 return {'pad_adapter_identity_counterexample':pad_methods,'original_sha256':hashlib.sha256(o.b).hexdigest(),'candidate_sha256':hashlib.sha256(c.b).hexdigest(),'contexts':contexts,'conditional_drop_resolutions':drops,'unresolved_alternate_table':{'candidate_pointer':0x121820,'reason':'Its concrete methods are PadAdapter implementations rather than the original String writer methods. The table is excluded from the strict identity relation; this does not establish a deployed behavior bug.'},'scope':'Bounded static constructor and target verification. Does not assume that arbitrary formatting callbacks preserve escaped state, and does not upgrade global indirect-call closure counts.'}
if __name__=='__main__':
 p=Path(__file__).resolve().parent;out=p/'results.json';assert not out.exists();r=audit();out.write_text(json.dumps(r,indent=2)+'\n');print(json.dumps({'concrete_callback_contexts':len(r['contexts']),'conditional_string_drop_resolutions':len(r['conditional_drop_resolutions'])}))
