#!/usr/bin/env python3
from pathlib import Path
import argparse,hashlib,json,subprocess
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();read=lambda n:json.loads((P/n).read_text())
ap=argparse.ArgumentParser();ap.add_argument('--repo',type=Path);args=ap.parse_args()
assert {str(p.relative_to(P)):H(p.read_bytes())for p in P.rglob('*')if p.is_file()and p!=P/'manifest-sha256.json'and'__pycache__'not in p.parts}==read('manifest-sha256.json')
assert not any(p.is_symlink()for p in P.rglob('*'))
a=read('artifact/attempt.json');r=read('independent-review.json');g=read('github-records.json');files=read('artifact/artifact-hashes.json')
assert a['compiler_success']and a['status']=='completed'and a['build_attempts']==1 and a['runtime_tests_performed']==0 and a['target_empty_before_build']
assert g['linux']['conclusion']=='success'and g['verify']['conclusion']=='success'and len(g['verify']['jobs'])==12 and all(x['conclusion']=='success'for x in g['verify']['jobs'])
for row in g['selected_members']:
 data=(P/'artifact'/row['path']).read_bytes();assert H(data)==row['sha256']and len(data)==row['bytes']
 if row['path']!='artifact-hashes.json':assert {'bytes':len(data),'sha256':H(data)}==files[row['path']]
source=read('artifact/source-before.json');assert len(source)==22 and source==read('artifact/source-after.json')==read('artifact/source-after-fetch.json')
for phase in ['before','after']:
 x=read('artifact/tool-phase-'+phase+'-build.json')
 assert x['compiler_rustc']['sha256']=='c8807b7ebede8578ac5a257ea333780f9d89bd356064fd8184af7e996cb71a97'
 assert x['stripper_objcopy']['sha256']=='673b3b86f0b1b8eadd755e29e2f66a7582248ef3bda7a267fbb370b733c1cb69'
strip=read('artifact/strip-section-comparison.json');assert strip['text_identical']and strip['allocated_runtime_sections_identical']and strip['shared_payload_differences']==['.shstrtab']
trace=(P/r['compiler_exec_trace']).read_text();assert '"--crate-name", "pump_fees_candidate"'in trace and '"--target", "sbf-solana-solana"'in trace and 'execve('in trace and ') = 0'in trace
obj=(P/'artifact/logs/build-process.5307').read_text();assert 'llvm-objcopy'in obj and '"--strip-all"'in obj and ') = 0'in obj
c=(P/'artifact/pump_fees_candidate.so').read_bytes();assert H(c)==r['linux_sha256']==read('artifact/whole-file-comparison.json')['candidate_sha256']and len(c)==r['linux_bytes']==768984
if args.repo:
 root=args.repo.resolve()
 for name,digest in source.items():assert H(subprocess.check_output(['git','-C',str(root),'show',a['source_revision']+':'+name]))==digest
 for label,name in [('original','evidence/original/pump_fees/deployed.so'),('darwin','repro/pump_fees/readme-provenance-v144/pump_fees_candidate.so')]:
  data=(root/name).read_bytes();assert H(data)==r[label+'_sha256']and len(data)==r[label+'_bytes']
  assert c!=data and sum(x!=y for x,y in zip(c,data))==r[label+'_shared_differing_positions']and next(i for i,(x,y)in enumerate(zip(c,data))if x!=y)==r[label+'_first_difference']
print(json.dumps({'verified':True,'compiler_exec_confirmed':True,'one_build':True,'candidate_sha256':H(c),'candidate_bytes':len(c),'source_inputs':22,'original_byte_equal':False,'darwin_byte_equal':False,'selected_traces':7,'runtime_tests':0,'source_git_and_raw_comparisons_recomputed':bool(args.repo),'full_artifact_digest_recomputed':False},indent=2))
