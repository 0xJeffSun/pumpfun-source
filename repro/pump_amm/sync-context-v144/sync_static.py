from pathlib import Path
import sys,json,hashlib,subprocess
W=Path(__file__).resolve().parent;sys.path.insert(0,str(W/'static-tool'));from elf_reader import Elf
O=Elf(W/'source/evidence/original/pump_amm/deployed.so');C=Elf(W/'candidate.so');S=Elf(W/'unstripped.so');B=Elf(W/'baseline/candidate.so');BS=Elf(W/'baseline/unstripped.so');ends=dict(zip(O.entries,O.entries[1:]+[O.hi]));H=lambda b:hashlib.sha256(b).hexdigest()
def find(e,p):
 f=[x for x in e.funcs if p(x['name'])];assert len(f)==1,f;return f[0]
criteria={'sync_parser':lambda n:'SyncUserVolumeAccumulator$u20$as'in n and'12try_accounts17h'in n,'sync_wrapper':lambda n:'__global28sync_user_volume_accumulator'in n,'sync_handler':lambda n:'pump_amm_recovered18pump_amm_recovered28sync_user_volume_accumulator17h'in n}
orig={'sync_parser':0xd3120,'sync_wrapper':0xe70b8,'sync_handler':0x5dc20};result={}
for k,p in criteria.items():
 f=find(S,p);a=orig[k];n=ends[a]-a;b=f['start'];m=f['size'];result[k]={'original_start':a,'original_bytes':n,'candidate':f,'complete_normalized_equal':n==m and O.normalized[a:a+n]==C.normalized[b:b+m]and O.pattern(a,n)==C.pattern(b,m),'original_calls':O.callsites(a,n),'candidate_calls':C.callsites(b,m)}
 z=subprocess.run(['/Users/shawwalters/.cache/solana/v1.54/platform-tools/llvm/bin/llvm-objdump','-d','--start-address='+str(b),'--stop-address='+str(b+m),str(W/'unstripped.so')],capture_output=True);assert z.returncode==0;(W/(k+'.asm')).write_bytes(z.stdout)
claim={}
for k,p in {'handler':lambda n:'pump_amm_recovered18pump_amm_recovered22claim_token_incentives17h'in n,'parser':lambda n:'ClaimTokenIncentives$u20$as'in n and'12try_accounts17h'in n,'wrapper':lambda n:'__global22claim_token_incentives'in n}.items():
 f=find(S,p);g=find(BS,p);n=f['size'];same=n==g['size']and C.normalized[f['start']:f['start']+n]==B.normalized[g['start']:g['start']+n]and C.pattern(f['start'],n)==B.pattern(g['start'],n);assert same,k;claim[k]={'new':f,'baseline':g,'whole_normalized_equal':True}
result['claim_preserved']=claim;(W/'sync-static.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({k:{'bytes':v['candidate']['size'],'normalized_equal':v['complete_normalized_equal']}for k,v in result.items()if k!='claim_preserved'}))
