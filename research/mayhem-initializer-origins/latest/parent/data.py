"""Bound five Source corrections to live trade handlers through matched wrappers."""
from pathlib import Path
import hashlib,importlib.util,json,struct
P=Path(__file__).resolve().parent;R=P.parents[1]
def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def inspect(symbols):
 retained=module('retained_source_reader',R/'research/mayhem-retained-bps-recovery/data.py').inspect(symbols)
 assert len(retained['handlers'])==3 and all(len(h['matching_source_records'])==1 and not h['former_local_records']for h in retained['handlers'])
 m=module('trade_source_reader',P/'reader.py');o=m.Elf(R/'evidence/original/mayhem/deployed.so');c=m.Elf(symbols)
 rows=json.loads((R/'research/mayhem-accounting-extend-recovery/audit.json').read_bytes())['rows'];ow={r['id']:o.window(r['start'],r['end'])for r in rows};cw={s['value']:c.window(s['value'],s['value']+s['size'])for s in c.symbols if s['info']&15==2 and s['size']>=8 and c.lo<=s['value']<c.hi}
 key=lambda w:(w['end']-w['start'],w['normalized_sha256'],w['normalization_pattern']);wrapper=ow['O0190'];matches=[w for w in cw.values()if key(w)==key(wrapper)];assert matches
 index=next(i for i,x in enumerate(wrapper['direct'])if x['target']==ow['O0079']['start']);targets={w['direct'][index]['target']for w in matches};assert len(targets)==1;target=targets.pop();handler=cw[target]
 def sources(e,w):
  found=[]
  for ref in w['data_references']:
   p=ref['target']
   if p not in e.rel or e.rel[p]['type']!=8:continue
   try:
    zero,text=struct.unpack_from('<II',e.b,p);n,line,col=struct.unpack_from('<QII',e.b,p+8)
    if zero or not(0<n<300 and 0<line<100000 and 0<col<10000):continue
    name=e.b[text:text+n].decode()
    if name.endswith('.rs\0'):found.append(dict(offset=ref['offset'],target=p,descriptor_bytes=24,path=name,line=line,column=col))
   except(UnicodeError,struct.error):pass
  return found
 expected=[('programs/mayhem-program/src/instructions/pump_amm_interface.rs\0',595,23),('programs/mayhem-program/src/instructions/pump_amm_interface.rs\0',596,26)]
 original=[s for s in sources(o,ow['O0079'])if(s['path'],s['line'],s['column'])in expected];candidate=[s for s in sources(c,handler)if(s['path'],s['line'],s['column'])in expected]
 assert sorted((s['path'],s['line'],s['column'])for s in original)==sorted(expected)==sorted((s['path'],s['line'],s['column'])for s in candidate)
 assert not any(s['path'].endswith('sell_pump_swap.rs\0')and s['line']==109 for s in sources(c,handler))
 return dict(original_sha256=hashlib.sha256(o.b).hexdigest(),symbols_sha256=hashlib.sha256(c.b).hexdigest(),retained=retained,sell=dict(wrapper='O0190',wrapper_normalized_equal=True,handler='O0079',candidate_start=target,body_normalized_equal=key(ow['O0079'])==key(handler),original_sources=original,candidate_sources=candidate),scope='Five typed Source records in four live handlers. Original/candidate instruction positions differ; no complete handler or unrestricted transitive closure claim.')
