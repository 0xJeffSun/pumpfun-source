#!/usr/bin/env python3
"""Verify the archive envelope, then recompute its original static source checks."""
from pathlib import Path, PurePosixPath
import hashlib
import json
import os
import shutil
import stat
import subprocess
import sys
import tarfile
import tempfile

sys.dont_write_bytecode = True
P = Path(__file__).resolve().parent
ORIGINAL_SEAL = '1e2896882e16eecd9fde684c2e3ae5bdc699ac6eb231f74389904dedc84aaf15'
BASELINE = 'c1ffdd0667608d4755227e68aab9f27a7e9a0d37'
sha = lambda b: hashlib.sha256(b).hexdigest()


def safe_name(name, allow_cache=False):
    p = PurePosixPath(name)
    assert name and not p.is_absolute() and str(p) == name, ('unsafe name', name)
    assert all(x not in ('', '.', '..') for x in p.parts), ('unsafe name', name)
    assert '\\' not in name and not name.endswith('-keypair.json'), ('excluded name', name)
    if not allow_cache:
        assert '__pycache__' not in p.parts and p.suffix not in ('.pyc', '.pyo'), ('loose cache', name)
    return p


def tree(root):
    files = {}
    # Reject nonregular/excluded files before any read/hash of their bytes.
    for f in root.rglob('*'):
        name = f.relative_to(root).as_posix()
        safe_name(name)
        mode = f.lstat().st_mode
        assert stat.S_ISDIR(mode) or stat.S_ISREG(mode), ('nonregular path', name)
        if stat.S_ISREG(mode): files[name] = f
    return files


def verify():
    files = tree(P)
    seal = (P / 'manifest.json').read_bytes()
    assert sha(seal) == (P / 'manifest.sha256').read_text().strip(), 'envelope seal'
    manifest = json.loads(seal)
    expected = manifest['files']
    assert set(files) == set(expected) | {'manifest.json', 'manifest.sha256'}, 'envelope file set'
    for name, rec in expected.items():
        safe_name(name)
        data = files[name].read_bytes()
        assert len(data) == rec['bytes'] and sha(data) == rec['sha256'], ('envelope bytes', name)
    adaptation = json.loads((P / 'adaptation.json').read_text())
    assert adaptation['original_manifest_sha256'] == ORIGINAL_SEAL
    assert adaptation['original_baseline'] == BASELINE
    assert adaptation['original_payload_files'] == 142 and adaptation['original_total_files'] == 144
    archive_name = adaptation['archive']
    safe_name(archive_name)
    archive_path = P / archive_name
    assert archive_path.stat().st_size == adaptation['archive_bytes']
    assert sha(archive_path.read_bytes()) == adaptation['archive_sha256']
    with tarfile.open(archive_path, mode='r:gz') as archive:
        members = {}
        for member in archive.getmembers():
            safe_name(member.name, allow_cache=True)
            assert member.isfile() and not member.issym() and not member.islnk(), ('archive type', member.name)
            assert member.name not in members, ('duplicate archive member', member.name)
            assert member.size >= 0
            members[member.name] = member
        assert set(members) == set(adaptation['original_member_hashes']), 'archive inventory'
        assert len(members) == 144
        orig_bytes = archive.extractfile(members['manifest.json']).read()
        assert sha(orig_bytes) == ORIGINAL_SEAL, 'original manifest'
        original = json.loads(orig_bytes)
        assert original['revision'] == BASELINE and len(original['files']) == 142
        assert set(members) == set(original['files']) | {'manifest.json', 'manifest.sha256'}
        assert archive.extractfile(members['manifest.sha256']).read().decode().strip() == ORIGINAL_SEAL
        assert orig_bytes == (P / 'original-seal/manifest.json').read_bytes()
        observed = {}
        for name, member in members.items():
            h = hashlib.sha256()
            size = 0
            with archive.extractfile(member) as f:
                while chunk := f.read(1024 * 1024):
                    size += len(chunk); h.update(chunk)
            rec = {'sha256': h.hexdigest(), 'bytes': size}
            assert size == member.size
            assert rec == adaptation['original_member_hashes'][name], ('archived bytes', name)
            if name in original['files']:
                assert rec['sha256'] == original['files'][name], ('original member seal', name)
            observed[name] = rec
        assert sum(r['bytes'] for r in observed.values()) == adaptation['archive_member_bytes']
        caches = sorted(n for n in members if '__pycache__' in PurePosixPath(n).parts or n.endswith('.pyc'))
        assert caches == adaptation['opaque_archived_cache'] == ['__pycache__/analyze.cpython-314.pyc']
        copies = json.loads((P / adaptation['readable_correspondence']).read_text())
        for dest, rec in copies.items():
            safe_name(dest)
            assert rec['archive_member'] in observed
            assert {k: rec[k] for k in ('sha256', 'bytes')} == observed[rec['archive_member']]
            assert expected[dest] == observed[rec['archive_member']], ('readable copy', dest)
        required = {'REPORT.md', 'result.json', 'residual-ledger.json', 'details.json', 'source-tools/verify.py', 'original-seal/manifest.json', 'original-seal/manifest.sha256'}
        assert required <= set(copies), 'required readable views'
        with tempfile.TemporaryDirectory(prefix='pump-layer01-verify-') as tmp:
            tmp = Path(tmp)
            extracted = tmp / 'original'; extracted.mkdir()
            cache = tmp / 'fresh-python-cache'; cache.mkdir()
            for name, member in members.items():
                dest = extracted.joinpath(*PurePosixPath(name).parts)
                dest.parent.mkdir(parents=True, exist_ok=True)
                with archive.extractfile(member) as src, dest.open('xb') as dst:
                    shutil.copyfileobj(src, dst)
            env = dict(os.environ)
            env.pop('PYTHONPATH', None)
            env['PYTHONDONTWRITEBYTECODE'] = '1'
            env['PYTHONPYCACHEPREFIX'] = str(cache)
            # -B prevents new caches; fresh prefix prevents loading the retained one.
            proc = subprocess.run([sys.executable, '-B', str(extracted / 'verify.py')], cwd=tmp, env=env, capture_output=True, text=True)
            if proc.stdout: print(proc.stdout, end='')
            if proc.stderr: print(proc.stderr, end='', file=sys.stderr)
            assert proc.returncode == 0, ('original static verifier', proc.returncode)
            result = json.loads(proc.stdout)
            assert result['status'] == 'PASS' and result['sealed_files'] == 142
            assert result['revision'] == BASELINE and result['whole_file_equal'] is False
            assert not list(cache.rglob('*')), 'unexpected newly written bytecode'
            extracted_files = {f.relative_to(extracted).as_posix(): f for f in extracted.rglob('*') if f.is_file()}
            assert set(extracted_files) == set(observed), 'extracted inventory changed'
            for name, f in extracted_files.items():
                data = f.read_bytes()
                assert len(data) == observed[name]['bytes'] and sha(data) == observed[name]['sha256'], ('extracted file changed', name)
    print(json.dumps({'status': 'PASS', 'envelope_payload_files': len(expected), 'original_payload_files': 142, 'archived_files': 144, 'readable_copies': len(copies), 'original_seal_sha256': ORIGINAL_SEAL, 'archived_cache_loaded': False, 'whole_file_equal': False, 'builds': 0, 'target_executions': 0}, sort_keys=True))


if __name__ == '__main__':
    verify()
