#!/usr/bin/env python3
"""Verify ordinary sources, or explicitly remeasure two locally compiled ELFs."""
import argparse
import difflib
import hashlib
import importlib.util
import json
import subprocess
from pathlib import Path, PurePosixPath

HERE = Path(__file__).resolve().parent
ROOT = next(p for p in HERE.parents if (p / '.git').exists())
SOURCE = 'src/tools/donate/shared.rs'


def sha(data):
    return hashlib.sha256(data).hexdigest()


def read(path):
    return json.loads(path.read_bytes())


def safe_path(folder, name):
    relative = PurePosixPath(name)
    assert name and not relative.is_absolute() and str(relative) == name
    assert '..' not in relative.parts and '\\' not in name and ':' not in name
    path = folder
    for part in relative.parts:
        path = path / part
        assert not path.is_symlink()
    assert path.resolve().is_relative_to(folder.resolve())
    return path


def sources():
    before = {}
    for name, row in read(HERE / 'baseline-sources.json').items():
        safe_path(HERE, name)
        safe_path(ROOT, row['path'])
        revision = row['revision']
        assert len(revision) == 40 and all(c in '0123456789abcdef' for c in revision)
        data = subprocess.check_output(['git', '--no-optional-locks', 'show', revision + ':' + row['path']], cwd=ROOT)
        assert sha(data) == row['sha256'], name
        before[name] = data
    assert len(before) == 60
    after = dict(before)
    after[SOURCE] = (HERE / 'source' / SOURCE).read_bytes()
    assert {n: sha(b) for n, b in after.items()} == read(HERE / 'source-inputs.json')
    patch = ''.join(difflib.unified_diff(before[SOURCE].decode().splitlines(True), after[SOURCE].decode().splitlines(True), fromfile='a/' + SOURCE, tofile='b/' + SOURCE))
    assert patch.encode() == (HERE / 'source.patch').read_bytes()
    assert after[SOURCE] == before[SOURCE].replace(b'pub struct DonationContext', b'pub struct DonateContext') + (
        b"\n/// Compatibility name for callers of the reconstructed shared donation worker.\n"
        b"pub type DonationContext<'a,'info> = DonateContext<'a,'info>;\n")
    return before, after


def materialize(destination, source):
    assert not destination.exists() and not destination.is_symlink()
    assert not any(p.is_symlink() for p in destination.parents)
    destination.mkdir(parents=True)
    for name, data in source.items():
        path = safe_path(destination, name)
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(data)
    assert {p.relative_to(destination).as_posix(): sha(p.read_bytes()) for p in destination.rglob('*') if p.is_file()} == {n: sha(b) for n, b in source.items()}


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


def measure(baseline, candidate):
    for name, digest in read(HERE / 'comparison-inputs.json').items():
        assert sha(safe_path(ROOT, name).read_bytes()) == digest, name
    parser = module('raw_recovery_parser', ROOT / 'repro/donation-relay/swap-receipt-coordinate-recovery/analyze.py')
    comparison = module('raw_recovery_comparison', ROOT / 'repro/donation-relay/settlement-bodies-source-proposal/compare.py')
    before, _ = comparison.analysis(parser, baseline)
    after, paths = comparison.analysis(parser, candidate)
    report = {'baseline': comparison.compact(before), 'candidate': comparison.compact(after)}
    report['transitions'] = {}
    for kind in ['raw', 'normalized']:
        old = set(report['baseline']['inventories'][kind])
        new = set(report['candidate']['inventories'][kind])
        report['transitions'][kind] = {'gains': sorted(new - old), 'losses': sorted(old - new)}
    assert report['transitions'] == {'raw': {'gains': [51, 52, 112], 'losses': []}, 'normalized': {'gains': [], 'losses': []}}
    report['raw_gains'] = []
    for ordinal in [51, 52, 112]:
        original = after['original-function-ledger.json'][ordinal]
        local = after['candidate-function-ledger.json'][ordinal]
        witness = next(w for w in after['match-witnesses.json'] if (w['original_ordinal'], w['candidate_index']) == (ordinal, ordinal))
        assert witness['raw_body'] and witness['recursive_call_shape_closed'] and not witness['indirect_calls']
        assert original['start'] == local['start'] and original['raw_sha256'] == local['raw_sha256']
        assert all(c['normalized_body_pair'] and c['recursive_call_shape_closed'] for c in witness['direct_calls'])
        report['raw_gains'].append({'ordinal': ordinal, 'start': original['start'], 'bytes': original['bytes'], 'raw_sha256': original['raw_sha256'], 'candidate_names': local['names'], 'direct_calls': witness['direct_calls'], 'data_references': len(witness['data_references'])})
    graph = comparison.data_graph(parser, after, paths['original.so'].read_bytes(), paths['unstripped.so'].read_bytes())
    rows = graph.pop('rows')
    graph['rows_sha256'] = sha((json.dumps(rows, sort_keys=True, indent=2) + '\n').encode())
    report['data_graph'] = graph
    assert graph['full_rodata_equal'] and graph['relocated_data_shape_equal']
    a = parser.Elf((baseline / 'candidate.so').read_bytes())
    b = parser.Elf((candidate / 'candidate.so').read_bytes())
    report['changed_sections_from_baseline'] = [name for name in a.by_name if a.section_bytes(a.by_name[name]) != b.section_bytes(b.by_name[name])]
    return report


def integrity():
    expected = read(HERE / 'manifest.json')
    actual = {p.relative_to(HERE).as_posix() for p in HERE.rglob('*') if p.is_file() and p.name != 'manifest.json' and '__pycache__' not in p.parts}
    assert actual == set(expected)
    for name, digest in expected.items():
        assert sha(safe_path(HERE, name).read_bytes()) == digest, name


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--materialize', type=Path)
    ap.add_argument('--variant', choices=['baseline', 'candidate'], default='candidate')
    ap.add_argument('--baseline-build', type=Path)
    ap.add_argument('--candidate-build', type=Path)
    args = ap.parse_args()
    integrity()
    before, after = sources()
    if args.materialize:
        materialize(args.materialize, before if args.variant == 'baseline' else after)
    assert bool(args.baseline_build) == bool(args.candidate_build), 'Supply both build directories'
    result = {'source_inputs': 60, 'changed_sources': 1, 'compiler_executed': False, 'runtime_verified': False, 'elf_comparison': 'not requested'}
    if args.baseline_build:
        actual = measure(args.baseline_build, args.candidate_build)
        assert actual == read(HERE / 'expected.json')
        result['elf_comparison'] = {'raw': 320, 'normalized': 492, 'raw_gains': [51, 52, 112], 'losses': [], 'whole_file_equal': False}
    print(json.dumps(result, sort_keys=True))


if __name__ == '__main__':
    main()
