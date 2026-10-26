from pathlib import Path
import argparse,hashlib,json,subprocess,sys
P=Path(__file__).resolve().parent
p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);R=p.parse_args().repo.resolve()
J=lambda x:json.loads(x.read_text());H=lambda x:hashlib.sha256(x.read_bytes()).hexdigest()
m=J(P/'manifest.json');assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in (P/'manifest.json',P/'manifest.sha256')}
for n,h in m.items():assert H(P/n)==h,n
for name,seal,script in [('pump-6092-wallet-effects-static','1b64277d77a8c42900a2c5bec8c6e3d4e6998b42febec2ef4a1898260b74bd38','verify.py'),('pump-6092-wallet-effects-independent-review','c94416fc826c83a93212c8d6fafa6bf31dbdcbc7d8ab9044b30545cf64a55c44','review.py')]:
 assert H(P/name/'manifest.json')==seal
 subprocess.run([sys.executable,'-B',str(P/name/script),'--repo',str(R)],check=True)
print('PASS: immutable wallet-effects recovery and independent review; baseline-specific static evidence only')
