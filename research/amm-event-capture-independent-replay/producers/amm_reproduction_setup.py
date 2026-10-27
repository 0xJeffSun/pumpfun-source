from pathlib import Path
import hashlib,importlib.util,json,shutil,subprocess
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source')
P=R/'repro/pump_amm/account-context-recovery-20261027'
B=Path('/home/ahi200/pumpfun-work/20261027-amm-event-replay')
H=lambda b:hashlib.sha256(b).hexdigest()
B.mkdir(exist_ok=False)
spec=importlib.util.spec_from_file_location('recipe',P/'workspace_recipe_v2.py');recipe=importlib.util.module_from_spec(spec);spec.loader.exec_module(recipe)
inputs=recipe.stage(P/'results/canonical-source',B/'control-source')
assert inputs['standalone_inputs']==47 and inputs['workspace_inputs']==48
(B/'control-source-manifest.json').write_text(json.dumps(inputs,indent=2)+'\n')
assert recipe.source_inputs(P/'results/canonical-source')==recipe.source_inputs(R)
shutil.copytree('/home/ahi200/pumpfun-work/20261027-crank/cargo-home',B/'cargo-home')
(B/'target').mkdir()
record=json.loads((P/'results/build/build-comparison.json').read_text())
sdk=Path('/home/ahi200/pumpfun-work/20261027-crank/sdk')
for name,expected in record['tool_sha256'].items():
 rel=name.split('/sdk/',1)[1];assert H((sdk/rel).read_bytes())==expected
for name,expected in record['target_rlib_sha256'].items():assert H((sdk/name).read_bytes())==expected,name
env=record['environment'];C_SDK=str(Path(env['RUSTC']).parents[2]);C_HOME=env['CARGO_HOME'];C_TARGET=env['CARGO_TARGET_DIR']
manifest=record['command'][record['command'].index('--manifest-path')+1];C_SOURCE=str(Path(manifest).parent)
image=record['container_image']['RepoDigests'][0]
image=image.replace('docker.io/','')
mapping={'source':C_SOURCE,'sdk':C_SDK,'cargo_home':C_HOME,'target':C_TARGET}
(B/'container-context.json').write_text(json.dumps({'image':image,'paths':mapping,'environment':env},indent=2)+'\n')
cmd=['docker','run','--rm','--platform','linux/amd64','--network','bridge','--entrypoint=/usr/bin/env']
for host,guest,mode in [(B/'control-source',C_SOURCE,'ro'),(sdk,C_SDK,'ro'),(B/'cargo-home',C_HOME,'rw'),(B/'target',C_TARGET,'rw')]:cmd+=['-v',str(host)+':'+guest+':'+mode]
cmd+=['-w',C_SOURCE]
for k,v in env.items():cmd+=['-e',k+'='+v]
cmd+=[image,'-u','RUSTFLAGS','-u','CARGO_ENCODED_RUSTFLAGS',env['RUSTC'].replace('/rustc','/cargo'),'fetch','--locked','--manifest-path',manifest]
(B/'fetch-command.json').write_text(json.dumps(cmd,indent=2)+'\n')
with (B/'fetch.log').open('wb') as f:result=subprocess.run(cmd,stdout=f,stderr=subprocess.STDOUT)
print('fetch',result.returncode,flush=True)
assert result.returncode==0,(B/'fetch.log').read_text()[-4000:]
proof=P/'results/dependency-proof';packages=json.loads((proof/'packages.json').read_text())
for package in packages:
 nv=package['name']+'-'+package['version'];roots=list((B/'cargo-home/registry/src').glob('*/'+nv))
 assert len(roots)==1,(nv,roots)
 dest=roots[0];assert dest.resolve().is_relative_to(B.resolve());shutil.rmtree(dest);dest.mkdir()
 for name,expected in (package['archived_files']|package['cargo_generated_cache_files']).items():
  data=(proof/package['active_root']/name).read_bytes();assert H(data)==expected
  q=dest/name;q.parent.mkdir(parents=True,exist_ok=True);q.write_bytes(data)
print('Prepared current 623-window sources; exact recorded SDK and eight authenticated dependency trees',flush=True)
