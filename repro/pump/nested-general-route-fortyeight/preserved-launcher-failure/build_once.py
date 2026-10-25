"""One authorized clean main build, holding the recorded compiler/stripper recipe fixed."""
from pathlib import Path
import gzip,hashlib,io,json,os,shutil,subprocess,sys,tarfile
R=Path.cwd();W=R/'work/pump-nested-general-route-main-promotion';S=R/'work/pump-nested-general-route-recovery/run-01';P=R/'work/pump-nested-general-route-build-preflight';B=W/'main-build-01'
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
assert not B.exists();assert H(S/'handoff/manifest-sha256.json')=='0e4e2d6644c6bede5b164f6c2450c3ebd95460173f27e1537979a052f6d92aa1'
source=J(W/'source-sha256.json');docs=J(W/'documentation-sha256.json');assert len(source)==37 and source==J(S/'source-sha256.json')
assert {n:H(R/n)for n in source}==source and {n:H(R/n)for n in docs}==docs
def save(n,v):(W/n).write_text(json.dumps(v,indent=2,sort_keys=True)+'\n')
for n in ['tools-observed.json','sdk-source-sha256.json','baseline-dependency-provenance.json.gz','build-helper-sha256.json']:
 shutil.copyfile(P/n,W/n)
shutil.copytree(P/'build-helpers',W/'build-helpers');shutil.copyfile(Path(__file__),W/'build_once.py')
buf=io.BytesIO()
with tarfile.open(fileobj=buf,mode='w')as t:
 for n,h in sorted(source.items()):
  b=(R/n).read_bytes();assert hashlib.sha256(b).hexdigest()==h;i=tarfile.TarInfo(n);i.size=len(b);i.mode=0o644;t.addfile(i,io.BytesIO(b))
(W/'source-snapshot.tar.gz').write_bytes(gzip.compress(buf.getvalue(),mtime=0))
def dependency_gate():
 d=json.loads(gzip.decompress((W/'baseline-dependency-provenance.json.gz').read_bytes()));count=0
 for p in d['packages']:
  for f in p['archives']:assert H(R/f['path'])==f['sha256']==p['lock_checksum'];count+=1
  for tree in p['source_trees_observed']:
   for n,h in tree['source_files_sha256'].items():assert H(R/tree['path']/n)==h;count+=1
 assert count==14281
 return {'prior_inventory_sha256':hashlib.sha256(gzip.decompress((W/'baseline-dependency-provenance.json.gz').read_bytes())).hexdigest(),'registry_packages':252,'files':count,'all_match':True}
