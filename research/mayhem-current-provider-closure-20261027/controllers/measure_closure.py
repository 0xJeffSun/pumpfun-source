from pathlib import Path
from collections import defaultdict
import gzip,hashlib,importlib.util,json,sys
R=Path('/workspace/pumpfun-source-current');P=R/'research/mayhem-quotes-current-recovery-20261027'
s=importlib.util.spec_from_file_location('r',P/'reader.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
o=m.Elf(R/'evidence/original/mayhem/deployed.so');c=m.Elf(Path(sys.argv[1]).resolve());rows=json.loads((P/'inventory.json').read_bytes())['rows'];ow={r['start']:o.window(r['start'],r['start']+r['bytes']) for r in rows};cw={s['value']:c.window(s['value'],s['value']+s['size']) for s in c.symbols if s['info']&15==2 and s['size']>=8 and c.lo<=s['value']<c.hi};key=lambda w:(w['end']-w['start'],w['normalized_sha256'],json.dumps(w['normalization_pattern'],sort_keys=True));group=defaultdict(list)
for a,w in cw.items():group[key(w)].append(a)
pairs={(a,b) for a,w in ow.items() for b in group[key(w)]};edges={p:[(a['target'],b['target']) for a,b in zip(ow[p[0]]['direct'],cw[p[1]]['direct'])] for p in pairs}
for a,b in pairs:assert [x['offset'] for x in ow[a]['direct']]==[x['offset'] for x in cw[b]['direct']]
active=pairs.copy();rounds=[]
while True:
 drop={p for p in active if any(t not in active for t in edges[p])}
 if not drop:break
 active-=drop;rounds.append(len(drop))
report=dict(symbols_sha256=hashlib.sha256(c.b).hexdigest(),normalized_pairs=len(pairs),normalized_windows=len({a for a,b in pairs}),direct_closed_pairs=len(active),direct_closed_windows=len({a for a,b in active}),removed_pairs_per_round=rounds,without_closed_counterpart=[r['id'] for r in rows if r['start'] in {a for a,b in pairs} and r['start'] not in {a for a,b in active}])
print(json.dumps(report,indent=2));Path(sys.argv[2]).write_text(json.dumps(report,indent=2)+'\n')
