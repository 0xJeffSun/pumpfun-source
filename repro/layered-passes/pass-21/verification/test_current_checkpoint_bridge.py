from pathlib import Path
import importlib.util,json,shutil,hashlib
R=Path.cwd();W=R/'work/pass21-bridge-tests';W.mkdir(exist_ok=False)
spec=importlib.util.spec_from_file_location('bridge',R/'scripts/verify_current_checkpoint.py');b=importlib.util.module_from_spec(spec);spec.loader.exec_module(b)
rows=[]
def run(case,program,root,expected):
 try:x=b.verify(program,root);ok=True
 except (AssertionError,FileNotFoundError):ok=False
 rows.append({'case':case,'expected_success':expected,'actual_success':ok});assert ok==expected,rows[-1]
status=json.loads((R/'repro/status.json').read_text())
for program in ['pump','pump_amm','pump_fees']:
 q=W/program;q.mkdir();name=status[program]['candidate_artifact'].removesuffix('/main/candidate.so');shutil.copytree(R/name,q/name);p=q/'repro/status.json';p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(status))
 report=json.loads((R/status[program]['comparison_report']).read_text());helpers=json.loads((R/name/'main/controls/gate-before.json').read_text())['helpers']
 for n in [*report['source_sha256'],*helpers]:
  d=q/n;d.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(R/n,d)
 if program in ['pump','pump_amm']:
  n='programs/'+('pump'if program=='pump'else'pump-amm')+'/README.md';d=q/n;d.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(R/n,d)
 shutil.copytree(R/b.TRANSITION,q/b.TRANSITION)
 run(program+'-current',program,q,True)
 n=next(n for n in report['source_sha256']if n.endswith('.rs'));p=q/n;before=p.read_bytes();p.write_bytes(before+b'\n// changed source\n');run(program+'-source-change',program,q,False);p.write_bytes(before)
 p=q/'scripts/build_partial_candidate.py';before=p.read_bytes();p.write_bytes(before+b'\n# unknown helper version\n');run(program+'-unreviewed-helper-change',program,q,False);p.write_bytes(before)
 p.write_bytes((q/b.TRANSITION/'before.py').read_bytes());run(program+'-recorded-or-reviewed-reverse-helper',program,q,True);p.write_bytes(before)
(W/'results.json').write_text(json.dumps({'status':'PASS','target_executions':0,'tests':rows},indent=2)+'\n');print('PASS',len(rows),'current/negative/recorded-helper bridge cases')
