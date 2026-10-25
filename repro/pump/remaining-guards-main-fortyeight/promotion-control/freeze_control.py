"""Saved-evidence finalizer into a NEW control folder; no compiler/VM/active-source/Git writes."""
from pathlib import Path
import argparse,json,hashlib,shutil
from strict_evidence import strict_package
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser();a.add_argument('--reviewed-draft-seal',required=True);a.add_argument('--scratch',type=Path,required=True);a.add_argument('--scratch-seal',required=True);a.add_argument('--portable-result',type=Path,required=True);a.add_argument('--saved-result',type=Path,required=True);a.add_argument('--output',type=Path,required=True);v=a.parse_args()
assert H(P/'manifest.json')==v.reviewed_draft_seal
for n,h in J(P/'manifest.json').items():assert H(P/n)==h,n
S=v.scratch.absolute();strict_package(S,v.scratch_seal);g=J(P/'inputs.json');summary=J(S/'summary.json');runtime=J(S/'runtime-controls/summary.json');outer=J(S/'runtime-controls/outer-runner-exit.json');portable=J(v.portable_result);saved=J(v.saved_result)
assert summary['candidate']==g['candidate']=='71ec4d8a646eefc82ba177afbc3d08552deadd65cf2f80ec280862eb768d059c'and summary['symbols']==g['symbols']
assert summary['source37']==g['source_proposed37']and runtime['passed']and runtime['differential_cases']==9269 and runtime['surfpool_comparisons']==1024 and runtime['receipt_bindings']==68
assert outer['returncode']==0 and outer['actual_terminal_completion_observed']and J(S/'runtime-controls/controller-exit.json')['returncode']==0 and all(c['returncode']==0 for c in runtime['all_actual_child_exits'])
assert all(c['returncode']==0 for c in J(S/'runtime-controls/readonly-after.json'))
assert portable['returncode']==0 and portable['relocated']and portable['original_work_reads_denied']and portable['builds']==portable['target_executions']==0
assert saved['returncode']==0 and saved['verified_manifest_seal']==v.scratch_seal and saved['runtime_signatures']is True
# Final packet may only extend the portably verified draft by explicit verification records.
assert H(S/'verification/initial-manifest.json')==portable['verified_manifest_seal']
initial=J(S/'verification/initial-manifest.json');current=J(S/'manifest.json')
assert all(current[n]==row for n,row in initial.items())
assert all(n.startswith('verification/')for n in set(current)-set(initial))
D=v.output.absolute();assert D.parent==P.parent and D.name=='pump-admin-cto-remaining-main-promotion-control'and not D.exists()
shutil.copytree(P,D,ignore=shutil.ignore_patterns('manifest.json','manifest.sha256'))
(D/'prerequisites').mkdir();shutil.copy2(v.portable_result,D/'prerequisites/portable-result.json');shutil.copy2(v.saved_result,D/'prerequisites/saved-result.json');shutil.copy2(S/'runtime-controls/outer-runner-exit.json',D/'prerequisites/runtime-outer-exit.json');shutil.copy2(S/'README.proposed.md',D/'README.proposed.md')
acceptance={'runtime_returncode':0,'actual_terminal_completion_observed':True,'saved_verification_returncode':saved['returncode'],'portable_verification_returncode':portable['returncode'],'portable_initial_manifest':portable['verified_manifest_seal'],'scratch_seal':v.scratch_seal,'candidate':g['candidate'],'symbols':g['symbols'],'source37':g['source_proposed37'],'prerequisite_sha256':{n:H(D/'prerequisites'/n)for n in ['portable-result.json','saved-result.json','runtime-outer-exit.json']},'root_main_launch_authorization':False}
(D/'runtime-acceptance.json').write_text(json.dumps(acceptance,indent=2)+'\n');g.update({'ready_for_execution':True,'scratch_package':str(S),'scratch_seal':v.scratch_seal,'runtime_acceptance_sha256':H(D/'runtime-acceptance.json'),'readme_proposed_sha256':H(D/'README.proposed.md')});(D/'inputs.json').write_text(json.dumps(g,indent=2)+'\n')
m={str(f.relative_to(D)):H(f)for f in sorted(D.rglob('*'))if f.is_file()};assert not any(f.is_symlink()or f.name=='__pycache__'for f in D.rglob('*'));(D/'manifest.json').write_text(json.dumps(m,indent=2,sort_keys=True)+'\n');seal=H(D/'manifest.json');(D/'manifest.sha256').write_text(seal+'  manifest.json\n');print(json.dumps({'control_seal':seal,'payloads':len(m),'controller_executions':0,'builds':0,'VM':0,'root_review_and_launch_authorization_required':True}))
