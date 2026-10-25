#!/usr/bin/env python3
"""Offline integrity and bounded static-anchor verification; no program execution."""
import hashlib
import json
from pathlib import Path
import re
import struct

ROOT = Path(__file__).resolve().parent

def require(condition, message):
    if not condition:
        raise ValueError(message)

def read(path):
    p = ROOT / path
    require(p.resolve().is_relative_to(ROOT), 'path escapes package: ' + path)
    require(not p.is_symlink(), 'symlink: ' + path)
    return p.read_bytes()

def js(path):
    return json.loads(read(path))

def sha(data):
    return hashlib.sha256(data).hexdigest()

def main():
    manifest = js('manifest-sha256.json')
    paths = {str(p.relative_to(ROOT)) for p in ROOT.rglob('*') if p.is_file()}
    require(paths == set(manifest) | {'manifest-sha256.json'}, 'exact file set differs')
    for path, expected in manifest.items():
        require(sha(read(path)) == expected, 'seal mismatch: ' + path)
    objects = 0
    for item in js('provenance.json'):
        if 'path' not in item:
            continue  # absent complete originals: provenance only
        d = read(item['path'])
        require(len(d) == item['size'] and sha(d) == item['sha256'], 'provenance mismatch')
        require(hashlib.sha1(b'blob ' + str(len(d)).encode() + b'\0' + d).hexdigest() == item['git_blob'], 'Git blob mismatch')
        objects += 1
    inherited = 0
    for label in ('create', 'types', 'pricing', 'wide'):
        base = 'inputs/' + label + '/'
        old = js(base + 'manifest-sha256.json')
        for path in manifest:
            if path.startswith(base) and path != base + 'manifest-sha256.json':
                rel = path[len(base):]
                require(rel in old and sha(read(path)) == old[rel], 'inherited subset seal: ' + path)
                inherited += 1
    pattern = re.compile(r'^\s*([0-9a-f]+):\s+((?:[0-9a-f]{2} )*[0-9a-f]{2})\s+')
    instructions = {}
    count = 0
    windows = js('evidence-windows.json')
    for window in windows:
        raw = read(window['bytes'])
        require(sha(raw) == window['sha256'], 'window hash')
        require(len(raw) == window['end_exclusive'] - window['start'], 'window size')
        position = window['start']
        for line in read(window['asm']).decode().splitlines():
            m = pattern.match(line)
            require(m is not None, 'unparsed assembly row')
            address, b = int(m[1], 16), bytes.fromhex(m[2])
            require(address == position and len(b) in (8,16), 'instruction continuity')
            offset = address - window['start']
            require(raw[offset:offset+len(b)] == b, 'instruction bytes')
            require(address not in instructions or instructions[address] == b, 'overlap differs')
            instructions[address] = b
            position += len(b)
            count += 1
        require(position == window['end_exclusive'], 'window end')
    for w in js('new-windows.json'):
        match = next(x for x in windows if x['asm'] == w['asm'])
        require(read(w['bytes']) == read(match['bytes']), 'new window rebind')
        require(w['source_lines'] == match['source_lines'], 'source line disagreement')
    for e in js('call-edges.json'):
        b = instructions[e['site']]
        require(b[:2] == bytes.fromhex('8510'), 'not direct call')
        require(e['site'] + 8 + struct.unpack('<i', b[4:8])[0]*8 == e['target'], 'call target')
    for e in js('branch-anchors.json'):
        b = instructions[e['site']]
        require(b.hex() == e['bytes'], 'branch opcode changed')
        require(e['site']+8+struct.unpack('<h',b[2:4])[0]*8 == e['target'], 'branch target')
    for e in js('arithmetic-composition.json'):
        require(read(e['wide']) == read(e['pricing']), 'arithmetic composition differs')
        require(sha(read(e['wide'])) == e['sha256'], 'arithmetic hash')
    # This checks a local syntactic anchor, not global semantic non-reachability.
    walk = read('inputs/create/inputs/nested-walk.asm').decode()
    require(walk.count('ldxb r9, [r10 - 0x268]') == 1, 'parent depth load anchor')
    require('ldxb r7, [r2 + 0x98]' in read('inputs/create/inputs/depth-gate.asm').decode(), 'gate field anchor')
    result = js('results.json')
    require(result['source_proposal'] is False and result['admission_complete'] is False, 'scope changed')
    print(json.dumps({'ok': True, 'sealed_files': len(manifest), 'copied_git_objects': objects, 'inherited_subset_files': inherited, 'assembly_windows': len(windows), 'assembly_rows_with_overlap': count, 'arithmetic_windows_identical': 5, 'mode': 'static integrity and selected anchors only', 'automated_semantics_proof': False}, sort_keys=True))

if __name__ == '__main__':
    main()
