#!/usr/bin/env python3
"""Read-only byte-bound static excerpts. Does not execute a program or harness."""
from pathlib import Path
import hashlib,json,re,shutil,struct,sys
sys.dont_write_bytecode=True
W=Path(__file__).resolve().parent
R=W.parents[1]
sys.path.insert(0,str(R/'repro/pump_fees/framework-matching'))
from elf_reader import Elf
sha=lambda b:hashlib.sha256(b).hexdigest()
inputs=[
 'evidence/original/pump/deployed.so','evidence/original/pump_amm/deployed.so',
 'evidence/upstream/pump.json','evidence/upstream/pump_amm.json',
 'repro/pump/bonding-curve-serializer-fortyeight/candidate.so',
 'repro/pump_amm/pool-serialization-thirty-seven/pump_amm_recovered.so',
 'repro/pump/bonding-curve-serializer-fortyeight/differential/multi_hop_curve_partial.json.gz',
 'repro/pump_amm/pool-serialization-thirty-seven/multi_hop-differential.json.gz',
 'programs/pump/src/multi_hop_curve.rs','programs/pump/src/trade_types.rs',
 'programs/pump/src/lib.rs','programs/pump/src/create_v2.rs',
 'programs/pump/src/quote_control/state.rs','programs/pump-amm/src/multi_hop.rs',
 'repro/pump/bonding-curve-serializer-fortyeight/build-attempt.json',
 'work/pump-native-multicurve-static/manifest-sha256.json',
 'work/pump-native-multicurve-static/saved-caller-evidence.json',
 'work/pump-multi-hop-curve-static/direct-call-graph.json',
 'work/disassembly/pump.asm','work/disassembly/pump_amm.asm',
 'repro/pump_fees/framework-matching/elf_reader.py',
]
manifest={p:{'sha256':sha((R/p).read_bytes()),'bytes':(R/p).stat().st_size}for p in inputs}
(W/'input-sha256.json').write_text(json.dumps(manifest,indent=2)+'\n')
(W/'source-evidence').mkdir(exist_ok=True)
for p in inputs:
 if p.endswith(('.rs','.py')):
  dst=W/'source-evidence'/p.replace('/','__');shutil.copy2(R/p,dst)
spans={
 'pump':[
  (0x567d8,0x57c38,'route'),(0x5b3b0,0x5fc48,'per_curve'),
  (0xdd700,0xde4b8,'five_account_parser'),(0xde4b8,None,'hop_exit'),
  (0x5a260,0x5b3b0,'intermediate_transfer'),(0x58668,0x58bf0,'token_program_selection'),
  (0x58bf0,0x58f58,'vault_address_check'),(0x14910,0x160d0,'quote_vault_existing_account_branch'),
  (0x3cd50,0x3d250,'curve_account_preparation'),(0x89ec8,None,'fee_selection'),
  (0x89b48,0x89ec8,'fee_tier_selection'),(0x88f90,None,'fee_rounding'),
  (0x80488,0x806c8,'subtract_fees'),(0x806c8,0x80df8,'buy_amount_after_fees'),
  (0xa0538,0xa0838,'sell_quote'),(0xa0838,0xa08f8,'buy_base'),
  (0xa08f8,0xa0bf0,'market_cap'),(0xa0bf0,0xa13e0,'buy_reserve_mutation'),
  (0xa13e0,0xa1bd8,'sell_reserve_mutation'),(0xa1bd8,None,'fee_accrual'),
  (0x8df98,0x8e450,'native_input'),(0x93050,0x93898,'base_output'),
  (0x8eda0,0x8f5c8,'quote_output'),(0x965b8,None,'native_output'),
  (0x58f58,0x5a260,'native_buyback'),
  (0x94908,0x94958,'legacy_owner_short_circuit'),
  (0x94b00,0x94b28,'legacy_no_transfer_fee_result'),
  (0x94e28,0x94e58,'absent_transfer_fee_zero'),
 ],
 'pump_amm':[(0x3dbc0,0x40100,'caller_route')],
}
windows=[]
for name,items in spans.items():
 elf=Elf(R/f'evidence/original/{name}/deployed.so');decoded={}
 for line in(R/f'work/disassembly/{name}.asm').read_text().splitlines():
  m=re.match(r'\s*([0-9a-f]+):\s*((?:[0-9a-f]{2} )+)\s+(.+)',line)
  if m:
   at=int(m[1],16);raw=bytes.fromhex(m[2]);assert elf.b[at:at+len(raw)]==raw
   decoded[at]=(raw,re.sub(r' <[^>]*>','',m[3]))
 for lo,hi,label in items:
  if hi is None:hi=next(v for v in elf.entries if v>lo)
  rows=[]
  for at,(raw,assembly)in decoded.items():
   if lo<=at<hi:
    row={'at':at,'hex':hex(at),'raw':raw.hex(),'assembly':assembly}
    if at in elf.calls:row['direct_target']=elf.calls[at]
    if at in elf.relocations:row['relocation']=elf.relocations[at]
    if raw[0]&7==5 and raw[0]not in[0x85,0x8d,0x95]:row['branch_target']=at+8+8*struct.unpack_from('<h',raw,2)[0]
    rows.append(row)
  out={'program':name,'label':label,'start':lo,'end':hi,'bytes':hi-lo,'raw_sha256':sha(elf.b[lo:hi]),'entry_bounded':lo in elf.entries and next(v for v in elf.entries if v>lo)==hi,'instructions':rows,'direct_calls':elf.callsites(lo,hi-lo)}
  (W/f'{name}-{label}.json').write_text(json.dumps(out,indent=2)+'\n')
  windows.append({k:v for k,v in out.items()if k not in['instructions','direct_calls']})
(W/'windows.json').write_text(json.dumps(windows,indent=2)+'\n')
# Decode only public program/mint constants already selected by the inspected branches.
from solders.pubkey import Pubkey
e=Elf(R/'evidence/original/pump/deployed.so')
constants=[]
for at,n,label in[(0x1b5ca8,32,'Token-2022 owner comparison'),(0x1b5cc8,32,'WSOL fee tier key'),(0x1b5a88,32,'second native fee tier key'),(0x1b5d28,32,'USDC fee tier key'),(0x1b683a,13,'curve seed')]:
 raw=e.b[at:at+n]
 constants.append({'at':at,'bytes':n,'hex':raw.hex(),'label':label,'value':str(Pubkey(raw))if n==32 else raw.decode()})
(W/'selected-literals.json').write_text(json.dumps(constants,indent=2)+'\n')
idl={}
for program,name in [('pump','multi_hop_curve_swap'),('pump_amm','multi_hop_swap')]:
 j=json.loads((R/f'evidence/upstream/{program}.json').read_text())
 idl[program]=next(i for i in j['instructions']if i['name']==name)
(W/'captured-interface.json').write_text(json.dumps(idl,indent=2)+'\n')
print(json.dumps({'input_files':len(inputs),'byte_bound_windows':len(windows),'runtime_executions':0,'source_builds':0},indent=2))
