from pathlib import Path
import hashlib,json,shutil,os
R=Path('/Users/shawwalters/.codex/worktrees/main-reconciliation/pumpfun-source');Q=R/'work/amm-collect-owner-error-build-plan';Q.mkdir(exist_ok=False);P=R/'repro/pump_amm/init-logical-module-v144';O=Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source');H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def save(p,x):p.write_text(json.dumps(x,indent=2)+'\n')
shutil.copytree(R/'work/amm-collect-owner-error-source-proof',Q/'source-proof');shutil.copytree(P/'source',Q/'source');src=Q/'source/programs/pump-amm/src/collect.rs';src.write_bytes((Q/'source-proof/proposal/collect.rs').read_bytes());shutil.copyfile(P/'proposed-source-sha256.json',Q/'baseline-source30.json');base=json.loads((Q/'baseline-source30.json').read_text());new=dict(base);new['programs/pump-amm/src/collect.rs']=H(src);save(Q/'proposed-source30.json',new)
shutil.copytree(O/'work/amm-init-logical-module-build/cargo-home/registry',Q/'registry',ignore=shutil.ignore_patterns('*-keypair.json','__pycache__','*.pyc'))
shutil.copytree(P/'static-tool',Q/'static-tool');(Q/'inventory-inputs').mkdir();hist='repro/function-inventory/2026-10-24-374fcf0/work/pump-amm-current-body-inventory/pump_amm-bodies.json';dest=Q/'inventory-inputs'/hist;dest.parent.mkdir(parents=True);shutil.copyfile(O/hist,dest)
for n in ['candidate.so','unstripped.so','static-comparison.json']:shutil.copyfile(P/n,Q/'inventory-inputs'/n)
(Q/'source/evidence/original/pump_amm').mkdir(parents=True);shutil.copyfile(R/'evidence/original/pump_amm/deployed.so',Q/'source/evidence/original/pump_amm/deployed.so');shutil.copyfile(P/'tools-before.json',Q/'tools.json');shutil.copyfile(P/'check_dependencies.py',Q/'check_dependencies.py');shutil.copyfile(R/'scripts/check_sbf_backend_diagnostics.py',Q/'backend_gate.py')
shutil.copyfile(R/'work/relay15-owned6008-build-plan/complete-existing-cache-snapshots.json',Q/'full-tool-cache-snapshots.json');shutil.copyfile(R/'work/relay15-owned6008-build-plan/launcher/tool-witness/runtime-cache-paths.json',Q/'cache-paths.json')
fp=list((O/'work/amm-init-logical-module-build/build-01/target').rglob('lib-pump_amm_recovered.json'));assert len(fp)==1;shutil.copyfile(fp[0],Q/'accepted-root-fingerprint.json')
extra={n:{'path':shutil.which(n),'sha256':H(Path(shutil.which(n))),'resolved_path':str(Path(shutil.which(n)).resolve())}for n in ['cargo','rustup','cargo-build-sbf']};save(Q/'path-tools.json',extra)
# Baseline method reports preserve previous whole inventory, not an invented new result.
shutil.copytree(P/'inventory/after',Q/'baseline-inventory')
for p in Q.rglob('*'):assert not p.is_symlink() and p.suffix!='.pyc' and p.name!='__pycache__'
print(Q)
