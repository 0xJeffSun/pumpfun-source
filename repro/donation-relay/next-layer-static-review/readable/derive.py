#!/usr/bin/env python3
"""Complete read-only candidate/original ledger from the retained ELF analyzer."""
import hashlib,importlib.util,json,struct
from pathlib import Path
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def analyzer():
 s=importlib.util.spec_from_file_location('retained_relay_analyzer',P/'analyze_relocation_first.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def derive():
 a=analyzer();values=a.analyze(P/'baseline');original=values['original-function-ledger.json'];candidate=values['candidate-function-ledger.json'];matches=values['match-ledger.json'];witnesses=values['match-witnesses.json'];roles=json.loads((P/'baseline/original-windows.json').read_text())
 op={x['start']:x['ordinal'] for x in original};cp={x['start']:x['index'] for x in candidate}
 byoriginal={i:[] for i in range(len(original))};bycandidate={i:[] for i in range(len(candidate))}
 for w in witnesses:byoriginal[w['original_ordinal']].append(w);bycandidate[w['candidate_index']].append(w)
 originals=[];candidates=[];edges=[];refs=[];pairs=[]
 def record(side,f,matchrows):
  key=f.get('ordinal',f.get('index'));lookup=op if side=='original' else cp
  for kind in ['direct_calls','external_calls','indirect_calls']:
   for x in f[kind]:edges.append({'side':side,'function':key,'kind':kind,'site':x,'target_function':lookup.get(x.get('target')),'counterpart_status':'see full pair-alignment ledger' if matchrows else 'no complete-body counterpart','indirect_target_proven':False if kind=='indirect_calls' else None})
  for x in f['data_references']:refs.append({'side':side,'function':key,'reference':x,'complete_object_extent_proven':False,'counterpart_status':'see full pair-alignment ledger' if matchrows else 'no complete-body counterpart'})
 for f,row,role in zip(original,matches,roles):
  ws=byoriginal[f['ordinal']];originals.append({**row,'raw_sha256':f['raw_sha256'],'normalized_sha256':f['normalized_sha256'],'prior_group_label':role.get('group'),'source_identity':role.get('source_identity'),'dispatch_reachability':role.get('dispatch_reachability',[]),'direct_call_count':len(f['direct_calls']),'external_call_count':len(f['external_calls']),'indirect_call_count':len(f['indirect_calls']),'data_reference_count':len(f['data_references']),'recursive_call_shape_candidate_indices':[w['candidate_index'] for w in ws if w['recursive_call_shape_closed']],'complete_semantic_identity_proven':False});record('original',f,ws)
 for f in candidate:
  ws=bycandidate[f['index']];raw=[w['original_ordinal'] for w in ws if w['raw_body']];norm=[w['original_ordinal'] for w in ws];candidates.append({**f,'raw_original_ordinals':raw,'normalized_original_ordinals':norm,'status':'raw-body' if raw else 'normalized-shape-only' if norm else 'no-complete-body-match','source_namespace_inferred_from_symbols':'local reconstructed crate' if any('donation_relay_source_proposal' in n for n in f['names']) else 'dependency/runtime or exported symbol','complete_semantic_identity_proven':False});record('candidate',f,ws)
 for w in witnesses:
  o=original[w['original_ordinal']];c=candidate[w['candidate_index']];alignment={}
  for kind in ['direct_calls','external_calls','indirect_calls','data_references']:
   oo={x['offset']:x for x in o[kind]};cc={x['offset']:x for x in c[kind]};rows=[]
   for off in sorted(oo.keys()|cc.keys()):
    x,y=oo.get(off),cc.get(off);entry={'offset':off,'original':x,'candidate':y,'paired':x is not None and y is not None}
    if x is not None and y is not None:
     if kind=='direct_calls':
      t=[op.get(x['target']),cp.get(y['target'])];entry.update(target_pair=t,target_complete_shape_matched=any(v['candidate_index']==t[1] for v in byoriginal.get(t[0],[])))
     elif kind=='external_calls':entry['same_symbol']=bool(x.get('relocation') and y.get('relocation') and x['relocation']['symbol']==y['relocation']['symbol'])
     elif kind=='data_references':entry.update(equal_bounded_bytes=x.get('bounded_hex')==y.get('bounded_hex') and 'bounded_hex'in x,complete_object_extent_proven=False)
     else:entry['resolved_target']=False
    rows.append(entry)
   alignment[kind]=rows
  pairs.append({'original_ordinal':w['original_ordinal'],'candidate_index':w['candidate_index'],'raw_body':w['raw_body'],'recursive_call_shape_closed':w['recursive_call_shape_closed'],'alignments':alignment,'semantic_or_full_data_closure':False})
 stats={side:{'functions':len(fs),'direct_calls':sum(len(f['direct_calls']) for f in fs),'external_calls':sum(len(f['external_calls']) for f in fs),'indirect_calls':sum(len(f['indirect_calls']) for f in fs),'data_references':sum(len(f['data_references']) for f in fs)} for side,fs in [('original',original),('candidate',candidate)]}
 summary={'corrected_comparison':values['comparison-summary.json'],'historical_nibble_first_comparison':json.loads((P/'baseline/comparison-summary.json').read_text()),'inventory':stats,'candidate_raw_match_functions':sum(bool(f['raw_original_ordinals']) for f in candidates),'candidate_normalized_match_functions':sum(bool(f['normalized_original_ordinals']) for f in candidates),'candidate_no_complete_match_functions':sum(not f['normalized_original_ordinals'] for f in candidates),'pairs':len(pairs),'pair_external_symbol_differences':sum(x.get('paired') and not x.get('same_symbol',True) for p in pairs for x in p['alignments']['external_calls']),'unpaired_sites_in_matched_bodies':sum(not x['paired'] for p in pairs for rows in p['alignments'].values() for x in rows),'data_extents_proven':0,'runtime_evidence_context':{'ordinary_comparisons_passed':12,'rejection_comparisons_passed':0,'rejection_comparisons_failed':1,'rejection_cases_not_run':2,'unavailable_authority_business_routes':6},'limitations':['Original windows are inferred boundaries; candidate uses actual STT_FUNC symbols.','A raw code match does not establish external relocation target identity or full data/runtime behavior.','Instruction normalization masks only direct-call displacements and relocation-backed address immediates, in memory.','Recursive call-shape closure does not close data objects, indirect targets, allocator/error ABI or historical source identity.','All data samples are bounded at64 bytes and can cross an object boundary; no full-object proof is claimed.','The frozen baseline runtime_cases=0 marker records pre-runtime build evidence; later12pass/1fail context is separate.']}
 return {'original-gap-ledger.json':originals,'candidate-gap-ledger.json':candidates,'all-call-sites.json':edges,'all-data-references.json':refs,'complete-pair-alignments.json':pairs,'inventory-summary.json':summary}
if __name__=='__main__':
 for name,value in derive().items():(P/name).write_text(json.dumps(value,indent=2,sort_keys=True)+'\n')
 print((P/'inventory-summary.json').read_text())
