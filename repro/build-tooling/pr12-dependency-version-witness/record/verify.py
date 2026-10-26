from pathlib import Path
import hashlib,json
from analyze import analyze
P=Path(__file__).resolve().parent;J=lambda p:json.loads(p.read_text());H=lambda b:hashlib.sha256(b).hexdigest()
m=J(P/'manifest.json');assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f!=P/'manifest.json'}
for n,h in m.items():assert H((P/n).read_bytes())==h,n
r=J(P/'references.json');assert r['commit']=='67608d457c096cebf73f1685f78f2f0ab9f9bdb0'
def oid(kind,b):return hashlib.sha1(kind.encode()+b' '+str(len(b)).encode()+b'\0'+b).hexdigest()
for h,kind in r['types'].items():assert oid(kind,(P/'objects'/h).read_bytes())==h
c=(P/'objects'/r['commit']).read_bytes();root=c.splitlines()[0].split()[1].decode();assert root==r['root_tree']
def entries(h):
 assert r['types'][h]=='tree';b=(P/'objects'/h).read_bytes();i=0;out={}
 while i<len(b):
  j=b.index(b' ',i);k=b.index(b'\0',j);out[b[j+1:k].decode()]=(b[i:j].decode(),b[k+1:k+21].hex());i=k+21
 assert i==len(b);return out
for name,row in r['files'].items():
 b=(P/'inputs'/name).read_bytes();assert H(b)==row['sha256']and len(b)==row['bytes']and oid('blob',b)==row['blob'];tree=root
 for part in name.split('/')[:-1]:mode,tree=entries(tree)[part];assert mode in ['40000','040000']
 mode,h=entries(tree)[name.split('/')[-1]];assert mode==row['mode']and h==row['blob']
assert analyze()==J(P/'result.json')
print('PASS: Git-authenticated selected locks/manifests/vendor/receipt version witness; mixedAnchorpatches/lockvscompiled/original/JS limits explicit')
