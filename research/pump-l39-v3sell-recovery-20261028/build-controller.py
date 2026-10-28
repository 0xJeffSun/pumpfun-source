from pathlib import Path
import datetime,hashlib,json,os,re,shutil,subprocess,sys
ROOT=Path(__file__).resolve().parents[2];stage=ROOT/'work/trading/l38/trial';source=stage/'source';target=stage/'target';name=sys.argv[1];assert re.fullmatch(r'[a-z0-9-]+',name)
assert stage.is_relative_to(ROOT/'work/trading') and target.is_dir()
sdk=Path('/workspace/toolchains/v1.44');cargo=sdk/'rust/bin/cargo';registry=Path('/workspace/pumpfun-source-latest/work/pump-l31/baseline-repeat/cargo-home');wrapper=Path('/workspace/pumpfun-source-latest/scripts/pump_physical_source_wrapper.py')
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
manifest=lambda:{str(p.relative_to(source)):sha(p) for p in source.rglob('*') if p.is_file()}
before=manifest();env=os.environ.copy();bound={'CARGO_HOME':str(registry),'RUSTC_WRAPPER':str(wrapper),'PUMP_LOGICAL_REGISTRY_SRC':str(registry/'registry/src'),'PUMP_SOURCE_WRAPPER_LOG':str(stage/(name+'-source-calls.jsonl')),'CARGO_TARGET_DIR':str(target),'CARGO_BUILD_JOBS':'2','RUSTC':str(sdk/'rust/bin/rustc'),'CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS':'-Zremap-cwd-prefix=','CARGO_NET_OFFLINE':'true'};env.update(bound)
base=[str(cargo),'--manifest-path',str(source/'Cargo.toml')];clean=[str(cargo),'clean','--offline','--manifest-path',str(source/'Cargo.toml'),'--release','--target','sbpf-solana-solana','-p','pump-recovered','-p','pump-token-ext'];build=[str(cargo),'build','--manifest-path',str(source/'Cargo.toml'),'--release','--target','sbpf-solana-solana','--locked','--offline']
record={'started':datetime.datetime.now(datetime.timezone.utc).isoformat(),'source_before':before,'commands':[clean,build],'environment':bound,'tools':{'cargo':sha(cargo),'rustc':sha(sdk/'rust/bin/rustc'),'objcopy':sha(sdk/'llvm/bin/llvm-objcopy'),'wrapper':sha(wrapper)},'forced_fresh_local_crates':['pump-recovered','pump-token-ext']};receipt=stage/(name+'-receipt.json');receipt.write_text(json.dumps(record,indent=2)+'\n')
log=stage/(name+'.log')
with log.open('w') as f:
 for cmd in [clean,build]:
  r=subprocess.run(cmd,cwd=source,env=env,stdout=f,stderr=subprocess.STDOUT);record['returncode']=r.returncode
  if r.returncode:receipt.write_text(json.dumps(record,indent=2)+'\n');raise SystemExit(r.returncode)
text=log.read_text();assert 'Compiling pump-token-ext v0.1.0' in text and 'Compiling pump-recovered v0.1.0' in text
record['source_after']=manifest();assert before==record['source_after'];record['source_unchanged']=True;record['build_log_sha256']=sha(log)
out=stage/(name+'-unstripped.so');shutil.copy2(target/'sbpf-solana-solana/release/pump_recovered.so',out);stripped=stage/(name+'-candidate.so');subprocess.run([str(sdk/'llvm/bin/llvm-objcopy'),'--strip-all',str(out),str(stripped)],check=True);record.update(unstripped_sha256=sha(out),candidate_sha256=sha(stripped),finished=datetime.datetime.now(datetime.timezone.utc).isoformat());receipt.write_text(json.dumps(record,indent=2)+'\n');print(json.dumps({k:record[k] for k in ['source_unchanged','forced_fresh_local_crates','unstripped_sha256','candidate_sha256']},indent=1))
