from pathlib import Path
import gzip,hashlib,json,os,re,shutil,subprocess,sys,tarfile
R=Path.cwd();W=R/'work/pump-final-error-metadata-main';S=R/'work/pump-final-error-metadata-build/handoff';B=W/'build-01';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def save(n,v):(W/n).write_text(json.dumps(v,indent=2)+'\n')
assert not B.exists()and not(W/'build-launch.json').exists();promotion=J(W/'promotion.json');source=promotion['source_sha256'];assert len(source)==37 and {n:H(R/n)for n in source}==source
for n in source:
 p=W/'source'/n;p.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(R/n,p)
for n in ['tools-observed.json','sdk-source-sha256.json','build-helper-sha256.json','baseline-dependency-provenance.json.gz']:shutil.copyfile(S/n,W/n)
shutil.copytree(S/'build-helpers',W/'build-helpers')
files=J(W/'tools-observed.json')['files'];before={n:H(Path(v['path']))for n,v in files.items()};assert before=={n:v['sha256']for n,v in files.items()}
helpers=J(W/'build-helper-sha256.json');assert {n:H(R/n)for n in helpers}==helpers
sdkroot=Path(J(W/'tools-observed.json')['sdk_source']);sdk={p.relative_to(sdkroot).as_posix():H(p)for p in sdkroot.rglob('*')if p.is_file()and 'dependencies'not in p.relative_to(sdkroot).parts and not p.name.endswith('-keypair.json')};assert sdk==J(W/'sdk-source-sha256.json')
def dependencies():
 d=json.loads(gzip.decompress((W/'baseline-dependency-provenance.json.gz').read_bytes()));count=0
 for p in d['packages']:
  for f in p['archives']:assert H(R/f['path'])==f['sha256']==p['lock_checksum'];count+=1
  for t in p['source_trees_observed']:
   for n,h in t['source_files_sha256'].items():assert not n.endswith('-keypair.json');assert H(R/t['path']/n)==h;count+=1
 assert len(d['packages'])==252 and count==14281
 return {'registry_packages':252,'files':count,'all_match':True,'inventory_sha256':H(W/'baseline-dependency-provenance.json.gz')}
save('dependency-before.json',dependencies());save('source-sha256.json',source);save('documentation-sha256.json',promotion['documentation_sha256'])
for n,h in promotion['documentation_sha256'].items():assert H(R/n)==h;shutil.copyfile(R/n,W/'README.final.md')
cmd=[sys.executable,'-B',str(R/'scripts/build_partial_candidate.py'),'--manifest',str(R/'programs/pump/Cargo.toml'),'--program','pump','--artifact-name','pump_recovered.so','--tools-version','v1.44','--output',str(B)]
env={**os.environ,'CARGO_HOME':str(R/'work/fees-v144-cargo-home'),'CARGO_NET_OFFLINE':'true','PYTHONDONTWRITEBYTECODE':'1'};save('build-launch.json',{'command':cmd,'source':source,'documentation':promotion['documentation_sha256'],'tool_hashes':before,'sdk_sha256':sdk,'helper_sha256':helpers,'CARGO_HOME':env['CARGO_HOME'],'network_offline':True,'isolated_sdk_rustup_target':True,'scope':'Exactly one clean main build after exact approved four-file metadata patch. No source/compiler/path/flag variants.'})
pre={p.relative_to(W).as_posix():H(p)for p in W.rglob('*')if p.is_file()and not p.name.endswith('-keypair.json')};save('prebuild-manifest.json',pre)
r=subprocess.run(cmd,cwd=R,env=env,capture_output=True,text=True);(W/'build.stdout').write_text(r.stdout);(W/'build.stderr').write_text(r.stderr)
assert all(H(W/n)==h for n,h in pre.items());after={n:H(Path(v['path']))for n,v in files.items()};source_after={n:H(R/n)for n in source};log=(B/'build.log').read_text()if(B/'build.log').exists()else '';fail=[x for x in log.splitlines()if re.search(r'(stack offset .*exceed|stack frame .*exceed|stack.*exceeded|LLVM ERROR|Cannot select:)',x,re.I)]
save('build-result.json',{'returncode':r.returncode,'source_unchanged':source_after==source,'documentation_unchanged':all(H(R/n)==h for n,h in promotion['documentation_sha256'].items()),'tool_hashes_after':after,'tools_unchanged':before==after,'backend_stack_failures':fail,'builds':1,'retries':0});save('dependency-after.json',dependencies());assert r.returncode==0 and not fail and before==after and source_after==source
build=J(B/'build-comparison.json');assert build['source_sha256']==source and build['sdk_source_sha256']==sdk
shutil.copyfile(B/'artifacts/pump_recovered.so',W/'candidate.so');shutil.copyfile(B/'target/sbf-solana-solana/release/pump_recovered.so',W/'unstripped.so');strip=B/'sdk/dependencies/platform-tools/llvm/bin/llvm-objcopy';assert H(strip)==before['stripper']and(B/'sdk/dependencies/platform-tools-v1.52.md').is_file()
phases={'compile':{'selected_version':'v1.44','before':before,'after':after},'strip':{'actual_distribution':'v1.52','actual_path':str(strip.resolve()),'actual_sha256':H(strip),'observed_sdk_link':str((B/'sdk/dependencies/platform-tools').readlink())},'sdk_source_sha256':sdk,'cli':files['cargo-build-sbf'],'candidate':{'sha256':H(W/'candidate.so'),'bytes':(W/'candidate.so').stat().st_size},'symbols':{'sha256':H(W/'unstripped.so'),'bytes':(W/'unstripped.so').stat().st_size}};save('toolchain-phases.json',phases)
ident={n:{'main_sha256':H(W/n),'scratch_sha256':H(S/n),'bytes':(W/n).stat().st_size,'entire_files_equal':(W/n).read_bytes()==(S/n).read_bytes()}for n in ['candidate.so','unstripped.so']};save('main-scratch-identity.json',{'files':ident,'scratch_manifest_sha256':H(S/'manifest.json'),'main_build_report_sha256':H(B/'build-comparison.json'),'scratch_build_report_sha256':H(S/'build/build-comparison.json'),'main_source_sha256':source,'scratch_source_sha256':J(S/'actual-source-sha256.json')})
assert all(v['entire_files_equal']for v in ident.values()),'Identity differs; stop without retry or receipt inheritance'
print(json.dumps({'status':'PASS','build_returncode':0,'source_inputs':37,'documentation_inputs':1,'full_stripped_and_symbol_identity':ident,'full_original_byte_equality':False},indent=2))
