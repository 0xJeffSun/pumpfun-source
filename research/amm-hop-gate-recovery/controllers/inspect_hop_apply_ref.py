from pathlib import Path
import json,subprocess,re,difflib
H=Path('/home/ahi200/pumpfun-work/20261028-amm-select-resume');R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');S=Path('/home/ahi200/pumpfun-work/20261027-crank/sdk');m=json.loads((H/'measurement-hop-apply-ref2.json').read_text());t=m['hop-apply-ref2']['target'];files={}
for label,p,address,size in [('hop-original',R/'evidence/original/pump_amm/deployed.so',0x44ab0,536),('hop-apply-ref2',H/'hop-apply-ref2/symbols.so',t['address'],t['bytes'])]:
 asm=subprocess.check_output([str(S/'llvm/bin/llvm-objdump'),'-d','--no-show-raw-insn','--start-address='+str(address),'--stop-address='+str(address+size),str(p)],text=True);(H/(label+'.asm')).write_text(asm);rows=[x[1].split(' <')[0] for x in re.finditer(r'^\s+\d+:\s+(.+)',asm,re.M)];rows=[re.sub(r'^call .+','call TARGET',x) if x.startswith('call') else re.sub(r'^(lddw r\d+,) 0x[0-9a-f]+',r'\1 ADDRESS',x) for x in rows];files[label]=rows
diff='\n'.join(difflib.unified_diff(*files.values()));(H/'hop-apply-ref2-instructions.diff').write_text(diff);print(diff[:6500])
