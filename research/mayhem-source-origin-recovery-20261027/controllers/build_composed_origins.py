from pathlib import Path
import hashlib,json,os,shutil,subprocess,time,tomllib
W=Path(__file__).resolve().parents[1];D=W/'layout-source-origins-composed-01';S=D/'programs/mayhem';cache=W/'parallel-targets/fast-layout-origins-composed-01';sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();inventory=lambda:{p.relative_to(S).as_posix():sha(p)for p in S.rglob('*')if p.is_file()};initial=inventory();assert len(initial)==67
base=json.loads((W/'layout-allocator-current-historical-04/builds.json').read_text())[0];bpf=json.loads((W/'layout-bpf-writer-origin-01/builds.json').read_text());qual=json.loads((W/'layout-event-origin-qualified-01/launch.json').read_text());env=os.environ.copy();env.update(base['target_build_environment']);env['CARGO_TARGET_DIR']=str(cache)
commands=[(r['crate'],r['command'])for r in bpf if r['crate']in ['anchor_lang','anchor_spl','curve_accounts']]
assert [n for n,c in commands]==['anchor_lang','anchor_spl','curve_accounts']
def redirect(cmd):
 return [x.replace(str(W/'parallel-targets/fast-layout-bpf-origin-01'),str(cache)).replace(str(W/'parallel-targets/fast-layout-event-origin-01'),str(cache))for x in cmd]
all_outputs=[]
for label in ['first','repeat']:
 P=D/label;P.mkdir();(P/'root-out').mkdir();(P/'archives').mkdir()
 for n in ['linker.py','default.ld','ordered.ld']:shutil.copyfile(W/'layout-event-origin-qualified-01'/n,P/n)
 # This wrapper sits two levels below W, so the pinned linker locator changes only.
 f=P/'linker.py';f.write_text(f.read_text().replace("P.parent/'layout-lane-linux-target2-sysroot", "P.parents[1]/'layout-lane-linux-target2-sysroot"));f.chmod(0o755)
 phases=[(n,redirect(c))for n,c in commands];cmd=redirect(qual['command']);cmd[cmd.index('--out-dir')+1]=str(P/'root-out')
 for i,x in enumerate(cmd):
  if x.startswith('link-arg=-Map='):cmd[i]='link-arg=-Map='+str(P/'link.map')
  if x.startswith('linker='):cmd[i]='linker='+str(P/'linker.py')
 phases.append(('mayhem_recovered',cmd));records=[]
 for name,cmd in phases:
  crate=S/'vendor/anchor-lang'if name=='anchor_lang'else S/'curve-accounts'if name=='curve_accounts'else Path(next(x for x in cmd if x.endswith('/anchor-spl-1.0.0/src/lib.rs'))).parents[1]if name=='anchor_spl'else S
  manifest=tomllib.loads((crate/'Cargo.toml').read_text());local=dict(env);local.update(CARGO_MANIFEST_DIR=str(crate),CARGO_MANIFEST_PATH=str(crate/'Cargo.toml'),CARGO_PKG_NAME=manifest['package']['name'],CARGO_PKG_VERSION=manifest['package']['version'])
  rec={'crate':name,'command':cmd,'cwd':str(S),'environment':{k:local[k]for k in ['CARGO_TARGET_DIR','CARGO_HOME','RUSTC','RUSTDOC','CARGO_MANIFEST_DIR','CARGO_MANIFEST_PATH','CARGO_PKG_NAME','CARGO_PKG_VERSION']},'source_inputs':initial};t=time.monotonic()
  with(P/(name+'.stdout')).open('wb')as so,(P/(name+'.stderr')).open('wb')as se:r=subprocess.run(cmd,cwd=S,env=local,stdout=so,stderr=se)
  rec.update(returncode=r.returncode,seconds=time.monotonic()-t,source_unchanged=inventory()==initial);records.append(rec);(P/'builds.json').write_text(json.dumps(records,indent=2)+'\n');print(label,name,r.returncode,flush=True)
  assert r.returncode==0
 for name in ['libanchor_lang-946a3f017ffdc240.rlib','libanchor_spl-5efd9abd2467cb79.rlib','libcurve_accounts-a46b64d8dfd1b3b9.rlib']:shutil.copyfile(cache/'sbpf-solana-solana/release/deps'/name,P/'archives'/name)
 shutil.copyfile(P/'root-out/mayhem_recovered.so',P/'symbols.so');subprocess.run(['/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy','--strip-all',str(P/'symbols.so'),str(P/'candidate.so')],check=True)
 output={'candidate_sha256':sha(P/'candidate.so'),'symbols_sha256':sha(P/'symbols.so'),'source_unchanged':inventory()==initial,'archive_hashes':{f.name:sha(f)for f in(P/'archives').iterdir()},'qualified_script_sha256':sha(P/'ordered.ld')};(P/'result.json').write_text(json.dumps(output,indent=2)+'\n');all_outputs.append(output);print(label,output['candidate_sha256'],flush=True)
assert all_outputs[0]==all_outputs[1],(all_outputs[0],all_outputs[1]);(D/'repeat.json').write_text(json.dumps({'identical':True,**all_outputs[0]},indent=2)+'\n');print('REPEAT MATCH',flush=True)
