from pathlib import Path
import subprocess,json,hashlib,time
W=Path(__file__).resolve().parent
sdk=Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/relay-linux-v148/sdk');registry=Path.home()/'.cargo/registry'
name='codex-relay-link-fresh-20261027';image='c9bcc62ac79b4618beaffc81c2a6ba4ac741fd27d910de47af20ceecbf53f39c'
sha=lambda b:hashlib.sha256(b).hexdigest()
inputs={str(f.relative_to(W/'source')):sha(f.read_bytes())for f in (W/'source').rglob('*')if f.is_file()};assert len(inputs)==60
assert not(W/'target').exists();(W/'target').mkdir();(W/'output/home').mkdir(parents=True)
subprocess.run(['python3',str(W/'check_registry.py')],check=True);registry_hash=sha((W/'registry-check.json').read_bytes())
create=['podman','create','--name',name,'--platform','linux/amd64','--network','none','-v',str(W/'source')+':/source:ro','-v',str(W/'config')+':/config:ro','-v',str(W/'output')+':/output:rw','-v',str(W/'target')+':/target:rw','-v',str(sdk)+':/sdk:ro','-v',str(registry)+':/cargo/registry:ro',image,'sleep','infinity']
subprocess.run(create,check=True);subprocess.run(['podman','start',name],check=True)
env={'PATH':'/sdk/rust/bin:/sdk/llvm/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin','HOME':'/output/home','CARGO_HOME':'/cargo','CARGO_TARGET_DIR':'/target','CARGO_NET_OFFLINE':'true','CARGO_TERM_COLOR':'never','CARGO_BUILD_JOBS':'3','CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS':'-Zremap-cwd-prefix=','RUSTC':'/sdk/rust/bin/rustc','RUSTDOC':'/sdk/rust/bin/rustdoc','CC':'/sdk/llvm/bin/clang','AR':'/sdk/llvm/bin/llvm-ar','OBJDUMP':'/sdk/llvm/bin/llvm-objdump','OBJCOPY':'/sdk/llvm/bin/llvm-objcopy','LANG':'C.UTF-8','LC_ALL':'C.UTF-8'}
cmd=['podman','exec','-w','/source',name,'env','-i']+[k+'='+v for k,v in env.items()]+['/sdk/rust/bin/cargo','rustc','--release','--target','sbpf-solana-solana','--locked','--offline','--verbose','--manifest-path','/source/Cargo.toml','--lib','--','--remap-path-prefix=src/=programs/contracts/src/','-C','link-arg=-Map=/output/link.map','-C','linker=/config/linker-wrapper.sh']
(W/'launch.json').write_text(json.dumps(dict(create=create,command=cmd,source_inputs=inputs,config_inputs={str(f.relative_to(W/'config')):sha(f.read_bytes())for f in (W/'config').iterdir()},fresh_target=True,rustc_sha256=sha((sdk/'rust/bin/rustc').read_bytes())),indent=2)+'\n');start=time.monotonic()
with(W/'build.log').open('wb')as log:r=subprocess.run(cmd,stdout=log,stderr=subprocess.STDOUT)
result=dict(exit_code=r.returncode,seconds=time.monotonic()-start,root_invocations=(W/'build.log').read_bytes().count(b'--crate-name donation_relay_source_proposal '),source_unchanged=inputs=={str(f.relative_to(W/'source')):sha(f.read_bytes())for f in (W/'source').rglob('*')if f.is_file()},build_log_sha256=sha((W/'build.log').read_bytes()))
if not r.returncode:
 assert result['root_invocations']==1
 shutil=__import__('shutil');shutil.copyfile(W/'target/sbpf-solana-solana/release/donation_relay_source_proposal.so',W/'output/symbols.so')
 subprocess.run(['podman','exec',name,'/sdk/llvm/bin/llvm-objcopy','--strip-all','/output/symbols.so','/output/candidate.so'],check=True)
 result['artifacts']={k:dict(sha256=sha((W/'output'/k).read_bytes()),bytes=(W/'output'/k).stat().st_size)for k in ['candidate.so','symbols.so']}
subprocess.run(['python3',str(W/'check_registry.py')],check=True);result['registry_unchanged']=sha((W/'registry-check.json').read_bytes())==registry_hash
(W/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2),flush=True);raise SystemExit(r.returncode)
