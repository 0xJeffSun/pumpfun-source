#!/usr/bin/env python3
"""Offline verification; archive membership is checked only for supplied archives."""
import argparse
import hashlib
import importlib.util
import json
from pathlib import Path, PurePosixPath
import tarfile

HERE = Path(__file__).resolve().parent


def require(ok, message):
    if not ok:
        raise ValueError(message)


def digest(raw):
    return hashlib.sha256(raw).hexdigest()


def read(path):
    return json.loads(path.read_bytes())


def pin_files(root, rows):
    seen = set()
    for row in rows:
        name = row['path']
        p = PurePosixPath(name)
        require(not p.is_absolute() and '..' not in p.parts and p.as_posix() == name
                and '\\' not in name and ':' not in name and name not in seen, 'invalid input path')
        seen.add(name)
        raw = (root / name).read_bytes()
        require(len(raw) == row['bytes'] and digest(raw) == row['sha256'], 'input bytes differ: ' + name)
        if 'git_blob' in row:
            blob = hashlib.sha1(b'blob ' + str(len(raw)).encode() + b'\0' + raw).hexdigest()
            require(blob == row['git_blob'], 'input Git blob differs: ' + name)


def load_analysis(package=HERE):
    spec = importlib.util.spec_from_file_location('alloc_analysis', package / 'analyze.py')
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def archive_membership(path, host, metadata, objects, elf, package=HERE):
    record = metadata['hosts'][host]
    asset = record['release']
    require(path.stat().st_size == asset['size'], 'release archive size differs')
    with path.open('rb') as stream:
        sha = hashlib.file_digest(stream, 'sha256').hexdigest()
    require(asset['digest'] == 'sha256:' + sha, 'release archive digest differs')
    expected = {record['rlib']['path']: record['rlib'], 'version.md': record['version']}
    selected = {}
    with tarfile.open(path, 'r|bz2') as archive:
        for member in archive:
            name = member.name.removeprefix('./')
            if name not in expected:
                continue
            require(member.isfile() and name not in selected, 'invalid/duplicate release member')
            raw = archive.extractfile(member).read()
            row = expected[name]
            require(len(raw) == row['bytes'] and digest(raw) == row['sha256'], 'release member differs')
            selected[name] = raw
    require(set(selected) == set(expected), 'release member missing')
    require(selected['version.md'] == (package / 'version.md').read_bytes(), 'version metadata differs')
    members = []
    for name, offset, raw in elf.ar_members(selected[record['rlib']['path']]):
        if not raw.startswith(b'\x7fELF'):
            continue
        identity = digest(raw)
        members.append(dict(name=name, offset=offset, bytes=len(raw), sha256=identity))
        require(objects.get(host + '/' + identity + '.o') == raw, 'embedded object bytes differ')
    require(members == record['objects'], 'rlib ELF membership differs')
    return dict(archive_sha256=sha, all_elf_members=len(members), release_membership_rechecked=True)


def verify(repo, package=HERE, archives=None):
    manifest = read(package / 'manifest.json')
    actual = {p.relative_to(package).as_posix() for p in package.rglob('*')
              if p.is_file() and p.name != 'manifest.json' and '__pycache__' not in p.parts}
    require(actual == {r['path'] for r in manifest['files']}, 'package membership differs')
    pin_files(package, manifest['files'])
    pin_files(repo, read(package / 'inputs.json')['files'])
    metadata = read(package / 'provenance.json')
    source = metadata['source']
    raw = (package / source['path']).read_bytes()
    require(digest(raw) == source['sha256'], 'Rust source bytes differ')
    require(hashlib.sha1(b'blob ' + str(len(raw)).encode() + b'\0' + raw).hexdigest() == source['git_blob'],
            'Rust source Git blob differs')
    require((package / 'version.md').read_text().split()[0] == metadata['rust_revision'], 'Rust revision differs')
    analysis = load_analysis(package)
    result = analysis.derive(repo, package)
    require(result == read(package / 'findings.json'), 'regenerated findings differ')
    archive_checks = {host: dict(release_membership_rechecked=False) for host in metadata['hosts']}
    if archives:
        elf, _ = analysis.helpers(repo)
        objects = analysis.load_objects(package)
        for host, path in archives.items():
            archive_checks[host] = archive_membership(path, host, metadata, objects, elf, package)
    return dict(raw_capture_ranges=result['raw_capture_ranges'], new_raw_ranges=0,
                paired_linked_functions=sum(len(r['selected_type_id']['linked_functions']) for r in result['hosts'].values()),
                retained_objects=sum(len(r['objects']) for r in metadata['hosts'].values()),
                raw_host_difference_bytes=len(result['host_body_differing_offsets']),
                archive_checks=archive_checks, compiler_linker_or_vm_executions=0,
                historical_type_identity_proven=False)


if __name__ == '__main__':
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--repo', type=Path, default=HERE.parents[1])
    ap.add_argument('--linux-archive', type=Path)
    ap.add_argument('--darwin-archive', type=Path)
    args = ap.parse_args()
    archives = {h: p for h, p in [('linux', args.linux_archive), ('darwin', args.darwin_archive)] if p}
    print(json.dumps(verify(args.repo, archives=archives), indent=2))
