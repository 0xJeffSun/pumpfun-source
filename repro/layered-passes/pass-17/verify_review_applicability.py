#!/usr/bin/env python3
"""Bind historical source reviews to the explicitly enumerated current deltas."""
from pathlib import Path
import argparse,hashlib,json,subprocess,sys
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);R=a.parse_args().repo.resolve()
reviews=R/'repro/security-reviews/pass-16';packets=J(R/'repro/layered-passes/pass-16/packets.json')
for row in packets:
    if not row['path'].startswith('repro/security-reviews/pass-16/'):continue
    q=R/row['path'];assert H(q/'manifest.json')==row['sha256']
    for n,h in J(q/'manifest.json').items():assert H(q/n)==h,n
    subprocess.run([sys.executable,'-B',str(q/'verify.py')],check=True)
status=J(R/'repro/status.json');changes={}
for key,name,file in [('pump','pump','compiled-source-sha256.json'),('pump_amm','amm','compiled-source-sha256.json'),('pump_fees','fees','source-sha256.json'),('mayhem','mayhem','compiled-source-sha256.json')]:
    before=J(reviews/name/file);report=J(R/status[key]['comparison_report']);after=report['source_sha256'];assert set(before)==set(after)
    assert H(R/status[key]['candidate_artifact'])==report['comparison']['candidate_sha256']
    for n,h in after.items():assert H(R/n)==h,n
    changes[name]=[n for n in before if before[n]!=after[n]]
    if name in ['pump','mayhem']:assert not changes[name]
assert changes['amm']==['programs/pump-amm/src/incentives.rs']
n=changes['amm'][0];before=(reviews/'amm/source'/n).read_text()
old='    u.total_unclaimed_tokens=0;u.total_claimed_tokens+=amount;u.has_total_claimed_tokens=true;u.needs_claim=u.current_sol_volume>0;u.last_update_timestamp=timestamp;'
new='    let total_claimed_tokens=u.total_claimed_tokens+amount;\n    u.total_unclaimed_tokens=0;u.total_claimed_tokens=total_claimed_tokens;u.has_total_claimed_tokens=true;u.needs_claim=u.current_sol_volume>0;u.last_update_timestamp=timestamp;'
assert before.count(old)==1;expected=before.replace(old,new)
line='    token_interface::transfer_checked(CpiContext::new_with_signer'
at=expected.index(line,expected.index('pub fn claim('))
guard='    require!(ctx.accounts.global_incentive_token_account.key()!=ctx.accounts.user_ata.key() || ctx.accounts.global_incentive_token_account.owner==g.key(),PumpAmmError::SelfTransferNotAllowed);\n'
expected=expected[:at]+guard+expected[at:];assert (R/n).read_text()==expected
assert set(changes['fees']) <= {'programs/pump-fees/src/sharing.rs','programs/pump-fees/README.md'}
assert 'programs/pump-fees/src/sharing.rs' in changes['fees']
n='programs/pump-fees/src/sharing.rs';before=(reviews/'fees/source'/n).read_text();old='.ok_or(error!(FeeError::AmmAccountsRequiredForGraduatedCoin))?';new='.ok_or(FeeError::AmmAccountsRequiredForGraduatedCoin)?';assert before.count(old)==1 and before.replace(old,new)==(R/n).read_text()
print(json.dumps({'status':'PASS','reviewed_snapshots':4,'enumerated_current_source_deltas':changes,'new_target_executions':0,'current_full_security_audit_claimed':False,'scope':'Historical review scope is retained. Only the listed source deltas are reconciled; this does not establish complete security or deployed equivalence.'},indent=2))
