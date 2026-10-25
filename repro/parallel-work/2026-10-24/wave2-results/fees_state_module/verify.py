#!/usr/bin/env python3
"""Portable, read-only source/byte verifier. No compiler, runtime, network or repo needed."""
from pathlib import Path
import hashlib,json,difflib,re
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def J(p):return json.loads((P/p).read_text())
def check(v,msg):
 if not v:raise SystemExit('FAIL: '+msg)
seal=J('manifest-sha256.json')
actual={p.relative_to(P).as_posix() for p in P.rglob('*') if p.is_file()}
check(actual==set(seal)|{'manifest-sha256.json'},'sealed file membership')
for name,h in seal.items():check(H((P/name).read_bytes())==h,'seal '+name)
inputs=J('source-inputs.json');check(len(inputs)==22,'22 original inputs')
prefix='programs/pump-fees/src/'
moves=J('moves.json');check([m['type'] for m in moves]==['BuybackVault','SocialFeePda','DonationFeePda','FeeProgramGlobal'],'exact four types')
expected={name:(P/'before'/name).read_bytes() for name in inputs}
for name,b in expected.items():check(H(b)==inputs[name]['sha256'] and len(b)==inputs[name]['bytes'],'snapshot '+name)
blocks=[]
for m in moves:
 b=expected[m['from']];a,z=m['before_bytes'];block=b[a:z]
 check(H(block)==m['declaration_sha256'],'declaration hash')
 check(re.fullmatch(rb'#\[account\]\npub struct '+m['type'].encode()+rb'\s*\{[^}]*\}\n',block) is not None,'exact account declaration')
 check(m['before_lines']==[b[:a].count(b'\n')+1,b[:z].count(b'\n')],'before line range')
 expected[m['from']]=b[:a]+f"pub use crate::state::{m['type']};\n".encode()+b[z:];blocks.append(block)
state=b'use anchor_lang::prelude::*;\n\n'+b'\n'.join(blocks)
expected[prefix+'state.rs']=state
for m,block in zip(moves,blocks):
 a,z=m['after_bytes'];check(state[a:z]==block,'unchanged declaration bytes')
 check(m['after_lines']==[state[:a].count(b'\n')+1,state[:z].count(b'\n')],'after line range')
expected[prefix+'lib.rs']=expected[prefix+'lib.rs'].replace(b'mod types;\n',b'mod types;\nmod state;\n')
check({p.relative_to(P/'after').as_posix() for p in (P/'after').rglob('*') if p.is_file()}==set(expected),'23 after inputs')
for name,b in expected.items():check((P/'after'/name).read_bytes()==b,'only authorized changes '+name)
patch=''
for name in sorted(expected):
 a=P/'before'/name;b=expected[name].decode()
 patch+=''.join(difflib.unified_diff(a.read_text().splitlines(True) if a.exists() else [],b.splitlines(True),fromfile='a/'+name if a.exists() else '/dev/null',tofile='b/'+name))
check(patch==(P/'source.patch').read_text(),'patch reproduces exact before/after')
proof=J('evidence/prior-fees-functions/focused-proof.json');meta=J('evidence/prior-fees-functions/inputs.json')
elves={k:(P/'evidence'/f'{k}.so').read_bytes() for k in ('candidate','original')}
for k,b in elves.items():check(H(b)==meta[k+'.so']['sha256'],'raw ELF '+k)
seen=set();span_count=0
for row in proof['focused']:
 literals=row['relocated_data']
 type_names=[x['original'].get('utf8') for x in literals]
 typ=next((x for x in type_names if x in [m['type'] for m in moves]+['SharingConfig']),None)
 if typ is None:continue
 seen.add(typ)
 for side,b in elves.items():
  spans=[row[side]]+[r[side] for r in literals]+[c[side] for c in row['direct_calls']]
  for s in spans:
   raw=b[s['start']:s['end']];check(H(raw)==s['sha256'] and len(raw)==s['bytes'],'retained raw span')
   if 'hex' in s:check(raw.hex()==s['hex'] and raw.decode()==s['utf8'],'literal bytes')
   span_count+=1
 filename=literals[0]['original']['utf8']
 check(filename==('programs/pump-fees/src/instructions/fee_sharing/create_fee_sharing_config.rs' if typ=='SharingConfig' else prefix+'state.rs'),'witnessed filename')
check(seen=={'BuybackVault','SocialFeePda','DonationFeePda','FeeProgramGlobal','SharingConfig'},'all five provenance records')
print(json.dumps({'status':'PASS','before_inputs':22,'after_inputs':23,'exact_declaration_moves':4,'raw_spans_checked':span_count,'patch_sha256':H(patch.encode()),'manifest_sha256':H((P/'manifest-sha256.json').read_bytes()),'compiler_invocations':0,'runtime_probes':0}))
