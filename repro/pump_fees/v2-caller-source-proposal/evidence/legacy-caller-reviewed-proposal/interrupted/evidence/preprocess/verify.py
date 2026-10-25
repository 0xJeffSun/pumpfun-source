#!/usr/bin/env python3
"""Portable, standard-library-only static evidence verification."""
import sys
sys.dont_write_bytecode = True
from pathlib import Path
import hashlib, json
ROOT = Path(__file__).resolve().parent
H = lambda b: hashlib.sha256(b).hexdigest()

def verify():
    seal=(ROOT/'MANIFEST.sha256').read_text().split()
    assert seal[1]=='manifest-sha256.json'
    assert H((ROOT/seal[1]).read_bytes())==seal[0], 'manifest seal'
    manifest=json.loads((ROOT/'manifest-sha256.json').read_text())
    actual={str(p.relative_to(ROOT)) for p in ROOT.rglob('*') if p.is_file()}
    expected=set(manifest)|{'manifest-sha256.json','MANIFEST.sha256'}
    assert actual==expected, ('allowlist mismatch',actual^expected)
    assert not any(p.is_symlink() for p in ROOT.rglob('*')), 'symlink forbidden'
    for name,meta in manifest.items():
        b=(ROOT/name).read_bytes()
        assert len(b)==meta['bytes'] and H(b)==meta['sha256'], ('payload',name)
    owned=json.loads((ROOT/'OWNEDMAP.json').read_text())
    assert set(owned['files'])==expected
    upstream=json.loads((ROOT/'inputs/upstream-manifest.json').read_text())
    legacy=json.loads((ROOT/'inputs/legacy-manifest.json').read_text())
    for stem in ['upstream','legacy']:
        prior=(ROOT/('inputs/'+stem+'-MANIFEST.sha256')).read_text().split()[0]
        assert prior==H((ROOT/('inputs/'+stem+'-manifest.json')).read_bytes())
    mapping=json.loads((ROOT/'inputs/source-map.json').read_text())
    assert len(mapping)==26
    assert H((ROOT/'inputs/source-map.json').read_bytes())==upstream['inputs/corrected-source-sha256.json']['sha256']
    for name,digest in mapping.items():
        assert H((ROOT/'inputs/source'/name).read_bytes())==digest
        assert upstream['source/'+name]['sha256']==digest
    for local,prior in [('candidate.so','candidate.so'),('symbols.so','symbols.so'),('prior-README.md','README.md')]:
        assert H((ROOT/'inputs'/local).read_bytes())==upstream[prior]['sha256']
    assert H((ROOT/'inputs/original.so').read_bytes())==legacy['inputs/original.so']['sha256']
    for p in (ROOT/'inputs/framework').rglob('*.rs'):
        key=str(p.relative_to(ROOT))
        assert H(p.read_bytes())==legacy[key]['sha256']
    catalog=json.loads((ROOT/'inputs/selected-catalog.json').read_text())
    assert catalog['provenance']['sha256']==upstream['full-function-inventory.json']['sha256']
    for row in json.loads((ROOT/'input-origins.json').read_text()):
        assert H((ROOT/row['destination']).read_bytes())==row['sha256']
    from analyze import run
    fresh=(json.dumps(run(),indent=2,sort_keys=True)+'\n').encode()
    assert fresh==(ROOT/'static-evidence.json').read_bytes(), 'static evidence reproducibility'
    print('PASS: exact allowlist/seals; 26 frozen 8ff12 source inputs; original/current artifacts; complete static witness. No target execution.')

if __name__=='__main__':
    verify()
