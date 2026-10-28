#!/usr/bin/env python3
"""Recompute every selected Pump window from retained unstripped ELFs."""
from pathlib import Path
import csv
import hashlib
import json
import struct
import sys

sys.dont_write_bytecode = True
HERE = Path(__file__).resolve().parent
ROOT = next(path for path in HERE.parents if (path / 'evidence/original/pump/deployed.so').is_file())
sys.path.insert(0, str(ROOT / 'scripts'))
from pump_compare_function_bytes import body, normalize  # noqa: E402
from pump_quote_control_function_match import sections  # noqa: E402
from parity_checks import load_json, require, sha256  # noqa: E402

EXPECTED_COUNTS = {
    'total': 1035, 'raw': 168, 'normalized': 1010,
    'unmatched': 25, 'matched_text_bytes': 1541504,
}
EXPECTED_UNMATCHED = [
    '0x18678', '0x1ac28', '0x1e7c0', '0x22a10', '0x34558', '0x3fb70',
    '0x4c158', '0x567d8', '0x5b3b0', '0x6cd78', '0x6fef8', '0x72810',
    '0x77940', '0x7bfd8', '0x80df8', '0x83c00', '0x138b20', '0x13b9b8',
    '0x13f630', '0x144508', '0x147ba0', '0x1489f8', '0x14a8a8', '0x14f4e0',
    '0x152888',
]


def elf_functions(blob):
    shoff, = struct.unpack_from('<Q', blob, 0x28)
    shentsize, shnum, shstrndx = struct.unpack_from('<HHH', blob, 0x3a)
    headers = [struct.unpack_from('<IIQQQQIIQQ', blob, shoff + i * shentsize)
               for i in range(shnum)]
    names = headers[shstrndx]

    def section_name(offset):
        start = names[4] + offset
        return blob[start:blob.index(b'\0', start)].decode()

    text_index = next(i for i, header in enumerate(headers)
                      if section_name(header[0]) == '.text')
    functions = []
    for header in headers:
        if header[1] != 2:
            continue
        strings = headers[header[6]]
        for index in range(header[5] // 24):
            st_name, st_info, _other, st_shndx, value, size = struct.unpack_from(
                '<IBBHQQ', blob, header[4] + index * 24)
            if st_info & 0xf == 2 and st_shndx == text_index and size:
                start = strings[4] + st_name
                name = blob[start:blob.index(b'\0', start)].decode()
                functions.append((value, size, name))
    return functions


def compute(elf_path):
    original_path = ROOT / 'evidence/original/pump/deployed.so'
    require(sha256(original_path) ==
            '7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d',
            'original Pump artifact changed')
    functions_path = ROOT / 'repro/reconstruction-status-2026-10-26/functions.tsv'
    require(sha256(functions_path) ==
            'fb2c0a47514567d65eb45c1e268dacd5291e4659bb7dceb575a767dc20bcaff8',
            'function inventory changed')
    candidate, original = Path(elf_path).read_bytes(), original_path.read_bytes()
    candidate_sections, original_sections = sections(candidate), sections(original)
    candidates = {}
    for start, length, name in elf_functions(candidate):
        raw = body(candidate, candidate_sections, start, length)
        normalized, _ = normalize(raw, start, candidate_sections)
        key = (length, hashlib.sha256(normalized).hexdigest())
        candidates.setdefault(key, []).append({
            'start': start, 'name': name, 'raw_sha256': hashlib.sha256(raw).hexdigest(),
        })
    windows = []
    with functions_path.open() as stream:
        for row in csv.DictReader(stream, delimiter='\t'):
            if row['program'] != 'pump' or row['variant'] != 'selected':
                continue
            start, end = int(row['original_start']), int(row['original_end'])
            raw = body(original, original_sections, start, end - start)
            normalized, _ = normalize(raw, start, original_sections)
            matches = candidates.get((end - start, hashlib.sha256(normalized).hexdigest()), [])
            raw_digest = hashlib.sha256(raw).hexdigest()
            windows.append({
                'start': start, 'end': end, 'bytes': end - start,
                'normalized_matches': [{'start': item['start'], 'name': item['name']}
                                       for item in matches],
                'raw_match': any(item['raw_sha256'] == raw_digest for item in matches),
            })
    counts = {
        'total': len(windows),
        'raw': sum(row['raw_match'] for row in windows),
        'normalized': sum(bool(row['normalized_matches']) for row in windows),
        'unmatched': sum(not row['normalized_matches'] for row in windows),
        'matched_text_bytes': sum(row['bytes'] for row in windows if row['normalized_matches']),
    }
    return {
        'candidate_sha256': hashlib.sha256(candidate).hexdigest(),
        'counts': counts,
        'unmatched': [hex(row['start']) for row in windows if not row['normalized_matches']],
        'windows': windows,
    }


def verify_one(name, elf_path, inventory_path, expected_hash):
    saved = load_json(inventory_path)
    actual = compute(elf_path)
    require(actual['candidate_sha256'] == expected_hash, f'{name}: ELF hash mismatch')
    require(saved['candidate_sha256'] == expected_hash, f'{name}: inventory hash mismatch')
    require(actual['counts'] == saved['counts'] == EXPECTED_COUNTS, f'{name}: census mismatch')
    require(actual['unmatched'] == saved['unmatched'] == EXPECTED_UNMATCHED,
            f'{name}: unmatched set changed')
    require(actual['windows'] == saved['windows'], f'{name}: saved window evidence changed')
    require(saved.get('normalized_gains') == [] and saved.get('normalized_losses') == [],
            f'{name}: normalized gain/loss mismatch')
    require(saved.get('raw_gains') == [] and saved.get('raw_losses') == [],
            f'{name}: raw gain/loss mismatch')
    return actual


def run():
    l33 = ROOT / 'research/claude-pump-integration-20261027/r37-layout-33'
    stages = {
        'stage-a': (l33 / 'unstripped.so', HERE / 'measurement/stage-a.json.gz',
                    '9392550f34c084425deb45e3e72e4cd38e047da7685cb2ac4a2ba30851f54740'),
        'stage-b': (HERE / 'builds/stage-b/unstripped.so', HERE / 'measurement/stage-b.json.gz',
                    'b7a3147d6d1f6c2646b4eac736308b0c31c33dd33c616950c15be0a55295cb9c'),
        'final-1': (HERE / 'builds/final-1/unstripped.so', HERE / 'measurement/stage-c-1.json.gz',
                    '377284984eab6852e3f65466475d9c4093a8cd3d919397b2f395d2d5d45976d4'),
        'final-2': (HERE / 'builds/final-2/unstripped.so', HERE / 'measurement/stage-c-2.json.gz',
                    '377284984eab6852e3f65466475d9c4093a8cd3d919397b2f395d2d5d45976d4'),
    }
    results = {name: verify_one(name, *args) for name, args in stages.items()}
    baseline = [(bool(row['normalized_matches']), row['raw_match'])
                for row in results['stage-a']['windows']]
    for name, result in results.items():
        require([(bool(row['normalized_matches']), row['raw_match'])
                 for row in result['windows']] == baseline,
                f'{name}: window identity differs from L33')
    return {'status': 'verified', 'stages': list(stages), 'counts': EXPECTED_COUNTS,
            'normalized_losses': 0, 'raw_losses': 0, 'unmatched': EXPECTED_UNMATCHED}


if __name__ == '__main__':
    print(json.dumps(run(), indent=2, sort_keys=True))
