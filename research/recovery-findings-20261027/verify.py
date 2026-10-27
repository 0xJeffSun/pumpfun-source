#!/usr/bin/env python3
"""Check archived submission bytes and retained runtime counterexamples."""
from pathlib import Path
import gzip
import hashlib
import json
import sys

if not __debug__:
    raise RuntimeError('verification requires assertions')
sys.dont_write_bytecode = True
HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]


def verify():
    manifest = json.loads((HERE / 'submission-manifest.json').read_bytes())
    assert manifest['source_commit'] == 'db0031f6f7bab06c0b3379e3da04fe7193a57d0c'
    folder = HERE / 'submitted'
    paths = list(folder.rglob('*'))
    assert not any(p.is_symlink() for p in paths)
    assert all(p.is_dir() or p.is_file() for p in paths)
    files = {p.relative_to(folder).as_posix(): p for p in paths if p.is_file()}
    assert set(files) == set(manifest['files']) and len(files) == 12
    for name, path in files.items():
        data = path.read_bytes()
        assert manifest['files'][name] == {
            'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest(),
            'git_blob': hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()}
    followups = json.loads((HERE / 'followups.json').read_bytes())
    assert set(followups) == {'265', '265-patches'}
    assert followups['265']['source_commit'] == 'b31f1225db96aae131ab52efba738f50bd9ad9ee'
    assert followups['265']['path'] == 'submitted-followups/pr265.md'
    rows = [followups['265']]
    patch_set = followups['265-patches']
    assert patch_set['source_commit'] == 'd1a8572c9c235458f13e241cb8fe545cf52c5506'
    assert set(patch_set['files']) == {'submitted-followups/pr265-patches/' + name for name in ('APPLY.md', 'fees-pathstring-relocations.diff', 'mayhem-enum-consolidation.diff')}
    rows += [dict(row, path=name) for name, row in patch_set['files'].items()]
    for row in rows:
        path = HERE / row['path']
        assert path.is_file() and not path.is_symlink()
        data = path.read_bytes()
        assert len(data) == row['bytes'] and hashlib.sha256(data).hexdigest() == row['sha256']
        assert hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest() == row['git_blob']
    receipt = json.loads((HERE / 'review-evidence.json').read_bytes())
    assert receipt['submission_commit'] == manifest['source_commit']
    assert len(receipt['sources']) == 2 and len(receipt['observations']) == 6
    reports = {}
    for row in receipt['sources']:
        path = ROOT / row['path']
        data = path.read_bytes()
        assert hashlib.sha256(data).hexdigest() == row['sha256']
        report = json.loads(gzip.decompress(data))
        assert report['original_sha256'] == row['original_sha256']
        assert report['candidate_sha256'] == row['candidate_sha256']
        assert report['mismatches'] == []
        reports[row['path']] = report
    for row in receipt['observations']:
        matches = [case for case in reports[row['source']]['cases'] if case['case'] == row['case']]
        assert len(matches) == 1
        case = matches[0]
        assert case['original']['error'] == row['original_error'] == row['candidate_error'] == case['candidate']['error']
        assert 'InstructionErrorCustom(6012)' in row['original_error']
    results = [json.loads(line) for line in files['sweep/compiler-sweep-results.jsonl'].read_text().splitlines()]
    assert len(results) == 12 and sum(row['ok'] is True for row in results) == 5
    return {'archived_files': 12, 'archived_followups': 2, 'paired_6012_observations': 6,
            'successful_compiler_rows': 5, 'failed_compiler_rows': 7,
            'source_changes_applied': False, 'new_runtime_execution': False}


if __name__ == '__main__':
    print(json.dumps(verify(), indent=2))
