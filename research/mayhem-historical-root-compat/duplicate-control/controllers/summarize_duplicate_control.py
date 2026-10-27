from pathlib import Path
import json, hashlib
W=Path(__file__).resolve().parent; P=W/'mayhem-historical-duplicate-check'
def read(p): return json.loads(p.read_bytes())
a=read(P/'build-01-before/analysis.json'); b=read(P/'build-02-after/analysis.json')
current=read(W/'mayhem-historical-root-compat/publication/report.json')['runs']['current-native-control']
def matched(i): return {n for n,v in i['matches'].items() if v}
x,y,z=matched(a['inventory']),matched(b['inventory']),matched(current)
comparison=dict(gained=sorted(y-x),lost=sorted(x-y),raw_gained=sorted(set(b['inventory']['raw_ids'])-set(a['inventory']['raw_ids'])),raw_lost=sorted(set(a['inventory']['raw_ids'])-set(b['inventory']['raw_ids'])),remaining_current_difference=sorted(z-y),new_beyond_current=sorted(y-z))
(P/'comparison.json').write_text(json.dumps(comparison,indent=2)+'\n',encoding='utf-8')
print(json.dumps(comparison))
old=read(W/'mayhem-historical-root-compat/full-compatible-build-02/launch.json')['registry_packages']
new=read(P/'build-01-before/launch.json')['registry_packages']
oldkeys={(p['name'],p['version'],p['package_sha256']) for p in old}; newkeys={(p['name'],p['version'],p['package_sha256']) for p in new}
print('registry added', sorted(newkeys-oldkeys)); print('registry removed', sorted(oldkeys-newkeys))
for name in ('symbols.so','stripped.so'):
    print('repeat',name,(P/'build-02-after'/name).read_bytes()==(P/'build-03-repeat'/name).read_bytes())
