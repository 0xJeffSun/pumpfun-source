"""Measure rejected ownership controls and the remaining local copy schedule."""
from pathlib import Path
import gzip,hashlib,importlib.util,json,struct
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[1]
def read(p):return json.loads(gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes())
s=importlib.util.spec_from_file_location('cpi_control_windows',HERE/'window_map.py');w=importlib.util.module_from_spec(s);s.loader.exec_module(w)
def normalized(img,f):
 b=bytearray(w.m.at_address(img,f['address'],f['bytes']));rel=dict(w.m.relocations(img))
 for row in w.m.instructions(img,f['address'],f['bytes']):
  at=row['offset'];typ=rel.get(f['address']+at,0)&0xffffffff
  if 'call_target'in row or typ==10:b[at+4:at+8]=bytes(4)
  elif typ==8:b[at+4:at+8]=bytes(4);b[at+12:at+16]=bytes(4)
 return bytes(b)
def copy_effect(rows):
 assert len(rows)==6 and [x['opcode']for x in rows]==[0x79]*3+[0x7b]*3
 src={x['source']for x in rows[:3]};assert len(src)==1
 regs={x['destination']:x['displacement']for x in rows[:3]};assert sorted(regs.values())==[0,8,16]
 assert all(x['destination']==10 for x in rows[3:]);start=min(x['displacement']for x in rows[3:]);return {x['displacement']-start:regs[x['source']]for x in rows[3:]}
def analyze():
 e=read(HERE/'experiment.json');o=(ROOT/'evidence/original/pump_fees/deployed.so').read_bytes();ow=w.windows(o);oi={x['address']:x for x in ow};summary={};images={};base=None
 for label,row in e['variants'].items():
  c=gzip.decompress((HERE/row['files']['symbols']['path']).read_bytes());cw=w.windows(c);r=w.compare(ow,cw);covered=sorted(x['address']for x in ow if x['signature']in{f['signature']for f in cw});raw=sorted(x['address']for x in ow if x['raw_sha256']in{f['raw_sha256']for f in cw});targets={}
  for a,name in [(235304,'legacy_distribute_creator_fees'),(236240,'v2_distribute_creator_fees')]:
   f=next(f for f in cw if name in(f['name']or''));left,right=normalized(o,oi[a]),normalized(c,f);diff=[i for i in range(min(len(left),len(right)))if left[i]!=right[i]]
   targets[str(a)]={'candidate':f,'common_normalized_differing_byte_offsets':diff,'original_bytes':len(left),'candidate_bytes':len(right),'normalized_equal':left==right}
  summary[label]={'covered':covered,'raw':raw,'unique_pairs':len(r['unique_pairs']),'unmatched':len(r['unmatched_original']),'targets':targets};images[label]=(c,cw)
 base=set(summary['control']['covered'])
 for row in summary.values():row['gained']=sorted(set(row['covered'])-base);row['lost']=sorted(base-set(row['covered']))
 c,cw=images['argument-order'];ci={x['address']:x for x in cw};proofs={}
 for a,name,offset in [(235304,'legacy_distribute_creator_fees',584),(236240,'v2_distribute_creator_fees',704)]:
  f=next(f for f in cw if name in(f['name']or''));left=w.m.instructions(o,a,oi[a]['bytes']);right=w.m.instructions(c,f['address'],f['bytes']);assert len(left)==len(right)
  idx=next(i for i,x in enumerate(left)if x['offset']==offset);original_region=left[idx:idx+6];candidate_region=right[idx:idx+6];effect=copy_effect(original_region);assert effect==copy_effect(candidate_region)=={0:0,8:8,16:16}
  assert summary['argument-order']['targets'][str(a)]['common_normalized_differing_byte_offsets']==[offset+2,offset+18,offset+26,offset+42]
  for rows in [left,right]:
   following=rows[idx+6:idx+11];assert [(x['opcode'],x['destination'],x['source'])for x in following[:4]]==[(0xbf,1,10),(0x07,1,0),(0x79,2,10),(0xb7,3,0)]and following[4]['opcode']==0x85
  rel=dict(w.m.relocations(o));calls=[]
  for x,y in zip(left,right):
   if 'call_target'in x and rel.get(a+x['offset'],0)&0xffffffff!=10:calls.append({'offset':x['offset'],'equal':oi[x['call_target']]['signature']==ci[y['call_target']]['signature']})
  assert all(x['equal']for x in calls)
  proofs[str(a)]={'original':original_region,'candidate':candidate_region,'copy_effect':effect,'temporary_registers_overwritten_before_use':True,'calls':calls}
 return json.loads(json.dumps({'variants':summary,'copy_proofs':proofs,'scope':'Local three-word copy equivalence with temporary registers dead afterwards; whole normalized bodies remain unequal; no original source claim.'}))
if __name__=='__main__':
 r=analyze();(HERE/'analysis.json.gz').write_bytes(gzip.compress((json.dumps(r,indent=2,sort_keys=True)+'\n').encode(),mtime=0));print([(k,len(v['covered']),v['unmatched'])for k,v in r['variants'].items()])
