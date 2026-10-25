"""Assemble only explicitly selected public source, artifacts and saved evidence."""
from pathlib import Path
import gzip,hashlib,json,shutil,tarfile
W=Path(__file__).resolve().parent;R=next(p for p in W.parents if(p/'evidence/original/pump/deployed.so').is_file());P=W/'handoff'
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def read(p):
 b=p.read_bytes();return json.loads(gzip.decompress(b)if b.startswith(b'\x1f\x8b')else b)
def save(n,v):p=P/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,indent=2)+'\n')
def copy(src,dst):
 assert not src.is_symlink()and not src.name.endswith('-keypair.json');dst.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(src,dst)
def copytree(src,dst):
 for p in sorted(src.rglob('*')):
  if p.name.endswith('-keypair.json'):raise AssertionError('Unexpected generated keypair in explicitly selected source/evidence tree')
  if p.is_file():copy(p,dst/p.relative_to(src))
assert not P.exists();assert all(v['returncode']==0 for v in J(W/'runtime-results.json'));assert J(W/'independent-verification.json')['differential_case_count']==9237
P.mkdir();
for n in ['approved-proposal','source','runtime-layer','static-diagnostics','build-helpers','route-original','route-candidate','nested-original.json.gz.case-journal','nested-differential.json.gz.case-journal']:copytree(W/n,P/n)
files=['candidate.so','unstripped.so','source-sha256.json','baseline-source-sha256.json','actual-source-sha256.json','source-change-map.json','baseline.json','source-snapshot.tar.gz','tools-observed.json','toolchain-phases.json','sdk-source-sha256.json','baseline-dependency-provenance.json.gz','dependency-before.json','dependency-after.json','build-helper-sha256.json','prebuild-manifest-sha256.json','build-launch.json','build-result.json','runtime-launch.json','runtime-results.json','runtime-adaptation.json','runtime-layer-manifest.json','inputs-before.json','harness_sha256.tar.gz','repository_fixture_snapshot_sha256.tar.gz','published_additional_inputs.tar.gz','analyze_fresh.py','elf_reader.py','metadata_closure.py','layer01_analyze_original.py','layer_inventory.py','layer_inventory.adapter.patch','layer_inventory_adapter.json','full_inventory.py','fresh-metadata.json','before-after-inventory.json','metadata-closure.json','full-before-after-inventory.json.gz','function-match.json','static-check-exits.json','final-static-checks.json','check_static_final.py','match-serializer.py','test_portability.py','verify_extra_saved.py','historical-nested-identities.json','pump-idl.json','extra-run.json','nested-original.json.gz','nested-original.json.gz.partial.json.gz','nested-differential.json.gz','nested-differential.json.gz.partial.json.gz','independent-verification.json','receipt-build-bindings.json','surfpool-executable-sha256.json','prepare.py','prepare_runtime.py','prepare_full_inventory.py','build_once.py','run_all.py','run_regressions.py','run_regressions.adapter.patch','run_surfpool.py','run_surfpool.adapter.patch','run_existing_extra.py','verify_receipts.py','verify_receipts.result.json','package_handoff.py']
for n in files:copy(W/n,P/n)
copy(W/'verify_handoff.py',P/'verify.py');copy(R/'work/pump-tokenkeg-two-curve-recovery/original-only-01.json.gz',P/'historical-two-curve-original.json.gz')
for p in W.iterdir():
 if p.is_file()and p.suffix in ['.stdout','.stderr']:copy(p,P/'logs'/p.name)
for n in ['build-attempt.json','build-comparison.json']:copy(W/'build-01'/n,P/'build'/n)
(P/'build/build.log.gz').write_bytes(gzip.compress((W/'build-01/build.log').read_bytes(),mtime=0))
for p in (W/'differential').iterdir():
 if p.is_file():
  if p.suffix=='.log':(P/'logs'/('differential-'+p.name+'.gz')).write_bytes(gzip.compress(p.read_bytes(),mtime=0))
  else:copy(p,P/'differential'/p.name)
copy(W/'surfpool/run.json',P/'surfpool/run.json')
for p in (W/'surfpool').glob('*.log'):(P/'logs'/('surfpool-'+p.name+'.gz')).write_bytes(gzip.compress(p.read_bytes(),mtime=0))
with tarfile.open(P/'prebuild-snapshot.tar.gz','w:gz')as t:
 for n,h in J(W/'prebuild-manifest-sha256.json').items():assert not n.endswith('-keypair.json')and H(W/n)==h;t.add(W/n,arcname=n,recursive=False)
