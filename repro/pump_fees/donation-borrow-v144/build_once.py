"""One authorized main build, isolated target/SDK/rustup; no generated-key reads."""
from pathlib import Path
import hashlib, json, os, shutil, subprocess, sys, tarfile
W=Path(__file__).resolve().parent; R=W.parents[1]; S=R/'work/fees-donation-borrow-build/handoff'; B=W/'build-01'
H=lambda b:hashlib.sha256(b).hexdigest(); sha=lambda p:H(p.read_bytes()); J=lambda p:json.loads(p.read_text())
def save(n,v):(W/n).write_text(json.dumps(v,indent=2)+'\n')
assert not B.exists() and not (W/'prebuild-manifest-sha256.json').exists()
assert sha(S/'manifest-sha256.json')=='3f6b1a631beb97ded199fa82dae1b25718da5cce9a553defb6002a79b1bcd6c5'
assert all(sha(S/n)==h for n,h in J(S/'manifest-sha256.json').items())
tools=J(S/'prebuild/tools-recheck.json'); prior=J(S/'prebuild/build-plan.json')
for n,h in tools['helper_files'].items():assert sha(R/n)==h,n
for v in [*tools['compile_tools'].values(),tools['strip_tool'],tools['cli']]:assert sha(Path(v['resolved_path']))==v['sha256']
sdk=Path(shutil.which('cargo-build-sbf')).resolve().parent/'sdk/sbf'
for n,h in tools['sdk_template_files'].items():assert sha(sdk/n)==h,n
sys.path.insert(0,str(R/'scripts')); from build_source_manifest import source_manifest
source=lambda:source_manifest(R/'programs/pump-fees',R,R,[R/'programs/pump-fees/README.md'],cwd=R)
before=source(); base=J(W/'baseline-source-sha256.json'); scratch=J(S/'source-sha256.json')
assert len(before)==26 and set(before)==set(base)==set(scratch)
assert set(n for n in before if before[n]!=base[n])=={'programs/pump-fees/src/donation.rs','programs/pump-fees/README.md'}
assert [n for n in before if before[n]!=scratch[n]]==['programs/pump-fees/README.md']
save('source-sha256.json',before);save('build-helper-sha256.json',tools['helper_files']);save('tools-before.json',tools)
def snapshot(name,root,mapping):
 with tarfile.open(W/name,'w:gz') as t:
  for n,h in sorted(mapping.items()):
   p=root/n;assert not p.is_symlink() and not p.name.endswith('-keypair.json') and sha(p)==h;t.add(p,arcname=n,recursive=False)
snapshot('source-snapshot.tar.gz',R,before);snapshot('build-helper-snapshot.tar.gz',R,tools['helper_files'])
command=[prior['command'][0],str(R/'scripts/build_partial_candidate.py'),'--manifest',str(R/'programs/pump-fees/Cargo.toml'),'--program','pump_fees','--artifact-name','pump_fees_candidate.so','--tools-version','v1.44','--output',str(B),'--extra-input',str(R/'programs/pump-fees/README.md')]
save('build-launch.json',{'command':command,'cwd':str(R),'environment':prior['environment'],'source_sha256':before,'scratch_manifest_sha256':sha(S/'manifest-sha256.json'),'runner_sha256':sha(Path(__file__)),'tools_before_sha256':sha(W/'tools-before.json'),'scope':'Exactly one clean main source build; only final README differs from reviewed scratch source. Require complete candidate AND symbols equality before receipt reuse.'})
pre={p.relative_to(W).as_posix():sha(p) for p in W.rglob('*') if p.is_file()}
save('prebuild-manifest-sha256.json',pre)
p=subprocess.run(command,cwd=R,env={**os.environ,**prior['environment']},capture_output=True,text=True)
(W/'build.stdout').write_text(p.stdout);(W/'build.stderr').write_text(p.stderr)
after=source();save('build-result.json',{'returncode':p.returncode,'source_after':after,'source_unchanged':before==after})
assert p.returncode==0 and before==after
report=J(B/'build-comparison.json');assert report['source_sha256']==before
info=B/'target/.rustc_info.json';shutil.copyfile(info,W/'cargo-rustc-info.json')
roots={s for v in J(info)['outputs'].values() for s in v.get('stdout','').splitlines() if s.startswith('/') and s.endswith('/rust')};assert len(roots)==1
compiler=Path(roots.pop());actual={}
for n,v in tools['compile_tools'].items():
 path=compiler.parent/n;assert sha(path)==v['sha256'];actual[n]={'resolved_path':str(path.resolve()),'sha256':sha(path)}
strip=B/'sdk/dependencies/platform-tools/llvm/bin/llvm-objcopy';assert sha(strip)==tools['strip_tool']['sha256'] and (B/'sdk/dependencies/platform-tools-v1.52.md').is_file()
for v in [*tools['compile_tools'].values(),tools['strip_tool'],tools['cli']]:assert sha(Path(v['resolved_path']))==v['sha256']
for n,h in tools['helper_files'].items():assert sha(R/n)==h
for n,h in tools['sdk_template_files'].items():assert sha(B/'sdk'/n)==h
candidate=B/'artifacts/pump_fees_candidate.so';symbols=B/'target/sbf-solana-solana/release/pump_fees_candidate.so'
shutil.copyfile(candidate,W/'candidate.so');shutil.copyfile(symbols,W/'symbols.so')
save('tool-phase-provenance.json',{'compile':{'requested_tools_version':'v1.44','observed_sysroot':str(compiler),'tool_files':actual,'tool_hashes_before':{n:v['sha256'] for n,v in tools['compile_tools'].items()},'tool_hashes_after':{n:v['sha256'] for n,v in actual.items()},'cargo_rustc_info_sha256':sha(info),'unstripped_sha256':sha(symbols)},'strip':{'sdk_marker':'platform-tools-v1.52.md','resolved_path':str(strip.resolve()),'file_sha256_before':tools['strip_tool']['sha256'],'file_sha256_after':sha(strip),'candidate_sha256':sha(candidate)},'cli':tools['cli'],'helper_files':tools['helper_files'],'sdk_template_files':tools['sdk_template_files'],'excluded_generated_artifact_paths':[str(f.relative_to(B)) for f in (B/'artifacts').iterdir() if f.name.endswith('-keypair.json')],'excluded_policy':'Names only; generated keypair contents are never read/hash-opened/copied.'})
equal=candidate.read_bytes()==(S/'candidate.so').read_bytes();equal_symbols=symbols.read_bytes()==(S/'symbols.so').read_bytes()
save('main-scratch-identity.json',{'whole_file_equal':equal,'whole_symbols_equal':equal_symbols,'bytes':candidate.stat().st_size,'symbols_bytes':symbols.stat().st_size,'main_binary_sha256':sha(candidate),'scratch_binary_sha256':sha(S/'candidate.so'),'main_symbols_sha256':sha(symbols),'scratch_symbols_sha256':sha(S/'symbols.so'),'main_build_report_sha256':sha(B/'build-comparison.json'),'scratch_build_report_sha256':sha(S/'build-01/build-comparison.json'),'main_source_sha256':before,'scratch_source_sha256':scratch,'main_runtime_replayed':False})
assert equal and equal_symbols,'STOP: main executable identity differs; no receipt reuse or variants authorized'
print(json.dumps({'main_candidate_sha256':sha(candidate),'whole_file_equal':equal,'whole_symbols_equal':equal_symbols,'source_inputs':26,'main_build_attempts':1},indent=2))
