"""Run the existing saved-receipt checks against the freshly executed candidate."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor,as_completed
import subprocess,json,sys,os
W=Path(__file__).resolve().parent;ROOT=W.parents[1];R=W/'runtime';O=W/'receipt-verification';O.mkdir(exist_ok=False);candidate=W/'build/candidate.so'
names=['sell','buy',*[f'{kind}-v2-{family}'for kind in ['sell','buy']for family in ['native','token','token22']],*[f'{kind}-pump-swap-{family}'for kind in ['buy','sell']for family in ['native','token','token22']]]
def run(name):
    base='pump_swap'if'pump-swap'in name else(name.split('-')[0]+'_v2'if'-v2-'in name else name)
    command=[sys.executable,'-B',str(ROOT/f'scripts/verify_mayhem_{base}.py'),'--candidate',str(candidate),'--receipts',str(R/(name+'.json')),'--output',str(O/(name+'.json'))]
    with(O/(name+'.log')).open('w')as log:p=subprocess.run(command,cwd=ROOT,env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'},stdout=log,stderr=subprocess.STDOUT)
    return {'name':name,'command':command,'returncode':p.returncode}
with ThreadPoolExecutor(max_workers=6)as ex:rows=[f.result()for f in as_completed([ex.submit(run,n)for n in names])]
command=[sys.executable,'-B',str(ROOT/'scripts/verify_mayhem_burn_sequence.py'),'--fixtures',str(ROOT/'repro/mayhem/compiler-v154-main/runtime135db/control/burn-fixtures'),'--receipts',str(R/'burn')]
with(O/'burn.log').open('w')as log:p=subprocess.run(command,cwd=ROOT,env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'},stdout=log,stderr=subprocess.STDOUT)
rows.append({'name':'burn','command':command,'returncode':p.returncode});(O/'attempts.json').write_text(json.dumps(rows,indent=2)+'\n');print(json.dumps(rows,indent=2));assert all(x['returncode']==0 for x in rows)
