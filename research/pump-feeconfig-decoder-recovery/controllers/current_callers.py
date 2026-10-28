from pathlib import Path
import importlib.util, json, hashlib, gzip
from functools import lru_cache
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source')
P=R/'research/pump-feeconfig-decoder-recovery'
s=importlib.util.spec_from_file_location('windows',P/'support/window_map.py');w=importlib.util.module_from_spec(s);s.loader.exec_module(w)
w.m.elf_layout=lru_cache(maxsize=4)(w.m.elf_layout);w.m.relocations=lru_cache(maxsize=4)(w.m.relocations)
out={}
for label in ['original','baseline780','candidate']:
 b=(R/'evidence/original/pump/deployed.so').read_bytes() if label=='original' else gzip.decompress((P/'builds'/label/'symbols.so.gz').read_bytes())
 fs=w.windows(b);by={f['address']:f for f in fs}
 if label=='original':targets=[by[0x1156f0],by[0x1159d8]]
 else:targets=[f for f in fs if f['name'] and 'pump_fees..accounts..FeeConfig' in f['name'] and ('try_deserialize' in f['name'] or 'deserialize_reader' in f['name'])]
 addresses={f['address'] for f in targets};incoming=[]
 for f in fs:
  for insn in w.m.instructions(b,f['address'],f['bytes']):
   if insn.get('call_target') in addresses:incoming.append({'caller':f,'offset':insn['offset'],'callee':by[insn['call_target']]})
 out[label]={'symbols_sha256':hashlib.sha256(b).hexdigest(),'targets':targets,'incoming_calls':incoming}
 checked=by[0x1156f0] if label=='original' else next(f for f in targets if 'try_deserialize' in f['name'] and 'unchecked' not in f['name'])
 end=w.m.instructions(b,checked['address'],checked['bytes']);last=next(x for x in end if x['offset']==728)
 assert last['opcode']==0x85
 out[label]['wrapper_final_call']={'wrapper':checked,'offset':728,'callee':by[last['call_target']]}
 print(label,[(hex(f['address']),f['bytes'],f['name']) for f in targets],flush=True)
assert len({out[x]['wrapper_final_call']['wrapper']['signature'] for x in out})==1
assert out['original']['wrapper_final_call']['callee']['signature']==out['candidate']['wrapper_final_call']['callee']['signature']
(P/'caller-boundary.json').write_text(json.dumps(out,indent=2)+'\n')
