from pathlib import Path
import importlib.util,json,shutil,subprocess
R=Path.cwd();W=Path(__file__).resolve().parent;Q=W/'case';Q.mkdir(exist_ok=False);main='repro/pump_fees/sharing-authorize-main-v144';scratch='repro/pump_fees/sharing-authorize-v144'
spec=importlib.util.spec_from_file_location('bridge',R/'scripts/verify_current_checkpoint.py');b=importlib.util.module_from_spec(spec);spec.loader.exec_module(b)
for n in [main,scratch]:shutil.copytree(R/n,Q/n)
report=json.loads((R/main/'main/build-comparison.json').read_text());g=json.loads((R/main/'controls/gate-before.json').read_text())
for n in [*report['source_sha256'],*g['helpers']]:
 d=Q/n;d.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(R/n,d)
shutil.copytree(R/b.TRANSITION,Q/b.TRANSITION);(Q/'repro/status.json').write_text(json.dumps({'pump_fees':{'candidate_artifact':main+'/main/candidate.so','comparison_report':main+'/main/build-comparison.json','candidate_sha256':report['comparison']['candidate_sha256']}}))
rows=[]
def run(case,expected):
 try:b.verify('pump_fees',Q);ok=True
 except(AssertionError,FileNotFoundError,subprocess.CalledProcessError):ok=False
 rows.append({'case':case,'expected':expected,'actual':ok});assert ok==expected,rows[-1]
run('new-layout-real-current',True)
for tag,p in [('source',Q/'programs/pump-fees/src/sharing.rs'),('README',Q/'programs/pump-fees/README.md'),('helper',Q/'scripts/build_partial_candidate.py'),('scratch-seal',Q/scratch/'manifest.json'),('main-seal',Q/main/'manifest.json'),('root-controls',Q/main/'controls/gate-before.json')]:
 old=p.read_bytes();p.write_bytes(old+b'\n');run(tag+'-mutation-rejected',False);p.write_bytes(old)
p=Q/main/'controls';p.rename(p.with_name('controls-missing'));run('missing-root-controls-rejected',False);p.with_name('controls-missing').rename(p)
(W/'results.json').write_text(json.dumps({'status':'PASS','target_executions':0,'rows':rows},indent=2)+'\n');print('PASS',len(rows))
