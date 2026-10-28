from pathlib import Path
import importlib.util,json,struct,hashlib,gzip
from functools import lru_cache
D=Path(__file__).resolve().parent;R=D.parents[1]
s=importlib.util.spec_from_file_location('w',R/'research/fees-composed-frontier188/window_map.py');w=importlib.util.module_from_spec(s);s.loader.exec_module(w);w.m.elf_layout=lru_cache(maxsize=8)(w.m.elf_layout);w.m.relocations=lru_cache(maxsize=8)(w.m.relocations)
blobs={'original':(R/'evidence/original/pump_amm/deployed.so').read_bytes(),'baseline':gzip.decompress((D/'builds/baseline/symbols.so.gz').read_bytes()),'candidate':gzip.decompress((D/'builds/candidate/symbols.so.gz').read_bytes())};maps={k:{f['address']:f for f in w.windows(b)} for k,b in blobs.items()}
f0=maps['original'][0xf2d60];f1=next(f for f in maps['candidate'].values() if f['signature']==f0['signature']);rs=[w.m.instructions(blobs[k],f['address'],f['bytes']) for k,f in [('original',f0),('candidate',f1)]];out={'inputs':{k:hashlib.sha256(b).hexdigest() for k,b in blobs.items()},'original':f0,'candidate':f1,'direct_calls':[],'typed_references':[],'incoming':{},'imports':[],'literal_constants':[]}
for a,b in zip(*rs):
 if 'call_target' in a:
  ai=dict(w.m.relocations(blobs['original'])).get(f0['address']+a['offset'],0);bi=dict(w.m.relocations(blobs['candidate'])).get(f1['address']+b['offset'],0)
  if ai&0xffffffff==10:
   assert bi&0xffffffff==10;an=w.dynamic_symbols(blobs['original'])[ai>>32]['name'];bn=w.dynamic_symbols(blobs['candidate'])[bi>>32]['name'];assert an==bn;out['imports'].append({'offset':a['offset'],'name':an});continue
  ca=maps['original'][a['call_target']];cb=maps['candidate'][b['call_target']];assert ca['signature']==cb['signature'],(a['offset'],ca,cb);out['direct_calls'].append({'offset':a['offset'],'original':ca,'candidate':cb})
for a,b in zip(*rs):
 if 'lddw_value' in a:
  assert dict(w.m.relocations(blobs['original'])).get(f0['address']+a['offset'],0)&0xffffffff!=8
  assert dict(w.m.relocations(blobs['candidate'])).get(f1['address']+b['offset'],0)&0xffffffff!=8
  assert a['lddw_value']==b['lddw_value'];out['literal_constants'].append({'offset':a['offset'],'value':a['lddw_value']})
for k in blobs:
 fn=next(f for f in maps[k].values() if f['address']==0xf2d60) if k=='original' else next(f for f in maps[k].values() if f['name'] and '13calculate_fee17h' in f['name'] and ('DecodedTransferFee' in f['name'] if k=='candidate' else 'TransferFee' in f['name']))
 edges=[]
 for f in maps[k].values():
  for row in w.m.instructions(blobs[k],f['address'],f['bytes']):
   if row.get('call_target')==fn['address']:edges.append({'caller':f,'offset':row['offset'],'target':fn['address']})
 out['incoming'][k]=edges
assert out==json.loads((D/'static.json').read_text());print('PASS',len(out['direct_calls']),'calls',len(out['typed_references']),'typed references');print('incoming', {k:[(hex(e['caller']['address']),e['offset']) for e in v] for k,v in out['incoming'].items()})
