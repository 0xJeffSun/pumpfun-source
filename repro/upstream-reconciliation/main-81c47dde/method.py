from pathlib import Path
import argparse,hashlib,json,subprocess
parser=argparse.ArgumentParser();parser.add_argument('worktree',type=Path);args=parser.parse_args();R=args.worktree.resolve();B='850e0f392538fc8d8a1947f67cc05f32f875fff2';U='81c47dde4967df5e947f97ea750468a39139512a';C='3c5b492be7ed793e062bc14f57c7abf3b3823c61';P=R/'repro/upstream-reconciliation/main-81c47dde';H=lambda b:hashlib.sha256(b).hexdigest()
def git(*a):return subprocess.check_output(['git',*a],cwd=R)
def save(n,b):p=P/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
assert git('rev-parse','HEAD').decode().strip()==B and not git('status','--porcelain').strip()and not P.exists()
assert not git('diff','--name-only',C+'..'+U,'--','programs','.github/workflows','scripts/verify_current_bindings.py','scripts/verify_recovered_builds.py').strip()
rows=[x.split('\t')for x in git('diff','--name-status',C+'..'+U).decode().splitlines()];assert all(len(x)==2 and x[0]in['A','M']for x in rows)
assert not any(any(v in n for v in ['private-security-review','audit_coverage','security-followup'])for _,n in rows)
P.mkdir(parents=True);save('upstream-status.json',git('show',U+':repro/status.json'));save('accepted-status.json',git('show',B+':repro/status.json'));save('before-helper.py',git('show',B+':scripts/build_partial_candidate.py'));save('after-helper.py',git('show',U+':scripts/build_partial_candidate.py'))
assert H((P/'before-helper.py').read_bytes())=='e0eccab6f54fee2996039beb53075d9a7b3f411706a90634a44420dec7b173c1';assert H((P/'after-helper.py').read_bytes())=='bb683621ffc4297c58f030cb03da54484b7370b786fd8eda965a37f4b3198ee9'
r=subprocess.run(['git','merge','--no-commit','--no-ff',U],cwd=R,capture_output=True);save('merge.stdout',r.stdout);save('merge.stderr',r.stderr);assert r.returncode in [0,1];assert git('rev-parse','MERGE_HEAD').decode().strip()==U
conflicts=git('diff','--name-only','--diff-filter=U').decode().splitlines();assert set(conflicts)<={'repro/status.json'},conflicts
subprocess.run(['git','restore','--source',B,'--staged','--worktree','--','repro/status.json'],cwd=R,check=True);assert not git('diff','--name-only','--diff-filter=U').strip()
assert not git('diff',B,'--','programs','.github/workflows','scripts/verify_current_bindings.py','scripts/verify_recovered_builds.py','scripts/verify_current_checkpoint.py').strip()
resolved=[]
for state,n in rows:
 upstream=git('show',U+':'+n);current=R/n
 if n=='repro/status.json':assert current.read_bytes()==(P/'accepted-status.json').read_bytes();disposition='accepted pass21 status retained; upstream historical status archived'
 else:assert current.is_file()and current.read_bytes()==upstream,n;disposition='incoming audit/tooling retained exactly'
 resolved.append({'path':n,'upstream_sha256':H(upstream),'resolved_sha256':H(current.read_bytes()),'disposition':disposition})
save('resolution.json',(json.dumps({'base':B,'upstream':U,'merge_base':C,'paths':resolved,'conflicts':conflicts,'protected_programs_workflow_binding_scripts_equal_to_base':True,'helper_transition':'reviewed reverse e0→bb; only explicit-version equivalence adopted','helper_proof_seal':'eb9173e77c85d1b5e55c8556b52e002ad655e5abe3b8a430a13e5a7fe7cb3223','incoming_audit_snapshot_scope':'Historical source/status snapshots retain their original candidate hashes; pass21 accepted artifacts supersede them. No upstream SBF/runtime/compiler probe was executed by this merge.','target_executions':0},indent=2)+'\n').encode());save('method.py',Path(__file__).read_bytes());print(json.dumps({'status':'MERGED_PENDING_VERIFICATION','incoming_paths':len(rows),'conflicts':conflicts}))
