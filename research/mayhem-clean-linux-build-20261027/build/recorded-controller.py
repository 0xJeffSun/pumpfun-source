from pathlib import Path
import hashlib,json,os,subprocess,shutil,time
W=Path(__file__).resolve().parent
S=W/'source';O=W/'build';O.mkdir(exist_ok=False)
T=Path('/workspace/toolchains/v1.54')
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
files=lambda:{str(p.relative_to(S)):sha(p) for p in S.rglob('*') if p.is_file()}
source=files()
tools={str(p):sha(p) for p in [T/'rust/bin/rustc',T/'rust/bin/cargo',T/'llvm/bin/clang',T/'llvm/bin/llvm-ar',T/'llvm/bin/llvm-objcopy',T/'rust/lib/rustlib/x86_64-unknown-linux-gnu/bin/rust-lld']}
env=os.environ.copy();overrides={'RUSTC_BOOTSTRAP':'1','CARGO_HOME':str(W/'cargo-home'),'RUSTC':str(T/'rust/bin/rustc'),'RUSTDOC':str(T/'rust/bin/rustdoc'),'CARGO_TARGET_DIR':str(W/'target'),'CC':str(T/'llvm/bin/clang'),'AR':str(T/'llvm/bin/llvm-ar'),'CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS':'-Zremap-cwd-prefix='}
env.update(overrides)
cmd=[str(T/'rust/bin/cargo'),'rustc','--manifest-path',str(S/'Cargo.toml'),'--release','--target','sbpf-solana-solana','--locked','--offline','--verbose','--jobs','4','--','--remap-path-prefix=src/=programs/mayhem-program/src/','--remap-path-prefix=src/account_wrapper.rs=src/account_wrapper.rs']
(O/'launch.json').write_text(json.dumps({'command':cmd,'cwd':str(S),'environment_overrides':overrides,'tools':tools,'source_inputs':source},indent=2)+'\n')
start=time.monotonic()
with (O/'stdout').open('wb') as out,(O/'stderr').open('wb') as err:p=subprocess.run(cmd,cwd=S,env=env,stdout=out,stderr=err)
r={'returncode':p.returncode,'seconds':time.monotonic()-start,'source_unchanged':files()==source,'tools_unchanged':all(sha(Path(p))==h for p,h in tools.items())}
if p.returncode==0:
 shutil.copyfile(W/'target/sbpf-solana-solana/release/mayhem_recovered.so',O/'symbols.so')
 subprocess.run([str(T/'llvm/bin/llvm-objcopy'),'--strip-all',str(O/'symbols.so'),str(O/'candidate.so')],check=True)
 r.update(symbols_sha256=sha(O/'symbols.so'),candidate_sha256=sha(O/'candidate.so'))
(O/'result.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r,indent=2))
