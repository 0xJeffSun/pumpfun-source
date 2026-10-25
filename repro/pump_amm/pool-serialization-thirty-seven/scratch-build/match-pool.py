"""Read-only complete-function comparison of the independently built Pool exit."""
from pathlib import Path
import hashlib,json,sys
WORK=Path(__file__).resolve().parent;ROOT=WORK.parents[1]
sys.path.insert(0,str(ROOT/'repro/pump_fees/framework-matching'))
from elf_reader import Elf
original=Elf(ROOT/'evidence/original/pump_amm/deployed.so')
candidate=Elf(WORK/'build/artifacts/pump_amm_recovered.so')
symbols=Elf(WORK/'build/target/sbf-solana-solana/release/pump_amm_recovered.so')
assert candidate.b[candidate.lo:candidate.hi]==symbols.b[symbols.lo:symbols.hi]
digest=lambda b:hashlib.sha256(b).hexdigest()
original_ranges={}
for index,start in enumerate(original.entries):
    end=original.entries[index+1]if index+1<len(original.entries)else original.hi
    original_ranges.setdefault((end-start,digest(original.normalized[start:end])),[]).append(start)
functions={}
for fn in symbols.funcs:functions.setdefault((fn['start'],fn['size']),[]).append(fn['name'])
rows=[]
for(start,length),names in sorted(functions.items()):
    normalized_hash=digest(candidate.normalized[start:start+length])
    hits=[at for at in original_ranges.get((length,normalized_hash),[])
          if original.pattern(at,length)==candidate.pattern(start,length)]
    rows.append({'names':names,'start':start,'bytes':length,'normalized_sha256':normalized_hash,
                 'raw_sha256':digest(candidate.b[start:start+length]),
                 'relocations':candidate.pattern(start,length),'matches':hits})
by_start={row['start']:row for row in rows}
results={}
for role,reference_start,expected_bytes,disc in [('pool',0x4210,1704,bytes([241,154,109,4,17,177,109,188])),('global_config',0x4f00,1648,bytes([149,8,156,202,160,252,176,217]))]:
    selected=[row for row in rows if reference_start in row['matches']]
    assert len(selected)==1,(role,selected)
    row=selected[0];assert row['bytes']==expected_bytes
    assert any('exit_with_expected_owner'in name for name in row['names'])
    calls=[]
    for call in candidate.callsites(row['start'],row['bytes']):
        target=by_start.get(call['target']);reference=original.calls.get(reference_start+call['offset'])
        matches=target['matches']if target else[]
        calls.append({'offset':call['offset'],'candidate_target':call['target'],
                      'candidate_target_names':target['names']if target else[],
                      'original_target':reference,'bounded_target_matches':matches,
                      'target_has_matching_full_body':reference in matches})
    assert all(c['target_has_matching_full_body']for c in calls)
    import struct
    data=[]
    for reloc in row['relocations']:
        assert reloc['type']==8
        pair={}
        for label,elf,start in [('original',original,reference_start),('candidate',candidate,row['start'])]:
            at=start+reloc['offset'];assert elf.b[at]==0x18
            ptr=struct.unpack_from('<I',elf.b,at+4)[0]|struct.unpack_from('<I',elf.b,at+12)[0]<<32
            assert elf.b[ptr:ptr+8]==disc
            pair[label]={'instruction':at,'pointer':ptr,'consumed_bytes_hex':disc.hex()}
        data.append(pair)
    results[role]={'original_start':reference_start,'original_end':reference_start+expected_bytes,
                   'selected_function':row,'direct_target_checks':calls,
                   'all_direct_targets_have_matching_full_bodies':True,'relocated_discriminator_checks':data}
report={'scope':'Full inferred-entry-bounded matching; only actual relocation and direct-call immediates masked in memory. No executable edits; no transitive-rodata or historical-source identity claim.',
        'original':original.identity(),'candidate':candidate.identity(),'symbols':symbols.identity(),
        'functions':results,'full_byte_equality':original.b==candidate.b,
        'all_function_summary':{'total':len(rows),'any_bounded_match':sum(bool(r['matches'])for r in rows)}}
(WORK/'function-match.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'candidate':candidate.identity(),'functions':{key:{'start':hex(r['selected_function']['start']),'bytes':r['selected_function']['bytes'],'direct_calls':len(r['direct_target_checks'])}for key,r in results.items()},'all_function_summary':report['all_function_summary'],'full_byte_equality':report['full_byte_equality']},indent=2))
