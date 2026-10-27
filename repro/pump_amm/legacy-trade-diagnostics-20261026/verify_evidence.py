#!/usr/bin/env python3
"""Check original legacy guard bytes and all retained signed baseline cases."""
import base64
import gzip
import hashlib
import json
import re
import struct
from solders.transaction import Transaction
import verify

def main():
    p=verify.P;b=(verify.ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()
    assert hashlib.sha256(b).hexdigest()==verify.ORIGINAL
    covered=set()
    for line in (p/'original-guards.asm').read_text().splitlines():
        m=re.match(r'\s*([0-9a-f]+):\s*((?:[0-9a-f]{2} )+)\s',line);assert m
        at=int(m[1],16);raw=bytes.fromhex(m[2]);assert b[at:at+len(raw)]==raw;covered.update(range(at,at+len(raw)))
    evidence=json.loads((p/'original-sites.json').read_text());assert len(covered)==evidence['verified_excerpt_bytes']==4240
    for site in evidence['sites']:
        assert struct.unpack_from('<I',b,site['source_line_store']+4)[0]==site['line']
        for code in site['error_code_stores']:assert struct.unpack_from('<I',b,code['address']+4)[0]==code['value']
    assert b[0x3b928:0x3b930]==bytes.fromhex('55 01 1f 00 00 00 00 00')
    assert 0x3b928+8*(1+struct.unpack_from('<h',b,0x3b92a)[0])==0x3ba28
    assert struct.unpack_from('<I',b,0x3b9a4)[0]==733 and struct.unpack_from('<I',b,0x3b9bc)[0]==6040
    signature_count=0;targets=0;missing_origins=0;panic_origins=0;account_origins=0
    manifest=json.loads((p/'baseline-manifest.json').read_text())
    for name,entry in manifest.items():
        stored=(verify.ROOT/entry['path']).read_bytes();raw=gzip.decompress(stored)
        assert hashlib.sha256(stored).hexdigest()==entry['stored_sha256'] and hashlib.sha256(raw).hexdigest()==entry['raw_sha256']
        report=json.loads(raw);assert report['candidate_sha256']==verify.PRIOR and report['original_sha256']==verify.ORIGINAL and report['mismatches']==[]
        for row in report['cases']:
            a,c=row['original'],row['candidate'];assert set(a)==set(c)==verify.FIELDS
            for key in verify.FIELDS-{'logs'}:assert a[key]==c[key]
            for result in (a,c):
                t=Transaction.from_bytes(base64.b64decode(result['transaction_base64'],validate=True));assert len(t.signatures)==1 and all(t.verify_with_results());signature_count+=1
            targets+=verify.labels(a['logs'])!=verify.labels(c['logs'])
            missing_origins+=any('AnchorError thrown in' in x for x in a['logs']) and any('AnchorError occurred.'in x for x in c['logs'])
            panic_origins+=[x for x in a['logs']if verify.PANIC.match(x)]!=[x for x in c['logs']if verify.PANIC.match(x)]
            account_origins+=any('AnchorError caused by account:'in x and 'Error Code: AccountOwnedByWrongProgram.'in x for x in a['logs']) and any('AnchorError thrown in'in x and 'Error Code: AccountOwnedByWrongProgram.'in x for x in c['logs'])
    assert targets==169 and missing_origins==99 and panic_origins==6 and account_origins==2
    assert signature_count==3172
    print(json.dumps({'original_guard_bytes':len(covered),'sites':len(evidence['sites']),'baseline_cases':1586,'signature_fields':signature_count,'compared_value_gaps':targets,'missing_error_origins':missing_origins,'panic_coordinates':panic_origins,'account_origin_mismatches':account_origins}))

if __name__=='__main__':main()
