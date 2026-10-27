"""Recover exact saved Rust/configuration inputs into a new local directory."""
from pathlib import Path
import argparse
import gzip
import hashlib
import json

HERE = Path(__file__).resolve().parent
PARENT = HERE.parent / 'fees-sharing-slice-recovery'


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    expected = json.loads(gzip.decompress((PARENT / 'composition.json.gz').read_bytes()))['final_inputs']
    files = {}
    for path in (PARENT / 'sources').rglob('*.gz'):
        name = str(path.relative_to(PARENT / 'sources')).removesuffix('.gz')
        data = gzip.decompress(path.read_bytes())
        assert hashlib.sha256(data).hexdigest() == expected[name]
        files['source/' + name] = data
    assert len(files) == len(expected) == 46
    for name in ['ordered.ld', 'linker.sh']:
        files['config/' + name] = (HERE / 'layout' / name).read_bytes()
    args.output.mkdir(parents=True, exist_ok=False)
    for name, data in files.items():
        path = args.output / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(data)
    (args.output / 'config/linker.sh').chmod(0o755)
    print(json.dumps({'source_files': 46, 'configuration_files': 2, 'output': str(args.output.resolve())}))


if __name__ == '__main__':
    main()
