"""Portable saved-evidence verifier; no target, build, VM, signer or RPC calls."""
from pathlib import Path
import argparse,base64,gzip,hashlib,json,os,subprocess,sys,tarfile,tempfile
from strict_evidence import strict_package
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser();a.add_argument('--expected-seal',required=True);a.add_argument('--runtime-signatures',action='store_true');args=a.parse_args();strict_package(P,args.expected_seal)
summary=J(P/'summary.json');assert H(P/'candidate.so')==summary['candidate']=='71ec4d8a646eefc82ba177afbc3d08552deadd65cf2f80ec280862eb768d059c';assert H(P/'unstripped.so')==summary['symbols']=='6edbf4dedf535dd0dec1199ab87a97d6d83b60fb2c1c3a5791feffc953a33cda'
assert H(P/'original.so')==summary['original']=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
assert len(summary['source37'])==37
for n,h in summary['source37'].items():assert H(P/'source'/n)==h,n
assert J(P/'build/build-exit.json')['returncode']==J(P/'build/controller-exit.json')['returncode']==0
assert J(P/'runtime-controls/controller-exit.json')['returncode']==0
outer=J(P/'runtime-controls/outer-runner-exit.json');assert outer['returncode']==0 and outer['actual_terminal_completion_observed']
assert J(P/'build/source-before.json')==J(P/'build/source-after.json')==summary['source37']
assert summary['differential_cases']==9269 and summary['surfpool_comparisons']==1024 and summary['receipt_bindings']==68
members=J(P/'archive-members.json')
history_seals={'runtime-control5cf.tar.gz':'5cfdb82c798276aa1b15171388b682b77feb964de9956f4ba05dee9761e219e6','build-controlf14.tar.gz':'f14c7f860fd127e546723d4faa0223850c67c7217b1f831a3023584e4055deae','history-6940-control.tar.gz':'694022afe5778dcc5fc34894af1c01df355b8fc5a4f0274fb84e4a10dbdba824','history-95b6-unexecuted.tar.gz':'95b6354d3232afc70b8a804718a9e41de70637204d643b0e9aca64d2199d4d6a','history-6dd-public.tar.gz':'6dd9e2ea3de977a47867bbb11f249b3cba5f4683b16b3a568d949df30b8609d5','history-C4-main.tar.gz':'c4ee0834d4e59f66fb8a805f20bc39d4556c48332fe955479f9d1793f7ced86a'}
for name,expected in members.items():
 with tarfile.open(P/name,'r:gz')as t:
  if name in history_seals:
   raw=t.extractfile('manifest.json').read();assert hashlib.sha256(raw).hexdigest()==history_seals[name]
   inner=json.loads(raw);assert set(expected)==set(inner)|{'manifest.json','manifest.sha256'}
   for n,row in inner.items():assert expected[n]['sha256']==(row['sha256']if isinstance(row,dict)else row)
  rows=t.getmembers();assert len(rows)==len(expected)and len({r.name for r in rows})==len(rows)
  for r in rows:
   assert r.isfile()and not r.issym()and not Path(r.name).is_absolute()and'..'not in Path(r.name).parts
   b=t.extractfile(r).read();v=expected[r.name];assert hashlib.sha256(b).hexdigest()==v['sha256']and len(b)==v['bytes']and r.mode==v['mode'],(name,r.name)
# Default runs only static method and whole-window recomputation on captured bytes.
logs=[]
def run(name,cmd,cwd):
 r=subprocess.run(cmd,cwd=cwd,capture_output=True,text=True,env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1','PYTHONPATH':os.environ.get('PUMP_SAVED_GUARD_PATH','')});logs.append({'name':name,'returncode':r.returncode,'stdout':r.stdout,'stderr':r.stderr});assert r.returncode==0,logs[-1]
run('first-f290-static-history',[sys.executable,'-B',str(P/'history-first-build/static-review/verify_static.py'),'--check'],P)
run('statica169',[sys.executable,'-B',str(P/'build/static-review/verify_static.py'),'--check'],P)
run('full-before-after-ledger',[sys.executable,'-B',str(P/'build/analysis/full_inventory.py'),'--check'],P)
# Saved metadata and known construction-domain coverage remain finite, not exhaustive.
coverage=J(P/'runtime-controls/changed-domain-coverage.json')['counts'];assert coverage['differential']['original']['6019_application']==coverage['differential']['candidate']['6019_application']==1;assert coverage['differential']['original']['6091_application']==coverage['differential']['candidate']['6091_application']==11;assert coverage['differential']['original']['6092_application']==coverage['differential']['candidate']['6092_application']==5;assert coverage['surfpool']['original']['6092_application']==coverage['surfpool']['candidate']['6092_application']==1;assert coverage['differential']['original']['2006_application']==coverage['surfpool']['original']['2006_application']==0
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
