"""Optional local static image checks. No compiler, VM, network or receipt reader."""
if not __debug__:
    raise RuntimeError('Optimized Python disables integrity assertions; refusing external inputs')
from pathlib import Path
from collections import defaultdict, Counter
import argparse, hashlib, importlib.util, json, struct
from source_tools import read_under, verify
H=lambda b:hashlib.sha256(b).hexdigest()
PARSER_PINS={
    'research/fees-crank-relay-rejection/window_map.py':'eeec82f751ea38827c5149f28590f19a3ff516c7eee57b6aa48949cbaac4a7e5',
    'research/fees-crank-relay-rejection/elf_helpers.py':'92d28a886a6e5787c03572e5db380711ab11b64de4491414e9ae9b0d08858cfc',
    'scripts/analyze.py':'dd7fb38d795d4dd72a25aab0d65c2223d9f6f75d8b3ecb0de1d87d6e102910ac',
}
ORIGINAL='6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7'
BEFORE=('e97b3900800d4378486d9b1f7df040e6b7a57d34b31a9470a5f5eb3a9d2fb24b','4777cebca298760aa9ab599634b7fa12f27c90c951342d1d01562586ab4b1b8d')
STAGES={'helper':('61b692cf7dd3a063e41d817d55e34af5d724b8218541217c6cdaf22be03757a1','3f4e303551b7d3f50393caacf9134b78278356342ace3512de557650f0455caa'),'wrapper':('1ec426cbb05321d48b4a37e83122845c8161c51f2003ef9ad6ca8b549df40ccb','2a0adc3dd57aa07a25cfd2d7676d77444ee84a96e55c67b3a026f85b1d192027')}


def load_parser(root):
    for name,digest in PARSER_PINS.items():
        assert H(read_under(root,name))==digest, name
    spec=importlib.util.spec_from_file_location('harvest_pinned_windows',Path(root)/'research/fees-crank-relay-rejection/window_map.py')
    w=importlib.util.module_from_spec(spec);spec.loader.exec_module(w)
    # Memoize only immutable ELF layout decoding, never comparisons or outputs.
    original_layout=w.m.elf_layout;cache={}
    def layout(image):
        key=id(image)
        if key not in cache:cache[key]=(image,original_layout(image))
        assert cache[key][0] is image
        return cache[key][1]
    w.m.elf_layout=layout
    return w


def matching(relation):
    """Maximum bipartite capacity, not arbitrary first-duplicate reuse."""
    used={}
    def visit(a,seen):
        for b in sorted(relation[a]):
            if b in seen:continue
            seen.add(b)
            if b not in used or visit(used[b],seen):used[b]=a;return True
        return False
    for a in sorted(relation,key=lambda a:(len(relation[a]),a)):visit(a,set())
    return len(used)


def call_closed(relation,original_calls,candidate_calls):
    relation={a:set(bs) for a,bs in relation.items()}
    while True:
        removed=[]
        for a,bs in relation.items():
            for b in bs:
                if original_calls[a].keys()!=candidate_calls[b].keys() or any(
                    candidate_calls[b][off] not in relation.get(t,set()) for off,t in original_calls[a].items()):
                    removed.append((a,b))
        if not removed:return relation
        for a,b in removed:relation[a].remove(b)
        relation={a:bs for a,bs in relation.items() if bs}


def image_data(w,image):
    windows=w.windows(image);index={f['address']:f for f in windows};groups=defaultdict(list)
    for f in windows:groups[f['signature']].append(f)
    rels=dict(w.m.relocations(image));calls={};data={}
    for f in windows:
        a=f['address'];rows=w.m.instructions(image,a,f['bytes'])
        calls[a]={r['offset']:r['call_target'] for r in rows if 'call_target' in r and rels.get(a+r['offset'],0)&0xffffffff!=10}
        data[a]={r['offset']:r['lddw_value'] for r in rows if rels.get(a+r['offset'],0)&0xffffffff==8}
        assert all(t in index for t in calls[a].values())
    return {'image':image,'windows':windows,'index':index,'groups':groups,'relocations':rels,'calls':calls,'data':data}


