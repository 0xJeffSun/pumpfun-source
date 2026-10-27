from pathlib import Path
import subprocess,json
B=Path('/home/ahi200/pumpfun-work/20261027-payout215');R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');T=Path(__file__).parent
PY='/home/ahi200/pumpfun-work/20261027-fidelity/runtime-venv/bin/python';commands=[]
def build(label,source,fresh=False):
    command=['python3',str(T/'build215.py'),label,'--source',str(B/(source+'-source')),'--work',str(B),'--sdk','/home/ahi200/pumpfun-work/20261027-crank/sdk','--strip-sdk','/home/ahi200/pumpfun-work/20261027-fidelity/sdk','--cargo-home','/home/ahi200/pumpfun-work/20261027-crank/cargo-home']+(['--fresh']if fresh else[])
    commands.append(command);subprocess.run(command,check=True)
build('baseline','baseline',True)
(B/'shared-target').symlink_to(B/'builds/baseline/target',target_is_directory=True)
build('proposal','proposal');candidate=str(B/'builds/proposal/candidate.so')
jobs=[('boundary',[PY,'-B',str(T/'boundary215.py'),'--control',str(B/'builds/baseline/candidate.so'),'--proposal',candidate,'--output',str(B/'boundary.json.gz')]),('static',['python3','-B',str(T/'static.py'),'--builds',str(B/'builds'),'--output',str(B/'static.json.gz')]),('full',[PY,'-B',str(R/'scripts/fees_validate_all.py'),'--candidate',candidate,'--output',str(B/'full.json')])]
running=[]
for label,command in jobs:
    commands.append(command);log=(B/(label+'.log')).open('xb');running.append((label,subprocess.Popen(command,stdout=log,stderr=subprocess.STDOUT),log))
build('repeat','proposal',True)
(B/'commands.json').write_text(json.dumps(commands,indent=2)+'\n')
failures=[]
for label,proc,log in running:
    code=proc.wait();log.close();print(label,'exit',code,flush=True)
    if code:failures.append(label)
assert not failures,failures
print('ALL PR215-BASED CHECKS PASSED',flush=True)
