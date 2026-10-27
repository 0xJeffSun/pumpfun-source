#!/usr/bin/env python3
"""Mutate real legacy receipts to check exact source and account-origin binding."""
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
    reports={suite:verify.read(a.runtime/(suite+'.json')) for suite in ('legacy_buy','legacy_sell')}
    mutations=[]
    def add(name,func):mutations.append((name,func))
    add('missing shared effects',lambda r:[r['legacy_buy']['cases'][9][side].pop('inner') for side in ('original','candidate')])
    add('shared missing state',lambda r:[r['legacy_buy']['cases'][9][side]['before'].clear() for side in ('original','candidate')])
    add('source-less regression',lambda r:r['legacy_buy']['cases'][9]['candidate'].__setitem__('logs',[s.replace('AnchorError thrown in src/legacy_buy.rs:182.','AnchorError occurred.') for s in r['legacy_buy']['cases'][9]['candidate']['logs']]))
    def swap_lookups(r):
        target=r['legacy_buy']['cases'][342]['candidate']['logs'];other=r['legacy_buy']['cases'][343]['candidate']['logs']
        error=next(s for s in other if 'AnchorError' in s)
        index=next(i for i,s in enumerate(target) if 'AnchorError' in s);target[index]=error
    add('swapped same-code buyback source',swap_lookups)
    def wrong_owner(r):
        logs=r['legacy_sell']['cases'][264]['candidate']['logs']
        index=next(i for i,s in enumerate(logs) if 'AnchorError caused by account:' in s)
        logs[index]=logs[index].replace('caused by account: '+verify.ORIGINAL,'caused by account: wrong-owner') if verify.ORIGINAL in logs[index] else logs[index].replace('caused by account: ','caused by account: wrong-')
    add('wrong actual owner name',wrong_owner)
    add('unexpected success log',lambda r:r['legacy_buy']['cases'][8]['candidate']['logs'].append('Program log: unexplained new effect'))
    add('changed case identity',lambda r:r['legacy_sell']['cases'][0].__setitem__('case','other-case'))
    add('missing case',lambda r:r['legacy_sell']['cases'].pop())
    def bad_transaction(r):
        raw=bytearray(base64.b64decode(r['legacy_buy']['cases'][9]['original']['transaction_base64']));raw[1]^=1
        for side in ('original','candidate'):r['legacy_buy']['cases'][9][side]['transaction_base64']=base64.b64encode(raw).decode()
    add('shared invalid signed input',bad_transaction)
    passed=[]
    for name,mutate in mutations:
        rows=copy.deepcopy(reports);mutate(rows)
        with tempfile.TemporaryDirectory(prefix='legacy-origin-mutation-') as directory:
            root=Path(directory)
            for suite,report in rows.items():(root/(suite+'.json')).write_text(json.dumps(report,separators=(',',':')))
            try:verify.verify(root,a.candidate,a.source,a.build_record)
            except (ValueError,KeyError,TypeError,AssertionError):passed.append(name);continue
            raise AssertionError('accepted mutation: '+name)
    print(json.dumps({'positive':positive,'rejected_mutations':len(passed)}))
if __name__=='__main__':main()
