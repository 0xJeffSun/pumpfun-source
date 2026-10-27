#!/usr/bin/env python3
"""Recheck the published trade checkpoint and all retained signatures."""
import argparse
import base64
import gzip
import hashlib
import importlib.util
import json
from pathlib import Path
import sys

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]

def module(name,path):
    s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

route_verifier=module('route_checkpoint_verifier',HERE/'verify.py')
load,sha,validate=route_verifier.base.load,route_verifier.base.sha,route_verifier.verify

def main():
    p=argparse.ArgumentParser();p.add_argument('--current-source',action='store_true');a=p.parse_args()
    d=HERE/'results';mp=d/'manifest.json';assert sha(mp)=='b0f735943262e83a8fdb8d7ad6ad438d1b17590f0d3e3d448f70cccf60277d42'
    manifest=load(mp)['files'];assert {str(x.relative_to(d))for x in d.rglob('*')if x.is_file()}==set(manifest)|{'manifest.json'}
    for name,entry in manifest.items():
        stored=(d/name).read_bytes();raw=gzip.decompress(stored)if entry['compressed']else stored
        assert hashlib.sha256(stored).hexdigest()==entry['sha256'] and len(stored)==entry['bytes']
        assert hashlib.sha256(raw).hexdigest()==entry['raw_sha256'] and len(raw)==entry['raw_bytes']
    build=d/'build/build-comparison.json';record=load(build);candidate=d/'build/candidate.so';identity=sha(candidate)
    assert record['comparison']['candidate_sha256']==identity and record['returncode']==0 and record['source_unchanged']
    assert record['source_sha256']==record['source_after_sha256']
    assert record['unstripped_sha256']==sha(d/'build/unstripped.so') and record['build_log_sha256']==sha(d/'build/build.log')
    for name,value in record['source_sha256'].items():
        relative='programs/pump-amm/'+name.split('programs/pump-amm/',1)[1];assert sha(d/'source'/relative)==value
        if a.current_source:assert sha(ROOT/relative)==value
    from solders.transaction import Transaction
    cases=transactions=signatures=0
    for row in load(d/'runtime/progress.json'):
        suite=row['suite'];receipt=load(d/'runtime'/(suite+'.json'))
        assert row['returncode']==0 and receipt['mismatches']==[] and receipt['candidate_sha256']==identity
        assert receipt['case_count']==len(receipt['cases'])==row['case_count'];cases+=row['case_count']
        observed=load(d/'runtime'/(suite+'-transactions.json.gz'));assert observed['transaction_count']==row['transactions']==len(observed['transactions'])
        count=0
        for tx in observed['transactions']:
            raw=base64.b64decode(tx['transaction_base64'],validate=True);parsed=Transaction.from_bytes(raw)
            assert bytes(parsed)==raw and all(parsed.verify_with_results()) and len(parsed.signatures)==tx['signature_count']
            assert hashlib.sha256(raw).hexdigest()==tx['transaction_sha256'];count+=len(parsed.signatures)
        assert count==row['signatures'];signatures+=count;transactions+=len(observed['transactions'])
    assert (cases,transactions,signatures)==(17462,35074,35418)
    strict=validate(d/'strict',candidate,d/'source',build)
    legacy=module('saved_legacy_verify',ROOT/'repro/pump_amm/legacy-origin-recovery-20261026/verify.py');legacy.read=load
    legacy_result=legacy.verify(d/'runtime',candidate,d/'source',build)
    for name,package,file,receipt,source in [
        ('incentive','incentive-diagnostics-20261026','probe.py','prior-incentive.json','incentives.rs'),
        ('cto','cto-diagnostics-20261026','probe.py','prior-cto.json','creator_reassignment.rs'),
        ('liquidity','liquidity-numeric-diagnostics-20261026','probe.py','prior-liquidity.json','lib.rs')]:
        m=module('saved_'+name,ROOT/'repro/pump_amm'/package/file);m.validate(load(d/receipt),candidate,d/'source/programs/pump-amm/src'/source,build)
    sys.path.insert(0,str(ROOT/'repro/pump_amm/boost-burn-diagnostics'));import verify_boost
    def admission(repo,output,supplied):
        assert supplied==build.read_bytes() and hashlib.sha256(output).hexdigest()==identity;return record
    verify_boost.check_build=admission;verify_boost.validate(load(d/'prior-52.json'),ROOT,candidate.read_bytes(),build.read_bytes())
    print(json.dumps({'candidate_sha256':identity,'cases':cases,'transactions':transactions,'verified_signatures':signatures,'strict_trade':strict,'legacy_source_origins':legacy_result['new_source_origins'],'legacy_account_origins':legacy_result['account_name_origins'],'previous_focused_cases':285,'current_source_checked':a.current_source,'perfect':False}))

if __name__=='__main__':main()
