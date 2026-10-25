"""One controlled frozen-Fees build; only official distribution and compatible target invocation differ."""
from pathlib import Path
import subprocess,json,hashlib,os,shutil,time
P=Path(__file__).resolve().parent
ROOT=next(p for p in P.parents if (p/'evidence/original/pump_fees/deployed.so').is_file())
TOOLS=P/'platform-tools';CRATE=P/'crate';OUT=P/'v1461-build-01';OUT.mkdir(exist_ok=False)
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
read=lambda p:json.loads(p.read_text())
def files(root):return {str(p.relative_to(root)):H(p) for p in sorted(root.rglob('*')) if p.is_file()}
before=files(CRATE);assert before==read(P/'frozen-source.json')
baseline=ROOT/'repro/pump_fees/compiler-family/v146-build-01/build-comparison.json'
record=read(baseline)
# Exact reference SDK remains an observed input, not executed installer state.
SDK=Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/fees-compat/v146-build-01/sdk')
sdk={str(p.relative_to(SDK)):H(p) for p in sorted(SDK.rglob('*')) if p.is_file() and 'dependencies' not in p.relative_to(SDK).parts}
assert sdk==record['sdk_source_sha256']
version=subprocess.check_output([str(TOOLS/'rust/bin/rustc'),'--version','--verbose'],text=True)
# This compiler's official sbpf target selects generic v0 and unchanged V0 linker script.
preflight=P/'old-target-probe.rs';preflight.write_text('#![no_std]\npub fn probe() -> u64 { 1 }\n')
probe_cmd=[str(TOOLS/'rust/bin/rustc'),'--crate-type=lib','--target=sbf-solana-solana',str(preflight),'-o',str(P/'old-target-probe.rlib')]
r=subprocess.run(probe_cmd,capture_output=True,text=True)
(P/'old-target-setup.json').write_text(json.dumps(dict(command=probe_cmd,returncode=r.returncode,stdout=r.stdout,stderr=r.stderr,scope='Only legacy-target setup capability, not historical compiler exclusion'),indent=2)+'\n')
assert r.returncode!=0 and "can't find crate for `core`" in r.stderr
# CPU/header sanity using official backend before spending the one source build.
llc_cmd=[str(TOOLS/'llvm/bin/llc'),'-march=sbf','-mcpu=generic','-filetype=obj',str(P/'header-probe.ll'),'-o',str(P/'v1461-generic.o')]
subprocess.run(llc_cmd,check=True)
import struct
raw=(P/'v1461-generic.o').read_bytes();assert (struct.unpack_from('<H',raw,18)[0],struct.unpack_from('<I',raw,48)[0])==(263,0)
cache=Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/fees-compat/cargo-home')
env=os.environ.copy()
for k in ['RUSTFLAGS','CARGO_ENCODED_RUSTFLAGS','RUSTC_WRAPPER','RUSTC_WORKSPACE_WRAPPER','CARGO_BUILD_RUSTFLAGS','CARGO_PROFILE_RELEASE_OPT_LEVEL','CARGO_PROFILE_RELEASE_LTO','CARGO_PROFILE_RELEASE_CODEGEN_UNITS','CARGO_TARGET_SBF_SOLANA_SOLANA_RUSTFLAGS']:
 env.pop(k,None)
updates={'CARGO_HOME':str(cache),'CARGO_TARGET_DIR':str(OUT/'target'),'RUSTC':str(TOOLS/'rust/bin/rustc'),'RUSTDOC':str(TOOLS/'rust/bin/rustdoc'),'CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS':'-Zremap-cwd-prefix=','CC':str(TOOLS/'llvm/bin/clang'),'AR':str(TOOLS/'llvm/bin/llvm-ar'),'OBJDUMP':str(TOOLS/'llvm/bin/llvm-objdump'),'OBJCOPY':str(TOOLS/'llvm/bin/llvm-objcopy')}
env.update(updates)
cmd=[str(TOOLS/'rust/bin/cargo'),'build','--manifest-path',str(CRATE/'Cargo.toml'),'--release','--target','sbpf-solana-solana','--locked','--offline','--verbose']
attempt=dict(scope='Frozen16 source/lock/profile; official v1.46.1 distribution and documented compatible target invocation. No original bytes compiler input; no runtime.',command=cmd,environment=updates,source_sha256=before,rustc_version=version,rustc_sha256=H(TOOLS/'rust/bin/rustc'),sdk_source_sha256=sdk,target_adaptation='Legacy sbf-solana-solana → official sbpf-solana-solana, both map sbf_target(v0); direct selected cargo avoids changing global rustup aliases')
(OUT/'build-attempt.json').write_text(json.dumps(attempt,indent=2)+'\n')
start=time.time()
with (OUT/'build.log').open('w') as log:r=subprocess.run(cmd,env=env,cwd=ROOT,stdout=log,stderr=subprocess.STDOUT)
attempt.update(returncode=r.returncode,elapsed_seconds=time.time()-start,source_after_sha256=files(CRATE),source_unchanged=before==files(CRATE),build_log_sha256=H(OUT/'build.log'))
(OUT/'build-attempt.json').write_text(json.dumps(attempt,indent=2)+'\n');r.check_returncode();assert attempt['source_unchanged']
unstripped=OUT/'target/sbpf-solana-solana/release/pump_fees_candidate.so';shutil.copy2(unstripped,OUT/'unstripped.so')
# Same observed post-compilation strip tool generation as controlled v1.46 baseline SDK.
strip_tool=Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy'
strip_cmd=[str(strip_tool),'--strip-all',str(OUT/'unstripped.so'),str(OUT/'pump_fees_candidate.so')];subprocess.run(strip_cmd,check=True)
import sys
sys.path.insert(0,str(ROOT/'scripts'));from compare import compare
comparison=compare((ROOT/'evidence/original/pump_fees/deployed.so').read_bytes(),(OUT/'pump_fees_candidate.so').read_bytes())
report=dict(scope=attempt['scope'],selected_toolchain='v1.46.1',source_sha256=before,sdk_source_sha256=sdk,strip_command=strip_cmd,strip_tool_sha256=H(strip_tool),build_log_sha256=attempt['build_log_sha256'],comparison=comparison)
(OUT/'build-comparison.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(comparison,indent=2))
