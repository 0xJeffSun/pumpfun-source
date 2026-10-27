#!/usr/bin/env python3
"""Mutation tests on a real corrected CTO receipt; no manufactured acceptance."""
import argparse
import base64
import copy
import json
from pathlib import Path
import probe

def main():
    p=argparse.ArgumentParser(description=__doc__)
    for name in ('report','candidate','source','build-record'):p.add_argument('--'+name,type=Path,required=True)
    a=p.parse_args();actual=json.loads(a.report.read_bytes())
    check=lambda r:probe.validate(r,a.candidate,a.source,a.build_record)
    positive=check(actual);mutations=[]
    def add(name,func):mutations.append((name,func))
    add('omit shared after states',lambda r:[r['cases'][0][side].pop('after') for side in ('original','prior','candidate')])
    add('omit candidate CPI effects',lambda r:r['cases'][0]['candidate'].pop('inner'))
    add('omit provenance',lambda r:r.pop('build_record'))
    add('failed compiler',lambda r:r['build_record']['record'].__setitem__('returncode',1))
    add('case missing',lambda r:r['cases'].pop())
    add('changed case mapping',lambda r:r['cases'][0].__setitem__('saved_index',1))
    add('changed shared fixture',lambda r:[r['cases'][0][side]['before'].pop('pool') for side in ('original','prior','candidate')])
    add('fake top-level PDA signer',lambda r:r['cases'][0]['candidate'].__setitem__('pool_authority_top_level_signer',True))
    add('returned numeric decoration',lambda r:r['cases'][9]['candidate']['logs'].append('Program log: Left: 1'))
    add('missing prior logs',lambda r:r['cases'][6]['prior'].__setitem__('logs',[]))
    add('wrong error',lambda r:r['cases'][6]['candidate'].__setitem__('error',None))
    def invalid_signature(r):
        raw=bytearray(base64.b64decode(r['cases'][0]['candidate']['transaction_base64']));raw[1]^=1
        r['cases'][0]['candidate']['transaction_base64']=base64.b64encode(raw).decode()
    add('invalid signature',invalid_signature)
    for name,func in mutations:
        row=copy.deepcopy(actual);func(row)
        try:check(row)
        except (ValueError,KeyError,TypeError,AssertionError):continue
        raise AssertionError('accepted malformed receipt: '+name)
    print(json.dumps({'positive':positive,'rejected_mutations':len(mutations)}))

if __name__=='__main__':main()
