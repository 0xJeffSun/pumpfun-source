from pathlib import Path
import hashlib,json,importlib.util,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0];m=json.loads((P/'manifest.json').read_text());assert set(m)=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p not in[P/'manifest.json',P/'manifest.sha256']}
for p in P.rglob('*'):assert not p.is_symlink()and p.suffix!='.pyc'
for n,h in m.items():assert H(P/n)==h,n
s=importlib.util.spec_from_file_location('coverage',P/'derive.py');d=importlib.util.module_from_spec(s);s.loader.exec_module(d);result=d.derive();assert result==json.loads((P/'coverage.json').read_text());print(json.dumps({k:v for k,v in result.items()if k!='outcomes'},indent=2))
