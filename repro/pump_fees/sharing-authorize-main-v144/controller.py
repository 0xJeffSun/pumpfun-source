"""UNEXECUTED root-reviewed one-build main promotion; no runtime."""
from pathlib import Path
import argparse,json,hashlib,subprocess,shutil,os,sys,tarfile,tempfile
P=Path(__file__).resolve().parent;HOME_REPO=P.parents[1];H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);a.add_argument('--reviewed-plan-sha256',required=True);a.add_argument('--launch',action='store_true');args=a.parse_args();R=args.repo.resolve()
assert H(P/'manifest.json')==args.reviewed_plan_sha256
for n,h in J(P/'manifest.json').items():assert H(P/n)==h,n
S=HOME_REPO/'work/fees-sharing-authorize-publication/public';assert H(S/'manifest.json')=='52cd978029f67b8c79e738131fa2bec3251de8fdfc2a22270e1464b210125ba7'
for n,h in J(S/'manifest.json').items():assert H(S/n)==h,n
g=J(P/'inputs.json');base=g['source'];assert len(base)==26
for n,h in base.items():assert H(R/n)==h,n
for n,h in g['helpers'].items():assert H(R/n)==h,n
assert g['helpers']['scripts/build_partial_candidate.py']=='bb683621ffc4297c58f030cb03da54484b7370b786fd8eda965a37f4b3198ee9'
cli=Path(shutil.which('cargo-build-sbf')).resolve();assert str(cli)==g['tools']['cli']['resolved_path']
for v in [*g['tools']['compile_tools'].values(),g['tools']['strip_tool'],g['tools']['cli']]:assert H(Path(v['resolved_path']))==v['sha256']
cache=Path(g['cache']);dep=Path(g['dependency_manifest']);assert H(dep)==g['dependency_manifest_sha256']
def deps():return {str(f.relative_to(cache)):H(f)for d in ['registry/cache','registry/src']for f in(cache/d).rglob('*')if f.is_file()}
assert deps()==J(dep)
source=dict(base);source['programs/pump-fees/src/sharing.rs']=H(P/'sharing.rs');source['programs/pump-fees/README.md']=H(P/'README.proposed.md');scratch=J(S/'acceptance.json')['source'];assert [n for n in source if source[n]!=scratch[n]]==['programs/pump-fees/README.md']
assert set(n for n in source if source[n]!=base[n])=={'programs/pump-fees/src/sharing.rs','programs/pump-fees/README.md'}
if not args.launch:print('PASS preflight only; main untouched');raise SystemExit(0)
W=HOME_REPO/'work/fees-sharing-authorize-main-control';B=HOME_REPO/'work/fees-sharing-authorize-main';assert not W.exists()and not B.exists();W.mkdir()
def save(n,x):
 with(W/n).open('x')as f:f.write(json.dumps(x,indent=2)+'\n')
try:
 save('source-before.json',base);save('source-proposed.json',source);save('gate-before.json',g);save('dependency-before.json',deps())
 shutil.copy2(P/'sharing.rs',R/'programs/pump-fees/src/sharing.rs');shutil.copy2(P/'README.proposed.md',R/'programs/pump-fees/README.md')
 assert {n:H(R/n)for n in source}==source
 cmd=[sys.executable,'-B',str(R/'scripts/build_partial_candidate.py'),'--manifest',str(R/'programs/pump-fees/Cargo.toml'),'--program','pump_fees','--artifact-name','pump_fees_candidate.so','--tools-version','v1.44','--output',str(B),'--extra-input',str(R/'programs/pump-fees/README.md')]
 save('launch.json',{'command':cmd,'build_limit':1,'runtime_executions':0,'reviewed_plan_sha256':args.reviewed_plan_sha256,'resolved_cli':str(cli)})
 with(W/'build.stdout').open('x')as out,(W/'build.stderr').open('x')as err:r=subprocess.run(cmd,cwd=R,env={**os.environ,'CARGO_HOME':str(cache),'CARGO_NET_OFFLINE':'true','PYTHONDONTWRITEBYTECODE':'1'},stdout=out,stderr=err)
 save('build-exit.json',{'returncode':r.returncode});r.check_returncode()
 assert {n:H(R/n)for n in source}==source
 attempt=J(B/'build-attempt.json');report=J(B/'build-comparison.json');assert attempt['source_sha256']==attempt['source_after_sha256']==report['source_sha256']==source and attempt['source_unchanged']and attempt['returncode']==0
 for n,h in g['helpers'].items():assert H(R/n)==h,n
 for v in [*g['tools']['compile_tools'].values(),g['tools']['strip_tool'],g['tools']['cli']]:assert H(Path(v['resolved_path']))==v['sha256']
 after=deps();save('dependency-after.json',after);assert after==J(dep)
 assert str(Path(shutil.which('cargo-build-sbf')).resolve())==str(cli)
 strip=B/'sdk/dependencies/platform-tools/llvm/bin/llvm-objcopy';assert H(strip)==g['tools']['strip_tool']['sha256']and(B/'sdk/dependencies/platform-tools-v1.52.md').is_file()
 for n,h in g['tools']['sdk_template_files'].items():assert H(B/'sdk'/n)==h,n
 assert not any(x in(B/'build.log').read_text().lower()for x in ['stack offset','stack frame','stack size','stack overflow','llvm error','error: function'])
 candidate=B/'artifacts/pump_fees_candidate.so';symbols=B/'target/sbf-solana-solana/release/pump_fees_candidate.so';assert candidate.read_bytes()==(S/'candidate.so').read_bytes()and symbols.read_bytes()==(S/'symbols.so').read_bytes()
 save('identity.json',{'whole_candidate_equal':True,'whole_symbols_equal':True,'candidate_sha256':H(candidate),'symbols_sha256':H(symbols),'main_source_sha256':source,'scratch_source_sha256':scratch,'main_scratch_input_difference':['programs/pump-fees/README.md'],'source_tool_dependency_gates_passed':True,'new_runtime_executions':0})
except BaseException as exc:save('runner-exit.json',{'returncode':1,'type':type(exc).__name__,'message':str(exc)});raise
else:save('runner-exit.json',{'returncode':0})
