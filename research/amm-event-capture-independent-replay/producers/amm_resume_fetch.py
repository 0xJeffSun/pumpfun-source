from pathlib import Path
import json,subprocess,hashlib,shutil
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');P=R/'repro/pump_amm/account-context-recovery-20261027';B=Path('/home/ahi200/pumpfun-work/20261027-amm-event-replay')
H=lambda b:hashlib.sha256(b).hexdigest()
context=json.loads((B/'container-context.json').read_text());old=context['paths']['sdk'];new=str(Path(context['environment']['RUSTC']).parents[2]);assert old==new+'/rust'
context['paths']['sdk']=new;(B/'container-context.json').write_text(json.dumps(context,indent=2)+'\n')
cmd=json.loads((B/'fetch-command.json').read_text());cmd=[x.replace(':'+old+':ro',':'+new+':ro') for x in cmd]
(B/'fetch-attempt2-command.json').write_text(json.dumps(cmd,indent=2)+'\n')
with (B/'fetch-attempt2.log').open('wb') as f:r=subprocess.run(cmd,stdout=f,stderr=subprocess.STDOUT)
print('fetch',r.returncode,flush=True);assert r.returncode==0,(B/'fetch-attempt2.log').read_text()[-4000:]
proof=P/'results/dependency-proof'
for package in json.loads((proof/'packages.json').read_text()):
 nv=package['name']+'-'+package['version'];roots=list((B/'cargo-home/registry/src').glob('*/'+nv));assert len(roots)==1,(nv,roots)
 dest=roots[0];assert dest.resolve().is_relative_to(B.resolve());shutil.rmtree(dest);dest.mkdir()
 for name,expected in (package['archived_files']|package['cargo_generated_cache_files']).items():
  data=(proof/package['active_root']/name).read_bytes();assert H(data)==expected
  q=dest/name;q.parent.mkdir(parents=True,exist_ok=True);q.write_bytes(data)
print('Source and eight authenticated dependency trees ready',flush=True)
