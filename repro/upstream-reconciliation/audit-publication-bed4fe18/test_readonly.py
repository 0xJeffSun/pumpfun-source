"""Negative expectation mutations; actual repository files never change or overlay."""
from pathlib import Path
import copy,json
from verify import P,check,J,H,digest,package
R=P.parents[2];d=J(P/'frozen.json');results=[]
def reject(name,mutate):
 q=copy.deepcopy(d);mutate(q)
 try:check(q,R,P)
 except AssertionError:results.append({'name':name,'rejected':True});return
 raise AssertionError('Mutation accepted: '+name)
reject('protected Pump source hash',lambda q:q['immutable_files'].__setitem__('programs/pump/src/trade.rs','0'*64))
reject('current status hash',lambda q:q['immutable_files'].__setitem__('repro/status.json','0'*64))
reject('selected candidate hash',lambda q:q['immutable_files'].__setitem__(q['programs']['pump']['candidate'],'0'*64))
reject('CI preparer identity',lambda q:q['immutable_files'].__setitem__('scripts/prepare_pump_nested_runtime.py','0'*64))
reject('old immutable package seal',lambda q:q['immutable_packages'].__setitem__(q['old_transition'],'0'*64))
reject('workflow expected bytes',lambda q:q['transitions']['.github/workflows/verify.yml'].__setitem__('after_sha256','0'*64))
reject('broaden noncompiler allowlist',lambda q:q['allowed_noncompiler_transitions'].append('programs/pump/src/trade.rs'))
reject('mislabel source as extra audit binding',lambda q:q['extra_audit_bindings'].append('programs/pump/src/trade.rs'))
reject('archive preservation hash',lambda q:next(iter(q['archived'].values())).__setitem__('incoming_sha256','0'*64))
reject('removed path asserted existing',lambda q:q['removed'].append('programs/pump/src/lib.rs'))
reject('excluded execution present in actual workflow',lambda q:q['excluded_commands'].append('python'))
print(json.dumps({'passed':True,'negative_cases':results,'repo_files_mutated':0,'overlays_or_shadow_roots':0,'new_target_executions':0},indent=2))
