#!/usr/bin/env python3
"""Exactly one approved fixed recipe; stop on failure without repair or retry."""
from pathlib import Path
import gzip,hashlib,json,os,re,shutil,subprocess,sys
R=Path.cwd();W=R/'work/pump-buy-mode-order-build';B=W/'build-01';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def save(n,v):(W/n).write_text(json.dumps(v,indent=2)+'\n')
assert not B.exists() and not (W/'build-launch.json').exists()
source=J(W/'source-sha256.json');base=J(W/'baseline-source-sha256.json');actual=J(W/'actual-source-sha256.json')
assert {n:H(W/'source'/n)for n in source}==source and {n:H(R/n)for n in base}==base
files=J(W/'tools-observed.json')['files'];toolbefore={n:H(Path(v['path']))for n,v in files.items()};assert toolbefore=={n:v['sha256']for n,v in files.items()}
helpers=J(W/'build-helper-sha256.json');assert {n:H(R/n)for n in helpers}==helpers
sdkroot=Path(J(W/'tools-observed.json')['sdk_source']);sdk={f.relative_to(sdkroot).as_posix():H(f)for f in sdkroot.rglob('*')if f.is_file()and 'dependencies'not in f.relative_to(sdkroot).parts and not f.name.endswith('-keypair.json')};assert sdk==J(W/'sdk-source-sha256.json')
def dependency_gate():
 d=json.loads(gzip.decompress((W/'baseline-dependency-provenance.json.gz').read_bytes()));count=0
 for p in d['packages']:
  for f in p['archives']:assert H(R/f['path'])==f['sha256']==p['lock_checksum'];count+=1
  for tree in p['source_trees_observed']:
   for n,h in tree['source_files_sha256'].items():assert not n.endswith('-keypair.json');assert H(R/tree['path']/n)==h;count+=1
 assert count==14281 and len(d['packages'])==252
 return {'prior_inventory_sha256':hashlib.sha256(gzip.decompress((W/'baseline-dependency-provenance.json.gz').read_bytes())).hexdigest(),'registry_packages':252,'files':count,'all_match':True}
save('dependency-before.json',dependency_gate())
command=[sys.executable,'-B',str(R/'scripts/build_partial_candidate.py'),'--manifest',str(W/'source/programs/pump/Cargo.toml'),'--program','pump','--artifact-name','pump_recovered.so','--tools-version','v1.44','--output',str(B)]
env={**os.environ,'CARGO_HOME':str(R/'work/fees-v144-cargo-home'),'CARGO_NET_OFFLINE':'true','PYTHONDONTWRITEBYTECODE':'1'}
save('build-launch.json',{'command':command,'source_before':actual,'tool_hashes_before':toolbefore,'sdk_source_sha256':sdk,'helper_sha256':helpers,'CARGO_HOME':env['CARGO_HOME'],'network_offline':True,'isolated_sdk_rustup_target':True,'scope':'One approved buy-only complete-before-cashback source reorder. No retry, compiler/source/flag variants, or dormant whitelist helpers.'})
pre={f.relative_to(W).as_posix():H(f)for f in sorted(W.rglob('*'))if f.is_file()and not f.name.endswith('-keypair.json')and f.name not in ['build-invocation.stdout','build-invocation.stderr']};save('prebuild-manifest-sha256.json',pre);print('Frozen prebuild seal',H(W/'prebuild-manifest-sha256.json'),flush=True)
r=subprocess.run(command,cwd=R,env=env,text=True,capture_output=True);(W/'build-launch.stdout').write_text(r.stdout);(W/'build-launch.stderr').write_text(r.stderr)
assert all(H(W/n)==h for n,h in pre.items());sourceafter={n:H(W/'source'/n)for n in source};toolafter={n:H(Path(v['path']))for n,v in files.items()};log=(B/'build.log').read_text()if(B/'build.log').exists()else ''
failures=[line for line in log.splitlines()if re.search(r'(stack offset .*exceed|stack frame .*exceed|stack.*exceeded|LLVM ERROR|Cannot select:)',line,re.I)]
save('build-result.json',{'returncode':r.returncode,'source_after':sourceafter,'source_unchanged':sourceafter==source,'main_source_unchanged':{n:H(R/n)for n in base}==base,'tool_hashes_after':toolafter,'tool_hashes_unchanged':toolafter==toolbefore,'backend_stack_failures':failures,'retries':0,'source_repairs':0})
save('dependency-after.json',dependency_gate());assert sourceafter==source and toolafter==toolbefore
if r.returncode or failures:
 print(json.dumps({'built':r.returncode==0,'returncode':r.returncode,'backend_stack_failures':failures,'runtime_executions':0},indent=2));raise SystemExit(r.returncode or 1)
report=J(B/'build-comparison.json');assert report['source_sha256']==actual and report['sdk_source_sha256']==sdk
shutil.copyfile(B/'artifacts/pump_recovered.so',W/'candidate.so');shutil.copyfile(B/'target/sbf-solana-solana/release/pump_recovered.so',W/'unstripped.so');strip=B/'sdk/dependencies/platform-tools/llvm/bin/llvm-objcopy'
assert H(strip)==toolbefore['stripper']and(B/'sdk/dependencies/platform-tools-v1.52.md').is_file()
save('toolchain-phases.json',{'scope':'Observed compiler/strip file and symlink identities; not a complete execution trace or unique historical recipe claim.','compile':{'selected_version':'v1.44','tools':{n:v for n,v in files.items()if n not in ['stripper','cargo-build-sbf']},'before':toolbefore,'after':toolafter},'strip':{'actual_distribution':'v1.52','tool':files['stripper'],'observed_sdk_link':str((B/'sdk/dependencies/platform-tools').readlink()),'actual_path':str(strip.resolve()),'actual_sha256':H(strip)},'sdk_source_sha256':sdk,'cli':files['cargo-build-sbf'],'candidate':{'sha256':H(W/'candidate.so'),'bytes':(W/'candidate.so').stat().st_size},'symbols':{'sha256':H(W/'unstripped.so'),'bytes':(W/'unstripped.so').stat().st_size}})
print(json.dumps({'built':True,'candidate_sha256':H(W/'candidate.so'),'candidate_bytes':(W/'candidate.so').stat().st_size,'original_whole_equal':report['comparison']['full_byte_equality'],'source_inputs':37,'backend_stack_failures':[],'runtime_executions':0},indent=2),flush=True)
