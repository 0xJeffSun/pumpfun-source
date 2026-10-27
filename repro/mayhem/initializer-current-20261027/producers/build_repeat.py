"""Build the exact current Mayhem source in a private target with the selected native SDK."""
from pathlib import Path
import hashlib,json,os,subprocess,time,shutil
W=Path(__file__).resolve().parent;ROOT=W.parents[1]
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
base=json.loads((W/'base-build-record.json').read_text());src=W/'source/programs/mayhem';target=W/'target';out=W/'repeat-build';out.mkdir(exist_ok=False)
snapshot=lambda:{str(p.relative_to(W/'source')):sha(p)for p in src.rglob('*')if p.is_file()and(p.suffix=='.rs'or p.name in['Cargo.toml','Cargo.lock'])}
before=snapshot();assert before==json.loads((W/'current-source.json').read_text())
env=os.environ.copy();overrides=base['environment_overrides'].copy();overrides['CARGO_TARGET_DIR']=str(target);overrides['CARGO_BUILD_JOBS']='6';env.update(overrides)
for k in ['RUSTFLAGS','CARGO_ENCODED_RUSTFLAGS']:env.pop(k,None)
sdk=Path('/Users/shawwalters/.cache/solana/v1.54/platform-tools')
cmd=[str(sdk/'rust/bin/cargo'),'build','--manifest-path',str(src/'Cargo.toml'),'--release','--target','sbpf-solana-solana','--locked','--offline','--verbose']
record={'source_sha256':before,'command':cmd,'cwd':str(W/'source'),'environment_overrides':overrides,'tool_sha256':{n:sha(sdk/n)for n in ['rust/bin/cargo','rust/bin/rustc','llvm/bin/llvm-objcopy']},'rustc_version':subprocess.check_output([str(sdk/'rust/bin/rustc'),'--version','--verbose'],text=True),'scope':__doc__}
(out/'build-record.json').write_text(json.dumps(record,indent=2)+'\n');start=time.monotonic()
with (out/'build.log').open('w')as f:p=subprocess.run(cmd,cwd=W/'source',env=env,stdout=f,stderr=subprocess.STDOUT)
record.update(returncode=p.returncode,seconds=time.monotonic()-start,source_after_sha256=snapshot(),source_unchanged=snapshot()==before,log_sha256=sha(out/'build.log'))
if p.returncode==0:
    shutil.copy2(target/'sbpf-solana-solana/release/mayhem_recovered.so',out/'unstripped.so')
    subprocess.run([str(sdk/'llvm/bin/llvm-objcopy'),'--strip-all',str(out/'unstripped.so'),str(out/'candidate.so')],check=True)
    record.update(candidate_sha256=sha(out/'candidate.so'),unstripped_sha256=sha(out/'unstripped.so'))
(out/'build-record.json').write_text(json.dumps(record,indent=2)+'\n');print(json.dumps({k:record[k]for k in ['returncode','seconds','source_unchanged','candidate_sha256','unstripped_sha256']if k in record},indent=2));raise SystemExit(p.returncode)
