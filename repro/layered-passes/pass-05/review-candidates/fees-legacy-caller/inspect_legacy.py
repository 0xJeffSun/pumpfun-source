#!/usr/bin/env python3
"""Reproducible fresh-symbol legacy ledger; no semantic equivalence inference."""
from pathlib import Path
import json,gzip,hashlib,sys,collections,struct
W=Path(__file__).resolve().parent; M=W/'reference/analysis-method';sys.path.insert(0,str(M))
from elf_reader import Elf
from window_tools import window,instructions,data_refs,comparison,extent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def run():
 C=Elf(W/'candidate.so');S=Elf(W/'symbols.so');O=Elf(M/'inputs/original.so');B=Elf(W/'baseline-symbols.so');BE=Elf(W/'baseline-candidate.so')
 assert C.b[C.lo:C.hi]==S.b[S.lo:S.hi]
 assert H(C.path)=='e5c811e2a66b540f25b44d9a55dd7b890e7ff01a0074dfc0d0dfc25237c391fe'
 def find(text,tail=None):
  xs=[f for f in S.funcs if text in f['name'] and (tail is None or tail in f['name'])];pairs={(f['start'],f['size']) for f in xs};assert len(pairs)==1,(text,pairs);return next(iter(pairs))
 def bw(a):
  z={(f['start'],f['size']) for f in B.funcs if f['name'] in [x['name'] for x in S.funcs if x['start']==a]}
  if not z:
   import re
   canon=lambda n:re.sub(r'17h[0-9a-f]{16}E$','E',n)
   names={canon(f['name']) for f in S.funcs if f['start']==a};z={(f['start'],f['size']) for f in B.funcs if canon(f['name']) in names}
  return next(iter(z)) if len(z)==1 else None
 original={'handler':(193400,5672),'authorize':(234096,1208),'quote_admission':(75880,504),'preprocess':(231576,2520),'amm_adapter':(237464,2624),'payout':(199072,5008),'payout_adapter':(204080,1688),'final_validation':(205768,5640),'pump_adapter':(235304,936),'pump_cpi':(544192,3968),'amm_cpi':(582624,4352),'pump_metas':(567376,1472),'pump_infos':(573464,1944),'amm_metas':(593584,2072),'amm_infos':(561600,2632),'sharing_exit':(19528,1072),'wrapper':(640672,1072),'parser':(484816,13888),'event':(500928,1168)}
 candidate={'handler':find('19pump_fees_candidate17update_fee_shares17h'),'wrapper':find('__global17update_fee_shares17h'),'parser':find('sharing_update..UpdateFeeShares$u20$as$u20$anchor_lang..Accounts'), 'event':find('sharing_update..UpdateFeeSharesEvent$u20$as$u20$anchor_lang..Event'),'pump_cpi':find('4pump3cpi23distribute_creator_fees17h'),'amm_cpi':find('8pump_amm3cpi29transfer_creator_fees_to_pump17h'),'pump_metas':find('distribute_creator_fees..DistributeCreatorFees$u20$as$u20$anchor_lang..ToAccountMetas'),'pump_infos':find('distribute_creator_fees..DistributeCreatorFees$u20$as$u20$anchor_lang..ToAccountInfos'),'amm_metas':find('transfer_creator_fees_to_pump..TransferCreatorFeesToPump$u20$as$u20$anchor_lang..ToAccountMetas'),'amm_infos':find('transfer_creator_fees_to_pump..TransferCreatorFeesToPump$u20$as$u20$anchor_lang..ToAccountInfos'),'amm_accounts_drop':find('drop_in_place$LT$pump_fees_candidate..pump_amm..internal..__cpi_client_accounts_transfer_creator_fees_to_pump..TransferCreatorFeesToPump'),'v2_handler':find('19pump_fees_candidate20update_fee_shares_v217h'),'v2_parser':find('sharing_update..UpdateFeeSharesV2$u20$as$u20$anchor_lang..Accounts')}
 # sharing_exit is a generic Account<T> monomorph and identified by whole-window catalog correspondence; no name guessed.
 current=J(W/'reference/full-function-inventory.json');baseline=J(W/'baseline-inventory.json');assert len(current['original_rows'])==len(baseline['original_rows'])==585
 orig_rows={r['start']:r for r in current['original_rows']}
 sh=orig_rows[19528]['candidate_matches'];assert len(sh)==1,sh
 candidate['sharing_exit']=(sh[0]['candidate_start'],sh[0]['candidate_bytes'])
 rows={};ledgers={};refs={};targets={};matched={}
 for side,e,table,syms in [('original',O,original,[]),('candidate',C,candidate,S.funcs)]:
  rows[side]={};ledgers[side]={};refs[side]={}
  for name,(a,n) in table.items():
   rows[side][name]=window(e,a,n,syms);ledgers[side][name]=instructions(e,a,n);refs[side][name]=data_refs(e,a,n)
   for call in e.callsites(a,n):
    at=call['target'];key=side+':'+str(at)
    if key in targets:continue
    ns={f['size'] for f in syms if f['start']==at};size=next(iter(ns)) if len(ns)==1 else extent(e,at)
    targets[key]={'window':window(e,at,size,syms),'data':data_refs(e,at,size),'boundary':'named symbol' if ns else 'inferred entry','callers':[]}
   for call in e.callsites(a,n):targets[side+':'+str(call['target'])]['callers'].append({'name':name,'pc':a+call['offset'],'raw_operand':struct.unpack_from('<i',e.b,a+call['offset']+4)[0]})
 for name in set(original)&set(candidate):
  a,n=original[name];b,m=candidate[name];matched[name]=comparison(O,C,a,b,n,m)
 retained={}
 for name in ['parser','event','v2_handler','v2_parser']:
  a,n=candidate[name];old=bw(a);assert old is not None
  b,m=old;retained[name]={'baseline_start':b,'candidate_start':a,'comparison':comparison(BE,C,b,a,m,n)}
 # All primary calls must use actual signed operands and generated CPI functions from reviewed IDLs.
 hcalls=rows['candidate']['handler']['direct_calls'];assert any(q['target']==candidate['pump_cpi'][0] for q in hcalls);assert any(q['target']==candidate['amm_cpi'][0] for q in hcalls)
 wrapper=rows['candidate']['wrapper'];assert any(q['target']==candidate['parser'][0] for q in wrapper['direct_calls']);assert any(q['target']==candidate['handler'][0] for q in wrapper['direct_calls'])
 # Decode the complete generated bodies, retaining both successful matching and nonmatching results.
 cpi=[]
 for name,meta,info,disc in [('pump_cpi','pump_metas','pump_infos','a572670079cef751'),('amm_cpi','amm_metas','amm_infos','8b348655e4e56cf1')]:
  a,n=candidate[name];ins=ledgers['candidate'][name];found=[q for q in ins if q.get('imm64_unsigned')==int.from_bytes(bytes.fromhex(disc),'little')];assert len(found)==1
  alloc=[q for q in ins if q['opcode']==7 and q['immediate_signed']==-256];assert alloc
  calls=rows['candidate'][name]['direct_calls'];assert any(q['target']==candidate[meta][0] for q in calls);assert any(q['target']==candidate[info][0] for q in calls)
  invoke=[q for q in calls if any('solana_program7program13invoke_signed' in f['name'] for f in S.funcs if f['start']==q['target'])];assert len(invoke)==1
  cpi.append({'name':name,'allocation_256_witness':alloc,'discriminator':found,'meta_call':[q for q in calls if q['target']==candidate[meta][0]],'infos_call':[q for q in calls if q['target']==candidate[info][0]],'invoke_signed':invoke,'comparison':matched[name],'all_calls':calls})
 assert matched['pump_cpi']['normalized_equal'] and matched['pump_cpi']['relocation_pattern_equal']
 assert all(matched[n]['normalized_equal'] and matched[n]['relocation_pattern_equal'] for n in ['pump_metas','pump_infos','amm_metas','amm_infos'])
 # Changed compilation may outline account cleanup: record the actual drop edge, do not assert CFG equivalence.
 drop=candidate['amm_accounts_drop'][0];cleanup_edges=[q for q in rows['candidate']['amm_cpi']['direct_calls'] if q['target']==drop];assert cleanup_edges
 trans=[]
 for a,b in zip(baseline['original_rows'],current['original_rows'],strict=True):
  assert all(a[k]==b[k] for k in ['start','end','bytes','raw_sha256','normalized_sha256'])
  trans.append({'start':a['start'],'end':a['end'],'bytes':a['bytes'],'baseline_status':a['status'],'candidate_status':b['status'],'baseline_matches':a['candidate_matches'],'candidate_matches':b['candidate_matches']})
 paired={'baseline_inputs':baseline['inputs'],'candidate_inputs':current['inputs'],'baseline_summary':baseline['summary'],'candidate_summary':current['summary'],'original_rows':trans,'transitions':dict(collections.Counter(r['baseline_status']+' -> '+r['candidate_status'] for r in trans)),'limits':current['limits']}
 result={'candidate_sha256':H(C.path),'symbols_sha256':H(S.path),'original_sha256':H(O.path),'baseline_sha256':H(BE.path),'roots':rows,'complete_root_comparisons':matched,'unchanged_source_window_comparisons':retained,'direct_target_inventory':targets,'generated_cpi':cpi,'amm_cleanup_edges':cleanup_edges,'inlined_source_helpers':['legacy_authorize','legacy_curve_quote_is_zero','preprocess_remaining','prepare_legacy_payout','legacy_payout_accounts','legacy_validate_shares','legacy_distribute_creator_fees','legacy_transfer_creator_fees_to_pump'],'scope':'Whole original root and fresh candidate symbol inventories. No standalone symbols for the inlined source helpers; no one-to-one original/helper equivalence claim.','limitations':['Original windows are inferred call-entry windows, not proved original source function boundaries.','No full legacy CFG or all branch behavioral equivalence is established.','Data previews are bounded and not proof of every consumed extent.','V2 source and context source are byte-preserved, not newly recovered.','The AMM generated CPI differs, with an actual outlined account-drop edge; no equivalence conclusion solely from size subtraction.','All 585 original windows and all candidate symbol windows retained, including ambiguous and unmatched rows.']}
 outputs = {'legacy-static-proof.json': result, 'legacy-instructions.json': ledgers, 'legacy-data-references.json': refs, 'inventory-vs-8ff12.json': paired}
 return outputs

if __name__ == '__main__':
 result=run()
 for name,v in result.items():
  with gzip.open(W/(name+'.gz'),'wb') as f:f.write((json.dumps(v,indent=2)+'\n').encode())
 print(json.dumps({'candidate_sha256':result['legacy-static-proof.json']['candidate_sha256'],'candidate_windows':result['inventory-vs-8ff12.json']['candidate_summary']['candidate_ranges'],'transitions':result['inventory-vs-8ff12.json']['transitions']},indent=2))
