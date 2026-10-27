#!/usr/bin/env python3
"""Shared helpers: load original + candidate with the repo's retained reader,
decode SBF instructions, and build masked token streams for alignment."""
import importlib.util, json, struct, hashlib
from pathlib import Path

WT = Path(__file__).resolve().parents[3]  # repository root (research/claude-amm-mid-20261027/tools)
_s = importlib.util.spec_from_file_location('elf', WT / 'repro/pump_amm/claim-self-transfer-v144/static-tool/elf_reader.py')
elf = importlib.util.module_from_spec(_s); _s.loader.exec_module(elf)
ORIGINAL = WT / 'evidence/original/pump_amm/deployed.so'


def load(cand=None, syms=None):
    o = elf.Elf(ORIGINAL)
    c = elf.Elf(Path(cand)) if cand else None
    s = elf.Elf(Path(syms)) if syms else None
    return o, c, s


def windows(o):
    entries = sorted(set(o.entries) | {o.lo})
    return list(zip(entries, entries[1:] + [o.hi]))


def insns(e, start, end):
    """Yield (addr, opcode, dst, src, off, imm, width)."""
    b = e.b
    at = start
    while at < end:
        op = b[at]; regs = b[at + 1]; off = struct.unpack_from('<h', b, at + 2)[0]
        imm = struct.unpack_from('<i', b, at + 4)[0]
        if op == 0x18:
            hi = struct.unpack_from('<i', b, at + 12)[0]
            yield (at, op, regs & 15, regs >> 4, off, (imm & 0xffffffff) | ((hi & 0xffffffff) << 32), 16)
            at += 16
        else:
            yield (at, op, regs & 15, regs >> 4, off, imm, 8)
            at += 8


def tokens(e, start, end, name_of=None, mask_frame=False):
    """Masked token stream: call imm -> callee label (if name_of given) or 'CALL';
    relocated lddw -> 'LDDW-REL'; r10 offsets optionally masked."""
    out = []
    for at, op, dst, src, off, imm, w in insns(e, start, end):
        if op == 0x85 and src == 1 and e.relocations.get(at, {}).get('type') != 10:
            tgt = e.calls.get(at)
            lab = name_of(tgt) if (name_of and tgt is not None) else 'CALL'
            out.append(('call', lab))
            continue
        if op == 0x85 and e.relocations.get(at, {}).get('type') == 10:
            out.append(('syscall', e.relocations[at]['symbol']))
            continue
        if op == 0x18 and at in e.relocations:
            out.append(('lddw', dst, 'REL'))
            continue
        if mask_frame and (dst == 10 or src == 10) and op not in (0x85, 0x95):
            out.append((op, dst, src, 'FR', imm if src != 10 and dst != 10 else 'X'))
            continue
        out.append((op, dst, src, off, imm))
    return out


def sha(b):
    return hashlib.sha256(b).hexdigest()
