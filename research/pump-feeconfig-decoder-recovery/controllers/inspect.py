from pathlib import Path
import json,hashlib,importlib.util,subprocess
from functools import lru_cache
O=Path('/home/ahi200/pumpfun-work/20261028-pump-curve-decoder')
D=Path('/home/ahi200/pumpfun-work/20261028-pump-feeconfig-decoder');D.mkdir(exist_ok=False)
spec=importlib.util.spec_from_file_location('pump_windows',O/'public/support/window_map.py');w=importlib.util.module_from_spec(spec);spec.loader.exec_module(w)
w.m.elf_layout=lru_cache(maxsize=8)(w.m.elf_layout);w.m.relocations=lru_cache(maxsize=8)(w.m.relocations)
out={}
for label,path in [('original',O/'original.so'),('candidate',O/'native-amm-cache/baseline/symbols.so')]:
    b=path.read_bytes();fs=w.windows(b);by={f['address']:f for f in fs}
    if label=='original':targets=[by[0x1156f0],by[0x1159d8]]
    else:targets=[f for f in fs if f['name'] and 'pump_fees' in f['name'] and 'FeeConfig' in f['name'] and ('try_deserialize' in f['name'] or 'deserialize_reader' in f['name'])]
    info=[]
    for f in targets:
        rows=w.m.instructions(b,f['address'],f['bytes'])
        calls=[{'offset':r['offset'],'target':by.get(r['call_target'],{'address':r['call_target']})} for r in rows if 'call_target' in r]
        print(label,hex(f['address']),f['bytes'],f['name']);print('calls',[(r['offset'],hex(r['target']['address']),r['target'].get('bytes'),r['target'].get('name')) for r in calls])
        info.append({'function':f,'rows':rows,'calls':calls})
        cmd=['/home/ahi200/pumpfun-work/20261027-crank/sdk/llvm/bin/llvm-objdump','-d','--no-show-raw-insn','--start-address='+str(f['address']),'--stop-address='+str(f['address']+f['bytes']),str(path)]
        (D/(label+'-'+hex(f['address'])+'.asm')).write_bytes(subprocess.check_output(cmd))
    out[label]={'path':str(path),'sha256':hashlib.sha256(b).hexdigest(),'targets':info}
(D/'inspection.json').write_text(json.dumps(out,indent=2)+'\n')
print('IR files',*[str(p) for p in (O/'native-amm-cache').rglob('*.ll')])
