"""Negative evidence controls for the legacy slice recovery."""
from pathlib import Path
import gzip
import hashlib
import json
import shutil
import struct
import subprocess
import sys
import tempfile

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]


def reseal(folder):
    (folder / 'manifest.json').write_text(json.dumps({str(p.relative_to(folder)): hashlib.sha256(p.read_bytes()).hexdigest()
        for p in sorted(folder.rglob('*')) if p.is_file() and p != folder / 'manifest.json'}, indent=2) + '\n')


def run():
    parent = ROOT / json.loads((HERE / 'parent.json').read_text())['path']
    for name in ['unsealed-document', 'unlisted-nested-manifest', 'resealed-parent', 'resealed-missing-case',
                 'resealed-output', 'resealed-missing-match', 'resealed-duplicate-case',
                 'resealed-claim', 'resealed-patch', 'resealed-allocated-section']:
        with tempfile.TemporaryDirectory(prefix='legacy-slice-negative-', dir=ROOT / 'work') as temp:
            folder = Path(temp)
            shutil.copytree(HERE, folder, dirs_exist_ok=True)
            if name == 'unsealed-document':
                with (folder / 'README.md').open('a') as f:
                    f.write('\nUnsealed claim.\n')
            elif name == 'unlisted-nested-manifest':
                (folder / 'builds/manifest.json').write_text('{}\n')
            elif name == 'resealed-parent':
                digests = {}
                for kind in ['candidate', 'symbols']:
                    data = (parent / f'artifacts/candidate-{kind}.so.gz').read_bytes()
                    (folder / f'artifacts/candidate-{kind}.so.gz').write_bytes(data)
                    digests[kind + '_sha256'] = hashlib.sha256(gzip.decompress(data)).hexdigest()
                for label in ['candidate', 'repeat']:
                    path = folder / f'builds/{label}-result.json.gz'
                    value = json.loads(gzip.decompress(path.read_bytes()))
                    value.update(digests)
                    path.write_bytes(gzip.compress(json.dumps(value).encode(), mtime=0))
                reseal(folder)
            elif name.startswith('resealed-') and name not in ['resealed-claim', 'resealed-patch', 'resealed-allocated-section']:
                path = folder / 'runtime.json.gz'
                value = json.loads(gzip.decompress(path.read_bytes()))
                cases = value['suites']['sharing_update']['cases']
                if name == 'resealed-missing-case':
                    cases.pop()
                elif name == 'resealed-output':
                    value['suites']['queries']['cases'][0]['candidate']['fees'][0] += 1
                elif name == 'resealed-missing-match':
                    cases[0].pop('match')
                else:
                    cases[1] = cases[0]
                path.write_bytes(gzip.compress(json.dumps(value).encode(), mtime=0))
                reseal(folder)
            elif name == 'resealed-claim':
                path = folder / 'claims.json'
                value = json.loads(path.read_text())
                value['whole_capture_equal'] = True
                path.write_text(json.dumps(value))
                reseal(folder)
            elif name == 'resealed-patch':
                path = folder / 'source.patch.gz'
                path.write_bytes(gzip.compress(b'Unrelated source delta\n', mtime=0))
                reseal(folder)
            else:
                path = folder / 'artifacts/candidate-symbols.so.gz'
                data = bytearray(gzip.decompress(path.read_bytes()))
                shoff = struct.unpack_from('<Q', data, 40)[0]
                shsize, shnum = struct.unpack_from('<HH', data, 58)
                for i in range(shnum):
                    offset = shoff + i * shsize + 8
                    flags = struct.unpack_from('<Q', data, offset)[0]
                    if flags & 2:
                        struct.pack_into('<Q', data, offset, flags & ~2)
                        break
                else:
                    raise AssertionError('No allocated section to mutate')
                path.write_bytes(gzip.compress(data, mtime=0))
                for label in ['candidate', 'repeat']:
                    record = folder / f'builds/{label}-result.json.gz'
                    value = json.loads(gzip.decompress(record.read_bytes()))
                    value['symbols_sha256'] = hashlib.sha256(data).hexdigest()
                    record.write_bytes(gzip.compress(json.dumps(value).encode(), mtime=0))
                reseal(folder)
            result = subprocess.run([sys.executable, '-B', str(folder / 'verify.py')], capture_output=True, text=True)
            assert result.returncode != 0 and 'AssertionError' in result.stderr, (name, result.stdout, result.stderr)
            print('PASS rejected', name)


if __name__ == '__main__':
    run()
