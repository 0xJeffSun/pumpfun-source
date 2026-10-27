#!/usr/bin/env python3
"""Verify saved build artifacts and re-derive every original-window match."""
import gzip
import hashlib
import json
from pathlib import Path
import subprocess
import sys
import tempfile

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]


def require(condition, message):
    if not condition:
        raise ValueError(message)


def verify():
    manifest = json.loads((HERE / 'manifest.json').read_text())
    for name, digest in manifest['inputs'].items():
        require(hashlib.sha256((ROOT / name).read_bytes()).hexdigest() == digest, 'hash mismatch: ' + name)
    for name, digest in manifest['files'].items():
        require(hashlib.sha256((HERE / name).read_bytes()).hexdigest() == digest, 'hash mismatch: ' + name)
    launch = json.loads((HERE / 'build/launch.json').read_text())
    expected = json.loads((ROOT / 'research/mayhem-amm-handler-shape-controls-20261027/base-source-inputs.json').read_text())
    require(launch['source_inputs'] == expected and len(expected) == 67, 'source cohort differs')
    result = json.loads((HERE / 'build/result.json').read_text())
    require(result['returncode'] == 0 and result['source_unchanged'] and result['tools_unchanged'], 'build failed or inputs changed')
    symbols = gzip.decompress((HERE / 'build/symbols.so.gz').read_bytes())
    candidate = gzip.decompress((HERE / 'build/candidate.so.gz').read_bytes())
    require(hashlib.sha256(symbols).hexdigest() == result['symbols_sha256'], 'symbols binding differs')
    require(hashlib.sha256(candidate).hexdigest() == result['candidate_sha256'], 'stripped binding differs')
    stderr = gzip.decompress((HERE / 'build/stderr.gz').read_bytes()).decode()
    require('Finished `release`' in stderr and '--crate-name mayhem_recovered ' in stderr, 'missing compiler record')
    with tempfile.TemporaryDirectory() as temp:
        folder = Path(temp)
        (folder / 'symbols.so').write_bytes(symbols)
        subprocess.run([sys.executable, '-B', str(HERE / 'inventory.py'), str(folder / 'symbols.so'),
                        str(folder / 'inventory.json')], stdout=subprocess.DEVNULL, check=True)
        require(json.loads((folder / 'inventory.json').read_text()) == json.loads((HERE / 'inventory.json').read_text()),
                'recomputed inventory differs')
    verify_successors(expected, symbols, candidate)
    print('Fresh Linux evidence verified: 432 normalized / 84 raw-local; no new matched windows or runtime qualification')


def verify_successors(expected, symbols, candidate):
    for name in ['symbols.so', 'candidate.so']:
        repeated = gzip.decompress((HERE / 'repeat' / (name + '.gz')).read_bytes())
        require(repeated == (symbols if name == 'symbols.so' else candidate), 'fresh repeat artifact differs')
    repeat = json.loads((HERE / 'repeat/launch.json').read_text())
    require(repeat['source_inputs'] == expected, 'repeat source differs')
    for name in ['fetch', 'compile']:
        require(json.loads((HERE / 'repeat' / (name + '.result.json')).read_text())['returncode'] == 0,
                'repeat stage failed')
    changed = dict(expected)
    changed['src/instructions/pump_interface.rs'] = hashlib.sha256((HERE / 'control/pump_interface.rs').read_bytes()).hexdigest()
    require(json.loads((HERE / 'control/launch.json').read_text())['source_inputs'] == changed, 'control source differs')
    result = json.loads((HERE / 'control/result.json').read_text())
    require(result['returncode'] == 0 and result['source_unchanged'] and result['tools_unchanged'], 'control build failed')
    with tempfile.TemporaryDirectory() as temp:
        path = Path(temp)
        for name in ['repeat', 'control']:
            data = gzip.decompress((HERE / name / 'symbols.so.gz').read_bytes())
            (path / 'symbols.so').write_bytes(data)
            subprocess.run([sys.executable, '-B', str(HERE / 'inventory.py'), str(path / 'symbols.so'),
                            str(path / 'inventory.json')], stdout=subprocess.DEVNULL, check=True)
            require(json.loads((path / 'inventory.json').read_text()) == json.loads((HERE / name / 'inventory.json').read_text()),
                    name + ' inventory differs')
    spec_path = HERE / 'analyze_control.py'
    import importlib.util
    spec = importlib.util.spec_from_file_location('control_analysis', spec_path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    require(module.derive() == json.loads((HERE / 'control/analysis.json').read_text()), 'control alignment differs')


if __name__ == '__main__':
    verify()
