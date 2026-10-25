#!/usr/bin/env python3
"""Verify exact public receipt copies against the immutable inline build archive."""
import argparse
import gzip
import hashlib
import json
from pathlib import Path
import tarfile

P = Path(__file__).resolve().parent
sha = lambda b: hashlib.sha256(b).hexdigest()
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--repo', type=Path, default=P.parents[2])
args = parser.parse_args()
root = args.repo.resolve()
manifest = json.loads((P / 'manifest-sha256.json').read_text())
files = list(P.rglob('*'))
assert not any(p.is_symlink() for p in files)
assert {str(p.relative_to(P)): sha(p.read_bytes()) for p in files
        if p.is_file() and p != P / 'manifest-sha256.json'} == manifest
provenance = json.loads((P / 'provenance.json').read_text())
archive = root / provenance['archive']
assert sha(archive.read_bytes()) == provenance['archive_sha256']
with tarfile.open(archive, 'r:gz') as source:
    members = {m.name: m for m in source.getmembers()}
    seal = source.extractfile(members['manifest-sha256.json']).read()
    assert sha(seal) == provenance['scratch_manifest_sha256']
    sealed = json.loads(seal)
    for name, expected in provenance['receipts'].items():
        member = members[name]
        assert member.isfile()
        original = source.extractfile(member).read()
        assert sha(original) == sealed[name] == expected
        assert (P / name).read_bytes() == original
candidate = sha((root / provenance['candidate']).read_bytes())
original = sha((root / 'evidence/original/pump_fees/deployed.so').read_bytes())
assert candidate == provenance['candidate_sha256'] and original == provenance['original_sha256']
reports = {n: json.loads(gzip.decompress((P / n).read_bytes())) for n in provenance['receipts']}
for name, report in reports.items():
    assert report['candidate_sha256'] == candidate and report['original_sha256'] == original, name
    assert not report.get('mismatches', report.get('failures', [])), name
cases = sum(r['case_count'] for n, r in reports.items() if n != 'donation-sequence.json.gz')
assert cases == provenance['comparison_receipts'] == 17441
assert len(reports['donation-sequence.json.gz']['steps']) == 10
print(json.dumps({'verified': True, 'archive_members_copied_byte_identically': len(reports),
                  'comparison_receipts': cases, 'donation_steps': 10,
                  'new_runtime_cases': 0, 'new_program_builds': 0}, indent=2))
