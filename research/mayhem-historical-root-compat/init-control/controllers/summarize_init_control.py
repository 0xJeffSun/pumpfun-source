from pathlib import Path
import json
W=Path(__file__).resolve().parent;P=W/'mayhem-historical-init-needed'
def read(p):return json.loads(p.read_bytes())
labels=('build-01-before','build-02-after','build-03-repeat');runs={n:read(P/n/'analysis.json') for n in labels};prior=read(W/'mayhem-historical-root-compat/publication/report.json')
def compare(a,b):
    am={k for k,v in a['matches'].items() if v};bm={k for k,v in b['matches'].items() if v}
    return dict(gained=sorted(bm-am),lost=sorted(am-bm),raw_gained=sorted(set(b['raw_ids'])-set(a['raw_ids'])),raw_lost=sorted(set(a['raw_ids'])-set(b['raw_ids'])))
out=dict(relocated=compare(prior['borsh_control']['runs']['build-03-after']['inventory'],runs[labels[0]]['inventory']),source=compare(runs[labels[0]]['inventory'],runs[labels[1]]['inventory']),current=compare(prior['runs']['current-native-control'],runs[labels[1]]['inventory']),repeat={name:(P/labels[1]/name).read_bytes()==(P/labels[2]/name).read_bytes() for name in ('symbols.so','stripped.so')},compiler_commands={n:read(P/n/'result.json')['crate_compilations'] for n in labels})
(P/'comparison.json').write_text(json.dumps(out,indent=2)+'\n',encoding='utf-8');print(json.dumps(out))
