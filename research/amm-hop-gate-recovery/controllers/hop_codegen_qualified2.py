from pathlib import Path
import subprocess,json,re,difflib,itertools,hashlib,importlib.util
H=Path('/home/ahi200/pumpfun-work/20261028-amm-select-resume');S=Path('/home/ahi200/pumpfun-work/20261027-crank/sdk/llvm/bin');O=H/'hop-codegen-qualified2';O.mkdir();name='_ZN18pump_amm_recovered12instructions4swap14multi_hop_swap14apply_hop_fees17hc089821ee832d2d0E';commands=[]
sp=importlib.util.spec_from_file_location('e','/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source/research/fees-composed-frontier188/elf_helpers.py');e=importlib.util.module_from_spec(sp);sp.loader.exec_module(e)
(O/'base.ll').write_bytes((H/'ir-hop-apply-ref2/pump_amm_recovered.ll').read_bytes())
base=(O/'base.ll').read_text();fnstart=base.index('define internal fastcc void @'+name); start=base.index('  %8 = and i24',fnstart);a=base.index('  %11 = and i24',start);b=base.index('  %13 = and i24',a);end=base.index('  %_13.sroa.5.0..sroa_idx',b);parts={'C':base[start:a],'L':base[a:b],'P':base[b:end]}
# LLVM local numeric identifiers must follow definition order; replace them with named identifiers.
rename=lambda t:re.sub(r'%(\d+)\b',r'%v\1',t)
def rows(asm):
 return [re.sub(r'^call .+','call TARGET',x[1].split(' <')[0]) for x in re.finditer(r'^\s+\d+:\s+(.+)',asm,re.M)]
normal=rows((H/'hop-apply-ref2.asm').read_text());original=rows((H/'hop-hop-original.asm').read_text()) if (H/'hop-hop-original.asm').exists() else rows((H/'hop-original.asm').read_text())
results=[]
for order in itertools.permutations('CLP'):
 label=''.join(order);fnend=base.index('\n}',end)+2;src=base[:fnstart]+rename(base[fnstart:start]+''.join(parts[k] for k in order)+base[end:fnend])+base[fnend:];p=O/(label+'.ll');p.write_text(src);cmd=[str(S/'llc'),'-O3','-mattr=+store-imm,+jmp-ext','-filetype=obj',str(p),'-o',str(O/(label+'.o'))];commands.append(cmd);subprocess.run(cmd,check=True,stdout=subprocess.DEVNULL);f=next(f for f in e.functions((O/(label+'.o')).read_bytes()) if f['name']==name);asm=subprocess.check_output([str(S/'llvm-objdump'),'-d','--start-address='+str(f['address']),'--stop-address='+str(f['address']+f['bytes']),'--no-show-raw-insn',str(O/(label+'.o'))],text=True);(O/(label+'.asm')).write_text(asm);r=rows(asm)
 if label=='CLP':assert r==normal,'llc control differs from normal source build'
 diff='\n'.join(difflib.unified_diff(original,r));(O/(label+'.diff')).write_text(diff);result={'order':label,'instructions':len(r),'positional_differences':sum(x!=y for x,y in zip(original,r))+abs(len(r)-len(original)),'equals_original_masking_only_call':original==r,'normal_equal':normal==r,'ir_sha256':hashlib.sha256(src.encode()).hexdigest()};results.append(result);print(result,flush=True)
(O/'results.json').write_text(json.dumps(results,indent=2));(O/'commands.json').write_text(json.dumps(commands,indent=2))
