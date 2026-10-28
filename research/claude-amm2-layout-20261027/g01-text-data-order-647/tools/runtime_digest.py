#!/usr/bin/env python3
"""Condense a 25-suite replay directory into per-case digests the verifier can recheck.

For every suite receipt written by replay_parallel.py: the receipt SHA-256, the
bound original/candidate hashes, and for each case (in receipt order) the first
16 hex digits of SHA-256 over its canonical JSON plus the suite comparator's
verdict for that case (`match`, empty `diff`, empty `mismatched_fields` or empty
`mismatches`, whichever the suite records). A suite digest is SHA-256 over the
ordered case digests and verdicts. Anyone re-running the suites can recompute
the case digests from fresh receipts; the verifier rechecks counts, verdicts,
suite digests and their sums against summary.json.
"""
import gzip, hashlib, json, sys
from pathlib import Path

sys.dont_write_bytecode = True


def verdict(case):
    if 'match' in case:
        return bool(case['match'])
    for k in ('diff', 'mismatched_fields', 'mismatches'):
        if k in case:
            return not case[k]
    raise AssertionError('no comparator field in case')


def suite_digest(rows):
    h = hashlib.sha256()
    for d, v in rows:
        h.update((d + ('1' if v else '0')).encode())
    return h.hexdigest()


def digest(replay_dir):
    replay = Path(replay_dir)
    summary = json.loads((replay / 'summary.json').read_text())
    progress = {r['suite']: r for r in json.loads((replay / 'progress.json').read_text())}
    out = {'candidate_sha256': summary['candidate_sha256'], 'original_sha256': summary['original_sha256'], 'suites': {}}
    for suite in sorted(progress):
        receipt = replay / (suite + '.json')
        raw = receipt.read_bytes()
        data = json.loads(raw)
        cases = data['cases'] if isinstance(data['cases'], list) else list(data['cases'].values())
        rows = [[hashlib.sha256(json.dumps(c, sort_keys=True, separators=(',', ':')).encode()).hexdigest()[:16], verdict(c)] for c in cases]
        assert data['candidate_sha256'] == summary['candidate_sha256'] and len(rows) == data['case_count']
        out['suites'][suite] = {'receipt_sha256': hashlib.sha256(raw).hexdigest(), 'case_count': len(rows),
                                'mismatches': len(data.get('mismatches', [])), 'suite_digest': suite_digest(rows), 'cases': rows}
    return out


if __name__ == '__main__':
    d = digest(sys.argv[1])
    Path(sys.argv[2]).write_bytes(gzip.compress(json.dumps(d, separators=(',', ':')).encode(), mtime=0))
    print(sum(s['case_count'] for s in d['suites'].values()), 'cases;',
          sum(not v for s in d['suites'].values() for _, v in s['cases']), 'negative verdicts')
