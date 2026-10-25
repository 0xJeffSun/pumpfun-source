"""One frozen accepted24 Mayhem build; no global aliases/source/dependency changes."""
from pathlib import Path
import hashlib,json,os,shutil,struct,subprocess,time
P=Path(__file__).resolve().parent;R=next(p for p in P.parents if (p/'evidence/original/mayhem/deployed.so').is_file());T=Path('/Users/shawwalters/.cache/solana/v1.53/platform-tools');CRATE=P/'crate';OUT=P/'build-01';OUT.mkdir(exist_ok=False)
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
files=lambda root:{str(p.relative_to(root)):H(p) for p in sorted(root.rglob('*')) if p.is_file()}
frozen=json.loads((P/'frozen-source.json').read_text());assert files(CRATE)==frozen
assert json.loads((P/'distribution-verification.json').read_text())['cached_selected_bytes_match_official_archive']
assert json.loads((P/'target-adaptation.json').read_text())['same_v153_legacy_and_supported_target_spec']
# A CPU/header sanity object is not a program build or target execution.
probe=P/'header-probe.ll';probe.write_text('define i64 @probe(i64 %x) {\n %y = add i64 %x, 1\n ret i64 %y\n}\n');cmd=[str(T/'llvm/bin/llc'),'-march=sbf','-mcpu=generic','-filetype=obj',str(probe),'-o',str(P/'v153-generic.o')];subprocess.run(cmd,check=True);b=(P/'v153-generic.o').read_bytes();header={'machine':struct.unpack_from('<H',b,18)[0],'flags':struct.unpack_from('<I',b,48)[0]};assert header=={'machine':263,'flags':0};(P/'header-probe.json').write_text(json.dumps({'command':cmd,'header':header,'sha256':H(P/'v153-generic.o')},indent=2)+'\n')
SDK=Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/mayhem-sell-result-error-main/sdk');sdk={str(p.relative_to(SDK)):H(p) for p in sorted(SDK.rglob('*')) if p.is_file() and 'dependencies' not in p.relative_to(SDK).parts};assert sdk==json.loads((R/'repro/mayhem/sell-result-error-main-twentyfour/main/build-comparison.json').read_text())['sdk_source_sha256']
env=os.environ.copy()
for k in list(env):
 if k in ['RUSTFLAGS','CARGO_ENCODED_RUSTFLAGS','RUSTC_WRAPPER','RUSTC_WORKSPACE_WRAPPER','CARGO_BUILD_RUSTFLAGS'] or k.startswith(('CARGO_TARGET_','CARGO_PROFILE_')):env.pop(k)
updates={'CARGO_HOME':str(P/'cargo-home'),'CARGO_TARGET_DIR':str(OUT/'target'),'RUSTUP_HOME':str(P/'rustup'),'CARGO_NET_OFFLINE':'true','RUSTC':str(T/'rust/bin/rustc'),'RUSTDOC':str(T/'rust/bin/rustdoc'),'CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS':'-Zremap-cwd-prefix=','CC':str(T/'llvm/bin/clang'),'AR':str(T/'llvm/bin/llvm-ar'),'OBJDUMP':str(T/'llvm/bin/llvm-objdump'),'OBJCOPY':str(T/'llvm/bin/llvm-objcopy')};env.update(updates)
cmd=[str(T/'rust/bin/cargo'),'build','--manifest-path',str(CRATE/'Cargo.toml'),'--release','--target','sbpf-solana-solana','--locked','--offline','--verbose']
attempt={'scope':'Onefrozenaccepted24sourcebuild; documentedstockv1.53v0targetaliasadaptation; no originalprogrambytes compilerinput; no targetexecution','command':cmd,'environment_overrides':updates,'source_sha256':frozen,'sdk_reference_sha256':sdk,'rustc_version':subprocess.check_output([str(T/'rust/bin/rustc'),'--version','--verbose'],text=True),'rustc_sha256':H(T/'rust/bin/rustc'),'cargo_sha256':H(T/'rust/bin/cargo'),'target_adaptation':'Directofficialcargo/rustc,sbpf-solana-solana genericv0; samev153alias,targetfeaturesleftstock','global_alias_mutated':False}
(OUT/'build-attempt.json').write_text(json.dumps(attempt,indent=2)+'\n');start=time.time()
with (OUT/'build.log').open('w') as log:result=subprocess.run(cmd,env=env,cwd=R,stdout=log,stderr=subprocess.STDOUT)
after=files(CRATE);attempt.update(returncode=result.returncode,elapsed_seconds=time.time()-start,source_after_sha256=after,source_unchanged=after==frozen,build_log_sha256=H(OUT/'build.log'));(OUT/'build-attempt.json').write_text(json.dumps(attempt,indent=2)+'\n');assert attempt['source_unchanged'];result.check_returncode()
shutil.copyfile(OUT/'target/sbpf-solana-solana/release/mayhem_recovered.so',OUT/'unstripped.so')
# Hold baseline's observed postcompile strip generation constant.
strip=Path('/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy');cmd=[str(strip),'--strip-all',str(OUT/'unstripped.so'),str(OUT/'candidate.so')];subprocess.run(cmd,check=True)
import sys
sys.path.insert(0,str(R/'scripts'));from compare import compare
out={'scope':attempt['scope'],'selected_toolchain':'v1.53','strip_command':cmd,'strip_tool_sha256':H(strip),'source_sha256':frozen,'comparison':compare((R/'evidence/original/mayhem/deployed.so').read_bytes(),(OUT/'candidate.so').read_bytes())};(OUT/'build-comparison.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({'returncode':0,'source_unchanged':True,'candidate_bytes':(OUT/'candidate.so').stat().st_size,'candidate_sha256':H(OUT/'candidate.so')}))
