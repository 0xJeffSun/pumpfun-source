#!/usr/bin/env python3
"""Check retained evidence and source/build identity without executing any program."""
from pathlib import Path
import argparse,gzip,hashlib,io,json,tarfile
p=argparse.ArgumentParser(description=__doc__)
p.add_argument('--current-main',action='store_true',help='Also compare the live 22 main inputs and three build helpers')
a=p.parse_args()
P=Path(__file__).resolve().parent;R=P.parents[2]
sha=lambda b:hashlib.sha256(b).hexdigest()
read=lambda p:json.loads(p.read_text())
def archive(p):
 with tarfile.open(fileobj=io.BytesIO(p.read_bytes()),mode='r:gz') as tar:
  return {m.name:tar.extractfile(m).read() for m in tar if m.isfile()}
artifacts=read(P/'artifact-hashes.json')
for n,h in artifacts.items():assert sha((P/n).read_bytes())==h,n
refs=read(P/'retained-evidence-references.json');old=R/refs['package']
manifest=R/refs['artifact_manifest']['path']
assert sha(manifest.read_bytes())==refs['artifact_manifest']['sha256']
previous_artifacts=read(manifest)
assert len(previous_artifacts)==refs['artifact_files_verified']==62
for n,h in previous_artifacts.items():assert sha((old/n).read_bytes())==h,n
for key in ['direct_artifact_sha256','runtime_input_sha256']:
 for n,h in refs[key].items():assert sha((R/n).read_bytes())==h,n
source=archive(P/'source-snapshot.tar.gz');hashes=read(P/'source-sha256.json')
assert len(source)==22 and {n:sha(b) for n,b in source.items()}==hashes
previous=archive(old/'source-snapshot.tar.gz')
assert source.keys()==previous.keys()
assert [n for n in sorted(source) if source[n]!=previous[n]]==['programs/pump-fees/README.md']
helpers=archive(P/'build-helper-snapshot.tar.gz');helper_hashes=read(P/'build-helper-sha256.json')
assert len(helpers)==3 and {n:sha(b) for n,b in helpers.items()}==helper_hashes
old_helpers=read(old/'harness-source-sha256.json')
assert len(old_helpers)==42 and all(old_helpers[n]==h for n,h in helper_hashes.items())
attempt=read(P/'build-attempt.json');report=read(P/'build-comparison.json')
assert attempt['returncode']==0 and attempt['source_unchanged']
assert attempt['source_sha256']==attempt['source_after_sha256']==report['source_sha256']==hashes
assert sha(gzip.decompress((P/'build.log.gz').read_bytes()))==attempt['build_log_sha256']==report['build_log_sha256']
assert report['selected_toolchain']==attempt['selected_toolchain']=='v1.44'
old_report=read(old/'build-comparison.json')
assert report['sdk_source_sha256']==old_report['sdk_source_sha256']
assert report['rustc_sha256']==old_report['rustc_sha256']
assert report['command']==old_report['command'] and report['environment']==old_report['environment']
binary=(P/'pump_fees_candidate.so').read_bytes();prior=(old/'pump_fees_candidate.so').read_bytes()
identity=read(P/'whole-file-identity.json');digest=sha(binary)
assert binary==prior and len(binary)==769000
assert digest==identity['new_candidate_sha256']==identity['retained_candidate_sha256']=='a9c4ea9e47356a91bf9bd97318746a7c207b873e32485d7786853f048d7d4afa'
assert identity['whole_file_byte_equal'] and identity['changed_source_inputs']==['programs/pump-fees/README.md']
assert identity['source_inputs']==22 and identity['unchanged_source_inputs']==21 and identity['build_source_unchanged']
original=(R/'evidence/original/pump_fees/deployed.so').read_bytes();comparison=report['comparison']
assert binary!=original and sha(original)==comparison['original_sha256'] and len(original)==comparison['original_bytes']
assert digest==comparison['candidate_sha256'] and len(binary)==comparison['candidate_bytes']
assert comparison['full_byte_equality'] is False and identity['full_original_byte_equality'] is False
counts={'differential':17331,'codec-rejections':9,'initializer-history':2,'initializer-rejections':28,'messages':2,'compared-values':9,'authority-logs':3,'signed-transfers':56,'serialization-error':1}
for name,count in counts.items():
 data=json.loads(gzip.decompress((old/(name+'.json.gz')).read_bytes()))
 assert data['case_count']==count and not data['mismatches']
 assert data['candidate_sha256']==digest and data['original_sha256']==sha(original)
sequence=json.loads(gzip.decompress((old/'donation-sequence.json.gz').read_bytes()))
assert sequence['candidate_sha256']==digest and len(sequence['steps'])==10 and not sequence['mismatches'] and not sequence['unexpected_errors']
retained=read(P/'retained-evidence-check.json')
assert retained['receipt_counts']==counts and retained['comparison_receipts']==sum(counts.values())==17441
assert retained['repeat_input_receipts']==69 and retained['new_runtime_comparisons']==0
assert retained['artifact_manifest_sha256']==refs['artifact_manifest']['sha256']
for name,ref_key,ref_hash in [('dependency-verification.json','dependency_manifest','dependency_manifest_sha256'),('toolchain-verification.json','reference','reference_sha256')]:
 record=read(P/name)
 assert record['verified'] and sha((R/record[ref_key]).read_bytes())==record[ref_hash]
summary=read(P/'validation-summary.json')
assert summary['comparison_receipts_reused']==17441 and summary['repeat_input_receipts_within_total']==69
assert summary['new_runtime_comparisons']==summary['new_unique_input_cases']==0
assert summary['candidate_sha256']==digest and summary['implemented_handlers']==31
if a.current_main:
 for mapping in [hashes,helper_hashes]:
  for n,h in mapping.items():assert sha((R/n).read_bytes())==h,n
print(json.dumps({'artifact_files':len(artifacts),'source_inputs':22,'unchanged_source_inputs':21,'build_helpers':3,'prior_artifact_files':62,'prior_harness_files':42,'comparison_receipts_reused':17441,'repeat_input_receipts_within_total':69,'donation_steps_reused':10,'new_runtime_comparisons':0,'whole_retained_candidate_byte_equal':True,'full_original_byte_equality':False,'current_main_checked':a.current_main},indent=2))
