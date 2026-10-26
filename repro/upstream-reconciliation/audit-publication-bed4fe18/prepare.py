"""Prepare explicit baseline bindings; freeze only after final integration review."""
from pathlib import Path
import argparse,hashlib,json,subprocess
P=Path(__file__).resolve().parent;R=P.parents[2]
H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
BASE='bed4fe18'
OLD='repro/layered-passes/pass-23/reconciliation-transition'
ALLOW={'.github/workflows/dependency-build.yml','.github/workflows/verify.yml','.gitattributes','docs/BUILD_IDENTITY_AUDIT.md','repro/parallel-work/2026-10-25/independent-reconstruction-review/FULL-GAP-REPORT.md','repro/pump/metaplex-utilize-positive-guard-source-recovery/README.md','repro/pump/metaplex-utilize-positive-guard-source-recovery/manifest.json','scripts/pump_build_token_dependency.py'}
EXTRA=['README.md','docs/COMPLETION.md','scripts/build_reconstruction_candidate.py','scripts/build_supported_sbpf_candidate.py','scripts/supported_sbpf_policies/v1.53.json','scripts/supported_sbpf_policies/v1.54.json','scripts/test_supported_sbpf_policy.py']
def git(path):return subprocess.run(['git','show',BASE+':'+path],cwd=R,check=True,capture_output=True).stdout
def gather():
 q=R/OLD/'reviewed-plan';z=J(q/'plan.json');old=J(q/'historical-reconciliation.json')
 files={n:old['incoming_files'][n] for n in old['exact_preserved_incoming_files']}
 files[z['foreign']['incoming_doc']]=z['foreign']['incoming_after_sha256'];files.update(old['protected_current_files']);files.update(old['exception_current_sha256']);files.update(z['fees_source26'])
 for path,snapshot in [('repro/status.json','status.expected.json'),('.github/workflows/verify.yml','workflow.expected.yml')]:files[path]=H((q/snapshot).read_bytes())
 files['.gitattributes']=z['attributes_expected_sha256'];files[z['preparation_helper']['path']]=z['preparation_helper']['after_sha256']
 for n,v in z['foreign']['changed_files'].items():
  if n!='.github/workflows/verify.yml':files[n]=v['sha256']
 for n,h in z['attributes_appended_files'].items():files[n]=h
 # Actual preparers and checker utilities are immutable separately from new tooling.
 for n in ['scripts/prepare_pump_nested_runtime.py','scripts/prepare_fees_withdraw_runtime.py','scripts/build_source_manifest.py','scripts/build_partial_candidate.py','scripts/verify_current_checkpoint.py']:
  files[n]=H(git(n))
 packages={}
 def package(n,seal=None):
  value=H((R/n/'manifest.json').read_bytes()) if seal is None else seal
  assert packages.get(n,value)==value;packages[n]=value
 package(OLD);package(OLD+'/reviewed-plan',J(R/OLD/'transition.json')['reviewed_plan_sha256'])
 package('repro/upstream-reconciliation/main-efcddc99',z['historical_seal']);package(z['foreign']['transition_path'],z['foreign']['transition_seal'])
 for key in ['review','historical','current','repeat','initial_failure']:
  package(z['preparation_helper'][key+'_path'] if key in ['review','repeat','initial_failure'] else z['preparation_helper'][key+'_package'],z['preparation_helper'][key+'_seal'])
 for passno in [22,23]:
  n=f'repro/layered-passes/pass-{passno}/packets.json';files[n]=H((R/n).read_bytes())
  for row in J(R/n):package(row['path'],row['sha256'])
 for n in ['repro/layered-passes/pass-23/ci-pump-harness-current-bindings','repro/upstream-reconciliation/main-7b3a63fb']:package(n)
 status=J(q/'status.expected.json');programs={}
 for program,s in status.items():
  if not isinstance(s,dict)or 'candidate_artifact'not in s:continue
  report=J(R/s['comparison_report']);assert all(files.get(n,h)==h for n,h in report['source_sha256'].items())
  files.update(report['source_sha256'])
  for n in [s['candidate_artifact'],s['comparison_report']]:files[n]=H((R/n).read_bytes())
  programs[program]={'candidate':s['candidate_artifact'],'candidate_sha256':report['comparison']['candidate_sha256'],'report':s['comparison_report'],'sources':report['source_sha256']}
 files['repro/donation-relay/current.json']=old['protected_current_files']['repro/donation-relay/current.json']
 # Include read-only prior verification controllers, never execute old current checks.
 for n in ['repro/layered-passes/pass-23/verify_review_applicability.py','repro/layered-passes/pass-23/ci-pump-harness-current-bindings/verify.py','repro/upstream-reconciliation/main-7b3a63fb/verify.py']:files[n]=H(git(n))
 return {'baseline_ref':subprocess.run(['git','rev-parse',BASE],cwd=R,check=True,capture_output=True,text=True).stdout.strip(),'old_transition':OLD,'immutable_files':files,'immutable_packages':packages,'archived':old['archived_stopped_source'],'removed':old['removed_from_active_compiler_discovery'],'excluded_commands':old['excluded_execution_commands'],'programs':programs,'allowed_noncompiler_transitions':sorted(ALLOW),'extra_audit_bindings':EXTRA}
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--freeze',action='store_true');a=ap.parse_args();d=gather()
 if not a.freeze:
  (P/'baseline-bindings.json').write_text(json.dumps(d,indent=2,sort_keys=True)+'\n')
  print(json.dumps({'prepared':True,'final_current_files_frozen':False,'bound_files':len(d['immutable_files']),'packages':len(d['immutable_packages']),'currently_changed_bound_files':[n for n,h in d['immutable_files'].items()if H((R/n).read_bytes())!=h]},indent=2));return
 assert J(P/'baseline-bindings.json')==d,'Historical bindings drifted since preparation'
 assert not(P/'frozen.json').exists(),'Freeze once; preserve prior freeze rather than overwriting'
 changes={n for n,h in d['immutable_files'].items()if H((R/n).read_bytes())!=h};assert changes<=ALLOW,sorted(changes-ALLOW)
 transitions={}
 for n in sorted(changes|set(EXTRA)):
  current=(R/n).read_bytes();before=None
  try:before=git(n)
  except subprocess.CalledProcessError:pass
  # Before snapshots are Git baseline evidence, never used as replacement current files.
  entry={'after_sha256':H(current),'after_snapshot':'after/'+n,'baseline_sha256':H(before)if before is not None else None,'baseline_snapshot':'before/'+n if before is not None else None,'prior_binding_sha256':d['immutable_files'].get(n)}
  for name,raw in [(entry['after_snapshot'],current),(entry['baseline_snapshot'],before)]:
   if name is not None:(P/name).parent.mkdir(parents=True,exist_ok=True);(P/name).write_bytes(raw)
  transitions[n]=entry
 # New proof packages are exact additional audit bindings, not exceptions to old packets.
 for n in ['repro/build-tooling/supported-sbpf-proposal','repro/build-tooling/supported-sbpf-integration']:
  assert(R/n/'manifest.json').exists(),n
  d['immutable_packages'][n]=H((R/n/'manifest.json').read_bytes())
 d['transitions']=transitions;d['final_current_files_frozen']=True
 (P/'frozen.json').write_text(json.dumps(d,indent=2,sort_keys=True)+'\n')
 from verify import check
 print(json.dumps(check(d,R,P),indent=2))
if __name__=='__main__':main()
