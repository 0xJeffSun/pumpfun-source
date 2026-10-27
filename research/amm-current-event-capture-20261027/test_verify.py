"""Reject corrupted current-parent composition evidence, including resealed changes."""
from pathlib import Path
import gzip,hashlib,json,os,shutil,subprocess,sys,tempfile
HERE=Path(__file__).resolve().parent

def seal(root):
    d={p.relative_to(root).as_posix():hashlib.sha256(p.read_bytes()).hexdigest() for p in root.rglob('*') if p.is_file() and p!=root/'manifest.json'}
    (root/'manifest.json').write_text(json.dumps(d,indent=2)+'\n')
def change_json(root,name,fn):
    p=root/name;b=p.read_bytes();d=json.loads(gzip.decompress(b)if p.suffix=='.gz' else b);fn(d);b=(json.dumps(d,indent=2)+'\n').encode();p.write_bytes(gzip.compress(b,mtime=0)if p.suffix=='.gz'else b)
def elf(root):
    p=root/'builds/first/candidate.so.gz';b=bytearray(gzip.decompress(p.read_bytes()));b[5000]^=1;p.write_bytes(gzip.compress(b,mtime=0))
def source(root):
    p=root/'source/trade_v2.rs';s=p.read_bytes();assert b'let user = context.user;'in s;p.write_bytes(s.replace(b'let user = context.user;',b'let user = context.pool.key();',1))
cases=[('source',source,True),('elf',elf,True),('count',lambda r:change_json(r,'measurement.json',lambda d:d.update(normalized=642)),True),('signature',lambda r:change_json(r,'focused/sell-transactions.json.gz',lambda d:d['transactions'].pop()),True),('extra',lambda r:(r/'extra').write_text('extra'),False),('special',lambda r:os.mkfifo(r/'fifo'),False)]
with tempfile.TemporaryDirectory(prefix='amm-current-negative-')as td:
    root=Path(td)/'packet'
    for name,fn,reseal in cases:
        shutil.copytree(HERE,root);fn(root)
        if reseal:seal(root)
        r=subprocess.run([sys.executable,'-B',str(HERE/'verify.py'),'--packet',str(root)],capture_output=True,text=True)
        assert r.returncode!=0,(name,'accepted');print(name,'rejected',flush=True);shutil.rmtree(root)
    r=subprocess.run([sys.executable,'-O','-B',str(HERE/'verify.py')],capture_output=True,text=True)
    assert r.returncode!=0 and 'Python -O is unsupported'in r.stderr
    print('optimized Python rejected')
