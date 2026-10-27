"""Independent scalar enumeration and actual ELF mutations for the certificate."""
import copy
import os
import tempfile
import gzip
import json
from pathlib import Path
import random
import struct
import sys

sys.dont_write_bytecode = True
P = Path(__file__).resolve().parent
sys.path.insert(0, str(P))
import verify


def run():
    if hasattr(os, 'mkfifo'):
        original_packet = verify.P
        with tempfile.TemporaryDirectory(prefix='initializer-manifest-') as temp:
            verify.P = Path(temp)
            (verify.P / 'manifest.json').write_text('{}')
            os.mkfifo(verify.P / 'unlisted-fifo')
            try:
                try:
                    verify.manifest()
                except AssertionError as error:
                    assert 'special file' in str(error)
                else:
                    raise AssertionError('unlisted special file accepted')
            finally:
                verify.P = original_packet
    wm = verify.module('test_windows', P / 'window_map.py')
    machine = verify.module('test_machine', P / 'machine.py')
    rng = random.Random(534840)
    anchors = [-machine.HALF, -1, 0, machine.HALF - 1, machine.MOD - 1]
    comparisons = 0
    for i in range(128):
        low = rng.choice(anchors) + rng.randint(-40, 40)
        high = low + rng.randint(1, 64)
        domains = dict(now=(low, high))
        left = machine.Affine('now', rng.choice(anchors) + rng.randint(-40, 40))
        right = (machine.Affine('now', rng.choice(anchors) + rng.randint(-40, 40))
                 if i % 2 else rng.choice(anchors) % machine.MOD)
        for signed in [False, True]:
            for relation in ['eq', 'ne', 'lt', 'ge']:
                cells = machine.partition(domains, left, right, relation, signed)
                covered = []
                for decision, cell in cells:
                    start, stop = cell['now']
                    for coordinate in range(start, stop + 1):
                        def direct(value):
                            result = ((coordinate + value.addend) if isinstance(value, machine.Affine) else value) % machine.MOD
                            return result - machine.MOD if signed and result >= machine.HALF else result
                        a, b = direct(left), direct(right)
                        expected = (a == b if relation == 'eq' else a != b if relation == 'ne'
                                    else a < b if relation == 'lt' else a >= b)
                        assert decision == expected
                        covered.append(coordinate)
                        comparisons += 1
                assert covered == list(range(low, high + 1))
    memory = {}
    key = machine.Blob(tuple(('arbitrary_key_byte', i) for i in range(32)))
    machine.store(memory, 128, key, 32)
    assert machine.load(memory, 128, 32) == key
    counter = machine.Affine('lamports', machine.MOD - 1)
    machine.store(memory, 8, counter, 8)
    assert machine.load(memory, 8, 8) == counter

    original = gzip.decompress((P / 'captures/original.so.gz').read_bytes())
    catalog = wm.windows(original)
    window = next(x for x in catalog if x['address'] == 534840)
    rows = wm.m.instructions(original, window['address'], window['bytes'])
    def file_offset(address):
        section = next(s for s in wm.m.elf_layout(original)['sections']
                       if s['address'] <= address < s['address'] + s['size'] and s['type'] != 8)
        return section['offset'] + address - section['address']
    def operand(row, delta, value, fmt):
        image = bytearray(original)
        struct.pack_into(fmt, image, file_offset(window['address'] + row['offset']) + delta, value)
        return bytes(image)
    mutations = {}
    row = next(x for x in rows if x['opcode'] == 0x27)
    assert row['immediate'] == 3600
    mutations['duration_multiplier_3601'] = operand(row, 4, 3601, '<i')
    row = next(x for x in rows if x['opcode'] == 0x07 and x['immediate'] == 1)
    mutations['clone_count_increment_2'] = operand(row, 4, 2, '<i')
    row = next(x for x in rows if x['opcode'] == 0x7b and x['displacement'] == 416)
    mutations['start_timestamp_wrong_field'] = operand(row, 2, 424, '<h')
    row = next(x for x in rows if x['opcode'] == 0x79 and x['source'] == 1 and x['displacement'] == 0 and 256 <= x['offset'] <= 312)
    mutations['mint_key_duplicate_word'] = operand(row, 2, 8, '<h')
    mutations['mint_key_wrong_register'] = operand(row, 1, row['destination'] | (10 << 4), '<B')
    row = next(x for x in rows if x['offset'] == 360)
    assert row['opcode'] == 0x15 and row['immediate'] == 1
    mutations['clock_result_branch_inverted'] = operand(row, 4, 0, '<i')
    row = next(x for x in rows if x['opcode'] == 0x6a)
    mutations['initial_flag_nonzero'] = operand(row, 4, 1, '<i')
    image = bytearray(original)
    struct.pack_into('<I', image, file_offset(0xb18d8 + 16), 533)
    mutations['overflow_source_line_533'] = bytes(image)
    image = bytearray(original)
    struct.pack_into('<Q', image, file_offset(0xb13c0 + 8), 16)
    mutations['unwrap_vtable_size_16'] = bytes(image)
    failures = {}
    for label, image in mutations.items():
        try:
            machine.execute(wm, image, window, catalog, 255, label == 'unwrap_vtable_size_16')
        except (AssertionError, KeyError, StopIteration, TypeError) as error:
            failures[label] = type(error).__name__
        else:
            raise AssertionError(('mutation escaped', label))
    # The subroutine contract intentionally does not read unrelated capture tails.
    extent = wm.m.elf_layout(original)['elf_extent']
    assert len(original) > extent
    image = bytearray(original)
    image[-1] ^= 1
    before, _ = machine.execute(wm, original, window, catalog, 255, False)
    after, _ = machine.execute(wm, bytes(image), window, catalog, 255, False)
    assert before == after
    return dict(scalar_comparisons=comparisons, rejected_elf_mutations=failures,
                opaque_capture_tail_boundary='unchanged subroutine result; capture hash/manifest still rejects the changed whole artifact')


if __name__ == '__main__':
    print(json.dumps(run(), sort_keys=True))
