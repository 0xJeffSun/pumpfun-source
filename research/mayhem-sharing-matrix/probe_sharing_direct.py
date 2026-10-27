from pathlib import Path
from datetime import datetime,timezone
import ctypes,hashlib,json,os,subprocess,time
W=Path(__file__).resolve().parent;P=W/'mayhem-source-data-native';O=P/'direct-sharing-02';O.mkdir(exist_ok=False)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def save(p,x):p.write_text(json.dumps(x,indent=2)+'\n')
def parse_windows(command):
 api=ctypes.windll.shell32.CommandLineToArgvW;api.argtypes=[ctypes.c_wchar_p,ctypes.POINTER(ctypes.c_int)];api.restype=ctypes.POINTER(ctypes.c_wchar_p);count=ctypes.c_int();ptr=api(command,ctypes.byref(count))
 if not ptr:raise ctypes.WinError()
 try:return[ptr[i]for i in range(count.value)]
 finally:
  free=ctypes.windll.kernel32.LocalFree;free.argtypes=[ctypes.c_void_p];free.restype=ctypes.c_void_p;free(ptr)
records={}
for label in ['baseline','alloc-provider']:
 B=P/('build-01'if label=='baseline'else label+'/build-01');L=json.loads((B/'launch.json').read_bytes());S=B/'source/programs/mayhem'
 source=lambda:{p.relative_to(S).as_posix():sha(p)for p in S.rglob('*')if p.is_file()}
 deps=lambda:{p.relative_to(B/'target').as_posix():sha(p)for group in ['release/deps','sbpf-solana-solana/release/deps']for p in(B/'target'/group).iterdir()if p.suffix in{'.rlib','.rmeta','.dll'}}
 before=deps();assert source()==L['source_inputs'];assert all(sha(Path(n))==h for n,h in L['checked_executables'].items())
 lines=[v.strip()[len('Running `'):-1]for v in(B/'stderr.log').read_text().splitlines()if'--crate-name solana_instructions_sysvar 'in v];assert len(lines)==1
 command=parse_windows(lines[0]);assert parse_windows(subprocess.list2cmdline(command))==command
 env={k:os.environ[k]for k in('SystemRoot','WINDIR','SystemDrive','COMSPEC','PROCESSOR_ARCHITECTURE')if k in os.environ};env.update(L['environment_overrides'])
 src=Path(command[command.index('--edition=2021')+1]).parent.parent
 env.update(CARGO_MANIFEST_DIR=str(src),CARGO_MANIFEST_PATH=str(src/'Cargo.toml'),CARGO_PKG_NAME='solana-instructions-sysvar',CARGO_PKG_VERSION='3.0.1',CARGO_PKG_VERSION_MAJOR='3',CARGO_PKG_VERSION_MINOR='0',CARGO_PKG_VERSION_PATCH='1',CARGO_PKG_VERSION_PRE='',CARGO_CRATE_NAME='solana_instructions_sysvar')
 group=O/label;group.mkdir();save(group/'dependency-inputs.json',before)
 for mode in ['replay','toggle']:
  out=group/mode;out.mkdir();emit=out/'emit';emit.mkdir();args=list(command);args[args.index('--out-dir')+1]=str(emit)
  if mode=='toggle':
   if label=='baseline':args+=['-Zshare-generics=no']
   else:args.remove('-Zshare-generics=no')
  save(out/'launch.json',dict(command=args,cwd=str(src),environment=env,checked_executables=L['checked_executables'],source_inputs=L['source_inputs'],started_at=datetime.now(timezone.utc).isoformat(),scope='Direct dependency replay; fixed metadata and dependencies. Toggle only explicit share-generics=no. No SBF execution.'))
  start=time.monotonic();proc=subprocess.run(args,cwd=src,env=env,capture_output=True,timeout=180,creationflags=subprocess.CREATE_NO_WINDOW)
  (out/'stdout.log').write_bytes(proc.stdout);(out/'stderr.log').write_bytes(proc.stderr)
  outputs={p.name:dict(bytes=p.stat().st_size,sha256=sha(p))for p in emit.iterdir()if p.suffix in{'.rlib','.rmeta'}}
  matches={n:sha(B/'target/sbpf-solana-solana/release/deps'/n)==v['sha256']for n,v in outputs.items()}
  result=dict(returncode=proc.returncode,elapsed_seconds=time.monotonic()-start,source_unchanged=source()==L['source_inputs'],dependencies_unchanged=deps()==before,tools_unchanged=all(sha(Path(n))==h for n,h in L['checked_executables'].items()),outputs=outputs,equals_cargo=matches,target_executions=0)
  save(out/'result.json',result);records[label+'/'+mode]=result;print(label,mode,json.dumps(result),flush=True)
  assert proc.returncode==0 and result['source_unchanged']and result['dependencies_unchanged']and result['tools_unchanged']and len(outputs)==2
  if mode=='replay':assert all(matches.values())
save(O/'results.json',records)
