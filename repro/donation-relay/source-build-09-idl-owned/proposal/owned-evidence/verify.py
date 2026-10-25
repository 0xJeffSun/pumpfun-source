from pathlib import Path
import json,hashlib,importlib.util
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest()
m=json.loads((P/'manifest.json').read_text())
assert H((P/'manifest.json').read_bytes())==(P/'manifest.sha256').read_text().split()[0]
for n,h in m.items():assert H((P/n).read_bytes())==h,n
s=importlib.util.spec_from_file_location('a',P/'analyze.py');a=importlib.util.module_from_spec(s);s.loader.exec_module(a)
r=json.loads((P/'closure.json').read_text())
for side in ['original','candidate']:
 e=a.Elf((P/(side+'.so')).read_bytes());assert not r[side]['unresolved_direct_calls']
 for row in r[side]['windows']:assert H(e.at(row['start'],row['bytes']))==row['raw_sha256']
assert len(r['original_factory_callers'])==386
assert next(x for x in r['original']['windows']if x['start']==665312)['bytes']==592
assert next(x for x in r['candidate']['windows']if x['start']==67672)['bytes']==864
print('PASS complete closure hashes; no source patch, build or runtime')
