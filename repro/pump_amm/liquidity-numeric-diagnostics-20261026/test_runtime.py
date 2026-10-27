#!/usr/bin/env python3
"""Mutation tests require an actual corrected receipt; no synthetic acceptance."""
import argparse
import base64
import copy
import json
from pathlib import Path
import probe

def main():
    p=argparse.ArgumentParser(description=__doc__)
    for name in ('report','candidate','source','build-record'):
        p.add_argument('--'+name,type=Path,required=True)
    a=p.parse_args();actual=json.loads(a.report.read_text())
    check=lambda row:probe.validate(row,a.candidate,a.source,a.build_record)
    positive=check(actual)
    mutations=[]
    def add(name,fn):mutations.append((name,fn))
    add('missing build provenance',lambda r:r.pop('build_record'))
    add('failed build',lambda r:r['build_record']['record'].__setitem__('returncode',1))
    add('changed compiled source',lambda r:r['build_record']['record']['source_sha256'].__setitem__(next(iter(r['build_record']['record']['source_sha256'])),'0'*64))
    add('missing case',lambda r:r['cases'].pop())
    add('missing original result',lambda r:r['cases'][0]['original'].pop('result'))
    add('missing shared effect',lambda r:[r['cases'][0][s]['result'].pop('inner_instructions') for s in ('original','candidate')])
    add('missing shared account',lambda r:[r['cases'][0][s]['result']['accounts'].pop(str(probe.pool.pool)) for s in ('original','candidate')])
    add('wrong source site',lambda r:r['source_lines'].__setitem__('deposit-base',1))
    add('changed fixture supply',lambda r:[r['cases'][0][s]['before'][str(probe.pool.lp)].__setitem__('data','00') for s in ('original','candidate')])
    add('missing numeric output',lambda r:r['cases'][0]['candidate']['result'].__setitem__('logs',[s for s in r['cases'][0]['candidate']['result']['logs'] if not s.startswith(('Program log: Left:','Program log: Right:'))]))
    def bad_signature(r):
        raw=bytearray(base64.b64decode(r['cases'][0]['original']['transaction']));raw[1]^=1
        for side in ('original','candidate'):r['cases'][0][side]['transaction']=base64.b64encode(raw).decode()
    add('invalid shared signature',bad_signature)
    for name,mutate in mutations:
        row=copy.deepcopy(actual);mutate(row)
        try:check(row)
        except (ValueError,KeyError,TypeError,AssertionError):continue
        raise AssertionError('accepted mutation: '+name)
    print(json.dumps({'positive':positive,'rejected_mutations':len(mutations)}))

if __name__=='__main__':main()
