"""Bind the live AMM Buy system transfer without claiming its whole body."""
from pathlib import Path
import gzip,hashlib,importlib.util,json,struct,tempfile
P=Path(__file__).resolve().parent

def inspect(original,symbols):
 with tempfile.TemporaryDirectory()as td:
  t=Path(td);(t/'o').write_bytes(original);(t/'c').write_bytes(symbols)
  sp=importlib.util.spec_from_file_location('amm_transfer_reader',P/'reader.py');m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m);o=m.Elf(t/'o');c=m.Elf(t/'c');rows=json.loads(gzip.decompress((P/'inputs/parent-audit.json.gz').read_bytes()))['rows'];ow={r['start']:o.window(r['start'],r['end'])for r in rows};cw={s['value']:c.window(s['value'],s['value']+s['size'])for s in c.symbols if s['info']&15==2 and s['size']>=8 and c.lo<=s['value']<c.hi};key=lambda w:(w['end']-w['start'],w['normalized_sha256'],w['normalization_pattern'])
  original_handler=ow[85600];symbol=next(s for s in c.symbols if 'instructions13buy_pump_swap7handler' in s['name']);candidate_handler=cw[symbol['value']];a=ow[628192];edges=[d for d in candidate_handler['direct']if d['target']in cw and key(cw[d['target']])==key(a)];assert len(edges)==1;edge=edges[0];b=cw[edge['target']]
  assert any(d['offset']==3344 and d['target']==a['start']for d in original_handler['direct'])
  calls=[]
  for x,y in zip(a['direct'],b['direct']):
   assert x['offset']==y['offset'];aa,bb=ow[x['target']],cw[y['target']];assert key(aa)==key(bb);calls.append(dict(offset=x['offset'],original_target=x['target'],candidate_target=y['target'],bytes=aa['end']-aa['start'],normalized_equal=True))
  data=[]
  for x,y in zip(a['data_references'],b['data_references']):
   assert x['offset']==y['offset'];values=[]
   for e,d in [(o,x),(c,y)]:
    p=d['target'];assert e.rel[p]['type']==8;zero,q=struct.unpack_from('<II',e.b,p);n,l,k=struct.unpack_from('<QII',e.b,p+8);assert zero==0 and 0<n<300;values.append(dict(path=e.b[q:q+n].decode(),line=l,column=k))
   assert values[0]==values[1];data.append(dict(offset=x['offset'],original=values[0],candidate=values[1],equal=True))
  return dict(original_sha256=hashlib.sha256(original).hexdigest(),symbols_sha256=hashlib.sha256(symbols).hexdigest(),original_handler=[original_handler['start'],original_handler['end']],candidate_handler=[candidate_handler['start'],candidate_handler['end']],original_call_offset=3344,candidate_call_offset=edge['offset'],original_callee=[a['start'],a['end']],candidate_callee=[b['start'],b['end']],callee_normalized_equal=True,handler_normalized_equal=key(original_handler)==key(candidate_handler),direct_calls=calls,data=data,scope='Actual AMM Buy call to complete system transfer helper and bounded immediate calls/Source data. AMM Buy whole body remains unmatched.')
