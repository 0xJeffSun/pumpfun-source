"""Read-only passive Git-object preservation verifier. No Git or archived tools execute."""
from pathlib import Path,PurePosixPath
import argparse,hashlib,json,collections
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--expected-seal',required=True);args=ap.parse_args()
 assert __debug__,'Do not run Python with -O'
 raw=(P/'manifest.json').read_bytes();seal=H(raw);assert seal==args.expected_seal and(P/'manifest.sha256').read_text().strip()==seal
 manifest=json.loads(raw);actual={str(x.relative_to(P))for x in P.rglob('*')if x.is_file()}-{'manifest.json','manifest.sha256'}
 assert actual==set(manifest['files'])
 for name,record in manifest['files'].items():
  pp=PurePosixPath(name);assert not pp.is_absolute()and'..'not in pp.parts
  path=P/name;assert not path.is_symlink();b=path.read_bytes();assert len(b)==record['bytes']and H(b)==record['sha256']
 d=json.loads((P/'preservation.json').read_text());assert d['pr_head']=='723dfc91aad7506dd7ad4840e8eb8a726264bc84'
 diff=(P/'metadata/diff.raw.z').read_bytes().split(b'\0');assert diff.pop()==b''and len(diff)%2==0
 rows=[]
 for i in range(0,len(diff),2):
  h=diff[i].decode('ascii').split();assert len(h)==5 and h[0].startswith(':')
  rows.append({'path':diff[i+1].decode('utf8'),'status':h[4],'base_mode':h[0][1:],'head_mode':h[1],'base_oid':h[2],'head_oid':h[3]})
 assert rows==d['changes']and len(rows)==1898 and len({x['path']for x in rows})==1898
 assert collections.Counter(x['status']for x in rows)=={'A':1892,'M':3,'D':3}
 for key,r in d['objects'].items():
  b=(P/r['file']).read_bytes();assert r['type']in['blob','commit']and key==r['type']+'/'+r['oid']
  assert len(b)==r['bytes']and H(b)==r['sha256']
  assert hashlib.sha1(r['type'].encode()+b' '+str(len(b)).encode()+b'\0'+b).hexdigest()==r['oid']
 for row in rows:
  path=PurePosixPath(row['path']);assert not path.is_absolute()and'..'not in path.parts
  for end in ['base','head']:
   mode,oid=row[end+'_mode'],row[end+'_oid'];assert len(oid)==40
   if mode=='000000':assert oid=='0'*40
   else:assert mode in['100644','100755','120000']and'blob/'+oid in d['objects']
  if row['status']=='A':assert row['base_mode']=='000000'
  if row['status']=='D':assert row['head_mode']=='000000'
 assert len(d['objects'])==941 and sum(r['bytes']for r in d['objects'].values())==135818055
 chain=d['commit_order'];assert len(chain)==len(set(chain))==10 and chain[0]==d['pr_head']
 assert (P/'metadata/commit-order.txt').read_text().splitlines()==chain
 allowed=set(chain)|{d['merge_base']}
 for oid in chain:
  raw=(P/d['objects']['commit/'+oid]['file']).read_bytes();headers=raw.split(b'\n\n',1)[0].splitlines()
  assert any(x.startswith(b'tree ')and len(x)==45 for x in headers)
  parents=[x[7:].decode()for x in headers if x.startswith(b'parent ')]
  assert parents and all(x in allowed for x in parents)
 for oid in[d['merge_base'],d['observed_main']]:assert'commit/'+oid in d['objects']
 print('PASS: seal '+seal+'; 1898 changed paths (1892 additions, 3 modifications, 3 deletions), exact modes and both-side blobs; 10 PR commits; 941 raw Git objects; 135818055 object bytes.')
 print('Passive capture only. Reference assembly is tool validation; Relay implementation remains unselected. No merge, CI-success or source byte-identity claim.')
if __name__=='__main__':main()
