#!/usr/bin/env python3
"""Recheck retained builds, original signatures and exact publication bytes."""
import argparse
import base64
import gzip
import hashlib
import importlib.util
import json
from pathlib import Path
import sys

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]


def digest(raw):
    return hashlib.sha256(raw).hexdigest()


def raw(path):
    data = path.read_bytes()
    return gzip.decompress(data) if path.suffix == '.gz' else data


def load(path):
    return json.loads(raw(path))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--variant', choices=['boost', 'liquidity'], default='boost')
    parser.add_argument('--current-source', action='store_true')
    args = parser.parse_args()
    folder = HERE / 'results' / args.variant
    manifest = load(folder / 'manifest.json')['files']
    assert {str(p.relative_to(folder)) for p in folder.rglob('*') if p.is_file()} == set(manifest) | {'manifest.json'}
    for name, entry in manifest.items():
        path = folder / name
        assert not path.is_symlink()
        assert len(path.read_bytes()) == entry['bytes'] and digest(path.read_bytes()) == entry['sha256'], name
        logical = gzip.decompress(path.read_bytes()) if entry['compressed'] else path.read_bytes()
        assert len(logical) == entry['raw_bytes'] and digest(logical) == entry['raw_sha256'], name
    build = load(folder / 'build/build-comparison.json')
    candidate = folder / 'build/candidate.so'
    candidate_sha = digest(candidate.read_bytes())
    assert build['returncode'] == 0 and build['source_unchanged'] is True
    assert build['source_sha256'] == build['source_after_sha256']
    assert build['comparison']['candidate_sha256'] == candidate_sha
    assert build['unstripped_sha256'] == digest((folder/'build/unstripped.so').read_bytes())
    assert build['build_log_sha256'] == digest((folder/'build/build.log').read_bytes())
    for name, expected in build['source_sha256'].items():
        relative = name[name.index('programs/pump-amm/'):]
        assert digest((folder/'source'/relative).read_bytes()) == expected, name
        if args.current_source:
            assert digest((ROOT/relative).read_bytes()) == expected, name
    summary = load(folder/'runtime/summary.json')
    assert summary['candidate_sha256'] == candidate_sha and summary['mismatches'] == []
    assert (summary['suites'], summary['cases'], summary['transactions'], summary['signatures']) == (25,17462,35074,35418)
    from solders.transaction import Transaction
    count, signatures, cases = 0, 0, 0
    for row in load(folder/'runtime/progress.json'):
        suite = row['suite']
        receipt_path = folder/'runtime'/(suite+'.json')
        if not receipt_path.exists():
            receipt_path = receipt_path.with_suffix('.json.gz')
        receipt = load(receipt_path)
        assert digest(raw(receipt_path)) == row['receipt_sha256']
        assert row['returncode'] == 0 and receipt['mismatches'] == []
        assert receipt['candidate_sha256'] == candidate_sha and receipt['original_sha256'] == summary['original_sha256']
        assert receipt['case_count'] == row['case_count'] == len(receipt['cases'])
        cases += receipt['case_count']
        sidecar = folder/'runtime'/(suite+'-transactions.json.gz')
        assert digest(sidecar.read_bytes()) == row['sidecar_sha256']
        observations = load(sidecar)
        assert observations['transaction_count'] == len(observations['transactions']) == row['transactions']
        subtotal = 0
        for tx in observations['transactions']:
            encoded = base64.b64decode(tx['transaction_base64'], validate=True)
            transaction = Transaction.from_bytes(encoded)
            assert bytes(transaction) == encoded and digest(encoded) == tx['transaction_sha256']
            assert all(transaction.verify_with_results()) and len(transaction.signatures) == tx['signature_count']
            assert tx['amm_program_sha256'] in (candidate_sha, summary['original_sha256'])
            subtotal += len(transaction.signatures)
        assert subtotal == observations['signature_count'] == row['signatures']
        count += row['transactions']
        signatures += subtotal
    assert (cases,count,signatures) == (17462,35074,35418)
    sys.path.insert(0, str(ROOT/'repro/pump_amm/boost-burn-diagnostics'))
    import verify_boost
    if args.variant == 'liquidity':
        spec = importlib.util.spec_from_file_location('expanded_admission', HERE/'expanded_probe.py')
        expanded = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(expanded)
        verify_boost.check_build = expanded.check_expanded
    focused = verify_boost.validate(load(folder/'focused/runtime.json.gz'), ROOT,
                                   candidate.read_bytes(), (folder/'focused/build-record.json').read_bytes())
    if args.variant == 'liquidity':
        spec = importlib.util.spec_from_file_location('liquidity_numeric_probe', ROOT/'repro/pump_amm/liquidity-numeric-diagnostics-20261026/probe.py')
        liquidity = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(liquidity)
        liquidity.validate(load(folder/'liquidity-focused.json.gz'), candidate,
                           folder/'source/programs/pump-amm/src/lib.rs', folder/'build/build-comparison.json')
    print(json.dumps({'variant':args.variant,'retained_files':len(manifest),'candidate_sha256':candidate_sha,
                      'cases':cases,'transactions':count,'independently_verified_signatures':signatures,
                      'focused_cases':52+(13 if args.variant=='liquidity' else 0),
                      'current_source_checked':args.current_source,'whole_original_identity':False}))


if __name__ == '__main__':
    main()
