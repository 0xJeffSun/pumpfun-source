#!/usr/bin/env python3
"""Extract the sealed, unchanged focused Fees harness for current-artifact CI."""
import argparse
import hashlib
import json
from pathlib import Path, PurePosixPath
import tarfile

ROOT = Path(__file__).resolve().parents[1]
PACKAGE = ROOT / 'repro/pump_fees/sharing-second-pump-cpi-v144'


def prepare(output):
    manifest = json.loads((PACKAGE / 'manifest.json').read_text())
    expected = (PACKAGE / 'manifest.sha256').read_text().split()[0]
    assert hashlib.sha256((PACKAGE / 'manifest.json').read_bytes()).hexdigest() == expected
    archive = PACKAGE / 'runtime-repository.tar.gz'
    assert hashlib.sha256(archive.read_bytes()).hexdigest() == manifest[archive.name]
    output.mkdir(parents=True, exist_ok=False)
    count = 0
    with tarfile.open(archive) as source:
        seen = set()
        for member in source:
            path = PurePosixPath(member.name)
            assert not path.is_absolute() and '..' not in path.parts, member.name
            if not path.parts or path.parts[0] != 'validation-layer':
                continue
            assert not member.issym() and not member.islnk(), member.name
            if member.isdir():
                continue
            assert member.isfile() and member.name not in seen, member.name
            seen.add(member.name)
            target = output.joinpath(*path.parts)
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(source.extractfile(member).read())
            count += 1
    assert (output / 'validation-layer/harness/fees_donation_business_differential.py').is_file()
    expected_source = json.loads((output / 'validation-layer/corrected-source-sha256.json').read_text())
    assert len(expected_source) == 26
    for name, digest in expected_source.items():
        assert hashlib.sha256((PACKAGE / 'source' / name).read_bytes()).hexdigest() == digest, name
    return {'status': 'PASS', 'extracted_files': count, 'source_inputs': 26, 'target_executions': 0}


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    print(json.dumps(prepare(args.output), indent=2))
