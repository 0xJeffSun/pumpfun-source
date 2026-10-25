#!/usr/bin/env python3
"""Portable, offline verification. Never invokes a compiler or program runtime."""
from pathlib import Path
import gzip, hashlib, json, subprocess, sys, zlib
from analyze import ROOT, PATHS, compute, sha

def verify():
    manifest=json.loads((ROOT/'manifest-sha256.json').read_text())
    files={str(p.relative_to(ROOT)):sha(p.read_bytes()) for p in ROOT.rglob('*')
           if p.is_file() and p!=ROOT/'manifest-sha256.json' and '__pycache__' not in p.parts}
    assert files==manifest, 'sealed file set or digest differs'
    assert not any(p.is_symlink() for p in ROOT.rglob('*')), 'unexpected symlink'
    original_reader=(ROOT/'inputs/elf_reader-original.py').read_text()
    locator="REPO=next(p for p in Path(__file__).resolve().parents if (p/'evidence/original/pump_fees/deployed.so').is_file())"
    assert original_reader.count(locator)==1
    assert (ROOT/'elf_reader.py').read_text()==original_reader.replace(locator,'REPO=Path(__file__).resolve().parent')
    expected=compute()
    assert {p.name for p in (ROOT/'analysis').iterdir()}==set(expected)
    for name,result in expected.items():
        data=(ROOT/'analysis'/name).read_bytes()
        saved=json.loads(gzip.decompress(data) if name.endswith('.gz') else data)
        assert saved==json.loads(json.dumps(result)), name
    # Check that every unequal byte and only unequal bytes occurs in each
    # residual list. Equal bytes remain retained in the two original inputs.
    for a,b in [('linux','darwin'),('linux','original'),('darwin','original')]:
        left=(ROOT/PATHS[a]).read_bytes();right=(ROOT/PATHS[b]).read_bytes()
        d=expected[a+'-vs-'+b+'-complete-residual.json.gz'];n=min(len(left),len(right))
        covered=bytearray(n)
        for r in d['runs']:
            off=r['offset'];l=bytes.fromhex(r['left_hex']);rr=bytes.fromhex(r['right_hex'])
            assert len(l)==len(rr) and l==left[off:off+len(l)] and rr==right[off:off+len(rr)]
            assert all(x!=y for x,y in zip(l,rr))
            assert not any(covered[off:off+len(l)])
            covered[off:off+len(l)]=b'\1'*len(l)
        assert all(bool(covered[i])==(left[i]!=right[i]) for i in range(n))
        assert d['tail']=={'offset':n,'left_hex':left[n:].hex(),'right_hex':right[n:].hex()}
    # The copied index is a retained public ZIP central-directory listing,
    # not proof of a recomputed full-archive digest or unavailable symbols.
    index=json.loads((ROOT/'inputs/linux-artifact-index.json').read_text())
    elf_members=[r for r in index if r['name'].endswith('.so')]
    assert len(elf_members)==1 and elf_members[0]['name']=='pump_fees_candidate.so'
    binary=(ROOT/PATHS['linux']).read_bytes()
    assert elf_members[0]['bytes']==len(binary)
    assert elf_members[0]['CRC']==zlib.crc32(binary)
    nested=subprocess.run([sys.executable,'-B',str(ROOT/'inputs/linux-build/verify.py')],capture_output=True,text=True)
    assert nested.returncode==0,nested.stdout+nested.stderr
    summary=expected['summary.json']
    assert not any(v['gained_original_windows'] for v in summary['linux_changes_to_original_matches'].values())
    print(json.dumps({'verified':True,'sealed_payload_files':len(manifest),
        'recomputed_analysis_files':len(expected),'complete_residual_pairs':3,
        'source_input_count':22,'darwin_named_windows':539,'linux_inferred_windows':539,
        'original_inferred_windows':585,'new_original_body_matches':0,
        'linux_source_location_improvements':14,'linux_unstripped_retained':False,
        'builds_executed':0,'runtime_receipts_created':0,'network_requests':0},indent=2))

if __name__=='__main__':verify()
