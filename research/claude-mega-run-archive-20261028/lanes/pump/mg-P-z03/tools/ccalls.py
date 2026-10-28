#!/usr/bin/env python3
"""ccalls.py <so> <symregex>: list calls in a candidate function (offset, target symbol)."""
import sys, re, subprocess, struct
OBJ = '/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
so, rx = sys.argv[1], sys.argv[2]
syms = []
for l in subprocess.check_output([OBJ, '-t', so], text=True).splitlines():
    m = re.match(r'^([0-9a-f]+) .* F \S+\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$', l)
    if m: syms.append((int(m.group(1), 16), int(m.group(2), 16), m.group(3)))
dem = dict(zip([s[2] for s in syms], subprocess.run(['c++filt'], input='\n'.join(s[2] for s in syms), capture_output=True, text=True).stdout.split('\n')))
tgt = [s for s in syms if re.search(rx, dem[s[2]])]
a, n, nm = max(tgt, key=lambda s: s[1])
data = open(so, 'rb').read()
# find .text file offset
hdr = subprocess.check_output([OBJ, '-h', so], text=True)
m = re.search(r'\.text\s+([0-9a-f]+)\s+([0-9a-f]+)', hdr); tsz, tva = int(m.group(1), 16), int(m.group(2), 16)
out = subprocess.check_output(['/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-readelf', '-S', so], text=True)
off = next(int(l.split()[4], 16) for l in out.splitlines() if ' .text ' in l)
by = {s[0]: dem[s[2]] for s in syms}
i = 0; raw = data[off + a - tva: off + a - tva + n]
while i < len(raw):
    op = raw[i]
    if op == 0x85:
        imm = struct.unpack('<i', raw[i+4:i+8])[0]
        if (raw[i+1] >> 4) == 1:
            t = a + i + 8 + imm * 8; s = re.sub(r'::h[0-9a-f]{16}$', '', by.get(t, '?'))
            print(hex(i), s[-90:])
        else: print(hex(i), 'syscall')
    i += 16 if op == 0x18 else 8
