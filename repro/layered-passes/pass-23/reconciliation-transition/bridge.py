"""Saved-only pass23 reconciliation transition; no Git/build/target calls."""
from pathlib import Path,PurePosixPath
import hashlib,json,re,ast,tarfile
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def manifest(P,seal):
 assert H(P/'manifest.json')==seal and(P/'manifest.sha256').read_text().split()[0]==seal
 m=J(P/'manifest.json');assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']}
 for n,v in m.items():
  f=P/n;assert not f.is_symlink();h=v['sha256']if isinstance(v,dict)else v;assert H(f)==h,n
 return m
def check_foreign(P,R,z):
 assert z['commit']=='1d4f401d568e9e0d452a60fe036a1d0db211731d'and z['base']=='4c782d2f6dbf53f66c6eb0a0074728a963f152fe'
 files=z['changed_files'];assert len(files)==z['path_count']==15
 package='repro/upstream-reconciliation/main-efcddc99-ci-review-transition'
 docs='repro/parallel-work/2026-10-25/independent-reconstruction-review/'
 expected={'.github/workflows/verify.yml',docs+'COMPILER-CORRECTION.md',docs+'FULL-GAP-REPORT.md',docs+'RECIPE-REVERSE-ENGINEERING.md',docs+'v1.43-recipe-switch/RETRACTED.md'}|{package+'/'+n for n in ['README.md','after-full-gap-report.md','after-workflow.yml','before-full-gap-report.md','before-workflow.yml','manifest.json','manifest.sha256','transition.json','verification.json','verify.py']}
 assert set(files)==expected
 for n,v in files.items():
  f=P/'foreign-1d'/n;raw=f.read_bytes();assert not f.is_symlink()and H(f)==v['sha256'],n
  assert hashlib.sha1(b'blob '+str(len(raw)).encode()+b'\0'+raw).hexdigest()==v['git_blob'],n
  if n!='.github/workflows/verify.yml':assert not(R/n).is_symlink()and(R/n).read_bytes()==raw,n
 Q=P/'foreign-1d'/package;manifest(Q,z['transition_seal']);manifest(R/package,z['transition_seal'])
 assert z['transition_path']==package and z['transition_seal']=='9e4f00194fe212e3cb8da5b4bcc98e036e652e419ff8db5d900a4173aba77d0f'
 assert z['incoming_doc']==docs+'FULL-GAP-REPORT.md'
 assert H(Q/'before-full-gap-report.md')==z['incoming_before_sha256']=='604a8a0dd613433b59cb9e330e3b2e5a7e16345421cdb6b489f51c7e49b8868d'
 assert H(Q/'after-full-gap-report.md')==z['incoming_after_sha256']==files[z['incoming_doc']]['sha256']
 assert(Q/'before-workflow.yml').read_bytes()==(P/'workflow.before.yml').read_bytes()
 assert(Q/'after-workflow.yml').read_bytes()==(P/'foreign-1d/.github/workflows/verify.yml').read_bytes()
 assert z['workflow_historical_only']is True
 return {'foreign_commit':z['commit'],'foreign_manifest_seal':z['transition_seal'],'exact_foreign_changed_paths':15,'unchanged_active_compile_paths_in_foreign_delta':True,'incoming_doc_before_sha256':z['incoming_before_sha256'],'incoming_doc_after_sha256':z['incoming_after_sha256'],'foreign_workflow_preserved_historical_only':True,'foreign_verifier_executed':False}

