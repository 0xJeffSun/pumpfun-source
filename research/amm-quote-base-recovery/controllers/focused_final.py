from pathlib import Path
import os,sys,struct,json,gzip,hashlib,re,base64
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');D=Path('/home/ahi200/pumpfun-work/20261028-amm-helper-recovery');B=Path('/home/ahi200/pumpfun-work/20261028-amm-reserve-source');os.chdir(R);sys.path.insert(0,str(R/'scripts'));os.environ['PUMP_AMM_FRESH_VM']='1'
import pump_amm_legacy_buy_differential as legacy
import pump_amm_trade_v2_differential as v2
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
paths={'original':R/'evidence/original/pump_amm/deployed.so','baseline':B/'reserve-fee-order/candidate.so','candidate':D/'quote-denom-argument/candidate.so'};norm=lambda logs:[s for s in logs if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',s)];rows=[];U=2**64-1
cases=[('underflow',100,101,100),('zero-denominator',100,100,100),('one-denominator',100,99,100),('round-up',1000,3,100),('exact-division',100,50,100),('product-over-u64',U,2**63,2**63),('truncation',3,2,U),('u64-maximum-quote',2,1,U),('maximum-denominator',U,1,U),('maximum-amount-in-range',U,U-1,1),('zero-quote-reserve',100,10,0),('zero-amount',100,0,100)]
for name,module,fn in [('buy',legacy,legacy.legacy_buy),('buy_v2',v2,v2.trade)]:
 for label,base,amount,quote in cases:
  setup=module.combine(module.mutate(module.pool,245,bytes(16)),module.mutate(module.pool,271,bytes(16)),module.mutate(module.vaultbase,64,struct.pack('<Q',base)),module.mutate(module.vaultquote,64,struct.pack('<Q',quote)),module.custom_fee_table([(0,(0,0,0))]))
  results={}
  for kind,path in paths.items():
   result=fn(name=name,amount=amount,limit=U,overrides=setup,candidate=path);result.update(sent);results[kind]=result
  diffs={k:[f for f,v in results['original'].items() if f!='logs' and v!=results[k][f]] for k in ['baseline','candidate']};same={k:norm(results['original']['logs'])==norm(results[k]['logs']) for k in diffs};rows.append({'instruction':name,'case':label,'parameters':{'base':base,'amount':amount,'quote':quote},'results':results,'diffs':diffs,'log_equal':same});print(name,label,diffs,same,[x for x in results['original']['logs'] if 'AnchorError' in x],flush=True)
report={'artifact_sha256':{k:hashlib.sha256(p.read_bytes()).hexdigest() for k,p in paths.items()},'case_count':len(rows),'fresh_vm':True,'cases':rows,'controller_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest()}
with gzip.open(D/'final-focused.json.gz','wt') as f:json.dump(report,f,separators=(',',':'))
summary={'case_count':len(rows),'functional_mismatches':{k:[i for i,r in enumerate(rows) if r['diffs'][k]] for k in ['baseline','candidate']},'log_mismatches':{k:[i for i,r in enumerate(rows) if not r['log_equal'][k]] for k in ['baseline','candidate']}}
(D/'final-focused-summary.json').write_text(json.dumps(summary,indent=2)+'\n');print(json.dumps(summary),flush=True)
