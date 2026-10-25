"""UNEXECUTED root-reviewed capture/apply controller; no build/VM/Git."""
from pathlib import Path
import json,hashlib,importlib.util,argparse,sys,subprocess,shutil,os,traceback
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def load(p,n):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
V=load(P/'verify.py','bridge');B=J(P/'bindings.json')
def safe(R,n):return V.safe(R/n,R)
def source(R):
 scanner=load(safe(R,'scripts/build_source_manifest.py'),'scanner');out={}
 for name,c,w,extra,count in [('pump','programs/pump','programs/pump',[],37),('mayhem','programs/mayhem','programs/mayhem',[],14),('amm','programs/pump-amm','programs/pump-amm',['programs/pump-amm/vendor/solana-pubkey'],30),('fees','programs/pump-fees','.', ['programs/pump-fees/README.md'],26)]:
  actual=scanner.source_manifest(safe(R,c),safe(R,w),R,extra_inputs=[safe(R,n)for n in extra]);assert len(actual)==count,(name,len(actual));out[name]=actual
 return out
def canonical(R):
 c=safe(R,'programs/donation-relay');scanner=load(safe(R,'scripts/build_source_manifest.py'),'canonical_scanner');return scanner.source_manifest(c,c,R)
def capture(R):
 base=J(P/'baseline-source-map.json');assert len(base)==23;assert canonical(R)=={'programs/donation-relay/'+n:h for n,h in base.items()},'root must first reconcile canonical source exactly to source13'
 paths=['repro/status.json','repro/donation-relay/current.json','repro/donation-relay/README.md','.gitattributes','programs/donation-relay/README.md']+[f'programs/{n}/README.md'for n in ['pump','mayhem','pump-amm','pump-fees']]
 paths += [str(p.relative_to(R))for folder in ['scripts','.github/workflows']for p in safe(R,folder).rglob('*')if p.is_file()]
 assert(R/'repro/donation-relay/current.json').read_bytes()==(P/'current.before.json').read_bytes();assert(R/'repro/donation-relay/README.md').read_bytes()==(P/'README.before.md').read_bytes()
 return {'root':str(R),'other_source107':source(R),'canonical_source13':canonical(R),'assets':{n:H(safe(R,n))for n in sorted(set(paths))},'asset_paths':sorted(set(paths)),'canonical_tree':{str(p.relative_to(R/'programs/donation-relay')):H(p)for p in(R/'programs/donation-relay').rglob('*')if p.is_file()},'scanner_sha256':H(safe(R,'scripts/build_source_manifest.py'))}
def atomic(p,b):
 t=p.with_name(p.name+'.relay15-new');assert not t.exists();t.write_bytes(b);os.replace(t,p)
def stage(S,D,seal):
 V.tree(S,seal)
 if D.exists():V.tree(D,seal);return
 D.parent.mkdir(parents=True,exist_ok=True);shutil.copytree(S,D);V.tree(D,seal)
