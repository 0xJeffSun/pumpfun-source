from pathlib import Path
import importlib.util,json,hashlib
from functools import lru_cache
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');J=Path('/home/ahi200/pumpfun-work/20261028-amm-v2-selector');sp=importlib.util.spec_from_file_location('w',R/'research/fees-composed-frontier188/window_map.py');w=importlib.util.module_from_spec(sp);sp.loader.exec_module(w);w.m.elf_layout=lru_cache(maxsize=4)(w.m.elf_layout);w.m.relocations=lru_cache(maxsize=4)(w.m.relocations)
bs={'original':(R/'evidence/original/pump_amm/deployed.so').read_bytes(),'candidate':(J/'apply-match/symbols.so').read_bytes()};maps={k:{f['address']:f for f in w.windows(b)} for k,b in bs.items()};fs={'original':maps['original'][0x14088],'candidate':next(f for f in maps['candidate'].values() if f['name'] and '19select_and_apply_v217h' in f['name'])};rs={k:w.m.instructions(bs[k],f['address'],f['bytes']) for k,f in fs.items()};calls=[];data=[]
for o,c in zip(rs['original'],rs['candidate']):
 assert o['offset']==c['offset']
 if 'call_target' in o:
  of=maps['original'][o['call_target']];cf=maps['candidate'][c['call_target']];row={'offset':o['offset'],'original':of,'candidate':cf,'body_matches':of['signature']==cf['signature']};calls.append(row);print('call',o['offset'],hex(of['address']),of['bytes'],cf['name'],row['body_matches'],flush=True)
 if 'lddw_value' in o:
  vals={k:r['lddw_value'] for k,r in [('original',o),('candidate',c)]};row={'offset':o['offset'],'addresses':vals,'prefixes':{k:w.m.at_address(bs[k],v,48).hex() for k,v in vals.items()}};data.append(row);print('data',o['offset'],{k:bytes.fromhex(v) for k,v in row['prefixes'].items()},flush=True)
(J/'target-references.json').write_text(json.dumps({'targets':fs,'calls':calls,'data':data},indent=2)+'\n')
