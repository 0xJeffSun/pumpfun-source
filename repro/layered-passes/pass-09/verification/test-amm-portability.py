from pathlib import Path
import hashlib,json,shutil,subprocess,sys
R=Path.cwd();P=R/'repro/pump_amm/accumulator-order-main-v144';W=R/'work/amm09-portability';W.mkdir(exist_ok=False)
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();results=[]
def check(label,package,expected,args=()):
 p=subprocess.run([sys.executable,'-B',str(package/'verify.py'),*map(str,args)],cwd=W,capture_output=True,text=True)
 (W/(label+'.stdout')).write_text(p.stdout);(W/(label+'.stderr')).write_text(p.stderr)
 result={'name':label,'returncode':p.returncode,'expected_success':expected,'passed':(p.returncode==0)==expected};results.append(result);assert result['passed'],result
def seal(package):
 f=package/'manifest.json';m=json.loads(f.read_text());m['files']={n:H(package/n) for n in m['files']};f.write_text(json.dumps(m,indent=2)+'\n');(package/'manifest.sha256').write_text(H(f)+'\n')
q=W/'portable';shutil.copytree(P,q);check('copied-package',q,True)
r=q/'main/runner-exit.json';original=r.read_bytes();d=json.loads(original);d['returncode']=1;r.write_text(json.dumps(d,indent=2)+'\n');seal(q);check('nonzero-runner-exit-resealed',q,False);r.write_bytes(original);seal(q)
candidate=q/'main/candidate.so';candidate.rename(W/'removed-candidate.so');check('missing-candidate',q,False);(W/'removed-candidate.so').rename(candidate)
fixture=W/'current';shutil.copytree(q/'main/source',fixture)
for p in (q/'main/helpers').rglob('*'):
 if p.is_file():
  dest=fixture/p.relative_to(q/'main/helpers');dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(p,dest)
check('current-copy',q,True,['--current-main',fixture])
f=fixture/'scripts/build_partial_candidate.py';f.write_text(f.read_text()+'\n# portability negative: changed helper\n');check('changed-current-helper',q,False,['--current-main',fixture])
assert all(r['passed'] for r in results)
(W/'results.json').write_text(json.dumps({'tests':results,'binary_contents_modified':False,'current_repo_modified':False},indent=2)+'\n');print(json.dumps(results))
