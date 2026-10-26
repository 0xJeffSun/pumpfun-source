from pathlib import Path
import argparse,hashlib,json
from analyze import analyze
P=Path(__file__).resolve().parent;J=lambda p:json.loads(p.read_text())
p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);r=p.parse_args()
m=J(P/'manifest.json');assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f!=P/'manifest.json'}
for n,h in m.items():assert hashlib.sha256((P/n).read_bytes()).hexdigest()==h,n
assert analyze(r.repo)==J(P/'result.json')
print('PASS:4ordinary swap-object links,2complete21field helpers, fullIDL/default/extra/remaining negatives; no JS/PDA/resolver/runtime acceptance')
