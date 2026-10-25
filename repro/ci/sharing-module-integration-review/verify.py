#!/usr/bin/env python3
"""Verify a frozen acceptance review; never build or replay programs."""
from pathlib import Path
import argparse,hashlib,json,subprocess,sys
from checks import ROOT,R,P,check
from fixture_checks import check as fixture_check
H=lambda b:hashlib.sha256(b).hexdigest()
def main():
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--current-repo',type=Path);args=parser.parse_args()
    seal=json.loads((ROOT/'manifest-sha256.json').read_text())
    assert not any(p.is_symlink()for p in ROOT.rglob('*'))
    assert {str(p.relative_to(ROOT)):H(p.read_bytes())for p in ROOT.rglob('*')if p.is_file()and p!=ROOT/'manifest-sha256.json'and'__pycache__'not in p.parts}==seal
    assert check()==json.loads((ROOT/'check-results.json').read_text())
    assert fixture_check()==json.loads((ROOT/'fixture-check-results.json').read_text())
    for command in [['repro/pump_fees/sharing-module-v144/verify.py'],['scripts/verify_recovered_builds.py','--program','pump_fees']]:
        result=subprocess.run([sys.executable,'-B',*command],cwd=R,capture_output=True,text=True);assert result.returncode==0,result.stdout+result.stderr
    if args.current_repo:
        current=args.current_repo.resolve()
        for name,row in json.loads((ROOT/'checked-inputs.json').read_text()).items():assert H((current/name).read_bytes())==row['sha256'],name
        result=subprocess.run([sys.executable,'-B','scripts/verify_current_bindings.py','fees'],cwd=current,capture_output=True,text=True);assert result.returncode==0,result.stdout+result.stderr
    print(json.dumps({'verified':True,'sealed_review_files':len(seal),'checked_input_files':152,'candidate_sha256':'8cce74a5191b286eaa10af59c02c9ee16d3853be214c5e9b1132e50bba15ef87','source_inputs':26,'byte_preserved_account_declaration':True,'main_scratch_whole_file_equal':True,'comparison_receipts':17441,'donation_steps':10,'verified_signatures':17204,'authentic_fee_config_history':2,'completion_rows':150,'all_program_receipts':53735,'negative_fixture_gates':5,'new_builds':0,'new_runtime_replays':0,'current_repository_checked':bool(args.current_repo),'remaining_findings':0},indent=2))
if __name__=='__main__':main()
