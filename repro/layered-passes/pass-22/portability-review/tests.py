"""Saved-only standard-library portable/mutation tests. Never build/run target/sign/network.
Copies public packets with hardlinks; every mutation uses atomic replacement or
unlink on copies only. Original file hashes are checked again after all cases.
"""
from pathlib import Path
import argparse,hashlib,json,os,shutil,subprocess,sys,tempfile
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def atomic(p,b):
 t=p.with_name(p.name+'.mutation.tmp');t.write_bytes(b);os.replace(t,p)
def encoded(v):return(json.dumps(v,indent=2)+'\n').encode()
def reseal(p):
 m=json.loads((p/'manifest.json').read_text());object_values=isinstance(next(iter(m.values())),dict)
 for n in m:
  f=p/n;m[n]={'sha256':H(f),'bytes':f.stat().st_size}if object_values else H(f)
 atomic(p/'manifest.json',encoded(m));atomic(p/'manifest.sha256',(H(p/'manifest.json')+'  manifest.json\n').encode())
def linked(src,dst):shutil.copytree(src,dst,copy_function=os.link)
def main():
 a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);a.add_argument('--work',type=Path,required=True);args=a.parse_args();R=args.repo.resolve();W=args.work.resolve();W.mkdir(parents=True,exist_ok=True)
 paths={'pump':'repro/pump/admin-cto-error-batch-main-fortyeight','fees':'repro/pump_fees/sharing-fourth-cpi-main-v144','relay':'repro/donation-relay/source-build-12-selection','checkpoint':'repro/donation-relay/source-build-12-idl-discriminator-owned'}
 originals={k:R/v for k,v in paths.items()};before={str(f):H(f)for p in originals.values()for f in p.rglob('*')if f.is_file()};results=[]
 with tempfile.TemporaryDirectory(prefix='isolated-',dir=W)as temp:
  T=Path(temp);copies={k:T/k for k in ['pump','fees','relay']}
  for k,p in copies.items():linked(originals[k],p)
  root=T/'current-root';root.mkdir()
  def filecopy(src,dst):dst.parent.mkdir(parents=True,exist_ok=True);os.link(src,dst)
  # Small source/helper/current metadata mirror, independently detached by mutation.
  for package,mapfile,sourceprefix,readme in [('pump','scratch/source-sha256.json','main/source','main/README.final.md'),('fees','main/controls/source-proposed.json','source',None)]:
   cp=copies[package];source=json.loads((cp/mapfile).read_text())
   for n in source:
    if not(root/n).exists():filecopy(cp/sourceprefix/n,root/n)
   if readme:filecopy(cp/readme,root/'programs/pump/README.md')
  helpers=json.loads((copies['pump']/'main/controls/gate-before.json').read_text())['helpers']
  for n in helpers:filecopy(copies['pump']/'main/build-helpers'/n,root/n)
  feeshelpers=json.loads((copies['fees']/'reference/gate-before.json').read_text())['helpers']
  for n in feeshelpers:
   if not(root/n).exists():filecopy(copies['fees']/'helpers'/n,root/n)
  Q=root/paths['checkpoint'];Q.parent.mkdir(parents=True,exist_ok=True);linked(originals['checkpoint'],Q)
  filecopy(copies['relay']/'current.proposed.json',root/'repro/donation-relay/current.json');filecopy(copies['relay']/'README.proposed.md',root/'repro/donation-relay/README.md')
  env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'}
  def run(name,k,extra=(),expect=True):
   cmd=[sys.executable,'-B',str(copies[k]/'verify.py'),*map(str,extra)]
   p=subprocess.run(cmd,cwd=T,env=env,text=True,capture_output=True)
   (W/(name+'.stdout')).write_text(p.stdout);(W/(name+'.stderr')).write_text(p.stderr)
   good=(p.returncode==0)==expect;results.append({'case':name,'packet':k,'expected':'accept'if expect else'reject','returncode':p.returncode,'pass':good,'stdout_sha256':hashlib.sha256(p.stdout.encode()).hexdigest(),'stderr_sha256':hashlib.sha256(p.stderr.encode()).hexdigest(),'mutations_only_in_temporary_copy':True});assert good,(name,p.stdout,p.stderr)
  def args(k):return ['--checkpoint',Q,'--current-root',root]if k=='relay'else['--current-main',root]
  for k in copies:run(k+'-independent-copy',k,['--checkpoint',Q]if k=='relay'else[]);run(k+'-current-root-copy',k,args(k))
  def mutation(name,k,p,change,seal=False,extra=None):
   old=p.read_bytes();mp=copies[k]/'manifest.json';sp=copies[k]/'manifest.sha256';oldm=mp.read_bytes();olds=sp.read_bytes()
   try:
    atomic(p,change(old))
    if seal:reseal(copies[k])
    run(name,k,args(k)if extra is None else extra,False)
   finally:atomic(p,old);atomic(mp,oldm);atomic(sp,olds)
  for k,src,readme,helper,control in [('pump','main/source/programs/pump/src/admin_cto.rs','main/README.final.md','main/build-helpers/scripts/build_partial_candidate.py','main/controls/build-exit.json'),('fees','source/programs/pump-fees/src/sharing.rs','source/programs/pump-fees/README.md','helpers/scripts/build_partial_candidate.py','main/controls/build-exit.json')]:
   # Resealed outer manifests force these cases through semantic identity checks.
   mutation(k+'-source-resealed',k,copies[k]/src,lambda b:b+b'\n// changed-copy\n',True)
   mutation(k+'-readme-resealed',k,copies[k]/readme,lambda b:b+b'\nchanged-copy\n',True)
   mutation(k+'-helper-resealed',k,copies[k]/helper,lambda b:b+b'\n# changed-copy\n',True)
   mutation(k+'-control-resealed',k,copies[k]/control,lambda b:encoded({**json.loads(b),'returncode':1}),True)
   mutation(k+'-manifest-seal',k,copies[k]/'manifest.sha256',lambda b:b'0'*64+b'  manifest.json\n')
   current= root/('programs/pump/src/admin_cto.rs'if k=='pump'else'programs/pump-fees/src/sharing.rs')
   mutation(k+'-current-source',k,current,lambda b:b+b'\n// changed-current-copy\n')
  mutation('relay-source-map-resealed','relay',copies['relay']/'source-map.json',lambda b:encoded({**json.loads(b),'src/idl.rs':'0'*64}),True)
  mutation('relay-readme-resealed','relay',copies['relay']/'README.proposed.md',lambda b:b+b'\nchanged\n',True)
  mutation('relay-controller-resealed','relay',copies['relay']/'stage_integration.py',lambda b:b+b'\n# changed\n',True)
  mutation('relay-record-resealed','relay',copies['relay']/'publication-identity.json',lambda b:encoded({**json.loads(b),'controller_sha256':'0'*64}),True)
  mutation('relay-current-pointer','relay',root/'repro/donation-relay/current.json',lambda b:encoded({**json.loads(b),'candidate_artifact':'repro/donation-relay/missing.so'}))
  mutation('relay-manifest-seal','relay',copies['relay']/'manifest.sha256',lambda b:b'0'*64+b'  manifest.json\n')
  mutation('relay-current-readme','relay',root/'repro/donation-relay/README.md',lambda b:b+b'\nchanged\n')
  candidate=Q/'candidate.so';old=candidate.read_bytes()
  try:candidate.unlink();run('relay-missing-current-candidate','relay',args('relay'),False)
  finally:atomic(candidate,old)
  run('relay-outside-checkpoint','relay',['--checkpoint',originals['checkpoint'],'--current-root',root],False)
  for k in copies:run(k+'-restored-copy',k,args(k))
 assert all(Path(n).is_file()and H(Path(n))==h for n,h in before.items()),'Original packet content changed'
 report={'passed':True,'tests':len(results),'accepted_baselines':sum(r['expected']=='accept'for r in results),'mutations_rejected':sum(r['expected']=='reject'for r in results),'standard_library_only':True,'new_builds':0,'new_target_executions':0,'network_requests':0,'original_files_rehashed_unchanged':len(before),'packet_manifest_sha256':{k:H(p/'manifest.json')for k,p in originals.items()},'results':results}
 (W/'results.json').write_bytes(encoded(report));print(json.dumps({k:v for k,v in report.items()if k!='results'},indent=2))
if __name__=='__main__':main()
