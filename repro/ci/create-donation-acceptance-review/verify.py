#!/usr/bin/env python3
"""Portable saved-evidence review; requires the two pinned public packages and solders."""
from pathlib import Path
import argparse, hashlib, json, subprocess, sys
sys.dont_write_bytecode = True
W = Path(__file__).resolve().parent
sys.path.insert(0,str(W))
from review_checks import check, PACKAGES
H = lambda b: hashlib.sha256(b).hexdigest()
J = lambda p: json.loads(p.read_text())
p=argparse.ArgumentParser(description=__doc__)
p.add_argument('--repo',type=Path)
p.add_argument('--current-main',action='store_true',help='Additionally check mutable source/helper/harness/runtime inputs.')
a=p.parse_args()
root=a.repo.resolve() if a.repo else next(q for q in W.parents if (q/'evidence/original/pump_amm/deployed.so').is_file())
if (W/'manifest-sha256.json').is_file():
    actual={}
    for f in W.rglob('*'):
        assert not f.is_symlink()
        if f.is_file() and f!=W/'manifest-sha256.json':actual[str(f.relative_to(W))]=H(f.read_bytes())
    assert actual==J(W/'manifest-sha256.json')
for n,r in J(W/'public-package-bindings.json').items():
    f=root/n;assert not f.is_symlink();b=f.read_bytes()
    assert len(b)==r['bytes'] and H(b)==r['sha256'],n
assert check(root)==J(W/'independent-checks.json')
def run(path,*args):
    r=subprocess.run([sys.executable,'-B',str(root/path),*args],cwd=root,capture_output=True,text=True)
    assert r.returncode==0,(path,r.stdout,r.stderr)
    return json.loads(r.stdout)
amm=run(PACKAGES['amm'][0]+'/verify.py',*(['--current-main','--repo',str(root)] if a.current_main else []))
fees=run(PACKAGES['fees'][0]+'/verify.py')
assert amm['seal_verified'] and amm['main_scratch_whole_file_identity'] and amm['cases']==17462 and amm['verified_signatures']==35418
assert amm['initializer_static_only'] and not amm['initializer_positive_runtime'] and not amm['full_byte_equality']
assert fees['verified'] and fees['main_scratch_whole_file_equal'] and fees['comparison_receipts']==17441 and fees['verified_signatures_in_encoded_fields']==17204
assert fees['authentic_historical_messages']==2 and fees['donation_steps']==10 and not fees['full_original_byte_equality']
if a.current_main:
    bindings=run(PACKAGES['fees'][0]+'/verify_current_bindings.py','--repo',str(root))
    assert bindings['verified'] and not bindings['recorded_work_origins_used_as_live_inputs']
print(json.dumps({'verified':True,'public_package_files':len(J(W/'public-package-bindings.json')),'amm_candidate':amm['candidate_sha256'],'fees_candidate':fees['candidate_sha256'],'amm_comparisons':17462,'amm_signatures':35418,'amm_setup_transactions_separate':150,'fees_comparisons':17441,'fees_donation_steps':10,'fees_saved_field_signatures':17204,'fees_genuine_historical_messages_separate':2,'initializer_successes':0,'current_main_checked':a.current_main,'central_integration_checked':False,'runtime_replayed':False,'builds_run':False,'audit_complete':False},indent=2))
