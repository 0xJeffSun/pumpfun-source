"""Run the unchanged independent reviewer from a disposable reconstructed tree.
Only published scratch evidence plus the sealed small baseline copies are used.
This reads saved receipts and verifies signatures; it never runs SBF or builds.
"""
from pathlib import Path
import argparse,gzip,hashlib,json,os,shutil,subprocess,sys,tarfile,tempfile
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
p=argparse.ArgumentParser();p.add_argument('--scratch',type=Path,required=True);p.add_argument('--output',type=Path,required=True);args=p.parse_args()
scratch=args.scratch.resolve();out=args.output.resolve();out.mkdir(parents=True,exist_ok=True)
binding=json.loads((P/'bindings.json').read_text());assert H(scratch/'manifest.json')==binding['scratch_manifest_sha256']
m=json.loads((scratch/'manifest.json').read_text())
for rel,record in m['files'].items():
 f=scratch/rel;assert f.is_file() and f.stat().st_size==record['bytes'] and H(f)==record['sha256'],rel
prior=json.loads((P/'original/manifest.json').read_text())
assert H(P/'original/manifest.json')=='2eba0a5b9e0e70e6a2d1ab4094bb3001d7904676f247fbcb843c7d79e1cbb5df'
for rel,digest in prior.items():assert H(P/'original'/rel)==digest,rel
for rel,record in json.loads((P/'baseline/provenance.json').read_text()).items():
 f=P/'baseline'/rel;assert H(f)==record['compressed_sha256'];assert hashlib.sha256(gzip.decompress(f.read_bytes())).hexdigest()==record['original_sha256']
with tempfile.TemporaryDirectory(prefix='disposable-',dir=out) as td:
 R=Path(td);B=R/'work/mayhem-result-error-build';W=R/'work/mayhem-result-error-independent-review';Q=R/'work/mayhem-next-pass'
 B.mkdir(parents=True);W.mkdir(parents=True)
 def extract(name,dest):
  with tarfile.open(scratch/name) as t:t.extractall(dest,filter='data')
 extract('runtime-repository.tar.gz',R)
 shutil.move(str(R/'runtime-repository'),str(B/'source'))
 extract('initial-source-review.tar.gz',R)
 shutil.move(str(R/'initial-source-review'),str(Q))
 extract('receipts-and-verification.tar.gz',B)
 for name in ['build01','static']:shutil.copytree(scratch/name,B/name)
 for name in ['gate-before.json','replay-attempts.json']:shutil.copy2(scratch/name,B/name)
 for oldpath,newfile in [('repro/mayhem/twentyfour/burn-sequences/comparison.json','burn-comparison.json.gz'),('repro/layered-passes/pass-01/results/mayhem/residual-ledger.json','prior-residual-ledger.json.gz')]:
  f=R/oldpath;f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes(gzip.decompress((P/'baseline'/newfile).read_bytes()))
 shutil.copy2(P/'original/review.py',W/'review.py')
 assert H(W/'review.py')==H(P/'original/review.py')
 assert not any(f.is_symlink() for f in R.rglob('*')),'reconstruction must not link old work trees'
 env=os.environ.copy();env['PYTHONDONTWRITEBYTECODE']='1'
 result=subprocess.run([sys.executable,str(W/'review.py')],cwd=R,env=env,capture_output=True,text=True)
 (out/'review.stdout.log').write_text(result.stdout);(out/'review.stderr.log').write_text(result.stderr)
 assert result.returncode==0,(result.returncode,result.stderr)
 observed=json.loads((W/'result.json').read_text());recorded=json.loads((P/'original/result.json').read_text())
 assert observed==recorded,(observed,recorded)
 assert (W/'counts.json').read_bytes()==(P/'original/counts.json').read_bytes()
 assert observed['retained_transactions_independently_signature_checked']==13284
 assert observed['retained_signatures_independently_checked']==26500
 shutil.copy2(W/'result.json',out/'result.json');shutil.copy2(W/'counts.json',out/'counts.json')
 receipt={'status':'PASS','unchanged_review_sha256':H(W/'review.py'),'scratch_manifest_sha256':H(scratch/'manifest.json'),'result_equal_recorded':True,'counts_equal_recorded':True,'retained_transactions_independently_signature_checked':13284,'retained_signatures_independently_checked':26500,'no_symlinks_to_original_work':True,'disposable_reconstruction':True,'input_sources':['published scratch package','sealed original independent review','sealed baseline burn comparison','sealed baseline prior ledger'],'new_builds':0,'new_target_executions':0}
 (out/'receipt.json').write_text(json.dumps(receipt,indent=2)+'\n')
 print(json.dumps(receipt,indent=2))
