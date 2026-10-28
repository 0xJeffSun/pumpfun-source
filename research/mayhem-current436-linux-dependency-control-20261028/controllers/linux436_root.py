"""Bounded Linux root-only provenance control; all source/cache inputs read only."""
from pathlib import Path
import hashlib,json,os,shutil,subprocess,time

W=Path(__file__).resolve().parents[1]
T=Path('/home/shawwalters.guest/amm436-linux/sdk')
B=W/'qualified-amm436-derived-event-origin-01-build'
O=W/'qualified-amm436-linux-root-01-build';O.mkdir()
R=json.loads((B/'launch.json').read_bytes()); S=Path(R['cwd'])
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
inventory=lambda p:{str(f.relative_to(p)):sha(f)for f in p.rglob('*')if f.is_file()}
inputs=inventory(S)
assert inputs==R['source_inputs']
for n in ['default.ld','ordered.ld']:shutil.copyfile(B/n,O/n)
linker=(B/'linker.py').read_text().replace(str(B),str(O)).replace(str(W/'layout-lane-linux-target2-sysroot/lib/rustlib/aarch64-apple-darwin/bin/rust-lld'),str(T/'rust/lib/rustlib/x86_64-unknown-linux-gnu/bin/rust-lld'))
(O/'linker.py').write_text(linker);(O/'linker.py').chmod(0o755)
cmd=R['command'].copy();cmd[0]=str(T/'rust/bin/rustc')
cmd[cmd.index('--out-dir')+1]=str(O/'root-out');(O/'root-out').mkdir()
cmd=[a.replace(str(B),str(O))for a in cmd]
tools={str(p):sha(p)for p in [T/'rust/bin/rustc',T/'rust/lib/rustlib/x86_64-unknown-linux-gnu/bin/rust-lld',T/'llvm/bin/llvm-objcopy']}
deps={}
for n,a in enumerate(cmd):
 if a.startswith('dependency='):
  for p in Path(a.split('=',1)[1]).glob('*'):
   if p.suffix in ('.rlib','.so','.dylib'):deps[str(p)]=sha(p)
env=os.environ.copy();env.update(R['environment']);env.update(RUSTC=str(T/'rust/bin/rustc'),RUSTDOC=str(T/'rust/bin/rustdoc'),RUSTC_BOOTSTRAP='1')
launch=dict(command=cmd,cwd=str(S),environment=R['environment'],source_inputs=inputs,tools=tools,dependency_inputs=deps,controller_sha256=sha(Path(__file__)),scope='Linux root compiler with exact Darwin-built target dependencies and ordered linker; this is a compatibility probe, not historical attribution')
(O/'launch.json').write_text(json.dumps(launch,indent=2)+'\n')
start=time.monotonic()
with(O/'stdout').open('wb')as so,(O/'stderr').open('wb')as se:p=subprocess.run(cmd,cwd=S,env=env,stdout=so,stderr=se)
result=dict(returncode=p.returncode,seconds=time.monotonic()-start,source_unchanged=inputs==inventory(S),tools_unchanged=all(sha(Path(p))==h for p,h in tools.items()),dependencies_unchanged=all(sha(Path(p))==h for p,h in deps.items()))
if p.returncode==0:
 shutil.copyfile(O/'root-out/mayhem_recovered.so',O/'symbols.so');shutil.copyfile(O/'root-out/mayhem_recovered.ll',O/'module.ll')
 subprocess.run([str(T/'llvm/bin/llvm-objcopy'),'--strip-all',str(O/'symbols.so'),str(O/'candidate.so')],check=True)
 result.update(candidate_sha256=sha(O/'candidate.so'),symbols_sha256=sha(O/'symbols.so'))
(O/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
