"""UNEXECUTED exact metadata/docs/current-verifier selection; no build or VM."""
from pathlib import Path
import argparse,hashlib,json,shutil,subprocess,sys,traceback
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def seal(root,expected):
 assert H(root/'manifest.json')==expected and(root/'manifest.sha256').read_text().split()[0]==expected;m=J(root/'manifest.json');assert set(m)=={str(f.relative_to(root))for f in root.rglob('*')if f.is_file()and f not in[root/'manifest.json',root/'manifest.sha256']}
 for n,h in m.items():assert not(root/n).is_symlink()and H(root/n)==h

def source():return{n:H(R/n)for n in g['source14']}
def gate(review=False):
 seal(P,args.reviewed_plan_sha256);assert R==Path(g['managed_root']).resolve();assert H(R/'repro/status.json')==g['actual_before_status_sha256']and J(R/'repro/status.json')==J(P/'status.before.json');assert(R/'programs/mayhem/README.md').read_bytes()==(P/'README.before.md').read_bytes();assert(R/'scripts/verify_recovered_builds.py').read_bytes()==(P/'verify_recovered_builds.before.py').read_bytes();assert source()==g['source14']
 for n,h in g['defaults_and_source_scanner'].items():assert H(R/n)==h,n
 target=R/g['main_publication'];ready=target.is_dir()
 if not ready:assert review,'Canonical main packet must be installed before selection';target=Path(g['review_main_work_path'])
 assert not target.is_symlink();seal(target,g['main_manifest_seal']);assert H(R/g['runtime_publication']/'manifest.json')==g['runtime_manifest_seal'];change=J(P/'orchestration-change.json');before=(P/'verify_recovered_builds.before.py').read_text();after=(P/'verify_recovered_builds.proposed.py').read_text();assert before.count(change['insertion_after'])==1 and after==before.replace(change['insertion_after'],change['insertion_after']+change['inserted_exact_text']);compile(after,'proposed-current-dispatch','exec')
 status=J(P/'status.before.json');next=J(P/'status.proposed.json');assert[k for k in status if status[k]!=next[k]]==['mayhem'];assert next['mayhem']==J(target/'status.proposed-mayhem.json');assert(P/'README.proposed.md').read_bytes()==(target/'documentation/README.proposed.md').read_bytes()
 result=subprocess.run([sys.executable,'-B',str(target/'verify.py'),'--accepted-root',str(R)],cwd=R,capture_output=True,text=True);assert result.returncode==0,result.stdout+result.stderr
 return{'passed':True,'canonical_main_packet_installed':ready,'main_seal':g['main_manifest_seal'],'actual_source14_unchanged':True,'old_recipe_defaults_unchanged':True,'new_vm_or_compiler_executions':0}
def write_atomic(dest,raw):
 tmp=dest.with_name(dest.name+'.mayhem-selection-temp');assert not tmp.exists();tmp.write_bytes(raw);tmp.replace(dest)
def record(n,v):(O/n).write_text(json.dumps(v,indent=2)+'\n')
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--current-root',type=Path,required=True);a.add_argument('--reviewed-plan-sha256',required=True);a.add_argument('--select-once',action='store_true');args=a.parse_args();g=J(P/'plan.json');R=args.current_root.resolve()
 if not args.select_once:print(json.dumps({'preflight':gate(True),'selection':'UNRUN','active_writes':0}));raise SystemExit(0)
 assert R==Path(g['managed_root']).resolve();O=R/g['output'];O.mkdir(exist_ok=False);failure=None
 try:
  record('gate-before.json',gate(False));mapping={'repro/status.json':'status.proposed.json','programs/mayhem/README.md':'README.proposed.md','scripts/verify_recovered_builds.py':'verify_recovered_builds.proposed.py'};record('active-before.json',{n:H(R/n)for n in mapping});record('source14-before.json',source())
  for n in mapping:
   backup=O/'before'/n;backup.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(R/n,backup)
  for n,proposal in mapping.items():write_atomic(R/n,(P/proposal).read_bytes())
  target=R/g['main_publication'];cmd=[sys.executable,'-B',str(target/'current_bridge.py'),'--current-root',str(R),'--expected-seal',g['main_manifest_seal']];result=subprocess.run(cmd,cwd=R,capture_output=True,text=True);(O/'bridge.stdout').write_text(result.stdout);(O/'bridge.stderr').write_text(result.stderr);record('bridge-exit.json',{'command':cmd,'returncode':result.returncode});assert result.returncode==0,result.stdout+result.stderr
  assert source()==g['source14'];assert J(R/'repro/status.json')==J(P/'status.proposed.json');assert(R/'programs/mayhem/README.md').read_bytes()==(P/'README.proposed.md').read_bytes();assert(R/'scripts/verify_recovered_builds.py').read_bytes()==(P/'verify_recovered_builds.proposed.py').read_bytes()
  for n,h in g['defaults_and_source_scanner'].items():assert H(R/n)==h
  record('active-after.json',{n:H(R/n)for n in mapping});record('source14-after.json',source());record('scope.json',{'changed_files':list(mapping),'changed_status_programs':['mayhem'],'compiler_defaults_or_source_changed':False,'runtime_or_compiler_executed':False,'old_pass24_current_wrappers_claimed_applicable':False})
 except BaseException as exc:failure={'type':type(exc).__name__,'message':str(exc),'traceback':traceback.format_exc()}
 finally:record('controller-exit.json',{'returncode':1 if failure else 0,'failure':failure,'new_vm_or_compiler':0,'selection_attempt_limit':1})
 if failure:raise SystemExit(1)
