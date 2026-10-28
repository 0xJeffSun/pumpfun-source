from pathlib import Path
import subprocess,tarfile,json,hashlib,importlib.util,difflib
from functools import lru_cache
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');D=Path('/home/ahi200/pumpfun-work/20261028-amm-helper-recovery');D.mkdir(exist_ok=False);B=Path('/home/ahi200/pumpfun-work/20261028-amm-reserve-source');a=R/'research/amm-parallel-work-20261027/math-and-decoder/research.tar.gz';read=[]
with tarfile.open(a) as t:
 for m in t:
  if m.isfile() and m.size<2_000_000 and (m.name.endswith(('.md','.py','.rs','.json')) or '.json.repro.gz' in m.name):
   b=t.extractfile(m).read()
   if m.name.endswith('.gz'): b=__import__('gzip').decompress(b)
   if b'quote_for_base' in b or b'prepare_pool' in b or b'validate_protocol_fee_recipient' in b:
    p=D/'prior'/m.name;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b);read.append({'path':m.name,'sha256':hashlib.sha256(b).hexdigest()})
(D/'prior-read.json').write_text(json.dumps({'archive_sha256':hashlib.sha256(a.read_bytes()).hexdigest(),'selected':read},indent=2)+'\n');print('prior compressed records',len(read),flush=True)
s=importlib.util.spec_from_file_location('w',R/'research/fees-composed-frontier188/window_map.py');w=importlib.util.module_from_spec(s);s.loader.exec_module(w);w.m.elf_layout=lru_cache(maxsize=4)(w.m.elf_layout);w.m.relocations=lru_cache(maxsize=4)(w.m.relocations)
paths={'original':R/'evidence/original/pump_amm/deployed.so','baseline727':B/'reserve-fee-order/symbols.so'};bs={k:p.read_bytes() for k,p in paths.items()};fs={k:w.windows(b) for k,b in bs.items()};targets={'prepare_pool':0x58028,'validate_protocol_fee_recipient':0x58e08,'quote_for_base':0x119c8,'select_and_apply':0x13458};out={};obj='/home/ahi200/pumpfun-work/20261027-crank/sdk/llvm/bin/llvm-objdump'
for name,addr in targets.items():
 of=next(f for f in fs['original'] if f['address']==addr);cf=next(f for f in fs['baseline727'] if f['name'] and name in f['name']);out[name]={}
 for label,f in [('original',of),('baseline727',cf)]:
  out[name][label]=f;cmd=[obj,'-d','--no-show-raw-insn','--start-address='+str(f['address']),'--stop-address='+str(f['address']+f['bytes']),str(paths[label])];(D/(name+'-'+label+'.asm')).write_bytes(subprocess.check_output(cmd));(D/(name+'-'+label+'.json')).write_text(json.dumps(w.m.instructions(bs[label],f['address'],f['bytes']),indent=2)+'\n')
 print(name,of['bytes'],cf['bytes'],flush=True)
(D/'triage.json').write_text(json.dumps(out,indent=2)+'\n')
