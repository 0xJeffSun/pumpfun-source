#!/usr/bin/env python3
"""Write one authenticated source snapshot to a new directory; never compile."""
import argparse
import hashlib
import importlib.util
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent


def main():
    if not __debug__:
        raise SystemExit('Run without -O.')
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--stage', choices=('baseline780', 'candidate'), default='candidate')
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    assert not args.output.exists(), 'output must be new'
    manifest = json.loads((HERE / 'MANIFEST.json').read_text())['files']
    for name in ('verify.py', 'sources/' + args.stage + '.tar.gz', 'builds/' + args.stage + '/launch.json'):
        assert hashlib.sha256((HERE / name).read_bytes()).hexdigest() == manifest[name]
    spec = importlib.util.spec_from_file_location('source_packet', HERE / 'verify.py')
    packet = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(packet)
    inputs = packet.sources(args.stage)
    expected = packet.record('builds/' + args.stage + '/launch.json')['inputs']
    assert {p: packet.sha(b) for p, b in inputs.items()} == expected
    args.output.mkdir(parents=True)
    for name, blob in inputs.items():
        destination = args.output / name
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(blob)
    print('Wrote', len(inputs), 'authenticated inputs to', args.output)


if __name__ == '__main__':
    main()
