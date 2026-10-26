"""Current toolchain file identity only. Never execute compiler/LLVM/SDK binaries."""
from pathlib import Path
import os,stat,hashlib,json,datetime,subprocess,re
P=Path(__file__).resolve().parent
ROOT=Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/fees-compat/toolchains/v1.44')
AVAIL=P.parent/'cto-wallet-collector-build-plan/availability.json'
H=lambda b:hashlib.sha256(b).hexdigest()
def sha_regular(path):
 before=path.lstat();assert stat.S_ISREG(before.st_mode)
 fd=os.open(path,os.O_RDONLY|os.O_NOFOLLOW)
 try:
  s=os.fstat(fd);assert(s.st_dev,s.st_ino)==(before.st_dev,before.st_ino)
  h=hashlib.sha256();prefix=b''
  while chunk:=os.read(fd,1024*1024):
   if not prefix:prefix=chunk[:8]
   h.update(chunk)
  after=os.fstat(fd)
 finally:os.close(fd)
 end=path.lstat();assert(before.st_dev,before.st_ino,before.st_mode,before.st_size,before.st_mtime_ns)==(after.st_dev,after.st_ino,after.st_mode,after.st_size,after.st_mtime_ns)==(end.st_dev,end.st_ino,end.st_mode,end.st_size,end.st_mtime_ns)
 return h.hexdigest(),prefix.hex()
def entries(hash_files=True):
 result={}
 def walk(directory):
  for e in sorted(os.scandir(directory),key=lambda x:x.name):
   path=Path(e.path);s=path.lstat();name=str(path.relative_to(ROOT));row={'mode':oct(stat.S_IMODE(s.st_mode)),'bytes':s.st_size,'mtime_ns':s.st_mtime_ns}
   if stat.S_ISLNK(s.st_mode):
    target=os.readlink(path);lexical=Path(os.path.normpath(str(path.parent/target)));resolved=path.resolve(strict=False)
    row.update(type='symlink',target=target,lexical_target=str(lexical),resolved_target=str(resolved),resolved_inside_tree=resolved.is_relative_to(ROOT),followed=False)
   elif stat.S_ISDIR(s.st_mode):row['type']='directory'
   elif stat.S_ISREG(s.st_mode):
    row['type']='regular'
    if hash_files:row['sha256'],row['first8_hex']=sha_regular(path)
   else:row['type']='other';row['st_mode']=s.st_mode
   result[name]=row
   if row['type']=='directory':walk(path)
 walk(ROOT);return result
def collect():
 assert not(P/'inventory.json').exists(),'No overwrite of completed current inventory'
 started=datetime.datetime.now(datetime.timezone.utc).isoformat();before=entries(False);full=entries(True);after=entries(False)
 assert before==after=={n:{k:v for k,v in r.items()if k not in['sha256','first8_hex']}for n,r in full.items()},'Tree changed during inventory'
 availability_raw=AVAIL.read_bytes();(P/'availability-control.json').write_bytes(availability_raw);a=json.loads(availability_raw);pins={}
 for name,r in a['tools'].items():
  path=Path(r['path']);digest,magic=sha_regular(path);assert digest==r['sha256'];pins[name]={'path':str(path),'sha256':digest,'first8_hex':magic,'mode':oct(stat.S_IMODE(path.lstat().st_mode)),'bytes':path.stat().st_size,'inside_v144_tree':path.is_relative_to(ROOT)}
 outputs=P/'otool';outputs.mkdir();commands=[];unique={r['path']:r for r in pins.values()}
 for i,(name,r)in enumerate(sorted(unique.items())):
  assert r['first8_hex'][:8]in['cffaedfe','cefaedfe','feedfacf','feedface','cafebabe','bebafeca','cafebabf','bfbafeca'],name
  for option in['-L','-l']:
   cmd=['/usr/bin/otool',option,name];child=subprocess.run(cmd,capture_output=True);stem=str(i)+('-libraries'if option=='-L'else'-load-commands');(outputs/(stem+'.stdout')).write_bytes(child.stdout);(outputs/(stem+'.stderr')).write_bytes(child.stderr);commands.append({'argv':cmd,'returncode':child.returncode,'input_sha256':r['sha256'],'stdout_file':'otool/'+stem+'.stdout','stdout_sha256':H(child.stdout),'stderr_file':'otool/'+stem+'.stderr','stderr_sha256':H(child.stderr)});assert child.returncode==0
  assert sha_regular(Path(name))[0]==r['sha256']
 result={'scope':'CURRENT after-the-fact filesystem inventory and selected-tool Mach-O metadata; not build-before/after, historical provenance or actual loaded/compiled-unit closure','root':str(ROOT),'started_utc':started,'finished_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'tree_membership_and_metadata_unchanged_during_hashing':True,'entries':full,'seven_prior_tool_pins':pins,'unique_pinned_binary_paths':len(unique),'otool_commands':commands,'otool_frontend_sha256':sha_regular(Path('/usr/bin/otool'))[0],'compiler_or_selected_tool_executions':0,'network_requests':0,'external_symlink_trees_followed':0,'availability_control_sha256':H(availability_raw)}
 (P/'inventory.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({'entries':len(full),'regular_files':sum(r['type']=='regular'for r in full.values()),'regular_bytes':sum(r['bytes']for r in full.values()if r['type']=='regular'),'symlinks':sum(r['type']=='symlink'for r in full.values()),'unique_tool_paths':len(unique),'otool_commands':len(commands)},indent=2))
if __name__=='__main__':collect()
