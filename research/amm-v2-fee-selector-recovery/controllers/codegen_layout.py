from pathlib import Path
import subprocess,json,re,difflib,hashlib,importlib.util
J=Path('/home/ahi200/pumpfun-work/20261028-amm-v2-selector');S=Path('/home/ahi200/pumpfun-work/20261027-crank/sdk/llvm/bin');O=J/'codegen-layout';O.mkdir();name='_ZN18pump_amm_recovered5curve4fees19select_and_apply_v217h28f0417ffd05145aE'
sp=importlib.util.spec_from_file_location('e','/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source/research/fees-composed-frontier188/elf_helpers.py');e=importlib.util.module_from_spec(sp);sp.loader.exec_module(e)
base=(J/'ir-owned-fees/pump_amm_recovered.ll').read_text();a=base.index('define hidden void @'+name);z=base.index('\n}',a)+2;fn=base[a:z];head,body=fn.split('\n',1);body=body[:-1];matches=list(re.finditer(r'^(\w[\w.]*|"[^"]+"):[^\n]*\n',body,re.M));blocks={m[1]:body[m.start():matches[i+1].start() if i+1<len(matches) else len(body)] for i,m in enumerate(matches)};keys=list(blocks);fmt=next(k for k in keys if k.startswith('"'));print('block order',keys,flush=True)
def rows(asm):
 return [re.sub(r'^lddw (r\d+),.*',r'lddw \1, DATA',re.sub(r'^call .+','call TARGET',x[1].split(' <')[0])) for x in re.finditer(r'^\s+\d+:\s+(.+)',asm,re.M)]
normal=rows((J/'owned-fees/function.asm').read_text());original=rows(Path('/home/ahi200/pumpfun-work/20261028-amm-select-resume/next-v2-selector/original.asm').read_text());orders={'control':keys}
lead=['start','bb39','bb5','bb3.i','bb38',fmt,'bb35','bb37','bb4','bb10','bb33','bb49','bb50','bb51']
assert set(lead)<=set(keys);orders['error-first']=lead+[k for k in keys if k not in lead]
keys2=[k for k in keys if k!='bb37'];idx=keys2.index('bb4');keys2.insert(idx,'bb37');orders['ret-before-hot']=keys2
results=[];commands=[]
for label,order in orders.items():
 text=head+'\n'+''.join(blocks[k] for k in order)+'}';text=re.sub(r'%(\d+)\b',r'%v\1',text);src=base[:a]+text+base[z:];p=O/(label+'.ll');p.write_text(src);cmd=[str(S/'llc'),'-O3','-mattr=+store-imm,+jmp-ext','-filetype=obj',str(p),'-o',str(O/(label+'.o'))];commands.append(cmd)
 with (O/(label+'.log')).open('wb') as log:subprocess.run(cmd,check=True,stdout=log,stderr=subprocess.STDOUT)
 f=next(f for f in e.functions((O/(label+'.o')).read_bytes()) if f['name']==name);cmd=[str(S/'llvm-objdump'),'-d','--start-address='+str(f['address']),'--stop-address='+str(f['address']+f['bytes']),'--no-show-raw-insn',str(O/(label+'.o'))];commands.append(cmd);asm=subprocess.check_output(cmd,text=True);(O/(label+'.asm')).write_text(asm);r=rows(asm)
 if label=='control':assert r==normal,'llc does not reproduce normal candidate'
 (O/(label+'.diff')).write_text('\n'.join(difflib.unified_diff(original,r)));result={'label':label,'bytes':f['bytes'],'instructions':len(r),'positional_differences':sum(x!=y for x,y in zip(original,r))+abs(len(r)-len(original)),'equals_original_masking_call_and_data':original==r,'normal_equal':normal==r,'ir_sha256':hashlib.sha256(src.encode()).hexdigest()};results.append(result);print(result,flush=True)
(O/'results.json').write_text(json.dumps(results,indent=2));(O/'commands.json').write_text(json.dumps(commands,indent=2))
