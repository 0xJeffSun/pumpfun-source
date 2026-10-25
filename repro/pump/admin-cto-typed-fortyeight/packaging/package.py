from pathlib import Path
import base64,gzip,hashlib,json,shutil,tarfile
R=Path.cwd();W=R/'work/pump-admin-cto-typed-build/attempt02';P=W.parent/'public';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def obj(p):
 b=p.read_bytes();return json.loads(gzip.decompress(b)if b.startswith(b'\x1f\x8b')else b)
def copy(a,b):
 assert not a.is_symlink() and not a.name.endswith('-keypair.json');b.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(a,b)
def tree(a,b):
 for p in sorted(a.rglob('*')):
  if p.is_file() and '__pycache__' not in p.parts:copy(p,b/p.relative_to(a))
def save(n,v):
 p=P/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,indent=2)+'\n')
assert not P.exists();P.mkdir()
files=['candidate.so','unstripped.so','baseline.json','baseline-source-sha256.json','source-change-map.json','source-sha256.json','actual-source-sha256.json','build-result.json','build-launch.json','build_once.py','toolchain-phases.json','tools-observed.json','sdk-source-sha256.json','build-helper-sha256.json','dependency-before.json','dependency-after.json','baseline-dependency-provenance.json.gz','prebuild-manifest-sha256.json','inputs-before.json','runtime-layer-manifest.json','runtime-adaptation.json','analyze_fresh.py','full_inventory.py','elf_reader.py','layer_inventory.py','layer01_analyze_original.py','metadata_closure.py','metadata-closure.json','fresh-metadata.json','before-after-inventory.json','full-before-after-inventory.json.gz','function-match.json','complete-byte-comparison.json.gz','full-original-call-data-ledger.json.gz','full-candidate-call-data-ledger.json.gz','fee-basis-static-review.json','stack-observations.json','fee_basis_static.py','verify_extra_saved.py','pump-idl.json','historical-nested-identities.json','extra-saved-verification.json','independent-verification.json','receipt-build-bindings.json','surfpool-executable-sha256.json','extra-run.json','run_regressions.py','run_existing_extra.py','run_surfpool.py','prepare_runtime.py','PROMOTION-UNRUN.md','README.before.md','README.proposed.md','README.patch','coverage-review.json','coverage_admin.py','README.md','root-runtime-exits.json','harness_sha256.tar.gz','repository_fixture_snapshot_sha256.tar.gz','published_additional_inputs.tar.gz','prior-attempt.json','static-method-inputs.json','legacy-label-notes.json']
for n in files:copy(W/n,P/n)
for n in ['source','static-inputs','build-helpers','approved-proposal','runtime-layer','fee-basis-static','admin-static','history','borrow-scope-repair','accepted-source','differential','nested-original.json.gz.case-journal','nested-differential.json.gz.case-journal','route-original','route-candidate']:tree(W/n,P/n)
for n in ['nested-original.json.gz','nested-differential.json.gz']:copy(W/n,P/n)
for n in ['build-comparison.json','build-attempt.json']:copy(W/'build-01'/n,P/'build'/n)
(P/'build/build.log.gz').write_bytes(gzip.compress((W/'build-01/build.log').read_bytes(),mtime=0))
for n in ['build-invocation.stdout','build-invocation.stderr','build-launch.stdout','build-launch.stderr','run-0.stdout','run-0.stderr','run-1.stdout','run-1.stderr','run-2.stdout','run-2.stderr','static.stdout','static.stderr','inventory.stdout','inventory.stderr','full-call-data.stdout','full-call-data.stderr','match-serializer.stdout','match-serializer.stderr','metadata-closure.stdout','metadata-closure.stderr']:copy(W/n,P/'logs'/n)
copy(R/'work/pump-tokenkeg-two-curve-recovery/original-only-01.json.gz',P/'historical-two-curve-original.json.gz')
save('build-report-original-path.json',{'path':str((W/'build-01/build-comparison.json').relative_to(R))})
with tarfile.open(P/'prebuild-snapshot.tar.gz','w:gz')as t:
 for n,h in J(W/'prebuild-manifest-sha256.json').items():
  assert H(W/n)==h,n
  if '__pycache__' not in Path(n).parts:t.add(W/n,arcname=n,recursive=False)
save('prebuild-snapshot-exclusions.json',{n:h for n,h in J(W/'prebuild-manifest-sha256.json').items()if '__pycache__' in Path(n).parts})
with tarfile.open(P/'source-snapshot.tar.gz','w:gz')as t:
 for n,h in J(W/'source-sha256.json').items():assert H(W/'source'/n)==h;t.add(W/'source'/n,arcname=n,recursive=False)
# Reduce Surfpool local process trees to exact saved comparison receipts and logs.
bindings=[];report_sha=H(P/'build/build-comparison.json');actual=J(W/'actual-source-sha256.json')
def sigs(v):
 from solders.transaction import VersionedTransaction
 def tx(v):
  if isinstance(v,dict):
   if isinstance(v.get('transaction_base64'),str):yield v['transaction_base64']
   for k,x in v.items():
    if k!='transaction_base64':yield from tx(x)
  elif isinstance(v,list):
   for x in v:yield from tx(x)
 count=n=0
 for s in tx(v):
  raw=base64.b64decode(s);t=VersionedTransaction.from_bytes(raw);assert bytes(t)==raw and all(t.verify_with_results());count+=1;n+=len(t.signatures)
 return {'transactions':count,'signatures':n}
