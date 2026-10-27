"""Seal workspace572 evidence and a checked reproduction recipe."""
from pathlib import Path
import json,gzip,shutil,hashlib
ROOT=Path(__file__).resolve().parents[2];W=Path(__file__).resolve().parent;P=ROOT/'repro/pump/workspace-layout-20261027';P.mkdir(parents=True,exist_ok=False)
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def cp(a,b):
 p=P/b;p.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(a,p)
def read(p):
 b=p.read_bytes();return json.loads(gzip.decompress(b)if b.startswith(b'\x1f\x8b')else b)
full=read(W/'captured-full-resumed.json.gz');extra=read(W/'captured-additional.json.gz');build=read(W/'build02/build-comparison.json');portable=read(W/'portable-build/build-comparison.json');assert full['candidate_sha256']==extra['candidate_sha256']==build['comparison']['candidate_sha256']==portable['comparison']['candidate_sha256'];assert build['unstripped_sha256']==portable['unstripped_sha256'];assert not full['mismatches'] and not extra['diagnostics']['mismatches'];assert len(full['suites'])==44 and full['case_count']==10468 and extra['case_count']==2657
sources={}
for p,h in build['source_sha256'].items():
 q=ROOT/p;r=q.relative_to(W/'source02');assert sha(q)==h;cp(q,Path('source')/r);sources[str(r)]=h
primary={}
for p,h in portable['primary_source_sha256'].items():
 q=ROOT/'repro/pump/main-contract-parallel-20261027/source'/Path(p).relative_to('programs/pump');assert sha(q)==h;r=Path(p).relative_to('programs/pump');cp(q,Path('primary')/r);primary[str(r)]=h
for s,d in [('build02/candidate.so','candidate.so'),('build02/unstripped.so','unstripped.so'),('build02/build-comparison.json','build.json'),('portable-build/build-comparison.json','portable-build.json'),('portable-equivalence.json','portable-equivalence.json'),('captured-full-resumed.json.gz','full.json.gz'),('captured-additional.json.gz','additional.json.gz'),('captured-full.json.gz.failed.json','prior-failed-run.json'),('pre-binding-fix-hashes.json','prior-harness-hashes.json'),('closed-calls.json','closed-calls.json'),('validation-summary.json','validation-summary.json'),('two-curve-workspace-binding.patch','binding-fix.patch'),('two-curve-pre-binding-fix.py','prior-two-curve.py'),('binding-verification.json','binding-verification.json'),('resume-validation.py','resume-validation.py'),('name-comparison.json','name-comparison.json'),('build-comparisons.json','build-comparisons.json')]:cp(W/s,d)
(P/'inventory.json.gz').write_bytes(gzip.compress((W/'build02/normalized-inventory.json').read_bytes(),mtime=0))
inputs={}
for p,h in full['bound_files_sha256'].items():inputs[p]=h
for p,h in full['script_sha256'].items():inputs[str(ROOT/p)]=h
inputs.update(extra['input_sha256'])
for p in ['scripts/pump_build_verified.py','scripts/build_source_manifest.py','scripts/compare.py','scripts/analyze.py','scripts/pump_physical_source_wrapper.py','scripts/pump_compare_function_bytes.py','scripts/pump_quote_control_function_match.py','scripts/pump_validate_parallel.py','scripts/pump_with_captured_loader.py','scripts/pump_captured_loader.py'] :inputs[str(ROOT/p)]=sha(ROOT/p)
input_map={}
for p,h in inputs.items():
 p=Path(p).resolve()
 try:r=p.relative_to(ROOT)
 except ValueError:continue
 assert sha(p)==h
 if p.suffix=='.py':cp(p,Path('inputs')/r);input_map[str(r)]=h
loaders=[]
for lane,report in [('full',full),('additional',extra)]:
 folder=W/('captured-full-resumed.json.gz.suites'if lane=='full'else'captured-additional.json.gz.suites')
 for p in sorted(folder.glob('*.loader.json')):cp(p,Path('loaders')/lane/p.name);loaders.append(str(Path('loaders')/lane/p.name))
cp(ROOT/'evidence/original/pump/capture.json','target-capture.json')
cp(W/'package.py','package.py')
record={'scope':__doc__,'goal_complete':False,'whole_elf_equal':False,'candidate_sha256':sha(P/'candidate.so'),'unstripped_sha256':sha(P/'unstripped.so'),'original_sha256':build['comparison']['original_sha256'],'source_sha256':sources,'primary_source_sha256':primary,'input_python_sha256':input_map,'loader_receipts':loaders,'full_cases':10468,'additional_cases':2657,'normalized_windows':572,'raw_windows':111,'matched_text_bytes':450656,'original_text_bytes':1792208,'full_reused_suites':38,'full_executed_suites':6,'closed_call_windows_without_data':read(W/'closed-calls.json')['counts']['closed_call_graph_windows_without_data_references']}
(P/'CHECKPOINT.json').write_text(json.dumps(record,indent=2)+'\n');print(P)
