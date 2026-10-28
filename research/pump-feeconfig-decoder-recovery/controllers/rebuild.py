from pathlib import Path
import os,json,hashlib,subprocess,shutil,datetime
W=Path('/home/ahi200/pumpfun-work/20261028-pump-curve-decoder/native-amm-cache');D=Path('/home/ahi200/pumpfun-work/20261028-pump-feeconfig-decoder')
source=D/'source-local-feeconfig';out=D/'local-feeconfig-rebuilt';out.mkdir(exist_ok=False)
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
inventory=lambda p:{q.relative_to(p).as_posix():sha(q) for q in p.rglob('*') if q.is_file()}
launch=json.loads((D/'local-feeconfig/launch.json').read_text());inputs=inventory(source);assert inputs==launch['inputs']
# Cargo's mtime fingerprint reused the earlier root because this source copy
# predated the baseline build at the same logical mount. Preserve that attempt
# explicitly as invalid evidence, then require a real root invocation.
(D/'local-feeconfig/qualification.json').write_text(json.dumps({'valid_source_build':False,'reason':'Cargo reported Fresh pump-recovered and finished in0.22s. Source was changed before the later baseline build under the same logical path; its mtime did not invalidate the shared fingerprint. Output is NOT evidence for changed source.'},indent=2)+'\n')
os.utime(source/'programs/pump/src/lib.rs',None)
assert inventory(source)==inputs
launch.update(at=datetime.datetime.now(datetime.timezone.utc).isoformat(),controller_sha256=sha(Path(__file__)),forced_root_via='mtime update of root lib.rs only; content unchanged')
(out/'launch.json').write_text(json.dumps(launch,indent=2)+'\n')
with (out/'build.log').open('wb') as f:r=subprocess.run(launch['command'],stdout=f,stderr=subprocess.STDOUT)
log=(out/'build.log').read_text();root=[l for l in log.splitlines() if l.strip().startswith('Running `') and '--crate-name pump_recovered ' in l]
result={'returncode':r.returncode,'actual_root_invocations':len(root),'source_unchanged':inventory(source)==inputs,'dependencies_unchanged':all(sha(W/'target'/k)==v for k,v in launch['dependencies'].items())}
(out/'result.json').write_text(json.dumps(result,indent=2)+'\n');r.check_returncode();assert len(root)==1 and result['source_unchanged'] and result['dependencies_unchanged']
shutil.copyfile(W/'target/sbf-solana-solana/release/pump_recovered.so',out/'symbols.so')
subprocess.run(['/home/ahi200/pumpfun-work/20261027-crank/sdk/llvm/bin/llvm-objcopy','--strip-all',str(out/'symbols.so'),str(out/'candidate.so')],check=True)
result.update(symbols_sha256=sha(out/'symbols.so'),candidate_sha256=sha(out/'candidate.so'));(out/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result),flush=True)
