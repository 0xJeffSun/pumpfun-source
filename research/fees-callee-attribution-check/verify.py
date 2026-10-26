#!/usr/bin/env python3
"""Recompute the callee-identity check for the Fees first-account attribution.

Independently re-derives PR #74 (research/fees-account-parser) callee claims with
the corrected local-CALL encoding from repro/pump_fees/first-account-boundary-admission:
target_vaddr = call_vaddr + 8 + 8 * signed_imm32 (Anza sbpf elf.rs PC-relative fixup,
ebpf.rs INSN_SIZE=8). Reads only the three pinned ELF inputs; no REA session needed
for the arithmetic, every input byte is hashed against the pins below.
"""
import hashlib
import json
import argparse
import struct
import sys
from pathlib import Path

PARENT = Path(__file__).resolve().parent
ROOT = PARENT.parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
from analyze import elf_layout  # noqa: E402

ORIG = ROOT / 'evidence/original/pump_fees/deployed.so'
CAND = ROOT / 'repro/pump_fees/sharing-authorize-main-v144/main/candidate.so'
LCS = ROOT / 'repro/pump_fees/linux-current-source-build/fees-current-linux-v144.so'

ORIG_SHA = '4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e'
CAND_SHA = '2387f8139a13918a5c9c523f140ecdd72db7243c8e2ed9cd7e1ff9d42ad6c8af'
LCS_SHA = '6c44d9f2ffe9b18c79a6344b256d8acd7a34c10e77b894c51f46512a447b8ce6'
DISCRIMINATOR = bytes.fromhex('8f3492bbdb7b4c9b')


def sha(raw):
    return hashlib.sha256(raw).hexdigest()


def text_section(image):
    return next(s for s in elf_layout(image)['sections'] if s['name'] == '.text')


def vread(image, section, vaddr, nbytes):
    off = section['offset'] + vaddr - section['address']
    return image[off:off + nbytes]


def resolve_call(image, section, call_vaddr):
    insn = vread(image, section, call_vaddr, 8)
    if insn[:4] != bytes([0x85, 0x10, 0, 0]):
        raise AssertionError(f'not a src=1 local CALL at {call_vaddr:#x}: {insn.hex()}')
    return call_vaddr + 8 + 8 * struct.unpack('<i', insn[4:])[0]


def lddw_payloads(image, section, start, size):
    """(vaddr, imm64) for every lddw in [start, start+size)."""
    out = []
    v = start
    while v < start + size:
        insn = vread(image, section, v, 16)
        if insn[0] == 0x18:
            imm = int.from_bytes(insn[4:8], 'little') | (int.from_bytes(insn[12:20], 'little') << 32)
            out.append((v, imm))
            v += 16
        else:
            v += 8
    return out


