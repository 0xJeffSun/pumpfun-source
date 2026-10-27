exec(open('/workspace/fees-recovery/measure.py').read().split('original=')[0])
from collections import defaultdict
parent=Path('/workspace/fees-recovery/accepted-symbols.so').read_bytes();candidate=Path('/workspace/fees-recovery/pre-guard-bvd/symbols.so').read_bytes();images=[parent,candidate];wins=[w.windows(x)for x in images];maps=[{r['address']:r for r in x}for x in wins];names=[{r['name']:r['address']for r in w.m.functions(x)}for x in images];edges=[]
for image,rows in zip(images,wins):
 rel=dict(w.m.relocations(image));out={}
 for r in rows:
  out[r['address']]=[(x['offset'],x['call_target'])for x in w.m.instructions(image,r['address'],r['bytes'])if'call_target'in x and rel.get(r['address']+x['offset'],0)&0xffffffff!=10]
 edges.append(out)
colors=[{r['address']:r['signature']for r in rows}for rows in wins]
for depth in range(8):
 colors=[{at:hashlib.sha256(json.dumps([maps[i][at]['signature'],[(off,colors[i].get(t,'external'))for off,t in es]]).encode()).hexdigest()for at,es in edges[i].items()}for i in range(2)]
packet=json.loads(Path('/workspace/fees-recovery/layout-bindings.json').read_text());resolved={};fail=[]
for r in packet['records']:
 if r['status']!='unresolved'or not r['section'].startswith('.text'):continue
 def sym(s):
  for p in ['.text.unlikely.','.text.startup.','.text.hot.','.text.']:
   if s.startswith(p):return s[len(p):]
 n=sym(r['section']);at=names[0].get(n);hits=[]
 if at in colors[0]:
  hits=[h for h in r['hits']if names[1].get(sym(h['section']))in colors[1]and colors[1][names[1][sym(h['section'])]]==colors[0][at]]
 if len(hits)==1:resolved[r['section']]=hits[0]['section']
 else:fail.append(dict(section=r['section'],parent_address=at,hits=len(hits),candidates=hits))
Path('/workspace/fees-recovery/color-bindings.json').write_text(json.dumps(dict(resolved=resolved,unresolved=fail),indent=2)+'\n');print(len(resolved),'resolved;',len(fail),'unresolved')
