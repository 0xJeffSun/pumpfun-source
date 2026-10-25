"""One-time binding of immutable old records and exact two-line current CI transition."""
from pathlib import Path
import json,hashlib,subprocess
P=Path(__file__).resolve().parent;R=P.parents[3]
J=lambda p:json.loads(p.read_text());H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
F4='repro/layered-passes/pass-24/reconciliation-current';F4SEAL='f4e928091cb9271bd90c2d597805935ce1a5702ca069a59f8d390bd1f232551c'
LATEST='repro/layered-passes/pass-24/latest-main-retention';LSEAL='28e7cdb6e65c095c9b6d5dda774ad0937f0809ba2c61f6d206a2f7e19f3f69df'
def gather():
 from common import sealed
 packages={};bound={};blobs={};archives={};removed=set()
 def pkg(n,seal):
  assert packages.get(n,seal)==seal,n;sealed(R/n,seal);packages[n]=seal
 def put(n,h):
  assert bound.get(n,h)==h,(n,bound.get(n),h);bound[n]=h
 pkg(F4,F4SEAL);fq=R/F4/'reviewed-plan';fz=J(fq/'plan.json');pkg(F4+'/reviewed-plan',J(R/F4/'transition.json')['reviewed_plan_seal'])
 pkg(LATEST,LSEAL);late=J(R/LATEST/'retention.json');assert late['incoming_commit']=='ef327155c9a218401b2538193ab1ca4eeeb53b0b'and late['base_commit']=='a73a4f2e542135b7eb2071f2d520ca722a228e18'and late['only_additions']and not late['protected_namespaces_changed_in_incoming']and late['source_input_count_sum']==107
 oldp=R/fz['old_transition_path'];pkg(fz['old_transition_path'],fz['old_transition_seal']);oq=oldp/'reviewed-plan';pkg(fz['old_transition_path']+'/reviewed-plan',J(oldp/'transition.json')['reviewed_plan_sha256']);old=J(oq/'historical-reconciliation.json');oz=J(oq/'plan.json');pkg(fz['historical_path'],fz['historical_seal'])
 np=R/fz['new_foreign_path'];pkg(fz['new_foreign_path'],fz['new_foreign_seal']);new=J(np/'frozen.json');base=J(np/'baseline-bindings.json')
 for key in ['immutable_files','archived','removed','excluded_commands','programs','allowed_noncompiler_transitions','extra_audit_bindings']:assert new[key]==base[key]
 for n,seal in new['immutable_packages'].items():pkg(n,seal)
 expected={**new['immutable_files'],**{n:v['after_sha256']for n,v in new['transitions'].items()}}
 for n,h in expected.items():
  if n in fz['new_foreign_current_exceptions']:
   row=fz['new_foreign_current_exceptions'][n];assert row['incoming_or_prior']==h;h=row['current']
  put(n,h)
 foreign=oz['foreign'];doc=foreign['incoming_doc'];assert len(old['exact_preserved_incoming_files'])==59
 for n in old['exact_preserved_incoming_files']:
  h=old['incoming_files'][n]
  if n==doc:assert h==foreign['incoming_before_sha256'];assert new['transitions'][n]['prior_binding_sha256']==foreign['incoming_after_sha256'];h=new['transitions'][n]['after_sha256']
  elif n in new['transitions']:assert new['transitions'][n]['prior_binding_sha256']==h;h=new['transitions'][n]['after_sha256']
  put(n,h)
 pkg('repro/upstream-reconciliation/main-efcddc99-ci-review-transition',fz['foreign_seal'])
 for n,row in foreign['changed_files'].items():blobs[fz['old_transition_path']+'/reviewed-plan/foreign-1d/'+n]={'sha256':row['sha256'],'git_blob':row['git_blob']}
 for n,row in old['archived_stopped_source'].items():archives[row['archive_path']]={'sha256':row['incoming_sha256'],'scope':'opaque bytes only'};assert row['incoming_sha256']==old['incoming_files'][n]
 removed.update(old['removed_from_active_compiler_discovery'])
 for n,h in old['protected_current_files'].items():put(n,fz['protected_current_exceptions'].get(n,h))
 for n,h in old['exception_current_sha256'].items():
  if n not in ['.gitattributes','.github/workflows/verify.yml']:put(n,h)
 incoming=J(fq/'incoming597.json');assert len(incoming)==597
 for n,h in incoming.items():
  if n not in ['.gitattributes','.github/workflows/verify.yml']:put(n,h)
 assert len(late['incoming'])==126
 for n,row in late['incoming'].items():put(n,row['sha256']);blobs[n]={'sha256':row['sha256'],'git_blob':row['git_blob'],'bytes':row['bytes']}
 pkg(fz['trade_path'],fz['trade_seal']);trade=J(R/fz['trade_path']/'preservation.json');archives[trade['archive_path']]={'sha256':trade['incoming_sha256'],'git_blob':trade['incoming_git_blob_sha1'],'scope':'opaque bytes only'};put(trade['active_path'],trade['active_sha256'])
 pkg(late['aa0_package'],late['aa0_manifest_seal']);aa=J(R/late['aa0_package']/'preservation.json');assert not aa['incoming_source_semantics_reviewed']and aa['incoming_commit'].startswith('aa0b1f5b')and aa['selected_commit']=='a73a4f2e542135b7eb2071f2d520ca722a228e18'and aa['new_builds']==aa['new_target_executions']==0
 for n,row in aa['files'].items():
  archives[row['archive_path']]={'sha256':row['incoming_sha256'],'git_blob':row['incoming_git_blob'],'scope':'opaque bytes only'}
  if row['selected_exists']:put(n,row['selected_sha256'])
  else:removed.add(n)
 counts={'pump':37,'pump_amm':30,'pump_fees':26,'mayhem':14};compiled=J(fq/'compiled107.json');assert set(compiled)==set(counts)
 for key,row in compiled.items():
  assert row['source']==late['source_maps'][key]and len(row['source'])==counts[key]
  selected=late['selected_reports'][key];assert(row['report'],row['candidate'],row['report_sha256'],row['candidate_sha256'])==(selected['comparison_report'],selected['candidate_artifact'],selected['comparison_report_sha256'],selected['candidate_sha256'])
  put(row['report'],row['report_sha256']);put(row['candidate'],row['candidate_sha256'])
  for n,h in row['source'].items():put(n,h)
 for n,h in fz['helpers'].items():put(n,h)
 for n,h in fz['metadata_hashes'].items():put(n,h)
 put('programs/pump/README.md','4df246f50e279df75cfdc85c064b72e16b4eaf0ec65c4e82adebaf0d78d757c5')
 put(late['source_scanner_path'],late['source_scanner_sha256'])
 attr=J(fq/'attributes-preservation.json');witness={**attr['exact_frozen_payloads'],**attr['exact_incoming_payloads']};assert len(witness)==26
 for n,h in witness.items():put(n,h)
 for n,seal in fz['attributes_packages'].items():pkg(n,seal)
 pkg('repro/pump/admin-cto-compared-errors-main-fortyeight',fz['main_seal']);pkg('repro/pump/admin-cto-compared-errors-fortyeight',fz['scratch_seal'])
 relay=J(fq/'relay-current.expected.json');rp=str(Path(relay['evidence_manifest']).parent);pkg(rp,fz['relay_seal']);put(relay['candidate_artifact'],relay['candidate_sha256']);put(rp+'/unstripped.so',relay['symbols_sha256']);rs=J(R/relay['source_manifest']);assert len(rs)==23
 for n,h in rs.items():put(relay['source_snapshot']+'/'+n,h)
 # Every before/after saved transition remains bound by its immutable parent package.
 excludes=sorted(set(old['excluded_execution_commands'])|set(new['excluded_commands'])|{'pump_create_mayhem_differential.py'})
 for n in ['repro/layered-passes/pass-24/verify_review_applicability.py','repro/layered-passes/pass-24/verify_reconciliation.py']:put(n,H(R/n))
 pkg('repro/layered-passes/pass-24/ci-relay-signature-portability','53ba64d2757e16eecd8a57af0bc5e6a305c950d49148c37a65ad4706c75a82ad')
 n='repro/layered-passes/pass-24/ci-review-source-applicability';pkg(n,H(R/n/'manifest.json'))
 before=(fq/'workflow.expected.yml').read_text();assert H(fq/'workflow.expected.yml')==late['workflow_sha256']==bound['.github/workflows/verify.yml']
 replacements=[{'old':'python -B repro/layered-passes/pass-24/verify_review_applicability.py --repo .','new':'python -B repro/layered-passes/pass-24/ci-review-source-applicability/verify.py --repo .'}, {'old':'python -B repro/layered-passes/pass-24/verify_reconciliation.py --repo .','new':'python -B repro/layered-passes/pass-24/ci-review-reconciliation/verify.py --repo .'}]
 after=before
 for row in replacements:assert after.count(row['old'])==1;after=after.replace(row['old'],row['new'])
 assert after==(R/'.github/workflows/verify.yml').read_text(),'Only exact two reviewed workflow commands may change'
 assert [n for n,h in bound.items()if H(R/n)!=h]==['.github/workflows/verify.yml']
 assert late['status_sha256']==bound['repro/status.json']and late['attributes_sha256']==bound['.gitattributes']
 return {'baseline_ref':'8e215d36ac2e91f3900a52ff9d002ded3de71a64','f4_package':F4,'f4_seal':F4SEAL,'latest_package':LATEST,'latest_seal':LSEAL,'bound_files':bound,'immutable_packages':packages,'incoming595':{n:h for n,h in incoming.items()if n not in ['.gitattributes','.github/workflows/verify.yml']},'incoming126':late['incoming'],'git_blobs':blobs,'archives':archives,'removed':sorted(removed),'compiled':compiled,'counts':counts,'source_layout':late['source_layout'],'source_scanner':late['source_scanner_path'],'source_scanner_sha256':late['source_scanner_sha256'],'relay':relay,'relay_source_map':rs,'workflow':{'before_sha256':bound['.github/workflows/verify.yml'],'after_sha256':hashlib.sha256(after.encode()).hexdigest(),'replacements':replacements},'excluded_commands':excludes,'attributes_witness':witness,'prior_saved_preparation':J(R/F4/'transition.json')['witness']['prior_preparation_saved_proof']},before,after
