"""Check actual current files directly; no historical-current verifier or overlay."""
from pathlib import Path,PurePosixPath
import argparse,hashlib,json,subprocess,sys
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
ALLOW={'.github/workflows/dependency-build.yml','.github/workflows/verify.yml','.gitattributes','docs/BUILD_IDENTITY_AUDIT.md','repro/parallel-work/2026-10-25/independent-reconstruction-review/FULL-GAP-REPORT.md','repro/pump/metaplex-utilize-positive-guard-source-recovery/README.md','repro/pump/metaplex-utilize-positive-guard-source-recovery/manifest.json','scripts/pump_build_token_dependency.py'}
EXTRA={'README.md','docs/COMPLETION.md','scripts/build_reconstruction_candidate.py','scripts/build_supported_sbpf_candidate.py','scripts/supported_sbpf_policies/v1.53.json','scripts/supported_sbpf_policies/v1.54.json','scripts/test_supported_sbpf_policy.py'}
def file(root,name):
 part=PurePosixPath(name);assert not part.is_absolute() and '..'not in part.parts,name
 f=root/name;assert f.is_file() and not f.is_symlink() and f.resolve()==f,name
 return f

def digest(root,name,expected):assert H(file(root,name).read_bytes())==expected,name

def package(root,name,seal):
 q=root/name;digest(root,name+'/manifest.json',seal);m=J(q/'manifest.json');payload=m.get('files',m)
 actual={str(f.relative_to(q)) for f in q.rglob('*') if f.is_file() and f not in [q/'manifest.json',q/'manifest.sha256']}
 assert actual==set(payload),name+' inventory'
 for n,v in payload.items():digest(q,n,v['sha256']if isinstance(v,dict)else v)
 if(q/'manifest.sha256').exists():assert(q/'manifest.sha256').read_text().split()[0]==seal,name

def check(d,R,packet):
 R=R.resolve();assert d['final_current_files_frozen']is True
 baseline=J(packet/'baseline-bindings.json')
 for key in ['immutable_files','archived','removed','excluded_commands','programs','allowed_noncompiler_transitions','extra_audit_bindings']:
  assert d[key]==baseline[key],key
 assert set(d['immutable_packages'])==set(baseline['immutable_packages'])|{'repro/build-tooling/supported-sbpf-proposal','repro/build-tooling/supported-sbpf-integration'}
 for name,seal in baseline['immutable_packages'].items():assert d['immutable_packages'][name]==seal,name
 assert set(d['allowed_noncompiler_transitions'])==ALLOW
 transitions=d['transitions'];extras=set(d['extra_audit_bindings']);assert extras==EXTRA
 changed=set(transitions)-extras;assert changed<=ALLOW
 for n,h in d['immutable_files'].items():
  digest(R,n,transitions[n]['after_sha256'] if n in transitions else h)
 for n,row in transitions.items():
  assert n in ALLOW or n in extras,n
  assert row['prior_binding_sha256']==d['immutable_files'].get(n)
  digest(packet,row['after_snapshot'],row['after_sha256']);digest(R,n,row['after_sha256'])
  if row['baseline_snapshot']is not None:digest(packet,row['baseline_snapshot'],row['baseline_sha256'])
 for n,seal in d['immutable_packages'].items():package(R,n,seal)
 # The sole allowed reseal changes README's entry only; source/other payload stays exact.
 n='repro/pump/metaplex-utilize-positive-guard-source-recovery';before=J(packet/transitions[n+'/manifest.json']['baseline_snapshot']);after=J(R/n/'manifest.json')
 assert set(before)==set(after) and [k for k in before if before[k]!=after[k]]==['README.md']
 assert after['README.md']==H((R/n/'README.md').read_bytes())
 for k,h in after.items():digest(R,n+'/'+k,h)
 for name,row in d['archived'].items():digest(R,row['archive_path'],row['incoming_sha256'])
 for name in d['removed']:assert not(R/name).exists(),name
 workflow=(R/'.github/workflows/verify.yml').read_text()
 for command in d['excluded_commands']:assert command not in workflow,command
 for stopped in ['repro/pump/buy-v3-static-gap-review/verify.py','repro/pump/buy-v3-funded-gap-audit/verify_package.py']:assert stopped not in workflow,stopped
 # Actual inventory utility is itself immutable/hash-bound before import.
 sys.path.insert(0,str(R/'scripts'));from build_source_manifest import source_manifest
 from verify_current_checkpoint import verify as checkpoint
 for program,row in d['programs'].items():
  report=J(R/row['report']);assert report['source_sha256']==row['sources']
  digest(R,row['candidate'],row['candidate_sha256']);assert report['comparison']['candidate_sha256']==row['candidate_sha256']
  for n,h in row['sources'].items():digest(R,n,h)
  if program=='pump':actual=source_manifest(R/'programs/pump',R/'programs/pump',R);assert len(actual)==37 and actual==row['sources']
  if program=='pump_fees':actual=source_manifest(R/'programs/pump-fees',R,R,extra_inputs=[R/'programs/pump-fees/README.md']);assert len(actual)==26 and actual==row['sources']
 for program in ['pump','pump_amm','pump_fees']:checkpoint(program,R)
 # Unmodified current proofs run directly against actual root; none creates runtime cases.
 for script,args in [('repro/layered-passes/pass-23/verify_review_applicability.py',['--repo',str(R)]),('repro/layered-passes/pass-23/ci-pump-harness-current-bindings/verify.py',['--repo',str(R)]),('repro/upstream-reconciliation/main-7b3a63fb/verify.py',['--repo',str(R)])]:
  subprocess.run([sys.executable,'-B',str(R/script),*args],cwd=R,check=True,capture_output=True)
 return {'passed':True,'actual_current_files_checked':len(d['immutable_files']),'immutable_package_seals':len(d['immutable_packages']),'exact_noncompiler_exceptions':sorted(changed),'extra_audit_bindings':sorted(extras),'pump_inputs':37,'fees_inputs':26,'prior_archived_snapshots':len(d['archived']),'removed_active_paths':len(d['removed']),'all_selected_candidates_unchanged':True,'historical_current_verifiers_executed':False,'new_builds':0,'new_target_executions':0}

def main():
 ap=argparse.ArgumentParser();ap.add_argument('--repo','--current-root',dest='repo',type=Path,required=True);a=ap.parse_args()
 m=J(P/'manifest.json');assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']and'__pycache__'not in f.parts}
 assert H((P/'manifest.json').read_bytes())==(P/'manifest.sha256').read_text().split()[0]
 for n,h in m.items():digest(P,n,h)
 print(json.dumps(check(J(P/'frozen.json'),a.repo,P),indent=2))
if __name__=='__main__':main()
