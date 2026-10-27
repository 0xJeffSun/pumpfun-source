"""Recompute mapping ambiguity and irreducible clone/count witnesses."""
from pathlib import Path
from collections import defaultdict,Counter
import gzip,hashlib,importlib.util,json,re
P=Path(__file__).resolve().parent

def inspect(original_path,baseline_path):
 s=importlib.util.spec_from_file_location('mapping_reader',P/'reader.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
 o=m.Elf(Path(original_path));c=m.Elf(Path(baseline_path));rows=json.loads(gzip.decompress((P/'inputs/parent-audit.json.gz').read_bytes()))['rows'];byid={r['start']:r['id']for r in rows};ow={r['start']:o.window(r['start'],r['end'])for r in rows};cw={s['value']:c.window(s['value'],s['value']+s['size'])for s in c.symbols if s['info']&15==2 and s['size']>=8 and c.lo<=s['value']<c.hi}
 key=lambda w:(w['end']-w['start'],w['normalized_sha256'],json.dumps(w['normalization_pattern'],sort_keys=True))
 og,cg=defaultdict(list),defaultdict(list)
 for a,w in ow.items():og[key(w)].append(a)
 for a,w in cw.items():cg[key(w)].append(a)
 seed={v[0]:cg[k][0]for k,v in og.items()if len(v)==len(cg[k])==1}
 requests=defaultdict(lambda:defaultdict(list))
 for a,b in seed.items():
  for x,y in zip(ow[a]['direct'],cw[b]['direct']):
   assert x['offset']==y['offset']
   if x['target']in ow and y['target']in cw:requests[x['target']][y['target']].append(dict(original_parent=a,candidate_parent=b,offset=x['offset'],parent_id=byid[a]))
 hard=[]
 for a,demands in sorted(requests.items()):
  if len(demands)>1:hard.append(dict(original=a,id=byid[a],bytes=ow[a]['end']-a,demands=[dict(candidate=b,candidate_bytes=cw[b]['end']-b,matching_child_body=key(ow[a])==key(cw[b]),witnesses=ws)for b,ws in sorted(demands.items())]))
 deficits=[dict(originals=[dict(id=byid[a],address=a)for a in aa],candidate_addresses=cg[k],bytes=k[0],deficit=len(aa)-len(cg[k]))for k,aa in og.items()if cg[k]and len(aa)>len(cg[k])]
 inspection=json.loads((P/'mapping-inspection.json').read_bytes());plan=json.loads((P/'config/plan.json').read_bytes());unequal=[]
 for row in plan['ordered']:
  a=row.get('original')
  if a is None:continue
  b=row['address']
  if key(ow[a])!=key(cw[b]):unequal.append(dict(original=a,id=byid[a],original_bytes=ow[a]['end']-a,candidate=b,candidate_bytes=cw[b]['end']-b,basis=row['basis']))
 assert len(unequal)==14
 reserve=ow[540008];reserve_candidates=[]
 for b in cg[key(reserve)]:
  d=next(x for x in cw[b]['direct']if x['offset']==528);reserve_candidates.append(dict(address=b,target=d['target'],target_bytes=cw[d['target']]['end']-d['target'],target_shape_equal=key(cw[d['target']])==key(ow[539680])))
 assert not any(x['target_shape_equal']for x in reserve_candidates)
 # Bounded clone comparisons; these do not authorize folding address identities.
 clones=[]
 for a,b in [(494952,565680),(565968,592264),(566280,592576)]:
  x,y=cw[a],cw[b];assert key(x)==key(y)
  calls=[dict(offset=u['offset'],left=u['target'],right=v['target'],identical_target=u['target']==v['target'],same_target_shape=key(cw[u['target']])==key(cw[v['target']]))for u,v in zip(x['direct'],y['direct'])]
  clones.append(dict(left=a,right=b,bytes=x['end']-a,normalized_equal=True,raw_equal=x['raw_sha256']==y['raw_sha256'],calls=calls,data_left=x['data_references'],data_right=y['data_references'],limit='Equal local shape and immediate target shapes are not a proof that function/data address identities may be folded.'))
 report=dict(original_sha256=hashlib.sha256(o.b).hexdigest(),candidate_symbols_sha256=hashlib.sha256(c.b).hexdigest(),original_windows=len(ow),candidate_function_windows=len(cw),shape_covered=sum(len(v)for k,v in og.items()if cg[k]),maximum_injective_shape_pairs=sum(min(len(v),len(cg[k]))for k,v in og.items()),unique_shape_seeds=len(seed),reported_conflicts=len(inspection['conflicts']),distinct_reported_conflicts=len(set(tuple(x)for x in inspection['conflicts'])),hard_unique_parent_conflicts=hard,multiplicity_deficits=deficits,qualified_plan_unequal_bindings=unequal,reserve640_context_deficit=dict(original_parent=540008,original_child=539680,required_child_bytes=328,candidates=reserve_candidates),bounded_clone_comparisons=clones,scope='Read-only diagnostics. Original-shape coverage does not identify original function placement. No new normalization or instruction/data edits. Unmatched role assignments remain hypotheses.')
 return report
