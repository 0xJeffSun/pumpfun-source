#!/usr/bin/env python3
"""Portable standard-library verifier, Python 3.11+. No network or target execution."""
import hashlib,json,pathlib,subprocess,sys
sys.dont_write_bytecode=True
P=pathlib.Path(__file__).resolve().parent
sys.path.insert(0,str(P))
from analyze import run
def sha(b):return hashlib.sha256(b).hexdigest()
def main():
    manifest=json.loads((P/'manifest.json').read_text())
    paths=list(P.rglob('*'))
    assert not any(p.is_symlink() for p in paths),'symlink'
    actual={p.relative_to(P).as_posix() for p in paths if p.is_file() and p!=P/'manifest.json'}
    assert actual==set(manifest),'file set'
    for name,record in manifest.items():
        p=P/name;assert p.resolve().is_relative_to(P)
        b=p.read_bytes();assert record==dict(bytes=len(b),sha256=sha(b)),name
    inputs=json.loads((P/'input-map.json').read_text())
    assert {x['publication_path'] for x in inputs}=={x for x in actual if x.startswith(('prior/','policy/'))}
    for x in inputs:
        b=(P/x['publication_path']).read_bytes();assert len(b)==x['bytes'] and sha(b)==x['sha256']
    owned=json.loads((P/'ownedmap.json').read_text())
    assert set(owned)==actual|{'manifest.json'}
    assert all(x['action']=='preserved byte-for-byte' for n,x in owned.items() if n.startswith('prior/'))
    expected=run();assert expected==json.loads((P/'field-ledger.json').read_text()),'recomputed field ledger'
    assert len(expected['fields'])==5 and expected['source_patch'] is None
    assert sum(len(x['source_accesses']) for x in expected['fields'])==14
    assert sum(len(x['byte_witnesses']) for x in expected['fields'])==33
    # Recompute the corrected-token ledger and every inherited match/call/data row.
    proc=subprocess.run([sys.executable,'-B',str(P/'prior/verify.py')],cwd=P,
                        stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True)
    assert proc.returncode==0,(proc.stdout,proc.stderr)
    inherited=json.loads(proc.stdout);assert inherited['status']=='PASS'
    print(json.dumps(dict(status='PASS',sealed_files=len(manifest),inputs=len(inputs),
        owner_qualified_fields=5,source_accesses=14,byte_witnesses=33,
        offset_coincidences=len(expected['offset_coincidence_survey']),
        selected_windows=len(expected['selected_call_data_ledger']),
        predecessor=inherited,global_binary_use_completeness=False,
        business_roles_recovered=0,whole_file_equal=False),indent=2,sort_keys=True))
if __name__=='__main__':main()
