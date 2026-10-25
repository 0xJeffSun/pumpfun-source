#!/usr/bin/env python3
"""Independent raw byte diff between an original deployed.so and a candidate.
Reports total differing positions and contiguous runs. No build inputs touched.
"""
import sys, hashlib

def load(p):
    with open(p, "rb") as f:
        return f.read()

def runs(positions):
    out = []
    if not positions:
        return out
    start = prev = positions[0]
    for p in positions[1:]:
        if p == prev + 1:
            prev = p
        else:
            out.append((start, prev))
            start = prev = p
    out.append((start, prev))
    return out

def main():
    a_path, b_path = sys.argv[1], sys.argv[2]
    a, b = load(a_path), load(b_path)
    print(f"A {a_path} len={len(a)} sha={hashlib.sha256(a).hexdigest()}")
    print(f"B {b_path} len={len(b)} sha={hashlib.sha256(b).hexdigest()}")
    n = min(len(a), len(b))
    diffs = [i for i in range(n) if a[i] != b[i]]
    print(f"common_len={n}  tail_extra={abs(len(a)-len(b))}")
    print(f"total_differing_positions={len(diffs)}")
    if diffs:
        print(f"first_diff={diffs[0]}  last_diff={diffs[-1]}")
    r = runs(diffs)
    print(f"contiguous_runs={len(r)}")
    for s, e in r[:60]:
        print(f"  run 0x{s:06x}-0x{e:06x}  len={e-s+1}")
    if len(r) > 60:
        print(f"  ... {len(r)-60} more runs")
    # tail check if lengths differ
    if len(a) != len(b):
        longer, shorter = (a, b) if len(a) > len(b) else (b, a)
        tail = longer[len(shorter):]
        print(f"tail_all_zero={all(x==0 for x in tail)}  tail_len={len(tail)}")

if __name__ == "__main__":
    main()
