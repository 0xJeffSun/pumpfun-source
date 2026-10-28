from pathlib import Path
import os,json,hashlib,subprocess,shutil,datetime
W=Path('/home/ahi200/pumpfun-work/20261028-pump-curve-decoder/native-amm-cache');D=Path('/home/ahi200/pumpfun-work/20261028-pump-feeconfig-decoder');source=D/'source-local-feeconfig';out=D/'repeat';out.mkdir(exist_ok=False)
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();inventory=lambda p:{q.relative_to(p).as_posix():sha(q) for q in p.rglob('*') if q.is_file()}
launch=json.loads((D/'local-feeconfig-rebuilt/launch.json').read_text());assert inventory(source)==launch['inputs'];os.utime(source/'programs/pump/src/lib.rs',None)
launch.update(at=datetime.datetime.now(datetime.timezone.utc).isoformat(),controller_sha256=sha(Path(__file__)));(out/'launch.json').write_text(json.dumps(launch,indent=2)+'\n')
with (out/'build.log').open('wb') as f:r=subprocess.run(launch['command'],stdout=f,stderr=subprocess.STDOUT)
r.check_returncode();root=[l for l in (out/'build.log').read_text().splitlines() if l.strip().startswith('Running `') and '--crate-name pump_recovered ' in l];assert len(root)==1
shutil.copyfile(W/'target/sbf-solana-solana/release/pump_recovered.so',out/'symbols.so');subprocess.run(['/home/ahi200/pumpfun-work/20261027-crank/sdk/llvm/bin/llvm-objcopy','--strip-all',str(out/'symbols.so'),str(out/'candidate.so')],check=True)
result={'returncode':r.returncode,'actual_root_invocations':len(root),'source_unchanged':inventory(source)==launch['inputs'],'dependencies_unchanged':all(sha(W/'target'/k)==v for k,v in launch['dependencies'].items()),'symbols_sha256':sha(out/'symbols.so'),'candidate_sha256':sha(out/'candidate.so'),'symbols_equal':(out/'symbols.so').read_bytes()==(D/'local-feeconfig-rebuilt/symbols.so').read_bytes(),'candidate_equal':(out/'candidate.so').read_bytes()==(D/'local-feeconfig-rebuilt/candidate.so').read_bytes()}
(out/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result),flush=True);assert all(result[k] for k in ['source_unchanged','dependencies_unchanged','symbols_equal','candidate_equal'])
