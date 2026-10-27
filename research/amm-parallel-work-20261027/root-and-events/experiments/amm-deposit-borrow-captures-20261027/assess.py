from pathlib import Path
import concurrent.futures,json,subprocess,sys,hashlib
r=Path.cwd();w=r/'work/amm-deposit-borrow-captures-20261027';c=w/'build/artifacts/pump_amm_recovered.so';observer=r/'repro/pump_amm/owner6048-v144/runtime/observe_suite.py'
specs=[('measurement',[str(r/'repro/pump_amm/focused-diagnostics-20261026/measure.py'),'--candidate',str(c),'--symbols',str(w/'build/artifacts/unstripped.so'),'--output',str(w/'measurement.json')]),('deposit',[str(observer),str(w/'deposit-transactions.json.gz'),str(r/'work/amm-deposit-recovery-20261027/probe.py'),'--candidate',str(c),'--output',str(w/'deposit.json')]),('liquidity',[str(observer),str(w/'liquidity-transactions.json.gz'),str(r/'scripts/pump_amm_liquidity_differential.py'),'--candidate',str(c),'--output',str(w/'liquidity.json')])]
def run(row):
 name,args=row
 with(w/(name+'.log')).open('w')as f:result=subprocess.run([sys.executable,'-B',*args],cwd=r,stdout=f,stderr=subprocess.STDOUT)
 return {'name':name,'returncode':result.returncode}
with concurrent.futures.ThreadPoolExecutor(max_workers=3)as ex:rows=list(ex.map(run,specs))
assert all(x['returncode']==0 for x in rows),rows
sys.path.insert(0,str(r/'repro/pump_amm/claim-self-transfer-v144/static-tool'));from elf_reader import Elf
original=Elf(r/'evidence/original/pump_amm/deployed.so');baseline=Elf(r/'work/amm-final-liquidity-integration-20261027/build/artifacts/unstripped.so');current=Elf(w/'build/artifacts/unstripped.so')
name='18pump_amm_recovered7deposit17h';old=next(f for f in baseline.funcs if name in f['name']);new=next(f for f in current.funcs if name in f['name']);m=json.loads((w/'measurement.json').read_text());dep=json.loads((w/'deposit.json').read_text());liq=json.loads((w/'liquidity.json').read_text());summary={'candidate_sha256':hashlib.sha256(c.read_bytes()).hexdigest(),'original_deposit_bytes':7128,'baseline_deposit_bytes':old['size'],'candidate_deposit_bytes':new['size'],'normalized':m['normalized_matches'],'raw':m['raw_matches'],'deposit_cases':dep['case_count'],'deposit_mismatches':dep['mismatch_count'],'liquidity_cases':liq['case_count'],'liquidity_mismatches':len(liq['mismatches']),'scope':'Private one-line emit borrow experiment; signatures and full result fields require independent audit before promotion.'};(w/'summary.json').write_text(json.dumps(summary,indent=2)+'\n');print(json.dumps(summary,indent=2))
