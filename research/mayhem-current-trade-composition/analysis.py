"""Recompute complete-window sets and entry-bound sell caller observations."""
if not __debug__:
    raise RuntimeError('Evidence assertions require ordinary Python')
from pathlib import Path
import collections,difflib,gzip,hashlib,importlib.util,json,sys
P=Path(__file__).resolve().parent
ROOT=P.parents[1]
sys.dont_write_bytecode=True
sha=lambda b:hashlib.sha256(b).hexdigest()
def module(name,path):
    spec=importlib.util.spec_from_file_location(name,path);out=importlib.util.module_from_spec(spec);spec.loader.exec_module(out);return out

def entry_body(wm,ref,original,ow,symbols,cw,entry,name,address):
    wrappers=[x for x in cw if x['name'] and '9__private8__global'+str(len(entry))+entry+'17h' in x['name']]
    assert len(wrappers)==1
    wrapper=wrappers[0]
    old=[x for x in ow if x['signature']==wrapper['signature']]
    assert len(old)==1
    old=old[0];before,after=ref.calls(wm,original,old,ow),ref.calls(wm,symbols,wrapper,cw)
    slots=[i for i,c in enumerate(before) if c.get('target')==address]
    assert len(slots)==1
    slot=slots[0]
    assert before[slot]['offset']==after[slot]['offset']
    target=after[slot]['target']
    body=[x for x in cw if x['address']==target]
    assert len(body)==1
    body=body[0]
    assert body['name'] and str(len(name))+name+'17h' in body['name']
    assert body['bytes']==body['symbol_bytes']
    return dict(original_wrapper=old,candidate_wrapper=wrapper,entry_call_offset=before[slot]['offset'],original=next(x for x in ow if x['address']==address),candidate=body)

def measure():
    wm=module('trade_windows',P/'window_map.py');ref=module('trade_calls',P/'quote_reference.py')
    original=(ROOT/'evidence/original/mayhem/deployed.so').read_bytes();ow=wm.windows(original)
    results={};images={}
    for label in json.loads((P/'source-inputs.json').read_bytes()):
        candidate,symbols=[gzip.decompress((P/'builds'/label/(name+'.so.gz')).read_bytes()) for name in ['candidate','symbols']]
        images[label]=(candidate,symbols);cw=wm.windows(symbols)
        row=ref.observe(wm,original,ow,candidate,symbols);handlers={}
        for entry,name,address in [('sell','legacy_sell_handler',127520),('sell_v2','sell_v2_handler',159160),('buy','legacy_buy_handler',113672),('buy_v2','handler',140512)]:
            body=entry_body(wm,ref,original,ow,symbols,cw,entry,name,address)
            oc=ref.calls(wm,original,body['original'],ow);cc=ref.calls(wm,symbols,body['candidate'],cw)
            sequence=difflib.SequenceMatcher(a=list(map(ref.identity,oc)),b=list(map(ref.identity,cc)),autojunk=False)
            body.update(original_calls=oc,candidate_calls=cc,complete_equal=body['original']['signature']==body['candidate']['signature'],callee_multiset_equal=collections.Counter(map(ref.identity,oc))==collections.Counter(map(ref.identity,cc)),ordered_matches=sum(x.size for x in sequence.get_matching_blocks()),call_order=[list(x) for x in sequence.get_opcodes()])
            handlers[entry]=body
        row['handlers']=handlers;results[label]=row
    parent=results['parent']
    for label,row in results.items():
        assert row['matched_windows']==432 and len(row['raw_local_windows'])==84 and len(row['positive_immediate_edges'])==4383
        for key in ['matched_original','raw_local_windows','positive_immediate_edges']:assert row[key]==parent[key]
        assert not row['whole_file_equal'] and not row['meaningful_elf_equal']
        assert row['handlers']['buy']['candidate']['bytes']==13784
        assert row['handlers']['buy']['candidate']['signature']==parent['handlers']['buy']['candidate']['signature']
    for label in ['proposed','repeat']:
        for entry,component,size,ordered in [('buy_v2','buy-only',18376,46),('sell','sell-only',12864,50),('sell_v2','sell-only',17960,48),('buy','parent',13784,None)]:
            actual=results[label]['handlers'][entry];before=results[component]['handlers'][entry]
            assert actual['candidate']['signature']==before['candidate']['signature']
            assert list(map(ref.identity,actual['candidate_calls']))==list(map(ref.identity,before['candidate_calls']))
            assert actual['candidate']['bytes']==size and not actual['complete_equal']
            if ordered is not None:assert actual['ordered_matches']==ordered and actual['callee_multiset_equal']
    for entry in ['sell','sell_v2']:
        assert results['buy-only']['handlers'][entry]['candidate']['signature']==parent['handlers'][entry]['candidate']['signature']
    assert results['sell-only']['handlers']['buy_v2']['candidate']['signature']==parent['handlers']['buy_v2']['candidate']['signature']
    assert images['proposed']==images['repeat']
    return results
