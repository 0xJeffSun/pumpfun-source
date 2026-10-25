"""Verify the combined build, current source, bounded receipts and signatures."""
import argparse
import base64
import gzip
import hashlib
import json
from pathlib import Path
import re
import sys
from solders.transaction import VersionedTransaction

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
sys.path.insert(0,str(ROOT/'scripts'))
from build_source_manifest import source_manifest
from compare import compare
from replay import check,read

def sha(raw):return hashlib.sha256(raw).hexdigest()

def verify():
    manifest=read(HERE/'manifest.json')
    actual={str(p.relative_to(HERE)) for p in HERE.rglob('*') if p.is_file()
            and p.name!='manifest.json' and '__pycache__' not in p.parts}
    assert actual==set(manifest), (actual-set(manifest),set(manifest)-actual)
    for name,expected in manifest.items():
        p=HERE/name;assert not p.is_symlink() and sha(p.read_bytes())==expected,name
    for name,expected in read(HERE/'external-inputs.json').items():
        assert sha((ROOT/name).read_bytes())==expected,name
    first,second=[read(HERE/name) for name in ['build-comparison.json','second-build-comparison.json']]
    source=source_manifest(ROOT/'programs/pump',ROOT/'programs/pump',ROOT,cwd=ROOT)
    assert source==first['source_sha256']==second['source_sha256']==read(HERE/'source-map.json')
    binary=(HERE/'candidate.so').read_bytes();digest=sha(binary)
    original=(ROOT/'evidence/original/pump/deployed.so').read_bytes()
    comparison=compare(original,binary)
    assert comparison==first['comparison']==second['comparison']
    assert not comparison['full_byte_equality']
    for prefix,report in [('',first),('second-',second)]:
        attempt=read(HERE/(prefix+'build-attempt.json'))
        assert attempt['returncode']==0 and attempt['source_unchanged']
        assert attempt['source_sha256']==attempt['source_after_sha256']==source
        assert report['selected_toolchain']=='v1.44'
        log=gzip.decompress((HERE/(prefix+'build.log.gz')).read_bytes())
        assert sha(log)==report['build_log_sha256']==attempt['build_log_sha256']
        assert not re.search(rb'Stack offset.*exceeded|stack frame.*exceed|LLVM ERROR',log,re.I)
    signatures={}
    def signed(value):
        if isinstance(value,dict):
            for k,v in value.items():
                if k in ('transaction_base64','signed_transaction_base64') and isinstance(v,str):
                    raw=base64.b64decode(v,validate=True)
                    tx=VersionedTransaction.from_bytes(raw)
                    assert all(tx.verify_with_results()),k
                    signatures[sha(raw)]=len(tx.signatures)
                else:signed(v)
        elif isinstance(value,list):
            for v in value:signed(v)
    index=read(HERE/'receipt-index.json');total=0
    for entry in index:
        result=read(HERE/entry['path']);check(result,entry['cases'])
        assert entry['candidate_sha256']==digest
        actual=result.get('candidate_sha256',result.get('candidate_pump_sha256'))
        if actual is None:
            actual=next((v for k,v in result.get('provenance',{}).items()
                         if k.endswith('/merged-prs-20261025/candidate.so')),None)
        if actual is None:
            actual=next((v for k,v in result.get('bound_inputs_sha256',{}).items()
                         if k.endswith('/merged-prs-20261025/candidate.so')),None)
        assert actual==digest,(entry['id'],actual)
        case_rows=result.get('cases')
        signed(case_rows if isinstance(case_rows,list) else result.get('results',[]))
        signed(result.get('candidate_cases',[]))
        total+=entry['cases']
    assert total==9558,(total,9558)
    return dict(verified=True,current_source_inputs=len(source),candidate_sha256=digest,
                independent_identical_builds=2,suites=len(index),paired_cases=total,
                unique_saved_signed_transactions=len(signatures),
                signatures_verified=sum(signatures.values()),full_original_byte_equality=False,
                surfpool_replayed=False)
if __name__=='__main__':
    print(json.dumps(verify(),indent=2))
