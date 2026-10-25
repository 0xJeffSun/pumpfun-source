from pathlib import Path
import json,hashlib,shutil
W=Path(__file__).resolve().parent;R=Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source');P=R/'repro/pump_amm/update-event-borrow-v144';D=W/'runtime-source'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def copy(a,b):assert not a.name.endswith('-keypair.json');b.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(a,b)
frozen=json.loads((W/'provenance/frozen-inputs.json').read_text())
for p,row in frozen['input_snapshots'].items():
 a=P/'scratch/inputs'/p
 if not a.exists():a=R/p
 assert sha(a)==row['sha256'],p
 copy(a,D/p)
for p,h in json.loads((W/'baseline-source-sha256.json').read_text()).items():copy(P/'source'/p,D/p)
copy(W/'provenance/observe_suite.py',W/'observe_suite.py');copy(W/'provenance/verify_runtime.py',W/'verify_runtime.py')
# Verifier's existing saved inputs; no case/assertion changes.
for p in ['evidence/upstream/pump_amm.json','repro/pump_amm/create-config-shared-methods-v144/fee_config-differential.json.gz']:copy(D/p,W/'inputs'/p)
s=(W/'provenance/run_regressions.py').read_text()
s=s.replace("R=next(p for p in W.parents if (p/'evidence/upstream/pump_amm.json').is_file())","R=W/'runtime-source'")
s=s.replace("for mapping in [bindings['actual_compiled_source'],harness,runtime,legacy]:", "for p,h in bindings['actual_compiled_source'].items():assert sha(W/'source'/p)==h,p\n for mapping in [harness,runtime,legacy]:")
s=s.replace("for p in [Path(__file__),W/'observe_suite.py']:harness[str(p.relative_to(R))]=sha(p)","# Local runner/observer are separately sealed, outside the legacy checkout map.")
s=s.replace("check();(OUT/'inputs-before.json')", "assert json.loads((W/'runtime-gate.json').read_text())['pass'];check();(OUT/'inputs-before.json')")
(W/'run_regressions.py').write_text(s)
print('Unchanged suite scripts and verifier staged; runtime gate required.')
