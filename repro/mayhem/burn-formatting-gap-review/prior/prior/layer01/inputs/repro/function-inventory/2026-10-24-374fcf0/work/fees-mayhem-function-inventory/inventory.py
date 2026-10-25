"""Read-only symbol/range inventory; no program instructions execute."""
from pathlib import Path
import collections, gzip, hashlib, json, struct, sys
W=Path(__file__).resolve().parent
sys.path.insert(0,str(W/'inputs'))
from elf_reader import Elf
sha=lambda b:hashlib.sha256(b).hexdigest()
read=lambda p:json.loads(p.read_text())

def key(e,start,n):
    return (n,sha(e.normalized[start:start+n]),json.dumps(e.pattern(start,n),sort_keys=True))

def dependencies(e,start,end):
    direct=[];indirect=[];external=[];data=[]
    for pc in range(start,end,8):
        raw=e.b[pc:pc+8]
        if pc in e.calls:
            imm=struct.unpack_from('<i',raw,4)[0]
            direct.append(dict(pc=pc,offset=pc-start,raw_hex=raw.hex(),signed_immediate=imm,target=pc+8+imm*8))
        if raw[0]==0x8d:
            indirect.append(dict(pc=pc,offset=pc-start,raw_hex=raw.hex(),status='indirect_target_unresolved'))
        reloc=e.relocations.get(pc)
        if reloc and reloc['type']==10:
            external.append(dict(pc=pc,offset=pc-start,raw_hex=raw.hex(),**reloc,status='external_syscall_boundary'))
        if reloc and reloc['type']==8 and raw[0]==0x18:
            address=struct.unpack_from('<I',e.b,pc+4)[0] | struct.unpack_from('<I',e.b,pc+12)[0]<<32
            data.append(dict(pc=pc,offset=pc-start,raw_hex=e.b[pc:pc+16].hex(),address=address,
                             kind='code_pointer' if e.lo<=address<e.hi else 'data_pointer',
                             status='target_extent_and_transitive_equivalence_unresolved'))
    return dict(direct=direct,indirect=indirect,external=external,relocated_targets=data)

