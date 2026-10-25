from pathlib import Path
import hashlib,json,re,struct
W=Path('work/linux-v144-provenance');D=Path('/Users/shawwalters/.cache/solana/v1.44/platform-tools/rust/lib/rustlib/sbf-solana-solana/lib');sha=lambda b:hashlib.sha256(b).hexdigest()
def read(p):
 b=p.read_bytes();hits=[]
 for m in re.finditer(rb'/(?:home|Users)/[^\x00\s\x7f-\xff]{1,200}/library/alloc/src/string\.rs',b):hits.append({'offset':m.start(),'path':m.group().decode()})
 return {'path':str(p),'bytes':len(b),'sha256':sha(b),'alloc_string_references':hits}
rows=[]
for prefix in ['liballoc-','libcore-','libstd-']:
 for host,folder in [('linux',W/'selected'),('darwin',D)]:
  for p in folder.glob(prefix+'*.rlib'):rows.append({'host':host,**read(p)})
# Read captured program strings directly; these hashes stay distinct from sysroot artifacts.
for p in [Path('evidence/original/pump_fees/deployed.so'),Path('repro/pump_fees/update-admin-call-closure-static/sealed/inputs/candidate.so')]:rows.append({'host':'program-evidence',**read(p)})
(W/'stdlib-path-comparison.json').write_text(json.dumps(rows,indent=2)+'\n');print(json.dumps([{k:v for k,v in x.items() if k!='alloc_string_references'}|{'paths':sorted(set(y['path'] for y in x['alloc_string_references']))} for x in rows],indent=2))
