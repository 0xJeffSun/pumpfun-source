"""Independent raw Git and sealed-package audit; no archived code execution."""
from pathlib import Path
import hashlib,json,subprocess,collections
P=Path(__file__).resolve().parent;W=P.parent;R=W/'pr8-review';Q=W/'pr14-passive-preservation';H=lambda b:hashlib.sha256(b).hexdigest()
def git(*a):return subprocess.check_output(['git','-C',str(R),*a])
def batch(specs):
 raw=git('cat-file','--batch') if False else subprocess.check_output(['git','-C',str(R),'cat-file','--batch'],input=b''.join(x.encode()+b'\n'for x in specs))
 at=0;out=[]
 for spec in specs:
  end=raw.index(b'\n',at);header=raw[at:end].split();assert len(header)==3,header;n=int(header[2]);start=end+1;b=raw[start:start+n];assert raw[start+n:start+n+1]==b'\n';at=start+n+1;out.append((header[0].decode(),header[1].decode(),b))
 assert at==len(raw);return out
mraw=(Q/'manifest.json').read_bytes();seal=H(mraw);assert seal=='0f7d82e07190f93fbd4580feee366d7cf9bde60be5da57a0c14de28a6823de93'
m=json.loads(mraw)['files'];assert not any(x.is_symlink() for x in Q.rglob('*'));assert set(m)|{'manifest.json','manifest.sha256'}=={str(x.relative_to(Q))for x in Q.rglob('*')if x.is_file()}
for n,r in m.items():
 b=(Q/n).read_bytes();assert H(b)==r['sha256']and len(b)==r['bytes']
d=json.loads((Q/'preservation.json').read_bytes());head=d['pr_head'];base=d['merge_base'];main=d['observed_main']
assert git('merge-base',main,head).decode().strip()==base
raw=git('diff','--raw','--abbrev=40','--no-renames','-z',base,head);assert raw==(Q/'metadata/diff.raw.z').read_bytes()
a=raw.split(b'\0');assert a.pop()==b'';rows=[]
for i in range(0,len(a),2):
 h=a[i].decode().split();rows.append(dict(path=a[i+1].decode(),status=h[4],base_mode=h[0][1:],head_mode=h[1],base_oid=h[2],head_oid=h[3]))
assert rows==d['changes'] and len(rows)==1898 and collections.Counter(x['status']for x in rows)=={'A':1892,'M':3,'D':3}
assert git('rev-list','--topo-order',head,'^'+base).decode().splitlines()==d['commit_order']
objs=list(d['objects'].values());got=batch([x['oid'] for x in objs]);total=0
for r,(oid,kind,b)in zip(objs,got,strict=True):
 assert kind==r['type']and oid==r['oid']and b==(Q/r['file']).read_bytes()and len(b)==r['bytes']and H(b)==r['sha256'];total+=len(b)
 assert hashlib.sha1(kind.encode()+b' '+str(len(b)).encode()+b'\0'+b).hexdigest()==oid
assert len(objs)==941 and total==135818055
receipt=json.loads((W/'pr14-reconciliation-commit.json').read_bytes());c=receipt['commit'];assert receipt['base']==main and receipt['incoming_head']==head
commit=git('cat-file','commit',c);headers=commit.split(b'\n\n',1)[0].splitlines();assert [x[7:].decode()for x in headers if x.startswith(b'parent ')]==[head,main];assert headers[0]==('tree '+receipt['tree']).encode()
prefix='repro/upstream-reconciliation/pr14-723dfc91/'
parts=git('diff-tree','--no-commit-id','--raw','--abbrev=40','--no-renames','-r','-z',main,c).split(b'\0');assert parts.pop()==b'';names=[]
for i in range(0,len(parts),2):
 h=parts[i].decode().split();name=parts[i+1].decode();assert h[4]=='A'and h[0]==':000000'and h[1]=='100644'and name.startswith(prefix);names.append(name)
assert set(names)=={prefix+n for n in set(m)|{'manifest.json','manifest.sha256'}}and len(names)==receipt['new_package_files']==954
for name,(oid,kind,b)in zip(names,batch([c+':'+n for n in names]),strict=True):assert kind=='blob'and b==(Q/name[len(prefix):]).read_bytes()
result=dict(status='PASS_RAW_GIT_AND_PASSIVE_RECONCILIATION',candidate_commit=c,candidate_parents=[head,main],package_seal=seal,delta_paths=1898,delta_statuses={'A':1892,'M':3,'D':3},pr_commits=10,raw_objects=941,raw_object_bytes=135818055,new_package_files=954,all_existing_main_paths_unchanged=True,all_package_git_blobs_exact=True,changed_active_programs_scripts_workflows_status_attrs=0,original_body_or_elf_parsing=0,archived_code_execution=0,compiler_runtime_network_execution=0,pushed_or_merged_by_review=False,limitations=['Current main has inherited failing source bindings; no green CI claim.','Incoming Relay source is preserved only, not selected or accepted.','Reference-derived assembly is tool validation, not independent Rust byte identity.'])
(P/'result.json').write_text(json.dumps(result,indent=2)+'\n');(P/'candidate-commit.raw').write_bytes(commit);print(json.dumps(result,indent=2))