files=J(P/'tools-observed.json')['files'];toolbefore={n:H(Path(v['path']))for n,v in files.items()};assert toolbefore=={n:v['sha256']for n,v in files.items()}
helpers=J(P/'build-helper-sha256.json');assert {n:H(R/n)for n in helpers}==helpers
sdkroot=Path(J(P/'tools-observed.json')['sdk_source']);sdk={f.relative_to(sdkroot).as_posix():H(f)for f in sdkroot.rglob('*')if f.is_file()and 'dependencies'not in f.relative_to(sdkroot).parts};assert sdk==J(P/'sdk-source-sha256.json')
cmd=[sys.executable,'-B',str(R/'scripts/build_partial_candidate.py'),'--manifest',str(R/'programs/pump/Cargo.toml'),'--program','pump','--artifact-name','pump_recovered.so','--tools-version','v1.44','--output',str(B)]
env={**os.environ,'CARGO_HOME':str(R/'work/fees-v144-cargo-home'),'CARGO_NET_OFFLINE':'true','PYTHONDONTWRITEBYTECODE':'1'}
save('dependency-before.json',dependency_gate());save('build-launch.json',{'command':cmd,'source_before':source,'documentation_before':docs,'tool_hashes_before':toolbefore,'sdk_source_sha256':sdk,'helper_sha256':helpers,'CARGO_HOME':env['CARGO_HOME'],'network_offline':True,'isolated_sdk_rustup_target':True,'scope':'One authorized main path identity build. Only reviewed route module plus separate README; accepted nested source remains unchanged.'})
pre={f.relative_to(W).as_posix():H(f)for f in sorted(W.rglob('*'))if f.is_file()};save('prebuild-manifest-sha256.json',pre);print('Frozen prebuild seal',H(W/'prebuild-manifest-sha256.json'),flush=True)
r=subprocess.run(cmd,cwd=R,env=env,text=True,capture_output=True);(W/'build-launch.stdout').write_text(r.stdout);(W/'build-launch.stderr').write_text(r.stderr)
assert all(H(W/n)==h for n,h in pre.items());actual={n:H(R/n)for n in source};actualdocs={n:H(R/n)for n in docs};toolafter={n:H(Path(v['path']))for n,v in files.items()}
save('build-result.json',{'returncode':r.returncode,'source_after':actual,'source_unchanged':actual==source,'documentation_after':actualdocs,'documentation_unchanged':actualdocs==docs,'tool_hashes_after':toolafter,'tool_hashes_unchanged':toolafter==toolbefore,'retries':0,'source_repairs':0})
save('dependency-after.json',dependency_gate());assert actual==source and actualdocs==docs and toolafter==toolbefore
if r.returncode:raise SystemExit(r.returncode)
report=J(B/'build-comparison.json');assert report['source_sha256']==source and report['sdk_source_sha256']==sdk
shutil.copyfile(B/'target/sbf-solana-solana/release/pump_recovered.so',W/'unstripped.so');shutil.copyfile(B/'artifacts/pump_recovered.so',W/'candidate.so')
strip=B/'sdk/dependencies/platform-tools/llvm/bin/llvm-objcopy';assert H(strip)==toolbefore['stripper']and(B/'sdk/dependencies/platform-tools-v1.52.md').is_file()
save('toolchain-phases.json',{'scope':'Actual observed main-build file/link phases; no exhaustive invocation trace or unique historical recipe claim.','compile':{'selected_version':'v1.44','tools':{n:v for n,v in files.items()if n not in ['stripper','cargo-build-sbf']},'before':toolbefore,'after':toolafter},'strip':{'actual_distribution':'v1.52','tool':files['stripper'],'observed_sdk_link':str((B/'sdk/dependencies/platform-tools').readlink()),'actual_path':str(strip.resolve()),'actual_sha256':H(strip)},'sdk_source_sha256':sdk,'cli':files['cargo-build-sbf'],'candidate':{'sha256':H(W/'candidate.so'),'bytes':(W/'candidate.so').stat().st_size},'symbols':{'sha256':H(W/'unstripped.so'),'bytes':(W/'unstripped.so').stat().st_size}})
identity={'main_candidate_sha256':H(W/'candidate.so'),'scratch_candidate_sha256':H(S/'build-01/artifacts/pump_recovered.so'),'whole_stripped_equal':(W/'candidate.so').read_bytes()==(S/'build-01/artifacts/pump_recovered.so').read_bytes(),'main_symbols_sha256':H(W/'unstripped.so'),'scratch_symbols_sha256':H(S/'unstripped.so'),'whole_symbols_equal':(W/'unstripped.so').read_bytes()==(S/'unstripped.so').read_bytes(),'source_inputs':37,'scratch_manifest_sha256':H(S/'handoff/manifest-sha256.json'),'runtime_receipts_reusable_only_by_whole_identity':True,'original_whole_equal':report['comparison']['full_byte_equality']}
save('main-scratch-identity.json',identity);assert identity['whole_stripped_equal']and identity['whole_symbols_equal'],identity
assert identity['main_candidate_sha256']=='731003570927c206353555d9743d70229234e7e3fa167a5915fa146f3007fc93'and identity['main_symbols_sha256']=='151727642ec97f48b7bc3aba5f3311a09c1a2400f6b8a757210aa83e63454b7d'
print(json.dumps(identity,indent=2))
