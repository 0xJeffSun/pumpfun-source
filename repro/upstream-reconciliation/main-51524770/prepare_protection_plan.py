from pathlib import Path
import json,hashlib,subprocess,os,collections
R=Path.cwd();P=Path(__file__).resolve().parent;env={**os.environ,'GIT_OPTIONAL_LOCKS':'0'};REFS=json.loads((P/'refs.json').read_text())['pinned']
H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p,d:p.write_text(json.dumps(d,indent=2)+'\n')
get=lambda ref,path:subprocess.run(['git','show',ref+':'+path],capture_output=True,check=True,env=env).stdout
root={r['path']:r for r in json.loads((P/'root-full-tree-membership.json').read_text())['entries'] if r['kind']!='tree'}
base={r['path']:r for r in json.loads((P/'base-full-tree-membership.json').read_text())['entries'] if r['kind']!='tree'}
incoming={r['path']:r for r in json.loads((P/'incoming-full-tree-membership.json').read_text())['entries'] if r['kind']!='tree'}
rows=json.loads((P/'incoming-exact-358-records.json').read_text());incoming_paths={r['path'] for r in rows}
bindpath='repro/layered-passes/pass-25/current-reconciliation/bindings.json';binding=get(REFS['root'],bindpath);B=json.loads(binding)
(P/'P25-known-bindings.json').write_bytes(binding)
protected={}
def protect(path,role,expected=None):
 rec=root[path];payload=get(REFS['root'],path);digest=H(payload)
 if expected is not None:assert digest==expected,(path,digest,expected)
 if path not in protected:protected[path]={**rec,'sha256':digest,'bytes':len(payload),'roles':[]}
 protected[path]['roles'].append(role)
 return protected[path]
for role,c in B['compiled'].items():
 for path,digest in c['source'].items():protect(path,'compiled-'+role,digest)
assert len({p for p,r in protected.items() if any(x.startswith('compiled-') for x in r['roles'])})==107
for path,digest in B['relay']['source23'].items():protect('programs/donation-relay/'+path,'relay-canonical23',digest)
for path,digest in B['assets'].items():protect(path,'P25-asset-helper-workflow',digest)
protect('repro/status.json','selected-core-status');protect('repro/donation-relay/current.json','selected-Relay-current')
protect('programs/donation-relay/README.md','Relay-canonical-README',B['relay']['canonical_readme_sha256'])
protect('programs/donation-relay/source-selected.json','Relay-canonical-alias',B['relay']['source_selected_sha256'])
assert json.loads(get(REFS['root'],'repro/status.json'))==B['status']
assert json.loads(get(REFS['root'],'repro/donation-relay/current.json'))==B['relay']['current']
J(P/'P25-protected-paths.json',{'pinned_commit':REFS['root'],'binding_path':bindpath,'binding_sha256':H(binding),'unique_protected_paths':len(protected),'compiled_unique_paths':107,'Relay_canonical_paths':23,'records':list(sorted(protected.values(),key=lambda x:x['path']))})
newmanual={'.github/workflows/search-dependency.yml','scripts/search_dependency_commit.py'}
restore=[];absent=[];retain=[]
for r in rows:
 path=r['path']
 if path in protected:
  restore.append({'path':path,'before_incoming':r['before'],'incoming':r['after'],'selected_P25':protected[path],'disposition':'restore exact accepted pinned source; no incoming body interpretation'})
 elif path.startswith(('programs/','scripts/fixtures/')) or (path.startswith('scripts/') and path not in newmanual):
  assert path not in root
  absent.append({'path':path,'incoming':r['after'],'selected_P25_absence':True,'disposition':'preserve opaque archive, remove from future active merge before checks; no interpretation or execution'})
 else:
  assert path.startswith(('repro/','docs/')) or path in newmanual,path
  retain.append({'path':path,'incoming':r['after'],'disposition':'retain exact passive witness; no compilation/runtime/promotion','manual_only_unapproved_search_recipe':path in newmanual})
assert len(restore)==5 and len(absent)==10 and len(retain)==343
J(P/'restoration-exact5.json',restore);J(P/'inactive-exact10.json',absent);J(P/'passive-retention-exact343.json',retain)
J(P/'three-way-overlap-metadata.json',[{'path':r['path'],'base2508':r['before'],'incoming515':r['after'],'root576':protected.get(r['path'],root.get(r['path'])),'root_changed_from_base':root.get(r['path'])!=base.get(r['path'])} for r in rows])
newscript='scripts/search_dependency_commit.py';newworkflow='.github/workflows/search-dependency.yml'
scriptset=sorted([*B['script_set'],newscript]);workflowset=sorted([*B['workflow_set'],newworkflow])
assert len(scriptset)==187 and len(workflowset)==6
J(P/'proposed-final-script-workflow-sets.json',{'status':'PLAN_ONLY_UNEXECUTED','prior_script_count':186,'proposed_script_count':187,'prior_workflow_count':5,'proposed_workflow_count':6,'script_set':scriptset,'workflow_set':workflowset,'added_passive_assets':[r for r in retain if r['path'] in newmanual],'automatic_dispatch_authorized':False,'passive_search_recipe_approved':False,'note':'Any newly reviewed root current-guard endpoint rewrite requires an exact separately sealed workflow replacement; no additional script/workflow member is implicitly permitted.'})
guards=[]
for folder in ['current-applicability','current-reconciliation','current-proposal-v7']:
 path='repro/layered-passes/pass-25/'+folder+'/manifest.json';data=get(REFS['root'],path);side=get(REFS['root'],path[:-4]+'sha256').decode() if False else get(REFS['root'],'repro/layered-passes/pass-25/'+folder+'/manifest.sha256').decode()
 digest=H(data);assert side.split()[0]==digest
 guards.append({'path':path,'git_oid':root[path]['oid'],'sha256':digest,'sidecar':side.strip(),'immutable_historical':True,'execute_as_current_on_new_state':False})