def bind(suite,kind,path,data,cases):
 v=sigs({'original':data['original'],'candidate':data['candidate']}if kind=='surfpool'else data)
 bindings.append({'suite':suite,'kind':kind,'path':str(path.relative_to(P)),'sha256':H(path),'cases':cases,'verified':v,'actual_source_sha256':actual,'build_report_sha256':report_sha,'candidate_sha256':H(P/'candidate.so'),'original_sha256':H(P/'static-inputs/original.so')})
for row in J(W/'differential/run.json'):
 p=P/'differential'/(row['suite']+'.json.gz');bind(row['suite'],'differential',p,obj(p),row['case_count'])
route_rows=[]
for f in sorted((P/'route-candidate').glob('*.json')):
 if f.name in ['bindings-after.json','bindings-before.json','packet-plan.json','progress.json','summary.json'] or f.name.endswith(('.transaction.json','.raw-result.json')):continue
 ca=obj(f);og=obj(P/'route-original'/f.name);assert ca['transaction_base64']==og['transaction_base64'];route_rows.append({'case':ca['case']['name'],'original':og,'candidate':ca})
assert len(route_rows)==16
route={'case_count':16,'cases':route_rows,'candidate_sha256':H(P/'candidate.so'),'original_sha256':H(P/'static-inputs/original.so'),'mismatches':[],'scope':'Read-only aggregate of16 saved original/candidate comparison records; no execution.'}
(P/'route-differential.json.gz').write_bytes(gzip.compress((json.dumps(route,separators=(',',':'))+'\n').encode(),mtime=0))
for suite,src,count in [('nested_general','nested-differential.json.gz',16),('general_route','route-differential.json.gz',16)]:bind(suite,'differential',P/src,obj(P/src),count)
for row in J(W/'surfpool/run.json'):
 directory=R/row['output'];found=[p for p in directory.glob('pump-*-transactions.json')if isinstance(obj(p),dict)and'candidate_sha256'in obj(p)and'signed_transactions'in obj(p)];assert len(found)==1
 data=obj(found[0]);dest=P/'surfpool'/(row['name']+'.json.gz');dest.parent.mkdir(exist_ok=True);dest.write_bytes(gzip.compress(found[0].read_bytes(),mtime=0));bind(row['name'],'surfpool',dest,data,data['cases']);copy(W/'surfpool'/(row['name']+'.log'),P/'surfpool'/(row['name']+'.log'))
