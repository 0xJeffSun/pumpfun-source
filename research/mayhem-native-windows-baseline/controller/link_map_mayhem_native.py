from pathlib import Path
from datetime import datetime,timezone
import hashlib,json,os,shutil,subprocess,time
W=Path(__file__).resolve().parent;P=W/'mayhem-native-build';out=P/'build-02-map';out.mkdir(exist_ok=False)
launch=json.loads((P/'build-01/launch.json').read_bytes())
env={k:os.environ[k] for k in ('SystemRoot','WINDIR','SystemDrive','COMSPEC','PROCESSOR_ARCHITECTURE') if k in os.environ}
env.update(launch['environment_overrides'])
cmd=launch['command']+['-C','link-arg=-Map='+str(out/'link.map')]
launch.update(command=cmd,started_at=datetime.now(timezone.utc).isoformat(),scope='Root relink only with link map; source unchanged.')
(out/'launch.json').write_text(json.dumps(launch,indent=2)+'\n')
with (out/'stdout.log').open('wb') as stdout,(out/'stderr.log').open('wb') as stderr:
    r=subprocess.run(cmd,cwd=launch['cwd'],env=env,stdout=stdout,stderr=stderr,timeout=180,creationflags=subprocess.CREATE_NO_WINDOW)
result=dict(returncode=r.returncode,finished_at=datetime.now(timezone.utc).isoformat())
if r.returncode==0:
    shutil.copyfile(P/'target/sbpf-solana-solana/release/mayhem_recovered.so',out/'symbols.so')
    result['symbols_sha256']=hashlib.sha256((out/'symbols.so').read_bytes()).hexdigest()
    result['equal_to_build01']=(out/'symbols.so').read_bytes()==(P/'build-01/symbols.so').read_bytes()
(out/'result.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result,indent=2))
