#!/usr/bin/env python3
"""Assemble a self-verifying lane checkpoint directory inside the packet.

usage: python -B make_checkpoint.py NAME BUILD_DIR WORK_SRC PARENT_SRC SWEEPS_JSON PARENT_SWEEPS_JSON TRADES_DIR

BUILD_DIR   build_lane.py output (candidate.so, symbols.so, launch.json, result.json, stderr)
WORK_SRC    candidate crate dir (programs/mayhem)
PARENT_SRC  pristine 432 parent crate dir (programs/mayhem)
SWEEPS_JSON scripts/mayhem_validate_sweeps.py report for the candidate; PARENT_SWEEPS_JSON the same for the parent
TRADES_DIR  run_trades.py output directory (summary.json plus one report per suite)
"""
import difflib, gzip, hashlib, importlib.util, json, re, shutil, sys
from pathlib import Path

name, build, work, parent, sweeps, psweeps, trades = sys.argv[1:8]
build, work, parent, trades = Path(build), Path(work), Path(parent), Path(trades)
PKT = Path(__file__).resolve().parents[1]
ROOT = PKT.parents[1]
C = PKT / 'checkpoints' / name
assert not C.exists(), C
sha = lambda b: hashlib.sha256(b).hexdigest()
gz = lambda b: gzip.compress(b, 9, mtime=0)
CU = re.compile(r'consumed \d+ of \d+ compute units')


def tree(d):
    return {p.relative_to(d).as_posix(): p.read_bytes() for p in sorted(d.rglob('*')) if p.is_file()}


def put(rel, data):
    p = C / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_bytes(data)


W, P = tree(work), tree(parent)
assert set(W) == set(P) and len(W) == 67, (len(W), sorted(set(W) ^ set(P)))
changed = sorted(n for n in W if W[n] != P[n])
patch = []
for n in changed:
    put('overrides/' + n, W[n])
    patch.extend(difflib.unified_diff(P[n].decode().splitlines(True), W[n].decode().splitlines(True),
                                      fromfile='a/' + n, tofile='b/' + n))
put('source.patch', ''.join(patch).encode())
put('source-inputs.json', (json.dumps({n: sha(b) for n, b in W.items()}, indent=2, sort_keys=True) + '\n').encode())

cand, syms = (build / 'candidate.so').read_bytes(), (build / 'symbols.so').read_bytes()
result = json.loads((build / 'result.json').read_text())
assert result['returncode'] == 0 and result['candidate_sha256'] == sha(cand) and result['symbols_sha256'] == sha(syms)
stderr = (build / 'stderr').read_bytes()
assert b'exceeded max offset' not in stderr and b'Stack offset' not in stderr
put('candidate.so.gz', gz(cand))
put('symbols.so.gz', gz(syms))
put('ELF-SHA256.txt', f'candidate.so {sha(cand)}\nsymbols.so {sha(syms)}\n'.encode())
put('build/launch.json', (build / 'launch.json').read_bytes())
put('build/result.json', (build / 'result.json').read_bytes())
put('build/stderr.gz', gz(stderr))

spec = importlib.util.spec_from_file_location('ckpt_progress', ROOT / 'research/mayhem-initializer-current-recovery-20261027/progress.py')
progress = importlib.util.module_from_spec(spec); spec.loader.exec_module(progress)
parent_syms = gzip.decompress((ROOT / 'research/mayhem-quotes-current-recovery-20261027/builds/current/symbols.so.gz').read_bytes())
original = (ROOT / 'evidence/original/mayhem/deployed.so').read_bytes()
pr = progress.compare(original, parent_syms, syms)
pr['scope'] = 'Lane mayhem-b checkpoint versus the 432 quotes-current parent symbols (440b9281...).'
put('analysis/progress.json', (json.dumps(pr, indent=2, sort_keys=True) + '\n').encode())
for extra in ['measure.json', 'windows.txt']:
    if (build / extra).exists():
        put('analysis/' + extra, (build / extra).read_bytes())


def sweep_summary(path):
    d = json.loads(Path(path).read_text())
    clean = lambda logs: [l for l in logs if not CU.search(l)]
    diffs = [i for i, c in enumerate(d['cases']) if clean(c['original']['logs']) != clean(c['candidate']['logs'])]
    return d, {'candidate_sha256': d['candidate_sha256'], 'original_sha256': d['original_sha256'],
               'case_count': d['case_count'], 'mismatches': len(d['mismatches']),
               'noncompute_log_differences': len(diffs)}


sd, s_new = sweep_summary(sweeps)
_, s_old = sweep_summary(psweeps)
assert s_new['candidate_sha256'] == sha(cand) and s_new['mismatches'] == 0
put('runtime/sweeps.json.gz', gz(Path(sweeps).read_bytes()))
ts = json.loads((trades / 'summary.json').read_text())
reports = {}
for r in ts['runs']:
    rep = json.loads((trades / f"{r['family']}.json").read_text())
    assert rep['candidate_sha256'] == sha(cand), r['family']
    reports[r['family']] = {'cases': rep['case_count'], 'mismatches': len(rep['mismatches']),
                            'normalized_log_differences': len(rep['normalized_log_differences'])
                            if isinstance(rep['normalized_log_differences'], list) else rep['normalized_log_differences'],
                            'signed_transactions': rep.get('signed_transactions'),
                            'report_sha256': sha((trades / f"{r['family']}.json").read_bytes())}
runtime = {'candidate_sha256': sha(cand), 'sweeps': s_new, 'parent_sweeps': s_old, 'trades': reports,
           'trade_cases': sum(v['cases'] for v in reports.values()),
           'trade_mismatches': sum(v['mismatches'] for v in reports.values()),
           'trade_normalized_log_differences': sum(v['normalized_log_differences'] for v in reports.values())}
put('runtime/summary.json', (json.dumps(runtime, indent=2, sort_keys=True) + '\n').encode())

files = sorted(p for p in C.rglob('*') if p.is_file())
put('SHA256SUMS', ''.join(f'{sha(p.read_bytes())}  {p.relative_to(C).as_posix()}\n' for p in files).encode())
print(json.dumps({'checkpoint': str(C), 'changed': changed, 'candidate': sha(cand), 'symbols': sha(syms),
                  'matches': pr['matches'], 'raw': pr['raw_matches'], 'gains': pr['gains'], 'runtime': {
                      k: v for k, v in runtime.items() if k != 'trades'}}, indent=2))
