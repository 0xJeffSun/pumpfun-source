"""Bounded live-caller, seed construction and retained-call/source comparisons."""
from collections import Counter
import difflib
import hashlib
import json
from pathlib import Path
import struct
from source import ROOT,module

TRADE=ROOT/'research/mayhem-trade-origins-validator'
key=lambda w:(w['end']-w['start'],w['normalized_sha256'],json.dumps(w['normalization_pattern'],sort_keys=True))

def functions(e):
    return {s['value']:e.window(s['value'],s['value']+s['size']) for s in e.symbols
            if s['info']&15==2 and s['size']>=8 and e.lo<=s['value']<e.hi}

def sources(e,w):
    result=[]
    for ref in w['data_references']:
        p=ref['target']
        if p not in e.rel or e.rel[p]['type']!=8:continue
        try:
            zero,address,n,line,column=struct.unpack_from('<IIQII',e.b,p)
            if zero or not(0<n<300 and 0<line<100000 and 0<column<10000):continue
            text=e.b[address:address+n].decode()
            if text.endswith('.rs\0'):result.append(dict(offset=ref['offset'],address=p,path=text,line=line,column=column))
        except (UnicodeError,struct.error):continue
    return result

def anchor(e,w):
    # The existing trade-origins reader's bounded stack-Source constructor.
    text=b'programs/mayhem-program/src/instructions/pump_interface.rs';result=[]
    for ref in w['data_references']:
        if e.b[ref['target']:ref['target']+len(text)]!=text:continue
        at=ref['pc'];reg=e.b[at+1]&15
        stores=[]
        for pc in range(at+16,min(at+40,w['end']),8):
            op,r,off,imm=struct.unpack_from('<BBhi',e.b,pc)
            if op==0x7b and r&15==10 and r>>4==reg:stores.append((pc,off))
        if not stores:continue
        pc,off=stores[0];end=next((c['pc'] for c in w['direct'] if c['pc']>pc),None)
        if end is None:continue
        values={}
        for p in range(max(w['start'],at-64),end,8):
            op,r,z,imm=struct.unpack_from('<BBhi',e.b,p)
            if r&15==10 and op==0x7a and z==off+8:values['length']=imm
            if r&15==10 and op==0x62 and z==off+16:values['line']=imm
        if values==dict(length=len(text),line=436):result.append(dict(offset=ref['offset'],path=text.decode(),**values))
    assert len(result)==1
    return result[0]

def measure(o,ow,e,cw,w):
    original=ow[127520];a=o.norm(original['start'],original['end'])[0];b=e.norm(w['start'],w['end'])[0]
    aa=[a[i:i+8] for i in range(0,len(a),8)];bb=[b[i:i+8] for i in range(0,len(b),8)]
    ac=[key(ow[x['target']]) for x in original['direct']];bc=[key(cw[x['target']]) for x in w['direct']]
    matches={key(x) for x in cw.values()}
    return dict(start=w['start'],bytes=w['end']-w['start'],equal=key(original)==key(w),
        equal_slots=sum(x==y for x,y in zip(aa,bb)),
        aligned_slots=sum(x.size for x in difflib.SequenceMatcher(a=aa,b=bb,autojunk=False).get_matching_blocks()),
        original_calls=len(ac),calls=len(bc),call_lcs=sum(x.size for x in difflib.SequenceMatcher(a=ac,b=bc,autojunk=False).get_matching_blocks()),
        normalized_matches=sum(key(x) in matches for x in ow.values()))

