#!/usr/bin/env python3
"""Verify retained static assertions and file bindings. No program execution."""
from pathlib import Path
import argparse,hashlib,json,struct
W=Path(__file__).resolve().parent;R=W.parents[1]
sha=lambda b:hashlib.sha256(b).hexdigest()
arg=argparse.ArgumentParser();arg.add_argument('--current-source',action='store_true');a=arg.parse_args()
bound=json.loads((W/'input-sha256.json').read_text())
checked_inputs=0
for rel,meta in bound.items():
 if rel.startswith('programs/') and not a.current_source:
  p=W/'source-evidence'/rel.replace('/','__')
 else:p=R/rel
 b=p.read_bytes();assert len(b)==meta['bytes']and sha(b)==meta['sha256'],rel;checked_inputs+=1
windows=json.loads((W/'windows.json').read_text());ins={};branches=0;calls=0
for row in windows:
 j=json.loads((W/(row['program']+'-'+row['label']+'.json')).read_text())
 e=(R/f"evidence/original/{row['program']}/deployed.so").read_bytes()
 assert row['raw_sha256']==sha(e[row['start']:row['end']])
 assert sum(len(bytes.fromhex(i['raw']))for i in j['instructions'])==row['bytes']
 next_at=row['start']
 for i in j['instructions']:
  raw=bytes.fromhex(i['raw']);assert e[i['at']:i['at']+len(raw)]==raw
  assert i['at']==next_at;next_at+=len(raw)
  if 'branch_target'in i:
   assert i['branch_target']==i['at']+8+8*struct.unpack_from('<h',raw,2)[0];branches+=1
  if 'direct_target'in i:
   assert raw[0]==0x85 and i['direct_target']==i['at']+8+8*struct.unpack_from('<i',raw,4)[0];calls+=1
  key=(row['program'],i['at'])
  if key in ins:assert ins[key]==i
  ins[key]=i
 assert next_at==row['end']
edges=[
 ('pump',0x57438,'direct_target',0x5b3b0,'per-curve call'),
 ('pump',0x57570,'direct_target',0xde4b8,'hop exit before next iteration'),
 ('pump',0x5a2b0,'branch_target',0x5aa60,'previous-hop transfer branch'),
 ('pump',0x5ab40,'branch_target',0x5ab68,'distinct vault requires signed transfer'),
 ('pump',0x5aa40,'direct_target',0x17fcc8,'first-hop checked transfer'),
 ('pump',0x5b390,'direct_target',0x17fcc8,'previous-curve signed checked transfer'),
 ('pump',0x5d360,'direct_target',0x5a260,'sell input transfer'),
 ('pump',0x5dd38,'direct_target',0x5a260,'buy non-native input transfer'),
 ('pump',0x5e030,'direct_target',0x8df98,'buy native input'),
 ('pump',0x5d420,'direct_target',0xa13e0,'sell reserve mutation'),
 ('pump',0x5e078,'direct_target',0xa0bf0,'buy reserve mutation'),
 ('pump',0x5d458,'branch_target',0x5d7e8,'native skips token quote output'),
 ('pump',0x5d470,'branch_target',0x5d7e8,'non-last sell skips user quote output'),
 ('pump',0x5d518,'direct_target',0x8eda0,'last non-native quote output'),
 ('pump',0x5e0c0,'branch_target',0x5e130,'last buy output branch'),
 ('pump',0x5e1d0,'direct_target',0x93050,'last buy base output'),
 ('pump',0x5e2b0,'direct_target',0x965b8,'native final output'),
 ('pump',0x5eb68,'direct_target',0x58f58,'native buyback'),
 ('pump',0x5eac0,'branch_target',0x5f470,'buy selects base output state'),
 ('pump',0x5eb30,'branch_target',0x5f4d0,'sell selects quote output state'),
 ('pump',0x5d8b8,'direct_target',0xa1bd8,'fee accrual'),
 ('pump',0x5cdb8,'direct_target',0x89ec8,'buy fee selection'),
 ('pump',0x5cef8,'direct_target',0x89ec8,'sell fee selection'),
 ('pump',0x5ce50,'direct_target',0x806c8,'buy fee arithmetic'),
 ('pump',0x5cfb8,'direct_target',0x80488,'sell fee subtraction'),
 ('pump',0x5cdf0,'branch_target',0x5ce08,'buy suppress protocol rate'),
 ('pump',0x5ce08,'branch_target',0x5ce20,'buy suppress creator rate'),
 ('pump',0x5cf48,'branch_target',0x5cf58,'sell suppress protocol amount'),
 ('pump',0x5cf68,'branch_target',0x5cf80,'sell suppress creator amount'),
 ('pump',0x8a168,'branch_target',0x8a178,'exotic requires length over4096'),
 ('pump',0x8a190,'branch_target',0x8a1c8,'exotic nonzero LP field'),
 ('pump',0x8a1a0,'branch_target',0x8a1c8,'exotic nonzero protocol field'),
 ('pump',0x8a1b0,'branch_target',0x8a1c8,'exotic nonzero creator field'),
 ('pump',0x94950,'branch_target',0x94b00,'non-Token2022 metadata short circuit'),
 ('pump',0x5c0b8,'direct_target',0x14910,'non-native quote account validation'),
 ('pump',0x14b38,'branch_target',0x15158,'existing token owner branch'),
 ('pump',0x152f0,'branch_target',0x160a8,'matching quote mint succeeds'),
 ('pump_amm',0x3e3b8,'branch_target',0x3fa70,'mixed direction rejected before Pump'),
 ('pump_amm',0x3ee18,'direct_target',0x45940,'curve group preparation'),
]
for program,at,field,target,meaning in edges:
 assert ins[(program,at)][field]==target,(program,hex(at),meaning)
literals=json.loads((W/'selected-literals.json').read_text())
e=(R/'evidence/original/pump/deployed.so').read_bytes()
for x in literals:assert e[x['at']:x['at']+x['bytes']].hex()==x['hex']
assert literals[0]['value']=='TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'
assert literals[-1]['value']=='bonding-curve'and literals[-1]['bytes']==13
idl=json.loads((W/'captured-interface.json').read_text())
assert len(idl['pump']['accounts'])==13 and len(idl['pump_amm']['accounts'])==16
assert [x['name']for x in idl['pump']['accounts']if x.get('signer')]==['pump_amm_global_config','user','source_authority']
assert all('quote_control'not in x['name']for x in idl['pump']['accounts'])
contract=json.loads((W/'implementation-boundary.json').read_text())
by_name={r['label']:r for r in windows if r['program']=='pump'}
for key,label in [('handler','route'),('per_curve','per_curve'),('intermediate_transfer','intermediate_transfer'),('five_account_parser','five_account_parser')]:
 assert contract['original_body_offsets'][key]==[by_name[label]['start'],by_name[label]['end']]
assert contract['minimum_route']['pump_cpi_account_count']==len(idl['pump']['accounts'])+10
assert contract['minimum_route']['outer_amm_account_count']==len(idl['pump_amm']['accounts'])+10
if(W/'manifest-sha256.json').exists():
 for rel,meta in json.loads((W/'manifest-sha256.json').read_text()).items():
  b=(W/rel).read_bytes();assert sha(b)==meta['sha256']and len(b)==meta['bytes'],rel
print(json.dumps({'status':'PASS','scope':'static file/byte/call/branch verification only','bound_inputs':checked_inputs,'windows':len(windows),'explicit_edges':len(edges),'decoded_branches':branches,'decoded_calls':calls,'runtime_executions':0,'builds':0,'current_source_checked':a.current_source},indent=2))
