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
 replacements=[{'old':'python -B repro/layered-passes/pass-24/verify_review_applicability.py --repo .','new':'python -B repro/layered-passes/pass-24/ci-review-source-applicability/verify.py --repo .'}, {'old':'python -B repro/layered-passes/pass-24/verify_reconciliation.py --repo .','new':'python -B repro/layered-passes/pass-24/ci-review-reconciliation-v4/verify.py --repo .'}]
 after=before
 for row in replacements:assert after.count(row['old'])==1;after=after.replace(row['old'],row['new'])
 assert after==(R/'.github/workflows/verify.yml').read_text(),'Only exact two reviewed workflow commands may change'
 assert [n for n,h in bound.items()if H(R/n)!=h]==['.github/workflows/verify.yml']
 assert late['status_sha256']==bound['repro/status.json']and late['attributes_sha256']==bound['.gitattributes']
 result={'baseline_ref':'8e215d36ac2e91f3900a52ff9d002ded3de71a64','f4_package':F4,'f4_seal':F4SEAL,'latest_package':LATEST,'latest_seal':LSEAL,'bound_files':bound,'immutable_packages':packages,'incoming595':{n:h for n,h in incoming.items()if n not in ['.gitattributes','.github/workflows/verify.yml']},'incoming126':late['incoming'],'git_blobs':blobs,'archives':archives,'removed':sorted(removed),'compiled':compiled,'counts':counts,'source_layout':late['source_layout'],'source_scanner':late['source_scanner_path'],'source_scanner_sha256':late['source_scanner_sha256'],'relay':relay,'relay_source_map':rs,'workflow':{'before_sha256':bound['.github/workflows/verify.yml'],'after_sha256':hashlib.sha256(after.encode()).hexdigest(),'replacements':replacements},'excluded_commands':excludes,'attributes_witness':witness,'prior_saved_preparation':J(R/F4/'transition.json')['witness']['prior_preparation_saved_proof']}
 prior_path='repro/layered-passes/pass-24/ci-review-reconciliation';prior_seal='18d4a7816443d7c11363f2cc975b6311ae2689873130f31bb5d4bc88397185d4'
 sealed(R/prior_path,prior_seal);prior=J(R/prior_path/'bindings.json')
 import copy
 historical=copy.deepcopy(result);historical['workflow']=prior['workflow']
 assert historical==prior,'Re-derived original obligations must exactly equal frozen v1'
 assert result['workflow']['before_sha256']==prior['workflow']['before_sha256']
 assert result['workflow']['replacements'][0]==prior['workflow']['replacements'][0]
 assert result['workflow']['replacements'][1]['old']==prior['workflow']['replacements'][1]['old']
 pkg(prior_path,prior_seal)
 guard='repro/upstream-reconciliation/main-e8338e77';guardseal='2b52064d3d051a7a65a842cdfc5c3f076ae9d0aeb2d35f24aa72cb5d2f03f291';pkg(guard,guardseal)
 gb=J(R/guard/'bindings.json');pres=J(R/guard/'preservation.json');assert len(pres['files'])==30
 aliases={'programs/donation-relay/'+n:h for n,h in rs.items()};assert len(aliases)==23
 for n,h in aliases.items():put(n,h)
 put('programs/donation-relay/README.md',gb['working_readme_sha256']);put('programs/donation-relay/source-selected.json',gb['source_selected_metadata_sha256'])
 attrpath='repro/upstream-reconciliation/.gitattributes'
 exactattrs='# Preserve exact incoming source receipts.\nmain-e8338e77/incoming/programs/donation-relay/src/dispatch.rs -whitespace\nmain-e8338e77/incoming/programs/pump/src/create_v2.rs -whitespace\n'
 assert (R/attrpath).read_text()==exactattrs;put(attrpath,hashlib.sha256(exactattrs.encode()).hexdigest())
 result.update({'baseline_ref':'dc60aa15225ad11d01c9075a64707129941d5722','prior_current_companion':prior_path,'prior_current_seal':prior_seal,'new_incoming_guard':guard,'new_incoming_guard_seal':guardseal,'relay_active_alias_map':aliases,'new_incoming_git_blobs':pres['files'],'new_inactive_runner':'scripts/pump_create_mayhem_differential.py','parent_preservation_attributes':{'path':attrpath,'exact_text':exactattrs}})
 # Entire independently re-derived V2 composition must survive unchanged.
 v2path='repro/layered-passes/pass-24/ci-review-reconciliation-v2';v2seal='7785526f3925d3e78362d633e2313096e6726e981af8e20a859e27c796ef7565'
 sealed(R/v2path,v2seal);v2=J(R/v2path/'bindings.json');historical=copy.deepcopy(result);historical['workflow']=v2['workflow'];assert historical==v2
 from transition_v2_v3 import workflow_transition
 v3path='repro/layered-passes/pass-24/ci-review-reconciliation-v3';v3after=(R/v3path/'after-workflow.yml').read_text()
 assert workflow_transition((R/v2path/'after-workflow.yml').read_text(),v3after)==v3after
 pkg(v2path,v2seal)
 result.update({'prior_v2_companion':v2path,'prior_v2_seal':v2seal,'v2_workflow_sha256':H(R/v2path/'after-workflow.yml')})
 guard3='repro/upstream-reconciliation/main-2dd5c979';guard3seal='acb2397358ef1299297e946ac7ad1798fc9ba0e764e6a13cfa215e4ac99bd3c1'
 pkg(guard3,guard3seal);pres3=J(R/guard3/'preservation.json');assert len(pres3['files'])==8
 assert pres3['incoming_commit']=='2dd5c97928a6a0e5c756dbbd0b25c798e8c2dd5b'and pres3['baseline_commit']=='e8338e77bcfb171ead2c2181c57782009db7d3a0'
 inactive3=['programs/pump/src/incentives.rs','programs/pump/src/token_incentives/claim_token_incentives.rs','programs/pump/src/token_incentives/mod.rs','scripts/pump_v3_token_extensions_differential.py']
 passive='repro/parallel-work/2026-10-25/independent-reconstruction-review/RECONCILIATION-DROPPED-RECOVERIES-RESTORED.md'
 assert set(pres3['files'])==set(inactive3)|{'programs/pump/src/lib.rs','programs/pump/src/trade.rs','programs/pump/src/volume_sync.rs',passive}
 put(passive,pres3['files'][passive]['sha256'])
 result.update({'newest_incoming_guard':guard3,'newest_incoming_guard_seal':guard3seal,'newest_incoming_git_blobs':pres3['files'],'newest_inactive_paths':inactive3,'newest_passive_doc':passive})
 v3seal='dd9c12410269611c7fe18c866d6b3856bd30cc9ffa53b10c4d2c47cbe893d37f';sealed(R/v3path,v3seal);v3=J(R/v3path/'bindings.json');historical=copy.deepcopy(result);historical['workflow']=v3['workflow'];assert historical==v3
 from transition import workflow_transition as v3_transition
 assert v3_transition(v3after,after)==after
 assert H(P/'transition_v2_v3.py')==H(R/v3path/'transition.py')
 pkg(v3path,v3seal)
 result.update({'prior_v3_companion':v3path,'prior_v3_seal':v3seal})
 guard4='repro/upstream-reconciliation/main-da40426b';guard4seal='c38e571be50e3c9b40de3586bb7d67677e749818920f02d2dec1a12a4a7039e9';pkg(guard4,guard4seal);pres4=J(R/guard4/'preservation.json')
 assert pres4['incoming_commit']=='da40426bddbcecff9ba8d47494299f9479ff0179'and pres4['baseline_commit']=='a71de2091f0ab56a4eb2996777f0ecbf51986aa3'
 restored4=['programs/mayhem/src/lib.rs','programs/pump/src/create_v2.rs','programs/pump/src/lib.rs','programs/pump/src/trade.rs','programs/pump/src/volume_sync.rs']
 inactive4=['programs/pump/src/incentives.rs','programs/pump/src/mayhem_virtual_params.rs','programs/pump/src/token_incentives/claim_token_incentives.rs','programs/pump/src/token_incentives/mod.rs','scripts/pump_set_mayhem_virtual_params_differential.py','scripts/fixtures/signer_stub.so','scripts/fixtures/signer_stub/Cargo.toml','scripts/fixtures/signer_stub/src/lib.rs']
 passive4=['repro/parallel-work/2026-10-25/independent-reconstruction-review/BYTE-IDENTICALITY-DEFINITIVE-REPORT.md','repro/parallel-work/2026-10-25/independent-reconstruction-review/SET-MAYHEM-VIRTUAL-PARAMS-RECOVERY.md']
 assert len(pres4['files'])==15 and set(pres4['files'])==set(restored4+inactive4+passive4)
 for n in passive4:put(n,pres4['files'][n]['sha256'])
 for n in restored4:assert bound[n]==pres4['files'][n]['selected_restore_sha256']
 result.update({'da404_guard':guard4,'da404_guard_seal':guard4seal,'da404_incoming':pres4['files'],'da404_restored':restored4,'da404_inactive':inactive4,'da404_passive':passive4})
 return result,before,after
