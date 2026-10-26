from pathlib import Path
import argparse,hashlib,json,subprocess,sys
P=Path(__file__).resolve().parent;p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);R=p.parse_args().repo.resolve();H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
m=J(P/'manifest.json');assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in(P/'manifest.json',P/'manifest.sha256')}
for n,h in m.items():assert H(P/n)==h,n
Q=P/'sdk-ordinary-swap-followup';I=P/'sdk-ordinary-swap-independent-review';assert H(Q/'manifest.json')=='e3e2b8812c63ae0d9a291ad78ae6bb932448afa696f920bee385958b656cdfbb';assert H(I/'manifest.json')=='b1b0a2369b9f5eb3b37addb80c1edc0550c2186ec1c70c9b6c0643961a8adf55'
subprocess.run([sys.executable,'-B',str(Q/'verify.py'),'--repo',str(R)],check=True)
subprocess.run([sys.executable,'-B',str(I/'verify.py'),'--repo',str(R),'--packet',str(Q),'--liquidity',str(R/'repro/sdk/dynamic-liquidity-account-followup-20261025/record')],check=True)
print('PASS: exact primary and independent ordinary swap object evidence, all resolver/remaining/runtime limits retained')
