from pathlib import Path
import hashlib,json,os,shutil,subprocess,time
W=Path(__file__).resolve().parent;D=W/'snapshot120-current-parent-a';S=D/'programs/mayhem';out=D/'qualified-repeat-a';out.mkdir();cfg=W/'qualified-snapshot120-parent-repeat-a';cfg.mkdir()
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
record=json.loads((D/'qualified-a/launch.json').read_text());cmd=record['command'];cmd[cmd.index('--out-dir')+1]=str(out)
for n in ['linker.py','default.ld','ordered.ld']:shutil.copyfile(W/'qualified-snapshot120-parent-a'/n,cfg/n)
(cfg/'linker.py').chmod(0o755)
cmd=[('link-arg=-Map='+str(out/'link.map')) if a.startswith('link-arg=-Map=') else ('linker='+str(cfg/'linker.py')) if a.startswith('linker=') else a for a in cmd]
env=os.environ.copy();env.update(json.loads((W/'fast-macro-context-current-baseline-a-build/launch.json').read_text())['environment_overrides']);env.update(json.loads((W/'macro-current-historical-event-a/builds.json').read_text())[-1]['environment_overrides']);env.update(CARGO_MANIFEST_DIR=str(S),CARGO_MANIFEST_PATH=str(S/'Cargo.toml'))
record.update(command=cmd,controller_sha256=sha(Path(__file__)));(out/'launch.json').write_text(json.dumps(record,indent=2)+'\n');start=time.monotonic()
with (out/'stdout').open('wb') as stdout,(out/'stderr').open('wb') as stderr:p=subprocess.run(cmd,cwd=S,env=env,stdout=stdout,stderr=stderr)
r={'returncode':p.returncode,'seconds':time.monotonic()-start,'source_unchanged':all(sha(S/n)==h for n,h in record['source_inputs'].items()),'bound_inputs_unchanged':all(sha(Path(n))==h for n,h in record['bound_inputs'].items())}
if p.returncode==0:
 shutil.copyfile(out/'mayhem_recovered.so',out/'symbols.so');subprocess.run(['/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy','--strip-all',str(out/'symbols.so'),str(out/'candidate.so')],check=True);r.update(candidate_sha256=sha(out/'candidate.so'),symbols_sha256=sha(out/'symbols.so'));r['candidate_identical']=sha(out/'candidate.so')==sha(D/'qualified-a/candidate.so');r['symbols_identical']=sha(out/'symbols.so')==sha(D/'qualified-a/symbols.so')
(out/'result.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r,indent=2));assert p.returncode==0 and all(r[k] for k in ['source_unchanged','bound_inputs_unchanged','candidate_identical','symbols_identical'])
