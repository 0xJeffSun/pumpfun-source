"""Recompute full reader identity and one-level direct-callee correspondence."""
import hashlib,json,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'repro/pump_amm/claim-self-transfer-v144/static-tool'))
from elf_reader import Elf

def audit(candidate,symbols):
 o=Elf(ROOT/'evidence/original/pump_amm/deployed.so');c=Elf(candidate);s=Elf(symbols)
 f=next(f for f in s.funcs if f['name'].startswith('_ZN18pump_amm_recovered9multi_hop12token_amount'))
 original=0x457c8;size=376;assert f['size']==size;start=f['start']
 assert o.normalized[original:original+size]==c.normalized[start:start+size]
 assert o.pattern(original,size)==c.pattern(start,size)
 entries=sorted(set(o.entries)|{o.lo});out=[]
 for at,target in sorted(o.calls.items()):
  if not original<=at<original+size:continue
  ca=start+at-original;ct=c.calls[ca];end=entries[entries.index(target)+1]
  candidates=[f for f in s.funcs if f['start']==ct and f['size']==end-target];assert candidates
  assert o.normalized[target:end]==c.normalized[ct:ct+end-target]
  assert o.pattern(target,end-target)==c.pattern(ct,end-target)
  out.append({'offset':at-original,'original_target':target,'candidate_target':ct,'bytes':end-target,'names':[f['name']for f in candidates],'normalized_sha256':hashlib.sha256(o.normalized[target:end]).hexdigest()})
 assert len(out)==3
 return {'original':original,'candidate':f,'bytes':size,'normalized_sha256':hashlib.sha256(o.normalized[original:original+size]).hexdigest(),'direct_callees':out,'scope':'Full reader window and its three direct callee windows match under retained normalization. Referenced data, deeper call closure and whole ELF identity remain unproved.'}
if __name__=='__main__':
 p=Path(__file__).resolve().parent;print(json.dumps(audit(p/'results/build/candidate.so',p/'results/build/unstripped.so'),indent=2))
