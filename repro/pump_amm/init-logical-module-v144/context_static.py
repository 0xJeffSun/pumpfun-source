from pathlib import Path
import sys,json,hashlib,subprocess
sys.dont_write_bytecode=True
W=Path(__file__).resolve().parent;sys.path.insert(0,str(W/'static-tool'));from elf_reader import Elf
O=Elf(W/'source/evidence/original/pump_amm/deployed.so');C=Elf(W/'candidate.so');S=Elf(W/'unstripped.so');B=Elf(W/'baseline/unstripped.so');ends=dict(zip(O.entries,O.entries[1:]+[O.hi]));H=lambda b:hashlib.sha256(b).hexdigest()
roles={}
for prefix,ty,fn in [('init','InitUserVolumeAccumulator','init_user_volume_accumulator'),('close','CloseUserVolumeAccumulator','close_user_volume_accumulator'),('sync','SyncUserVolumeAccumulator','sync_user_volume_accumulator'),('claim','ClaimTokenIncentives','claim_token_incentives')]:
 roles[prefix+'_parser']=lambda n,t=ty:t+'$u20$as'in n and '12try_accounts17h'in n
 roles[prefix+'_wrapper']=lambda n,f=fn:'__global'+str(len(f))+f in n
 roles[prefix+'_handler']=lambda n,f=fn:'pump_amm_recovered18pump_amm_recovered'+str(len(f))+f+'17h'in n
 if prefix in ['close','claim']:roles[prefix+'_exit']=lambda n,t=ty:t+'$u20$as'in n and '4exit17h'in n
roles['init_helper']=lambda n:'InitUserVolumeAccumulator$u20$as'in n and '12try_accounts28_'in n
orig=dict(init_helper=0xd1290,init_parser=0xcfa98,init_wrapper=0xe6710,init_handler=0x5d090,close_parser=0xce7f8,close_wrapper=0xe6c98,close_handler=0x5c590,close_exit=0xcf7d0,sync_parser=0xd3120,sync_wrapper=0xe70b8,sync_handler=0x5dc20,claim_parser=0xc8588,claim_wrapper=0xe62b8,claim_handler=0x5a570,claim_exit=0xcc2a0)
def find(e,p):
 fs=[f for f in e.funcs if p(f['name'])];assert len(fs)==1,fs;return fs[0]
rows={}
for label,p in roles.items():
 f=find(S,p);g=find(B,p);a=orig[label];n=ends[a]-a;b=f['start'];m=f['size'];z=g['start'];k=g['size']
 equal=lambda e,x,t,y,n,m:n==m and e.normalized[x:x+n]==t.normalized[y:y+m]and e.pattern(x,n)==t.pattern(y,m)
 diffs=[{'offset':i,'baseline':B.normalized[z+i:z+i+8].hex(),'candidate':C.normalized[b+i:b+i+8].hex()}for i in range(0,min(k,m),8)if B.normalized[z+i:z+i+8]!=C.normalized[b+i:b+i+8]]
 rows[label]={'original_start':a,'original_bytes':n,'baseline':g,'candidate':f,'original_normalized_equal':equal(O,a,C,b,n,m),'baseline_normalized_equal':equal(B,z,C,b,k,m),'baseline_shared_extent_differences':diffs,'original_calls':O.callsites(a,n),'candidate_calls':C.callsites(b,m),'candidate_relocations':C.pattern(b,m),'original_relocations':O.pattern(a,n),'original_raw_sha256':H(O.b[a:a+n]),'candidate_raw_sha256':H(C.b[b:b+m])}
 for tag,e,x,t in [('original',O,a,n),('candidate',S,b,m)]:
  out=W/'context-windows'/tag/(label+'.asm');out.parent.mkdir(parents=True,exist_ok=True)
  r=subprocess.run(['/Users/shawwalters/.cache/solana/v1.54/platform-tools/llvm/bin/llvm-objdump','-d',f'--start-address={x}',f'--stop-address={x+t}',str(e.path)],capture_output=True);assert r.returncode==0;out.write_bytes(r.stdout)
(W/'context-static.json').write_text(json.dumps(rows,indent=2)+'\n')
print(json.dumps({k:{'original_bytes':v['original_bytes'],'baseline_bytes':v['baseline']['size'],'candidate_bytes':v['candidate']['size'],'original_match':v['original_normalized_equal'],'baseline_match':v['baseline_normalized_equal'],'baseline_differences':len(v['baseline_shared_extent_differences'])}for k,v in rows.items()},indent=2))
