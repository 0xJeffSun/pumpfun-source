#!/usr/bin/env python3
import hashlib
import json
from pathlib import Path
import struct
import sys

P = Path(__file__).resolve().parent
ROOT = P.parents[2]
sys.path.insert(0, str(ROOT / 'scripts'))
from sbpf_disassembly_inventory import sections
H = lambda b: hashlib.sha256(b).hexdigest()


def verify():
    manifest = json.loads((P / 'manifest.json').read_text())
    for name, digest in manifest.items():
        assert H((P / name).read_bytes()) == digest, name
    result = json.loads((P / 'results.json').read_text())
    classification = json.loads((P / 'classification.json').read_text())
    saved = {row['name']: row for row in classification['rows']}
    bodies = {}
    for row in result['results']:
        name = row['name']
        assert row['returncode'] == 0
        assert H((P / 'sources' / (name + '.rs')).read_bytes()) == row['source_sha256']
        for file, digest in row['files'].items():
            assert H((P / 'output' / name / file).read_bytes()) == digest
        obj = (P / 'output' / name / 'probe.o').read_bytes()
        section = sections(obj)['.text.guard']
        body = obj[section[4]:section[4] + section[5]]
        assert H(body) == saved[name]['guard_sha256']
        assert len(body) == saved[name]['guard_bytes']
        at = 0
        branches = []
        while at < len(body):
            op, reg, off, imm = struct.unpack_from('<BBhi', body, at)
            if op in (0x3d, 0x2d, 0x05):
                branches.append(dict(body_offset=at, opcode=hex(op), dst=reg & 15,
                                     src=reg >> 4, target_body_offset=at + 8 + off * 8))
            at += 16 if op == 0x18 else 8
        assert at == len(body) and branches == saved[name]['branches']
        bodies[name] = body
    positive = ['checked_sub', 'positive_expression', 'negative_return', 'unified']
    negative = ['error_first_tail', 'positive_tail']
    assert len(bodies) == 6
    assert all(bodies[name] == bodies[positive[0]] for name in positive)
    assert bodies[negative[0]] == bodies[negative[1]]
    assert all(saved[name]['jge'] == 1 and saved[name]['ja'] == 1 for name in positive)
    assert all(saved[name]['jge'] == 0 and saved[name]['ja'] == 2 for name in negative)
    print(json.dumps(dict(verified=True, compiled_synthetic_functions=6,
                          stock_v137_single_jge_demonstrated=True, full_program_identity=False)))


if __name__ == '__main__':
    verify()
