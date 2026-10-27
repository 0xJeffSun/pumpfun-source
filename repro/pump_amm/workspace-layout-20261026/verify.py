#!/usr/bin/env python3
"""Check the unpromoted workspace experiment and remeasure its original windows."""
import gzip
import hashlib
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import tomllib

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]

def raw(path):
    data=path.read_bytes();return gzip.decompress(data)if path.suffix=='.gz'else data
def load(path):return json.loads(raw(path))
def digest(data):return hashlib.sha256(data).hexdigest()

def main():
    out=HERE/'results';manifest=load(out/'manifest.json')['files']
    assert {str(x.relative_to(out))for x in out.rglob('*')if x.is_file()}==set(manifest)|{'manifest.json'}
    for name,entry in manifest.items():
        data=(out/name).read_bytes();assert digest(data)==entry['sha256'] and len(data)==entry['bytes']
        logical=gzip.decompress(data)if entry['compressed']else data
        assert digest(logical)==entry['raw_sha256'] and len(logical)==entry['raw_bytes']
    record=load(out/'build/build-comparison.json');source=out/'source'
    assert record['returncode']==0 and record['source_unchanged'] and record['source_sha256']==record['source_after_sha256']
    prefix='work/amm-workspace-layout-20261026/source/'
    for name,sha in record['source_sha256'].items():
        assert name.startswith(prefix);assert digest((source/name[len(prefix):]).read_bytes())==sha
    prior=ROOT/'repro/pump_amm/arithmetic-origin-recovery-20261026/results'
    for p in (source/'programs/pump-amm').rglob('*.rs'):
        assert p.read_bytes()==(prior/'source'/p.relative_to(source)).read_bytes()
    assert (source/'Cargo.lock').read_bytes()==(prior/'source/programs/pump-amm/Cargo.lock').read_bytes()
    config=tomllib.loads((source/'Cargo.toml').read_text());assert config['workspace']['members']==['programs/pump-amm']
    candidate=out/'build/candidate.so';symbols=out/'build/unstripped.so'
    assert digest(candidate.read_bytes())==record['comparison']['candidate_sha256']
    assert digest(symbols.read_bytes())==record['unstripped_sha256']
    assert b'programs/pump-amm/src/incentives.rs' in candidate.read_bytes()
    with tempfile.TemporaryDirectory() as tmp:
        target=Path(tmp)/'measurement.json'
        subprocess.run([sys.executable,'-B',str(ROOT/'repro/pump_amm/focused-diagnostics-20261026/measure.py'),'--candidate',str(candidate),'--symbols',str(symbols),'--output',str(target)],check=True,stdout=subprocess.DEVNULL)
        measured=load(target)
    assert measured==load(out/'measurement.json.gz')
    baseline=load(prior/'measurement.json.gz')
    old={x['start']:bool(x['matches']) for x in baseline['rows']};new={x['start']:bool(x['matches']) for x in measured['rows']}
    assert old==new and measured['normalized_matches']==503 and measured['unmatched']==282
    print(json.dumps({'source_files':len(record['source_sha256']),'rust_sources_unchanged':True,'lock_bytes_unchanged':True,'original_path_prefix_present':True,'normalized_original_matches':503,'gains':0,'losses':0,'promoted':False,'complete_elf_equal':False}))

if __name__=='__main__':main()
