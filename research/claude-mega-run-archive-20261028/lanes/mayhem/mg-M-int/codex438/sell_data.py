"""Bounded data objects reached directly by the newly matched SellPumpSwap body."""
from pathlib import Path
import importlib.util,json,struct,tempfile
sha=None
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def inspect(root,original,candidate):
 q=module('sell438_prefix',root/'research/mayhem-current436-selected-prefixes-20261027/reader.py');o,c=q.elves(original,candidate);rows=json.loads((q.M/'original-windows.json').read_bytes());ow={r['start']:o.window(r['start'],r['start']+r['bytes'])for r in rows};cw,_=q.q.tables(c);left=ow[95848];right=next(w for w in cw.values()if q.q.key(w)==q.q.key(left));ld={r['offset']:r for r in left['data_references']};rd={r['offset']:r for r in right['data_references']};assert set(ld)==set(rd)
 def take(e,address,size):
  section=next(s for s in e.sections if s['type']!=8 and s['flags']&2 and s['address']<=address and address+size<=s['address']+s['size'])
  off=section['offset']+address-section['address'];return e.b[off:off+size]
 def seed_slice(e,address):
  data=take(e,address,16);ptr,n=struct.unpack('<QQ',data);assert ptr&0xffffffff==0 and n==2 and e.rel[address]['type']==8 and e.rel[address]['symbol_index']==0 and not any(address<r<address+16 for r in e.rel);ptr>>=32;out=[]
  for i,size in enumerate([17,1]):
   at=ptr+i*16;p,l=struct.unpack('<QQ',take(e,at,16));assert p&0xffffffff==0 and l==size and e.rel[at]['type']==8 and e.rel[at]['symbol_index']==0 and not any(at<r<at+16 for r in e.rel);out.append(take(e,p>>32,l))
  assert out==[b'__event_authority',b'\xfc'];return [b.hex()for b in out]
 fixed={8544:9,14144:9,16312:8,16328:8,16776:32,17000:55};sources={17040,17264,17288};prefixes={944,2512,17024};results=[]
 assert set(ld)==set(fixed)|sources|prefixes|{16896}
 for offset in sorted(ld):
  a,b=ld[offset]['target'],rd[offset]['target']
  if offset in fixed:
   n=fixed[offset];x,y=take(o,a,n),take(c,b,n);assert x==y;result=dict(kind='literal',bytes=n,hex=x.hex())
  elif offset in sources:
   x,y=q.q.source(o,a),q.q.source(c,b);assert x==y and x;result=dict(kind='Source',value=list(x))
  elif offset in prefixes:
   x,y=q.prefix(o,ow,a),q.prefix(c,cw,b);assert x and y and x['scalars']==y['scalars'];assert len(x['targets'])==len(y['targets'])==2
   for u,v in zip(x['targets'],y['targets']):assert(u is None and v is None)or(u in ow and v in cw and q.q.key(ow[u])==q.q.key(cw[v]))
   result=dict(kind='selected32BytePrefix',scalars=x['scalars'],original_targets=x['targets'],candidate_targets=y['targets'],extent_limit=32)
  else:
   x,y=seed_slice(o,a),seed_slice(c,b);assert x==y;result=dict(kind='twoSeedSlice',seed_hex=x)
  results.append(dict(offset=offset,original_address=a,candidate_address=b,**result))
 relation=q.inspect(original,candidate);assert relation['summary']['selected_data_windows']==433 and relation['summary']['raw_windows']==141 and relation['summary']['source_sites']==502
 return dict(sites=results,selected_prefix_relation=relation['summary'],scope='All13directnewbodydata references checked at explicit bounded extents. No object extent beyond selected32byteprefix or generaldata/indirectequivalence claimed.')
