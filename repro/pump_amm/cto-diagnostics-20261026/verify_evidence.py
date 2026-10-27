#!/usr/bin/env python3
"""Check original CTO guard bytes, saved cases and signed observations."""
import json
import re
import struct
import probe

def main():
    b=(probe.ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()
    assert probe.encoded_sha(b)==probe.ORIGINAL_SHA
    covered=set();ranges=[(0x14a10,0x14c48),(0x15760,0x15840)]
    for line in (probe.P/'original-guards.asm').read_text().splitlines():
        m=re.match(r'\s*([0-9a-f]+):\s*((?:[0-9a-f]{2} )+)\s',line);assert m
        at=int(m[1],16);data=bytes.fromhex(m[2]);assert b[at:at+len(data)]==data;covered.update(range(at,at+len(data)))
    assert covered==set().union(*(set(range(a,z))for a,z in ranges))
    assert b[0x11c574:0x11c574+len(probe.ORIGIN)]==probe.ORIGIN.encode()
    for at,value in [(0x14be0,6028),(0x14bf0,64),(0x157e0,121),(0x157f8,6081)]:assert struct.unpack_from('<I',b,at+4)[0]==value
    for branch,dest in [(0x14a50,0x14c48),(0x15768,0x15840)]:assert branch+8*(1+struct.unpack_from('<h',b,branch+2)[0])==dest
    assert b[0x14a10:0x14a20]==bytes.fromhex('bf 61 00 00 00 00 00 00 07 01 00 00 38 04 00 00')
    assert b[0x15760:0x15768]==bytes.fromhex('79 21 40 05 00 00 00 00')
    saved=probe.saved();gaps=[]
    for i,row in enumerate(saved['cases']):
        a,c=row['original'],row['candidate']
        labels=lambda x:[s for s in x['logs']if s.startswith(('Program log: Left:','Program log: Right:'))]
        if labels(a)!=labels(c):
            assert probe.signature(a['transaction_base64'])==probe.signature(c['transaction_base64'])
            for key in probe.SHAPE-{'logs'}:assert a[key]==c[key]
            gaps.append(i)
    assert gaps==[12,13,14,58,59,123,124,125,151]
    observed=json.loads((probe.P/'observation.json').read_text());assert observed['status']=='completed'
    assert observed['probe_sha256']==probe.sha(probe.P/'observation-producer.py')
    count=0
    for row,index in zip(observed['cases'],probe.INDICES):
        expected=saved['cases'][index]['original'];assert row['saved_index']==index
        for side in ('original','prior','candidate'):
            r=row[side];assert set(r)==probe.SHAPE
            assert probe.signature(r['transaction_base64'])==probe.signature(expected['transaction_base64']);count+=2
            for key in probe.SHAPE-{'logs'}:assert r[key]==expected[key]
    print(json.dumps({'status':'passed','original_instruction_bytes':len(covered),'saved_gap_rows':gaps,'new_observation_cases':15,'signature_fields':count,'corrected_acceptance':False}))

if __name__=='__main__':main()
