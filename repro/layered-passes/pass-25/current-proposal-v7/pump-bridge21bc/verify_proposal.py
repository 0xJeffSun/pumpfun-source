"""Read-only proposal checks; never applies source/status/helper/index changes or invokes a target."""
from pathlib import Path
import ast,json,hashlib,importlib.util
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
for f in P.glob('*.py'):ast.parse(f.read_text())
spec=importlib.util.spec_from_file_location('remaining_bridge_proposed',P/'verify_pump_remaining_checkpoint.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
R=P.parents[1];M=Path('/Users/shawwalters/.codex/worktrees/main-reconciliation/pumpfun-source');main=R/'work/pump-admin-cto-remaining-main-publication/public';wrapper=R/'work/pump-admin-cto-remaining-public-wrapper/public'
module.strict_package(main,module.MAIN_SEAL);module.strict_package(wrapper,module.SCRATCH_SEAL)
assert module.sha(wrapper/'inner-manifest.json')==module.INNER_SEAL
source=module.current_inputs(M,main);assert len(source)==37 and source['programs/pump/src/admin_cto.rs']=='918096a2dc44754f17b2172a0f2dcb834ce30f29b9f465b321961d35957c8282'
for name in ['verify_current_checkpoint.py','verify_current_bindings.py','verify_recovered_builds.py']:
 before=(P/(name+'.before')).read_text();after=(P/name).read_text();assert 'admin-cto-compared-errors-main-fortyeight'in before and before.count('admin-cto-compared-errors-main-fortyeight')==after.count('admin-cto-compared-errors-main-fortyeight');assert 'verify_pump_remaining_checkpoint'in after
old=J(P/'pump-status.before.json');new=J(P/'pump-status.proposed.json')
assert new['candidate_sha256']==module.CANDIDATE and new['symbols_sha256']==module.SYMBOLS and new['validated_cases']==old['validated_cases']==9269 and new['surfpool_comparisons']==old['surfpool_comparisons']==1024
for k in ['implemented_handlers','partially_implemented_handlers','historical_source_recovered','compiler','dependencies','build_flags','compiler_recipe_note']:assert new[k]==old[k],k
assert new['full_byte_equality']is False
assert module.sha(wrapper/'inner-reader.py')==json.loads(module.content(wrapper/'inner-manifest.json'))['verify.py']['sha256']
print(json.dumps({'passed':True,'known_main':module.MAIN_SEAL,'known_outer':module.SCRATCH_SEAL,'known_inner':module.INNER_SEAL,'actual_current_source_inputs':37,'actual_README_helpers_scanner_checked':True,'old_routes_preserved':True,'status_proposal_only':True,'full_helper_verification_run':False,'target_executions':0,'builds':0,'active_writes':0}))
