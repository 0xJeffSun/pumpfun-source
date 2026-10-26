"""P25 saved-only current composition over immutable merged a71/dd9c obligations."""
from pathlib import Path,PurePosixPath
import argparse,hashlib,json,importlib.util,subprocess,sys,re
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
PEER='repro/layered-passes/pass-24/ci-review-reconciliation-v4';PEERSEAL='d17224a7c07d7bd1bc10575d0daf495dd16ab5f20509298dedf3b49c20334fc4'
def path(R,n):
 q=PurePosixPath(n);assert not q.is_absolute() and '..'not in q.parts and str(q)==n;p=R/n
 for x in[p,*p.parents]:
  if x==R.parent:break
  assert not x.is_symlink(),str(x)
 assert p.is_file();return p
def digest(R,n,h):assert H(path(R,n))==h,n
def sealed(D,h):
 assert not D.is_symlink()and H(D/'manifest.json')==h;M=J(D/'manifest.json');M=M.get('files',M);A=set()
 for p in D.rglob('*'):
  assert not p.is_symlink()and p.name!='__pycache__'and p.suffix not in('.pyc','.pyo')
  if p.is_file()and str(p.relative_to(D))not in('manifest.json','manifest.sha256'):A.add(str(p.relative_to(D)))
 assert A==set(M)
 for n,r in M.items():
  digest(D,n,r['sha256']if isinstance(r,dict)else r)
  if isinstance(r,dict)and'bytes'in r:assert path(D,n).stat().st_size==r['bytes']
 if(D/'manifest.sha256').exists():assert(D/'manifest.sha256').read_text().split()[0]==h
 return M
def load(p,n):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def retained_blob(R,n,row):
 b=path(R,n).read_bytes();assert hashlib.sha256(b).hexdigest()==row['sha256'];assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==row['git_blob']
 if'bytes'in row:assert len(b)==row['bytes']
LATEST14='repro/upstream-reconciliation/main-2f14c36c'
LATEST14SEAL='ed52fc1804f582a52fdf605ffd737187a7937c2cc19a83e87b64b4eeba0cccb4'
def check_latest14(R,seal):
 assert seal==LATEST14SEAL;sealed(R/LATEST14,seal);M=J(P/'latest14.git-metadata.json');assert M['incoming']=='2f14c36c98e9d69cd1267a22a01435d6f604a715'and M['base']=='a71de2091f0ab56a4eb2996777f0ecbf51986aa3'and M['selected_restoration_commit']=='8951b0852222824f6702618d2fb1efdd17f016fd';assert len(M['files'])==14
 restoration=J(R/LATEST14/'restoration.json');assert restoration['actual_merge_target']==M['incoming']and restoration['reviewed_main']==M['base']and restoration['local_checkpoint']==M['selected_restoration_commit'];assert restoration['opaque_incoming_files']==14 and restoration['actual_after_passed']is True and not restoration['semantic_incoming_body_inspection']and not restoration['new_target_or_build_or_fixture_execution']
 tested=J(P/'tested107.8951.json')['source_maps'];normalize={'pump':'pump','mayhem':'mayhem','amm':'pump_amm','fees':'pump_fees'};assert{normalize[k]:v for k,v in restoration['source107_by_role'].items()}==tested
 incoming=J(R/LATEST14/'incoming14.json');assert len(incoming)==14;assert{r['path']:(r['sha256'],r['git_blob'],r['bytes'])for r in incoming}=={r['path']:(r['sha256'],r['git_blob'],r['bytes'])for r in M['files']}
 refusal=J(R/LATEST14/'capture-refusal.json');assert refusal['returncode']==1 and refusal['capture_created']is False and refusal['active_writer_or_VM_or_compiler_called']is False
 for row in M['files']:
  retained_blob(R,LATEST14+'/incoming/'+row['path'],row)
  action=row['active_after_action']
  if action=='restore-exact-selected':
   assert row['status']=='M';rec=row['selected_baseline'];retained_blob(R,row['path'],rec)
  elif action=='remove-active-after-archive':assert not(R/row['path']).exists(),row['path']
  else:assert action=='retain-passive-document';retained_blob(R,row['path'],row)
 return {'incoming':14,'restored':5,'removed_active':8,'passive':1,'source_semantics_inspected':False,'new_future_source_permanently_stopped':False}

