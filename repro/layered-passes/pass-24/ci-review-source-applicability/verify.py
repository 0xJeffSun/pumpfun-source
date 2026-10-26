"""Verify the exact current source-applicability call transition; no target execution."""
from pathlib import Path
import argparse,hashlib,json,subprocess,sys
P=Path(__file__).resolve().parent;R=P.parents[3]
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
m=J(P/'manifest.json');assert set(m)=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p!=P/'manifest.json'and'__pycache__'not in p.parts}
for n,h in m.items():assert H(P/n)==h,n
t=J(P/'transition.json');assert H(R/t['historical_path'])==H(P/'before.py')==t['historical_sha256']
a=(P/'before.py').read_text();r=t['replacement'];assert r['count']==1 and a.count(r['old'])==1 and a.replace(r['old'],r['new'])==(P/'verify_current.py').read_text()
ap=argparse.ArgumentParser();ap.add_argument('--repo',type=Path,required=True);args=ap.parse_args()
assert args.repo.resolve()==R.resolve()
subprocess.run([sys.executable,'-B',str(P/'verify_current.py'),'--repo',str(R)],check=True,cwd=R)
print(json.dumps({'passed':True,'literal_subprocess_transitions':1,'all_prior_source_assertions_unchanged':True,'historical_verifier_rewritten':False,'new_target_executions':0}))
