"""Actual instruction/data and receipt corruption tests; no VM or compiler execution."""
import copy
import gzip
import json
from pathlib import Path
import struct
import sys
import tempfile

if not __debug__:
    raise RuntimeError('verification requires assertions')
sys.dont_write_bytecode=True
from static import inspect
from runtime_check import attest, check, PROGRAM
from verify import load, raw, sha

P=Path(__file__).resolve().parent


def rejected(name, call):
    try:
        call()
    except (AssertionError, KeyError, ValueError, struct.error):
        return name
    raise AssertionError('accepted corruption: '+name)


def main():
    rejected_names=[]
    data=raw(P/'artifacts/recovered/symbols.so.gz')
    proof=load(P/'static.json')
    with tempfile.TemporaryDirectory() as td:
        path=Path(td)/'symbols.so'
        for row in proof:
            other=next(r for r in proof if r['role']!=row['role'])
            # Redirect a normalized matching entry wrapper to the other sweep handler.
            pc=row['handler_call_pc']
            altered=bytearray(data)
            struct.pack_into('<i',altered,pc+4,(other['candidate_start']-pc-8)//8)
            path.write_bytes(altered)
            rejected_names.append(rejected(row['role']+' live handler redirect',lambda:inspect(path)))
            panic=row['candidate_panic'];origin=row['candidate_error']
            for name,offset,value in (
                    ('panic line',panic['source_address']+16,panic['line']+1),
                    ('Anchor error line',origin['line_store_pc']+4,999),
                    ('panic callee',panic['source_pc']+20,0)):
                altered=bytearray(data);struct.pack_into('<I',altered,offset,value);path.write_bytes(altered)
                rejected_names.append(rejected(row['role']+' '+name,lambda:inspect(path)))
            for name,offset in (('underflow opcode',panic['guard_pc']),('panic message',panic['message_address'])):
                altered=bytearray(data);altered[offset]^=1;path.write_bytes(altered)
                rejected_names.append(rejected(row['role']+' '+name,lambda:inspect(path)))
    report=load(P/'runtime/rates.json.gz');binaries=report['binaries'];runner=sha((P/'replay_sweeps.py').read_bytes())
    for name,change in (
            ('missing rate case',lambda d:d['cases'].pop()),
            ('extra diagnostic',lambda d:d['cases'][0]['results']['candidate']['logs'].append('unexpected diagnostic')),
            ('return data',lambda d:d['cases'][0]['results']['candidate']['return_data'].update(data=[42])),
            ('rate input label',lambda d:d['cases'][0]['case'].update(last=123))):
        d=copy.deepcopy(report);change(d)
        rejected_names.append(rejected(name,lambda:check(d,'rates',binaries,runner)))
    case=report['cases'][0]['case'];original=report['cases'][0]['receipts']['candidate']
    for name in ('signature','program hash','global input','rate input'):
        receipt=copy.deepcopy(original)
        if name=='signature':
            tx=bytearray.fromhex(receipt['transaction_hex']);tx[1]^=1;receipt['transaction_hex']=tx.hex()
        elif name=='program hash':receipt['before'][PROGRAM]['data_sha256']='0'*64
        else:
            from solders.transaction import Transaction
            tx=Transaction.from_bytes(bytes.fromhex(receipt['transaction_hex']));ix=tx.message.instructions[0]
            k=str(tx.message.account_keys[ix.accounts[1 if name=='global input' else 9]])
            receipt['before'][k]['data'][166 if name=='global input' else 34]^=1
        rejected_names.append(rejected(name,lambda:attest(receipt,binaries['candidate'],case)))
    assert len(rejected_names)==20
    print(json.dumps(dict(rejected_corruptions=len(rejected_names),checks=rejected_names),indent=2))


if __name__=='__main__':main()
