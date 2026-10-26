#!/usr/bin/env python3
"""Only pure helper/filesystem/memory-response cases. No controller/acquisition/child program."""
from pathlib import Path
import ast,hashlib,http.client,importlib.util,json,os,tempfile,urllib.error
P=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('reviewed_helpers',P/'controller.py');c=importlib.util.module_from_spec(s);s.loader.exec_module(c)
passed=[]
def case(name,fn):fn();passed.append(name)
def rejects(fn):
 try:fn()
 except (ValueError,OSError):return
 raise AssertionError('negative case accepted')
class Stream:
 def __init__(self,parts,error=None):self.parts=list(parts);self.error=error;self.headers={}
 def read1(self,n):
  if self.parts:return self.parts.pop(0)
  if self.error:
   e=self.error;self.error=None;raise e
  return b''
 read=read1
 def close(self):pass
with tempfile.TemporaryDirectory(prefix='relay15-static-fixes-') as td:
 root=Path(td).resolve()
 home_original=os.environ.get('HOME')
 case('R1 inherited HOME exact',lambda: c.check(c.inherited_home_environment({'PATH':'/usr/bin:/bin'})['HOME']==home_original,'HOME mismatch'))
 case('R1 override HOME rejected',lambda:rejects(lambda:c.inherited_home_environment({'HOME':str(root/'other')})))
 for label,stream,expected in [
  ('HTTP200 prefix then timeout',Stream([b'prefix-',b'body'],TimeoutError('static timeout')),b'prefix-body'),
  ('HTTP200 IncompleteRead.partial',Stream([b'prefix-'],http.client.IncompleteRead(b'tail',20)),b'prefix-tail'),
  ('zero-byte failure',Stream([],TimeoutError('zero')),b'')]:
  path=root/(str(len(passed))+'.body');receipt={'status':200,'headers':[]}
  try:c.stream_http_body(stream,path,receipt)
  except (TimeoutError,http.client.IncompleteRead):receipt['exception']='retained test exception'
  else:raise AssertionError('failed stream accepted')
  assert path.read_bytes()==expected and receipt['body_complete'] is False and 'exception' in receipt
  assert c.digest(path)==hashlib.sha256(expected).hexdigest();passed.append('R2 '+label)
 fp=Stream([b'HTTP-error-prefix'],http.client.IncompleteRead(b'-tail',15))
 error=urllib.error.HTTPError('https://static.invalid/',503,'test only',{},fp)
 path=root/'HTTPError.body';receipt={'status':error.code,'headers':list(error.headers.items())}
 try:c.stream_http_body(error,path,receipt)
 except http.client.IncompleteRead:receipt['exception']='IncompleteRead'
 else:raise AssertionError('HTTPError partial accepted')
 assert path.read_bytes()==b'HTTP-error-prefix-tail' and receipt['body_complete'] is False and receipt['status']==503
 passed.append('R2 HTTPError prefix and partial retained')
 stream=Stream([b'complete']);path=root/'complete.body';receipt={};c.stream_http_body(stream,path,receipt)
 assert path.read_bytes()==b'complete' and receipt['body_complete'] is True;passed.append('R2 complete body positive')
 stream=Stream([b'short']);stream.headers={'Content-Length':'20'};receipt={}
 case('R2 premature EOF rejected',lambda:rejects(lambda:c.stream_http_body(stream,root/'short.body',receipt)))
 assert receipt['body_complete'] is False
 reg=root/'registry';src=reg/'src';ns=src/'approved-ns';pkg=ns/'a-1';pkg.mkdir(parents=True);member=pkg/'src.rs';member.write_bytes(b'known member')
 approved=[dict(name='a',version='1',source_namespace='approved-ns',files={'src.rs':hashlib.sha256(b'known member').hexdigest()})]
 case('R3 regular registry positive',lambda:c.reject_registry_links(reg,root))
 outside=root/'outside.rs';outside.write_bytes(b'outside must not be opened')
 member.unlink();member.symlink_to(outside)
 original_digest=c.digest;c.digest=lambda p:(_ for _ in ()).throw(AssertionError('digest before link rejection'))
 case('R3 source link rejected before hashing',lambda:rejects(lambda:c.reject_registry_links(reg,root)))
 c.digest=original_digest;member.unlink();member.write_bytes(b'known member')
 for label,container in [('package',pkg),('namespace',ns)]:
  moved=container.with_name(container.name+'-saved');container.rename(moved);container.symlink_to(moved,target_is_directory=True)
  case('R3 '+label+' container link rejected',lambda:rejects(lambda:c.reject_registry_links(reg,root)))
  container.unlink();moved.rename(container)
 cache=reg/'cache';cache.mkdir();arc=cache/'a.crate';arc.symlink_to(outside)
 case('R3 archive link rejected',lambda:rejects(lambda:c.reject_registry_links(reg,root)));arc.unlink()
 fifo=cache/'special';os.mkfifo(fifo)
 case('R3 special member rejected',lambda:rejects(lambda:c.reject_registry_links(reg,root)));fifo.unlink()
 case('R4 canonical approved exact member positive',lambda:c.canonical_registry_source(member,src,approved))
 case('R4 parent traversal rejected',lambda:rejects(lambda:c.canonical_registry_source(pkg/'../../outside.rs',src,approved)))
 wrong=src/'wrong-ns/a-1';wrong.mkdir(parents=True);(wrong/'src.rs').write_bytes(b'known member')
 case('R4 unexpected namespace rejected',lambda:rejects(lambda:c.canonical_registry_source(wrong/'src.rs',src,approved)))
 unknown=pkg/'unknown.rs';unknown.write_bytes(b'unknown')
 case('R4 unknown member rejected',lambda:rejects(lambda:c.canonical_registry_source(unknown,src,approved)))
 member.write_bytes(b'changed')
 case('R4 wrong approved member SHA rejected',lambda:rejects(lambda:c.canonical_registry_source(member,src,approved)))
 member.unlink();member.symlink_to(outside)
 case('R4 member symlink rejected',lambda:rejects(lambda:c.canonical_registry_source(member,src,approved)))
 for key in ['CURL_HOME','CURL_CA_BUNDLE','https_proxy','SSL_CERT_FILE']:
  case('R5 '+key+' rejected',lambda key=key:rejects(lambda:c.reject_curl_configuration_environment({key:'unreviewed'})))
 case('R5 ordinary inherited HOME environment allowed',lambda:c.reject_curl_configuration_environment({'HOME':home_original,'PATH':'/usr/bin:/bin'}))
 tree=ast.parse((P/'controller.py').read_text())
 curl_lists=[n for n in ast.walk(tree) if isinstance(n,ast.List) and n.elts and isinstance(n.elts[0],ast.Constant) and n.elts[0].value=='/usr/bin/curl']
 assert len(curl_lists)==1 and curl_lists[0].elts[1].value=='-q';passed.append('R5 curl -q first option AST contract')
 assert os.environ.get('HOME')==home_original;passed.append('R1 parent HOME unchanged throughout')
print(json.dumps(dict(status='PASS_STATIC_HELPER_CASES',cases=passed,case_count=len(passed),controller_main_invocations=0,acquisition_function_invocations=0,network_requests=0,child_processes=0,new_builds=0,new_target_executions=0,original_or_candidate_program_bytes_read=0),sort_keys=True))
