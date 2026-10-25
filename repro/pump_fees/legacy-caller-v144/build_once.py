from pathlib import Path
import hashlib,json,os,shutil,subprocess,sys
W=Path(__file__).resolve().parent;R=W.parents[1];B=W/'build-01';S=R/'work/fees-legacy-caller-build/handoff';CACHE=R/'work/fees-legacy-caller-build/cargo-home'
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def save(n,v):(W/n).write_text(json.dumps(v,indent=2,sort_keys=True)+'\n')
assert not B.exists()and J(W/'promotion-preflight.json')['passed']
source=J(W/'source-sha256.json');tools=J(W/'tools-before.json');helpers=J(W/'build-helper-sha256.json')
assert all(H(R/n)==h for n,h in source.items());assert all(H(R/n)==h for n,h in helpers.items())
for v in [*tools['compile_tools'].values(),tools['strip_tool'],tools['cli']]:assert H(Path(v['resolved_path']))==v['sha256']
def deps():return{str(p.relative_to(CACHE)):H(p)for root in ['registry/cache','registry/src']for p in(CACHE/root).rglob('*')if p.is_file()}
assert deps()==J(W/'dependency-before.json')
cmd=[sys.executable,'-B',str(R/'scripts/build_partial_candidate.py'),'--manifest',str(R/'programs/pump-fees/Cargo.toml'),'--program','pump_fees','--artifact-name','pump_fees_candidate.so','--tools-version','v1.44','--output',str(B),'--extra-input',str(R/'programs/pump-fees/README.md')]
env={**os.environ,'CARGO_HOME':str(CACHE),'CARGO_NET_OFFLINE':'true','PYTHONDONTWRITEBYTECODE':'1'}
save('build-launch.json',{'command':cmd,'cwd':str(R),'environment':{k:env[k]for k in ['CARGO_HOME','CARGO_NET_OFFLINE','PYTHONDONTWRITEBYTECODE']},'source_sha256':source,'runner_sha256':H(Path(__file__))})
# Explicit immutable inputs only; live orchestration logs are not compiler inputs.
pre={p.name:H(p)for p in W.iterdir()if p.is_file()and p.name not in ['main-prebuild-manifest-sha256.json','build.stdout','build.stderr','launcher.stdout','launcher.stderr']}
save('main-prebuild-manifest-sha256.json',pre)
with(W/'build.stdout').open('w')as out,(W/'build.stderr').open('w')as err:p=subprocess.run(cmd,cwd=R,env=env,stdout=out,stderr=err)
after={n:H(R/n)for n in source};da=deps();save('dependency-after.json',da)
tool_after={v['resolved_path']:H(Path(v['resolved_path']))for v in [*tools['compile_tools'].values(),tools['strip_tool'],tools['cli']]}
log=(B/'build.log').read_text()if(B/'build.log').exists()else'';warnings=[s for s in log.splitlines()if any(x in s.lower()for x in['stack offset','stack frame','stack size','stack overflow'])]
save('build-result.json',{'returncode':p.returncode,'source_before':source,'source_after':after,'source_unchanged':source==after,'tool_after':tool_after,'backend_stack_diagnostics':warnings})
assert p.returncode==0 and after==source and not warnings,'STOP: build/source/backend failure; no retry'
assert da==J(W/'dependency-before.json');assert all(H(W/n)==h for n,h in pre.items())
assert all(H(R/n)==h for n,h in helpers.items())
for v in [*tools['compile_tools'].values(),tools['strip_tool'],tools['cli']]:assert tool_after[v['resolved_path']]==v['sha256']
for n,h in tools['sdk_template_files'].items():assert H(B/'sdk'/n)==h
info=B/'target/.rustc_info.json';shutil.copyfile(info,W/'cargo-rustc-info.json');roots={s for v in J(info)['outputs'].values()for s in v.get('stdout','').splitlines()if s.startswith('/')and s.endswith('/rust')};assert len(roots)==1
compiler=Path(roots.pop());actual={}
for n,v in tools['compile_tools'].items():
 path=compiler.parent/n;assert H(path)==v['sha256'];actual[n]={'resolved_path':str(path.resolve()),'sha256':H(path)}
strip=B/'sdk/dependencies/platform-tools/llvm/bin/llvm-objcopy';assert H(strip)==tools['strip_tool']['sha256']and(B/'sdk/dependencies/platform-tools-v1.52.md').is_file()
c=B/'artifacts/pump_fees_candidate.so';sy=B/'target/sbf-solana-solana/release/pump_fees_candidate.so'
save('tool-phase-provenance.json',{'compile':actual,'observed_sysroot':str(compiler),'strip':{'path':str(strip.resolve()),'sha256':H(strip)},'candidate_sha256':H(c),'symbols_sha256':H(sy),'sdk_files':tools['sdk_template_files']})
identity={'whole_file_equal':c.read_bytes()==(S/'candidate.so').read_bytes(),'whole_symbols_equal':sy.read_bytes()==(S/'symbols.so').read_bytes(),'main_binary_sha256':H(c),'scratch_binary_sha256':H(S/'candidate.so'),'main_symbols_sha256':H(sy),'scratch_symbols_sha256':H(S/'symbols.so'),'main_source_sha256':source,'scratch_source_sha256':J(S/'inputs/corrected-source-sha256.json'),'main_build_report_sha256':H(B/'build-comparison.json'),'scratch_build_report_sha256':H(S/'build-01/build-comparison.json'),'bytes':c.stat().st_size,'main_runtime_replayed':False}
save('main-scratch-identity.json',identity)
assert identity['whole_file_equal']and identity['whole_symbols_equal'],'STOP: exact identity failed; no variants'
shutil.copyfile(c,W/'pump_fees_candidate.so');shutil.copyfile(sy,W/'symbols.so');print(json.dumps(identity,sort_keys=True))
