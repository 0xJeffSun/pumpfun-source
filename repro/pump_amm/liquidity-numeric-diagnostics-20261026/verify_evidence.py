#!/usr/bin/env python3
"""Verify the retained original diagnostic blocks and actual observation."""
import base64
import hashlib
import json
from pathlib import Path
import re
import struct
import sys

P=Path(__file__).resolve().parent
sys.path.insert(0,str(P))
import probe
from solders.transaction import Transaction

def verify():
    raw=(probe.ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()
    assert hashlib.sha256(raw).hexdigest()==probe.ORIGINAL_SHA
    ranges=[(0x30290,0x30330),(0x30a98,0x30b38),(0x32a18,0x32ac8),(0x32f18,0x32fb8),(0x33730,0x337d0)]
    covered=set()
    for line in (P/'original-diagnostics.asm').read_text().splitlines():
        m=re.match(r'\s*([0-9a-f]+):\s*((?:[0-9a-f]{2} )+)\s',line)
        assert m
        address=int(m[1],16);data=bytes.fromhex(m[2])
        assert raw[address:address+len(data)]==data
        covered.update(range(address,address+len(data)))
    assert covered==set().union(*(set(range(a,b))for a,b in ranges))
    sites={
        'deposit-base':(0x30290,0x302a8,0x302b8,0x30328,0x11cc2b,79,6004),
        'deposit-quote':(0x30a98,0x30ad0,0x30ab8,0x30b30,0x11cc2b,100,6004),
        'seed':(0x32a18,0x32a30,0x32a40,0x32ac0,0x11cc62,62,6067),
        'withdraw-base':(0x32f18,0x32f50,0x32f38,0x32fb0,0x11cc62,86,6004),
        'withdraw-quote':(0x33730,0x33768,0x33750,0x337c8,0x11cc62,107,6004),
    }
    for site,(pathload,errorstore,linestore,call,path,line,code) in sites.items():
        assert raw[pathload]==0x18 and struct.unpack_from('<Q',raw,pathload+4)[0]&0xffffffff==path
        assert struct.unpack_from('<I',raw,errorstore+4)[0]==code
        assert struct.unpack_from('<I',raw,linestore+4)[0]==line
        assert raw[call:call+2]==bytes([0x85,0x10])
        target=call+8*(1+struct.unpack_from('<i',raw,call+4)[0])
        assert target==0x1840
        filename='deposit' if site.startswith('deposit') else 'withdraw'
        literal=f'programs/pump-amm/src/instructions/liquidity/{filename}.rs'.encode()
        assert raw[path:path+len(literal)]==literal
    report=json.loads((P/'observation.json').read_text());assert report['status']=='completed'
    assert report['probe_sha256']==probe.sha(P/'observation-producer.py')
    assert report['original_sha256']==probe.ORIGINAL_SHA
    assert report['candidate_sha256']=='7f6c301e7d39ced26a6280ae1053db6cff76a01c67dd9c4627e6022cb8384d52'
    assert len(report['cases'])==13
    signatures=0
    for row,case in zip(report['cases'],probe.roster()):
        assert row['case']==case
        original,candidate=row['original'],row['candidate']
        assert original['before']==candidate['before'] and original['transaction']==candidate['transaction']
        assert {k:v for k,v in original['result'].items()if k!='logs'}=={k:v for k,v in candidate['result'].items()if k!='logs'}
        for result in (original,candidate):
            tx=Transaction.from_bytes(base64.b64decode(result['transaction'],validate=True));assert len(tx.signatures)==1 and all(tx.verify_with_results());signatures+=1
        expected=[] if not case['site'] else [f'Program log: Left: {case["compared"][0]}',f'Program log: Right: {case["compared"][1]}']
        observed=[s for s in original['result']['logs']if s.startswith(('Program log: Left:','Program log: Right:'))]
        assert observed==expected
        assert not any(s.startswith(('Program log: Left:','Program log: Right:')) for s in candidate['result']['logs'])
        if case['site']:
            family,line,_=probe.SITES[case['site']]
            assert any(f'liquidity/{family}.rs:{line}.'in s for s in original['result']['logs'])
    return {'original_instruction_bytes':len(covered),'shared_numeric_helper':'0x1840','observed_cases':13,'verified_signature_fields':signatures,'source_patch_acceptance':False}

if __name__=='__main__':print(json.dumps(verify()))
