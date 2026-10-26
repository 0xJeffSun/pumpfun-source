"""Passive Git delta capture only; do not run against a different destination."""
from pathlib import Path
import hashlib,json,subprocess
R=Path('/Users/shawwalters/Documents/Codex/2026-10-25/go/work/pumpfun-source/work/pr8-review');O=Path(__file__).resolve().parent
assert not(O/'preservation.json').exists()
def git(*args):return subprocess.check_output(['git','-C',str(R),*args])
head='723dfc91aad7506dd7ad4840e8eb8a726264bc84';main=git('rev-parse','origin/main').decode().strip();base=git('merge-base',main,head).decode().strip()
raw=git('diff','--raw','--abbrev=40','--no-renames','-z',base,head);(O/'metadata/diff.raw.z').write_bytes(raw)
entries=[];parts=raw.split(b'\0');assert parts.pop()==b'';assert len(parts)%2==0
objects={}
def preserve(oid,kind):
 if set(oid)=={'0'}:return
 key=kind+'/'+oid
 if key in objects:return
 b=git('cat-file',kind,oid);rel='objects/'+kind+'-'+oid+'.raw';(O/rel).write_bytes(b)
 assert hashlib.sha1(kind.encode()+b' '+str(len(b)).encode()+b'\0'+b).hexdigest()==oid
 objects[key]={'type':kind,'oid':oid,'file':rel,'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()}
for i in range(0,len(parts),2):
 h=parts[i].decode('ascii').split();path=parts[i+1].decode('utf8');assert h[0].startswith(':')and len(h)==5
 oldmode,newmode=h[0][1:],h[1];old,new,status=h[2:];assert len(old)==len(new)==40
 for oid,mode in [(old,oldmode),(new,newmode)]:
  if mode!='000000':assert mode in ['100644','100755','120000'];preserve(oid,'blob')
 entries.append({'path':path,'status':status,'base_mode':oldmode,'head_mode':newmode,'base_oid':old,'head_oid':new})
chain=git('rev-list','--topo-order',head,'^'+base).decode().splitlines();assert head in chain
for oid in [base,*chain]:preserve(oid,'commit')
for name,rev in [('base',base),('head',head),('observed-main',main)]:
 (O/f'metadata/{name}-commit.txt').write_bytes(git('show','--no-patch','--format=fuller','--no-show-signature',rev));preserve(rev,'commit')
(O/'metadata/commit-order.txt').write_text('\n'.join(chain)+'\n')
data={'schema':1,'repository':'https://github.com/lalalune/pumpfun-source','pr':14,'pr_head':head,'observed_main':main,'merge_base':base,'diff_command':['git','diff','--raw','--abbrev=40','--no-renames','-z',base,head],'commit_order':chain,'changes':entries,'objects':objects,'scope':'Passive lossless PR base-to-head delta and raw commit metadata; not selected active code, CI approval or merged state','reference_assembly':'Tool validation/roundtrip artifacts; not reconstructed-source byte equality','relay_status':'Active implementation unselected'}
(O/'preservation.json').write_text(json.dumps(data,indent=2)+'\n');print({'out':str(O),'changes':len(entries),'commits':len(chain),'objects':len(objects),'raw_bytes':sum(x['bytes']for x in objects.values())})
