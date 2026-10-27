"""Recompile the current root with its historical-macro curve artifact and the unchanged qualified layout."""
from pathlib import Path
import hashlib,json,os,shutil,subprocess,sys,time
W=Path(__file__).resolve().parent;D=W/'macro-current-historical-event-a';label=sys.argv[1];out=D/label;out.mkdir()
config=W/('qualified-historical-current-'+label);config.mkdir();base=W/'qualified-parser-current-01'
for name in ('default.ld','ordered.ld','linker.py'):shutil.copyfile(base/name,config/name)
(config/'linker.py').chmod(0o755)
record=json.loads((D/'builds.json').read_bytes())[-1];cmd=list(record['command']);cmd[cmd.index('--out-dir')+1]=str(out)
cmd=[('link-arg=-Map='+str(out/'link.map'))if arg.startswith('link-arg=-Map=')else arg for arg in cmd]
cmd += ['-C','linker='+str(config/'linker.py')]
env=os.environ.copy();env.update(json.loads((W/'fast-macro-context-current-baseline-a-build/launch.json').read_bytes())['environment_overrides']);env.update(record['environment_overrides'])
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();start=time.monotonic()
launch={'command':cmd,'cwd':record['cwd'],'source_inputs':record['source_inputs'],'macro_sha256':record['macro_sha256'],'ordered_script_sha256':sha(config/'ordered.ld')};(out/'launch.json').write_text(json.dumps(launch,indent=2)+'\n')
with(out/'stdout').open('wb')as stdout,(out/'stderr').open('wb')as stderr:p=subprocess.run(cmd,cwd=record['cwd'],env=env,stdout=stdout,stderr=stderr)
result={'returncode':p.returncode,'seconds':time.monotonic()-start}
if p.returncode==0:
 shutil.copyfile(out/'mayhem_recovered.so',out/'symbols.so');subprocess.run(['/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy','--strip-all',str(out/'symbols.so'),str(out/'candidate.so')],check=True);result.update(candidate_sha256=sha(out/'candidate.so'),symbols_sha256=sha(out/'symbols.so'))
(out/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
