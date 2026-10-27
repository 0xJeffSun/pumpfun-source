from pathlib import Path
import subprocess,json,hashlib,time,shutil
W=Path(__file__).resolve().parent;SDK=Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/relay-linux-v148/sdk');sha=lambda b:hashlib.sha256(b).hexdigest()
def inputs():return {str(f.relative_to(W/'source')):sha(f.read_bytes())for f in sorted((W/'source').rglob('*'))if f.is_file()}
before=inputs();[p.touch() for p in (W/'source').rglob('*.rs')];env={'PATH':'/sdk/rust/bin:/sdk/llvm/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin','HOME':'/work/settlement-488/home','CARGO_HOME':'/cargo','CARGO_TARGET_DIR':'/work/settlement-488/target','CARGO_NET_OFFLINE':'true','CARGO_TERM_COLOR':'never','CARGO_BUILD_JOBS':'3','CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS':'-Zremap-cwd-prefix=','RUSTC':'/sdk/rust/bin/rustc','RUSTDOC':'/sdk/rust/bin/rustdoc','CC':'/sdk/llvm/bin/clang','AR':'/sdk/llvm/bin/llvm-ar','OBJDUMP':'/sdk/llvm/bin/llvm-objdump','OBJCOPY':'/sdk/llvm/bin/llvm-objcopy','LANG':'C.UTF-8','LC_ALL':'C.UTF-8'}
cmd=['podman','exec']
for k,v in env.items():cmd+=['-e',k+'='+v]
cmd+=['-w','/work/identity-module/source','codex-relay-worker-build-20261027','/sdk/rust/bin/cargo','rustc','--release','--target','sbpf-solana-solana','--locked','--offline','--verbose','--manifest-path','/work/identity-module/source/Cargo.toml','--lib','--','--remap-path-prefix=src/=programs/contracts/src/'];(W/'home').mkdir(exist_ok=True)
(W/'launch.json').write_text(json.dumps(dict(command=cmd,inputs=before,rustc_sha256=sha((SDK/'rust/bin/rustc').read_bytes()),fresh_target=False),indent=2)+'\n');start=time.monotonic()
with(W/'build.log').open('wb')as log:r=subprocess.run(cmd,stdout=log,stderr=subprocess.STDOUT)
log=(W/'build.log').read_bytes();result=dict(exit_code=r.returncode,elapsed_seconds=time.monotonic()-start,source_unchanged=inputs()==before,root_invocations=log.count(b'--crate-name donation_relay_source_proposal '),build_log_sha256=sha(log))
if not r.returncode:
 assert result['root_invocations']==1, result
 shutil.copyfile(W.parent/'settlement-488/target/sbpf-solana-solana/release/donation_relay_source_proposal.so',W/'symbols.so');strip=['podman','exec','codex-relay-worker-build-20261027','/sdk/llvm/bin/llvm-objcopy','--strip-all','/work/identity-module/symbols.so','/work/identity-module/candidate.so'];subprocess.run(strip,check=True);(W/'strip-command.json').write_text(json.dumps(strip,indent=2)+'\n');result.update(candidate_sha256=sha((W/'candidate.so').read_bytes()),symbols_sha256=sha((W/'symbols.so').read_bytes()),candidate_bytes=(W/'candidate.so').stat().st_size)
(W/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2));raise SystemExit(r.returncode)
