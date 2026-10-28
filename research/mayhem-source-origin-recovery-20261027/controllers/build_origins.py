"""Two isolated ordinary-compiler source-origin controls over the frozen macro source."""
from pathlib import Path
import hashlib,json,os,shutil,subprocess,sys,time,tomllib
W=Path(__file__).resolve().parents[1];R=W.parents[1];kind=sys.argv[1];assert kind in ('bpf','event')
label='layout-bpf-writer-origin-01'if kind=='bpf'else'layout-extend-event-origin-01';D=W/label;S=D/'programs/mayhem';cache=W/'parallel-targets'/('fast-layout-'+kind+'-origin-01');O=D/'unqualified';O.mkdir()
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();inventory=lambda:{p.relative_to(S).as_posix():sha(p)for p in S.rglob('*')if p.is_file()};inputs=inventory()
records=json.loads((W/'layout-allocator-current-historical-04/builds.json').read_text());curve,root=[dict(r)for r in records];base_env=curve['target_build_environment'];env=os.environ.copy();env.update(base_env);env['CARGO_TARGET_DIR']=str(cache)
def fix_command(cmd):
 cmd=[x.replace(str(W/'parallel-targets/fast-layout-linux'),str(cache))for x in cmd]
 return cmd
# Seed the exact accepted curve archive into this private cache; the bpf lane recompiles it below.
for suffix in ['rlib','rmeta']:
 name='libcurve_accounts-a46b64d8dfd1b3b9.'+suffix;shutil.copyfile(W/'layout-allocator-current-historical-04/curve_accounts-out'/name,cache/'sbpf-solana-solana/release/deps'/name)
phases=[]
if kind=='bpf':
 baseline_dir=D/'baseline-anchor';baseline_dir.mkdir();cmd=fix_command(json.loads((W/'macro-closure-whole-elf-audit/baseline-anchor_lang-command.json').read_text()));cmd[cmd.index('--out-dir')+1]=str(baseline_dir);phases.append(('anchor_lang_baseline',cmd))
 for name in ['anchor_lang','anchor_spl']:
  cmd=fix_command(json.loads((W/'macro-closure-whole-elf-audit'/('baseline-'+name+'-command.json')).read_text()));cmd[cmd.index('--out-dir')+1]=str(cache/'sbpf-solana-solana/release/deps')
  if name=='anchor_lang':cmd+=['--remap-path-prefix=vendor/anchor-lang/src/bpf_writer.rs=src/bpf_writer.rs']
  phases.append((name,cmd))
 cmd=fix_command(curve['command']);cmd[cmd.index('--out-dir')+1]=str(cache/'sbpf-solana-solana/release/deps');phases.append(('curve_accounts',cmd))
cmd=fix_command(root['command']);cmd[cmd.index('--out-dir')+1]=str(O)
for i,x in enumerate(cmd):
 if x.startswith('curve_accounts='):cmd[i]='curve_accounts='+str(cache/'sbpf-solana-solana/release/deps/libcurve_accounts-a46b64d8dfd1b3b9.rlib')
 if x=='dependency='+str(W/'layout-allocator-current-historical-04/curve_accounts-out'):cmd[i]='dependency='+str(cache/'sbpf-solana-solana/release/deps')
 if x.startswith('link-arg=-Map='):cmd[i]='link-arg=-Map='+str(O/'link.map')
phases.append(('mayhem_recovered',cmd));receipts=[]
for name,cmd in phases:
 crate=S/'vendor/anchor-lang'if name in ('anchor_lang','anchor_lang_baseline')else S/'curve-accounts'if name=='curve_accounts'else Path(next(x for x in cmd if x.endswith('/anchor-spl-1.0.0/src/lib.rs'))).parents[1]if name=='anchor_spl'else S
 manifest=tomllib.loads((crate/'Cargo.toml').read_text());local_env=dict(env);local_env.update(CARGO_MANIFEST_DIR=str(crate),CARGO_MANIFEST_PATH=str(crate/'Cargo.toml'),CARGO_PKG_NAME=manifest['package']['name'],CARGO_PKG_VERSION=manifest['package']['version'])
 receipt={'crate':name,'command':cmd,'cwd':str(S),'source_inputs':inputs,'manifest_dir':str(crate),'environment':{k:local_env[k]for k in ['CARGO_TARGET_DIR','CARGO_HOME','RUSTC','RUSTDOC','CARGO_MANIFEST_DIR','CARGO_PKG_NAME','CARGO_PKG_VERSION']}};start=time.monotonic()
 with(D/(name+'.stdout')).open('wb')as so,(D/(name+'.stderr')).open('wb')as se:result=subprocess.run(cmd,cwd=S,env=local_env,stdout=so,stderr=se)
 receipt.update(returncode=result.returncode,seconds=time.monotonic()-start,source_unchanged=inventory()==inputs);receipts.append(receipt);(D/'builds.json').write_text(json.dumps(receipts,indent=2)+'\n');print(name,result.returncode,flush=True)
 if result.returncode:raise SystemExit(result.returncode)
 if name=='anchor_lang_baseline':
  a=D/'baseline-anchor/libanchor_lang-946a3f017ffdc240.rlib';b=cache/'sbpf-solana-solana/release/deps/libanchor_lang-946a3f017ffdc240.rlib';equal=sha(a)==sha(b);receipt['baseline_archive_identical']=equal;(D/'builds.json').write_text(json.dumps(receipts,indent=2)+'\n');assert equal,'baseline anchor archive did not reproduce'
shutil.copyfile(O/'mayhem_recovered.so',O/'symbols.so');strip='/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy';subprocess.run([strip,'--strip-all',str(O/'symbols.so'),str(O/'candidate.so')],check=True)
result={'candidate_sha256':sha(O/'candidate.so'),'symbols_sha256':sha(O/'symbols.so'),'source_unchanged':inventory()==inputs,'source_files':len(inputs),'cache':str(cache),'scope':'First unqualified compiler control; not yet accepted or runtime tested'};(D/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