UPSTREAM2508='repro/layered-passes/pass-25/pinned2508-hash-inventory'
UPSTREAM2508SEAL='946148158095cb106ed6fb70dce8b98a3dcd8abe1da4c8a91a86b69af7260f95'
def check_upstream2508(R,seal):
 assert seal==UPSTREAM2508SEAL;sealed(R/UPSTREAM2508,seal);Q=R/UPSTREAM2508;refs=J(Q/'refs.json');assert refs['base']=='2f14c36c98e9d69cd1267a22a01435d6f604a715'and refs['root']=='1bf4c08bb88a5c240f21548b089bae14958683bc'and refs['incoming']=='2508c2be79bc5e66956dcd979e5d2f2a780fd851'
 rows=J(Q/'base2f14-to-incoming2508.json');assert len(rows)==233;positive=0;removed=0
 contract=J(Q/'incoming-retention-contract.json');assert contract['schema']==1 and contract['pinned_refs']==refs and contract['incoming_change_count']==233 and contract['positive_count']==225 and contract['negative_count']==8 and contract['incoming_only_count']==220;assert set(contract['explicit_active_exception'])=={'.github/workflows/verify.yml'};assert contract['positive']==[r for r in rows if r['after']is not None];assert set(contract['absent_active_paths'])=={r['path']for r in rows if r['after']is None}
 rename=J(Q/'actual-rename-resolution.json');assert rename['passed']and rename['local_parent']==refs['root']and rename['incoming_pinned']==refs['incoming']and rename['rename_conflicts_resolved']==8 and rename['both_archive_versions_retained']and not rename['source_bodies_interpreted']and not rename['build_or_VM_or_fixture_execution'];assert len(rename['resolutions'])==24
 for r in rename['resolutions']:
  if r['role']=='retain-exact-archive':retained_blob(R,r['path'],{'git_blob':r['blob'],'sha256':r['sha256']})
  else:assert r['role']=='inactive-after-two-exact-archives'and not(R/r['path']).exists()
 for row in rows:
  n=row['path'];after=row['after']
  if after is None:assert not(R/n).exists(),n;removed+=1;continue
  positive+=1;assert after['type']=='blob'and after['mode']in('100644','100755'),n
  if n=='.github/workflows/verify.yml':
   before=(P/'workflow.before.yml').read_bytes();assert hashlib.sha256(before).hexdigest()==after['sha256'];assert hashlib.sha1(b'blob '+str(len(before)).encode()+b'\0'+before).hexdigest()==after['oid'];assert path(R,n).read_bytes()==(P/'workflow.proposed.yml').read_bytes()
  else:
   retained_blob(R,n,{'sha256':after['sha256'],'git_blob':after['oid']});assert path(R,n).stat().st_mode&0o111==int(after['mode'],8)&0o111
 assert positive==225 and removed==8
 tested=J(P/'tested107.8951.json')['source_maps'];source=J(Q/'compiled-source107.json');assert source['count']==107 and{role:r['source']for role,r in source['groups'].items()}==tested
 proof=J(Q/'relay13-vs15-proof.json');assert proof['incoming_matches_all23_source13']is True and proof['Root_matches_all23_source15']is True and len(proof['fields'])==23
 return {'incoming_positive_exact_paths':225,'only_current_workflow_exception':1,'incoming_deletions_absent':8,'incoming_semantics_inspected':False}

