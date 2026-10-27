#!/usr/bin/env python3
"""Print the Utilize guard region (after the Option<Uses>::unwrap call) of a
candidate next to the original, plus a normalized instruction diff count."""
import re, subprocess, sys
from pathlib import Path

OBJ = Path.home() / '.cache/solana/v1.43/platform-tools/llvm/bin/llvm-objdump'
WT = Path('/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/bf960843-6806-451b-a211-62c8b228d301/scratchpad/lanes/deps-metaplex/wt')
ORIG = WT / 'evidence/dependencies/token_metadata/deployed.so'
START = 236632


def dis(path, size=5200):
    out = subprocess.check_output([str(OBJ), '-d', f'--start-address={START}', f'--stop-address={START + size}', str(path)], text=True)
    rows = []
    for l in out.splitlines():
        parts = l.split('\t')
        m = re.match(r'\s*(\d+):$', parts[0]) if len(parts) >= 3 else None
        if m:
            rows.append((int(m.group(1)), parts[2].strip()))
    return rows


def norm(t):
    t = re.sub(r'<[^>]*>', '', t)
    t = re.sub(r'call -?0x[0-9a-f]+', 'call X', t)
    t = re.sub(r'goto [-+]0x[0-9a-f]+', 'goto X', t)
    return t.strip()


def main():
    cand = Path(sys.argv[1])
    o, c = dis(ORIG), dis(cand)
    # locate unwrap call with r3 = 0x9f350 location argument
    def anchor(rows):
        # the Option<Uses>::unwrap call (function at instruction index 2136)
        for i, (idx, t) in enumerate(rows):
            m = re.match(r'call (-?0x[0-9a-f]+)$', t)
            if m and idx + 1 + int(m.group(1), 16) == 2136:
                return i
        return None
    ia, ib = anchor(o), anchor(c)
    print(f'anchor original={ia} candidate={ib}')
    for k in range(-14, 16):
        a = o[ia + k][1] if 0 <= ia + k < len(o) else ''
        b = c[ib + k][1] if ib is not None and 0 <= ib + k < len(c) else ''
        mark = ' ' if norm(a) == norm(b) else '*'
        print(f'{mark} {a[:58]:58s} | {b[:58]}')
    nd = sum(norm(x[1]) != norm(y[1]) for x, y in zip(o, c))
    print('instructions orig/cand:', len(o), len(c), 'normalized differing positions:', nd)


if __name__ == '__main__':
    main()
