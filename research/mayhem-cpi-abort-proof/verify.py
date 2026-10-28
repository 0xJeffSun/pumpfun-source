"""Independently reconcile invocation outcomes, transfer amounts and rollback."""
if not __debug__:
    raise RuntimeError('Evidence verification requires ordinary Python')
from pathlib import Path
import argparse, base64, gzip, hashlib, json, re, struct
from solders.transaction import Transaction
import static

P = Path(__file__).resolve().parent
R = P.parents[1]
MAY = 'MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'
PUMP = '6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P'
SYSTEM = '11111111111111111111111111111111'
TOKEN = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
TOKEN22 = 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'
sha = lambda b: hashlib.sha256(b).hexdigest()
data = lambda a: base64.b64decode(a['data_base64'])

def shortvec(value):
    length = sum((b & 127) << (7*i) for i,b in enumerate(value[0]))
    result = bytes(value[1:])
    assert len(result) == length
    return result

def invocations(logs):
    nodes = []
    stack = []
    for line in logs:
        start = re.fullmatch(r'Program (\w+) invoke \[(\d+)\]', line)
        finish = re.fullmatch(r'Program (\w+) (success|failed: .+)', line)
        if start:
            program, depth = start[1], int(start[2])
            assert depth == len(stack)+1
            nodes.append(dict(program=program, depth=depth, parent=stack[-1] if stack else None,
                              outcome=None))
            stack.append(len(nodes)-1)
        elif finish:
            assert stack and nodes[stack[-1]]['program'] == finish[1]
            nodes[stack.pop()]['outcome'] = finish[2]
    assert not stack and all(n['outcome'] is not None for n in nodes)
    return nodes

