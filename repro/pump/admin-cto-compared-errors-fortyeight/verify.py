"""Portable saved-evidence verifier; no target, build, VM, signer or RPC calls."""
from pathlib import Path
import argparse,base64,gzip,hashlib,json,os,subprocess,sys,tarfile,tempfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser();a.add_argument('--runtime-signatures',action='store_true');args=a.parse_args()
m=J(P/'manifest.json');assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']}
for n,v in m.items():assert not(P/n).is_symlink()and H(P/n)==v['sha256']and(P/n).stat().st_size==v['bytes'],n
summary=J(P/'summary.json');assert H(P/'candidate.so')==summary['candidate']=='e9494060904aad25f465efd93af9dd0bb09a5ded9f321747c789cbf0310bc6c5';assert H(P/'unstripped.so')==summary['symbols']=='04641cb62e11e7abfc1db824374861a88fb067484b5c6c271ed0e6283b975a37'
assert H(P/'original.so')==summary['original']=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
assert len(summary['source37'])==37
for n,h in summary['source37'].items():assert H(P/'source'/n)==h,n
assert J(P/'build/build-exit.json')['returncode']==J(P/'build/controller-exit.json')['returncode']==0
assert J(P/'runtime-controls/controller-exit.json')['returncode']==0
assert J(P/'build/source-before.json')==J(P/'build/source-after.json')==summary['source37']
assert summary['differential_cases']==9269 and summary['surfpool_comparisons']==1024 and summary['receipt_bindings']==68
members=J(P/'archive-members.json')
for name,expected in members.items():
 with tarfile.open(P/name,'r:gz')as t:
  rows=t.getmembers();assert len(rows)==len(expected)and len({r.name for r in rows})==len(rows)
  for r in rows:
   assert r.isfile()and not r.issym()and not Path(r.name).is_absolute()and'..'not in Path(r.name).parts
   b=t.extractfile(r).read();v=expected[r.name];assert hashlib.sha256(b).hexdigest()==v['sha256']and len(b)==v['bytes']and r.mode==v['mode'],(name,r.name)
# Default runs only static method and whole-window recomputation on captured bytes.
logs=[]
def run(name,cmd,cwd):
 r=subprocess.run(cmd,cwd=cwd,capture_output=True,text=True,env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1','PYTHONPATH':os.environ.get('PUMP_SAVED_GUARD_PATH','')});logs.append({'name':name,'returncode':r.returncode,'stdout':r.stdout,'stderr':r.stderr});assert r.returncode==0,logs[-1]
run('static944e',[sys.executable,'-B',str(P/'build/static-review/verify_static.py'),'--check'],P)
run('full-before-after-ledger',[sys.executable,'-B',str(P/'build/analysis/full_inventory.py'),'--check'],P)
# Saved metadata and known construction-domain coverage remain finite, not exhaustive.
coverage=J(P/'runtime-controls/changed-domain-coverage.json')['counts'];assert coverage['differential']['6030_application']==1 and coverage['differential']['2006_application']==0 and coverage['surfpool']['6030_application']==coverage['surfpool']['2006_application']==0
saved=J(P/'runtime-controls/summary.json');assert saved['passed']and all(r['returncode']==0 for r in saved['all_actual_child_exits'])
if args.runtime_signatures:
 with tempfile.TemporaryDirectory(prefix='pump-cto-saved-only-')as temp:
  repo=Path(temp)/'repo';repo.mkdir()
  with tarfile.open(P/'runtime-repository.tar.gz','r:gz')as t:
   for r in t.getmembers():
    target=repo/r.name;target.parent.mkdir(parents=True,exist_ok=True)
    with t.extractfile(r)as source,target.open('xb')as dest:dest.write(source.read())
    target.chmod(r.mode&0o777)
  W=repo/'work/pump-admin-cto-error-batch-build'
  # These unchanged verifiers authenticate saved signatures/journals/effects only; they do not create targets/VMs.
  for name in ['verify_receipts','verify_extra_saved']:run(name,[sys.executable,'-B',str(W/(name+'.py'))],repo)
  sig=J(W/'independent-verification.json');assert sig['differential_case_count']==9237 and sig['surfpool_comparisons']==1024
  # Runtime frozen inputs remain byte-identical even after saved checks.
  for n,h in J(P/'runtime-controls/runtime-inputs-before.json').items():assert H(repo/n)==h,n
print(json.dumps({'passed':True,'candidate':summary['candidate'],'source_inputs':37,'differential_cases':9269,'surfpool_comparisons':1024,'runtime_signatures_reverified':args.runtime_signatures,'checks':logs,'builds_performed':0,'target_executions_performed':0,'full_original_identity':False},indent=2))
