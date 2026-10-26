from pathlib import Path
import os,subprocess,hashlib,json,time,shutil
P=Path(__file__).resolve().parent
ROOT=P.parents[1]
SRC=ROOT/'work/metaplex-native-source'
T=P/'toolchain';OUT=P/'native-lazy-error';OUT.mkdir(exist_ok=False)
H=lambda b:hashlib.sha256(b).hexdigest()
files=subprocess.check_output(['git','-C',str(SRC),'ls-files'],text=True).splitlines();before={n:H((SRC/n).read_bytes()) for n in files if (SRC/n).is_file()}
env=dict(os.environ)
for k in ['RUSTFLAGS','CARGO_ENCODED_RUSTFLAGS','RUSTC_WRAPPER','RUSTC_WORKSPACE_WRAPPER','RUSTUP_TOOLCHAIN','RUSTDOCFLAGS']:
 env.pop(k,None)
sdk=subprocess.check_output(['xcrun','--sdk','macosx','--show-sdk-path'],text=True).strip()
env['SDKROOT']=sdk
env['CFLAGS_aarch64_apple_darwin']='-isysroot '+sdk
env.update(PATH=str(T/'rust/bin')+os.pathsep+env.get('PATH',''),RUSTC=str(T/'rust/bin/rustc'),CC=str(T/'llvm/bin/clang'),AR=str(T/'llvm/bin/llvm-ar'),OBJDUMP=str(T/'llvm/bin/llvm-objdump'),OBJCOPY=str(T/'llvm/bin/llvm-objcopy'),CARGO_HOME=str(P/'cargo-home'),CARGO_TARGET_DIR=str(P/'native-target'),CARGO_TARGET_SBF_SOLANA_SOLANA_RUSTFLAGS='-Zremap-cwd-prefix=')
cmd=[str(T/'rust/bin/cargo'),'rustc','--package','token_metadata','--lib','--release','--target','sbf-solana-solana','--config','registries.crates-io.protocol="sparse"','--locked','--manifest-path',str(SRC/'programs/token-metadata/Cargo.toml'),'--','--emit=llvm-ir,link','-Csave-temps']
(OUT/'source-manifest.json').write_text(json.dumps(before,indent=2)+'\n');(OUT/'command.json').write_text(json.dumps(cmd,indent=2)+'\n')
with (OUT/'build.log').open('wb') as log:run=subprocess.run(cmd,cwd=SRC/'programs/token-metadata/program',env=env,stdout=log,stderr=subprocess.STDOUT)
assert all(H((SRC/n).read_bytes())==h for n,h in before.items()),'source or lockfile changed'
result=dict(scope='Lazy MetadataError conversion on checked-subtraction failure after initial admission; native source experiment',returncode=run.returncode,command=cmd,source_manifest_sha256=H((OUT/'source-manifest.json').read_bytes()),build_log_sha256=H((OUT/'build.log').read_bytes()))
if run.returncode==0:
 raw=P/'native-target/sbf-solana-solana/release/mpl_token_metadata.so'
 if not raw.exists():raw=P/'native-target/sbf-solana-solana/release/token_metadata.so'
 assert raw.exists()
 shutil.copyfile(raw,OUT/'unstripped.so')
 subprocess.run([str(T/'llvm/bin/llvm-objcopy'),'--strip-all',str(raw),str(OUT/'candidate.so')],check=True)
 b=(OUT/'candidate.so').read_bytes();a=(ROOT/'repro/pump/metaplex-candidate-build-11/token_metadata.so').read_bytes();result.update(candidate_sha256=H(b),candidate_bytes=len(b),equals_linux_candidate11=b==a)
(OUT/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
