"""Stage the frozen 638-window parent and rebuild its published event patch in Docker."""
from pathlib import Path
import argparse,hashlib,importlib.util,json,shutil,subprocess,time
ROOT=Path.cwd().resolve();HERE=ROOT/'research/amm-event-capture-independent-replay'
P=ROOT/'repro/pump_amm/source-abi-recovery-20261027'
def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()
def save(path,data):path.write_text(json.dumps(data,indent=2)+'\n')
ap=argparse.ArgumentParser(description=__doc__)
ap.add_argument('--output',type=Path,required=True)
ap.add_argument('--sdk',type=Path)
ap.add_argument('--strip-sdk',type=Path)
ap.add_argument('--cargo-home',type=Path)
ap.add_argument('--stage-only',action='store_true')
a=ap.parse_args();out=a.output.resolve();out.mkdir(parents=True,exist_ok=False)
spec=importlib.util.spec_from_file_location('recipe',P/'workspace_recipe_v2.py');recipe=importlib.util.module_from_spec(spec);spec.loader.exec_module(recipe)
source=out/'source';recipe.stage(P/'results/canonical-source',source)
subprocess.run(['git','apply',str(HERE/'source.patch')],cwd=source,check=True)
manifest={p.relative_to(source).as_posix():sha(p) for p in source.rglob('*') if p.is_file()}
assert len(manifest)==51, len(manifest)
save(out/'source-manifest.json',manifest)
if a.stage_only:print('51 exact source inputs staged');raise SystemExit(0)
assert all([a.sdk,a.strip_sdk,a.cargo_home]),'Provide --sdk, --strip-sdk and --cargo-home'
sdk=a.sdk.resolve();strip=a.strip_sdk.resolve();cargo=a.cargo_home.resolve()
parent=json.loads((P/'results/build/build-comparison.json').read_text())
tool_hashes={}
for name,digest in parent['tool_sha256'].items():
    rel=name.split('/sdk/',1)[1];assert sha(sdk/rel)==digest;tool_hashes[rel]=digest
for rel,digest in parent['target_rlib_sha256'].items():
    assert sha(sdk/rel)==digest;tool_hashes[rel]=digest
assert sha(strip/'llvm/bin/llvm-objcopy')=='f078d5b1f9df4190e67938a13e81e1dda1057e16228ff1a6f2f5d5540c9e6aaf'
packages=json.loads((P/'results/dependency-proof/packages.json').read_text());registry={}
for package in packages:
    nv=package['name']+'-'+package['version'];roots=[cargo/'registry/src/index.crates.io-6f17d22bba15001f'/nv];assert roots[0].is_dir()
    for name,digest in (package['archived_files']|package['cargo_generated_cache_files']).items():
        assert sha(roots[0]/name)==digest;registry[nv+'/'+name]=digest
assert len(registry)==169
save(out/'compiler-input-check.json',{'tools':tool_hashes,'authenticated_registry_inputs':registry})
context=json.loads((HERE/'provenance/container-context.json').read_text());paths=context['paths'];target=out/'target';shutil.copytree(ROOT/'work/mayhem-priority-20261027/amm-event-sourceabi-d/target',target)
cmd=['docker','run','--rm','--platform','linux/amd64','--network','none','--entrypoint=/usr/bin/env']
for host,key,mode in [(source,'source','ro'),(sdk,'sdk','ro'),(cargo,'cargo_home','rw'),(target,'target','rw')]:cmd+=['-v',str(host)+':'+paths[key]+':'+mode]
cmd+=['-w',paths['source']]
for k,v in context['environment'].items():cmd+=['-e',k+'='+v]
cmd+=[context['image'],'-u','RUSTFLAGS','-u','CARGO_ENCODED_RUSTFLAGS',paths['sdk']+'/rust/bin/cargo','build','--release','--target','sbpf-solana-solana','--manifest-path',paths['source']+'/Cargo.toml','--locked','--offline']
save(out/'command.json',cmd);start=time.monotonic()
clean=cmd[:cmd.index(paths['sdk']+'/rust/bin/cargo')]+[paths['sdk']+'/rust/bin/cargo','clean','--release','--target','sbpf-solana-solana','--manifest-path',paths['source']+'/Cargo.toml','-p','pump-amm-recovered']
save(out/'clean-command.json',clean)
with (out/'build.log').open('wb') as log:
    subprocess.run(clean,stdout=log,stderr=subprocess.STDOUT,check=True)
    r=subprocess.run(cmd,stdout=log,stderr=subprocess.STDOUT)
assert r.returncode==0,(out/'build.log').read_text()[-3000:]
assert manifest=={p.relative_to(source).as_posix():sha(p) for p in source.rglob('*') if p.is_file()}
shutil.copyfile(target/'sbpf-solana-solana/release/pump_amm_recovered.so',out/'symbols.so')
cmd=['docker','run','--rm','--network','none','-v',str(strip)+':/sdk:ro','-v',str(out)+':/out:rw',context['image'],'/sdk/llvm/bin/llvm-objcopy','--strip-all','/out/symbols.so','/out/candidate.so']
save(out/'strip-command.json',cmd);subprocess.run(cmd,check=True)
actual={'candidate_sha256':sha(out/'candidate.so'),'symbols_sha256':sha(out/'symbols.so')}
result={**actual,'returncode':r.returncode,'source_unchanged':True,'target_initially_empty':False,'root_package_cleaned':True,'compiler_network':'none','seconds':time.monotonic()-start}
assert result['candidate_sha256']=='dc6365752c9b2d8d5b3b2f304285f1b5a92ef10d9e2eedf4d705aae87715db53'
assert result['symbols_sha256']=='1da44eed6c1226dbba63733e39a1684ce65f2759037e672e28419e8bff63a499'
assert 'Compiling pump-amm-recovered' in (out/'build.log').read_text()
save(out/'result.json',result);print(json.dumps(result,indent=2))
