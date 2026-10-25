"""Authorized additive completion of already successful compilation; never invokes a build."""
from pathlib import Path
import gzip,hashlib,json,shutil
R=Path.cwd();W=R/'work/pump-nested-general-route-main-promotion';S=R/'work/pump-nested-general-route-recovery/run-01';B=W/'main-build-01';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
pre=J(W/'prebuild-manifest-sha256.json');changed=[n for n,h in pre.items()if H(W/n)!=h];assert changed==['build-invocation.log'],changed
F=W/'preserved-launcher-failure';F.mkdir(exist_ok=False)
assert pre['build-invocation.log']==hashlib.sha256(b'').hexdigest();(F/'build-invocation-before.log').write_bytes(b'');shutil.copyfile(W/'build-invocation.log',F/'build-invocation-after.log')
for n in ['build_once.py','prebuild-manifest-sha256.json']:shutil.copyfile(W/n,F/n)
source=J(W/'source-sha256.json');docs=J(W/'documentation-sha256.json');launch=J(W/'build-launch.json');attempt=J(B/'build-attempt.json');report=J(B/'build-comparison.json');assert attempt['returncode']==0 and attempt['source_unchanged']
assert source==attempt['source_sha256']==attempt['source_after_sha256']==report['source_sha256']=={n:H(R/n)for n in source}
assert docs=={n:H(R/n)for n in docs};assert H(B/'build.log')==report['build_log_sha256']==attempt['build_log_sha256']
files=J(W/'tools-observed.json')['files'];toolafter={n:H(Path(v['path']))for n,v in files.items()};assert toolafter==launch['tool_hashes_before']
d=json.loads(gzip.decompress((W/'baseline-dependency-provenance.json.gz').read_bytes()));count=0
for p in d['packages']:
 for f in p['archives']:assert H(R/f['path'])==f['sha256']==p['lock_checksum'];count+=1
 for tree in p['source_trees_observed']:
  for n,h in tree['source_files_sha256'].items():assert H(R/tree['path']/n)==h;count+=1
assert count==14281
def save(n,j):(W/n).write_text(json.dumps(j,indent=2,sort_keys=True)+'\n')
after={'prior_inventory_sha256':hashlib.sha256(gzip.decompress((W/'baseline-dependency-provenance.json.gz').read_bytes())).hexdigest(),'registry_packages':252,'files':count,'all_match':True};assert after==J(W/'dependency-before.json');save('dependency-after.json',after)
assert J(W/'build-helper-sha256.json')=={n:H(R/n)for n in J(W/'build-helper-sha256.json')};sdk=J(W/'sdk-source-sha256.json');assert report['sdk_source_sha256']==sdk
strip=B/'sdk/dependencies/platform-tools/llvm/bin/llvm-objcopy';assert H(strip)==toolafter['stripper']and(B/'sdk/dependencies/platform-tools-v1.52.md').is_file()
shutil.copyfile(B/'artifacts/pump_recovered.so',W/'candidate.so');shutil.copyfile(B/'target/sbf-solana-solana/release/pump_recovered.so',W/'unstripped.so')
save('toolchain-phases.json',{'scope':'Additive postcompile observation after the single successful main build; outer launcher failed solely because it sealed its mutable orchestration log. No rebuild or unique historical recipe claim.','compile':{'selected_version':'v1.44','tools':{n:v for n,v in files.items()if n not in ['stripper','cargo-build-sbf']},'before':launch['tool_hashes_before'],'after':toolafter},'strip':{'actual_distribution':'v1.52','tool':files['stripper'],'observed_sdk_link':str((B/'sdk/dependencies/platform-tools').readlink()),'actual_path':str(strip.resolve()),'actual_sha256':H(strip)},'sdk_source_sha256':sdk,'cli':files['cargo-build-sbf'],'candidate':{'sha256':H(W/'candidate.so'),'bytes':(W/'candidate.so').stat().st_size},'symbols':{'sha256':H(W/'unstripped.so'),'bytes':(W/'unstripped.so').stat().st_size}})
identity={'main_candidate_sha256':H(W/'candidate.so'),'scratch_candidate_sha256':H(S/'build-01/artifacts/pump_recovered.so'),'whole_stripped_equal':(W/'candidate.so').read_bytes()==(S/'build-01/artifacts/pump_recovered.so').read_bytes(),'main_symbols_sha256':H(W/'unstripped.so'),'scratch_symbols_sha256':H(S/'unstripped.so'),'whole_symbols_equal':(W/'unstripped.so').read_bytes()==(S/'unstripped.so').read_bytes(),'source_inputs':37,'scratch_manifest_sha256':H(S/'handoff/manifest-sha256.json'),'runtime_receipts_reusable_only_by_whole_identity':True,'original_whole_equal':report['comparison']['full_byte_equality']}
assert identity['whole_stripped_equal']and identity['whole_symbols_equal'];save('main-scratch-identity.json',identity)
completion={'status':'COMPILER_SUCCESS_LAUNCHER_ASSERTION_FAILURE_ADDITIVELY_COMPLETED','compiler_returncode':0,'launcher_returncode':1,'build_count':1,'rebuilds':0,'source_repairs':0,'excluded_immutable_entry_only':'build-invocation.log','reason':'Live orchestration log was mistakenly sealed before the build; all other prebuild entries and all37 actual compiler inputs are unchanged.','prebuild_seal_sha256':H(W/'prebuild-manifest-sha256.json'),'before_log_sha256':H(F/'build-invocation-before.log'),'after_log_sha256':H(F/'build-invocation-after.log'),'source_unchanged':True,'documentation_unchanged':True,'tools_unchanged':True,'dependency_cache_unchanged':True,'whole_stripped_and_symbol_identity':True}
save('postbuild-completion.json',completion);save('build-result.json',completion);shutil.copyfile(Path(__file__),W/'complete_bookkeeping.py');print(json.dumps(identity,indent=2))
