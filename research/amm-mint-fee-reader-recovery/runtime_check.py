"""Independently audit saved AMM signed sends and suite result bindings."""
from collections import Counter
from io import BytesIO
from pathlib import Path, PurePosixPath
import base64, gzip, hashlib, json, tarfile
if not __debug__: raise SystemExit('Verification requires Python without -O')
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[1]
AMM='pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA'
ORIGINAL='6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7'
def digest(data):return hashlib.sha256(data).hexdigest()
def document(path):
 raw=path.read_bytes();return json.loads(gzip.decompress(raw)if path.suffix=='.gz'else raw)
def archive(path):
 result={}
 with tarfile.open(fileobj=BytesIO(path.read_bytes()),mode='r:gz')as stream:
  for m in stream.getmembers():
   n=PurePosixPath(m.name);assert not n.is_absolute()and '..'not in n.parts and str(n)==m.name
   if m.isdir():continue
   assert m.isfile()and m.name not in result
   result[m.name]=stream.extractfile(m).read()
 return result

def transactions(data, allowed, script_hash=None):
    from solders.transaction import Transaction
    tx = json.loads(gzip.decompress(data))
    if script_hash is not None:
        assert tx['script_sha256'] == script_hash
    known = tx['program_file_sha256']
    for path, row in known.items():
        assert path == row['path']
        if '/evidence/' in path:
            local = ROOT / ('evidence/' + path.split('/evidence/', 1)[1])
            assert digest(local.read_bytes()) == row['sha256']
        else:
            assert row['sha256'] in allowed
    observed, signatures, hashes = Counter(), 0, Counter()
    assert tx['transaction_count'] == len(tx['transactions'])
    for index, row in enumerate(tx['transactions']):
        assert row['sequence'] == index and row['all_signatures_verified'] is True
        raw = base64.b64decode(row['transaction_base64'], validate=True)
        assert digest(raw) == row['transaction_sha256']
        parsed = Transaction.from_bytes(raw)
        checks = parsed.verify_with_results()
        assert checks and all(checks) and len(checks) == row['signature_count']
        assert bytes(parsed) == raw
        signatures += len(checks)
        for image in row['loaded_programs'].values():
            assert known[image['path']] == image
        amm = row['loaded_programs'][AMM]['sha256']
        assert amm == row['amm_program_sha256'] and amm in allowed
        assert len(row['logs_sha256']) == 64
        observed[amm] += 1
        hashes[(amm, row['logs_sha256'])] += 1
    assert signatures == tx['signature_count']
    return len(tx['transactions']), signatures, observed, hashes


def runtime(evidence, images):
    final = digest(images['proposal']['candidate'])
    files = archive(HERE / 'runtime.tar.gz')
    summary = json.loads(files['summary.json'])
    assert summary['candidate_sha256'] == final and summary['cases'] == 17462 and summary['mismatches'] == []
    base = ROOT / 'repro/pump_amm/pool-serialization-thirty-seven'
    commands = {r['suite']: r['command'] for r in document(base / 'replay-commands.json')['commands']}
    counts = document(base / 'summary.json')['suites']
    assert len(summary['suites']) == len(commands) == 25 and sum(counts.values()) == 17462
    assert {r['suite'] for r in summary['suites']} == set(commands)
    expected_members = {'summary.json'} | {n + suffix for n in commands for suffix in ('.json.gz', '-transactions.json.gz', '.log')}
    assert set(files) == expected_members
    for path, value in summary['inputs'].items():
        if path.endswith('/candidate.so'):
            assert value == final
        else:
            names = [n for n in evidence['harnesses'] if path.endswith('/' + n)]
            assert len(names) == 1 and evidence['harnesses'][names[0]] == value, path
    total_transactions = total_signatures = 0
    for row in summary['suites']:
        name = row['suite']
        raw = gzip.decompress(files[name + '.json.gz'])
        receipt = json.loads(raw)
        assert digest(raw) == row['receipt_sha256'] and digest(files[name + '-transactions.json.gz']) == row['sidecar_sha256']
        assert receipt['candidate_sha256'] == final and receipt['original_sha256'] == ORIGINAL
        assert row['case_count'] == receipt['case_count'] == len(receipt['cases']) == counts[name]
        assert receipt['mismatches'] == []
        expected_logs = Counter()
        for case in receipt['cases']:
            if 'match' in case:
                assert case['match'] is True
            for field in ('diff', 'mismatched_fields'):
                if field in case:
                    assert case[field] == []
            for side, sha in (('original', ORIGINAL), ('candidate', final)):
                result = case.get(side)
                if isinstance(result, dict) and isinstance(result.get('logs'), list):
                    expected_logs[(sha, digest(json.dumps(result['logs'], separators=(',', ':')).encode()))] += 1
        observer = json.loads(gzip.decompress(files[name + '-transactions.json.gz']))
        assert observer['observer_sha256'] == evidence['harnesses']['repro/pump_amm/owner6048-v144/runtime/observe_suite.py']
        script = commands[name][1]
        n, signatures, seen, logs = transactions(files[name + '-transactions.json.gz'], {ORIGINAL, final}, evidence['harnesses'][script])
        assert not expected_logs - logs
        assert n == row['transactions'] == 2 * counts[name] + (150 if name == 'boost' else 0)
        assert signatures == row['signatures'] and seen[ORIGINAL] >= counts[name] and seen[final] >= counts[name]
        actual_command = row['command']
        assert actual_command[3].endswith('/' + script)
        total_transactions += n
        total_signatures += signatures
    assert (total_transactions, total_signatures) == (35074, 35418)
    return dict(cases=17462, transactions=total_transactions, signatures=total_signatures)
