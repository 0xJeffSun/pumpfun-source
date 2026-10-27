from pathlib import Path
import gzip, hashlib, json, shutil, subprocess, tomllib
W=Path(__file__).resolve().parent;R=W/'pumpfun-source';P=W/'mayhem-curve-native';C=W/'mayhem-parallel-native';C.mkdir(exist_ok=False)
REV='d6e3792ceb3f2e72118bc75bd41db84c28c4ef65';prefix='research/mayhem-parallel-recovery'
def blob(n):return subprocess.check_output(['git','show',REV+':'+n],cwd=R)
def sha(b):return hashlib.sha256(b).hexdigest()
for n in ['sources','builds']:shutil.copytree(P/n,C/n)
for n in ['build.py','sdk-components.json.gz','target-components.json','vendor-inputs.json']:shutil.copyfile(P/n,C/n)
manifest=json.loads(blob(prefix+'/manifest.json'));names=subprocess.check_output(['git','ls-tree','-r','--name-only',REV,prefix+'/overrides'],cwd=R,text=True).splitlines()
assert len(names)==19
for name in names:
 data=blob(name);assert sha(data)==manifest[name.removeprefix(prefix+'/')]
 dest=C/'sources'/(name.removeprefix(prefix+'/overrides/')+'.gz');dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(gzip.compress(data,mtime=0))
launch=json.loads(blob(prefix+'/builds/recovered/launch.json'));rows=[]
for p in(C/'sources').rglob('*.gz'):
 name=p.relative_to(C/'sources').as_posix().removesuffix('.gz');data=gzip.decompress(p.read_bytes());rows.append(dict(path=name,bytes=len(data),sha256=sha(data)))
assert len(rows)==60 and{r['path']:r['sha256']for r in rows}==launch['source_inputs']==json.loads(blob(prefix+'/source-inputs.json'))
old=tomllib.loads(gzip.decompress((P/'sources/Cargo.lock.gz').read_bytes()).decode());new=tomllib.loads(gzip.decompress((C/'sources/Cargo.lock.gz').read_bytes()).decode())
registry=lambda lock:{(p['name'],p['version'],p['source']):p['checksum']for p in lock['package']if 'checksum'in p}
assert registry(old)==registry(new) and len(registry(new))==214
(C/'source-inputs.json').write_text(json.dumps(dict(revision=REV,source_files=rows,parent_launch=launch),indent=2)+'\n',encoding='utf8',newline='\n')
for name in ['artifacts/recovered/symbols.so.gz','audit.json','builds/recovered/stderr.gz','builds/recovered/launch.json']:
 data=blob(prefix+'/'+name);assert sha(data)==manifest[name]
 (C/('published-'+Path(name).name)).write_bytes(data)
(C/'published-symbols.so').write_bytes(gzip.decompress((C/'published-symbols.so.gz').read_bytes()))
print('Prepared 60 exact source inputs and unchanged 214 registry package pins at',REV)
