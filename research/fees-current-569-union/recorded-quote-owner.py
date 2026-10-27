from pathlib import Path
import sys,json,hashlib
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'scripts'))
import fees_sharing_update_differential as f
R=Path(__file__).resolve().parent;candidate=R/'union-transfer-candidate.so';rows=[]
quote=f.Pubkey.from_bytes(bytes([88])*32)
for stable in [False,True]:
 for token22 in [False,True]:
  for owner in [f.TOKEN,f.TOKEN22]:
   case={'name':f'quote-owner-stable{stable}-token22{token22}-owner{owner}','op':'update_fee_shares_v2','token22':token22,'account_mutations':{'quote_mint':{'owner':str(owner)}}}
   if stable:case.update(quote=str(quote),curve_patches=[(83,bytes(quote).hex())],remaining_atas=True)
   x=f.run(case);y=f.run(case,candidate);fields=['error','before','after','events','inner','return','transaction_base64'];equal=all(x[k]==y[k]for k in fields)
   app=lambda a:[v for v in a['logs']if v.startswith(('Program log:','Program data:','Program return:'))]
   equal=equal and app(x)==app(y);rows.append({'case':case,'original':x,'candidate':y,'match':equal})
result={'candidate_sha256':hashlib.sha256(candidate.read_bytes()).hexdigest(),'original_sha256':hashlib.sha256((ROOT/'evidence/original/pump_fees/deployed.so').read_bytes()).hexdigest(),'cases':rows,'mismatches':[x['case']['name']for x in rows if not x['match']]};(R/'quote-owner-runtime.json').write_text(json.dumps(result,indent=2)+'\n');print('quote owner cases',len(rows),'mismatches',result['mismatches']);assert not result['mismatches']
