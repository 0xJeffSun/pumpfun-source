#!/usr/bin/env python3
"""Verify the disclosed formatting-only delta without compiling or extracting tar."""
import difflib
import hashlib
import json
from pathlib import Path
import tarfile

P = Path(__file__).resolve().parent
ROOT = P.parents[2]


def sha(data):
    return hashlib.sha256(data).hexdigest()


def archive(path):
    with tarfile.open(path) as tar:
        return {m.name: tar.extractfile(m).read() for m in tar.getmembers() if m.isfile()}


def verify():
    baseline = archive(P / 'baseline-source.tar.gz')
    proposed = archive(P / 'proposed-source.tar.gz')
    parent = archive(ROOT / 'repro/pump/metaplex-utilize-positive-guard-source-recovery/proposed-source.tar.gz')
    inputs = json.loads((P / 'source-inputs.json').read_text())
    assert {n: sha(b) for n, b in baseline.items()} == inputs['baseline']
    assert {n: sha(b) for n, b in proposed.items()} == inputs['patched']
    assert baseline.keys() == proposed.keys() == parent.keys()
    changes = json.loads((P / 'coordinate-proposal.json').read_text())['changes']
    changed = {row['path'] for row in changes}
    assert len(changed) == 9 and len(proposed) == 18
    for row in changes:
        name = row['path']
        original, new = parent[name], proposed[name]
        assert sha(original) == row['original_sha256']
        assert sha(new) == row['proposed_sha256']
        assert new.startswith(b'\n' * row['added_leading_newlines'])
        restored = new[row['added_leading_newlines']:]
        if name.endswith('/convert_master_edition_v1_to_v2.rs'):
            assert restored.count(b'data[                    data_len - 2]') == 1
            restored = restored.replace(b'data[                    data_len - 2]', b'data[data_len - 2]')
        assert restored == original
        assert not row['historical_whitespace_authenticated']
    assert all(proposed[n] == parent[n] for n in proposed.keys() - changed)
    patch = ''
    for name in sorted(proposed):
        if baseline[name] != proposed[name]:
            patch += 'diff --git a/' + name + ' b/' + name + '\n'
            patch += ''.join(difflib.unified_diff(baseline[name].decode().splitlines(True),
                                                  proposed[name].decode().splitlines(True),
                                                  fromfile='a/' + name, tofile='b/' + name))
    assert patch == (P / 'source.patch').read_text()
    origin = json.loads((P / 'builder-origin.json').read_text())
    source = (ROOT / origin['source']).read_bytes()
    assert sha(source) == origin['source_sha256']
    expected = source.decode().replace(
        'ROOT=pathlib.Path(__file__).resolve().parents[1]',
        'ROOT=pathlib.Path(__file__).resolve().parents[3]\nimport sys\nsys.path.insert(0,str(ROOT/"scripts"))')
    expected = expected.replace('metaplex-utilize-positive-guard', 'metaplex-diagnostic-coordinate')
    expected = expected.replace('metaplex_utilize_positive_guard', 'metaplex_diagnostic_coordinate')
    expected = expected.replace('metaplex-diagnostic-coordinate-source-recovery', 'metaplex-diagnostic-coordinate-recovery')
    expected = expected.replace('Test the reviewed positive remaining-use guard over candidate12',
                                'Reconstruct disclosed source formatting from target diagnostic coordinates')
    expected = expected.replace('Reviewed positive-guard source hypothesis; unaccepted and not historically attributed.',
                                'Explicit diagnostic-coordinate reconstruction over reviewed positive guard; inferred whitespace, not authenticated historical text.')
    assert expected.encode() == (P / 'build.py').read_bytes()
    assert sha(expected.encode()) == origin['builder_sha256']
    print(json.dumps(dict(verified=True, patched_public_source_files=18,
                          formatting_only_changes_vs_reviewed_guard=9,
                          authenticated_historical_whitespace=False, byte_identity=False)))


if __name__ == '__main__':
    verify()