def location(w,x,address):
    try:
        if x['relocations'].get(address,0)&0xffffffff!=8:return None
        low,ptr,n,line,col=struct.unpack('<IIQII',w.m.at_address(x['image'],address,24))
        if low or not(0<n<=300 and 0<line<=100000 and 0<col<=300):return None
        path=w.m.at_address(x['image'],ptr,n)
        if not path.endswith(b'.rs') or not all(32<=c<127 for c in path):return None
        return path.decode(),line,col
    except (StopIteration,ValueError,struct.error):return None


def metrics(w,o,c):
    initial={f['address']:{q['address'] for q in c['groups'].get(f['signature'],[])} for f in o['windows']}
    initial={a:bs for a,bs in initial.items() if bs}
    closed=call_closed(initial,o['calls'],c['calls'])
    unique={v[0]['address']:c['groups'][sig][0]['address'] for sig,v in o['groups'].items() if len(v)==1 and len(c['groups'].get(sig,[]))==1}
    edges={};data={}
    for a,b in unique.items():
        assert o['calls'][a].keys()==c['calls'][b].keys() and o['data'][a].keys()==c['data'][b].keys()
        for off,t in o['calls'][a].items():
            u=c['calls'][b][off]
            edges[a,off]=o['index'][t]['signature']==c['index'][u]['signature']
        for off,t in o['data'][a].items():
            u=c['data'][b][off];kind='unresolved_data_extent';value=None
            if t in o['index'] and u in c['index']:
                kind='text_function_pointer';value=o['index'][t]['signature']==c['index'][u]['signature']
            else:
                l=location(w,o,t)
                if l is not None:kind='inferred_Location';value=l==location(w,c,u)
            data[a,off]=(kind,value)
    raw=Counter(f['raw_sha256'] for f in c['windows']);orgraw=Counter(f['raw_sha256'] for f in o['windows'])
    summary={'normalized_membership':len(initial),'maximum_injective_shape_capacity':matching(initial),
             'raw_membership':sum(n for h,n in orgraw.items() if raw[h]),
             'maximum_injective_raw_capacity':sum(min(n,raw[h]) for h,n in orgraw.items()),
             'unique_pairs':len(unique),'call_closed_membership':len(closed),'call_closed_injective_capacity':matching(closed),
             'actual_unique_callee_edges':len(edges),'equal_actual_callee_shapes':sum(edges.values()),
             'data_kinds':dict(Counter(v[0] for v in data.values())),
             'equal_Locations':sum(v==('inferred_Location',True) for v in data.values())}
    return summary,initial,closed,edges,data


def recovered(o,c,original_address,candidate_address=None):
    original=o['index'][original_address]
    if candidate_address is None:
        candidate,=c['groups'][original['signature']]
    else:
        candidate=c['index'][candidate_address]
        assert candidate['signature']==original['signature']
    a,b=original['address'],candidate['address']
    assert o['calls'][a].keys()==c['calls'][b].keys()
    for off,t in o['calls'][a].items():
        u=c['calls'][b][off]
        assert o['index'][t]['signature']==c['index'][u]['signature']
    assert not o['data'][a] and not c['data'][b]
    incoming=[{'caller':x,'offset':off} for x,cc in c['calls'].items() for off,t in cc.items() if t==b]
    assert incoming
    return {'original_address':a,'candidate_address':b,'complete_bytes':original['bytes'],
            'actual_complete_callee_shapes':len(o['calls'][a]),'relocated_data_operands':0,'actual_incoming_calls':incoming}


