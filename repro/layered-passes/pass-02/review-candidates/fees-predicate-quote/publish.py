from pathlib import Path
import json,hashlib,shutil,sys,subprocess,os
W=Path(__file__).resolve().parent;P=W/'publication'
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
assert J(W/'runtime/summary.json')['baseline_comparisons']==17441
assert not P.exists();P.mkdir()
def cp(a,b):
 assert 'keypair' not in a.name
 b.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(a,b)
for directory in ['inputs','reference','source','runner-repo','validation-layer','runtime']:
 for f in (W/directory).rglob('*'):
  if f.is_file() and '__pycache__' not in f.parts:
   assert not f.is_symlink();cp(f,P/f.relative_to(W))
for n in ['candidate.so','symbols.so','compare_bytes.py','complete-byte-comparison.json.gz','prepare.py','prepare_runtime.py','build_once.py','static_gate.py','fresh_inventory.py','run_runtime.py','verify_saved.py','verify_prior_saved.py','publish.py','preflight.json','build-launch.json','build-result.json','build.stdout','build.stderr','cargo-rustc-info.json','tool-phase-provenance.json','runtime-frozen-inputs.json','runtime-engine.json','runtime-orchestration.stdout','runtime-orchestration.stderr','static-gate.json','retained-static-gate.json','full-function-inventory.json','inventory-vs-fc1088.json','caller-static-proof.json','fresh-instruction-ledger.json','fresh-data-reference-ledger.json','inventory.stdout','inventory.stderr','saved-verification.json','saved-verification.stderr','REPORT.md']:
 cp(W/n,P/n)
for n in ['build-attempt.json','build-comparison.json','build.log']:cp(W/'build-01'/n,P/'build-01'/n)
(P/'approved-source.patch').write_bytes((W/'inputs/fees-sharing/pending-sharing.patch').read_bytes()+(W/'inputs/fees-quote-ownership/quote-ownership.patch').read_bytes())
manifest={str(f.relative_to(P)):H(f) for f in sorted(P.rglob('*')) if f.is_file()}
(P/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n');(P/'MANIFEST.sha256').write_text(H(P/'manifest.json')+'\n')
# Separate portable copy remains within the exclusively assigned directory.
Q=W/'portable-copy';shutil.copytree(P,Q)
with (W/'portable-verification.json').open('w') as out,(W/'portable-verification.stderr').open('w') as err:
 r=subprocess.run([sys.executable,'-B',str(Q/'verify_saved.py')],cwd=Q,env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'},stdout=out,stderr=err)
(W/'portable-exit.json').write_text(json.dumps({'returncode':r.returncode,'manifest_sha256':H(P/'manifest.json')},indent=2)+'\n')
assert r.returncode==0
owned={str(f.relative_to(W)):H(f) for f in sorted(P.rglob('*')) if f.is_file()}
for n in ['portable-verification.json','portable-verification.stderr','portable-exit.json']:owned[n]=H(W/n)
(W/'ownedmap.json').write_text(json.dumps(owned,indent=2)+'\n')
print(json.dumps({'publication':'publication','manifest_sha256':H(P/'manifest.json'),'portable_verifier_exit':r.returncode,'ownedmap_sha256':H(W/'ownedmap.json'),'owned_files':len(owned)},indent=2))
