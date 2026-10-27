"""Hash-authenticated source reconstruction from the checked-in public files.

Historical revisions remain provenance identifiers. No Git object, network,
compiler, executable artifact or runtime receipt is read by this module.
"""
from pathlib import Path, PurePosixPath
import difflib
import hashlib
import json

PACKAGE = 'repro/donation-relay/donation-wrapper-source-proposal'
ORDER = ['baseline', 'native490', 'complete492']
MANIFEST_SHA256 = '9f02988c5b30b463c94dd8af27133757240763c30c3750c1fdbc44352be20e76'

def digest(data):
    return hashlib.sha256(data).hexdigest()

def safe_file(root, name):
    relative = PurePosixPath(name)
    assert name and str(relative) == name and not relative.is_absolute()
    assert '..' not in relative.parts and '\\' not in name and name != '.'
    root = Path(root).absolute()
    assert not any(p.is_symlink() for p in [root, *root.parents])
    path = root
    for part in relative.parts:
        path /= part
        assert not path.is_symlink(), name
    assert path.is_file() and path.resolve().is_relative_to(root.resolve()), name
    return path

def raw(root, name):
    return safe_file(root, name).read_bytes()

def document(root, name):
    return json.loads(raw(root, name))

def reconstruct(root):
    """Return the unchanged three exact 60-input maps, without historical Git."""
    root = Path(root)
    package = root / PACKAGE
    sealed = raw(root, PACKAGE + '/manifest.json')
    assert digest(sealed) == MANIFEST_SHA256, 'historical source manifest'
    manifest = json.loads(sealed)
    members = list(package.rglob('*'))
    assert not any(p.is_symlink() for p in members)
    actual = {p.relative_to(package).as_posix() for p in members
              if p.is_file() and p.name != 'manifest.json' and '__pycache__' not in p.parts}
    assert actual == set(manifest)
    for name, expected in manifest.items():
        data = raw(package, name)
        assert digest(data) == expected, name
        assert b'\0' not in data
        data.decode('utf-8')
        assert not name.endswith(('.so', '.gz', '.bz2', '.zip', '.tar'))
    before = {}
    for name, row in document(package, 'baseline-sources.json')['files'].items():
        # Validate logical names too; materialization must never escape its root.
        logical = PurePosixPath(name)
        assert name and str(logical) == name and not logical.is_absolute()
        assert '..' not in logical.parts and '\\' not in name and name != '.'
        assert set(row) == {'revision', 'path', 'sha256'}
        assert len(row['revision']) == 40 and all(c in '0123456789abcdef' for c in row['revision'])
        data = raw(root, row['path'])
        assert digest(data) == row['sha256'], ('public source hash', name)
        before[name] = data
    assert len(before) == 60
    spec = document(package, 'variants.json')
    assert spec['order'] == ORDER and set(spec['variants']) == set(ORDER)
    result = {}
    previous = None
    for label in ORDER:
        meta = spec['variants'][label]
        assert meta['parent'] == previous
        source = dict(result[previous] if previous else before)
        old = dict(source)
        folder = package / 'overrides' / label
        changed = {p.relative_to(folder).as_posix() for p in folder.rglob('*') if p.is_file()}
        assert changed == set(meta['changed_files'])
        for name in changed:
            source[name] = raw(folder, name)
            assert source[name] != old[name]
        assert len(source) == 60 and {n: digest(b) for n, b in source.items()} == meta['files']
        if previous:
            patch = ''.join(''.join(difflib.unified_diff(
                old.get(n, b'').decode().splitlines(True), source[n].decode().splitlines(True),
                fromfile='a/' + n, tofile='b/' + n))
                for n in sorted(source) if old.get(n) != source[n])
            assert patch.encode() == raw(package, label + '.patch')
        result[label] = source
        previous = label
    return result
