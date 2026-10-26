from pathlib import Path
import subprocess,json,hashlib,shutil,fcntl,gzip,time
ROOT=Path(__file__).resolve().parents[2]
B=ROOT/'work/metaplex-podman-baseline';P=ROOT/'work/metaplex-linux-ir-baseline-machine';P.mkdir(exist_ok=False)
lock=(B/'iteration.lock').open('a');fcntl.flock(lock,fcntl.LOCK_EX|fcntl.LOCK_NB)
H=lambda b:hashlib.sha256(b).hexdigest()
info=json.loads((B/'container.json').read_text());c=info['id'];source=Path(info['source'])
state=json.loads(subprocess.check_output(['podman','inspect',c],text=True))[0];assert state['State']['Running']
manifest=json.loads((B/'source-manifest.json').read_text());assert all(H((source/n).read_bytes())==h for n,h in manifest.items())
(P/'source-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
T='/root/.cache/solana/v1.37/platform-tools'
cmd=['podman','exec','-e','RUSTUP_TOOLCHAIN=1.69.0-x86_64-unknown-linux-gnu','-e','CARGO_REGISTRIES_CRATES_IO_PROTOCOL=sparse','-e','CARGO_TARGET_SBF_SOLANA_SOLANA_RUSTFLAGS=-Zremap-cwd-prefix=','-e','CC='+T+'/llvm/bin/clang','-e','AR='+T+'/llvm/bin/llvm-ar','-e','OBJDUMP='+T+'/llvm/bin/llvm-objdump','-e','OBJCOPY='+T+'/llvm/bin/llvm-objcopy','-w','/build/programs/token-metadata',c,'cargo','+solana','rustc','--package','token_metadata','--lib','--release','--target','sbf-solana-solana','--locked','--manifest-path','/build/programs/token-metadata/Cargo.toml','--','--emit=asm,llvm-ir,link','-Csave-temps','-Cllvm-args=-print-after=block-placement','-Cllvm-args=-filter-print-funcs=_ZN14token_metadata9processor4uses7utilize15process_utilize17h9789c7990f4c0b83E']
(P/'command.json').write_text(json.dumps(cmd,indent=2)+'\n');shutil.copyfile(__file__,P/'driver.py')
started=time.time()
with (P/'build.log').open('wb') as f:r=subprocess.run(cmd,stdout=f,stderr=subprocess.STDOUT)
assert r.returncode==0
assert all(H((source/n).read_bytes())==h for n,h in manifest.items())
target=source/'programs/token-metadata/target/sbf-solana-solana/release'
unstripped=target/'token_metadata.so';shutil.copyfile(unstripped,P/'unstripped.so')
strip=['podman','exec',c,T+'/llvm/bin/llvm-objcopy','--strip-all','/build/programs/token-metadata/target/sbf-solana-solana/release/token_metadata.so','/build/programs/token-metadata/target/deploy/ir-control.so'];subprocess.run(strip,check=True)
shutil.copyfile(source/'programs/token-metadata/target/deploy/ir-control.so',P/'candidate.so')
outputs=[]
for suffix in ['.ll','.s']:
 files=[target/'deps'/('token_metadata'+suffix)];assert files[0].exists() and files[0].stat().st_mtime>=started-2
 data=files[0].read_bytes();dest=P/('module'+suffix+'.gz');dest.write_bytes(gzip.compress(data,mtime=0));outputs.append(dict(name=dest.name,raw_sha256=H(data),raw_bytes=len(data)))
raw=(P/'candidate.so').read_bytes();expected=(ROOT/'repro/pump/metaplex-candidate-build-11/token_metadata.so').read_bytes();facts=dict(returncode=r.returncode,source_files=len(manifest),candidate_sha256=H(raw),equals_candidate11=raw==expected,outputs=outputs,log_sha256=H((P/'build.log').read_bytes()))
(P/'result.json').write_text(json.dumps(facts,indent=2)+'\n');print(json.dumps(facts,indent=2));assert raw==expected
