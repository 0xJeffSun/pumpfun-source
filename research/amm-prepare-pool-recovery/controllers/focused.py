from pathlib import Path
import os,sys,struct,json,gzip,hashlib,re,base64
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');D=Path('/home/ahi200/pumpfun-work/20261028-amm-helper-recovery');B=Path('/home/ahi200/pumpfun-work/20261028-amm-reserve-source');os.chdir(R);sys.path.insert(0,str(R/'scripts'));os.environ['PUMP_AMM_FRESH_VM']='1'
import pump_amm_legacy_buy_differential as legacy
import pump_amm_legacy_sell_differential as sell
import pump_amm_sweep_differential as sweep
from solders.litesvm import LiteSVM
from solders.transaction_metadata import FailedTransactionMetadata
actual_send=LiteSVM.send_transaction;sent=None
# Observe full before/after accounts and transaction on v2 as well; forwarding is unchanged.
def send(self,tx):
 global sent
 def snapshot():
  out={}
  for key in sorted(tx.message.account_keys,key=str):
   account=self.get_account(key)
   if not account or not account.executable:out[str(key)]=None if not account else {'data_hex':bytes(account.data).hex(),'lamports':account.lamports,'owner':str(account.owner)}
  return out
 before=snapshot();raw=bytes(tx);result=actual_send(self,tx);meta=result.meta() if isinstance(result,FailedTransactionMetadata) else result
 sent={'transaction_base64':base64.b64encode(raw).decode(),'before':before,'after':snapshot(),'return_data':json.loads(meta.to_json()).get('return_data')};return result
LiteSVM.send_transaction=send
import pump_amm_trade_v2_differential as v2
from solders.rent import Rent
paths={'original':R/'evidence/original/pump_amm/deployed.so','baseline':D/'recipient-source164/candidate.so','candidate':D/'prepare-inline/candidate.so'};norm=lambda logs:[s for s in logs if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',s)];rows=[]
rent=Rent.default().minimum_balance(287)
cases=[(f'length{length}-fund{fund}',length,fund,'normal') for length in [243,286,287,300] for fund in [1,rent-1,rent]]+ [('readonly-growth',286,1,'readonly'),('poor-payer-growth',286,1,'poor-payer')]
for name in ['buy','buy_exact_quote_in','sell','buy_v2','buy_exact_quote_in_v2','sell_v2']:
 for label,length,fund,mode in cases:
  def setup(h,m):
   a=h.vm.get_account(legacy.pool);data=bytes(a.data)[:length].ljust(length,b'\0');h.vm.set_account(legacy.pool,legacy.Account(fund,data,a.owner))
   if mode=='readonly':m[0]=legacy.AccountMeta(m[0].pubkey,m[0].is_signer,False)
   if mode=='poor-payer':
    a=h.vm.get_account(legacy.PAYER.pubkey());h.vm.set_account(legacy.PAYER.pubkey(),legacy.Account(10000,a.data,a.owner))
  results={}
  for kind,path in paths.items():
   kw={'candidate':path,'overrides':setup}
   if name.endswith('_v2'):result=v2.trade(name,amount=10**7 if name=='buy_exact_quote_in_v2' else 10**10,limit=10**9 if name=='buy_v2' else 1,**kw)
   elif name=='sell':result=sell.legacy(**kw)
   else:result=legacy.legacy_buy(name=name,**kw)
   result.update(sent);results[kind]=result
  diffs={k:[f for f,v in results['original'].items() if f!='logs' and v!=results[k][f]] for k in ['baseline','candidate']};same={k:norm(results['original']['logs'])==norm(results[k]['logs']) for k in diffs};rows.append({'instruction':name,'case':label,'parameters':{'length':length,'lamports':fund,'mode':mode},'results':results,'diffs':diffs,'log_equal':same});print(name,label,diffs,same,flush=True)
report={'artifact_sha256':{k:hashlib.sha256(p.read_bytes()).hexdigest() for k,p in paths.items()},'case_count':len(rows),'fresh_vm':True,'cases':rows,'controller_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest()}
with gzip.open(D/'prepare-focused.json.gz','wt') as f:json.dump(report,f,separators=(',',':'))
summary={'case_count':len(rows),'functional_mismatches':{k:[i for i,r in enumerate(rows) if r['diffs'][k]] for k in ['baseline','candidate']},'log_mismatches':{k:[i for i,r in enumerate(rows) if not r['log_equal'][k]] for k in ['baseline','candidate']},'successful_growth':[]}
for i,r in enumerate(rows):
 o=r['results']['original'];a=o['after'].get(str(legacy.pool));b=o['before'].get(str(legacy.pool))
 if not o['error'] and a and b and len(bytes.fromhex(a['data_hex']))>len(bytes.fromhex(b['data_hex'])):summary['successful_growth'].append(i)
(D/'prepare-focused-summary.json').write_text(json.dumps(summary,indent=2)+'\n');print(json.dumps(summary),flush=True)
assert not any(summary['functional_mismatches'].values());assert summary['successful_growth']
