"""Bind the three live handlers and their retained-bps panic Source records."""
from pathlib import Path
import argparse,importlib.util,json,struct,hashlib,gzip
P=Path(__file__).resolve().parent;R=P.parents[1]
SPECS=[('buy','O0081','O0187',74),('buy_v2','O0083','O0189',91),('sell_v2','O0084','O0188',89)]
def inspect(symbols):
 spec=importlib.util.spec_from_file_location('retained_elf',R/'repro/mayhem/global-params-layout-recovery/tools/layer01.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
 o=m.Elf(R/'evidence/original/mayhem/deployed.so');c=m.Elf(symbols);rows=json.loads(gzip.decompress((R/'repro/mayhem/global-params-layout-recovery/prior-inventory.json.gz').read_bytes()))['original_rows'];ow={r['id']:o.window(r['start'],r['end'])for r in rows};cw={s['value']:c.window(s['value'],s['value']+s['size'])for s in c.symbols if s['info']&15==2 and s['size']>=8 and c.lo<=s['value']<c.hi}
 key=lambda w:(w['end']-w['start'],w['normalized_sha256'],json.dumps(w['normalization_pattern'],sort_keys=True))
 def sources(e,w):
  found=[]
  for ref in w['data_references']:
   p=ref['target']
   if p not in e.rel or e.rel[p]['type']!=8:continue
   try:
    zero,text=struct.unpack_from('<II',e.b,p);length,line,col=struct.unpack_from('<QII',e.b,p+8)
    if zero or not (0<length<300 and 0<line<100000 and 0<col<10000):continue
    path=e.b[text:text+length].decode()
    if path.endswith('.rs\0'):found.append(dict(offset=ref['offset'],target=p,descriptor_bytes=24,path=path,line=line,column=col))
   except (ValueError,UnicodeError,struct.error):pass
  return found
 out=[]
 for name,hid,wid,line in SPECS:
  w=ow[wid];found=[x for x in cw.values()if key(x)==key(w)];assert len(found)==1,(name,wid)
  index=next(i for i,x in enumerate(w['direct'])if x['target']==ow[hid]['start']);target=found[0]['direct'][index]['target'];h=cw[target]
  orig=[r for r in sources(o,ow[hid])if r['path']=='programs/mayhem-program/src/state.rs\0'and r['line']==321 and r['column']==26];assert len(orig)==1,(name,orig)
  current=sources(c,h);matching=[r for r in current if(r['path'],r['line'],r['column'])==(orig[0]['path'],321,26)]
  old=[r for r in current if r['path']=='programs/mayhem-program/src/instructions/'+name+'.rs\0'and r['line']==line]
  out.append(dict(instruction=name,original_id=hid,wrapper_id=wid,wrapper_normalized_equal=True,original_handler=ow[hid]['start'],candidate_handler=target,original_bytes=ow[hid]['end']-ow[hid]['start'],candidate_bytes=h['end']-h['start'],whole_handler_normalized_equal=key(ow[hid])==key(h),original_source=orig[0],matching_source_records=matching,former_local_records=old))
 return dict(original_sha256=hashlib.sha256(o.b).hexdigest(),symbols_sha256=hashlib.sha256(c.b).hexdigest(),handlers=out,scope='Bounded Source descriptors referenced by live handlers identified through matching entry wrappers. Handler bodies and instruction-site correspondence remain unproved; this is not a new normalized-body match.')
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('symbols',type=Path);a.add_argument('output',type=Path);args=a.parse_args();d=inspect(args.symbols);args.output.write_bytes((json.dumps(d,indent=2)+'\n').encode());print([(x['instruction'],len(x['matching_source_records']),x['former_local_records'])for x in d['handlers']])
