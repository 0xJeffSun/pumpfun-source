import sys,runpy,pathlib,csv,gzip,json,hashlib
root=pathlib.Path(__file__).resolve().parents[2];sys.path.insert(0,str(root/'scripts'))
from pump_compare_function_bytes import normalize,body
from pump_quote_control_function_match import sections
m=runpy.run_path(str(root/'research/claude-pump-integration-20261027/r37-layout-33/verify.py'))
cp=pathlib.Path(sys.argv[1]);b=cp.read_bytes();bs=sections(b);o=(root/'evidence/original/pump/deployed.so').read_bytes();os=sections(o)
sha=lambda b:hashlib.sha256(b).hexdigest();by={}
for s,l,n in m['elf_functions'](b):
 raw=body(b,bs,s,l);nr=normalize(raw,s,bs)[0];by.setdefault((l,sha(nr)),[]).append({'start':s,'symbol':n,'raw_sha256':sha(raw)})
rows=[]
for r in csv.DictReader(open(root/'repro/reconstruction-status-2026-10-26/functions.tsv'),delimiter='\t'):
 if r['program']!='pump' or r['variant']!='selected':continue
 s,e=int(r['original_start']),int(r['original_end']);raw=body(o,os,s,e-s);n=normalize(raw,s,os)[0];ms=by.get((e-s,sha(n)),[])
 rows.append({'start':s,'end':e,'bytes':e-s,'raw_sha256':sha(raw),'raw_match':any(x['raw_sha256']==sha(raw) for x in ms),'normalized_matches':ms})
counts={'total':len(rows),'raw':sum(x['raw_match'] for x in rows),'normalized':sum(bool(x['normalized_matches']) for x in rows),'unmatched':sum(not x['normalized_matches'] for x in rows),'matched_text_bytes':sum(x['bytes'] for x in rows if x['normalized_matches'])}
out={'original_sha256':sha(o),'candidate_sha256':sha(b),'windows':rows,'counts':counts}
if len(sys.argv)>2:
 bp=pathlib.Path(sys.argv[2]);base=json.loads(gzip.decompress(bp.read_bytes()) if bp.suffix=='.gz' else bp.read_bytes());d={x['start']:x for x in base['windows']}
 for typ in ['normalized','raw']:
  yes=lambda x:bool(x['normalized_matches']) if typ=='normalized' else x['raw_match']
  out[typ+'_gains']=[hex(x['start']) for x in rows if yes(x) and not yes(d[x['start']])];out[typ+'_losses']=[hex(x['start']) for x in rows if not yes(x) and yes(d[x['start']])]
p=cp.parent/'inventory.json';p.write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({k:v for k,v in out.items() if k!='windows'},indent=2))
