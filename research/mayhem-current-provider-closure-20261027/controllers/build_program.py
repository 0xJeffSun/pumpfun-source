from pathlib import Path
import gzip,hashlib,json,os,shlex,shutil,subprocess,tarfile,time,sys
W=Path(__file__).resolve().parent;R=Path('/workspace/pumpfun-source-current');P=R/'research/mayhem-historical-macro-context';S=W/'source'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
if not S.exists():
 S.mkdir()
 with tarfile.open(R/'research/mayhem-amm-handler-shape-controls-20261027/base-source.tar.gz','r:gz') as t:t.extractall(S,filter='data')
 path=S/'curve-accounts/src/interface_definition.rs';b=path.read_bytes();assert b.count(b'declare_program!(pump);')==1;path.write_bytes(b.replace(b'declare_program!(pump);',b'historical_anchor_program::declare_program!(pump);'))
 (S/'curve-accounts/idls/pump.json').write_bytes(gzip.decompress((P/'direct/old-historical-create/source/curve-accounts/idls/pump.json.gz').read_bytes()))
label=sys.argv[1] if len(sys.argv)>1 else 'enabled-a';D=W/label;D.mkdir()
inputs=lambda:{f.relative_to(S).as_posix():sha(f) for f in S.rglob('*') if f.is_file()};before=inputs();assert len(before)==67
commands={}
for line in Path('/workspace/mayhem-build/build/stderr').read_text().splitlines():
 if 'Running `' not in line:continue
 cmd=shlex.split(line.split('Running `',1)[1].rsplit('`',1)[0])
 if '--crate-name' in cmd:
  name=cmd[cmd.index('--crate-name')+1]
  if name in ['curve_accounts','mayhem_recovered']:commands[name]=cmd
assert len(commands)==2
macro=W/('libgated_macro.so' if label.startswith('gated') else 'libenabled_macro.so');assert macro.is_file();hostdeps=W/('host-gated-deps' if label.startswith('gated') else 'host-enabled-deps');receipts=[];outputs={}
for name in ['curve_accounts','mayhem_recovered']:
 cmd=list(commands[name]);out=D/(name+'-out');out.mkdir();cmd[cmd.index('--out-dir')+1]=str(out)
 if name=='curve_accounts':cmd+=['--extern','historical_anchor_program='+str(macro),'-L','dependency='+str(hostdeps)]
 else:
  for i,arg in enumerate(cmd):
   if arg.startswith('curve_accounts='):cmd[i]='curve_accounts='+str(outputs['curve'])
  cmd+=['-L','dependency='+str(hostdeps),'-L','dependency='+str(D/'curve_accounts-out')]
 env=os.environ.copy();crate=S/'curve-accounts' if name=='curve_accounts' else S
 overrides={'RUSTC_BOOTSTRAP':'1','CARGO_MANIFEST_DIR':str(crate),'CARGO_MANIFEST_PATH':str(crate/'Cargo.toml'),'CARGO_PKG_NAME':'curve-accounts' if name=='curve_accounts' else 'mayhem-recovered','CARGO_PKG_VERSION':'0.1.0','CARGO_PKG_VERSION_MAJOR':'0','CARGO_PKG_VERSION_MINOR':'1','CARGO_PKG_VERSION_PATCH':'0','CARGO_PKG_VERSION_PRE':''};env.update(overrides)
 bound={str(macro):sha(macro),cmd[0]:sha(Path(cmd[0]))}
 for arg in cmd:
  if '=' in arg:
   q=Path(arg.split('=',1)[1])
   if q.is_file():bound[str(q)]=sha(q)
 record=dict(command=cmd,cwd=str(S),environment_overrides=overrides,source_inputs=before,bound_files=bound)
 start=time.monotonic()
 with (D/(name+'.stdout')).open('wb') as stdout,(D/(name+'.stderr')).open('wb') as stderr:p=subprocess.run(cmd,cwd=S,env=env,stdout=stdout,stderr=stderr)
 record.update(returncode=p.returncode,seconds=time.monotonic()-start,source_unchanged=inputs()==before,bound_inputs_unchanged=all(sha(Path(n))==h for n,h in bound.items()));receipts.append(record);(D/'builds.json').write_text(json.dumps(receipts,indent=2)+'\n');print(name,p.returncode,flush=True);p.check_returncode()
 if name=='curve_accounts':outputs['curve']=next(out.glob('libcurve_accounts-*.rlib'))
 else:shutil.copyfile(out/'mayhem_recovered.so',D/'symbols.so')
subprocess.run(['/workspace/toolchains/v1.54/llvm/bin/llvm-objcopy','--strip-all',str(D/'symbols.so'),str(D/'candidate.so')],check=True)
(D/'result.json').write_text(json.dumps(dict(symbols_sha256=sha(D/'symbols.so'),candidate_sha256=sha(D/'candidate.so')),indent=2)+'\n')
