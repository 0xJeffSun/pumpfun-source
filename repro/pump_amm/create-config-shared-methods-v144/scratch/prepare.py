from pathlib import Path
import hashlib,json,shutil,subprocess,sys
R=Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source');W=R/'work/amm-create-config-build';P=R/'work/amm-create-config-source-proposal';old=R/'work/amm-scalar-setter-build';sha=lambda b:hashlib.sha256(b).hexdigest()
assert sha((P/'manifest.json').read_bytes())=='12b3943b4fefbb510c0f7786caf42ade28aeca0031a518a455e3e4d95236b6d8'
W.mkdir(exist_ok=False)
# Read/copy only explicit sealed payload paths, excluding generated keys before opening.
for s in [*json.loads((P/'manifest.json').read_text())['files'],'manifest.json']:
 p=Path(s);assert not p.is_absolute()and '..'not in p.parts and not p.name.endswith('-keypair.json');q=W/'prebuild'/p;q.parent.mkdir(parents=True,exist_ok=True);q.write_bytes((P/p).read_bytes())
prop=json.loads((P/'proposed-source-sha256.json').read_text())
for s,h in prop.items():
 b=(P/'source'/s).read_bytes();assert sha(b)==h;q=W/'source'/s;q.parent.mkdir(parents=True,exist_ok=True);q.write_bytes(b)
for name in ['baseline-source-sha256.json','proposed-source-sha256.json']:(W/name).write_bytes((P/name).read_bytes())
for name in ['record_phases.py','observe_suite.py','check_dependencies.py']:(W/name).write_bytes((old/name).read_bytes())
s=(W/'check_dependencies.py').read_text().replace('Postbuild read-only cache integrity','Prebuild read-only cache integrity').replace('This is not a prebuild observation or proof of the historical dependency graph.','This verifies the current local dependencies before this build; it is not proof of the historical dependency graph.')
(W/'check_dependencies.py').write_text(s)
s=(old/'run_regressions.py').read_text().replace("==18","==22").replace('clean18-input','clean22-input').replace("assert row['transaction_count']==2*row['case_count'],row","assert row['transaction_count']==2*row['case_count']+(150 if row['suite']=='boost'else 0),row").replace("'new_cases':0,'mismatches'","'comparison_transactions':34924,'existing_setup_transactions':150,'new_cases':0,'mismatches'")
(W/'run_regressions.py').write_text(s)
for name in ['build_partial_candidate.py','build_source_manifest.py','compare.py','analyze.py']:
 q=W/'build-helper-snapshot/scripts'/name;q.parent.mkdir(parents=True,exist_ok=True);q.write_bytes((R/'scripts'/name).read_bytes())
B=R/'repro/pump_amm/pool-serialization-thirty-seven';harness={p:h for p,h in json.loads((B/'test-source-sha256.json').read_text()).items()if p.startswith('scripts/')};runtime=json.loads((B/'runtime-input-sha256.json').read_text());maps={}
extra=['repro/pump_amm/pool-serialization-thirty-seven/replay-commands.json','repro/pump_amm/pool-serialization-thirty-seven/summary.json','repro/pump_amm/pool-serialization-thirty-seven/test-source-sha256.json','repro/pump_amm/pool-serialization-thirty-seven/runtime-input-sha256.json','repro/pump_amm/scalar-guard-order-v144/fee_config-differential.json.gz']
for s,h in {**harness,**runtime,**{s:sha((R/s).read_bytes())for s in extra}}.items():
 p=Path(s);assert not p.is_absolute()and '..'not in p.parts and not p.name.endswith('-keypair.json');b=(R/p).read_bytes();assert sha(b)==h,p;q=W/'inputs'/p;q.parent.mkdir(parents=True,exist_ok=True);q.write_bytes(b);maps[s]={'sha256':h,'bytes':len(b)}
(W/'frozen-inputs.json').write_text(json.dumps({'source':prop,'maintained_harness':harness,'runtime':runtime,'input_snapshots':maps,'local_runner_files':{n:sha((W/n).read_bytes())for n in ['run_regressions.py','observe_suite.py','record_phases.py','check_dependencies.py']},'build_helpers':{str(p.relative_to(W/'build-helper-snapshot')):sha(p.read_bytes())for p in(W/'build-helper-snapshot').rglob('*.py')}},indent=2)+'\n')
(W/'authorization.json').write_text(json.dumps({'reviewed_proposal_seal':'12b3943b4fefbb510c0f7786caf42ade28aeca0031a518a455e3e4d95236b6d8','recipe':'One pinned v1.44 source build, existing SDK strip behavior recorded separately; isolated SDK/rustup/target.','source_inputs':22,'unchanged_runtime_comparisons':17462,'initializer_status':'static-only; no success fixture, no signer substitution, no altered historical payload','main_source_edits':False,'source_or_compiler_variant_search':False},indent=2)+'\n')
print(json.dumps({'workspace':str(W),'source_inputs':len(prop),'harness':len(harness),'runtime':len(runtime),'snapshots':len(maps)},indent=2))
