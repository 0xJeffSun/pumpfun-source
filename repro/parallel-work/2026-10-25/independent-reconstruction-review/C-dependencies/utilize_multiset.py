#!/usr/bin/env python3
"""Compare two llvm-objdump BPF dumps of the Utilize window.
Tests whether candidate and original contain the SAME instruction multiset,
differing only in basic-block ordering and branch/call displacements.
Pure read-only analysis of existing dump text; no binaries modified.
"""
import sys, re
from collections import Counter

LINE = re.compile(r"^\s*[0-9a-f]+:\t([0-9a-f ]+?)\t(.*)$")

def parse(path):
    insns = []
    with open(path) as f:
        for ln in f:
            m = LINE.match(ln.rstrip("\n"))
            if not m:
                continue
            hexbytes = m.group(1).strip().split()
            b = [int(x, 16) for x in hexbytes]
            insns.append((b, m.group(2).strip()))
    return insns

def klass(op):
    return op & 0x07

def normalize(b):
    """Return a normalized tuple masking layout-dependent fields.
    JMP(0x05)/JMP32(0x06) class: mask 16-bit off (bytes 2-3).
    CALL (0x85): mask 32-bit imm (bytes 4-7) -- callee displacement is layout dependent.
    """
    op = b[0]
    bb = list(b)
    if op == 0x85:  # call
        for i in range(4, 8):
            if i < len(bb):
                bb[i] = 0
    elif klass(op) in (0x05, 0x06):  # jump classes
        if len(bb) >= 4:
            bb[2] = 0
            bb[3] = 0
    return tuple(bb)

def main():
    o = parse(sys.argv[1])
    c = parse(sys.argv[2])
    print(f"original insns={len(o)}  candidate insns={len(c)}")

    # raw byte totals in window
    ob = sum(len(b) for b, _ in o)
    cb = sum(len(b) for b, _ in c)
    print(f"original window bytes={ob}  candidate window bytes={cb}")

    # ordered raw byte diff
    raw_o = b"".join(bytes(b) for b, _ in o)
    raw_c = b"".join(bytes(b) for b, _ in c)
    n = min(len(raw_o), len(raw_c))
    raw_diff = sum(1 for i in range(n) if raw_o[i] != raw_c[i]) + abs(len(raw_o)-len(raw_c))
    print(f"ordered raw differing bytes in window={raw_diff}")

    # multiset of normalized instructions
    no = Counter(normalize(b) for b, _ in o)
    nc = Counter(normalize(b) for b, _ in c)
    print(f"normalized multiset equal (masking jump-off + call-imm)= {no == nc}")
    if no != nc:
        only_o = no - nc
        only_c = nc - no
        print(f"  insns only in original: {sum(only_o.values())}")
        print(f"  insns only in candidate: {sum(only_c.values())}")
        for t, cnt in list(only_o.items())[:20]:
            print("   O", cnt, bytes(t).hex())
        for t, cnt in list(only_c.items())[:20]:
            print("   C", cnt, bytes(t).hex())

    # multiset of opcodes only
    oo = Counter(b[0] for b, _ in o)
    oc = Counter(b[0] for b, _ in c)
    print(f"opcode histogram equal= {oo == oc}")
    if oo != oc:
        allk = sorted(set(oo)|set(oc))
        for k in allk:
            if oo.get(k,0)!=oc.get(k,0):
                print(f"   opcode 0x{k:02x}: orig={oo.get(k,0)} cand={oc.get(k,0)}")

    # multiset of full mnemonic text with hex addresses stripped
    def strip_text(t):
        t = re.sub(r"<[^>]*>", "", t)
        t = re.sub(r"[+-]0x[0-9a-f]+", "", t)
        return t.strip()
    to = Counter(strip_text(t) for _, t in o)
    tc = Counter(strip_text(t) for _, t in c)
    print(f"mnemonic(text, addr-stripped) multiset equal= {to == tc}")
    if to != tc:
        only_o = to - tc; only_c = tc - to
        print(f"  text-only-in-original: {sum(only_o.values())}  text-only-in-candidate: {sum(only_c.values())}")
        for t,cnt in list(only_o.items())[:25]:
            print("   TO", cnt, repr(t))
        for t,cnt in list(only_c.items())[:25]:
            print("   TC", cnt, repr(t))

if __name__ == "__main__":
    main()
