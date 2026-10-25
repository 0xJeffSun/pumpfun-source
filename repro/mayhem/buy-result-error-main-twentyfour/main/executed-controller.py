from pathlib import Path
import hashlib,json,os,shutil,subprocess,sys
R=Path.cwd();S=R/'work/mayhem-result-error-build';W=R/'work/mayhem-result-main-control';B=R/'work/mayhem-buy-result-error-main'
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
assert not W.exists() and not B.exists(),'One clean main build only'
g=J(S/'gate-before.json');accepted=J(S/'summary.json')
assert accepted['instruction_comparisons']==9595 and accepted['functional_mismatches']==0
assert accepted['burn_source_location_mismatch_rows']==3
assert len(J(S/'verification/results.json'))==15 and all(x['returncode']==0 for x in J(S/'verification/results.json'))
changed=['programs/mayhem/src/instructions/buy_pump_swap.rs','programs/mayhem/src/instructions/pump_swap_types.rs']
expected=dict(g['main_sources'])
for n in changed:expected[n]=H(S/'source'/n)
for group in ['main_sources','helpers','runtime_inputs','tools']:
    for n,h in g[group].items():assert H(R/n)==h,(group,n)
for n,h in expected.items():assert H(S/'source'/n)==h,n
candidate=S/'build01/artifacts/mayhem_recovered.so';symbols=S/'build01/target/sbf-solana-solana/release/mayhem_recovered.so'
assert H(candidate)==accepted['candidate_sha256']=='dda5554a2faf8aa40fc86547e91c4b32c6ac44b878073dcb8bd9f7ac60b47cd4'
assert H(symbols)=='f356e4a5c28ba6b5fb2312c6799470a0ffc9e8bec39984650de33797042ba1d2'
W.mkdir();(W/'source/programs/mayhem').mkdir(parents=True);(W/'build01').mkdir()
for source,dest in [(S/'source/programs/mayhem/Cargo.lock',W/'source/programs/mayhem/Cargo.lock'),(S/'check_dependencies.py',W/'check_dependencies.py'),(S/'build01/build-comparison.json',W/'build01/build-comparison.json')]:shutil.copyfile(source,dest)
def run(cmd,name,env=None):
    p=subprocess.run(cmd,cwd=R,env=env,capture_output=True,text=True)
    (W/(name+'.stdout')).write_text(p.stdout);(W/(name+'.stderr')).write_text(p.stderr)
    (W/(name+'-exit.json')).write_text(json.dumps({'returncode':p.returncode,'command':cmd},indent=2)+'\n');p.check_returncode()
run([sys.executable,'-B',str(W/'check_dependencies.py')],'dependencies-before')
assert J(W/'dependency-integrity.json')==J(S/'dependency-integrity.json')
shutil.copyfile(W/'dependency-integrity.json',W/'dependency-integrity-before.json')
(W/'inputs-before.json').write_text(json.dumps({'baseline':g,'proposed_main_sources':expected,'scratch_candidate_sha256':H(candidate),'scratch_symbols_sha256':H(symbols),'scratch_summary_sha256':H(S/'summary.json')},indent=2)+'\n')
for n in changed:shutil.copyfile(S/'source'/n,R/n)
for n,h in expected.items():assert H(R/n)==h,n
cmd=[sys.executable,'-B',str(R/'scripts/build_partial_candidate.py'),'--manifest',str(R/'programs/mayhem/Cargo.toml'),'--program','mayhem','--artifact-name','mayhem_recovered.so','--tools-version','v1.52','--output',str(B)]
env={**os.environ,'CARGO_HOME':str(R/'work/mayhem-burn-fixtures/cargo-home'),'CARGO_NET_OFFLINE':'true','PYTHONDONTWRITEBYTECODE':'1'}
(W/'build-launch.json').write_text(json.dumps({'command':cmd,'environment_overrides':{k:env[k] for k in ['CARGO_HOME','CARGO_NET_OFFLINE','PYTHONDONTWRITEBYTECODE']},'attempt_limit':1},indent=2)+'\n')
run(cmd,'build',env)
for group,mapping in [('main_sources',expected),*[(k,g[k]) for k in ['helpers','runtime_inputs','tools']]]:
    for n,h in mapping.items():assert H(R/n)==h,(group,n)
shutil.copyfile(B/'build-comparison.json',W/'build01/build-comparison.json')
run([sys.executable,'-B',str(W/'check_dependencies.py')],'dependencies-after')
shutil.copyfile(W/'dependency-integrity.json',W/'dependency-integrity-after.json')
assert J(W/'dependency-integrity-before.json')==J(W/'dependency-integrity-after.json')
main_candidate=B/'artifacts/mayhem_recovered.so';main_symbols=B/'target/sbf-solana-solana/release/mayhem_recovered.so'
identity={'candidate_sha256':H(main_candidate),'symbols_sha256':H(main_symbols),'whole_candidate_equal':main_candidate.read_bytes()==candidate.read_bytes(),'whole_symbols_equal':main_symbols.read_bytes()==symbols.read_bytes(),'main_sources':expected,'unchanged_helpers_runtime_tools':True,'README_changed_during_build':False}
(W/'identity.json').write_text(json.dumps(identity,indent=2)+'\n')
assert identity['whole_candidate_equal'] and identity['whole_symbols_equal']
log=(B/'build.log').read_text();assert not any(x in log for x in ['Stack offset','LLVM ERROR','Error: Function'])
print(json.dumps(identity,indent=2))
