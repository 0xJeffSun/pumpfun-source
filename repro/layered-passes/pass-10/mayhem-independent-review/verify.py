"""Verify publication seal and rerun unchanged saved-evidence review."""
from pathlib import Path
import argparse,hashlib,json,subprocess,sys
P=Path(__file__).resolve().parent
p=argparse.ArgumentParser();p.add_argument('--scratch',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args()
assert not a.output.resolve().is_relative_to(P),'write results outside sealed package'
m=json.loads((P/'manifest.json').read_text())
actual={str(f.relative_to(P)) for f in P.rglob('*') if f.is_file() and f not in [P/'manifest.json',P/'manifest.sha256'] and '__pycache__' not in f.parts}
assert actual==set(m['files'])
for rel,row in m['files'].items():
 b=(P/rel).read_bytes();assert len(b)==row['bytes'] and hashlib.sha256(b).hexdigest()==row['sha256'],rel
assert (P/'manifest.sha256').read_text().split()[0]==hashlib.sha256((P/'manifest.json').read_bytes()).hexdigest()
subprocess.run([sys.executable,'-B',str(P/'reproduce.py'),'--scratch',str(a.scratch.resolve()),'--output',str(a.output.resolve())],check=True)
