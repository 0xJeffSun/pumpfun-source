"""Bounded Source, relocated-code and 32-byte prefix relation over full windows."""
from pathlib import Path
import importlib.util,json,struct,tempfile
P=Path(__file__).resolve().parent;R=P.parents[1];M=R/'research/mayhem-current-macro-call-closure-20261027'
def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
q=module('selected_prefix_matcher',M/'verify.py');reader=module('selected_prefix_elf',M/'reader.py')
def elves(original,candidate):
 with tempfile.TemporaryDirectory()as d:
  a,b=Path(d)/'original.so',Path(d)/'candidate.so';a.write_bytes(original);b.write_bytes(candidate);return reader.Elf(a),reader.Elf(b)
def prefix(e,windows,address):
 sections=[s for s in e.sections if s['type']!=8 and s['address']<=address and address+32<=s['address']+s['size']]
 if len(sections)!=1:return None
 s=sections[0];at=s['offset']+address-s['address'];v=list(struct.unpack_from('<QQQQ',e.b,at));size,align=v[1:3]
 if any(address+i in e.rel for i in (8,16))or not 0<align<=4096 or align&(align-1)or size>1048576:return None
 targets=[]
 for i in (0,24):
  value=v[i//8]
  if value==0 and i==0:
   if address in e.rel:return None
   targets.append(None);continue
  if address+i not in e.rel or e.rel[address+i]['type']!=8 or value&0xffffffff:return None
  target=value>>32
  if target not in windows:return None
  targets.append(target)
 return dict(address=address,bytes=32,scalars=[size,align],targets=targets)
def inspect(original,candidate):
 o,c=elves(original,candidate);rows=json.loads((M/'original-windows.json').read_text());ow={r['start']:o.window(r['start'],r['start']+r['bytes'])for r in rows};cw,names=q.tables(c);groups,pairs,direct,_=q.relation(ow,cw)
 edges={};bad=set();reasons=[];prefixes=[];code_sites=set();source_sites=set()
 for a,b in sorted(pairs):
  left,right=ow[a],cw[b];edges[a,b]=[(x['target'],y['target'])for x,y in zip(left['direct'],right['direct'])];ld={x['offset']:x for x in left['data_references']};rd={x['offset']:x for x in right['data_references']}
  def reject(kind,offset):bad.add((a,b));reasons.append(dict(original=a,candidate=b,kind=kind,offset=offset))
  for offset in sorted(ld.keys()|rd.keys()):
   x,y=ld.get(offset),rd.get(offset)
   if (x and x['kind']=='code')or(y and y['kind']=='code'):
    code_sites.add((a,offset))
    if not(x and y and x['kind']==y['kind']=='code'and x['target']in ow and y['target']in cw):reject('code',offset)
    else:edges[a,b].append((x['target'],y['target']))
   if not x:continue
   source=q.source(o,x['target'])
   if source:
    source_sites.add((a,offset))
    if not y or q.source(c,y['target'])!=source:reject('Source',offset)
   lp=prefix(o,ow,x['target'])
   if not lp:continue
   rp=prefix(c,cw,y['target'])if y else None
   valid=bool(rp and lp['scalars']==rp['scalars']and all((u is None)==(v is None)for u,v in zip(lp['targets'],rp['targets'])))
   prefixes.append(dict(original=a,candidate=b,offset=offset,left=lp,right=rp,shape_equal=valid))
   if not valid:reject('prefix',offset)
   else:edges[a,b].extend((u,v)for u,v in zip(lp['targets'],rp['targets'])if u is not None)
 active=set(pairs)-bad;rounds=[]
 while True:
  lost={p for p in active if any(t not in active for t in edges[p])}
  if not lost:break
  active-=lost;rounds.append(len(lost))
 for p in prefixes:p['pair_closed']=(p['original'],p['candidate'])in active
 direct_windows={a for a,b in direct};active_windows={a for a,b in active}
 return dict(summary=dict(normalized_windows=len({a for a,b in pairs}),raw_windows=sum(any(cw[b]['raw_sha256']==w['raw_sha256']for b in groups[q.key(w)])for w in ow.values()),direct_windows=len(direct_windows),direct_pairs=len(direct),selected_data_windows=len(active_windows),selected_data_pairs=len(active),lost_direct_windows=sorted(direct_windows-active_windows),rejected_direct_pairs=len(direct-active),source_sites=len(source_sites),code_sites=len(code_sites),prefix_sites=len({(p['original'],p['offset'])for p in prefixes}),original_prefixes=len({p['left']['address']for p in prefixes}),prefix_pairs=len(prefixes),initial_rejections=len(bad),pruning_rounds=rounds),active_pairs=[list(p)for p in sorted(active)],reasons=reasons,prefixes=prefixes)
