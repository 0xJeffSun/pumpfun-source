"""Preserve raw bodies, all positive edges, and every observed Source profile."""
from pathlib import Path
from collections import defaultdict
import gzip,hashlib,importlib.util,json,struct,tempfile
P=Path(__file__).resolve().parent

def compare(original,baseline,candidate):
 with tempfile.TemporaryDirectory()as td:
  t=Path(td)
  for name,data in [('original',original),('baseline',baseline),('candidate',candidate)]: (t/(name+'.so')).write_bytes(data)
  spec=importlib.util.spec_from_file_location('progress_elf',P/'reader.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
  o,b,c=[m.Elf(t/(name+'.so'))for name in ['original','baseline','candidate']]
  key=lambda w:(w['end']-w['start'],w['normalized_sha256'],json.dumps(w['normalization_pattern'],sort_keys=True))
  def windows(e):return{a:e.window(a,z)for a,z in {(s['value'],s['value']+s['size'])for s in e.symbols if s['info']&15==2 and s['size']>=8 and e.lo<=s['value']<e.hi}}
  def source(e,p):
   if p not in e.rel or e.rel[p]['type']!=8:return None
   try:
    zero,payload=struct.unpack_from('<II',e.b,p);n,line,col=struct.unpack_from('<QII',e.b,p+8)
    if zero or not(1<=n<300 and 1<=line<100000 and 1<=col<10000):return None
    text=e.b[payload:payload+n].decode()
    return dict(path=text,line=line,column=col)if text.endswith('.rs\0')else None
   except(UnicodeError,struct.error):return None
  def profile(e,w):return{d['offset']:s for d in w['data_references']if(s:=source(e,d['target']))is not None}
  rows=json.loads(gzip.decompress((P/'inputs/parent-audit.json.gz').read_bytes()))['rows'];ow={r['start']:o.window(r['start'],r['end'])for r in rows};bw,cw=windows(b),windows(c);bm,cm=defaultdict(list),defaultdict(list)
  for w in bw.values():bm[key(w)].append(w)
  for w in cw.values():cm[key(w)].append(w)
  gains=[];body_losses=[];raw_losses=[];profile_losses=[];edge_losses=[];source_losses=[];edge_before=edge_after=source_before=source_after=matched_before=matched_after=raw_before=raw_after=0
  for row in rows:
   w=ow[row['start']];old,new=bm[key(w)],cm[key(w)];matched_before+=bool(old);matched_after+=bool(new)
   rb=any(z['raw_sha256']==w['raw_sha256']for z in old);ra=any(z['raw_sha256']==w['raw_sha256']for z in new);raw_before+=rb;raw_after+=ra
   if rb and not ra:raw_losses.append(row['id'])
   if not old and new:gains.append(row['id'])
   if old and not new:body_losses.append(row['id'])
   if not old:continue
   before_profiles=[profile(b,z)for z in old];after_profiles=[profile(c,z)for z in new]
   for p in before_profiles:
    if p not in after_profiles:profile_losses.append(dict(id=row['id'],profile=p))
   for d in w['direct']:
    if d['target']not in ow:continue
    expected=key(ow[d['target']])
    def support(counterparts,index):return any(any(x['offset']==d['offset']and x['target']in index and key(index[x['target']])==expected for x in z['direct'])for z in counterparts)
    yes_b,yes_c=support(old,bw),support(new,cw);edge_before+=yes_b;edge_after+=yes_c
    if yes_b and not yes_c:edge_losses.append(dict(id=row['id'],offset=d['offset']))
   for ref in w['data_references']:
    expected=source(o,ref['target'])
    if expected is None:continue
    old_values=[p.get(ref['offset'])for p in before_profiles];new_values=[p.get(ref['offset'])for p in after_profiles];yes_b,yes_c=expected in old_values,expected in new_values;source_before+=yes_b;source_after+=yes_c
    if yes_b and not yes_c:source_losses.append(dict(id=row['id'],offset=ref['offset'],expected=expected))
  result=dict(original_sha256=hashlib.sha256(original).hexdigest(),baseline_symbols_sha256=hashlib.sha256(baseline).hexdigest(),symbols_sha256=hashlib.sha256(candidate).hexdigest(),baseline_matches=matched_before,matches=matched_after,gains=gains,body_losses=body_losses,baseline_raw_matches=raw_before,raw_matches=raw_after,raw_losses=raw_losses,positive_direct_edges_before=edge_before,positive_direct_edges_after=edge_after,positive_direct_edge_losses=edge_losses,positive_Source_records_before=source_before,positive_Source_records_after=source_after,positive_Source_record_losses=source_losses,observed_Source_profile_losses=profile_losses,scope='All441 original windows; retain every baseline raw/normalized match, positive direct edge, positive Source record and complete observed Source profile. Newly matched O0072 and O0090 callees/data are checked separately.')
  assert not any(result[k]for k in ['body_losses','raw_losses','positive_direct_edge_losses','positive_Source_record_losses','observed_Source_profile_losses'])
  return result
