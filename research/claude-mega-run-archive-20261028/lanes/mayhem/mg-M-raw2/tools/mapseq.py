#!/usr/bin/env python3
"""From an lld link map, list input sections (in output address order) that come from a given input-file substring,
with their section index inside that object (to compare original order vs natural object order).
usage: python3 -B mapseq.py LINK_MAP FILE_SUBSTR OBJ_FILE [OUTSEC]
"""
import re, sys, subprocess
RE = '/Users/shawwalters/.cache/solana/v1.54/platform-tools/llvm/bin/llvm-readelf'
mp, sub, obj = sys.argv[1:4]
outsec = sys.argv[4] if len(sys.argv) > 4 else '.text'
secidx = {}
for l in subprocess.run([RE, '-SW', obj], capture_output=True, text=True).stdout.splitlines():
    m = re.match(r'\s*\[\s*(\d+)\]\s+(\S+)', l)
    if m: secidx[m.group(2)] = int(m.group(1))
cur = None; seq = []
for l in open(mp):
    m = re.match(r'\s*([0-9a-f]+)\s+([0-9a-f]+)\s+([0-9a-f]+)\s+(\d+)\s(.*)$', l.rstrip('\n'))
    if not m: continue
    rest = m.group(5); ind = len(rest) - len(rest.lstrip(' ')); rest = rest.strip()
    if ind == 0: cur = rest; continue
    if ind == 8 and cur == outsec and sub in rest:
        sname = rest.rsplit(':(', 1)[1][:-1]
        seq.append((int(m.group(1), 16), int(m.group(3), 16), secidx.get(sname, -1), sname))
prev = -1; inv = 0
for a, sz, i, s in seq:
    flag = '' if i > prev else '  <-- out of object order'
    if i <= prev: inv += 1
    prev = i
    print('0x%06x %5d idx=%4d %s%s' % (a, sz, i, s[:90], flag))
print('n', len(seq), 'inversions', inv)
