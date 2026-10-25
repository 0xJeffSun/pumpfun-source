from pathlib import Path
import importlib.util,json,hashlib,shutil,tempfile
R=Path.cwd();P=R/'work/pump-general-route-validation-proposal-v3';src=R/'work/pump-general-route-recovery/run-01/source';candidate=src.parent/'build-01/artifacts/pump_recovered.so';report=src.parent/'build-01/build-comparison.json'
# Guard before importing the driver: metadata-only checks must never construct a
# VM or derive a signing key. Pubkey/message constants are ordinary static data.
import solders.litesvm,solders.keypair
def forbidden(*a,**kw):raise AssertionError('Unexpected VM or signer construction during static binding check')
old_vm=solders.litesvm.LiteSVM;old_key=solders.keypair.Keypair
solders.litesvm.LiteSVM=forbidden
class NoKeypair:
 from_seed=staticmethod(forbidden)
solders.keypair.Keypair=NoKeypair
spec=importlib.util.spec_from_file_location('reviewed_driver',P/'harness/pump_general_route_differential.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
checks=[]
correct=m.bindings(R,candidate,report,src);common=m.bindings(R);assert {k:v for k,v in correct.items()if k!='candidate'}==common
checks.append({'name':'actual-isolated-source-and-candidate','pass':True,'source_inputs':len(correct['candidate']['relative_source_sha256'])});checks.append({'name':'strict-shared-original-candidate-bindings','pass':True})
for name,root in [('missing-explicit-root',None),('moving-main-is-not-candidate-source',R)]:
 try:m.bindings(R,candidate,report,root)
 except (AssertionError,FileNotFoundError)as e:checks.append({'name':name,'rejected':True,'message':str(e)})
 else:raise AssertionError(name)
with tempfile.TemporaryDirectory(prefix='route-source-binding-',dir=R/'work')as tmp:
 copy=Path(tmp)/'source';shutil.copytree(src,copy);q=copy/'programs/pump/src/multi_hop_curve.rs';raw=q.read_bytes()
 for name,mode in [('tampered-isolated-source','tamper'),('missing-isolated-source','missing')]:
  if mode=='tamper':q.write_bytes(raw+b'\n')
  else:q.unlink()
  try:m.bindings(R,candidate,report,copy)
  except (AssertionError,FileNotFoundError)as e:checks.append({'name':name,'rejected':True,'message':str(e).replace(tmp,'<temporary-copy>')})
  else:raise AssertionError(name)
assert len(checks)==6
(P/'static-binding-check.json').write_text(json.dumps({'runtime_executions':0,'vm_constructions':0,'signatures_created':0,'construction_guards':'LiteSVM and Keypair.from_seed replaced with fail-fast guards before import','checks':checks,'all_pass':True,'binding':correct,'strict_shared_binding_equal':True},indent=2)+'\n')
print(json.dumps({'all_pass':True,'checks':len(checks),'runtime_executions':0,'vm_constructions':0,'signatures_created':0}))
