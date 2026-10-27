#!/usr/bin/env python3
"""Negative controls: the packet checks must reject tampered scripts and ELFs.

Each control mutates a temporary copy (never a packet file) and expects the
corresponding check to fail. Run after verify.py; no compiler or VM is used.
"""
import gzip
import struct
import sys
import tempfile
from pathlib import Path

P = Path(__file__).resolve().parent
sys.path.insert(0, str(P / 'tools'))
import layout_script  # noqa: E402
import translation  # noqa: E402

DEFAULT = (P / 'tools/default.ld').read_text()


def rejects(fn):
    try:
        fn()
    except (AssertionError, KeyError):
        return True
    return False


def main():
    d = P / 'round21'
    script = (d / 'ordered.ld').read_text()
    lines = script.split('\n')
    sel = [i for i, x in enumerate(lines) if x.startswith('    *') and '("' in x]
    results = {}
    # 1. an address assignment (padding) inside .text is rejected
    padded = script.replace(lines[sel[10]] + '\n', lines[sel[10]] + '\n    . = . + 8;\n')
    results['address_statement_rejected'] = rejects(lambda: layout_script.check_script(DEFAULT, padded))
    # 2. a duplicated selector is rejected
    dup = script.replace(lines[sel[3]] + '\n', lines[sel[3]] + '\n' + lines[sel[3]] + '\n')
    results['duplicate_selector_rejected'] = rejects(lambda: layout_script.check_script(DEFAULT, dup))
    # 3. a change outside the .text input list is rejected
    other = script.replace('.rodata : { *(.rodata*) }', '.rodata : { *(.rodata.str*) *(.rodata*) }')
    results['other_section_change_rejected'] = rejects(lambda: layout_script.check_script(DEFAULT, other))
    # 4. a swapped selector pair is a valid script but not the generator output
    swapped = list(lines)
    swapped[sel[5]], swapped[sel[6]] = swapped[sel[6]], swapped[sel[5]]
    results['swapped_order_differs_from_generator'] = '\n'.join(swapped) != script
    with tempfile.TemporaryDirectory(prefix='layout-pump-neg-') as tmp:
        tmp = Path(tmp)
        elf = tmp / 'ordered.so'
        elf.write_bytes(gzip.decompress((d / 'ordered/unstripped.so.gz').read_bytes()))
        bmap, omap = tmp / 'base.map', tmp / 'ordered.map'
        bmap.write_bytes(gzip.decompress((d / 'baseline/link.map.gz').read_bytes()))
        omap.write_bytes(gzip.decompress((d / 'ordered/link.map.gz').read_bytes()))
        import correspond
        base = correspond.ROOT / 'repro/pump/main-contract-round21-20261027/unstripped.so'
        translation.check(base, bmap, elf, omap)  # the genuine pair passes
        b = bytearray(elf.read_bytes())
        e = translation.Elf(elf)
        t = e.sections['.text']
        i = t['offset']
        while not (b[i] == 0x85 and b[i + 1] >> 4 == 1 and struct.unpack_from('<i', b, i + 4)[0] != -1):
            i += 8
        struct.pack_into('<i', b, i + 4, struct.unpack_from('<i', b, i + 4)[0] + 1)
        bad = tmp / 'bad-call.so'
        bad.write_bytes(bytes(b))
        results['changed_call_immediate_rejected'] = rejects(lambda: translation.check(base, bmap, bad, omap))
        b = bytearray(elf.read_bytes())
        r = e.sections['.rodata']
        b[r['offset'] + 17] ^= 1
        bad2 = tmp / 'bad-rodata.so'
        bad2.write_bytes(bytes(b))
        results['changed_rodata_byte_rejected'] = rejects(lambda: translation.check(base, bmap, bad2, omap))
        b = bytearray(elf.read_bytes())
        struct.pack_into('<Q', b, 24, struct.unpack_from('<Q', b, 24)[0] + 8)
        bad3 = tmp / 'bad-entry.so'
        bad3.write_bytes(bytes(b))
        results['changed_entry_point_rejected'] = rejects(lambda: translation.check(base, bmap, bad3, omap))
    print(results)
    assert all(results.values()), results
    print('all', len(results), 'negative controls passed')


if __name__ == '__main__':
    main()
