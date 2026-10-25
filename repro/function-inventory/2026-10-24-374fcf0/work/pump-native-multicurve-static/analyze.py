#!/usr/bin/env python3
"""Read-only ELF/previous-receipt inventory. No runtime or source operations."""
from pathlib import Path
import base64,gzip,hashlib,json,re,shutil,struct,sys
from solders.transaction import VersionedTransaction
from solders.pubkey import Pubkey
R=Path(__file__).resolve().parents[2];W=Path(__file__).resolve().parent;sys.dont_write_bytecode=True
sys.path.insert(0,str(R/'repro/pump_fees/framework-matching'));from elf_reader import Elf
sha=lambda b:hashlib.sha256(b).hexdigest()
inputs=['evidence/original/pump/deployed.so','evidence/original/pump_amm/deployed.so','evidence/upstream/pump.json','evidence/upstream/pump_amm.json','programs/pump/src/multi_hop_curve.rs','programs/pump-amm/src/multi_hop.rs','scripts/pump_amm_multi_hop_differential.py','repro/pump/native-curve-partial-fortyeight/harness/pump_multi_hop_curve_differential.py','repro/pump/bonding-curve-serializer-fortyeight/differential/multi_hop_curve_partial.json.gz','repro/pump_amm/pool-serialization-thirty-seven/multi_hop-differential.json.gz','repro/pump/bonding-curve-serializer-fortyeight/candidate.so','repro/pump_amm/pool-serialization-thirty-seven/pump_amm_recovered.so','work/disassembly/pump.asm','work/disassembly/pump_amm.asm','repro/pump_fees/framework-matching/elf_reader.py']
manifest={p:sha((R/p).read_bytes())for p in inputs}
(W/'input-sha256.json').write_text(json.dumps(manifest,indent=2)+'\n')
(W/'source-evidence').mkdir(exist_ok=True)
for p in inputs:
 if p.endswith(('.rs','.py')):shutil.copy2(R/p,W/'source-evidence'/Path(p).name)
E={name:Elf(R/f'evidence/original/{name}/deployed.so')for name in ['pump','pump_amm']}
windows=[]
for name,spans in [('pump',[(0x567d8,0x57c38,'route'),(0x5b3b0,0x5fc48,'per_curve'),(0xdd700,0xde4b8,'five_account_parser')]),('pump_amm',[(0x3dbc0,0x40100,'caller_route')])]:
 elf=E[name];decoded={}
 for line in(R/f'work/disassembly/{name}.asm').read_text().splitlines():
  m=re.match(r'\s*([0-9a-f]+):\s*((?:[0-9a-f]{2} )+)\s+(.+)',line)
  if m:
   at=int(m[1],16);raw=bytes.fromhex(m[2]);assert elf.b[at:at+len(raw)]==raw;decoded[at]=(raw,m[3])
 for lo,hi,label in spans:
  rows=[]
  for at,(raw,mnemonic)in decoded.items():
   if lo<=at<hi:
    row={'at':at,'hex':hex(at),'raw':raw.hex(),'assembly':re.sub(r' <[^>]*>','',mnemonic)}
    if at in elf.calls:row['direct_target']=elf.calls[at]
    if raw[0]&7==5 and raw[0]not in [0x85,0x8d,0x95]:row['branch_target']=at+8+8*struct.unpack_from('<h',raw,2)[0]
    rows.append(row)
  out={'program':name,'label':label,'start':lo,'end':hi,'bytes':hi-lo,'raw_sha256':sha(elf.b[lo:hi]),'entry_bounded':lo in elf.entries and next(x for x in elf.entries if x>lo)==hi,'instructions':rows,'direct_calls':elf.callsites(lo,hi-lo)}
  (W/f'{name}-{label}.json').write_text(json.dumps(out,indent=2)+'\n');windows.append({k:v for k,v in out.items()if k not in ['instructions','direct_calls']})
