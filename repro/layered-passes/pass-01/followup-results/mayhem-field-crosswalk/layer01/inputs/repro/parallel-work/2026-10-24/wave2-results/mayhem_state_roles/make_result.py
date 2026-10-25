import json
from pathlib import Path
P=Path(__file__).resolve().parent
cross=json.loads((P/'inputs/crosswalk.json').read_text())
# Explicit, reviewable instruction coordinates; verifier checks their raw encodings.
specs=[
(0,0xe8,0x2bd88,0x67010,0xce00,129,148,195,0x7f8a8,None),
(1,0xec,0x2bda0,0x67050,0xcdf0,130,149,195,0x7f8a8,None),
(3,0x68,0x2bde0,0x670d0,0xcdd0,131,151,195,0x7f8e0,None),
(6,0xf4,0x2be40,0x672c0,0xcda0,134,154,198,0x7f8b0,None),
(8,0x98,0x2be80,0x67368,0xcd80,136,156,198,0x7f908,'sol_withdraw_interval_seconds'),
(10,0xa0,0x2bed0,0x673e8,0xcd60,138,158,None,None,None),
(15,0xd0,0x2bf98,0x675b8,0xcd10,143,163,201,0x7f918,'quote_withdraw_interval_seconds')]
fields=[]
for n,mem,st,ser,ev,sl,el,rl,rpc,name in specs:
 f=dict(next(x for x in cross['global_params_arguments'] if x['argument']==f'field_{n}'))
 f.pop('observed_role');f.pop('trade_read_references')
 f.update(original_memory_offset=mem,setter_pc=st,serializer_pc=ser,event_load_pc=ev,source_setter_lines=[sl,sl+1] if n==3 else [sl,sl],source_event_line=el,reset_source_line=rl,reset_pc=rpc,reset_disposition='preserved' if n==10 else 'zeroed',proposed_name=name,historical_name_recovered=False,semantic_role='unresolved' if name is None else ('SOL' if n==8 else 'quote-token')+' administrator withdrawal interval in seconds, interpreted as signed i64',functional_reads=[])
 if name:
  f['functional_reads']=[dict(source='programs/mayhem/src/lib.rs',lines=[60,78] if n==8 else [44,59],original_rate_window='withdraw_sol_rate' if n==8 else 'withdraw_quote_rate',interval_load_pc=0x2b4d0 if n==8 else 0x2b7d0,last_timestamp_account_offset=138 if n==8 else 238,last_timestamp_memory_offset=0x88 if n==8 else 0xd8,check_range=[0x2b4b8,0x2b530] if n==8 else [0x2b7b8,0x2b830],timestamp_store_pc=0x2b6a8 if n==8 else 0x2b9a8)]
 else:f['missing_evidence']='No functional consumer identified in the reviewed non-initializer source or selected original windows; setter/event/codec/reset behavior does not establish a semantic role. Not a whole-binary absence claim.'
 fields.append(f)
result=dict(checkpoint='8099031',status='complete_disposition_two_roles_supported_five_unresolved',resolved_roles=2,unresolved_roles=5,fields=fields,source_changes=0,builds=0,runtime_probes=0,whole_byte_goal_complete=False,initializer_bodies_examined=False,baseline='Retained fees-mayhem-function-inventory predates newer Pump/Fees candidates; its Mayhem candidate hash is the accepted 9e4e19df build. No current Pump/Fees comparison claimed.',limits=['Names are descriptive proposals, not recovered historical identifiers.','No standalone getter instruction is claimed; getter-like reads here construct update events and serialize accounts.','Selected original windows use retained direct-call/relocation bounds, not proven original function boundaries.','Source-consumer absence is bounded to included non-initializer source; no exhaustive semantic/security claim.','Original executable binding is recorded in provenance.json; copied-window verification alone cannot independently authenticate the unavailable whole ELF.'])
(P/'result.json').write_text(json.dumps(result,indent=2)+'\n')
