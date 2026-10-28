from pathlib import Path
import subprocess,json,sys,hashlib,datetime
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');K=Path('/home/ahi200/pumpfun-work/20261028-amm-v2-union');V='/home/ahi200/pumpfun-work/20261027-fidelity/runtime-venv/bin/python';label=sys.argv[1]
cmd=[V,'-I','-B','-X','pycache_prefix='+str(K/('absent-schedule-'+label)),str(R/'research/claude-amm-union2-20261028/negative/producer.py'),'--candidate',str(K/label/'candidate.so'),'--output',str(K/('schedule-'+label+'.json.gz'))]
(K/('schedule-'+label+'-command.json')).write_text(json.dumps({'at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'command':cmd},indent=2)+'\n');subprocess.run(cmd,cwd=R,check=True)
