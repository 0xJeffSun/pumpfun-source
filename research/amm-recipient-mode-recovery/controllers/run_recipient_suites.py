from pathlib import Path
import subprocess,json,datetime
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');P=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-contribution-review/amm-helper-recovery-20261028');D=Path('/home/ahi200/pumpfun-work/20261028-amm-helper-recovery');commands=[]
for family in ['buy','sell','sweep']:
 cmd=['/home/ahi200/pumpfun-work/20261027-fidelity/runtime-venv/bin/python',str(R/'repro/pump_amm/owner6048-v144/runtime/observe_suite.py'),str(D/('recipient-'+family+'-observed.json.gz')),str(P/'recipient_runtime.py'),family];commands.append(cmd);(D/'recipient-runtime-commands.json').write_text(json.dumps(commands,indent=2)+'\n');r=subprocess.run(cmd,cwd=R);r.check_returncode()
