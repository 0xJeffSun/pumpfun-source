from pathlib import Path
import hashlib,json,os,shlex,shutil,subprocess,sys,time
W=Path(__file__).resolve().parents[1];base=Path('/home/shawwalters.guest/amm436-linux/full436-01');T=base.parent/'sdk'
label=sys.argv[1];assert Path(label).name==label
S=Path(sys.argv[2]).resolve() if len(sys.argv)>2 else base/'source'; O=W/(label+'-build');O.mkdir();(O/'root-out').mkdir()
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
inv=lambda p:{str(f.relative_to(p)):sha(f)for f in p.rglob('*')if f.is_file()}
inputs=inv(S);assert len(inputs)==67
lines=[l.strip() for l in (base/'target.stderr').read_text().splitlines() if l.strip().startswith('Running `') and '--crate-name mayhem_recovered ' in l];assert len(lines)==1
cmd=shlex.split(lines[0][len('Running `'):-1]);assert cmd.pop(0)==str(base/'wrapper.py');assert cmd[0]==str(T/'rust/bin/rustc')
cmd[cmd.index('--out-dir')+1]=str(O/'root-out')
for n in ['default.ld','ordered.ld']:shutil.copyfile(base/n,O/n)
(O/'linker.py').write_text((base/'linker.py').read_text());(O/'linker.py').chmod(0o755)
for i,a in enumerate(cmd):
 if a.startswith('-Clinker='):cmd[i]='-Clinker='+str(O/'linker.py')
 if a.startswith('-Clink-arg=-Map='):cmd[i]='-Clink-arg=-Map='+str(O/'link.map')
cmd += ['-L','dependency='+str(base/'macro-target/release/deps')]
env=os.environ.copy();env.update(RUSTC_BOOTSTRAP='1',RUSTC=str(T/'rust/bin/rustc'),RUSTDOC=str(T/'rust/bin/rustdoc'),CARGO_MANIFEST_DIR=str(S))
deps={str(p):sha(p) for d in [base/'target/sbpf-solana-solana/release/deps',base/'target/release/deps',base/'macro-target/release/deps'] for p in d.iterdir() if p.is_file() and p.suffix in ('.rlib','.rmeta','.so')}
tools={str(T/p):sha(T/p) for p in ['rust/bin/rustc','llvm/bin/llvm-objcopy','rust/lib/rustlib/x86_64-unknown-linux-gnu/bin/rust-lld']}
(O/'launch.json').write_text(json.dumps(dict(command=cmd,cwd=str(S),environment={'RUSTC_BOOTSTRAP':'1','CARGO_MANIFEST_DIR':str(S)},source_inputs=inputs,dependency_inputs=deps,tools=tools,controller_sha256=sha(Path(__file__)),scope='Linux root rebuild with freshly compiled Linux host and target dependencies; no runtime claim'),indent=2)+'\n')
start=time.monotonic()
with(O/'stdout').open('wb')as so,(O/'stderr').open('wb')as se:p=subprocess.run(cmd,cwd=S,env=env,stdout=so,stderr=se)
result=dict(returncode=p.returncode,seconds=time.monotonic()-start,source_unchanged=inputs==inv(S),dependencies_unchanged=all(sha(Path(p))==h for p,h in deps.items()),tools_unchanged=all(sha(Path(p))==h for p,h in tools.items()))
if p.returncode==0:
 shutil.copyfile(O/'root-out/mayhem_recovered.so',O/'symbols.so')
 subprocess.run([str(T/'llvm/bin/llvm-objcopy'),'--strip-all',str(O/'symbols.so'),str(O/'candidate.so')],check=True)
 result.update(candidate_sha256=sha(O/'candidate.so'),symbols_sha256=sha(O/'symbols.so'))
(O/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2));assert p.returncode==0
