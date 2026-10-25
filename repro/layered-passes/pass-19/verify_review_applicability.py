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
    if name=='mayhem':assert not changes[name]
    if name=='pump':assert changes[name]==['programs/pump/src/admin_cto.rs']
assert set(changes['amm'])=={'programs/pump-amm/src/incentives.rs','programs/pump-amm/src/lib.rs'}
n='programs/pump-amm/src/incentives.rs';before=(reviews/'amm/source'/n).read_text()
old='    u.total_unclaimed_tokens=0;u.total_claimed_tokens+=amount;u.has_total_claimed_tokens=true;u.needs_claim=u.current_sol_volume>0;u.last_update_timestamp=timestamp;'
new='    let total_claimed_tokens=u.total_claimed_tokens+amount;\n    u.total_unclaimed_tokens=0;u.total_claimed_tokens=total_claimed_tokens;u.has_total_claimed_tokens=true;u.needs_claim=u.current_sol_volume>0;u.last_update_timestamp=timestamp;'
assert before.count(old)==1;expected=before.replace(old,new)
line='    token_interface::transfer_checked(CpiContext::new_with_signer'
at=expected.index(line,expected.index('pub fn claim('))
guard='    require!(ctx.accounts.global_incentive_token_account.key()!=ctx.accounts.user_ata.key() || ctx.accounts.global_incentive_token_account.owner==g.key(),PumpAmmError::SelfTransferNotAllowed);\n'
expected=expected[:at]+guard+expected[at:]
def proof(q,name,seal):
    assert H(q/'manifest.json')==seal
    f=q/name;assert H(f)==J(q/'manifest.json')['files'][name]
    return f.read_text()
mid=R/'repro/pump_amm/sync-context-v144';final=R/'repro/pump_amm/sync-nochange-log-v144'
ms='da4ceb96edbf1f4912958598db33c1e04897942008e1352372e8f3d710007709';fs='c782600d8e75effdf9e0000a949d2e1a541d6fdd7c18ce3a7d7d4fe7ba7ad5f3'
assert proof(mid,'source-proof/before.rs',ms)==expected
expected=proof(mid,'source-proof/after.rs',ms)
assert proof(final,'source-proof/before.rs',fs)==expected
expected=proof(final,'source-proof/after.rs',fs)
assert (R/n).read_text()==expected
assert set(changes['fees']) <= {'programs/pump-fees/src/sharing.rs','programs/pump-fees/README.md'}
assert 'programs/pump-fees/src/sharing.rs' in changes['fees']
n='programs/pump-fees/src/sharing.rs';before=(reviews/'fees/source'/n).read_text();old='.ok_or(error!(FeeError::AmmAccountsRequiredForGraduatedCoin))?';new='.ok_or(FeeError::AmmAccountsRequiredForGraduatedCoin)?';assert before.count(old)==1;expected=before.replace(old,new)
old='let graduated=ctx.accounts.bonding_curve.real_token_reserves==0;'
new='let graduated=ctx.accounts.bonding_curve.virtual_token_reserves==0\n   && ctx.accounts.bonding_curve.virtual_sol_reserves==0\n   && ctx.accounts.bonding_curve.real_token_reserves==0\n   && ctx.accounts.bonding_curve.real_sol_reserves==0;'
assert expected.count(old)==1;expected=expected.replace(old,new)
def read_bound(q,name,seal):
    assert H(q/'manifest.json')==seal
    m=J(q/'manifest.json');m=m.get('files',m);value=m[name];digest=value['sha256']if isinstance(value,dict)else value
    assert H(q/name)==digest
    return(q/name).read_text()
fq=R/'repro/layered-passes/pass-19/fees-option-order-proof';fs='623c326a53aca4ce5a6d954a69509512853711637b272759bc9316de0e3acba3'
assert read_bound(fq,'before/sharing.rs',fs)==expected
assert read_bound(fq,'proposal/sharing.rs',fs)==(R/n).read_text()
aq=R/'repro/pump_amm/init-user-ownership-v144';as_='c40533796fec31918abe2078ba8fece75286f8cc80c925a4f34e77995ecc88c6';n='programs/pump-amm/src/lib.rs'
assert read_bound(aq,'source-proof/before.rs',as_)==(reviews/'amm/source'/n).read_text()
assert read_bound(aq,'source-proof/after.rs',as_)==(R/n).read_text()
pq=R/'repro/pump/admin-cto-typed-fortyeight';ps='88ff3dbc224f3f67f0e366c2b564943bdb467b5bb1bc1b926c7a7f8ee646c2d8';n='programs/pump/src/admin_cto.rs'
assert read_bound(pq,'approved-proposal/before/admin_cto.rs',ps)==(reviews/'pump/source-view'/n).read_text()
assert read_bound(pq,'approved-proposal/proposal/admin_cto.rs',ps)==read_bound(pq,'borrow-scope-repair/before.rs',ps)
assert read_bound(pq,'borrow-scope-repair/admin_cto.rs',ps)==(R/n).read_text()
print(json.dumps({'status':'PASS','reviewed_snapshots':4,'enumerated_current_source_deltas':changes,'new_target_executions':0,'current_full_security_audit_claimed':False,'scope':'Historical review scope is retained. Only the listed source deltas are reconciled; this does not establish complete security or deployed equivalence.'},indent=2))
