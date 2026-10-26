"""Saved-byte public reader/verifier. Optional deep checks never execute targets."""
from pathlib import Path
import argparse,json,hashlib,sys,tempfile,subprocess,importlib.util,importlib.metadata,platform
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda p:json.loads(p.read_bytes())
def safe(root,rel):
 assert not Path(rel).is_absolute()and'..'not in Path(rel).parts;p=root/rel
 for q in[p,*p.parents]:
  if q==root.parent:break
  assert not q.is_symlink(),q
 return p
def verify_physical(root):
 assert H(root/'manifest.json')==(root/'manifest.sha256').read_text().split()[0];files=J(root/'manifest.json');assert set(files)=={str(p.relative_to(root))for p in root.rglob('*')if p.is_file()and p not in[root/'manifest.json',root/'manifest.sha256']}
 for p in root.rglob('*'):assert not p.is_symlink(),p
 for n,h in files.items():assert H(safe(root,n))==h and(root/n).stat().st_size<=64*1024*1024,n
 return J(root/'logical-files.json')
def chunks(root,record):
 for part in record['parts']:
  p=safe(root,part['path']);assert p.stat().st_size==part['bytes']and H(p)==part['sha256'];yield p.read_bytes()
def logical_bytes(root,name,rows=None):
 record=(J(root/'logical-files.json')if rows is None else rows)[name];b=b''.join(chunks(root,record));assert len(b)==record['bytes']and hashlib.sha256(b).hexdigest()==record['sha256'];return b
def saved_engine(root,rows):
 read=lambda n:json.loads(logical_bytes(root,n,rows));g=read('runtime/independent-after-gates.json');planned=read('runtime-template/planned-current-engine.json');actual=g['runtime_engine']['observed'];before=g['template_integrity']['observed']['planned_engine']
 assert len(g)==7 and all(v['returncode']==0 for v in g.values());assert actual==before and all(actual[k]==planned[k]for k in actual)
 assert actual['solders_version']=='0.27.1';return actual
def current_engine(expected):
 spec=importlib.util.find_spec('solders');assert spec is not None and spec.origin;root=Path(spec.origin).parent
 actual={'python_sha256':H(Path(sys.executable)),'python_version':platform.python_version(),'solders_version':importlib.metadata.version('solders'),'package_files':{str(p.relative_to(root)):H(p)for p in sorted(root.rglob('*'))if p.is_file()and'__pycache__'not in p.parts and p.suffix in['.py','.so','.pyd','.dylib']}}
 assert all(actual[k]==expected[k]for k in actual),'Current native engine bytes differ; historical receipt identities remain valid but deep execution is refused'
 return {'current_native_bytes_equal_to_saved_engine':True,'python_executable_current':sys.executable,'historical_paths_treated_as_labels':True,'historical_earlier_native_bytes_claimed':False}
def check(root):
 rows=verify_physical(root)
 for name,record in rows.items():
  safe(root,name);hasher=hashlib.sha256();size=0
  for block in chunks(root,record):hasher.update(block);size+=len(block)
  assert size==record['bytes']and hasher.hexdigest()==record['sha256'],name
 get=lambda n:logical_bytes(root,n,rows);read=lambda n:json.loads(get(n));binding=J(root/'publication-binding.json');i=read('main/identity.json');r=read('runtime/runtime-summary.json');x=read('main/controller-exit.json')
 assert x['returncode']==x['build_helper_returncode']==0 and i['whole_candidate_equal']and i['whole_symbols_equal']
 assert hashlib.sha256(get('main/candidate.so')).hexdigest()==binding['candidate_sha256']==i['actual_candidate_sha256'];assert hashlib.sha256(get('main/unstripped.so')).hexdigest()==binding['symbols_sha256']==i['actual_symbols_sha256']
 assert r['suite_count']==25 and r['case_count']==17462 and r['signature_count']==35418 and r['transaction_count']==35074 and not r['mismatches']
 assert read('runtime/controller-exit.json')['returncode']==0
 for role,seal in [('emitted','d153ca5c4bee7e592e363e5622db0c2f1e8462c170604fe5aed7c59cc59dd806'),('spill','ec888cb60bc9e09163ddd8f4ad817011045c788d2c19a053f59bf4ac46f43d89')]:assert hashlib.sha256(get(role+'/manifest.json')).hexdigest()==seal
 # Every current-source/build claim is made from these SAVED actual observations.
 # No managed controller, old preflight, Git command or live root path is called.
 for n,h in binding['actual_main_record_sha256'].items():assert hashlib.sha256(get('main/'+n)).hexdigest()==h
 assert hashlib.sha256(get('root-observed/main-runner-exit.json')).hexdigest()==binding['actual_main_root_receipt_sha256'];outer=read('root-observed/main-runner-exit.json');assert outer['returncode']==0 and outer['actual_terminal_completion_observed']is True
 for n in ['stdout','stderr']:assert hashlib.sha256(get('root-observed/main-runner.'+n)).hexdigest()==outer[n+'_sha256']
 gates=read('main/independent-after-gates.json');assert len(gates)==11 and all(v['returncode']==0 for v in gates.values());assert read('main/backend-diagnostics.json')['diagnostic_gate_passed']and read('main/backend-diagnostics.json')['backend_error_count']==0
 assert i['source_overlay_used']is False;source=read('managed-plan/witness/proposed-source30.json');assert len(source)==30
 report=read('main/build-01/build-comparison.json');attempt=read('main/build-01/build-attempt.json');assert report['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']==i['actual_managed_source30']==source and attempt['returncode']==0 and attempt['source_unchanged']
 assert source==read('runtime/proposed-source-sha256.json')==read('emitted/plan/proposed-source30.json')
 for n,h in source.items():
  for base in ['main/source','runtime/source','scratch-build/source']:assert hashlib.sha256(get(base+'/'+n)).hexdigest()==h
 launch=read('main/build-launch.json');historical=read('managed-plan/plan.json');assert launch['genuine_managed_source']is True and launch['source_overlay_compiler_input']is False and launch['command'][launch['command'].index('--manifest')+1]==historical['managed_root']+'/programs/pump-amm/Cargo.toml'
 assert hashlib.sha256(get('managed-plan/manifest.json')).hexdigest()==binding['managed_main_plan_seal']
 saved_engine(root,rows)
 return rows
