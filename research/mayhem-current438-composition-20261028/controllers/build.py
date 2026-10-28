from pathlib import Path
import hashlib,json,os,shutil,subprocess,sys,time
W=Path(__file__).resolve().parents[1];label,source=sys.argv[1:];assert Path(label).name==label and Path(source).name==source
S=W/source/'programs/mayhem';out=W/(label+'-build');out.mkdir();(out/'root-out').mkdir()
base=W/'layout-frontier434-origins-01/composed-first';record=json.loads((base/'builds.json').read_bytes())[0];oldS=Path(record['cwd']);oldC=Path(record['environment']['CARGO_TARGET_DIR']);C=W/'parallel-targets/fast-amm-qualified434-20261027'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();inventory=lambda:{p.relative_to(S).as_posix():sha(p)for p in S.rglob('*')if p.is_file()};inputs=inventory();assert len(inputs)==67
replace=lambda x:x.replace(str(oldS),str(S)).replace(str(oldC),str(C))
for n in ['default.ld','ordered.ld','linker.py']:shutil.copyfile(base/n,out/n)
(out/'linker.py').chmod(0o755)
cmd=[replace(x)for x in record['command']];cmd[cmd.index('--out-dir')+1]=str(out/'root-out')
for i,x in enumerate(cmd):
 if x.startswith('link-arg=-Map='):cmd[i]='link-arg=-Map='+str(out/'link.map')
 if x.startswith('linker='):cmd[i]='linker='+str(out/'linker.py')
env=os.environ.copy();baseenv=json.loads((W/'layout-allocator-current-historical-04/builds.json').read_bytes())[0]['target_build_environment'];env.update({k:replace(v)for k,v in baseenv.items()});env.update({k:replace(v)for k,v in record['environment'].items()});before={p.name:sha(p)for p in(C/'sbpf-solana-solana/release/deps').glob('*.rlib')}
launch=dict(command=cmd,cwd=str(S),source_inputs=inputs,environment={k:env[k]for k in record['environment']},controller_sha256=sha(Path(__file__)))
(out/'launch.json').write_text(json.dumps(launch,indent=2)+'\n');t=time.monotonic()
with(out/'stdout').open('wb')as so,(out/'stderr').open('wb')as se:r=subprocess.run(cmd,cwd=S,env=env,stdout=so,stderr=se)
result=dict(returncode=r.returncode,seconds=time.monotonic()-t,source_unchanged=inventory()==inputs,archives_unchanged=before=={p.name:sha(p)for p in(C/'sbpf-solana-solana/release/deps').glob('*.rlib')})
if r.returncode==0:
 shutil.copyfile(out/'root-out/mayhem_recovered.so',out/'symbols.so');subprocess.run(['/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy','--strip-all',str(out/'symbols.so'),str(out/'candidate.so')],check=True);result.update(candidate_sha256=sha(out/'candidate.so'),symbols_sha256=sha(out/'symbols.so'))
(out/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2));assert r.returncode==0 and result['source_unchanged']and result['archives_unchanged']
