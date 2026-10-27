from pathlib import Path
from datetime import datetime,timezone
import hashlib,json,os,shutil,subprocess,time
W=Path(__file__).resolve().parent;P=W/'mayhem-native-build';S=P/'sdk'
out=P/'build-01';out.mkdir(exist_ok=False)
src=P/'source/programs/mayhem'
def sha(p):
    with p.open('rb') as f:return hashlib.file_digest(f,'sha256').hexdigest()
def save(p,v):p.write_text(json.dumps(v,indent=2)+'\n',encoding='utf-8',newline='\n')
sdk=json.loads((P/'sdk-components.json').read_bytes())['files']
sysroot=W/'windows-typeid-probe/darwin-sysroot/rust'
target_rows=json.loads((W/'windows-typeid-probe/darwin-components.json').read_bytes())['files']
def inputs():
    result={}
    for root,rows in [(S,sdk),(sysroot.parent,target_rows)]:
        for r in rows:
            p=root/r['path'];assert p.stat().st_size==r['bytes'] and sha(p)==r['sha256'],r['path']
    for row in json.loads((P/'inputs.json').read_bytes())['source_files']:
        p=src/row['path'];assert sha(p)==row['sha256'];result[row['path']]=row['sha256']
    return result
source_inputs=inputs()
vc=Path('C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.44.35207')
kit=Path('C:/Program Files (x86)/Windows Kits/10')
kitver='10.0.26100.0';system=Path(os.environ['SystemRoot'])
home=P/'cargo-home';home.mkdir(exist_ok=True)
config='[source.crates-io]\nreplace-with = "locked-vendor"\n[source.locked-vendor]\ndirectory = '+json.dumps(str(P/'vendor'))+'\n[net]\noffline = true\n'
(home/'config.toml').write_text(config,encoding='utf-8',newline='\n')
temp=P/'temp';temp.mkdir(exist_ok=True)
env={k:os.environ[k] for k in ('SystemRoot','WINDIR','SystemDrive','COMSPEC','PROCESSOR_ARCHITECTURE') if k in os.environ}
extra=dict(PATH=os.pathsep.join(map(str,[S/'rust/bin',S/'llvm/bin',vc/'bin/Hostx64/x64',kit/'bin'/kitver/'x64',system/'System32'])),
    LIB=os.pathsep.join(map(str,[vc/'lib/x64',kit/'Lib'/kitver/'ucrt/x64',kit/'Lib'/kitver/'um/x64'])),
    INCLUDE=os.pathsep.join(map(str,[vc/'include',kit/'Include'/kitver/'ucrt',kit/'Include'/kitver/'shared',kit/'Include'/kitver/'um',kit/'Include'/kitver/'winrt'])),
    RUSTC=str(S/'rust/bin/rustc.exe'),RUSTDOC=str(S/'rust/bin/rustdoc.exe'),
    CARGO_HOME=str(home),CARGO_TARGET_DIR=str(P/'target'),CARGO_NET_OFFLINE='true',
    CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS='-Zremap-cwd-prefix= --sysroot='+str(sysroot),
    CC_sbpf_solana_solana=str(S/'llvm/bin/clang.exe'),AR_sbpf_solana_solana=str(S/'llvm/bin/llvm-ar.exe'),
    CARGO_TARGET_X86_64_PC_WINDOWS_MSVC_LINKER=str(vc/'bin/Hostx64/x64/link.exe'),
    TEMP=str(temp),TMP=str(temp))
env.update(extra)
cmd=[str(S/'rust/bin/cargo.exe'),'rustc','--manifest-path',str(src/'Cargo.toml'),'--release',
     '--target','sbpf-solana-solana','--locked','--offline','--verbose','--',
     '--remap-path-prefix=src/=programs/mayhem-program/src/']
checked={str(p):sha(p) for p in [S/'rust/bin/rustc.exe',S/'rust/bin/cargo.exe',
    S/'rust/bin/rustc_driver-4c05705140f85a08.dll',S/'llvm/bin/llvm-ar.exe',S/'llvm/bin/clang.exe',
    S/'llvm/bin/llvm-objcopy.exe',S/'rust/lib/rustlib/x86_64-pc-windows-msvc/bin/rust-lld.exe',
    vc/'bin/Hostx64/x64/link.exe',vc/'bin/Hostx64/x64/cl.exe']}
save(out/'launch.json',dict(command=cmd,cwd=str(src.parent.parent),environment_overrides=extra,
    source_inputs=source_inputs,checked_executables=checked,started_at=datetime.now(timezone.utc).isoformat(),
    scope='All-dependency clean native Windows compiler build with official Darwin generic-v0 target libraries; locked directory vendor. No target program execution.'))
result=dict(status='STARTED');start=time.monotonic()
try:
    with (out/'stdout.log').open('wb') as stdout,(out/'stderr.log').open('wb') as stderr:
        process=subprocess.Popen(cmd,cwd=src.parent.parent,env=env,stdout=stdout,stderr=stderr,creationflags=subprocess.CREATE_NO_WINDOW)
        save(out/'process.json',dict(pid=process.pid,started_at=datetime.now(timezone.utc).isoformat()))
        try:code=process.wait(timeout=1200)
        except subprocess.TimeoutExpired:
            process.kill();process.wait();raise
    result.update(returncode=code,status='SUCCEEDED' if code==0 else 'FAILED',source_unchanged=source_inputs==inputs(),
        elapsed_seconds=time.monotonic()-start,root_invocations=(out/'stderr.log').read_text(errors='replace').count('--crate-name mayhem_recovered '))
    if code==0:
        raw=P/'target/sbpf-solana-solana/release/mayhem_recovered.so'
        shutil.copyfile(raw,out/'symbols.so')
        strip=[str(S/'llvm/bin/llvm-objcopy.exe'),'--strip-all',str(out/'symbols.so'),str(out/'candidate-v154-strip.so')]
        r=subprocess.run(strip,env=env,capture_output=True,timeout=120,creationflags=subprocess.CREATE_NO_WINDOW)
        (out/'strip.stdout.log').write_bytes(r.stdout);(out/'strip.stderr.log').write_bytes(r.stderr)
        result['strip']=dict(command=strip,returncode=r.returncode)
        result['outputs']={p.name:dict(bytes=p.stat().st_size,sha256=sha(p)) for p in out.glob('*.so')}
    assert all(sha(Path(p))==h for p,h in checked.items()),'tool changed'
except Exception as error:
    result.update(status='FAILED',error_type=type(error).__name__,error=str(error))
    raise
finally:
    result['finished_at']=datetime.now(timezone.utc).isoformat()
    result['logs']={p.name:dict(bytes=p.stat().st_size,sha256=sha(p)) for p in out.glob('*.log')}
    save(out/'result.json',result)
    print(json.dumps(result,indent=2),flush=True)