from verify_extra_saved import run as verify_extra
save('extra-saved-verification.json',verify_extra())
source=J(W/'actual-source-sha256.json');buildsha=H(P/'build/build-comparison.json');candidate=H(P/'candidate.so');original=H(P/'approved-proposal/inputs/original.so');verification=J(W/'independent-verification.json');bindings=[]
for row in verification['differential_suites']:
 path='differential/'+row['suite']+'.json.gz';bindings.append({'suite':row['suite'],'kind':'differential','path':path,'sha256':H(P/path),'cases':row['case_count'],'verified':row['verified']})
for row,run in zip(verification['surfpool_suites'],J(W/'surfpool/run.json')):
 assert row['suite']==run['name'];directory=R/run['output'];found=[]
 for p in directory.glob('pump-*-transactions.json'):
  d=read(p)
  if isinstance(d,dict)and'candidate_sha256'in d and'signed_transactions'in d:found.append(p)
 assert len(found)==1;p=found[0];assert H(p)==row['receipt_sha256'];path='surfpool/'+row['suite']+'.json.gz';(P/path).write_bytes(gzip.compress(p.read_bytes(),mtime=0))
 bindings.append({'suite':row['suite'],'kind':'surfpool','path':path,'sha256':H(P/path),'cases':row['cases'],'verified':row['verified']})
 # Preserve logs only, never open/hash/archive generated deployment keys or whole artifact directories.
 for log in directory.rglob('*.log'):
  if log.name.endswith('-keypair.json'):continue
  out=P/'logs/surfpool-detail'/row['suite']/log.relative_to(directory);out.parent.mkdir(parents=True,exist_ok=True);out.with_suffix(out.suffix+'.gz').write_bytes(gzip.compress(log.read_bytes(),mtime=0))
bindings.append({'suite':'nested_general','kind':'differential','path':'nested-differential.json.gz','sha256':H(P/'nested-differential.json.gz'),'cases':16,'verified':{'transactions':32,'signatures':64}})
cs=J(P/'route-candidate/summary.json');pairs=[]
for row in cs['rows']:pairs.append({'case':row['case'],'original':J(P/'route-original'/row['file']),'candidate':J(P/'route-candidate'/row['file']),'mismatches':row['mismatches']})
route={'case_count':16,'cases':pairs,'candidate_sha256':candidate,'original_sha256':original,'mismatches':[],'scope':'Transport aggregate of exact retained current route original/candidate16 receipts; no additional executions.'};path='route-differential.json.gz';(P/path).write_bytes(gzip.compress((json.dumps(route,separators=(',',':'))+'\n').encode(),mtime=0));bindings.append({'suite':'general_route','kind':'differential','path':path,'sha256':H(P/path),'cases':16,'verified':{'transactions':32,'signatures':32}})
for row in bindings:row.update(actual_source_sha256=source,build_report_sha256=buildsha,candidate_sha256=candidate,original_sha256=original,legacy_source_maps='Unchanged legacy maps snapshot main checkout, not actual scratch compilation. The actual37 compiler inputs are bound separately in this row.')
save('receipt-bindings.json',bindings);save('build-report-original-path.json',{'path':str((W/'build-01/build-comparison.json').relative_to(R))})
# Evidence of actual loaded Python/Solders files plus measured Surfpool executable.
loaded=read(W/'nested-differential.json.gz')['provenance']['runtime_files'];route_loaded=J(W/'route-candidate/bindings-after.json')['runtime_files']
for n,h in {**loaded,**route_loaded}.items():assert H(Path(n))==h,n
save('runtime-identities.json',{'python_solders_nested':loaded,'python_solders_route':route_loaded,'surfpool':{'path':J(W/'inputs-before.json')['surfpool_path'],'sha256':J(W/'inputs-before.json')['surfpool_sha256']},'scope':'Historical measured/loaded runtime identity, not a portable requirement for a local Surfpool executable.'})
save('static-diagnostics/attempts.json',[{'attempt':'formatter-selection01','result':'Unsupported earlier Display direct-format form; selector was limited to already accepted final108–110 domain. All111 Debug paths remain checked. No executable or source changes.','numeric_returncode':None,'numeric_exit_limit':'Initial command group returned the later serializer status; first child numeric exit was not separately recorded. Full traceback retained.'},{'attempt':'metadata-closure01','numeric_returncode':1,'result':'Some official IDL errors omit msg; list now includes only present messages. No target/source/runtime changes.'}])
print(json.dumps({'assembled':True,'path':str(P),'receipt_bindings':len(bindings),'sealed':False},indent=2))
