"""Verify a separate copy and reject missing/tampered public saved artifacts.

Only the disposable copy is mutated. No executable bytes or signed messages are
altered, and no compiler or Solana runtime is executed.
"""
from pathlib import Path
import argparse,gzip,hashlib,json,subprocess,sys
sys.dont_write_bytecode=True
p=argparse.ArgumentParser();p.add_argument('--package',type=Path,required=True);p.add_argument('--copy',type=Path,required=True);p.add_argument('--repo',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args();P=a.package.resolve();C=a.copy.resolve();R=a.repo.resolve();C.mkdir(parents=True,exist_ok=False);sha=lambda b:hashlib.sha256(b).hexdigest()
assert C!=P and not C.is_relative_to(P)
files={}
for src in sorted(P.rglob('*')):
 assert not src.is_symlink()and not src.name.endswith('-keypair.json')
 if not src.is_file():continue
 rel=src.relative_to(P);b=src.read_bytes();dst=C/rel;dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(b);files[str(rel)]={'sha256':sha(b),'bytes':len(b)}
command=[sys.executable,'-B',str(C/'verify.py'),'--current-main','--repo',str(R)]
def run():return subprocess.run(command,cwd='/tmp',capture_output=True,text=True)
r=run();assert r.returncode==0,r.stdout+r.stderr;positive=json.loads(r.stdout);assert positive['current_main_verified']and positive['main_scratch_whole_file_identity']
tests=[]
def negative(label,path,mutate,expected):
 q=C/path;original=q.read_bytes();mutate(q,original)
 try:
  r=run();assert r.returncode!=0 and expected in r.stderr,(label,r.returncode,r.stdout,r.stderr)
  tests.append({'test':label,'copy_only_path':path,'returncode':r.returncode,'expected_failure':expected,'stderr':r.stderr,'original_sha256':sha(original),'executable_bytes_modified':False,'signed_messages_modified':False})
 finally:q.write_bytes(original)
negative('missing candidate artifact','candidate.so',lambda p,b:p.unlink(),'FileNotFoundError')
negative('changed source snapshot','source/programs/pump-amm/src/state/global_config.rs',lambda p,b:p.write_bytes(b+b'\n// disposable-copy tamper check\n'),'AssertionError')
def change_receipt(p,b):
 j=json.loads(gzip.decompress(b));j['case_count']+=1;p.write_bytes(gzip.compress((json.dumps(j,separators=(',',':'))+'\n').encode(),mtime=0))
negative('changed direct receipt count','fee_config-differential.json.gz',change_receipt,'AssertionError')
for rel,row in files.items():assert sha((C/rel).read_bytes())==row['sha256'],rel
report={'scope':'Positive verification from a separate copy plus missing/tampered public artifact rejection. Outer package was not yet sealed, deliberately exercising direct artifact/source/receipt binding checks; the nested scratch seal was verified. All copy payload bytes restored afterward. Final outer sealed-copy verification is a separate check.','command':command,'cwd':'/tmp','payload_copy':str(C),'source_package':str(P),'copied_file_count':len(files),'input_payload_manifest_sha256':sha(json.dumps(files,sort_keys=True,separators=(',',':')).encode()),'positive':positive,'negative_checks':tests,'all_original_copy_payloads_restored':True,'new_builds':0,'new_runtime_replays':0,'main_source_mutated':False,'original_package_mutated':False}
a.output.write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({'status':'PASS','copy_payload_files':len(files),'positive_current_main':positive['current_main_verified'],'negative_checks_rejected':len(tests),'all_payloads_restored':True},indent=2))
