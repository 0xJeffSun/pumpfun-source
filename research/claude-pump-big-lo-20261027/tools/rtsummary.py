#!/usr/bin/env python3
"""Summarise one or more run_suites.py reports (gzip JSON) into a small JSON record.

  rtsummary.py --output summary.json report1.json.gz [report2.json.gz ...]
Counts, errors and diagnostic mismatches are merged; each report's bound-file hashes are kept
with repository-relative paths where possible.
"""
import argparse, gzip, json
from pathlib import Path
ap = argparse.ArgumentParser()
ap.add_argument('--output', type=Path, required=True)
ap.add_argument('reports', nargs='+', type=Path)
a = ap.parse_args()
out = {'candidate_sha256': None, 'original_sha256': None, 'suites': 0, 'case_count': 0, 'expected_cases': 0,
       'errors': [], 'diagnostic_mismatches': 0, 'diagnostic_log_cases': 0, 'counts': {}, 'reports': []}
for p in a.reports:
    r = json.loads(gzip.decompress(p.read_bytes()))
    for k in ('candidate_sha256', 'original_sha256'):
        assert out[k] in (None, r[k]), (k, p)
        out[k] = r[k]
    out['counts'].update(r['counts'])
    out['case_count'] += r['case_count']
    out['expected_cases'] += sum(r['expected'].values())
    out['errors'] += r['errors']
    out['diagnostic_mismatches'] += len(r['mismatches'])
    out['diagnostic_log_cases'] += r['diagnostics'].get('log_bearing_cases', 0)
    bound = {}
    for path, digest in r['bound_files_sha256'].items():
        q = Path(path)
        bound[str(q.relative_to(q.parents[[x.name for x in q.parents].index('scripts')])) if 'scripts' in q.parts else q.name] = digest
    out['reports'].append({'report': p.name, 'suites': r['suites_requested'], 'bound_files_sha256': bound})
out['suites'] = len(out['counts'])
a.output.write_text(json.dumps(out, indent=1) + '\n')
print(json.dumps({k: out[k] for k in ('suites', 'case_count', 'expected_cases', 'diagnostic_mismatches', 'diagnostic_log_cases')}), 'errors', len(out['errors']))
