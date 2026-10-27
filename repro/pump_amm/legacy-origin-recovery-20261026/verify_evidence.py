#!/usr/bin/env python3
"""Check exact original bytes and pinned source/receipt evidence without SBF."""
import base64
import hashlib
import json
from pathlib import Path
import re
import struct
from solders.transaction import Transaction
import verify

def main():
    p=verify.P;b=(verify.ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()
    assert hashlib.sha256(b).hexdigest()==verify.ORIGINAL
    record=verify.read(p/'original-origins.json');covered=set()
    for line in (p/'original-origins.asm').read_text().splitlines():
        m=re.match(r'\s*([0-9a-f]+):\s*((?:[0-9a-f]{2} )+)\s',line);assert m
        address=int(m[1],16);raw=bytes.fromhex(m[2]);assert b[address:address+len(raw)]==raw;covered.update(range(address,address+len(raw)))
    assert len(covered)==record['checked_bytes']==4024
    for site in record['sites']:
        literal=site['original_path'].encode();start=site['literal'];assert b[start:start+len(literal)]==literal
        for hit in site['hits']:
            assert struct.unpack_from('<I',b,hit['path_load']+4)[0]==start
            assert struct.unpack_from('<I',b,hit['line_store']+4)[0]==site['original_line']
    bindings=verify.read(p/'source-bindings.json')
    for file,entry in bindings.items():
        assert verify.sha(p/('baseline-'+file))==entry['baseline_sha256'] and verify.sha(p/('proposed-'+file))==entry['proposed_sha256']
        before=(p/('baseline-'+file)).read_text();after=(p/('proposed-'+file)).read_text()
        assert after.count('.ok_or_else(|| error!(')-before.count('.ok_or_else(|| error!(')==len(entry['changed_ok_or_lines'])
        assert before.count('.ok_or(')-after.count('.ok_or(')==len(entry['changed_ok_or_lines'])
    assert '<TokenAccount as anchor_lang::CheckOwner>::check_owner(ata.owner)?;' in (p/'proposed-legacy_sell.rs').read_text()
    maps=verify.read(p/'origin-map.json');manifest=verify.read(p/'baseline-manifest.json');targets=0;signatures=0
    for suite,entry in manifest.items():
        path=verify.ROOT/entry['path'];raw=__import__('gzip').decompress(path.read_bytes())
        assert verify.sha(path)==entry['stored_sha256'] and hashlib.sha256(raw).hexdigest()==entry['raw_sha256']
        baseline=json.loads(raw);assert baseline['candidate_sha256']==verify.PRIOR
        seen=set()
        for header,info in maps[suite].items():
            match=re.match(r'Program log: AnchorError thrown in src/(legacy_\w+\.rs):(\d+)\. Error Code: (\w+)\.',info['candidate_header']);assert match
            source=(p/('proposed-'+match[1])).read_text().splitlines()[int(match[2])-1]
            assert '.ok_or_else(|| error!(' in source and 'PumpAmmError::'+match[3] in source
            for i in info['rows']:
                row=baseline['cases'][i];assert header in row['original']['logs']
                assert any('AnchorError occurred.' in line for line in row['candidate']['logs']);seen.add(i);targets+=1
        for i,row in enumerate(baseline['cases']):
            a,c=row['original'],row['candidate']
            assert set(a)==set(c)==verify.FIELDS
            for key in verify.FIELDS-{'logs'}:assert a[key]==c[key]
            for result in (a,c):
                tx=Transaction.from_bytes(base64.b64decode(result['transaction_base64'],validate=True));assert len(tx.signatures)==1 and all(tx.verify_with_results());signatures+=1
            missing=any('AnchorError thrown in' in line for line in a['logs']) and any('AnchorError occurred.'in line for line in c['logs'])
            assert missing==(i in seen)
    assert targets==99 and signatures==3172
    print(json.dumps({'original_bytes':len(covered),'origin_sites':len(record['sites']),'targeted_origin_cases':targets,'signature_fields':signatures,'source_corrections':21,'owner_origin_correction':1}))

if __name__=='__main__':main()
