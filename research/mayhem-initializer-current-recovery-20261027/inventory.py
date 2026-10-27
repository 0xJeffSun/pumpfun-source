"""Partition all original windows against the frozen current symbol artifact."""
from collections import defaultdict
from pathlib import Path
import gzip,hashlib,importlib.util,json,tempfile
P=Path(__file__).resolve().parent

def inventory(root,packet=P):
 s=importlib.util.spec_from_file_location('inventory_reader',packet/'reader.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
 original=m.Elf(root/'evidence/original/mayhem/deployed.so')
 with tempfile.TemporaryDirectory() as td:
  p=Path(td)/'symbols.so';p.write_bytes(gzip.decompress((packet/'builds/current/symbols.so.gz').read_bytes()));candidate=m.Elf(p)
  windows={};names=defaultdict(list)
  for s in candidate.symbols:
   if s['info']&15==2 and s['size']>=8 and candidate.lo<=s['value']<candidate.hi:
    addr=s['value'];windows[addr]=candidate.window(addr,addr+s['size']);names[addr].append(s['name'])
  key=lambda w:(w['end']-w['start'],w['normalized_sha256'],json.dumps(w['normalization_pattern'],sort_keys=True))
  grouped=defaultdict(list)
  for addr,w in windows.items():grouped[key(w)].append(addr)
  rows=[]
  for r in json.loads((root/'research/mayhem-trade-origins-validator/audit.json').read_bytes())['rows']:
   w=original.window(r['start'],r['end']);hits=grouped[key(w)];raw=[a for a in hits if windows[a]['raw_sha256']==w['raw_sha256']]
   rows.append({'id':r['id'],'start':r['start'],'bytes':r['bytes'],'classification':'raw-equal' if raw else 'normalized-only' if hits else 'unmatched','previous_role':r.get('previous_role',''),'counterpart_count':len(hits),'counterparts':[{'start':a,'names':sorted(set(names[a]))} for a in hits[:5]],'raw_counterparts':raw})
 counts={k:sum(r['classification']==k for r in rows) for k in ['raw-equal','normalized-only','unmatched']}
 matched=sum(r['bytes'] for r in rows if r['classification']!='unmatched');total=sum(r['bytes'] for r in rows)
 assert counts=={'raw-equal':100,'normalized-only':330,'unmatched':11} and matched==596416 and total==706744
 return {'candidate_symbols_sha256':hashlib.sha256(candidate.b).hexdigest(),'counts':counts,'matched_text_bytes':matched,'original_text_bytes':total,'rows':rows,'scope':'Each original window counted once. Complete local raw equality, masked normalized body equality, and unmatched bodies remain distinct. Original source naming and recursive equivalence are not implied.'}
