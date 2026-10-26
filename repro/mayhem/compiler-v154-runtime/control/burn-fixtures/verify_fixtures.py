#!/usr/bin/env python3
"""Hash and cross-check retained RPC/account/transaction bytes, offline only."""
from pathlib import Path
import base64, hashlib, json
from solders.transaction import VersionedTransaction
from solders.message import to_bytes_versioned

ROOT=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
allowed={'getGenesisHash','getSlot','getBlockTime','getSignaturesForAddress',
         'getTransaction','getMultipleAccounts','getAccountInfo','getBlock'}
captures=[]
for p in sorted((ROOT/'rpc').glob('*.provenance.json')):
    name=p.name.removesuffix('.provenance.json');meta=json.loads(p.read_text())
    request=(ROOT/'rpc'/(name+'.request.json')).read_bytes()
    response=(ROOT/'rpc'/(name+'.response.json')).read_bytes()
    req=json.loads(request)
    assert req['method'] in allowed and req['method']==meta['method']
    assert req['params']==meta['params'] and meta['endpoint']=='https://api.mainnet-beta.solana.com'
    assert sha(request)==meta['request_sha256'] and sha(response)==meta['response_sha256']
    assert len(response)==meta['response_bytes']
    captures.append({'label':name,'method':req['method'],'http_status':meta['http_status'],'response_sha256':sha(response)})
j=json.loads((ROOT/'fixture-manifest.json').read_text())
assert j['genesis_hash']=='5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d'
count=0
for snapshot in j['snapshots'].values():
    assert sha((ROOT/snapshot['source']).read_bytes())==snapshot['response_sha256']
    for address,row in snapshot['accounts'].items():
        if row['exists']:
            data=(ROOT/row['data_file']).read_bytes()
            assert len(data)==row['data_bytes'] and sha(data)==row['data_sha256'];count+=1
for t in j['historical_transactions']:
    response=json.loads((ROOT/t['source']).read_text())['result']
    data=(ROOT/t['transaction_file']).read_bytes()
    assert data==base64.b64decode(response['transaction'][0])
    tx=VersionedTransaction.from_bytes(data);assert all(tx.verify_with_results())
    message=(ROOT/t['message_file']).read_bytes()
    assert message==to_bytes_versioned(tx.message)
    assert sha(data)==t['transaction_sha256'] and sha(message)==t['message_sha256']
assert len(j['eligible_families'])==3
assert all(f['current_guard_observation']['predicted_handler_error'] is None for f in j['eligible_families'])
assert not j['feasibility']['success_replay_ready'] and not j['feasibility']['program_execution_performed']
summary={'rpc_captures':len(captures),'methods_used':sorted({c['method'] for c in captures}),
         'raw_account_files_verified':count,'signed_burn_transactions':len(j['historical_transactions']),
         'historical_burn_instructions':sum(len(x['burns']) for x in j['historical_transactions']),
         'eligible_families':len(j['eligible_families']),'acquisition_phase_program_execution':False,
         'fixture_manifest_sha256':sha((ROOT/'fixture-manifest.json').read_bytes())}
(ROOT/'verification.json').write_text(json.dumps(summary,indent=2)+'\n')
files={str(p.relative_to(ROOT)):sha(p.read_bytes()) for p in sorted(ROOT.rglob('*'))
       if p.is_file() and not {'__pycache__','target','cargo-home','sdk','rustup'}.intersection(p.relative_to(ROOT).parts) and p.name!='file-hashes.json'}
(ROOT/'file-hashes.json').write_text(json.dumps(files,indent=2)+'\n')
print(json.dumps(summary,indent=2))
