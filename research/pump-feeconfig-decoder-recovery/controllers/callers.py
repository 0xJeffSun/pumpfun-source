from pathlib import Path
import json,importlib.util
from functools import lru_cache
O=Path('/home/ahi200/pumpfun-work/20261028-pump-curve-decoder');D=Path('/home/ahi200/pumpfun-work/20261028-pump-feeconfig-decoder')
spec=importlib.util.spec_from_file_location('pump_windows',O/'public/support/window_map.py');w=importlib.util.module_from_spec(spec);spec.loader.exec_module(w)
w.m.elf_layout=lru_cache(maxsize=8)(w.m.elf_layout);w.m.relocations=lru_cache(maxsize=8)(w.m.relocations)
out={}
for label,path,targets in [('original',O/'original.so',[0x1159d8]),('candidate',O/'native-amm-cache/baseline/symbols.so',[0x11f938,0x166e28])]:
 b=path.read_bytes();fs=w.windows(b);rows=[]
 for f in fs:
  for r in w.m.instructions(b,f['address'],f['bytes']):
   if r.get('call_target') in targets:rows.append({'caller':f,'offset':r['offset'],'target':r['call_target']});print(label,hex(f['address']),f['bytes'],f['name'],'offset',r['offset'],'->',hex(r['call_target']))
 out[label]=rows
(D/'callers.json').write_text(json.dumps(out,indent=2)+'\n')
text=(O/'native-amm-cache/passes/pump_recovered.ll').read_text();name='_ZN94_$LT$pump_recovered..pump_fees..accounts..FeeConfig$u20$as$u20$borsh..de..BorshDeserialize$GT$18deserialize_reader17h9ce8254eeb9cf425E'
for block in text.split('\ndefine ')[1:]:
 calls=[l.strip() for l in block.split('\n}\n')[0].splitlines() if name in l]
 if calls:print('IR',block.splitlines()[0],len(calls))
