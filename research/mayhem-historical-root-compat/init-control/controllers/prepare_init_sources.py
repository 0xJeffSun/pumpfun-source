from pathlib import Path
import hashlib,json,shutil
W=Path(__file__).resolve().parent;P=W/'mayhem-historical-init-needed';B=P/'historical-before';A=P/'historical-after'
def ident(b):return dict(bytes=len(b),sha256=hashlib.sha256(b).hexdigest())
def blob(b):return hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
shutil.copytree(W/'mayhem-historical-borsh/historical-after',B);shutil.copytree(B,A)
changes=json.loads((P/'changed-files.json').read_bytes())
for row in changes:
    b=row['text'].encode();assert blob(b)==row['sha'],row['path'];(A/row['path']).write_bytes(b)
snapshots={}
for stage,root in [('before',B),('after',A)]:
    tree=json.loads((P/('tree-'+stage+'.json')).read_bytes());rows={r['path']:r for r in tree['files']};files={p.relative_to(root).as_posix():p.read_bytes() for p in root.rglob('*') if p.is_file()}
    assert not tree['truncated'] and len(files)==150 and files.keys()==rows.keys()
    for n,b in files.items():assert rows[n]['mode']=='100644' and rows[n]['size']==len(b) and rows[n]['sha']==blob(b),n
    snapshots[stage]={n:ident(b) for n,b in files.items()}
assert (A/'Cargo.lock').read_bytes()==(B/'Cargo.lock').read_bytes()
shutil.copyfile(W/'mayhem-historical-borsh/remaining-analysis/init-if-needed-commit.json',P/'upstream-commit.json')
(P/'source-acquisition.json').write_text(json.dumps(dict(**snapshots,changed=sorted(r['path'] for r in changes),prior_borsh_source_identical=True,target_executions=0),indent=2)+'\n',encoding='utf-8')
print('Authenticated 150 before and 150 after Git blobs; prior Borsh source is identical to selected parent files')
