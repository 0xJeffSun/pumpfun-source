from pathlib import Path
import os,sys,json,gzip,re,hashlib
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');D=Path('/home/ahi200/pumpfun-work/20261028-amm-helper-recovery');B=Path('/home/ahi200/pumpfun-work/20261028-amm-reserve-source');os.chdir(R);sys.path.insert(0,str(R/'scripts'));os.environ['PUMP_AMM_FRESH_VM']='0'
import pump_amm_legacy_buy_differential as h
base=B/'reserve-fee-order/candidate.so';candidate=D/'quote-denom-argument/candidate.so';actual=h.legacy_buy;original=None;rows=[]
norm=lambda logs:[x for x in logs if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',x)]
def run(**kw):
 global original
 if kw.get('candidate') is None:
  original=actual(**kw);return original
 baseline=actual(**dict(kw,candidate=base));result=actual(**kw)
 diffs={label:[k for k in original if k!='logs' and original[k]!=v[k]] for label,v in [('baseline',baseline),('candidate',result)]}
 logs={label:norm(v['logs']) for label,v in [('original',original),('baseline',baseline),('candidate',result)]}
 rows.append({'index':len(rows),'baseline':baseline,'diffs':diffs,'log_equal':{label:logs['original']==logs[label] for label in ['baseline','candidate']}})
 if len(rows)%100==0:print('completed',len(rows),'case triples',flush=True)
 return result
h.legacy_buy=run;sys.argv=['pump_amm_legacy_buy_differential.py','--candidate',str(candidate),'--output',str(D/'final-full-candidate.json')]
try:h.main()
except SystemExit as e:code=e.code
else:code=0
with gzip.open(D/'final-full-baseline.json.gz','wt') as f:json.dump(rows,f,separators=(',',':'))
summary={'cases':len(rows),'signed_executions':3*len(rows),'fresh_vm':False, 'vm_mode':'resettable harness; before-state and signed-input equality checked for every comparison','returncode':code,'functional_mismatches':{k:[r['index'] for r in rows if r['diffs'][k]] for k in ['baseline','candidate']},'noncompute_log_mismatches':{k:sum(not r['log_equal'][k] for r in rows) for k in ['baseline','candidate']},'log_gains':[r['index'] for r in rows if not r['log_equal']['baseline'] and r['log_equal']['candidate']],'log_losses':[r['index'] for r in rows if r['log_equal']['baseline'] and not r['log_equal']['candidate']],'artifact_sha256':{k:hashlib.sha256(p.read_bytes()).hexdigest() for k,p in [('original',R/'evidence/original/pump_amm/deployed.so'),('baseline',base),('candidate',candidate)]},'controller_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest()}
(D/'final-full-summary.json').write_text(json.dumps(summary,indent=2)+'\n');print(json.dumps(summary),flush=True)
