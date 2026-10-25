#!/usr/bin/env python3
"""Collect only allowlisted public Git blobs; never descend into work/ or outputs/."""
import subprocess, pathlib, hashlib, json, sys
ROOT=pathlib.Path(__file__).resolve().parent
REPO=pathlib.Path(sys.argv[1])
REFS={'baseline':'329fc44','accepted':'8099031'}
def git(*args): return subprocess.check_output(['git','-C',str(REPO),*args])
def sha(b): return hashlib.sha256(b).hexdigest()
def save(rel,b):
 p=ROOT/rel;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
records=[]; observations=[]
def capture(label,rev,path):
 assert path.startswith(('programs/','audit/','repro/','docs/')) or path in ('Cargo.toml','Cargo.lock')
 assert not any(x in path for x in ('private-security-review','security-followup','audit_coverage'))
 b=git('show',rev+':'+path)
 rel='evidence/'+label+'/'+path;save(rel,b)
 records.append({'path':rel,'git_path':path,'commit':git('rev-parse',rev).decode().strip(),'git_blob':git('rev-parse',rev+':'+path).decode().strip(),'sha256':sha(b),'bytes':len(b)})
 return b
for label,ref in REFS.items():
 paths=git('ls-tree','-r','--name-only',ref,'--','programs','Cargo.toml','Cargo.lock').decode().splitlines()
 for p in paths:
  if not (p.endswith(('.rs','Cargo.toml','Cargo.lock')) or '/idls/' in p):continue
  if p=='programs/pump/src/sell_v2.rs':
   observations.append({'path':p,'ref':label,'omitted':'stopped Pump sell_v2 lane; blob identity only','git_blob':git('rev-parse',ref+':'+p).decode().strip()});continue
  b=capture(label,ref,p)
  if label=='accepted':
   observations.append({'path':p,'accepted_sha256':sha(b),'working_sha256':sha((REPO/p).read_bytes()) if (REPO/p).is_file() else None,'published_head_blob':git('rev-parse','HEAD:'+p).decode().strip()})
 audit=git('ls-tree','-r','--name-only',ref,'--','audit').decode().splitlines()
 for p in audit:
  if p.endswith('.md') or p=='audit/local-validation.json':capture(label,ref,p)
for p in ['docs/COMPLETION.md','repro/status.json','repro/completion.json']:
 capture('accepted',REFS['accepted'],p)
s=json.loads((ROOT/'evidence/accepted/repro/status.json').read_text())
for program,v in s.items():
 package=str(pathlib.PurePosixPath(v['candidate_artifact']).parent)
 for p in [package+'/README.md',*v['validation_reports']]:
  capture('accepted',REFS['accepted'],p)
# No execution of archived verifiers, no runtime receipt semantic inspection, no archives.
save('provenance.json',(json.dumps({'commits':{k:git('rev-parse',v).decode().strip() for k,v in REFS.items()},'observed_publication_head':git('rev-parse','HEAD').decode().strip(),'blobs':records,'working_source_observations':observations},indent=2)+'\n').encode())
print(json.dumps({'captured_blobs':len(records),'bytes':sum(r['bytes'] for r in records)}))
