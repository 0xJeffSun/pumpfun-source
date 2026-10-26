"""Read-only proposal/source/material verifier. There is deliberately no launcher."""
from pathlib import Path
import argparse,ast,difflib,gzip,hashlib,importlib.util,json,sys,tomllib
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def safe_relative(name):
 path=Path(name);assert not path.is_absolute()and'..'not in path.parts;return path

def validate_sources(root,expected):
 actual={str(f.relative_to(root)):H(f)for f in root.rglob('*')if f.is_file()};assert actual==expected and len(actual)==37
 for f in root.rglob('*'):assert not f.is_symlink()

def verify(repo=None,availability=False):
 manifest=J(P/'MANIFEST.json');assert set(manifest)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f.name!='MANIFEST.json'}
 for name,h in manifest.items():assert H(P/safe_relative(name))==h,name
 baseline=J(P/'source-baseline.json');proposed=J(P/'source-proposed.json');changes=J(P/'changes.json');validate_sources(P/'source',proposed);assert set(baseline)==set(proposed)and[n for n in baseline if baseline[n]!=proposed[n]]==['programs/pump/src/admin_cto.rs']
 sourcepath='programs/pump/src/admin_cto.rs';new=(P/'source'/sourcepath).read_text();before=new
 for guard in reversed(changes['guards']):
  assert before.count(guard['after'])==1;before=before.replace(guard['after'],guard['before'])
 assert hashlib.sha256(before.encode()).hexdigest()==changes['source_before_sha256']==baseline[sourcepath];assert H(P/'source'/sourcepath)==changes['combined_source_after_sha256']==proposed[sourcepath];assert [g['code']for g in changes['guards']]==[6019,6091];assert before.count('return Err(err(6092));')==new.count('return Err(err(6092));')==2
 assert(P/'proposal.patch').read_text()==''.join(difflib.unified_diff(before.splitlines(True),new.splitlines(True),fromfile='a/'+sourcepath,tofile='b/'+sourcepath,n=2));assert changes['guard6092_unchanged']and not changes['applied_to_checkout']and not changes['executed']
 g=J(P/'recipe-history/inputs.json');report=J(P/'recipe-history/build-comparison.json');attempt=J(P/'recipe-history/build-attempt.json');assert report['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']==baseline and attempt['returncode']==0
 for name,h in g['helpers'].items():assert H(P/'helpers'/safe_relative(name))==h;ast.parse((P/'helpers'/name).read_text())
 helper=P/'helpers/scripts/build_partial_candidate.py';assert H(helper)=='bb683621ffc4297c58f030cb03da54484b7370b786fd8eda965a37f4b3198ee9';assert report['command']==attempt['command']
 spec=importlib.util.spec_from_file_location('unchanged_static_source_scanner',P/'helpers/scripts/build_source_manifest.py');scanner=importlib.util.module_from_spec(spec);spec.loader.exec_module(scanner);assert scanner.source_manifest(P/'source/programs/pump',P/'source/programs/pump',P/'source',[],cwd=P/'source')==proposed
 profile=tomllib.loads((P/'source/programs/pump/Cargo.toml').read_text())['profile']['release'];assert profile=={'panic':'abort','overflow-checks':True,'lto':False,'codegen-units':1};assert proposed['programs/pump/Cargo.lock']==baseline['programs/pump/Cargo.lock']and proposed['programs/pump/Cargo.toml']==baseline['programs/pump/Cargo.toml']
 for label,ref in J(P/'proof-pins.json').items():assert H(Path(ref['path']))==ref['sha256'],label
 cache=J(P/'cache-allowlist.json');lock=tomllib.loads((P/'source/programs/pump/Cargo.lock').read_text());allowed={x['name']+'-'+x['version']:x['checksum']for x in lock['package']if x.get('source')};assert len(allowed)==cache['lock_packages']==252
 for name,rec in cache['files'].items():
  path=safe_relative(name);assert path.parts[0]=='registry'and path.parts[1]in['cache','src','index'];assert rec['kind']in['archives','extracted_source_files','cargo_package_markers','sparse_index_entries','registry_index_configs']
  if path.parts[1]=='cache':assert path.name.endswith('.crate')and path.name[:-6]in allowed and rec['sha256']==allowed[path.name[:-6]]
  if path.parts[1]=='src':assert path.parts[3]in allowed
 assert cache['private_copy_required']and cache['hardlinks_forbidden']and not cache['source_cache_mutations_authorized']
 plan=J(P/'future-plan.json');assert plan['state']=='UNEXECUTED_UNACKNOWLEDGED_BUILD_PROPOSAL'and plan['candidate_disposition']=='UNSELECTED'and plan['root_coordinator_ack_required'];assert plan['proposed_program_build_attempts']==1 and plan['exclusive_claim_before_any_native_command'];assert plan['runtime_executions_permitted']==0 and not plan['current_source_status_default_pointer_writes_permitted'];assert plan['source_inputs']==37 and plan['source_guard_changes']==[6019,6091]and plan['guard6092_unchanged'];assert plan['helper_sha256']==g['helpers']and plan['actual_native_build_sbf_command']==report['command'];assert not plan['actual_exit_status_policy']['compiler_child_code_direct_observation']and not plan['actual_exit_status_policy']['strip_child_code_direct_observation']
 if repo:
  repo=Path(repo).resolve()
  for name,h in baseline.items():assert H(repo/name)==h,name
 if availability:
  a=J(P/'availability.json');assert a['native_commands_invoked']==a['network_requests']==0;assert a['all14281_witnesses_match']and a['archive_witnesses']+a['source_file_witnesses']==14281
  for v in a['tools'].values():assert Path(v['path']).is_file()and H(Path(v['path']))==v['sha256']==v['expected_sha256']
  sdk=Path(a['sdk_source']);actual={str(f.relative_to(sdk)):H(f)for f in sdk.rglob('*')if f.is_file()and'dependencies'not in f.relative_to(sdk).parts};assert actual==a['sdk_source_sha256']and len(actual)==53
  for v in cache['files'].values():assert Path(v['source']).is_file()and H(Path(v['source']))==v['sha256']
 return dict(status='PROPOSAL_VERIFIED_UNEXECUTED',source_inputs=37,changed_files=1,guard_changes=[6019,6091],all_other36_unchanged=True,guard6092_unchanged=True,combined_admin_cto_sha256=proposed[sourcepath],private_cache_lock_packages=252,native_commands_invoked=0,new_builds=0,new_target_executions=0,execution_authorized=False,launch_entry_point_present=False,current_baseline_checked=bool(repo),current_filesystem_availability_rehashed=availability)
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--repo',type=Path);a.add_argument('--availability',action='store_true');args=a.parse_args();print(json.dumps(verify(args.repo,args.availability),indent=2))
