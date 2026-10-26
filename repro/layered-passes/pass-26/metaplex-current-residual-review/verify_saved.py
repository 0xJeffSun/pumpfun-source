"""Saved admitted metadata correlation only; no whole ELF reader or retained code execution."""
from pathlib import Path
from collections import Counter
import json,hashlib,struct
P=Path(__file__).resolve().parent
L=lambda n:json.loads((P/n).read_text());H=lambda b:hashlib.sha256(b).hexdigest()
m=L('manifest.json');seal=H((P/'manifest.json').read_bytes());assert (P/'manifest.sha256').read_text()==seal+'  manifest.json\n'
assert set(m['files'])=={str(f.relative_to(P)) for f in P.rglob('*') if f.is_file() and f not in [P/'manifest.json',P/'manifest.sha256']}
for name,x in m['files'].items():
 b=(P/name).read_bytes();assert H(b)==x['sha256'] and len(b)==x['bytes'],name
for x in L('input-references.json')['retained_copies']:
 b=(P/x['copy']).read_bytes();assert H(b)==x['sha256'] and len(b)==x['bytes']
allocation=L('current-P25-allocation-summary.json');raw=L('current-P25-raw-summary.json');ranges=L('current-P25-all-431-ranges.json');pos=L('all-1509-positions.json')
assert allocation['candidate_sha256']=='2c26e081f3faabf00592a9615fdb19d0115ff1c0ded5acf29548e214704d5283'
assert raw['candidate_sha256']=='3bbaf27ff0c10ff68d8a195a82f39eadee266f324067bd0a66081710be30b4ec'
assert allocation['original_sha256']==raw['original_sha256']=='31f0a627dba051a938de650464e55cc5397a4be0fd496929c1f9cf02fe5e9011'
assert allocation['total_differing_or_missing_positions']==raw['common_extent_differing_bytes']==1509
assert raw['excess_bytes']==86543 and raw['total_differing_or_missing_positions']==1509+86543==88052
assert raw['excess_range']==[707448,793991]
assert len(pos)==1509 and len(ranges['common_extent_mismatch_ranges'])==431
assert [x['offset'] for x in pos]==[i for a,b in ranges['common_extent_mismatch_ranges'] for i in range(a,b)]
assert all(0<=x['original']<=255 and 0<=x['candidate']<=255 and x['original']!=x['candidate'] for x in pos)
assert Counter(x['section'] for x in pos)=={'.text':1477,'.data.rel.ro':30,'.rel.dyn':2}
assert all(236632<=x['offset']<241736 for x in pos if x['section']=='.text')
prior=L('retained/admitted-result.json');assert prior['total_different_bytes']==1509 and prior['call_target_multisets_equal']
assert [x['offset'] for x in pos]==[i for a,b in prior['all_differing_ranges'] for i in range(a,b)]
body=L('retained/admitted-complete-body-decode.json');flow=L('complete-admitted-local-CFG-calls.json')
for side,filename,sha in [('original','admitted-original-utilize.bin','0b57c8b38b3b6395fe223e99d29c48258f481d496491cb13b7abe065a49fb70d'),('candidate11','admitted-candidate11-utilize.bin','e4c0a6ac6741fdcdafb381eeff0f1626bf9a0ae8f650c8b44beb1176c69ca4d5')]:
 b=(P/'retained'/filename).read_bytes();assert H(b)==sha and len(b)==5104
 assert len(body[side])==626 and b''.join(bytes.fromhex(x['raw']) for x in body[side])==b
 assert flow[side]['range']==[236632,241736] and len(flow[side]['branches'])==91 and len(flow[side]['direct_calls'])==51
 assert flow[side]['branches']==prior['body'][side]['branches'] and flow[side]['direct_calls']==prior['body'][side]['direct_calls']
 for r in pos:
  if r['section']=='.text':assert b[r['offset']-236632]==r['original' if side=='original' else 'candidate']
 counter=Counter(x['relative_call_target'] for x in flow[side]['direct_calls']);assert len(counter)==21 and dict(counter)=={int(k):v for k,v in flow[side]['call_target_counts'].items()}
assert flow['original']['call_target_counts']==flow['candidate11']['call_target_counts']
assert [x['relative_call_target'] for x in flow['original']['direct_calls']]!=[x['relative_call_target'] for x in flow['candidate11']['direct_calls']]
coords=L('diagnostic-coordinate-accounting.json');assert len(coords['source_location_records'])==29 and coords['line_records_changed']==29 and coords['column_records_changed']==1
computed=[]
for r in coords['source_location_records']:
 o=struct.pack('<II',r['original_line'],r['original_column']);c=struct.pack('<II',r['candidate_line'],r['candidate_column'])
 computed += [{'offset':r['coordinate_range'][0]+i,'original':a,'candidate':b} for i,(a,b) in enumerate(zip(o,c)) if a!=b]
assert sorted(computed,key=lambda x:x['offset'])==[{k:v for k,v in x.items() if k!='section'} for x in pos if x['section']=='.data.rel.ro']
rel=L('relocation-site-accounting.json');assert len(rel)==2
assert [(r['original_offset'],r['candidate_offset']) for r in rel]==[(241008,240984),(241048,241024)]
for r in rel:
 assert r['original_info']==r['candidate_info']==8
 assert r['original_instruction'][0]['raw']==r['candidate_instruction'][0]['raw']
bridge=L('guard-error-local-bridge.json');assert bridge['error_u64']==86<<32 and bridge['cleanup_argument']=='r10-992' and bridge['common_continuation']==237920
for side in ['original','candidate11']:
 bypc={x['file_offset']:x for x in body[side]};items=bridge['instructions'][side]
 assert all(bypc[x['file_offset']]==x for x in items)
 assert items[0]['u64']==86<<32 and items[1]['raw']=='7b16000000000000'
 call=next(x for x in items if x['opcode']==133);assert call['relative_call_target']==12448
 idx=items.index(call);assert items[idx-2]['raw']=='bfa1000000000000' and items[idx-1]['raw']=='0701000020fcffff'
 assert items[-1]['branch_target']==237920
assert bridge['callee_body_newly_decoded'] is False and bridge['complete_resource_ownership_equivalence_proven'] is False
four=L('retained/candidate13-four-artifact-summary.json');assert four['candidate12']['raw_sha256']==four['candidate13']['raw_sha256']=='4f039033a3cde9d47aa8ee0f68c13c2c4d55a9d6ee0ab50df9d4ef93a4a02edf'
assert four['candidate12']['payload_different_bytes']==four['candidate13']['payload_different_bytes']==196601
assert four['candidate11']['payload_different_bytes']==1509
plan=L('PLAN.NOT_EXECUTABLE.json');assert plan['source_patch'] is None and plan['compiler_command'] is None and plan['runtime_command'] is None
assert plan['new_original_function_admission'] is None and plan['new_original_data_admission'] is None and plan['manual_commit_feature_sweep_approved'] is False
print(json.dumps({'result':'PASS','scope':'Saved admitted metadata/bytes only; no new ELF body/data collection or retained analyzer execution','retained_image_positions':1509,'raw_differing_or_missing_positions':88052,'raw_missing_tail_positions':86543,'all1509offsets_preserved':True,'text_data_relocation_partition':[1477,30,2],'local_body_instructions_each':626,'direct_calls_each':51,'branches_each':91,'zero_error_caller_bridge_checked':True,'full_resource_ownership_equivalence':False,'new_source_correction':None,'new_recipe':None,'build_runtime_fixture_network':False},indent=2))
