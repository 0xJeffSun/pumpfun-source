"""Acquire immutable merged441 inputs, then build fresh native dependencies."""
from pathlib import Path,PurePosixPath
import gzip,hashlib,importlib.util,io,json,subprocess,tarfile
W=Path(__file__).resolve().parent;D=W/'mayhem-current441-native';D.mkdir(exist_ok=False);U=D/'upstream';U.mkdir()
REV='dc8f791d32ae7fd6d9660cd1bf003fb02737f78f';PREFIX='research/claude-mayhem-441-20261028/'
names=['README.md','sources/source.tar.gz','sources/source-inputs.json','builds/ordered.ld','builds/build-result.json','builds/repeat-build-result.json','builds/candidate.so.gz','builds/symbols.so.gz','builds/launch.json','builds/repeat-launch.json','notes/mg-M-raw-WIN-r441a-NOTES.md','notes/mg-M-o83c-BEST-NOTES.md','measurement/recomputed-elf.json']
refs=[REV+':'+PREFIX+n for n in names];result=subprocess.run(['git','cat-file','--batch'],input=('\n'.join(refs)+'\n').encode(),cwd=W/'pumpfun-source',capture_output=True,check=True);stream=io.BytesIO(result.stdout);manifest=[]
for name in names:
 header=stream.readline().decode().strip().split();assert len(header)==3 and header[1]=='blob',header;oid,_,size=header;data=stream.read(int(size));assert len(data)==int(size) and stream.read(1)==b'\n';assert hashlib.sha1(b'blob '+size.encode()+b'\0'+data).hexdigest()==oid
 p=U/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(data);manifest.append(dict(path=PREFIX+name,local=name,git_blob=oid,bytes=len(data),sha256=hashlib.sha256(data).hexdigest()))
assert not stream.read();(D/'acquisition.json').write_text(json.dumps(dict(revision=REV,files=manifest),indent=2)+'\n',encoding='utf-8')
source=D/'source';source.mkdir();files={}
with tarfile.open(U/'sources/source.tar.gz') as t:
 for m in t:
  n=PurePosixPath(m.name);assert m.isfile() and not n.is_absolute() and '..' not in n.parts and str(n)==m.name and m.name not in files
  files[m.name]=t.extractfile(m).read()
assert len(files)==67 and {n:hashlib.sha256(b).hexdigest() for n,b in files.items()}==json.loads((U/'sources/source-inputs.json').read_text())
for n,data in files.items():p=source/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(data)
s=importlib.util.spec_from_file_location('current441_build',W/'mayhem-amm-lifetimes/build_control.py');b=importlib.util.module_from_spec(s);s.loader.exec_module(b);b.L=D
label='01-shipped-linker';controller=b.prepare(label,source);(controller/'ordered-native.ld').write_bytes((U/'builds/ordered.ld').read_bytes());b.run(label,controller)
for local,remote in [('symbols.so','symbols.so.gz'),('candidate-v154-strip.so','candidate.so.gz')]:
 a=(D/('build-'+label)/local).read_bytes();z=gzip.decompress((U/'builds'/remote).read_bytes());print(local,'archived_raw_equal',a==z,'fresh_bytes',len(a),'archived_bytes',len(z),flush=True)
