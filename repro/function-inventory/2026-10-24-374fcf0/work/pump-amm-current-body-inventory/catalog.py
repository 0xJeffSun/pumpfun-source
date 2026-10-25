#!/usr/bin/env python3
"""Read-only current-body catalog; no build, execution or executable rewriting."""
from pathlib import Path
import collections, hashlib, json, struct, subprocess, sys
sys.dont_write_bytecode=True
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[1]
sys.path.insert(0,str(HERE))
from elf_reader import Elf
SHA=lambda b:hashlib.sha256(b).hexdigest()
PROGRAMS={
'pump':{'candidate':'repro/pump/native-curve-partial-fortyeight/candidate.so','candidate_sha256':'6271a6d5782d350f6d716a91712d283592d4589aa8e9befb9c1f1a0dd3ac7ebe','symbols':'work/pump-multi-hop-curve-recovery/main-build-01/target/sbf-solana-solana/release/pump_recovered.so'},
'pump_amm':{'candidate':'repro/pump_amm/pool-serialization-thirty-seven/pump_amm_recovered.so','candidate_sha256':'5a68db39372121c6406727bced3087aa9caf63f14a999ac68206c9b5b3401216','symbols':'work/amm-pool-serializer-recovery/build/target/sbf-solana-solana/release/pump_amm_recovered.so'},
}

def ptr(elf,at):
    return struct.unpack_from('<I',elf.b,at+4)[0]|struct.unpack_from('<I',elf.b,at+12)[0]<<32


def section_at(elf,address):
    for name,s in elf.secs.items():
        if s[3]<=address<s[3]+s[5] and s[5] and s[1]!=8:
            return {'section':name,'section_offset':address-s[3],'file_offset':s[4]+address-s[3]}
    return None


def body_details(elf,start,size):
    data=[];external=[];indirect=[]
    for reloc in elf.pattern(start,size):
        at=start+reloc['offset']
        if reloc['type']==8 and elf.b[at]==0x18:
            address=ptr(elf,at);region=section_at(elf,address)
            data.append({'instruction_offset':reloc['offset'],'relocation_type':8,'target_address':address,'target_address_hex':hex(address),'target_region':region,'pointee_extent_proven':False,'consumed_bytes_proven':False,'kind':'code-pointer'if region and region['section']=='.text'else'data-pointer'})
        elif reloc['type']==10:
            external.append({'instruction_offset':reloc['offset'],'symbol':reloc['symbol']})
    for at in range(start,start+size,8):
        if elf.b[at]==0x8d:
            indirect.append({'instruction_offset':at-start,'instruction_hex':elf.b[at:at+8].hex(),'target_unresolved':True})
    return {'relocations':elf.pattern(start,size),'direct_calls':elf.callsites(start,size),'data_references':data,'external_calls':external,'indirect_calls':indirect}


