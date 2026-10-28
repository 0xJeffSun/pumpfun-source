"""Independent fee/conservation/position oracle, plus the frozen event verifier."""
if not __debug__:
    raise RuntimeError('Evidence verification requires ordinary Python')
from pathlib import Path
import argparse, base64, gzip, hashlib, json, re, struct, subprocess, sys, tempfile
from solders.transaction import Transaction
import cases

P=Path(__file__).resolve().parent
R=P.parents[1]
MAY='MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'
PUMP='6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P'
TOKEN22='TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'
sha=lambda b:hashlib.sha256(b).hexdigest()
data=lambda a:base64.b64decode(a['data_base64'])
number=lambda b,offset,length=8,signed=False:int.from_bytes(b[offset:offset+length],'little',signed=signed)

def shortvec(v):
    size=sum((x&127)<<(7*i)for i,x in enumerate(v[0]));result=bytes(v[1:])
    assert size==len(result)
    return result

def extensions(raw,kind,base_size):
    if len(raw)==base_size:return {}
    assert len(raw)>=166 and raw[165]==kind
    if kind==1:assert raw[82:165]==bytes(83)
    result={};offset=166
    while offset<len(raw):
        assert offset+4<=len(raw)
        tag,size=struct.unpack_from('<HH',raw,offset);offset+=4
        if tag==0:
            assert size==0 and not any(raw[offset:]);break
        assert tag not in result and offset+size<=len(raw)
        result[tag]=raw[offset:offset+size];offset+=size
    return result

def fee_config(mint):
    value=extensions(mint,1,82).get(1)
    if value is None:return None
    assert len(value)==108 and value[:72]==bytes(72)
    old,new=struct.unpack_from('<QQH',value,72),struct.unpack_from('<QQH',value,90)
    assert old==new and old[0]==0 and 0<=old[2]<=10000
    return dict(epoch=old[0],maximum=old[1],bps=old[2])

def withheld(account):
    value=extensions(data(account),2,165).get(2)
    if value is None:return 0
    assert len(value)==8
    return number(value,0)

