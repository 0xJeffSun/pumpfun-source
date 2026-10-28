from pathlib import Path
import json,gzip,hashlib,shutil,sys,subprocess,importlib.metadata
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source')
P=R/'research/pump-feeconfig-decoder-recovery'
D=Path('/home/ahi200/pumpfun-work/20261028-pump-feeconfig-decoder')
T=R/'work/pump-feeconfig-recovery-20261028'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
result=json.loads((D/'runtime-result.json').read_text())
assert result['returncode']==0 and result['candidate_unchanged']
report=json.loads(gzip.decompress((T/'runtime/report.json.gz').read_bytes()))
assert report['case_count']==10468 and len(report['suites'])==44 and not report['mismatches']
sys.path.insert(0,str(R/'scripts'));import pump_validate_all as base
assert set(report['suites'])==set(base.EXPECTED_CASES)
out=P/'runtime';out.mkdir(exist_ok=False);(out/'suites').mkdir()
for name in ['report.json.gz','runner.log']:shutil.copyfile(T/'runtime'/name,out/name)
for name in ['build-comparison.json','build-attempt.json']:shutil.copyfile(T/name,out/name)
for name in ['runtime-launch.json','runtime-result.json']:shutil.copyfile(D/name,out/name)
loader_inputs=None;first=None
for name in sorted(report['suites']):
 for suffix in ['.json.gz','.log','.loader.json']:
  source=T/'runtime/report.json.gz.suites'/(name+suffix)
  destination=out/'suites'/(source.name+('.gz' if suffix=='.loader.json' else ''))
  destination.write_bytes(gzip.compress(source.read_bytes(),mtime=0) if suffix=='.loader.json' else source.read_bytes())
 receipt=json.loads((T/'runtime/report.json.gz.suites'/(name+'.loader.json')).read_text())
 assert sha(T/'runtime/report.json.gz.suites'/(name+'.loader.json'))==report['loader_receipts'][name]['sha256']
 if loader_inputs is None:loader_inputs=receipt['input_sha256'];first=receipt['loads'][0]
 assert receipt['input_sha256']==loader_inputs
 assert all(sha(Path(path))==digest for path,digest in loader_inputs.items())
for path,digest in report['script_sha256'].items():assert sha(R/path)==digest
versions={dist.metadata['Name']:dist.version for dist in importlib.metadata.distributions()}
(out/'environment.json').write_text(json.dumps({'python':sys.version,'executable':sys.executable,'packages':versions},indent=2)+'\n')
expected={'harness_commit':'b855ede024ac3bac603405db1d874ee58e651b38','case_counts':base.EXPECTED_CASES,'script_sha256':report['script_sha256'],'candidate_path':str(T/'candidate.so'),'original_path':str(R/'evidence/original/pump/deployed.so'),'loader_inputs_sha256':loader_inputs,'program_sha256':first['program_sha256'],'header_sha256':first['header_sha256']}
(out/'harness-inputs.json').write_text(json.dumps(expected,indent=2)+'\n')
print('retained runtime',report['case_count'],len(report['suites']),report['diagnostics']['log_bearing_cases'],'diagnostic pairs')
