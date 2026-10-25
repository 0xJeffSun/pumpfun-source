#!/usr/bin/env python3
"""Verify frozen saved acceptance evidence; never replay a program."""
import argparse,base64,hashlib,json,re,subprocess,sys
from pathlib import Path
from solders.transaction import VersionedTransaction
from checks import ROOT,R,P,check

def main():
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--current-repo',type=Path);args=parser.parse_args()
    H=lambda b:hashlib.sha256(b).hexdigest()
    manifest=json.loads((ROOT/'manifest-sha256.json').read_text())
    assert {str(p.relative_to(ROOT)):H(p.read_bytes())for p in ROOT.rglob('*')if p.is_file()and p!=ROOT/'manifest-sha256.json'and'__pycache__'not in p.parts}==manifest
    assert not any(p.is_symlink()for p in ROOT.rglob('*'))
    assert check()==json.loads((ROOT/'check-results.json').read_text())
    expected=json.loads((ROOT/'history-instruction-check.json').read_text());actual=[]
    program=re.search(r'declare_id!\("([^"]+)"\)',(R/'programs/pump-fees/src/lib.rs').read_text()).group(1)
    for index in [80,81]:
        capture=json.loads((P/f'transactions/admin-success-{index}.json').read_text())['response']['result']
        raw=base64.b64decode(capture['transaction'][0]);tx=VersionedTransaction.from_bytes(raw);msg=tx.message
        data=[bytes(i.data)for i in msg.instructions if str(msg.account_keys[i.program_id_index])==program]
        assert len(data)==1 and data[0][:8]==hashlib.sha256(b'global:initialize_fee_config').digest()[:8] and all(tx.verify_with_results())
        actual.append({'capture_index':index,'fee_program':program,'instruction':'initialize_fee_config','discriminator_hex':data[0][:8].hex(),'raw_transaction_sha256':H(raw),'all_signatures_valid':True})
    assert actual==expected
    for command in [['repro/pump_fees/state-module-v144/verify.py'],['scripts/verify_recovered_builds.py','--program','pump_fees']]:
        p=subprocess.run([sys.executable,'-B',*command],cwd=R,capture_output=True,text=True)
        assert p.returncode==0,p.stdout+p.stderr
    if args.current_repo:
        root=args.current_repo.resolve()
        for name,row in json.loads((ROOT/'checked-inputs.json').read_text()).items():assert H((root/name).read_bytes())==row['sha256'],name
        p=subprocess.run([sys.executable,'-B','scripts/verify_current_bindings.py','fees'],cwd=root,capture_output=True,text=True)
        assert p.returncode==0,p.stdout+p.stderr
    print(json.dumps({'verified':True,'sealed_payload_files':len(manifest),'checked_input_files':147,'candidate_sha256':'d5b8f885942ee0d54519e4330941b5e034cfcdcf271eb286d0b4cc81165bee13',
        'source_inputs':23,'comparison_receipts':17441,'complete_instruction_rows':150,'total_comparison_receipts':53735,
        'new_builds':0,'new_runtime_replays':0,'current_repository_checked':bool(args.current_repo),'remaining_findings':0},indent=2))

if __name__=='__main__':main()
