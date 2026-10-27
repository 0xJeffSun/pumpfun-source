"""Recheck the bounded sweep block graph on the current, ordinary Rust composition."""
from collections import Counter,defaultdict
import hashlib
import json
from pathlib import Path
import struct
from source import ROOT,module

TRADE=ROOT/'research/mayhem-trade-origins-validator'


def inspect(control_path,candidate_path):
    reader=module('rate_reader',TRADE/'reader.py')
    helpers=module('rate_static_helpers',ROOT/'research/mayhem-sweep-failure-recovery/static.py')
    graph=module('rate_graph',ROOT/'research/mayhem-sweep-branch-layout/analysis.py')
    o=reader.Elf(ROOT/'evidence/original/mayhem/deployed.so')
    b,c=[reader.Elf(Path(p).resolve()) for p in (control_path,candidate_path)]
    rows=json.loads((TRADE/'audit.json').read_bytes())['rows']
    ow={r['start']:o.window(r['start'],r['end']) for r in rows}
    bw,cw=helpers.functions(b),helpers.functions(c)
    def named(e,ws,text):
        found={s['value'] for s in e.symbols if text in s['name'] and s['info']&15==2}
        assert len(found)==1
        return ws[found.pop()]
    rate=named(c,cw,'14validate_sweep17');old=named(b,bw,'14validate_sweep17');original=ow[65472]
    assert rate['end']-rate['start']==912 and old['end']-old['start']==920
    sink_o=next(x['target'] for x in original['direct'] if x['offset']==728)
    sink_c=next(x['target'] for x in rate['direct'] if x['offset']==704)
    chains=[graph.terminal_chain(e,sink,ws) for e,sink,ws in ((o,sink_o,ow),(c,sink_c,cw))]
    assert [{k:v for k,v in x.items() if k!='start'} for x in chains[0]]==[{k:v for k,v in x.items() if k!='start'} for x in chains[1]]
    graphs=[graph.graph(e,w,ws,sink) for e,w,ws,sink in ((o,original,ow,sink_o),(c,rate,cw,sink_c))]
    grouped=[defaultdict(list),defaultdict(list)]
    for i,g in enumerate(graphs):
        for addr,node in g.items():grouped[i][node['fingerprint']].append(addr)
    assert set(grouped[0])==set(grouped[1])
    assert all(len(v)==len(grouped[1][k])==1 for k,v in grouped[0].items())
    mapping={v[0]:grouped[1][k][0] for k,v in grouped[0].items()}
    blocks=[];data=[]
    for start,end in sorted(mapping.items()):
        a,z=graphs[0][start],graphs[1][end]
        assert [[kind,mapping[target]] for kind,target in a['edges']]==z['edges']
        assert [x[0] for x in a['data']]==[x[0] for x in z['data']]
        blocks.append(dict(original_offset=start-original['start'],candidate_offset=end-rate['start'],bytes=a['end']-start,fingerprint=a['fingerprint']))
        for x,y in zip(a['data'],z['data']):
            left,right=graph.data_value(o,x[1],x[1],ow),graph.data_value(c,y[1],x[1],cw)
            assert left==right
            data.append(dict(original_offset=start+x[0]-original['start'],candidate_offset=end+y[0]-rate['start'],value=left))
    assert len(blocks)==22 and len(data)==11
    for e,ws,sink in ((o,ow,sink_o),(c,cw,sink_c)):
        refs=ws[sink]['data_references'];assert len(refs)==1
        address=refs[0]['target'];ptr=graph.pointer(e,address);length=struct.unpack_from('<Q',e.b,address+8)[0]
        assert length==28 and e.b[ptr:ptr+length]==b'attempt to add with overflow'
    # Follow the complete matching instruction wrapper to its actual (unmatched) trader body,
    # then require its unique direct call to the rate helper being compared.
    wrapper=ow[517296]
    wrappers=[w for w in cw.values() if helpers.key(w)==helpers.key(wrapper)]
    assert wrappers
    ordinal=next(i for i,x in enumerate(wrapper['direct']) if x['target']==77200)
    targets={w['direct'][ordinal]['target'] for w in wrappers};assert len(targets)==1
    handler=cw[targets.pop()]
    calls=[x for x in handler['direct'] if x['target']==rate['start']]
    assert len(calls)==1 and sum(x['target']==65472 for x in ow[77200]['direct'])==1
    a,ap=o.norm(original['start'],original['end']);z,zp=c.norm(rate['start'],rate['end'])
    assert (a,ap)!=(z,zp)
    differences=sum(a[i:i+8]!=z[i:i+8] for i in range(0,len(a),8))
    assert differences==19
    counts=[Counter(helpers.key(w) for w in ws.values()) for ws in (bw,cw)]
    lost=sorted(k[0] for k in (counts[0]-counts[1]).elements())
    gained=sorted(k[0] for k in (counts[1]-counts[0]).elements())
    assert lost==[920,4408,4712,7272] and gained==[912,8864,9352]
    shared=sum((counts[0]&counts[1]).values())
    current=ROOT/'research/mayhem-quotes-current-recovery-20261027'
    initializer=module('rate_initializer',current/'initializer_analysis.py').inspect(ROOT,current,Path(control_path).resolve(),Path(candidate_path).resolve())
    assert initializer['snapshot']['complete_normalized_equal'] and initializer['snapshot']['exact_eight_byte_slots']==120
    quotes={}
    for name,file in [('buy','typed_data_reader.py'),('sell','sell_typed_reader.py')]:
        quotes[name]=module('rate_quote_'+name,ROOT/'research/mayhem-buy-retained-recovery'/file).inspect(Path(candidate_path).resolve())
        assert quotes[name]['whole_body_normalized_equal'] and quotes[name]['original_data']==quotes[name]['candidate_data']
    for needle,size in [('legacy_buy_handler17',13784),('legacy_sell_handler17',13008)]:
        x,y=named(b,bw,needle),named(c,cw,needle)
        assert helpers.key(x)==helpers.key(y) and y['end']-y['start']==size
    return dict(original_sha256=hashlib.sha256(o.b).hexdigest(),symbols_sha256=hashlib.sha256(c.b).hexdigest(),
        helper_start=rate['start'],bytes=912,whole_helper_equal=False,same_position_differences=19,
        blocks=blocks,typed_data=data,terminal_chains=chains,live_wrapper_call_pc=wrappers[0]['direct'][ordinal]['pc'],
        live_handler_start=handler['start'],live_helper_call_pc=calls[0]['pc'],
        unchanged_candidate_extents=shared,removed_extent_sizes=lost,added_extent_sizes=gained,
        sweep_failures=helpers.inspect(Path(candidate_path)),
        sizing=module('rate_sizing',ROOT/'research/mayhem-sizing-panic-recovery/static.py').inspect(Path(candidate_path)),
        initializer=initializer,quotes=quotes)
