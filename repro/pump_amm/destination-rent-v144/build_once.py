from pathlib import Path
import hashlib,json,os,shutil,subprocess,sys
R=Path.cwd();W=R/'work/amm-destination-rent-main';S=R/'work/cli-swarm-2026-10-25/amm_destination_rent_build';P=S/'publication';B=W/'build-01';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def save(n,x):(W/n).write_text(json.dumps(x,indent=2)+'\n')
assert not B.exists()and not(W/'build-launch.json').exists()
assert H(P/'manifest.json')=='18f29d2a5208328b63e2123ab026ea270b4236ad6a241fa52fbf0620a9e834c4'
base=J(P/'baseline-source-sha256.json');wanted=J(P/'proposed-source-sha256.json');assert len(base)==22
for p,h in base.items():assert H(R/p)==h,p
checks=J(P/'tools-before.json')
for p,row in checks['tools'].items():assert H(Path(p))==row['sha256']
for p,h in checks['build_helpers'].items():
 if isinstance(h,dict):h=h['sha256']
 assert H(R/p)==h,p
sdk=Path(shutil.which('cargo-build-sbf')).resolve().parent/'sdk/sbf'
for p,h in checks['sdk_source'].items():assert H(sdk/p)==h,p
save('baseline-source-sha256.json',base);save('tools-before.json',checks)
# Reuse the exact archive-member integrity algorithm, reading the reviewed isolated cache.
dep=(S/'check_dependencies.py').read_text().replace("W=Path(__file__).resolve().parent",'W=Path('+repr(str(S))+')').replace("(W/'dependency-integrity.json').write_text","(Path("+repr(str(W))+ ")/'dependency-integrity-before.json').write_text")
(W/'check_dependencies_before.py').write_text(dep)
r=subprocess.run([sys.executable,'-B',str(W/'check_dependencies_before.py')],capture_output=True,text=True);(W/'dependency-before.stdout').write_text(r.stdout);(W/'dependency-before.stderr').write_text(r.stderr);assert r.returncode==0
p='programs/pump-amm/src/transfer_creator.rs';data=(P/'source'/p).read_bytes();assert hashlib.sha256(data).hexdigest()==wanted[p];(R/p).write_bytes(data)
for p,h in wanted.items():assert H(R/p)==h,p
save('source-sha256.json',wanted)
cmd=[sys.executable,str(R/'scripts/build_partial_candidate.py'),'--manifest',str(R/'programs/pump-amm/Cargo.toml'),'--program','pump_amm','--artifact-name','pump_amm_recovered.so','--tools-version','v1.44','--output',str(B)]
env={'CARGO_HOME':str(S/'cargo-home'),'CARGO_NET_OFFLINE':'true','PYTHONDONTWRITEBYTECODE':'1'};save('build-launch.json',{'command':cmd,'cwd':str(R),'environment':env,'attempts_authorized':1,'source_sha256':wanted})
r=subprocess.run(cmd,cwd=R,env={**os.environ,**env},capture_output=True,text=True);(W/'build.stdout').write_text(r.stdout);(W/'build.stderr').write_text(r.stderr);save('build-exit.json',{'returncode':r.returncode});assert r.returncode==0
for p,h in wanted.items():assert H(R/p)==h,p
for p,row in checks['tools'].items():assert H(Path(p))==row['sha256']
for p,h in checks['sdk_source'].items():assert H(B/'sdk'/p)==h,p
save('tools-after.json',{'tools':{p:{'sha256':H(Path(p)),'bytes':Path(p).stat().st_size}for p in checks['tools']},'sdk_source':{p:H(B/'sdk'/p)for p in checks['sdk_source']}})
after=dep.replace('dependency-integrity-before.json','dependency-integrity-after.json');(W/'check_dependencies_after.py').write_text(after);r=subprocess.run([sys.executable,'-B',str(W/'check_dependencies_after.py')],capture_output=True,text=True);(W/'dependency-after.stdout').write_text(r.stdout);(W/'dependency-after.stderr').write_text(r.stderr);assert r.returncode==0;assert J(W/'dependency-integrity-before.json')==J(W/'dependency-integrity-after.json')
c=B/'artifacts/pump_amm_recovered.so';s=B/'target/sbf-solana-solana/release/pump_amm_recovered.so';shutil.copyfile(c,W/'candidate.so');shutil.copyfile(s,W/'unstripped.so')
identity={'whole_candidate_equal':c.read_bytes()==(P/'candidate.so').read_bytes(),'whole_symbols_equal':s.read_bytes()==(P/'unstripped.so').read_bytes(),'main_candidate_sha256':H(c),'scratch_candidate_sha256':H(P/'candidate.so'),'main_symbols_sha256':H(s),'scratch_symbols_sha256':H(P/'unstripped.so'),'main_build_report_sha256':H(B/'build-comparison.json'),'scratch_manifest_sha256':H(P/'manifest.json'),'main_source':wanted,'scratch_source':J(P/'proposed-source-sha256.json')};save('main-scratch-identity.json',identity)
assert identity['whole_candidate_equal']and identity['whole_symbols_equal'],'STOP: no receipt transfer'
shutil.copyfile(B/'target/.rustc_info.json',W/'cargo-rustc-info.json')
print(json.dumps(identity,indent=2))
