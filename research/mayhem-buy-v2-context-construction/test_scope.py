"""Actual in-memory Source/edge mutations; reference files are never changed."""
if not __debug__:
    raise RuntimeError('Evidence assertions require ordinary Python')
from pathlib import Path
import collections
import gzip
import importlib.util
import json
import struct
import sys

P = Path(__file__).resolve().parent
sys.dont_write_bytecode = True


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    value = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(value)
    return value


def run():
    a = module('ownership_scope_analysis', P / 'analysis.py')
    wm = module('ownership_scope_windows', P / 'window_map.py')
    ref = module('ownership_scope_calls', P / 'quote_reference.py')
    image = gzip.decompress((P / 'builds/direct/symbols.so.gz').read_bytes())
    catalog = wm.windows(image)
    row = next(r for r in catalog if r['name'] and '6buy_v27handler17h' in r['name'])
    source = a.source_origin(wm, image, row)
    code = wm.m.instructions(image, row['address'], row['bytes'])
    j = next(i for i, x in enumerate(code) if x['offset'] == source['instruction_offset'])
    slot = code[j + 1]['displacement']
    tail = code[j + 2:j + 8]
    field = lambda opcode, off: next(x for x in tail if x['opcode'] == opcode and x['destination'] == 10 and x['displacement'] == slot + off)
    length, line, tag, error = field(0x7a, 8), field(0x62, 16), field(0x72, 72), field(0x62, 144)

    def file_offset(at, size=1):
        s = next(s for s in wm.m.elf_layout(image)['sections'] if s['type'] != 8 and s['address'] <= at and at + size <= s['address'] + s['size'])
        return s['offset'] + at - s['address']

    def immediate(ins, value):
        return file_offset(row['address'] + ins['offset'] + 4, 4), struct.pack('<i', value)

    relocations = []
    for section in wm.m.elf_layout(image)['sections']:
        if section['type'] == 9:
            for p in range(section['offset'], section['offset'] + section['size'], 16):
                address, info = struct.unpack_from('<QQ', image, p)
                if address == row['address'] + source['instruction_offset']:
                    relocations.append((p + 8, struct.pack('<Q', info & ~0xffffffff)))
    assert len(relocations) == 1
    cases = {
        'filename-truncation': immediate(length, 49),
        'source-line-store-width': (file_offset(row['address'] + line['offset']), b'\x7a'),
        'source-line-slot': (file_offset(row['address'] + line['offset'] + 2, 2), struct.pack('<h', slot + 20)),
        'origin-variant': immediate(tag, 1),
        'error-variant': immediate(error, 6009),
        'filename-route': (file_offset(source['filename_pointer']), b'X'),
        'filename-relocation': relocations[0],
    }
    rejected = []
    for name, (at, data) in cases.items():
        mutant = bytearray(image)
        assert mutant[at:at + len(data)] != data
        mutant[at:at + len(data)] = data
        try:
            a.source_origin(wm, bytes(mutant), row)
        except AssertionError:
            rejected.append(name)
        else:
            raise AssertionError(('invalid Source record escaped', name))
    mutant = bytearray(image)
    at, data = immediate(line, 102)
    mutant[at:at + len(data)] = data
    changed = a.source_origin(wm, bytes(mutant), row)
    assert changed['line'] == 102 and changed != source
    # Normal measurement rejects this valid-but-changed field against its
    # bound actual Source observation. The reader must not invent line101.
    mutant = bytearray(image)
    at = file_offset(source['filename_pointer'] + source['filename_bytes'])
    mutant[at] ^= 1
    assert a.source_origin(wm, bytes(mutant), row) == source
    calls = ref.calls(wm, image, row, catalog)
    old = next(c for c in calls if c.get('signature') == '4ded9e2e313148cd8c463bb5a2c56fadff6b3a2e2821f83bef667750bd37044d')
    replacement = next(c for c in calls if c.get('bytes') == 80)
    mutant = bytearray(image)
    pc = row['address'] + old['offset']
    immediate_value = (replacement['target'] - pc - 8) // 8
    struct.pack_into('<i', mutant, file_offset(pc + 4, 4), immediate_value)
    changed_catalog = wm.windows(bytes(mutant))
    changed_row = next(r for r in changed_catalog if r['address'] == row['address'])
    assert changed_row['signature'] == row['signature'], 'existing call mask remains unchanged'
    altered_calls = ref.calls(wm, bytes(mutant), changed_row, changed_catalog)
    assert collections.Counter(map(ref.identity, altered_calls)) != collections.Counter(map(ref.identity, calls))
    assert image == gzip.decompress((P / 'builds/direct/symbols.so.gz').read_bytes())
    return dict(invalid_source_mutations_rejected=rejected,
                changed_valid_source_line_observed=True, adjacent_filename_byte_outside_scope=True,
                wrong_callee_detected_despite_unchanged_normalized_body=True,
                reference_files_changed=False)


if __name__ == '__main__':
    print(json.dumps(run(), sort_keys=True))
