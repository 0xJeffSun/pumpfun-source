#!/usr/bin/env python3
"""Compare a candidate Token Metadata ELF with the captured original using the
repository's own window reader (repro/pump_fees/framework-matching/elf_reader.py).

Raw ELF and the zero-padded allocation image are kept separate: the captured
allocation is 793,991 bytes, of which bytes >= the raw ELF length are zero.
"""
import hashlib, json, sys
from pathlib import Path

H = lambda b: hashlib.sha256(b).hexdigest()
WT = Path('/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/bf960843-6806-451b-a211-62c8b228d301/scratchpad/lanes/deps-metaplex/wt')
sys.path.insert(0, str(WT / 'repro/pump_fees/framework-matching'))
from elf_reader import Elf  # noqa: E402

ORIGINAL = WT / 'evidence/dependencies/token_metadata/deployed.so'
UTIL = 346


def windows(e):
    return [(a, z) for a, z in zip(e.entries, e.entries[1:] + [e.hi])]


def compare(cand_path, orig_path=ORIGINAL):
    o, c = Elf(Path(orig_path)), Elf(Path(cand_path))
    assert H(o.b) == '31f0a627dba051a938de650464e55cc5397a4be0fd496929c1f9cf02fe5e9011'
    raw_len = len(c.b)
    tail = o.b[raw_len:]
    padded = c.b + bytes(max(0, len(o.b) - raw_len))
    diffs = [i for i, (x, y) in enumerate(zip(o.b, padded)) if x != y]
    ndiff = len(diffs) + abs(len(padded) - len(o.b))
    by_section = {}
    for i in diffs:
        name = next((n for n, s in o.secs.items() if n and s[5] and s[4] <= i < s[4] + s[5]), '<headers/other>')
        by_section[name] = by_section.get(name, 0) + 1
    ow, cw = windows(o), windows(c)
    same_bounds = o.entries == c.entries
    raw_unequal = [k for k, (a, z) in enumerate(ow) if o.b[a:z] != c.b[a:z]] if same_bounds else None
    chashes = {H(c.normalized[a:z]) for a, z in cw}
    norm_unmatched = [k for k, (a, z) in enumerate(ow) if H(o.normalized[a:z]) not in chashes]
    ua, uz = ow[UTIL]
    util_diff = sum(x != y for x, y in zip(o.b[ua:uz], c.b[ua:uz])) if same_bounds else None
    reloc_o = sorted(o.relocations.items())
    reloc_c = sorted(c.relocations.items())
    return {
        'original_sha256': H(o.b),
        'candidate_sha256': H(c.b),
        'candidate_raw_bytes': raw_len,
        'allocation_image_sha256': H(padded),
        'allocation_tail_zero_bytes': len(o.b) - raw_len if not any(tail) else None,
        'whole_file_equal': padded == o.b,
        'raw_prefix_equal': o.b[:raw_len] == c.b,
        'differing_payload_positions': ndiff,
        'by_section': by_section,
        'same_inferred_boundaries': same_bounds,
        'windows_original': len(ow),
        'windows_candidate': len(cw),
        'raw_equal_windows': (len(ow) - len(raw_unequal)) if raw_unequal is not None else None,
        'unmatched_windows': raw_unequal,
        'normalized_matches': len(ow) - len(norm_unmatched),
        'normalized_unmatched': norm_unmatched,
        'utilize_bytes': (cw[UTIL][1] - cw[UTIL][0]) if len(cw) > UTIL else None,
        'utilize_diff_bytes': util_diff,
        'utilize_normalized_equal': H(o.normalized[ua:uz]) == H(c.normalized[ua:uz]) if same_bounds else None,
        'relocation_records': [len(reloc_o), len(reloc_c)],
        'relocation_offsets_only_in_original': [a for a, _ in reloc_o if a not in c.relocations][:20],
        'relocation_offsets_only_in_candidate': [a for a, _ in reloc_c if a not in o.relocations][:20],
    }


if __name__ == '__main__':
    print(json.dumps(compare(Path(sys.argv[1])), indent=1))
