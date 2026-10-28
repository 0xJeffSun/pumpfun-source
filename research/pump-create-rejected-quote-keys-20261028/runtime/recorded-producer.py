from pathlib import Path
import importlib.util,json,gzip,hashlib
b=Path(__file__).resolve().parent;r=Path('/workspace/pumpfun-source-latest');s=importlib.util.spec_from_file_location('quoteprobe',b/'create_quote_probe.py');h=importlib.util.module_from_spec(s);s.loader.exec_module(h);rows=[]
images={'original':r/'evidence/original/pump/deployed.so','baseline':b/'baseline/candidate.so','fixed':b/'create-rejected-quote-keys/candidate.so'}
for rejected in [False,True]:
 for token22 in [False,True]:
  c={'case':('rejected-literal-'if rejected else'ordinary-whitelist-')+str(token22),'instruction':'create_v2','quote':True,'quote_token22':token22}
  if rejected:c['quote_pubkey']='9pan9bMn5HatX4EJdBwg9VgCa7Uz5HL8N1m5D3NdXejP'
  rs={name:h.run(c,path)for name,path in images.items()}
  fields=['before','after','error','events','inner','return']
  assert all(rs['original'][k]==rs[name][k]for k in fields for name in ['baseline','fixed'])
  if rejected:
   assert '6063'in rs['original']['error']
   keys=['Program log: Left:','Program log: '+c['quote_pubkey'],'Program log: Right:','Program log: '+c['quote_pubkey']]
   for name,x in rs.items():
    i=next(i for i,l in enumerate(x['logs'])if 'Error Code: UnsupportedQuoteMint.'in l)
    assert ('create_v2.rs:220.'if name=='original'else'create_v2.rs:70.')in x['logs'][i]
    assert (x['logs'][i+1:i+5]==keys)==(name!='baseline')
  else:assert rs['original']['error']is None
  rows.append({'rejected':rejected,'token2022':token22,'input':c,'results':rs});print(c['case'],'passed')
report={'cases':rows,'image_sha256':{k:hashlib.sha256(v.read_bytes()).hexdigest()for k,v in images.items()},'scope':'Ordinary locally signed create_v2 transactions with captured dependencies; no signature bypass or live transaction.'};(b/'create-literal-runtime.json.gz').write_bytes(gzip.compress(json.dumps(report,sort_keys=True).encode(),mtime=0))
