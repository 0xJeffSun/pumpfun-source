"""Verify copies and saved-evidence tamper rejection; no target execution."""
from pathlib import Path
import gzip,hashlib,json,shutil,subprocess,sys,tempfile
ROOT=Path(__file__).resolve().parents[2];P=ROOT/'work/pump-nested-depth-guard-review'
sha=lambda b:hashlib.sha256(b).hexdigest()
def seal(p):
    (p/'manifest-sha256.json').write_text(json.dumps({f.relative_to(p).as_posix():sha(f.read_bytes())for f in sorted(p.rglob('*'))if f.is_file()and f!=p/'manifest-sha256.json'},indent=2,sort_keys=True)+'\n')
def run(p):
    r=subprocess.run([sys.executable,'-B',str(p/'verify.py')],cwd='/',capture_output=True,text=True)
    return {'returncode':r.returncode,'stdout':r.stdout,'stderr':r.stderr}
checks=[]
with tempfile.TemporaryDirectory(prefix='pump-depth-review-')as t:
    base=Path(t)
    p=base/'portable';shutil.copytree(P,p);r=run(p);assert r['returncode']==0;checks.append({'test':'copy outside repository; cwd root; no --repo','expected':'PASS',**r})
    q=base/'missing';shutil.copytree(P,q);(q/'inputs/windows/original-878-11b0.bin').unlink();r=run(q);assert r['returncode']!=0 and 'manifest file set'in r['stderr'];checks.append({'test':'missing full called helper window','expected':'FAIL',**r})
    q=base/'reversed';shutil.copytree(P,q);f=q/'proposed/programs/pump/src/nested_create.rs';f.write_text(f.read_text().replace('require_gte!(g.max_curve_depth.min(5), depth,','require_gte!(depth, g.max_curve_depth.min(5),'));seal(q);r=run(q);assert r['returncode']!=0 and 'exact one-line correction'in r['stderr'];checks.append({'test':'resealed reversed compared operands','expected':'FAIL semantic source gate',**r})
    q=base/'erased-diagnostic';shutil.copytree(P,q);rr=q/'retained-focused-01';f=rr/'focused-01.json.gz';j=json.loads(gzip.decompress(f.read_bytes()));row=j['cases'][-1];row['original']['logs'].remove('Program log: Left: 1');f.write_bytes(gzip.compress(json.dumps(j).encode(),mtime=0));journal=rr/'focused-01.json.gz.case-journal/depth-limit-rollback-original.json';jj=json.loads(journal.read_text());jj['result']=row['original'];journal.write_text(json.dumps(jj)+'\n');seal(rr);seal(q);r=run(q);assert r['returncode']!=0 and 'verify_receipts.py'in r['stderr'];checks.append({'test':'resealed aggregate+journal erase one original compared-value log','expected':'FAIL required-negative receipt gate',**r})
result={'scope':'Saved evidence/copy verification only; no build, VM or transactions.','status':'PASS','checks':checks}
(P/'portability-checks.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps({'status':'PASS','checks':len(checks),'new_builds':0,'new_transactions':0}))
