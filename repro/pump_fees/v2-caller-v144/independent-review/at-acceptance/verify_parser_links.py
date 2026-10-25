"""Read-only instruction/CFG and return-slot check. No target execution."""
from pathlib import Path
import sys, json, hashlib, struct
from collections import deque
ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT/'work/fees-v2-independent-review'))
from disasm import a
E=a.Elf((ROOT/'work/fees-v2-independent-review/inputs/original.so').read_bytes())
START,END=502096,518912
rows=[
('program',502288,502648,502328,-2752,552,518440),('authority',502360,502720,502400,-2760,560,518456),
('global',502432,502888,502984,-2768,568,518472),('mint',503032,503096,503328,-2776,88,518080),
('sharing_config',503360,503608,503704,-2816,576,518488),('bonding_curve',503752,503960,503792,-2824,584,518504),
('pump_creator_vault',503824,503888,504040,-2848,256,518144),('pump_creator_vault_ata',504200,504264,504368,-2888,304,518192),
('system_program',504520,504800,504560,-2912,592,518520),('pump_program',504592,504872,504632,-2936,600,518536),
('pump_event_authority',504664,504728,505216,-2944,352,518240),('pump_amm_program',505352,505568,505392,-2976,608,518552),
('amm_event_authority',505424,505496,505808,-2992,400,518288),('quote_mint',505944,506016,506240,-3016,216,518128),
('token_program',506272,506600,506288,-3008,616,518568),('associated_token_program',506344,506680,506360,-3048,624,518584),
('coin_creator_vault_authority',506416,506520,506448,-3064,448,518336),('coin_creator_vault_ata',507024,507128,507056,-3096,496,518384)]
def ins(pc):
 o,r,f,i=struct.unpack('<BBhi',E.at(pc,8));return o,r&15,r>>4,f,i
ops={};pc=START
while pc<END:
 ops[pc]=ins(pc);pc+=16 if ops[pc][0]==24 else 8
calls={r[1] for r in rows}
def path(start,target):
 q=deque([(start,[])]);seen=set()
 while q:
  pc,p=q.popleft()
  if pc==target:return p+[pc]
  if pc in seen or pc not in ops:continue
  seen.add(pc);o,d,s,f,i=ops[pc];n=pc+(16 if o==24 else 8)
  if o==0x95 or pc in calls:continue
  # Nonreturning allocator-failure and external abort do not create success edges.
  if o==0x85 and (pc+8+i*8==765328 or E.relocations.get(pc,{}).get('symbol')=='abort'):continue
  edges=[n]
  if o&7 in (5,6) and o!=0x85:
   edges=[pc+8+f*8] if o&0xf0==0 else [n,pc+8+f*8]
  for nxt in edges:q.append((nxt,p+[pc]))
 raise AssertionError(('no bounded CFG path',start,target))
def symbol(path,call):
 r={i:('unknown',i) for i in range(11)};r[10]=('frame',0);m={}
 def add(v,n):return (v[0],v[1]+n) if v[0]=='frame' else ('add',v,n)
 for pc in path:
  o,d,s,f,i=ops[pc]
  if o==0xbf:r[d]=r[s]
  elif o==0xb7:r[d]=('constant',i)
  elif o==0x07:r[d]=add(r[d],i)
  elif o==24:r[d]=('constant',struct.unpack('<Q',E.at(pc,16)[4:8]+E.at(pc,16)[12:16])[0])
  elif o&7==1:
   p=add(r[s],f);r[d]=m.get(p,('parse-return',call,p[1]+744) if p[0]=='frame' and -744<=p[1]<-584 else ('load',p))
  elif o&7 in (2,3):m[add(r[d],f)]=r[s] if o&7==3 else ('constant',i)
  elif o==0x85:
   for x in range(6):r[x]=('call-result',pc,x)
  elif o&7 in (4,7):r[d]=('scalar',pc)
 return r,m
out=[]
for name,call,diag,preserve,spill,off,store in rows:
 success=path(call+8,preserve);error=path(call+8,diag)
 _,m=symbol(success,call);value=m[('frame',spill)]
 o,d,s,f,i=ops[store];assert(o,d,f)==(0x7b,6,off)
 assert ops[store-8]==(0x79,s,10,spill,0)
 assert E.at(struct.unpack('<I',E.at(diag,16)[4:8])[0],ops[diag+16][4]).decode()==name
 out.append(dict(name=name,parse_call=call,parse_target=call+8+ops[call][4]*8,diagnostic_pc=diag,error_cfg_path=error,preservation_pc=preserve,success_cfg_path=success,stored_value=value,spill=spill,context_offset=off,final_store=store))
assert all(r['stored_value']==('parse-return',r['parse_call'],8) for r in out if r['name'] in ['program','authority','bonding_curve','system_program','pump_program','pump_amm_program','token_program','associated_token_program'])
assert all(r['stored_value']==('parse-return',r['parse_call'],0) for r in out if r['name'] in ['pump_creator_vault','pump_creator_vault_ata','pump_event_authority','amm_event_authority','coin_creator_vault_authority','coin_creator_vault_ata'])
assert all(r['stored_value']==('parse-return',r['parse_call'],88) for r in out if r['name'] in ['mint','quote_mint'])
result={'original_sha256':hashlib.sha256(E.b).hexdigest(),'parser_links':out,'limits':['CFG reachability is not branch satisfiability or complete admission equivalence.','Return-slot symbols start at the named primitive boundary; primitive semantic/owner validation not established here.','global/sharing_config preserve allocated pointers; allocation copies and nested AccountInfo offsets need separate evidence.','No target code executed, binary modified, or byte-identity claim made.']}
(Path(__file__).parent/'parser-links.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps([{k:r[k] for k in ('name','stored_value')} for r in out],indent=2))
