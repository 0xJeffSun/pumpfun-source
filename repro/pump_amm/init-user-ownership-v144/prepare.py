from pathlib import Path
import shutil,json,hashlib
R=Path.cwd();W=Path(__file__).resolve().parent;B=R/'work/amm-sync-log-build';P=B/'publication';Q=R/'work/amm-init-close-context-review';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert not(W/'source').exists();assert H(P/'candidate.so')=='c96ed810bccdcc741ab811c846a2ad76bd50163c4f635ef3a61db6562114d69c';shutil.copytree(B/'source',W/'source')
source=json.loads((P/'proposed-source-sha256.json').read_text());assert len(source)==28
for n,h in source.items():assert H(W/'source'/n)==h,n
p=W/'source/programs/pump-amm/src/lib.rs';assert p.read_bytes()==(Q/'before.rs').read_bytes();shutil.copy2(Q/'after.rs',p)
for n in ['runtime-source','cargo-home','static-tool','static-reference','inputs']:shutil.copytree(B/n,W/n,ignore=shutil.ignore_patterns('*-keypair.json','__pycache__'))
for n in ['tools-before.json','baseline-source-sha256.json','observe_suite.py','verify_runtime.py','check_dependencies.py','run_regressions.py','static_compare.py','gate.py','build_once.py'] :shutil.copy2(B/n,W/n)
for n in ['proposal.patch']:shutil.copy2(Q/n,W/n)
(W/'accepted-source-sha256.json').write_text(json.dumps(source,indent=2)+'\n')
(W/'Cargo.lock.before').write_bytes((W/'source/programs/pump-amm/Cargo.lock').read_bytes());shutil.copy2(B/'lock-delta.json',W/'lock-delta.json')
s=(B/'run_inventory.py').read_text().replace("P=R/'work/amm-sync-context-build/publication'","P=R/'work/amm-sync-log-build/publication'");(W/'run_inventory.py').write_text(s)
(W/'source-delta.json').write_text(json.dumps({'baseline_candidate':H(P/'candidate.so'),'baseline_source':source,'current_source':{n:H(W/'source'/n)for n in source},'changed':[n for n in source if H(W/'source'/n)!=source[n]],'proposal_manifest':H(Q/'manifest.json')},indent=2)+'\n')
print('Prepared exact baseline with one reviewed lib.rs declaration mutation; no compiler attempted yet.')
