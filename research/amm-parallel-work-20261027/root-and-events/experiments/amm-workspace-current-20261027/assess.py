from pathlib import Path
import concurrent.futures,gzip,hashlib,importlib.util,json,subprocess,sys
r=Path.cwd();w=r/'work/amm-workspace-current-20261027';c=w/'build/artifacts/pump_amm_recovered.so';h=r/'repro/pump_amm/dependency-liquidity-recovery-20261027'
jobs=[('measurement',[str(r/'repro/pump_amm/focused-diagnostics-20261026/measure.py'),'--candidate',str(c),'--symbols',str(w/'build/artifacts/unstripped.so'),'--output',str(w/'measurement.json')]),('runtime',[str(h/'replay_parallel.py'),'--candidate',str(c),'--output',str(w/'runtime')])]
def run(row):
 name,args=row
 with(w/(name+'.log')).open('w')as f:p=subprocess.run([sys.executable,'-B',*args],cwd=r,stdout=f,stderr=subprocess.STDOUT)
 return {'name':name,'returncode':p.returncode}
with concurrent.futures.ThreadPoolExecutor(max_workers=2)as e:rows=list(e.map(run,jobs))
assert all(x['returncode']==0 for x in rows),rows
m=json.loads((w/'measurement.json').read_text());old=json.loads(gzip.decompress((h/'results/measurement.json.gz').read_bytes()));matched=lambda x:{row['start']for row in x['rows']if row['matches']}
s=importlib.util.spec_from_file_location('direct',h/'compare_direct_cached.py');d=importlib.util.module_from_spec(s);s.loader.exec_module(d);proof=d.audit(w/'runtime',hashlib.sha256(c.read_bytes()).hexdigest());assert proof['cases']==17462 and not proof['mismatches'];(w/'direct-comparison.json').write_text(json.dumps(proof,indent=2)+'\n')
summary={'candidate_sha256':m['candidate_sha256'],'normalized':m['normalized_matches'],'raw':m['raw_matches'],'gained':sorted(matched(m)-matched(old)),'lost':sorted(matched(old)-matched(m)),'runtime':proof,'status':'private experiment; not selected'};(w/'summary.json').write_text(json.dumps(summary,indent=2)+'\n');print(json.dumps(summary,indent=2))
