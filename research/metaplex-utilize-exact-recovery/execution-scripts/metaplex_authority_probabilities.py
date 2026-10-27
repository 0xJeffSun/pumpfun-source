from pathlib import Path
import re
B=Path('/home/ahi200/pumpfun-work/20261027-metaplex/traces')
for variant in ['owned-control-stages','single-failure-admission-stages']:
 for stage in [249,330,340,342]:
  s=(B/variant/'stages'/f'{stage:03d}.txt').read_text()
  ms=list(re.finditer(r'(?m)^bb\.(\d+)[^\n]*:\n',s));blocks={int(m[1]):s[m.start():ms[i+1].start() if i+1<len(ms) else len(s)] for i,m in enumerate(ms)}
  keys=[k for k,b in blocks.items() if 'ne17h034b8f2a183c21c2E' in b]
  if len(keys)!=1:continue
  key=keys[0];owner=blocks[key];line=next(l for l in owner.splitlines() if l.startswith('; predecessors:'))
  preds=[int(n) for n in re.findall(r'%bb\.(\d+)',line)]
  print('\n',variant,stage,'owner block',key,'preds',preds)
  for k in preds:
   b=blocks[k];print('\n'.join(l for l in b.splitlines() if l.startswith('bb.') or 'successors:' in l or re.search(r'\bJ[A-Z_]+ ',l)))
