from pathlib import Path
import struct,json,sys,subprocess
W=Path(__file__).resolve().parent;sys.path.insert(0,str(W/'static-tool'));from elf_reader import Elf
S=Elf(W/'unstripped.so');C=Elf(W/'candidate.so');f=next(x for x in S.funcs if 'pump_amm_recovered18pump_amm_recovered22claim_token_incentives17h'in x['name']);lo=f['start'];hi=lo+f['size'];instructions=[]
for a in range(lo,hi,8):
 op,r,off,imm=struct.unpack_from('<BBhi',C.b,a)
 if op in [0x7a,0x7b] and off in [0x2b8,0x2c0,0x2d0]:instructions.append({'pc':a,'opcode':op,'destination_register':r&15,'source_register':r>>4,'offset':off,'immediate':imm})
 if op==0xad:instructions.append({'pc':a,'opcode':op,'branch_target':a+8+off*8,'offset':off,'immediate':imm,'destination_register':r&15,'source_register':r>>4})
z=subprocess.run(['/Users/shawwalters/.cache/solana/v1.54/platform-tools/llvm/bin/llvm-objdump','-d','--start-address='+str(lo),'--stop-address='+str(hi),str(W/'unstripped.so')],capture_output=True);assert z.returncode==0;(W/'handler-candidate.asm').write_bytes(z.stdout)
I=lambda a:struct.unpack_from('<BBhi',C.b,a)
assert I(0xb2550)==(0x55,1,0x1e1,0)
target=0xb2558+0x1e1*8
assert I(0xb25a8)==(0x7a,7,0x2b8,0)
assert I(target)[0]==0x18 and I(target+16)[0]==0x85
call=target+24+I(target+16)[3]*8
assert call==0x1094b8
assert not any(I(a)[0]in [0x63,0x6b,0x73,0x7b,0x7a]and I(a)[1]&15==7 for a in range(0xb2510,0xb2558,8))
proof={'overflow_branch':0xb2550,'panic_block':target,'panic_target':call,'unclaimed_clear':0xb25a8,'context_stores_before_overflow_branch':0,'note':'Overflow branch reaches add-overflow panic; first successful context store is timestamp at0xb2558; unclaimed clear occurs only after branch.'}
result={'handler':f,'candidate_store_and_unsigned_less_than_witnesses':instructions,'note':'Whole-block control-flow reviewed separately; raw PC order alone is not a proof.','proved_post_cpi_overflow':proof}
(W/'order-static.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result))
