#!/usr/bin/env python3
"""Portable read-only audit: inspect retained bytes, not installed compilers or SBF runtime."""
from pathlib import Path
import hashlib,json,struct,subprocess,sys
HERE=Path(__file__).resolve().parent
ROOT=next(p for p in HERE.parents if (p/'evidence/original/pump_fees/deployed.so').is_file())
H=lambda b:hashlib.sha256(b).hexdigest()
def obj(name):return json.loads((HERE/name).read_text())
def header(b):return (struct.unpack_from('<H',b,18)[0],struct.unpack_from('<I',b,48)[0])
def verify():
    manifest=obj('manifest.json')
    files={p.relative_to(HERE).as_posix() for p in HERE.rglob('*') if p.is_file() and p.name!='manifest.json' and '__pycache__' not in p.parts}
    assert files==set(manifest)
    for name,digest in manifest.items():
        p=HERE/name;assert not p.is_symlink() and H(p.read_bytes())==digest,name
    for name,digest in obj('external-inputs.json').items():
        p=ROOT/name;assert not p.is_symlink() and H(p.read_bytes())==digest,name
    rows=obj('independent-headers.json')
    for row in rows:
        raw=(ROOT/row['path']).read_bytes()
        assert H(raw)==row['sha256'] and len(raw)==row['file_bytes']
        assert header(raw)==(row['e_machine'],row['e_flags'])
        shoff=struct.unpack_from('<Q',raw,40)[0];size,count=struct.unpack_from('<HH',raw,58)
        extent=shoff+size*count
        for i in range(count):
            sh=struct.unpack_from('<IIQQQQIIQQ',raw,shoff+i*size)
            if sh[1]!=8:extent=max(extent,sh[4]+sh[5])
        assert extent==row['elf_extent'] and not any(raw[extent:])
        assert len(raw)-extent==row['tail_bytes']
        assert header(raw)==((263,0) if row['kind']=='target' else (247,0))
    probes=obj('llc-header-probe-results.json')
    expected={('v1.43','generic'):(247,0),('v1.43','sbfv2'):(263,32),('v1.44','generic'):(263,0),('v1.44','v1'):(263,1),('v1.44','v2'):(263,2)}
    for row in probes:
        assert row['returncode']==0
        raw=(HERE/row['file']).read_bytes()
        assert H(raw)==row['sha256'] and header(raw)==expected[(row['version'],row['cpu'])]
    for name in ['source-records.json','platform-source-records.json','rust-source-records.json']:
        for row in obj(name):
            saved=row.get('saved',row.get('path'))
            if saved and row.get('sha256'):assert H((HERE/saved).read_bytes())==row['sha256']
    helpers=obj('independent-multiply.json')
    ref=(ROOT/'evidence/original/pump_fees/deployed.so').read_bytes()[799040:799392]
    assert len(ref)==352 and H(ref)==helpers['captured_sha256']
    for row in helpers['builds']:
        raw=(ROOT/row['file']).read_bytes()[row['offset']:row['offset']+352]
        assert H(raw)==row['body_sha256']
        differences=[i for i in range(0,352,8) if ref[i:i+8]!=raw[i:i+8]]
        assert differences==row['differing_instruction_offsets']
        if row['version']=='v1.44':assert raw==ref
        else:assert differences==[160,216]
    # Immutable source confirms the probe is a deliberate backend transition.
    assert 'isSBFv2 ? ELF::EM_SBF : ELF::EM_BPF' in (HERE/'v143-SBFELFObjectWriter.cpp').read_text()
    assert 'ELF::EM_SBF' in (HERE/'v144-SBFELFObjectWriter.cpp').read_text()
    assert 'STI->getCPU() == "sbfv2"' in (HERE/'v143-SBFMCTargetDesc.cpp').read_text()
    return dict(verified=True,target_headers=4,new_v143_candidates_rejected_by_header=3,backend_probes=5,
                v144_raw_multiply_match=True,v143_multiply_differing_instruction_offsets=[160,216],
                stock_v143_historical_identity=False,unique_original_compiler_identified=False,
                whole_program_byte_identity=False,runtime_transactions_executed=0)
if __name__=='__main__':print(json.dumps(verify(),indent=2))
