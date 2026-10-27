"""Fresh current-candidate replay of the existing 21 baseline comparator suites."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor,as_completed
import hashlib,json,subprocess,sys,os
W=Path(__file__).resolve().parent;ROOT=W.parents[1];O=W/'runtime';O.mkdir(exist_ok=False);candidate=W/'build/candidate.so'
jobs=[]
for name in ['admin','fee_recipient','extend','withdraw','quote_withdraw','sweeps']:jobs.append((name,'mayhem_validate_'+name+'.py',[]))
jobs += [('sell','mayhem_sell_differential.py',[]),('buy','mayhem_buy_differential.py',['--cases',str(ROOT/'repro/mayhem/twenty/buy-cases.json')])]
for kind,cp in [('sell','twentyone'),('buy','twentytwo')]:
    for family in ['native','token','token22']:jobs.append((kind+'-v2-'+family,'mayhem_'+kind+'_v2_differential.py',['--cases',str(ROOT/f'repro/mayhem/{cp}/{kind}-v2-cases.json'),'--family',family]))
for kind in ['buy','sell']:
    for family in ['native','token','token22']:jobs.append((kind+'-pump-swap-'+family,'mayhem_pump_swap_differential.py',['--cases',str(ROOT/f'repro/mayhem/twentyfour/{kind}-pump-swap-cases.json'),'--instruction',kind+'_pump_swap','--family',family]))
jobs.append(('burn','mayhem_burn_sequence.py',['--fixtures',str(ROOT/'repro/mayhem/compiler-v154-main/runtime135db/control/burn-fixtures')]))
assert len(jobs)==21
def run(job):
    name,script,args=job;output=O/name if name=='burn'else O/(name+'.json')
    cmd=[sys.executable,'-B',str(W/'observe_script.py'),str(O/(name+'-transactions.json.gz')),str(ROOT/'scripts'/script),'--candidate',str(candidate),'--output',str(output),*args]
    with (O/(name+'.log')).open('w')as log:p=subprocess.run(cmd,cwd=ROOT,env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'},stdout=log,stderr=subprocess.STDOUT)
    row={'name':name,'command':cmd,'returncode':p.returncode,'log_sha256':hashlib.sha256((O/(name+'.log')).read_bytes()).hexdigest()};(O/(name+'-attempt.json')).write_text(json.dumps(row,indent=2)+'\n');print(name,p.returncode,flush=True);return row
with ThreadPoolExecutor(max_workers=6)as ex:results=[f.result()for f in as_completed([ex.submit(run,j)for j in jobs])]
(O/'attempts.json').write_text(json.dumps(results,indent=2)+'\n');assert all(x['returncode']==0 for x in results)
