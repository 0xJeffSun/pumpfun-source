"""Compile a private source copy with the proven composed434 root recipe."""
from pathlib import Path
import argparse,hashlib,json,os,shutil,subprocess,time
p=argparse.ArgumentParser();p.add_argument('--source',type=Path,required=True);p.add_argument('--cache',type=Path,required=True);p.add_argument('--output',type=Path,required=True);p.add_argument('--prepare-cache',action='store_true');a=p.parse_args()
R=Path.cwd();W=R/'work/mayhem-priority-20261027';B=W/'layout-frontier434-origins-01';S=a.source.resolve();C=a.cache.resolve();O=a.output.resolve();assert S.is_dir()and C!=(W/'parallel-targets/fast-origin434-composed').resolve();assert not O.exists();O.mkdir(parents=True);(O/'root-out').mkdir()
if a.prepare_cache:
 assert not C.exists();subprocess.run(['cp','-cR',str(W/'parallel-targets/fast-origin434-composed'),str(C)],check=True)
assert C.is_dir()
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();inputs={p.relative_to(S).as_posix():sha(p)for p in S.rglob('*')if p.is_file()};assert len(inputs)==67
record=json.loads((B/'composed-first/builds.json').read_bytes())[-1];oldS=Path(record['cwd']);oldC=Path(record['environment']['CARGO_TARGET_DIR']);oldO=B/'composed-first'
def fix(x):return x.replace(str(oldS),str(S)).replace(str(oldC),str(C)).replace(str(oldO),str(O))
for n in ['default.ld','ordered.ld','linker.py']:shutil.copyfile(oldO/n,O/n)
(O/'linker.py').chmod(0o755);cmd=[fix(x)for x in record['command']];env=os.environ.copy();env.update(json.loads((W/'layout-allocator-current-historical-04/builds.json').read_bytes())[0]['target_build_environment']);env.update({k:fix(v)for k,v in record['environment'].items()});env['CARGO_TARGET_DIR']=str(C)
launch=dict(command=cmd,cwd=str(S),environment={k:env[k]for k in record['environment']},source_inputs=inputs,controller_sha256=sha(Path(__file__)),parent_build_sha256=sha(B/'composed-first/builds.json'));(O/'launch.json').write_text(json.dumps(launch,indent=2)+'\n');start=time.monotonic()
with(O/'stdout').open('wb')as so,(O/'stderr').open('wb')as se:r=subprocess.run(cmd,cwd=S,env=env,stdout=so,stderr=se)
result=dict(returncode=r.returncode,seconds=time.monotonic()-start,source_unchanged=inputs=={p.relative_to(S).as_posix():sha(p)for p in S.rglob('*')if p.is_file()})
if r.returncode==0:
 shutil.copyfile(O/'root-out/mayhem_recovered.so',O/'symbols.so');subprocess.run(['/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy','--strip-all',str(O/'symbols.so'),str(O/'candidate.so')],check=True);result.update(candidate_sha256=sha(O/'candidate.so'),symbols_sha256=sha(O/'symbols.so'))
(O/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2));assert result['returncode']==0 and result['source_unchanged']
