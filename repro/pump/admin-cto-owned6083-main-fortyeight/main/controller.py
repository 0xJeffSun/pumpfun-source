"""UNRUN until root approval: one gated Pump owned6083 main build, no retry."""
from pathlib import Path
import gzip,hashlib,json,os,re,shutil,subprocess,sys,traceback
R=Path.cwd();S=R/'work/pump-admin-cto-owned6083-build/public';A=R/'work/pump-admin-cto-owned6083-build/acceptance.json';C=R/'work/pump-admin-cto-owned6083-main-control';B=R/'work/pump-admin-cto-owned6083-main'
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
SEAL='aa7cdc0eb3f16c6b1eeb1738c47c2c5b9a2cc6cb70a716f5f4850f8b27fb2005'
CANDIDATE='ffa0f3bab34b8cfca6d6aeef5e6b8dcabad0a16eccfeb3d22d5781e22ae3b193'
SYMBOLS='964c06b5bfa5611f7297a590e53edce44cd38372661ad3bd231e6bc1805496a4'
ACCEPTANCE='4694ab1e6ae04fe233d28511a52e6b603b1abc3dddca0e03f4bec12112a92425'
def save(n,v):(C/n).write_text(json.dumps(v,indent=2)+'\n')
def frozen_gate():
    assert H(S/'manifest.json')==SEAL and (S/'manifest.sha256').read_text().split()[0]==SEAL
    m=J(S/'manifest.json');paths=set()
    for p in S.rglob('*'):
        assert not p.is_symlink()and p.name!='__pycache__'and p.suffix!='.pyc'and not p.name.endswith('-keypair.json'),p
        if p.is_file()and p not in[S/'manifest.json',S/'manifest.sha256']:paths.add(p.relative_to(S).as_posix())
    assert paths==set(m)and len(m)==707
    for n,v in m.items():assert H(S/n)==v['sha256']and(S/n).stat().st_size==v['bytes'],n
    assert H(A)==ACCEPTANCE
    acceptance=J(A);assert acceptance['accepted']and acceptance['manifest_sha256']==SEAL
    assert acceptance['differential_cases']==9269 and acceptance['surfpool_comparisons']==1024
    for n,h in acceptance['verification_inputs'].items():assert H(R/n)==h,n
    assert H(S/'candidate.so')==CANDIDATE and H(S/'unstripped.so')==SYMBOLS
    return {'manifest_sha256':SEAL,'payload_files':len(m),'acceptance_sha256':ACCEPTANCE,'candidate_sha256':CANDIDATE,'symbols_sha256':SYMBOLS}
