from pathlib import Path
import os,json,gzip,subprocess,shlex,shutil,hashlib,time,fcntl
W=Path(__file__).resolve().parent;R=W.parent/'pumpfun-current';D=W/'historical-linux-current-gated';S=D/'programs/mayhem';D.mkdir(exist_ok=False);shutil.copytree(W/'canonical-sizing67-source/programs/mayhem',S)
h=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest();p=S/'curve-accounts/src/interface_definition.rs';b=p.read_bytes();assert b.count(b'declare_program!(pump);')==1;p.write_bytes(b.replace(b'declare_program!(pump);',b'historical_anchor_program::declare_program!(pump);'));(S/'curve-accounts/idls/pump.json').write_bytes(gzip.decompress(subprocess.check_output(['git','show','upstream/main:research/mayhem-historical-macro-context/direct/old-historical-create/source/curve-accounts/idls/pump.json.gz'],cwd=R)))
inventory=lambda:{p.relative_to(S).as_posix():h(p)for p in S.rglob('*')if p.is_file()};inputs=inventory();assert len(inputs)==67
base=W/'canonical-sizing67-control-build';launch=json.loads((base/'launch.json').read_bytes());cmds={}
for line in (base/'stderr').read_text().splitlines():
 if 'Running `' not in line:continue
 cmd=shlex.split(line.split('Running `',1)[1].rsplit('`',1)[0])
 if '--crate-name' in cmd:
  name=cmd[cmd.index('--crate-name')+1]
  if name in ['curve_accounts','mayhem_recovered']:cmds[name]=cmd
assert set(cmds)=={'curve_accounts','mayhem_recovered'};macro=W/'historical-linux-macro-gated/target/release/libanchor_attribute_program.so';assert macro.is_file();host=macro.parent/'deps';records=[];outputs={};lock=(W/'native-target.lock').open('a');fcntl.flock(lock,fcntl.LOCK_EX)
for name in ['curve_accounts','mayhem_recovered']:
 cmd=list(cmds[name]);out=D/(name+'-out');out.mkdir();cmd[cmd.index('--out-dir')+1]=str(out)
 if name=='curve_accounts':cmd+=['--extern','historical_anchor_program='+str(macro),'-L','dependency='+str(host)]
 else:
  for i,arg in enumerate(cmd):
   if arg.startswith('curve_accounts='):cmd[i]='curve_accounts='+str(outputs['curve'])
  cmd+=['-L','dependency='+str(host),'-L','dependency='+str(D/'curve_accounts-out'),'-C','link-arg=-Map='+str(D/'link.map')]
 env=os.environ.copy();env.update(launch['environment_overrides']);crate=S/'curve-accounts'if name=='curve_accounts'else S;env.update({'CARGO_MANIFEST_DIR':str(crate),'CARGO_MANIFEST_PATH':str(crate/'Cargo.toml'),'CARGO_PKG_NAME':'curve-accounts'if name=='curve_accounts'else'mayhem-recovered','CARGO_PKG_VERSION':'0.1.0','CARGO_PKG_VERSION_MAJOR':'0','CARGO_PKG_VERSION_MINOR':'1','CARGO_PKG_VERSION_PATCH':'0','CARGO_PKG_VERSION_PRE':'','CARGO_FEATURE_DEFAULT':'1'})
 dependencies={a.split('=',1)[-1]:h(Path(a.split('=',1)[-1])) for a in cmd if '=' in a and Path(a.split('=',1)[-1]).is_file() and a.split('=',1)[-1].endswith(('.rlib','.so','.rmeta'))};record=dict(command=cmd,cwd=str(S),source_inputs=inputs,controller_sha256=h(Path(__file__)),macro_sha256=h(macro),dependency_files=dependencies,checked_tools=launch['checked_tools'],environment_overrides={k:env[k]for k in set(launch['environment_overrides'])|{'CARGO_MANIFEST_DIR','CARGO_MANIFEST_PATH','CARGO_PKG_NAME','CARGO_PKG_VERSION','CARGO_PKG_VERSION_MAJOR','CARGO_PKG_VERSION_MINOR','CARGO_PKG_VERSION_PATCH','CARGO_PKG_VERSION_PRE','CARGO_FEATURE_DEFAULT'}});records.append(record);(D/'builds.json').write_text(json.dumps(records,indent=2)+'\n');start=time.monotonic()
 with(D/(name+'.stdout')).open('wb')as stdout,(D/(name+'.stderr')).open('wb')as stderr:p=subprocess.run(cmd,cwd=S,env=env,stdout=stdout,stderr=stderr)
 record.update(returncode=p.returncode,seconds=time.monotonic()-start,source_unchanged=inventory()==inputs,dependencies_unchanged=all(h(Path(p))==v for p,v in dependencies.items()));(D/'builds.json').write_text(json.dumps(records,indent=2)+'\n');print(name,p.returncode,flush=True);assert p.returncode==0
 if name=='curve_accounts':
  libs=list(out.glob('libcurve_accounts-*.rlib'));assert len(libs)==1;outputs['curve']=libs[0]
 else:
  built=out/'mayhem_recovered.so';assert built.exists();shutil.copyfile(built,D/'symbols.so');strip=Path(launch['checked_tools'] and next(p for p in launch['checked_tools']if p.endswith('/llvm-objcopy')));subprocess.run([str(strip),'--strip-all',str(D/'symbols.so'),str(D/'candidate.so')],check=True);(D/'result.json').write_text(json.dumps(dict(candidate_sha256=h(D/'candidate.so'),symbols_sha256=h(D/'symbols.so'),candidate_bytes=(D/'candidate.so').stat().st_size,source_unchanged=inventory()==inputs,macro_sha256=h(macro)),indent=2)+'\n');print((D/'result.json').read_text(),flush=True)
