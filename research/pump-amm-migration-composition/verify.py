"""Verify artifact separation, signatures, captured Pump loader images and all outcomes."""
from pathlib import Path,PurePosixPath
import argparse,base64,gzip,hashlib,importlib.util,json,re,sys
if not __debug__:raise RuntimeError('Assertions required; Python -O is unsupported')
sys.dont_write_bytecode=True
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[1]
P='6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P'
A='pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA'
SYSTEM='11111111111111111111111111111111';CU='ComputeBudget111111111111111111111111111111'
PUMP='repro/pump/main-contract-round34-20261027/candidate.so'
AMM='repro/pump_amm/quote-guard-recovery-20261027/results/build/candidate.so'
PUMP_SHA='908bd16ef0ccdb04e857e86c2de31f36b24a9c6ae77154f7407173823a1d8113'
AMM_SHA='be10ca1a530ef9c62be5c94a5183f339e5d7661dce588a9458767e20a5e488f6'
BINS={P:('evidence/original/pump/deployed.so','7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'),
 A:('evidence/original/pump_amm/deployed.so','6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7'),
 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA':('evidence/dependencies/spl_token/deployed.so','8190d3f7ceb6cb7a7a8d8924bff89f9f611e15ce1f806f2b6237f3311a98f697'),
 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb':('evidence/dependencies/spl_token_2022/deployed.so','15a2e615a42e20f31714bbaaee43002ae6f1cda2e8d7118243117ab3c1342e2d'),
 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL':('evidence/dependencies/associated_token/deployed.so','6804554e69fd3a58caa191dc4a58f4c67223d30ca28ab8987f39fc18d2f7374d')}
from solders.transaction import Transaction

def digest(b):return hashlib.sha256(b).hexdigest()
def sha(p):return digest(p.read_bytes())
def load(p):
    b=p.read_bytes();return json.loads(gzip.decompress(b) if p.suffix=='.gz' else b)
def module(name,path):
    spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m

def check_report(packet,reports=None):
    probe=module('composition_roster',packet/'probe.py')
    clean=module('composition_clean',packet/'composition_compare.py').clean
    r=load((Path(reports) if reports else packet/'results')/'report.json.gz')
    roster=probe.cases();assert len(roster)==len(r['rows'])==65
    assert r['probe_sha256']==sha(packet/'probe.py') and r['solders']=='0.27.1'
    assert r['runtime_reads_before']==r['runtime_reads_after']==load(packet/'runtime-inputs.json')
    fixtures={'pump_captured_loader':'8d51ba5feab9e74f67fb80f5827222308d45a36022151bc77ad076c401f65067',
        'pump_migrate_probe':'567f1426342972e9227ba0a68bc1340a8b603c3de93fc2abed81042a7936f11c',
        'pump_migrate_v2_probe':'942674bb84109d6acff62fc98a003d65c266a6d6f09ebb791822cf769d64bad1'}
    assert r['fixture_sources']=={name:{'physical_source':'repro/pump/main-contract-round34-20261027/inputs/scripts/'+name+'.py',
        'logical_file':'scripts/'+name+'.py','sha256':h} for name,h in fixtures.items()}
    for rel,h in r['runtime_reads_before'].items():assert sha(ROOT/rel)==h,('runtime input',rel)
    for record in r['fixture_sources'].values():assert r['runtime_reads_before'][record['physical_source']]==record['sha256']
    capture=load(ROOT/'evidence/original/pump/capture.json')
    idl=load(ROOT/'evidence/upstream/pump.json')
    pd_capture=(ROOT/'evidence/original/pump/programdata-account.bin').read_bytes()
    program=(ROOT/'evidence/original/pump/program-account.bin').read_bytes()
    assert digest(pd_capture)==capture['programdata_sha256']
    assert digest(pd_capture[45:])==capture['payload_sha256']
    expected_loader={}
    for changed,path in [(False,ROOT/BINS[P][0]),(True,ROOT/PUMP)]:
        raw=path.read_bytes();assert len(raw)<=capture['payload_bytes']
        image=pd_capture[:45]+raw+bytes(capture['payload_bytes']-len(raw))
        expected_loader[changed]={'elf_sha256':digest(raw),'elf_bytes':len(raw),
            'programdata_sha256':digest(image),'programdata_bytes':len(image)}
    signatures=success=amm_calls=0;unique=set();outcomes={mode:[] for mode in probe.MODES}
    fields={'case','signature_verification','transaction_base64','error','logs','inner','return','before','after','names','account_keys'}
    for i,row in enumerate(r['rows']):
        case=roster[i];assert row['case']==case and set(row['runs'])==set(probe.MODES)
        reference=row['runs']['original']['result'];ref=clean(reference)
        assert set(reference)==fields
        identity=digest(json.dumps([reference['transaction_base64'],reference['before']],sort_keys=True).encode())
        assert identity not in unique;unique.add(identity)
        success+=reference['error'] is None
        amm_calls+=sum(bool(re.fullmatch('Program '+A+r' invoke \[\d+\]',x)) for x in reference['logs'])
        observed_ref=row['runs']['original']['observation']
        for mode,(pump,amm) in probe.MODES.items():
            run=row['runs'][mode];q=run['result'];o=run['observation']
            assert set(q)==fields and q['case']==case['input']
            raw=base64.b64decode(q['transaction_base64'],validate=True);tx=Transaction.from_bytes(raw)
            checks=tx.verify_with_results();assert len(checks)==2 and all(checks)
            assert q['signature_verification'] is True and o['verified_signatures']==2
            signatures+=2
            assert digest(raw)==o['transaction_sha256'] and o['transaction_base64']==q['transaction_base64']
            assert q['transaction_base64']==reference['transaction_base64'] and q['before']==reference['before']
            assert len(tx.message.instructions)==2
            assert str(tx.message.account_keys[tx.message.instructions[0].program_id_index])==CU
            assert bytes(tx.message.instructions[0].data)==bytes.fromhex('02c05c1500')
            assert str(tx.message.account_keys[tx.message.instructions[1].program_id_index])==P
            instruction=tx.message.instructions[1]
            expected=next(x for x in idl['instructions'] if x['name']==('migrate' if case['route']=='legacy' else 'migrate_v2'))
            assert bytes(instruction.data)==bytes(expected['discriminator'])
            accounts=[str(tx.message.account_keys[index]) for index in instruction.accounts]
            named=[q['names'][x['name']] for x in expected['accounts']]
            if case['input']['boost']:
                named += [q['names']['boost_authority'],q['names']['boost_vault']][:case['input'].get('remaining_count',2)]
            assert accounts==named,('instruction account order',i,mode)
            if case['input'].get('readonly_boost'):
                index=q['account_keys'].index(q['names']['boost_vault']);header=tx.message.header
                writable=(index<header.num_required_signatures-header.num_readonly_signed_accounts if index<header.num_required_signatures
                    else index<len(q['account_keys'])-header.num_readonly_unsigned_accounts)
                assert not writable
            assert list(map(str,tx.message.account_keys))==q['account_keys']
            assert o['error']==q['error']
            assert o['logs_sha256']==digest(json.dumps(q['logs'],separators=(',',':')).encode())
            assert set(o['programs'])==set(BINS)
            for pid,(path,h) in BINS.items():
                if pid==P and pump:path,h=PUMP,PUMP_SHA
                if pid==A and amm:path,h=AMM,AMM_SHA
                assert o['programs'][pid]=={'path':path,'sha256':h},('loaded artifact',mode,pid)
            keys=set(q['account_keys']);assert set(o['before'])==set(o['after'])
            assert not set(o['before'])-keys and keys-set(o['before'])<=set(BINS)|{SYSTEM,CU}
            for state in ['before','after']:
                for key,account in o[state].items():
                    assert account is None or set(account)=={'lamports','owner','data'}
                    if key in q[state]:assert account==q[state][key],('independent state snapshot',mode,state,key)
                assert o[state]==observed_ref[state],('composed account state',mode,state)
            user=q['names']['user'];assert user==str(tx.message.account_keys[1])
            for name,mutation in case['input'].get('mutations',{}).items():
                account=q['before'][q['names'][name]]
                if 'lamports' in mutation:assert (account['lamports'] if account else 0)==mutation['lamports']
                for offset,data in mutation.get('patches',[]):assert bytes.fromhex(account['data'])[offset:offset+len(bytes.fromhex(data))]==bytes.fromhex(data)
            if q['error']:
                for name in ['bonding_curve','pool']:
                    key=q['names'][name];assert q['before'][key]==q['after'][key],('failed migration rollback',mode,name)
            receipt=run['pump_loader'];assert len(receipt)==(2 if pump else 1)
            for j,entry in enumerate(receipt):
                wanted=expected_loader[pump and j==len(receipt)-1]
                for key,value in wanted.items():assert entry[key]==value,('captured loader',key)
                assert entry['program_sha256']==digest(program) and entry['program_bytes']==len(program)==36
                assert entry['program_owner']==capture['owner'] and entry['header_sha256']==digest(pd_capture[:45])
                assert entry['elf_prefix_unchanged'] is True and entry['zero_allocation_tail'] is True
            assert o['pump_programdata_sha256']==expected_loader[pump]['programdata_sha256']
            qq=clean(q);diff=sorted(k for k in ref if ref[k]!=qq[k])
            if mode!='original':assert row['differences'][mode]==diff==[],('behavior',i,mode,diff)
            outcomes[mode].append(q['error'])
        assert set(row['differences'])=={'pump_only','amm_only','both'}
    assert signatures==520 and len(unique)==65
    assert all(v==outcomes['original'] for v in outcomes.values())
    return {'cases':65,'executions':260,'verified_signatures':signatures,
        'original_successes':success,'original_amm_invocations':amm_calls,
        'compared_to_original':195,'mismatches':0,'distinct_message_state_pairs':len(unique)}

def verify(packet=HERE,reports=None):
    packet=Path(packet).resolve();manifest=load(packet/'manifest.json');paths=list(packet.rglob('*'))
    assert not any(p.is_symlink() for p in paths) and all(p.is_file() or p.is_dir() for p in paths)
    assert {p.relative_to(packet).as_posix() for p in paths if p.is_file()}==set(manifest)|{'manifest.json'}
    for rel,h in manifest.items():
        p=PurePosixPath(rel);assert not p.is_absolute() and '..' not in p.parts and str(p)==rel
        assert sha(packet/rel)==h,('packet hash',rel)
    for rel,h in load(packet/'repository-references.json').items():assert sha(ROOT/rel)==h,('reference hash',rel)
    for path,h in list(BINS.values())+[(PUMP,PUMP_SHA),(AMM,AMM_SHA)]:assert sha(ROOT/path)==h
    result=check_report(packet,reports);assert result==load(packet/'summary.json')
    return {'verified':True,'summary':result,'fresh_compilation':False,'new_source_recovery':False}

if __name__=='__main__':
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--packet',type=Path,default=HERE);p.add_argument('--reports',type=Path)
    a=p.parse_args();print(json.dumps(verify(a.packet,a.reports),indent=2))
