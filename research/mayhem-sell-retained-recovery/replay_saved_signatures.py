"""Repeat the frozen offline receipt checks in a temporary tree; no VM or RPC."""
if not __debug__:
    raise RuntimeError('Optimized Python disables evidence assertions')
import argparse
import gzip
import hashlib
import json
from pathlib import Path
import subprocess
import tarfile
import tempfile
import verify

P = Path(__file__).resolve().parent
sha = lambda b: hashlib.sha256(b).hexdigest()


def unpack(archive, target):
    seen = set()
    with tarfile.open(archive, 'r:xz') as t:
        for member in t:
            name = Path(member.name)
            assert member.isfile() and not name.is_absolute() and '..' not in name.parts
            assert member.name not in seen
            seen.add(member.name)
            data = t.extractfile(member).read()
            path = target / name
            path.parent.mkdir(parents=True, exist_ok=True)
            if path.exists():
                assert path.is_file() and path.read_bytes() == data
            else:
                path.write_bytes(data)


def replay(python):
    verify.manifest_check()
    for name, digest in verify.load(P / 'scope.json')['root_inputs'].items():
        assert sha((verify.ROOT / name).read_bytes()) == digest
    version = subprocess.run([str(python), '-I', '-B', '-c',
        'from importlib.metadata import version; print(version("solders"))'],
        capture_output=True, text=True, check=True).stdout.strip()
    assert version == '0.27.1'
    reports = []
    with tempfile.TemporaryDirectory() as directory:
        root = Path(directory)
        original = root / 'evidence/original/mayhem/deployed.so'
        original.parent.mkdir(parents=True)
        original.write_bytes((verify.ROOT / 'evidence/original/mayhem/deployed.so').read_bytes())
        original.chmod(0o444)
        unpack(P / 'runtime/harness.tar.xz', root)
        unpack(P / 'runtime/executed-inputs.tar.xz', root)
        unpack(P / 'runtime/union.tar.xz', root / 'receipts')
        candidate = root / 'candidate.so'
        candidate.write_bytes(gzip.decompress((P / 'captures/sell-retained-initializer-union/candidate.so.gz').read_bytes()))
        assert sha(candidate.read_bytes()) == '1f944954160df6b0ab60f15180cdaa451167f16f950eeb65a098a329fb32a3bf'
        candidate.chmod(0o444)
        for row in verify.load(root / 'receipts/summary.json'):
            output = root / (row['name'] + '-recheck.json')
            command = [str(python), '-I', '-B', str(root / 'scripts/verify_mayhem_pump_swap.py'),
                '--candidate', str(candidate), '--receipts', str(root / 'receipts' / (row['name'] + '.json')),
                '--output', str(output)]
            run = subprocess.run(command, cwd=root, capture_output=True, check=True)
            report = verify.load(output)
            assert report == row['independent']
            reports.append(dict(name=row['name'], report=report,
                stdout_sha256=sha(run.stdout), stderr_sha256=sha(run.stderr)))
    assert sum(r['report']['case_count'] for r in reports) == 1239
    assert sum(r['report']['verified_signed_transactions'] for r in reports) == 2478
    return dict(solders_version=version, scope=__doc__, reports=reports)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--python', type=Path, required=True,
                        help='Explicit existing Python with Solders 0.27.1; nothing is installed.')
    parser.add_argument('--output', type=Path)
    args = parser.parse_args()
    # Keep a virtualenv's executable symlink path: resolving it selects the
    # base interpreter and discards that environment's installed dependencies.
    result = replay(args.python.absolute())
    text = json.dumps(result, indent=2) + '\n'
    if args.output:
        with args.output.open('x') as stream:
            stream.write(text)
    else:
        print(text, end='')
