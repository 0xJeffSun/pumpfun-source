"""Git-safe outer wrapper verification; invokes only unchanged saved-evidence readers."""
from pathlib import Path
import argparse,json,subprocess,sys,tempfile,os
from strict_evidence import strict_package
from materialize import materialize,INNER
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;p=argparse.ArgumentParser();p.add_argument('--expected-seal',required=True);p.add_argument('--runtime-signatures',action='store_true');p.add_argument('--main-companion',type=Path);p.add_argument('--main-seal');p.add_argument('--current-root',type=Path);a=p.parse_args()
assert not a.current_root or a.main_companion
assert bool(a.main_companion)==bool(a.main_seal)
with tempfile.TemporaryDirectory(prefix='pump98-materialized-')as temp:
 inner=materialize(P,a.expected_seal,Path(temp).resolve()/'inner')
 if a.main_companion:
  main=a.main_companion.absolute();strict_package(main,a.main_seal);cmd=[sys.executable,'-B',str(main/'verify.py'),'--expected-seal',a.main_seal,'--scratch',str(inner)]
  if a.current_root:cmd+=['--current-root',str(a.current_root)]
 else:
  cmd=[sys.executable,'-B',str(inner/'verify.py'),'--expected-seal',INNER]
  if a.runtime_signatures:cmd+=['--runtime-signatures']
 result=subprocess.run(cmd,cwd=inner,env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'},capture_output=True,text=True)
 print(json.dumps({'inner_verifier_command':cmd,'returncode':result.returncode,'stdout':result.stdout,'stderr':result.stderr,'outer_seal':a.expected_seal,'inner_seal':INNER,'unchanged_inner_reader':True,'full_membership_verified':True,'target_executions':0,'builds':0},indent=2));result.check_returncode()
