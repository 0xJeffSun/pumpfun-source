from pathlib import Path
from collections import Counter
import gzip, hashlib, importlib.util, json, re
W=Path(__file__).resolve().parent; P=W/'mayhem-source-data-native'
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
v=module('allocator_verify',W/'pumpfun-source/research/mayhem-allocator-sharing/verify.py')
layer=module('native_layer',W/'mayhem-native-build/comparison/layer01.py')
orig=layer.Elf(W/'mayhem-native-build/comparison/original.so')
rows=json.loads((W/'mayhem-native-build/comparison/prior-inventory.json').read_bytes())['original_rows']
windows={r['id']:orig.window(r['start'],r['end'])for r in rows}
paths={'published':P/'published-symbols.so','baseline':P/'build-01/symbols.so'}
paths.update({d.name:d/'build-01/symbols.so'for d in P.iterdir()if(d/'build-01/result.json').exists()})
counts={};report={}
for name,path in paths.items():
 elf=layer.Elf(path); fs=v.functions(elf); c=Counter(v.shape(w)for w in fs.values());counts[name]=c
 raw={w['raw_sha256']for w in fs.values()}
 row=dict(sha256=hashlib.sha256(path.read_bytes()).hexdigest(),bytes=path.stat().st_size,text_bytes=elf.hi-elf.lo,functions=len(fs),normalized_ids=sorted(n for n,w in windows.items()if v.shape(w)in c),raw_ids=sorted(n for n,w in windows.items()if w['raw_sha256']in raw))
 if name!='published':
  b=path.parent;result=json.loads((b/'result.json').read_bytes());assert result['status']=='SUCCEEDED'and result['source_unchanged']and result['target_executions']==0
  assert result['outputs']['symbols.so']==dict(bytes=row['bytes'],sha256=row['sha256'])
  calls=re.findall(r'^\s+Running .*rustc\.exe --crate-name (\w+) ([^\r\n]+)',(b/'stderr.log').read_text(),re.M)
  row['invocations']=dict(total=len(calls),target=sum('--target sbpf-solana-solana'in c for _,c in calls),flagged=[dict(crate=n,flag=re.search(r'-Zshare-generics=\w+',c)[0])for n,c in calls if'-Zshare-generics='in c])
  row['missing_shapes']=[dict(bytes=k[0],normalized_sha256=k[1],pattern=json.loads(k[2]),count=n)for k,n in(counts['published']-c).items()]
  row['extra_shapes']=[dict(bytes=k[0],normalized_sha256=k[1],pattern=json.loads(k[2]),count=n)for k,n in(c-counts['published']).items()]
  row['raw_added']=sorted(set(row['raw_ids'])-set(report['published']['raw_ids']));row['raw_lost']=sorted(set(report['published']['raw_ids'])-set(row['raw_ids']))
 row['error_helpers']=[dict(start=w['start'],bytes=w['end']-w['start'],names=w['names'])for w in fs.values()if any('std2io5error5Error3new17'in n for n in w['names'])]
 report[name]=row
(P/'controls-analysis.json').write_text(json.dumps(report,indent=2)+'\n')
for n,r in report.items():print(n,json.dumps({k:r[k]for k in ['sha256','text_bytes','functions']},sort_keys=True),'matches',len(r['normalized_ids']),len(r['raw_ids']),'missing',[(s['bytes'],s['count'])for s in r.get('missing_shapes',[])],'extra',[(s['bytes'],s['count'])for s in r.get('extra_shapes',[])],r.get('invocations',{}))
