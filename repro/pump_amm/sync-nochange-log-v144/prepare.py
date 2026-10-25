from pathlib import Path
import shutil,json,hashlib
R=Path.cwd();W=Path(__file__).resolve().parent;B=R/'work/amm-sync-context-build';P=B/'publication';Q=R/'work/amm-sync-nochange-log-next';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert not(W/'source').exists();assert H(P/'candidate.so')=='69e5b9fc8d6bcecf5f8ae60748767fefc685a3b13823189a945b2f9d1c77e758';shutil.copytree(B/'source',W/'source')
source=json.loads((P/'proposed-source-sha256.json').read_text());assert len(source)==28
for n,h in source.items():assert H(W/'source'/n)==h,n
p=W/'source/programs/pump-amm/src/incentives.rs';assert p.read_bytes()==(Q/'before.rs').read_bytes();shutil.copy2(Q/'after.rs',p)
for n in ['runtime-source','cargo-home','static-tool','static-reference','inputs']:shutil.copytree(B/n,W/n,ignore=shutil.ignore_patterns('*-keypair.json','__pycache__'))
for n in ['tools-before.json','baseline-source-sha256.json','observe_suite.py','verify_runtime.py','check_dependencies.py','run_regressions.py','static_compare.py','gate.py','build_once.py'] :shutil.copy2(B/n,W/n)
for n in ['proposal.patch']:shutil.copy2(Q/n,W/n)
(W/'accepted-source-sha256.json').write_text(json.dumps(source,indent=2)+'\n')
(W/'Cargo.lock.before').write_bytes((W/'source/programs/pump-amm/Cargo.lock').read_bytes());shutil.copy2(B/'lock-delta.json',W/'lock-delta.json')
s=(B/'run_inventory.py').read_text().replace("P=R/'work/amm-claim-transfer-build/publication'","P=R/'work/amm-sync-context-build/publication'");(W/'run_inventory.py').write_text(s)
(W/'source-delta.json').write_text(json.dumps({'baseline_candidate':H(P/'candidate.so'),'baseline_source':source,'current_source':{n:H(W/'source'/n)for n in source},'changed':[n for n in source if H(W/'source'/n)!=source[n]],'proposal_manifest':H(Q/'manifest.json')},indent=2)+'\n')
print('Prepared exact baseline with one reviewed incentives.rs mutation; no compiler attempted yet.')
