from pathlib import Path
import json,os,shutil,subprocess,time,hashlib
R=Path.cwd();W=R/'work/mayhem-priority-20261027';D=W/'layout-frontier434-origins-01';S=D/'active/programs/mayhem';C=W/'parallel-targets/fast-origin434-composed';P=R/'research/mayhem-source-origin-recovery-20261027'
records=json.loads((P/'builds/first/builds.json').read_bytes());base_env=json.loads((W/'layout-allocator-current-historical-04/builds.json').read_bytes())[0]['target_build_environment']
oldS=Path(records[0]['cwd']);oldC=Path(records[0]['environment']['CARGO_TARGET_DIR']);oldOut=oldS.parents[1]/'first'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def inventory():return {p.relative_to(S).as_posix():sha(p)for p in S.rglob('*')if p.is_file()}
def replace(x):return x.replace(str(oldS),str(S)).replace(str(oldC),str(C))
all_results=[]
for label,stages in [('control',[x['crate']for x in records]),('composed-first',['mayhem_recovered']),('composed-repeat',['mayhem_recovered'])]:
 if label=='composed-first':
  for p in(D/'composed/programs/mayhem').rglob('*'):
   if p.is_file():f=S/p.relative_to(D/'composed/programs/mayhem');f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes(p.read_bytes())
 out=D/label;out.mkdir();(out/'root-out').mkdir()
 for n in ['default.ld','ordered.ld']:shutil.copyfile(P/'layout'/n,out/n)
 linker=(P/'layout/linker.py').read_text();real=W/'layout-lane-linux-target2-sysroot/lib/rustlib/aarch64-apple-darwin/bin/rust-lld';linker=linker.replace("P.parents[1]/'layout-lane-linux-target2-sysroot/lib/rustlib/aarch64-apple-darwin/bin/rust-lld'",repr(str(real)));linker=linker.replace('real='+repr(str(real)),'real=Path('+repr(str(real))+')');(out/'linker.py').write_text(linker);(out/'linker.py').chmod(0o755)
 inputs=inventory();before={p.name:sha(p)for p in(C/'sbpf-solana-solana/release/deps').glob('*.rlib')};runs=[]
 for record in records:
  name=record['crate']
  if name not in stages:continue
  cmd=[replace(x).replace(str(oldOut),str(out))for x in record['command']]
  if name=='mayhem_recovered':
   cmd[cmd.index('--out-dir')+1]=str(out/'root-out')
   for i,x in enumerate(cmd):
    if x.startswith('link-arg=-Map='):cmd[i]='link-arg=-Map='+str(out/'link.map')
    if x.startswith('linker='):cmd[i]='linker='+str(out/'linker.py')
  env=os.environ.copy();env.update({k:replace(v)for k,v in base_env.items()});env.update({k:replace(v)for k,v in record['environment'].items()})
  start=time.monotonic()
  with(out/(name+'.stdout')).open('wb')as so,(out/(name+'.stderr')).open('wb')as se:r=subprocess.run(cmd,cwd=S,env=env,stdout=so,stderr=se)
  run=dict(crate=name,command=cmd,cwd=str(S),source_inputs=inputs,environment={k:env[k]for k in record['environment']},returncode=r.returncode,seconds=time.monotonic()-start,source_unchanged=inputs==inventory());runs.append(run);(out/'builds.json').write_text(json.dumps(runs,indent=2)+'\n');print(label,name,r.returncode,round(run['seconds'],1),flush=True)
  assert r.returncode==0 and run['source_unchanged']
 shutil.copyfile(out/'root-out/mayhem_recovered.so',out/'symbols.so');subprocess.run(['/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy','--strip-all',str(out/'symbols.so'),str(out/'candidate.so')],check=True)
 result=dict(candidate_sha256=sha(out/'candidate.so'),symbols_sha256=sha(out/'symbols.so'),source_unchanged=inputs==inventory(),archives_before=before,archives_after={p.name:sha(p)for p in(C/'sbpf-solana-solana/release/deps').glob('*.rlib')},controller_sha256=sha(Path(__file__)))
 (out/'result.json').write_text(json.dumps(result,indent=2)+'\n');all_results.append(result);print(label,result['candidate_sha256'],flush=True)
 if label=='control':assert result['candidate_sha256']=='fc3ad66b46d50c4083886c8ffa3d88f302bce8532ca058a2f0412568fcbc6059' and result['symbols_sha256']=='c1bbfc8234ed4efbc6021bbb050c6fa9261e82b4cb04228e42ade6bbd3bc04f6','base control did not reproduce'
 if label=='composed-repeat':assert all_results[-1]['candidate_sha256']==all_results[-2]['candidate_sha256']and all_results[-1]['symbols_sha256']==all_results[-2]['symbols_sha256'],'repeat differs'
