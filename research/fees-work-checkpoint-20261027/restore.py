#!/usr/bin/env python3
"""Verify or restore a content-addressed Fees research checkpoint; execute no saved code."""
from pathlib import Path, PurePosixPath
import argparse
import gzip
import hashlib
import io
import json
import os
import re
import shutil
import subprocess
import tarfile
import tempfile

HERE = Path(__file__).resolve().parent


def safe(name):
    path = PurePosixPath(name)
    assert not path.is_absolute() and '..' not in path.parts and str(path) == name
    return path


def verify_or_restore(output=None, prefix=''):
    manifest = json.loads((HERE / 'archive-manifest.json').read_bytes())
    packed_index = (HERE / 'index.json.gz').read_bytes()
    assert hashlib.sha256(packed_index).hexdigest() == manifest['index_gzip_sha256']
    raw_index = gzip.decompress(packed_index)
    assert hashlib.sha256(raw_index).hexdigest() == manifest['index_sha256']
    index = json.loads(raw_index)
    assert index['format'] == manifest['format'] == 'FEES_WORK_CHECKPOINT_V1'
    selected = {name: row for name, row in index['files'].items() if name.startswith(prefix)}
    for name in selected:
        safe(name)
    if output is not None:
        assert selected, 'No paths match this prefix'
        assert not output.exists(), 'Use a new destination directory'
        output.mkdir(parents=True)
    assert shutil.which('zstd'), 'Install the zstd command to decode this checkpoint'
    by_blob = {}
    for name, row in selected.items():
        by_blob.setdefault(row['blob'], []).append((name, row))
    seen = set()
    restored = 0
    with tempfile.TemporaryFile() as joined:
        whole = hashlib.sha256()
        for row in manifest['parts']:
            path = HERE / str(safe(row['path']))
            data = path.read_bytes()
            assert len(data) == row['bytes']
            assert hashlib.sha256(data).hexdigest() == row['sha256']
            joined.write(data)
            whole.update(data)
        assert whole.hexdigest() == manifest['archive_sha256']
        assert joined.tell() == manifest['archive_bytes']
        joined.seek(0)
        process = subprocess.Popen(['zstd', '-d', '-q', '-c'], stdin=joined, stdout=subprocess.PIPE)
        try:
            with tarfile.open(fileobj=process.stdout, mode='r|') as archive:
                found_index = False
                for member in archive:
                    assert member.isfile(), member.name
                    stream = archive.extractfile(member)
                    data = stream.read()
                    assert len(data) == member.size
                    if member.name == 'INDEX.json':
                        assert not found_index and data == raw_index
                        found_index = True
                        continue
                    assert re.fullmatch(r'blobs/[0-9a-f]{64}', member.name), member.name
                    digest = member.name.removeprefix('blobs/')
                    assert digest not in seen and digest in index['blobs']
                    assert hashlib.sha256(data).hexdigest() == digest
                    assert len(data) == index['blobs'][digest]
                    seen.add(digest)
                    if output is not None:
                        for name, row in by_blob.get(digest, []):
                            assert len(data) == row['bytes']
                            target = output / str(safe(name))
                            target.parent.mkdir(parents=True, exist_ok=True)
                            target.write_bytes(data)
                            target.chmod(row['mode'] & 0o777)
                            if row.get('mtime_ns'):
                                os.utime(target, ns=(row['mtime_ns'], row['mtime_ns']))
                            restored += 1
                assert found_index
            assert process.wait() == 0, 'zstd decompression failed'
        finally:
            process.stdout.close()
            if process.poll() is None:
                process.terminate()
                process.wait()
    assert seen == set(index['blobs'])
    assert len(index['files']) == manifest['files']
    if output is not None:
        assert restored == len(selected)
    return {'verified': True, 'files': manifest['files'], 'unique_blobs': len(seen),
            'restored_files': restored, 'base_commit': index['base_commit'],
            'acceptance': 'Research checkpoint only; individual trial results remain authoritative'}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, help='New directory in which to restore files')
    parser.add_argument('--prefix', default='', help='Restore only paths beginning with this prefix')
    parser.add_argument('--list', action='store_true', help='List indexed paths without extracting payloads')
    args = parser.parse_args()
    if args.list:
        index = json.loads(gzip.decompress((HERE / 'index.json.gz').read_bytes()))
        print('\n'.join(name for name in sorted(index['files']) if name.startswith(args.prefix)))
    else:
        print(json.dumps(verify_or_restore(args.output, args.prefix), indent=2))
