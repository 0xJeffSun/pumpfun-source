from pathlib import Path
import importlib.util,json,shutil,subprocess
R=Path.cwd();W=Path(__file__).resolve().parent/'cases';W.mkdir(exist_ok=False)
spec=importlib.util.spec_from_file_location('bridge',R/'scripts/verify_current_checkpoint.py');b=importlib.util.module_from_spec(spec);spec.loader.exec_module(b);rows=[]
def run(case,program,root,expected):
 try:b.verify(program,root);ok=True
 except (AssertionError,FileNotFoundError,subprocess.CalledProcessError):ok=False
 rows.append({'case':case,'expected':expected,'actual':ok});assert ok==expected,rows[-1]
for program,main,scratch in [('pump','repro/pump/admin-cto-error-batch-main-fortyeight','repro/pump/admin-cto-error-batch-fortyeight'),('pump_fees','repro/pump_fees/sharing-fourth-cpi-main-v144','repro/pump_fees/sharing-fourth-cpi-v144')]:
 q=W/program;q.mkdir();shutil.copytree(R/main,q/main);shutil.copytree(R/scratch,q/scratch);report=json.loads((R/main/'main/build-comparison.json').read_text());gate=json.loads((R/main/'main/controls/gate-before.json').read_text())
 for n in [*report['source_sha256'],*gate['helpers']]:
  d=q/n;d.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(R/n,d)
 if program=='pump':
  d=q/'programs/pump/README.md';shutil.copy2(R/main/'main/README.final.md',d)
 shutil.copytree(R/b.TRANSITION,q/b.TRANSITION);status={program:{'candidate_artifact':main+'/main/candidate.so','comparison_report':main+'/main/build-comparison.json','candidate_sha256':report['comparison']['candidate_sha256']}};(q/'repro/status.json').write_text(json.dumps(status))
 run(program+'-new-current',program,q,True)
 for tag,p in [('source',q/next(n for n in report['source_sha256']if n.endswith('.rs'))),('unknown-helper',q/'scripts/build_partial_candidate.py'),('scratch-manifest',q/scratch/'manifest.json'),('main-manifest',q/main/'manifest.json')]:
  old=p.read_bytes();p.write_bytes(old+b'\n');run(program+'-'+tag+'-mutation',program,q,False);p.write_bytes(old)
(W.parent/'results.json').write_text(json.dumps({'status':'PASS','target_executions':0,'rows':rows},indent=2)+'\n');print('PASS',len(rows))
