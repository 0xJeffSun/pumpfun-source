#!/usr/bin/env python3
"""Verify crosswalk provenance, not program behavior."""
from pathlib import Path
import hashlib,json,tarfile
D=Path(__file__).resolve().parent
R=next(p for p in D.parents if (p/'evidence/original/mayhem/deployed.so').is_file())
sha=lambda b:hashlib.sha256(b).hexdigest()
manifest=json.loads((D/'manifest-sha256.json').read_text())
assert set(manifest)=={p.name for p in D.iterdir() if p.is_file() and p.name!='manifest-sha256.json'}
for p,h in manifest.items():assert sha((D/p).read_bytes())==h,p
inputs=json.loads((D/'inputs.json').read_text())
for p,h in inputs['references'].items():assert sha((R/p).read_bytes())==h,p
with tarfile.open(R/'repro/mayhem/twentyfour/source-snapshot.tar.gz') as t:
 source={m.name:t.extractfile(m).read() for m in t.getmembers() if m.isfile()}
for p,h in inputs['source_sha256'].items():assert sha(source[p])==h,p
assert len(inputs['source_sha256'])==14
c=json.loads((D/'crosswalk.json').read_text());assert c['new_handlers']==c['new_runtime_receipts']==c['builds']==0
count=0
for row in c['global_params_arguments']+c['mayhem_state_fields']:
 for ref in row.get('trade_read_references',row.get('trade_read_write_references',[])):
  assert sha(source[ref['path']])==ref['source_sha256']
  assert source[ref['path']].decode().splitlines()[ref['line']-1]==ref['text'];count+=1
assert len(c['global_params_arguments'])==16 and len(c['mayhem_state_fields'])==9
assert sum(not x['trade_read_references'] for x in c['global_params_arguments'])==7
state=c['mayhem_state_fields'];assert state[0]['account_offset']==8
assert all(a['account_offset']+a['serialized_width']==b['account_offset'] for a,b in zip(state,state[1:]))
assert state[-1]['account_offset']+state[-1]['serialized_width']==106
print(json.dumps(dict(scope='document/source provenance only',source_inputs=14,arguments=16,state_fields=9,source_line_references=count,new_runtime_receipts=0,new_handlers=0),indent=2))
