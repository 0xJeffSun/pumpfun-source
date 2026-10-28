from pathlib import Path
import json,hashlib,subprocess,os,datetime,shutil,sys
H=Path('/home/ahi200/pumpfun-work/20261028-amm-select-resume');K=Path('/home/ahi200/pumpfun-work/20261028-amm-v2-union');W=Path('/home/ahi200/pumpfun-work/20261028-amm-sweep-order');S=Path('/home/ahi200/pumpfun-work/20261027-crank/sdk')
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def inventory(p):return {q.relative_to(p).as_posix():sha(q) for q in sorted(p.rglob('*')) if q.is_file()}
def deps():return {p.relative_to(K/'build-target').as_posix():sha(p) for p in (K/'build-target').rglob('*') if p.is_file() and p.suffix in ['.rlib','.rmeta','.a','.so'] and 'pump_amm_recovered' not in p.name}
label=sys.argv[1];src=K/('source-'+{'repeat':'unioncandidate','guard-repeat':'guard'}.get(label,label));assert (src/'Cargo.toml').is_file();out=K/label;out.mkdir()
prior=json.loads((H/'hop-lp-first/launch.json').read_text());cmd=[x.replace(str(H/'source-hop-lp-first')+':',str(src)+':').replace(str(W)+'/',str(K)+'/') for x in prior['command']]
inputs=inventory(src);before=deps()
for p in src.rglob('*.rs'):os.utime(p,None)
launch={'at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'command':cmd,'inputs':inputs,'dependencies_before':before,'tools':prior['tools'],'controller_sha256':sha(Path(__file__)),'label':label};(out/'launch.json').write_text(json.dumps(launch,indent=2)+'\n')
with (out/'build.log').open('wb') as log:r=subprocess.run(cmd,stdout=log,stderr=subprocess.STDOUT)
lines=(out/'build.log').read_text().splitlines();count=sum(l.strip().startswith('Running `') and '--crate-name pump_amm_recovered ' in l for l in lines)
after=deps();result={'returncode':r.returncode,'actual_root_invocations':count,'source_unchanged':inventory(src)==inputs,'dependency_changes':{p:[before.get(p),after.get(p)] for p in before.keys()|after.keys() if before.get(p)!=after.get(p)},'compiled':[l.strip() for l in lines if l.strip().startswith('Compiling ')]};(out/'result.json').write_text(json.dumps(result,indent=2));r.check_returncode();assert count==1 and result['source_unchanged'];assert label=='baseline' or not result['dependency_changes']
shutil.copyfile(K/'build-target/sbpf-solana-solana/release/pump_amm_recovered.so',out/'symbols.so');subprocess.run([str(S/'llvm/bin/llvm-objcopy'),'--strip-all',str(out/'symbols.so'),str(out/'candidate.so')],check=True)
result.update(symbols_sha256=sha(out/'symbols.so'),candidate_sha256=sha(out/'candidate.so'));(out/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(label,json.dumps({k:v for k,v in result.items() if k!='dependency_changes'}),'dependency_changes',len(result['dependency_changes']),flush=True)
