from pathlib import Path
import json,hashlib,importlib.util,struct
from functools import lru_cache
O=Path('/home/ahi200/pumpfun-work/20261028-pump-curve-decoder');D=Path('/home/ahi200/pumpfun-work/20261028-pump-feeconfig-decoder')
spec=importlib.util.spec_from_file_location('pump_windows',O/'public/support/window_map.py');w=importlib.util.module_from_spec(spec);spec.loader.exec_module(w)
w.m.elf_layout=lru_cache(maxsize=8)(w.m.elf_layout);w.m.relocations=lru_cache(maxsize=8)(w.m.relocations)
paths=[O/'original.so',D/'local-feeconfig-rebuilt/symbols.so'];blobs=[p.read_bytes() for p in paths];fs=[w.windows(b) for b in blobs];maps=[{f['address']:f for f in a} for a in fs];rels=[dict(w.m.relocations(b)) for b in blobs];dyn=[w.dynamic_symbols(b) for b in blobs]
candidate=next(f for f in fs[1] if f['name'] and 'pump_fees..accounts..FeeConfig' in f['name'] and 'try_deserialize_unchecked' in f['name'])
pending=[(0x1159d8,candidate['address'])];seen=set();nodes=[];edges=[];opens=[];indirect=[];pointer_rows=[]
def call(k,f,r):
 rel=rels[k].get(f['address']+r['offset'],0)
 if rel&0xffffffff==10:return {'kind':'import','name':dyn[k][rel>>32]['name']}
 target=r.get('call_target');assert target in maps[k],(k,r,target)
 g=maps[k][target];return {'kind':'direct','address':target,'bytes':g['bytes'],'signature':g['signature'],'name':g['name']}
while pending:
 a,b=pending.pop()
 if (a,b) in seen:continue
 seen.add((a,b));fa,fb=maps[0][a],maps[1][b]
 if fa['signature']!=fb['signature']:opens.append({'original':fa,'candidate':fb});continue
 nodes.append({'original':fa,'candidate':fb});ra,rb=[w.m.instructions(blob,f['address'],f['bytes']) for blob,f in zip(blobs,[fa,fb])];assert len(ra)==len(rb)
 for x,y in zip(ra,rb):
  assert x['offset']==y['offset'] and x['opcode']==y['opcode']
  if x['opcode']==0x85:
   ca,cb=call(0,fa,x),call(1,fb,y);same=ca['kind']==cb['kind'] and (ca['name']==cb['name'] if ca['kind']=='import' else ca['signature']==cb['signature'])
   edges.append({'parent':[a,b],'offset':x['offset'],'original':ca,'candidate':cb,'equal':same})
   if ca['kind']=='direct' and cb['kind']=='direct':pending.append((ca['address'],cb['address']))
  elif x['opcode']==0x8d:indirect.append({'parent':[a,b],'offset':x['offset'],'original':x,'candidate':y})
 if a==0x1159d8:
  for annot in fa['annotations']:
   if annot[1]=='opaque_relocated_pointer':
    off=annot[0];pa=next(r['lddw_value'] for r in ra if r['offset']==off);pb=next(r['lddw_value'] for r in rb if r['offset']==off)
    vals=[]
    for k,p in enumerate([pa,pb]):
     raw=w.m.at_address(blobs[k],p,24);q,n=struct.unpack_from('<QQ',raw)
     assert rels[k].get(p)==8 and q&0xffffffff==0 and n<1024
     file_offset=q>>32
     assert any(s['type']!=8 and s['offset']<=file_offset and file_offset+n<=s['offset']+s['size'] for s in w.m.elf_layout(blobs[k])['sections'])
     text=blobs[k][file_offset:file_offset+n]
     vals.append({'address':p,'record_hex':raw.hex(),'encoded_pointer':q,'relocation_info':8,'string_file_offset':file_offset,'length':n,'text_hex':text.hex(),'text':text.decode(),'tail_hex':raw[16:].hex()})
    assert vals[0]['text_hex']==vals[1]['text_hex'] and vals[0]['tail_hex']==vals[1]['tail_hex']
    if off==40:assert struct.unpack_from('<II',bytes.fromhex(vals[0]['tail_hex']))==(84,1)
    if off==952:assert vals[0]['text']=='failed to fill whole buffer' and int.from_bytes(bytes.fromhex(vals[0]['tail_hex']),'little')==37
    pointer_rows.append({'offset':off,'original':vals[0],'candidate':vals[1]})
out={'input_sha256':[hashlib.sha256(b).hexdigest() for b in blobs],'root':[0x1159d8,candidate['address']],'matched_pairs':nodes,'edges':edges,'open_pairs':opens,'indirect_sites':indirect,'root_pointer_records':pointer_rows,'scope':'Complete normalized bodies plus actual direct-callee/import correspondence. Indirect targets and transitive data are not proved. Root data interpretation is recorded separately.'}
(D/'closure.json').write_text(json.dumps(out,indent=2)+'\n');print('matched pairs',len(nodes),'edges',len(edges),'open pairs',len(opens),'indirect sites',len(indirect));print(json.dumps(pointer_rows,indent=2))
