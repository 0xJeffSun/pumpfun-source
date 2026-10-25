#!/usr/bin/env python3
"""One approved fixed recipe; preserve any failure without retry or source repair."""
from pathlib import Path
import gzip,hashlib,json,os,shutil,subprocess,sys,tarfile
R=Path.cwd();P=R/'work/pump-general-route-build-preflight';W=R/'work/pump-general-route-recovery/run-01';B=W/'build-01';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
assert H(P/'manifest-sha256.json')=='5a75e117a57445ce8b66ab6b20bc685bbf4f69053eef140754288bca5dcee1a0'
assert not W.exists();W.mkdir(parents=True);plan=J(P/'build-plan.json');base=J(P/'baseline-source-sha256.json');source=plan['source_sha256']
def save(n,v):(W/n).write_text(json.dumps(v,indent=2)+'\n')
assert {n:H(R/n) for n in base}==base
shutil.copytree(P/'source',W/'source');assert {n:H(W/'source'/n) for n in source}==source
for n in ['build-plan.json','baseline-source-sha256.json','proposed-source-sha256.json','future-build-source-sha256.json','source.patch','proposed-source-snapshot.tar.gz','tools-observed.json','sdk-source-sha256.json','dependency-preflight.json','baseline-dependency-provenance.json.gz','build-helper-sha256.json']:(W/n).write_bytes((P/n).read_bytes())
(W/'source-sha256.json').write_bytes((P/'proposed-source-sha256.json').read_bytes());(W/'preflight-manifest-sha256.json').write_bytes((P/'manifest-sha256.json').read_bytes())
shutil.copytree(P/'build-helpers',W/'build-helpers');(W/'build_once.py').write_bytes(Path(__file__).read_bytes())
# Read-only recheck of the exact prior cached dependency file closure.
def dependency_gate():
 d=json.loads(gzip.decompress((W/'baseline-dependency-provenance.json.gz').read_bytes()));count=0
 for p in d['packages']:
  for f in p['archives']:assert H(R/f['path'])==f['sha256']==p['lock_checksum'];count+=1
  for tree in p['source_trees_observed']:
   for n,h in tree['source_files_sha256'].items():assert H(R/tree['path']/n)==h;count+=1
 assert count==14281
 return {'prior_inventory_sha256':hashlib.sha256(gzip.decompress((W/'baseline-dependency-provenance.json.gz').read_bytes())).hexdigest(),'registry_packages':252,'files':count,'all_match':True}
files=J(P/'tools-observed.json')['files'];toolbefore={n:H(Path(v['path'])) for n,v in files.items()};assert toolbefore=={n:v['sha256'] for n,v in files.items()}
helpers=J(P/'build-helper-sha256.json');assert {n:H(R/n) for n in helpers}==helpers
sdkroot=Path(J(P/'tools-observed.json')['sdk_source']);sdk={f.relative_to(sdkroot).as_posix():H(f) for f in sdkroot.rglob('*') if f.is_file() and 'dependencies' not in f.relative_to(sdkroot).parts};assert sdk==J(P/'sdk-source-sha256.json')
command=[sys.executable,'-B',str(R/'scripts/build_partial_candidate.py'),'--manifest',str(W/'source/programs/pump/Cargo.toml'),'--program','pump','--artifact-name','pump_recovered.so','--tools-version','v1.44','--output',str(B)]
env={**os.environ,'CARGO_HOME':str(R/'work/fees-v144-cargo-home'),'CARGO_NET_OFFLINE':'true','PYTHONDONTWRITEBYTECODE':'1'}
save('dependency-before.json',dependency_gate());save('build-launch.json',{'command':command,'source_before':source,'tool_hashes_before':toolbefore,'sdk_source_sha256':sdk,'helper_sha256':helpers,'CARGO_HOME':env['CARGO_HOME'],'network_offline':True,'isolated_sdk_rustup_target':True,'scope':'Exactly one parent-approved corrected ordinary route source55c644;36inputs;lib unchanged;no nested source or unrelated changes.'})
pre={f.relative_to(W).as_posix():H(f) for f in sorted(W.rglob('*')) if f.is_file()};save('prebuild-manifest-sha256.json',pre);print('Frozen prebuild seal',H(W/'prebuild-manifest-sha256.json'),flush=True)
r=subprocess.run(command,cwd=R,env=env,text=True,capture_output=True);(W/'build-launch.stdout').write_text(r.stdout);(W/'build-launch.stderr').write_text(r.stderr)
assert all(H(W/n)==h for n,h in pre.items());actual={n:H(W/'source'/n) for n in source};toolafter={n:H(Path(v['path'])) for n,v in files.items()}
save('build-result.json',{'returncode':r.returncode,'source_after':actual,'source_unchanged':actual==source,'main_source_unchanged':{n:H(R/n) for n in base}==base,'tool_hashes_after':toolafter,'tool_hashes_unchanged':toolafter==toolbefore,'retries':0,'source_repairs':0})
save('dependency-after.json',dependency_gate());assert actual==source and toolafter==toolbefore
if r.returncode:
 print(json.dumps({'built':False,'returncode':r.returncode,'build_log':str(B/'build.log'),'source_repairs':0,'runtime_executions':0},indent=2));raise SystemExit(r.returncode)
report=J(B/'build-comparison.json');assert report['source_sha256']==J(P/'future-build-source-sha256.json') and report['sdk_source_sha256']==sdk
shutil.copyfile(B/'target/sbf-solana-solana/release/pump_recovered.so',W/'unstripped.so');actualstrip=B/'sdk/dependencies/platform-tools/llvm/bin/llvm-objcopy'
assert H(actualstrip)==toolbefore['stripper'] and (B/'sdk/dependencies/platform-tools-v1.52.md').is_file()
save('toolchain-phases.json',{'scope':'Actual one-build observed file/link phases; no complete invocation trace or unique historical recipe claim.','compile':{'selected_version':'v1.44','tools':{n:v for n,v in files.items() if n not in ['stripper','cargo-build-sbf']},'before':toolbefore,'after':toolafter},'strip':{'actual_distribution':'v1.52','tool':files['stripper'],'observed_sdk_link':str((B/'sdk/dependencies/platform-tools').readlink()),'actual_path':str(actualstrip.resolve()),'actual_sha256':H(actualstrip)},'sdk_source_sha256':sdk,'cli':files['cargo-build-sbf'],'candidate':{'sha256':H(B/'artifacts/pump_recovered.so'),'bytes':(B/'artifacts/pump_recovered.so').stat().st_size},'symbols':{'sha256':H(W/'unstripped.so'),'bytes':(W/'unstripped.so').stat().st_size}})
print(json.dumps({'built':True,'candidate_sha256':H(B/'artifacts/pump_recovered.so'),'candidate_bytes':(B/'artifacts/pump_recovered.so').stat().st_size,'original_whole_equal':report['comparison']['full_byte_equality'],'source_inputs':36,'runtime_executions':0},indent=2))
