#!/usr/bin/env python3
"""Standalone offline static verifier. No target execution or repository access."""
import hashlib,json,pathlib,subprocess,sys
sys.dont_write_bytecode=True
P=pathlib.Path(__file__).resolve().parent
sys.path.insert(0,str(P))
from analyze import run

def main():
    paths=list(P.rglob('*'))
    assert not any(p.is_symlink() for p in paths),'symlink'
    actual={p.relative_to(P).as_posix() for p in paths if p.is_file()}
    manifest=json.loads((P/'manifest.json').read_text())
    assert actual==set(manifest)|{'manifest.json'},'file set'
    for name,expected in manifest.items():
        p=P/name;assert p.resolve().is_relative_to(P)
        b=p.read_bytes();assert expected==dict(bytes=len(b),sha256=hashlib.sha256(b).hexdigest()),name
    inputs=json.loads((P/'input-map.json').read_text())
    assert {x['publication_path'] for x in inputs}=={x for x in actual if x.startswith(('prior/','policy/'))}
    for x in inputs:
        assert manifest[x['publication_path']]=={k:x[k] for k in ['bytes','sha256']}
    owned=json.loads((P/'ownedmap.json').read_text())
    assert set(owned)==actual,'ownership set'
    assert all(x['action']=='preserved byte-for-byte' for n,x in owned.items() if n.startswith('prior/'))
    computed=run();assert computed==json.loads((P/'selection-ledger.json').read_text()),'recomputed evidence'
    assert len(computed['inventory']['candidate'])==409 and len(computed['inventory']['original'])==441
    assert computed['summary']['source_patch'] is None
    assert computed['summary']['whole_file_equal'] is False
    missing=json.loads((P/'missing-artifact.json').read_text())
    assert missing['source_patch'] is None and missing['selected_candidate']=='C0094'
    proc=subprocess.run([sys.executable,'-B',str(P/'prior/verify.py')],cwd=P,stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True)
    assert proc.returncode==0,(proc.stdout,proc.stderr)
    predecessor=json.loads(proc.stdout);assert predecessor['status']=='PASS'
    print(json.dumps(dict(status='PASS',sealed_files=len(manifest),input_files=len(inputs),
        candidate_rows=409,original_rows=441,selected_candidate='C0094',
        instruction_witnesses=len(computed['new_witnesses']),new_builds=0,new_runtime_executions=0,
        source_patch=None,whole_file_equal=False,predecessor=predecessor),sort_keys=True,indent=2))
if __name__=='__main__':main()
