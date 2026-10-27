from pathlib import Path
from collections import defaultdict
import hashlib,importlib.util,json,struct,sys

W=Path(__file__).resolve().parent;R=W.parents[1]
spec=importlib.util.spec_from_file_location('elf',R/'repro/mayhem/global-params-layout-recovery/tools/layer01.py')
elf=importlib.util.module_from_spec(spec);spec.loader.exec_module(elf)
o=elf.Elf(R/'evidence/original/mayhem/deployed.so')
b=elf.Elf(Path(sys.argv[1]).resolve())
c=elf.Elf(Path(sys.argv[2]).resolve())
key=lambda w:(w['end']-w['start'],w['normalized_sha256'],json.dumps(w['normalization_pattern'],sort_keys=True))
def windows(e):
 result={}
 for a,z in {(s['value'],s['value']+s['size'])for s in e.symbols if s['info']&15==2 and s['size']>=8 and e.lo<=s['value']<e.hi}:result[a]=e.window(a,z)
 return result
def source(e,p):
 if p not in e.rel or e.rel[p]['type']!=8:return None
 try:
  zero,payload=struct.unpack_from('<II',e.b,p);n,line,column=struct.unpack_from('<QII',e.b,p+8)
  if zero or not(1<=n<300 and 1<=line<100000 and 1<=column<10000):return None
  path=e.b[payload:payload+n].decode()
  return {'path':path,'line':line,'column':column}if path.endswith('.rs\0')else None
 except (struct.error,UnicodeError):return None
rows=json.loads((R/'research/mayhem-full-curve-recovery/audit.json').read_bytes())['rows']
ow={r['start']:o.window(r['start'],r['end'])for r in rows};bw,cw=windows(b),windows(c)
bm,cm=defaultdict(list),defaultdict(list)
for w in bw.values():bm[key(w)].append(w)
for w in cw.values():cm[key(w)].append(w)
matched_before=matched_after=0;gains=[];body_losses=[];edge_losses=[];source_losses=[];source_gains=[];edge_before=edge_after=source_before=source_after=0
for row in rows:
 w=ow[row['start']];old,new=bm[key(w)],cm[key(w)]
 matched_before+=bool(old);matched_after+=bool(new)
 if not old and new:gains.append(row['id'])
 if old and not new:body_losses.append(row['id'])
 if not old:continue
 for d in w['direct']:
  if d['target']not in ow:continue
  expected=key(ow[d['target']])
  def support(counterparts,index):
   return any(any(x['offset']==d['offset'] and x['target']in index and key(index[x['target']])==expected for x in z['direct'])for z in counterparts)
  yes_b,yes_c=support(old,bw),support(new,cw);edge_before+=yes_b;edge_after+=yes_c
  if yes_b and not yes_c:edge_losses.append({'id':row['id'],'offset':d['offset']})
 for ref in w['data_references']:
  expected=source(o,ref['target'])
  if expected is None:continue
  def observed(e,counterparts):
   return [source(e,x['target'])for z in counterparts for x in z['data_references']if x['offset']==ref['offset']]
  old_values,new_values=observed(b,old),observed(c,new)
  yes_b,yes_c=expected in old_values,expected in new_values;source_before+=yes_b;source_after+=yes_c
  if yes_b and not yes_c:source_losses.append({'id':row['id'],'offset':ref['offset'],'expected':expected})
  if yes_c and not yes_b:source_gains.append({'id':row['id'],'offset':ref['offset'],'expected':expected,'prior':old_values})
result={'original_sha256':hashlib.sha256(o.b).hexdigest(),'baseline_symbols_sha256':hashlib.sha256(b.b).hexdigest(),'symbols_sha256':hashlib.sha256(c.b).hexdigest(),'baseline_matches':matched_before,'matches':matched_after,'gains':gains,'body_losses':body_losses,'positive_direct_edges_before':edge_before,'positive_direct_edges_after':edge_after,'positive_direct_edge_losses':edge_losses,'positive_Source_records_before':source_before,'positive_Source_records_after':source_after,'positive_Source_record_losses':source_losses,'new_positive_Source_records':source_gains,'scope':'All original function windows with matching baseline counterparts; each positive direct-callee or typed Source observation uses any matching counterpart. Other data, vtables, indirect calls and whole ELF remain outside this audit.'}
Path(sys.argv[3]).write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps({k:v for k,v in result.items()if k!='new_positive_Source_records'},indent=2))
print('new_positive_Source_records',len(source_gains))
assert not body_losses and not edge_losses and not source_losses
