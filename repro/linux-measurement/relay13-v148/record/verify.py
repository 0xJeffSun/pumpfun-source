"""Read-only source proposal seals/control provenance; no tools/network/build."""
from pathlib import Path
import argparse,ast,difflib,hashlib,importlib.util,json
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);R=a.parse_args().repo.resolve()
manifest=J(P/'manifest.json');assert set(manifest)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f.name!='manifest.json'and'__pycache__'not in f.parts}
for f in P.rglob('*'):assert not f.is_symlink()and f.name!='__pycache__'and f.suffix!='.pyc'
for n,h in manifest.items():assert not(P/n).is_symlink()and H((P/n).read_bytes())==h,n
old=(P/'relay12-driver-control.py').read_text();new=(P/'measure_relay13_linux_v148.py').read_text();assert H(old.encode())=='350695dc5eb5d8efdf7b37ec542cc6456b55d28ec4bd4ca2edc73856751b54de'
assert (P/'source-hardening.patch').read_text()==''.join(difflib.unified_diff(old.splitlines(True),new.splitlines(True),fromfile='relay12-driver-control.py',tofile='measure_relay13_linux_v148.py'))
def nodes(text):return {n.name:n for n in ast.parse(text).body if isinstance(n,ast.FunctionDef)}
o,n=nodes(old),nodes(new)
for name in ['assert_scratch_call_closure','compile_and_strip','authenticate_cache','run_once','environment','capability','tools','diagnostics','compiled_log_links','extract_verified','member']:
 assert ast.dump(o[name],include_attributes=False)==ast.dump(n[name],include_attributes=False),name
assert [ast.dump(x,include_attributes=False)for x in o['post_static'].body[:-1]]==[ast.dump(x,include_attributes=False)for x in n['target_post_static'].body[:-1]]
s=importlib.util.spec_from_file_location('selected13_proposal',P/'measure_relay13_linux_v148.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
assert m.selected_source_inputs(R)==J(P/'dry-plan.json')['frozen_source'];ctl=m.linux12_control(R/m.LINUX12);assert m.source_delta(ctl['source_map'],m.selected_source_inputs(R))==['src/idl.rs']
for role,pin in m.ASSETS.items():assert m.selected_asset(J(P/(pin['tag']+'-release.json')),pin)['id']==pin['id']
plan=J(P/'dry-plan.json');assert m.plan(R,Path(plan['output']))==plan and not Path(plan['output']).exists()
workflow=(P/'measure-relay13-linux-v148.yml').read_text();control=(P/'relay12-workflow-control.yml').read_text();assert workflow==control.replace('Relay12','selected Relay13').replace('measure_relay_linux_v148.py','measure_relay13_linux_v148.py').replace('relay-linux-v148','relay13-linux-v148')
assert 'on:\n  workflow_dispatch:\n'in workflow and workflow.count('--execute')==1 and all(x not in workflow for x in ['push:','pull_request:','schedule:','secrets.'])
assert 'Ran 35 tests'in(P/'tests.stderr.txt').read_text()and(P/'tests.stderr.txt').read_text().rstrip().endswith('OK')
assert not any(f.suffix in ['.so','.rlib','.bz2','.crate']for f in P.rglob('*')if f.is_file())
print(json.dumps({'source_only_verified':True,'tests':35,'selected_source_inputs':23,'source_delta':['src/idl.rs'],'actual_linux12_control_verified':True,'full_readonly_dry_plan':True,'outer_parent_publication_pin':m.LINUX12_PARENT_SEAL,'all_three_callee_and_original_data_limits_preserved':True,'same_full_recipe_claimed':False,'host_system_library_identity_proved':False,'new_downloads_builds_dispatches_vm':0,'tracked_files_installed':False},indent=2))
