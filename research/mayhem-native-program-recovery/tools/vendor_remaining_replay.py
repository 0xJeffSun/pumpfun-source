from pathlib import Path
from concurrent.futures import ThreadPoolExecutor,as_completed
import subprocess
W=Path(__file__).resolve().parent;R=W.parents[1];py='/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/test-env/bin/python';candidate=str(W/'system-vendor-clean-build/candidate.so');jobs=[('buy',[py,'-B',str(R/'scripts/mayhem_buy_differential.py'),'--candidate',candidate,'--cases',str(R/'repro/mayhem/twenty/buy-cases.json'),'--output',str(W/'vendor-buy.json')])]
for kind,script,cases in [('sell-amm','mayhem_pump_swap_differential.py','twentyfour/sell-pump-swap-cases.json'),('buy-v2','mayhem_buy_v2_differential.py','twentytwo/buy-v2-cases.json'),('sell-v2','mayhem_sell_v2_differential.py','twentyone/sell-v2-cases.json')]:
 for fam in ['native','token','token22']:
  name=kind+'-'+fam;cmd=[py,'-B',str(R/'scripts'/script),'--candidate',candidate,'--cases',str(R/'repro/mayhem'/cases),'--family',fam,'--output',str(W/('vendor-'+name+'.json'))]
  if kind=='sell-amm':cmd+=['--instruction','sell_pump_swap']
  jobs.append((name,cmd))
def run(job):
 name,cmd=job
 with(W/('vendor-'+name+'.log')).open('wb')as f:r=subprocess.run(cmd,stdout=f,stderr=subprocess.STDOUT)
 return name,r.returncode
with ThreadPoolExecutor(max_workers=3)as pool:
 for f in as_completed([pool.submit(run,j)for j in jobs]):print(*f.result(),flush=True)