def check_preparation(P,R,z):
 path=z['path'];before=(P/'prepare-helper.before.py').read_bytes();after=(R/path).read_bytes();assert H(R/path)==z['after_sha256']=='61c077ada4048a9113f56a2aaab5ca81edbbf767df6683f28a097316dc4abecb'
 assert hashlib.sha256(before).hexdigest()==z['before_sha256'];assert hashlib.sha1(b'blob '+str(len(before)).encode()+b'\0'+before).hexdigest()==z['before_git_blob']
 V=R/z['review_path'];manifest(V,z['review_seal']);assert z['review_seal']=='6e07cca590dc13c0e27fa15bfe4faf103b634fb641c73f009627585ff8a31033';assert after==(V/'helper.py').read_bytes()==(P/'focused-preparation-review/helper.py').read_bytes()
 # Apply the reviewed literal unified diff in memory, requiring every old context line.
 old=before.decode().splitlines(True);patch=(V/'helper.patch').read_text().splitlines(True);out=[];cursor=0;i=0
 while i<len(patch):
  line=patch[i]
  if not line.startswith('@@ '):i+=1;continue
  header=re.match(r'@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@',line);assert header
  start=int(header[1])-1;assert cursor<=start;out.extend(old[cursor:start]);cursor=start;i+=1;consumed=produced=0
  while i<len(patch)and not patch[i].startswith('@@ '):
   line=patch[i]
   if line.startswith(' '):assert old[cursor]==line[1:];out.append(line[1:]);cursor+=1;consumed+=1;produced+=1
   elif line.startswith('-'):assert old[cursor]==line[1:];cursor+=1;consumed+=1
   elif line.startswith('+'):out.append(line[1:]);produced+=1
   elif line.startswith('\\'):pass
   else:raise AssertionError('Unexpected patch line')
   i+=1
  assert consumed==int(header[2] or 1)and produced==int(header[4] or 1)
 out.extend(old[cursor:]);assert ''.join(out).encode()==after
 declarations={}
 for n in ast.parse(after).body:
  if isinstance(n,ast.Assign)and len(n.targets)==1 and isinstance(n.targets[0],ast.Name)and n.targets[0].id in['HISTORICAL_SEAL','CURRENT_CHECKPOINTS']:declarations[n.targets[0].id]=ast.literal_eval(n.value)
 assert declarations=={'HISTORICAL_SEAL':z['historical_seal'],'CURRENT_CHECKPOINTS':{z['current_package']:z['current_seal']}}
 historical=R/z['historical_package'];manifest(historical,z['historical_seal']);assert z['historical_seal']=='92e0f76ab475510b403d7a32b7654b2dab8ae697a89c6a24add7ed278789bc67'
 review=J(V/'test-results.json');assert all(c['pass']for c in review['cases'])and review['target_executions']==0
 repeat=R/z['repeat_path'];failure=R/z['initial_failure_path'];manifest(repeat,z['repeat_seal']);manifest(failure,z['initial_failure_seal'])
 assert J(repeat/'exits.json')['prepare']==J(repeat/'exits.json')['focused20']==0
 assert J(failure/'exits.json')['exact_focused20_returncode']==1 and J(failure/'exits.json')['receipt_created']is False
 assert J(repeat/'before.json')==J(repeat/'after.json')
 w=J(repeat/'prepared/source-binding-witness.json');assert w['historical_manifest_sha256']==z['historical_seal']and w['current']['manifest_sha256']==z['current_seal']and w['current']['candidate_sha256']==J(P/'plan.json')['candidate']
 assert w['new_source_sha256']==J(P/'plan.json')['fees_source26']and w['target_executions']==0
 archive=historical/'runtime-repository.tar.gz';assert H(archive)==w['historical_archive_sha256'];members=0
 with tarfile.open(archive)as t:
  for item in t:
   if not item.name.startswith('validation-layer/'):continue
   if item.isdir():continue
   assert item.isfile();raw=t.extractfile(item).read();members+=1
   if item.name=='validation-layer/corrected-source-sha256.json':assert json.loads(raw)==w['old_source_sha256']
   else:assert(repeat/'prepared'/item.name).read_bytes()==raw,item.name
 assert members==22
 for n,h in w['harness_sha256'].items():assert H(repeat/'prepared'/n)==h,n
 assert J(repeat/'receipt.json')['case_count']==20 and not J(repeat/'receipt.json')['mismatches']
 return {'helper_after_sha256':z['after_sha256'],'review_seal':z['review_seal'],'literal_old_blob_patch_to_after':True,'known_packages':declarations,'unchanged_validation_layer_archive_members_except_source_map':members-1,'initial_failed_outer_exit_preserved':1,'reviewed_repeat_outer_exit':0,'new_target_executions':0}

