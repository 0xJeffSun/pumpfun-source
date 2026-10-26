from pathlib import Path
import hashlib,json,subprocess,sys
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
m=J(P/'manifest.json');assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in(P/'manifest.json',P/'manifest.sha256')}
for n,h in m.items():assert H(P/n)==h,n
assert H(P/'record/manifest.json')=='21c5274869b01145be45deed8247717deb1d8427817bb1f4f890a545005b65e2'
subprocess.run([sys.executable,'-B',str(P/'record/verify.py')],check=True)
print('PASS: exact selected-record and five immutable controls, no source mutation/runtime')
