from pathlib import Path
import argparse,hashlib,json
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser();a.add_argument('--expected-seal',required=True);x=a.parse_args();assert H(P/'manifest.json')==x.expected_seal==(P/'manifest.sha256').read_text().split()[0];m=J(P/'manifest.json');assert set(m)=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p not in[P/'manifest.json',P/'manifest.sha256']}
for p in P.rglob('*'):assert not p.is_symlink()and p.name!='__pycache__'and p.suffix!='.pyc'
for n,r in m.items():assert H(P/n)==r['sha256']and(P/n).stat().st_size==r['bytes']
assert H(P/'mayhem-reviewed-plan/manifest.json')=='07337bfefa86324539058a9792a0ad3a070e1a782a3f560927a716d42a89e355'
assert J(P/'mayhem-selection/controller-exit.json')['returncode']==J(P/'mayhem-selection/bridge-exit.json')['returncode']==0;assert J(P/'mayhem-selection/source14-before.json')==J(P/'mayhem-selection/source14-after.json')
for n in ['pump25-corrective-runtime-runner-exit.json','pump25-managed-main-runner-exit.json']:assert J(P/'root-observed'/n)['returncode']==0 and J(P/'root-observed'/n)['actual_terminal_completion_observed']
b=J(P/'pump-selection/status.before.json');c=J(P/'pump-selection/status.after.json');assert{k:v for k,v in b.items()if k!='pump'}=={k:v for k,v in c.items()if k!='pump'};assert c['pump']['candidate_sha256']=='71ec4d8a646eefc82ba177afbc3d08552deadd65cf2f80ec280862eb768d059c'
r=J(P/'relay15-selection/exit.json');assert r['returncode']==0 and all(v==0 for v in r['independent_observation_returncodes'].values());assert r['canonical_main_build_performed']is False
for n in ['saved-before.exit.json','current-after.exit.json']:assert J(P/'relay15-selection'/n)['returncode']==0
assert J(P/'root-observed/pass25-checkpoint-all-payload-index.stdout')['passed'];print(json.dumps({'passed':True,'historical_selection_records':3,'compiler_VM_or_archived_controller_runs':0,'all_original_failure_records_retained':True}))
