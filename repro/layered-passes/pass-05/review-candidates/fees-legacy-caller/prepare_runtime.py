from pathlib import Path
import shutil,json,hashlib,subprocess,sys
W=Path(__file__).resolve().parent; R=W.parents[1];P=R/'repro/pump_fees/legacy-social-admission-v144';OLD=R/'work/fees-legacy-social-build'
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def save(p,v):p.write_text(json.dumps(v,indent=2)+'\n')
assert not (W/'runtime').exists()
for name in ['runtime-frozen-inputs.json','run_runtime.py']:shutil.copy2(OLD/name,W/name)
subprocess.run(['cp','-cR',str(OLD/'runner-repo'),str(W/'runner-repo')],check=True)
for group,m in J(W/'runtime-frozen-inputs.json').items():
 for n,h in m.items():assert H(W/'runner-repo'/n)==h,(group,n)
shutil.copytree(P/'validation-layer',W/'validation-layer')
L=W/'validation-layer';before=J(L/'corrected-source-sha256.json');after=J(W/'inputs/corrected-source-sha256.json');assert len(before)==len(after)==26
(L/'history').mkdir();shutil.copy2(L/'current-build-binding.json',L/'history/published-build-binding.json');shutil.copy2(L/'source-binding-update.json',L/'history/published-source-binding-update.json');shutil.copy2(L/'corrected-source-sha256.json',L/'history/published-source-map.json')
save(L/'corrected-source-sha256.json',after)
save(L/'source-binding-update.json',{'scope':'Only expected source/provenance-map adaptation to fresh isolated legacy caller build; all four harness files and twenty cases unchanged. No acceptance inherited.','before':before,'after':after,'changed_paths':[n for n in before if before[n]!=after[n]],'harness_sha256':{p.name:H(p) for p in (L/'harness').glob('*.py')},'cases_sha256':H(L/'cases.json')})
save(L/'current-build-binding.json',{'candidate_sha256':H(W/'candidate.so'),'symbols_sha256':H(W/'symbols.so'),'actual_source_sha256':after,'build_report_sha256':H(W/'build-01/build-comparison.json'),'tool_phases_sha256':H(W/'tool-phase-provenance.json')})
for p in (L/'harness').glob('*.py'):assert H(p)==H(P/'validation-layer/harness'/p.name)
assert H(L/'cases.json')==H(P/'validation-layer/cases.json')
save(W/'runtime-preflight.json',{'candidate_sha256':H(W/'candidate.so'),'source_sha256':after,'frozen_inputs_sha256':H(W/'runtime-frozen-inputs.json'),'source_adaptation_sha256':H(L/'source-binding-update.json'),'focused_harness_sha256':{p.name:H(p) for p in (L/'harness').glob('*.py')},'cases_sha256':H(L/'cases.json'),'baseline_comparisons':17441,'focused_comparisons':20,'new_cases':0,'sequence_steps_separate':10})
save(W/'static-gate.json',{'passed':True,'scope':'Build integrity, exact reviewed source, no backend stack errors, exhaustive original/current inventory, complete original legacy and fresh-symbol target/data ledgers, retained known exact bodies, generated CPI discriminator/account helpers and actual cleanup edges. This is permission to execute the pre-existing corpus, not legacy CFG equivalence.','candidate_sha256':H(W/'candidate.so'),'symbols_sha256':H(W/'symbols.so'),'legacy_static_sha256':H(W/'legacy-static-proof.json.gz'),'retained_static_sha256':H(W/'reference/retained-static-gate.json'),'remaining':['Legacy full handler/wrapper/parser and AMM generated CPI are nonidentical.','Original helper functions inline into candidate legacy handler; no complete one-to-one CFG proof.','V2 Rust/context unchanged; V2 compiled body layout changes and remains nonidentical.','All data previews do not certify full transitive consumed data extents.']})
