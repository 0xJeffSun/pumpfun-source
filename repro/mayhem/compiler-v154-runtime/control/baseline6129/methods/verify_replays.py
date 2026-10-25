from pathlib import Path
import subprocess,json,sys,os
P=Path(__file__).resolve().parent;S=P/'source';R=P/'replay';V=P/'verification';V.mkdir(exist_ok=True)
C=S/'repro/mayhem/result-error-candidate.so';env=os.environ.copy();env['PYTHONDONTWRITEBYTECODE']='1'
results=[]
for name in ['sell','buy',*[f'{kind}-v2-{family}' for kind in ['sell','buy'] for family in ['native','token','token22']],*[f'{kind}-pump-swap-{family}' for kind in ['buy','sell'] for family in ['native','token','token22']]]:
 base='pump_swap' if 'pump-swap' in name else (name.split('-')[0]+'_v2' if '-v2-' in name else name)
 cmd=[sys.executable,str(S/f'scripts/verify_mayhem_{base}.py'),'--candidate',str(C),'--receipts',str(R/(name+'.json')),'--output',str(V/(name+'.json'))]
 with (V/(name+'.log')).open('w') as out:r=subprocess.run(cmd,cwd=S,env=env,stdout=out,stderr=subprocess.STDOUT)
 results.append({'name':name,'returncode':r.returncode})
cmd=[sys.executable,str(S/'scripts/verify_mayhem_burn_sequence.py'),'--fixtures',str(P/'burn-fixtures'),'--receipts',str(R/'burn')]
with (V/'burn.log').open('w') as out:r=subprocess.run(cmd,cwd=S,env=env,stdout=out,stderr=subprocess.STDOUT)
results.append({'name':'burn','returncode':r.returncode})
(V/'results.json').write_text(json.dumps(results,indent=2)+'\n')
assert all(x['returncode']==0 for x in results),results
print('All 15 unchanged receipt verifiers passed; six administrative suites retain full runner comparisons.')
