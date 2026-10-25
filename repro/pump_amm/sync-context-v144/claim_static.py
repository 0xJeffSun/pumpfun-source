from pathlib import Path
import json,sys,hashlib,struct
W=Path(__file__).resolve().parent;sys.path.insert(0,str(W/'static-tool'));from elf_reader import Elf
O=Elf(W/'source/evidence/original/pump_amm/deployed.so');C=Elf(W/'candidate.so');S=Elf(W/'unstripped.so');H=lambda b:hashlib.sha256(b).hexdigest();ends=dict(zip(O.entries,O.entries[1:]+[O.hi]));rows={}
criteria={'parser':lambda n:'ClaimTokenIncentives$u20$as' in n and '12try_accounts17h'in n,'exit':lambda n:'ClaimTokenIncentives$u20$as'in n and '4exit17h'in n,'wrapper':lambda n:'__global22claim_token_incentives'in n,'handler':lambda n:'pump_amm_recovered18pump_amm_recovered22claim_token_incentives17h'in n}
orig={'parser':0xc8588,'exit':0xcc2a0,'wrapper':0xe62b8,'handler':0x5a570}
for k,pred in criteria.items():
 fs=[f for f in S.funcs if pred(f['name'])];assert len(fs)==1,(k,fs);f=fs[0];a=orig[k];n=ends[a]-a;b=f['start'];m=f['size'];same=n==m and O.normalized[a:a+n]==C.normalized[b:b+m] and O.pattern(a,n)==C.pattern(b,m)
 rows[k]={'original_start':a,'original_bytes':n,'candidate':f,'complete_normalized_equal':same,'original_calls':O.callsites(a,n),'candidate_calls':C.callsites(b,m),'original_raw_sha256':H(O.b[a:a+n]),'candidate_raw_sha256':H(C.b[b:b+m])}
(W/'claim-static.json').write_text(json.dumps(rows,indent=2)+'\n');print(json.dumps({k:{'original_bytes':v['original_bytes'],'candidate_bytes':v['candidate']['size'],'normalized_equal':v['complete_normalized_equal']}for k,v in rows.items()}))
