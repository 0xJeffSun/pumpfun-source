from pathlib import Path
import hashlib,json,os,shutil,subprocess,time
W=Path(__file__).resolve().parents[1]
O=Path('/home/shawwalters.guest/amm436-linux/full436-01');O.mkdir(exist_ok=True)
T=O.parent/'sdk';H=O/'historical-host';S=O/'source';B=W/'qualified-amm436-derived-event-origin-01-build'
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
def inv(p):return {str(f.relative_to(p)):sha(f) for f in p.rglob('*') if f.is_file()}
def write(p,v):p.write_text(json.dumps(v,indent=2)+'\n')
record=json.loads((B/'launch.json').read_bytes());src=Path(record['cwd']);assert inv(src)==record['source_inputs'];shutil.copytree(src,S,dirs_exist_ok=True)
shutil.copytree(W/'historical-native-macro-a/source',H,dirs_exist_ok=True)
# Exact existing macro sources; only output/cache paths change.
common=os.environ.copy();common.update(RUSTC=str(T/'rust/bin/rustc'),RUSTDOC=str(T/'rust/bin/rustdoc'),CARGO_HOME=str(W/'cargo-home'),CARGO_NET_OFFLINE='true',RUSTC_BOOTSTRAP='1',CARGO_TARGET_X86_64_UNKNOWN_LINUX_GNU_LINKER='x86_64-linux-gnu-gcc',CC=str(T/'llvm/bin/clang'),AR=str(T/'llvm/bin/llvm-ar'))
cargo=str(T/'rust/bin/cargo'); macroenv=common.copy();macroenv.update(CARGO_TARGET_DIR=str(O/'macro-target'),RUSTFLAGS='')
tools={str(T/p):sha(T/p) for p in ['rust/bin/rustc','rust/bin/cargo','rust/bin/rustdoc','rust/lib/rustlib/x86_64-unknown-linux-gnu/bin/rust-lld','llvm/bin/clang','llvm/bin/llvm-ar','llvm/bin/llvm-objcopy']}
def run(name,cmd,cwd,env):
 write(O/(name+'-launch.json'),dict(command=cmd,cwd=str(cwd),environment={k:v for k,v in env.items() if k in ['RUSTC','RUSTDOC','CARGO_HOME','CARGO_TARGET_DIR','CARGO_NET_OFFLINE','RUSTC_BOOTSTRAP','CC','AR','RUSTFLAGS','RUSTC_WRAPPER','CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS']}))
 start=time.monotonic()
 with (O/(name+'.stdout')).open('wb') as so,(O/(name+'.stderr')).open('wb')as se:p=subprocess.run(cmd,cwd=cwd,env=env,stdout=so,stderr=se)
 write(O/(name+'-result.json'),dict(returncode=p.returncode,seconds=time.monotonic()-start))
 print(name,p.returncode,flush=True);p.check_returncode()
write(O/'inputs.json',dict(source=inv(S),macro_source=inv(H),tools=tools,controller_sha256=sha(Path(__file__))))
run('macro2',[cargo,'build','--manifest-path',str(H/'Cargo.toml'),'--release','--locked','--offline','--verbose','-p','anchor-attribute-program','--jobs','2'],H,macroenv)
macro=O/'macro-target/release/libanchor_attribute_program.so';assert macro.is_file()
wrapper=O/'wrapper.py';wrapper.write_text('#!/usr/bin/env python3\nimport os,sys\na=sys.argv[2:]\nif "--crate-name" in a and a[a.index("--crate-name")+1]=="curve_accounts":a += ["--extern",'+repr('historical_anchor_program='+str(macro))+',"-L",'+repr('dependency='+str(O/'macro-target/release/deps'))+']\nos.execv(sys.argv[1],[sys.argv[1],*a])\n');wrapper.chmod(0o755)
for n in ['default.ld','ordered.ld']:shutil.copyfile(B/n,O/n)
linker=(B/'linker.py').read_text().replace(str(B),str(O)).replace(str(W/'layout-lane-linux-target2-sysroot/lib/rustlib/aarch64-apple-darwin/bin/rust-lld'),str(T/'rust/lib/rustlib/x86_64-unknown-linux-gnu/bin/rust-lld'))
(O/'linker.py').write_text(linker);(O/'linker.py').chmod(0o755)
env=common.copy();env.update(CARGO_TARGET_DIR=str(O/'target'),RUSTC_WRAPPER=str(wrapper),CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS='-Zremap-cwd-prefix=')
run('target',[cargo,'rustc','--manifest-path',str(S/'Cargo.toml'),'--release','--target','sbpf-solana-solana','--locked','--offline','--verbose','--jobs','2','--','--remap-path-prefix=src/=programs/mayhem-program/src/','--remap-path-prefix=src/account_wrapper.rs=src/account_wrapper.rs','-Clinker='+str(O/'linker.py'),'-Clink-arg=-Map='+str(O/'link.map'),'--emit=link,llvm-ir'],S,env)
shutil.copyfile(O/'target/sbpf-solana-solana/release/mayhem_recovered.so',O/'symbols.so')
subprocess.run([str(T/'llvm/bin/llvm-objcopy'),'--strip-all',str(O/'symbols.so'),str(O/'candidate.so')],check=True)
write(O/'result.json',dict(candidate_sha256=sha(O/'candidate.so'),symbols_sha256=sha(O/'symbols.so'),source_unchanged=inv(S)==record['source_inputs'],tools_unchanged=all(sha(Path(p))==h for p,h in tools.items()),scope='Actual fresh Linux host and target dependencies; no compiler-only attribution; no runtime qualification'))
print((O/'result.json').read_text(),flush=True)
