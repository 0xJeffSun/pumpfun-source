from pathlib import Path
import gzip,hashlib,io,json,os,shlex,shutil,subprocess,tarfile
B=Path(__file__).resolve().parent;P=B.parents[1]/'research/pump-multi-hop-crossing-guard-20261028';O=B/'hop-crossing-guard-confirm';O.mkdir(exist_ok=True);S=O/'source';S.mkdir(exist_ok=True)
with tarfile.open(fileobj=io.BytesIO(gzip.decompress((P/'builds/fixed/source.tar.gz').read_bytes())),mode='r:')as t:t.extractall(S,filter='data')
SDK=Path('/workspace/toolchains/v1.44');CH=Path('/workspace/pumpfun-source-current/work/pump-round37-linux-control/cargo-home');WRAP=Path('/workspace/pumpfun-source-latest/scripts/pump_physical_source_wrapper.py')
sha=lambda p:hashlib.sha256(Path(p).read_bytes()).hexdigest()
def tree():return{str(p.relative_to(S)):sha(p)for p in sorted(S.rglob('*'))if p.is_file()}
tool_paths={'cargo':SDK/'rust/bin/cargo','rustc':SDK/'rust/bin/rustc','objcopy':SDK/'llvm/bin/llvm-objcopy','wrapper':WRAP};before=tree();tools_before={k:sha(v)for k,v in tool_paths.items()}
env=os.environ.copy();env.update(CARGO_HOME=str(CH),CARGO_TARGET_DIR=str(B/'target'),CARGO_BUILD_JOBS='2',RUSTC=str(tool_paths['rustc']),RUSTC_WRAPPER=str(WRAP),PUMP_LOGICAL_REGISTRY_SRC=str(CH/'registry/src'),PUMP_SOURCE_WRAPPER_LOG=str(O/'physical-source-calls.jsonl'),CC=str(SDK/'llvm/bin/clang'),AR=str(SDK/'llvm/bin/llvm-ar'),OBJDUMP=str(SDK/'llvm/bin/llvm-objdump'),OBJCOPY=str(tool_paths['objcopy']),CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS='-Zremap-cwd-prefix=')
clean=[str(tool_paths['cargo']),'clean','--manifest-path',str(S/'Cargo.toml'),'--release','--target','sbpf-solana-solana','-p','pump-recovered','-p','pump-token-ext','--offline']
cmd=[str(tool_paths['cargo']),'build','--manifest-path',str(S/'programs/pump/Cargo.toml'),'--release','--target','sbpf-solana-solana','--locked','--offline','-v']
with(O/'clean.log').open('w')as log:subprocess.run(clean,cwd=S,env=env,stdout=log,stderr=subprocess.STDOUT,check=True)
with(O/'build.log').open('w')as log:subprocess.run(cmd,cwd=S,env=env,stdout=log,stderr=subprocess.STDOUT,check=True)
log=(O/'build.log').read_text();assert 'Compiling pump-token-ext 'in log and 'Compiling pump-recovered 'in log
shutil.copy2(B/'target/sbpf-solana-solana/release/pump_recovered.so',O/'unstripped.so');subprocess.run([str(tool_paths['objcopy']),'--strip-all',str(O/'unstripped.so'),str(O/'candidate.so')],check=True)
expected=json.loads((P/'builds/fixed/elf-sha256.json').read_text());assert all(sha(O/k)==v for k,v in expected.items())
commands=[shlex.split(line.split('Running `')[1][:-1])for line in log.splitlines()if 'Running `'in line and any('--crate-name '+n+' 'in line for n in ['pump_token_ext','pump_recovered'])];assert len(commands)==2
record={'clean_command':clean,'command':cmd,'cwd':str(S),'environment':{k:env[k]for k in ['CARGO_HOME','CARGO_TARGET_DIR','RUSTC','RUSTC_WRAPPER','PUMP_LOGICAL_REGISTRY_SRC','CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS']},'source_before_sha256':before,'source_after_sha256':tree(),'tool_before_sha256':tools_before,'tool_after_sha256':{k:sha(v)for k,v in tool_paths.items()},'returncode':0,'compiler_commands':commands,'elf_sha256':{k:sha(O/k)for k in expected}}
assert record['source_before_sha256']==record['source_after_sha256'];assert record['tool_before_sha256']==record['tool_after_sha256'];(O/'build-record.json').write_text(json.dumps(record,indent=2)+'\n');print(json.dumps({'confirmed':True,'elf_sha256':record['elf_sha256']}))
