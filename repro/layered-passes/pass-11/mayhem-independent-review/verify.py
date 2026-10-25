from pathlib import Path
import argparse,hashlib,json,subprocess,sys
P=Path(__file__).resolve().parent
p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);a=p.parse_args();R=a.repo.resolve()
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
m=json.loads((P/'manifest.json').read_text());assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().strip()
assert set(m)=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p not in[P/'manifest.json',P/'manifest.sha256']}
for n,h in m.items():assert H(P/n)==h,n
for n,h in json.loads((P/'input-bindings.json').read_text()).items():assert H(R/n)==h,n
r=subprocess.run([sys.executable,'-B',str(P/'review.py'),'--repo',str(R)],capture_output=True,text=True);assert r.returncode==0,(r.stdout,r.stderr)
assert json.loads(r.stdout)==json.loads((P/'history/result.json').read_text())
print(r.stdout,end='')
