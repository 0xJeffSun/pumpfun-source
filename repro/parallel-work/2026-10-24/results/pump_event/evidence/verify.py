#!/usr/bin/env python3
"""Offline stdlib-only raw evidence checks; no build or program execution."""
from pathlib import Path
import hashlib,json,struct,re
P=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
for x in json.loads((P/'inputs.json').read_text()):
 b=(P/x['file']).read_bytes();assert len(b)==x['size'] and sha(b)==x['sha256'],x['file']
b=(P/'evidence/original.so').read_bytes()
for x in json.loads((P/'ranges.json').read_text()):
 assert sha(b[x['start']:x['end_exclusive']])==x['sha256']
 for line in (P/x['assembly']).read_text().splitlines():
  m=re.match(r'\s*([0-9a-f]+):\s+((?:[0-9a-f]{2} )+)',line);assert m,line
  a=int(m[1],16);raw=bytes.fromhex(m[2]);assert b[a:a+len(raw)]==raw

def ins(a):return struct.unpack_from('<BBhi',b,a)
def call(a,t):
 op,reg,off,imm=ins(a);assert (op,reg)==(0x85,0x10) and a+8+8*imm==t
# Layout: entry r2 preserved as r7; last field loaded and appended.
assert ins(0x1624b0)==(0xbf,0x27,0,0)
assert ins(0x1638d8)==(0x79,0x76,0x198,0)
assert ins(0x163920)==(0x7b,0x61,0,0)
assert ins(0x163928)==(0x07,0x02,0,8)
rows=[('buy',0x14c038,0x14de28,0x14de60,6,-0x420,0x14de70,0x14df18,0x12a888),('buy_exact_sol_in',0x14f4e0,0x151d50,0x151d88,8,-0x420,0x151d98,0x151e48,0x12af70),('sell',0x152888,0x1544d0,0x154508,7,-0x308,0x154518,0x1545c0,0x12b4c0)]
results=[]
for name,start,write,base,r,disp,first,second,wrapper in rows:
 call(wrapper,start);call(first,0x1624b0);call(second,0x1624b0)
 assert ins(write)==(0x7a,0x0a,disp+0x198,0)
 assert ins(base-8)==(0xbf,0xa0+r,0,0)
 assert ins(base)==(7,r,0,disp)
 assert ins(first-8)==(0xbf,(r<<4)|2,0,0)
 assert ins(second-8)==(0xbf,(r<<4)|2,0,0)
 # Intraprocedural CFG: no path from handler entry to first serialization
 # can avoid the zero-store (calls treated as returning opaque nodes).
 todo=[start];seen=set()
 while todo:
  a=todo.pop()
  if a in seen or a==write or not start<=a<=first:continue
  assert a!=first,(name,'zero store not dominating first call')
  seen.add(a);op,regs,off,imm=ins(a)
  if op==0x95:continue
  if op==0x18:todo.append(a+16)
  elif op==0x05:todo.append(a+8+8*off)
  elif op&7 in (5,6) and op not in (0x85,0x8d):todo.extend((a+8,a+8+8*off))
  else:todo.append(a+8)
 results.append(dict(handler=name,event_base=disp,field_slot=disp+0x198,zero_store=hex(write),first_call=hex(first),second_call=hex(second),first_call_dominated_by_zero_store=True))
# Recheck complete serializer normalization against current candidate, using symbols.
c=(P/'evidence/candidate.so').read_bytes();u=(P/'evidence/unstripped.so').read_bytes()
def elf(z):
 off=struct.unpack_from('<Q',z,40)[0];size,n,ni=struct.unpack_from('<HHH',z,58);ss=[struct.unpack_from('<IIQQQQIIQQ',z,off+i*size) for i in range(n)];ns=ss[ni];names=z[ns[4]:ns[4]+ns[5]];d={names[s[0]:].split(b'\0')[0].decode():s for s in ss};return ss,d
ss,d=elf(u);s=d['.symtab'];st=ss[s[6]];strings=u[st[4]:st[4]+st[5]]
found=[]
for p in range(s[4],s[4]+s[5],24):
 n,info,_,idx,value,length=struct.unpack_from('<IBBHQQ',u,p);name=strings[n:].split(b'\0')[0].decode()
 if 'TradeEvent' in name and length==5432:found.append((value,length,name))
assert len(found)==1,found
at,length,name=found[0];assert c[at:at+length]==u[at:at+length]
def norm(z,start,size):
 _,d=elf(z);rel=d['.rel.dyn'];rels={struct.unpack_from('<QQ',z,p)[0]:struct.unpack_from('<QQ',z,p)[1]&0xffffffff for p in range(rel[4],rel[4]+rel[5],16)};a=bytearray(z[start:start+size]);pattern=[]
 for p in range(start,start+size,8):
  q=p-start
  if z[p:p+2]==b'\x85\x10':a[q+4:q+8]=bytes(4)
  if p in rels:
   t=rels[p];pattern.append((q,t))
   if t==8 and z[p]==0x18:a[q+4:q+8]=bytes(4);a[q+12:q+16]=bytes(4)
   elif t==10 and z[p]==0x85:a[q+4:q+8]=bytes(4)
 return a,pattern
assert norm(b,0x1624b0,5432)==norm(c,at,5432)
print(json.dumps({'verified':True,'legacy_dataflow':results,'current_serializer':{'start':hex(at),'size':length,'symbol':name,'normalized_complete_match':True},'limits':'Opaque callees; intraprocedural first-call dominance only. No all-path semantic or historical-name proof.'},indent=2))
