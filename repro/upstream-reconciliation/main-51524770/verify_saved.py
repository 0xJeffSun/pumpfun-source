"""Portable opaque archive/metadata verification. Never runs Git or archived code."""
from pathlib import Path,PurePosixPath
from collections import defaultdict,Counter
import json,hashlib,stat
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest();L=lambda n:json.loads((P/n).read_text())
def git_oid(kind,b):return hashlib.sha1((kind+' '+str(len(b))+'\0').encode()+b).hexdigest()
def ident(x):return None if x is None else tuple(x[k] for k in ['path','mode','kind','oid'])
def verify_tree(name):
 d=L(name+'-full-tree-membership.json');rows=d['entries'];paths={r['path']:r for r in rows};assert len(paths)==len(rows)
 groups=defaultdict(list)
 for r in rows:
  path=PurePosixPath(r['path']);assert not path.is_absolute() and '..' not in path.parts
  parent='' if str(path.parent)=='.' else str(path.parent)
  if parent:assert parent in paths and paths[parent]['kind']=='tree'
  groups[parent].append(r)
 for parent,children in groups.items():
  def order(r):return PurePosixPath(r['path']).name.encode()+ (b'/' if r['kind']=='tree' else b'')
  payload=b''.join((r['mode'].lstrip('0')+' ').encode()+PurePosixPath(r['path']).name.encode()+b'\0'+bytes.fromhex(r['oid']) for r in sorted(children,key=order))
  expected=d['root_tree_oid'] if parent=='' else paths[parent]['oid'];assert git_oid('tree',payload)==expected,(name,parent)
 return d,{p:r for p,r in paths.items() if r['kind']!='tree'}
