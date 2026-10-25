from pathlib import Path
import hashlib,json,subprocess,sys
from analyze import derive
P=Path(__file__).resolve().parent
manifest=json.loads((P/'manifest.json').read_text())
actual={str(p.relative_to(P))for p in P.rglob('*')if p.is_file() and p not in [P/'manifest.json',P/'manifest.sha256'] and '__pycache__'not in p.parts};assert actual==set(manifest)
assert hashlib.sha256((P/'manifest.json').read_bytes()).hexdigest()==(P/'manifest.sha256').read_text().split()[0]
for n,h in manifest.items():assert hashlib.sha256((P/n).read_bytes()).hexdigest()==h,n
assert derive()==json.loads((P/'fresh-classification.json').read_text())
for name in ['ata','metaplex']:
 p=subprocess.run([sys.executable,'-B',str(P/'retained'/name/'verify.py')],capture_output=True,text=True);assert p.returncode==0,(name,p.stdout,p.stderr)
print(json.dumps({'verified':True,'ata_differences':307,'metaplex_differences':1509,'source_patch':None,'builds':0,'runtime_probes':0,'network_requests':0}))
