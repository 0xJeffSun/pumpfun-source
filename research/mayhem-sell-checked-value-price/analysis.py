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
    wm=module('sell_price_windows',P/'window_map.py');ref=module('sell_price_calls',P/'quote_reference.py')
    original=(ROOT/'evidence/original/mayhem/deployed.so').read_bytes();ow=wm.windows(original)
    results={};images={}
    for label in json.loads((P/'source-inputs.json').read_bytes()):
        candidate,symbols=[gzip.decompress((P/'builds'/label/(name+'.so.gz')).read_bytes()) for name in ['candidate','symbols']]
        images[label]=(candidate,symbols);cw=wm.windows(symbols)
        row=ref.observe(wm,original,ow,candidate,symbols);handlers={}
        for entry,name,address in [('sell','legacy_sell_handler',127520),('sell_v2','sell_v2_handler',159160),('buy','legacy_buy_handler',113672)]:
            body=entry_body(wm,ref,original,ow,symbols,cw,entry,name,address)
            oc=ref.calls(wm,original,body['original'],ow);cc=ref.calls(wm,symbols,body['candidate'],cw)
            sequence=difflib.SequenceMatcher(a=list(map(ref.identity,oc)),b=list(map(ref.identity,cc)),autojunk=False)
            body.update(original_calls=oc,candidate_calls=cc,complete_equal=body['original']['signature']==body['candidate']['signature'],callee_multiset_equal=collections.Counter(map(ref.identity,oc))==collections.Counter(map(ref.identity,cc)),ordered_matches=sum(x.size for x in sequence.get_matching_blocks()),call_order=[list(x) for x in sequence.get_opcodes()])
            handlers[name]=body
        row['handlers']=handlers;results[label]=row
    parent=results['parent']
    for label,row in results.items():
        assert row['matched_windows']==432 and len(row['raw_local_windows'])==84 and len(row['positive_immediate_edges'])==4383
        for key in ['matched_original','raw_local_windows','positive_immediate_edges']:assert row[key]==parent[key]
        assert not row['whole_file_equal'] and not row['meaningful_elf_equal']
        for name in ['legacy_sell_handler','sell_v2_handler']:
            body=row['handlers'][name];assert not body['complete_equal'] and body['callee_multiset_equal']
        assert row['handlers']['legacy_buy_handler']['candidate']['signature']==parent['handlers']['legacy_buy_handler']['candidate']['signature']
        assert row['handlers']['legacy_buy_handler']['candidate']['bytes']==13784
    expected={'parent':(13008,46),'checked-denominator':(13008,49),'proposed':(12864,50),'repeat':(12864,50),'borrowed-reference':(12864,50),'deferred-reserve':(12976,45),'overflowing-product':(12896,46)}
    for label,(size,ordered) in expected.items():
        body=results[label]['handlers']['legacy_sell_handler']
        assert (body['candidate']['bytes'],body['ordered_matches'])==(size,ordered)
        assert len(body['original_calls'])==len(body['candidate_calls'])==51
    assert images['proposed']==images['repeat']==images['borrowed-reference']
    return results
