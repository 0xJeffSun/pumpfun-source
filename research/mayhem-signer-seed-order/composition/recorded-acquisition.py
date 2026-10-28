from pathlib import Path,PurePosixPath
import gzip,hashlib,io,json,subprocess,tarfile
W=Path(__file__).resolve().parent;R=W/'pumpfun-source';P=W/'mayhem-trade-signer-composition'
P.mkdir(exist_ok=False)
REV='ea2b4e13db1c4e3d81836a4bdacbf312697d74d1'
BASE='research/mayhem-current-trade-composition/'
names=['README.md','manifest.json','source-inputs.json','source.tar.xz','root-inputs.json','analysis.py','elf_helpers.py','window_map.py','builds/proposed/launch.json','builds/proposed/result.json','builds/proposed/preparation.json','builds/proposed/symbols.so.gz','builds/proposed/candidate.so.gz']
changes=['src/instructions/buy_v2.rs','src/instructions/pump_interface.rs','src/state.rs']
names += ['builds/proposed/overrides/'+n+'.gz' for n in changes]
def sha(b):return hashlib.sha256(b).hexdigest()
data=subprocess.run(['git','cat-file','--batch'],cwd=R,input=''.join(REV+':'+BASE+n+'\n' for n in names).encode(),capture_output=True,check=True).stdout
at=0;files={};records={}
for n in names:
    end=data.index(b'\n',at);oid,kind,size=data[at:end].split();assert kind==b'blob';size=int(size);b=data[end+1:end+1+size];at=end+size+2
    assert hashlib.sha1(b'blob '+str(size).encode()+b'\0'+b).hexdigest()==oid.decode()
    files[n]=b;records[n]=dict(git_blob=oid.decode(),bytes=size,sha256=sha(b));p=P/'upstream'/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
assert at==len(data)
manifest=json.loads(files['manifest.json']);print('manifest schema',list(manifest)[:8]);pins=json.loads(files['source-inputs.json']);print('source profiles',list(pins))
source={}
with tarfile.open(fileobj=io.BytesIO(files['source.tar.xz']),mode='r:xz') as tf:
    for m in tf.getmembers():
        n=PurePosixPath(m.name)
        assert m.isfile() and not n.is_absolute() and '..' not in n.parts and ':' not in m.name and '\\' not in m.name and m.name not in source
        source[m.name]=tf.extractfile(m).read()
parent={n:sha(b) for n,b in source.items()};assert len(parent)==67 and parent==pins['parent']
local=json.loads((W/'mayhem-current-cpi-order-control/source-acquisition.json').read_bytes())['source_inputs'];assert local==parent
for n in changes:source[n]=gzip.decompress(files['builds/proposed/overrides/'+n+'.gz'])
inputs={n:sha(b) for n,b in source.items()};assert inputs==pins['proposed'];assert sorted(n for n in parent if inputs[n]!=parent[n])==sorted(changes)
for n,b in source.items():p=P/'source'/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
for n in ['symbols.so','candidate.so']:(P/('upstream-'+n)).write_bytes(gzip.decompress(files['builds/proposed/'+n+'.gz']))
record=dict(revision=REV,main_reviewed=subprocess.check_output(['git','rev-parse','upstream/main'],cwd=R).decode().strip(),prefix=BASE,files=records,source_inputs=inputs,parent_inputs=parent,changed_source_files=changes,source_files=67,scope='Exact source of merged PR330; upstream runtime evidence is not transferred to new native controls.')
(P/'acquisition.json').write_text(json.dumps(record,indent=2)+'\n',encoding='utf-8')
print('Acquired exact67-input composition and complete upstream artifacts',record['main_reviewed'])
