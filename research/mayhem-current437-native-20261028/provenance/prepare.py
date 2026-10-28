from pathlib import Path,PurePosixPath
import gzip,hashlib,io,json,shutil,subprocess,tarfile
W=Path(__file__).resolve().parent;R=W/'pumpfun-source';D=W/'mayhem-current437-native';D.mkdir(exist_ok=True);REV='317ae39d097620176f5c42474a8082edc90d3160';PREFIX='research/mayhem-current437-composition-20261028/'
sha=lambda b:hashlib.sha256(b).hexdigest()
def save(p,v):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,indent=2)+'\n',encoding='utf-8')
names=['README.md','manifest.json','composition.json','source.tar.gz','composed-inputs.json','source-inputs.parent.json','source.patch','inventory.json','static.json','tools-observed.json','builds/first/launch.json','builds/first/result.json','builds/first/invocation.json','builds/first/default.ld','builds/first/ordered.ld','builds/first/symbols.so.gz','builds/first/candidate.so.gz']
observations=[]
for n in names:
 path=PREFIX+n;data=subprocess.run(['git','cat-file','blob',REV+':'+path],cwd=R,capture_output=True,check=True).stdout;oid=subprocess.run(['git','rev-parse',REV+':'+path],cwd=R,capture_output=True,text=True,check=True).stdout.strip();assert hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()==oid
 out=D/'upstream'/n;out.parent.mkdir(parents=True,exist_ok=True);out.write_bytes(data);observations.append(dict(path=path,git_blob=oid,bytes=len(data),sha256=sha(data)))
manifest=json.loads((D/'upstream/manifest.json').read_bytes());assert all(sha((D/'upstream'/n).read_bytes())==manifest[n] for n in names if n!='manifest.json')
files={}
with tarfile.open(fileobj=io.BytesIO(gzip.decompress((D/'upstream/source.tar.gz').read_bytes())),mode='r:') as archive:
 for m in archive:
  n=PurePosixPath(m.name);assert m.isfile() and not n.is_absolute() and '..' not in n.parts and ':' not in m.name and '\\' not in m.name and m.name==str(n) and m.name not in files;files[m.name]=archive.extractfile(m).read()
assert len(files)==67 and {n:sha(b) for n,b in files.items()}==json.loads((D/'upstream/composed-inputs.json').read_bytes())
C=D/'controller';shutil.copytree(W/'mayhem-allocator-provider/controller',C)
old=json.loads((C/'source-inputs.json').read_bytes());changed=[]
for row in old['source_files']:
 n=row['path'];path=C/'sources'/(n+'.gz');previous=gzip.decompress(path.read_bytes());assert sha(previous)==row['sha256']
 if previous!=files[n]:changed.append(dict(path=n,before_bytes=len(previous),before_sha256=sha(previous),after_bytes=len(files[n]),after_sha256=sha(files[n])));path.write_bytes(gzip.compress(files[n],mtime=0))
 row.update(bytes=len(files[n]),sha256=sha(files[n]))
assert [x['path'] for x in changed]==['src/instructions/fee_recipients.rs'];save(C/'source-inputs.json',old)
source=(D/'upstream/builds/first/ordered.ld').read_bytes();parent=(W/'mayhem-qualified436-native/upstream/builds/first/ordered.ld').read_bytes();assert source==parent,'upstream linker script changed: port actual object identities before compiling'
save(D/'acquisition.json',dict(revision=REV,prefix=PREFIX,files=observations))
save(D/'composition.json',dict(parent_controller='work/mayhem-allocator-provider/controller',parent_commit='f5046001e9862341bed9cce5ca92c8cc1208c7b4',changed_source_inputs=changed,upstream_link_script_equal_parent=True,compiler_metadata_and_path_maps_unchanged=True,scope='Exactly one current437 source input replaces the archived436 input. All compiler, metadata, path and linker recipe bytes remain unchanged.'))
print('Acquired',len(names),'Git blobs;67sourcefiles;changed',[x['path'] for x in changed],'; identical upstream linker script')
