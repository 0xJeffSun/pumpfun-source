from pathlib import Path
import json,re
B=Path('/home/ahi200/pumpfun-work/20261027-metaplex/traces')
for variant in ['owned-control-stages','single-failure-admission-stages']:
 p=B/variant
 if not (p/'stage-index.json').exists():continue
 prev=None
 for row in json.loads((p/'stage-index.json').read_text()):
  body=(p/'stages'/f"{row['id']:03d}.txt").read_text()
  owner=body.find('ne17h034b8f2a183c21c2E')
  if owner<0:continue
  infos=[m.start() for m in re.finditer('next_account_info17h843076ed74682877E',body)]
  status=(len([x for x in infos if x<owner]),len(infos))
  if status!=prev:
   prev=status;print(variant,row['id'],row['header'],'next_account calls before/total',status)
