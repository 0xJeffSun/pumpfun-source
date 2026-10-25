#!/usr/bin/env python3
"""Verify sealed bounded numeric-runtime attribution; no compiler or SBF execution."""
from pathlib import Path
import argparse,hashlib,json,re
from analyze import ROOT,H,J,analyze,SPECS

def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--repo',type=Path);args=p.parse_args()
    manifest=J(ROOT/'manifest-sha256.json');assert not any(f.is_symlink()for f in ROOT.rglob('*'))
    assert {str(f.relative_to(ROOT)):H(f.read_bytes())for f in ROOT.rglob('*')if f.is_file()and f!=ROOT/'manifest-sha256.json'and'__pycache__'not in f.parts}==manifest
    result=analyze();assert result==J(ROOT/'ledger.json')
    for group in ['prior-pricing','prior-route']:
        base=ROOT/'inputs'/group;seal=J(base/'manifest-sha256.json')
        for f in base.rglob('*'):
            if f.is_file()and f.name!='manifest-sha256.json':assert H(f.read_bytes())==seal[str(f.relative_to(base))]
    original=(ROOT/'inputs/original-pump.so').read_bytes();asm_names=['wide-div-wrapper','wide-div-core','wide-shr','wide-mul','wide-shl'];asm_bytes=0
    for (_,lo,hi,_),name in zip(SPECS,asm_names):
        records=[]
        for line in (ROOT/'inputs/prior-pricing/inputs'/f'{name}.asm').read_text().splitlines():
            m=re.match(r'^\s*([0-9a-f]+):[ \t]+((?:[0-9a-f]{2}(?:[ \t]+|$)){8,16})',line)
            if m:records.append((int(m[1],16),bytes.fromhex(m[2])))
        cursor=lo
        for at,raw in records:assert at==cursor and original[at:at+len(raw)]==raw;cursor+=len(raw);asm_bytes+=len(raw)
        assert cursor==hi
    assert asm_bytes==5960
    if args.repo:
        for row in J(ROOT/'input-provenance.json')['files']:assert H((args.repo/row['source']).read_bytes())==row['sha256'],row['source']
    print(json.dumps({'verified':True,'sealed_files':len(manifest),'complete_matched_bodies':5,'raw_equal_bodies':3,'normalized_equal_bodies':5,'total_body_bytes':5960,'raw_byte_differences':6,'unexplained_residual_bytes':0,'complete_internal_call_sites':12,'external_or_indirect_calls':0,'relocations':0,'inline_constants_raw_equal':12,'original_assembly_bytes_checked':asm_bytes,'source_version_or_build_link_proven':False,'mathematical_all_input_division_proof_supplied':False,'new_builds':0,'new_runtime_probes':0,'current_inputs_checked':bool(args.repo)},indent=2))
if __name__=='__main__':main()
