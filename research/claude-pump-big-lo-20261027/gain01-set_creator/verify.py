#!/usr/bin/env python3
"""Stdlib-only check of pump-big-lo gain01 (set_creator::set 0x38fc0, set_creator::sync 0x3a7b8).

  python3 -B research/claude-pump-big-lo-20261027/gain01-set_creator/verify.py

Runs with HOME set to an empty directory (no toolchain or cache needed):
1. elf/*.gz decompress to the SHA-256 values in elf/SHA256SUMS; score-summary.json is for that unstripped
   ELF and records no normalized or raw losses.
2. Each claimed window is a function in the unstripped ELF (found through its symbol table) of the same
   length as the original window in evidence/original/pump/deployed.so, equal after the scorer's
   normalization: internal call immediates and section-pointer lddw values are masked.
3. source.patch has the hash recorded in MANIFEST.json, and the runtime summaries are clean.
"""
import gzip, hashlib, json, struct
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = next(p for p in HERE.parents if (p / 'evidence/original/pump/deployed.so').is_file())
CLAIMS = {0x38fc0: (6136, '11set_creator3set17'), 0x3a7b8: (3552, '11set_creator4sync17')}


def sections(blob):
    shoff, = struct.unpack_from('<Q', blob, 0x28)
    shentsize, shnum, shstrndx = struct.unpack_from('<HHH', blob, 0x3a)
    hdrs = [struct.unpack_from('<IIQQQQIIQQ', blob, shoff + i * shentsize) for i in range(shnum)]
    st = hdrs[shstrndx]
    name = lambda off: blob[st[4] + off:blob.index(b'\0', st[4] + off)].decode()
    return {name(h[0]): h for h in hdrs}


def symbols(blob, secs):
    sym, strtab = secs['.symtab'], secs['.strtab']
    for i in range(sym[5] // 24):
        name_off, info, other, shndx, value, size = struct.unpack_from('<IBBHQQ', blob, sym[4] + i * 24)
        yield blob[strtab[4] + name_off:blob.index(b'\0', strtab[4] + name_off)].decode(errors='replace'), value, size


def normalize(raw, secs):
    masked = bytearray(raw)
    i = 0
    while i < len(raw):
        op, regs, off, imm = struct.unpack_from('<BBhi', raw, i)
        if op == 0x18:
            value = struct.unpack_from('<I', raw, i + 4)[0] | struct.unpack_from('<I', raw, i + 12)[0] << 32
            if any(h[3] > 0 and h[3] <= value < h[3] + h[5] for h in secs.values()):
                masked[i + 4:i + 8] = bytes(4); masked[i + 12:i + 16] = bytes(4)
            i += 16
        else:
            if op == 0x85 and regs >> 4 == 1 and imm != -1:
                masked[i + 4:i + 8] = bytes(4)
            i += 8
    return bytes(masked)


def text_bytes(blob, secs, addr, n):
    t = secs['.text']
    return blob[t[4] + addr - t[3]: t[4] + addr - t[3] + n]


def main():
    manifest = json.loads((HERE / 'MANIFEST.json').read_text())
    sums = dict(reversed(line.split()) for line in (HERE / 'elf/SHA256SUMS').read_text().splitlines())
    elves = {}
    for name in ('candidate.so', 'unstripped.so'):
        data = gzip.decompress((HERE / 'elf' / (name + '.gz')).read_bytes())
        assert hashlib.sha256(data).hexdigest() == sums[name], name
        elves[name] = data
    summary = json.loads((HERE / 'score-summary.json').read_text())
    assert summary['candidate_sha256'] == sums['unstripped.so'], 'score summary is for another ELF'
    assert not summary['losses'] and not summary['raw_losses'], 'losses recorded'
    orig = (ROOT / 'evidence/original/pump/deployed.so').read_bytes()
    assert hashlib.sha256(orig).hexdigest() == manifest['original_sha256'], 'original image differs'
    osecs = sections(orig)
    blob = elves['unstripped.so']; secs = sections(blob)
    syms = list(symbols(blob, secs))
    for addr, (n, needle) in CLAIMS.items():
        want = normalize(text_bytes(orig, osecs, addr, n), osecs)
        hits = [(s, v, z) for s, v, z in syms if needle in s and z == n]
        assert hits, f'{needle}: no {n}-byte symbol'
        assert any(normalize(text_bytes(blob, secs, v, z), secs) == want for _, v, z in hits), f'{addr:#x}: bytes differ'
        assert hex(addr) in summary['gains'], f'{addr:#x} not in the score gains'
        print(f'{addr:#x}: {hits[0][0][:60]} matches the original after normalization ({n} B)')
    assert hashlib.sha256((HERE / 'source.patch').read_bytes()).hexdigest() == manifest['patch_sha256'], 'patch changed'
    for rt in manifest['runtime']:
        r = json.loads((HERE / rt).read_text())
        assert r['candidate_sha256'] == sums['candidate.so'], rt
        assert not r['errors'] and r['diagnostic_mismatches'] == 0 and r['case_count'] == r['expected_cases'], rt
        print(f"{rt}: {r['suites']} suites, {r['case_count']} cases, 0 errors, 0 diagnostic mismatches")
    print('verified:', summary['normalized'], '/', summary['raw'], 'gains', summary['gains'])


if __name__ == '__main__':
    main()
