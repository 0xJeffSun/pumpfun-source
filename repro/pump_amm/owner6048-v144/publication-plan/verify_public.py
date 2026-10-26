"""Saved-byte public reader/verifier. Optional deep checks never execute targets."""
from pathlib import Path
import argparse,json,hashlib,sys,tempfile,subprocess,importlib.util,importlib.metadata,platform,gzip,base64,traceback,struct
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda p:json.loads(p.read_bytes())
RUNTIME_HELPERS={'runtime/verify_runtime.py':'db4339f8ea2c1216fa5c47126822ebe8577e23c9fc7f2a4e32e1334b5e74909a','runtime/verify_nochange_logs.py':'aa553ae5c518a53ae41fd87eeeaa0839aabe4dea9ed338c7bf3c3a38a3ab9275'}
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
def portable_engine():
 assert sys.version_info[:2]in[(3,12),(3,14)],'Portable signature mode supports Python3.12/3.14 only'
 version=importlib.metadata.version('solders');assert version=='0.27.1','Portable signature mode requires solders0.27.1; no install or API fallback'
 spec=importlib.util.find_spec('solders');assert spec is not None and spec.origin;root=Path(spec.origin).parent
 return {'python_version':platform.python_version(),'python_sha256':H(Path(sys.executable)),'solders_version':version,'current_package_files':{str(p.relative_to(root)):H(p)for p in sorted(root.rglob('*'))if p.is_file()and'__pycache__'not in p.parts and p.suffix in['.py','.so','.pyd','.dylib']},'originating_runtime_byte_identity_asserted':False,'scope':'Current cryptographic API verification only; historical native maps stay independently checked'}
def portable_api_probe(T):
 # Decode ONLY an already-retained signed transaction. No transaction/message,
 # signer, fixture or VM is constructed, signed, submitted or executed.
 from solders.transaction import Transaction
 assert callable(Transaction.from_bytes)and callable(Transaction.verify_with_results)
 runs=J(T/'runtime/runtime-01/run.json');name=runs[0]['suite'];sidecar=T/'runtime/runtime-01'/(name+'-transactions.json.gz');raw=sidecar.read_bytes();assert hashlib.sha256(raw).hexdigest()==runs[0]['transaction_sidecar_sha256'];saved=json.loads(gzip.decompress(raw))['transactions'][0];signed=base64.b64decode(saved['transaction_base64'],validate=True);assert hashlib.sha256(signed).hexdigest()==saved['transaction_sha256']
 tx=Transaction.from_bytes(signed);checks=tx.verify_with_results();assert checks and all(checks)and len(checks)==saved['signature_count'];assert hasattr(tx.message,'account_keys')and hasattr(tx.message,'instructions')
 return {'existing_transaction_sha256':saved['transaction_sha256'],'existing_signature_fields_verified':len(checks),'api_from_bytes':True,'api_verify_with_results':True,'api_message_fields':True,'new_transactions_constructed':0,'probe_count_added_to_35418_total':False}