def check(P,R,attrsha):
 R=R.resolve();z=J(P/'plan.json');old=J(P/'historical-reconciliation.json');O=R/'repro/upstream-reconciliation/main-efcddc99';manifest(O,z['historical_seal']);assert H(P/'historical-manifest.json')==z['historical_seal'];assert(O/'reconciliation.json').read_bytes()==(P/'historical-reconciliation.json').read_bytes()
 assert len(old['exact_preserved_incoming_files'])==59 and len(old['archived_stopped_source'])==5 and len(old['removed_from_active_compiler_discovery'])==3
 for n in old['exact_preserved_incoming_files']:
  if n==z['foreign']['incoming_doc']:assert old['incoming_files'][n]==z['foreign']['incoming_before_sha256']and H(R/n)==z['foreign']['incoming_after_sha256']
  else:assert H(R/n)==old['incoming_files'][n],n
 foreign=check_foreign(P,R,z['foreign'])
 for n,v in old['archived_stopped_source'].items():assert H(R/v['archive_path'])==v['incoming_sha256']==old['incoming_files'][n],n
 for n in old['removed_from_active_compiler_discovery']:assert not(R/n).exists(),n
 allowed=set(z['permitted_changed_protected']);assert allowed=={'programs/pump-fees/src/sharing.rs','programs/pump-fees/README.md','repro/status.json'}
 for n,h in old['protected_current_files'].items():
  if n not in allowed:assert H(R/n)==h,n
 for n,h in old['exception_current_sha256'].items():
  if n not in['.gitattributes','.github/workflows/verify.yml']:assert H(R/n)==h,n
 F=R/'repro/pump_fees/sharing-authorize-main-v144';manifest(F,z['fees_seal']);assert H(P/'fees/manifest.json')==z['fees_seal']=='4049a50a07bfb8a4c51b95776607e86abc3ca1588a8d29f7dfde769a5ed51135'
 report=J(F/'main/build-comparison.json');assert report==J(P/'fees/build-comparison.json');source=report['source_sha256'];assert source==z['fees_source26']and len(source)==26
 for n,h in source.items():assert H(R/n)==H(F/'source'/n)==h,n
 assert H(F/'main/candidate.so')==z['candidate']==report['comparison']['candidate_sha256'];identity=J(F/'controls/identity.json');assert identity==J(P/'fees/identity.json')and identity['whole_candidate_equal']and identity['whole_symbols_equal']
 assert J(R/'repro/status.json')==J(P/'status.expected.json');before=J(P/'status.before.json');after=J(P/'status.expected.json');assert set(before)==set(after)and[k for k in before if before[k]!=after[k]]==['pump_fees']
 fee=after['pump_fees'];assert fee['candidate_artifact']=='repro/pump_fees/sharing-authorize-main-v144/main/candidate.so'and fee['comparison_report']=='repro/pump_fees/sharing-authorize-main-v144/main/build-comparison.json';assert H(R/fee['candidate_artifact'])==z['candidate']
 workflow=(P/'workflow.before.yml').read_bytes();blob=hashlib.sha1(b'blob '+str(len(workflow)).encode()+b'\0'+workflow).hexdigest();assert blob==z['workflow_before_git_blob']
 for r in z['workflow_replacements']:
  assert workflow.count(r['old'].encode())==r['count']and r['count']>0;workflow=workflow.replace(r['old'].encode(),r['new'].encode())
 needle=z['workflow_insertion_after'].encode();assert workflow.count(needle)==1;workflow=workflow.replace(needle,needle+z['workflow_inserted_line'].encode())
 assert b'main-efcddc99-ci-review-transition/verify.py --current .'not in workflow
 assert workflow==(P/'workflow.expected.yml').read_bytes()==(R/'.github/workflows/verify.yml').read_bytes()
 for command in old['excluded_execution_commands']:assert command.encode()not in workflow
 # Protected Pump37 is checked only by exact hashes/maps, never by executing stopped code.
 pump=J(R/'repro/pump/admin-cto-error-batch-main-fortyeight/main/build-comparison.json')['source_sha256'];assert len(pump)==37
 for n,h in pump.items():assert old['protected_current_files'][n]==H(R/n)==h,n
 attrs=(R/'.gitattributes').read_bytes();base=(P/'attributes.before').read_bytes();assert H(R/'.gitattributes')==attrsha==z['attributes_expected_sha256'] and attrs.startswith(base)
 assert attrs==(P/'attributes.expected').read_bytes()
 assert H(P/'attributes.before')==old['exception_current_sha256']['.gitattributes']
 extras=attrs[len(base):];witness={}
 for line in extras.decode().splitlines():
  if not line.strip()or line.startswith('#'):continue
  match=re.fullmatch(r'(repro/[^\s*?\[\]{}\\]+) -whitespace',line);assert match,line
  n=match.group(1);path=PurePosixPath(n);assert'..'not in path.parts;f=R/n;assert f.is_file()and not f.is_symlink()and f.resolve()==f
  witness[n]=H(f)
 helper=check_preparation(P,R,z['preparation_helper'])
 assert witness==z['attributes_appended_files']and len(witness)==6
 return{'historical_scope':'immutable pass22 reconciliation; old current verifier intentionally not run/claimed applicable','transition_scope':'pass23 exact Fee/status/workflow and append-only frozen whitespace exception bridge','preserved_incoming':58,'reviewed_exact_incoming_doc_transition':foreign,'archived_stopped_source':5,'removed_active_paths':3,'protected_pump_inputs':37,'fees_source_inputs':26,'attributes_sha256':attrsha,'attributes_appended_files':witness,'status_sha256':H(R/'repro/status.json'),'workflow_sha256':H(R/'.github/workflows/verify.yml'),'fees_candidate':z['candidate'],'preparation_helper_witness':helper,'new_builds':0,'new_target_executions':0,'research_semantics_reverified':False}
