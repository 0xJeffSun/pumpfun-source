#!/usr/bin/env python3
"""Verify static source integrity, optionally compare complete unmodified bytes.

Default mode reads no executable or runtime/build receipt. Optional comparison
runs no compiler or VM and uses no masks, patching, order normalization or reuse.
"""
from pathlib import Path
import argparse, hashlib, json, re
from elf_extent import elf_extent
from allocate import allocation_image
P = Path(__file__).resolve().parent
H = lambda b: hashlib.sha256(b).hexdigest()

def verify_packet():
    expected = json.loads((P / 'manifest.json').read_text())['files']
    members = list(P.rglob('*'))
    if any(p.is_symlink() for p in members):
        raise ValueError('packet symlink rejected')
    actual = {p.relative_to(P).as_posix(): H(p.read_bytes()) for p in members
              if p.is_file() and p != P / 'manifest.json' and '__pycache__' not in p.parts}
    if actual != expected:
        raise ValueError('packet membership/content changed')
    script = (P / 'inferred-text-layout.ld').read_text()
    rows = re.findall(r'^    ([A-Za-z0-9_.*:-]+)\("(\.text\.[^"\n]+)"\)$', script, re.M)
    if len(rows) != 492 or len(set(rows)) != 492:
        raise ValueError('expected 492 distinct object/section selectors')
    for line in script.splitlines():
        if line.startswith('    ') and line != '    *(.text*)' and not re.fullmatch(r'    [A-Za-z0-9_.*:-]+\("\.text\.[^"\n]+"\)', line):
            raise ValueError('unexpected linker input directive')
    canonical = '/* Inferred nonhistorical layout; source-compiled sections only. */\nOVERWRITE_SECTIONS {\n  .text : {\n' + ''.join('    ' + obj + '("' + sec + '")\n' for obj, sec in rows) + '    *(.text*)\n  } :text\n}\n'
    if script != canonical:
        raise ValueError('unexpected linker script grammar')
    # No byte-emission, address, fill, source-file input, or binary inclusion.
    if re.search(r'\b(?:BYTE|SHORT|LONG|QUAD|FILL|INPUT|INCLUDE|OUTPUT|AT|PROVIDE)\s*\(', script):
        raise ValueError('non-order linker directive')
    return rows

def compare(original, compiled, exported=None):
    e = json.loads((P / 'expected.json').read_text())
    if H(original) != e['capture_sha256'] or len(original) != e['capture_bytes']:
        raise ValueError('unexpected captured reference')
    if H(compiled) != e['compiler_elf_sha256'] or len(compiled) != e['compiler_elf_bytes']:
        raise ValueError('unexpected compiler ELF')
    extent = elf_extent(original)
    if extent != len(compiled) or elf_extent(compiled) != len(compiled):
        raise ValueError('ELF extent differs')
    if original[:extent] != compiled or any(original[extent:]):
        raise ValueError('raw ELF bytes or zero allocation tail differ')
    generated = allocation_image(compiled, len(original))
    if generated != original:
        raise ValueError('separate allocation image differs')
    if exported is not None and (exported != generated or exported != original):
        raise ValueError('provided allocation image differs')
    return {'raw_compiler_elf_equal': True, 'compiler_elf_bytes': extent,
            'raw_compiler_file_equals_capture': compiled == original,
            'zero_allocation_tail_bytes': len(original) - extent,
            'generated_allocation_image_equal': True,
            'provided_allocation_image_compared': exported is not None,
            'normalization_used': False}

def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--original', type=Path)
    p.add_argument('--compiled', type=Path)
    p.add_argument('--allocation', type=Path)
    a = p.parse_args()
    verify_packet()
    if bool(a.original) != bool(a.compiled) or (a.allocation and not a.original):
        p.error('provide --original and --compiled together')
    result = {'packet_verified': True, 'selectors': 492, 'compiler_executed': False,
              'runtime_verified': False, 'comparison_performed': bool(a.original)}
    if a.original:
        result.update(compare(a.original.read_bytes(), a.compiled.read_bytes(),
                              a.allocation.read_bytes() if a.allocation else None))
    print(json.dumps(result, indent=2, sort_keys=True))

if __name__ == '__main__':
    main()
