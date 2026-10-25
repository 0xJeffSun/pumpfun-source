from pathlib import Path
import sys,re,json,gzip
W=Path(__file__).resolve().parent;sys.path.insert(0,str(W/'reference/analysis-method'))
from elf_reader import Elf
from window_tools import window,comparison,data_refs,extent,instructions

def run():
 C=Elf(W/'candidate.so');S=Elf(W/'symbols.so');B=Elf(W/'baseline-candidate.so');BS=Elf(W/'baseline-symbols.so')
 canon=lambda n:re.sub(r'17h[0-9a-f]{16}E$','E',n)
 frags=['30admit_associated_token_account','__global23claim_social_fee_pda_v2','19pump_fees_candidate23claim_social_fee_pda_v2','ClaimSocialFeePdaV2Bumps$GT$$GT$12try_accounts','ClaimSocialFeePdaV2$u20$as$u20$anchor_lang..AccountsExit']
 out=[]
 for frag in frags:
  fs=[f for f in S.funcs if frag in f['name']];assert len(fs)==1
  f=fs[0];olds=[b for b in BS.funcs if canon(b['name'])==canon(f['name'])];assert len(olds)==1;b=olds[0]
  cmp=comparison(B,C,b['start'],f['start'],b['size'],f['size']);assert cmp['normalized_equal']and cmp['relocation_pattern_equal']
  rows=[]
  for x,y in zip(B.callsites(b['start'],b['size']),C.callsites(f['start'],f['size']),strict=True):
   assert x['offset']==y['offset'];bs={z['size']for z in BS.funcs if z['start']==x['target']};cs={z['size']for z in S.funcs if z['start']==y['target']};n=next(iter(bs)) if len(bs)==1 else extent(B,x['target']);m=next(iter(cs)) if len(cs)==1 else extent(C,y['target'])
   rows.append({'offset':x['offset'],'baseline_target':x['target'],'candidate_target':y['target'],'comparison':comparison(B,C,x['target'],y['target'],n,m)})
  out.append({'fragment':frag,'baseline':window(B,b['start'],b['size'],BS.funcs),'candidate':window(C,f['start'],f['size'],S.funcs),'comparison':cmp,'immediate_target_comparisons':rows,'candidate_data':data_refs(C,f['start'],f['size'])})
 return {'scope':'Fresh symbol-bound comparison against accepted 8ff12 social helper/handler/wrapper/parser/exit; inherited nonidentity to original remains explicit.','windows':out,'limits':['All complete root comparisons are normalized-equal to 8ff12, with actual immediate target comparisons retained even when false.','This does not upgrade 8ff12 social helper to full original equivalence, or certify unproven transitive data extents.']}
if __name__=='__main__':
 r=run();(W/'retained-social.json.gz').write_bytes(gzip.compress((json.dumps(r,indent=2)+'\n').encode(),mtime=0));print(json.dumps({'root_count':len(r['windows']),'direct_targets':sum(len(x['immediate_target_comparisons'])for x in r['windows']),'different_targets':sum(not(y['comparison']['normalized_equal']and y['comparison']['relocation_pattern_equal'])for x in r['windows']for y in x['immediate_target_comparisons'])}))
