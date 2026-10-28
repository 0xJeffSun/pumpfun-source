from pathlib import Path
import importlib.util,json,struct,hashlib,gzip
from functools import lru_cache
D=Path(__file__).resolve().parent;R=D.parents[1]
s=importlib.util.spec_from_file_location('w',R/'research/fees-composed-frontier188/window_map.py');w=importlib.util.module_from_spec(s);s.loader.exec_module(w);w.m.elf_layout=lru_cache(maxsize=8)(w.m.elf_layout);w.m.relocations=lru_cache(maxsize=8)(w.m.relocations)
blobs={'original':(R/'evidence/original/pump_amm/deployed.so').read_bytes(),'baseline':gzip.decompress((D/'builds/baseline/symbols.so.gz').read_bytes()),'candidate':gzip.decompress((D/'builds/candidate/symbols.so.gz').read_bytes())};maps={k:{f['address']:f for f in w.windows(b)} for k,b in blobs.items()}
f0=maps['original'][0x58e08];f1=next(f for f in maps['candidate'].values() if f['signature']==f0['signature']);rs=[w.m.instructions(blobs[k],f['address'],f['bytes']) for k,f in [('original',f0),('candidate',f1)]];out={'inputs':{k:hashlib.sha256(b).hexdigest() for k,b in blobs.items()},'original':f0,'candidate':f1,'direct_calls':[],'typed_references':[],'incoming':{}}
for a,b in zip(*rs):
 if 'call_target' in a:
  ca=maps['original'][a['call_target']];cb=maps['candidate'][b['call_target']];assert ca['signature']==cb['signature'],(a['offset'],ca,cb);out['direct_calls'].append({'offset':a['offset'],'original':ca,'candidate':cb})
def readref(k,addr,kind,n):
 blob=blobs[k];section=next(s for s in w.m.elf_layout(blob)['sections'] if s['type']!=8 and s['address']<=addr and addr+n<=s['address']+s['size']);assert section['name'] in ['.rodata','.data.rel.ro'];raw=w.m.at_address(blob,addr,n);rels=dict(w.m.relocations(blob));d={'address':addr,'raw_hex':raw.hex(),'kind':kind};parts=[]
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
kinds={1056:('error_discriminant',4),1104:('vtable_string',40),1200:('error_discriminant',4),1248:('panic_text',55),1272:('vtable_fmt_error',32),1288:('source_location',24),1408:('instruction_source_path',len('programs/pump-amm/src/instructions/swap/mod.rs'))}
assert sorted(kinds)==[r['offset'] for r in rs[0] if 'lddw_value' in r]
for off,(kind,n) in kinds.items():
 values=[readref(k,next(r['lddw_value'] for r in rr if r['offset']==off),kind,n) for k,rr in zip(['original','candidate'],rs)]
 assert values[0]['nonpointer_hex']==values[1]['nonpointer_hex'],(off,values)
 assert [{key:v for key,v in p.items() if key!='target'} for p in values[0]['pointers']]==[{key:v for key,v in p.items() if key!='target'} for p in values[1]['pointers']],(off,values)
 out['typed_references'].append({'offset':off,'original':values[0],'candidate':values[1]})
for k in blobs:
 fn=next(f for f in maps[k].values() if f['address']==0x58e08) if k=='original' else next(f for f in maps[k].values() if f['name'] and '31validate_protocol_fee_recipient' in f['name'])
 edges=[]
 for f in maps[k].values():
  for row in w.m.instructions(blobs[k],f['address'],f['bytes']):
   if row.get('call_target')==fn['address']:edges.append({'caller':f,'offset':row['offset'],'target':fn['address']})
 out['incoming'][k]=edges
assert out==json.loads((D/'static.json').read_text());print('PASS',len(out['direct_calls']),'calls',len(out['typed_references']),'typed references');print('incoming', {k:[(hex(e['caller']['address']),e['offset']) for e in v] for k,v in out['incoming'].items()})
