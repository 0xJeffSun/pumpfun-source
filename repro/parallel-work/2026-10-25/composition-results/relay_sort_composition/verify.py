#!/usr/bin/env python3
"""Location-independent offline integrity/static-byte verification, not a proof checker.
Never invokes target code, historical verifier scripts, disassemblers, or a compiler.
"""
from pathlib import Path
import hashlib
import json
import re
import struct

ROOT = Path(__file__).resolve().parent
CHECKPOINT = '517d77db988d8c63b6cf476f0be138c5a4f3128a'
PACKAGES = ('relay_large_sort', 'relay_sort_scheduler', 'relay_sort_partition', 'relay_sort_merge')

def sha(data):
    return hashlib.sha256(data).hexdigest()

def read_json(path):
    return json.loads(path.read_text())

def safe(base, name):
    path = Path(name)
    assert not path.is_absolute() and '..' not in path.parts, name
    dest = base / path
    assert dest.is_file() and not dest.is_symlink(), name
    return dest

def check_seal(base):
    expected = read_json(base / 'manifest-sha256.json')
    actual = {}
    for f in base.rglob('*'):
        assert not f.is_symlink(), str(f)
        if f.is_file() and f != base / 'manifest-sha256.json':
            actual[str(f.relative_to(base))] = sha(f.read_bytes())
    assert actual == expected, 'sealed set/hash mismatch: ' + str(base)
    return len(actual)

def check_provenance(base):
    provenance = read_json(base / 'provenance.json')
    assert provenance['checkpoint'] == CHECKPOINT
    count = 0
    for ent in provenance['inputs']:
        data = safe(base, ent['path']).read_bytes()
        assert len(data) == ent['size'] and sha(data) == ent['sha256'], ent['path']
        if ent.get('git_blob'):
            blob = b'blob ' + str(len(data)).encode() + b'\0' + data
            assert hashlib.sha1(blob).hexdigest() == ent['git_blob'], ent['path']
            count += 1
    return count

def main():
    files = check_seal(ROOT)
    blobs = check_provenance(ROOT)
    for name in PACKAGES:
        base = ROOT / 'evidence' / name
        check_seal(base)
        blobs += check_provenance(base)
    elf = (ROOT / 'evidence/frozen/inputs/deployed.so').read_bytes()
    assert sha(elf) == '367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563'
    lines = 0
    targets = 0
    for f in (ROOT / 'evidence').rglob('disassembly/*.txt'):
        previous_end = None
        for line in f.read_text().splitlines():
            m = re.fullmatch(r'(\d+): ([0-9a-f]+)\s+(.+)', line)
            assert m, (str(f), line)
            pc, raw, description = int(m[1]), bytes.fromhex(m[2]), m[3]
            assert raw == elf[pc:pc+len(raw)]
            assert previous_end is None or pc == previous_end
            op, registers, offset, imm = struct.unpack_from('<BBhi', raw)
            assert len(raw) == (16 if op == 0x18 else 8)
            previous_end = pc + len(raw)
            branch = re.search(r'-> (\d+)$', description)
            jump = re.fullmatch(r'goto (\d+)', description)
            call = re.fullmatch(r'call (-?\d+)', description)
            if branch or jump:
                assert (op & 7) in (5, 6) and op not in (0x85, 0x95)
                assert pc + 8 + 8*offset == int((branch or jump)[1])
                targets += 1
            if call and registers >> 4 == 1:
                assert op == 0x85 and pc + 8 + 8*imm == int(call[1])
                targets += 1
            lines += 1
    result = read_json(ROOT / 'result.json')
    assert result['checkpoint'] == CHECKPOINT
    assert not result['formal_machine_proof'] and not result['target_execution']
    assert not result['fallback_capacity']['fresh_formula_equality_assumed']
    seen = set()
    expected = [('L', []), ('E', ['L']), ('Q', ['L', 'E']), ('T', ['Q']), ('wrapper', ['T'])]
    assert [(r['id'], r['depends_on']) for r in result['dependency_order']] == expected
    for node in result['dependency_order']:
        assert set(node['depends_on']) <= seen and node['id'] not in seen
        seen.add(node['id'])
    ranges = 0
    for claim in result['claims']:
        for r in claim['ranges']:
            assert 0 <= r['start'] < r['end'] <= len(elf)
            assert r['start'] % 8 == r['end'] % 8 == 0
            assert sha(elf[r['start']:r['end']]) == r['sha256']
            ranges += 1
    # Static direct-call and immediate witnesses for the composition boundaries.
    for pc, target in [(38336,42160),(38864,42160),(39864,42160),(42144,42160),(43960,42160),(47240,36800)]:
        op, rr, off, imm = struct.unpack_from('<BBhi', elf, pc)
        assert op == 0x85 and rr >> 4 == 1 and pc + 8 + imm*8 == target
    for pc, expected_raw in [(47232,'b705000001000000'),(39808,'b707000020000000'),(44816,'0701000010000000'),(36744,'b704000055000000')]:
        assert elf[pc:pc+8].hex() == expected_raw
    print(json.dumps({'status':'PASS','sealed_files':files,'historical_packages':len(PACKAGES),
                      'git_blob_identity_checks':blobs,'listing_instruction_rows':lines,
                      'static_target_checks':targets,'composition_ranges':ranges,
                      'scope':'integrity and static evidence only; handwritten composition not machine-certified',
                      'target_execution':False,'builds':False}, indent=2))

if __name__ == '__main__':
    main()
