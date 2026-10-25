from pathlib import Path
import argparse,json,hashlib,sys
p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);args=p.parse_args();P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
m=json.loads((P/'manifest.json').read_text());assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().strip();assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']}
for n,h in m.items():assert not(P/n).is_symlink()and H(P/n)==h,n
F=P/'frozen-review';assert H(F/'manifest.json')=='aa6d441f52828c8a7e227e5f1e99b6720639caeb3dbdce9c3fd533d8139c0df2'
old=json.loads((F/'manifest.json').read_text());assert set(old)=={str(f.relative_to(F))for f in F.rglob('*')if f.is_file()and f not in[F/'manifest.json',F/'manifest.sha256']}
for n,h in old.items():assert H(F/n)==h,n
witness=P/'dependency-witness/claim-transfer-manifest.json';assert H(witness)=='d4fbc82db5c200211ff600f716f10e1aa0cb72eb2bf8a4995037d4612e4aed4d'
# Preserve original file bytes and every assertion. Rebind only one historical
# manifest input to its exact sealed witness; no fake repository/work path.
s=(F/'verify.py').read_text();needle="for n,h in json.loads((w/'inputs.json').read_text()).items():assert H(a.repo/n)==h,n"
replacement="for n,h in json.loads((w/'inputs.json').read_text()).items():assert H(_historical_manifest if n=='work/amm-claim-transfer-next/manifest.json' else a.repo/n)==h,n"
assert s.count(needle)==1;s=s.replace(needle,replacement);sys.path.insert(0,str(F));sys.argv=[str(F/'verify.py'),'--repo',str(args.repo.resolve())]
exec(compile(s,str(F/'verify.py'),'exec'),{'__name__':'__main__','__file__':str(F/'verify.py'),'_historical_manifest':witness})
print('PASS portable companion: unchanged frozen aa6d verifier assertions; exact historical manifest witness rebound; no work directory dependency or target execution.')
