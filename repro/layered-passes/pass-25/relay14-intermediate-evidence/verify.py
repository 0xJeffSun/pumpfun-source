#!/usr/bin/env python3
"""Saved archive-byte verification only; never imports or executes archived code."""
import pathlib,json,hashlib,tarfile,io,argparse
p=argparse.ArgumentParser();p.add_argument('--manifest-sha256',required=True);a=p.parse_args();P=pathlib.Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
assert H((P/'manifest.json').read_bytes())==a.manifest_sha256
m=json.loads((P/'manifest.json').read_text());actual=set()
for f in P.rglob('*'):
 assert not f.is_symlink(),f
 if f.is_file():actual.add(f.relative_to(P).as_posix())
assert actual==set(m)|{'manifest.json','manifest.sha256'}
assert (P/'manifest.sha256').read_text().split()[0]==a.manifest_sha256
for n,h in m.items():assert H((P/n).read_bytes())==h,n
b=json.loads((P/'archive-bindings.json').read_text());whole=hashlib.sha256()
for part in b['parts']:
 f=P/part['path'];assert f.stat().st_size==part['size']<=64*1024*1024
 h=hashlib.sha256()
 with f.open('rb') as stream:
  while block:=stream.read(1024*1024):h.update(block);whole.update(block)
 assert h.hexdigest()==part['sha256']
assert whole.hexdigest()==b['archive_sha256']
class Parts(io.RawIOBase):
 def __init__(self):self.i=0;self.f=None
 def readable(self):return True
 def readinto(self,out):
  while True:
   if self.f is None:
    if self.i==len(b['parts']):return 0
    self.f=(P/b['parts'][self.i]['path']).open('rb');self.i+=1
   n=self.f.readinto(out)
   if n:return n
   self.f.close();self.f=None
expected={x['path']:x for x in b['members']};seen={};manifests={};receipt=None
with tarfile.open(fileobj=io.BufferedReader(Parts()),mode='r|gz') as tar:
 for t in tar:
  assert t.name in expected and t.name not in seen,t.name
  assert not t.name.startswith('/') and '..' not in pathlib.PurePosixPath(t.name).parts
  x=expected[t.name];assert t.mode==(x['mode'] & 0o7777) and t.size==x['size'],t.name
  assert (t.isfile() and x['kind']=='file') or (t.isdir() and x['kind']=='directory'),t.name
  data=tar.extractfile(t).read() if t.isfile() else None
  assert (H(data) if data is not None else None)==x['sha256'],t.name
  seen[t.name]=x
  if t.name.endswith('/manifest.json') and t.name.count('/')==1:manifests[t.name.split('/')[0]]=data
  if t.name=='relay14-runtime-publication/root-observed/relay25-ordinary-runner-exit.json':receipt=json.loads(data)
assert set(seen)==set(expected)
for root,seal in b['inner_seals'].items():
 assert H(manifests[root])==seal
 for n,h in json.loads(manifests[root]).items():assert seen[root+'/'+n]['sha256']==h,n
assert receipt is not None
print(json.dumps({'passed':True,'members':len(seen),'inner_seals':b['inner_seals'],'root_observed_runtime_receipt':receipt,'execution':'none; historical intermediate archive bytes only'},sort_keys=True))
