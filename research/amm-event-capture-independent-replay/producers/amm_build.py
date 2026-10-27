from pathlib import Path
import sys,subprocess,json,hashlib,time,shutil
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');B=Path('/home/ahi200/pumpfun-work/20261027-amm-event-replay');SDK=Path('/home/ahi200/pumpfun-work/20261027-crank/sdk');STRIP=Path('/home/ahi200/pumpfun-work/20261027-fidelity/sdk')
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
label=sys.argv[1];source=Path(sys.argv[2]).resolve();out=B/'builds'/label;out.mkdir(parents=True,exist_ok=False)
target=B/'build-target';target.mkdir(exist_ok=True)
for path in (target/'sbpf-solana-solana/release/.fingerprint').glob('pump-amm-recovered-*'):
 assert path.resolve().is_relative_to(target.resolve());shutil.rmtree(path)
context=json.loads((B/'container-context.json').read_text());paths=context['paths'];env=context['environment']
manifest={str(f.relative_to(source)):H(f) for f in sorted(source.rglob('*')) if f.is_file()}
(out/'source-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
cmd=['docker','run','--rm','--platform','linux/amd64','--network','none','--entrypoint=/usr/bin/env']
for host,guest,mode in [(source,paths['source'],'ro'),(SDK,paths['sdk'],'ro'),(B/'cargo-home',paths['cargo_home'],'rw'),(target,paths['target'],'rw')]:cmd+=['-v',str(host)+':'+guest+':'+mode]
cmd+=['-w',paths['source']]
for k,v in env.items():cmd+=['-e',k+'='+v]
cmd+=[context['image'],'-u','RUSTFLAGS','-u','CARGO_ENCODED_RUSTFLAGS',paths['sdk']+'/rust/bin/cargo','build','--release','--target','sbpf-solana-solana','--manifest-path',paths['source']+'/Cargo.toml','--locked','--offline']
(out/'command.json').write_text(json.dumps(cmd,indent=2)+'\n')
start=time.time()
with (out/'build.log').open('wb') as f:r=subprocess.run(cmd,stdout=f,stderr=subprocess.STDOUT)
result={'returncode':r.returncode,'seconds':time.time()-start,'source_unchanged':manifest=={str(f.relative_to(source)):H(f) for f in sorted(source.rglob('*')) if f.is_file()},'compiler_network':'none'}
(out/'result.json').write_text(json.dumps(result,indent=2)+'\n')
if r.returncode:print((out/'build.log').read_text()[-6000:],flush=True)
assert r.returncode==0 and result['source_unchanged']
assert 'Compiling pump-amm-recovered' in (out/'build.log').read_text()
shutil.copyfile(target/'sbpf-solana-solana/release/pump_amm_recovered.so',out/'symbols.so')
strip=['docker','run','--rm','--network','none','-v',str(STRIP)+':/strip-sdk:ro','-v',str(out)+':/out:rw',context['image'],'/strip-sdk/llvm/bin/llvm-objcopy','--strip-all','/out/symbols.so','/out/candidate.so']
(out/'strip-command.json').write_text(json.dumps(strip,indent=2)+'\n');subprocess.run(strip,check=True)
result.update(candidate_sha256=H(out/'candidate.so'),symbols_sha256=H(out/'symbols.so'),strip_sha256=H(STRIP/'llvm/bin/llvm-objcopy'))
(out/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2),flush=True)
measure=['/home/ahi200/pumpfun-work/20261027-fidelity/runtime-venv/bin/python','-B',str(R/'repro/pump_amm/focused-diagnostics-20261026/measure.py'),'--candidate',str(out/'candidate.so'),'--symbols',str(out/'symbols.so'),'--output',str(out/'measurement.json')]
with (out/'measurement.log').open('wb') as f:subprocess.run(measure,check=True,stdout=f,stderr=subprocess.STDOUT)
d=json.loads((out/'measurement.json').read_text());print({k:d[k] for k in ['normalized_matches','raw_matches','unmatched']},flush=True)
