#!/usr/bin/env python3
from pathlib import Path
import hashlib,json,os,shutil,subprocess
W=Path(__file__).resolve().parent;R=W.parents[1];D=W/'main-promotion';B=D/'build'
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def save(p,d):p.write_text(json.dumps(d,indent=2)+'\n')
expected=json.loads((W/'combined/handoff/source-sha256.json').read_text());before={p:H(R/p)for p in expected}
assert[p for p in expected if before[p]!=expected[p]]==['programs/pump-fees/README.md']
helpers=json.loads((W/'handoff/build-helper-sha256.json').read_text())
assert all(H(R/p)==d for p,d in helpers.items())and not B.exists()
tools=json.loads((W/'baseline-toolchain-verification.json').read_text())['tools'];tool_before={p:H(Path(v['resolved_path']))for p,v in tools.items()};assert tool_before=={p:v['sha256']for p,v in tools.items()}
stripper=Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy';strip_before=H(stripper)
command=['python3',str(R/'scripts/build_partial_candidate.py'),'--manifest',str(R/'programs/pump-fees/Cargo.toml'),'--program','pump_fees','--artifact-name','pump_fees_candidate.so','--tools-version','v1.44','--output',str(B),'--extra-input',str(R/'programs/pump-fees/README.md')]
save(D/'build-launch.json',{'command':command,'CARGO_HOME':str(W/'cargo-home'),'network_offline':True,'source_before':before,'helper_hashes':helpers,'compile_tool_file_hashes_before':tool_before,'stripper_v152_file_hash_before':strip_before})
env={**os.environ,'CARGO_HOME':str(W/'cargo-home'),'CARGO_NET_OFFLINE':'true','PYTHONDONTWRITEBYTECODE':'1'}
result=subprocess.run(command,cwd=R,env=env,capture_output=True,text=True);(D/'build-launch.stdout').write_text(result.stdout);(D/'build-launch.stderr').write_text(result.stderr)
after={p:H(R/p)for p in expected};save(D/'build-result.json',{'returncode':result.returncode,'source_after':after,'source_unchanged':after==before,'runtime_rerun_performed':False})
assert result.returncode==0 and before==after
candidate=B/'artifacts/pump_fees_candidate.so';scratch=W/'combined/handoff/pump_fees_candidate.so'
equal=candidate.read_bytes()==scratch.read_bytes()
save(D/'main-scratch-identity.json',{'main_binary_sha256':H(candidate),'scratch_binary_sha256':H(scratch),'whole_file_equal':equal,'main_bytes':candidate.stat().st_size,'scratch_bytes':scratch.stat().st_size,'main_build_report_sha256':H(B/'build-comparison.json'),'scratch_build_report_sha256':H(W/'combined/handoff/build-comparison.json'),'main_source_sha256':before,'scratch_source_sha256':expected,'source_delta_paths':['programs/pump-fees/README.md'],'runtime_receipts_carried_by_whole_file_identity':equal,'runtime_rerun_performed':False,'scratch_runtime_comparisons':17441,'scratch_sequence_steps':10})
assert equal and H(candidate)=='e501ca2c744373e5653a5ac7e25a3fd20f6058765808b888c3605fd03adba60f'
shutil.copyfile(B/'target/sbf-solana-solana/release/pump_fees_candidate.so',D/'unstripped.so')
actual_stripper=B/'sdk/dependencies/platform-tools/llvm/bin/llvm-objcopy'
save(D/'tool-phase-provenance.json',{'scope':'Requested compiler phase and observed retained SDK stripping phase; file hashes measured before and after this build. No full process-level invocation-hash trace and no unique historical pipeline claim.','compile':{'requested_tools_version':'v1.44','tool_files':tools,'tool_hashes_before':tool_before,'tool_hashes_after':{p:H(Path(v['resolved_path']))for p,v in tools.items()},'unstripped_sha256':H(D/'unstripped.so')},'strip':{'sdk_platform_tools_symlink':str((B/'sdk/dependencies/platform-tools').readlink()),'sdk_platform_tools_realpath':str((B/'sdk/dependencies/platform-tools').resolve()),'sdk_marker':'platform-tools-v1.52.md','llvm_objcopy_resolved_path':str(actual_stripper.resolve()),'file_sha256_before':strip_before,'file_sha256_after':H(actual_stripper),'candidate_sha256':H(candidate),'command_from_retained_script':'llvm-objcopy --strip-all unstripped.so candidate.so'},'phase_source_sha256':{p:H(B/'sdk'/p)for p in ['env.sh','scripts/install.sh','scripts/strip.sh']}})
print(json.dumps({'whole_file_equal':equal,'candidate_bytes':candidate.stat().st_size,'candidate_sha256':H(candidate),'source_files':len(before),'source_delta_from_scratch':['programs/pump-fees/README.md']},indent=2))
