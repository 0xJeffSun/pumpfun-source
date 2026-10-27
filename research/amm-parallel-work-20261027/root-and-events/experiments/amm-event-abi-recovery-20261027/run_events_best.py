from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import subprocess,json,sys
R=Path(__file__).resolve().parents[2];W=Path(__file__).resolve().parent;O=W/'runtime-best';O.mkdir(exist_ok=False);C=W/'build-best/artifacts/pump_amm_recovered.so';observer=R/'repro/pump_amm/diagnostic-parity-20261027/results/harness/observe_suite.py'
specs=[('buy',R/'work/amm-buy-event-recovery-20261027/probe.py'),('sell',R/'work/amm-sell-event-recovery-20261027/probe.py'),('buy-order',R/'repro/pump_amm/error-order-recovery-20261027/probe_buy_executors.py'),('sell-order',R/'repro/pump_amm/error-order-recovery-20261027/probe_sell_transfers.py')]
def run(x):
 name,producer=x;cmd=[sys.executable,'-B',str(observer),str(O/(name+'-transactions.json.gz')),str(producer),'--candidate',str(C),'--output',str(O/(name+'.json'))]
 with(O/(name+'.log')).open('w')as log:p=subprocess.run(cmd,cwd=R,stdout=log,stderr=subprocess.STDOUT)
 print(name,p.returncode,flush=True);return {'suite':name,'command':cmd,'returncode':p.returncode}
with ThreadPoolExecutor(max_workers=4)as p:rows=list(p.map(run,specs))
(O/'progress.json').write_text(json.dumps(rows,indent=2)+'\n');assert all(x['returncode']==0 for x in rows)
