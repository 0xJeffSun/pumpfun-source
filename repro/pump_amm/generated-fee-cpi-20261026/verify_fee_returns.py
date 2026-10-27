#!/usr/bin/env python3
"""Verify signed synthetic-CPI evidence and all fee return-data boundaries."""
import base64,gzip,hashlib,json,re
from pathlib import Path
from solders.transaction import Transaction
LENGTHS=[None,0,1,7,8,15,16,17,23,24,25,31,32]
SUITES=['buy','buy_exact_quote_in','sell','curve_buy','curve_sell']
ORIGINAL='6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7'
def load(p):
    if not p.exists() and p.suffix=='.json':p=p.with_suffix('.json.gz')
    data=p.read_bytes();return json.loads(gzip.decompress(data)if p.suffix=='.gz'else data)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def without_logs(v):return {k:x for k,x in v.items()if k!='logs'}
def verify(d,candidate,build,source):
    r=load(d/'cpi/observations.json');b=load(build);oracle=d/'cpi/oracle';ob=load(oracle/'build-comparison.json')
    assert r['probe_sha256']==sha(d/'cpi/probe.py')
    assert r['genuine_original_sha256']==ORIGINAL and r['genuine_candidate_sha256']==sha(candidate)
    assert r['candidate_build_record_sha256']==sha(build) and b['comparison']['candidate_sha256']==sha(candidate)
    assert r['synthetic_oracle_sha256']==sha(oracle/'synthetic-oracle.so')==ob['comparison']['candidate_sha256']
    assert r['oracle_build_record_sha256']==sha(oracle/'build-comparison.json') and ob['returncode']==0 and ob['source_unchanged']
    assert ob['source_sha256']==ob['source_after_sha256']
    for name,value in ob['source_sha256'].items():
        rel='programs/pump-amm/'+name.split('programs/pump-amm/',1)[1];assert '..'not in Path(rel).parts and sha(oracle/'source'/rel)==value
    assert r['case_count']==65 and r['signed_executions']==130
    assert [(c['suite'],c['length'])for c in r['cases']]==[(s,n)for s in SUITES for n in LENGTHS]
    lib=(source/'programs/pump-amm/src/lib.rs').read_text().splitlines()
    macro=lib.index('anchor_lang::declare_program!(pump_fees);')+1
    require_lines={}
    for file in ['legacy_buy.rs','legacy_sell.rs']:
        lines=(source/'programs/pump-amm/src'/file).read_text().splitlines();end=next(i for i,l in enumerate(lines)if 'PumpAmmError::BuybackFeeRecipientNotAuthorized' in l)
        start=max(i for i in range(end+1)if 'require!(' in lines[i]);assert end-start<=5;require_lines[file]=start+1
    def logs(values,file):
        out=[]
        for line in values:
            if re.fullmatch(r'Program \w+ consumed \d+ of \d+ compute units',line):continue
            line=line.replace('panicked at programs/pump-amm/src/lib.rs:23:1:', 'panicked at <fee-return>:').replace(f'panicked at src/lib.rs:{macro}:1:','panicked at <fee-return>:')
            line=line.replace('AnchorError thrown in programs/pump-amm/src/state/global_config.rs:326.','AnchorError thrown in <fee-authorization>.').replace(f'AnchorError thrown in src/{file}:{require_lines[file]}.','AnchorError thrown in <fee-authorization>.')
            out.append(line)
        return out
    fee_count=malformed=0
    for c in r['cases']:
        x,y=c['original'],c['candidate'];assert x['before']==y['before'] and x['transaction_base64']==y['transaction_base64']
        raw=base64.b64decode(x['transaction_base64'],validate=True);tx=Transaction.from_bytes(raw);assert bytes(tx)==raw and all(tx.verify_with_results())
        for side in [x,y]:
            assert side['signature_verification']==tx.verify_with_results()
            actual=[s for s in side['logs']if 'SYNTHETIC_RETURN_ORACLE' in s];assert len(actual)==1 and actual[0]==side['oracle_log']
            assert any(a and bytes.fromhex(a['data_hex']).endswith(bytes.fromhex(c['control_hex']))for a in side['before'].values())
        if c['suite'].startswith('curve_'):continue
        assert without_logs(x)==without_logs(y)
        file='legacy_sell.rs'if c['suite']=='sell'else'legacy_buy.rs'
        assert logs(x['logs'],file)==logs(y['logs'],file),(c['suite'],c['length'])
        if c['length']!=24:
            malformed+=1;assert any('panicked at <fee-return>:'in l for l in logs(x['logs'],file))
        fee_count+=1
    assert(fee_count,malformed)==(39,36)
    return {'fee_cases':39,'malformed_fee_cases':36,'all_observed_signed_executions':130,'scope':'Full fee-case outputs match except compute and exact declared panic/authorization coordinates. Curve cases are provenance-checked observations only.'}
