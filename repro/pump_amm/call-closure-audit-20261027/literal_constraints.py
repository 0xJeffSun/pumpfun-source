#!/usr/bin/env python3
"""Check bounded literal consumers across all body-match pairs and propagate failures."""
from pathlib import Path
import argparse,collections,hashlib,json,struct,sys
ROOT=Path(__file__).resolve().parents[3]
sys.path.insert(0,str(ROOT/'repro/pump_amm/claim-self-transfer-v144/static-tool'))
from elf_reader import Elf
HERE=Path(__file__).resolve().parent
BASE=ROOT/'repro/pump_amm/diagnostic-parity-20261027/results'
def ptr(e,at):return struct.unpack_from('<I',e.b,at+4)[0]|(struct.unpack_from('<I',e.b,at+12)[0]<<32)
def data(e,p,n):
 s=e.secs['.rodata'];return e.b[p:p+n]if s[4]<=p and p+n<=s[4]+s[5]else None

def analyze(candidate,symbols,closure):
 o=Elf(ROOT/'evidence/original/pump_amm/deployed.so');c=Elf(candidate);s=Elf(symbols)
 assert closure['candidate_sha256']==hashlib.sha256(c.b).hexdigest()
 pairs={(p['original'],p['candidate']):p for p in closure['pairs']}
 names=collections.defaultdict(list)
 for f in s.funcs:names[f['start']].append(f['name'])
 rows=[]
 for key,p in pairs.items():
  start=p['original'];end=start+p['bytes'];target=p['candidate'];labels=set();state={}
  at=start
  while at<end:
   op=o.b[at]
   if op&7 in [5,6]and op not in [0x85,0x8d,0x95]:labels.add(at+8+struct.unpack_from('<h',o.b,at+2)[0]*8)
   at+=16 if op==0x18 else 8
  at=start
  while at<end:
   if at in labels:state.clear()
   ca=target+at-start;op=o.b[at];dst=o.b[at+1]&15;src=o.b[at+1]>>4
   if op==0x18:
    a,b=ptr(o,at),ptr(c,ca);state[dst]=('ptr',a,b)if data(o,a,0)is not None and data(c,b,0)is not None else None;at+=16;continue
   if op==0xb7:state[dst]=('imm',struct.unpack_from('<i',o.b,at+4)[0]);at+=8;continue
   if op==0xbf:state[dst]=state.get(src);at+=8;continue
   if op==0x07:
    old=state.get(dst);offset=struct.unpack_from('<i',o.b,at+4)[0];state[dst]=('ptr',old[1]+offset,old[2]+offset)if old and old[0]=='ptr'else None;at+=8;continue
   if op==0x85:
    rel=o.relocations.get(at);crel=c.relocations.get(ca);ot=o.calls.get(at);ct=c.calls.get(ca);consumer=''
    if rel and crel and rel.get('type')==crel.get('type')==10 and rel['symbol']==crel['symbol']:consumer=rel['symbol']
    elif (ot,ct)in pairs:
     ns=names.get(ct,[])
     consumer=next((n for n in ns if 'with_account_name'in n or ('Formatter'in n and 'write_str'in n)or n in ('memcmp','sol_memcmp_')),'')
    operands=[]
    if consumer=='sol_log_'or'with_account_name'in consumer or('Formatter'in consumer and'write_str'in consumer):
     operands=[(r,state.get(r+1))for r in range(1,5)if state.get(r)and state[r][0]=='ptr']
    elif consumer in ('memcmp','sol_memcmp_'):
     operands=[(r,state.get(3))for r in (1,2)if state.get(r)and state[r][0]=='ptr']
    for register,size in operands:
     if not size or size[0]!='imm'or not 0<size[1]<=256:continue
     n=size[1];_,a,b=state[register];x,y=data(o,a,n),data(c,b,n)
     if x is None or y is None:continue
     rows.append({'original':start,'candidate':target,'call_offset':at-start,'consumer':consumer,'register':register,'length':n,'original_pointer':a,'candidate_pointer':b,'original_hex':x.hex(),'candidate_hex':y.hex(),'equal':x==y})
    state={r:v for r,v in state.items()if r>=6}
   elif op==0x8d:state={r:v for r,v in state.items()if r>=6}
   elif op&7 in [0,1,4,7]:state.pop(dst,None)
   elif op&7 in [5,6]:state.clear()
   at+=8
 bad={(r['original'],r['candidate'])for r in rows if not r['equal']}
 active={k for k,p in pairs.items()if p['in_internal_direct_closure']and k not in bad};rounds=[]
 while True:
  rejected={k for k in active if any((e['original_target'],e['candidate_target'])not in active for e in pairs[k]['edges'])}
  if not rejected:break
  rounds.append(len(rejected));active-=rejected
 return {'candidate_sha256':closure['candidate_sha256'],'scope':'Conservative straight-block register tracking of bounded .rodata slices passed to identified string/memcmp consumers. Compares all body-match pairs; unequal observed literal slices reject a pair before fixed-point propagation through actual direct calls. Equal observed slices do not prove unobserved static data, indirect calls, external providers or semantic equivalence.','counts':{'observed_literal_uses':len(rows),'equal_literal_uses':sum(r['equal']for r in rows),'unequal_literal_uses':sum(not r['equal']for r in rows),'pairs_with_observed_literal_difference':len(bad),'direct_closure_pairs_after_observed_literal_constraints':len(active),'direct_closure_windows_after_observed_literal_constraints':len({a for a,b in active})},'pruning_rounds':rounds,'observations':rows,'remaining_pairs':[list(k)for k in sorted(active)]}
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,default=BASE/'build/candidate.so');p.add_argument('--symbols',type=Path,default=BASE/'build/unstripped.so');p.add_argument('--closure',type=Path,default=HERE/'results.json');p.add_argument('--output',type=Path);a=p.parse_args();r=analyze(a.candidate,a.symbols,json.loads(a.closure.read_text()))
 if a.output:assert not a.output.exists();a.output.write_text(json.dumps(r,indent=2)+'\n')
 print(json.dumps(r['counts'],indent=2))
