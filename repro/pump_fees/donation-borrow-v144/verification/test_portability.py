"""Copied-checkout verification and negative evidence checks; no target execution."""
from pathlib import Path
import hashlib,json,shutil,subprocess,sys,tempfile
W=Path(__file__).resolve().parent;R=W.parents[1];rel='repro/pump_fees/donation-borrow-v144';P=R/rel
H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text());rows=[]
seal=H((P/'manifest-sha256.json').read_bytes())
def run(label,root,ok):
 p=subprocess.run([sys.executable,'-B',str(root/rel/'verify.py'),'--current-main','--repo',str(root)],cwd='/',capture_output=True,text=True)
 row={'name':label,'expected_pass':ok,'exit_code':p.returncode,'stdout':p.stdout,'stderr':p.stderr,'passed':(p.returncode==0)==ok};rows.append(row);assert row['passed'],row
def reseal(root,name):
 p=root/rel;d=J(p/'manifest-sha256.json');d[name]=H((p/name).read_bytes());(p/'manifest-sha256.json').write_text(json.dumps(d,indent=2)+'\n')
with tempfile.TemporaryDirectory(prefix='fees-borrow-clean-checkout-') as t:
 root=Path(t)/'checkout';root.mkdir()
 mappings={}
 for n in ['source-sha256.json','build-helper-sha256.json','documentation-sha256.json','published-harness-sha256.json','published-focused-harness-sha256.json','published-focused-inputs-sha256.json','runtime-inputs.json']:mappings.update(J(P/n))
 for n,h in mappings.items():
  f=R/n;assert not f.is_symlink() and not f.name.endswith('-keypair.json') and H(f.read_bytes())==h,n
  to=root/n;to.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(f,to)
 shutil.copytree(P,root/rel,dirs_exist_ok=True)
 subprocess.run(['git','init','-q',str(root)],check=True,capture_output=True)
 subprocess.run(['git','-C',str(root),'add','--all'],check=True,capture_output=True)
 run('tracked checkout copy outside original workspace',root,True)
 f=root/rel/'pump_fees_candidate.so';old=f.read_bytes();f.unlink();run('missing candidate evidence',root,False);f.write_bytes(old)
 f=root/'programs/pump-fees/README.md';old=f.read_bytes();f.write_bytes(old+b'\ninvalid drift\n');run('tracked current README drift',root,False);f.write_bytes(old)
 f=root/rel/'pump_fees_candidate.so';old=f.read_bytes();bad=bytearray(old);bad[-1]^=1;f.write_bytes(bad);reseal(root,'pump_fees_candidate.so');run('candidate tamper even after outer reseal',root,False)
assert H((P/'manifest-sha256.json').read_bytes())==seal
result={'tested_manifest_sha256':seal,'scope':'Read-only saved verification; temporary Git index only. No main staging, compilation or transactions.','checks':rows,'all_passed':all(r['passed'] for r in rows)}
(W/'portability-results.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({'checks':len(rows),'all_passed':result['all_passed']}))
