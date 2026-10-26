"""Tests frozen proposed byte transformations only; no current wrapper execution."""
from pathlib import Path
import ast,hashlib,json,subprocess
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
assert H(P/'peer-dd9c/manifest.json')=='dd9c12410269611c7fe18c866d6b3856bd30cc9ffa53b10c4d2c47cbe893d37f'
M=J(P/'peer-dd9c/manifest.json')
for n,h in M.items():assert H(P/'peer-dd9c'/n)==h
assert H(P/'peer-dd9c/bindings.json')=='fda3a2c821d8502f1671080302725ecd131fe329734900c0a5c37f025d85b9f3';B=J(P/'peer-dd9c/bindings.json');assert len(B['new_incoming_git_blobs'])==30 and len(B['newest_incoming_git_blobs'])==8
assert(P/'workflow.before.yml').read_bytes()==(P/'workflow.peer2508.before.yml').read_bytes()
origin=J(P/'peer-origin.json');n='.github/workflows/measure-relay-linux-v148.yml';assert H(P/'manual-linux148.expected.yml')==origin['files'][n]['sha256'];assert 'measure_relay_linux_v148.py'not in(P/'workflow.proposed.yml').read_text()
assert H(P/'pump-bridge21bc/manifest.json')=='21bc9dc7345445bbd4b69e22c8c67d78d4d65bce8723723293f7c17a654a6bef'
for n,r in J(P/'pump-bridge21bc/manifest.json').items():assert H(P/'pump-bridge21bc'/n)==(r['sha256']if isinstance(r,dict)else r)
old=J(P/'source-selected.peer13.before.json');new=J(P/'relay15-known-selection/source-selected.proposed.json');source=J(P/'relay15-known-selection/source-map.json');assert old['source_inputs']==B['relay_source_map'];assert new['source_inputs']==source and len(source)==23;delta=sorted(n for n in source if source[n]!=old['source_inputs'][n]);assert delta==['src/arithmetic.rs','src/error_report.rs','src/exit_error.rs','src/handlers.rs','src/lib.rs'];assert new['fresh_build_from_this_path']is False
T=J(P/'source-applicability-transition.json');before=(P/'source-applicability.before.py').read_text();after=before
for r in T['literal_replacements']:assert after.count(r['old'])==r['count'];after=after.replace(r['old'],r['new'])
assert after==(P/'source-applicability.proposed.py').read_text()
for p in P.glob('*.py'):ast.parse(p.read_text())
print(json.dumps({'passed':True,'peer_guard_seal':origin['dd9c_seal'],'opaque_incoming':38,'relay15_alias_source_inputs':23,'relay13_to15_changed_inputs':delta,'manual_workflow_exact_and_undispatched':True,'applicability_literal_transition_exact':True,'AST_parsed':True,'active_current_wrapper_build_or_VM_executed':False},indent=2))
L=J(P/'latest14.git-metadata.json');assert L['incoming']=='2f14c36c98e9d69cd1267a22a01435d6f604a715'and L['selected_restoration_commit']=='8951b0852222824f6702618d2fb1efdd17f016fd';assert len(L['files'])==14
assert sum(r['active_after_action']=='restore-exact-selected'for r in L['files'])==5
assert sum(r['active_after_action']=='remove-active-after-archive'for r in L['files'])==8
assert sum(r['active_after_action']=='retain-passive-document'for r in L['files'])==1
future=next(r for r in L['files']if r['path']=='programs/pump/src/mayhem_virtual_params.rs');assert future['role']=='unreviewed-future-source'and future['selected_baseline']is None and L['new_future_source_permanently_stopped']is False
T=J(P/'tested107.8951.json');assert T['total_inputs']==107 and sum(map(len,T['source_maps'].values()))==107
for r in L['files']:
 if r['active_after_action']=='restore-exact-selected':
  role='mayhem'if r['path'].startswith('programs/mayhem/')else'pump';assert T['source_maps'][role][r['path']]==r['selected_baseline']['sha256']
