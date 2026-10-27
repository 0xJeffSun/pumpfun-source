"""Full static Mayhem window comparison; no compiler, VM or source attribution proof."""
from pathlib import Path
import argparse,collections,csv,gzip,hashlib,importlib.util,io,json,tempfile
P=Path(__file__).resolve().parent;R=P.parents[1]
INPUTS=['evidence/original/mayhem/deployed.so','repro/mayhem/global-params-layout-recovery/prior-inventory.json.gz','repro/mayhem/global-params-layout-recovery/tools/layer01.py','research/mayhem-amm-source-origins/artifacts/recovered/candidate.so.gz','research/mayhem-amm-source-origins/artifacts/recovered/symbols.so.gz','research/mayhem-amm-source-origins/functions.json']
def sha(b):return hashlib.sha256(b).hexdigest()
def signature(w):return(w['end']-w['start'],w['normalized_sha256'],json.dumps(w['normalization_pattern'],sort_keys=True))
def generate():
 s=importlib.util.spec_from_file_location('full_mayhem_elf',R/INPUTS[2]);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);o=m.Elf(R/INPUTS[0]);old=json.loads(gzip.decompress((R/INPUTS[1]).read_bytes()));prior={r['id']:r for r in json.loads((R/INPUTS[5]).read_bytes())['rows']}
 with tempfile.TemporaryDirectory()as td:
  p=Path(td)/'symbols.so';sb=gzip.decompress((R/INPUTS[4]).read_bytes());p.write_bytes(sb);c=m.Elf(p);p2=Path(td)/'candidate.so';cb=gzip.decompress((R/INPUTS[3]).read_bytes());p2.write_bytes(cb);stripped=m.Elf(p2);assert c.b[c.lo:c.hi]==stripped.b[stripped.lo:stripped.hi]
  groups={}
  for f in c.symbols:
   if f['info']&15==2 and f['size']>=8 and c.lo<=f['value']<c.hi:groups.setdefault((f['value'],f['value']+f['size']),set()).add(f['name'])
  cw={a:c.window(a,b)for a,b in groups};ow={r['start']:o.window(r['start'],r['end'])for r in old['original_rows']};byshape=collections.defaultdict(list)
  for a,w in cw.items():byshape[signature(w)].append(a)
  rows=[]
  for r in old['original_rows']:
   w=ow[r['start']];matches=sorted(byshape[signature(w)]);pairs=[]
   for a in matches:
    other=cw[a];edges=[]
    assert len(w['direct'])==len(other['direct'])
    for x,y in zip(w['direct'],other['direct']):
     assert x['offset']==y['offset'];ox=ow.get(x['target']);cy=cw.get(y['target']);status='target_outside_window_catalogue'if ox is None or cy is None else'matching_target_shape'if signature(ox)==signature(cy)else'different_target_shape'
     edges.append(dict(offset=x['offset'],original_target=x['target'],candidate_target=y['target'],status=status))
    names=sorted(groups[(a,other['end'])]);pairs.append(dict(start=a,end=other['end'],names=names,raw_body_equal=w['raw_sha256']==other['raw_sha256'],direct_edges=edges,external_calls=len(w['external']),data_references=len(w['data_references']),data_extent_and_content_equality='unproved',indirect_calls=len(w['indirect']),branches_outside_window=sum(not x['within_window']for x in w['branches'])))
   raw=any(p['raw_body_equal']for p in pairs)
   rows.append(dict(id=r['id'],start=r['start'],end=r['end'],bytes=r['end']-r['start'],raw_sha256=w['raw_sha256'],normalized_sha256=w['normalized_sha256'],status='raw_local_match'if raw else'normalized_only'if matches else'unmatched',previous_scope=prior[r['id']]['scope'],previous_role=prior[r['id']]['role'],counterpart_count=len(pairs),counterparts=pairs))
  assert len(rows)==441 and all(rows[i]['end']<=rows[i+1]['start']for i in range(len(rows)-1))
  status=dict(collections.Counter(r['status']for r in rows));assert status==dict(raw_local_match=58,normalized_only=269,unmatched=114)
  unmatched=[r for r in rows if r['status']=='unmatched'];summary=dict(original_sha256=sha(o.b),candidate_sha256=sha(cb),symbols_sha256=sha(sb),total_windows=len(rows),statuses=status,unique_counterparts=sum(r['counterpart_count']==1 for r in rows),ambiguous_counterparts=sum(r['counterpart_count']>1 for r in rows),previously_opaque_now_structurally_matched=sum(r['previous_scope']=='opaque'and r['status']!='unmatched'for r in rows),previously_opaque_still_unmatched=sum(r['previous_scope']=='opaque'and r['status']=='unmatched'for r in rows),prior_interpreted_scope=198,original_text_bytes=o.hi-o.lo,window_bytes=sum(r['bytes']for r in rows),uncovered_text_intervals=m.complement(o.lo,o.hi,[(r['start'],r['end'])for r in rows]),unmatched_window_bytes=sum(r['bytes']for r in unmatched),matched_window_bytes=sum(r['bytes']for r in rows if r['status']!='unmatched'),whole_file_equal=cb==o.b,limitations=['Static body matching only; source identities, complete interfaces and behavior remain unproved.','Normalization masks only direct-call displacements and declared relocations.','Candidate symbols name counterparts, not authenticated original source functions.','Direct-target shape agreement is not transitive call/data closure.','Relocated data extents/content remain unproved; matching raw local bytes is not whole-function semantic proof.','This scan does not execute initializers or any target, rebuild source, or change selected checkpoints.'])
  unique=[r for r in rows if len(r['counterparts'])==1]
  counts=collections.Counter(e['status']for r in unique for e in r['counterparts'][0]['direct_edges'])
  summary.update(unique_all_direct_shapes_supported=sum(all(e['status']=='matching_target_shape'for e in r['counterparts'][0]['direct_edges'])for r in unique),unique_with_relocated_data=sum(bool(r['counterparts'][0]['data_references'])for r in unique),unique_direct_edge_statuses=dict(counts))
  report=dict(summary=summary,rows=rows)
  out=io.StringIO();fields=['id','start','end','bytes','status','previous_scope','previous_role','counterpart_count','candidate_starts','candidate_symbols'];writer=csv.DictWriter(out,fieldnames=fields,delimiter='\t',lineterminator='\n');writer.writeheader()
  for r in rows:writer.writerow({**{k:r[k]for k in fields[:8]},'candidate_starts':json.dumps([p['start']for p in r['counterparts']]),'candidate_symbols':json.dumps([p['names']for p in r['counterparts']])})
  largest=[{k:r[k]for k in ['id','start','end','bytes','previous_role']}for r in sorted(unmatched,key=lambda r:(-r['bytes'],r['start']))]
  return {'audit.json':(json.dumps(report,indent=2)+'\n').encode(),'functions.tsv':out.getvalue().encode(),'unmatched.json':(json.dumps(largest,indent=2)+'\n').encode(),'inputs.json':(json.dumps({n:sha((R/n).read_bytes())for n in INPUTS},indent=2)+'\n').encode()}
def main():
 p=argparse.ArgumentParser();p.add_argument('--check',action='store_true');a=p.parse_args();generated=generate()
 for n,b in generated.items():
  if a.check:assert(P/n).read_bytes()==b,n
  else:(P/n).write_bytes(b)
 if a.check:
  cs=importlib.util.spec_from_file_location('mir_controls',P/'control.py');cm=importlib.util.module_from_spec(cs);cs.loader.exec_module(cm);assert json.loads((P/'controls.json').read_bytes())==cm.generate()
  actual={f.relative_to(P).as_posix():sha(f.read_bytes())for f in P.rglob('*')if f.is_file()and f.name!='manifest.json'and'__pycache__'not in f.parts};assert json.loads((P/'manifest.json').read_bytes())==actual
 print(json.dumps(json.loads(generated['audit.json'])['summary'],indent=2))
if __name__=='__main__':main()
