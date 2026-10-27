"""Stage the frozen 638-window parent and rebuild its published event patch in Docker."""
from pathlib import Path
import argparse,hashlib,importlib.util,json,shutil,subprocess,time
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[1]
P=ROOT/'repro/pump_amm/guard-data-recovery-20261027'
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
assert manifest==json.loads((HERE/'builds/latest-proposal/source-manifest.json').read_text())
save(out/'source-manifest.json',manifest)
if a.stage_only:print('49 exact source inputs staged');raise SystemExit(0)
assert all([a.sdk,a.strip_sdk,a.cargo_home]),'Provide --sdk, --strip-sdk and --cargo-home'
sdk=a.sdk.resolve();strip=a.strip_sdk.resolve();cargo=a.cargo_home.resolve()
parent=json.loads((P/'results/build/build-comparison.json').read_text())
tool_hashes={}
for name,digest in parent['tool_sha256'].items():
    rel=name.split('/sdk/',1)[1];assert sha(sdk/rel)==digest;tool_hashes[rel]=digest
for rel,digest in parent['target_rlib_sha256'].items():
    assert sha(sdk/rel)==digest;tool_hashes[rel]=digest
assert sha(strip/'llvm/bin/llvm-objcopy')=='3a871eab7279dee53f2580e8a022c980305738b575755b7d3529a6230ec4f672'
packages=json.loads((P/'results/dependency-proof/packages.json').read_text());registry={}
for package in packages:
    nv=package['name']+'-'+package['version'];roots=list((cargo/'registry/src').glob('*/'+nv));assert len(roots)==1
    for name,digest in (package['archived_files']|package['cargo_generated_cache_files']).items():
        assert sha(roots[0]/name)==digest;registry[nv+'/'+name]=digest
assert len(registry)==169
save(out/'compiler-input-check.json',{'tools':tool_hashes,'authenticated_registry_inputs':registry})
context=json.loads((HERE/'provenance/container-context.json').read_text());paths=context['paths'];target=out/'target';target.mkdir()
cmd=['docker','run','--rm','--platform','linux/amd64','--network','none','--entrypoint=/usr/bin/env']
for host,key,mode in [(source,'source','ro'),(sdk,'sdk','ro'),(cargo,'cargo_home','rw'),(target,'target','rw')]:cmd+=['-v',str(host)+':'+paths[key]+':'+mode]
cmd+=['-w',paths['source']]
for k,v in context['environment'].items():cmd+=['-e',k+'='+v]
cmd+=[context['image'],'-u','RUSTFLAGS','-u','CARGO_ENCODED_RUSTFLAGS',paths['sdk']+'/rust/bin/cargo','build','--release','--target','sbpf-solana-solana','--manifest-path',paths['source']+'/Cargo.toml','--locked','--offline']
save(out/'command.json',cmd);start=time.monotonic()
with (out/'build.log').open('wb') as log:r=subprocess.run(cmd,stdout=log,stderr=subprocess.STDOUT)
assert r.returncode==0,(out/'build.log').read_text()[-3000:]
assert manifest=={p.relative_to(source).as_posix():sha(p) for p in source.rglob('*') if p.is_file()}
shutil.copyfile(target/'sbpf-solana-solana/release/pump_amm_recovered.so',out/'symbols.so')
cmd=['docker','run','--rm','--network','none','-v',str(strip)+':/sdk:ro','-v',str(out)+':/out:rw',context['image'],'/sdk/llvm/bin/llvm-objcopy','--strip-all','/out/symbols.so','/out/candidate.so']
save(out/'strip-command.json',cmd);subprocess.run(cmd,check=True)
actual={'candidate_sha256':sha(out/'candidate.so'),'symbols_sha256':sha(out/'symbols.so')}
expected=json.loads((HERE/'builds/latest-proposal/result.json').read_text())
assert all(actual[k]==expected[k] for k in actual),actual
result={**actual,'returncode':r.returncode,'source_unchanged':True,'target_initially_empty':True,'compiler_network':'none','seconds':time.monotonic()-start}
save(out/'result.json',result);print(json.dumps(result,indent=2))