def main():
 a=argparse.ArgumentParser();a.add_argument('--saved-deep',action='store_true');a.add_argument('--current-main',type=Path);x=a.parse_args();rows=check(P);executed=[];native=None;live=None
 if x.current_main:
  source=json.loads(logical_bytes(P,'managed-plan/witness/proposed-source30.json',rows));R=x.current_main.absolute()
  for n,h in source.items():assert H(safe(R,n))==h,n
  # Invoke only the already-reviewed archived pure filesystem inventory helper,
  # never an active helper, old controller/preflight, Cargo or Git.
  relative='build-plan/source/scripts/build_source_manifest.py';helper=safe(P,relative);assert helper.read_bytes()==logical_bytes(P,relative,rows)
  expected=json.loads(logical_bytes(P,'managed-plan/witness/protected-before.json',rows))['scripts/build_source_manifest.py'];assert H(helper)==expected
  spec=importlib.util.spec_from_file_location('saved_source_inventory',helper);scanner=importlib.util.module_from_spec(spec);spec.loader.exec_module(scanner);crate=R/'programs/pump-amm';assert scanner.source_manifest(crate,crate,R,[crate/'vendor/solana-pubkey'],cwd=R)==source
  live={'source30_bytes_and_inventory_equal':True,'HEAD_index_requirement':False,'new_main_build_claimed':False,'active_helper_invoked':False}
 if x.saved_deep:
  native=current_engine(saved_engine(P,rows))
  # All original bytes, including >64MiB raw receipts, are restored losslessly
  # in this disposable tree. Compiler/runtime controllers remain uninvoked.
  with tempfile.TemporaryDirectory(prefix='amm-owner-public-saved-',dir=P.parent)as td:
   T=Path(td)
   for name,record in rows.items():
    p=safe(T,name);p.parent.mkdir(parents=True,exist_ok=True)
    with p.open('xb')as out:
     for b in chunks(P,record):out.write(b)
    assert H(p)==record['sha256'];p.chmod(record['mode'])
   for relative in ['emitted/verify.py','spill/verify.py','runtime/verify_runtime.py','runtime/verify_nochange_logs.py']:
    result=subprocess.run([sys.executable,'-B',str(T/relative)],cwd=(T/relative).parent,capture_output=True);sys.stdout.buffer.write(result.stdout);sys.stderr.buffer.write(result.stderr);assert result.returncode==0,(relative,result.returncode);executed.append({'saved_verifier':relative,'returncode':result.returncode,'stdout_sha256':hashlib.sha256(result.stdout).hexdigest(),'stderr_sha256':hashlib.sha256(result.stderr).hexdigest()})
 print(json.dumps({'status':'PASS_LOSSLESS_PUBLIC_SAVED_BYTES','logical_files':len(rows),'split_original_files':sum(len(r['parts'])>1 for r in rows.values()),'maximum_physical_payload_bytes':max((P/n).stat().st_size for n in J(P/'manifest.json')),'saved_verifiers':executed,'native_engine':native,'optional_current_source':live,'live_old_preflight_or_HEAD_index_called':False,'compiler_VM_runs':0,'strict6048_compared_diagnostic_coverage':0,'whole_original_equal':False},indent=2))
if __name__=='__main__':main()
