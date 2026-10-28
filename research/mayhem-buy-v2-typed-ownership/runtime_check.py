"""Independently recheck saved signed receipts; never execute a VM or compiler."""
if not __debug__:
    raise RuntimeError('Evidence assertions require ordinary Python')
from pathlib import Path
import hashlib
import io
import json
import re
import subprocess
import sys
import tarfile
import tempfile
import gzip

P = Path(__file__).resolve().parent
ROOT = P.parents[1]
sha = lambda b: hashlib.sha256(b).hexdigest()
MAY = 'MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'


def archive_files(path, expected):
    with tarfile.open(path, 'r:xz') as archive:
        rows = archive.getmembers()
        assert all(r.isfile() and not Path(r.name).is_absolute() and '..' not in Path(r.name).parts for r in rows)
        files = {r.name: archive.extractfile(r).read() for r in rows}
    assert len(files) == len(rows)
    assert {n: sha(b) for n, b in files.items()} == expected
    return files


def verify():
    bindings = json.loads((P / 'runtime/input-bindings.json').read_bytes())
    inputs = archive_files(P / 'runtime/inputs.tar.xz', {n: r['sha256'] for n, r in bindings['inputs'].items()})
    assert len(inputs) == 17
    assert inputs['evidence/original/mayhem/deployed.so'] == (ROOT / 'evidence/original/mayhem/deployed.so').read_bytes()
    records = archive_files(P / 'runtime/records.tar.xz', json.loads((P / 'runtime/record-files.json').read_bytes()))
    expected = json.loads((P / 'runtime/summary.json').read_bytes())
    programs = {MAY: sha(inputs['evidence/original/mayhem/deployed.so'])}
    sizes = {MAY: len(inputs['evidence/original/mayhem/deployed.so'])}
    for group, names in [('original', ['pump', 'pump_fees']),
                         ('dependencies', ['spl_token', 'spl_token_2022', 'associated_token'])]:
        for name in names:
            prefix = 'evidence/' + group + '/' + name
            key = json.loads(inputs[prefix + '/capture.json'])['program']
            programs[key] = sha(inputs[prefix + '/deployed.so'])
            sizes[key] = len(inputs[prefix + '/deployed.so'])
    assert len(programs) == 6
    results = []
    with tempfile.TemporaryDirectory(prefix='buy-v2-offline-') as directory:
        temp = Path(directory)
        for name, b in inputs.items():
            dest = temp / name
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(b)
        for label in ['parent', 'proposed']:
            candidate = gzip.decompress((P / 'builds' / label / 'candidate.so.gz').read_bytes())
            image = temp / (label + '.so')
            image.write_bytes(candidate)
            for family in ['native', 'token', 'token22']:
                name = label + '/' + family + '.json'
                report = json.loads(records[name])
                proof = json.loads(records[label + '/' + family + '.verification.json'])
                observed = json.loads(records[label + '/' + family + '.program-bindings.json'])
                execution = json.loads(records[label + '/' + family + '.execution.json'])
                assert execution['returncode'] == execution['independent_returncode'] == 0
                prefix = label + '/' + family
                for key, suffix in [('stdout_sha256', '.stdout'),
                                    ('independent_stdout_sha256', '.verification.stdout'),
                                    ('report_sha256', '.json'),
                                    ('independent_sha256', '.verification.json'),
                                    ('program_bindings_sha256', '.program-bindings.json')]:
                    assert execution[key] == sha(records[prefix + suffix])
                assert observed['exit_code'] == 0 and observed['failure'] is None and observed['frozen_inputs_unchanged']
                assert observed['observer_sha256'] == sha((P / 'controllers/run_buy_v2_observed.py').read_bytes())
                assert observed['candidate_sha256'] == report['candidate_sha256'] == sha(candidate)
                assert observed['solders'] == '0.27.1'
                assert len(report['cases']) == report['case_count'] == 613
                assert not report['mismatches'] and len(observed['records']) == 1226
                for index, pair in enumerate(report['cases']):
                    for side_index, side in enumerate(['original', 'candidate']):
                        row = observed['records'][2 * index + side_index]
                        assert row['side'] == side and row['family'] == family and row['case'] == pair['case']['name']
                        assert row['signature'] == pair[side]['signature']
                        assert row['config']['with_sigverify'] is True and row['config']['with_blockhash_check'] is True
                        assert row['before'] == row['after'] and set(row['before']) == set(programs)
                        for key, state in row['before'].items():
                            digest = sha(candidate) if key == MAY and side == 'candidate' else programs[key]
                            size = len(candidate) if key == MAY and side == 'candidate' else sizes[key]
                            assert state['sha256'] == digest and state['bytes'] == size and state['executable'] is True
                receipt, out = temp / 'receipt.json', temp / 'verification.json'
                receipt.write_bytes(records[name])
                command = [sys.executable, '-I', '-B', str(temp / 'scripts/verify_mayhem_buy_v2.py'),
                           '--receipts', str(receipt), '--candidate', str(image), '--output', str(out)]
                run = subprocess.run(command, capture_output=True, text=True)
                assert run.returncode == 0, (label, family, run.stdout[-1000:], run.stderr[-1000:])
                assert json.loads(out.read_bytes()) == proof
                compute = re.compile(r' consumed \d+ of \d+ compute units')
                strict = lambda logs: [line for line in logs if not compute.search(line)]
                noncompute = sum(strict(x['original']['metadata']['logs']) != strict(x['candidate']['metadata']['logs']) for x in report['cases'])
                raw = sum(x['original']['metadata']['logs'] != x['candidate']['metadata']['logs'] for x in report['cases'])
                assert noncompute == 0 and raw == 466
                assert proof['verified_signed_transactions'] == 1226 and not proof['mismatches']
                assert proof['successful_cases'] == (284 if family == 'native' else 210)
                saved = next(r for r in expected['runs'] if r['label'] == label and r['family'] == family)
                assert saved == execution and saved['noncompute_log_differences'] == noncompute and saved['raw_log_differences'] == raw
                results.append(dict(label=label, family=family, pairs=613,
                                    successes=proof['successful_cases'], signed_records=1226,
                                    noncompute_log_differences=noncompute, raw_log_differences=raw))
    assert expected['fresh_full_corpus_pairs'] == 3678
    assert expected['independently_verified_signed_records'] == 7356
    return dict(pairs=3678, verified_signed_records=7356, runs=results,
                proposed_pairs=1839, proposed_successes=704, proposed_rejections=1135,
                cpi_error_callback_coverage_claimed=False)
