from pathlib import Path
import hashlib,json,shutil,os
W=Path(__file__).resolve().parent
R=Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source')
P=R/'repro/pump_amm/update-event-borrow-v144'
Q=R/'repro/layered-passes/pass-01/followup-results/amm-transfer-creator'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def save(p,d):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(d,indent=2)+'\n')
def copy(a,b):
 assert not a.name.endswith('-keypair.json');b.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(a,b)
assert sha(P/'manifest.json')=='8b850d6bf0ba8a302f135ec3f1b90ef1e25ac7e4f8ebb1a6c9e9618b2d9236b5'
assert sha(Q/'manifest.json')=='c4f7f087e0d093a3c962fd1212af539b7650f1296cdae350658c7c28bd739930'
pm=json.loads((P/'manifest.json').read_text())
for path,row in pm['files'].items():
 assert not Path(path).name.endswith('-keypair.json');assert sha(P/path)==row['sha256'],path
copy(P/'manifest.json',W/'provenance/accepted-manifest.json');copy(Q/'manifest.json',W/'provenance/proposal-manifest.json')
assert sha(Q/'proposal/destination-rent.patch')=='f1c1fe8eb77bbbf9452c59c20744d1e9346e493f6d3a65744aa04123f92fa1d3'
copy(Q/'proposal/destination-rent.patch',W/'destination-rent.patch')
b=json.loads((P/'build-attempt.json').read_text())['source_sha256'];assert len(b)==22
for p,h in b.items():
 assert sha(R/p)==h,p
 assert sha(P/'source'/p)==h,p
 copy(P/'source'/p,W/'source'/p)
f=W/'source/programs/pump-amm/src/transfer_creator.rs';raw=f.read_bytes();assert sha(f)=='a9c11eb18cd6e246e03221699abaf7fa9023253c492921b6c2876978555aebb3'
assert raw.count(b'rent.minimum_balance(0)')==1
f.write_bytes(raw.replace(b'rent.minimum_balance(0)',b'rent.minimum_balance(destination.data_len())'))
save(W/'baseline-source-sha256.json',b);save(W/'proposed-source-sha256.json',{p:sha(W/'source'/p)for p in b})
for p in ['tools-before.json','check_dependencies.py','run_regressions.py','observe_suite.py','verify_runtime.py','frozen-inputs.json']:
 copy(P/'scratch'/p,W/'provenance'/p)
for p in ['build-attempt.json','build-comparison.json','toolchain-phases.json','current-main-bindings.json']:
 copy(P/p,W/'provenance'/p)
for p in (P/'build-helper-snapshot/scripts').iterdir():copy(p,W/'source/scripts'/p.name)
# A private writable registry avoids altering the public cache, with keypair paths omitted.
ch=R/'work/pump-amm-v144/cargo-home'
shutil.copytree(ch/'registry',W/'cargo-home/registry',ignore=shutil.ignore_patterns('*-keypair.json'))
src=(W/'provenance/check_dependencies.py').read_text().replace("R=W.parents[1];CH=R/'work/pump-amm-v144/cargo-home'","R=Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source');CH=W/'cargo-home'")
(W/'check_dependencies.py').write_text(src)
t=json.loads((W/'provenance/tools-before.json').read_text());sdk=Path(next(iter(t['tools']))).parent/'sdk/sbf'
for p,h in t['sdk_source'].items():assert sha(sdk/p)==h,p
for p,row in t['tools'].items():assert sha(Path(p))==row['sha256'],p
assert Path('/Users/shawwalters/.cache/solana/v2.3.2/criterion').is_dir()
save(W/'tools-before.json',t)
save(W/'preflight-source.json',{'accepted_package_manifest':sha(P/'manifest.json'),'approved_patch_package_manifest':sha(Q/'manifest.json'),'source_count':len(b),'current_source_matches_accepted':True,'sole_change':'rent.minimum_balance(0) -> rent.minimum_balance(destination.data_len())','source_after':{p:sha(W/'source'/p)for p in b},'cache_isolation':'Private registry copy; generated keypair paths excluded; no config or credential stores copied','log_policy':'Mutable orchestration logs are not immutable source inputs'})
print('Source, package, tools and SDK preflight passed; dependency validation next.',flush=True)
