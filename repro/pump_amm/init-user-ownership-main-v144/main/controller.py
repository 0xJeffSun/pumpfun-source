from pathlib import Path
import hashlib,json,os,shutil,subprocess,sys,importlib.util
R=Path.cwd();S=R/'work/amm-init-user-ownership-build';W=R/'work/amm-init-user-ownership-main-control';B=R/'work/amm-init-user-ownership-main'
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
assert not W.exists()and not B.exists(),'One clean main build only'
base=J(S/'accepted-source-sha256.json');source=J(S/'proposed-source-sha256.json');assert len(base)==28 and len(source)==28
for n,h in base.items():assert H(R/n)==h,n
for n,h in source.items():assert H(S/'source'/n)==h,n
assert J(S/'runtime-summary.json')['case_count']==17462 and J(S/'runtime-summary.json')['signature_count']==35418
checks=J(S/'tools-before.json');helpers={n:H(R/n)for n in ['scripts/build_partial_candidate.py','scripts/build_source_manifest.py','scripts/compare.py']}
for n,h in helpers.items():assert H(R/'work/amm-init-user-ownership-build/source'/n)==h,n
for n,row in checks['tools'].items():assert H(Path(n))==row['sha256'],n
assert H(S/'candidate.so')=='3fe52eea99e26866795348aad93fb821f834bf04290b4176a67ae0b7add0fcb5'
a=J(R/'work/layer02-integration/amm19-acceptance.json');assert a['accepted']
for n,h in a['verification_inputs'].items():assert H(R/n)==h,n
W.mkdir();(W/'source/programs/pump-amm').mkdir(parents=True)
shutil.copy2(S/'source/programs/pump-amm/Cargo.lock',W/'source/programs/pump-amm/Cargo.lock')
s=(S/'check_dependencies.py').read_text();assert "CH=W/'cargo-home'"in s;s=s.replace("CH=W/'cargo-home'","CH=R/'work/amm-init-user-ownership-build/cargo-home'");(W/'check_dependencies.py').write_text(s)
def run(cmd,label,env=None):
 p=subprocess.run(cmd,cwd=R,env=env,capture_output=True,text=True);(W/(label+'.stdout')).write_text(p.stdout);(W/(label+'.stderr')).write_text(p.stderr);(W/(label+'-exit.json')).write_text(json.dumps({'returncode':p.returncode,'command':cmd},indent=2)+'\n');p.check_returncode()
run([sys.executable,'-B',str(W/'check_dependencies.py')],'dependencies-before')
assert J(W/'dependency-integrity.json')==J(S/'dependency-integrity-before.json');shutil.copy2(W/'dependency-integrity.json',W/'dependency-integrity-before.json')
readme=H(R/'programs/pump-amm/README.md')
(W/'gate-before.json').write_text(json.dumps({'tools':checks['tools'],'helpers':helpers,'baseline_source':base,'proposed_source':source,'README_sha256':readme},indent=2)+'\n')
shutil.copy2(S/'source/programs/pump-amm/src/lib.rs',R/'programs/pump-amm/src/lib.rs')
for n,h in source.items():assert H(R/n)==h,n
cmd=[sys.executable,'-B',str(R/'scripts/build_partial_candidate.py'),'--manifest',str(R/'programs/pump-amm/Cargo.toml'),'--program','pump_amm','--artifact-name','pump_amm_recovered.so','--tools-version','v1.44','--extra-input',str(R/'programs/pump-amm/vendor/solana-pubkey'),'--output',str(B)]
env={**os.environ,'CARGO_HOME':str(R/'work/amm-init-user-ownership-build/cargo-home'),'CARGO_NET_OFFLINE':'true','PYTHONDONTWRITEBYTECODE':'1'}
(W/'build-launch.json').write_text(json.dumps({'command':cmd,'environment_overrides':{k:env[k]for k in ['CARGO_HOME','CARGO_NET_OFFLINE','PYTHONDONTWRITEBYTECODE']},'attempt_limit':1},indent=2)+'\n');run(cmd,'build',env)
for n,h in source.items():assert H(R/n)==h,n
for n,h in helpers.items():assert H(R/n)==h,n
for n,row in checks['tools'].items():assert H(Path(n))==row['sha256'],n
assert H(R/'programs/pump-amm/README.md')==readme
for n,h in checks['sdk_source'].items():assert H(B/'sdk'/n)==h,n
run([sys.executable,'-B',str(W/'check_dependencies.py')],'dependencies-after');shutil.copy2(W/'dependency-integrity.json',W/'dependency-integrity-after.json');assert J(W/'dependency-integrity-before.json')==J(W/'dependency-integrity-after.json')
r=J(B/'build-comparison.json');assert r['source_sha256']==source and r['sdk_source_sha256']==checks['sdk_source']
x=B/'artifacts/pump_amm_recovered.so';u=B/'target/sbf-solana-solana/release/pump_amm_recovered.so'
i={'candidate_sha256':H(x),'symbols_sha256':H(u),'whole_candidate_equal':x.read_bytes()==(S/'candidate.so').read_bytes(),'whole_symbols_equal':u.read_bytes()==(S/'unstripped.so').read_bytes(),'source':source,'README_sha256_unchanged':readme,'tools_helpers_dependencies_unchanged':True}
(W/'identity.json').write_text(json.dumps(i,indent=2)+'\n');assert i['whole_candidate_equal']and i['whole_symbols_equal'];print(json.dumps(i,indent=2))
