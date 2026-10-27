#!/usr/bin/env python3
"""Check retained compiler/source bindings, then recompute all helper controls."""
import gzip
import hashlib
import json
from pathlib import Path
import analyze

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]


def require(condition, message):
    if not condition:
        raise ValueError(message)


def verify():
    manifest = json.loads((HERE / 'manifest.json').read_text())
    for name, digest in manifest['inputs'].items():
        require(hashlib.sha256((ROOT / name).read_bytes()).hexdigest() == digest, 'input mismatch: ' + name)
    for name, digest in manifest['files'].items():
        require(hashlib.sha256((HERE / name).read_bytes()).hexdigest() == digest, 'file mismatch: ' + name)
    expected = json.loads((ROOT / 'research/mayhem-amm-handler-shape-controls-20261027/base-source-inputs.json').read_text())
    require(hashlib.sha256((HERE / 'baseline.rs').read_bytes()).hexdigest() == expected['src/instructions/fee_recipients.rs'], 'baseline source differs')
    for folder in sorted((HERE / 'controls').iterdir()):
        source = dict(expected)
        source['src/instructions/fee_recipients.rs'] = hashlib.sha256((folder / 'fee_recipients.rs').read_bytes()).hexdigest()
        launch = json.loads((folder / 'launch.json').read_text())
        require(launch['source_inputs'] == source, folder.name + ': unexpected source cohort')
        result = json.loads((folder / 'result.json').read_text())
        require(result['returncode'] == 0 and result['source_unchanged'] and result['tools_unchanged'], folder.name + ': build failed')
        for name in ['symbols', 'candidate']:
            data = gzip.decompress((folder / (name + '.so.gz')).read_bytes())
            require(hashlib.sha256(data).hexdigest() == result[name + '_sha256'], folder.name + ': artifact differs')
        stderr = gzip.decompress((folder / 'stderr.gz').read_bytes()).decode()
        require('--crate-name mayhem_recovered ' in stderr and 'Finished `release`' in stderr, folder.name + ': missing root compiler record')
    report = analyze.derive()
    require(report == json.loads((HERE / 'report.json').read_text()), 'recomputed report differs')
    require(all(r['counts'] == {'normalized-only': 348, 'raw-equal': 84, 'unmatched': 9} and not r['complete_normalized_match'] for r in report['rows']), 'bounded result differs')
    print('Verified 15 compiled artifacts / 14 source variants; no new function match or target execution')


if __name__ == '__main__':
    verify()
