"""Pure local metadata/stream contracts. No entrypoint/child/source scanner/VM/network."""
from pathlib import Path
import ast,base64,copy,hashlib,importlib.util,json,os,tempfile
import common as c
spec=importlib.util.spec_from_file_location('p27_saved_crypto_helpers',c.P/'verify_portable_crypto.py');crypto=importlib.util.module_from_spec(spec);spec.loader.exec_module(crypto)
passed=[]
def case(name,fn):fn();passed.append(name)
def rejects(name,fn):
 try:fn()
 except (AssertionError,KeyError,ValueError):passed.append(name);return
 raise AssertionError('negative contract accepted: '+name)
T=c.accepted_template();F=c.J(c.P/'seed/bindings.PROPOSED.json');base=copy.deepcopy(F)
for row in T['asset_changes']:base['assets'][row['path']]=row['before_sha256']
case('exact3-asset projection positive',lambda:c.project_bindings(base,T))
for name,mutation in [('fourth asset',lambda x:x['asset_changes'].append({'path':'programs/pump/src/lib.rs','before_sha256':'0'*64,'after_sha256':'1'*64})),('wrong workflow after',lambda x:x['asset_changes'][0].__setitem__('after_sha256','0'*64)),('source-change permission',lambda x:x['unchanged_constraints'].__setitem__('compiled_source107',False)),('controller dispatch permission',lambda x:x['controller'].__setitem__('execution_authorized',True)),('root unaccepted',lambda x:x.__setitem__('root_accepted',False))]:
 bad=copy.deepcopy(T);mutation(bad);rejects('reject '+name,lambda:c.project_bindings(base,bad))
bad=copy.deepcopy(base);bad['status']['pump']['full_byte_equality']=True;rejects('reject changed status',lambda:c.project_bindings(bad,T))
prior=c.J(c.P/'seed/P26-catalogue51.before.json');rows=c.project_catalogue(prior,c.GUARD,'1'*64);assert rows[:51]==prior and len(rows)==53 and all(r['command']is None and r['runtime_args']==[]for r in rows);passed.append('51verbatim+2 integrity rows positive')
bad=copy.deepcopy(prior);bad[0]['command']='execute.py';rejects('reject executable catalogue row',lambda:c.project_catalogue(bad,c.GUARD,'1'*64));rejects('reject wrong guard path',lambda:c.project_catalogue(prior,'repro/other','1'*64));rejects('reject missing historical row',lambda:c.project_catalogue(prior[:-1],c.GUARD,'1'*64))
before=(c.P/'seed/P26-attributes.before').read_bytes();w=c.J(c.P/'seed/attributes12-witness.json');current=before+(''.join(x['literal_rule']+'\n'for x in w['rules'])).encode();members=c.J(c.P/'seed/controller627a-manifest.json')['files'];case('exact oldprefix+12 owner rules positive',lambda:c.attributes_projection(before,current,w,T,members))
rejects('reject changed oldprefix',lambda:c.attributes_projection(b'X'+before,current,w,T,members));rejects('reject extra rule',lambda:c.attributes_projection(before,current+b'repro/extra -whitespace\n',w,T,members))
for name,mutation in [('wildcard',lambda x:x['rules'][0].__setitem__('path','repro/*')),('active Rust exception',lambda x:x['rules'][0].__setitem__('path','programs/pump/src/lib.rs')),('wrong owner',lambda x:x['rules'][0].__setitem__('owning_manifest_sha256','0'*64)),('wrong member',lambda x:x['rules'][0].__setitem__('member','unknown'))]:
 bad=copy.deepcopy(w);mutation(bad);rejects('reject '+name,lambda:c.attributes_projection(before,current,bad,T,members))
# Capture helper is exercised with an in-memory fake process; no child is started.
class Fake:
 def __init__(self,argv,**kw):self.returncode=None;kw['stdout'].write(b'raw\x00out\n');kw['stderr'].write(b'rawerr');self.waits=0
 def wait(self,timeout=None):self.returncode=7;return 7
record=crypto.capture_child('synthetic metadata process',['fixed'],Path('/'),{},popen_factory=Fake);assert record['returncode']==7 and record['process_started']is True and base64.b64decode(record['stdout_base64'])==b'raw\x00out\n'and base64.b64decode(record['stderr_base64'])==b'rawerr';passed.append('nonzero child raw streams/numeric exit retained without execution')
def spawn_failure(*a,**k):raise OSError('synthetic spawn failure')
record=crypto.capture_child('synthetic spawn',['fixed'],Path('/'),{},popen_factory=spawn_failure);assert record['returncode']is None and record['process_started']is False and'process_failure'in record and record['stdout_bytes']==record['stderr_bytes']==0;passed.append('spawn failure null exit retained without execution')
assert c.J(c.P/'ROOT-PINS.json')['root_reviewed_final']is False;passed.append('proposal final pins remain unbound')
# Static identity of pure inventory and AMM current-crypto contract against approved P26 bytes.
old=Path(__file__).resolve().parents[2]/'repro/layered-passes/pass-26/current-guards'
# Use the exact authenticated local baseline only as source text; no old module import.
def fn(path,name):return ast.dump(next(n for n in ast.parse(path.read_bytes()).body if isinstance(n,ast.FunctionDef)and n.name==name),include_attributes=False)
assert fn(c.P/'common.py','source_names')==fn(old/'common.py','source_names');passed.append('source names-first AST unchanged')
assert fn(c.P/'verify_portable_crypto.py','validate_amm_contract')==fn(old/'verify_portable_crypto.py','validate_amm_contract');passed.append('AMM strict saved contract AST unchanged')
print(json.dumps({'status':'PASS_PURE_LOCAL_P27_CONTRACTS','case_count':len(passed),'cases':passed,'entrypoints':0,'actual_child_processes':0,'old_modules_imported':0,'source_scanners_executed':0,'network_build_VM_runtime_controller_dispatches':0},sort_keys=True))
