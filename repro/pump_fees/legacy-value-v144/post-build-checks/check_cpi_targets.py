from pathlib import Path
import sys,json,gzip,hashlib
W=Path(__file__).resolve().parent;sys.path.insert(0,str(W/'reference/analysis-method'))
from elf_reader import Elf
from window_tools import extent,comparison
c=Elf(W/'candidate.so');o=Elf(W/'reference/analysis-method/inputs/original.so');s=Elf(W/'symbols.so');p=json.load(gzip.open(W/'legacy-static-proof.json.gz','rt'));rows={}
for name in ['pump_cpi','pump_metas','pump_infos','amm_metas','amm_infos','sharing_exit','event']:
 a=p['roots']['original'][name];b=p['roots']['candidate'][name];out=[]
 for x,y in zip(o.callsites(a['start'],a['size']),c.callsites(b['start'],b['size']),strict=True):
  assert x['offset']==y['offset'];sizes={f['size']for f in s.funcs if f['start']==y['target']};m=next(iter(sizes))if len(sizes)==1 else extent(c,y['target']);n=extent(o,x['target']);q=comparison(o,c,x['target'],y['target'],n,m)
  assert q['normalized_equal']and q['relocation_pattern_equal'];out.append({'offset':x['offset'],'original':x['target'],'candidate':y['target'],'comparison':q})
 rows[name]=out
assert sum(map(len,rows.values()))==96
result={'candidate_sha256':hashlib.sha256((W/'candidate.so').read_bytes()).hexdigest(),'matched_immediate_targets':96,'rows':rows,'scope':'Complete immediate target bodies only; not transitive closure.'}
(W/'cpi-targets.json').write_text(json.dumps(result,indent=2)+'\n');print('PASS: 96 immediate CPI/metadata/exit/event targets retain normalized matches.')
