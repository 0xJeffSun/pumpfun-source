#!/usr/bin/env python3
import difflib
import hashlib
import json
from pathlib import Path
import tarfile

P = Path(__file__).resolve().parent
ROOT = P.parents[2]
H = lambda data: hashlib.sha256(data).hexdigest()


def archive(path):
    with tarfile.open(path) as tar:
        return {m.name: tar.extractfile(m).read() for m in tar.getmembers() if m.isfile()}


def verify():
    parent = archive(ROOT / 'repro/pump/metaplex-utilize-positive-guard-source-recovery/proposed-source.tar.gz')
    baseline = archive(P / 'baseline-source.tar.gz')
    proposed = archive(P / 'proposed-source.tar.gz')
    inputs = json.loads((P / 'source-inputs.json').read_text())
    delta = json.loads((P / 'local-delta.json').read_text())
    assert {n: H(b) for n, b in baseline.items()} == inputs['baseline']
    assert {n: H(b) for n, b in proposed.items()} == inputs['patched']
    assert proposed.keys() == baseline.keys() == parent.keys()
    name = delta['only_changed_file_vs_reviewed_guard']
    assert len(proposed) == 18
    assert all(proposed[n] == parent[n] for n in proposed if n != name)
    before = (P / 'utilize.before.rs').read_text()
    after = (P / 'utilize.proposed.rs').read_text()
    assert before.encode() == parent[name] and after.encode() == proposed[name]
    assert H(before.encode()) == delta['before_sha256'] and H(after.encode()) == delta['after_sha256']
    fragment = '''    let remaining_uses = if metadata_uses.remaining >= number_of_uses {
        metadata_uses.remaining - number_of_uses
    } else {
        return Err(MetadataError::NotEnoughUses.into());
    };
'''
    assert before.count(fragment) == 1
    prefix, rest = before.split(fragment)
    assert rest.endswith('    Ok(())\n}\n')
    expected = prefix + '''    if metadata_uses.remaining < number_of_uses {
        Err(MetadataError::NotEnoughUses.into())
    } else {
        let remaining_uses = metadata_uses.remaining - number_of_uses;
''' + ''.join('    ' + line if line.strip() else line for line in rest[:-2].splitlines(True)) + '    }\n}\n'
    assert after == expected
    patch = ''
    for path in sorted(proposed):
        if proposed[path] != baseline[path]:
            patch += 'diff --git a/' + path + ' b/' + path + '\n'
            patch += ''.join(difflib.unified_diff(baseline[path].decode().splitlines(True),
                                                  proposed[path].decode().splitlines(True),
                                                  fromfile='a/' + path, tofile='b/' + path))
    assert patch == (P / 'source.patch').read_text()
    builder = (ROOT / 'scripts/pump_build_token_dependency.py').read_text()
    builder = builder.replace('ROOT=pathlib.Path(__file__).resolve().parents[1]',
                               'ROOT=pathlib.Path(__file__).resolve().parents[3]\nimport sys\nsys.path.insert(0,str(ROOT/"scripts"))')
    builder = builder.replace('metaplex-utilize-positive-guard', 'metaplex-tail-guard')
    builder = builder.replace('metaplex_utilize_positive_guard', 'metaplex_tail_guard')
    builder = builder.replace('Reviewed positive-guard source hypothesis; unaccepted and not historically attributed.',
                               'Tail-error guard source-layout hypothesis; unaccepted, not historical source.')
    builder = builder.replace('Test the reviewed positive remaining-use guard over candidate12',
                               'Test error-first tail guard around the unchanged success continuation')
    assert builder == (P / 'build.py').read_text()
    print(json.dumps(dict(verified=True, changed_public_source_files_vs_parent=1,
                          unchanged_success_statements=True, compiled=False, byte_identity=False)))


if __name__ == '__main__':
    verify()
