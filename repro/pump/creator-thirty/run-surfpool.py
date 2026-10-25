from pathlib import Path
import subprocess,hashlib,json,socket,sys
ROOT=Path.cwd();OUT=ROOT/'work/pump-integrated-thirty';CAND=OUT/'build-v144/artifacts/pump_recovered.so';sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();rec=json.loads((OUT/'build-v144/build-comparison.json').read_text());expected=rec['comparison']['candidate_sha256'];assert sha(CAND)==expected
suites=[('collect',20031),('distribution',20041),('minimum',20051),('collect_v2',20071),('extend',20061),('volume_sync',20081),('sweep',20101),('creator_migration',20111),('admin_cto',20091),('set_params',20121),('set_creator',20131),('idl_authority',20141),('create',20151),('create_v2',20151),('exact_quote',20161)]
rows=[]
for name,port in suites:
 for p in [port,port+1]:
  with socket.socket() as s:s.setsockopt(socket.SOL_SOCKET,socket.SO_REUSEADDR,1);s.bind(('127.0.0.1',p))
 script=ROOT/(f'scripts/pump_{name}_surfpool.py' if name in ['idl_authority','create','create_v2','exact_quote'] else f'localnet/pump_{name}_transactions.py');before=sha(script);dest=OUT/('surfpool-'+name)
 with (OUT/('surfpool-'+name+'.log')).open('w') as log:result=subprocess.run([sys.executable,str(script),'--candidate',str(CAND),'--output',str(dest)],stdout=log,stderr=subprocess.STDOUT,cwd=ROOT)
 row={'name':name,'runner':str(script.relative_to(ROOT)),'runner_sha256':before,'runner_unchanged':sha(script)==before,'candidate_sha256':sha(CAND),'returncode':result.returncode,'output':str(dest.relative_to(ROOT))};rows.append(row);(OUT/'surfpool-run.json').write_text(json.dumps(rows,indent=2)+'\n');print(json.dumps(row),flush=True)
 assert result.returncode==0 and row['runner_unchanged'] and row['candidate_sha256']==expected
print('ALL15 COMPLETE',flush=True)
