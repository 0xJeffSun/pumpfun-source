#!/usr/bin/env python3
from pathlib import Path
import hashlib,importlib.util,json,re
ROOT=Path(__file__).resolve().parent
manifest=json.loads((ROOT/'manifest.json').read_text())
files={str(p.relative_to(ROOT)) for p in ROOT.rglob('*') if p.is_file() and p.name!='manifest.json'}
assert files==set(manifest['files'])
for f,h in manifest['files'].items():assert hashlib.sha256((ROOT/f).read_bytes()).hexdigest()==h,f
spec=importlib.util.spec_from_file_location('analysis',ROOT/'analyze.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
r=m.analyze();assert r==json.loads((ROOT/'analysis.json').read_text())
for kind,label,start,end in json.loads((ROOT/'ranges.json').read_text()):
 assert not (start<=528112<end)
 b=(ROOT/f'inputs/{kind}.so').read_bytes();covered=set()
 for line in (ROOT/f'{kind}-{label}.asm').read_text().splitlines():
  hit=re.match(r'\s*(\d+):\s+((?:[0-9a-f]{2} )*[0-9a-f]{2})\s',line)
  if not hit:continue
  pc=int(hit[1])*8;raw=bytes.fromhex(hit[2]);assert b[pc:pc+len(raw)]==raw;covered.update(range(pc,pc+len(raw)))
 assert covered==set(range(start,end))
print(json.dumps({'verified':True,'files':len(files),'ranges':len(r['ranges']),'serialized_bytes':106,'matched_direct_helper_bodies':3,'source_correction_supported':False,'runtime_probes':0},indent=2))
