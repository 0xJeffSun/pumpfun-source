#!/usr/bin/env python3
"""Check literal bytes at conservatively tracked named slice consumers; not whole-data equivalence."""
from pathlib import Path
import gzip,hashlib,json,struct,sys
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'repro/pump_amm/claim-self-transfer-v144/static-tool'))
from elf_reader import Elf
BASE=ROOT/'repro/pump_amm/typed-account-decoder-20261026/results'
o=Elf(ROOT/'evidence/original/pump_amm/deployed.so');c=Elf(BASE/'build/candidate.so');symbols=Elf(BASE/'build/unstripped.so');m=json.loads(gzip.decompress((BASE/'measurement.json.gz').read_bytes()))
names={f['start']:f['name']for f in symbols.funcs};pairs={(r['start'],t['start'])for r in m['rows']for t in r['matches']}
def ptr(e,at):return struct.unpack_from('<I',e.b,at+4)[0]|(struct.unpack_from('<I',e.b,at+12)[0]<<32)
def data(e,p,n):
 s=e.secs['.rodata'];return e.b[p:p+n]if s[4]<=p and p+n<=s[4]+s[5]else None
rows=[]
for w in m['rows']:
 if not w['matches']:continue
 match=w['matches'][0];start,end=w['start'],w['end'];target=match['start'];state={};labels=set()
 for at in range(start,end,8):
  op=o.b[at]
  if op&7==5 and op not in (0x85,0x8d,0x95):labels.add(at+8+struct.unpack_from('<h',o.b,at+2)[0]*8)
 at=start
 while at<end:
  if at in labels:state.clear()
  other=target+at-start;op=o.b[at];dst=o.b[at+1]&15;src=o.b[at+1]>>4
  if op==0x18:
   a,b=ptr(o,at),ptr(c,other);state[dst]=('ptr',a,b)if data(o,a,0)is not None and data(c,b,0)is not None else None;at+=16;continue
  if op==0xb7:state[dst]=('imm',struct.unpack_from('<i',o.b,at+4)[0]);at+=8;continue
  if op==0xbf:state[dst]=state.get(src);at+=8;continue
  if op==0x85:
   rel=o.relocations.get(at);crel=c.relocations.get(other);ot=o.calls.get(at);ct=c.calls.get(other);name=''
   if rel and crel and rel.get('type')==crel.get('type')==10 and rel['symbol']==crel['symbol']:name=rel['symbol']
   elif (ot,ct)in pairs:name=names.get(ct,'')
   consumers=[]
   if name=='sol_log_' or 'with_account_name' in name or ('Formatter' in name and 'write_str' in name):
    consumers=[(r,state.get(r+1))for r in range(1,5)if state.get(r)and state[r][0]=='ptr']
   elif name in ('memcmp','sol_memcmp_'):
    consumers=[(r,state.get(3))for r in (1,2)if state.get(r)and state[r][0]=='ptr']
   for reg,size in consumers:
    if not size or size[0]!='imm' or not 0<size[1]<=256:continue
    n=size[1];_,a,b=state[reg];x,y=data(o,a,n),data(c,b,n)
    if x is None or y is None:continue
    rows.append({'original_window':start,'candidate_window':target,'call_offset':at-start,'callee':name,'pointer_register':reg,'bytes':n,'original_pointer':a,'candidate_pointer':b,'original_hex':x.hex(),'candidate_hex':y.hex(),'equal':x==y})
   state={r:v for r,v in state.items()if r>=6}
  elif op&7 in (0,1,4,7):state.pop(dst,None)
  elif op&7==5:state.clear()
  at+=8
result={'candidate_sha256':hashlib.sha256(c.b).hexdigest(),'rows':rows,'scope':'Conservative straight-line register tracking to named string-slice or memcmp consumers. Internal callees require actual matched target pairing. Only bounded .rodata bytes are checked; no full-data or indirect-call claim.'}
p=Path(__file__).with_name('literal-slices.json');assert not p.exists();p.write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({'observed_literal_uses':len(rows),'equal':sum(r['equal']for r in rows),'different':sum(not r['equal']for r in rows)}))
