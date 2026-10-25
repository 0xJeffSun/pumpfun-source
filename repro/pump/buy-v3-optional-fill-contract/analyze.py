"""Read fixed bytes and saved receipts; never load or execute target code."""
import json,gzip,struct
from pathlib import Path
from elf_reader import ELF,H
P=Path(__file__).resolve().parent
SPANS=[('wrapper',0x1286c8,0x128c28),('body',0x147ba0,0x1489f8),('memcmp_adapter',0x1b3678,0x1b36b8),('zero_values_prefix',0x340,0x6a0),('reserve_values_prefix',0x11b0,0x1510),('i32_display',0x1b30c0,0x1b3130),('u64_display',0x1b31b0,0x1b31d8),('zero_name_emit',0x15b648,0x15b690),('reserve_name_emit',0x15d4f8,0x15d558),('zero_message_arm',0x15e758,0x15e770),('reserve_message_arm',0x15eb00,0x15eb18)]
# Individual dispatch edges only: do not interpret other error variants.
DISPATCH=[0x1573a0,0x1573a8,0x1573b0,0x157858,0x157cc8,0x157cd0,0x157cd8,0x1596a0,0x15aad0,0x15de90,0x15de98,0x15dea0,0x15e050,0x15e1a8,0x15e1b0,0x15e1b8]
def row(e,pc):
 b=e.at(pc,8);op,reg,off,imm=struct.unpack('<BBhi',b)
 out=dict(pc=hex(pc),opcode=hex(op),dst=reg&15,src=reg>>4,offset=off,immediate=imm,bytes=e.at(pc,16 if op==0x18 else 8).hex())
 rel=[dict(offset=hex(r['offset']),type=r['type'],symbol=(r['symbol'] or {}).get('name'),raw=r['raw']) for r in e.reloc if pc<=r['offset']<pc+(16 if op==0x18 else 8)]
 if rel:out['relocations']=rel
 if op==0x85:out.update(encoded_target=hex(pc+8+8*imm),actual_target=None if rel or reg!=16 else hex(pc+8+8*imm))
 elif op==0x8d:out['actual_target']='unresolved indirect register'
 elif op&7 in (5,6) and op!=0x95:out.update(taken=hex(pc+8+off*8),fallthrough=None if op==5 else hex(pc+8))
 if op==0x18:out['lddw']=hex((imm&0xffffffff)+(struct.unpack('<I',e.at(pc+12,4))[0]<<32))
 return out

def analyze():
 e=ELF(P/'evidence/original.so'); c=(P/'evidence/current.so').read_bytes()
 spans=[]
 for name,a,z in SPANS:
  spans.append(dict(name=name,start=hex(a),end=hex(z),boundary='inspection span, not certified historical function extent',raw_sha256=H(e.at(a,z-a)),instructions=[row(e,pc) for pc,*_ in e.instructions(a,z)]))
 names=[]
 for name,parts,length in [('BuyZeroAmount',[(0x15b678,0),(0x15b660,5)],13),('NotEnoughTokensToBuy',[(0x15d528,0),(0x15d510,8),(0x15d548,16)],20)]:
  result=bytearray(length)
  for pc,at in parts:
   b=e.at(pc,16);v=b[4:8]+b[12:16] if b[0]==24 else b[4:8];result[at:at+len(v)]=v
  assert result.decode()==name
  names.append(dict(name=name,materialization=[dict(pc=hex(pc),output_offset=at) for pc,at in parts]))
 messages=[]
 for pc,ptr in [(0x15e758,0x1be290),(0x15eb00,0x1be2a0)]:
  b=e.at(ptr,16);target=struct.unpack_from('<I',b,4)[0];length=struct.unpack_from('<Q',b,8)[0]
  rs=[r for r in e.reloc if r['offset']==ptr];assert len(rs)==1 and rs[0]['type']==8
  messages.append(dict(arm=hex(pc),descriptor=hex(ptr),raw=b.hex(),relocation_type=8,relocation_raw=rs[0]['raw'],pointee=hex(target),size=length,text=e.at(target,length).decode()))
 receipt=json.loads(gzip.decompress((P/'evidence/v3_configured_fee.json.gz').read_bytes()));old=json.loads((P/'evidence/regressions.json').read_text());saved=[]
 for i,r in enumerate(receipt['cases']):
  if r['case']['operation']!='buy_v3':continue
  p=next(x for x in old if x['index']==i)
  assert r['case']==p['case'] and r['original']['error']==p['original_error'] and r['match']==p['match']
  saved.append(dict(index=i,case=r['case'],original_error=r['original']['error'],candidate_error=r['candidate']['error'],match=r['match'],base_mint_owner=p['base_mint_owner']))
 return dict(scope='static original-byte ledger and unchanged saved obligations; no Rust or target execution',original=dict(size=len(e.b),sha256=H(e.b)),current=dict(size=len(c),sha256=H(c)),whole_file_equal=e.b==c,normalized_body_equality='not claimed; no compiled proposal',spans=spans,error_dispatch_edges=[row(e,pc) for pc in DISPATCH],error_names=names,error_messages=messages,preservation=dict(original_sha256=receipt['original_sha256'],candidate_sha256=receipt['candidate_sha256'],count=len(saved),successes=sum(r['original_error'] is None for r in saved),rows=saved))
if __name__=='__main__':print(json.dumps(analyze(),indent=2))
