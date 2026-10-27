"""Reject mutations of the live helper, its data/callers, and signed runtime evidence."""
import copy
from pathlib import Path
import struct
import sys
import tempfile

if not __debug__:
    raise RuntimeError('verification requires assertions')
sys.dont_write_bytecode=True
from verify import ROOT,P,SWEEP,TRADE,load,raw,sha,module
from analysis import inspect


def rejected(name,call):
    try:
        call()
    except (AssertionError,KeyError,ValueError,struct.error):
        return name
    raise AssertionError('accepted corruption: '+name)


def main():
    names=[]
    data=raw(P/'builds/recovered/symbols.so.gz')
    proof=load(P/'analysis.json')
    reader=module('mutation_reader',TRADE/'reader.py')
    graph=module('mutation_graph',ROOT/'research/mayhem-sweep-branch-layout/analysis.py')
    with tempfile.TemporaryDirectory() as td:
        td=Path(td);control=td/'control.so';path=td/'candidate.so'
        control.write_bytes(raw(P/'builds/control/symbols.so.gz'));path.write_bytes(data)
        e=reader.Elf(path);start=proof['helper_start'];w=e.window(start,start+912)
        refs={x['offset']:x['target'] for x in w['data_references']}
        mutations=[]
        admin=next(r for r in proof['sweep_failures'] if r['role']=='admin')['candidate_start']
        for name,pc,target in (
                ('live wrapper redirected to admin',proof['live_wrapper_call_pc'],admin),
                ('live helper call redirected',proof['live_helper_call_pc'],start+8)):
            mutations.append((name,pc+4,struct.pack('<i',(target-pc-8)//8)))
        mutations.append(('helper register',start+1,bytes([data[start+1]^1])))
        branch=w['branches'][0]['pc']
        old=struct.unpack_from('<h',data,branch+2)[0]
        mutations.append(('local branch target',branch+2,struct.pack('<h',old+1)))
        clock=w['direct'][0]['pc']
        mutations.append(('masked helper callee',clock+4,struct.pack('<i',0)))
        for kind in ('Source','counted_literal','MayhemError_discriminant','fmt_vtable'):
            ref=next(x for x in proof['typed_data'] if x['value']['kind']==kind)
            address=refs[ref['candidate_offset']]
            if kind=='Source':address+=16
            if kind=='fmt_vtable':address+=8
            mutations.append((kind+' payload',address,bytes([data[address]^1])))
        sink=next(x['target'] for x in w['direct'] if x['offset']==704)
        sym=next(s for s in e.symbols if s['value']==sink and s['info']&15==2 and s['size'])
        sw=e.window(sink,sink+sym['size'])
        message=graph.pointer(e,sw['data_references'][0]['target'])
        mutations.append(('overflow panic message',message,bytes([data[message]^1])))
        for name,offset,value in mutations:
            altered=bytearray(data);altered[offset:offset+len(value)]=value;path.write_bytes(altered)
            names.append(rejected(name,lambda:inspect(control,path)))
    sys.path.insert(0,str(SWEEP))
    runtime=module('mutation_runtime',SWEEP/'runtime_check.py')
    report=load(P/'runtime/rates.json.gz');binaries=report['binaries']
    runner=sha((SWEEP/'replay_sweeps.py').read_bytes())
    for name,change in (
            ('missing rate case',lambda d:d['cases'].pop()),
            ('extra diagnostic',lambda d:d['cases'][0]['results']['candidate']['logs'].append('unexpected diagnostic')),
            ('return data',lambda d:d['cases'][0]['results']['candidate']['return_data'].update(data=[42])),
            ('rate input label',lambda d:d['cases'][0]['case'].update(last=123))):
        d=copy.deepcopy(report);change(d)
        names.append(rejected(name,lambda:runtime.check(d,'rates',binaries,runner)))
    case=report['cases'][0]['case'];original=report['cases'][0]['receipts']['candidate']
    for name in ('signature','program hash','global input','rate input'):
        receipt=copy.deepcopy(original)
        if name=='signature':
            tx=bytearray.fromhex(receipt['transaction_hex']);tx[1]^=1;receipt['transaction_hex']=tx.hex()
        elif name=='program hash':receipt['before'][runtime.PROGRAM]['data_sha256']='0'*64
        else:
            from solders.transaction import Transaction
            tx=Transaction.from_bytes(bytes.fromhex(receipt['transaction_hex']));ix=tx.message.instructions[0]
            k=str(tx.message.account_keys[ix.accounts[1 if name=='global input' else 9]])
            receipt['before'][k]['data'][166 if name=='global input' else 34]^=1
        names.append(rejected(name,lambda:runtime.attest(receipt,binaries['candidate'],case)))
    assert len(names)==18
    import json
    print(json.dumps(dict(rejected_corruptions=len(names),checks=names),indent=2))


if __name__=='__main__':main()
