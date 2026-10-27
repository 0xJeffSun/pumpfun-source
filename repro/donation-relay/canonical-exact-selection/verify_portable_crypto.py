"""PROPOSED explicit saved-crypto routes; lossless streams, no native-identity fiction."""
from pathlib import Path
import argparse,json,subprocess,os,base64,hashlib,sys,re,tempfile,traceback
from verify_selection import authenticate
authenticate()
from common import *
def raw_record(role,argv,child):
 return {'role':role,'argv':argv,'returncode':child.returncode,'stdout_base64':base64.b64encode(child.stdout).decode('ascii'),'stderr_base64':base64.b64encode(child.stderr).decode('ascii'),'stdout_sha256':hashlib.sha256(child.stdout).hexdigest(),'stderr_sha256':hashlib.sha256(child.stderr).hexdigest(),'stdout_bytes':len(child.stdout),'stderr_bytes':len(child.stderr)}
def emit(status,results,interpreter=None,error=None):
 print(json.dumps({'status':status,'current_crypto_interpreter':interpreter,'new_target_executions':0,'new_builds':0,'originating_runtime_byte_identity_asserted':False,'results':results,'error':error},indent=2))
def validate_amm_contract(result,script,executable,contract):
 # Logical helper bytes are authenticated in the installed public package.
 # Temporary argv paths are checked lexically only: the reviewed reader deletes them.
 assert result['schema']==contract['schema']
 for key,value in contract['success_fields_required_after_actual_helper_verification'].items():assert type(result[key])is type(value)and result[key]==value,(key,result[key])
 engine=result['portable_engine'];assert engine['python_version'].startswith('3.12.')and engine['solders_version']=='0.27.1'and engine['originating_runtime_byte_identity_asserted']is False
 assert engine['python_sha256']==H(Path(executable)) # Current engine only; historical native identity remains separate.
 rows=J(script.parent/'logical-files.json');children=result['children'];expected=contract['exact_child_verifiers'];assert len(children)==len(expected)==2;temporary_root=None
 for c,e in zip(children,expected):
  assert c['saved_verifier']==e['saved_verifier']and c['verifier_sha256']==e['verifier_sha256']and c['arguments']==e['arguments']==['--verify']
  assert type(c['returncode'])is int and c['returncode']==0
  argv=c['argv'];assert len(argv)==4 and argv[0]==executable and argv[1]=='-B'and argv[3]=='--verify'
  helper=Path(argv[2]);assert helper.is_absolute()and'..'not in helper.parts
  relative=helper.relative_to(script.parent.parent);assert len(relative.parts)==3 and re.fullmatch(r'amm-owner-public-saved-[A-Za-z0-9_-]+',relative.parts[0])
  assert Path(*relative.parts[1:]).as_posix()==e['saved_verifier']
  tmp=script.parent.parent/relative.parts[0]
  if temporary_root is None:temporary_root=tmp
  else:assert temporary_root==tmp
  # Do not stat/resolve/follow the expired temporary path. Authenticate logical parts instead.
  record=rows[e['saved_verifier']];assert record['sha256']==e['verifier_sha256'];hasher=hashlib.sha256();count=0
  for part in record['parts']:
   file=safe(script.parent,part['path']);data=file.read_bytes();assert len(data)==part['bytes']and hashlib.sha256(data).hexdigest()==part['sha256'];hasher.update(data);count+=len(data)
  assert count==record['bytes']and hasher.hexdigest()==e['verifier_sha256']
  stdout=base64.b64decode(c['stdout_base64'],validate=True);stderr=base64.b64decode(c['stderr_base64'],validate=True)
  assert type(c['stdout_bytes'])is int and type(c['stderr_bytes'])is int
  assert len(stdout)==c['stdout_bytes']and len(stderr)==c['stderr_bytes']
  assert hashlib.sha256(stdout).hexdigest()==c['stdout_sha256']and hashlib.sha256(stderr).hexdigest()==c['stderr_sha256']
 return True
def capture_child(role,argv,cwd,env,popen_factory=None):
 # Temporary raw streams survive nonzero exits and caught wait/spawn failures.
 proc=None;failure=None
 with tempfile.TemporaryFile()as stdout,tempfile.TemporaryFile()as stderr:
  try:
   proc=(subprocess.Popen if popen_factory is None else popen_factory)(argv,cwd=cwd,env=env,stdout=stdout,stderr=stderr)
   try:proc.wait()
   except BaseException:
    failure=traceback.format_exc()
    try:
     proc.terminate()
     try:proc.wait(timeout=30)
     except subprocess.TimeoutExpired:proc.kill();proc.wait()
    except BaseException:failure+='\n'+traceback.format_exc()
  except BaseException:failure=traceback.format_exc()
  stdout.seek(0);stderr.seek(0);out=stdout.read();err=stderr.read()
  record={'role':role,'argv':argv,'process_started':proc is not None,'returncode':None if proc is None else proc.returncode,'stdout_base64':base64.b64encode(out).decode('ascii'),'stderr_base64':base64.b64encode(err).decode('ascii'),'stdout_sha256':hashlib.sha256(out).hexdigest(),'stderr_sha256':hashlib.sha256(err).hexdigest(),'stdout_bytes':len(out),'stderr_bytes':len(err)}
  if failure is not None:record['process_failure']=failure
  return record
