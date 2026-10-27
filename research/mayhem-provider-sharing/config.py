"""Validate the exact qualified ordering without endorsing its original mapping."""
from pathlib import Path
from collections import Counter,defaultdict
import json

def owner(path):
 n=path.rsplit('/',1)[-1];return '*'+(n[:-1].replace('(',':')if '('in n else n)

def check(default,ordered,plan,before,after):
 ident=lambda x:(x['owner']if 'owner'in x else x['file'].rsplit('/',1)[-1],x['section'])
 a={ident(x):x for x in before};b={ident(x):x for x in after};rows=plan['ordered']
 assert len(a)==len(before)==len(b)==len(after)==len(rows)==449 and a.keys()==b.keys()
 assert len({ident(x)for x in rows})==449 and {ident(x)for x in rows}==a.keys()
 assert [ident(x)for x in after]==[ident(x)for x in rows]
 original=[x['original']for x in rows if x.get('original')is not None];assert len(original)==len(set(original))==441
 for x in rows:
  r=a[ident(x)];assert r['address']==x['address']and r['size']==x['size']
 old='  .text : { *(.text*) } :text';assert default.count(old)==1
 replacement='  .text : {\n'+'\n'.join('    '+owner(x['file'])+'('+json.dumps(x['section'])+')'for x in rows)+'\n    *(.text*)\n  } :text'
 assert default.replace(old,replacement)==ordered
 return dict(qualified_selectors=449,unique_original_hypotheses=441,extra_tail_sections=8,no_added_padding=True,scope='Qualified input selectors and exact linker-script substitution only. Original addresses and role hypotheses are not proved by ordering.')
