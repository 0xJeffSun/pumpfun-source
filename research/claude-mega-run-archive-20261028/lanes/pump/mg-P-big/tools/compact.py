#!/usr/bin/env python3
"""compact.py <olist.txt> [from_idx] [to_idx]: compress an olist listing.
- ldxdw rX,[S+o]; stxdw [D+p],rX pairs  -> 'mv [D+p] <- [S+o]' ; runs of 4 contiguous 8B moves -> 'cp32'
- error blocks (PumpError::name ... AnchorError from) -> one 'ERR' line with E/L annotations
- jump targets resolved to idx."""
import sys, re
L = open(sys.argv[1]).read().splitlines()
lo = int(sys.argv[2]) if len(sys.argv) > 2 else 0
hi = int(sys.argv[3]) if len(sys.argv) > 3 else 10**9
rows = []
for l in L:
    m = re.match(r'\s*(\d+) ([0-9a-f]+)\s+(.*)$', l)
    if m: rows.append((int(m.group(1)), int(m.group(2), 16), m.group(3)))
idx_of = {a: i for i, a, t in rows}
def tgt(i, a, t):
    m = re.match(r'(j\w+ .*?)([+-]0x[0-9a-f]+)$', t.split(' ;')[0])
    if not m: return t
    d = a + 8 + int(m.group(2), 16) * 8
    return t.split(' ;')[0].replace(m.group(2), '@%d' % idx_of.get(d, -1)) + (' ;' + t.split(' ;', 1)[1] if ' ;' in t else '')
out = []
k = 0
while k < len(rows):
    i, a, t = rows[k]
    if i < lo or i > hi: k += 1; continue
    # error block
    if 'PumpError::name' in t or 'ErrorCode::name' in t:
        j = k; ann = []
        while j < len(rows) and j < k + 80:
            tj = rows[j][2]
            ann += re.findall(r' ; (E\d+|L\d+)', tj)
            if 'AnchorError>>::from' in tj: break
            j += 1
        if j < k + 80 and 'AnchorError>>::from' in rows[j][2]:
            seen = []
            for x in ann:
                if x not in seen: seen.append(x)
            out.append('%5d ERRBLK..%d %s' % (i, rows[j][0], ' '.join(seen)))
            k = j + 1; continue
    m1 = re.match(r'ldxdw (r\d), \[(r\d+) ([+-]) (0x[0-9a-f]+)\]$', t)
    if m1 and k + 1 < len(rows):
        m2 = re.match(r'stxdw \[(r\d+) ([+-]) (0x[0-9a-f]+)\], (r\d)$', rows[k + 1][2])
        if m2 and m2.group(4) == m1.group(1):
            # gather run
            run = [(m1, m2)]; j = k + 2
            while j + 1 < len(rows):
                a1 = re.match(r'ldxdw (r\d), \[(r\d+) ([+-]) (0x[0-9a-f]+)\]$', rows[j][2])
                a2 = re.match(r'stxdw \[(r\d+) ([+-]) (0x[0-9a-f]+)\], (r\d)$', rows[j + 1][2])
                if a1 and a2 and a2.group(4) == a1.group(1) and a1.group(2) == m1.group(2) and a2.group(1) == m2.group(1):
                    run.append((a1, a2)); j += 2
                else: break
            def off(s, o): return (-1 if s == '-' else 1) * int(o, 16)
            so = [off(x.group(3), x.group(4)) for x, _ in run]; do = [off(y.group(2), y.group(3)) for _, y in run]
            out.append('%5d mv%d [%s%+#x..] <- [%s%+#x..]' % (i, len(run) * 8, m2.group(1), min(do), m1.group(2), min(so)))
            k = j; continue
    out.append('%5d %s' % (i, tgt(i, a, t)))
    k += 1
print('\n'.join(out))