def check(R):
 assert sys.version_info[:2]==(3,12);R=R.resolve();F=J(P/'bindings.json');assert F['complete']is True and R/F['publication']==P
 check_latest14(R,F['latest14_seal']);check_upstream2508(R,F['upstream2508_seal']);sealed(R/PEER,PEERSEAL);B=J(R/PEER/'bindings.json');assert H(R/PEER/'bindings.json')=='361446933452b2d8d1fb0f3f4ebd7d8ee86deaf23fc96292351135fa7ddd427b'
 # Treat the frozen peer current guard as historical; never invoke its check/gather.
 old_bound=dict(B['bound_files']);old_bound['.github/workflows/verify.yml']=H(P/'workflow.before.yml')
 for n,h in old_bound.items():
  if n in F['reviewed_replacements']:
   row=F['reviewed_replacements'][n];assert row['before']==h;digest(R,n,row['after'])
  else:digest(R,n,h)
 assert set(F['reviewed_replacements'])<=set(old_bound)
 for n,h in {**B['immutable_packages'],**F['immutable_packages']}.items():sealed(R/n,h)
 for n,r in B['git_blobs'].items():retained_blob(R,n,r)
 for n,r in B['archives'].items():
  digest(R,n,r['sha256'])
  if'git_blob'in r:retained_blob(R,n,r)
 for n in set(B['removed'])|set(B['newest_inactive_paths'])|{B['new_inactive_runner']}:assert not(R/n).exists(),n
 # Preserve all30+8 incoming raw blobs and every old selected13 record, hash-only.
 G=R/B['new_incoming_guard'];sealed(G,B['new_incoming_guard_seal']);guard=load(G/'verify.py','historical_e833_pure_api');pres=J(G/'preservation.json');guard.verify_preservation(G,pres);assert pres['files']==B['new_incoming_git_blobs']and len(pres['files'])==30
 oldmetadata=J(P/'source-selected.peer13.before.json');gb=J(G/'bindings.json');assert H(P/'source-selected.peer13.before.json')==gb['source_selected_metadata_sha256'];guard.verify_selected_metadata(oldmetadata,B['relay'],B['relay_source_map'])
 assert path(R,B['parent_preservation_attributes']['path']).read_text()==B['parent_preservation_attributes']['exact_text']
 digest(R,gb['legacy_oracle'],gb['legacy_oracle_sha256']) # identified only, never executed
 for n,r in B['new_incoming_git_blobs'].items():retained_blob(R,r['archive_path'],r)
 N=R/B['newest_incoming_guard'];sealed(N,B['newest_incoming_guard_seal']);newest=J(N/'preservation.json');assert newest['files']==B['newest_incoming_git_blobs']and len(newest['files'])==8
 for n,r in newest['files'].items():
  assert r['semantics_reviewed']is False;retained_blob(N,r['archive_path'],r)
  if n in newest['proposed_restore_selected_paths']:
   digest(R,n,r['selected_restore_sha256']);raw=path(R,n).read_bytes();assert hashlib.sha1(b'blob '+str(len(raw)).encode()+b'\0'+raw).hexdigest()==r['baseline_git_blob']
 digest(R,B['newest_passive_doc'],newest['files'][B['newest_passive_doc']]['sha256'])
 # Preserve new pinned2508 V4 historical source-holding guard without executing its old current check.
 D=R/B['da404_guard'];sealed(D,B['da404_guard_seal']);held=J(D/'preservation.json');assert held['incoming_commit']=='da40426bddbcecff9ba8d47494299f9479ff0179'and held['baseline_commit']=='a71de2091f0ab56a4eb2996777f0ecbf51986aa3';assert held['files']==B['da404_incoming'];assert len(held['files'])==15 and len(B['da404_restored'])==5 and len(B['da404_inactive'])==8 and len(B['da404_passive'])==2
 for n,row in held['files'].items():
  assert row['semantics_reviewed']is False;retained_blob(D,row['archive_path'],row)
 for n in B['da404_restored']:digest(R,n,held['files'][n]['selected_restore_sha256'])
 for n in B['da404_inactive']:assert not(R/n).exists(),n
 for n in B['da404_passive']:digest(R,n,held['files'][n]['sha256'])
 assert newest['new_builds']==newest['new_target_executions']==0 and not newest['source_semantics_reviewed']and not newest['scripts_invoked']
 # Preserve unchanged saved historical preparation, never its old current check.
 fq=R/B['f4_package']/'reviewed-plan';fz=J(fq/'plan.json');O=R/fz['old_transition_path'];oq=O/'reviewed-plan';oz=J(oq/'plan.json');previous=load(O/'bridge.py','historical_saved_preparation');assert previous.check_preparation(oq,R,oz['preparation_helper'])==B['prior_saved_preparation']
 restored=J(R/PEER/'restoration-witness.json');assert restored['sha256']=='948a1a13f9ff947c8a544db7a2241c95e09618c9bb3613d4d2ab900d986329d8'and restored['bytes']==789456
 for k in['restored_path','canonical_retained_path']:digest(R,restored[k],restored['sha256']);assert path(R,restored[k]).stat().st_size==restored['bytes']
 # Exact final actual workflow and manual-only measurement retained without dispatch.
 assert sorted(str(p.relative_to(R))for p in(R/'.github/workflows').rglob('*')if p.is_file())==F['workflow_set']
 digest(R,'.github/workflows/measure-relay-linux-v148.yml',H(P/'manual-linux148.expected.yml'));digest(R,'.github/workflows/measure-relay13-linux-v148.yml',H(P/'manual-relay13-linux148.expected.yml'))
 text=path(R,'.github/workflows/verify.yml').read_text();before=(P/'workflow.before.yml').read_text()
 for r in J(P/'workflow-transition.json')['replacements']:assert before.count(r['old'])==r['count'];before=before.replace(r['old'],r['new'])
 for r in J(P/'workflow-transition.json')['insertions']:assert before.count(r['after'])==r['count'];assert r['command']not in before;before=before.replace(r['after'],r['after']+r['command'])
 assert text==before==(P/'workflow.proposed.yml').read_text()
 for cmd in B['excluded_commands']+['pump_create_mayhem_differential.py','pump_v3_token_extensions_differential.py','donation_relay_differential.py','initialize_mayhem_state','buy-v3-static-gap-review/verify.py','buy-v3-funded-gap-audit/verify_package.py','measure_relay_linux_v148.py','measure_relay13_linux_v148.py']:assert cmd not in text
 base=(P/'attributes.before').read_bytes();attrs=path(R,'.gitattributes').read_bytes();assert attrs.startswith(base);observed={}
 for line in attrs[len(base):].decode().splitlines():
  if not line.strip()or line.startswith('#'):continue
  if line=='programs/donation-relay/src/dispatch.rs -whitespace':
   n='programs/donation-relay/src/dispatch.rs';h='e8f649f4468ea1f178af86739333bd28076fb42b756270c2e1f99f13826f42e7';assert F['relay']['source23']['src/dispatch.rs']==h and H(path(R,n))==h
  else:
   m=re.fullmatch(r'(repro/[^\s*?\[\]{}\\]+) -whitespace',line);assert m,line;n=m[1];h=H(path(R,n))
  assert n not in observed;observed[n]=h
 assert observed==F['attributes_appended_witness']
 for row in J(P/'attributes.initial12.json')+J(P/'attributes.postmerge3.json'):assert observed.get(row['path'])==row['sha256']
 for n,h in F['assets'].items():digest(R,n,h)
 assert sorted(str(p.relative_to(R))for p in(R/'scripts').glob('*.py'))==F['script_set']
 digest(R,B['source_scanner'],B['source_scanner_sha256']);scanner=load(R/B['source_scanner'],'final_actual_scanner').source_manifest;status=J(R/'repro/status.json');assert status==F['status']
 for role,c in F['compiled'].items():
  s=status[role];assert s['comparison_report']==c['report']and s['candidate_artifact']==c['candidate'];digest(R,c['report'],c['report_sha256']);report=J(R/c['report']);assert report['source_sha256']==c['source'];digest(R,c['candidate'],c['candidate_sha256']);assert report['comparison']['candidate_sha256']==c['candidate_sha256']==s['candidate_sha256'];l=B['source_layout'][role];actual=scanner(R/l['crate'],R/l['workspace'],R,extra_inputs=[R/n for n in l.get('extra_inputs',[])]);assert actual==c['source']==J(P/'tested107.8951.json')['source_maps'][role]and len(actual)==B['counts'][role]
 subprocess.run([sys.executable,'-B',str(R/'repro/mayhem/compiler-v154-main/current_bridge.py'),'--current-root',str(R),'--expected-seal','f5d514664d47a04cc22282fdd19ca9e01d835c8a335aa9acc3f637fc61650acc'],check=True)
 subprocess.run([sys.executable,'-B',str(R/'scripts/verify_pump_remaining_checkpoint.py')],check=True)
 subprocess.run([sys.executable,'-B',str(R/'repro/layered-passes/pass-25/pump-current-evidence/verify.py'),'--expected-seal','e299855a87efe5770e3a22033c37bb969557854ea289fd8d231726c7bad15037','--wrapper',str(R/'repro/pump/remaining-guards-fortyeight'),'--main',str(R/'repro/pump/remaining-guards-main-fortyeight')],check=True)
 relay=F['relay'];assert J(R/'repro/donation-relay/current.json')==relay['current'];subprocess.run([sys.executable,'-B',str(R/relay['bridge']/'verify.py'),'--current-root',str(R),'--expected-seal',relay['seal']],check=True)
 C=R/'programs/donation-relay';assert scanner(C,C,R)=={'programs/donation-relay/'+n:h for n,h in relay['source23'].items()};digest(R,'programs/donation-relay/README.md',relay['canonical_readme_sha256']);digest(R,'programs/donation-relay/source-selected.json',relay['source_selected_sha256']);alias=J(R/'programs/donation-relay/source-selected.json');assert alias==J(P/'source-selected.proposed.json');assert alias['source_inputs']==relay['source23']and alias['selected_metadata_sha256']==H(R/'repro/donation-relay/current.json')and alias['selected_candidate_sha256']==relay['current']['candidate_sha256'];assert alias['fresh_build_from_this_path']is False
 subprocess.run([sys.executable,'-B',str(R/'repro/layered-passes/pass-25/current-applicability/verify.py'),'--repo',str(R)],check=True)
 return {'passed':True,'source_inputs':107,'relay_source_inputs':23,'source_selected_asset_bound':True,'opaque_incoming_blobs_retained':52,'latest14_pinned_target':'2f14c36c98e9d69cd1267a22a01435d6f604a715','peer_d172_and_old_current_checks_executed':False,'da404_opaque_git_blobs_retained':15,'pinned_upstream2508':'2508c2be79bc5e66956dcd979e5d2f2a780fd851','manual_linux148_unchanged_undispatched':True,'new_vm_build':0}
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);x=a.parse_args();assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0];sealed(P,H(P/'manifest.json'));print(json.dumps(check(x.repo),indent=2))