def catalog(name,settings):
    original=Elf(ROOT/f'evidence/original/{name}/deployed.so')
    candidate=Elf(ROOT/settings['candidate']);symbols=Elf(ROOT/settings['symbols'])
    assert SHA(candidate.b)==settings['candidate_sha256']
    for elf in [original,candidate,symbols]:
        assert elf.text[3]==elf.text[4], 'Reader addresses require identical .text virtual address/file offset'
    assert candidate.b[candidate.lo:candidate.hi]==symbols.b[symbols.lo:symbols.hi]
    assert candidate.pattern(candidate.lo,candidate.hi-candidate.lo)==symbols.pattern(symbols.lo,symbols.hi-symbols.lo)
    entries=sorted(set(original.entries)|{original.lo})
    candidate_functions={}
    for fn in symbols.funcs:
        candidate_functions.setdefault((fn['start'],fn['size']),set()).add(fn['name'])
    candidate_rows=[];match_index=collections.defaultdict(list)
    for (start,size),names in sorted(candidate_functions.items()):
        assert candidate.lo<=start<start+size<=candidate.hi
        row={'start':start,'start_hex':hex(start),'end':start+size,'bytes':size,'names':sorted(names),'raw_sha256':SHA(candidate.b[start:start+size]),'normalized_sha256':SHA(candidate.normalized[start:start+size]),**body_details(candidate,start,size)}
        candidate_rows.append(row)
        match_index[(size,row['normalized_sha256'],json.dumps(row['relocations'],sort_keys=True))].append(row)
    original_rows=[]
    incoming=collections.defaultdict(list)
    for at,target in original.calls.items():incoming[target].append(at)
    for i,start in enumerate(entries):
        end=entries[i+1]if i+1<len(entries)else original.hi
        size=end-start;details=body_details(original,start,size)
        nh=SHA(original.normalized[start:end]);rh=SHA(original.b[start:end])
        matches=match_index[(size,nh,json.dumps(details['relocations'],sort_keys=True))]
        original_rows.append({'index':i,'start':start,'start_hex':hex(start),'end':end,'end_hex':hex(end),'bytes':size,'boundary_kind':'inferred-entry-to-next-entry','entry_direct_call_sites':incoming[start],'entry_symbol_names':[f['name']for f in original.funcs if f['start']==start],'raw_sha256':rh,'normalized_sha256':nh,**details,
          'candidate_matches':[{'start':r['start'],'start_hex':r['start_hex'],'bytes':r['bytes'],'names':r['names'],'raw_equal':r['raw_sha256']==rh,'normalized_equal':True}for r in matches],
          'raw_status':'exact-body-match'if any(r['raw_sha256']==rh for r in matches)else'no-exact-complete-body-match',
          'normalized_status':'complete-entry-bounded-match'if matches else'no-complete-entry-bounded-match',
          'data_consumption_equivalence':'unresolved'if details['data_references']else'no-ELF-relocated-data-reference-in-body',
          'transitive_semantics_proven':False})
    by_original={r['start']:r for r in original_rows};by_candidate={r['start']:r for r in candidate_rows}
    reverse=collections.defaultdict(list)
    for row in original_rows:
        for hit in row['candidate_matches']:reverse[hit['start']].append(row['start'])
    for row in original_rows:
        row['unresolved_direct_call_targets']=[]
        for call in row['direct_calls']:
            target=by_original.get(call['target']);call['target_candidate_matches']=[r['start']for r in target['candidate_matches']]if target else[]
            call['target_bounded_body_match_available']=bool(call['target_candidate_matches'])
            if not call['target_bounded_body_match_available']:row['unresolved_direct_call_targets'].append(call['target'])
        row['unresolved_direct_call_targets']=sorted(set(row['unresolved_direct_call_targets']))
        for hit in row['candidate_matches']:
            checks=[]
            for call in row['direct_calls']:
                ct=candidate.calls.get(hit['start']+call['offset'])
                checks.append({'offset':call['offset'],'original_target':call['target'],'candidate_target':ct,'target_complete_body_pair_matches':call['target']in reverse.get(ct,[])})
            hit['direct_target_checks']=checks
            hit['all_direct_target_pairs_match']=all(x['target_complete_body_pair_matches']for x in checks)
            hit['relocated_data_target_pairs']=[]
            candidate_refs={x['instruction_offset']:x for x in by_candidate[hit['start']]['data_references']}
            for ref in row['data_references']:
                other=candidate_refs.get(ref['instruction_offset'])
                hit['relocated_data_target_pairs'].append({'instruction_offset':ref['instruction_offset'],'original_target':ref['target_address'],'candidate_target':other['target_address']if other else None,'consumed_extent_equivalence_proven':False})
    for row in candidate_rows:
        row['original_matches']=reverse[row['start']]
    summary={'original_inferred_windows':len(original_rows),'original_text_bytes':original.hi-original.lo,'original_catalogued_bytes':sum(r['bytes']for r in original_rows),'candidate_named_function_ranges':len(candidate_rows),'original_windows_with_raw_body_match':sum(any(h['raw_equal']for h in r['candidate_matches'])for r in original_rows),'original_windows_with_normalized_body_match':sum(bool(r['candidate_matches'])for r in original_rows),'original_windows_with_direct_call_consistent_match':sum(any(h['all_direct_target_pairs_match']for h in r['candidate_matches'])for r in original_rows),'original_windows_without_normalized_body_match':sum(not r['candidate_matches']for r in original_rows),'candidate_ranges_with_original_match':sum(bool(r['original_matches'])for r in candidate_rows),'original_matched_body_bytes':sum(r['bytes']for r in original_rows if r['candidate_matches']),'original_unmatched_body_bytes':sum(r['bytes']for r in original_rows if not r['candidate_matches']),'original_windows_with_unresolved_relocated_data':sum(bool(r['data_references'])for r in original_rows),'original_windows_with_indirect_calls':sum(bool(r['indirect_calls'])for r in original_rows)}
    assert summary['original_catalogued_bytes']==summary['original_text_bytes']
    report={'schema':1,'scope':'Read-only complete instruction-window inventory, not a recovered-source function count. Original boundaries inferred from dynamic symbols, ELF entry, actual relocations, direct-call targets and section start; indirect-only entries may be missing. Normalization masks only actual ELF relocation and direct-call immediates in memory; full relocation patterns and complete inferred-window lengths must match. No executable or normalized bytes are written. Raw equality reported separately. All relocated data consumption and transitive semantic equivalence remain unproven unless separately referenced evidence establishes a bounded case.', 'program':name,'original':original.identity(),'candidate':candidate.identity(),'candidate_symbols':symbols.identity(),'candidate_symbol_text_and_relocations_identical':True,'whole_file_equal':original.b==candidate.b,'summary':summary,'original_windows':original_rows,'candidate_functions':candidate_rows}
    (HERE/(name+'-bodies.json')).write_text(json.dumps(report,indent=2)+'\n')
    return report

if __name__=='__main__':
    reports={name:catalog(name,settings)for name,settings in PROGRAMS.items()}
    summary={name:r['summary']for name,r in reports.items()}
    (HERE/'body-summary.json').write_text(json.dumps(summary,indent=2)+'\n')
    print(json.dumps(summary,indent=2))
