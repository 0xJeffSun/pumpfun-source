from pathlib import Path
import hashlib,json,subprocess,sys,time
root=Path(__file__).resolve().parent
label=sys.argv[1]
sha=lambda b:hashlib.sha256(b).hexdigest()
inputs=lambda:{str(p.relative_to(root/label)):sha(p.read_bytes()) for p in sorted((root/label).rglob('*')) if p.is_file()}
env={'PATH':'/work/sdk/rust/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin','RUSTC':'/work/sdk/rust/bin/rustc','CC':'/work/sdk/llvm/bin/clang','AR':'/work/sdk/llvm/bin/llvm-ar','CARGO_HOME':'/cargo','CARGO_TARGET_DIR':'/work/parallel-admin-fast-target','CARGO_BUILD_JOBS':'1','CARGO_NET_OFFLINE':'true','RUSTFLAGS':'-Zremap-cwd-prefix='}
cmd=['podman','exec']
for k,v in env.items():cmd+=['-e',k+'='+v]
cmd+=['-w','/work/next645/'+label,'codex-fees-next-d99d','/work/sdk/rust/bin/cargo','rustc','--verbose','--manifest-path','/work/next645/'+label+'/programs/pump-fees/Cargo.toml','--release','--target','sbpf-solana-solana','--locked','--offline','--jobs','1','--lib','--',f'--remap-path-prefix=/work/next645/{label}/programs/pump-fees/src/../../../pump-fees-math/=pump-fees-math/',f'--remap-path-prefix=/work/next645/{label}/pump-fees-math/=pump-fees-math/','--remap-path-prefix=programs/pump-fees/src/../../../pump-fees-math/=pump-fees-math/']
cmd += ['-C','link-arg=-Map=/work/next645/'+label+'.map','-C','linker=/work/next645/'+label+'/linker.sh']
vendor=root.parent/'next637/vendor/used-public'
dep_inputs=lambda:{str(p.relative_to(vendor)):sha(p.read_bytes()) for p in sorted(vendor.rglob('*')) if p.is_file()}
dep_initial=dep_inputs()
initial=inputs();(root/(label+'-launch.json')).write_text(json.dumps({'command':cmd,'inputs':initial,'vendor_inputs':dep_initial},indent=2)+'\n');start=time.monotonic()
with (root/(label+'-build.log')).open('wb') as log:r=subprocess.run(cmd,stdout=log,stderr=subprocess.STDOUT)
result={'exit_code':r.returncode,'elapsed_seconds':time.monotonic()-start,'source_unchanged':inputs()==initial,'vendor_unchanged':dep_inputs()==dep_initial,'log_sha256':sha((root/(label+'-build.log')).read_bytes())}
if r.returncode==0:
 raw=(root.parent/'parallel-admin-fast-target/sbpf-solana-solana/release/pump_fees_candidate.so').read_bytes();(root/(label+'-symbols.so')).write_bytes(raw)
 strip=['/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy','--strip-all',str(root/(label+'-symbols.so')),str(root/(label+'-candidate.so'))];subprocess.run(strip,check=True)
 result.update(symbols_sha256=sha(raw),candidate_sha256=sha((root/(label+'-candidate.so')).read_bytes()),strip_command=strip)
(root/(label+'-result.json')).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result));sys.exit(r.returncode)
