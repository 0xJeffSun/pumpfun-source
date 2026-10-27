"""Run a small registry-free native compiler probe; never link or execute target code."""
from pathlib import Path
from datetime import datetime,timezone
import hashlib,json,os,platform,subprocess
W=Path(__file__).resolve().parent;P=W/'windows-typeid-probe';R=W/'pumpfun-source'
def sha(path):
    with path.open('rb') as f:return hashlib.file_digest(f,'sha256').hexdigest()
def save(path,obj):path.write_text(json.dumps(obj,indent=2)+'\n',encoding='utf-8',newline='\n')
def components(host):
    root=P/('windows-sdk' if host=='windows' else host+'-sysroot')
    rows=json.loads((P/(host+'-components.json')).read_bytes())['files']
    for row in rows:
        path=root/row['path'];assert path.stat().st_size==row['bytes'] and sha(path)==row['sha256'],row['path']
    return {r['path']:r['sha256'] for r in rows}
before={h:components(h) for h in ['windows','linux','darwin']}
source=P/'source';source.mkdir(exist_ok=False)
ref='766975f21c66c520282cad3eb44828c221f744fc';name='repro/donation-relay/framework-sysroot-recovery/probes/probe.rs'
raw=subprocess.check_output(['git','show',ref+':'+name],cwd=R)
(source/'probe.rs').write_bytes(raw)
save(P/'probe-input.json',dict(repository='lalalune/pumpfun-source',revision=ref,path=name,bytes=len(raw),sha256=hashlib.sha256(raw).hexdigest(),git_blob=hashlib.sha1(b'blob '+str(len(raw)).encode()+b'\0'+raw).hexdigest()))
run=P/'run';run.mkdir(exist_ok=False);temp=run/'temp';temp.mkdir()
exe=P/'windows-sdk/rust/bin/rustc.exe'
system=os.environ['SystemRoot']
env={k:os.environ[k] for k in ['SystemRoot','WINDIR','SystemDrive','COMSPEC'] if k in os.environ}
env.update(PATH=os.pathsep.join([str(exe.parent),str(P/'windows-sdk/llvm/bin'),system+'\\System32']),TEMP=str(temp),TMP=str(temp))
rows=[]
def command(label,args):
    started=datetime.now(timezone.utc).isoformat()
    row=dict(label=label,arguments=args,cwd='source',started_at=started)
    rows.append(row);save(run/'commands.json',rows)
    try:
        r=subprocess.run([str(exe),*args],cwd=source,env=env,capture_output=True,timeout=120,creationflags=subprocess.CREATE_NO_WINDOW)
        row['exit']=r.returncode;out,err=r.stdout,r.stderr
    except subprocess.TimeoutExpired as error:
        row['exit']=None;out,err=error.stdout or b'',error.stderr or b''
    for stream,data in [('stdout',out),('stderr',err)]:
        (run/(label+'.'+stream+'.log')).write_bytes(data)
        row[stream]=dict(bytes=len(data),sha256=hashlib.sha256(data).hexdigest())
    row['finished_at']=datetime.now(timezone.utc).isoformat();save(run/'commands.json',rows)
    print(label,'exit',row['exit'],err.decode(errors='replace')[:250],flush=True)
    return row
state=dict(status='STARTED',host=platform.platform(),compiler_exe_sha256=sha(exe),source_sha256=sha(source/'probe.rs'),
    target_executions=0,linker_executions=0,registry_downloads=0,network_requested_by_commands=False,
    isolation='Native Windows compiler with explicit sysroots, a minimal environment and one isolated source fixture; no OS sandbox or network-denial attestation claimed.')
try:
    version=command('version',['-vV'])
    assert version['exit']==0,'Native compiler did not start; retained logs'
    targets=command('target-list',['--print','target-list']);assert targets['exit']==0
    assert 'sbpf-solana-solana' in (run/'target-list.stdout.log').read_text().splitlines()
    for label,host in [('windows','windows'),('linux','linux'),('darwin','darwin'),('linux-repeat','linux')]:
        output=run/label;output.mkdir()
        sysroot=P/('windows-sdk' if host=='windows' else host+'-sysroot')/'rust'
        args=['--crate-name','relay_typeid_probe','--crate-type','lib','--edition','2021','-C','opt-level=3',
              '-C','panic=abort','-C','overflow-checks=on','-Zremap-cwd-prefix=',
              '--target','sbpf-solana-solana','--sysroot',os.path.relpath(sysroot,source),
              '--emit=asm,obj','probe.rs','--out-dir',os.path.relpath(output,source)]
        result=command(label,args)
        result['outputs']={p.name:dict(bytes=p.stat().st_size,sha256=sha(p)) for p in output.iterdir() if p.is_file()}
        save(run/'commands.json',rows)
    assert sha(source/'probe.rs')==state['source_sha256']
    assert before=={h:components(h) for h in before}
    state.update(status='COMPLETED',source_unchanged=True,selected_components_unchanged=True,
                 successful_compilations=sum(r['exit']==0 for r in rows if r['label'] not in ['version','target-list']))
except Exception as error:
    state.update(status='FAILED',error_type=type(error).__name__,error=str(error))
    raise
finally:
    save(run/'observation.json',state)
print(json.dumps(state,indent=2),flush=True)