J(P/'immutable-P25-guard-pins.json',guards)
A=R/'work/amm-owner6048-managed-main-plan-v1';plan=json.loads((A/'plan.json').read_text());before=json.loads((A/'witness/baseline-source30.json').read_text());after=json.loads((A/'witness/proposed-source30.json').read_text());changed=[p for p in before if before[p]!=after[p]]
assert changed==['programs/pump-amm/src/collect.rs'] and before==B['compiled']['pump_amm']['source']
future={'status':'UNBOUND_REQUIRES_SEPARATE_ROOT_SELECTION','selected_now_by_this_plan':False,'old_candidate':plan['old_selected_candidate'],'expected_scratch_candidate_not_selection':plan['expected_candidate_from_actual_scratch'],'expected_symbols_not_selection':plan['expected_symbols_from_actual_scratch'],'source_proof_seal':plan['source_proof_seal'],'exact_source_transition':{'path':changed[0],'before_sha256':before[changed[0]],'proposed_sha256':after[changed[0]],'other29AMM_source_paths_unchanged':True},'root_selection_commit':None,'root_selection_seal':None,'genuine_managed_main_seal':None,'status_readme_helper_transition_seal':None,'guard_acceptance_rule':'No old/new hash alternative: freeze one effective accepted source107/status/README/helper snapshot only after separate root selection. If selection precedes merge, restore from that exact accepted selection commit plus reviewed delta instead of blindly restoring collect.rs from576.'}
J(P/'future-AMM09be-transition.UNBOUND.json',future)
summary={'pinned':REFS,'merge_base':REFS['base'],'incoming_changed_paths':358,'incoming_added':353,'incoming_modified':5,'incoming_deleted':0,'renames':0,'root_to_incoming_differences':5555,'restore_existing_source_paths':5,'quarantine_new_active_paths':10,'retain_passive_paths':343,'passive_repro_paths':sum(x['path'].startswith('repro/') for x in retain),'passive_docs_paths':sum(x['path'].startswith('docs/') for x in retain),'passive_manual_search_paths':2,'prior_workflows_scripts':[5,186],'proposed_workflows_scripts':[6,187],'no_fetch_merge_checkout_reset_index_or_active_write':True}
J(P/'SUMMARY.json',summary)
# Freeze raw archive independently so the next guard proposal can bind a known seal without a self-reference cycle.
archive_names=['refs.json','base-full-tree-membership.json','incoming-full-tree-membership.json','root-full-tree-membership.json','base2508-to-incoming515.json','base2508-to-root576.json','root576-to-incoming515.json','rename-aware-name-status.raw','rename-aware-diff.json','opaque-object-inventory.json','incoming-exact-358-records.json']
archive_names += [str(f.relative_to(P)) for f in (P/'opaque-objects').rglob('*') if f.is_file()]
records={n:{'sha256':H((P/n).read_bytes()),'bytes':(P/n).stat().st_size} for n in sorted(archive_names)}
data=(json.dumps({'scope':'Opaque exact pinned515 incoming changed blobs, full memberships and canonical/no-truncation diffs only','files':records},indent=2)+'\n').encode();(P/'opaque-archive-manifest.json').write_bytes(data);aseal=H(data);(P/'opaque-archive-manifest.sha256').write_text(aseal+'  opaque-archive-manifest.json\n')
proposal={'status':'PLAN_ONLY_NOT_EXECUTED','version':'pass26-pinned515-v1','prior_guard_pins':guards,'incoming_opaque_archive_manifest':'opaque-archive-manifest.json','incoming_opaque_archive_known_seal':aseal,'incoming_expected_changes':358,'passive_retention_records':'passive-retention-exact343.json','protected_baseline_records':'P25-protected-paths.json','exact_restorations':'restoration-exact5.json','exact_active_absences':'inactive-exact10.json','script_workflow_sets':'proposed-final-script-workflow-sets.json','future_AMM_transition':'future-AMM09be-transition.UNBOUND.json','required_checks':['Authenticate exact incoming archive seal/all raw Git object OIDs/raw hashes/modes and full membership before current checks','Preserve every343 passive incoming path byte/mode-exact unless root separately reviews a named replacement; no evidence/script executes merely because inherited','Keep all10 inactive paths absent; verify all107 compiled paths and23 Relay canonical paths from one effective accepted snapshot','Preserve existing status/alias/README/helpers and prior protected assets, with only a separately reviewed AMM selection delta allowed before final freezing','Freeze full6 workflow/187 script membership and added manual2 hash/mode records; do not dispatch or import search script','Create a new versioned current-applicability/current-reconciliation/CI endpoint packet with exact known-seal bindings; old P25 guards/payloads unchanged','Do not run old P25 current guards as current against new selected state; inherited packages receive integrity-only checks','Verify exact eventual Git index blobs/modes/membership and passive package payloads before commit/publication; no broad git add-A','Retain no execution permissions/commands for any incoming source/probe/static controller or manual search workflow'], 'execution_authorized_by_this_packet':False}
J(P/'CURRENT-GUARD-PROPOSAL.NOT_EXECUTABLE.json',proposal)
print(json.dumps({'summary':summary,'opaque_archive_known_seal':aseal,'protected_unique_paths':len(protected),'future_AMM_candidate_only':future['expected_scratch_candidate_not_selection']},indent=2))
