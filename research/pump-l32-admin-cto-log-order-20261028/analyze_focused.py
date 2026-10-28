#!/usr/bin/env python3
from pathlib import Path
import base64,gzip,hashlib,json,re,sys
from solders.transaction import VersionedTransaction
P=Path(__file__).resolve().parent
CASES=range(270,276)
MSG='Program log: No creator fee to collect'
ATA='Program log: CreateIdempotent'
COORD=re.compile(r'(AnchorError (?:thrown|caused by account).*?\.rs):\d+(?::\d+)?')
def req(x,m):
 if not x: raise RuntimeError(m)
def load(n):return json.loads(gzip.decompress((P/'runtime'/n).read_bytes()))
def norm(x):return[COORD.sub(r'\1:<line>',q)for q in x if ' consumed ' not in q]
def structured(x):return{k:x.get(k)for k in ('case','error','before','after','events','inner','return','pool_authority_top_level_signer')}
def run():
 b,c=load('baseline-admin.json.gz'),load('candidate-admin.json.gz');req(b['case_count']==c['case_count']==363,'scope')
 req(b['candidate_sha256']=='3461cd9b1878083bb3af3d30ec5765de6392072acf38184c96a7ca9c5c857d36','baseline hash')
 req(c['candidate_sha256']=='6779af6d57bbd4427b643e554fbf98a8d2a607b3d5167e4c655963ce0b5379e2','candidate hash')
 rows=[];tx=set()
 for i,(x,y) in enumerate(zip(b['cases'],c['cases'])):
  req(x['case']==y['case'],'case identity')
  for r in (x,y):
   req(structured(r['original'])==structured(r['candidate']),f'{i}: structured mismatch')
   req(r['original']['transaction_base64']==r['candidate']['transaction_base64'],f'{i}: tx changed')
  raw=base64.b64decode(y['original']['transaction_base64'],validate=True);checks=VersionedTransaction.from_bytes(raw).verify_with_results();req(checks and all(checks),f'{i}: signature')
  tx.add(hashlib.sha256(raw).hexdigest())
  if i in CASES:
   bo,bc=norm(x['original']['logs']),norm(x['candidate']['logs']);co,cc=norm(y['original']['logs']),norm(y['candidate']['logs'])
   req(bo==co,'original trace changed');req(bo!=bc and co==cc,f'{i}: order not corrected')
   req(bo.index(ATA)<bo.index(MSG)<next(j for j,q in enumerate(bo) if 'Instruction: CollectCoinCreatorFee' in q),f'{i}: original order')
   req(bc.index(MSG)<bc.index(ATA),f'{i}: baseline attribution')
   before=y['original']['before'].get('current_creator_quote_token_account');after=y['original']['after'].get('current_creator_quote_token_account')
   req(before is None and after['owner']=='TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',f'{i}: ATA state')
   rows.append({'index':i,'name':y['case']['name'],'holder':y['case']['holder'],'coin_creator_vault_tokens':y['case']['accounts']['coin_creator_vault_ata']['tokens'],'destination_ata_before':None,'destination_ata_after_owner':after['owner'],'baseline_order':['No creator fee to collect','ATA CreateIdempotent','AMM CollectCoinCreatorFee'],'original_and_corrected_order':['ATA CreateIdempotent','No creator fee to collect','AMM CollectCoinCreatorFee'],'transaction_sha256':hashlib.sha256(raw).hexdigest()})
 req([i for i,r in enumerate(c['cases']) if norm(r['original']['logs'])!=norm(r['candidate']['logs'])]==[],'remaining admin logs')
 return {'status':'verified','cases':rows,'case_count':6,'admin_cases':363,'distinct_signed_transactions':len(tx),'structured_mismatches':0,'baseline_order_differences':6,'candidate_order_differences':0}
if __name__=='__main__':
 out=run();target=P/'runtime/focused-summary.json'
 if '--write' in sys.argv:target.write_text(json.dumps(out,indent=2,sort_keys=True)+'\n')
 else:req(out==json.loads(target.read_text()),'summary changed')
 print(json.dumps(out,indent=2,sort_keys=True))
