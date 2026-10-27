"""Recompute a full Mayhem inventory, preserving opaque versus examined scope."""
from pathlib import Path
import gzip,json,importlib.util,tempfile,collections,csv,io,argparse
P=Path(__file__).resolve().parent;R=P.parents[1]
def generate():
 parent=R/'repro/mayhem/global-params-layout-recovery';prior=json.loads(gzip.decompress((parent/'prior-inventory.json.gz').read_bytes()));spec=importlib.util.spec_from_file_location('mayhem_inventory',parent/'tools/layer01.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);o=m.Elf(R/'evidence/original/mayhem/deployed.so');scope=set(json.loads((P/'body-analysis.json').read_text())['sell-located-clean']['matches'])
 with tempfile.TemporaryDirectory()as td:
  f=Path(td)/'symbols.so';f.write_bytes(gzip.decompress((P/'artifacts/recovered/symbols.so.gz').read_bytes()));c=m.Elf(f);groups={}
  for s in c.symbols:
   if s['info']&15==2 and s['size']>=8 and c.lo<=s['value']<c.hi:groups.setdefault((s['value'],s['value']+s['size']),[]).append(s['name'])
  windows=[c.window(*ab)for ab in groups];rows=[]
  for old in prior['original_rows']:
   a=o.window(old['start'],old['end']);matches=[w for w in windows if(w['end']-w['start'],w['normalized_sha256'],w['normalization_pattern'])==(a['end']-a['start'],a['normalized_sha256'],a['normalization_pattern'])];raw=[w for w in windows if w['raw_sha256']==a['raw_sha256']];admitted=old['id']in scope
   rows.append(dict(id=old['id'],start=old['start'],end=old['end'],bytes=old['end']-old['start'],scope='examined'if admitted else'opaque',body_status=('raw_body_equal'if raw else'normalized_body_only'if matches else'no_complete_body_match')if admitted else'opaque_unattributed',raw_counterparts=[w['start']for w in raw],normalized_counterparts=[w['start']for w in matches]))
 summary=dict(total=len(rows),examined=sum(r['scope']=='examined'for r in rows),opaque=sum(r['scope']=='opaque'for r in rows),dispositions=dict(collections.Counter(r['body_status']for r in rows)),literal_equal_including_opaque=sum(bool(r['raw_counterparts'])for r in rows),scope='Complete-body matching only. Opaque literal matches remain opaque; no full semantic, callee/data, or whole-binary equivalence is asserted.')
 assert(summary['total'],summary['examined'],summary['opaque'])==(441,196,245)
 assert summary['dispositions']=={'opaque_unattributed':245,'raw_body_equal':46,'normalized_body_only':142,'no_complete_body_match':8}
 out=io.StringIO();w=csv.DictWriter(out,fieldnames=list(rows[0]),delimiter='\t',lineterminator='\n');w.writeheader()
 for row in rows:w.writerow({k:json.dumps(v)if isinstance(v,list)else v for k,v in row.items()})
 return {'functions.json':(json.dumps({'summary':summary,'rows':rows},indent=2)+'\n').encode(),'functions.tsv':out.getvalue().encode()}
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--check',action='store_true');args=a.parse_args()
 for name,b in generate().items():
  if args.check:assert(P/name).read_bytes()==b,name
  else:(P/name).write_bytes(b)
 print('PASS:441 Mayhem windows;196 examined;188 matched;8 unmatched;245 opaque')
