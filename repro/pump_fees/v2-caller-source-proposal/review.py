"""Static original-window and source-binding review; no target execution."""
from pathlib import Path
import json,struct,hashlib,sys
P=Path(__file__).resolve().parent
sys.path.insert(0,str(P/'evidence/v2-payout-contract'))
from elf_reader import Elf
H=lambda b:hashlib.sha256(b).hexdigest()
def review():
 e=Elf(P/'evidence/v2-payout-contract/inputs/original.so')
 ledger=json.loads((P/'evidence/v2-payout-contract/inputs/full-function-inventory.json').read_text())
 rows={r['start']:r for r in ledger['original_rows']}
 def window(start):
  r=rows[start];end=r['end'];ins=[];pc=start
  while pc<end:
   op,regs,off,imm=struct.unpack_from('<BBhi',e.b,pc);size=16 if op==24 else 8
   q={'pc':pc,'opcode':op,'dst':regs&15,'src':regs>>4,'offset':off,'immediate':imm,'raw':e.b[pc:pc+size].hex()}
   if op==24:q['value']=struct.unpack_from('<I',e.b,pc+4)[0]|struct.unpack_from('<I',e.b,pc+12)[0]<<32
   if pc in e.calls:q['actual_target']=e.calls[pc]
   if pc in e.relocations:q['relocation']=e.relocations[pc]
   ins.append(q);pc+=size
  assert pc==end
  return {'start':start,'end':end,'raw_sha256':H(e.b[start:end]),'normalized_sha256':H(e.normalized[start:end]),'instructions':ins,'dependencies':r['dependencies'],'boundary':'inferred'}
 # Complete adapters, generated CPI functions, metas and infos; no declaration-layout guess.
 starts=[211408,234096,231576,75880,199072,219376,225920,236240,240088,548160,586976,568848,595656,564232,1008,709768,19528,500928]
 ws={str(s):window(s) for s in starts}
 specs=[('pump',568848,548160,237408,550512,{'payer':'authority','creator_vault':'pump_creator_vault','creator_vault_quote_token_account':'pump_creator_vault_ata','quote_token_program':'token_program','event_authority':'pump_event_authority','program':'pump_program'}),('pump_amm',595656,586976,243128,589320,{'payer':'authority','coin_creator':'sharing_config','event_authority':'amm_event_authority','program':'pump_amm_program'})]
 bindings=[]
 for prog,meta,generated,adapter_site,invoke_site,mapping in specs:
  ix=json.loads((P/f'bindings/{prog}-v2-instruction.json').read_text())
  flags=[q['immediate'] for q in ws[str(meta)]['instructions'] if q['opcode']==0x6a and q['offset']>=32 and (q['offset']-32)%34==0]
  expected=[int(a.get('signer',False))+256*int(a.get('writable',False)) for a in ix['accounts']]
  assert flags==expected,(prog,flags,expected)
  assert e.calls[adapter_site]==generated and e.calls[invoke_site]==724336
  disc=bytes(ix['discriminator']);assert any(q.get('value')==int.from_bytes(disc,'little') for q in ws[str(generated)]['instructions'])
  fixed=[{'wire_index':i,'idl_name':a['name'],'proposal_context_field':mapping.get(a['name'],a['name']),'signer':a.get('signer',False),'writable':a.get('writable',False)} for i,a in enumerate(ix['accounts'])]
  bindings.append({'program':prog,'instruction':ix['name'],'fixed_accounts':fixed,'original_flags':flags,'meta_window':meta,'info_window':564232,'generated_window':generated,'adapter_callsite':adapter_site,'invoke_signed_callsite':invoke_site,'discriminator_hex':disc.hex(),'arguments':ix['args'],'original_parser_field_binding':'unresolved; IDL wire names plus source mapping are not original struct offsets'})
 assert e.calls[214160]==709768
 assert e.calls[203080]==1008 and e.calls[224440]==1008
 return {'bindings':bindings,'complete_original_windows':ws,'quote_error':{'site':214160,'target':709768,'api':'with_pubkeys'},'payout_error':{'sites':[203080,224440],'target':1008,'source_api_contract':'Error::with_values((actual,expected)); two ToString calls on reachable AnchorError arm; historical instantiation identity unproven'},'preservation':json.loads((P/'preservation.json').read_text()),'builds':0,'runtime_cases':0,'new_fixtures':0,'whole_file_identity':False,'source_disposition':'review-only incomplete identity proposal'}
if __name__=='__main__':print(json.dumps(review(),sort_keys=True,indent=2))
