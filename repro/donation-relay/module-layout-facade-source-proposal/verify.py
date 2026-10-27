#!/usr/bin/env python3
"""Check a source-only layout packet; optionally remeasure locally retained ELFs."""
from pathlib import Path, PurePosixPath
import argparse
import hashlib
import importlib.util
import json
import shutil
import tempfile

HERE = Path(__file__).resolve().parent
ORDER = ['natural483-metadata', 'event-modules', 'instruction-modules', 'state-modules', 'security-order', 'anchor-facade']


def sha(data):
    return hashlib.sha256(data).hexdigest()


def read(path):
    return json.loads(path.read_bytes())


def safe(name):
    path = PurePosixPath(name)
    assert name and str(path) == name and not path.is_absolute()
    assert all(part not in ('', '.', '..') for part in path.parts)
    assert '\\' not in name and '\0' not in name
    return path


def manifest(folder=HERE):
    expected = read(folder / 'manifest.json')
    actual = {str(p.relative_to(folder)) for p in folder.rglob('*')
              if p.is_file() and p.name != 'manifest.json' and '__pycache__' not in p.parts}
    assert actual == set(expected)
    for name, digest in expected.items():
        path = folder / safe(name)
        assert not path.is_symlink() and path.resolve().is_relative_to(folder.resolve())
        assert sha(path.read_bytes()) == digest, name
        assert not path.read_bytes().startswith(b'\x7fELF'), 'ELF payload forbidden in source-only packet'
    assert not any(name.endswith(('.so', '.gz', '.zip', '.tar')) for name in actual)


def variants(folder=HERE):
    description = read(folder / 'variants.json')
    assert description['order'] == ORDER
    result = {}
    for i, label in enumerate(ORDER):
        info = description['variants'][label]
        assert info['parent'] == (ORDER[i - 1] if i else None)
        source = dict(result[ORDER[i - 1]]) if i else {}
        inputs = folder / ('base-source' if not i else 'overrides/' + label)
        overrides = {str(p.relative_to(inputs)): p.read_bytes() for p in inputs.rglob('*') if p.is_file()}
        assert sorted(overrides) == info['changed_source_files']
        assert all(name == str(safe(name)) for name in overrides)
        if i:
            assert set(overrides) <= set(source)
            assert all(source[name] != value for name, value in overrides.items())
        source.update(overrides)
        assert len(source) == 60
        assert {name: sha(value) for name, value in source.items()} == info['source_files']
        assert source['src/lib.rs'].splitlines()[35] == b'#[program]'
        for name in ('donation_epoch_closed', 'donation_epoch_just_swapped', 'donation_epoch_processed', 'donation_made'):
            assert source['src/events/v1/' + name + '.rs'].splitlines()[4] == b'#[event]'
        assert b'10000u32' in source['src/settlement_handlers.rs']
        assert b'solana-security-txt = "=1.1.3"' in source['Cargo.toml']
        result[label] = source
    assert result['security-order']['src/lib.rs'].splitlines()[17] == b'mod embedded_security;'
    assert result['state-modules']['src/lib.rs'].splitlines()[110] == b'mod embedded_security;'
    return result


def static_reports(folder=HERE):
    sources = variants(folder)
    previous = None
    for label, raw_count in zip(ORDER, [127, 127, 134, 134, 134, 142]):
        base = folder / 'measurements' / label
        report = read(base / 'report.json')
        assert report['source_files'] == {n: sha(b) for n, b in sources[label].items()}
        summary = report['summary']
        assert summary['original_normalized_match_windows'] == 483
        assert summary['original_raw_match_windows'] == raw_count
        assert summary['recursive_call_shape_closed_pairs'] == 644
        assert not summary['whole_file_equal']
        assert len(report['match_inventories']['normalized']) == 483
        assert len(report['match_inventories']['raw']) == raw_count
        for kind in ['normalized', 'raw']:
            before = set(previous['match_inventories'][kind]) if previous else set(report['match_inventories'][kind])
            after = set(report['match_inventories'][kind])
            assert report['transitions'][kind] == {'gained': sorted(after - before), 'lost': sorted(before - after)}
        assert report['transitions']['normalized'] == {'gained': [], 'lost': []}
        previous = report
    assert len(previous['transitions']['raw']['lost']) == 0
    for section in previous['sections']:
        assert section['length_delta'] == (320 if section['name'] == '.text' else 0)
    return sources


def materialize(destination, label, sources):
    assert label in sources and not destination.exists()
    assert not any(p.is_symlink() for p in [destination.parent, *destination.parents])
    destination.mkdir(parents=True)
    for name, data in sources[label].items():
        path = destination / safe(name)
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(data)
    assert {str(p.relative_to(destination)): sha(p.read_bytes()) for p in destination.rglob('*') if p.is_file()} == {n: sha(b) for n, b in sources[label].items()}


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


def verify_local(root, work, folder=HERE):
    """Optional: only reads preexisting local ELFs, never executes target code."""
    inputs = read(folder / 'comparison-inputs.json')
    for path, digest in inputs.items():
        assert sha((root / path).read_bytes()) == digest
    name = 'repro/donation-relay/swap-receipt-coordinate-recovery/analyze.py'
    assert sha((root / name).read_bytes()) == inputs[name]
    parser = module('natural_layout_parser', root / name)
    for label in ORDER:
        report = read(folder / 'measurements' / label / 'report.json')
        original = root / 'evidence/dependencies/donation_relay/deployed.so'
        candidate = work / (label + '-build01') / 'candidate.so'
        symbols = work / (label + '-build01') / 'symbols.so'
        assert sha(original.read_bytes()) == report['summary']['original_sha256']
        assert sha(candidate.read_bytes()) == report['summary']['candidate_sha256']
        assert sha(symbols.read_bytes()) == report['summary']['unstripped_sha256']
        with tempfile.TemporaryDirectory() as temporary:
            output = Path(temporary)
            for path, name in [(original, 'original.so'), (candidate, 'candidate.so'), (symbols, 'unstripped.so'), (root / 'repro/donation-relay/swap-receipt-coordinate-recovery/original-windows.json', 'original-windows.json')]:
                shutil.copyfile(path, output / name)
            analysis = parser.analyze(output)
        assert analysis['comparison-summary.json'] == report['summary']
        assert analysis['section-comparison.json'] == report['sections']
        inventories = {kind: [r['ordinal'] for r in analysis['match-ledger.json'] if r[kind + '_candidate_indices']] for kind in ['normalized', 'raw']}
        assert inventories == report['match_inventories']
        if label == 'security-order':
            assert all(r['ordinal'] in r['normalized_candidate_indices'] for r in analysis['match-ledger.json'][117:174])
    return {'local_images_remeasured': 6, 'target_program_executed': False}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--materialize', type=Path)
    parser.add_argument('--variant', choices=ORDER, default='anchor-facade')
    parser.add_argument('--verify-local', type=Path, metavar='WORK_RELAY_LAYOUT')
    parser.add_argument('--repo-root', type=Path)
    args = parser.parse_args()
    manifest()
    sources = static_reports()
    if args.materialize:
        materialize(args.materialize, args.variant, sources)
    result = {'source_variants': 6, 'inputs_per_variant': 60, 'runtime_verified': False, 'compiler_executed': False, 'scope': 'Source/static metadata verified; local ELF comparison is opt-in. No build or replay receipts are included or consumed.'}
    if args.verify_local:
        assert args.repo_root
        result.update(verify_local(args.repo_root.resolve(), args.verify_local.resolve()))
    print(json.dumps(result, indent=2))


if __name__ == '__main__':
    main()
