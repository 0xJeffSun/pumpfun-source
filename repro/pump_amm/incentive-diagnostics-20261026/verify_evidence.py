#!/usr/bin/env python3
"""Check original instruction bytes and the retained schedule witnesses."""
import gzip
import json
from pathlib import Path
import re
import struct
import sys

HERE=Path(__file__).resolve().parent
sys.path.insert(0,str(HERE))
import probe


def main():
    original=(probe.ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()
    assert probe.digest(original)==probe.ORIGINAL_SHA
    covered=set()
    for line in (HERE/'original-schedule.asm').read_text().splitlines():
        m=re.fullmatch(r'([0-9a-f]+):\s*((?:[0-9a-f]{2}\s+)+).+',line)
        assert m,line
        address=int(m[1],16);data=bytes.fromhex(m[2])
        assert original[address:address+len(data)]==data
        covered.update(range(address,address+len(data)))
    assert covered==set(range(0x6dc00,0x6f400))
    sites=[(0x6f0b8,6030,313,0x1308),(0x6e0d0,6031,327,0x1308),
           (0x6e578,6032,329,0x1308),(0x6e990,6033,331,0x1308),
           (0x6f1f0,6034,352,0x878),(0x6e6c0,6036,263,0x878),
           (0x6eb88,6036,291,0x878),(0x6edb8,6037,292,0x878)]
    for address,code,line,target in sites:
        assert original[address]==0x62 and struct.unpack_from('<I',original,address+4)[0]==code
        assert original[address+16]==0x62 and struct.unpack_from('<I',original,address+20)[0]==line
        call=address+0x80
        assert original[call:call+2]==b'\x85\x10'
        assert call+8+8*struct.unpack_from('<i',original,call+4)[0]==target
    assert original[0x6ea00:0x6ea08]==bytes.fromhex('bf 64 00 00 00 00 00 00')
    assert original[0x6ea08:0x6ea10]==bytes.fromhex('bf 95 00 00 00 00 00 00')
    assert original[0x6e910:0x6e918]==bytes.fromhex('07 06 00 00 ff ff ff ff')
    assert original[0x11c657:0x11c657+24]==b'GlobalVolumeAccumulator='
    assert struct.unpack_from('<I',original,0x122384)[0]==0x11c657
    assert struct.unpack_from('<Q',original,0x122388)[0]==24
    assert original[0x16be0:0x16bf0]==bytes.fromhex('18 01 00 00 80 23 12 00 00 00 00 00 00 00 00 00')
    manifest=json.loads((HERE/'cases.json').read_bytes())
    path=probe.ROOT/'repro/pump_amm/focused-diagnostics-20261026/results/liquidity/runtime/incentives_admin.json.gz'
    stored=path.read_bytes();raw=gzip.decompress(stored)
    assert probe.digest(stored)==manifest['baseline_stored_sha256'] and probe.digest(raw)==manifest['baseline_raw_sha256']
    baseline=json.loads(raw)
    assert baseline['candidate_sha256']==manifest['baseline_candidate_sha256']
    for case in manifest['cases']:
        old=baseline['cases'][case['row']]
        assert old['input']==case['input']
        site,pair=probe.expected(case)
        values=[] if site is None else [f'Program log: Left: {pair[0]}',f'Program log: Right: {pair[1]}']
        assert values==case['original_numeric']
        assert old['original']['transaction_base64']==old['candidate']['transaction_base64']
    print(json.dumps({'original_bytes_checked':len(covered),'numeric_sites':len(sites),'retained_cases':len(manifest['cases']),
                      'success_log_literal':True,'scope':'Static byte and saved same-input evidence; no new VM execution.'}))


if __name__=='__main__':main()
