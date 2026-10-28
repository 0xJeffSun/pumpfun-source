from pathlib import Path
import json,hashlib,importlib.util,collections,subprocess
from functools import lru_cache
O=Path('/home/ahi200/pumpfun-work/20261028-pump-curve-decoder');D=Path('/home/ahi200/pumpfun-work/20261028-pump-feeconfig-decoder')
spec=importlib.util.spec_from_file_location('pump_windows',O/'public/support/window_map.py');w=importlib.util.module_from_spec(spec);spec.loader.exec_module(w)
w.m.elf_layout=lru_cache(maxsize=8)(w.m.elf_layout);w.m.relocations=lru_cache(maxsize=8)(w.m.relocations)
original=w.windows((O/'original.so').read_bytes());os=collections.Counter(f['signature'] for f in original);orr=collections.Counter(f['raw_sha256'] for f in original)
out={};sets={}
for label in ['baseline780','local-feeconfig-rebuilt']:
 p=D/label/'symbols.so';b=p.read_bytes();fs=w.windows(b);by={f['address']:f for f in fs};counts=collections.Counter(f['signature'] for f in fs);raw=collections.Counter(f['raw_sha256'] for f in fs);sets[label]=(os&counts,orr&raw)
 targets=[f for f in fs if f['name'] and 'pump_fees' in f['name'] and 'FeeConfig' in f['name'] and 'try_deserialize_unchecked' in f['name']];assert len(targets)==1
 f=targets[0];rows=w.m.instructions(b,f['address'],f['bytes']);calls=[{'offset':r['offset'],'callee':by.get(r['call_target'],{'address':r['call_target']})} for r in rows if 'call_target' in r]
 out[label]={'symbols_sha256':hashlib.sha256(b).hexdigest(),'candidate_sha256':hashlib.sha256((D/label/'candidate.so').read_bytes()).hexdigest(),'normalized_injective':sum(sets[label][0].values()),'raw_injective':sum(sets[label][1].values()),'target':f,'target_matches_original':f['signature']==next(f['signature'] for f in original if f['address']==0x1159d8),'calls':calls}
 cmd=['/home/ahi200/pumpfun-work/20261027-crank/sdk/llvm/bin/llvm-objdump','-d','--no-show-raw-insn','--start-address='+str(f['address']),'--stop-address='+str(f['address']+f['bytes']),str(p)]
 (D/label/'decoder.asm').write_bytes(subprocess.check_output(cmd))
 print(label,'norm',out[label]['normalized_injective'],'raw',out[label]['raw_injective'],'decoder_bytes',f['bytes'],'match',out[label]['target_matches_original'],flush=True)
b,a=sets['baseline780'],sets['local-feeconfig-rebuilt'];g=a[0]-b[0];lost=b[0]-a[0]
out['delta']={'gained':dict(g),'lost':dict(lost),'raw_gained':dict(a[1]-b[1]),'raw_lost':dict(b[1]-a[1]),'gained_originals':[f for f in original if f['signature'] in g],'lost_originals':[f for f in original if f['signature'] in lost]}
assert out['baseline780']['normalized_injective']==780
assert not (D/'measurement.json').exists();(D/'measurement.json').write_text(json.dumps(out,indent=2)+'\n');print('gains',sum(g.values()),'losses',sum(lost.values()),flush=True)
