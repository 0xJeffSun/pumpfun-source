#!/usr/bin/env python3
"""Tests only this saved-artifact verifier; never executes Rust, SBF or a VM."""
from pathlib import Path
import argparse,hashlib,json,shutil,subprocess,sys,tempfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def reseal(p):
 m={str(f.relative_to(p)):H(f)for f in sorted(p.rglob('*'))if f.is_file()and f not in [p/'manifest.json',p/'manifest.sha256']}
 (p/'manifest.json').write_text(json.dumps(m,sort_keys=True,indent=2)+'\n');(p/'manifest.sha256').write_text(H(p/'manifest.json')+'  manifest.json\n')
def run(other=None):
 tests=[]
 with tempfile.TemporaryDirectory(prefix='residual-pricing-copy-')as t:
  p=Path(t)/'package';shutil.copytree(P,p)
  def check(name,ok,python=sys.executable):
   r=subprocess.run([str(python),'-B',str(p/'verify.py')],cwd=t,capture_output=True,text=True)
   assert(r.returncode==0)==ok,(name,r.stdout,r.stderr)
   tests.append({'name':name,'expected_accept':ok,'returncode':r.returncode,'passed':True})
  check('external_copy_current_interpreter',True)
  if other:check('external_copy_second_interpreter',True,other)
  f=p/'evidence/82af8.asm';old=f.read_bytes();f.unlink();check('missing_residual_body_rejected',False);f.write_bytes(old)
  f=p/'function-ledger.json';old=f.read_bytes();j=json.loads(old);j['edges'][0]['target']+=8;f.write_text(json.dumps(j));reseal(p);check('resealed_wrong_call_target_rejected',False);f.write_bytes(old);reseal(p)
  f=p/'source/residual_pricing.rs';old=f.read_bytes();f.write_text(old.decode().replace('n.checked_add(d)','n.checked_add(d - 1)'));reseal(p);check('resealed_source_operand_change_rejected',False);f.write_bytes(old);reseal(p)
  f=p/'prior/b6/prior/preservation-ledger.json';old=f.read_bytes();j=json.loads(old);j['rows'].pop();f.write_text(json.dumps(j));reseal(p);check('resealed_removed_preservation_row_rejected',False);f.write_bytes(old);reseal(p)
  check('restored_external_copy',True)
 return {'tests':tests,'test_scope':'artifact verifier only; no Rust or VM execution','all_passed':all(x['passed']for x in tests)}
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--other-python',type=Path);args=a.parse_args();print(json.dumps(run(args.other_python.resolve()if args.other_python else None),sort_keys=True,indent=2))
