from pathlib import Path
import concurrent.futures,subprocess,json,sys
r=Path.cwd();w=r/'work/amm-structural-composite-20261027';c=w/'build/artifacts/pump_amm_recovered.so';o=r/'repro/pump_amm/owner6048-v144/runtime/observe_suite.py';d=w/'focused';d.mkdir()
rows=[('arithmetic','work/amm-ceil-div-module-20261027/probe_floor_arithmetic.py'),('deposit','work/amm-deposit-recovery-20261027/probe.py'),('buy-event','work/amm-buy-event-recovery-20261027/probe.py'),('sell-event','work/amm-sell-event-recovery-20261027/probe.py'),('buy-order','repro/pump_amm/error-order-recovery-20261027/probe_buy_executors.py'),('sell-order','repro/pump_amm/error-order-recovery-20261027/probe_sell_transfers.py')]
def run(row):
 name,p=row
 with(d/(name+'.log')).open('w')as f:result=subprocess.run([sys.executable,'-B',str(o),str(d/(name+'-transactions.json.gz')),str(r/p),'--candidate',str(c),'--output',str(d/(name+'.json'))],cwd=r,stdout=f,stderr=subprocess.STDOUT)
 return {'name':name,'returncode':result.returncode}
with concurrent.futures.ThreadPoolExecutor(max_workers=4)as ex:results=list(ex.map(run,rows))
(d/'drivers.json').write_text(json.dumps(results,indent=2)+'\n');assert all(x['returncode']==0 for x in results),results
