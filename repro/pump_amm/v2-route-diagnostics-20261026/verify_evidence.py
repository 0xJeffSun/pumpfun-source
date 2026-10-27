#!/usr/bin/env python3
"""Bind the twenty selected original error constructors to unmodified bytes."""
from pathlib import Path
import hashlib
import json
import re
import struct

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]

def main():
    original=(ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()
    assert hashlib.sha256(original).hexdigest()=='6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7'
    covered=set()
    for line in (HERE/'original-diagnostics.asm').read_text().splitlines():
        m=re.fullmatch(r'([0-9a-f]+):\s*((?:[0-9a-f]{2}\s+)+).+',line);assert m,line
        address=int(m[1],16);data=bytes.fromhex(m[2]);assert original[address:address+len(data)]==data
        covered.update(range(address,address+len(data)))
    sites=json.loads((HERE/'sites.json').read_bytes())
    for site in sites.values():
        assert len(site['constructors'])==1
        hit=site['constructors'][0];error,line=hit['error_store'],hit['line_store']
        assert original[error] in (0x62,0x7a) and struct.unpack_from('<I',original,error+4)[0]==site['code']
        assert original[line]==0x62 and struct.unpack_from('<I',original,line+4)[0]==site['line']
        assert original.find(site['path'].encode())>=0
        assert set(range(min(error,line),max(error,line)+8))<=covered
    print(json.dumps({'constructors':len(sites),'original_bytes_checked':len(covered),'scope':'Static constructor and literal evidence; raw original supplied only for analysis.'}))

if __name__=='__main__':main()
