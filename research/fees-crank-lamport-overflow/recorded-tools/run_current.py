from pathlib import Path
import json,subprocess,sys
B=Path('/home/ahi200/pumpfun-work/20261027-crank-current');R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');T=Path(__file__).parent
PY='/home/ahi200/pumpfun-work/20261027-fidelity/runtime-venv/bin/python'
assert json.loads((B/'builds/baseline/result.json').read_bytes())['artifacts']['candidate.so']['sha256']=='d85fe4eb037cd91b982eea55169faac1b342e6841ce440bee26c28b5f5617e36'
(B/'shared-target').symlink_to(B/'builds/baseline/target',target_is_directory=True)
commands=[]
def build(label,source,fresh=False):
    command=['python3',str(R/'research/fees-crank-lamport-overflow/build.py'),label,'--source',str(B/(source+'-source')),'--work',str(B),'--sdk','/home/ahi200/pumpfun-work/20261027-crank/sdk','--strip-sdk','/home/ahi200/pumpfun-work/20261027-fidelity/sdk','--cargo-home','/home/ahi200/pumpfun-work/20261027-crank/cargo-home']+(['--fresh']if fresh else[])
    commands.append(command);subprocess.run(command,check=True)
build('control','control');build('proposal','proposal')
candidate=str(B/'builds/proposal/candidate.so')
jobs=[('boundary',[PY,'-B',str(T/'boundary.py'),'--control',str(B/'builds/control/candidate.so'),'--proposal',candidate,'--output',str(B/'boundary.json.gz')]),
 ('static',['python3','-B',str(T/'static.py'),'--builds',str(B/'builds'),'--output',str(B/'static.json.gz')]),
 ('full-validation',[PY,'-B',str(R/'scripts/fees_validate_all.py'),'--candidate',candidate,'--output',str(B/'full-validation.json')]),
 ('sequence',[PY,'-B',str(R/'scripts/fees_donation_sequence.py'),'--candidate',candidate,'--output',str(B/'sequence.json')])]
running=[]
for label,command in jobs:
    commands.append(command);log=(B/(label+'.log')).open('wb');running.append((label,subprocess.Popen(command,stdout=log,stderr=subprocess.STDOUT),log))
build('repeat','proposal',True)
for label,proc,log in running:
    code=proc.wait();log.close();print(label,'exit',code,flush=True);assert code==0,label
(B/'commands.json').write_text(json.dumps(commands,indent=2)+'\n')
print('ALL CURRENT CHECKS PASSED',flush=True)
