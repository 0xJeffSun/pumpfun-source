#!/usr/bin/env python3
from pathlib import Path
import argparse,hashlib,json,shutil,subprocess,sys,tempfile
if not __debug__:raise RuntimeError('optimized Python rejected')
P=Path(__file__).resolve().parent;ROOT=next(x for x in P.parents if(x/'evidence/original/pump/deployed.so').is_file());M=P/'MANIFEST.json'
S='6779af6d57bbd4427b643e554fbf98a8d2a607b3d5167e4c655963ce0b5379e2';U='2df0744f111ed41b4df0e8167e6914e01587a28a3e7fd26f73f5a6a9fc0955da'
def req(x,m):
 if not x:raise RuntimeError(m)
def sha(x):return hashlib.sha256(Path(x).read_bytes()).hexdigest()
def files():return{str(x.relative_to(P)):sha(x)for x in sorted(P.rglob('*'))if x.is_file()and x!=M}
def run(x,*a):
 r=subprocess.run([sys.executable,str(x),*a],cwd=ROOT,text=True,stdout=subprocess.PIPE,stderr=subprocess.STDOUT);req(r.returncode==0,r.stdout);return r.stdout
def source():
 base=ROOT/'research/claude-pump-integration-20261027/r37-layout-32/source/programs/pump/src/creator/admin_cto.rs'
 with tempfile.TemporaryDirectory()as q:
  t=Path(q);f=t/'programs/pump/src/creator/admin_cto.rs';f.parent.mkdir(parents=True);shutil.copy2(base,f)
  for patch in (ROOT/'research/pump-l32-creator-log-parity-20261028/source.patch',P/'source.patch'):
   r=subprocess.run(['git','apply',str(patch)],cwd=t,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,text=True);req(r.returncode==0,r.stdout)
  req(f.read_bytes()==(P/'proposed/admin_cto.rs').read_bytes(),'proposed source');req(len(f.read_text().splitlines())==700,'line count')
 l33=ROOT/'research/claude-pump-integration-20261027/r37-layout-33/source'
 r=subprocess.run(['git','apply','--check',str(P/'source.patch')],cwd=l33,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,text=True);req(r.returncode==0,'L33 static compatibility')
def main():
 a=argparse.ArgumentParser();a.add_argument('--write-manifest',action='store_true');z=a.parse_args()
 if z.write_manifest:req(all(not x.is_symlink()for x in P.rglob('*')),'symlink');M.write_text(json.dumps(files(),indent=2,sort_keys=True)+'\n');return
 req(M.is_file()and not M.is_symlink(),'manifest');req(json.loads(M.read_text())==files(),'manifest mismatch');source()
 for n in ('build-1','build-2'):req(sha(P/f'builds/{n}/candidate.so')==S and sha(P/f'builds/{n}/unstripped.so')==U,n)
 inv=json.loads((P/'measurement/inventory.json').read_text());req(inv['counts']=={'total':1035,'raw':166,'normalized':990,'unmatched':45,'matched_text_bytes':1446072},'inventory')
 f=json.loads(run(P/'analyze_focused.py'));req(f['candidate_order_differences']==0 and f['structured_mismatches']==0,'focused')
 full=json.loads(run(P/'audit_full_runtime.py'));req(full['counts']['pairs']==10468 and full['non_filename_log_differences']==0 and full['filename_only_log_differences']==52 and not full['state_differences'],'full')
 out=run(P/'test_negative_controls.py');req('Ran 12 tests' in out and out.rstrip().endswith('OK'),'negative')
 print(json.dumps({'status':'verified','stripped_sha256':S,'unstripped_sha256':U,'normalized':990,'raw':166,'focused_cases':363,'corrected_order_cases':6,'full_pairs':10468,'non_filename_log_differences':0,'filename_only_log_differences':52,'negative_controls':12},indent=2))
if __name__=='__main__':main()
