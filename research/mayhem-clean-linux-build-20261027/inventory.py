import collections,hashlib,importlib.util,json,pathlib,sys
R=pathlib.Path(__file__).resolve().parents[2];P=R/'research/mayhem-quotes-current-recovery-20261027';spec=importlib.util.spec_from_file_location('reader',P/'reader.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
o=m.Elf(R/'evidence/original/mayhem/deployed.so');c=m.Elf(pathlib.Path(sys.argv[1]).resolve());inv=json.loads((P/'inventory.json').read_text());groups=collections.defaultdict(list);key=lambda w:(w['end']-w['start'],w['normalized_sha256'],json.dumps(w['normalization_pattern'],sort_keys=True));cw={};names=collections.defaultdict(list)
for s in c.symbols:
 if s['info']&15==2 and s['size']>=8 and c.lo<=s['value']<c.hi:
  cw[s['value']]=c.window(s['value'],s['value']+s['size']);names[s['value']].append(s['name'])
for a,w in cw.items():groups[key(w)].append(a)
rows=[]
for r in inv['rows']:
 w=o.window(r['start'],r['start']+r['bytes']);hits=groups[key(w)];raw=[a for a in hits if cw[a]['raw_sha256']==w['raw_sha256']];cl='raw-equal' if raw else 'normalized-only' if hits else 'unmatched';rows.append(dict(id=r['id'],start=r['start'],bytes=r['bytes'],classification=cl,parent_classification=r['classification'],counterparts=hits,raw_counterparts=raw))
report=dict(symbols_sha256=hashlib.sha256(c.b).hexdigest(),counts=dict(collections.Counter(r['classification'] for r in rows)),lost=[r['id'] for r in rows if r['classification']=='unmatched' and r['parent_classification']!='unmatched'],gained=[r['id'] for r in rows if r['classification']!='unmatched' and r['parent_classification']=='unmatched'],rows=rows)
for s in c.symbols:
 if 'legacy_buy_handler' in s['name']:report['legacy_buy_symbol']=s
print(json.dumps({k:v for k,v in report.items() if k!='rows'},indent=2));pathlib.Path(sys.argv[2]).write_text(json.dumps(report,indent=2)+'\n')
