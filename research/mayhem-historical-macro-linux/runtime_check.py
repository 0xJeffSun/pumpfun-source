"""Replay frozen read-only receipt checkers; no target/VM execution or network."""
import base64
import gzip
import hashlib
import json
from pathlib import Path
import re
import subprocess
import sys
import tarfile
import tempfile

from solders.transaction import Transaction

P = Path(__file__).resolve().parent
sys.path.insert(0, str(P))
import verify

sha = lambda b: hashlib.sha256(b).hexdigest()
load = lambda p: json.loads(p.read_bytes())
compressed = lambda p: json.loads(gzip.decompress(p.read_bytes()))


def trade_files():
    expected = load(P / 'runtime/trade-files.json')
    seen = set()
    with tarfile.open(P / 'runtime/trade.tar.xz', 'r|xz') as stream:
        for member in stream:
            assert member.isfile() and not Path(member.name).is_absolute() and '..' not in Path(member.name).parts
            assert member.name not in seen and member.name in expected
            raw = stream.extractfile(member).read()
            assert sha(raw) == expected[member.name]
            seen.add(member.name)
            yield member.name, raw
    assert seen == expected.keys()


def check():
    source = verify.archive('../runtime/inputs.tar.gz')
    assert {n: sha(b) for n, b in source.items()} == load(P / 'runtime/inputs.json')
    candidate = verify.unzip('candidate.so.gz')
    original = verify.unzip('original.so.gz')
    assert source['evidence/original/mayhem/deployed.so'] == original
    candidate_hash, original_hash = sha(candidate), sha(original)
    jobs = load(P / 'runtime/jobs.json')
    results = []
    with tempfile.TemporaryDirectory(prefix='historical-linux-receipts-') as directory:
        root = Path(directory)
        for name, raw in source.items():
            target = root / name
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(raw)
        target = root / 'candidate.so'
        target.write_bytes(candidate)
        pending = {j['name'] + '.json': j for j in jobs}
        for filename, raw in trade_files():
            if filename not in pending:
                continue
            job = pending.pop(filename)
            name = job['name']
            report = json.loads(raw)
            assert report['candidate_sha256'] == candidate_hash and report['original_sha256'] == original_hash
            assert report['case_count'] == len(report['cases']) == job['expected_count']
            assert not report['mismatches'] and not report['normalized_log_differences']
            for path, digest in report['harness_sha256'].items():
                assert sha(source[path]) == digest
            receipt, output = root / (name + '.json'), root / (name + '-checked.json')
            receipt.write_bytes(raw)
            command = [sys.executable, '-I', '-B', str(root / 'scripts' / Path(job['verify'][3]).name), *job['verify'][4:]]
            for flag, value in [('--candidate', target), ('--receipts', receipt), ('--output', output)]:
                assert flag in command
                command[command.index(flag) + 1] = str(value)
            run = subprocess.run(command, cwd=root, capture_output=True)
            assert run.returncode == 0, (name, run.stdout[-2000:], run.stderr[-2000:])
            checked = load(output)
            assert checked == load(P / 'runtime/trade' / (name + '-independent.json'))
            results.append(dict(name=name, cases=report['case_count']))
        assert not pending
    assert sum(r['cases'] for r in results) == 6636
    mayhem = 'MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'
    pump = json.loads(source['evidence/upstream/pump.json'])['address']
    pump_bytes = source['evidence/original/pump/deployed.so']
    initializer_results = {}
    for stem, initializer_candidate in [('initializer-', candidate), ('current430-', verify.unzip('current430-candidate.so.gz'))]:
        initializer = []
        compute = re.compile(r'^Program \S+ consumed \d+ of \d+ compute units$')
        for kind, expected_count in [('rejections', 53), ('pump-cpi', 16)]:
            report = compressed(P / 'runtime' / (stem + kind + '.json.gz'))
            assert report['candidate_sha256'] == sha(initializer_candidate) and report['original_sha256'] == original_hash
            assert report['runner_sha256'] == sha((P / 'controllers/initializer_replay.py').read_bytes())
            assert report['case_count'] == len(report['cases']) == expected_count and not report['mismatches']
            assert [r['case'] for r in report['cases']] == load(P / 'runtime' / ('initializer-' + kind + '-cases.json'))
            fields = (['error', 'anchor_errors', 'before', 'after', 'events', 'inner', 'return', 'signed_transaction_base64']
                      if kind == 'rejections' else ['before', 'after', 'error', 'events', 'inner', 'return'])
            assert report['compared_fields'] == fields
            records, successes, raw_logs = 0, 0, 0
            for row in report['cases']:
                assert not row['differences']
                assert all(row['original'][f] == row['candidate'][f] for f in fields)
                a, b = [row[s]['logs'] for s in ['original', 'candidate']]
                raw_logs += a != b
                assert [s for s in a if not compute.fullmatch(s)] == [s for s in b if not compute.fullmatch(s)]
                successes += row['original']['error'] is None
                a, b = [row[s + '_executions'] for s in ['original', 'candidate']]
                expected_executions = 1 if kind == 'rejections' or not row['case'].get('init_global_params', True) else 2
                assert len(a) == len(b) == expected_executions
                assert [x['signed_transaction_base64'] for x in a] == [x['signed_transaction_base64'] for x in b]
                for side, binary in [('original', original), ('candidate', initializer_candidate)]:
                    for execution in row[side + '_executions']:
                        tx = Transaction.from_bytes(base64.b64decode(execution['signed_transaction_base64'], validate=True))
                        assert all(tx.verify_with_results())
                        assert execution['program_accounts'][mayhem] == dict(sha256=sha(binary), bytes=len(binary), executable=True)
                        if kind == 'pump-cpi':
                            assert execution['program_accounts'][pump] == dict(sha256=sha(pump_bytes), bytes=len(pump_bytes), executable=True)
                        records += 1
            assert successes == (0 if kind == 'rejections' else 10)
            initializer.append(dict(kind=kind, cases=expected_count, signed_records=records, successes=successes, raw_log_differences=raw_logs))
        assert sum(r['signed_records'] for r in initializer) == 168
        initializer_results[stem] = initializer
    initializer = initializer_results['initializer-']
    return dict(trade_cases=6636, trade_signed_records=13272, initializer_cases=69,
                initializer_signed_records=168, initializer=initializer,
                current430_initializer_cases=69, current430_initializer_signed_records=168,
                current430_initializer=initializer_results['current430-'],
                scope='Three artifact-bound finite matrices; initializer scenarios overlap. No exhaustive semantics or unique-signature claim.')


if __name__ == '__main__':
    print(json.dumps(check(), sort_keys=True))
