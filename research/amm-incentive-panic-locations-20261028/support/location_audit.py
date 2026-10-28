"""Resolve the real nine Location operands in the complete matched updater."""
from pathlib import Path
import struct
from elf_reader import Elf


def read_address(elf, address, size):
    for section in elf.raw:
        if section[3] <= address and address + size <= section[3] + section[5]:
            offset = section[4] + address - section[3]
            return elf.b[offset:offset + size]
    return None


def location(elf, address):
    raw = read_address(elf, address, 24)
    if raw is None:
        return None
    pointer, length, line, column = struct.unpack('<QQII', raw)
    if pointer & 0xffffffff == 0 and pointer >> 32:
        pointer >>= 32
    filename = read_address(elf, pointer, length) if length < 500 else None
    if filename is None or not filename.endswith(b'.rs'):
        return None
    try:
        return {'file': filename.decode(), 'line': line, 'column': column}
    except UnicodeDecodeError:
        return None


def audit(original_path, candidate_path):
    original, candidate = Elf(Path(original_path)), Elf(Path(candidate_path))
    start, size = 0x6db20, 6312
    functions = [f for f in candidate.funcs if '23update_token_incentives' in f['name']]
    if len(functions) != 1:
        raise ValueError('Expected one real updater function')
    target = functions[0]['start']
    if functions[0]['size'] != size or original.normalized[start:start + size] != candidate.normalized[target:target + size] or original.pattern(start, size) != candidate.pattern(target, size):
        raise ValueError('Complete updater or relocation pattern differs')
    rows = []
    for operand, relocation in sorted(original.relocations.items()):
        if not start <= operand < start + size or relocation['type'] != 8 or original.b[operand] != 0x18:
            continue
        def address(elf, at):
            return struct.unpack_from('<I', elf.b, at + 4)[0] | struct.unpack_from('<I', elf.b, at + 12)[0] << 32
        old = location(original, address(original, operand))
        if old is None:
            continue
        new = location(candidate, address(candidate, target + operand - start))
        rows.append({'offset': operand - start, 'original': old, 'candidate': new, 'equal': old == new})
    if len(rows) != 9:
        raise ValueError('Expected nine original Location references')
    return {'function_original': hex(start), 'function_candidate': hex(target), 'function_bytes': size,
        'normalized_equal': True, 'locations': rows,
        'mismatches': [r['offset'] for r in rows if not r['equal']]}
