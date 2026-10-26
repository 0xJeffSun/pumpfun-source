"""UNEXECUTED one main build; README finalization is a separate operation."""
from common import *
import argparse,re,traceback
p=argparse.ArgumentParser();p.add_argument('--reviewed-control-sha256',required=True);p.add_argument('--repo',type=Path,required=True);p.add_argument('--launch-main-build',action='store_true');a=p.parse_args();g=control(a.reviewed_control_sha256);M=a.repo.resolve();R=Path(g['original_repo']);C=R/'work/pump-admin-cto-compared-main-control';B=R/'work/pump-admin-cto-compared-main'
frozen=scratch(g);before=sources(g,M,g['source_baseline37']);ext=external(g,M)
status=J(M/'repro/status.json')['pump'];assert H(M/status['candidate_artifact'])==g['baseline_candidate'];assert H((M/status['candidate_artifact']).with_name('unstripped.so'))==g['baseline_symbols']
if not a.launch_main_build:print(json.dumps({'preflight':'PASS','build':'UNRUN','README':'UNAPPLIED','sources':before,'external':ext,'scratch':frozen}));raise SystemExit(0)
assert not C.exists()and not B.exists(),'one exclusive main attempt; never overwrite failure';C.mkdir()
def save(n,v):
 with(C/n).open('x')as f:f.write(json.dumps(v,indent=2)+'\n')
children=[]
def run(name,cmd,cwd):
 with(C/(name+'.stdout')).open('x')as out,(C/(name+'.stderr')).open('x')as err:r=subprocess.run(cmd,cwd=cwd,stdout=out,stderr=err,env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1','CARGO_HOME':g['cache'],'CARGO_NET_OFFLINE':'true'})
 row={'name':name,'command':cmd,'cwd':str(cwd),'returncode':r.returncode,'stdout_sha256':H(C/(name+'.stdout')),'stderr_sha256':H(C/(name+'.stderr'))};children.append(row);save(name+'-exit.json',row);return r
code=1;error=None;readme=H(M/'programs/pump/README.md');mutated=False
try:
 save('gate-before.json',{'scratch':frozen,'sources':before,'external':ext,'baseline_candidate':g['baseline_candidate'],'baseline_symbols':g['baseline_symbols'],'README_sha256':readme,'README_compile_input':False,'control_seal':a.reviewed_control_sha256})
 run('scratch-saved-verification',[sys.executable,'-B',str(Path(g['scratch_package'])/'verify.py'),'--runtime-signatures'],R).check_returncode()
 run('four-helper-import-help',[sys.executable,'-B',str(M/'scripts/build_partial_candidate.py'),'--help'],M).check_returncode()
 shutil.copyfile(P/'proposed-source/programs/pump/src/admin_cto.rs',M/'programs/pump/src/admin_cto.rs');mutated=True
 save('source-applied.json',sources(g,M,g['source_proposed37']));assert H(M/'programs/pump/README.md')==readme
 cmd=[sys.executable,'-B',str(M/'scripts/build_partial_candidate.py'),'--manifest',str(M/'programs/pump/Cargo.toml'),'--program','pump','--artifact-name','pump_recovered.so','--tools-version','v1.44','--output',str(B)]
 save('build-launch.json',{'command':cmd,'attempt_limit':1,'explicit_compile':'v1.44','strip':'v1.52 unchanged SDK phase','environment_overrides':{'CARGO_HOME':g['cache'],'CARGO_NET_OFFLINE':'true','PYTHONDONTWRITEBYTECODE':'1'},'README_sha256':readme,'README_excluded_from_inputs':True})
 r=run('build',cmd,M)
 save('gate-after.json',{'scratch':scratch(g),'sources':sources(g,M,g['source_proposed37']),'external':external(g,M),'README_sha256':H(M/'programs/pump/README.md')});assert H(M/'programs/pump/README.md')==readme
 r.check_returncode();attempt=J(B/'build-attempt.json');report=J(B/'build-comparison.json');assert attempt['returncode']==0 and attempt['source_unchanged']and attempt['selected_toolchain']=='v1.44';assert attempt['source_sha256']==attempt['source_after_sha256']==report['source_sha256']==g['source_proposed37']
 assert report['sdk_source_sha256']==ext['sdk'];assert H(B/'sdk/dependencies/platform-tools/llvm/bin/llvm-objcopy')==g['tools']['files']['stripper']['sha256']and(B/'sdk/dependencies/platform-tools-v1.52.md').is_file()
 log=(B/'build.log').read_text();bad=[line for line in log.splitlines()if re.search(r'(stack offset|stack frame|stack size|stack overflow|LLVM ERROR|Cannot select:|error: function)',line,re.I)];save('stack-backend-gate.json',{'passed':not bad,'matches':bad});assert not bad
 cand=B/'artifacts/pump_recovered.so';sym=B/'target/sbf-solana-solana/release/pump_recovered.so';S=Path(g['scratch_package'])
 identity={'candidate_sha256':H(cand),'symbols_sha256':H(sym),'whole_candidate_equal':cand.read_bytes()==(S/'candidate.so').read_bytes(),'whole_symbols_equal':sym.read_bytes()==(S/'unstripped.so').read_bytes(),'source37':g['source_proposed37'],'scratch_seal':g['scratch_seal'],'README_sha256_during_build':readme,'README_compile_input':False,'README_applied':False};save('identity.json',identity);assert identity['whole_candidate_equal']and identity['whole_symbols_equal'];code=0
except BaseException as exc:
 error={'type':type(exc).__name__,'message':str(exc)};traceback.print_exc()
finally:
 if not(C/'gate-after.json').exists():
  evidence={}
  for key,fn in [('scratch',lambda:scratch(g)),('sources',lambda:sources(g,M,g['source_proposed37']if mutated else g['source_baseline37'])),('external',lambda:external(g,M))]:
   try:evidence[key]=fn()
   except BaseException as ex:evidence[key]={'failed':True,'type':type(ex).__name__,'message':str(ex)}
  evidence['README_sha256']=H(M/'programs/pump/README.md');save('gate-after.json',evidence)
 save('runner-exit.json',{'returncode':code,'error':error,'children':children,'main_build_limit':1,'runtime_executions':0,'README_applied':False})
raise SystemExit(code)
