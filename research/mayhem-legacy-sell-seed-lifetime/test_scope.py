"""Mutate real operands, typed data and signed receipts; execute no target code."""
import base64
import copy
import json
from pathlib import Path
import struct
import sys
import tempfile

if not __debug__:raise RuntimeError('verification requires assertions')
sys.dont_write_bytecode=True
from verify import P,raw,load,receipts
from analysis import inspect


def rejected(name,call):
    try:call()
    except (AssertionError,KeyError,ValueError,struct.error):return name
    raise AssertionError('accepted corruption: '+name)


def main():
    names=[];proof=load(P/'analysis.json');r=proof['reports'][2];data=raw(P/'builds/recovered/symbols.so.gz')
    with tempfile.TemporaryDirectory() as td:
        td=Path(td);control=td/'control.so';path=td/'candidate.so'
        control.write_bytes(raw(P/'builds/control/symbols.so.gz'))
        start=r['start']+r['seed_block_offset']
        mutations=[('seed constructor register',start+1,bytes([data[start+1]^1])),
                   ('seed literal',r['literal_address'],b'X'),
                   ('bump byte-load width',r['bump_load_pc'],b'\x69'),
                   ('bump field offset',r['bump_load_pc']+2,struct.pack('<h',0x23)),
                   ('seed length',start+152+4,struct.pack('<i',8)),
                   ('masked copy callee',r['copy_call_pc']+4,struct.pack('<i',0)),
                   ('caller redirects inside handler',r['wrapper_call_pc']+4,struct.pack('<i',(r['start']+8-r['wrapper_call_pc']-8)//8)),
                   ('reference-count increment',r['start']+r['increment_offsets'][0]+4,struct.pack('<i',2)),
                   ('retained Source line',r['sources'][0]['address']+16,struct.pack('<I',999))]
        for name,offset,value in mutations:
            altered=bytearray(data);altered[offset:offset+len(value)]=value;path.write_bytes(altered)
            names.append(rejected(name,lambda:inspect(control,path)))
    report=load(P/'runtime/candidate/sell.json.xz');binary=raw(P/'builds/recovered/candidate.so.gz')
    for name,mutate in (
        ('missing case',lambda d:d['cases'].pop()),
        ('changed case input',lambda d:d['cases'][0]['case'].update(reference=123)),
        ('extra non-compute log',lambda d:d['cases'][0]['candidate']['metadata']['logs'].append('unexpected diagnostic')),
        ('changed return data',lambda d:d['cases'][0]['candidate']['metadata'].update(return_data={'unexpected':True})),
        ('executed program hash',lambda d:d['cases'][0]['candidate']['before']['MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'].update(data_sha256='0'*64))):
        d=copy.deepcopy(report);mutate(d);names.append(rejected(name,lambda:receipts(d,binary)))
    d=copy.deepcopy(report);tx=bytearray(base64.b64decode(d['cases'][0]['candidate']['transaction_base64']));tx[1]^=1
    # Apply to both sides to exercise cryptographic verification, not just pair equality.
    for side in ('original','candidate'):d['cases'][0][side]['transaction_base64']=base64.b64encode(tx).decode()
    names.append(rejected('invalid signature',lambda:receipts(d,binary)))
    assert len(names)==15
    print(json.dumps(dict(rejected_corruptions=len(names),checks=names),indent=2))

if __name__=='__main__':main()
