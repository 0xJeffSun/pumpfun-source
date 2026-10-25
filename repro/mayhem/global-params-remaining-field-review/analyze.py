#!/usr/bin/env python3
"""Bounded, offline field-contract evidence. No target execution or build."""
import hashlib, json, pathlib, struct
import re
P = pathlib.Path(__file__).resolve().parent
I = P / 'prior/layer01/inputs'
FIELDS = ['field_0', 'field_1', 'field_3', 'field_6', 'field_10']
def read(p): return json.loads(p.read_text())
def digest(b): return hashlib.sha256(b).hexdigest()
def dump(p, x): p.write_text(json.dumps(x, indent=2, sort_keys=True)+'\n')
def instructions(b, start, end):
    pc = start
    while pc < end:
        op, regs, off, imm = struct.unpack_from('<BBhi', b, pc)
        width = 16 if op == 0x18 else 8
        assert pc + width <= end
        yield dict(pc=pc, end=pc+width, raw_hex=b[pc:pc+width].hex(), opcode=op,
                   dst=regs & 15, src=regs >> 4, displacement=off, immediate=imm)
        pc += width
def run():
    cross = read(P/'prior/residual-ledger.json')
    binary = read(P/'prior/layer01/residual-ledger.json')
    blobs = {'original': (I/'evidence/original/mayhem/deployed.so').read_bytes(),
             'candidate': (I/'repro/mayhem/twentyfour/mayhem_recovered.so').read_bytes()}
    for kind, b in blobs.items(): assert digest(b) == binary['summary'][kind+'_sha256']
    selected = []
    for r in binary['selected_original_windows']:
        if r['label'] in ['update_wrapper', 'update_body', 'update_setter', 'reset_wrapper', 'global_serializer']:
            selected.append(dict(kind='original', label=r['label'], body_analysis=r['body_analysis']))
    for r in binary['candidate_rows']:
        if r['id'] in ['C0147','C0154','C0163','C0170','C0171','C0172','C0173']:
            assert r['scope'] != 'opaque'
            selected.append(dict(kind='candidate', label=r['id'], names=r['names'], body_analysis=r['body_analysis'],
                                 original_matches=r['original_matches'], known_counterparts=r['known_counterparts']))
    decoded = {}
    for r in selected:
        body = r['body_analysis']; b = blobs[r['kind']]
        assert digest(b[body['start']:body['end']]) == body['raw_sha256']
        decoded[(r['kind'],r['label'])] = {x['pc']:x for x in instructions(b,body['start'],body['end'])}
        for c in body['direct']:
            ins = decoded[(r['kind'],r['label'])][c['pc']]
            assert ins['opcode'] == 0x85 and ins['pc'] + 8 + ins['immediate']*8 == c['target']
        for key in ['external','indirect','data_references']:
            for c in body[key]:
                if 'raw_hex' in c:
                    raw = bytes.fromhex(c['raw_hex']); assert b[c['pc']:c['pc']+len(raw)] == raw
    def ins(kind, label, pc):
        return dict(decoded[(kind,label)][pc], binary=kind, window=label)
    # Candidate offsets are relative to r7, loaded at 0x60720; NOT serialized offsets.
    # No historical Rust field name is implied by the candidate symbol names.
    candidate = {
        'field_0': (0x60930,0x60b18,136,0x5b8a0),
        'field_1': (0x60950,0x60b28,140,0x5b8a0),
        'field_3': (0x60998,0x60b48,152,0x5b8b0),
        'field_6': (0x609f0,0x60b78,260,0x5b910),
        'field_10':(0x60a70,0x60bb8,184,None),
    }
    rows=[]
    lib=(I/'programs/mayhem/src/lib.rs').read_text().splitlines()
    arg_types=dict(re.findall(r'pub (field_\d+): Option<(u\d+)>', '\n'.join(lib[268:286])))
    event_fields=re.findall(r'pub (old_version|new_version|field_\d+): (u\d+)', '\n'.join(lib[290:310]))
    event_ranges={};cursor=8
    for name,typ in event_fields:
        width=int(typ[1:])//8;event_ranges[name]=[cursor,cursor+width];cursor+=width
    assert cursor==129 and len(event_fields)==18
    for field in FIELDS:
        base=next(x for x in cross['fields'] if x['owner']=='GlobalParams' and x['field']==field)
        ev=base['role_evidence']; n=ev['serialized_width']; offset=ev['original_memory_offset']
        assert arg_types[field]=={1:'u8',4:'u32',8:'u64'}[n]
        witnesses=[]
        for key,label in [('setter_pc','update_setter'),('event_load_pc','update_body'),('serializer_pc','global_serializer'),('reset_pc','reset_wrapper')]:
            if ev[key] is None: continue
            x=ins('original',label,ev[key]); x['purpose']=key; witnesses.append(x)
            if key=='setter_pc': assert x['dst']==1 and x['displacement']==offset and x['opcode']=={1:0x73,4:0x63,8:0x7b}[n]
            if key=='event_load_pc': assert x['src']==7 and x['displacement']==offset+40 and x['opcode']=={1:0x71,4:0x61,8:0x79}[n]
            if key=='serializer_pc':
                if field=='field_6':
                    # This retained PC is pointer arithmetic, not a load.
                    assert x['opcode']==7 and x['dst']==2 and x['immediate']==offset
                    context=[ins('original',label,p) for p in range(ev[key]-8,ev[key]+32,8)]
                    assert context[0]['opcode']==0xbf and context[0]['src']==7 and context[0]['dst']==2
                    assert context[3]['opcode']==0xb7 and context[3]['dst']==3 and context[3]['immediate']==1
                    assert context[4]['opcode']==0x85 and context[4]['pc']+8+context[4]['immediate']*8==620336
                    x['interpretation']='r2 = r7 + 244; pass one byte to actual target 620336'
                    x['context']=context
                else:
                    assert x['src']==7 and x['displacement']==offset and x['opcode']=={4:0x61,8:0x79}[n]
            if key=='reset_pc':
                assert x['dst']==10 and x['immediate']==0 and x['opcode'] in [0x6a,0x7a]
                w={0x6a:2,0x7a:8}[x['opcode']]
                assert x['displacement']<=offset-536 and offset-536+n<=x['displacement']+w
        store,load,coff,reset=candidate[field]
        for pc,purpose in [(store,'setter'),(load,'event_load')]:
            x=ins('candidate','C0163',pc);x['purpose']=purpose;witnesses.append(x)
            assert x['displacement']==coff
            assert x['opcode']==({'setter':{1:0x73,4:0x63,8:0x7b},'event_load':{1:0x71,4:0x61,8:0x79}}[purpose][n])
            assert (x['dst'] if purpose=='setter' else x['src'])==7
        if reset:
            x=ins('candidate','C0154',reset);x['purpose']='reset';witnesses.append(x)
            assert x['opcode']==0x7a and x['dst']==10 and x['immediate']==0
            assert x['displacement']<=coff-40-536 and coff-40-536+n<=x['displacement']+8
        accesses=[x for x in cross['source_accesses'] if x['owner']=='GlobalParams' and field in x['logical_fields']]
        mentions=[x for x in cross['other_exact_mentions'] if x['token']==field and x['path'].startswith('programs/mayhem/')]
        assert len(accesses)==(2 if field=='field_10' else 3)
        for x in accesses+mentions:
            b=(I/x['path']).read_bytes();assert digest(b)==x['source_sha256']
            a,z=x['token_byte_range'];assert b[a:z].decode()==x['token']
            assert a==0 or not (chr(b[a-1]).isalnum() or b[a-1]==95)
            assert z==len(b) or not (chr(b[z]).isalnum() or b[z]==95)
        reset_stores=[]
        for kind,label,lo,hi,objoffset in [('original','reset_wrapper',0x7f8a8,0x7f940,offset),
                                         ('candidate','C0154',0x5b880,0x5b918,coff-40)]:
            for pc,x in decoded[(kind,label)].items():
                if not lo<=pc<hi:continue
                assert x['opcode'] in [0x7a,0x6a] and x['dst']==10 and x['immediate']==0
                width={0x7a:8,0x6a:2}[x['opcode']]
                target=[x['displacement']+536,x['displacement']+536+width]
                reset_stores.append(dict(x,binary=kind,object_range=target,
                    overlaps_field=target[0]<objoffset+n and objoffset<target[1]))
            overlaps=any(x['binary']==kind and x['overlaps_field'] for x in reset_stores)
            assert overlaps==(field!='field_10')
        rows.append(dict(owner='GlobalParams',field=field,qualified='GlobalParams.'+field,
            account_range=base['range'],candidate_storage=base['storage'],public_type={1:'u8',4:'u32',8:'u64'}[n],
            event_wire_range=event_ranges[field],
            original_object_offset=offset,original_event_base_adjustment=40,candidate_update_r7_offset=coff,
            reset=ev['reset_disposition'],source_accesses=accesses,other_exact_mentions=mentions,
            byte_witnesses=witnesses,reset_direct_stores=reset_stores,historical_name=None,business_role=None,
            recovered_contract='Optional unsigned value copied without field-specific range check; full post-update value emitted. '+
                ('Reset preserves it.' if field=='field_10' else 'Reset zeroes it.'),
            no_business_consumer_proven_in_admitted_source=True,
            all_binary_uses_proven=False))
    # Exhaustive *offset-coincidence* inventory inside already admitted windows only.
    # This does not assign ownership. Different objects and adjusted bases share offsets.
    survey=[]; spans={}
    for kind,key in [('original','original_rows'),('candidate','candidate_rows')]:
        for r in binary[key]:
            if r['scope']=='opaque':continue
            b=r['body_analysis']; assert b is not None
            spans[(kind,b['start'],b['end'])]=r['id']
    for r in selected:
        b=r['body_analysis'];spans.setdefault((r['kind'],b['start'],b['end']),r['label'])
    targets={'original':{},'candidate':{}}
    for r in rows:
        targets['original'][r['field']]=[r['original_object_offset'],r['original_object_offset']+40]
        targets['candidate'][r['field']]=[r['candidate_update_r7_offset'],r['candidate_update_r7_offset']-40]
    for (kind,start,end),label in sorted(spans.items()):
        for x in instructions(blobs[kind],start,end):
            if x['opcode'] not in [0x61,0x69,0x71,0x79,0x62,0x6a,0x72,0x7a,0x63,0x6b,0x73,0x7b]: continue
            hits=[f for f,offsets in targets[kind].items() if x['displacement'] in offsets]
            if hits:survey.append(dict(x,binary=kind,window=label,offset_coincidences=hits,owner='unresolved',
                status='not a field-use claim; no pointer provenance, adjusted-base or interprocedural completeness'))
    # Full current inventory is inherited, not replaced by this selected view.
    ledger=dict(schema='mayhem-five-fields-v1',baseline=binary['baseline'],fields=rows,
        source_coverage=cross['source_coverage'],selected_call_data_ledger=selected,
        offset_coincidence_survey=survey,survey_admitted_windows=len(spans),
        inherited_all_rows='prior/layer01/residual-ledger.json',inherited_summary=binary['summary'],
        original_only_and_opaque_limits=binary['coverage'],
        semantic_interpretation_changed=False,source_patch=None,new_runtime=0,new_builds=0,
        global_binary_use_completeness=False,
        result='Five business roles remain unknown; bounded transport/reset contract corroborated in current candidate and original windows.')
    return ledger
if __name__=='__main__':
    result=run();dump(P/'field-ledger.json',result)
    print(json.dumps(dict(fields=len(result['fields']),witnesses=sum(len(x['byte_witnesses']) for x in result['fields']),
                          selected_windows=len(result['selected_call_data_ledger']),offset_coincidences=len(result['offset_coincidence_survey']))))
