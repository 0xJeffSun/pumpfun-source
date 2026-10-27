"""Replay current compiler commands with one explicit historical program macro."""
from pathlib import Path
import gzip,hashlib,json,os,shlex,shutil,subprocess,time
W=Path(__file__).resolve().parent;R=W.parents[1];P=R/'research/mayhem-historical-macro-context';D=W/'macro-current-historical-event-a';S=D/'programs/mayhem'
shutil.copytree(W/'reviewed-pr255-source/programs/mayhem',S)
sha=lambda b:hashlib.sha256(b).hexdigest()
path=S/'curve-accounts/src/interface_definition.rs';b=path.read_bytes();assert b.count(b'declare_program!(pump);')==1;path.write_bytes(b.replace(b'declare_program!(pump);',b'historical_anchor_program::declare_program!(pump);'))
(S/'curve-accounts/idls/pump.json').write_bytes(gzip.decompress((P/'direct/old-historical-create/source/curve-accounts/idls/pump.json.gz').read_bytes()))
inputs=lambda:{p.relative_to(S).as_posix():sha(p.read_bytes())for p in S.rglob('*')if p.is_file()}
initial=inputs();base=W/'fast-macro-context-current-baseline-a-build';launch=json.loads((base/'launch.json').read_bytes());log=(base/'stderr').read_text();commands={}
for line in log.splitlines():
 if 'Running `' not in line:continue
 command=shlex.split(line.split('Running `',1)[1].rsplit('`',1)[0])
 if '--crate-name'in command:
  name=command[command.index('--crate-name')+1]
  if name in ('curve_accounts','mayhem_recovered'):commands[name]=command
assert set(commands)=={'curve_accounts','mayhem_recovered'}
macro=W/'historical-native-macro-a/target/release/libanchor_attribute_program.dylib';host_deps=macro.parent/'deps';assert macro.is_file()
outputs={};receipts=[]
for name in ('curve_accounts','mayhem_recovered'):
 command=list(commands[name]);out=D/(name+'-out');out.mkdir();command[command.index('--out-dir')+1]=str(out)
 if name=='curve_accounts':
  command += ['--extern','historical_anchor_program='+str(macro),'-L','dependency='+str(host_deps)]
 else:
  for i,a in enumerate(command):
   if a.startswith('curve_accounts='):command[i]='curve_accounts='+str(outputs['curve_archive'])
  command += ['-L','dependency='+str(host_deps),'-L','dependency='+str(D/'curve_accounts-out'),'-C','link-arg=-Map='+str(D/'link.map')]
 env=os.environ.copy();env.update(launch['environment_overrides']);crate=S/'curve-accounts' if name=='curve_accounts' else S
 env.update({'CARGO_MANIFEST_DIR':str(crate),'CARGO_MANIFEST_PATH':str(crate/'Cargo.toml'),'CARGO_PKG_NAME':'curve-accounts' if name=='curve_accounts' else 'mayhem-recovered','CARGO_PKG_VERSION':'0.1.0'})
 receipt={'command':command,'cwd':str(S),'source_inputs':initial,'macro_sha256':sha(macro.read_bytes()),'environment_overrides':{k:env[k]for k in ['CARGO_MANIFEST_DIR','CARGO_MANIFEST_PATH','CARGO_PKG_NAME','CARGO_PKG_VERSION']}}
 started=time.monotonic()
 with (D/(name+'.stdout')).open('wb')as stdout,(D/(name+'.stderr')).open('wb')as stderr:proc=subprocess.run(command,cwd=S,env=env,stdout=stdout,stderr=stderr)
 receipt.update(returncode=proc.returncode,seconds=time.monotonic()-started,source_unchanged=inputs()==initial)
 receipts.append(receipt);(D/'builds.json').write_text(json.dumps(receipts,indent=2)+'\n');print(name,proc.returncode,flush=True)
 if proc.returncode:break
 if name=='curve_accounts':
  archives=list(out.glob('libcurve_accounts-*.rlib'));assert len(archives)==1;outputs['curve_archive']=archives[0]
 else:
  source=out/'libmayhem_recovered.so';assert source.is_file();shutil.copyfile(source,D/'symbols.so')
  strip='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy';subprocess.run([strip,'--strip-all',str(D/'symbols.so'),str(D/'candidate.so')],check=True)
  (D/'result.json').write_text(json.dumps({'candidate_sha256':sha((D/'candidate.so').read_bytes()),'symbols_sha256':sha((D/'symbols.so').read_bytes()),'source_unchanged':inputs()==initial,'macro_sha256':sha(macro.read_bytes())},indent=2)+'\n')
