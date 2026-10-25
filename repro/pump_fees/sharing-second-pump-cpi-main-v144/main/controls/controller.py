# UNEXECUTED: requires root fees21-acceptance.json after runtime and saved verification complete.
from pathlib import Path
import hashlib,json,os,shutil,subprocess,sys
R=Path.cwd();S=R/'work/fees-sharing-second-pump-cpi-build';W=R/'work/fees-sharing-second-pump-cpi-main-control';B=R/'work/fees-sharing-second-pump-cpi-main';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
CONTROL_CREATED=False
def main():
    global CONTROL_CREATED
    assert not W.exists()and not B.exists(),'One clean main build only'
    ACCEPT=R/'work/layer02-integration/fees21-acceptance.json'
    root_acceptance=J(ACCEPT);assert root_acceptance['accepted']
    PUBLIC=S/'public'
    assert H(PUBLIC/'manifest.json')==root_acceptance['scratch_manifest_sha256']
    manifest=J(PUBLIC/'manifest.json')
    assert {str(p.relative_to(PUBLIC))for p in PUBLIC.rglob('*')if p.is_file()and p.name not in ['manifest.json','manifest.sha256']}==set(manifest)
    assert not list(PUBLIC.rglob('*.pyc'))
    for n,h in manifest.items():assert H(PUBLIC/n)==h,n
    for n,h in J(S/'acceptance-manifest.json').items():assert H(S/n)==h,n
    a=J(S/'acceptance.json');assert a['accepted']and a['candidate_sha256']=='466725afe7406860177df56696a60897874ffa6dab7429e5cc62da087dbf48b5'
    assert a['symbols_sha256']=='31604790201a414dfe4bd2a8515eb213b3731ad0c36be61da56dc2a123d91d7e'
    assert a['comparison_receipts']==17461 and a['sequence_steps_separate']==10 and a['functional_mismatches']==0
    assert a==J(PUBLIC/'acceptance.json')
    for n,h in root_acceptance['verification_inputs'].items():assert H(R/n)==h,n
    g=J(S/'gate-before.json');base=g['source'];assert len(base)==26
    for n,h in base.items():assert H(R/n)==h,n
    for n,h in g['helpers'].items():assert H(R/n)==h,n
    tools=g['tools']
    for v in [*tools['compile_tools'].values(),tools['strip_tool'],tools['cli']]:assert H(Path(v['resolved_path']))==v['sha256']
    CACHE=R/'work/fees-v2-caller-build/cargo-home'
    def deps():return {str(p.relative_to(CACHE)):H(p)for directory in ['registry/cache','registry/src']for p in(CACHE/directory).rglob('*')if p.is_file()}
    predeps=deps();assert predeps==J(S/'dependency-after.json')==J(S/'dependency-before.json')
    assert g['baseline']=='6c87132fd95d0e2d4f1ba416667f1084e6a60937280639c473caeae8483e1887'
    patches=['programs/pump-fees/src/sharing.rs']
    assert set(g['only_source_change'])==set(patches)
    source=dict(base)
    for n in patches:source[n]=H(S/'source'/n)
    readme=S/a['readme_proposal'];assert H(readme)==a['readme_proposal_sha256']==root_acceptance['readme_proposal_sha256']
    source['programs/pump-fees/README.md']=H(readme)
    assert {n for n in base if source[n]!=base[n]}==set(patches)|{'programs/pump-fees/README.md'}
    assert {n for n in source if source[n]!=g['scratch_source'][n]}=={'programs/pump-fees/README.md'}
    W.mkdir();CONTROL_CREATED=True;(W/'source-before.json').write_text(json.dumps(base,indent=2)+'\n');(W/'source-proposed.json').write_text(json.dumps(source,indent=2)+'\n');(W/'dependency-before.json').write_text(json.dumps(predeps,indent=2)+'\n');(W/'gate-before.json').write_text(json.dumps(g,indent=2)+'\n')
    for n in patches:shutil.copy2(S/'source'/n,R/n)
    shutil.copy2(readme,R/'programs/pump-fees/README.md')
    cmd=[sys.executable,'-B',str(R/'scripts/build_partial_candidate.py'),'--manifest',str(R/'programs/pump-fees/Cargo.toml'),'--program','pump_fees','--artifact-name','pump_fees_candidate.so','--tools-version','v1.44','--output',str(B),'--extra-input',str(R/'programs/pump-fees/README.md')]
    env={**os.environ,'CARGO_HOME':str(CACHE),'CARGO_NET_OFFLINE':'true','PYTHONDONTWRITEBYTECODE':'1'}
    (W/'build-launch.json').write_text(json.dumps({'command':cmd,'environment_overrides':{k:env[k]for k in ['CARGO_HOME','CARGO_NET_OFFLINE','PYTHONDONTWRITEBYTECODE']},'attempt_limit':1,'intentional_scratch_source_difference':'README only, included as explicit source input'},indent=2)+'\n')
    p=subprocess.run(cmd,cwd=R,env=env,capture_output=True,text=True);(W/'build.stdout').write_text(p.stdout);(W/'build.stderr').write_text(p.stderr);(W/'build-exit.json').write_text(json.dumps({'returncode':p.returncode})+'\n');p.check_returncode()
    assert {n:H(R/n)for n in source}==source
    for n,h in g['helpers'].items():assert H(R/n)==h,n
    for v in [*tools['compile_tools'].values(),tools['strip_tool'],tools['cli']]:assert H(Path(v['resolved_path']))==v['sha256']
    after=deps();(W/'dependency-after.json').write_text(json.dumps(after,indent=2)+'\n');assert after==predeps
    report=J(B/'build-comparison.json')
    for key in ['selected_toolchain','rustc_sha256','sdk_source_sha256']:assert report[key]==J(S/'build-01/build-comparison.json')[key],key
    strip=B/'sdk/dependencies/platform-tools/llvm/bin/llvm-objcopy';assert H(strip)==tools['strip_tool']['sha256'] and (B/'sdk/dependencies/platform-tools-v1.52.md').is_file()
    attempt=J(B/'build-attempt.json');assert report['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']==source and attempt['source_unchanged']
    for n,h in tools['sdk_template_files'].items():assert H(B/'sdk'/n)==h,n
    log=(B/'build.log').read_text();assert not any(v in log.lower()for v in ['stack offset','stack frame','stack size','stack overflow','llvm error','error: function'])
    x=B/'artifacts/pump_fees_candidate.so';u=B/'target/sbf-solana-solana/release/pump_fees_candidate.so';identity={'whole_candidate_equal':x.read_bytes()==(PUBLIC/'build01/candidate.so').read_bytes(),'whole_symbols_equal':u.read_bytes()==(PUBLIC/'build01/symbols.so').read_bytes(),'candidate_sha256':H(x),'symbols_sha256':H(u),'main_source_sha256':source,'scratch_source_sha256':g['scratch_source'],'main_scratch_input_difference':['programs/pump-fees/README.md'],'helpers_tools_dependencies_unchanged':True}
    (W/'identity.json').write_text(json.dumps(identity,indent=2)+'\n');assert identity['whole_candidate_equal']and identity['whole_symbols_equal'];print(json.dumps(identity,indent=2))

if __name__=='__main__':
    try:
        main()
    except BaseException as exc:
        if CONTROL_CREATED:
            (W/'runner-exit.json').write_text(json.dumps({'returncode':1,'exception_type':type(exc).__name__,'message':str(exc)})+'\n')
        raise
    else:
        (W/'runner-exit.json').write_text(json.dumps({'returncode':0})+'\n')