def inventory(program):
    O,C,S=[Elf((W/'inputs'/(program+'-'+s+'.so')).resolve()) for s in ['original','candidate','symbols']]
    assert C.b[C.lo:C.hi]==S.b[S.lo:S.hi]
    expected={'fees':'a9c4ea9e47356a91bf9bd97318746a7c207b873e32485d7786853f048d7d4afa',
              'mayhem':'9e4e19dfb3b3fefbec13ecfc0d43ffd2ff0bea7b74ac7b2fe14126d23c79c05b'}
    assert sha(C.b)==expected[program]
    excluded={528112} if program=='mayhem' else set()
    orows=[];index=collections.defaultdict(list)
    for i,start in enumerate(O.entries):
        end=O.entries[i+1] if i+1<len(O.entries) else O.hi
        row=dict(original_start=start,original_end=end,original_bytes=end-start,
                 bounds='next-known direct-call/relocation entry, not original debug symbols' if i+1<len(O.entries) else 'terminal text-section boundary; no next known entry',candidate_matches=[])
        if start in excluded:
            row['status']='excluded_stopped_initializer_wrapper_metadata_only'
        else:
            row.update(original_raw_sha256=sha(O.b[start:end]),original_normalized_sha256=sha(O.normalized[start:end]),
                       dependencies=dependencies(O,start,end),status='unattributed_original_range')
            if i+1<len(O.entries):index[key(O,start,end-start)].append(start)
        orows.append(row)
    omap={r['original_start']:r for r in orows}
    grouped=collections.defaultdict(list)
    for f in S.funcs:
        if f['size']>=8:grouped[(f['start'],f['size'])].append(f['name'])
    rows=[]
    accepted=json.loads(gzip.decompress((W/'inputs/fees-accepted-functions.json.gz').read_bytes())) if program=='fees' else None
    accepted_map={r['start']:r for r in accepted['functions']} if accepted else {}
    for (start,n),names in sorted(grouped.items()):
        if program=='mayhem':assert not any('initialize_mayhem_state' in name for name in names)
        pairs=[]
        for at in index[key(C,start,n)]:
            pair=dict(original_start=at,original_end=at+n,original_bytes=n,normalized_equal=True,
                      relocation_pattern_equal=True,raw_equal=C.b[start:start+n]==O.b[at:at+n])
            if accepted and start in accepted_map:
                old=next(m for m in accepted_map[start]['matches'] if m['start']==at and m['entry_bounded'])
                pair['historical_mapped_call_consistent']=old['mapped_calls_consistent']
            pairs.append(pair)
        rows.append(dict(candidate_start=start,candidate_end=start+n,candidate_bytes=n,names=sorted(set(names)),
                         candidate_raw_sha256=sha(C.b[start:start+n]),candidate_normalized_sha256=sha(C.normalized[start:start+n]),
                         original_matches=pairs,known_unmatched_counterparts=[],dependencies=dependencies(C,start,start+n)))
    assert rows[0]['candidate_start']==C.lo and rows[-1]['candidate_end']==C.hi
    assert all(a['candidate_end']==b['candidate_start'] for a,b in zip(rows,rows[1:]))
    cmap={r['candidate_start']:r for r in rows}
    unique={r['candidate_start']:r['original_matches'][0]['original_start'] for r in rows if len(r['original_matches'])==1}
    for row in rows:
        for pair in row['original_matches']:
            actual={d['offset']:d for d in omap[pair['original_start']]['dependencies']['direct']}
            calls=[]
            for call in row['dependencies']['direct']:
                o=actual[call['offset']]; target_row=cmap.get(call['target'])
                possible=[p['original_start'] for p in target_row['original_matches']] if target_row else []
                calls.append(dict(candidate=call,original=o,candidate_target_possible_original_matches=possible,
                                  status='direct_body_target_supported' if o['target'] in possible else 'target_body_unresolved',
                                  unique_mapping_contradiction=call['target'] in unique and unique[call['target']]!=o['target']))
            pair['direct_call_pairs']=calls
            pair['mapped_calls_consistent']=not any(c['unique_mapping_contradiction'] for c in calls)
            pair['all_direct_target_bodies_supported']=all(c['status']=='direct_body_target_supported' for c in calls)
            pair['unresolved_direct_targets']=[c['candidate']['target'] for c in calls if c['status']!='direct_body_target_supported']
            # Preserve the exact prior Fees matcher convention, including ambiguity in its whole-text search.
            if 'historical_mapped_call_consistent' in pair:pair['mapped_calls_consistent']=pair['historical_mapped_call_consistent']
            omap[pair['original_start']]['candidate_matches'].append(dict(candidate_start=row['candidate_start'],
                candidate_end=row['candidate_end'],candidate_bytes=row['candidate_bytes'],names=row['names'],
                raw_equal=pair['raw_equal'],normalized_equal=True,mapped_calls_consistent=pair['mapped_calls_consistent'],
                unresolved_direct_targets=pair['unresolved_direct_targets']))
        row['status']='bounded_normalized_match' if any(p['mapped_calls_consistent'] for p in row['original_matches']) else ('call_target_mismatch' if row['original_matches'] else 'no_bounded_normalized_match')
        for call in row['dependencies']['direct']:
            t=cmap.get(call['target']);call['target_names']=t['names'] if t else []
            call['candidate_target_body_catalogued']=t is not None
    for row in orows:
        if row['candidate_matches']:row['status']='candidate_pattern_mapped' if any(p['mapped_calls_consistent'] for p in row['candidate_matches']) else 'candidate_shape_with_call_target_mismatch'
        for call in row.get('dependencies',{}).get('direct',[]):
            target=omap.get(call['target'])
            call['target_pattern_candidate_addresses']=[p['candidate_start'] for p in target['candidate_matches'] if p['mapped_calls_consistent']] if target else []
            call['status']='target_has_candidate_body_pattern_only' if call['target_pattern_candidate_addresses'] else 'target_body_unresolved'
            call['transitive_closure_proven']=False
    evidence='repro/pump_fees/fee-config-serialization-v144/function-matches.json.gz' if accepted else 'work/fees-mayhem-function-inventory/inventory.py (fresh read-only comparison of saved current ELFs)'
    for row in rows:row['evidence_paths']=[evidence]
    for row in orows:row['evidence_paths']=[evidence,'evidence/original/'+('pump_fees' if program=='fees' else 'mayhem')+'/deployed.so']
    # Add identified but non-identical counterparts without calling them matches.
    known=[]
    if program=='fees':
        for c,o,label in [(30000,36072,'checked FeeConfig wrapper'),(13584,18384,'unchecked FeeConfig wrapper'),(78104,257264,'FeeConfig field decoder'),(208120,405560,'ClaimSocialFeePdaV2 exit')]:
            known.append((c,o,label,'work/fees-mayhem-function-inventory/social-v2-box-hypothesis.json' if c==208120 else 'repro/pump_fees/decoder-contract-static/sealed/REPORT.md'))
        for old in read(W/'inputs/fees-buyback-historical.json')['rows']:
            name=old['candidate']['name']; match=next((r for r in rows if name in r['names']),None)
            if match:known.append((match['candidate_start'],old['original']['start'],old['handler'],'repro/pump_fees/buyback-source-v144/static/typed-macro-box-analysis.json'))
        a=read(W/'inputs/fees-authority-historical.json');match=next(r for r in rows if a['candidate_symbol']['name'] in r['names'])
        known.append((match['candidate_start'],a['original_entry'],'set_authority','repro/pump_fees/authority-guard-v144/static/body-analysis.json'))
    else:
        specs=[('4burn7handler',55448,'burn handler'),('4sell7handler',127520,'legacy sell handler'),
               ('3buy7handler',113672,'legacy buy handler'),('7sell_v27handler',159160,'Mayhem sell_v2 handler'),
               ('6buy_v27handler',140512,'Mayhem buy_v2 handler'),('13buy_pump_swap7handler',85600,'PumpSwap buy handler'),
               ('14sell_pump_swap7handler',95848,'PumpSwap sell handler')]
        for token,o,label in specs:
            match=next(r for r in rows if any(token in n for n in r['names']))
            known.append((match['candidate_start'],o,label,'repro/mayhem/remaining-static/remaining-dispatch.json (original identity only; historical absent-handler status superseded)'))
    known_rows=[]
    for c,o,label,path in known:
        r=cmap[c];original=omap[o];n=r['candidate_bytes'];on=original['original_bytes']
        diffs=[i for i in range(0,n,8) if C.normalized[c+i:c+i+8]!=O.normalized[o+i:o+i+8]] if n==on else None
        item=dict(label=label,candidate_start=c,candidate_end=c+n,candidate_bytes=n,original_start=o,
                  original_end=o+on,original_bytes=on,raw_equal=C.b[c:c+n]==O.b[o:o+on],
                  normalized_equal=n==on and C.normalized[c:c+n]==O.normalized[o:o+on],
                  relocation_pattern_equal=C.pattern(c,n)==O.pattern(o,on),normalized_difference_instruction_offsets=diffs,
                  evidence_path=path,current_bytes_compared=True,behavioral_mismatch_claimed=False)
        r['known_unmatched_counterparts'].append(item);original.setdefault('known_counterparts',[]).append(item);known_rows.append(item)
    if program=='fees':
        closure=read(W/'inputs/fees-closure.json')
        for row in rows:
            refs=[r for r in closure['relocation_targets'] if r['candidate_function']==row['candidate_start']]
            if refs:row['bounded_prior_data_evidence']={'evidence_path':'repro/pump_fees/update-admin-call-closure-static/sealed/closure.json','references':refs}
        for side,catalogue in [('candidate',rows),('original',orows)]:
            for row in catalogue:
                for target in row.get('dependencies',{}).get('relocated_targets',[]):
                    refs=[r for r in closure['relocation_targets'] if r[side+'_pc']==target['pc']]
                    if refs:
                        target['prior_evidence_path']='repro/pump_fees/update-admin-call-closure-static/sealed/closure.json'
                        target['prior_proven_byte_extents']=sorted({r['bytes'] for r in refs if r['extent_proven']})
                        if target['prior_proven_byte_extents']:target['status']='bounded_prior_literal_extent_verified; full transitive equivalence unresolved'
                        elif any(r.get(side+'_record') for r in refs):target['status']='prior_pointer_length_record_decoded; full object extent unresolved'
    matched=[r for r in rows if r['status']=='bounded_normalized_match']
    legacy=[r for r in rows if r['candidate_bytes']>=16]
    summary=dict(candidate_named_ranges=len(rows),candidate_tiny_ranges_below_16_bytes=len(rows)-len(legacy),
                 all_candidate_normalized_call_consistent_ranges=len(matched),
                 all_candidate_raw_exact_ranges=sum(any(p['raw_equal'] for p in r['original_matches']) for r in rows),
                 candidate_named_ranges_at_least_16_bytes=len(legacy),candidate_normalized_call_consistent_ranges=sum(r['status']=='bounded_normalized_match' for r in legacy),
                 candidate_raw_exact_ranges=sum(any(p['raw_equal'] for p in r['original_matches']) for r in legacy),
                 candidate_ranges_without_consistent_match=sum(r['status']!='bounded_normalized_match' for r in legacy),
                 original_inferred_ranges=len(orows),original_ranges_with_candidate_pattern=sum(r['status']=='candidate_pattern_mapped' for r in orows),
                 original_metadata_only_excluded_ranges=len(excluded),original_unattributed_ranges=sum(r['status']=='unattributed_original_range' for r in orows),
                 original_text_bytes=O.hi-O.lo,candidate_text_bytes=C.hi-C.lo,
                 original_body_bytes_with_candidate_pattern=sum(r['original_bytes'] for r in orows if r['status']=='candidate_pattern_mapped'),
                 matched_candidate_body_bytes=sum(r['candidate_bytes'] for r in matched),
                 candidate_symbol_body_bytes=sum(r['candidate_bytes'] for r in rows))
    if accepted:
        assert summary['candidate_named_ranges_at_least_16_bytes']==512
        assert summary['candidate_normalized_call_consistent_ranges']==398
        assert summary['candidate_raw_exact_ranges']==68
    return dict(program=program,inputs={k:dict(sha256=sha(e.b),bytes=len(e.b),text_sha256=sha(e.b[e.lo:e.hi])) for k,e in [('original',O),('candidate',C),('symbols',S)]},
                summary=summary,candidate_rows=rows,original_rows=orows,known_counterparts=known_rows,
                limits=['No complete transitive code/data or runtime equivalence proof.',
                        'Unresolved pointers have no asserted object extent; prior bounded data checks remain separately qualified.',
                        'Original entry intervals are an inferred metadata denominator, not recovered function/debug symbols.',
                        'Mayhem stopped initializer wrapper is excluded; unknown original ranges are not assigned semantic roles.',
                        'Known counterpart identity does not mean matching normalized or raw body.',
                        'No compiler, dependency, source-layout variants, builds or runtime probes.'])

