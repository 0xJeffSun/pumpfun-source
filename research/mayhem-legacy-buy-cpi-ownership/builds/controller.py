from pathlib import Path
import fcntl,hashlib,json,os,subprocess,sys,time

W=Path(__file__).resolve().parent
label,source_label=sys.argv[1:]
assert label.startswith('layout-') and Path(label).name==label
assert Path(source_label).name==source_label and source_label not in ['.','..']
sdk=W/'layout-lane-linux-target2-sysroot'
target=Path(os.environ.get('MAYHEM_LINUX_TARGET',str(W/'parallel-targets/layout-linux-target2'))).resolve()
target.mkdir(parents=True,exist_ok=True)
lock=(target.parent/(target.name+'.lock')).open('a')
fcntl.flock(lock,fcntl.LOCK_EX)
source=W/source_label
src=source/'programs/mayhem'
output=W/(label+'-build');output.mkdir()
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
inventory=lambda p:{str(f.relative_to(p)):sha(f)for f in p.rglob('*')if f.is_file()}
target_inputs=json.loads((W/'layout-lane-linux-target2-inputs.json').read_bytes())
assert target_inputs['archive_sha256']=='fcc41631c7f77561bf5412218bf297501dccf0305ea280f338f0ace2aab9f31e'
for path,digest in target_inputs['files'].items():assert sha(sdk/path)==digest,path
inputs=inventory(src)
strip=Path('/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy')
clang=Path('/Users/shawwalters/.cache/solana/v1.54/platform-tools/llvm/bin/clang')
ar=clang.parent/'llvm-ar'
tools={str(p):sha(p)for p in [sdk/'bin/rustc',sdk/'bin/rustdoc',sdk/'bin/cargo',strip,clang,ar]}
env=os.environ.copy()
overrides={'RUSTC':str(sdk/'bin/rustc'),'RUSTDOC':str(sdk/'bin/rustdoc'),'CARGO_HOME':str(W/'cargo-home'),'CARGO_TARGET_DIR':str(target),'RUSTUP_HOME':str(W/'rustup'),'CARGO_NET_OFFLINE':'true','CC':str(clang),'AR':str(ar),'CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS':'-Zremap-cwd-prefix='}
env.update(overrides)
cmd=[str(sdk/'bin/cargo'),'rustc','--manifest-path',str(src/'Cargo.toml'),'--release','--target','sbpf-solana-solana','--locked','--offline','--verbose','--jobs','2','--','--remap-path-prefix=src/=programs/mayhem-program/src/']
cmd += json.loads(os.environ.get('MAYHEM_ROOT_RUSTC_ARGS_JSON','[]'))
record={'command':cmd,'cwd':str(src.parent.parent),'environment_overrides':overrides,'source_inputs':inputs,'controller_sha256':sha(Path(__file__)),'checked_tools':tools,'target_inputs':target_inputs,'scope':'mixed host/target provenance control: official Mac v1.54 compiler and official Linux v1.54 target libraries; no std source rebuild or binary patching'}
(output/'launch.json').write_text(json.dumps(record,indent=2)+'\n')
start=time.monotonic()
with(output/'stdout').open('wb')as out,(output/'stderr').open('wb')as err:
 for package in ['mayhem-recovered','anchor-lang']:
  subprocess.run([str(sdk/'bin/cargo'),'clean','--manifest-path',str(src/'Cargo.toml'),'--release','--target','sbpf-solana-solana','-p',package],cwd=src.parent.parent,env=env,stdout=out,stderr=err,check=True)
 result=subprocess.run(cmd,cwd=src.parent.parent,env=env,stdout=out,stderr=err)
result_record={'returncode':result.returncode,'seconds':time.monotonic()-start,'source_unchanged':inputs==inventory(src),'tools_unchanged':all(sha(Path(p))==h for p,h in tools.items()),'target_libraries_unchanged':all(sha(sdk/p)==h for p,h in target_inputs['files'].items()),'stdout_sha256':sha(output/'stdout'),'stderr_sha256':sha(output/'stderr')}
if result.returncode==0:
 import shutil
 shutil.copyfile(target/'sbpf-solana-solana/release/mayhem_recovered.so',output/'symbols.so')
 subprocess.run([str(strip),'--strip-all',str(output/'symbols.so'),str(output/'candidate.so')],check=True)
 result_record.update(candidate_sha256=sha(output/'candidate.so'),symbols_sha256=sha(output/'symbols.so'),candidate_bytes=(output/'candidate.so').stat().st_size)
(output/'result.json').write_text(json.dumps(result_record,indent=2)+'\n')
print(json.dumps(result_record,indent=2))
assert result.returncode==0 and result_record['source_unchanged'] and result_record['tools_unchanged'] and result_record['target_libraries_unchanged']
