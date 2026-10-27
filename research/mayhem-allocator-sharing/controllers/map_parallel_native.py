from pathlib import Path
from datetime import datetime, timezone
import hashlib, json, os, shutil, subprocess, sys, time
W=Path(__file__).resolve().parent;P=W/'mayhem-parallel-native'
if len(sys.argv)>1:
 assert sys.argv[1] in ['provider-no-share','consumer-no-share']
 P=P/sys.argv[1]
B=P/('build-01' if len(sys.argv)>1 else 'build-02');O=P/'map-01';O.mkdir(exist_ok=False)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def save(p,x):p.write_text(json.dumps(x,indent=2)+'\n',encoding='utf8',newline='\n')
L=json.loads((B/'launch.json').read_bytes());S=B/'source/programs/mayhem'
def source():return{p.relative_to(S).as_posix():sha(p)for p in S.rglob('*')if p.is_file()}
def deps():return{p.relative_to(B/'target').as_posix():sha(p)for group in ['release/deps','sbpf-solana-solana/release/deps']for p in(B/'target'/group).iterdir()if p.suffix in{'.rlib','.dll'}and'mayhem_recovered'not in p.name}
before=deps();assert source()==L['source_inputs'];assert all(sha(Path(n))==h for n,h in L['checked_executables'].items());save(O/'dependency-inputs.json',before)
cmd=L['command']+['-C','link-arg=-Map='+str(O/'link.map')];env={k:os.environ[k]for k in('SystemRoot','WINDIR','SystemDrive','COMSPEC','PROCESSOR_ARCHITECTURE')if k in os.environ};env.update(L['environment_overrides'])
save(O/'launch.json',dict(L,command=cmd,started_at=datetime.now(timezone.utc).isoformat(),scope='Root relink with LLD map only; cached dependencies.'))
start=time.monotonic()
with(O/'stdout.log').open('wb')as out,(O/'stderr.log').open('wb')as err:p=subprocess.run(cmd,cwd=L['cwd'],env=env,stdout=out,stderr=err,timeout=180,creationflags=subprocess.CREATE_NO_WINDOW)
r=dict(returncode=p.returncode,elapsed_seconds=time.monotonic()-start,source_unchanged=source()==L['source_inputs'],dependencies_unchanged=deps()==before,tools_unchanged=all(sha(Path(n))==h for n,h in L['checked_executables'].items()),root_invocations=(O/'stderr.log').read_text().count('--crate-name mayhem_recovered '),target_executions=0)
if p.returncode==0:
 shutil.copyfile(B/'target/sbpf-solana-solana/release/mayhem_recovered.so',O/'symbols.so');r['elf_equals_baseline']=sha(O/'symbols.so')==sha(B/'symbols.so')
r['outputs']={p.name:dict(bytes=p.stat().st_size,sha256=sha(p))for p in O.iterdir()if p.suffix in{'.log','.map','.so'}};save(O/'result.json',r);print(json.dumps(r,indent=2));assert p.returncode==0 and all(r[k]for k in['source_unchanged','dependencies_unchanged','tools_unchanged','elf_equals_baseline'])and r['root_invocations']==1
