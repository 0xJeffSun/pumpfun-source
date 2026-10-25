#!/usr/bin/env python3
from pathlib import Path
import collections,hashlib,json,struct,sys
W=Path(__file__).resolve().parent;sys.path.insert(0,str(W/'reference/analysis-method'))
from elf_reader import Elf
from window_tools import instructions,window,comparison,data_refs,extent
H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
def run():
 C=Elf(W/'candidate.so');S=Elf(W/'symbols.so');O=Elf(W/'reference/analysis-method/inputs/original.so');syms={f['start']:f for f in S.funcs}
 assert H(C.b)=='8ff12f9c580baa51631a1802d5dc0a936e837f5de4fc1b88b71fd57bd2a7450b'
 def find(n):
  fs=[f for f in S.funcs if n in f['name']];assert len(fs)==1,(n,fs);return fs[0]
 entries={'legacy':(193400,5672,find('19pump_fees_candidate17update_fee_shares')),'v2':(211408,7968,find('19pump_fees_candidate20update_fee_shares_v2')),'social':(137280,10664,find('19pump_fees_candidate23claim_social_fee_pda_v2')),'social_helper':(243184,6080,find('30admit_associated_token_account')),'social_wrapper':(647968,2096,find('__global23claim_social_fee_pda_v2')),'social_parser':(395656,9904,find('ClaimSocialFeePdaV2Bumps$GT$$GT$12try_accounts')),'social_exit':(405560,560,find('ClaimSocialFeePdaV2$u20$as$u20$anchor_lang..AccountsExit'))}
 windows={};code={};data={};targets=[]
 for role,(a,n,f)in entries.items():
  b,m=f['start'],f['size'];windows[role]={'original':window(O,a,n,[]),'candidate':window(C,b,m,S.funcs),'comparison':comparison(O,C,a,b,n,m)};code[role]={'original':instructions(O,a,n),'candidate':instructions(C,b,m)};data[role]={'original':data_refs(O,a,n),'candidate':data_refs(C,b,m)}
  for side,e,at,size,ss in [('original',O,a,n,[]),('candidate',C,b,m,S.funcs)]:
   for call in e.callsites(at,size):
    t=call['target'];z=syms[t]['size']if side=='candidate'and t in syms else extent(e,t)
    targets.append({'role':role,'side':side,'pc':at+call['offset'],'target':t,'target_window':window(e,t,z,ss),'data_refs':data_refs(e,t,z)})
 ci={x['pc']:x for rows in code.values()for x in rows['candidate']}
 def edge(pc,target):assert C.calls[pc]==target;return {'pc':pc,'target':target,'symbol':syms[target]['name'],'raw':C.b[pc:pc+8].hex(),'signed_operand':struct.unpack_from('<i',C.b,pc+4)[0]}
 checks=[edge(508992,628592),edge(509120,685808),edge(509272,698288),edge(403792,78072),edge(405840,78072),edge(78184,596688),edge(78224,698288),edge(78392,698288),edge(78456,698288),edge(80080,629168),edge(80208,585416),edge(80440,698288),edge(80952,598536),edge(83456,621376),edge(83512,39648),edge(83744,39648)]
 for pc,target in {509008:509328,509088:509128,509472:509752,509760:510192,78248:79344,78424:79096,78480:80056,79136:80896}.items():assert ci[pc]['branch_target']==target
 for pc,n in [(509008,115),(509088,114),(509264,32),(510088,6031),(511968,6024),(510096,2),(511976,2),(403720,0),(405776,1),(83448,6)]:assert ci[pc]['immediate_signed']==n
 for pc,off in [(509136,107),(509152,99),(509168,91),(509184,83)]:assert ci[pc]['opcode']==0x79 and ci[pc]['offset_signed']==off
 assert ci[509280]['opcode']==0x7b and ci[509280]['offset_signed']==16
 for pc in [509352,509384,509408,509440]:assert ci[pc]['opcode']==7 and ci[pc]['immediate_signed']==-1
 system=ci[78368]['imm64_unsigned'];assert C.b[system:system+32]==bytes(32)
 ctor=syms[598536];ctorcode=instructions(C,598536,ctor['size']);assert ctorcode[1]['opcode']==0x7a and ctorcode[1]['immediate_signed']==1
 # Every original social-helper direct target against every fresh symbol, no
 # positional matching when the complete helper differs.
 original_targets=sorted({x['target']for x in O.callsites(243184,6080)})
 mapping=[]
 for a in original_targets:
  n=extent(O,a);ms=[]
  for f in S.funcs:
   b,m=f['start'],f['size']
   if n==m and O.normalized[a:a+n]==C.normalized[b:b+m]and O.pattern(a,n)==C.pattern(b,m):ms.append({'symbol':f,'raw_equal':O.b[a:a+n]==C.b[b:b+m],'called_by_current_helper':any(x['target']==b for x in C.callsites(78072,5728))})
  mapping.append({'original_start':a,'bytes':n,'matches':ms})
 drop=comparison(O,C,40472,39648,776,776);assert drop['raw_equal'] and drop['normalized_equal']
 baseline=J(W/'inputs/accepted/full-function-inventory.json');current=J(W/'full-function-inventory.json');rows=[]
 for old,new in zip(baseline['original_rows'],current['original_rows'],strict=True):
  assert all(old[k]==new[k]for k in ['start','end','raw_sha256','normalized_sha256'])
  rows.append({'original_start':old['start'],'end':old['end'],'before_status':old['status'],'after_status':new['status'],'before_matches':old['candidate_matches'],'after_matches':new['candidate_matches']})
 return {'candidate_sha256':H(C.b),'symbols_sha256':H(S.b),'original_sha256':H(O.b),'whole_original_equal':O.b==C.b,'complete_windows':windows,'instructions':code,'data_references':data,'all_direct_target_windows':targets,'verified_current_edges':checks,'legacy_facts':{'helper_inlined':True,'data_len_call':508992,'short_data_branch':509008,'borrow_release':509280,'rc_decrements':[509352,509384,509408,509440],'boolean_branch':509472,'version_load':509752,'quote_error_code_store':510088,'version_error_code_store':511968,'compared_values_none_stores':[510096,511976],'limits':'No standalone helper identity; full legacy body still differs from original. Real source coordinates remain different.'},'social_facts':{'current_helper':[78072,83800],'callers':[403792,405840],'creation_flags':[0,1],'canonical_key_compare':78224,'system_owner_compare':78392,'exact_token_owner_compare':78456,'mint_compare':80440,'creation_instruction_constructor':{'window':window(C,598536,ctor['size'],S.funcs),'instructions':ctorcode,'opcode':1},'invoke_accounts':6,'invoke_call':83456,'six_account_drop':{'original':[40472,41248],'candidate':[39648,40424],'comparison':drop},'original_target_matches':mapping,'matched_original_target_count':sum(bool(r['matches'])for r in mapping),'original_target_count':len(mapping),'limits':'Full helper remains unequal; this does not claim closure of every branch/metadata/allocator/data target.'},'inventory_comparison':{'baseline_sha256':baseline['inputs']['candidate']['sha256'],'current_sha256':current['inputs']['candidate']['sha256'],'before_summary':baseline['summary'],'after_summary':current['summary'],'original_rows':rows},'new_fixtures':0,'new_builds_in_analysis':0}
if __name__=='__main__':
 import argparse
 p=argparse.ArgumentParser();p.add_argument('--check',action='store_true');a=p.parse_args();out=run();b=(json.dumps(out,sort_keys=True,separators=(',',':'))+'\n').encode();import gzip
 f=W/'added-static-proof.json.gz'
 if a.check:assert gzip.decompress(f.read_bytes())==b
 else:f.write_bytes(gzip.compress(b,mtime=0))
 print(json.dumps({'candidate_sha256':out['candidate_sha256'],'whole_original_equal':out['whole_original_equal'],'social_original_targets_with_any_match':out['social_facts']['matched_original_target_count'],'social_original_targets':out['social_facts']['original_target_count'],'inventory':out['inventory_comparison']['after_summary']},sort_keys=True))