def main():
 p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);p.add_argument('--metadata',type=Path,required=True);p.add_argument('--expected-metadata-seal');p.add_argument('--python312',type=Path,required=True);a=p.parse_args();root=a.repo.resolve();D=a.metadata.resolve();ctx=metadata_context(root,D,a.expected_metadata_seal);F=ctx.current();assert J(D/'bindings.json')==F
 A=ctx.oldA # Exact historical AMM identity remains valid; current assets are checked by the NEW transition context.
 env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'};results=[]
 argv=[str(a.python312),'-B','-c','import sys,json,importlib.metadata;assert sys.version_info[:2]==(3,12);assert importlib.metadata.version("solders")=="0.27.1";print(json.dumps({"executable":sys.executable,"version":sys.version,"solders":"0.27.1"}))'];probe=capture_child('current portable Python identity only',argv,root,env);results.append(probe)
 if probe['returncode']!=0 or 'process_failure'in probe:emit('FAIL_PORTABLE_PYTHON',results);return 1
 try:interpreter=json.loads(base64.b64decode(probe['stdout_base64'],validate=True))
 except Exception as error:emit('FAIL_PORTABLE_PROBE_JSON',results,error=str(error));return 1
 # Preserve the previous Pump/Mayhem saved-signature gates as exact explicit routes, outside the catalogue.
 routes=[{'role':'Pump385 saved signatures','package':{'path':'repro/pump/remaining-guards-fortyeight','sha256':'38558828d8187996e6f9f06db2b4054af7e65e29345a85f4417f71558312beba'},'script':'verify.py','args':['--expected-seal','38558828d8187996e6f9f06db2b4054af7e65e29345a85f4417f71558312beba','--runtime-signatures'],'output':'lossless raw; numeric success gate'}, {'role':'Mayhemf5 saved signatures','package':{'path':'repro/mayhem/compiler-v154-main','sha256':'f5d514664d47a04cc22282fdd19ca9e01d835c8a335aa9acc3f637fc61650acc'},'script':'verify.py','args':['--accepted-root',str(root),'--runtime-signatures'],'output':'lossless raw; numeric success gate'}, {'role':'Relay15 portable ordinary','package':{'path':'repro/donation-relay/source-build-15-owned-arithmetic','sha256':'7dd4661a57c13430b7186fcc21ec7e1649fe9a17350faf95b52b1d9661ec8ce3'},'script':'verify.py','args':[],'output':'single JSON nativefalse'}, {'role':'Relay15 historical checkpoint','package':{'path':'repro/donation-relay/source-build-15-selection-v3','sha256':'010aea888bd359eaf46a6a512fd85477893cf9115213858b7ca6639fea42c8b0'},'script':'verify.py','args':['--expected-seal','010aea888bd359eaf46a6a512fd85477893cf9115213858b7ca6639fea42c8b0','--checkpoint',str(root/'repro/donation-relay/source-build-15-owned-arithmetic')],'output':'single JSON nativefalse'}]
 amm=A['portable_AMM_crypto'];assert amm['mode']=='saved-signatures-only'and amm['originating_native_runtime_identity_asserted']is False
 assert amm['package']['path']==A['public']['path']and amm['package']['sha256']==A['public']['sha256']
 assert amm['script']=='verify_public.py'and amm['args']==['--runtime-signatures','--json-result']
 assert amm['script_sha256']=='5d839d4d7e1c2bf1940722ed5f2e09fc74bba510c5256744732d3770dc0d0edb'
 routes.append(amm)
 for row in routes:
  ctx.row(row['package']);script=safe(root/row['package']['path'],row['script'])
  if row is amm:assert H(script)==amm['script_sha256']
  argv=[str(a.python312),'-B',str(script),*row['args']];record=capture_child(row['role'],argv,root,env);results.append(record)
  if record['returncode']!=0 or 'process_failure'in record:emit('FAIL_SAVED_CHILD',results,interpreter);return 1
  if row is amm or row['output']=='single JSON nativefalse':
   try:result=json.loads(base64.b64decode(record['stdout_base64'],validate=True))
   except Exception as error:emit('FAIL_SINGLE_JSON_CONTRACT',results,interpreter,str(error));return 1
   if result.get('originating_runtime_byte_identity_asserted')is not False:emit('FAIL_NATIVE_IDENTITY_CONTRACT',results,interpreter);return 1
   if row is amm:
    try:
     validate_amm_contract(result,script,interpreter['executable'],J(ctx.old/'seed/AMM-portable-result-contract.json'))
     record['single_result_envelope']=result # Retain every inner raw stream and exit, not only its digest.
    except Exception as error:emit('FAIL_AMM_CRYPTO_CONTRACT',results,interpreter,str(error));return 1
 # The current exact Relay artifact also retains its own 536-record bounded replay.
 argv=[str(a.python312),'-B',str(root/'repro/donation-relay/linked-elf-reproduction/verify.py')]
 record=capture_child('Relay492 exact artifact and 536 saved replay records',argv,root,env);results.append(record)
 if record['returncode']!=0 or 'process_failure'in record:emit('FAIL_RELAY492_SAVED_REPLAY',results,interpreter);return 1
 emit('PASS_PORTABLE_SAVED_CRYPTO_ONLY',results,interpreter);return 0
if __name__=='__main__':raise SystemExit(main())
