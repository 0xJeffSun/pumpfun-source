"""Stdlib Git-object and saved selected-ELF verification; no native subprocess."""
from pathlib import Path
import json,hashlib
from analyze import P,analyze,H
from extract import render
J=lambda p:json.loads(p.read_text())
m=J(P/'manifest.json');assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f.name!='manifest.json'}
for n,v in m.items():b=(P/n).read_bytes();assert H(b)==v['sha256']and len(b)==v['bytes'],n
refs=J(P/'git-references.json');assert refs['commit']=='67608d457c096cebf73f1685f78f2f0ab9f9bdb0';types=J(P/'git-object-types.json')
def oid(kind,b):return hashlib.sha1(kind.encode()+b' '+str(len(b)).encode()+b'\0'+b).hexdigest()
for h,kind in types.items():assert oid(kind,(P/'git-objects'/h).read_bytes())==h
commit=(P/'git-objects'/refs['commit']).read_bytes();root=commit.splitlines()[0].split()[1].decode()
def entries(h):
 assert types[h]=='tree';b=(P/'git-objects'/h).read_bytes();i=0;out={}
 while i<len(b):
  j=b.index(b' ',i);k=b.index(b'\0',j);out[b[j+1:k].decode()]=(b[i:j].decode(),b[k+1:k+21].hex());i=k+21
 assert i==len(b);return out
for path,row in refs['files'].items():
 b=(P/row['local']).read_bytes();assert H(b)==row['sha256']and len(b)==row['bytes']and oid('blob',b)==row['git_blob'];tree=root
 for part in path.split('/')[:-1]:mode,tree=entries(tree)[part];assert mode in['40000','040000']
 mode,h=entries(tree)[path.split('/')[-1]];assert mode in['100644','100755']and h==row['git_blob']
for name,h in J(P/'prior-references.json').items():
 q=P.parent/name;assert H((q/'manifest.json').read_bytes())==h
 for n,v in J(q/'manifest.json').items():assert H((q/n).read_bytes())==(v if isinstance(v,str)else v['sha256']),n
proof=analyze();assert proof==J(P/'proof.json');b=(P/'git-inputs/main/candidate.so').read_bytes()
for f in proof['functions']:assert(P/(str(f['start'])+'.asm')).read_text()==render(b,f['start'],f['end'])
for path,h in proof['source37'].items():assert refs['files'][path]['sha256']==h
old=J(P.parent/'pump-6092-static-recovery/witness.json');assert proof['constructor_names']['6092']==old['error_name']and proof['messages'][2]['text']==old['message']
print('PASS: exact PR12commit/tree/blob selected artifacts+root37source;9complete bounded emitted bodies;6019/6091namedguards/directWSOL32literal+early6092owned;late6092/order/eligibility/origin limits retained;no build/runtime/neworiginalcollection')
