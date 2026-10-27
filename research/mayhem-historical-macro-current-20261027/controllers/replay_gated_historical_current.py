"""One-factor control: same current sources, but the upstream Solana-gated macro."""
from pathlib import Path
import hashlib,json,os,shutil,subprocess,time
W=Path(__file__).resolve().parent;B=W/'macro-current-historical-event-a';D=W/'macro-current-historical-gated-a';D.mkdir()
records=json.loads((B/'builds.json').read_bytes());source=Path(records[0]['cwd']);macro=W/'historical-native-macro-gated-a/target/release/libanchor_attribute_program.dylib';assert macro.is_file()
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();inputs=lambda:{p.relative_to(source).as_posix():sha(p)for p in source.rglob('*')if p.is_file()};initial=inputs();outputs={};done=[]
config=W/'qualified-historical-current-gated-a';config.mkdir();old=W/'qualified-parser-current-01'
for f in ('default.ld','ordered.ld','linker.py'):shutil.copyfile(old/f,config/f)
(config/'linker.py').chmod(0o755)
for name,base in zip(('curve_accounts','mayhem_recovered'),records):
 out=D/(name+'-out');out.mkdir();cmd=list(base['command']);cmd[cmd.index('--out-dir')+1]=str(out)
 cmd=[a.replace('historical-native-macro-a/target/release','historical-native-macro-gated-a/target/release')for a in cmd]
 if name=='mayhem_recovered':
  for i,a in enumerate(cmd):
   if a.startswith('curve_accounts='):cmd[i]='curve_accounts='+str(outputs['curve'])
   if a.startswith('dependency=')and 'macro-current-historical-event-a/curve_accounts-out'in a:cmd[i]='dependency='+str(D/'curve_accounts-out')
   if a.startswith('link-arg=-Map='):cmd[i]='link-arg=-Map='+str(D/'link.map')
  cmd+=['-C','linker='+str(config/'linker.py')]
 env=os.environ.copy();env.update(json.loads((W/'fast-macro-context-current-baseline-a-build/launch.json').read_bytes())['environment_overrides']);env.update(base['environment_overrides'])
 start=time.monotonic()
 with(D/(name+'.stdout')).open('wb')as stdout,(D/(name+'.stderr')).open('wb')as stderr:r=subprocess.run(cmd,cwd=source,env=env,stdout=stdout,stderr=stderr)
 done.append({'command':cmd,'cwd':str(source),'macro_sha256':sha(macro),'source_inputs':initial,'returncode':r.returncode,'seconds':time.monotonic()-start,'source_unchanged':initial==inputs()});(D/'builds.json').write_text(json.dumps(done,indent=2)+'\n');print(name,r.returncode,flush=True)
 if r.returncode:break
 if name=='curve_accounts':outputs['curve']=next(out.glob('libcurve_accounts-*.rlib'))
 else:
  shutil.copyfile(out/'mayhem_recovered.so',D/'symbols.so');subprocess.run(['/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy','--strip-all',str(D/'symbols.so'),str(D/'candidate.so')],check=True);(D/'result.json').write_text(json.dumps({'candidate_sha256':sha(D/'candidate.so'),'symbols_sha256':sha(D/'symbols.so')},indent=2)+'\n')
