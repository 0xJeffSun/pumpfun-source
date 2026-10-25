from pathlib import Path
import hashlib,json,shutil,subprocess,sys
R=Path.cwd();W=R/'work/pass11-portability';W.mkdir(exist_ok=False)
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();results=[]
def check(label,q,expected,args=()):
 p=subprocess.run([sys.executable,'-B',str(q/'verify.py'),*map(str,args)],cwd=W,capture_output=True,text=True)
 (W/(label+'.stdout')).write_text(p.stdout);(W/(label+'.stderr')).write_text(p.stderr)
 row=dict(name=label,returncode=p.returncode,expected_success=expected,passed=(p.returncode==0)==expected);results.append(row);assert row['passed'],row
def seal(q):
 f=q/'manifest.json';m=json.loads(f.read_text());files=m.get('files',m)
 for n,v in files.items():
  if isinstance(v,dict): v.update(sha256=H(q/n),bytes=(q/n).stat().st_size)
  else: files[n]=H(q/n)
 f.write_text(json.dumps(m,indent=2)+'\n');(q/'manifest.sha256').write_text(H(f)+'\n')
for name,source,source_dir,target in [('pump','repro/pump/buy-mode-order-main-fortyeight','main/source','programs/pump/src/trade.rs'),('mayhem','repro/mayhem/sell-result-error-main-twentyfour','source','programs/mayhem/src/instructions/buy_pump_swap.rs')]:
 q=W/name;shutil.copytree(R/source,q);check(name+'-copied',q,True)
 r=q/'main/controls/runner-exit.json';old=r.read_bytes();j=json.loads(old);j['returncode']=1;r.write_text(json.dumps(j,indent=2)+'\n');seal(q);check(name+'-nonzero-runner-resealed',q,False);r.write_bytes(old);seal(q)
 c=q/'main/candidate.so';c.rename(W/(name+'-removed.so'));check(name+'-missing-candidate',q,False);(W/(name+'-removed.so')).rename(c)
 current=W/(name+'-current');shutil.copytree(q/source_dir,current)
 if name=='pump':shutil.copy2(q/'main/README.final.md',current/'programs/pump/README.md')
 else:shutil.copytree(q/'helpers',current,dirs_exist_ok=True)
 check(name+'-current-copy',q,True,['--current-main',current]);p=current/target;p.write_text(p.read_text()+'\n// changed copy to test source binding\n');check(name+'-changed-current-source',q,False,['--current-main',current])
(W/'results.json').write_text(json.dumps(dict(tests=results,binary_contents_modified=False,current_repo_modified=False),indent=2)+'\n');print(json.dumps(results))
