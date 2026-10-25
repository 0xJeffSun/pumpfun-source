from pathlib import Path
import hashlib,json,shutil,subprocess,sys
R=Path.cwd();P=R/'repro/pump_amm/formatter-restoration-main-v144';W=R/'work/amm12-portability';W.mkdir(exist_ok=False);results=[];H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def run(label,q,success,args=()):
 p=subprocess.run([sys.executable,'-B',str(q/'verify.py'),*map(str,args)],cwd=W,capture_output=True,text=True);(W/(label+'.stdout')).write_text(p.stdout);(W/(label+'.stderr')).write_text(p.stderr);r=dict(name=label,returncode=p.returncode,expected_success=success,passed=(p.returncode==0)==success);results.append(r);assert r['passed'],r
def seal(q):
 p=q/'manifest.json';m=json.loads(p.read_text());m['files']={n:H(q/n)for n in m['files']};p.write_text(json.dumps(m,indent=2)+'\n');(q/'manifest.sha256').write_text(H(p)+'\n')
q=W/'portable';shutil.copytree(P,q);run('copied-package',q,True)
f=q/'main/controls/runner-exit.json';old=f.read_bytes();j=json.loads(old);j['returncode']=1;f.write_text(json.dumps(j,indent=2)+'\n');seal(q);run('failed-runner-resealed',q,False);f.write_bytes(old);seal(q)
b=q/'main/candidate.so';b.rename(W/'removed-candidate.so');run('missing-candidate',q,False);(W/'removed-candidate.so').rename(b)
c=W/'current';shutil.copytree(q/'main/source',c);shutil.copytree(q/'main/helpers',c,dirs_exist_ok=True);shutil.copy2(q/'main/README.final.md',c/'programs/pump-amm/README.md');run('current-copy',q,True,['--current-main',c])
f=c/'programs/pump-amm/vendor/solana-pubkey/src/lib.rs';f.write_text(f.read_text()+'\n// changed vendor for binding rejection\n');run('changed-vendor-source',q,False,['--current-main',c])
(W/'results.json').write_text(json.dumps(dict(tests=results,binary_contents_modified=False,current_repo_modified=False),indent=2)+'\n');print(json.dumps(results))
