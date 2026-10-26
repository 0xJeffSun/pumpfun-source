from pathlib import Path
import json,hashlib,subprocess,shutil
P=Path(__file__).resolve().parent
R=Path('/Users/shawwalters/.codex/worktrees/main-reconciliation/pumpfun-source')
def write(n,j): (P/n).write_text(json.dumps(j,indent=2,sort_keys=True)+'\n')
def git(*a): return subprocess.check_output(['git','-C',str(R),*a])
refs=json.loads((P/'refs.json').read_text()); rows=json.loads((P/'base2f14-to-incoming2508.json').read_text()); own=json.loads((P/'three-way-ownership-paths.json').read_text())
shutil.copyfile(R/'work/layer02-integration/pass25-main2508-rename-resolution.json',P/'actual-rename-resolution.json')
receipt=json.loads((P/'actual-rename-resolution.json').read_text())
assert receipt['passed'] and receipt['rename_conflicts_resolved']==8 and len(receipt['resolutions'])==24
(P/'incoming-verify-workflow.yml').write_bytes(git('show',refs['incoming']+':.github/workflows/verify.yml'))
positive=[x for x in rows if x['after']]; negative=[x['path'] for x in rows if x['after'] is None]
write('incoming-retention-contract.json',{'schema':1,'pinned_refs':refs,'incoming_change_count':233,'positive_count':len(positive),'negative_count':len(negative),'incoming_only_count':len(own['incoming_only']),'positive':positive,'absent_active_paths':negative,'explicit_active_exception':{'.github/workflows/verify.yml':'Root CIv7 owns separately sealed derived active workflow; exact incoming workflow retained here'},'rename_resolution_receipt':'actual-rename-resolution.json','current_selections':'Root tested107 and Relay15 canonical23 retained; incoming admin_cto baseline and Relay13 alias must not replace selected source','execution':'none; hash-only inventory, passive incoming scripts and witnesses not executed'})
helpers=['scripts/build_partial_candidate.py','scripts/analyze.py','scripts/build_recovered_program.py','scripts/check_build_stack.py']
# Capture only existing named helper blobs, without interpreting source.
h=[]
for name in helpers:
 row={'path':name,'refs':{}}
 for label in ('base','root','incoming'):
  q=subprocess.run(['git','-C',str(R),'show',refs[label]+':'+name],capture_output=True)
  row['refs'][label]=hashlib.sha256(q.stdout).hexdigest() if q.returncode==0 else None
 h.append(row)
write('helper-hashes.json',h)
# Current merged retention checks, separate from historical clean premerge observation.
fail=[]
for x in positive:
 if x['path']=='.github/workflows/verify.yml': continue
 q=R/x['path']
 if not q.is_file() or hashlib.sha256(q.read_bytes()).hexdigest()!=x['after']['sha256']: fail.append(x['path'])
for n in negative:
 if (R/n).exists(): fail.append(n)
for x in receipt['resolutions']:
 if x['role']!='retain-exact-archive': continue
 if hashlib.sha256((R/x['path']).read_bytes()).hexdigest()!=x['sha256']: fail.append(x['path'])
assert not fail,fail
write('merged-retention-observation.json',{'passed':True,'positive_exact_checked':len(positive)-1,'workflow_excluded_for_separately_pinned_CIv7':1,'negative_absent_checked':len(negative),'archive_versions_checked':16,'scope':'working tree bytes only, no staging or semantic/execution claim','HEAD_observed':git('rev-parse','HEAD').decode().strip()})
