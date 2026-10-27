from pathlib import Path
import json,hashlib,os,subprocess,sys,time,gzip,shutil,fcntl
W=Path(__file__).resolve().parent
lock=(W/'root-build.lock').open('a')
fcntl.flock(lock,fcntl.LOCK_EX)
R=W.parents[1];label=sys.argv[1];src=W/(sys.argv[2] if len(sys.argv)>2 else label)/'programs/mayhem';out=W/(label+'-build');out.mkdir(exist_ok=False)
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
inputs={str(p.relative_to(src)):sha(p)for p in src.rglob('*')if p.is_file()};assert len(inputs) in [15,16]
P=R/'repro/mayhem/global-params-layout-recovery';provenance=json.loads(gzip.decompress((P/'builds/provenance-before.json.gz').read_bytes()))
for name,h in provenance['checked_executables'].items():assert sha(Path(name))==h,name
sdk=Path('/Users/shawwalters/.cache/solana/v1.54/platform-tools');env=os.environ.copy();extra={'AR':str(sdk/'llvm/bin/llvm-ar'),'CC':str(sdk/'llvm/bin/clang'),'RUSTC':str(sdk/'rust/bin/rustc'),'RUSTDOC':str(sdk/'rust/bin/rustdoc'),'OBJCOPY':str(sdk/'llvm/bin/llvm-objcopy'),'OBJDUMP':str(sdk/'llvm/bin/llvm-objdump'),'CARGO_HOME':str(W/'cargo-home'),'CARGO_TARGET_DIR':str(W/'target'),'RUSTUP_HOME':str(W/'rustup'),'CARGO_NET_OFFLINE':'true','CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS':'-Zremap-cwd-prefix='};env.update(extra)
cmd=[str(sdk/'rust/bin/cargo'),'rustc','--manifest-path',str(src/'Cargo.toml'),'--release','--target','sbpf-solana-solana','--locked','--offline','--verbose','--','--remap-path-prefix=src/=programs/mayhem-program/src/']
if len(sys.argv)>3:cmd+=json.loads(sys.argv[3])
(out/'launch.json').write_text(json.dumps({'command':cmd,'cwd':str(src.parent.parent),'environment_overrides':extra,'source_inputs':inputs,'checked_executables':provenance['checked_executables'],'scope':'private copied dependency target; not an all-dependency clean build'},indent=2)+'\n')
start=time.monotonic()
with(out/'stdout').open('wb')as stdout,(out/'stderr').open('wb')as stderr:
 clean=[str(sdk/'rust/bin/cargo'),'clean','--manifest-path',str(src/'Cargo.toml'),'--release','--target','sbpf-solana-solana','-p','mayhem-recovered']
 subprocess.run(clean,cwd=src.parent.parent,env=env,stdout=stdout,stderr=stderr,check=True)
 r=subprocess.run(cmd,cwd=src.parent.parent,env=env,stdout=stdout,stderr=stderr)
result={'returncode':r.returncode,'elapsed_seconds':time.monotonic()-start,'source_unchanged':inputs=={str(p.relative_to(src)):sha(p)for p in src.rglob('*')if p.is_file()},'stdout_sha256':sha(out/'stdout'),'stderr_sha256':sha(out/'stderr'),'root_invocations':(out/'stderr').read_text().count('--crate-name mayhem_recovered ')}
if r.returncode==0:
 shutil.copyfile(W/'target/sbpf-solana-solana/release/mayhem_recovered.so',out/'symbols.so')
 subprocess.run(['/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy','--strip-all',str(out/'symbols.so'),str(out/'candidate.so')],check=True)
 result.update(candidate_sha256=sha(out/'candidate.so'),symbols_sha256=sha(out/'symbols.so'),candidate_bytes=(out/'candidate.so').stat().st_size)
for name,h in provenance['checked_executables'].items():assert sha(Path(name))==h,name
(out/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2));raise SystemExit(r.returncode)
