from pathlib import Path
import json,hashlib,gzip,shutil,struct
from collections import Counter
R=Path.cwd();P=R/'work/metaplex1509-existing-evidence-review';A=R/'repro/parallel-work/2026-10-24/results/metaplex_utilize/evidence';B=R/'repro/pump/metaplex-candidate-build-12-review';C=R/'repro/pump/metaplex-candidate-build-13-review'
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p,d:p.write_text(json.dumps(d,indent=2)+'\n')
known=[(A,'manifest-sha256.json','ed2801ceafa4ad5d991100fbbd2558246fbd853c0f314bf6c4050fcacddbc936'),(B,'manifest.json','5c3a2f69835ebd5afb9f6f57588ce1dc495280b40f1e55afda2cf3848e7601d6'),(C,'manifest.json','b8ee01699c007695eae5524aebe4a5752fad85124db361eb9526b4530f6da03f')]
for base,name,seal in known:
 assert H(base/name)==seal
 for rel,digest in json.loads((base/name).read_text()).items():
  assert not any(s in rel for s in ['private-security-review','security-followup','audit_coverage'])
  assert H(base/rel)==digest,rel
summarypath=R/'repro/layered-passes/pass-25/after-corrections/summary.json';rangespath=summarypath.with_name('all-byte-ranges.json.gz');summary=json.loads(summarypath.read_text());assert H(rangespath)==summary['ranges_sha256']
allocation=next(x for x in summary['programs'] if x['name']=='token_metadata');raw=next(x for x in summary['raw_compiler_supplement'] if x['name']=='token_metadata')
ranges=next(x for x in json.loads(gzip.decompress(rangespath.read_bytes()))['programs'] if x['name']=='token_metadata')
for name,sha in [(allocation['original_path'],allocation['original_sha256']),(allocation['candidate_path'],allocation['candidate_sha256']),(raw['candidate_path'],raw['candidate_sha256'])]:assert H(R/name)==sha
assert allocation['total_differing_or_missing_positions']==1509 and raw['total_differing_or_missing_positions']==88052
assert raw['excess_bytes']==86543 and 1509+86543==88052
result=json.loads((A/'result.json').read_text());diag=json.loads((A/'inputs/build11/root-diagnostics.json').read_text());decoded=json.loads((A/'complete-body-decode.json').read_text())
positions=[]
for r in diag['differing_ranges']:
 o=bytes.fromhex(r['original']);c=bytes.fromhex(r['candidate']);assert len(o)==len(c)==r['end']-r['start']
 positions += [{'offset':r['start']+i,'original':a,'candidate':b} for i,(a,b) in enumerate(zip(o,c)) if a!=b]
assert len(positions)==1509
expanded=[i for a,b in ranges['common_extent_mismatch_ranges'] for i in range(a,b)]
assert expanded==[x['offset'] for x in positions]==[i for a,b in result['all_differing_ranges'] for i in range(a,b)]
assert len(ranges['common_extent_mismatch_ranges'])==431
counts={}
for section,start,end in [('.text',288,628328),('.data.rel.ro',649384,662136),('.rel.dyn',662816,706800)]:
 rows=[r for r in positions if start<=r['offset']<end];counts[section]=len(rows)
 for x in rows:x['section']=section
assert counts=={'.text':1477,'.data.rel.ro':30,'.rel.dyn':2}
assert all(236632<=x['offset']<241736 for x in positions if x['section']=='.text')
J(P/'all-1509-positions.json',positions);J(P/'current-P25-allocation-summary.json',allocation);J(P/'current-P25-raw-summary.json',raw);J(P/'current-P25-all-431-ranges.json',ranges)
flow={}
for side in ['original','candidate11']:
 ins=decoded[side];body=result['body'][side]
 assert len(ins)==626 and len(body['direct_calls'])==51 and len(body['branches'])==91
 assert b''.join(bytes.fromhex(x['raw']) for x in ins)==(A/('original-utilize.bin' if side=='original' else 'candidate11-utilize.bin')).read_bytes()
 flow[side]={'range':body['range'],'sha256':body['sha256'],'instruction_count':626,'slot_count':638,'direct_calls':body['direct_calls'],'branches':body['branches'],'call_target_counts':dict(Counter(x['relative_call_target'] for x in body['direct_calls']))}
