"""Installed source/workflow integrity plus compiler-free QA; never dispatches."""
from pathlib import Path
import argparse,hashlib,json,subprocess,sys
P=Path(__file__).resolve().parent;R=P.parents[1]
a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);args=a.parse_args();assert args.repo.resolve()==R
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();j=json.loads((P/'installation.json').read_text());Q=P/'relay-v148-proposal'
assert H(Q/'manifest.json')==j['proposal_manifest_sha256']
for n,h in j['installed_sha256'].items():assert H(R/n)==h,n
assert(R/'scripts/measure_relay_linux_v148.py').read_bytes()==(Q/'measure_relay_linux_v148.py').read_bytes()
assert(R/'.github/workflows/measure-relay-linux-v148.yml').read_bytes()==(Q/'measure-relay-linux-v148.yml').read_bytes()
subprocess.run([sys.executable,'-B',str(Q/'verify.py'),'--repo',str(R)],check=True)
r=subprocess.run([sys.executable,'-B',str(Q/'test_measure_relay_linux_v148.py')],capture_output=True,text=True,cwd=R)
assert r.returncode==0 and'Ran 27 tests'in r.stderr,r.stdout+r.stderr
print(json.dumps({'verified':True,'installed_files':2,'compiler_free_tests':27,'workflow_trigger':'manual dispatch only','builds_executed_by_verifier':0,'runtime_executions':0}))
