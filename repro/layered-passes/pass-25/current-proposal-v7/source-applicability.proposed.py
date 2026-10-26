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
    before=J(reviews/name/file);report=J(R/status[key]['comparison_report']);after=report['source_sha256'];assert set(before)<=set(after);assert set(after)-set(before)==({'programs/pump-amm/src/instructions/token_incentives/mod.rs','programs/pump-amm/src/instructions/token_incentives/init_user_volume_accumulator.rs'}if name=='amm'else set())
    assert H(R/status[key]['candidate_artifact'])==report['comparison']['candidate_sha256']
    for n,h in after.items():assert H(R/n)==h,n
    changes[name]=[n for n in after if before.get(n)!=after[n]]
    if name=='mayhem':assert not changes[name]
    if name=='pump':assert changes[name]==['programs/pump/src/admin_cto.rs']
assert set(changes['amm'])=={'programs/pump-amm/src/incentives.rs','programs/pump-amm/src/lib.rs','programs/pump-amm/src/instructions/mod.rs','programs/pump-amm/src/instructions/token_incentives/mod.rs','programs/pump-amm/src/instructions/token_incentives/init_user_volume_accumulator.rs'}
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
assert set(changes['fees']) <= {'programs/pump-fees/src/sharing.rs','programs/pump-fees/idls/pump.json','programs/pump-fees/idls/pump_amm.json','programs/pump-fees/README.md'}
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
prior_sharing=read_bound(fq,'proposal/sharing.rs',fs)
import tarfile
extension=R/'repro/pump_fees/sharing-pump-extend-v144'
assert H(extension/'manifest.json')=='b7acdf256de5b94385153c5120a75cf3c8a8bb88220acbc0e302067b350f3074'
archive=extension/'initial-source-review.tar.gz';assert H(archive)==J(extension/'manifest.json')[archive.name]
with tarfile.open(archive)as z:
 assert z.extractfile('initial-source-review/before/sharing.rs').read().decode()==prior_sharing
 prior_typed_sharing=z.extractfile('initial-source-review/proposal/sharing.rs').read()
 assert z.extractfile('initial-source-review/proposal/pump.json').read()==(R/'programs/pump-fees/idls/pump.json').read_bytes()
 assert z.extractfile('initial-source-review/before/pump.json').read()==(reviews/'fees/source/programs/pump-fees/idls/pump.json').read_bytes()
second=R/'repro/pump_fees/sharing-second-pump-cpi-v144'
assert H(second/'manifest.json')=='92e0f76ab475510b403d7a32b7654b2dab8ae697a89c6a24add7ed278789bc67'
archive=second/'initial-source-review.tar.gz';assert H(archive)==J(second/'manifest.json')[archive.name]
with tarfile.open(archive)as z:
 assert z.extractfile('initial-source-review/before/programs/pump-fees/src/sharing.rs').read()==prior_typed_sharing
 prior_second_sharing=z.extractfile('initial-source-review/proposal/programs/pump-fees/src/sharing.rs').read()
thirdfourth=R/'repro/layered-passes/pass-22/fees-third-fourth-cpi-source';thirdfourthseal='6214813b74a0419daca9cdbeccf25f1903fb8789156cdc26d009d9c1a66c3da6'
assert read_bound(thirdfourth,'baseline/sharing.rs',thirdfourthseal).encode()==prior_second_sharing
prior_fourth=read_bound(thirdfourth,'proposal/sharing.rs',thirdfourthseal)
auth=R/'repro/layered-passes/pass-23/fees-authorize-source-proof';authseal='2ee2ababe2f31561f15dfa382bf2454ada2073a363bdfc54720375dcc7754d22'
assert read_bound(auth,'before.rs',authseal)==prior_fourth
assert read_bound(auth,'proposal.rs',authseal)==(R/'programs/pump-fees/src/sharing.rs').read_text()
assert read_bound(thirdfourth,'baseline/pump_amm.json',thirdfourthseal)==(reviews/'fees/source/programs/pump-fees/idls/pump_amm.json').read_text()
assert read_bound(thirdfourth,'proposal/pump_amm.json',thirdfourthseal)==(R/'programs/pump-fees/idls/pump_amm.json').read_text()
aq=R/'repro/pump_amm/init-user-ownership-v144';as_='c40533796fec31918abe2078ba8fece75286f8cc80c925a4f34e77995ecc88c6';n='programs/pump-amm/src/lib.rs'
assert read_bound(aq,'source-proof/before.rs',as_)==(reviews/'amm/source'/n).read_text()
prior_lib=read_bound(aq,'source-proof/after.rs',as_)
lq=R/'repro/pump_amm/init-logical-module-v144';ls='631b07c3dc505995abb4379a5689cc8476988c769f9edc93dba58bc1d2a27142'
assert read_bound(lq,'source-proof/before/'+n,ls)==prior_lib
for f in ['programs/pump-amm/src/lib.rs','programs/pump-amm/src/instructions/mod.rs','programs/pump-amm/src/instructions/token_incentives/mod.rs','programs/pump-amm/src/instructions/token_incentives/init_user_volume_accumulator.rs']:
 assert read_bound(lq,'source-proof/after/'+f,ls)==(R/f).read_text()
