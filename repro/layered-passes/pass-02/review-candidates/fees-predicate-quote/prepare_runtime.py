from pathlib import Path
import json,hashlib,tarfile,shutil
W=Path(__file__).resolve().parent;R=Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source');P=R/'repro/pump_fees/donation-borrow-v144';D=W/'runner-repo'
H=lambda b:hashlib.sha256(b).hexdigest()
def sha(p):return H(p.read_bytes())
def cp(p,q):q.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(p,q)
manifest=json.loads((P/'manifest-sha256.json').read_text())
for n in ['scratch-handoff.tar.gz','harness-snapshot.tar.gz','source-sha256.json','source-snapshot.tar.gz','runtime-inputs.json']:
 assert sha(P/n)==manifest[n]
with tarfile.open(P/'scratch-handoff.tar.gz') as t:
 seal=t.extractfile('manifest-sha256.json').read();assert H(seal)=='3f6b1a631beb97ded199fa82dae1b25718da5cce9a553defb6002a79b1bcd6c5';sm=json.loads(seal)
 for p in (W/'reference').rglob('*'):
  if p.is_file():assert sha(p)==sm[str(p.relative_to(W/'reference'))]
with tarfile.open(P/'harness-snapshot.tar.gz') as t:
 hm=json.loads((P/'harness-source-sha256.json').read_text())
 for m in t:
  assert m.isfile() and m.name in hm and 'keypair' not in m.name
  b=t.extractfile(m).read();assert H(b)==hm[m.name]
  q=D/m.name;q.parent.mkdir(parents=True,exist_ok=True);q.write_bytes(b)
# Published path aliases retain exact payloads.
for v in json.loads((P/'harness-origin-map.json').read_text()):
 assert sha(D/v['recorded_path'])==v['sha256'];cp(D/v['recorded_path'],D/v['published_path']) if v['recorded_path']!=v['published_path'] else None
runtime=json.loads((P/'runtime-inputs.json').read_text())
for n,h in runtime.items():
 assert 'keypair' not in n and sha(R/n)==h;cp(R/n,D/n)
for p in (P/'validation-layer').rglob('*'):
 if p.is_file():
  n=str(p.relative_to(P));assert sha(p)==manifest[n];cp(p,W/n)
cp(W/'inputs/corrected-source-sha256.json',W/'validation-layer/corrected-source-sha256.json')
(W/'runtime-frozen-inputs.json').write_text(json.dumps({'harness':{str(p.relative_to(D)):sha(p) for p in D.rglob('*.py')},'runtime':runtime},indent=2)+'\n')
print('Frozen harness and runtime inputs ready; no execution')
