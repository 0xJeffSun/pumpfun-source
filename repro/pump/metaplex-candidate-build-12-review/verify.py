#!/usr/bin/env python3
"""Portable read-only three-artifact and complete Utilize residual proof."""
from pathlib import Path
import hashlib,json,struct,gzip
P=Path(__file__).resolve().parent
ROOT=next(p for p in P.parents if (p/'evidence/dependencies/token_metadata/deployed.so').is_file())
from analyze import analyze
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def read(n):return json.loads((P/n).read_text())
def main():
 m=read('manifest.json');actual={f.relative_to(P).as_posix() for f in P.rglob('*') if f.is_file() and f.name!='manifest.json' and '__pycache__' not in f.parts};assert actual==set(m)
 for n,h in m.items():assert H(P/n)==h,n
 for n,h in read('external-inputs.json').items():assert H(ROOT/n)==h,n
 j,bodies=analyze();assert j==read('result.json');assert bodies==read('complete-body-decode.json')
 assert {r['name']:r['different_bytes'] for r in j['artifacts']}=={'original':0,'candidate11':1509,'candidate12':196601}
 a=j['full_text_alignment'];assert len(a['changed_original_instructions'])==len(a['inserted_candidate_instructions'])==1
 c=a['changed_original_instructions'][0];assert c['original']['file_offset']==c['candidate12']['file_offset']==238832
 assert c['original']['raw']=='3d97070000000000' and c['candidate12']['raw']=='2d79010000000000'
 x=a['inserted_candidate_instructions'][0];assert x['file_offset']==238840 and x['raw']=='0500070000000000' and x['branch_target']==238904
 assert j['original_vs_candidate12_mapped_call_multisets_equal'] and j['original_vs_candidate11_call_multisets_equal']
 assert [j['body_counts'][n]['calls'] for n in ['original','candidate11','candidate12']]==[51,51,51]
 data=j['data_and_relocation_alignment'];assert data['all_mapped_relocations_equal'] and data['relocation_count']==2749 and data['function_entries_mapping_equal'] and data['entrypoint_mapping_equal']
 assert len(data['shifted_pointer_slots'])==132 and all(r['mapped_equal'] for r in data['shifted_pointer_slots'])
 assert len(data['remaining_coordinate_bytes'])==30 and data['coordinate_residual_unchanged_from11']
 comparison=read('build12-comparison.json')
 assert comparison['source_manifest_sha256']==H(P/'build12-source-manifest.json')
 assert comparison['build_log_sha256']==hashlib.sha256(gzip.decompress((P/'build12-build.log.gz').read_bytes())).hexdigest()
 assert comparison['candidate_input_sha256']==H(P/'candidate12.so') and not comparison['full_byte_equality']
 src=read('build12-source-manifest.json');assert H(P/'utilize12.rs')==src['programs/token-metadata/program/src/processor/uses/utilize.rs']
 assert H(P/'metadata-error.rs')==src['programs/token-metadata/program/src/error.rs']
 assert 'ProgramError::Custom(e as u32)' in (P/'metadata-error.rs').read_text()
 proof=read('guard-equivalence.json');assert proof['query_sha256']==H(P/'guard-equivalence.smt2') and proof['all_u64_guard_and_subtraction_domain']=='unsat' and proof['branch_polarity_negation']=='unsat'
 print(json.dumps(dict(verified=True,candidate12_accepted=False,target_differences_11=1509,target_differences_12=196601,
   full_text_changed_instructions=1,inserted_jump_instructions=1,unchanged_coordinate_residual_bytes=30,
   all_loader_relocations_mapped=2749,shifted_pointer_slots=132,guard13_source_hypothesis_reviewed=True,
   byte_identity=False,new_builds=0,runtime_transactions=0),indent=2))
if __name__=='__main__':main()
