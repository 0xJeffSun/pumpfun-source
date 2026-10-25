#!/usr/bin/env python3
"""Entry-bounded instructions/relocations and exhaustive direct-call accounting."""
from pathlib import Path
import difflib,hashlib,json,sys
R=next(p for p in Path(__file__).resolve().parents if (p/'evidence/original/pump_fees/deployed.so').is_file())
W=Path(__file__).resolve().parent
sys.path.insert(0,str(R/'repro/pump_fees/framework-matching'))
from elf_reader import Elf
O=Elf(R/'evidence/original/pump_fees/deployed.so');C=Elf(W/'state-accountinfo-build/artifacts/pump_fees_candidate.so')
S=Elf(W/'state-accountinfo-build/target/sbf-solana-solana/release/pump_fees_candidate.so')
M=json.loads((W/'state-accountinfo-matches.json').read_text());F={f['start']:f for f in M['functions']}
specs=[('handler',494080,94072,2824),('account_parser',124680,326272,5664),('dispatcher',374384,634776,1384)]
rows=[]
for name,a,b,n in specs:
    assert O.entries[O.entries.index(b)+1]==b+n
    assert any(f['start']==a and f['size']==n for f in S.funcs)
    assert C.normalized[a:a+n]==O.normalized[b:b+n]
    assert C.pattern(a,n)==O.pattern(b,n)
    calls=[]
    for call in C.callsites(a,n):
        actual=O.calls[b+call['offset']];target=F[call['target']]
        allowed=[m['start'] for m in target['matches'] if m['entry_bounded'] and m.get('mapped_calls_consistent')]
        calls.append({**call,'names':target['names'],'observed_original_target':actual,'bounded_consistent_matches':allowed,'observed_target_supported':actual in allowed})
    rows.append({'name':name,'candidate_start':a,'original_start':b,'bytes':n,'candidate_names':F[a]['names'],
                 'normalized_equal':True,'relocations':C.pattern(a,n),'entry_bounded':True,
                 'raw_equal':C.b[a:a+n]==O.b[b:b+n],
                 'candidate_raw_sha256':hashlib.sha256(C.b[a:a+n]).hexdigest(),'original_raw_sha256':hashlib.sha256(O.b[b:b+n]).hexdigest(),
                 'all_direct_calls':calls,'all_direct_targets_supported':all(c['observed_target_supported'] for c in calls)})
assert O.calls[634776+400]==94072 and O.calls[634776+160]==326272
assert rows[0]['all_direct_targets_supported'] and rows[1]['all_direct_targets_supported']
assert not rows[2]['all_direct_targets_supported']
unmapped=[c for row in rows for c in row['all_direct_calls'] if not c['observed_target_supported']]
assert len(unmapped)==1 and unmapped[0]['offset']==488 and unmapped[0]['target']==23280 and unmapped[0]['observed_original_target']==24192
result={'original':O.identity(),'candidate':C.identity(),
        'normalization':'Only relocated address and internal direct-call immediates normalized in memory. R10 syscalls remain relocation evidence, not internal entries. No executable is patched.',
        'call_scope':'Every direct-call target is accounted for. Generic matcher mapped_calls_consistent only checks mapped targets; it is not proof of unmapped callees. Ambiguous matches are accepted only when observed original target belongs to the retained set.',
        'rows':rows,'unresolved_exit':{'candidate_entry':23280,'candidate_bytes':1568,'original_entry':24192,'original_bytes':992,'symbol':F[23280]['names'],'candidate_relocations':C.pattern(23280,1568),'original_relocations':O.pattern(24192,992),'status':'Different Account<FeeConfig>::exit_with_expected_owner serialization path; not changed by this trial.'},
        'source_limits':'Original Rust spelling, module boundaries, comments and metadata remain unknown. Matching instruction bodies plus calls do not recursively establish rodata equality or full program identity.'}
(W/'body-analysis.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps({'matches':[{k:r[k] for k in ['name','candidate_start','original_start','bytes','all_direct_targets_supported']} for r in rows],'unresolved_direct_targets':len(unmapped)},indent=2))
