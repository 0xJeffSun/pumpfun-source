"""Recompute all windows; explicitly admit the examined accounting/quote helpers."""
from pathlib import Path
import gzip,json,importlib.util,tempfile,csv,io,argparse,collections
P=Path(__file__).resolve().parent;R=P.parents[1]
def generate():
 spec=importlib.util.spec_from_file_location('amm_inventory',R/'repro/mayhem/global-params-layout-recovery/tools/layer01.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);o=m.Elf(R/'evidence/original/mayhem/deployed.so');prior=json.loads(gzip.decompress((R/'repro/mayhem/global-params-layout-recovery/prior-inventory.json.gz').read_bytes()));old=json.loads((R/'research/mayhem-sell-origin-recovery/functions.json').read_text());admitted={r['id']for r in old['rows']if r['scope']=='examined'}|{'O0090','O0092'}
 roles={'O0071':'Burn','O0077':'BuyPumpSwap','O0079':'SellPumpSwap','O0081':'Buy','O0082':'Sell','O0083':'BuyV2','O0084':'SellV2','O0090':'shared buy accounting and risk (inferred)','O0092':'AMM buy quote (inferred)','O0095':'quote validation'}
 with tempfile.TemporaryDirectory()as td:
  p=Path(td)/'symbols.so';p.write_bytes(gzip.decompress((P/'artifacts/recovered/symbols.so.gz').read_bytes()));c=m.Elf(p);ranges={(s['value'],s['value']+s['size'])for s in c.symbols if s['info']&15==2 and s['size']>=8 and c.lo<=s['value']<c.hi};windows=[c.window(*ab)for ab in ranges];rows=[]
  for old in prior['original_rows']:
   w=o.window(old['start'],old['end']);raw=[x['start']for x in windows if x['raw_sha256']==w['raw_sha256']];matched=[x['start']for x in windows if(x['end']-x['start'],x['normalized_sha256'],x['normalization_pattern'])==(w['end']-w['start'],w['normalized_sha256'],w['normalization_pattern'])];examined=old['id']in admitted
   rows.append(dict(id=old['id'],start=old['start'],end=old['end'],bytes=old['end']-old['start'],role=roles.get(old['id'],''),scope='examined'if examined else'opaque',body_status=('raw_body_equal'if raw else'normalized_body_only'if matched else'no_complete_body_match')if examined else'opaque_unattributed',raw_counterparts=raw,normalized_counterparts=matched))
 summary=dict(total=len(rows),examined=sum(r['scope']=='examined'for r in rows),opaque=sum(r['scope']=='opaque'for r in rows),dispositions=dict(collections.Counter(r['body_status']for r in rows)),literal_equal_including_opaque=sum(bool(r['raw_counterparts'])for r in rows),unmatched_examined_bytes=sum(r['bytes']for r in rows if r['body_status']=='no_complete_body_match'))
 assert(summary['total'],summary['examined'],summary['opaque'])==(441,198,243)
 assert summary['dispositions']==dict(opaque_unattributed=243,raw_body_equal=46,normalized_body_only=142,no_complete_body_match=10)
 assert summary['literal_equal_including_opaque']==58 and summary['unmatched_examined_bytes']==101480
 f=io.StringIO();writer=csv.DictWriter(f,fieldnames=list(rows[0]),delimiter='\t',lineterminator='\n');writer.writeheader()
 for r in rows:writer.writerow({k:json.dumps(v)if isinstance(v,list)else v for k,v in r.items()})
 return {'functions.json':(json.dumps(dict(summary=summary,rows=rows),indent=2)+'\n').encode(),'functions.tsv':f.getvalue().encode()}
if __name__=='__main__':
 ap=argparse.ArgumentParser();ap.add_argument('--check',action='store_true');a=ap.parse_args()
 for n,b in generate().items():
  if a.check:assert(P/n).read_bytes()==b,n
  else:(P/n).write_bytes(b)
 print('PASS:441 windows;198 examined;188 matched;10 unmatched;243 opaque')
