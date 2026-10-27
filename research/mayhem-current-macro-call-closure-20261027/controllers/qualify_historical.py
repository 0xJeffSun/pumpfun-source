from pathlib import Path
import hashlib,json,os,shutil,subprocess,time
W=Path(__file__).resolve().parents[1];D=W/'layout-allocator-current-historical-04';P=W/'layout-allocator-historical-qualified-04';S=D/'programs/mayhem';assert not P.exists();P.mkdir()
for name in ['linker.py','default.ld','ordered.ld']:shutil.copyfile(W/'qualified-current-quote-pair-a'/name,P/name)
(P/'linker.py').chmod(0o755)
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
build=json.loads((D/'builds.json').read_text())[-1]
cmd=list(build['command']);out=P/'root-out';out.mkdir();cmd[cmd.index('--out-dir')+1]=str(out)
cmd=[a for a in cmd if not a.startswith('link-arg=-Map=')]
# Remove the now-unpaired -C introduced by removing its argument.
assert cmd[-1]=='-C';cmd.pop();cmd+=['-C','linker='+str(P/'linker.py'),'-C','link-arg=-Map='+str(P/'link.map')]
env=os.environ.copy();env.update(build['target_build_environment']);env.update(build['environment_overrides']);receipt={'command':cmd,'cwd':str(S),'env_overrides':{**build['target_build_environment'],**build['environment_overrides']},'source_inputs':build['source_inputs'],'linker_sha256':sha(P/'linker.py'),'ordered_script_sha256':sha(P/'ordered.ld'),'default_script_sha256':sha(P/'default.ld'),'source_parent':str(D),'scope':'Fresh qualified root over freshly compiled historical-macro curve and reused pinned dependency cache; no target execution'}
(P/'launch.json').write_text(json.dumps(receipt,indent=2)+'\n');start=time.monotonic()
with(P/'stdout').open('wb')as so,(P/'stderr').open('wb')as se:r=subprocess.run(cmd,cwd=S,env=env,stdout=so,stderr=se)
result={'returncode':r.returncode,'seconds':time.monotonic()-start};(P/'result.json').write_text(json.dumps(result,indent=2)+'\n');assert r.returncode==0
shutil.copyfile(out/'mayhem_recovered.so',P/'symbols.so');strip=Path('/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy');subprocess.run([str(strip),'--strip-all',str(P/'symbols.so'),str(P/'candidate.so')],check=True)
result.update(candidate_sha256=sha(P/'candidate.so'),symbols_sha256=sha(P/'symbols.so'),strip_sha256=sha(strip));(P/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
