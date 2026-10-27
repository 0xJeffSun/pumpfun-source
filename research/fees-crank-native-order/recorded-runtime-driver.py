"""Run existing frozen suites/matrices against one immutable artifact, never retagging."""
from pathlib import Path
import subprocess,sys,json,re
ROOT=Path(__file__).resolve().parents[2];W=ROOT/'work/fees-parser';label,mode=sys.argv[1:];assert re.fullmatch('[a-z0-9-]+',label)and mode in ['full','extras'];candidate=W/(label+'-build/artifacts/pump_fees_candidate.so');python=W/'venv/bin/python'
jobs=[('full',ROOT/'scripts/fees_validate_all.py'),('exhaustive',W/'exhaustive_flags.py')]if mode=='full'else[(n,ROOT/'research'/p)for n,p in [('precedence','fees-exotic-growth-precedence/precedence.py'),('optional','fees-optional-account-ownership/optional_cases.py'),('seeds','fees-social-seed-vector/seed_cases.py'),('logs','fees-extend-size-logs/log_cases.py'),('mint','fees-crank-interface-mint/mint_cases.py')]]+[('relay',W/'crank_relay_cases_final.py'),('social',W/'social_strict_cases.py')]
commands=[]
for name,driver in jobs:
 output=W/(label+'-'+name+'.json');assert not output.exists();command=[str(python),str(driver),'--candidate',str(candidate),'--output',str(output)];commands.append(command)
 with(W/(label+'-'+name+'.log')).open('w')as log:r=subprocess.run(command,cwd=ROOT,stdout=log,stderr=subprocess.STDOUT)
 assert r.returncode==0,(name,r.returncode)
(W/(label+'-'+mode+'-commands.json')).write_text(json.dumps(commands,indent=2)+'\n');print(label,mode,'passed',len(jobs),'drivers')
