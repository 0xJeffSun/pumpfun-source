from pathlib import Path
import hashlib,json,subprocess,sys
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text());m=J(P/'manifest.json')
assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in(P/'manifest.json',P/'manifest.sha256')}
for n,h in m.items():assert H(P/n)==h,n
assert H(P/'record/manifest.json')=='e652274f9f4b3dcd6cba58fbb02e40fb53c3e79d09f01a681998138fadaa301f';assert H(P/'independent-review/manifest.json')=='15a2ceaee98a6aa54fed1f268f3b8be850849069a923146b2ec444f6bee7f981'
subprocess.run([sys.executable,'-B',str(P/'record/verify.py')],check=True)
subprocess.run([sys.executable,'-B',str(P/'independent-review/verify.py'),'--packet',str(P/'record')],check=True)
print('PASS: immutable selected dependency-version witness and independent review; full deployment/compiledunit/JS closure unproved')
