"""Compose the frozen120-slot initializer with the current historical macro context."""
from pathlib import Path
import gzip,hashlib,json,os,shutil,subprocess,tarfile,time,sys
W=Path(__file__).resolve().parent; R=W.parents[1]; P=R/'research/mayhem-initializer-owned-snapshot-20261027'
D=W/'current-legacy-owned-qualified-a'; S=D/'programs/mayhem'; D.mkdir()
old=W/'macro-current-historical-event-a';shutil.copytree(W/'root-price-scope-owned/programs/mayhem',S)
with tarfile.open(R/'research/mayhem-trade-origins-validator/source.tar.gz','r:gz') as t: previous=t.extractfile('src/state.rs').read()
updated=(W/'accounts-init-staged-key-f/programs/mayhem/src/state.rs').read_bytes()
assert (S/'src/state.rs').read_bytes()==updated
(S/'src/state.rs').write_bytes(updated)
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
inputs=lambda:{p.relative_to(S).as_posix():sha(p) for p in S.rglob('*') if p.is_file()}
initial=inputs();assert len(initial)==67
import shlex
log=(W/'fast-macro-context-current-baseline-a-build/stderr').read_text()
cmd=None
for line in log.splitlines():
 if 'Running `' in line:
  q=shlex.split(line.split('Running `',1)[1].rsplit('`',1)[0])
  if '--crate-name' in q and q[q.index('--crate-name')+1]=='mayhem_recovered':cmd=q
assert cmd
cmd += ['-C','linker='+str(W/'qualified-current-legacy-owned-a/linker.py')]
out=D/'qualified-a';out.mkdir()
config=W/'qualified-current-legacy-owned-a';config.mkdir()
for n in ['linker.py','default.ld','ordered.ld']:shutil.copyfile(W/'qualified-parser-current-01'/n,config/n)
(config/'linker.py').chmod(0o755)
cmd[cmd.index('--out-dir')+1]=str(out)
cmd=[('link-arg=-Map='+str(out/'link.map')) if a.startswith('link-arg=-Map=') else ('linker='+str(config/'linker.py')) if a.startswith('linker=') else a for a in cmd]
env=os.environ.copy();env.update(json.loads((W/'fast-macro-context-current-baseline-a-build/launch.json').read_bytes())['environment_overrides']);env.update(json.loads((old/'builds.json').read_bytes())[-1]['environment_overrides']);env.update(CARGO_MANIFEST_DIR=str(S),CARGO_MANIFEST_PATH=str(S/'Cargo.toml'))
bound={}
for a in cmd:
    if '=' in a:
        v=a.split('=',1)[1]
        p=Path(v)
        if p.is_file():bound[str(p)]=sha(p)
for p in [Path(cmd[0]),config/'linker.py',config/'ordered.ld']:bound[str(p)]=sha(p)
launch={'command':cmd,'cwd':str(S),'source_inputs':initial,'parent_candidate_sha256':'f4f6a36829043aac0a49f1604b84cdf3650c88d3acee49ef6bf1e5f32a63e583','initializer_source_sha256':hashlib.sha256(updated).hexdigest(),'bound_inputs':bound,'scope':'Incremental native root compilation; unchanged current Anchor curve archive, target libraries and qualified linker script; not a full dependency rebuild.'};(out/'launch.json').write_text(json.dumps(launch,indent=2)+'\n')
start=time.monotonic()
with (out/'stdout').open('wb') as stdout,(out/'stderr').open('wb') as stderr: p=subprocess.run(cmd,cwd=S,env=env,stdout=stdout,stderr=stderr)
result={'returncode':p.returncode,'seconds':time.monotonic()-start,'source_unchanged':inputs()==initial,'bound_inputs_unchanged':all(sha(Path(n))==h for n,h in bound.items())}
if p.returncode==0:
    shutil.copyfile(out/'mayhem_recovered.so',out/'symbols.so');subprocess.run(['/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy','--strip-all',str(out/'symbols.so'),str(out/'candidate.so')],check=True)
    result.update(candidate_sha256=sha(out/'candidate.so'),symbols_sha256=sha(out/'symbols.so'))
(out/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2));assert p.returncode==0 and result['source_unchanged'] and result['bound_inputs_unchanged']
