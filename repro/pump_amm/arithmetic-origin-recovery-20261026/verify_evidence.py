#!/usr/bin/env python3
"""Validate raw original origin constructors; no compiler or VM execution."""
from pathlib import Path
import hashlib
import json
import re
import struct

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]

def main():
    data=(ROOT/'evidence/original/pump_amm/deployed.so').read_bytes()
    assert hashlib.sha256(data).hexdigest()=='6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7'
    covered=set()
    for line in (HERE/'original-origin.asm').read_text().splitlines():
        match=re.fullmatch(r'([0-9a-f]+):\s*((?:[0-9a-f]{2}\s+)+).+',line);assert match,line
        address=int(match[1],16);raw=bytes.fromhex(match[2]);assert data[address:address+len(raw)]==raw
        covered.update(range(address,address+len(raw)))
    sites=json.loads((HERE/'original-sites.json').read_bytes())
    for row in sites:
        assert row['constructors'] and row['path'].encode() in data
        for address,line in row['constructors']:
            assert data[address] in (0x62,0x7a) and struct.unpack_from('<I',data,address+4)[0]==row['error']
            assert data[line]==0x62 and struct.unpack_from('<I',data,line+4)[0]==row['line']
            assert set(range(min(address,line),max(address,line)+8))<=covered
    print(json.dumps({'distinct_origins':len(sites),'original_bytes_checked':len(covered),'scope':'Raw constructors and source literals; caller attribution remains bounded by the associated runtime witnesses.'}))

if __name__=='__main__':main()
