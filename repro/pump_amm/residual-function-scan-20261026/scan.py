#!/usr/bin/env python3
"""Rank equal-size unmatched instruction windows for source investigation only."""
from pathlib import Path
from collections import defaultdict
import gzip,hashlib,json,sys
ROOT=Path(__file__).resolve().parents[3]
sys.path.insert(0,str(ROOT/'repro/pump_amm/claim-self-transfer-v144/static-tool'))
from elf_reader import Elf
base=ROOT/'repro/pump_amm/cpi-return-balance-recovery-20261026/results'
o=Elf(ROOT/'evidence/original/pump_amm/deployed.so');c=Elf(base/'build/candidate.so');s=Elf(base/'build/unstripped.so');m=json.loads(gzip.decompress((base/'measurement.json.gz').read_bytes()));assert hashlib.sha256(c.b).hexdigest()==m['candidate_sha256']
by_size=defaultdict(dict)
for f in s.funcs:by_size[f['size']][f['start']]=f
rows=[]
for w in m['rows']:
 if w['matches']:continue
 size=w['end']-w['start'];start=w['start'];best=[]
 if size<64:continue
 before=o.normalized[start:start+size]
 for at,f in by_size[size].items():
  after=c.normalized[at:at+size];diff=[i for i in range(0,size,8)if before[i:i+8]!=after[i:i+8]]
  if len(diff)<=max(24,size//8//40):
   best.append({'candidate':at,'name':f['name'],'different_instructions':len(diff),'offsets':diff,'patterns_equal':o.pattern(start,size)==c.pattern(at,size)})
 if best:rows.append({'original':start,'bytes':size,'candidates':sorted(best,key=lambda r:r['different_instructions'])[:3]})
rows.sort(key=lambda r:r['candidates'][0]['different_instructions'])
result={'candidate_sha256':m['candidate_sha256'],'scope':'Equal-length instruction hamming-distance candidates. Not a function-match or semantic-equivalence assertion.','rows':rows}
p=Path(__file__).with_name('results.json');assert not p.exists();p.write_text(json.dumps(result,indent=2)+'\n')
for r in rows[:25]:print(hex(r['original']),r['bytes'],r['candidates'][0]['different_instructions'],r['candidates'][0]['name'])
