"""Negative evidence controls for the current Social V2 union."""
from pathlib import Path
import gzip
import hashlib
import json
import shutil
import subprocess
import sys
import tempfile

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]


def reseal(folder):
    (folder / 'manifest.json').write_text(json.dumps({str(p.relative_to(folder)): hashlib.sha256(p.read_bytes()).hexdigest()
        for p in sorted(folder.rglob('*')) if p.is_file() and p.name != 'manifest.json'}, indent=2) + '\n')


def run():
    parent = ROOT / json.loads((HERE / 'parent.json').read_text())['path']
    for name in ['unsealed-document', 'resealed-parent', 'resealed-missing-case']:
        with tempfile.TemporaryDirectory(prefix='social-v2-union-negative-', dir=ROOT / 'work') as temp:
            folder = Path(temp)
            shutil.copytree(HERE, folder, dirs_exist_ok=True)
            if name == 'unsealed-document':
                with (folder / 'README.md').open('a') as f:
                    f.write('\nUnsealed claim.\n')
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
            else:
                path = folder / 'runtime.json.gz'
                value = json.loads(gzip.decompress(path.read_bytes()))
                value['suites']['sharing_update']['cases'].pop()
                path.write_bytes(gzip.compress(json.dumps(value).encode(), mtime=0))
                reseal(folder)
            result = subprocess.run([sys.executable, '-B', str(folder / 'verify.py')], capture_output=True, text=True)
            assert result.returncode != 0 and 'AssertionError' in result.stderr, (name, result.stdout, result.stderr)
            print('PASS rejected', name)


if __name__ == '__main__':
    run()
