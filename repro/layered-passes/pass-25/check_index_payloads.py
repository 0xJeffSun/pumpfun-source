"""Check authenticated package payloads against actual Git index objects, read-only."""
import argparse
import hashlib
import json
from pathlib import Path, PurePosixPath
import subprocess
import tempfile


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def check(root, packages):
    expected = {}
    prefixes = []
    for name, seal in packages:
        part = PurePosixPath(name)
        assert not part.is_absolute() and '..' not in part.parts
        package = root / name
        assert not package.is_symlink() and sha(package / 'manifest.json') == seal
        assert (package / 'manifest.sha256').read_text().split()[0] == seal
        for ancestor in [package, *package.parents]:
            if ancestor == root.parent:
                break
            assert not ancestor.is_symlink(), ancestor
        document = json.loads((package / 'manifest.json').read_text())
        files = document.get('files', document)
        actual_files = set()
        for path in package.rglob('*'):
            assert not path.is_symlink() and path.name != '__pycache__' and path.suffix != '.pyc'
            if path.is_file() and path not in [package / 'manifest.json', package / 'manifest.sha256']:
                actual_files.add(str(path.relative_to(package)))
        assert actual_files == set(files), name
        for relative, row in files.items():
            rel = PurePosixPath(relative)
            assert not rel.is_absolute() and '..' not in rel.parts
            path = package / relative
            assert path.is_file() and not path.is_symlink()
            digest = row['sha256'] if isinstance(row, dict) else row
            assert sha(path) == digest, str(path)
            expected[str(path.relative_to(root))] = (digest, path.stat().st_size)
        for relative in ['manifest.json', 'manifest.sha256']:
            path = package / relative
            if path.exists():
                expected[str(path.relative_to(root))] = (sha(path), path.stat().st_size)
        prefixes.append(name)

    def index():
        raw = subprocess.check_output(['git', 'ls-files', '--stage', '-z', '--', *prefixes], cwd=root)
        result = {}
        for record in raw.split(b'\0'):
            if not record:
                continue
            metadata, name = record.split(b'\t', 1)
            mode, oid, stage = metadata.decode().split()
            assert stage == '0' and mode in ['100644', '100755']
            result[name.decode()] = oid
        return result

    before = index()
    missing = sorted(set(expected) - set(before))
    if missing:
        return {'passed': False, 'missing_index_paths': missing, 'expected_paths': len(expected)}
    assert set(before) == set(expected), 'Unexpected tracked package payload'
    objects = {}
    for name, value in expected.items():
        oid = before[name]
        if oid in objects:
            assert objects[oid] == value, (oid, name)
        objects[oid] = value
    with tempfile.TemporaryFile() as queries:
        queries.write(''.join(oid + '\n' for oid in objects).encode())
        queries.seek(0)
        with subprocess.Popen(['git', 'cat-file', '--batch'], cwd=root, stdin=queries,
                              stdout=subprocess.PIPE, stderr=subprocess.PIPE) as process:
            for oid, (digest, size) in objects.items():
                header = process.stdout.readline().decode().strip().split()
                assert header == [oid, 'blob', str(size)], header
                remaining = size
                actual = hashlib.sha256()
                while remaining:
                    block = process.stdout.read(min(1024 * 1024, remaining))
                    assert block, oid
                    actual.update(block)
                    remaining -= len(block)
                assert process.stdout.read(1) == b'\n'
                assert actual.hexdigest() == digest, ('Index content differs', oid)
            assert not process.stdout.read(1)
            error = process.stderr.read().decode()
            assert process.wait() == 0, error
    assert index() == before, 'Index changed during verification'
    return {'passed': True, 'packages': len(packages), 'index_paths': len(expected),
            'distinct_git_blobs': len(objects), 'target_executions': 0}


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--repo', type=Path, required=True)
    parser.add_argument('--package', nargs=2, action='append', required=True, metavar=('PATH', 'SEAL'))
    args = parser.parse_args()
    result = check(args.repo.resolve(), args.package)
    print(json.dumps(result, indent=2))
    raise SystemExit(0 if result['passed'] else 1)