def near_match_leads(reports):
    leads={}
    for program,j in reports.items():
        C=Elf((W/'inputs'/(program+'-candidate.so')).resolve())
        O=Elf((W/'inputs'/(program+'-original.so')).resolve())
        rows=[]
        for c in j['candidate_rows']:
            if c['status']=='bounded_normalized_match' or c['candidate_bytes']<128 or any('initialize' in n.lower() for n in c['names']):continue
            start,n=c['candidate_start'],c['candidate_bytes'];pat=C.pattern(start,n)
            for o in j['original_rows']:
                if o['status'].startswith('excluded') or o['original_bytes']!=n or o['bounds'].startswith('terminal'):continue
                at=o['original_start']
                if O.pattern(at,n)!=pat:continue
                diffs=[i for i in range(0,n,8) if C.normalized[start+i:start+i+8]!=O.normalized[at+i:at+i+8]]
                if 0<len(diffs)<=8:
                    rows.append(dict(candidate_start=start,candidate_end=start+n,original_start=at,original_end=at+n,bytes=n,names=c['names'],
                        differences=[dict(offset=i,candidate_raw_hex=C.b[start+i:start+i+8].hex(),original_raw_hex=O.b[at+i:at+i+8].hex(),candidate_normalized_hex=C.normalized[start+i:start+i+8].hex(),original_normalized_hex=O.normalized[at+i:at+i+8].hex()) for i in diffs],
                        status='similarity lead only; counterpart and semantics not established'))
        leads[program]=rows
    return dict(scope='Same-size/relocation-pattern comparison with one to eight changed normalized instruction slots; leads only, not accepted matches. Initializer-named candidate functions and stopped Mayhem wrapper excluded.',programs=leads)

if __name__=='__main__':
    reports={}
    for name in ['fees','mayhem']:
        report=inventory(name);reports[name]=report
        (W/(name+'-functions.json')).write_text(json.dumps(report,indent=2)+'\n')
        print(name,json.dumps(report['summary'],sort_keys=True))
    (W/'near-match-leads.json').write_text(json.dumps(near_match_leads(reports),indent=2)+'\n')