def check(document):
    assert document['case_count']==len(document['cases'])==10 and not document['mismatches']
    assert len(document['programs'])==20
    assert document['candidate_sha256']==sha(gzip.decompress((P/'public/candidate.so.gz').read_bytes()))=='4c77fa48d44282c7b7c97580622bff00f5a570e5ba537d1b43376c70c36e7be4'
    assert document['original_sha256']==sha((R/'evidence/original/mayhem/deployed.so').read_bytes())
    assert document['input_reads']==document['harness_sha256']
    assert all(sha((R/n).read_bytes())==h for n,h in document['input_reads'].items())
    programs={}
    for group,names in [('original',['mayhem','pump','pump_fees']),('dependencies',['spl_token','spl_token_2022','associated_token'])]:
        for name in names:
            path=R/'evidence'/group/name
            key=json.loads((path/'capture.json').read_bytes())['program'];image=(path/'deployed.so').read_bytes()
            programs[key]=(sha(image),len(image))
    results=[]
    for index,(pair,profile) in enumerate(zip(document['cases'],cases.profiles())):
        assert pair['profile']==profile and pair['case']==cases.fixture_case(profile) and not pair['different_fields']
        left,right=pair['original'],pair['candidate']
        assert left['error']==right['error'] and left['transaction_base64']==right['transaction_base64']
        strict=lambda row:[l for l in row['metadata']['logs']if not re.search(r' consumed \d+ of \d+ compute units',l)]
        assert strict(left)==strict(right)
        for phase in ['before','after']:
            assert {k:v for k,v in left[phase].items()if k!=MAY}=={k:v for k,v in right[phase].items()if k!=MAY}
        for field in ['inner_instructions','return_data']:
            assert left['metadata'][field]==right['metadata'][field]
        proofs=[]
        for side_index,side in enumerate(['original','candidate']):
            row=pair[side];assert row['case']==pair['case']
            tx=Transaction.from_bytes(base64.b64decode(row['transaction_base64']))
            assert all(tx.verify_with_results()) and tx.message.header.num_required_signatures==2
            assert row['signature']==row['metadata']['signature']==str(tx.signatures[0])
            keys=list(map(str,tx.message.account_keys));instruction=tx.message.instructions[-1]
            assert keys[instruction.program_id_index]==MAY
            outer=[keys[i]for i in instruction.accounts]
            assert set(keys)<=row['before'].keys() and row['before'].keys()==row['after'].keys()
            for phase in ['before','after']:
                for account in row[phase].values():
                    if account is not None and not account['executable']:assert sha(data(account))==account['data_sha256']
            observation=document['programs'][2*index+side_index]
            assert observation['profile']==profile['name'] and observation['side']==side
            assert observation['transaction_base64']==row['transaction_base64'] and observation['signature']==row['signature']
            assert observation['before']==observation['after'] and set(observation['before'])==set(programs)
            for key,(digest,size) in programs.items():
                if key==MAY and side=='candidate':digest=document['candidate_sha256'];size=len(gzip.decompress((P/'public/candidate.so.gz').read_bytes()))
                observed=observation['before'][key]
                assert observed['executable'] and (observed['sha256'],observed['bytes'])==(digest,size)
            payer=keys[0]
            assert row['after'][payer]==dict(row['before'][payer],lamports=row['before'][payer]['lamports']-10000)
            configurations={}
            for kind,mint_index in [('base',3),('quote',4)]:
                key=outer[mint_index];assert row['before'][key]==row['after'][key]
                config=fee_config(data(row['before'][key]));expected=profile[kind]
                assert (None if config is None else [config['bps'],config['maximum']])==expected
                configurations[key]=config
            transfers=[]
            for group in row['metadata']['inner_instructions']:
                for entry in group:
                    ix=entry['instruction'];payload=shortvec(ix['data'])
                    if keys[ix['programIdIndex']]!=TOKEN22 or payload[0]!=12:continue
                    assert len(payload)==10 and entry['stackHeight']==3
                    accounts=[keys[i]for i in shortvec(ix['accounts'])];assert len(accounts)==4
                    source,mint,destination,authority=accounts
                    assert mint in configurations
                    gross=number(payload,1);assert gross>0
                    config=configurations[mint]
                    fee=0 if config is None else min(config['maximum'],(gross*config['bps']+9999)//10000)
                    assert fee<=gross
                    for key in [source,destination]:
                        assert row['before'][key]['owner']==TOKEN22
                        assert data(row['before'][key])[:32]==bytes(tx.message.account_keys[keys.index(mint)])
                    transfers.append(dict(source=source,destination=destination,mint=mint,gross=gross,fee=fee,net=gross-fee,
                                          withheld_before=withheld(row['before'][destination])))
            quote_rejected=profile['quote']is not None
            overflow=profile['name']=='minimum_net_positive'
            assert (row['error']is not None)==(quote_rejected or overflow)
            logs=row['metadata']['logs']
            if row['error']is not None:
                assert row['error']=='TransactionErrorInstructionError((1, Tagged(InstructionErrorCustom(6002))))'
                assert all(row['before'][key]==row['after'][key]for key in row['before']if key!=payer)
                if quote_rejected:
                    assert not transfers
                    assert any('Error Code: TooMuchSolRequired.'in l for l in logs)
                    assert f'Program {PUMP} failed: custom program error: 0x1772'in logs
                    assert [l for l in logs if re.match(r'^Program \w+ failed:',l)]==[f'Program {PUMP} failed: custom program error: 0x1772',f'Program {MAY} failed: custom program error: 0x1772']
                    stage='Pump quote slippage before token transfers'
                else:
                    assert len(transfers)==2 and transfers[0]['net']>0
                    assert any('Error Code: MathOverflow.'in l for l in logs)
                    assert f'Program {PUMP} success'in logs
                    assert f'Program {PUMP} failed: custom program error: 0x1772'not in logs
                    assert [l for l in logs if re.match(r'^Program \w+ failed:',l)]==[f'Program {MAY} failed: custom program error: 0x1772']
                    assert logs.count(f'Program {TOKEN22} success')==2
                    assert number(data(row['before'][outer[2]]),72,16,True)-transfers[0]['net']<-(1<<127)
                    stage='Mayhem position overflow after two successful token transfers'
            else:
                assert len(transfers)==2 and logs.count(f'Program {TOKEN22} success')==2
                stage='success'
            if transfers:
                assert (transfers[0]['source'],transfers[0]['destination'],transfers[0]['gross'])==(outer[17],outer[6],100003404)
                assert (transfers[1]['source'],transfers[1]['destination'],transfers[1]['gross'])==(outer[7],outer[14],2796)
            if row['error']is None:
                for transfer in transfers:
                    src,dst=transfer['source'],transfer['destination'];amount=lambda phase,key:number(data(row[phase][key]),64)
                    assert amount('before',src)-amount('after',src)==transfer['gross']
                    assert amount('after',dst)-amount('before',dst)==transfer['net']
                    assert withheld(row['after'][dst])-withheld(row['before'][dst])==transfer['fee']
                    assert withheld(row['after'][src])==withheld(row['before'][src])
                    assert amount('before',src)+amount('before',dst)+withheld(row['before'][src])+withheld(row['before'][dst])==amount('after',src)+amount('after',dst)+withheld(row['after'][src])+withheld(row['after'][dst])
                base,quote=transfers
                for account,offset,delta in [(outer[1],206,quote['gross']),(outer[2],56,quote['gross']),(outer[2],72,-base['net'])]:
                    assert number(data(row['after'][account]),offset,16,True)-number(data(row['before'][account]),offset,16,True)==delta
                if profile['name']=='minimum_net_zero':
                    assert base['net']==0 and number(data(row['after'][outer[2]]),72,16,True)==-(1<<127)
            proofs.append(dict(profile=profile['name'],stage=stage,transfers=transfers))
        assert proofs[0]==proofs[1];results.append(proofs[0])
    return dict(pairs=10,signed_transactions=20,signature_fields=40,successful_pairs=7,rejected_pairs=3,
                results=results,scope='Finite synthetic BuyV2 Token-2022 transfer-fee accounting; no live reachability or general error coverage.')

def canonical_check(runtime):
    with tempfile.TemporaryDirectory(prefix='mayhem-fee-canonical-')as directory:
        temporary=Path(directory);candidate=temporary/'candidate.so'
        candidate.write_bytes(gzip.decompress((P/'public/candidate.so.gz').read_bytes()))
        output=temporary/'proof.json'
        command=[sys.executable,'-B',str(R/'scripts/verify_mayhem_buy_v2.py'),'--receipts',str(runtime/'receipts.json.gz'),'--candidate',str(candidate),'--output',str(output)]
        result=subprocess.run(command,capture_output=True,text=True)
        assert result.returncode==0,result.stderr
        proof=json.loads(output.read_bytes())
        assert proof['verified_signed_transactions']==20 and proof['successful_cases']==7 and proof['rejection_cases']==3
        assert proof['complete_event_and_state_checks']==14 and proof['complete_failed_transaction_rollback_checks']==6
        return proof

def main():
    ap=argparse.ArgumentParser(description=__doc__);ap.add_argument('--runtime',type=Path,default=P/'runtime');a=ap.parse_args()
    manifest=json.loads((P/'manifest.json').read_bytes())
    for name,digest in manifest['files'].items():assert sha((P/name).read_bytes())==digest,name
    for name,digest in manifest['external_inputs'].items():assert sha((R/name).read_bytes())==digest,name
    assert json.loads((a.runtime/'result.json').read_bytes())['returncode']==0
    assert json.loads((a.runtime/'launch.json').read_bytes())['solders']=='0.27.1'
    result=check(json.loads(gzip.decompress((a.runtime/'receipts.json.gz').read_bytes())))
    canonical=canonical_check(a.runtime)
    if a.runtime.resolve()==(P/'runtime').resolve():
        assert result==json.loads((P/'report.json').read_bytes())
        assert canonical==json.loads((P/'canonical-proof.json').read_bytes())
    print(json.dumps({key:result[key]for key in ['pairs','signed_transactions','successful_pairs','rejected_pairs']}))

if __name__=='__main__':main()
