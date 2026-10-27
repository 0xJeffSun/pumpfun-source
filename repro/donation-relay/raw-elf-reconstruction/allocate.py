#!/usr/bin/env python3
"""Create a separate zero-filled loader-allocation image, never rewrite an ELF.

The input is a compiler-produced ELF. Size is explicit allocation metadata, not
read from an original capture. This is not part of compilation or historical
recipe evidence. The input file is never modified; output must not exist.
"""
from pathlib import Path
import argparse
from elf_extent import elf_extent

def allocation_image(compiled, allocated_size):
    if elf_extent(compiled) != len(compiled):
        raise ValueError('input must be exactly the compiler ELF extent')
    if not len(compiled) <= allocated_size <= 64 * 1024 * 1024:
        raise ValueError('invalid allocation size')
    return compiled + bytes(allocated_size - len(compiled))

def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('compiled', type=Path)
    p.add_argument('output', type=Path)
    p.add_argument('--size', type=int, required=True)
    args = p.parse_args()
    result = allocation_image(args.compiled.read_bytes(), args.size)
    with args.output.open('xb') as out:
        out.write(result)
    print('Wrote separate allocation image:', len(result), 'bytes')

if __name__ == '__main__':
    main()
