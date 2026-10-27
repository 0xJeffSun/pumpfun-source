"""Verify the final main-dispatch evidence packet without program execution."""
import base64
import gzip
import hashlib
import json
import struct
from pathlib import Path
from solders.transaction import Transaction

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
FIELDS = ('error', 'before', 'after', 'events', 'inner', 'return_data')
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()


def load(name):
    data = (HERE / name).read_bytes()
    return json.loads(gzip.decompress(data) if data[:2] == b'\x1f\x8b' else data)


def verify_assembly(binary):
    table = struct.unpack_from('<Q', binary, 40)[0]
    stride, count, string_index = struct.unpack_from('<HHH', binary, 58)
    headers = [struct.unpack_from('<IIQQQQIIQQ', binary, table + i * stride) for i in range(count)]
    strings = headers[string_index]
    names = binary[strings[4]:strings[4]+strings[5]]
    text = next(h for h in headers if names[h[0]:].split(b'\0', 1)[0] == b'.text')
    for window in load('original-functions.json')['functions']:
        start, end = window['start'], window['end']
        offset = start - text[3] + text[4]
        assert hashlib.sha256(binary[offset:offset + end-start]).hexdigest() == window['sha256']
        at = start
        for line in (HERE / f'original-{start:x}.asm').read_text().splitlines():
            address, raw = line.split('\t', 1)[0].split(':', 1)
            assert int(address.strip(), 16) == at
            data = bytes.fromhex(raw.strip()); offset = at - text[3] + text[4]
            assert binary[offset:offset+len(data)] == data
            at += len(data)
        assert at == end


def verify_raw_inventory(original, candidate):
    def text_header(binary):
        table = struct.unpack_from('<Q', binary, 40)[0]
        stride, count, string_index = struct.unpack_from('<HHH', binary, 58)
        headers = [struct.unpack_from('<IIQQQQIIQQ', binary, table + i * stride) for i in range(count)]
        strings = headers[string_index]
        names = binary[strings[4]:strings[4]+strings[5]]
        return next(h for h in headers if names[h[0]:].split(b'\0', 1)[0] == b'.text')
    os, cs = text_header(original), text_header(candidate)
    inventory = load('exact-body-inventory.json')
    assert inventory['candidate_sha256'] == hashlib.sha256(candidate).hexdigest()
    assert inventory['original_sha256'] == hashlib.sha256(original).hexdigest()
    assert len(inventory['windows']) == 1035
    at, matches, matched_bytes = os[3], 0, 0
    for row in inventory['windows']:
        assert row['original_start'] == at
        start, end = row['original_start'], row['original_end']
        size = end-start
        offset = start-os[3]+os[4]
        body = original[offset:offset+size]
        assert hashlib.sha256(body).hexdigest() == row['sha256']
        for counterpart in row['raw_counterparts']:
            address = counterpart['address']
            assert cs[3] <= address <= cs[3]+cs[5]-size
            offset = address-cs[3]+cs[4]
            assert candidate[offset:offset+size] == body
        if row['raw_counterparts']:
            matches += 1
            matched_bytes += size
        at = end
    assert at == os[3]+os[5]
    assert matches == inventory['raw_equal_windows'] == 112
    assert matched_bytes == inventory['raw_equal_text_bytes'] == 15896


def main():
    for name, digest in load('manifest.json').items():
        assert sha(HERE / name) == digest, name
    binary = ROOT / 'evidence/original/pump/deployed.so'
    original = sha(binary)
    verify_assembly(binary.read_bytes())
    for phase in ('baseline', 'recovered'):
        build = load(phase + '/build-comparison.json')
        assert build['returncode'] == 0 and build['source_unchanged']
        assert build['selected_toolchain'] == 'v1.44'
        assert build['comparison']['original_sha256'] == original
        assert build['comparison']['candidate_sha256'] == sha(HERE / phase / 'candidate.so')
        assert not build['comparison']['full_byte_equality']
        for path, digest in build['source_sha256'].items():
            assert sha(HERE / phase / 'source' / Path(path).relative_to('programs/pump')) == digest
    build = load('recovered/build-comparison.json')
    candidate = sha(HERE / 'recovered/candidate.so')
    assert sha(HERE / 'recovered/unstripped.so') == build['unstripped_sha256']
    verify_raw_inventory(binary.read_bytes(), (HERE / 'recovered/unstripped.so').read_bytes())
    repeat = load('repeat/build-comparison.json')
    assert repeat['source_sha256'] == build['source_sha256']
    assert repeat['comparison']['candidate_sha256'] == candidate
    assert repeat['unstripped_sha256'] == build['unstripped_sha256']
    baseline, current = load('baseline-cases.json.gz'), load('recovered-cases.json.gz')
    assert baseline['case_count'] == current['case_count'] == 192
    assert len(baseline['mismatches']) == 23 and not current['mismatches']
    assert baseline['candidate_sha256'] == sha(HERE / 'baseline/candidate.so')
    assert current['candidate_sha256'] == candidate
    assert baseline['original_sha256'] == current['original_sha256'] == original
    assert current['compiled_source_sha256'] == build['source_sha256']
    successes = 0
    for before, after in zip(baseline['cases'], current['cases'], strict=True):
        assert before['case'] == after['case']
        assert all(before['original'][k] == after['original'][k] for k in FIELDS)
        assert not after['differences']
        assert all(after['original'][k] == after['candidate'][k] for k in FIELDS)
        wire = after['original']['transaction_base64']
        assert wire == after['candidate']['transaction_base64']
        Transaction.from_bytes(base64.b64decode(wire, validate=True)).verify()
        successes += after['original']['error'] is None
    if (HERE / 'full-regression.json.gz').exists():
        full = load('full-regression.json.gz')
        assert full['candidate_sha256'] == candidate and full['original_sha256'] == original
        assert full['case_count'] == 9785 and len(full['suites']) == 40 and not full['mismatches']
    print(json.dumps({'reserve_sync_cases': 192, 'original_successes': successes,
                      'baseline_mismatches': 23, 'recovered_mismatches': 0,
                      'fresh_build_repeatable': True, 'whole_program_byte_equal': False}, indent=2))


if __name__ == '__main__':
    main()
