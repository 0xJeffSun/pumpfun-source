from pathlib import Path
import json,os,subprocess
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');T=Path(__file__).parent
B=Path('/home/ahi200/pumpfun-work/20261028-fees-causal');D=B/'runtime-before';D.mkdir(exist_ok=False)
PY='/home/ahi200/pumpfun-work/20261027-fidelity/runtime-venv/bin/python'
commands=[]
for name,script in [('donation_create','fees_donation_create_differential.py'),('donation_crank','fees_donation_crank_probe.py')]:
 cmd=[PY,'-B',str(T/'observer.py'),str(D/(name+'-observed')),str(R/'scripts'/script),'--candidate',str(B/'before/candidate.so'),'--output',str(D/(name+'.json'))]
 commands.append(cmd);(D/'commands.json').write_text(json.dumps(commands,indent=2)+'\n')
 with(D/(name+'.log')).open('wb')as log:run=subprocess.run(cmd,stdout=log,stderr=subprocess.STDOUT,env=dict(os.environ,PYTHONDONTWRITEBYTECODE='1',PYTHONPYCACHEPREFIX=str(D/'never-created-cache')))
 print(name,run.returncode,flush=True);run.check_returncode()
