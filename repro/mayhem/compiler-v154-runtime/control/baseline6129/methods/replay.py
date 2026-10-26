from pathlib import Path
import concurrent.futures, subprocess, sys, os, json, shutil, hashlib
P=Path(__file__).resolve().parent;S=P/'source';O=P/'replay';O.mkdir(exist_ok=True)
bin=P/'build01/artifacts/mayhem_recovered.so';dest=S/'repro/mayhem/result-error-candidate.so';dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(bin,dest)
C=['--candidate',str(dest)]
jobs=[]
for short in ['admin','fee_recipient','extend','withdraw','quote_withdraw','sweeps']:
 jobs.append((short,'mayhem_validate_'+short+'.py',[]))
jobs += [('sell','mayhem_sell_differential.py',[]),('buy','mayhem_buy_differential.py',['--cases',str(S/'repro/mayhem/twenty/buy-cases.json')])]
for kind,checkpoint in [('sell','twentyone'),('buy','twentytwo')]:
 for family in ['native','token','token22']:
  jobs.append((f'{kind}-v2-{family}',f'mayhem_{kind}_v2_differential.py',['--cases',str(S/f'repro/mayhem/{checkpoint}/{kind}-v2-cases.json'),'--family',family]))
for kind in ['buy','sell']:
 for family in ['native','token','token22']:
  jobs.append((f'{kind}-pump-swap-{family}','mayhem_pump_swap_differential.py',['--cases',str(S/f'repro/mayhem/twentyfour/{kind}-pump-swap-cases.json'),'--instruction',f'{kind}_pump_swap','--family',family]))
jobs.append(('burn','mayhem_burn_sequence.py',['--fixtures',str(P/'burn-fixtures')]))
assert len(jobs)==21
(P/'replay-plan.json').write_text(json.dumps([{'name':n,'script':s,'args':a} for n,s,a in jobs],indent=2)+'\n')
env=os.environ.copy();env['PYTHONDONTWRITEBYTECODE']='1'
def run(job):
 name,script,args=job;output=O/(name if name=='burn' else name+'.json')
 cmd=[sys.executable,str(S/'scripts'/script),*C,*args,'--output',str(output)]
 with (O/(name+'.log')).open('w') as log:r=subprocess.run(cmd,cwd=S,env=env,stdout=log,stderr=subprocess.STDOUT)
 row={'name':name,'command':cmd,'returncode':r.returncode,'output':str(output.relative_to(P))}
 (O/(name+'-attempt.json')).write_text(json.dumps(row,indent=2)+'\n')
 print(json.dumps(row),flush=True);return row
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as ex:results=list(ex.map(run,jobs))
(P/'replay-attempts.json').write_text(json.dumps(results,indent=2)+'\n')
assert all(r['returncode']==0 for r in results),results