def main():
    orig, cand, lcs = ORIG.read_bytes(), CAND.read_bytes(), LCS.read_bytes()
    assert sha(orig) == ORIG_SHA, 'original deployed.so pin'
    assert sha(cand) == CAND_SHA, 'candidate.so pin'
    assert sha(lcs) == LCS_SHA, 'linux-current-source candidate pin'

    ot, ct, lt = text_section(orig), text_section(cand), text_section(lcs)

    # 1. Query first CALLs (PR74 numbers, corrected encoding).
    assert resolve_call(orig, ot, 519024) == 71256, 'original query first CALL'
    assert resolve_call(cand, ct, 127384) == 83552, 'candidate query first CALL'

    # 2. Candidate wrapper helper CALLs (corrected encoding: helper CALL sits one
    #    instruction before the wrapper's jne block; PR74's wrapper numbering is kept).
    assert resolve_call(cand, ct, 83208) == 706160   # wrapper A error path: Error::from
    assert resolve_call(cand, ct, 83336) == 35856    # wrapper A helper
    assert resolve_call(cand, ct, 83408) == 706160   # wrapper B error path: Error::from
    assert resolve_call(cand, ct, 83536) == 30752    # wrapper B helper
    assert resolve_call(cand, ct, 83608) == 706160   # wrapper C error path: Error::from
    assert resolve_call(cand, ct, 83736) == 26680    # wrapper C helper

    # 3. Original wrapper: helper CALL at 71440 -> 36,072.
    assert resolve_call(orig, ot, 71440) == 36072

    # 4. FeeConfig discriminator via lddw immediates.
    o_payloads = {v: imm for v, imm in lddw_payloads(orig, ot, 36072, 1144)}
    c_payloads = {v: imm for v, imm in lddw_payloads(cand, ct, 26680, 1144)}
    a_payloads = {v: imm for v, imm in lddw_payloads(cand, ct, 35856, 1024)}
    b_payloads = {v: imm for v, imm in lddw_payloads(cand, ct, 30752, 1024)}
    lit = int.from_bytes(DISCRIMINATOR, 'little')
    assert any(imm == lit for imm in o_payloads.values()), 'original helper carries FeeConfig discriminator'
    assert any(imm == lit for imm in c_payloads.values()), 'candidate C helper carries FeeConfig discriminator'
    assert not any(imm == lit for imm in a_payloads.values()), 'candidate A helper lacks it'
    assert not any(imm == lit for imm in b_payloads.values()), 'candidate B helper lacks it'
    orig_site = next(v for v, imm in o_payloads.items() if imm == lit)
    c_site = next(v for v, imm in c_payloads.items() if imm == lit)
    assert orig_site == 36696, f'original literal site {orig_site}'
    assert c_site == 27320, f'candidate C literal site {c_site}'

    # 5. Corrected B/C store shapes in the linux-current-source candidate.
    b_store = vread(lcs, lt, 83480, 8)
    c_store = vread(lcs, lt, 83664, 8)
    assert b_store == bytes.fromhex('7a06000000000000'), f'B slot0 store {b_store.hex()}'
    assert c_store == bytes.fromhex('7206040102000000'), f'C tag store {c_store.hex()}'

    # 6. REA receipts: every saved read resolves against the pinned subject it names,
    #    at the address it names, and equals the bytes the binary holds there.
    P = Path(__file__).resolve().parent
    subjects = {sha(orig): (orig, ot), sha(cand): (cand, ct), sha(lcs): (lcs, lt)}
    receipts = sorted((P / 'rea-evidence').glob('ev_*.json'))
    assert receipts, 'no REA receipts'
    for path in receipts:
        rec = json.loads(path.read_text())
        assert rec['provider']['id'] == 'ghidra', f'{path.name}: provider'
        image, section = subjects[rec['subject']['sha256']]
        params = rec['parameters']
        assert params['address'] == hex(int(params['address'], 16)), f'{path.name}: address form'
        assert params['length'] == len(bytes.fromhex(rec['bytes_hex'])), f'{path.name}: length'
        observed = vread(image, section, int(params['address'], 16), params['length'])
        assert observed.hex() == rec['bytes_hex'], f'{path.name}: receipt bytes'
        assert path.name == f"{path.name}", path.name

    manifest = json.loads((P / 'manifest-sha256.json').read_text())
    for name, pin in manifest.items():
        assert sha((P / name).read_bytes()) == pin, f'manifest pin: {name}'

    print(json.dumps({
        'rea_receipts_checked': len(receipts),
        'verified': True,
        'check': 'callee-identity attribution (PR #74 claim, corrected CALL encoding)',
        'call_targets': {
            'original_query_first': 71256,
            'candidate_query_first': 83552,
            'candidate_wrapper_A_helper': 35856,
            'candidate_wrapper_B_helper': 30752,
            'candidate_wrapper_C_helper': 26680,
        },
        'feeconfig_discriminator_lddw_sites': {
            'original_helper': orig_site,
            'candidate_A_helper': None,
            'candidate_B_helper': None,
            'candidate_C_helper': c_site,
        },
        'corrected_store_shapes': {
            'candidate_B': 'stdw [r6+0], imm 0 (0x7a op, store-immediate)',
            'candidate_C': 'stb [r6+260], imm 2 (0x72 op, store-immediate byte)',
        },
        'attribution': 'candidate query first CALL reaches the only wrapper whose helper '
                       'carries the FeeConfig discriminator, matching the original helper; '
                       'attribution follows the callee (candidate 83,552 -> 26,680)',
    }, indent=2))


if __name__ == '__main__':
    main()