def verify_runtime(document):
    rows = document['cases']
    observations = document['programs']
    assert len(rows) == 11 and len(observations) == 22
    expected_profiles = {(family,name) for family in ['native','token','token22']
                         for name in ['control','base_frozen','late_unfunded']}
    expected_profiles |= {('token','late_frozen'),('token22','late_frozen')}
    assert {(r['family'],r['case']['name']) for r in rows} == expected_profiles
    assert all(sha((R/n).read_bytes()) == h for n,h in document['input_reads'].items())
    expected_programs = {}
    for group,names in [('original',['mayhem','pump','pump_fees']),
                        ('dependencies',['spl_token','spl_token_2022','associated_token'])]:
        for name in names:
            path = R/'evidence'/group/name
            key = json.loads((path/'capture.json').read_bytes())['program']
            image = (path/'deployed.so').read_bytes()
            expected_programs[key] = (sha(image),len(image))
    candidate = gzip.decompress((P/'public/candidate.so.gz').read_bytes())
    assert sha(candidate) == '4c77fa48d44282c7b7c97580622bff00f5a570e5ba537d1b43376c70c36e7be4'
    results = []
    for index,pair in enumerate(rows):
        original,candidate_row = pair['original'],pair['candidate']
        assert original['transaction_base64'] == candidate_row['transaction_base64']
        assert original['error'] == candidate_row['error']
        for phase in ['before','after']:
            assert {k:v for k,v in original[phase].items() if k!=MAY} == {k:v for k,v in candidate_row[phase].items() if k!=MAY}
        for key in ['inner_instructions','return_data']:
            assert original['metadata'][key] == candidate_row['metadata'][key]
        strict = lambda row: [line for line in row['metadata']['logs'] if not re.search(r' consumed \d+ of \d+ compute units',line)]
        assert strict(original) == strict(candidate_row)
        summaries = []
        for offset,side in enumerate(['original','candidate']):
            row = pair[side]
            assert row['case'] == pair['case']
            tx = Transaction.from_bytes(base64.b64decode(row['transaction_base64']))
            keys = list(map(str,tx.message.account_keys))
            assert all(tx.verify_with_results()) and tx.message.header.num_required_signatures == 2
            assert str(tx.signatures[0]) == row['signature'] == row['metadata']['signature']
            observation = observations[2*index+offset]
            assert observation['side'] == side and observation['family'] == pair['family'] and observation['case'] == pair['case']['name']
            assert observation['signature'] == row['signature'] and observation['transaction_base64'] == row['transaction_base64']
            assert observation['before'] == observation['after'] and set(observation['before']) == set(expected_programs)
            for program,(digest,size) in expected_programs.items():
                if side == 'candidate' and program == MAY:
                    digest,size = sha(candidate),len(candidate)
                observed = observation['before'][program]
                assert observed['executable'] and (observed['sha256'],observed['bytes']) == (digest,size)
            assert set(keys) <= row['before'].keys() and row['before'].keys() == row['after'].keys()
            for phase in ['before','after']:
                for account in row[phase].values():
                    if account is not None and not account['executable']:
                        assert sha(data(account)) == account['data_sha256']
            payer = keys[0]
            assert row['after'][payer] == dict(row['before'][payer],lamports=row['before'][payer]['lamports']-10000)
            top = tx.message.instructions[-1]
            assert keys[top.program_id_index] == MAY and bytes(top.data[:8]) == hashlib.sha256(b'global:buy_v2').digest()[:8]
            metas = [keys[i] for i in top.accounts]
            family,name = pair['family'],pair['case']['name']
            assert row['case']['token_quote'] == (family!='native')
            assert row['case']['quote_token22'] == (family=='token22')
            if name=='base_frozen':
                assert data(row['before'][metas[6]])[108] == 2
            elif name=='late_unfunded':
                assert (row['before'][metas[8]]['lamports'] == 1 if family=='native' else
                        struct.unpack_from('<Q',data(row['before'][metas[7]]),64)[0] == 0)
            elif name=='late_frozen':
                assert data(row['before'][metas[14]])[108] == 2
            nodes = invocations(row['metadata']['logs'])
            calls = [n for n in nodes if n['depth']>1]
            inner = row['metadata']['inner_instructions']
            assert len(inner)==2 and inner[0]==[] and len(inner[1])==len(calls)
            transfers = []
            for call,encoded in zip(calls,inner[1]):
                ix=encoded['instruction']; program=keys[ix['programIdIndex']]
                assert (call['program'],call['depth']) == (program,encoded['stackHeight'])
                payload=shortvec(ix['data']); accounts=[keys[i] for i in shortvec(ix['accounts'])]
                if program in [TOKEN,TOKEN22] and payload[0]==12:
                    assert len(payload)==10 and len(accounts)==4
                    amount=int.from_bytes(payload[1:9],'little')
                    assert amount>0
                    source,mint,destination,authority=accounts
                    for account in [source,destination]:
                        assert row['before'][account]['owner']==program
                        assert data(row['before'][account])[:32]==bytes(tx.message.account_keys[keys.index(mint)])
                    transfers.append(dict(program=program,source=source,destination=destination,amount=amount,
                                          authority=authority,outcome=call['outcome'],depth=call['depth']))
                elif program==SYSTEM:
                    assert len(payload)==12 and int.from_bytes(payload[:4],'little')==2 and len(accounts)==2
                    transfers.append(dict(program=program,source=accounts[0],destination=accounts[1],amount=int.from_bytes(payload[4:],'little'),
                                          outcome=call['outcome'],depth=call['depth']))
            assert transfers[0]['program']==TOKEN22
            assert (transfers[0]['source'],transfers[0]['destination'],transfers[0]['amount'])==(metas[17],metas[6],100003404)
            if len(transfers)==2:
                assert (transfers[1]['source'],transfers[1]['destination']) == ((metas[8],metas[13]) if family=='native' else (metas[7],metas[14]))
            name=pair['case']['name']; family=pair['family']
            if name=='control':
                assert row['error'] is None and all(n['outcome']=='success' for n in nodes)
                assert len(transfers)==2 and transfers[1]['amount']==2796
                for transfer in transfers:
                    if transfer['program']==SYSTEM:
                        balance=lambda phase,key:row[phase][key]['lamports']
                    else:
                        balance=lambda phase,key:struct.unpack_from('<Q',data(row[phase][key]),64)[0]
                    assert balance('after',transfer['source'])-balance('before',transfer['source']) == -transfer['amount']
                    assert balance('after',transfer['destination'])-balance('before',transfer['destination']) == transfer['amount']
            else:
                code=1 if name=='late_unfunded' else 17
                assert row['error']==f'TransactionErrorInstructionError((1, Tagged(InstructionErrorCustom({code}))))'
                terminal=f'failed: custom program error: {hex(code)}'
                failures=[n for n in nodes if n['outcome']!='success']
                assert [(n['program'],n['depth']) for n in failures[:2]]==[(MAY,1),(PUMP,2)]
                assert len(failures)==3 and failures[-1]['depth']==3
                assert all(n['outcome']==terminal for n in failures)
                assert all(row['before'][key]==row['after'][key] for key in row['before'] if key!=payer)
                if name=='base_frozen':
                    assert len(transfers)==1 and transfers[0]['outcome']==terminal
                else:
                    assert len(transfers)==2 and transfers[0]['outcome']=='success' and transfers[1]['outcome']==terminal
                    assert transfers[1]['amount']==2796
                    assert transfers[1]['program']==(SYSTEM if family=='native' else TOKEN if family=='token' else TOKEN22)
            assert not any('PumpCpiFailed' in line for line in row['metadata']['logs'])
            summaries.append(dict(family=family,case=name,error=row['error'],transfers=transfers,
                                  callback_6008_observed=False))
        assert summaries[0]==summaries[1]
        results.append(summaries[0])
    return dict(pairs=11,signed_transactions=22,verified_signature_fields=44,success_pairs=3,
                rejected_pairs=8,late_failure_pairs=5,results=results,
                scope='Observed external-CPI failures propagate leaf status and roll back prior successful transfer. '
                      'No callback-PC trace or universal callback-unreachability claim.')

def main():
    ap=argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--runtime',type=Path,default=P/'runtime')
    a=ap.parse_args()
    manifest=json.loads((P/'manifest.json').read_bytes())
    for path,digest in manifest['files'].items():
        assert sha((P/path).read_bytes())==digest,path
    for path,digest in manifest['external_inputs'].items():
        assert sha((R/path).read_bytes())==digest,path
    assert json.loads((a.runtime/'result.json').read_bytes())['returncode']==0
    assert json.loads((a.runtime/'launch.json').read_bytes())['solders']=='0.27.1'
    runtime=verify_runtime(json.loads(gzip.decompress((a.runtime/'receipts.json.gz').read_bytes())))
    measured=static.measure()
    assert measured==json.loads((P/'static-report.json').read_bytes())
    if a.runtime.resolve()==(P/'runtime').resolve():
        assert runtime==json.loads((P/'runtime-report.json').read_bytes())
    print(json.dumps(dict(pairs=runtime['pairs'],signed_transactions=runtime['signed_transactions'],
                         late_failure_pairs=runtime['late_failure_pairs'],vtable_method_roots=4,
                         complete_direct_pairs=len(measured['pairs']),actual_direct_edges=len(measured['edges']))))

if __name__=='__main__':
    main()
