"""Record membership anew for the second fresh dependency cohort."""
from pathlib import Path
import hashlib,json,subprocess
D=Path(__file__).resolve().parent;W=D.parent;P=D/'publication';B=D/'build-02-native-selectors';mapping=json.loads((P/'selector-map.json').read_text());inputs=json.loads((B/'link/invocation.json').read_text())['inputs'];by_name={Path(x['path']).name:x for x in inputs};ar=W/'mayhem-native-build/sdk/llvm/bin/llvm-ar.exe';sha=lambda b:hashlib.sha256(b).hexdigest();cache={};rows=[]
for row in mapping['bindings']:
 if row['kind']=='archive-member':
  archive,member=row['translated'].lstrip('*').split(':',1);r=by_name[archive];p=Path(r['path'])
  if p not in cache:cache[p]=subprocess.run([str(ar),'t',str(p)],capture_output=True,check=True).stdout.decode().splitlines()
  assert cache[p].count(member)==1;data=subprocess.run([str(ar),'p',str(p),member],capture_output=True,check=True).stdout
  rows.append(dict(selector=row['translated'],archive_sha256=sha(p.read_bytes()),member_sha256=sha(data),matches=1,bytes=len(data)))
 else:
  r=by_name[row['translated'].lstrip('*')];p=B/'link'/r['retained'] if r['retained'] else Path(r['path']);data=p.read_bytes();rows.append(dict(selector=row['translated'],object_sha256=sha(data),bytes=len(data)))
 assert sha(data)==row.get('member_sha256',row.get('sha256')),'selected object content changed'
(P/'second-cohort-members.json').write_text(json.dumps(rows,indent=2)+'\n',encoding='utf-8')
changed={r['translated'].split(':',1)[0] for r,q in zip(mapping['bindings'],rows) if r['kind']=='archive-member' and r['archive_sha256']!=q['archive_sha256']}
print('All',len(rows),'selected object contents equal; differing full archive hashes:',len(changed),sorted(changed))
