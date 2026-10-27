"""Negative controls for the evidence envelope and claimed body gain."""
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
    (folder / 'manifest.json').write_text(json.dumps({
        str(p.relative_to(folder)): hashlib.sha256(p.read_bytes()).hexdigest()
        for p in sorted(folder.rglob('*')) if p.is_file() and p.name != 'manifest.json'
    }, indent=2) + '\n')


def run():
    for name in ['unsealed-document', 'resealed-no-gain', 'resealed-missing-runtime']:
        with tempfile.TemporaryDirectory(prefix='payout-negative-', dir=ROOT / 'work') as temporary:
            folder = Path(temporary)
            shutil.copytree(HERE, folder, dirs_exist_ok=True)
            if name == 'unsealed-document':
                with (folder / 'README.md').open('a') as out:
                    out.write('\nUnsealed replacement claim.\n')
            elif name == 'resealed-no-gain':
                result_path = folder / 'builds/candidate-result.json.gz'
                result = json.loads(gzip.decompress(result_path.read_bytes()))
                for kind in ['symbols', 'candidate']:
                    baseline = folder / f'artifacts/baseline-{kind}.so.gz'
                    shutil.copyfile(baseline, folder / f'artifacts/candidate-{kind}.so.gz')
                    result[kind + '_sha256'] = hashlib.sha256(gzip.decompress(baseline.read_bytes())).hexdigest()
                result_path.write_bytes(gzip.compress((json.dumps(result) + '\n').encode(), mtime=0))
                reseal(folder)
            else:
                path = folder / 'runtime/all.json.gz'
                value = json.loads(gzip.decompress(path.read_bytes()))
                value['suites']['sharing_update']['cases'].pop()
                path.write_bytes(gzip.compress((json.dumps(value) + '\n').encode(), mtime=0))
                reseal(folder)
            result = subprocess.run([sys.executable, '-B', str(folder / 'verify.py')], capture_output=True, text=True)
            assert result.returncode != 0, name
            assert 'AssertionError' in result.stderr, (name, result.stderr)
            print('PASS rejected', name)


if __name__ == '__main__':
    run()
