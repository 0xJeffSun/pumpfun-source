from pathlib import Path
import shutil,json,hashlib
R=Path.cwd();W=R/'work/amm-claim-context-build';P=R/'repro/pump_amm/formatter-restoration-v144';Q=R/'work/amm-claim-member-map';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert not W.exists();W.mkdir();source=json.loads((P/'proposed-source-sha256.json').read_text())
for n,h in source.items():
 a=P/'source'/n;assert H(a)==h;d=W/'source'/n;d.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(a,d)
for n in ['scripts','evidence']:
 src=P/'source'/n
 if src.exists():shutil.copytree(src,W/'source'/n)
assert (W/'source/programs/pump-amm/src/incentives.rs').read_bytes()==(Q/'before.rs').read_bytes()
shutil.copy2(Q/'after.rs',W/'source/programs/pump-amm/src/incentives.rs')
for n in ['tools-before.json','baseline-source-sha256.json','observe_suite.py','verify_runtime.py','check_dependencies.py','run_regressions.py','static_compare.py','gate.py']:
 shutil.copy2(P/n,W/n)
for n in ['static-tool','static-reference','inputs']:shutil.copytree(P/n,W/n)
shutil.copytree(R/'work/amm-formatter-restoration-build/runtime-source',W/'runtime-source')
shutil.copytree(R/'work/amm-formatter-restoration-build/cargo-home/registry',W/'cargo-home/registry',ignore=shutil.ignore_patterns('*-keypair.json'))
(W/'accepted-source-sha256.json').write_text(json.dumps(source,indent=2)+'\n')
(W/'proposal.patch').write_bytes((Q/'proposal.patch').read_bytes())
(W/'lock-delta.json').write_bytes((P/'lock-delta.json').read_bytes())
(W/'Cargo.lock.before').write_bytes((W/'source/programs/pump-amm/Cargo.lock').read_bytes())
s=(P/'run_inventory.py').read_text().replace("P=R/'repro/pump_amm/accumulator-order-v144'","P=R/'repro/pump_amm/formatter-restoration-v144'");(W/'run_inventory.py').write_text(s)
s=(P/'build_once.py').read_text();start=s.index("cmd=[cargo,'update'");end=s.index("run([sys.executable,'-B',str(W/'check_dependencies.py')],'dependency-before')",start)
s=s[:start]+"assert (crate/'Cargo.lock').read_bytes()==(W/'Cargo.lock.before').read_bytes()\nshutil.copy2(crate/'Cargo.lock',W/'Cargo.lock.after')\n"+s[end:];(W/'build_once.py').write_text(s)
print(W)