assert flow['original']['call_target_counts']==flow['candidate11']['call_target_counts']
J(P/'complete-admitted-local-CFG-calls.json',flow)
coords=[]
for r in result['source_locations']:
 o=struct.pack('<II',r['original_line'],r['original_column']);c=struct.pack('<II',r['candidate_line'],r['candidate_column'])
 start=r['coordinate_range'][0]
 for i,(a,b) in enumerate(zip(o,c)):
  if a!=b:coords.append({'offset':start+i,'original':a,'candidate':b})
assert sorted(coords,key=lambda x:x['offset'])==[{k:v for k,v in x.items() if k!='section'} for x in positions if x['section']=='.data.rel.ro']
J(P/'diagnostic-coordinate-accounting.json',{'source_location_records':result['source_locations'],'line_records_changed':29,'column_records_changed':1,'all30positions':coords,'pointer_or_length_newly_decoded':False,'source_padding_justified':False})
J(P/'relocation-site-accounting.json',result['changed_relocations'])
origpcs=[238840,238856,238864,238872,238880,238888];candpcs=[238984,239000,239008,241560,241568,241576,241584]
bridge={}
for side,pcs in [('original',origpcs),('candidate11',candpcs)]:
 bypc={x['file_offset']:x for x in decoded[side]};bridge[side]=[bypc[x] for x in pcs]
J(P/'guard-error-local-bridge.json',{'scope':'Conditional local instruction bridge only, for the same input state reaching the guard and ordinary return from the same opaque cleanup callee','original_error_route_PCs':origpcs,'candidate_error_route_PCs':candpcs,'instructions':bridge,'error_u64':86<<32,'error_result_pointer_register':6,'cleanup_argument':'r10-992','cleanup_target':12448,'common_continuation':237920,'callee_body_newly_decoded':False,'complete_resource_ownership_equivalence_proven':False})
copy={
 'prior-Utilize-REPORT.md':A/'REPORT.md','admitted-result.json':A/'result.json','admitted-complete-body-decode.json':A/'complete-body-decode.json','admitted-original-utilize.bin':A/'original-utilize.bin','admitted-candidate11-utilize.bin':A/'candidate11-utilize.bin','candidate-utilize.rs':A/'utilize.rs',
 'candidate11-comparison.json':A/'inputs/build11/comparison.json','candidate11-tool-versions.json':A/'inputs/build11/tool-versions.json','candidate11-source-manifest.json':A/'inputs/build11/source-manifest.json','candidate11-upstream-source-manifest.json':A/'inputs/build11/upstream-source-manifest.json','candidate11-raw-difference-classification.json':A/'inputs/build11/raw-difference-classification.json','candidate11-function-analysis.json':A/'inputs/build11/function-analysis.json','candidate11-hosted-run.json':A/'inputs/build11/hosted-run.json','candidate11-source.patch':A/'inputs/build11/source.patch',
 'candidate12-REPORT.md':B/'REPORT.md','candidate13-REPORT.md':C/'REPORT.md','candidate13-four-artifact-summary.json':C/'four-artifact-summary.json','candidate13-mapped-summary.json':C/'mapped-summary.json',
}
refs=[]
for name,src in copy.items():
 dst=P/'retained'/name;dst.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(src,dst);refs.append({'copy':str(dst.relative_to(P)),'repository_path':str(src.relative_to(R)),'sha256':H(src),'bytes':src.stat().st_size})
J(P/'input-references.json',{'retained_copies':refs,'known_manifests_checked':[{'path':str(base/name),'sha256':seal,'payloads':len(json.loads((base/name).read_text()))} for base,name,seal in known],'P25_summary':{'path':str(summarypath.relative_to(R)),'sha256':H(summarypath)},'P25_ranges':{'path':str(rangespath.relative_to(R)),'sha256':H(rangespath)},'full_ELF_hashes_only':[{'path':allocation['original_path'],'sha256':allocation['original_sha256']},{'path':allocation['candidate_path'],'sha256':allocation['candidate_sha256']},{'path':raw['candidate_path'],'sha256':raw['candidate_sha256']}],'new_original_function_or_data_collection':False,'decoder_or_archived_program_executed':False,'network_build_runtime':False,'manual_search_workflow_read_copied_or_dispatched':False})
J(P/'preparation-result.json',{'result':'PASS','current_all1509positions_equal_prior_admitted_ranges':True,'ranges':431,'section_counts':counts,'raw_total':88052,'allocation_tail_missing_from_raw':86543,'new_original_decode_or_data':False,'new_source_correction':None,'new_build_recipe':None,'stopped_extra_Metaplex_runtime_preserved':True})
print('PASS: current1509 positions exactly equal431 prior admitted ranges;1477text/30coordinates/2relocation; raw88052=1509+86543; existing only.')
