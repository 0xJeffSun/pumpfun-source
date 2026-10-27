from pathlib import Path
import sys, os, subprocess, json, hashlib
ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT/'scripts'))
from build_source_manifest import source_manifest
from compare import compare
out=ROOT/'work/pump-reserve-byte-recovery/recovered';out.mkdir(exist_ok=False)
crate=ROOT/'programs/pump';sdk=Path('/Users/shawwalters/.cache/solana/v1.44/platform-tools')
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
before=source_manifest(crate,crate,ROOT)
env=os.environ.copy();env.update(CARGO_TARGET_DIR=str(ROOT/'work/pump-focused-20261026/direct-v144-fixed/target'),RUSTC=str(sdk/'rust/bin/rustc'),CC=str(sdk/'llvm/bin/clang'),AR=str(sdk/'llvm/bin/llvm-ar'),OBJDUMP=str(sdk/'llvm/bin/llvm-objdump'),OBJCOPY=str(sdk/'llvm/bin/llvm-objcopy'),CARGO_TARGET_SBF_SOLANA_SOLANA_RUSTFLAGS='-Zremap-cwd-prefix=')
cmd=[str(sdk/'rust/bin/cargo'),'build','--manifest-path',str(crate/'Cargo.toml'),'--release','--target','sbf-solana-solana','--locked','--offline']
record={'source_sha256':before,'command':cmd,'selected_toolchain':'v1.44','rustc_sha256':sha(sdk/'rust/bin/rustc'),'cargo_sha256':sha(sdk/'rust/bin/cargo'),'scope':'Direct invocation of the existing v1.44 compiler and cargo; no installer adaptation. Source-only build.','environment':{k:env[k] for k in ['CARGO_TARGET_DIR','RUSTC','CC','AR','OBJDUMP','OBJCOPY','CARGO_TARGET_SBF_SOLANA_SOLANA_RUSTFLAGS']}}
(out/'build-attempt.json').write_text(json.dumps(record,indent=2)+'\n')
with (out/'build.log').open('w') as f:r=subprocess.run(cmd,cwd=crate,env=env,stdout=f,stderr=subprocess.STDOUT)
record.update(returncode=r.returncode,source_after_sha256=source_manifest(crate,crate,ROOT));record['source_unchanged']=before==record['source_after_sha256']
(out/'build-attempt.json').write_text(json.dumps(record,indent=2)+'\n');r.check_returncode();assert record['source_unchanged']
unstripped=ROOT/'work/pump-focused-20261026/direct-v144-fixed/target/sbf-solana-solana/release/pump_recovered.so';candidate=out/'candidate.so'
subprocess.run([str(sdk/'llvm/bin/llvm-objcopy'),'--strip-all',str(unstripped),str(candidate)],check=True)
import shutil
shutil.copy2(unstripped,out/'unstripped.so')
record.update(comparison=compare((ROOT/'evidence/original/pump/deployed.so').read_bytes(),candidate.read_bytes()),unstripped_sha256=sha(unstripped),build_log_sha256=sha(out/'build.log'))
(out/'build-comparison.json').write_text(json.dumps(record,indent=2)+'\n');print(json.dumps(record['comparison'],indent=2))