def main():
    global control_created
    assert not C.exists()and not B.exists(),'One clean main build only; preserve prior attempt and do not retry.'
    C.mkdir();control_created=True
    frozen=frozen_gate();save('frozen-before.json',frozen)
    base=J(S/'baseline-source-sha256.json');source=J(S/'source-sha256.json');assert len(base)==len(source)==37
    assert set(base)==set(source)and {n for n in base if base[n]!=source[n]}=={'programs/pump/src/admin_cto.rs'}
    assert {n:H(R/n)for n in base}==base
    assert {n:H(S/'source'/n)for n in source}==source
    before_source=(S/'approved-proposal/before/admin_cto.rs').read_bytes();after_source=(S/'approved-proposal/proposal/admin_cto.rs').read_bytes()
    old=b'if a.bonding_curve.is_holder_reward&&holder!=Some(true){return Err(err(6083));}'
    new=b'if a.bonding_curve.is_holder_reward&&holder!=Some(true){return Err(error!(PumpError::HolderRewardCreatorImmutable));}'
    assert before_source.count(old)==1 and after_source==before_source.replace(old,new)
    assert (R/'programs/pump/src/admin_cto.rs').read_bytes()==before_source
    assert (S/'source/programs/pump/src/admin_cto.rs').read_bytes()==after_source
    assert all('README'not in n for n in source)
    receipt=J(S/'independent-verification.json');assert receipt['differential_case_count']==9237 and receipt['surfpool_comparisons']==1024 and not receipt['mismatches']
    assert [x['returncode']for x in J(S/'root-runtime-exits.json')]==[0,1,0,1]
    assert J(S/'rechecked-inputs.json')['all_other_inputs_exact']
    tools=J(S/'tools-observed.json');helpers=J(S/'build-helper-sha256.json');sdkroot=Path(tools['sdk_source'])
    def gate():
        toolmap={n:H(Path(v['path']))for n,v in tools['files'].items()};assert toolmap=={n:v['sha256']for n,v in tools['files'].items()}
        actual_helpers={n:H(R/n)for n in helpers};expected_helpers=dict(helpers)
        assert helpers['scripts/build_partial_candidate.py']=='bb683621ffc4297c58f030cb03da54484b7370b786fd8eda965a37f4b3198ee9'
        expected_helpers['scripts/build_partial_candidate.py']='e0eccab6f54fee2996039beb53075d9a7b3f411706a90634a44420dec7b173c1'
        assert actual_helpers==expected_helpers
        assert H(S/'helper-explicit-version-proof/manifest.json')=='eb9173e77c85d1b5e55c8556b52e002ad655e5abe3b8a430a13e5a7fe7cb3223'
        sdk={p.relative_to(sdkroot).as_posix():H(p)for p in sdkroot.rglob('*')if p.is_file()and'dependencies'not in p.relative_to(sdkroot).parts and not p.name.endswith('-keypair.json')};assert sdk==J(S/'sdk-source-sha256.json')
        d=json.loads(gzip.decompress((S/'baseline-dependency-provenance.json.gz').read_bytes()));count=0
        for package in d['packages']:
            for f in package['archives']:assert H(R/f['path'])==f['sha256']==package['lock_checksum'];count+=1
            for tree in package['source_trees_observed']:
                for n,h in tree['source_files_sha256'].items():assert not n.endswith('-keypair.json');assert H(R/tree['path']/n)==h;count+=1
        assert count==14281 and len(d['packages'])==252
        return {'tools':toolmap,'helpers':actual_helpers,'frozen_scratch_helpers':helpers,'helper_transition_proof':'eb9173e77c85d1b5e55c8556b52e002ad655e5abe3b8a430a13e5a7fe7cb3223','sdk':sdk,'dependency_inventory_sha256':H(S/'baseline-dependency-provenance.json.gz'),'dependency_files':count,'registry_packages':252}
    before=gate();save('gate-before.json',before);save('source-before.json',base);save('source-proposed.json',source)
    readme=H(R/'programs/pump/README.md');save('README-before.json',{'sha256':readme,'excluded_from_37_compile_inputs':True})
    verify_cmd=[str(R/'work/test-env/bin/python'),'-B',str(S/'verify.py'),'--current-main',str(R)]
    verification=subprocess.run(verify_cmd,cwd=R,text=True,capture_output=True)
    (C/'scratch-verify.stdout').write_text(verification.stdout);(C/'scratch-verify.stderr').write_text(verification.stderr);save('scratch-verify-exit.json',{'command':verify_cmd,'returncode':verification.returncode});verification.check_returncode()
    shutil.copyfile(S/'source/programs/pump/src/admin_cto.rs',R/'programs/pump/src/admin_cto.rs')
    assert {n:H(R/n)for n in source}==source and H(R/'programs/pump/README.md')==readme
    cmd=[str(R/'work/test-env/bin/python'),'-B',str(R/'scripts/build_partial_candidate.py'),'--manifest',str(R/'programs/pump/Cargo.toml'),'--program','pump','--artifact-name','pump_recovered.so','--tools-version','v1.44','--output',str(B)]
    env={**os.environ,'CARGO_HOME':str(R/'work/fees-v144-cargo-home'),'CARGO_NET_OFFLINE':'true','PYTHONDONTWRITEBYTECODE':'1'}
    save('build-launch.json',{'command':cmd,'environment_overrides':{k:env[k]for k in ['CARGO_HOME','CARGO_NET_OFFLINE','PYTHONDONTWRITEBYTECODE']},'attempt_limit':1,'README_sha256':readme,'controller_sha256':H(Path(__file__).resolve())})
    p=subprocess.run(cmd,cwd=R,env=env,text=True,capture_output=True)
    (C/'build.stdout').write_text(p.stdout);(C/'build.stderr').write_text(p.stderr);save('build-exit.json',{'returncode':p.returncode})
    # Preserve after-gates even when the sole compiler attempt fails.
    after=gate();save('gate-after.json',after);assert before==after
    assert {n:H(R/n)for n in source}==source and H(R/'programs/pump/README.md')==readme
    frozen_after=frozen_gate();save('frozen-after.json',frozen_after);assert frozen_after==frozen
    p.check_returncode()
    report=J(B/'build-comparison.json');assert report['source_sha256']==source and report['sdk_source_sha256']==before['sdk']
    log=(B/'build.log').read_text();errors=[x for x in log.splitlines()if re.search(r'(stack offset .*exceed|stack frame .*exceed|stack.*exceeded|LLVM ERROR|Cannot select:)',x,re.I)];save('backend-diagnostics.json',{'failures':errors});assert not errors,errors
    candidate=B/'artifacts/pump_recovered.so';symbols=B/'target/sbf-solana-solana/release/pump_recovered.so'
    identity={'candidate_sha256':H(candidate),'symbols_sha256':H(symbols),'whole_candidate_equal':candidate.read_bytes()==(S/'candidate.so').read_bytes(),'whole_symbols_equal':symbols.read_bytes()==(S/'unstripped.so').read_bytes(),'source':source,'README_sha256_unchanged':readme,'all_before_after_gates_equal':True,'frozen_manifest_sha256':SEAL}
    save('identity.json',identity);assert identity['whole_candidate_equal']and identity['whole_symbols_equal'];print(json.dumps(identity,indent=2))
if __name__=='__main__':
    control_created=False;code=0;error=None
    try:main()
    except BaseException as exc:
        code=130 if isinstance(exc,KeyboardInterrupt)else 1;error={'type':type(exc).__name__,'message':str(exc)};traceback.print_exc()
    finally:
        if control_created:save('runner-exit.json',{'returncode':code,'error':error,'controller_sha256':H(Path(__file__).resolve()),'one_build_attempt_only':True})
    raise SystemExit(code)
