from pathlib import Path
import importlib.util,json,gzip,hashlib,collections
from functools import lru_cache
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');P=R/'research/pump-feeconfig-decoder-recovery'
s=importlib.util.spec_from_file_location('windows',P/'support/window_map.py');w=importlib.util.module_from_spec(s);s.loader.exec_module(w)
w.m.elf_layout=lru_cache(maxsize=4)(w.m.elf_layout);w.m.relocations=lru_cache(maxsize=4)(w.m.relocations)
blobs=[(R/'evidence/original/pump/deployed.so').read_bytes(),*(gzip.decompress((P/'builds'/x/'symbols.so.gz').read_bytes()) for x in ['baseline780','candidate'])]
windows=[w.windows(b) for b in blobs];maps=[{f['address']:f for f in fs} for fs in windows];groups=[]
for fs in windows:
 g=collections.defaultdict(list)
 for f in fs:g[f['signature']].append(f)
 groups.append(g)
rels=[dict(w.m.relocations(b)) for b in blobs];dyn=[w.dynamic_symbols(b) for b in blobs]
def calls(k,f):
 out=[]
 for r in w.m.instructions(blobs[k],f['address'],f['bytes']):
  if r['opcode']!=0x85:continue
  rel=rels[k].get(f['address']+r['offset'],0)
  if rel&0xffffffff==10:dest={'kind':'import','name':dyn[k][rel>>32]['name']}
  else:
   callee=maps[k][r['call_target']];dest={'kind':'direct','signature':callee['signature'],'bytes':callee['bytes']}
  out.append({'offset':r['offset'],'destination':dest})
 return out
boundaries=[];ambiguous=[];improved=[];regressed=[];changed_unmatched=[];roots=0
for sig,os in groups[0].items():
 bs,cs=groups[1].get(sig,[]),groups[2].get(sig,[])
 if not bs:continue
 assert cs
 if not(len(os)==len(bs)==len(cs)==1):
  ambiguous.append({'signature':sig,'counts':list(map(len,[os,bs,cs]))});continue
 fs=[os[0],bs[0],cs[0]];roots+=1
 edges=[calls(k,f) for k,f in enumerate(fs)];assert list(map(len,edges))==[len(edges[0])]*3
 for a,b,c in zip(*edges):
  assert a['offset']==b['offset']==c['offset']
  row={'parents':[f['address'] for f in fs],'offset':a['offset'],'original':a['destination'],'baseline':b['destination'],'candidate':c['destination']}
  old=a['destination']==b['destination'];new=a['destination']==c['destination'];row.update(before_equal=old,after_equal=new);boundaries.append(row)
  if old and not new:regressed.append(row)
  if new and not old:improved.append(row)
  if not old and not new and b['destination']!=c['destination']:changed_unmatched.append(row)
out={'input_sha256':[hashlib.sha256(b).hexdigest() for b in blobs],'unambiguous_original_roots':roots,'direct_import_sites':len(boundaries),'before_equal':sum(r['before_equal'] for r in boundaries),'after_equal':sum(r['after_equal'] for r in boundaries),'improved':improved,'regressed':regressed,'changed_unmatched':changed_unmatched,'ambiguous_groups_excluded':ambiguous,'scope':'Actual direct-callee normalized shape/import binding at all unambiguous previously matched original roots. Duplicates, transitive data, indirect sites and external CFG successors are not proved.'}
(P/'retained-calls.json').write_text(json.dumps(out,indent=2)+'\n')
print(json.dumps({k:v for k,v in out.items() if k not in ['ambiguous_groups_excluded','input_sha256']},indent=2));print('ambiguous groups',len(ambiguous));assert not regressed
