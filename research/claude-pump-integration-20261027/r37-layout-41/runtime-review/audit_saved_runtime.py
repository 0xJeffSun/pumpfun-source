"""Independent read-only audit of L41 fresh paired outcomes; no VM execution."""
from pathlib import Path
import base64, collections, gzip, hashlib, importlib.util, json, re
from solders.transaction import VersionedTransaction

HERE = Path(__file__).resolve().parent
ROOT = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/fz-int-pump/wt41')
P = ROOT / 'research/claude-pump-integration-20261027/r37-layout-41'
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
FULL_ = P / 'full.json.gz'
FULL = FULL_ if FULL_.exists() else Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/full/work/claude-reg/r37-layout-41/full.json.gz')
doc = json.loads(gzip.decompress(FULL.read_bytes()))
original = sha(ROOT / 'evidence/original/pump/deployed.so')
candidate = sha(P / 'candidate.so')
assert doc['original_sha256'] == original
assert doc['candidate_sha256'] == candidate
assert len(doc['suites']) == 44 and doc['case_count'] == 10468
spec = importlib.util.spec_from_file_location('ordered_log_audit', Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/parallel-main-r41-log-oracle/audit.py'))
import sys
sys.path.insert(0, str(Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/parallel-main-r41-log-oracle')))
oracle = importlib.util.module_from_spec(spec)
spec.loader.exec_module(oracle)
counts = collections.Counter()
log_families = collections.Counter()
differences = []
state_differences = []
tx_hashes = set()
PUMP = oracle.PUMP

def normalize(value, key=''):
    if key in ('logs', 'relevant_logs'):
        assert isinstance(value, list) and all(isinstance(x, str) for x in value)
        return oracle.norm(value)
    if isinstance(value, dict):
        return {k: normalize(v, k) for k, v in value.items()
                if k not in ('compute_units', 'compute_units_consumed')}
    if isinstance(value, list):
        return [normalize(v) for v in value]
    return value

def signatures(value):
    if isinstance(value, dict):
        for k, v in value.items():
            if k == 'transaction_base64':
                raw = base64.b64decode(v, validate=True)
                tx = VersionedTransaction.from_bytes(raw)
                checks = tx.verify_with_results()
                assert checks and all(checks)
                counts['signed_transaction_occurrences_reverified'] += 1
                tx_hashes.add(hashlib.sha256(raw).hexdigest())
            else:
                signatures(v)
    elif isinstance(value, list):
        for v in value:
            signatures(v)

def without_logs(value):
    if isinstance(value, dict):
        return {k: without_logs(v) for k, v in value.items() if k not in ('logs', 'relevant_logs')}
    if isinstance(value, list):
        return [without_logs(v) for v in value]
    return value

def walk(value, path):
    if isinstance(value, dict):
        if isinstance(value.get('original'), dict) and isinstance(value.get('candidate'), dict):
            a, b = value['original'], value['candidate']
            counts['pairs'] += 1
            aa, bb = normalize(a), normalize(b)
            if 'program_sha256' in aa:
                assert aa['program_sha256'][PUMP] == original
                assert bb['program_sha256'][PUMP] == candidate
                aa['program_sha256'] = dict(aa['program_sha256'])
                bb['program_sha256'] = dict(bb['program_sha256'])
                aa['program_sha256'][PUMP] = bb['program_sha256'][PUMP] = '<checked-pump-artifact>'
                counts['checked_pair_program_maps'] += 1
            if aa != bb:
                differences.append({'path': path, 'keys': [k for k in aa.keys() | bb.keys() if aa.get(k) != bb.get(k)]})
            if without_logs(aa) != without_logs(bb):
                state_differences.append(path)
            left, right = oracle.scope(oracle.norm(a['logs'])), oracle.scope(oracle.norm(b['logs']))
            if left is not None or right is not None:
                counts['main_log_pairs'] += 1
                if left != right:
                    kind, changes = oracle.classify(left or [], right or [])
                    log_families[kind] += 1
            signatures(a)
            signatures(b)
            return
        for k, v in value.items():
            walk(v, path + '/' + k)
    elif isinstance(value, list):
        for i, v in enumerate(value):
            walk(v, path + '/' + str(i))

for name, suite in doc['suites'].items():
    assert suite.get('candidate_sha256', candidate) == candidate
    assert suite.get('original_sha256', original) == original
    walk(suite, name)
assert counts['pairs'] == 10468
assert without_logs(normalize({'after': {'a': {'lamports': 1}}, 'logs': []})) != without_logs(normalize({'after': {'a': {'lamports': 2}}, 'logs': []}))
assert without_logs(normalize({'events': ['a'], 'logs': []})) != without_logs(normalize({'events': ['b'], 'logs': []}))
assert oracle.norm(['Program log: x']) != oracle.norm(['Program log: y'])
report = {
    'status': 'state_equal_with_unresolved_log_differences' if not state_differences else 'state_differences',
    'head': '9b1ed3d3',
    'scope': 'All saved paired outcomes and serialized signatures independently rechecked; no build or VM replay.',
    'counts': dict(counts), 'distinct_signed_transactions': len(tx_hashes),
    'state_differences': state_differences,
    'all_observed_pair_differences': differences, 'ordered_main_log_difference_families': dict(log_families),
    'non_filename_log_differences': sum(v for k, v in log_families.items() if k != 'source_file_path_only'),
    'normalization': ['compute-unit fields and consumption lines excluded', 'source line and column coordinates normalized, filenames preserved', 'Pump artifact hashes checked separately; all other loaded hashes preserved'],
    'original_sha256': original, 'candidate_sha256': candidate,
    'full_receipt_sha256': sha(FULL), 'audit_sha256': sha(Path(__file__)),
}
(HERE / 'RUNTIME-REVIEW.json').write_text(json.dumps(report, indent=2) + '\n')
print(json.dumps({k: v for k, v in report.items() if k != 'all_observed_pair_differences'}, indent=2))
assert not state_differences
