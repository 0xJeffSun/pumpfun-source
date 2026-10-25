#!/usr/bin/env python3
"""UNEXECUTED root-reviewed staging controller; no build/runtime/current mutation."""
from pathlib import Path
import argparse,json,hashlib,shutil,subprocess,sys
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);a.add_argument('--stage',type=Path);a.add_argument('--reviewed-plan-sha256',required=True);args=a.parse_args();R=args.repo.resolve();B=R/'work/relay-idl-3002-owned-build/result';expected='d12ad064c15a5e1760f6a566349f982b9e4e4e57430b455a0386b89a4a57248a'
assert H(P/'manifest.json')==args.reviewed_plan_sha256
plan=json.loads((P/'manifest.json').read_text());assert set(plan)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']}
for n,h in plan.items():assert not(P/n).is_symlink()and H(P/n)==h,n
assert H(B/'manifest.json')==expected
m=json.loads((B/'manifest.json').read_text());assert set(m)=={str(f.relative_to(B))for f in B.rglob('*')if f.is_file()and f not in[B/'manifest.json',B/'manifest.sha256']}
for n,h in m.items():assert not(B/n).is_symlink()and H(B/n)==h,n
old=json.loads((R/'repro/donation-relay/current.json').read_text());assert old==json.loads((P/'current.before.json').read_text())
assert H(R/'repro/donation-relay/README.md')==H(P/'README.before.md')
assert old['candidate_sha256']=='34c54b8e1e625a46fd446bb8e6fa7c7f17afcb1fd7d2ef3719a16f630c98ce91'
src=json.loads((B/'launcher/resolved-source-sha256.json').read_text());assert len(src)==23
for n,h in src.items():assert H(B/'source'/n)==h,n
assert json.loads((B/'attempt/build-result.json').read_text())['source_after']==src
assert json.loads((B/'attempt/tool-phase-before.json').read_text())['tools']==json.loads((B/'attempt/tool-phase-after.json').read_text())['tools']
proposed=json.loads((P/'current.proposed.json').read_text());prefix='repro/donation-relay/source-build-12-idl-discriminator-owned/'
for k,tail in [('candidate_artifact','candidate.so'),('source_snapshot','source'),('source_manifest','launcher/resolved-source-sha256.json'),('evidence_manifest','manifest.json')]:assert proposed[k]==prefix+tail
assert proposed['candidate_sha256']==H(B/'candidate.so')=='6fa16842ae4219eafa11da4deca9c3ff1e3833a2bc6959b7a77146423080350e'
assert proposed['symbols_sha256']==H(B/'unstripped.so')=='af100c573ed3d97304590328200c764d01f9a87980babbc1e4004ed9e25637cf'
assert proposed['evidence_manifest_sha256']==expected and proposed['full_original_byte_equality']is False
assert [proposed[k]for k in ['validated_ordinary_cases','verified_transaction_submissions','verified_signature_fields','verified_unique_signatures']]==[12,24,50,25]
receipt=json.loads((B/'ordinary/ordinary.json').read_text());assert receipt['case_count']==receipt['passed']==len(receipt['cases'])==12
assert proposed['prior_checkpoint']=='repro/donation-relay/source-build-11-idl-discriminator'
# Dependency witnesses are byte-bound by d12ad only; this controller does not
# claim recomputation of historical extracted registry/dependency semantics.
# Static and saved receipt checks only; these tools execute no target.
subprocess.run([sys.executable,'-B',str(B/'verify.py')],check=True)
subprocess.run([sys.executable,'-B',str(B/'ordinary/verify.py'),'--repo',str(R),'--runtime'],check=True)
if args.stage is None:
 print('PASS preflight only; no package/current/README written. Use --stage NEW_WORK_PATH only after root review.');raise SystemExit(0)
D=args.stage.resolve();D.relative_to(R/'work');assert not D.exists();D.mkdir(parents=True)
Q=D/'source-build-12-idl-discriminator-owned';shutil.copytree(B,Q)
assert H(Q/'manifest.json')==expected
for n,h in m.items():assert H(Q/n)==h,n
for n in ['current.proposed.json','README.proposed.md']:shutil.copy2(P/n,D/n)
record={'status':'staged_only_not_current','source_manifest_sha256':expected,'staged_manifest_sha256':H(Q/'manifest.json'),'whole_source_and_artifact_copy_identity':True,'candidate_sha256':H(Q/'candidate.so'),'symbols_sha256':H(Q/'unstripped.so'),'source_inputs':23,'new_compiler_builds':0,'new_runtime_executions':0,'original_full_byte_equality':False,'current_pointer_applied':False,'prior_current_json_sha256':H(R/'repro/donation-relay/current.json'),'controller_sha256':H(Path(__file__)),'reviewed_plan_sha256':args.reviewed_plan_sha256,'draft_sha256':{n:H(P/n)for n in ['current.before.json','current.proposed.json','README.before.md','README.proposed.md']},'dependency_scope':'retained witness bytes bound by d12ad; not historical dependency semantics recomputation'}
(D/'publication-identity.json').write_text(json.dumps(record,indent=2)+'\n');print(json.dumps(record,indent=2))
