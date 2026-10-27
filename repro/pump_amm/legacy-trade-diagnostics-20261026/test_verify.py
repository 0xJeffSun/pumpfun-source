#!/usr/bin/env python3
"""Mutation checks on actual complete legacy-suite receipts."""
import argparse
import base64
import copy
import json
from pathlib import Path
import tempfile
import verify

def main():
    p=argparse.ArgumentParser(description=__doc__)
    for name in ('runtime','candidate','source','build-record'):p.add_argument('--'+name,type=Path,required=True)
    a=p.parse_args();positive=verify.verify(a.runtime,a.candidate,a.source,a.build_record)
    inputs={name:verify.read(a.runtime/(name+'.json')) for name in ('legacy_buy','legacy_sell')}
    mutations=[]
    def add(name,fn):mutations.append((name,fn))
    add('missing shared effect',lambda r:[r['legacy_buy']['cases'][0][side].pop('inner') for side in ('original','candidate')])
    add('missing shared account',lambda r:[r['legacy_buy']['cases'][0][side]['after'].pop(next(iter(r['legacy_buy']['cases'][0][side]['after']))) for side in ('original','candidate')])
    add('reported suite mismatch',lambda r:r['legacy_buy'].__setitem__('mismatches',[0]))
    add('missing case',lambda r:r['legacy_sell']['cases'].pop())
    def bad_numeric(r):
        logs=r['legacy_buy']['cases'][13]['candidate']['logs']
        i=next(i for i,x in enumerate(logs) if x.startswith('Program log: Left:'))
        logs[i]='Program log: Left: 987654321'
    add('changed numeric operand',bad_numeric)
    add('unrelated log on known residual',lambda r:r['legacy_buy']['cases'][9]['candidate']['logs'].append('Program log: not present in baseline'))
    def wrong_guard(r):
        early=r['legacy_buy']['cases'][364]['candidate']['logs'];late=r['legacy_buy']['cases'][365]['candidate']['logs']
        header=next(x for x in late if 'AnchorError thrown in' in x)
        index=next(i for i,x in enumerate(early) if 'AnchorError thrown in' in x)
        early[index]=header
    add('wrong exact-quote guard site',wrong_guard)
    def invalid_signature(r):
        data=bytearray(base64.b64decode(r['legacy_sell']['cases'][0]['original']['transaction_base64']));data[1]^=1
        for side in ('original','candidate'):r['legacy_sell']['cases'][0][side]['transaction_base64']=base64.b64encode(data).decode()
    add('shared invalid raw transaction',invalid_signature)
    passed=[]
    for name,mutate in mutations:
        reports=copy.deepcopy(inputs);mutate(reports)
        with tempfile.TemporaryDirectory(prefix='legacy-receipt-mutation-') as directory:
            path=Path(directory)
            for suite,report in reports.items():(path/(suite+'.json')).write_text(json.dumps(report,separators=(',',':')))
            try:verify.verify(path,a.candidate,a.source,a.build_record)
            except (ValueError,KeyError,TypeError,AssertionError):passed.append(name);continue
            raise AssertionError('accepted mutation: '+name)
    print(json.dumps({'candidate_sha256':positive['candidate_sha256'],'positive_compared_value_targets':positive['compared_value_targets_corrected'],'rejected_mutations':len(passed)}))
if __name__=='__main__':main()
