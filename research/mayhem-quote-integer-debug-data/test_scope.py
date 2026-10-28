"""Change actual in-memory evidence bytes without relying on input-hash failures."""
if not __debug__:
    raise RuntimeError('Evidence assertions require ordinary Python')
from pathlib import Path
import importlib.util
import json
import struct
import sys

P = Path(__file__).resolve().parent
sys.dont_write_bytecode = True
spec = importlib.util.spec_from_file_location('integer_debug_scope', P / 'reader.py')
r = importlib.util.module_from_spec(spec)
spec.loader.exec_module(r)


def run():
    original, candidate = r.inputs()
    baseline = r.inspect(original, candidate)
    d = baseline['selected_data'][1]
    fmt = baseline['integer_debug'][1]['address']
    unit = baseline['nested_debug'][1]['address']
    tu = baseline['tuple_consumer'][1]['address']
    root = next(x for x in baseline['roots'][0]['sites'] if x['side'] == 1)
    quote = baseline['roots'][0]['bodies'][1]['address']

    def offset(at, size=1):
        return r.file_offset(candidate, at, size)

    def byte(at, value):
        return [(offset(at), bytes([value]))]

    def word(at, value):
        return [(offset(at, 8), struct.pack('<Q', value))]

    def immediate(at, value):
        return [(offset(at + 4, 4), struct.pack('<i', value))]

    def function_pointer(at, target):
        return [(offset(at, 8), struct.pack('<II', 0, target))]

    def call(at, target):
        assert (target - at - 8) % 8 == 0
        return immediate(at, (target - at - 8) // 8)

    def relocation(at, kind):
        positions = []
        for s in r.wm.m.elf_layout(candidate)['sections']:
            if s['type'] != 9:
                continue
            for p in range(s['offset'], s['offset'] + s['size'], 16):
                address, info = struct.unpack_from('<QQ', candidate, p)
                if address == at:
                    positions.append((p + 8, struct.pack('<Q', (info & ~0xffffffff) | kind)))
        assert len(positions) == 1
        return positions

    cases = {
        'counted-error-name': byte(d['name_pointer'], ord('X')),
        'error-name-read-length': immediate(fmt + 48, 14),
        'nested-vtable-size': word(d['nested_vtable'] + 8, 7),
        'nested-vtable-alignment': word(d['nested_vtable'] + 16, 4),
        'nested-formatter-routing': function_pointer(d['nested_vtable'] + 24, fmt),
        'nested-formatter-relocation-type': relocation(d['nested_vtable'] + 24, 0),
        'nested-literal-byte': byte(d['nested_literal_pointer'], ord('[')),
        'nested-literal-read-length': immediate(unit + 24, 1),
        'nested-vtable-load-width': byte(tu + 168, 0x61),
        'alternate-vtable-load-offset': [(offset(tu + 392 + 2, 2), struct.pack('<h', 16))],
        'normal-vtable-call-register': immediate(tu + 192, 4),
        'tuple-callee-despite-call-mask': call(fmt + 72, baseline['padding'][1]['address']),
        'padding-callee-despite-call-mask': call(unit + 32, tu),
        'quote-vtable-routing': function_pointer(root['vtable'] + 24, unit),
        'quote-unwrap-callee-despite-call-mask': call(quote + root['unwrap_call_offset'], unit),
    }
    rejected = []
    for name, edits in cases.items():
        mutant = bytearray(candidate)
        for at, data in edits:
            assert mutant[at:at + len(data)] != data, name
            mutant[at:at + len(data)] = data
        try:
            r.inspect(original, bytes(mutant))
        except AssertionError:
            rejected.append(name)
        else:
            raise AssertionError(('mutation escaped', name))

    accepted = []
    for name, at in [('byte-after-counted-name', d['name_pointer'] + 15),
                     ('byte-after-selected-vtable-prefix', d['nested_vtable'] + 32)]:
        mutant = bytearray(candidate)
        p = offset(at)
        mutant[p] ^= 1
        observed = r.inspect(original, bytes(mutant))
        # These controls call only the scoped reader. Normal verification
        # would still reject the changed whole-input SHA256.
        assert observed['candidate_symbols_sha256'] != baseline['candidate_symbols_sha256']
        observed['candidate_symbols_sha256'] = baseline['candidate_symbols_sha256']
        assert observed == baseline
        accepted.append(name)
    assert original == r.inputs()[0] and candidate == r.inputs()[1]
    return dict(rejected_mutations=rejected, accepted_outside_scope=accepted,
                files_changed=False, scope='Actual isolated in-memory mutations; '
                'normal input authentication is separate and unchanged.')


if __name__ == '__main__':
    print(json.dumps(run(), sort_keys=True))
