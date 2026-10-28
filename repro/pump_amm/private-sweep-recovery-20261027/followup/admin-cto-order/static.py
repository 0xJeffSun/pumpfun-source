from pathlib import Path
import collections,hashlib,json,struct
from solders.pubkey import Pubkey
from elf_reader import Elf
W=Path(__file__).resolve().parent;R=W.parents[1];N=R/'work/amm-private-events-sweep-combined-20261027'
O=Elf(R/'evidence/original/pump_amm/deployed.so');C=Elf(N/'build/artifacts/pump_amm_recovered.so');S=Elf(N/'build/artifacts/unstripped.so')
def bytes_at(e,a,n):
 sec=next(x for x in e.raw if x[1]!=8 and x[3]<=a and a+n<=x[3]+x[5]);p=sec[4]+a-sec[3];return e.b[p:p+n]
def cfg(e,start,size):
 nodes={};p=start
 while p<start+size:
  op,rr,off,imm=struct.unpack_from('<BBhi',e.b,p);step=16 if op==0x18 else 8;nodes[p]=(op,rr,off,imm,step);p+=step
 succ={}
 for p,(op,rr,off,imm,step)in nodes.items():
  if op==0x95:edges=[]
  elif op==0x05:edges=[p+8+off*8]
  elif op&7 in(5,6)and op not in[0x85,0x8d]:edges=[p+step,p+8+off*8]
  else:edges=[p+step]
  succ[p]={x for x in edges if x in nodes}
 reach=set();todo=[start]
 while todo:
  p=todo.pop()
  if p in reach:continue
  reach.add(p);todo.extend(succ[p])
 pred={p:set()for p in reach}
 for p in reach:
  for x in succ[p]&reach:pred[x].add(p)
 dom={p:({p}if p==start else set(reach))for p in reach}
 changed=True
 while changed:
  changed=False
  for p in sorted(reach-{start}):
   d=set.intersection(*(dom[x]for x in pred[p]))|{p}
   if d!=dom[p]:dom[p]=d;changed=True
 return nodes,dom
orig_start=0x14920;orig_size=6152;cf=next(f for f in S.funcs if '18pump_amm_recovered14admin_cto_pool17'in f['name']);nodes,dom=cfg(O,orig_start,orig_size)
assert bytes_at(O,0x11cb5b,14)==b'pool-authority';assert bytes_at(O,0x11cb76,14)==b'holder-rewards'
assert bytes_at(O,0x11e55e,32)==bytes(Pubkey.from_string('6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P'))
assert 0x149c8 in dom[0x14a38] and 0x149c8 in dom[0x14c70]
assert 0x14d10 in dom[0x14d60] and 0x14d10 in dom[0x14d80] and 0x14d10 in dom[0x15130]
fields={0x4f8:'coin_creator[0]',0x500:'coin_creator[8]',0x508:'coin_creator[16]',0x510:'coin_creator[24]',0x54e:'is_holder_reward',0x54c:'is_cashback_coin',0x530:'creator_fee_bps',0x54d:'can_edit_creator_fee'}
def stores(e,after,end):
 out=[]
 for p in range(after,end,8):
  op,rr,off,imm=struct.unpack_from('<BBhi',e.b,p)
  if op in[0x7b,0x73,0x72]and off in fields and rr&15!=10:out.append({'pc':hex(p),'field':fields[off],'bytes':e.b[p:p+8].hex()})
 return out
out={'original_sha256':hashlib.sha256(O.b).hexdigest(),'candidate_sha256':hashlib.sha256(C.b).hexdigest(),'original':{'start':hex(orig_start),'size':orig_size,'calls':len(O.callsites(orig_start,orig_size))},'candidate':cf,'candidate_calls':len(C.callsites(cf['start'],cf['size'])),'pda_seeds':[{'call':'0x149c8','seed':'pool-authority','seed_pointer':'0x11cb5b','program_pointer':'0x11e55e'},{'call':'0x14d10','seed':'holder-rewards','seed_pointer':'0x11cb76','program_pointer':'0x11e55e'}],'dominance':{'canonical_derivation_before_creator_compare':True,'canonical_derivation_before_mayhem_guard':True,'holder_derivation_before_stored_holder_flag':True,'holder_derivation_before_requested_holder_flag':True},'original_stores':stores(O,0x15880,0x15998),'candidate_stores':stores(C,cf['start']+3880,cf['start']+4136),'scope':'Direct original seed/program bytes and normal-return CFG dominance; not a claim that malformed upstream account contexts reach the handler.'}
(W/'static-evidence.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out,indent=2))
