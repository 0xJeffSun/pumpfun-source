from pathlib import Path
import subprocess,json,hashlib
P=Path('publication');m=json.loads((P/'provenance.json').read_text());repo='/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source';objs={}
def read(kind,oid):
 if oid in objs:return objs[oid][1]
 b=subprocess.check_output(['git','-C',repo,'cat-file',kind,oid]);assert hashlib.sha1(kind.encode()+b' '+str(len(b)).encode()+b'\0'+b).hexdigest()==oid
 objs[oid]=(kind,b);return b
def entries(b):
 out={};i=0
 while i<len(b):
  end=b.index(b'\0',i);mode,name=b[i:end].split(b' ',1);out[name.decode()]=(mode,b[end+1:end+21].hex());i=end+21
 return out
commit=read('commit',m['revision']);tree=commit.splitlines()[0].split()[1].decode()
for row in m['files']:
 oid=tree;parts=row['repository_path'].split('/')
 for part in parts[:-1]:oid=entries(read('tree',oid))[part][1]
 blob=entries(read('tree',oid))[parts[-1]][1];assert blob==row['git_blob']
(P/'git-objects').mkdir(exist_ok=True)
for oid,(kind,b) in objs.items():(P/'git-objects'/oid).write_bytes(b)
(P/'git-proof.json').write_text(json.dumps({'commit':m['revision'],'root_tree':tree,'objects':{k:v[0] for k,v in sorted(objs.items())}},indent=2)+'\n')
print('Git objects:',len(objs))