def main():
    p=argparse.ArgumentParser(description=__doc__)
    for key in ['parser-root','original','before-candidate','before-symbols','candidate','symbols']:
        p.add_argument('--'+key,type=Path,required=True)
    p.add_argument('--stage',choices=sorted(STAGES),default='helper');a=p.parse_args()
    verify(Path(__file__).resolve().parent);w=load_parser(a.parser_root)
    images={k:getattr(a,k).read_bytes() for k in ['original','before_candidate','before_symbols','candidate','symbols']}
    assert H(images['original'])==ORIGINAL
    assert (H(images['before_candidate']),H(images['before_symbols']))==BEFORE
    assert (H(images['candidate']),H(images['symbols']))==STAGES[a.stage]
    for stripped,symbols in [('before_candidate','before_symbols'),('candidate','symbols')]:
        for sec in w.m.elf_layout(images[stripped])['sections']:
            if sec['flags']&2 and sec['type']!=8:
                other,=[q for q in w.m.elf_layout(images[symbols])['sections'] if q['name']==sec['name']]
                assert sec['address']==other['address'] and w.m.section_data(images[stripped],sec['name'])==w.m.section_data(images[symbols],sec['name'])
    o,b,c=[image_data(w,images[k]) for k in ['original','before_symbols','symbols']]
    assert len(o['windows'])==785
    before,bi,bc,be,bd=metrics(w,o,b);after,ai,ac,ae,ad=metrics(w,o,c)
    assert (before['normalized_membership'],before['maximum_injective_shape_capacity'],before['raw_membership'])==(638,636,128)
    assert not(set(bi)-set(ai)) and not(set(bc)-set(ac))
    assert all(k in ae and (not v or ae[k]) for k,v in be.items())
    assert all(k in ad and (v[1] is not True or ad[k]==v) for k,v in bd.items())
    helper=recovered(o,c,1011376)
    assert helper['complete_bytes']==2664 and helper['actual_complete_callee_shapes']==28
    assert o['calls'][1011376][1520]==999808 and o['calls'][999808][288]==999472
    reserve=recovered(o,c,999808,c['calls'][helper['candidate_address']][1520])
    finish=recovered(o,c,999472,c['calls'][reserve['candidate_address']][288])
    # These are genuine called allocator instances, not mere duplicate signatures.
    assert reserve['candidate_address'] in c['calls'][helper['candidate_address']].values()
    assert finish['candidate_address'] in c['calls'][reserve['candidate_address']].values()
    intermediate=None
    expected={1011376}
    if a.stage=='wrapper':
        intermediate=recovered(o,c,478768)
        assert intermediate['complete_bytes']==1480 and intermediate['actual_complete_callee_shapes']==2
        assert o['calls'][478768][1424]==1011376
        assert c['calls'][intermediate['candidate_address']][1424]==helper['candidate_address']
        expected.add(478768)
    assert set(ai)-set(bi)==expected
    assert (after['normalized_membership'],after['maximum_injective_shape_capacity'],after['raw_membership'])==((639,639,128)if a.stage=='helper'else(640,640,128))
    assert o['index'][130776]['signature'] not in c['groups'], 'Boost unexpectedly closed: review scope'
    sections=[]
    for s in w.m.elf_layout(images['original'])['sections']:
        if not s['name'] or s['type']==8:continue
        x,y=w.m.section_data(images['original'],s['name']),w.m.section_data(images['candidate'],s['name'])
        sections.append({'name':s['name'],'original_bytes':len(x),'candidate_bytes':len(y),'same_position_differences':sum(i!=j for i,j in zip(x,y)),'raw_equal':x==y})
    print(json.dumps({'baseline':before,'stage':a.stage,'candidate':after,'gained_original_windows':sorted(set(ai)-set(bi)),
        'lost_original_windows':[],'lost_call_closed_originals':[],'prior_classified_obligations_preserved':True,
        'helper':helper,'intermediate':intermediate,'reserve':reserve,'finish_grow':finish,'sections':sections,
        'whole_capture_equal':images['original']==images['candidate'],
        'whole_meaningful_ELF_equal':images['original'][:w.m.elf_layout(images['original'])['elf_extent']]==images['candidate'],
        'same_position_file_differences':sum(x!=y for x,y in zip(images['original'],images['candidate'])),
        'native_build_verified':False,'runtime_verified':False,'whole_binary_identity_verified':False,
        'scope':'Hash-pinned local images and unchanged normalization. Direct-call greatest fixed point is not full data/indirect/runtime closure or historical source provenance. No receipts loaded.'},indent=2))


if __name__=='__main__':main()
