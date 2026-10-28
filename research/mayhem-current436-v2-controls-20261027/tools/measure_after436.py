from pathlib import Path
from collections import Counter
import importlib.util,json,sys,gzip,hashlib
R=Path.cwd();M=R/'research/mayhem-current-macro-call-closure-20261027'
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
q=module('measure_matcher',M/'verify.py');r=module('measure_reader',M/'reader.py')
original=r.Elf(R/'evidence/original/mayhem/deployed.so');before=r.Elf(R/'work/mayhem-priority-20261027/fast-curve-pr404-qualified436-build/symbols.so');after=r.Elf(Path(sys.argv[1]).resolve());rows=q.read(M/'original-windows.json');ow={x['start']:original.window(x['start'],x['start']+x['bytes'])for x in rows};bw,bn=q.tables(before);cw,cn=q.tables(after);bg,bpairs,bc,_=q.relation(ow,bw);cg,cpairs,cc,rounds=q.relation(ow,cw)
out=dict(candidate_symbols_sha256=hashlib.sha256(after.b).hexdigest(),normalized=len({a for a,b in cpairs}),raw=0,matched_text=0,direct_closed_windows=len({a for a,b in cc}),gains=[],body_losses=[],raw_losses=[],edge_losses=[],source_losses=[],profile_losses=[],positive_edges=[0,0],positive_sources=[0,0],unmatched=[])
for row in rows:
 a=row['start'];w=ow[a];old=bg[q.key(w)];new=cg[q.key(w)];rb=any(bw[x]['raw_sha256']==w['raw_sha256']for x in old);rc=any(cw[x]['raw_sha256']==w['raw_sha256']for x in new)
 out['raw']+=rc;out['matched_text']+=row['bytes']if new else 0
 if new and not old:out['gains'].append(row['id'])
 if old and not new:out['body_losses'].append(row['id'])
 if rb and not rc:out['raw_losses'].append(row['id'])
 if not new:out['unmatched'].append(row['id'])
 bp=[q.profile(before,bw[x])for x in old];cp=[q.profile(after,cw[x])for x in new]
 for p in bp:
  if p not in cp:out['profile_losses'].append({'id':row['id'],'profile':p})
 for call in w['direct']:
  if call['target']not in ow:continue
  expected=q.key(ow[call['target']])
  def support(hits,table):return any(any(z['offset']==call['offset']and z['target']in table and q.key(table[z['target']])==expected for z in table[x]['direct'])for x in hits)
  b,c=support(old,bw),support(new,cw);out['positive_edges'][0]+=b;out['positive_edges'][1]+=c
  if b and not c:out['edge_losses'].append([row['id'],call['offset']])
 for d in w['data_references']:
  expected=q.source(original,d['target'])
  if expected is None:continue
  b,c=any(x.get(str(d['offset']))==expected for x in bp),any(x.get(str(d['offset']))==expected for x in cp);out['positive_sources'][0]+=b;out['positive_sources'][1]+=c
  if b and not c:out['source_losses'].append([row['id'],d['offset']])
Path(sys.argv[2]).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out,indent=2))