print(json.dumps({'v4_pinned_incoming':14,'restores':5,'active_removals_after_archive':8,'passive_documents':1,'tested_source107_restoration_gate':True,'unreviewed_future_source_permanently_stopped':False,'no_body_semantic_inspection':True},indent=2))
V=J(P/'V5-delta.json');assert H(P/'E299-review-assets/manifest.json')==V['E299_seal'];EM=J(P/'E299-review-assets/manifest.json')
for n in['verify.py','reader.py']:
 row=EM[n];assert H(P/'E299-review-assets'/n)==(row['sha256']if isinstance(row,dict)else row)
T=J(P/'workflow-transition.json');assert len(T['insertions'])==1 and(P/'workflow.proposed.yml').read_text().count(V['new_global_command'])==1
source=(P/'current-reconciliation.proposed.py').read_text();assert 'verify_pass.py'not in source;assert 'pump-current-evidence/verify.py'in source;assert V['E299_seal']in(P/'finalize.UNRUN.py').read_text()
print(json.dumps({'v5_E299_known_seal':V['E299_seal'],'E299_split_byte_reader_explicit':True,'global_saved_command_insertions':1,'current_reconciliation_calls_global':False,'global_execution_not_attempted':True},indent=2))

V4=J(P/'peer-d172/bindings.json');assert H(P/'peer-d172/manifest.json')=='d17224a7c07d7bd1bc10575d0daf495dd16ab5f20509298dedf3b49c20334fc4'
for n,h in J(P/'peer-d172/manifest.json').items():assert H(P/'peer-d172'/n)==h
assert H(P/'peer-d172/bindings.json')=='361446933452b2d8d1fb0f3f4ebd7d8ee86deaf23fc96292351135fa7ddd427b';assert len(V4['da404_incoming'])==15 and len(V4['da404_restored'])==5 and len(V4['da404_inactive'])==8 and len(V4['da404_passive'])==2
assert H(P/'manual-relay13-linux148.expected.yml')==J(P/'peer2508-origin.json')['files']['.github/workflows/measure-relay13-linux-v148.yml']['sha256'];assert 'measure_relay13_linux_v148.py'not in(P/'workflow.proposed.yml').read_text()
print(json.dumps({'v7_peer_commit':'2508c2be79bc5e66956dcd979e5d2f2a780fd851','v7_guard_seal':'d17224a7c07d7bd1bc10575d0daf495dd16ab5f20509298dedf3b49c20334fc4','new_da404_retained_records':15,'second_manual_workflow_exact_undispatched':True,'old_current_guard_executed':False},indent=2))

Q=P/'inventory946';assert H(Q/'manifest.json')=='946148158095cb106ed6fb70dce8b98a3dcd8abe1da4c8a91a86b69af7260f95'
for n,r in J(Q/'manifest.json').items():assert H(Q/n)==(r['sha256']if isinstance(r,dict)else r)
rows=J(Q/'base2f14-to-incoming2508.json');contract=J(Q/'incoming-retention-contract.json');assert len(rows)==233 and len(contract['positive'])==225 and len(contract['absent_active_paths'])==8 and set(contract['explicit_active_exception'])=={'.github/workflows/verify.yml'}
assert contract['positive']==[r for r in rows if r['after']is not None];assert{role:r['source']for role,r in J(Q/'compiled-source107.json')['groups'].items()}==J(P/'tested107.8951.json')['source_maps']
resolution=J(Q/'actual-rename-resolution.json');assert resolution['passed']and len(resolution['resolutions'])==24 and resolution['rename_conflicts_resolved']==8 and resolution['both_archive_versions_retained']and not resolution['source_bodies_interpreted']
print(json.dumps({'v7_incoming_retention_seal':'946148158095cb106ed6fb70dce8b98a3dcd8abe1da4c8a91a86b69af7260f95','positive_exact_files':225,'sole_explicit_workflow_exception':1,'negative_active_absences':8,'archive_resolution_rows':24,'new_compiler_VM_or_source_body_inspection':0},indent=2))
