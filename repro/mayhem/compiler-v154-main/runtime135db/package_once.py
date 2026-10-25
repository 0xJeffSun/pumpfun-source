"""Saved-only publication capture after actual terminal; never VM/compiler."""
from pathlib import Path
import argparse,json,hashlib,shutil,os,tarfile,gzip
R=Path(__file__).resolve().parents[2];C=R/'work/mayhem-v154-runtime-control';O=R/'work/mayhem-v154-retarget-runtime';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
p=argparse.ArgumentParser();p.add_argument('--runner-exit',type=Path,required=True);p.add_argument('--runner-stdout',type=Path,required=True);p.add_argument('--runner-stderr',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();assert H(C/'manifest.json')=='7fcfaab9895b4984a5bbd7079822495a17b1994a43195f976daeef69551d4ed4'
for n,h in J(C/'manifest.json').items():assert H(C/n)==h,n
terminal=J(O/'controller-exit.json');outer=J(a.runner_exit);assert outer['actual_terminal_completion_observed']is True and outer['returncode']==terminal['returncode'];assert H(a.runner_stdout)==outer['stdout_sha256']and H(a.runner_stderr)==outer['stderr_sha256']
D=a.output.resolve();D.relative_to(R/'work');D.mkdir(exist_ok=False);shutil.copytree(C,D/'control',copy_function=os.link);shutil.copy2(a.runner_exit,D/'root-runner-exit.json');shutil.copy2(a.runner_stdout,D/'root-runner.stdout');shutil.copy2(a.runner_stderr,D/'root-runner.stderr')
W=O/'repo/work/mayhem-v154-runtime';files={}
for f in sorted(O.iterdir()):
 if f.is_file():files['controls/'+f.name]=f
for f in sorted(W.iterdir()):
 if f.is_file():files['runtime/'+f.name]=f
for directory in ['replay','verification']:
 if(W/directory).exists():
  for f in sorted((W/directory).rglob('*')):
   if f.is_file():files['runtime/'+str(f.relative_to(W))]=f
index={}
with(D/'runtime-payload.tar.gz').open('wb')as dest,gzip.GzipFile(fileobj=dest,mode='wb',mtime=0)as gz,tarfile.open(fileobj=gz,mode='w|')as t:
 for name,f in sorted(files.items()):
  assert not f.is_symlink()and'__pycache__'not in f.parts and not f.name.endswith('.pyc')and'keypair'not in f.name.lower(),name
  raw=f.read_bytes();info=tarfile.TarInfo(name);info.size=len(raw);info.mode=0o644;info.mtime=0;t.addfile(info,__import__('io').BytesIO(raw));index[name]={'sha256':hashlib.sha256(raw).hexdigest(),'bytes':len(raw)}
(D/'runtime-payload-index.json').write_text(json.dumps(index,indent=2)+'\n')
expected=J(O/'runtime-source-before.json');expected['repro/mayhem/result-error-candidate.so']=J(C/'inputs.json')['candidate'];actual={str(f.relative_to(W/'source')):H(f)for f in(W/'source').rglob('*')if f.is_file()};assert actual==expected==J(O/'runtime-source-after.json')
source14=J(C/'inputs.json')['source14'];assert all(H(W/'source/programs/mayhem'/n)==h for n,h in source14.items());burn={str(f.relative_to(W/'burn-fixtures')):H(f)for f in(W/'burn-fixtures').rglob('*')if f.is_file()};assert burn==J(O/'burn-fixtures-before.json')==J(O/'burn-fixtures-after.json')
for n,h in J(C/'historical-summary-inputs.json').items():assert H(O/'repo'/n)==h
report={'control_seal':H(C/'manifest.json'),'outer_exit':outer['returncode'],'controller_exit':terminal['returncode'],'source14_exact':True,'source70_only_candidate_replaced':True,'burn_fixtures_exact':True,'payload_files':len(index),'payload_raw_bytes':sum(v['bytes']for v in index.values()),'runtime_target_repeated_by_packager':False,'compiler_invocations':0,'omitted_reconstructible_inputs':['runtime/source/ exact control/seed with candidate overwritten from static5435/build/candidate.so','runtime/burn-fixtures/ exact control/burn-fixtures','runtime/build01/artifacts/mayhem_recovered.so exact static candidate','historical summary inputs exact control/historical-summary-inputs'],'no_cache_keypair_or_telemetry_added':True}
(D/'capture.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report),flush=True)
