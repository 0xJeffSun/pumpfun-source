from pathlib import Path
import json,subprocess,sys,hashlib,datetime
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');K=Path('/home/ahi200/pumpfun-work/20261028-amm-v2-union');T=R/'research/amm-v2-selector-union-recovery';V='/home/ahi200/pumpfun-work/20261027-fidelity/runtime-venv/bin/python';O=R/'repro/pump_amm/owner6048-v144/runtime/observe_suite.py'
label=sys.argv[1];stage=sys.argv[2] if len(sys.argv)>2 else 'unioncandidate';suffix='' if stage=='unioncandidate' else '-'+stage
if label=='focused':cmd=[V,'-I','-B','-X','pycache_prefix='+str(K/('absent-focused-cache'+suffix)),str(O),str(K/('observed'+suffix+'.json.gz')),str(T/'replay.py'),'--baseline',str(K/'unionbaseline/candidate.so'),'--candidate',str(K/stage/'candidate.so'),'--output',str(K/('runtime'+suffix))]
else:cmd=[V,'-I','-B','-X','pycache_prefix='+str(K/('absent-all-cache'+suffix)),str(T/'replay_all.py'),'--candidate',str(K/stage/'candidate.so'),'--output',str(K/('runtime-all'+suffix))]
(K/('runtime-'+label+suffix+'-command.json')).write_text(json.dumps({'at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'command':cmd,'producer_sha256':hashlib.sha256((T/('replay.py' if label=='focused' else 'replay_all.py')).read_bytes()).hexdigest()},indent=2)+'\n')
with (K/('runtime-'+label+suffix+'.log')).open('wb') as log:r=subprocess.run(cmd,stdout=log,stderr=subprocess.STDOUT)
print(label,stage,'returncode',r.returncode,flush=True);print((K/('runtime-'+label+suffix+'.log')).read_text()[-2500:],flush=True);r.check_returncode()
