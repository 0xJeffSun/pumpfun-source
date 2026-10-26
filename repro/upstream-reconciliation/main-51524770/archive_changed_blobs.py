"""Opaque Git-blob preservation only; never imports or interprets archived contents."""
from pathlib import Path
import json,hashlib,subprocess,os
P=Path(__file__).resolve().parent;env={**os.environ,'GIT_OPTIONAL_LOCKS':'0'}
rows=json.loads((P/'base2508-to-incoming515.json').read_text())
assert len(rows)==358
assert not any(any(s in r['path'] for s in ['private-security-review','security-followup','audit_coverage']) for r in rows)
objects={}
for r in rows:
 for side in ['before','after']:
  x=r[side]
  if x and x['kind']=='blob':objects.setdefault(x['oid'],[]).append({'path':r['path'],'side':side,'mode':x['mode']})
chunk_size=64*1024*1024;records=[]
for oid,memberships in sorted(objects.items()):
 size=int(subprocess.run(['git','cat-file','-s',oid],capture_output=True,check=True,env=env).stdout)
 proc=subprocess.Popen(['git','cat-file','blob',oid],stdout=subprocess.PIPE,stderr=subprocess.PIPE,env=env)
 folder=P/'opaque-objects'/oid;assert not folder.exists();folder.mkdir(parents=True)
 digest=hashlib.sha256();object_digest=hashlib.sha1(('blob '+str(size)+'\0').encode());remaining=size;parts=[];part=0
 while remaining or part==0:
  take=min(chunk_size,remaining);name=f'part{part:05d}.bin';target=folder/name;got=0;ph=hashlib.sha256()
  with target.open('wb') as out:
   while got<take:
    b=proc.stdout.read(min(1024*1024,take-got));assert b,'Unexpected Git blob EOF'
    out.write(b);digest.update(b);object_digest.update(b);ph.update(b);got+=len(b)
  os.chmod(target,0o644)
  parts.append({'path':str(target.relative_to(P)),'bytes':got,'sha256':ph.hexdigest()});remaining-=got;part+=1
 assert proc.stdout.read()==b'';err=proc.stderr.read();code=proc.wait();assert code==0 and not err
 assert object_digest.hexdigest()==oid
 records.append({'git_oid':oid,'git_object_kind':'blob','bytes':size,'raw_sha256':digest.hexdigest(),'parts':parts,'memberships':memberships,'archive_mode':'regular_nonexecuting_0644','actual_git_cat_file_exit':code,'semantic_interpretation':False})
(P/'opaque-object-inventory.json').write_text(json.dumps({'scope':'Exact raw changed-before/after Git blobs only, opaque content-addressed chunks; no archived code executed','chunk_limit':chunk_size,'objects':records,'all_changed_blob_memberships_preserved':True,'deleted_memberships_preserved':True,'symlinks_not_realized':True},indent=2)+'\n')
index={r['git_oid']:r for r in records}
for r in rows:
 for side in ['before','after']:
  x=r[side]
  if x and x['kind']=='blob':x.update({'sha256':index[x['oid']]['raw_sha256'],'bytes':index[x['oid']]['bytes'],'opaque_archive_oid':x['oid']})
(P/'incoming-exact-358-records.json').write_text(json.dumps(rows,indent=2)+'\n')
print(json.dumps({'changed_paths':len(rows),'unique_archived_blobs':len(records),'total_raw_blob_bytes':sum(r['bytes'] for r in records),'largest_raw_blob_bytes':max(r['bytes'] for r in records),'max_archive_chunk_bytes':max(p['bytes'] for r in records for p in r['parts']),'all_git_object_ids_recomputed':True,'opaque_only':True},indent=2))
