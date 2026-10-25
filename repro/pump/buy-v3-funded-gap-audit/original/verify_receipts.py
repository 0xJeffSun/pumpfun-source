"""Read-only signature/state discriminator checks for the retained BuyV3 probes."""
import base64,hashlib,json,struct
from pathlib import Path
from solders.transaction import Transaction
P=Path(__file__).resolve().parent
ROOT=P.parents[1]
sha=lambda b:hashlib.sha256(b).hexdigest()
j=json.loads((P/'funded-comparison.json').read_text())
assert j['target_sha256']=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
assert j['candidate_sha256']=='c261d215495a35aa59970546b87bd5fb74407d2bbd5d885d41a0d1a2677cc2f2'
fixture=json.loads((ROOT/j['fixture']).read_text())
assert sha((ROOT/j['fixture']).read_bytes())==j['fixture_sha256']
curve=fixture['accounts']['curve'];base_user=fixture['accounts']['user_base']
watched_fields=['error','before','after','inner','event_payloads']
assert len(j['rows'])==36
signatures=0
for row in j['rows']:
    c,t,y=row['case'],row['target'],row['candidate']
    assert t['transaction_base64']==y['transaction_base64']
    assert t['before']==y['before']
    tx=Transaction.from_bytes(base64.b64decode(t['transaction_base64'],validate=True))
    assert all(tx.verify_with_results())and len(tx.signatures)==1
    signatures+=1
    assert t['executed_sha256']==j['target_sha256'] and y['executed_sha256']==j['candidate_sha256']
    assert row['different_fields']==[k for k in watched_fields if t[k]!=y[k]]
    a,r,p=c['requested'],c['real_token_reserves'],c['bool_bytes']
    if p==[2]:
        assert 'InstructionErrorCustom(102)'in t['error'] and t['watched_accounts_rolled_back']
        continue
    partial=p==[1]
    residual=not c['mode']and not c['whitelist_equal']and a>r
    selected=r if residual or partial and a>r else a
    if selected==0:
        assert 'InstructionErrorCustom(6020)'in t['error'] and t['watched_accounts_rolled_back']
    elif selected>r:
        assert 'InstructionErrorCustom(6021)'in t['error'] and t['watched_accounts_rolled_back']
        assert f'Program log: Left: {r}'in t['logs']and f'Program log: Right: {selected}'in t['logs']
    else:
        assert t['error']is None
        events=[base64.b64decode(x)for x in t['event_payloads']]
        assert struct.unpack_from('<Q',events[0],48)[0]==selected
        expected_events=1+(selected==r)+(residual and a>r)
        assert len(events)==expected_events,(c,len(events),expected_events)
        before=base64.b64decode(t['before'][base_user]['data_base64'])
        after=base64.b64decode(t['after'][base_user]['data_base64'])
        delta=struct.unpack_from('<Q',after,64)[0]-struct.unpack_from('<Q',before,64)[0]
        assert delta==(a if residual else selected),(c,delta)
        data=base64.b64decode(t['after'][curve]['data_base64'])
        assert struct.unpack_from('<Q',data,24)[0]==r-selected
        if residual:
            assert struct.unpack_from('<Q',data,150)[0]==a-r
            assert struct.unpack_from('<Q',events[2],144)[0]==a-r
assert sum(bool(row['different_fields'])for row in j['rows'])==21
print(json.dumps(dict(verified=True,normal_signed_unique_transactions=signatures,
 paired_executions=72,target_successes=sum(r['target']['error']is None for r in j['rows']),
 candidate_successes=sum(r['candidate']['error']is None for r in j['rows']),
 mismatching_pairs=21,full_handler_or_original_identity=False),indent=2))
