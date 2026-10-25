from pathlib import Path
import argparse,hashlib,json,re
from elf_analysis import Elf,REPO
ap=argparse.ArgumentParser();ap.add_argument('build',type=Path);a=ap.parse_args();a.build=a.build.resolve();orig=Elf(REPO/'evidence/original/pump_amm/deployed.so');candidate=Elf(a.build/'artifacts/pump_amm_recovered.so');symbols=Elf(a.build/'target/sbf-solana-solana/release/pump_amm_recovered.so');assert candidate.b[candidate.lo:candidate.hi]==symbols.b[symbols.lo:symbols.hi]
funcs={}
for f in symbols.funcs:funcs.setdefault((f['start'],f['size']),[]).append(f['name'])
rows=[]
for (start,size),names in sorted(funcs.items()):
 needle=candidate.normalized[start:start+size];hits=[];pos=orig.lo
 while (at:=orig.normalized.find(needle,pos,orig.hi))>=0:
  pos=at+1
  if at%8 or orig.pattern(at,size)!=candidate.pattern(start,size):continue
  end=next((x for x in orig.entries if x>at),None)
  hits.append({'start':at,'entry_bounded':at in orig.entries and end==at+size,'raw_equal':orig.b[at:at+size]==candidate.b[start:start+size]})
 rows.append({'names':names,'start':start,'bytes':size,'normalized_sha256':hashlib.sha256(needle).hexdigest(),'raw_sha256':hashlib.sha256(candidate.b[start:start+size]).hexdigest(),'relocations':candidate.pattern(start,size),'matches':hits})
by_start={x['start']:x for x in rows}
for row in rows:
 for hit in row['matches']:
  checks=[]
  for call in candidate.callsites(row['start'],row['bytes']):
   target_row=by_start.get(call['target']);ot=orig.calls.get(hit['start']+call['offset'])
   options=[x['start']for x in target_row['matches']if x['entry_bounded']]if target_row else []
   checks.append({'offset':call['offset'],'candidate_target':call['target'],'candidate_target_names':target_row['names']if target_row else [],'original_target':ot,'bounded_target_matches':options,'target_has_matching_full_body':ot in options})
  hit['direct_target_checks']=checks;hit['all_direct_targets_have_matching_bounded_bodies']=all(x['target_has_matching_full_body']for x in checks)
selected=[x for x in rows if any(re.search(r'config_init|create_config|CreateConfig|set_(lp|protocol|coin_creator)_fee',n)for n in x['names'])]
expected={'handler':(r'(?:config_init7execute|pump_amm_recovered13create_config)',0x16d88,0x17960),'wrapper':(r'__global13create_config',0xe0bf8,0xe1508),'context':(r'CreateConfig.*12try_accounts',0x80fb8,0x82630),'lp_setter':(r'set_lp_fee_basis_points',0x61630,0x61898),'protocol_setter':(r'set_protocol_fee_basis_points',0x61898,0x61b00),'creator_setter':(r'set_coin_creator_fee_basis_points',0x61b00,0x61d68),'recipients_setter':(r'set_protocol_fee_recipients',0x61d68,0x62688)}
comparisons=[]
for label,(pattern,at,end) in expected.items():
 found=[x for x in selected if any(re.search(pattern,n)for n in x['names'])]
 for row in found:
  cb=candidate.normalized[row['start']:row['start']+row['bytes']];ob=orig.normalized[at:end]
  targets=[]
  for call in candidate.callsites(row['start'],row['bytes']):
   tr=by_start.get(call['target']);targets.append({'offset':call['offset'],'target':call['target'],'names':tr['names']if tr else [],'bounded_original_matches':[x['start']for x in tr['matches']if x['entry_bounded']]if tr else []})
  comparisons.append({'label':label,'candidate_start':row['start'],'original_start':at,'candidate_bytes':len(cb),'original_bytes':len(ob),'normalized_equal':cb==ob,'differing_bytes_shared_prefix':sum(x!=y for x,y in zip(cb,ob)),'candidate_direct_targets':targets,'original_direct_targets':orig.callsites(at,end-at)})
report={'scope':'Static diagnostic only. In memory mask immediates of actual ELF relocations and internal relative calls, preserve all other instruction bytes, require exact relocation patterns and inferred entry bounds. No source/executable modification. Matching code does not establish transitive rodata equality, historical graph, or positive create_config runtime behavior.','original':orig.identity(),'candidate':candidate.identity(),'symbols':symbols.identity(),'selected_functions':selected,'expected_body_comparisons':comparisons,'all_function_summary':{'total':len(rows),'any_bounded_match':sum(any(m['entry_bounded']for m in x['matches'])for x in rows)},'all_functions':rows}
(a.build/'function-matches.json').write_text(json.dumps(report,indent=2)+'\n')
for x in selected:print(x['names'][0],x['bytes'],[(hex(m['start']),m['entry_bounded'],m['all_direct_targets_have_matching_bounded_bodies'])for m in x['matches']])
print('Expected:',[(x['label'],x['candidate_bytes'],x['original_bytes'],x['normalized_equal'],x['differing_bytes_shared_prefix'])for x in comparisons])