def inspect(control_path,candidate_path):
    reader=module('sell_seed_reader',TRADE/'reader.py')
    o=reader.Elf(ROOT/'evidence/original/mayhem/deployed.so')
    rows=json.loads((TRADE/'audit.json').read_bytes())['rows'];ow={r['start']:o.window(r['start'],r['end']) for r in rows}
    original=ow[127520];wrapper=ow[528568];ordinal=next(i for i,c in enumerate(wrapper['direct']) if c['target']==127520)
    images=[o,reader.Elf(Path(control_path).resolve()),reader.Elf(Path(candidate_path).resolve())]
    windows=[ow]+[functions(e) for e in images[1:]];reports=[];handlers=[]
    for role,e,ws in zip(('original','control','candidate'),images,windows):
        if role=='original':w=original;call_pc=wrapper['direct'][ordinal]['pc']
        else:
            matches=[v for v in ws.values() if key(v)==key(wrapper)]
            assert len(matches)==1
            call_pc=matches[0]['direct'][ordinal]['pc'];w=ws[matches[0]['direct'][ordinal]['target']]
            assert Counter(key(ow[c['target']]) for c in original['direct'])==Counter(key(ws[c['target']]) for c in w['direct'])
        handlers.append(w)
        refs=[r for r in w['data_references'] if e.b[r['target']:r['target']+9]==b'sol-vault']
        assert len(refs)==1;ref=refs[0];seed=ref['pc']
        increments=[]
        for pc in range(w['start']+8,seed,8):
            op,r,z,i=struct.unpack_from('<BBhi',e.b,pc);a,b,c,d=struct.unpack_from('<BBhi',e.b,pc-8)
            if op==7 and i==1 and a==0x79 and z==c==0 and r&15==b&15:increments.append(pc-w['start'])
        src=sources(e,w);assert len(src)==7
        assert Counter((r['path'],r['line'],r['column']) for r in src)==Counter((r['path'],r['line'],r['column']) for r in sources(o,original))
        row=dict(role=role,start=w['start'],bytes=w['end']-w['start'],wrapper_call_pc=call_pc,
            seed_offset=ref['offset'],literal_address=ref['target'],increment_offsets=increments,sources=src,cpi_origin=anchor(e,w))
        if role!='control':
            # Exact 176-byte straight-line constructor, including the copy call.
            start,end=seed-24,seed+152
            assert e.norm(start,end)==o.norm(127520+6304,127520+6480)
            block=e.window(start,end);assert not block['branches'] and not block['exits'] and not block['indirect']
            assert len(block['direct'])==len(block['data_references'])==1
            assert key(ws[block['direct'][0]['target']])==key(ow[538096])
            op,r,z,i=struct.unpack_from('<BBhi',e.b,seed-32)
            assert op==0x71 and r&15==1 and z==0x22 and i==0
            assert len(increments)==28
            row.update(seed_block_offset=start-w['start'],seed_block_bytes=176,
                       seed_block_normalized_sha256=block['normalized_sha256'],bump_load_pc=seed-32,
                       copy_call_pc=block['direct'][0]['pc'],copy_target=block['direct'][0]['target'])
        else:
            assert len(increments)==0
            assert e.norm(seed-24,seed+152)!=o.norm(127520+6304,127520+6480)
        reports.append(row)
    before,after=[Counter(key(v) for v in ws.values()) for ws in windows[1:]]
    assert list((before-after).elements())==[key(handlers[1])]
    assert list((after-before).elements())==[key(handlers[2])]
    metrics=[measure(o,ow,e,ws,w) for e,ws,w in zip(images[1:],windows[1:],handlers[1:])]
    assert [r['bytes'] for r in reports]==[12992,13008,12952]
    assert [(x['equal_slots'],x['aligned_slots'],x['call_lcs']) for x in metrics]==[(12,566,45),(47,925,44)]
    return dict(original_sha256=hashlib.sha256(o.b).hexdigest(),
                symbols_sha256=hashlib.sha256(images[2].b).hexdigest(),
                reports=reports,measurements=metrics,unchanged_candidate_extents=sum((before&after).values()),
                new_complete_matches=0,whole_elf_equal=False)


def seed_control(o,e,w):
    refs=[r for r in w['data_references'] if e.b[r['target']:r['target']+9]==b'sol-vault']
    assert len(refs)==1;seed=refs[0]['pc'];count=0
    for pc in range(w['start']+8,seed,8):
        op,r,z,i=struct.unpack_from('<BBhi',e.b,pc);a,b,c,d=struct.unpack_from('<BBhi',e.b,pc-8)
        count+=op==7 and i==1 and a==0x79 and z==c==0 and r&15==b&15
    loads=[pc for pc in range(w['start'],w['end'],8) if
           (lambda x:x[0]==0x71 and x[1]&15==1 and x[2]==0x22 and x[3]==0)(struct.unpack_from('<BBhi',e.b,pc))]
    assert len(loads)==1
    return dict(seed_offset=seed-w['start'],bump_load_offset=loads[0]-w['start'],
                increments_before_seed=count,constructor_equal=e.norm(seed-24,seed+152)==o.norm(127520+6304,127520+6480))