def verify():
 manifest=L('manifest.json');seal=H((P/'manifest.json').read_bytes());assert (P/'manifest.sha256').read_text()==seal+'  manifest.json\n'
 actual={str(f.relative_to(P)) for f in P.rglob('*') if f.is_file() and f not in [P/'manifest.json',P/'manifest.sha256']}
 assert actual==set(manifest['files'])
 for n,r in manifest['files'].items():
  b=(P/n).read_bytes();assert H(b)==r['sha256'] and len(b)==r['bytes'],n
 archive=L('opaque-archive-manifest.json');aseal=H((P/'opaque-archive-manifest.json').read_bytes())
 assert aseal=='4ea702d99940634350051a200a8a4d57a2168db649ac2b469a112a78ab4828ab'
 assert (P/'opaque-archive-manifest.sha256').read_text()==aseal+'  opaque-archive-manifest.json\n'
 for n,r in archive['files'].items():
  b=(P/n).read_bytes();assert H(b)==r['sha256'] and len(b)==r['bytes'],n
 refs=L('refs.json');assert refs['pinned']=={'base':'2508c2be79bc5e66956dcd979e5d2f2a780fd851','incoming':'515247707d6fa9f0e3816d9e22a8036f0e7e5272','root':'576889cbfb2e28d5b1c2f47f1488c0caa80b88b7'}
 assert refs['merge_base_root_incoming']==refs['pinned']['base'] and refs['fetch_performed'] is False
 trees={};files={}
 for role in ['base','incoming','root']:trees[role],files[role]=verify_tree(role)
 for r in L('commit-object-witness.json')['records']:
  b=(P/r['path']).read_bytes();assert H(b)==r['sha256'] and len(b)==r['bytes'] and git_oid('commit',b)==r['commit']==refs['pinned'][r['role']]
  assert b.split(b'\n',1)[0].decode()=='tree '+trees[r['role']]['root_tree_oid']
 expected={}
 for label,a,b in [('base2508-to-incoming515','base','incoming'),('base2508-to-root576','base','root'),('root576-to-incoming515','root','incoming')]:
  changed={p for p in set(files[a])|set(files[b]) if files[a].get(p)!=files[b].get(p)};rows=L(label+'.json');assert {r['path'] for r in rows}==changed
  for r in rows:assert ident(r['before'])==ident(files[a].get(r['path'])) and ident(r['after'])==ident(files[b].get(r['path']))
  expected[label]=changed
 rows=L('incoming-exact-358-records.json');assert len(rows)==358 and {r['path'] for r in rows}==expected['base2508-to-incoming515']
 assert Counter(r['status'] for r in rows)=={'A':353,'M':5};assert len(expected['root576-to-incoming515'])==5555
 renamed=L('rename-aware-diff.json');assert len(renamed)==358 and not any(r['status'].startswith(('R','C','D')) for r in renamed)
 objects=L('opaque-object-inventory.json')['objects'];assert len(objects)==267;byoid={r['git_oid']:r for r in objects}
 for r in objects:
  raw=hashlib.sha256();git=hashlib.sha1(('blob '+str(r['bytes'])+'\0').encode());total=0
  for part in r['parts']:
   f=P/part['path'];assert not f.is_symlink() and stat.S_IMODE(f.stat().st_mode)==0o644;b=f.read_bytes()
   assert len(b)==part['bytes'] and H(b)==part['sha256'];assert len(b)<=64*1024*1024
   raw.update(b);git.update(b);total+=len(b)
  assert total==r['bytes'] and raw.hexdigest()==r['raw_sha256'] and git.hexdigest()==r['git_oid']
  assert r['actual_git_cat_file_exit']==0 and r['semantic_interpretation'] is False
 assert sum(r['bytes'] for r in objects)==19289950
 for r in rows:
  assert not any(s in r['path'] for s in ['private-security-review','security-followup','audit_coverage'])
  for side,tree in [('before','base'),('after','incoming')]:
   x=r[side];assert ident(x)==ident(files[tree].get(r['path']))
   if x and x['kind']=='blob':
    o=byoid[x['oid']];assert x['sha256']==o['raw_sha256'] and x['bytes']==o['bytes']
    assert {'path':r['path'],'side':side,'mode':x['mode']} in o['memberships']
 restore=L('restoration-exact5.json');absent=L('inactive-exact10.json');retain=L('passive-retention-exact343.json')
 assert [len(restore),len(absent),len(retain)]==[5,10,343]
 assert set(r['path'] for r in restore)|set(r['path'] for r in absent)|set(r['path'] for r in retain)==expected['base2508-to-incoming515']
 assert sum(map(len,[{r['path'] for r in restore},{r['path'] for r in absent},{r['path'] for r in retain}]))==358
 protected=L('P25-protected-paths.json');assert protected['unique_protected_paths']==len(protected['records'])==329
 pr={r['path']:r for r in protected['records']};assert all(ident(r)==ident(files['root'][r['path']]) for r in pr.values())
 assert sum(any(x.startswith('compiled-') for x in r['roles']) for r in pr.values())==107
 assert sum('relay-canonical23' in r['roles'] for r in pr.values())==23
 B=L('P25-known-bindings.json');bb=(P/'P25-known-bindings.json').read_bytes();assert H(bb)==protected['binding_sha256'] and git_oid('blob',bb)==files['root'][protected['binding_path']]['oid']
 for role,c in B['compiled'].items():
  for p,h in c['source'].items():assert pr[p]['sha256']==h
 for p,h in B['relay']['source23'].items():assert pr['programs/donation-relay/'+p]['sha256']==h
 for r in restore:assert ident(r['selected_P25'])==ident(files['root'][r['path']])
 for r in absent:assert r['path'] not in files['root'] and r['selected_P25_absence']
 for r in retain:assert r['path'] not in files['root'] and ident(r['incoming'])==ident(files['incoming'][r['path']])
 sets=L('proposed-final-script-workflow-sets.json');assert sets['script_set']==sorted(B['script_set']+['scripts/search_dependency_commit.py']) and len(sets['script_set'])==187
 assert sets['workflow_set']==sorted(B['workflow_set']+['.github/workflows/search-dependency.yml']) and len(sets['workflow_set'])==6
 assert sets['automatic_dispatch_authorized'] is False and sets['passive_search_recipe_approved'] is False
 future=L('future-AMM09be-transition.UNBOUND.json');assert future['status']=='UNBOUND_REQUIRES_SEPARATE_ROOT_SELECTION' and future['selected_now_by_this_plan'] is False
 assert future['root_selection_commit'] is None and future['root_selection_seal'] is None and future['genuine_managed_main_seal'] is None
 assert future['expected_scratch_candidate_not_selection']=='09bee0dfd751dc6ae0240bbac262933c6bda6e0c94aa643f82c57f2956c3a117'
 t=future['exact_source_transition'];assert t['path']=='programs/pump-amm/src/collect.rs' and t['before_sha256']==pr[t['path']]['sha256'] and t['other29AMM_source_paths_unchanged']
 proposal=L('CURRENT-GUARD-PROPOSAL.NOT_EXECUTABLE.json');assert proposal['execution_authorized_by_this_packet'] is False and proposal['incoming_opaque_archive_known_seal']==aseal
 cw=proposal['commit_object_witness'];assert H((P/cw['path']).read_bytes())==cw['known_sha256']
 for r in L('immutable-P25-guard-pins.json'):
  b=(P/'prior-guard-manifests'/(r['path'].split('/')[-2]+'.json')).read_bytes();assert H(b)==r['sha256'] and git_oid('blob',b)==r['git_oid']==files['root'][r['path']]['oid'];assert r['immutable_historical'] and r['execute_as_current_on_new_state'] is False
 net=L('planned-passive-only-net-delta.json');assert len(net['changes'])==343 and all(r['status']=='A' and r['path'] not in files['root'] for r in net['changes'])
 return {'result':'PASS','scope':'Saved opaque hashes/Git objects/full tree identities/memberships and nonexecuting plan constraints only','incoming_paths':358,'added_modified_deleted':[353,5,0],'renames':0,'archived_unique_blobs':267,'archived_raw_bytes':19289950,'all_three_recursive_tree_oids_reconstructed':True,'restore5_absent10_passive343':[5,10,343],'protected_unique_paths':329,'source107_Relay23':[107,23],'new_workflow_script_counts':[6,187],'future_AMM_selection_bound':False,'merge_reset_checkout_index_active_write_or_archived_code_execution':False}
if __name__=='__main__':print(json.dumps(verify(),indent=2))
