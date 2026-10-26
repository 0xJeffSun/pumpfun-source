from pathlib import Path
import argparse,json,hashlib
p=argparse.ArgumentParser();p.add_argument('--seal',required=True);a=p.parse_args();r=Path(__file__).resolve().parent;h=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert h(r/'manifest.json')==a.seal
actual={}
for p in r.rglob('*'):
 assert not p.is_symlink() and p.name not in ['__pycache__','.pytest_cache'],str(p)
 if p.is_file()and p.relative_to(r).as_posix()not in ['manifest.json','manifest.sha256']:actual[p.relative_to(r).as_posix()]=h(p)
assert actual==json.loads((r/'manifest.json').read_text())
assert sorted(p.relative_to(r).as_posix()for p in r.rglob('*')if p.is_dir())==json.loads((r/'directories.json').read_text())
assert (r/'manifest.sha256').read_text()==a.seal+'  manifest.json\n'
print('strictmanifest PASS',len(actual))