def main():
 a=argparse.ArgumentParser();a.add_argument('--current-root',type=Path,required=True);a.add_argument('--checkpoint',type=Path,required=True);a.add_argument('--reviewed-seal',required=True);a.add_argument('--capture-baseline',type=Path);a.add_argument('--baseline',type=Path);a.add_argument('--baseline-sha256');a.add_argument('--output',type=Path);a.add_argument('--apply',action='store_true');x=a.parse_args();R=x.current_root.absolute();E=x.checkpoint.absolute();V.tree(P,x.reviewed_seal);V.tree(E,B['checkpoint_seal']);assert sys.version_info[:2]==(3,12),'stock P24 requires Python3.12';before=capture(R)
 if x.capture_baseline:
  assert not x.apply and x.baseline is None and x.output is None;assert not x.capture_baseline.exists();x.capture_baseline.parent.mkdir(parents=True,exist_ok=True);x.capture_baseline.write_text(json.dumps(before,indent=2)+'\n');print(json.dumps({'capture_sha256':H(x.capture_baseline),'review_before_apply':True}));return
 assert x.apply and x.baseline is not None and x.baseline_sha256 and x.output is not None;assert H(x.baseline)==x.baseline_sha256 and J(x.baseline)==before
 D=x.output.absolute();safe(R,str(D.relative_to(R)));assert D.is_relative_to(R/'work')and not D.exists()and D!=P and P not in D.parents;D.mkdir();(D/'before.json').write_text(json.dumps(before,indent=2)+'\n');code=1
 def saved(command,label):
  r=subprocess.run(command,capture_output=True);(D/(label+'.stdout')).write_bytes(r.stdout);(D/(label+'.stderr')).write_bytes(r.stderr);(D/(label+'.exit.json')).write_text(json.dumps({'command':command,'returncode':r.returncode},indent=2)+'\n');assert r.returncode==0,label
 try:
  saved([sys.executable,'-B',str(P/'verify.py'),'--checkpoint',str(E),'--expected-seal',x.reviewed_seal],'saved-before')
  stage(E,safe(R,B['checkpoint']),B['checkpoint_seal']);stage(P,safe(R,B['selection']),x.reviewed_seal)
  S=E/'runtime-plan/static-proof/source';assert {str(p.relative_to(S)):H(p)for p in S.rglob('*')if p.is_file()}==B['source23']
  for n,h in B['source23'].items():atomic(safe(R,'programs/donation-relay/'+n),(S/n).read_bytes())
  atomic(safe(R,'programs/donation-relay/README.md'),(P/'canonical-README.proposed.md').read_bytes());atomic(safe(R,'repro/donation-relay/current.json'),(P/'current.proposed.json').read_bytes());atomic(safe(R,'repro/donation-relay/README.md'),(P/'README.proposed.md').read_bytes())
  assert source(R)==before['other_source107'];assert sorted(str(p.relative_to(R))for folder in ['scripts','.github/workflows']for p in safe(R,folder).rglob('*')if p.is_file())==sorted(n for n in before['asset_paths']if n.startswith(('scripts/','.github/workflows/')));allowed={'programs/donation-relay/README.md','repro/donation-relay/current.json','repro/donation-relay/README.md'}
  for n,h in before['assets'].items():
   if n not in allowed:assert H(safe(R,n))==h,n
  # No unknown canonical byte may silently change.
  allowedcanonical=set(B['source23'])|{'README.md'};actual={str(p.relative_to(R/'programs/donation-relay')):H(p)for p in(R/'programs/donation-relay').rglob('*')if p.is_file()};assert set(actual)==set(before['canonical_tree'])
  for n,h in before['canonical_tree'].items():
   if n not in allowedcanonical:assert actual[n]==h,n
  assert canonical(R)=={'programs/donation-relay/'+n:h for n,h in B['source23'].items()}
  saved([sys.executable,'-B',str(R/B['selection']/'verify.py'),'--current-root',str(R),'--expected-seal',x.reviewed_seal],'current-after');code=0
 except BaseException:(D/'failure.txt').write_text(traceback.format_exc())
 finally:
  observations={}
  def observe(name,fn):
   try:observations[name]={'returncode':0,'observed':fn()}
   except BaseException:observations[name]={'returncode':1,'failure':traceback.format_exc()}
  observe('canonical_source',lambda:canonical(R))
  observe('other_source107',lambda:source(R))
  def assets_after():
   values={}
   for n in before['assets']:
    try:values[n]={'sha256':H(safe(R,n))}
    except BaseException:values[n]={'failure':traceback.format_exc()}
   return values
  observe('protected_asset_bytes',assets_after)
  observe('script_workflow_paths',lambda:sorted(str(p.relative_to(R))for folder in ['scripts','.github/workflows']for p in safe(R,folder).rglob('*')if p.is_file()))
  # Compare observed maps independently as well as retaining read failures.
  comparison_failures=[]
  if observations['canonical_source'].get('observed')!={'programs/donation-relay/'+n:h for n,h in B['source23'].items()}:comparison_failures.append('canonical_source23')
  if observations['other_source107'].get('observed')!=before['other_source107']:comparison_failures.append('other_source107')
  current_assets=observations['protected_asset_bytes'].get('observed',{})
  for n,h in before['assets'].items():
   if n not in {'programs/donation-relay/README.md','repro/donation-relay/current.json','repro/donation-relay/README.md'}and current_assets.get(n,{}).get('sha256')!=h:comparison_failures.append('asset:'+n)
  if observations['script_workflow_paths'].get('observed')!=sorted(n for n in before['asset_paths']if n.startswith(('scripts/','.github/workflows/'))):comparison_failures.append('script_workflow_paths')
  observations['after_comparisons']={'returncode':int(bool(comparison_failures)),'failures':comparison_failures}
  (D/'independent-after-observations.json').write_text(json.dumps(observations,indent=2)+'\n')
  if any(row['returncode']for row in observations.values()):code=1
  # Receipt creation does not depend on any scanner/observation succeeding.
  (D/'exit.json').write_text(json.dumps({'returncode':int(code),'selection_seal':x.reviewed_seal,'checkpoint_seal':B['checkpoint_seal'],'candidate_sha256':B['candidate'],'symbols_sha256':B['symbols'],'independent_observation_returncodes':{n:r['returncode']for n,r in observations.items()},'canonical_main_build_performed':False,'VM_compiler_Git_calls':0},indent=2)+'\n')
 if code:raise SystemExit(code)
if __name__=='__main__':main()