def check(root):
 rows=verify_physical(root)
 for name,record in rows.items():
  safe(root,name);hasher=hashlib.sha256();size=0
  for block in chunks(root,record):hasher.update(block);size+=len(block)
  assert size==record['bytes']and hasher.hexdigest()==record['sha256'],name
 get=lambda n:logical_bytes(root,n,rows);read=lambda n:json.loads(get(n));binding=J(root/'publication-binding.json');i=read('main/identity.json');r=read('runtime/runtime-summary.json');x=read('main/controller-exit.json')
 for name,h in RUNTIME_HELPERS.items():assert hashlib.sha256(get(name)).hexdigest()==h
 # Derived gzip exports preserve raw receipts, including logical split files.
 # They are separate physical exports, never replacements in logical-files.json.
 derived=J(root/'derived-exports.json');assert derived['schema']==1 and derived['codec']=='gzip'and derived['mtime']==0;exports=derived['exports'];runs=read('runtime/runtime-01/run.json');assert len(exports)==len(runs)==25
 assert{v['logical_raw_path']for v in exports}=={'runtime/runtime-01/'+v['suite']+'.json'for v in runs}
 for v in exports:
  name=v['logical_raw_path'];assert v['path']==name+'.gz'and v['path']not in rows;record=rows[name];assert v['logical_raw_sha256']==record['sha256']and v['logical_raw_bytes']==record['bytes'];p=safe(root,v['path']);compressed=p.read_bytes();assert len(compressed)==v['gzip_bytes']<=64*1024*1024 and H(p)==v['gzip_sha256'];assert compressed[:3]==b'\x1f\x8b\x08'and struct.unpack('<I',compressed[4:8])[0]==0;assert gzip.decompress(compressed)==get(name)
 proposed=read('selection-proposal/status.proposed.json');public=read('publication-plan/plan.json')['public_repository_relative_path'];assert set(proposed['pump_amm']['validation_reports'])=={public+'/'+v['path']for v in exports}
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
 a=argparse.ArgumentParser();mode=a.add_mutually_exclusive_group();mode.add_argument('--saved-deep',action='store_true');mode.add_argument('--runtime-signatures',action='store_true');a.add_argument('--json-result',action='store_true');a.add_argument('--current-main',type=Path);x=a.parse_args()
 result={'schema':'AMM_PUBLIC_RUNTIME_SIGNATURES_V1'if x.runtime_signatures else'AMM_PUBLIC_SAVED_CHECKS_V1','status':'FAIL','returncode':1,'verification_mode':'runtime_signatures'if x.runtime_signatures else'saved_deep'if x.saved_deep else'saved_bytes','verified_signatures':0,'verified_transactions':0,'verified_cases':0,'verified_nochange_messages':0,'originating_runtime_byte_identity_asserted':False,'current_cryptographic_validity_only':bool(x.runtime_signatures),'historical_engine_records_checked':False,'new_target_executions':0,'new_builds':0,'compiler_VM_runs':0,'strict6048_compared_diagnostic_coverage':0,'whole_original_equal':False,'live_old_preflight_or_HEAD_index_called':False,'children':[]};code=1
 try:
  rows=check(P);result.update(logical_files=len(rows),split_original_files=sum(len(r['parts'])>1 for r in rows.values()),derived_validation_gzip_exports=25,maximum_physical_payload_bytes=max((P/n).stat().st_size for n in J(P/'manifest.json')),historical_engine_records_checked=True)
  if x.current_main:
   source=json.loads(logical_bytes(P,'managed-plan/witness/proposed-source30.json',rows));R=x.current_main.absolute()
   for n,h in source.items():assert H(safe(R,n))==h,n
   relative='build-plan/source/scripts/build_source_manifest.py';helper=safe(P,relative);assert helper.read_bytes()==logical_bytes(P,relative,rows);expected=json.loads(logical_bytes(P,'managed-plan/witness/protected-before.json',rows))['scripts/build_source_manifest.py'];assert H(helper)==expected
   spec=importlib.util.spec_from_file_location('saved_source_inventory',helper);scanner=importlib.util.module_from_spec(spec);spec.loader.exec_module(scanner);crate=R/'programs/pump-amm';assert scanner.source_manifest(crate,crate,R,[crate/'vendor/solana-pubkey'],cwd=R)==source
   result['optional_current_source']={'source30_bytes_and_inventory_equal':True,'HEAD_index_requirement':False,'new_main_build_claimed':False,'active_helper_invoked':False}
  if x.saved_deep or x.runtime_signatures:
   if x.saved_deep:result['native_engine']=current_engine(saved_engine(P,rows));result['originating_runtime_byte_identity_asserted']=True
   else:result['portable_engine']=portable_engine()
   with tempfile.TemporaryDirectory(prefix='amm-owner-public-saved-',dir=P.parent)as td:
    T=Path(td)
    for name,record in rows.items():
     p=safe(T,name);p.parent.mkdir(parents=True,exist_ok=True)
     with p.open('xb')as out:
      for b in chunks(P,record):out.write(b)
     assert H(p)==record['sha256'];p.chmod(record['mode'])
    if x.runtime_signatures:result['api_probe']=portable_api_probe(T)
    commands=([('emitted/verify.py',[]),('spill/verify.py',[])]if x.saved_deep else[])+[('runtime/verify_runtime.py',['--verify']),('runtime/verify_nochange_logs.py',['--verify'])]
    stored=['runtime-summary.json','receipt-bindings.json','scalar-diagnostics.json','recipient-diagnostics.json','nochange-log-verification.json'];before={n:H(T/'runtime'/n)for n in stored}
    for relative,args in commands:
     argv=[sys.executable,'-B',str(T/relative),*args];empty=hashlib.sha256(b'').hexdigest();child={'saved_verifier':relative,'verifier_sha256':H(T/relative),'argv':argv,'arguments':args,'returncode':None,'stdout_base64':'','stderr_base64':'','stdout_bytes':0,'stderr_bytes':0,'stdout_sha256':empty,'stderr_sha256':empty};result['children'].append(child)
     try:completed=subprocess.run(argv,cwd=(T/relative).parent,capture_output=True)
     except BaseException:child['spawn_failure']=traceback.format_exc();raise
     child.update(returncode=completed.returncode,stdout_base64=base64.b64encode(completed.stdout).decode('ascii'),stderr_base64=base64.b64encode(completed.stderr).decode('ascii'),stdout_bytes=len(completed.stdout),stderr_bytes=len(completed.stderr),stdout_sha256=hashlib.sha256(completed.stdout).hexdigest(),stderr_sha256=hashlib.sha256(completed.stderr).hexdigest())
     assert base64.b64decode(child['stdout_base64'],validate=True)==completed.stdout and base64.b64decode(child['stderr_base64'],validate=True)==completed.stderr
     if not x.json_result:sys.stdout.buffer.write(completed.stdout);sys.stderr.buffer.write(completed.stderr)
     assert completed.returncode==0,(relative,completed.returncode)
     if relative=='runtime/verify_runtime.py':
      actual=json.loads(completed.stdout);assert actual['status']=='PASS'and actual['signature_count']==35418 and actual['transaction_count']==35074 and actual['case_count']==17462 and not actual['mismatches'];result.update(verified_signatures=actual['signature_count'],verified_transactions=actual['transaction_count'],verified_cases=actual['case_count'])
     if relative=='runtime/verify_nochange_logs.py':
      actual=json.loads(completed.stdout);assert actual['status']=='PASS'and actual['existing_message_cases']==113;result['verified_nochange_messages']=actual['existing_message_cases']
    assert before=={n:H(T/'runtime'/n)for n in stored},'Stored receipts changed; --verify mode must not produce replacements'
    assert result['verified_signatures']==35418 and result['verified_nochange_messages']==113;result['stored_receipt_identity_verified']=True
  result.update(status='PASS',returncode=0);code=0
 except BaseException as exc:result['failure']={'type':type(exc).__name__,'message':str(exc),'traceback':traceback.format_exc()}
 # --json-result always suppresses child forwarding. Each raw child stream is
 # losslessly base64 encoded above with its exact SHA and actual numeric exit.
 print(json.dumps(result,indent=2));return code
if __name__=='__main__':raise SystemExit(main())
