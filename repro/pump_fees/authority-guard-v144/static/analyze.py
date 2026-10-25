#!/usr/bin/env python3
"""Read-only proof of the set_authority body mapping and remaining deltas."""
from pathlib import Path
import hashlib,json,struct,sys
R=next(p for p in Path(__file__).resolve().parents if (p/'evidence/original/pump_fees/deployed.so').is_file())
W=Path(__file__).resolve().parent
sys.path.insert(0,str(R/'repro/pump_fees/framework-matching'))
from elf_reader import Elf
O=Elf(R/'evidence/original/pump_fees/deployed.so')
C=Elf(W/'build/artifacts/pump_fees_candidate.so')
S=Elf(W/'build/target/sbf-solana-solana/release/pump_fees_candidate.so')
M=json.loads((W/'function-matches.json').read_text());F={f['start']:f for f in M['functions']}
f=next(f for f in S.funcs if f['name'].startswith('_ZN19pump_fees_candidate19pump_fees_candidate13set_authority'))
a,b,n=f['start'],103408,f['size']
assert n==3320 and O.entries[O.entries.index(b)+1]==b+n
assert O.calls[624368+648]==b
assert C.pattern(a,n)==O.pattern(b,n)
differences=[i for i in range(0,n,8) if C.normalized[a+i:a+i+8]!=O.normalized[b+i:b+i+8]]
assert differences==[816,824]
calls=[]
for ca in C.callsites(a,n):
    target=F[ca['target']];actual=O.calls[b+ca['offset']]
    allowed=[m['start'] for m in target['matches'] if m['entry_bounded'] and m.get('mapped_calls_consistent')]
    assert actual in allowed
    calls.append({**ca,'names':target['names'],'observed_original_target':actual,'bounded_consistent_matches':allowed})
assert len(calls)==14
locations=[]
for name,e,s in [('candidate',C,a),('original',O,b)]:
    at=s+776;ptr=struct.unpack_from('<I',e.b,at+4)[0]|struct.unpack_from('<I',e.b,at+12)[0]<<32
    line=struct.unpack_from('<I',e.b,s+820)[0];length=struct.unpack_from('<I',e.b,s+828)[0]
    locations.append({'side':name,'filename_pointer':ptr,'filename_bytes':length,'filename':e.b[ptr:ptr+length].decode(),'line':line})
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
result={'method':'Entry-bounded instruction comparison; only R8 LDDW address and internal/R10 call immediates normalized in memory. No byte patching. Callee mapping uses bounded normalized bodies with observed-target validation, not names alone. Referenced rodata and deeper arbitrary call graphs are not recursively proven.',
        'original':O.identity(),'candidate':C.identity(),'candidate_symbol':f,'original_entry':b,'original_bytes':n,
        'original_dispatch_wrapper':624368,'original_wrapper_call_offset':648,'remaining_instruction_offsets':differences,
        'relocations':C.pattern(a,n),'calls':calls,'source_locations':locations,'baseline_body_bytes':3472,
        'source_correction':'require_keys_neq!(new_authority,Pubkey::default(),FeeError::InvalidAdmin) -> require!(new_authority != Pubkey::default(),FeeError::InvalidAdmin)',
        'source_spelling_not_unique':True,'build_comparison_sha256':sha(W/'build/build-comparison.json'),'matcher_sha256':sha(W/'function-matches.json')}
(W/'body-analysis.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps({'candidate_sha256':result['candidate']['sha256'],'body_bytes':n,'remaining_instruction_offsets':differences,'mapped_internal_calls':len(calls),'source_locations':locations},indent=2))
