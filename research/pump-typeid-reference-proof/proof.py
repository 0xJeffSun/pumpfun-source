"""Follow actual code/data operands around the five recovered TypeId thunks."""
from collections import Counter
from functools import lru_cache
from pathlib import Path
import bisect,importlib.util
from elf import thunk
R=Path(__file__).resolve().parents[2]
s=importlib.util.spec_from_file_location('typeid_windows',R/'research/fees-composed-frontier188/window_map.py')
w=importlib.util.module_from_spec(s);s.loader.exec_module(w)
w.m.elf_layout=lru_cache(maxsize=4)(w.m.elf_layout)
w.m.relocations=lru_cache(maxsize=4)(w.m.relocations)
def require(ok,message):
 if not ok:raise ValueError(message)

def scan(image):
 windows=w.windows(image);bounds={r['address']:r for r in windows};starts=sorted(bounds)
 rel=dict(w.m.relocations(image));text=next(s for s in w.m.elf_layout(image)['sections']if s['name']=='.text')
 instructions=w.m.instructions(image,text['address'],text['size'])
 thunks={r['address']:thunk(w.m.at_address(image,r['address'],56))for r in windows if r['bytes']==56}
 thunks={a:v for a,v in thunks.items()if v is not None}
 require(len(thunks)==5,'five complete TypeId thunks')
 counts=Counter(thunks.values());require(sorted(counts.values())==[1,4],'StringError/panic thunk multiplicity')
 def table(base,count):
  slots=[]
  for i in range(count):
   address=base+8*i;value=int.from_bytes(w.m.at_address(image,address,8),'little')
   if rel.get(address,0)&0xffffffff==8:
    require(value&0xffffffff==0,'encoded data pointer');value>>=32;node=bounds.get(value)
    slots.append(dict(slot=i,kind='function'if node else'data',value=value,signature=node['signature']if node else None,bytes=node['bytes']if node else None))
   else:slots.append(dict(slot=i,kind='literal',value=value))
  return slots
 entries=[]
 for address,value in sorted(thunks.items()):
  refs=[]
  for p,kind in rel.items():
   if kind&0xffffffff!=8 or text['address']<=p<text['address']+text['size']:continue
   encoded=int.from_bytes(w.m.at_address(image,p,8),'little')
   if encoded==address<<32:refs.append(p)
  require(len(refs)==1,'one actual relocated thunk reference')
  slot=3 if counts[value]==1 else 7;base=refs[0]-slot*8
  main=table(base,4 if slot==3 else 11)
  require(main[slot]['kind']=='function'and main[slot]['value']==address,'actual TypeId method target')
  require(main[1]==dict(slot=1,kind='literal',value=0 if slot==3 else 24),'object size')
  require(main[2]==dict(slot=2,kind='literal',value=1 if slot==3 else 8),'object alignment')
  nested=None
  if slot==7:
   require(main[5]['kind']=='data','nested trait vtable')
   nested=table(main[5]['value'],4)
   require([x['kind']for x in nested]==['function','literal','literal','function'],'nested trait shape')
   require(nested[1]['value']==24 and nested[2]['value']==8,'nested object layout')
  users=[]
  for row in instructions:
   pc=text['address']+row['offset']
   if rel.get(pc,0)&0xffffffff==8 and row.get('lddw_value')==base:
    parent=bounds[starts[bisect.bisect_right(starts,pc)-1]]
    users.append(dict(pc=pc,offset=pc-parent['address'],parent=parent['address'],signature=parent['signature'],destination=row['destination']))
  require(users,'actual code use of vtable')
  entries.append(dict(thunk=address,value=[f'{v:016x}'for v in value],base=base,typeid_slot=slot,main=main,nested=nested,code_users=users))
 return entries,bounds

def shape(slots,ignore_typeid=None):
 return [(x['kind'],'typeid'if x['slot']==ignore_typeid else x.get('signature')if x['kind']=='function'else x['value']if x['kind']=='literal'else None)for x in slots]
def users(entry):return sorted((x['signature'],x['offset'],x['destination'])for x in entry['code_users'])
def calls(image,node):
 rel=dict(w.m.relocations(image))
 return [(r['offset'],r['call_target'])for r in w.m.instructions(image,node['address'],node['bytes'])if'call_target'in r and rel.get(node['address']+r['offset'],0)&0xffffffff!=10]

def compare(original,candidate,control=False):
 oo,ow=scan(original);cc,cw=scan(candidate);roots=set();links=[];used=set()
 for o in oo:
  matches=[c for c in cc if o['typeid_slot']==c['typeid_slot']and shape(o['main'],o['typeid_slot']if control else None)==shape(c['main'],c['typeid_slot']if control else None)and users(o)==users(c)and (shape(o['nested'])if o['nested']else None)==(shape(c['nested'])if c['nested']else None)]
  require(len(matches)==1,'unique producer/vtable correspondence');c=matches[0]
  require(c['base']not in used,'injective vtable correspondence');used.add(c['base'])
  raw_equal=w.m.at_address(original,o['thunk'],56)==w.m.at_address(candidate,c['thunk'],56)
  require(raw_equal!=control,'expected recovered/control TypeId body')
  links.append(dict(original=o,candidate=c,raw_typeid_equal=raw_equal))
  for a,b in [(o['main'],c['main']),(o['nested']or[],c['nested']or[])]:
   for left,right in zip(a,b):
    if left['kind']=='function'and not(control and a is o['main']and left['slot']==o['typeid_slot']):roots.add((left['value'],right['value']))
  for a in o['code_users']:
   b=next(b for b in c['code_users']if(a['signature'],a['offset'],a['destination'])==(b['signature'],b['offset'],b['destination']))
   roots.add((a['parent'],b['parent']))
 if control:return dict(vtables=links,raw_typeid_matches=0,control=True)
 pending=list(roots);seen=set();edges=[]
 while pending:
  a,b=pending.pop()
  if(a,b)in seen:continue
  seen.add((a,b));require(ow[a]['signature']==cw[b]['signature'],'reachable body shape')
  aa,bb=calls(original,ow[a]),calls(candidate,cw[b]);require(len(aa)==len(bb),'direct call count')
  for(x,ta),(y,tb)in zip(aa,bb):
   require(x==y and ow[ta]['signature']==cw[tb]['signature'],'actual direct callee shape')
   edges.append(dict(original_parent=a,candidate_parent=b,offset=x,original_target=ta,candidate_target=tb));pending.append((ta,tb))
 return dict(vtables=links,raw_typeid_matches=5,control=False,root_pairs=len(roots),reached_equal_pairs=len(seen),equal_direct_edges=len(edges),direct_edges=sorted(edges,key=lambda x:(x['original_parent'],x['candidate_parent'],x['offset'])))
