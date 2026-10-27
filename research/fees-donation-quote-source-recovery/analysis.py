from pathlib import Path
import gzip,hashlib,importlib.util,json,struct,sys
from collections import Counter
from functools import lru_cache
HERE=Path(__file__).resolve().parent
R=HERE.parents[1]
def module(name,path):
 sp=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m);return m
w=module('quote_windows',R/'research/fees-composed-frontier188/window_map.py')
w.m.elf_layout=lru_cache(maxsize=8)(w.m.elf_layout);w.m.relocations=lru_cache(maxsize=8)(w.m.relocations)
def sha(data):return hashlib.sha256(data).hexdigest()
def read(path):return gzip.decompress(path.read_bytes())if path.suffix=='.gz'else path.read_bytes()
def location(image,target):
 assert dict(w.m.relocations(image)).get(target,0)&0xffffffff==8
 low,ptr,n,line,col=struct.unpack('<IIQII',w.m.at_address(image,target,24))
 assert low==0 and 0<n<=300 and 0<line<=100000 and 0<col<=300
 name=w.m.at_address(image,ptr,n);assert name.endswith(b'.rs')and all(32<=c<127 for c in name)
 return(name.decode(),line,col)
def records(image,body):
 rel=dict(w.m.relocations(image));out=[]
 for ins in w.m.instructions(image,body['address'],body['bytes']):
  if rel.get(body['address']+ins['offset'],0)&0xffffffff!=8:continue
  try:value=location(image,ins['lddw_value'])
  except(AssertionError,ValueError,StopIteration,struct.error):continue
  out.append({'consumer_offset':ins['offset'],'instruction':ins['raw'],'value':value,'record':w.m.at_address(image,ins['lddw_value'],24).hex()})
 return out
def analyze(candidate):
 original=(R/'evidence/original/pump_fees/deployed.so').read_bytes();ow=w.windows(original);cw=w.windows(candidate)
 oi={r['address']:r for r in ow};ci={r['address']:r for r in cw};comparison=w.compare(ow,cw);pairs=comparison['unique_pairs'];rel=dict(w.m.relocations(original))
 wrapper=next(p for p in pairs if p['original']['address']==655904)
 def target(image,body):return next(i['call_target']for i in w.m.instructions(image,body['address'],body['bytes'])if i['offset']==424)
 ob,cb=oi[target(original,wrapper['original'])],ci[target(candidate,wrapper['candidate'])];assert ob['address']==163920
 edges=[];locations=[]
 for p in pairs:
  a,b=p['original'],p['candidate']
  for x,y in zip(w.m.instructions(original,a['address'],a['bytes']),w.m.instructions(candidate,b['address'],b['bytes'])):
   kind=rel.get(a['address']+x['offset'],0)&0xffffffff
   if 'call_target'in x and kind!=10:edges.append([a['address'],x['offset'],oi[x['call_target']]['signature']==ci[y['call_target']]['signature']])
   if kind==8:
    try:left=location(original,x['lddw_value'])
    except(AssertionError,ValueError,StopIteration,struct.error):continue
    right=location(candidate,y['lddw_value']);locations.append([a['address'],x['offset'],left,right])
 matched=[r['address']for r in ow if r['signature']in {x['signature']for x in cw}]
 raw=[r['address']for r in ow if r['raw_sha256']in {x['raw_sha256']for x in cw}]
 return {'original_sha256':sha(original),'symbols_sha256':sha(candidate),'normalized':matched,'raw':raw,'unique_pairs':len(pairs),'locations':locations,'edges':edges,'wrapper':wrapper,'original_body':ob,'candidate_body':cb,'original_records':records(original,ob),'candidate_records':records(candidate,cb)}

def reports():
 return json.loads(json.dumps({'control':analyze(read(R/'research/fees-qualified-linker-layout/artifacts/candidate-symbols.so.gz')),
         'candidate':analyze(read(HERE/'artifacts/candidate-symbols.so.gz'))}))
if __name__=='__main__':
 actual=reports()
 if '--check' in sys.argv:assert actual==json.loads(read(HERE/'analysis.json.gz'))
 else:(HERE/'analysis.json.gz').write_bytes(gzip.compress((json.dumps(actual,indent=2)+'\n').encode(),mtime=0))
 print(json.dumps({k:{'normalized':len(v['normalized']),'raw':len(v['raw']),'body_bytes':v['candidate_body']['bytes'],'source_records':[r['value']for r in v['candidate_records']]}for k,v in actual.items()}))
