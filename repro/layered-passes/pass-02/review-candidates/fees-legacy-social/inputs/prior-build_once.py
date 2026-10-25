from pathlib import Path
import hashlib,json,os,shutil,subprocess,sys
W=Path(__file__).resolve().parent;R=W/'source';A=W/'inputs';B=W/'build-01'
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda p:json.loads(p.read_text())
def save(n,v):(W/n).write_text(json.dumps(v,indent=2)+'\n')
assert not B.exists() and J(W/'preflight.json')['passed']
base=J(A/'corrected-source-sha256.json');tools=J(A/'tools-before.json')
assert all(H(R/n)==h for n,h in base.items())
for v in [*tools['compile_tools'].values(),tools['strip_tool'],tools['cli']]:assert H(Path(v['resolved_path']))==v['sha256']
assert Path('/Users/shawwalters/.cache/solana/v2.3.2/criterion').is_dir()
original=Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/evidence/original/pump_fees/deployed.so')
dest=R/'evidence/original/pump_fees/deployed.so';dest.parent.mkdir(parents=True);shutil.copyfile(original,dest)
command=[sys.executable,'-B',str(R/'scripts/build_partial_candidate.py'),'--manifest',str(R/'programs/pump-fees/Cargo.toml'),'--program','pump_fees','--artifact-name','pump_fees_candidate.so','--tools-version','v1.44','--output',str(B),'--extra-input',str(R/'programs/pump-fees/README.md')]
env={**os.environ,'CARGO_HOME':str(W/'cargo-home'),'CARGO_NET_OFFLINE':'true','PYTHONDONTWRITEBYTECODE':'1'}
save('build-launch.json',{'command':command,'cwd':str(R),'environment':{k:env[k] for k in ['CARGO_HOME','CARGO_NET_OFFLINE','PYTHONDONTWRITEBYTECODE']},'source_sha256':base,'runner_sha256':H(Path(__file__)),'original_sha256':H(dest)})
with (W/'build.stdout').open('w') as out,(W/'build.stderr').open('w') as err:p=subprocess.run(command,cwd=R,env=env,stdout=out,stderr=err)
after={n:H(R/n) for n in base};tool_after={v['resolved_path']:H(Path(v['resolved_path'])) for v in [*tools['compile_tools'].values(),tools['strip_tool'],tools['cli']]}
log=(B/'build.log').read_text() if (B/'build.log').exists() else ''
warnings=[s for s in log.splitlines() if any(x in s.lower() for x in ['stack offset','stack frame','stack size','stack overflow'])]
save('build-result.json',{'returncode':p.returncode,'source_before':base,'source_after':after,'source_unchanged':base==after,'tool_after':tool_after,'backend_stack_diagnostics':warnings})
assert p.returncode==0 and base==after and not warnings,'STOP: build failure or stack diagnostics; no retry'
for v in [*tools['compile_tools'].values(),tools['strip_tool'],tools['cli']]:assert tool_after[v['resolved_path']]==v['sha256']
for n,h in tools['sdk_template_files'].items():assert H(B/'sdk'/n)==h
info=B/'target/.rustc_info.json';shutil.copyfile(info,W/'cargo-rustc-info.json')
roots={s for v in J(info)['outputs'].values() for s in v.get('stdout','').splitlines() if s.startswith('/') and s.endswith('/rust')};assert len(roots)==1
compiler=Path(roots.pop());actual={}
for n,v in tools['compile_tools'].items():
 path=compiler.parent/n;assert H(path)==v['sha256'];actual[n]={'resolved_path':str(path.resolve()),'sha256':H(path)}
strip=B/'sdk/dependencies/platform-tools/llvm/bin/llvm-objcopy';assert H(strip)==tools['strip_tool']['sha256'] and (B/'sdk/dependencies/platform-tools-v1.52.md').is_file()
candidate=B/'artifacts/pump_fees_candidate.so';symbols=B/'target/sbf-solana-solana/release/pump_fees_candidate.so'
for src,name in [(candidate,'candidate.so'),(symbols,'symbols.so')]:assert src.read_bytes()[:4]==b'\x7fELF';shutil.copyfile(src,W/name)
save('tool-phase-provenance.json',{'compile':actual,'observed_sysroot':str(compiler),'strip':{'path':str(strip.resolve()),'sha256':H(strip)},'candidate_sha256':H(candidate),'symbols_sha256':H(symbols),'sdk_files':tools['sdk_template_files']})
print('Build passed; runtime remains gated on fresh targeted static checks')
