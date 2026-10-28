from pathlib import Path
import sys,json,gzip,hashlib
R=Path('/workspace/pumpfun-source-current');sys.path.insert(0,str(R/'scripts'))
import pump_validate_all as base
from pump_validate_parallel import validate_result
from pump_diagnostic_audit import audit
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
W=R/'work/pump-round37-public-runtime';D=W/'full.json.gz.suites';C=R/'work/pump-round37-arithmetic-public/candidate.so';O=R/'evidence/original/pump/deployed.so';B=C.parent/'build-comparison.json';record=json.loads(B.read_text());failure=json.loads((W/'full.json.gz.failed.json').read_text());assert len(failure['completed_suites'])==42
assert all(sha(Path(p))==h for p,h in failure['bound_files_sha256'].items())
for name,filename in [('tokenkeg_two_curve','tokenkeg-resumed.json'),('claim_panic_diagnostics','claim-resumed.json')]:
 raw=(W/filename).read_bytes();(D/(name+'.json.gz')).write_bytes(gzip.compress(raw,mtime=0))
suites={};scripts={};receipts={}
for name,filename in base.SUITES:
 path=R/filename if filename.startswith('repro/')else R/'scripts'/filename;scripts[str(path.relative_to(R))]=sha(path)
 result=json.loads(gzip.decompress((D/(name+'.json.gz')).read_bytes()));result['case_count']=validate_result(name,result,C,O);suites[name]=result
 loader=D/(name+'.loader.json');d=json.loads(loader.read_text());assert {x['elf_sha256']for x in d['loads']}=={sha(C),sha(O)}
 assert all(x['program_bytes']==36 and x['program_owner']=='BPFLoaderUpgradeab1e11111111111111111111111' and x['programdata_bytes']==10485760 and x['elf_prefix_unchanged'] and x['zero_allocation_tail']for x in d['loads'])
 assert all(sha(Path(p))==h for p,h in d['input_sha256'].items());receipts[name]=dict(path=str(loader.relative_to(R)),sha256=sha(loader),load_count=len(d['loads']))
assert len(suites)==44 and sum(x['case_count']for x in suites.values())==10468
sources=record['source_sha256'];assert all(sha(R/p)==h for p,h in sources.items());diagnostics=audit(suites);assert not diagnostics['mismatches']
report=dict(scope='Actual retained 42-suite parallel execution plus two resumed unchanged harnesses; no suite output is synthesized or transferred from another binary.',candidate_sha256=sha(C),original_sha256=sha(O),compiled_source_sha256=sources,source_directory=record['source_directory'],script_sha256=scripts,loader_profile='captured-upgradeable',loader_receipts=receipts,case_count=10468,diagnostics=diagnostics,mismatches=[],suites=suites,resumption=dict(initial_completed_suites=42,initial_failure='missing sparse-checkout harness; one pending suite canceled',resumed_suites=['tokenkeg_two_curve','claim_panic_diagnostics'],tokenkeg_source_binding='exact staged workspace',initial_failure_sha256=sha(W/'full.json.gz.failed.json')))
(W/'admitted.json.gz').write_bytes(gzip.compress((json.dumps(report,separators=(',',':'))+'\n').encode(),mtime=0));print(json.dumps(dict(cases=report['case_count'],suites=len(suites),diagnostics=diagnostics)))
