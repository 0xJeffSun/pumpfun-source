from pathlib import Path
import sys,json,hashlib,subprocess,shutil,datetime
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');D=Path('/home/ahi200/pumpfun-work/20261028-pump-feeconfig-decoder');T=R/'work/pump-feeconfig-recovery-20261028';T.mkdir(exist_ok=False)
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
sys.path.insert(0,str(R/'scripts'));from build_source_manifest import source_manifest
shutil.copytree(D/'source-local-feeconfig',T/'source');shutil.copyfile(D/'local-feeconfig-rebuilt/candidate.so',T/'candidate.so')
launch=json.loads((D/'local-feeconfig-rebuilt/launch.json').read_text());result=json.loads((D/'local-feeconfig-rebuilt/result.json').read_text())
assert result['returncode']==0 and result['actual_root_invocations']==1 and result['source_unchanged']
assert all(sha(T/'source'/k)==v for k,v in launch['inputs'].items());assert sha(T/'candidate.so')==result['candidate_sha256']
sources=source_manifest(T/'source/programs/pump',T/'source',R,cwd=T/'source')
assert sources=={str((T/'source'/k).relative_to(R)):v for k,v in launch['inputs'].items()}
binding={'scope':'Adapter of actual completed native build records to a byte-identical runtime copy; not a build performed in this runtime directory. All compiler-source bytes and output are verified equal.','actual_launch':str(D/'local-feeconfig-rebuilt/launch.json'),'actual_launch_sha256':sha(D/'local-feeconfig-rebuilt/launch.json'),'actual_result':str(D/'local-feeconfig-rebuilt/result.json'),'actual_result_sha256':sha(D/'local-feeconfig-rebuilt/result.json')}
record={'returncode':result['returncode'],'source_unchanged':result['source_unchanged'],'source_sha256':sources,'source_after_sha256':sources,'comparison':{'candidate_sha256':sha(T/'candidate.so'),'original_sha256':sha(R/'evidence/original/pump/deployed.so')},'binding_adaptation':binding}
for name in ['build-comparison.json','build-attempt.json']:(T/name).write_text(json.dumps(record,indent=2)+'\n')
(T/'runtime').mkdir()
cmd=[sys.executable,'-B',str(R/'scripts/pump_validate_parallel.py'),'--candidate',str(T/'candidate.so'),'--source-directory',str(T/'source/programs/pump'),'--build-comparison',str(T/'build-comparison.json'),'--output',str(T/'runtime/report.json.gz'),'--workers','3','--captured-loader']
(D/'runtime-launch.json').write_text(json.dumps({'at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'command':cmd,'candidate_sha256':sha(T/'candidate.so'),'controller_sha256':sha(Path(__file__)),'binding':binding},indent=2)+'\n')
with (T/'runtime/runner.log').open('wb') as f:r=subprocess.run(cmd,cwd=R,stdout=f,stderr=subprocess.STDOUT)
(D/'runtime-result.json').write_text(json.dumps({'returncode':r.returncode,'runner_log_sha256':sha(T/'runtime/runner.log'),'candidate_unchanged':sha(T/'candidate.so')==result['candidate_sha256']},indent=2)+'\n')
print('\n'.join((T/'runtime/runner.log').read_text().splitlines()[-10:]),flush=True);r.check_returncode()
