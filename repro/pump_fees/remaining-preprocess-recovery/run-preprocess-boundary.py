from pathlib import Path
import sys,json,hashlib,re
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'scripts'))
import fees_sharing_update_differential as f
HERE=Path(__file__).resolve().parent
candidate=HERE/'borrow-expression-candidate.so'
cases=[]
for op in ['update_fee_shares','update_fee_shares_v2']:
 base={'op':op,'bootstrap':{'tokens':0,'pool':True,'pool_length':300},'curve_patches':[(48,'01')],'remaining':[(str(f.AUTH.pubkey()),True),(str(f.POOL),False)]}
 cases.append({**base,'name':op+'-empty','remaining':[],'expected':'NotEnoughRemainingAccounts'})
 cases.append({**base,'name':op+'-wrong-key','remaining':[(str(f.AUTH.pubkey()),True),(str(f.OTHER.pubkey()),False)],'expected':'ConstraintSeeds'})
 for n in [0,1,286,287,288,300]:
  cases.append({**base,'name':op+'-amm-zero-'+str(n),'account_mutations':{'remaining_1':{'length':n}},'expected':None})
 for n in [287,300]:
  cases.append({**base,'name':op+'-amm-nonzero-'+str(n),'account_mutations':{'remaining_1':{'length':n,'patches':[(279,'0100000000000000')]}},'expected':'PoolCreatorFeesNotSwept'})
 cases.append({**base,'name':op+'-non-amm','account_mutations':{'remaining_1':{'owner':str(f.Pubkey.default()),'length':0}},'expected':None})
 cases.append({**base,'name':op+'-incomplete-empty','curve_patches':[(48,'00')],'remaining':[],'expected':None})
rows=[];bad=[]
for c in cases:
 x=f.run(c);y=f.run(c,candidate);fields=['error','before','after','events','inner','return','transaction_base64'];match=all(x[k]==y[k]for k in fields)
 if c['expected'] is not None:assert any(c['expected'] in line for line in x['logs']),(c['name'],x['error'],x['logs'])
 rows.append({'case':c,'original':x,'candidate':y,'match':match})
 if not match:bad.append(c['name'])
result={'scope':'Completed-curve preprocessing and raw pool word boundaries through both signed sharing entrypoints; original bootstrap; no borrow-conflict or complete semantic proof.','original_sha256':hashlib.sha256((ROOT/'evidence/original/pump_fees/deployed.so').read_bytes()).hexdigest(),'candidate_sha256':hashlib.sha256(candidate.read_bytes()).hexdigest(),'cases':rows,'mismatches':bad}
(HERE/'preprocess-boundary-runtime.json').write_text(json.dumps(result,indent=2)+'\n');print('Cases',len(rows),'mismatches',bad);assert not bad
