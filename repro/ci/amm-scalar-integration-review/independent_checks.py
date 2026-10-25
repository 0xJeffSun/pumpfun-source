#!/usr/bin/env python3
"""Inspect saved files/signatures only. Never imports or executes LiteSVM."""
from pathlib import Path
import argparse,base64,collections,gzip,hashlib,json,struct
from solders.transaction import Transaction
H=lambda b:hashlib.sha256(b).hexdigest()
J=lambda p:json.loads(p.read_text())
def gz(p):return json.loads(gzip.decompress(p.read_bytes()))

def check(package):
    p=package;s=p/'scratch';old=s/'prebuild'
    assert H((p/'manifest.json').read_bytes())=='91303b85c079c8154f13af252a12538e145764756cb8a6d83337771f531eb648'
    assert H((s/'manifest.json').read_bytes())=='47597f9733ee81e5e01bdaf5b7e44aebbba3960886cdcad281f985b050cfe991'
    for directory in [p,s,old]:
        seal=J(directory/'manifest.json')['files']
        actual={str(x.relative_to(directory)):{'bytes':x.stat().st_size,'sha256':H(x.read_bytes())}for x in directory.rglob('*')if x.is_file()and x!=directory/'manifest.json'}
        assert actual==seal
    candidate=(p/'candidate.so').read_bytes();assert candidate==(s/'candidate.so').read_bytes()
    digest=H(candidate);assert digest=='a6dbd0dc24e28a9459e50858136a2cfabb59fb8aa8399d58499d047a76ec291f'and len(candidate)==1177512
    proposal=J(s/'proposed-source-sha256.json');baseline=J(s/'baseline-source-sha256.json')
    assert len(proposal)==len(baseline)==18
    assert [n for n in proposal if proposal[n]!=baseline[n]]==['programs/pump-amm/src/lib.rs']
    assert J(p/'build-comparison.json')['source_sha256']==proposal
    src=(s/'source/programs/pump-amm/src/lib.rs').read_text()
    statements=['require_gte!(1000u64, lp_fee_basis_points','config.lp_fee_basis_points = lp_fee_basis_points;',
        'require_gte!(1000u64, protocol_fee_basis_points','config.protocol_fee_basis_points = protocol_fee_basis_points;',
        'for recipient in protocol_fee_recipients.iter()','for i in 1..8','config.protocol_fee_recipients = protocol_fee_recipients;',
        'require_gte!(1000u64, coin_creator_fee_basis_points','config.coin_creator_fee_basis_points = coin_creator_fee_basis_points;']
    body=src[src.index('pub fn update_fee_config'):src.index('pub fn update_fee_config')+2400]
    positions=[body.index(t)for t in statements];assert positions==sorted(positions)
    original=(old/'inputs/evidence/original/pump_amm/deployed.so').read_bytes();original_sha=H(original)
    evidence=J(old/'evidence.json');calls=[]
    for pc,target in evidence['original_setter_call_order']:
        op,regs,_,imm=struct.unpack_from('<BBhi',original,pc)
        assert (op,regs)==(0x85,0x10)and pc+8+imm*8==target;calls.append({'pc':pc,'signed_operand':imm,'target':target})
    assert [x['target']for x in calls]==[0x61630,0x61898,0x61d68,0x61b00]
    for row,store_offset in zip(evidence['scalar_setters'],[0x380,0x388,0x390]):
        start=row['body']['start'];assert row['body']['bytes']==616
        assert original[start+16:start+24]==bytes.fromhex('25070300e8030000')
        op,regs,offset,_=struct.unpack_from('<BBhi',original,start+24)
        assert (op,regs,offset)==(0x7b,0x72,store_offset)
        assert original[start+552:start+560]==bytes.fromhex('b7040000e8030000')
        assert original[start+560:start+568]==bytes.fromhex('bf75000000000000')
        assert start+568+8+struct.unpack_from('<i',original,start+572)[0]*8==0x1840
    static=J(s/'static-comparison.json')
    assert static['wrapper']['complete_normalized_equal']and not static['handler']['complete_normalized_equal']
    assert (static['wrapper']['candidate']['bytes'],static['handler']['candidate']['bytes'],static['handler']['original']['bytes'])==(2296,6096,2912)
    assert all(not r['candidate_matches']for r in static['original_scalar_complete_matches'])
    actual=static['actual_scalar_error_helper'];assert actual['candidate']['start']==0x340 and not actual['complete_normalized_equal']
    assert [r['offset']for r in actual['four_instruction_deltas']]==[24,32,40,48]
    assert len(actual['three_call_sites'])==3 and len(actual['direct_targets'])==8 and all(r['complete_normalized_equal']for r in actual['direct_targets'])
    assert len(static['generic_shared_helpers'])==5 and sum(len(r['direct_targets'])for r in static['generic_shared_helpers'])==94
    assert static['bounded_data']['instruction_log']['equal']
    inputs=J(s/'runtime-01/inputs-before.json');assert inputs==J(s/'runtime-01/inputs-after.json')
    permitted_program_hashes=set(inputs['runtime'].values())|{digest,original_sha}
    idl=J(old/'inputs/evidence/upstream/pump_amm.json');amm=idl['address'];create=bytes(next(i['discriminator']for i in idl['instructions']if i['name']=='create_pool'))
    run=J(s/'runtime-01/run.json');mapping=gz(s/'receipt-bindings.json.gz');mapping={r['suite']:r for r in mapping}
    total_tx=total_sigs=setup_tx=setup_sigs=comparisons=0;setup_rows=[]
    captured=J(s/'inputs/research/imported-lab/analysis/pump_fun/curve-migrate-v2-signed-surfpool.json')
    migration_raw=base64.b64decode(captured['missing_boost']['transaction_base64']);migration_seen=0
    for suite in run:
        name=suite['suite'];report=gz(s/('runtime-01/'+name+'.json.gz'));sidecar=gz(s/('runtime-01/'+name+'-transactions.json.gz'))
        assert not report['mismatches']and report['case_count']==len(report['cases'])
        assert all(c.get('match',True)and not c.get('diff',[])and not c.get('mismatched_fields',[])for c in report['cases'])
        remaining=[];setups=[];local_sigs=0
        for ordinal,row in enumerate(sidecar['transactions']):
            raw=base64.b64decode(row['transaction_base64']);tx=Transaction.from_bytes(raw);valid=tx.verify_with_results()
            assert valid and all(valid)and row['sequence']==ordinal and H(raw)==row['transaction_sha256'] and len(valid)==row['signature_count']
            assert row['amm_program_sha256']==row['loaded_programs'][amm]['sha256']in[digest,original_sha]
            for loaded in row['loaded_programs'].values():
                assert sidecar['program_file_sha256'][loaded['path']]==loaded and loaded['sha256']in permitted_program_hashes
            setup=name=='boost'and any(str(tx.message.account_keys[ix.program_id_index])==amm and bytes(ix.data)[:8]==create for ix in tx.message.instructions)
            if setup:
                assert row['amm_program_sha256']==original_sha;setups.append(ordinal);setup_sigs+=len(valid)
            else:remaining.append(row)
            if name=='migration_create':assert raw==migration_raw;migration_seen+=1
            local_sigs+=len(valid)
        assert len(setups)==(150 if name=='boost'else 0)and setups==mapping[name]['existing_fixture_setup_transaction_sequences']
        assert len(remaining)==2*report['case_count']
        for i,case in enumerate(report['cases']):
            left,right=remaining[2*i:2*i+2];bound=mapping[name]['case_transactions'][i]
            assert (left['amm_program_sha256'],right['amm_program_sha256'])==(original_sha,digest)
            assert bound=={'case_index':i,'original_transaction_sequence':left['sequence'],'candidate_transaction_sequence':right['sequence']}
            assert left['error']==case['original']['error']and right['error']==case['candidate']['error']
        assert local_sigs==sidecar['signature_count']==suite['signature_count']
        comparisons+=report['case_count'];total_sigs+=local_sigs;total_tx+=len(sidecar['transactions']);setup_tx+=len(setups)
        if setups:setup_rows.append({'suite':name,'setup_count':len(setups),'original_program_only':True})
    assert (comparisons,total_tx,total_sigs,setup_tx,migration_seen)==(17462,35074,35418,150,74)
    fee=gz(s/'runtime-01/fee_config.json.gz');oldfee=gz(old/'inputs/repro/pump_amm/pool-serialization-thirty-seven/fee_config-differential.json.gz')
    assert len(fee['cases'])==len(oldfee['cases'])==356
    strict=[];positions=collections.Counter();values=collections.Counter();old_missing=0
    for i,(new,prior)in enumerate(zip(fee['cases'],oldfee['cases'])):
        assert {k:v for k,v in new.items()if k not in ['original','candidate','match']}=={k:v for k,v in prior.items()if k not in ['original','candidate','match']}
        if 'Custom(6000)'not in str(new['original']['error']):continue
        payload=bytes.fromhex(new['payload_hex']);fees=[struct.unpack_from('<Q',payload,off)[0]for off in[0,8,272]]
        first=next(j for j,v in enumerate(fees)if v>1000);value=fees[first]
        expected=['Program log: Left: 1000','Program log: Right: '+str(value)]
        def logs(row):return [x for x in row['logs']if x.startswith(('Program log: Left: ','Program log: Right: '))]
        assert logs(new['original'])==logs(new['candidate'])==expected
        old_missing+=logs(prior['candidate'])!=expected;positions[first]+=1;values[value]+=1
        strict.append({'case_index':i,'fees_lp_protocol_creator':fees,'compared_value_logs':expected})
    assert strict==J(s/'scalar-diagnostics.json')and len(strict)==191
    return {'source_changed_paths':['programs/pump-amm/src/lib.rs'],'compiler_inputs':18,'candidate_sha256':digest,'main_scratch_whole_file_equal':True,
        'original_guard_store_call_order':calls,'existing_case_count':comparisons,'suite_count':len(run),'observed_transactions':total_tx,'verified_signatures':total_sigs,
        'comparison_transactions':total_tx-setup_tx,'setup_transactions':setup_tx,'setup_signatures':setup_sigs,'setup_groups':setup_rows,
        'unchanged_signed_historical_migration_observations':migration_seen,'historical_migration_raw_sha256':H(migration_raw),
        'stricter_existing_scalar_cases':len(strict),'first_invalid_argument_counts':dict(positions),'scalar_values_counts':dict(values),'prior_candidate_diagnostic_gaps':old_missing,
        'mixed_invalid_recipient_creator_runtime_claim':False,'handler_normalized_match':False,'specialized_helper_normalized_match':False,'standalone_setter_matches':0,
        'full_original_equality':False,'new_cases':0,'new_builds':0,'runtime_replays_by_review':0,'findings':[]}

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('package',type=Path);a=p.parse_args();print(json.dumps(check(a.package),indent=2,sort_keys=True))