(W/'windows.json').write_text(json.dumps(windows,indent=2)+'\n')
PUMP=Pubkey.from_string('6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P');AMM=Pubkey.from_string('pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA');WSOL='So11111111111111111111111111111111111111112';DISC=bytes([225,154,117,22,215,86,246,103])
def read(path):
 raw=(R/path).read_bytes();return json.loads(gzip.decompress(raw)if raw.startswith(b'\x1f\x8b')else raw)
def decode(row):
 value=row['original'];raw=base64.b64decode(value['transaction_base64']);tx=VersionedTransaction.from_bytes(raw);assert all(tx.verify_with_results());keys=tx.message.account_keys;outer=tx.message.instructions[0];assert keys[outer.program_id_index]==AMM
 account_keys=[keys[i]for i in outer.accounts];groups=[]
 for i in range(16,len(account_keys),5):
  keys5=account_keys[i:i+5];assert len(keys5)==5
  group={'base_mint':str(keys5[0]),'quote_mint':str(keys5[1]),'curve_or_pool':str(keys5[2]),'base_vault':str(keys5[3]),'quote_vault':str(keys5[4]),'accounts':[]}
  for key in keys5:
   account=value['before'].get(str(key));group['accounts'].append({'key':str(key),'owner':account['owner']if account else None,'data_bytes':len(bytes.fromhex(account['data_hex']))if account else None})
  groups.append(group)
 calls=[]
 for group in value['inner']:
  for inner in group:
   instruction=inner['instruction'];data=bytes(instruction['data'][1:])
   if keys[instruction['programIdIndex']]==PUMP and data.startswith(DISC):
    accounts=[str(keys[i])for i in instruction['accounts'][1:]];count=struct.unpack_from('<I',data,16)[0]
    assert len(data)==20+count
    calls.append({'amount_in':struct.unpack_from('<Q',data,8)[0],'flags':list(data[20:]),'accounts':accounts,'groups':(len(accounts)-13)//5,'global_config_is_canonical':accounts[2]==str(Pubkey.find_program_address([b'global_config'],AMM)[0])})
 return {'case':row['case'],'error':value['error'],'transaction_sha256':sha(raw),'verified_outer_signatures':len(tx.signatures),'groups':groups,'pump_calls':calls,'known_error_logs':[line for line in value['logs']if 'MultiHopMixedDirection'in line or'MultiHopDiscontinuousPath'in line]}
partial=read(inputs[8]);partial_rows=[decode(row)for row in partial['cases']];assert len(partial_rows)==56
assert sum(bool(row['pump_calls'])for row in partial_rows)==50 and sum(row['error']is None for row in partial_rows)==11
assert all(call['flags']==[3]and call['groups']==1 and call['global_config_is_canonical']for row in partial_rows for call in row['pump_calls'])
legacy=read(inputs[9]);selected=[row for row in legacy['cases']if row['case'].startswith('route-two-curves-')or row['case']=='mixed-direction'];old_rows=[decode(row)for row in selected]
assert len(old_rows)==17
report={'scope':'Read-only decoding of existing saved signed transactions and captured original-side CPIs; zero new execution. AMM receipts compare AMM candidates with captured Pump on both sides, not current Pump multi-curve parity.','partial_receipt_sha256':manifest[inputs[8]],'partial_cases':56,'partial_pump_cpi_cases':50,'partial_successes':11,'partial_rows':partial_rows,'amm_receipt_sha256':manifest[inputs[9]],'amm_rows':old_rows,'two_curve_saved_cases':16,'mixed_direction_saved_cases':1}
(W/'saved-caller-evidence.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'partial':{'cases':56,'Pump_CPIs':50,'successes':11,'flags':sorted({tuple(c['flags'])for row in partial_rows for c in row['pump_calls']})},'historical_two_curve':{'cases':16,'successes':sum(row['error']is None for row in old_rows if row['case']!='mixed-direction'),'flags':sorted({tuple(c['flags'])for row in old_rows for c in row['pump_calls']})},'mixed_direction':next({'error':row['error'],'pump_calls':len(row['pump_calls'])}for row in old_rows if row['case']=='mixed-direction')},indent=2))