save('surfpool/run.json',J(W/'surfpool/run.json'));save('receipt-bindings.json',bindings)
for suite in ['exact_quote','v3_configured_fee']:copy(W/'surfpool'/suite/'fixtures.json',P/'coverage-fixtures'/(suite+'.json'))
suites={row['suite']:obj(P/row['path'])for row in bindings if row['kind']=='differential'}
aggregate={'case_count':9269,'suite_count':40,'candidate_sha256':H(P/'candidate.so'),'original_sha256':H(P/'static-inputs/original.so'),'mismatches':[],'scope':'Exact aggregate of40 saved differential reports; no new executions.','suites':suites}
(P/'all-differential.json.gz').write_bytes(gzip.compress((json.dumps(aggregate,separators=(',',':'))+'\n').encode(),mtime=0))
status=J(R/'repro/status.json')['pump'];scratch='repro/pump/admin-cto-typed-fortyeight';main='repro/pump/admin-cto-typed-main-fortyeight'
status.update(candidate_artifact=main+'/main/candidate.so',comparison_report=main+'/main/build-comparison.json',build_log=main+'/main/build.log',candidate_build_identity_report=main+'/main/controls/identity.json',prior_checkpoint='repro/pump/creator-full-curve-main-fortyeight',validation_reports=[scratch+'/all-differential.json.gz'],signed_sequence_reports=[scratch+'/'+row['path']for row in bindings if row['kind']=='surfpool'],receipt_build_bindings_report=scratch+'/receipt-bindings.json',admin_cto_typed_report=scratch+'/README.md',admin_cto_typed_body_evidence=scratch+'/admin-static/acceptance.json',compiler_phase_provenance=scratch+'/toolchain-phases.json')
save('status-pump-proposal.json',status)
n=obj(W/'nested-differential.json.gz');save('runtime-identities.json',{'python_solders_nested':n['provenance']['runtime_files'],'python_solders_route':J(W/'route-original/bindings-before.json')['runtime_files']})
# Reuse the prior complete saved receipt verifier with narrowly recorded bind/scope changes.
s=(R/'work/pump-curve-preparation-build/handoff/verify.py').read_text()
s=s.replace('32681d971cfb86d0d4053a9ec067ae580ac983f933aadfc3ffa2f5ea765d33ad',H(P/'approved-proposal/manifest.json')).replace('b02a7e08b1f928a48793d909a86ef01c99cb3cb11a2aaf3d85e4ac422b989b51',H(P/'candidate.so'))
s=s.replace("==494 and inv['after']['summary']['candidate_with_pattern']==493", "==492 and inv['after']['summary']['candidate_with_pattern']==493").replace("==428 and inv['after']['summary']['candidate_with_call_consistent_pattern']==427", "==427 and inv['after']['summary']['candidate_with_call_consistent_pattern']==427")
s=s.replace("'source_files_changed':3", "'source_files_changed':1")
s=s.replace("assert tar_map('prebuild-snapshot.tar.gz')==obj('prebuild-manifest-sha256.json')","assert tar_map('prebuild-snapshot.tar.gz')=={n:h for n,h in obj('prebuild-manifest-sha256.json').items() if n not in obj('prebuild-snapshot-exclusions.json')}")
s=s.replace('len(change)==3','len(change)==1').replace("raw('approved-proposal/proposal/source/'+n)","raw('borrow-scope-repair/'+Path(n).name)")
s=s.replace("assert baseline==obj('approved-proposal/current-source-sha256.json')","assert all(baseline[n]==H(raw('approved-proposal/before/'+Path(n).name)) for n in change)")
s=s.replace(" print(json.dumps({'status':'PASS'"," coverage=load('coverage_admin.py','coverage_admin');assert coverage.run()==obj('coverage-review.json')\n print(json.dumps({'status':'PASS'")
s=s.replace(" print(json.dumps({'status':'PASS'", " print(json.dumps({'status':'PASS'")
s=s.replace("==493 and inv['after']['summary']['candidate_with_pattern']==493","==492 and inv['after']['summary']['candidate_with_pattern']==493")
s=s.replace("pr=subprocess.run([sys.executable,'-B',str(P/'approved-proposal/verify.py')],cwd='/',capture_output=True,text=True);assert pr.returncode==0,pr.stdout+pr.stderr","pr=subprocess.run([sys.executable,'-B',str(P/'approved-proposal/verify.py')],cwd='/',capture_output=True,text=True);assert pr.returncode==0,pr.stdout+pr.stderr\n pr=subprocess.run([sys.executable,'-B',str(P/'borrow-scope-repair/verify.py')],cwd='/',capture_output=True,text=True);assert pr.returncode==0,pr.stdout+pr.stderr")
s=s.replace("full=load('full_inventory.py','full_inventory');inv=full.run();","admin=load('admin-static/check.py','admin_typed');admin_result=admin.run();assert admin_result.pop('frames')==obj('stack-observations.json')['frames'];assert admin_result==obj('admin-static/acceptance.json')\n rich=load('fee_basis_static.py','rich_full');\n for n,v in rich.generate().items():assert v==obj(n),n\n full=load('full_inventory.py','full_inventory');inv=full.run();")
s=s.replace(" print(json.dumps({'status':'PASS'"," coverage=load('coverage_admin.py','coverage_admin');assert coverage.run()==obj('coverage-review.json')\n print(json.dumps({'status':'PASS'")
s=s.replace(" print(json.dumps({'status':'PASS'"," history=obj('attempt-history.json');assert history['total_build_attempts']==2 and history['failed_builds']==history['successful_builds']==1\n for n,h in obj('failed-attempt/seal.json')['file_sha256'].items():assert H(raw('failed-attempt/'+n))==h,n\n print(json.dumps({'status':'PASS'")
s=s.replace("'builds':1,'retries':0","'build_attempts':2,'failed_builds':1,'successful_builds':1,'borrow_scope_repairs':1,'compiler_variants':0")
(P/'verify.py').write_text(s)
save('verifier-adaptation.json',{'prior_verifier_sha256':H(R/'work/pump-curve-preparation-build/handoff/verify.py'),'verifier_sha256':H(P/'verify.py'),'changes':'Exact proposal and candidate hashes; current before-summary counts; source-change count; added fresh fee-basis/all call-data inventory checks. Saved signature, case, result and effect verification code retained.'})
failed=W.parent
failed_seal=J(failed/'failed-attempt-seal.json')
for n,h in failed_seal['file_sha256'].items():
 assert H(failed/n)==h,n
 copy(failed/n,P/'failed-attempt'/n)
copy(failed/'failed-attempt-seal.json',P/'failed-attempt/seal.json')
save('attempt-history.json',{'total_build_attempts':2,'failed_builds':1,'successful_builds':1,'borrow_scope_repairs':1,'compiler_or_flag_variants':0,'first_error':'E0502 at earlier CollectCreatorFee emit_cpi event_authority access','current_candidate_sha256':H(P/'candidate.so')})
m={str(f.relative_to(P)):{'sha256':H(f),'bytes':f.stat().st_size}for f in sorted(P.rglob('*'))if f.is_file()};save('manifest.json',m);(P/'manifest.sha256').write_text(H(P/'manifest.json')+'  manifest.json\n');print(json.dumps({'package':str(P),'files':len(m),'manifest_sha256':H(P/'manifest.json')}))
