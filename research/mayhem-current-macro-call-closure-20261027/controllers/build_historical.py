"""Compose authenticated historical event macro context on current Q source."""
from pathlib import Path
import gzip,hashlib,json,os,shlex,shutil,subprocess,time
W=Path(__file__).resolve().parents[1];R=W.parents[1]
D=W/'layout-allocator-current-historical-04';S=D/'programs/mayhem'
assert not D.exists();shutil.copytree(W/'current-quote-pair-qualified-a/programs/mayhem',S)
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
inventory=lambda p:{f.relative_to(p).as_posix():sha(f)for f in sorted(p.rglob('*'))if f.is_file()}
base=inventory(S)
p=S/'curve-accounts/src/interface_definition.rs';s=p.read_text();assert s.count('declare_program!(pump);')==1;p.write_text(s.replace('declare_program!(pump);','historical_anchor_program::declare_program!(pump);'))
p=S/'curve-accounts/idls/pump.json';j=json.loads(p.read_bytes());historical=json.loads(gzip.decompress((R/'research/mayhem-historical-macro-context/direct/old-historical-create/source/curve-accounts/idls/pump.json.gz').read_bytes()));assert 'events'not in j and 'types'not in j
j['events']=historical['events'];j['types']=historical['types'];p.write_text(json.dumps(j,indent=2)+'\n');current=inventory(S)
assert len(current)==67
commands={}
for line in (W/'fast-layout-allocator-zero-buffer-inline-02-build/stderr').read_text().splitlines():
 if 'Running `'not in line:continue
 cmd=shlex.split(line.split('Running `',1)[1].rsplit('`',1)[0])
 if '--crate-name'in cmd:
  name=cmd[cmd.index('--crate-name')+1]
  if name in ('curve_accounts','mayhem_recovered'):commands[name]=cmd
assert set(commands)=={'curve_accounts','mayhem_recovered'}
macro=W/'historical-native-macro-a/target/release/libanchor_attribute_program.dylib';deps=macro.parent/'deps'
assert macro.is_file();msha=sha(macro)
launch=json.loads((W/'fast-layout-allocator-zero-buffer-inline-02-build/launch.json').read_bytes())
receipts=[];archive=None
for name in ('curve_accounts','mayhem_recovered'):
 out=D/(name+'-out');out.mkdir();cmd=list(commands[name]);cmd[cmd.index('--out-dir')+1]=str(out)
 if name=='curve_accounts':cmd+=['--extern','historical_anchor_program='+str(macro),'-L','dependency='+str(deps)]
 else:
  for i,a in enumerate(cmd):
   if a.startswith('curve_accounts='):cmd[i]='curve_accounts='+str(archive)
  cmd+=['-L','dependency='+str(deps),'-L','dependency='+str(D/'curve_accounts-out'),'-C','link-arg=-Map='+str(D/'link.map')]
 env=os.environ.copy();env.update(launch['environment_overrides']);crate=S/'curve-accounts'if name=='curve_accounts'else S
 env.update({'CARGO_MANIFEST_DIR':str(crate),'CARGO_MANIFEST_PATH':str(crate/'Cargo.toml'),'CARGO_PKG_NAME':'curve-accounts'if name=='curve_accounts'else'mayhem-recovered','CARGO_PKG_VERSION':'0.1.0'})
 receipt={'command':cmd,'cwd':str(S),'source_inputs':current,'changed_paths':[n for n in current if current[n]!=base[n]],'macro_sha256':msha,'environment_overrides':{k:env[k]for k in ['CARGO_MANIFEST_DIR','CARGO_MANIFEST_PATH','CARGO_PKG_NAME','CARGO_PKG_VERSION']},'target_build_environment':launch['environment_overrides']}
 started=time.monotonic()
 with (D/(name+'.stdout')).open('wb')as so,(D/(name+'.stderr')).open('wb')as se:proc=subprocess.run(cmd,cwd=S,env=env,stdout=so,stderr=se)
 receipt.update(returncode=proc.returncode,seconds=time.monotonic()-started,source_unchanged=inventory(S)==current,macro_unchanged=sha(macro)==msha);receipts.append(receipt);(D/'builds.json').write_text(json.dumps(receipts,indent=2)+'\n');print(name,proc.returncode,flush=True)
 assert proc.returncode==0
 if name=='curve_accounts':
  archives=list(out.glob('libcurve_accounts-*.rlib'));assert len(archives)==1;archive=archives[0]
 else:
  artifact=out/'mayhem_recovered.so';assert artifact.is_file();shutil.copyfile(artifact,D/'symbols.so');strip=Path('/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy');subprocess.run([str(strip),'--strip-all',str(D/'symbols.so'),str(D/'candidate.so')],check=True)
  result={'candidate_sha256':sha(D/'candidate.so'),'symbols_sha256':sha(D/'symbols.so'),'source_unchanged':inventory(S)==current,'macro_sha256':msha,'scope':'Fresh curve and root builds over reused pinned dependency cache, mixed SDK; no target execution'};(D/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2),flush=True)
