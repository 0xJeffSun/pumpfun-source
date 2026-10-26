"""Portable bounded-data witness verification; saved files only, no prior code execution."""
from pathlib import Path
import hashlib,json,struct
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
L=lambda p:json.loads(p.read_text())
PLAN='acc8f159907a21182cfc1402d979e00d1193c7303364e958c51c23a6ee4fe8c8'
PROOF='c7889913d53f3bf5c0ffcae24dc0ee54d21a5f55ad546d3efdb9ff4138fac8a1'
TABLE='72cf75f6ffbebe07f71523271916703471c005d39c2630cd63da31b929b6d21f'
def check_manifest(base,expected=None):
 b=(base/'manifest.json').read_bytes();seal=H(b)
 if expected is not None:assert seal==expected
 assert (base/'manifest.sha256').read_text()==seal+'  manifest.json\n'
 m=json.loads(b)
 for n,r in m['files'].items():
  data=(base/n).read_bytes();assert H(data)==r['sha256'] and len(data)==r['bytes'],n
 return m
m=check_manifest(P)
actual={str(x.relative_to(P)) for x in P.rglob('*') if x.is_file() and x not in [P/'manifest.json',P/'manifest.sha256']}
assert actual==set(m['files'])
Q=P/'prior-static-proof';check_manifest(Q,PROOF);check_manifest(Q/'admitted-plan',PLAN)
root=L(P/'root-admission.json');assert root['known_plan']==PLAN and root['known_static_proof']==PROOF
assert root['admitted_original_VA']==[815975,816033] and root['admitted_candidate_VA']==[804697,804755]
pre=L(P/'preflight.json');assert pre['result']=='PASS' and pre['before_any_bounded_data_extraction'] is True
assert L(P/'runner-exit.json')['actual_returncode']==0 and L(P/'runner-exit.json')['collector_invocations']==1
assert (P/'collect.stderr').read_bytes()==b''
cap=L(P/'capture.json');assert len(cap['rows'])==2 and cap['section_mapping_verified_before_slice'] is True
assert cap['no_other_payload_slice'] is True and cap['lower_body_decode'] is False
saved={}
consumer=L(Q/'data-consumers.json')['table_consumer']['minimal_possible_load_slice']
for row in cap['rows']:
 side=row['side'];assert side in ['original','candidate'] and side not in saved
 b=(P/row['file']).read_bytes();saved[side]=b
 assert len(b)==row['bytes']==58 and H(b)==row['slice_sha256']==TABLE
 start,end=row['VA_start'],row['VA_end'];assert [start,end]==root['admitted_'+side+'_VA']
 assert start==consumer[side+'_start'] and end==consumer[side+'_end'] and end-start==58
 s=row['containing_section_mapping'];assert s['type']!=8 and s['flags']&2 and s['section_index']==2
 assert s['virtual_address']<=start<end<=s['virtual_address']+s['file_size']
 assert row['file_start']==s['file_offset']+start-s['virtual_address']
 assert row['file_end']==row['file_start']+58
 assert s['file_offset']+s['file_size']<=pre['full_ELF_before'][side]['bytes']
 assert row['source_sha256']==pre['full_ELF_before'][side]['sha256']
 after=L(P/'source-hashes-after.json');assert after['full_ELF_after'][side]['sha256']==row['source_sha256'] and after['full_ELF_after'][side]['unchanged']
 ins=L(Q/(side+'-instructions.json'));byoff={x['offset']:bytes.fromhex(x['raw_hex']) for x in ins}
 assert byoff[1032].hex()=='2501210039000000' and byoff[1064].hex()=='7151800000000000'
 base=struct.unpack_from('<I',byoff[1040],4)[0];assert start==base+128 and end==base+128+58
assert saved['original']==saved['candidate']
actual_alphabet=saved['original'].decode('ascii');assert all(x<128 for x in saved['original']) and len(set(saved['original']))==58
comparison=L(P/'comparison.json');assert comparison['equal'] and comparison['ASCII_from_actual_saved_bytes']==actual_alphabet and comparison['zero_digit_maps_to']==chr(saved['original'][0])
assert comparison['failure_callee_nonreturn_proven'] is False and comparison['lower_callee_bodies_decoded'] is False
after=L(P/'source-hashes-after.json');assert after['current_index_unchanged'] and after['current_index_after_sha256']==pre['current_index_sha256'] and after['old_plan_and_proof_unmodified']
print(json.dumps({'result':'PASS','exact_table_bytes_each':58,'equal':True,'sha256_each':TABLE,'ASCII_from_actual_saved_bytes':actual_alphabet,'known_plan_and_static_proof_exact':True,'section_mapping_arithmetic':'PASS','failure_callee_nonreturn_proven':False,'new_lower_body_decode':False,'source_patch':False,'admin_authorization_runtime_coverage':0},indent=2))
