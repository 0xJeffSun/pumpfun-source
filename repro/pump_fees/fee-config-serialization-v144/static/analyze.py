#!/usr/bin/env python3
"""Read-only full entry bodies, relocation records and every direct-call target."""
from pathlib import Path
import hashlib,json,struct,sys
R=next(p for p in Path(__file__).resolve().parents if (p/'evidence/original/pump_fees/deployed.so').is_file())
W=Path(__file__).resolve().parent
sys.path.insert(0,str(R/'repro/pump_fees/framework-matching'))
from elf_reader import Elf
O=Elf(R/'evidence/original/pump_fees/deployed.so');C=Elf(W/'build/artifacts/pump_fees_candidate.so');S=Elf(W/'build/target/sbf-solana-solana/release/pump_fees_candidate.so')
M=json.loads((W/'function-matches.json').read_text());F={f['start']:f for f in M['functions']}
rows=[]
for label,entry,length in [('fee_config_exit',24192,992),('update_admin_handler',94072,2824),('update_admin_parser',326272,5664),('update_admin_dispatcher',634776,1384)]:
 fs=[f for f in M['functions'] if any(x['start']==entry and x['entry_bounded'] and x['mapped_calls_consistent'] for x in f['matches'])];assert len(fs)==1
 f=fs[0];a=f['start'];assert f['bytes']==length
 assert O.entries[O.entries.index(entry)+1]==entry+length
 assert any(x['start']==a and x['size']==length for x in S.funcs)
 assert C.normalized[a:a+length]==O.normalized[entry:entry+length] and C.pattern(a,length)==O.pattern(entry,length)
 calls=[]
 for call in C.callsites(a,length):
  actual=O.calls[entry+call['offset']];target=F[call['target']]
  allowed=[x['start'] for x in target['matches'] if x['entry_bounded'] and x['mapped_calls_consistent']]
  calls.append({**call,'names':target['names'],'observed_original_target':actual,'bounded_consistent_targets':allowed,'observed_target_supported':actual in allowed})
 assert all(c['observed_target_supported'] for c in calls)
 rows.append({'name':label,'candidate_start':a,'original_start':entry,'bytes':length,'candidate_names':f['names'],'normalized_equal':True,'entry_bounded':True,'relocations':C.pattern(a,length),'raw_equal':C.b[a:a+length]==O.b[entry:entry+length],'candidate_raw_sha256':hashlib.sha256(C.b[a:a+length]).hexdigest(),'original_raw_sha256':hashlib.sha256(O.b[entry:entry+length]).hexdigest(),'all_direct_calls':calls,'all_direct_targets_supported':True})
def address(e,at):
 assert e.b[at]==0x18
 return struct.unpack_from('<I',e.b,at+4)[0]|(struct.unpack_from('<I',e.b,at+12)[0]<<32)
def read_va(e,addr,n):
 for sec in e.raw:
  if sec[3]<=addr and addr+n<=sec[3]+sec[5] and sec[1]!=8:
   p=sec[4]+addr-sec[3];return e.b[p:p+n]
 raise ValueError(addr)
row=rows[0];oa=address(O,24192+248);ca=address(C,row['candidate_start']+248);ob=read_va(O,oa,8);cb=read_va(C,ca,8)
assert cb==ob==bytes([143,52,146,187,219,123,76,155])
result={'original':O.identity(),'candidate':C.identity(),'normalization':'Only relocated address and internal direct-call immediates masked in memory. R10 syscalls are relocation evidence, not internal function entries. Executable files are never edited.','scope':'Every direct target from these four bodies is enumerated; targets are supported by observed captured entry-bounded matches. This does not recursively prove all nested callees or arbitrary rodata.','rows':rows,'exit_discriminator_relocation':{'instruction_offset':248,'original_address':oa,'candidate_address':ca,'bytes':8,'hex':ob.hex(),'raw_equal':True},'previous_exit_bytes':1568,'new_exit_bytes':992,'previous_unresolved_dispatcher_call_now_supported':True,'full_original_byte_equality':False,'historical_source_spelling_proven':False}
(W/'body-analysis.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps({'rows':[{k:r[k] for k in ['name','candidate_start','original_start','bytes','all_direct_targets_supported']}|{'direct_calls':len(r['all_direct_calls'])} for r in rows],'discriminator_raw_equal':True},indent=2))
