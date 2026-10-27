#!/usr/bin/env python3
"""Verify the complete retained checkpoint, without executing SBF."""
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
MANIFEST_SHA='7a2416681e551bf4680171d36ac1f68fff0403379519eb4c3907a294a43e9585'


def raw(path):
    data=path.read_bytes()
    return gzip.decompress(data) if path.suffix=='.gz' else data


def load(path):return json.loads(raw(path))
def sha(data):return hashlib.sha256(data).hexdigest()


def module(name,path):
    spec=importlib.util.spec_from_file_location(name,path);result=importlib.util.module_from_spec(spec);spec.loader.exec_module(result);return result


def main():
    p=argparse.ArgumentParser();p.add_argument('--current-source',action='store_true');args=p.parse_args()
    out=HERE/'results';manifest=load(out/'manifest.json')['files']
    assert sha((out/'manifest.json').read_bytes())==MANIFEST_SHA
    assert {str(p.relative_to(out)) for p in out.rglob('*') if p.is_file()}==set(manifest)|{'manifest.json'}
    for name,entry in manifest.items():
        data=(out/name).read_bytes();assert sha(data)==entry['sha256'] and len(data)==entry['bytes'],name
        logical=gzip.decompress(data) if entry['compressed'] else data
        assert sha(logical)==entry['raw_sha256'] and len(logical)==entry['raw_bytes'],name
    build=out/'build/build-comparison.json';record=load(build);candidate=out/'build/candidate.so';digest=sha(candidate.read_bytes())
    assert record['comparison']['candidate_sha256']==digest and record['returncode']==0 and record['source_unchanged']
    assert record['source_sha256']==record['source_after_sha256'] and len(record['source_sha256'])==30
    for name,value in record['source_sha256'].items():
        relative='programs/pump-amm/'+name.split('programs/pump-amm/',1)[1]
        assert sha((out/'source'/relative).read_bytes())==value
        if args.current_source:assert sha((ROOT/relative).read_bytes())==value
    assert sha((out/'build/unstripped.so').read_bytes())==record['unstripped_sha256']
    assert sha((out/'build/build.log').read_bytes())==record['build_log_sha256']
    from solders.transaction import Transaction
    cases=transactions=signatures=0
    for row in load(out/'runtime/progress.json'):
        path=out/'runtime'/(row['suite']+'.json')
        if not path.exists():path=path.with_suffix('.json.gz')
        receipt=load(path)
        assert sha(raw(path))==row['receipt_sha256'] and row['returncode']==0
        assert receipt['case_count']==row['case_count']==len(receipt['cases']) and not receipt['mismatches']
        assert receipt['candidate_sha256']==digest
        sidecar=out/'runtime'/(row['suite']+'-transactions.json.gz')
        assert sha(sidecar.read_bytes())==row['sidecar_sha256']
        data=load(sidecar);subtotal=0
        assert len(data['transactions'])==data['transaction_count']==row['transactions']
        for observation in data['transactions']:
            encoded=base64.b64decode(observation['transaction_base64'],validate=True);tx=Transaction.from_bytes(encoded)
            assert bytes(tx)==encoded and sha(encoded)==observation['transaction_sha256'] and all(tx.verify_with_results())
            assert len(tx.signatures)==observation['signature_count'];subtotal+=len(tx.signatures)
            assert observation['amm_program_sha256'] in (digest,receipt['original_sha256'])
        assert subtotal==row['signatures']==data['signature_count']
        cases+=receipt['case_count'];transactions+=row['transactions'];signatures+=subtotal
    assert (cases,transactions,signatures)==(17462,35074,35418)
    sys.path.insert(0,str(HERE))
    import probe
    incentive=probe.validate(load(out/'focused/focused-v2.json.gz'),candidate,out/'source/programs/pump-amm/src/incentives.rs',build)
    cto=module('saved_cto',ROOT/'repro/pump_amm/cto-diagnostics-20261026/probe.py')
    cto_result=cto.validate(load(out/'focused/cto-focused-v3.json.gz'),candidate,out/'source/programs/pump-amm/src/creator_reassignment.rs',build)
    liquidity=module('saved_liquidity',ROOT/'repro/pump_amm/liquidity-numeric-diagnostics-20261026/probe.py')
    liquidity_result=liquidity.validate(load(out/'focused/liquidity-focused-v2.json.gz'),candidate,out/'source/programs/pump-amm/src/lib.rs',build)
    sys.path.insert(0,str(ROOT/'repro/pump_amm/boost-burn-diagnostics'))
    import verify_boost
    def admission(repo,output,record_raw):
        assert record_raw==build.read_bytes() and sha(output)==digest
        return record
    verify_boost.check_build=admission
    prior=verify_boost.validate(load(out/'focused/previous-focused-v2.json.gz'),ROOT,candidate.read_bytes(),build.read_bytes())
    print(json.dumps({'candidate_sha256':digest,'source_files':30,'cases':cases,'transactions':transactions,
        'independently_verified_signature_fields':signatures,'incentive':incentive,'cto':cto_result,'liquidity':liquidity_result,
        'prior_cases':prior['boost_cases']+prior['prior_focused_cases'],'current_source_checked':args.current_source,'complete_elf_identity':False}))


if __name__=='__main__':main()
