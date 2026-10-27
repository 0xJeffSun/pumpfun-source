from pathlib import Path
import io,os,stat,json,hashlib,tarfile,subprocess,time,gzip
W=Path(__file__).parent
ROOT=Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/fees-next-trial')
REPO=Path('/Users/shawwalters/.codex/worktrees/relay-canonical-exact/pumpfun-source')
OUT=REPO/'research/fees-work-checkpoint-20261027';OUT.mkdir(exist_ok=True)
inv=json.loads((W/'inventory.json').read_text());records={};history=[];blobs={};sha=lambda b:hashlib.sha256(b).hexdigest();start=time.time()
archive_path=W/'checkpoint.tar.zst'
with archive_path.open('wb')as output:
 proc=subprocess.Popen(['zstd','-T4','-3','--long=27','-q','-c'],stdin=subprocess.PIPE,stdout=output)
 with tarfile.open(fileobj=proc.stdin,mode='w|',format=tarfile.PAX_FORMAT)as tar:
  def blob(data):
   h=sha(data)
   if h not in blobs:
    info=tarfile.TarInfo('blobs/'+h);info.size=len(data);info.mode=0o644;info.mtime=0;tar.addfile(info,io.BytesIO(data));blobs[h]=len(data)
   return h
  def save(name,path):
   before=path.stat();data=path.read_bytes();after=path.stat();row=dict(blob=blob(data),bytes=len(data),mode=stat.S_IMODE(before.st_mode),mtime_ns=before.st_mtime_ns)
   if(before.st_size,before.st_mtime_ns)!=(after.st_size,after.st_mtime_ns):row['changed_during_read']=True
   if name in records and records[name]['blob']!=row['blob']:history.append(dict(path=name,**records[name]))
   records[name]=row
  files=sorted(inv['files'],key=lambda r:(Path(r['path']).suffix,-r['bytes'],r['path']))
  for i,row in enumerate(files):
   path=ROOT/row['path']
   if not path.is_file():raise RuntimeError('File disappeared: '+str(path))
   save('fees-next-trial/'+row['path'],path)
   if(i+1)%10000==0:print(json.dumps(dict(files=i+1,blobs=len(blobs),unique_bytes=sum(blobs.values()))),flush=True)
  # Capture this chat's review reports and ownership ledger, not unrelated workspaces.
  notes=[REPO/'work/fees-root-current.md']+[p for p in (REPO/'work/pr-reviews').iterdir()if p.is_file()]
  for p in notes:save('task-notes/'+str(p.relative_to(REPO/'work')),p)
  # Preserve the superseded local guard proposal without activating its CI workflow.
  ref='d5342e9c07aeb840f8cccdfb2332f582b8595083'
  names=subprocess.check_output(['git','ls-tree','-r','--name-only',ref,'research/round9-current-transition'],cwd=REPO,text=True).splitlines()
  for name in names:
   data=subprocess.check_output(['git','show',ref+':'+name],cwd=REPO);records['superseded/'+name]=dict(blob=blob(data),bytes=len(data),mode=0o644,mtime_ns=0)
  # Refresh only outputs which changed while the initial streaming snapshot ran.
  changed=[]
  for name,row in list(records.items()):
   if not name.startswith('fees-next-trial/'):continue
   p=ROOT/name.removeprefix('fees-next-trial/');st=p.stat()
   if(st.st_size,st.st_mtime_ns)!=(row['bytes'],row['mtime_ns']):save(name,p);changed.append(name)
  index=dict(format='FEES_WORK_CHECKPOINT_V1',base_commit=subprocess.check_output(['git','rev-parse','HEAD'],cwd=REPO,text=True).strip(),created_unix=start,completed_unix=time.time(),scope='Unpublished source, scripts, reports and native/IR experiments; successes, failures, and prepared controls. Not a byte-identity acceptance certificate.',files=records,history=history,symlinks=inv['symlinks'],excluded=inv['excluded'],excluded_top=['sdk','target','parallel-admin-fast-target','parallel-donation-fast-target','parallel-sharing-fast-target','parallel-donation-direct-ir','parallel-sharing-direct-ir','__pycache__'],refreshed_files=changed,blobs=blobs)
  data=(json.dumps(index,separators=(',',':'),sort_keys=True)+'\n').encode();info=tarfile.TarInfo('INDEX.json');info.size=len(data);info.mode=0o644;info.mtime=0;tar.addfile(info,io.BytesIO(data))
 proc.stdin.close();code=proc.wait();assert code==0,code
(OUT/'index.json.gz').write_bytes(gzip.compress(data,mtime=0))
partdir=OUT/'archive';partdir.mkdir(exist_ok=True);parts=[];whole=hashlib.sha256();size=0
with archive_path.open('rb')as f:
 i=0
 while chunk:=f.read(32*1024*1024):
  p=partdir/f'checkpoint.tar.zst.part{i:03d}';p.write_bytes(chunk);parts.append(dict(path=str(p.relative_to(OUT)),bytes=len(chunk),sha256=sha(chunk)));whole.update(chunk);size+=len(chunk);i+=1
manifest=dict(format='FEES_WORK_CHECKPOINT_V1',base_commit=index['base_commit'],files=len(records),historical_versions=len(history),unique_blobs=len(blobs),logical_bytes=sum(r['bytes']for r in records.values()),unique_bytes=sum(blobs.values()),archive_bytes=size,archive_sha256=whole.hexdigest(),index_sha256=sha(data),index_gzip_sha256=sha((OUT/'index.json.gz').read_bytes()),parts=parts)
(OUT/'archive-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n');print(json.dumps(manifest),flush=True)
