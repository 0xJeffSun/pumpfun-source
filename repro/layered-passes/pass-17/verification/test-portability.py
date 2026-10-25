from pathlib import Path
import json,hashlib,shutil,subprocess,sys
R=Path.cwd();W=R/'work/pass17-portability-curated';W.mkdir(exist_ok=False);H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();rows=[]
def run(name,q,success,args=()):
 p=subprocess.run([sys.executable,'-B',str(q/'verify.py'),*map(str,args)],cwd=W,capture_output=True,text=True);(W/(name+'.stdout')).write_text(p.stdout);(W/(name+'.stderr')).write_text(p.stderr);r={'name':name,'returncode':p.returncode,'expected_success':success,'passed':(p.returncode==0)==success};rows.append(r);assert r['passed'],r
def seal(q):
 p=q/'manifest.json';m=json.loads(p.read_text());files=m.get('files',m)
 for n in files:files[n]=H(q/n)
 p.write_text(json.dumps(m,indent=2)+'\n');(q/'manifest.sha256').write_text(H(p)+'\n')
for name,path,source,helpers,changed in [('fees','repro/pump_fees/sharing-owned-error-main-v144','source','helpers','programs/pump-fees/src/sharing.rs'),('amm','repro/pump_amm/claim-self-transfer-main-v144','main/source','main/helpers','programs/pump-amm/src/incentives.rs')]:
 q=W/name;shutil.copytree(R/path,q);run(name+'-copied',q,True)
 f=q/'main/controls/runner-exit.json';old=f.read_bytes();j=json.loads(old);j['returncode']=1;f.write_text(json.dumps(j,indent=2)+'\n');seal(q);run(name+'-failed-runner-resealed',q,False);f.write_bytes(old);seal(q)
 f=q/'main/candidate.so';f.rename(W/(name+'-removed.so'));run(name+'-missing-candidate',q,False);(W/(name+'-removed.so')).rename(f)
 c=W/(name+'-current');shutil.copytree(q/source,c);shutil.copytree(q/helpers,c,dirs_exist_ok=True)
 if name=='amm':shutil.copy2(q/'main/README.final.md',c/'programs/pump-amm/README.md')
 run(name+'-current-copy',q,True,['--current-main',c]);p=c/changed;p.write_text(p.read_text()+'\n// Negative source-binding copy\n');run(name+'-changed-source',q,False,['--current-main',c])
(W/'results.json').write_text(json.dumps({'tests':rows,'current_repo_modified':False,'binary_contents_modified':False},indent=2)+'\n');print(json.dumps(rows))
