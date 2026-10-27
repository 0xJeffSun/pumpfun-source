"""Signed creation controls, including existing-PDA argument/stored-ID divergence."""
from pathlib import Path
import argparse
import hashlib
import json
import sys

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'scripts'))
import fees_social_create_differential as harness


def cases():
    rows = []
    for flags in (0, 1, 2, 3, 255):
        for existing in (False, True):
            for user in ('', 'a' * 20, 'a' * 21, 'é' * 10, 'é' * 11):
                for version in ((0, 1, 2, 255) if existing else (0,)):
                    rows.append(dict(flags=flags, existing=existing, user=user,
                                     version=version))
    for flags in (0, 1, 2, 3):
        for version in (0, 1, 2, 255):
            for user, stored_bytes in (('a' * 21, 20), ('é' * 11, 20)):
                rows.append(dict(flags=flags, existing=True, version=version,
                                 user=user, patches=[(10, stored_bytes.to_bytes(4, 'little').hex())],
                                 state_length=179))
    return rows


def main():
    parser = argparse.ArgumentParser(__doc__)
    parser.add_argument('--candidate', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    rows = []
    for case in cases():
        original = harness.run(case)
        candidate = harness.run(case, args.candidate)
        # Include all retained fields: raw logs, transactions, inner instructions,
        # resulting account bytes/owner/lamports and payer balance.
        rows.append(dict(case=case, original=original, candidate=candidate,
                         match=original == candidate))
    report = dict(original_sha256=hashlib.sha256(harness.ORIGINAL.read_bytes()).hexdigest(),
                  candidate_sha256=hashlib.sha256(args.candidate.read_bytes()).hexdigest(),
                  cases=rows, mismatches=[i for i, row in enumerate(rows) if not row['match']])
    args.output.write_text(json.dumps(report, ensure_ascii=False, separators=(',', ':')) + '\n')
    print(f"{len(rows)} signed cases, {len(report['mismatches'])} mismatches")
    raise SystemExit(bool(report['mismatches']))


if __name__ == '__main__':
    main()
