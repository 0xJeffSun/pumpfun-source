from pathlib import Path
import gzip,hashlib,json,os,re,shutil,subprocess,sys
R=Path.cwd();S=R/'work/pump-buy-mode-order-build';C=R/'work/pump-buy-mode-order-main-control';B=R/'work/pump-buy-mode-order-main'
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
assert not C.exists() and not B.exists(),'One clean main build only'
base=J(S/'baseline-source-sha256.json');source=J(S/'source-sha256.json');assert len(base)==len(source)==37
assert {n for n in base if base[n]!=source[n]}=={'programs/pump/src/trade.rs'}
assert {n:H(R/n) for n in base}==base
assert {n:H(S/'source'/n) for n in source}==source
receipt=J(S/'verify-receipts.stdout');assert receipt['differential_case_count']==9237 and receipt['surfpool_comparisons']==1024 and not receipt['mismatches']
assert H(S/'candidate.so')=='bc6775052d8d335907d2a797113a4bb8e0008f07fa9d69c7597984fda9887314'
assert H(S/'unstripped.so')=='b029fb7c5f3621c54bd5ad3a8c203ba73dbed8f152728a45d9be583025aac9ee'
tools=J(S/'tools-observed.json');helpers=J(S/'build-helper-sha256.json');sdkroot=Path(tools['sdk_source'])
def gate():
    toolmap={n:H(Path(v['path']))for n,v in tools['files'].items()};assert toolmap=={n:v['sha256']for n,v in tools['files'].items()}
    assert {n:H(R/n) for n in helpers}==helpers
    sdk={p.relative_to(sdkroot).as_posix():H(p)for p in sdkroot.rglob('*')if p.is_file()and 'dependencies'not in p.relative_to(sdkroot).parts and not p.name.endswith('-keypair.json')};assert sdk==J(S/'sdk-source-sha256.json')
    d=json.loads(gzip.decompress((S/'baseline-dependency-provenance.json.gz').read_bytes()));count=0
    for package in d['packages']:
        for f in package['archives']:assert H(R/f['path'])==f['sha256']==package['lock_checksum'];count+=1
        for tree in package['source_trees_observed']:
            for n,h in tree['source_files_sha256'].items():assert not n.endswith('-keypair.json');assert H(R/tree['path']/n)==h;count+=1
    assert count==14281 and len(d['packages'])==252
    return {'tools':toolmap,'helpers':helpers,'sdk':sdk,'dependency_inventory_sha256':H(S/'baseline-dependency-provenance.json.gz'),'dependency_files':count,'registry_packages':252}
before=gate();C.mkdir();(C/'gate-before.json').write_text(json.dumps(before,indent=2)+'\n')
(C/'source-before.json').write_text(json.dumps(base,indent=2)+'\n');(C/'source-proposed.json').write_text(json.dumps(source,indent=2)+'\n')
readme=H(R/'programs/pump/README.md')
shutil.copyfile(S/'source/programs/pump/src/trade.rs',R/'programs/pump/src/trade.rs')
assert {n:H(R/n)for n in source}==source
cmd=[str(R/'work/test-env/bin/python'),'-B',str(R/'scripts/build_partial_candidate.py'),'--manifest',str(R/'programs/pump/Cargo.toml'),'--program','pump','--artifact-name','pump_recovered.so','--tools-version','v1.44','--output',str(B)]
env={**os.environ,'CARGO_HOME':str(R/'work/fees-v144-cargo-home'),'CARGO_NET_OFFLINE':'true','PYTHONDONTWRITEBYTECODE':'1'}
(C/'build-launch.json').write_text(json.dumps({'command':cmd,'environment_overrides':{k:env[k]for k in ['CARGO_HOME','CARGO_NET_OFFLINE','PYTHONDONTWRITEBYTECODE']},'attempt_limit':1},indent=2)+'\n')
p=subprocess.run(cmd,cwd=R,env=env,text=True,capture_output=True)
(C/'build.stdout').write_text(p.stdout);(C/'build.stderr').write_text(p.stderr);(C/'build-exit.json').write_text(json.dumps({'returncode':p.returncode})+'\n');p.check_returncode()
after=gate();(C/'gate-after.json').write_text(json.dumps(after,indent=2)+'\n');assert before==after
assert {n:H(R/n)for n in source}==source and H(R/'programs/pump/README.md')==readme
report=J(B/'build-comparison.json');assert report['source_sha256']==source and report['sdk_source_sha256']==before['sdk']
log=(B/'build.log').read_text();errors=[x for x in log.splitlines()if re.search(r'(stack offset .*exceed|stack frame .*exceed|stack.*exceeded|LLVM ERROR|Cannot select:)',x,re.I)];assert not errors,errors
candidate=B/'artifacts/pump_recovered.so';symbols=B/'target/sbf-solana-solana/release/pump_recovered.so'
identity={'candidate_sha256':H(candidate),'symbols_sha256':H(symbols),'whole_candidate_equal':candidate.read_bytes()==(S/'candidate.so').read_bytes(),'whole_symbols_equal':symbols.read_bytes()==(S/'unstripped.so').read_bytes(),'source':source,'README_sha256_unchanged':readme,'all_before_after_gates_equal':True}
(C/'identity.json').write_text(json.dumps(identity,indent=2)+'\n');assert identity['whole_candidate_equal']and identity['whole_symbols_equal'];print(json.dumps(identity,indent=2))
