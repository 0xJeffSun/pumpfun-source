"""Verify saved main Pump claim evidence, without executing program code."""
import base64
import gzip
import hashlib
import json
import struct
from pathlib import Path
from solders.transaction import Transaction

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
FIELDS = ('error', 'before', 'after', 'event_data_base64', 'inner')
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()


def load(name):
    raw = (HERE / name).read_bytes()
    return json.loads(gzip.decompress(raw) if raw[:2] == b'\x1f\x8b' else raw)


def amount(account):
    if account is None:
        return 0
    data = base64.b64decode(account['data_base64'])
    return struct.unpack_from('<Q', data, 64)[0] if len(data) >= 72 else 0


def verify_original_assembly(binary):
    table = struct.unpack_from('<Q', binary, 40)[0]
    stride, count, strings = struct.unpack_from('<HHH', binary, 58)
    headers = [struct.unpack_from('<IIQQQQIIQQ', binary, table + index * stride)
               for index in range(count)]
    names_header = headers[strings]
    names = binary[names_header[4]:names_header[4] + names_header[5]]
    text = next(h for h in headers if names[h[0]:].split(b'\0', 1)[0] == b'.text')
    for window in load('original-functions.json')['functions']:
        start, end = window['start'], window['end']
        offset = start - text[3] + text[4]
        assert hashlib.sha256(binary[offset:offset + end - start]).hexdigest() == window['sha256']
        at = start
        for line in (HERE / f'original-{start:x}.asm').read_text().splitlines():
            address, raw = line.split('\t', 1)[0].split(':', 1)
            assert int(address.strip(), 16) == at
            data = bytes.fromhex(raw.strip())
            offset = at - text[3] + text[4]
            assert binary[offset:offset + len(data)] == data
            at += len(data)
        assert at == end


def main():
    for name, digest in load('manifest.json').items():
        assert sha(HERE / name) == digest, name
    original_path = ROOT / 'evidence/original/pump/deployed.so'
    original = sha(original_path)
    verify_original_assembly(original_path.read_bytes())
    for phase in ('baseline', 'recovered'):
        record = load(phase + '/build-comparison.json')
        assert record['returncode'] == 0 and record['source_unchanged']
        assert record['selected_toolchain'] == 'v1.44'
        assert record['comparison']['original_sha256'] == original
        assert record['comparison']['candidate_sha256'] == sha(HERE / phase / 'candidate.so')
        assert not record['comparison']['full_byte_equality']
        for path, digest in record['source_sha256'].items():
            relative = Path(path).relative_to('programs/pump')
            assert sha(HERE / phase / 'source' / relative) == digest
    build = load('recovered/build-comparison.json')
    candidate = sha(HERE / 'recovered/candidate.so')
    assert sha(HERE / 'recovered/unstripped.so') == build['unstripped_sha256']
    repeat = load('repeat/build-comparison.json')
    assert repeat['source_sha256'] == build['source_sha256']
    assert repeat['comparison']['candidate_sha256'] == candidate
    assert repeat['unstripped_sha256'] == build['unstripped_sha256']
    successes = []
    for name in ('final3-boundaries.json.gz', 'final3-holdout.json.gz'):
        report = load(name)
        assert report['original_sha256'] == original
        assert report['candidate_sha256'] == candidate
        assert report['compiled_source_sha256'] == build['source_sha256']
        assert report['case_count'] == len(report['cases']) == 334
        assert not report['mismatches']
        count = 0
        for row in report['cases']:
            assert not row['differences']
            assert all(row['original'][k] == row['candidate'][k] for k in FIELDS)
            wire = row['original']['transaction_base64']
            assert wire == row['candidate']['transaction_base64']
            Transaction.from_bytes(base64.b64decode(wire, validate=True)).verify()
            state = row['candidate']
            if state['error'] is None:
                count += 1
                for payload in state['event_data_base64']:
                    event = base64.b64decode(payload)
                    assert len(event) == 104
                    paid = struct.unpack_from('<Q', event, 72)[0]
                    assert amount(state['after']['user_ata']) - amount(state['before']['user_ata']) == paid
                    assert amount(state['before']['global_ata']) - amount(state['after']['global_ata']) == paid
        successes.append(count)
    baseline = load('baseline-boundaries.json.gz')
    assert baseline['candidate_sha256'] == sha(HERE / 'baseline/candidate.so')
    assert baseline['case_count'] == 334 and len(baseline['mismatches']) == 205
    recovered = load('final3-boundaries.json.gz')
    for before, after in zip(baseline['cases'], recovered['cases'], strict=True):
        assert before['case'] == after['case']
        assert all(before['original'][key] == after['original'][key] for key in FIELDS)
    scheduler = load('scheduler-regression.json.gz')
    assert scheduler['candidate_sha256'] == candidate
    assert scheduler['case_count'] == 575 and not scheduler['mismatches']
    extensions = load('v3-regression.json.gz')
    assert extensions['candidate_sha256'] == candidate
    assert extensions['case_count'] == 126 and not extensions['mismatches']
    if (HERE / 'full-regression.json.gz').exists():
        full = load('full-regression.json.gz')
        assert full['candidate_sha256'] == candidate and full['original_sha256'] == original
        assert full['case_count'] == 9259 and len(full['suites']) == 38
        assert not full['mismatches']
        summary = load('regression-summary.json')
        assert summary['candidate_sha256'] == candidate
        assert summary['case_count'] == 9593 and summary['suite_count'] == 39
        assert summary['full_38_sha256'] == sha(HERE / 'full-regression.json.gz')
        assert summary['claim_sha256'] == sha(HERE / 'final3-boundaries.json.gz')
    print(json.dumps({'claim_cases_per_seed': 334, 'successful_claim_cases': successes,
                      'baseline_mismatches': 205, 'recovered_mismatches': 0,
                      'existing_regression_cases': 9259,
                      'fresh_build_repeatable': True, 'whole_program_byte_equal': False}, indent=2))


if __name__ == '__main__':
    main()
