from pathlib import Path
import json,hashlib,subprocess,os,sys,shutil,tomllib,importlib.util
W=Path(__file__).resolve().parent;S=W/'source';crate=S/'programs/pump-amm';vendor=crate/'vendor/solana-pubkey';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def save(n,x):(W/n).write_text(json.dumps(x,indent=2)+'\n')
def run(cmd,name,env=None):
 p=subprocess.run(cmd,cwd=S,env=env,capture_output=True,text=True);(W/(name+'.stdout')).write_text(p.stdout);(W/(name+'.stderr')).write_text(p.stderr);save(name+'-exit.json',{'returncode':p.returncode});p.check_returncode()
assert not (W/'build-01').exists()and not(W/'build-launch.json').exists()
checks=json.loads((W/'tools-before.json').read_text())
for p,row in checks['tools'].items():assert H(Path(p))==row['sha256'],p
run([sys.executable,'-B',str(W/'check_dependencies.py')],'dependency-baseline')
shutil.copy2(W/'dependency-integrity.json',W/'dependency-integrity-baseline.json')
env={**os.environ,'CARGO_HOME':str(W/'cargo-home'),'CARGO_NET_OFFLINE':'true','PYTHONDONTWRITEBYTECODE':'1'}
cargo='/Users/shawwalters/.cache/solana/v1.44/platform-tools/rust/bin/cargo';assert H(Path(cargo))==checks['tools'][cargo]['sha256']
cmd=[cargo,'update','-p','solana-pubkey','--manifest-path',str(crate/'Cargo.toml'),'--offline'];save('lock-command.json',{'command':cmd,'cargo_sha256':H(Path(cargo))});run(cmd,'lock-update',env)
before=tomllib.loads((W/'Cargo.lock.before').read_text());after=tomllib.loads((crate/'Cargo.lock').read_text());a={(p['name'],p['version']):p for p in before['package']};b={(p['name'],p['version']):p for p in after['package']};assert a.keys()==b.keys()
changes={str(k):{'before':a[k],'after':b[k]}for k in a if a[k]!=b[k]};assert set(changes)=={"('solana-pubkey', '2.4.0')"},changes
x=a[('solana-pubkey','2.4.0')];y=b[('solana-pubkey','2.4.0')];assert set(x)-set(y)=={'source','checksum'};assert set(y)=={'name','version','dependencies'};assert sorted(y['dependencies'])==sorted(x['dependencies']+['bs58'])
save('lock-delta.json',{'changes':changes,'all_package_versions_unchanged':True,'all_other_package_records_unchanged':True,'only_new_dependency_edge':'solana-pubkey -> bs58','five8_package_record_unchanged':a[('five8','0.2.1')]==b[('five8','0.2.1')]});shutil.copy2(crate/'Cargo.lock',W/'Cargo.lock.after')
run([sys.executable,'-B',str(W/'check_dependencies.py')],'dependency-before')
shutil.copy2(W/'dependency-integrity.json',W/'dependency-integrity-before.json')
spec=importlib.util.spec_from_file_location('source_manifest',S/'scripts/build_source_manifest.py');mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)
source=mod.source_manifest(crate,crate,S,[vendor],cwd=S);save('proposed-source-sha256.json',source)
cmd=[sys.executable,'-B',str(S/'scripts/build_partial_candidate.py'),'--manifest',str(crate/'Cargo.toml'),'--program','pump_amm','--artifact-name','pump_amm_recovered.so','--tools-version','v1.44','--extra-input',str(vendor),'--output',str(W/'build-01')]
save('build-launch.json',{'command':cmd,'environment_overrides':{k:env[k]for k in ['CARGO_HOME','CARGO_NET_OFFLINE','PYTHONDONTWRITEBYTECODE']},'authorized_build_attempts':1,'explicit_extra_input':str(vendor),'source_sha256':source});run(cmd,'build',env)
assert mod.source_manifest(crate,crate,S,[vendor],cwd=S)==source
for p,row in checks['tools'].items():assert H(Path(p))==row['sha256'],p
sdk={p:H(W/'build-01/sdk'/p)for p in checks['sdk_source']};assert sdk==checks['sdk_source'];save('tools-after.json',{'tools':checks['tools'],'sdk_source':sdk})
run([sys.executable,'-B',str(W/'check_dependencies.py')],'dependency-after');shutil.copy2(W/'dependency-integrity.json',W/'dependency-integrity-after.json');assert (W/'dependency-integrity-before.json').read_bytes()==(W/'dependency-integrity-after.json').read_bytes()
for name,src in [('candidate.so',W/'build-01/artifacts/pump_amm_recovered.so'),('unstripped.so',W/'build-01/target/sbf-solana-solana/release/pump_amm_recovered.so')]:shutil.copy2(src,W/name)
print(json.dumps({'build_returncode':0,'candidate_sha256':H(W/'candidate.so'),'symbol_sha256':H(W/'unstripped.so'),'source_files':len(source)}))