pq=R/'repro/pump/admin-cto-typed-fortyeight';ps='88ff3dbc224f3f67f0e366c2b564943bdb467b5bb1bc1b926c7a7f8ee646c2d8';n='programs/pump/src/admin_cto.rs'
assert read_bound(pq,'approved-proposal/before/admin_cto.rs',ps)==(reviews/'pump/source-view'/n).read_text()
assert read_bound(pq,'approved-proposal/proposal/admin_cto.rs',ps)==read_bound(pq,'borrow-scope-repair/before.rs',ps)
prior_cto=read_bound(pq,'borrow-scope-repair/admin_cto.rs',ps)
oq=R/'repro/pump/admin-cto-owned-fortyeight';os_='188d05753372838322625c75ffc77cfa73a929d8dc15dee3bef21800fc5b71f0'
assert read_bound(oq,'approved-proposal/before/admin_cto.rs',os_)==prior_cto
prior_owned_cto=read_bound(oq,'approved-proposal/proposal/admin_cto.rs',os_)
nextq=R/'repro/pump/admin-cto-owned6083-fortyeight';ns='aa7cdc0eb3f16c6b1eeb1738c47c2c5b9a2cc6cb70a716f5f4850f8b27fb2005'
assert read_bound(nextq,'approved-proposal/before/admin_cto.rs',ns)==prior_owned_cto
prior6083=read_bound(nextq,'approved-proposal/proposal/admin_cto.rs',ns)
batch=R/'repro/layered-passes/pass-22/pump-error-batch-source';batchseal='f983be69950e04e9143c7b7610a108e7dac31d603b47406bb776b08a40295d1e'
assert read_bound(batch,'before/admin_cto.rs',batchseal)==prior6083
prior_batch=read_bound(batch,'proposal/admin_cto.rs',batchseal)
compared=R/'repro/layered-passes/pass-24/pump-compared-errors-source-proof';comparedseal='bcb32d74c6d9fc5c438809c72665545238bab7cb1933ecd7cd2bee818080a25e'
assert read_bound(compared,'before/admin_cto.rs',comparedseal)==prior_batch
# NEW explicit full-source continuation, no source assertion removed.
continuation=J(P/'source-continuation.json');assert continuation['complete'] is True and len(continuation['pump_chain'])>=2
prior=read_bound(compared,'proposal/admin_cto.rs',comparedseal)
for link in continuation['pump_chain']:
 q=R/link['package'];assert read_bound(q,link['before'],link['seal'])==prior
 prior=read_bound(q,link['after'],link['seal'])
assert prior==(R/n).read_text()
subprocess.run([sys.executable,'-B',str(compared/'verify.py')],check=True)
relay=continuation['relay'];assert relay['approved_selection_complete'] is True
# NEW caller pins the selected known seal; original Darwin runtime hash is provenance only.
subprocess.run([sys.executable,'-B',str(R/relay['bridge']/'verify.py'),'--current-root',str(R),'--expected-seal',relay['seal']],check=True)
subprocess.run([sys.executable,'-B',str(R/'repro/mayhem/compiler-v154-main/current_bridge.py'),'--current-root',str(R),'--expected-seal','f5d514664d47a04cc22282fdd19ca9e01d835c8a335aa9acc3f637fc61650acc'],check=True)
print(json.dumps({'status':'PASS','reviewed_snapshots':4,'enumerated_current_source_deltas':changes,'new_target_executions':0,'current_full_security_audit_claimed':False,'selected_relay_finite_acceptance_bound':True,'pump_compared_source_sites':2,'scope':'Historical review scope is retained. Only the listed source deltas are reconciled; this does not establish complete security or deployed equivalence.'},indent=2))
