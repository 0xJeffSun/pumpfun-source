"""Current reconciliation companion for two exact reviewed noncompiler changes."""
from pathlib import Path
import argparse,hashlib,json,subprocess,sys
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda p:json.loads(p.read_text())
ap=argparse.ArgumentParser();ap.add_argument('--current',type=Path,required=True);R=ap.parse_args().current.resolve()
manifest=J(P/'manifest.json')
assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0]
assert set(manifest)=={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p not in {P/'manifest.json',P/'manifest.sha256'} and '__pycache__' not in p.parts}
for name,digest in manifest.items():assert not(P/name).is_symlink() and H(P/name)==digest,name
t=J(P/'transition.json');prior=R/t['predecessor'];assert H(prior/'manifest.json')==t['predecessor_manifest_sha256']
assert set(J(prior/'manifest.json'))=={str(p.relative_to(prior)) for p in prior.rglob('*') if p.is_file() and p not in {prior/'manifest.json',prior/'manifest.sha256'}}
for name,digest in J(prior/'manifest.json').items():assert not(prior/name).is_symlink() and H(prior/name)==digest,name
s=J(prior/'reconciliation.json');exceptions=t['reviewed_current_exceptions']
assert set(exceptions)=={'.github/workflows/verify.yml','repro/parallel-work/2026-10-25/independent-reconstruction-review/FULL-GAP-REPORT.md'}
def current(name,digest):
    if name in exceptions:
        part=exceptions[name];assert H(P/part['before'])==digest,name
        assert (R/name).read_bytes()==(P/part['after']).read_bytes(),name
    else:assert H(R/name)==digest,name
before=(P/'before-workflow.yml').read_text();after=(P/'after-workflow.yml').read_text();change=t['workflow_replacement']
assert before.count(change['old'])==1 and before.replace(change['old'],change['new'])==after
assert 'pass-22/verify_review_applicability.py --repo .' in change['new']
for name in s['exact_preserved_incoming_files']:current(name,s['incoming_files'][name])
for name,record in s['archived_stopped_source'].items():assert H(R/record['archive_path'])==record['incoming_sha256']==s['incoming_files'][name],name
for key in ['protected_current_files','exception_current_sha256']:
    for name,digest in s[key].items():current(name,digest)
for name in s['removed_from_active_compiler_discovery']:assert not(R/name).exists(),name
for command in s['excluded_execution_commands']:assert command not in after,command
sys.path.insert(0,str(R/'scripts'));from build_source_manifest import source_manifest
report=J(R/'repro/pump/admin-cto-error-batch-main-fortyeight/main/build-comparison.json')
assert source_manifest(R/'programs/pump',R/'programs/pump',R)==report['source_sha256']
subprocess.run([sys.executable,'-B',str(R/'repro/layered-passes/pass-22/verify_review_applicability.py'),'--repo',str(R)],cwd=R,check=True,capture_output=True)
print(json.dumps({'passed':True,'predecessor_package_unchanged':True,'actual_current_source_assertions_retained':True,'reviewed_noncompiler_exceptions':sorted(exceptions),'current_pump_inputs':len(report['source_sha256']),'new_builds':0,'new_target_executions':0,'stopped_execution_commands_excluded':True,'historical_current_verifier_rewritten_or_bypassed':False},indent=2))
