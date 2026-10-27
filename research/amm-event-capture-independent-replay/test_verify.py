"""Semantic and inventory negative controls on disposable packet copies."""
from pathlib import Path
import gzip,hashlib,json,shutil,subprocess,sys,tempfile
HERE=Path(__file__).resolve().parent
def seal(root):
    files={p.relative_to(root).as_posix():hashlib.sha256(p.read_bytes()).hexdigest() for p in root.rglob('*') if p.is_file() and p!=root/'manifest.json'}
    (root/'manifest.json').write_text(json.dumps(files,indent=2)+'\n')
def change_json(root,name,edit):
    p=root/name;raw=p.read_bytes();data=json.loads(gzip.decompress(raw) if p.suffix=='.gz' else raw);edit(data)
    new=(json.dumps(data,indent=2)+'\n').encode();p.write_bytes(gzip.compress(new,mtime=0) if p.suffix=='.gz' else new)
def body(root):
    p=root/'source/latest/trade_v2.rs';p.write_bytes(p.read_bytes().replace(b'let user = context.user;',b'let user = context.pool.key();',1))
def binary(root):
    p=root/'builds/latest-proposal/candidate.so.gz';b=bytearray(gzip.decompress(p.read_bytes()));b[5000]^=1;p.write_bytes(gzip.compress(b,mtime=0))
def signed(root):
    # Reseal the receipt hash as well: the transaction verifier must catch removal.
    name='focused/sell-transactions.json.gz'
    change_json(root,name,lambda d:d['transactions'].pop())
cases=[('source-body',body,True,'source'),('elf-byte',binary,True,''),
       ('invented-gain',lambda r:change_json(r,'static.json',lambda d:d['comparisons']['latest']['gained'].append(0)),True,'static'),
       ('removed-signed-input',signed,True,''),
       ('nested-manifest',lambda r:(r/'source/manifest.json').write_text('{}'),False,'inventory'),
       ('extra-file',lambda r:(r/'unexpected').write_text('extra'),False,'inventory')]
with tempfile.TemporaryDirectory(prefix='amm-event-negative-') as td:
    root=Path(td)/'packet'
    for name,mutate,reseal,reason in cases:
        shutil.copytree(HERE,root)
        mutate(root)
        if reseal:seal(root)
        result=subprocess.run([sys.executable,'-B',str(HERE/'verify.py'),'--packet',str(root)],capture_output=True,text=True)
        assert result.returncode!=0,(name,'accepted mutation')
        assert 'AssertionError' in result.stderr,(name,result.stderr)
        if reason:assert reason in result.stderr,(name,result.stderr)
        print(name,'rejected',flush=True)
        shutil.rmtree(root)
    result=subprocess.run([sys.executable,'-O','-B',str(HERE/'verify.py')],capture_output=True,text=True)
    assert result.returncode!=0 and 'Python -O is unsupported' in result.stderr
    print('optimized-python rejected',flush=True)
