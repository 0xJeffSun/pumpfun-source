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
paths={'original':R/'evidence/original/pump_amm/deployed.so','baseline':D/'quote-denom-argument/candidate.so','candidate':D/'recipient-source164/candidate.so'};norm=lambda logs:[s for s in logs if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',s)];rows=[];U=2**64-1
cases=[('ordinary-slot-'+str(i),0,'ordinary',i) for i in range(8)]+[('ordinary-invalid',0,'invalid',0),('mayhem-primary',1,'primary',0)]+[('mayhem-slot-'+str(i),1,'reserved',i) for i in range(7)]+[('mayhem-invalid',1,'invalid',0),('noncanonical2',2,'primary',0),('noncanonical255',255,'primary',0)]
for name,module,fn in [('buy',legacy,legacy.legacy_buy),('buy_exact_quote_in',legacy,legacy.legacy_buy),('sell',sell,sell.legacy),('sweep_protocol_fee',sweep,sweep.sweep)]:
 for label,flag,mode,index in cases:
  recipient=bytes(legacy.PROTOCOL);value=int.from_bytes(recipient,'big');other=(value+100).to_bytes(32,'big');ordinary=b''.join((value+i-index if mode=='ordinary' else value+i+1).to_bytes(32,'big') for i in range(8));reserved=b''.join(recipient if mode=='reserved' and i==index else other for i in range(7));primary=recipient if mode=='primary' else other
  setup=module.combine(module.mutate(module.pool,243,bytes([flag])),module.mutate(module.CONFIG_KEY,57,ordinary),module.mutate(module.CONFIG_KEY,385,primary),module.mutate(module.CONFIG_KEY,418,reserved))
  results={}
  for kind,path in paths.items():
   kw={'candidate':path,'overrides':setup}
   if name!='sell':kw['name']=name
   result=fn(**kw);result.update(sent);results[kind]=result
  diffs={k:[f for f,v in results['original'].items() if f!='logs' and v!=results[k][f]] for k in ['baseline','candidate']};same={k:norm(results['original']['logs'])==norm(results[k]['logs']) for k in diffs};rows.append({'instruction':name,'case':label,'parameters':{'flag':flag,'mode':mode,'index':index},'results':results,'diffs':diffs,'log_equal':same});print(name,label,diffs,same,flush=True)
report={'artifact_sha256':{k:hashlib.sha256(p.read_bytes()).hexdigest() for k,p in paths.items()},'case_count':len(rows),'fresh_vm':True,'cases':rows,'controller_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest()}
with gzip.open(D/'recipient-focused.json.gz','wt') as f:json.dump(report,f,separators=(',',':'))
summary={'case_count':len(rows),'functional_mismatches':{k:[i for i,r in enumerate(rows) if r['diffs'][k]] for k in ['baseline','candidate']},'log_mismatches':{k:[i for i,r in enumerate(rows) if not r['log_equal'][k]] for k in ['baseline','candidate']}}
(D/'recipient-focused-summary.json').write_text(json.dumps(summary,indent=2)+'\n');print(json.dumps(summary),flush=True)
