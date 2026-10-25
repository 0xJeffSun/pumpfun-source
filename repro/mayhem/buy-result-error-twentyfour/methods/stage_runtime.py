from pathlib import Path
import json,shutil,tarfile,hashlib
P=Path(__file__).resolve().parent;ROOT=P.parents[1];S=P/'source'
r=json.loads((ROOT/'repro/mayhem/twentyfour/runtime-manifest.json').read_text())
for group in [r['test_source_sha256'],r['inputs_sha256']]:
 for rel,digest in group.items():
  f=ROOT/rel;assert hashlib.sha256(f.read_bytes()).hexdigest()==digest
  dest=S/rel;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(f,dest)
# Portable baseline summaries remain immutable input evidence.
for rel in ['repro/mayhem/twentyfour/summary.json','repro/mayhem/twentyfour/runtime-manifest.json','repro/mayhem/twentyfour/test-source-sha256.json']:
 d=S/rel;d.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(ROOT/rel,d)
fixtures=P/'burn-fixtures';fixtures.mkdir(exist_ok=True)
with tarfile.open(S/'repro/mayhem/twentyfour/captured-fixtures.tar.gz') as t:t.extractall(fixtures,filter='data')
print('Unchanged baseline runtime inputs copied under isolated source root; burn fixtures extracted.')
