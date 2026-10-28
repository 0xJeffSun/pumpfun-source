from pathlib import Path
import importlib.util,json,collections,struct,hashlib,gzip
from functools import lru_cache
D=Path(__file__).resolve().parent;R=D.parents[1];spec=importlib.util.spec_from_file_location('w',R/'research/fees-composed-frontier188/window_map.py');w=importlib.util.module_from_spec(spec);spec.loader.exec_module(w);w.m.elf_layout=lru_cache(maxsize=8)(w.m.elf_layout);w.m.relocations=lru_cache(maxsize=8)(w.m.relocations)
paths={'original':R/'evidence/original/pump_amm/deployed.so','baseline':D/'builds/baseline/symbols.so.gz','candidate':D/'builds/candidate/symbols.so.gz'};blobs={k:(gzip.decompress(p.read_bytes()) if p.suffix=='.gz' else p.read_bytes()) for k,p in paths.items()};maps={k:{f['address']:f for f in w.windows(b)} for k,b in blobs.items()};original=maps['original'];roots=[0x6bcd0,0x6c328,0x39d80,0x39f88,0x3a190,0x3a398,0xb3460];out={'inputs':{k:hashlib.sha256(b).hexdigest() for k,b in blobs.items()},'handlers':{},'new_body':{}}
def rows(k,f):return w.m.instructions(blobs[k],f['address'],f['bytes'])
def matches(k,f):return [g for g in maps[k].values() if g['signature']==f['signature']]
for k in blobs:
 handlers={}
 for origwrapper,origbody,name in [(0xe7648,0x376b0,'buy'),(0xe7d88,0x3a5a0,'buy_exact_quote_in')]:
  wrapper=matches(k,original[origwrapper]);assert len(wrapper)==1;wrapper=wrapper[0];call=next(r for r in rows(k,wrapper) if r['offset']==600);f=maps[k][call['call_target']];hits=[]
  for r in rows(k,f):
   if 'call_target' in r and r['call_target'] in maps[k]:
    child=maps[k][r['call_target']]
    for target in roots:
     if child['signature']==original[target]['signature']:hits.append(dict(offset=r['offset'],target_original=target,callee=child))
  reserve=[x['target_original'] for x in hits if x['target_original'] in roots[:2]];assert reserve==([] if k=='baseline' else roots[:2]),(k,name,reserve)
  if name=='buy' and k!='baseline':assert sorted(x['target_original'] for x in hits)==sorted(roots),(k,name,'missing target')
  handlers[name]={'wrapper':wrapper,'wrapper_call':call,'body':f,'matched_direct_calls':hits}
 out['handlers'][k]=handlers
# New520B overflow helper: direct callees plus all7 typed data operands.
f0=original[0xb3460];f1=matches('candidate',f0);assert len(f1)==1;f1=f1[0];rs=[rows(k,f) for k,f in [('original',f0),('candidate',f1)]];direct=[]
for a,b in zip(*rs):
 if 'call_target' in a:
  ca=original[a['call_target']];cb=maps['candidate'][b['call_target']];assert ca['signature']==cb['signature'];direct.append({'offset':a['offset'],'original':ca,'candidate':cb})
assert len(direct)==4
refs=[]
def readref(k,addr,kind,n):
 blob=blobs[k];raw=w.m.at_address(blob,addr,n);rels=dict(w.m.relocations(blob));d={'address':addr,'raw_hex':raw.hex(),'kind':kind};parts=[]
 for off in range(0,n-7,8):
  if rels.get(addr+off)==8:
   ptr=struct.unpack_from('<Q',raw,off)[0];assert ptr&0xffffffff==0;fileoff=ptr>>32;section=next(s for s in w.m.elf_layout(blob)['sections'] if s['type']!=8 and s['offset']<=fileoff<s['offset']+s['size']);target=section['address']+fileoff-section['offset']
   if kind.startswith('vtable'):
    f=maps[k][target];value={'offset':off,'target':target,'signature':f['signature']}
   else:
    length=struct.unpack_from('<Q',raw,8)[0];value={'offset':off,'target':target,'text_hex':blob[fileoff:fileoff+length].hex()}
   parts.append(value)
 norm=bytearray(raw)
 for p in parts:norm[p['offset']:p['offset']+8]=bytes(8)
 d['nonpointer_hex']=norm.hex();d['pointers']=parts;return d
kinds={24:('error_discriminant',4),72:('vtable_string',40),168:('error_discriminant',4),216:('panic_text',55),240:('vtable_fmt_error',32),256:('source_location',24),376:('instruction_source_path',43)}
for off,(kind,n) in kinds.items():
 values=[]
 for k,rr in zip(['original','candidate'],rs):values.append(readref(k,next(r['lddw_value'] for r in rr if r['offset']==off),kind,n))
 assert values[0]['nonpointer_hex']==values[1]['nonpointer_hex'],(off,values)
 assert [{key:v for key,v in p.items() if key!='target'} for p in values[0]['pointers']]==[{key:v for key,v in p.items() if key!='target'} for p in values[1]['pointers']],(off,values)
 refs.append({'offset':off,'original':values[0],'candidate':values[1]})
assert any(r['immediate']==409 for r in rs[0]);out['new_body']={'original':f0,'candidate':f1,'direct_callees':direct,'typed_references':refs,'source_line':409};assert json.loads((D/'static.json').read_text())==out;print(json.dumps({'new_function_bytes':520,'direct_callees':len(direct),'typed_references':len(refs),'handlers':{k:{name:[hex(c['target_original']) for c in h['matched_direct_calls']] for name,h in handlers.items()} for k,handlers in out['handlers'].items()}},indent=2))
