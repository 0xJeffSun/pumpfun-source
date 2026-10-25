#!/usr/bin/env python3
"""Static package verification only; no compiler or program execution."""
import hashlib,json,struct
from pathlib import Path
P=Path(__file__).resolve().parent
for name,row in json.loads((P/'manifest.json').read_text()).items():
 b=(P/name).read_bytes();assert len(b)==row['bytes'] and hashlib.sha256(b).hexdigest()==row['sha256'],name
s=json.loads((P/'evidence/selected-functions.json').read_text())
def body(name,row):
 b=(P/'evidence'/name).read_bytes(); shoff=struct.unpack_from('<Q',b,40)[0]; entsize,num=struct.unpack_from('<HH',b,58)
 for i in range(num):
  _,typ,flags,addr,off,size,*_=struct.unpack_from('<IIQQQQIIQQ',b,shoff+i*entsize)
  if typ==1 and addr<=row['start'] and row['end']<=addr+size:
   result=b[off+row['start']-addr:off+row['end']-addr]
   assert hashlib.sha256(result).hexdigest()==row['raw_sha256'];return result
 raise AssertionError('unmapped function')
body('original.so',s['original']);body('candidate.so',s['candidate_enclosing_wrapper'])
assert s['match']['status']=='no-complete-body-match'
assert not s['match']['raw_candidate_indices'] and not s['match']['normalized_candidate_indices']
b=(P/'source/src/generated_exit.rs').read_text();a=(P/'base-source/src/generated_exit.rs').read_text()
assert a[:a.index('pub fn account_exit158')]==b[:b.index('pub fn account_exit158')]
assert 'std::io::Error::from(std::io::ErrorKind::InvalidInput)' in b
assert 'serialize().map_err(|error| {drop(error);write_error()})' in b
# Decode every direct target from the whole original body, not a picked prefix.
r=s['original'];raw=body('original.so',r);calls=[]
for i in range(0,len(raw),8):
 op,regs,offset,imm=struct.unpack_from('<BBhi',raw,i)
 if op==0x85 and regs>>4==1:calls.append((r['start']+i,r['start']+i+8+imm*8))
assert calls==[(x['pc'],x['target']) for x in r['direct_calls']]
ledger=json.loads((P/'evidence/original-function-ledger.json').read_text())
starts={x['start'] for x in ledger};assert all(t in starts for _,t in calls)
print('PASS: hashes, full body bytes, complete direct-call inventory, isolated source delta. No compilation/runtime/identity claim.')
