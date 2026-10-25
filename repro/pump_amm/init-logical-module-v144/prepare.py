from pathlib import Path
import shutil,json,hashlib
R=Path.cwd();W=Path(__file__).resolve().parent;B=R/'work/amm-init-user-ownership-build';P=B/'publication';Q=R/'work/amm-init-logical-module-proposal';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert not(W/'source').exists();assert H(P/'candidate.so')=='3fe52eea99e26866795348aad93fb821f834bf04290b4176a67ae0b7add0fcb5';shutil.copytree(B/'source',W/'source')
source=json.loads((P/'proposed-source-sha256.json').read_text());assert len(source)==28
for n,h in source.items():assert H(W/'source'/n)==h,n
for f in (Q/'before').rglob('*'):
 if f.is_file():assert (W/'source'/f.relative_to(Q/'before')).read_bytes()==f.read_bytes()
for f in (Q/'after').rglob('*'):
 if f.is_file():
  dest=W/'source'/f.relative_to(Q/'after');dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(f,dest)
for n in ['runtime-source','cargo-home','static-tool','static-reference','inputs']:shutil.copytree(B/n,W/n,ignore=shutil.ignore_patterns('*-keypair.json','__pycache__'))
for n in ['tools-before.json','baseline-source-sha256.json','observe_suite.py','verify_runtime.py','check_dependencies.py','run_regressions.py','static_compare.py','gate.py','build_once.py'] :shutil.copy2(B/n,W/n)
for n in ['proposal.patch']:shutil.copy2(Q/n,W/n)
(W/'accepted-source-sha256.json').write_text(json.dumps(source,indent=2)+'\n')
(W/'Cargo.lock.before').write_bytes((W/'source/programs/pump-amm/Cargo.lock').read_bytes());shutil.copy2(B/'lock-delta.json',W/'lock-delta.json')
s=(B/'run_inventory.py').read_text().replace("P=R/'work/amm-sync-log-build/publication'","P=R/'work/amm-init-user-ownership-build/publication'");(W/'run_inventory.py').write_text(s)
(W/'source-delta.json').write_text(json.dumps({'baseline_candidate':H(P/'candidate.so'),'baseline_source':source,'current_source':{n:H(W/'source'/n)for n in source},'new_files':[str(f.relative_to(Q/'after'))for f in(Q/'after').rglob('*')if f.is_file()and str(f.relative_to(Q/'after'))not in source],'changed':[n for n in source if H(W/'source'/n)!=source[n]],'proposal_manifest':H(Q/'manifest.json')},indent=2)+'\n')
print('Prepared exact baseline with reviewed logical module move; no compiler attempted yet.')
