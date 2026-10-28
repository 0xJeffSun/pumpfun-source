from pathlib import Path
import tarfile,json,hashlib,importlib.util,subprocess,re,difflib
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');H=Path('/home/ahi200/pumpfun-work/20261028-amm-select-resume');G=Path('/home/ahi200/pumpfun-work/20261028-amm-incentive-regression');S=Path('/home/ahi200/pumpfun-work/20261027-crank/sdk')
found={};notes=[]
for p in (R/'research/amm-parallel-work-20261027').rglob('*.tar.gz'):
 with tarfile.open(p) as t:
  for m in t:
   if not m.isfile() or m.size>300000 or not m.name.endswith(('.rs','.md','.py')):continue
   b=t.extractfile(m).read();text=b.decode('utf-8',errors='replace')
   if 'apply_hop_fees' not in text and '44ab0' not in text:continue
   if 'pub fn apply_hop_fees' in text:
    start=text.index('pub fn apply_hop_fees');pos=text.index('{',start);depth=1;end=pos+1
    while depth:
     depth+=(text[end]=='{')-(text[end]=='}');end+=1
    body=text[start:end];key=hashlib.sha256(body.encode()).hexdigest();found.setdefault(key,{'body':body,'paths':[]})['paths'].append(str(p.relative_to(R))+':'+m.name)
   else:notes.append({'path':str(p.relative_to(R))+':'+m.name,'lines':[x for x in text.splitlines() if 'hop_fee' in x or '44ab0' in x]})
(H/'hop-prior.json').write_text(json.dumps({'sources':found,'notes':notes},indent=2));print('prior unique',len(found),'notes',len(notes));
for v in found.values():print(v['paths'][0],v['body'])
spec=importlib.util.spec_from_file_location('w',R/'research/fees-composed-frontier188/window_map.py');w=importlib.util.module_from_spec(spec);spec.loader.exec_module(w)
fs=w.windows((G/'guard/symbols.so').read_bytes());f=next(f for f in fs if f['name'] and 'apply_hop_fees' in f['name']);print('target',f['address'],f['bytes']);(H/'hop-target.json').write_text(json.dumps(f,indent=2));rows={}
for label,p,addr,size in [('original',R/'evidence/original/pump_amm/deployed.so',0x44ab0,536),('baseline',G/'guard/symbols.so',f['address'],f['bytes'])]:
 asm=subprocess.check_output([str(S/'llvm/bin/llvm-objdump'),'-d','--no-show-raw-insn','--start-address='+str(addr),'--stop-address='+str(addr+size),str(p)],text=True);(H/('hop-'+label+'.asm')).write_text(asm);rows[label]=[re.sub(r'^call .+','call TARGET',x[1].split(' <')[0]) for x in re.finditer(r'^\s+\d+:\s+(.+)',asm,re.M)]
diff='\n'.join(difflib.unified_diff(*rows.values()));(H/'hop-instructions.diff').write_text(diff);print(diff)
