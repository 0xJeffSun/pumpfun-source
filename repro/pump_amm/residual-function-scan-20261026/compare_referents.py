#!/usr/bin/env python3
"""Inspect paired .rodata references without treating unknown extents as equality."""
from pathlib import Path
import gzip,hashlib,json,struct,sys
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'repro/pump_amm/claim-self-transfer-v144/static-tool'))
from elf_reader import Elf
BASE=ROOT/'repro/pump_amm/typed-account-decoder-20261026/results'
o=Elf(ROOT/'evidence/original/pump_amm/deployed.so');c=Elf(BASE/'build/candidate.so');m=json.loads(gzip.decompress((BASE/'measurement.json.gz').read_bytes()))
def pointer(e,at):return struct.unpack_from('<I',e.b,at+4)[0]|(struct.unpack_from('<I',e.b,at+12)[0]<<32)
def rodata(e,p):
 s=e.secs['.rodata'];return s[4]<=p<s[4]+s[5]
def text(e,p):
 out=[]
 for b in e.b[p:p+100]:
  if not 32<=b<127:break
  out.append(chr(b))
 return ''.join(out)
rows=[]
for row in m['rows']:
 if not row['matches']:continue
 match=row['matches'][0]
 for at,r in o.relocations.items():
  if r['type']!=8 or not row['start']<=at<row['end'] or o.b[at]!=0x18:continue
  other=match['start']+at-row['start'];a,b=pointer(o,at),pointer(c,other)
  if not(rodata(o,a)and rodata(c,b)):continue
  limit=min(64,o.secs['.rodata'][4]+o.secs['.rodata'][5]-a,c.secs['.rodata'][4]+c.secs['.rodata'][5]-b);n=next((i for i in range(limit)if o.b[a+i]!=c.b[b+i]),limit)
  rows.append({'original_window':row['start'],'candidate_window':match['start'],'symbol':match['name'],'offset':at-row['start'],'original_pointer':a,'candidate_pointer':b,'equal_prefix_bytes':n,'checked_prefix_limit':limit,'original_ascii_prefix':text(o,a),'candidate_ascii_prefix':text(c,b)})
result={'candidate_sha256':hashlib.sha256(c.b).hexdigest(),'references':len(rows),'rows':rows,'scope':'Prefix triage for first candidate match only. Pointee extents unknown; prefix equality is not data or transitive equivalence.'}
p=Path(__file__).with_name('rodata-prefixes.json');assert not p.exists();p.write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps({'references':len(rows),'differing_within_prefix':sum(r['equal_prefix_bytes']<r['checked_prefix_limit']for r in rows)}))
for r in rows:
 if r['equal_prefix_bytes']<min(8,r['checked_prefix_limit']):print(hex(r['original_window']),r['symbol'],repr(r['original_ascii_prefix'][:65]),repr(r['candidate_ascii_prefix'][:65]))
