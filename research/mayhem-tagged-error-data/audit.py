"""Bound three retained account references through actual machine consumers.

No compiler, target execution, network, Git fallback or extra body masks.
"""
import gzip
import hashlib
import importlib.util
import json
from pathlib import Path
import struct

P = Path(__file__).resolve().parent
R = P.parents[1]
spec = importlib.util.spec_from_file_location('tagged_window_reader', P / 'window_map.py')
w = importlib.util.module_from_spec(spec)
spec.loader.exec_module(w)

ORIGINAL = 'evidence/original/mayhem/deployed.so'
SYMBOLS = 'research/mayhem-sell-quote-call-recovery/artifacts/recovered/symbols.so.gz'
COHORT = 'research/mayhem-account-data-extents/prior-cohort.json'


def digest(value):
    return hashlib.sha256(value).hexdigest()


class Image:
    def __init__(self, data):
        self.data = data
        self.windows = {row['address']: row for row in w.windows(data)}
        self.relocations = dict(w.m.relocations(data))
        self.symbols = w.m.functions(data)

    def read(self, at, size):
        value = w.m.at_address(self.data, at, size)
        assert len(value) == size
        return value

    def insn(self, at):
        return struct.unpack('<BBhi', self.read(at, 8))

    def expect(self, base, rows):
        for offset, expected in rows:
            assert self.insn(base + offset) == expected, (base, offset, expected)

    def pointer(self, at):
        assert self.relocations.get(at) == 8
        low, value = struct.unpack('<II', self.read(at, 8))
        assert low == 0
        # Keep address validity separate from payload bounds.
        self.read(value, 1)
        return value

    def literal(self, pc, register):
        assert self.relocations.get(pc) == 8
        row = w.m.instructions(self.data, pc, 16)[0]
        assert (row['opcode'], row['destination'], row['source'], row['displacement']) == (0x18, register, 0, 0)
        return row['lddw_value']

    def call(self, pc):
        op, regs, off, imm = self.insn(pc)
        assert (op, regs, off) == (0x85, 0x10, 0)
        assert pc not in self.relocations
        target = pc + 8 + imm * 8
        assert target in self.windows
        return target


def shape_pair(o, c, a, b):
    x, y = o.windows[a], c.windows[b]
    assert (x['bytes'], x['signature']) == (y['bytes'], y['signature'])
    aliases = [s for s in c.symbols if s['address'] == b]
    assert aliases and all(s['bytes'] == y['bytes'] for s in aliases)
    return dict(original=a, candidate=b, bytes=x['bytes'], signature=x['signature'],
                raw_body_equal=x['raw_sha256'] == y['raw_sha256'],
                candidate_aliases=sorted(s['name'] for s in aliases))


def io_record(e, at):
    # Seventeen meaningful bytes, not a guessed 24-byte allocation. Seven
    # following alignment bytes are deliberately excluded from this proof.
    assert at & 3 == 0
    payload = e.pointer(at)
    count = struct.unpack('<Q', e.read(at + 8, 8))[0]
    assert count == 27
    kind = e.read(at + 16, 1)[0]
    return dict(record=at, tagged_low_bits=at & 3, consumed_field_bytes=17,
                payload_address=payload, payload_bytes=count,
                payload_hex=e.read(payload, count).hex(), kind_byte=kind)


def table_record(e, at):
    # The real caller copies four complete u64 words. This is not a str slice:
    # the consumer uses offsets 0/8/16/24 as RawTable state and 32/40 as hasher.
    control = e.pointer(at)
    mask, growth, items = struct.unpack('<QQQ', e.read(at + 8, 24))
    return dict(record=at, copied_bytes=32, control_address=control,
                bucket_mask=mask, growth_left=growth, items=items,
                control_read_bytes=8, control_hex=e.read(control, 8).hex())


def analyze(original, candidate, cohort):
    o, c = Image(original), Image(candidate)
    selected = []
    for proof in cohort['proofs']:
        for ref in proof['data']:
            if ref['original'] in (0xb1220, 0xb1340):
                selected.append((proof, ref))
    assert [(p['id'], p['original'], p['candidate'], r['offset'], r['original'], r['candidate'])
            for p, r in selected] == [
                ('O0116', 250656, 314560, 512, 725536, 683944),
                ('O0116', 250656, 314560, 5216, 725824, 684232),
                ('O0184', 524888, 409168, 880, 725536, 683944)]
    bodies, references, helpers = {}, [], {}
    error_consumers = []
    for proof, ref in selected:
        a, b, off = proof['original'], proof['candidate'], ref['offset']
        bodies[proof['id']] = shape_pair(o, c, a, b)
        assert ref['equal'] is None
        for e, start, target in ((o, a, ref['original']), (c, b, ref['candidate'])):
            assert e.literal(start + off, 1) == target
        if ref['original'] == 0xb1220:
            calls = [e.call(start + off + 16) for e, start in ((o, a), (c, b))]
            error_consumers.append(calls)
            helpers['borsh_eof_conversion'] = shape_pair(o, c, *calls)
            for e, start in ((o, calls[0]), (c, calls[1])):
                e.expect(start, [(0, (0xbf, 0x16, 0, 0)),
                    (8, (0x57, 6, 0, 3)), (16, (0x65, 6, 5, 1)),
                    (24, (0x55, 6, 43, 0)), (32, (0x71, 0x12, 16, 0)),
                    (40, (0x57, 2, 0, 255)), (48, (0x55, 2, 43, 37))])
            x, y = io_record(o, ref['original']), io_record(c, ref['candidate'])
            equal = all(x[k] == y[k] for k in ('tagged_low_bits', 'consumed_field_bytes',
                        'payload_bytes', 'payload_hex', 'kind_byte'))
            references.append(dict(id=proof['id'], offset=off, kind='tag_zero_static_io_message',
                original=x, candidate=y, equal=equal,
                witness='aligned pointer selects tag-zero arm; byte load at +16 compares kind 37'))
        else:
            # Exact four loads/stores, two zero hasher words, then 48-byte copy.
            for e, start in ((o, a), (c, b)):
                e.expect(start, [(5232, (0x79, 0x12, 24, 0)), (5240, (0x7b, 0x2a, -520, 0)),
                    (5248, (0x79, 0x12, 16, 0)), (5256, (0x7b, 0x2a, -528, 0)),
                    (5264, (0x79, 0x12, 8, 0)), (5272, (0x7b, 0x2a, -536, 0)),
                    (5280, (0x79, 0x11, 0, 0)), (5288, (0x7b, 0x1a, -544, 0)),
                    (5296, (0x7a, 10, -512, 0)), (5304, (0x7a, 10, -504, 0)),
                    (5312, (0xbf, 0xa9, 0, 0)), (5320, (0x07, 9, 0, -328)),
                    (5328, (0xbf, 0xa2, 0, 0)), (5336, (0x07, 2, 0, -544)),
                    (5344, (0xbf, 0x91, 0, 0)), (5352, (0xb7, 3, 0, 48)),
                    (5440, (0xbf, 0xa2, 0, 0)), (5448, (0x07, 2, 0, -64)),
                    (5456, (0xbf, 0x91, 0, 0))])
            copies = [e.call(start + 5360) for e, start in ((o, a), (c, b))]
            helpers['map_initialization_copy'] = shape_pair(o, c, *copies)
            # The complete 32-byte helper binds the actual imported memcpy.
            imported = []
            for e, start in ((o, copies[0]), (c, copies[1])):
                assert e.windows[start]['bytes'] == 32
                annotation = e.windows[start]['annotations']
                assert len(annotation) == 1 and annotation[0][0:2] == [8, 'import']
                imported.append(annotation[0][2])
            assert imported[0] == imported[1]
            helpers['map_initialization_copy']['import'] = imported[0]
            inserts = [e.call(start + 5464) for e, start in ((o, a), (c, b))]
            helpers['hash_map_insert'] = shape_pair(o, c, *inserts)
            for e, start in ((o, inserts[0]), (c, inserts[1])):
                e.expect(start, [(8, (0xbf, 0x16, 0, 0)),
                    (16, (0x79, 0x62, 40, 0)), (24, (0x79, 0x61, 32, 0)),
                    (48, (0x79, 0x61, 16, 0)), (64, (0x15, 1, 146, 0)),
                    (192, (0x79, 0x63, 8, 0)), (200, (0x79, 0x61, 0, 0)),
                    (264, (0x5f, 0x30, 0, 0)), (272, (0xbf, 0x16, 0, 0)),
                    (280, (0x0f, 6, 0, 0)), (288, (0x79, 0x67, 0, 0)),
                    (1096, (0x79, 0x02, 24, 0)), (1104, (0x07, 2, 0, 1)),
                    (1112, (0x7b, 0x20, 24, 0))])
            x, y = table_record(o, ref['original']), table_record(c, ref['candidate'])
            equal = all(x[k] == y[k] for k in ('copied_bytes', 'bucket_mask', 'growth_left',
                                               'items', 'control_read_bytes', 'control_hex'))
            references.append(dict(id=proof['id'], offset=off, kind='empty_raw_table_initializer',
                original=x, candidate=y, equal=equal,
                witness='four table words copied, two hasher words zeroed; insert consumes table and 64-bit control group',
                limit='zero growth branches to reserve before probing; this is a read-width/representation proof, not a claim that the initial sentinel is dynamically read by this insertion'))

    assert error_consumers == [[665904, 624072], [665904, 624072]]
    # Independent formatter routing witnesses the message pointer/length pair.
    debug = (667224, 625392)
    helpers['io_debug'] = shape_pair(o, c, *debug)
    formatter_tables, string_formatters, kind_formatters = [], [], []
    for e, base in ((o, debug[0]), (c, debug[1])):
        e.expect(base, [(0, (0x79, 0x16, 0, 0)), (8, (0xbf, 0x61, 0, 0)),
            (16, (0x57, 1, 0, 3)), (24, (0x65, 1, 28, 1)),
            (32, (0x55, 1, 91, 0)), (96, (0xbf, 0x64, 0, 0)),
            (104, (0x07, 4, 0, 16)), (200, (0xbf, 0x64, 0, 0))])
        values = []
        for off, size, align, group in ((144, 1, 1, kind_formatters), (208, 16, 8, string_formatters)):
            at = e.literal(base + off, 5)
            assert struct.unpack('<QQQ', e.read(at, 24)) == (0, size, align)
            target = e.pointer(at + 24)
            group.append(target)
            values.append(dict(address=at, bytes=32, drop=0, size=size, alignment=align, formatter=target))
        formatter_tables.append(values)
    helpers['message_str_debug_adapter'] = shape_pair(o, c, *string_formatters)
    helpers['kind_debug'] = shape_pair(o, c, *kind_formatters)
    string_calls = []
    for e, start in ((o, string_formatters[0]), (c, string_formatters[1])):
        e.expect(start, [(0, (0xbf, 0x23, 0, 0)), (8, (0x79, 0x12, 8, 0)),
                         (16, (0x79, 0x11, 0, 0)), (32, (0x95, 0, 0, 0))])
        string_calls.append(e.call(start + 24))
    helpers['str_debug'] = shape_pair(o, c, *string_calls)
    kind_names = []
    for e, start in ((o, kind_formatters[0]), (c, kind_formatters[1])):
        e.expect(start, [(0, (0xbf, 0x24, 0, 0)), (8, (0x71, 0x11, 0, 0)),
            (16, (0x67, 1, 0, 3)), (40, (0x0f, 0x13, 0, 0)),
            (64, (0x0f, 0x12, 0, 0)), (72, (0x79, 0x22, 0, 0)),
            (80, (0x79, 0x33, 0, 0)), (88, (0xbf, 0x41, 0, 0))])
        lengths, pointers = e.literal(start + 24, 3), e.literal(start + 48, 2)
        count = struct.unpack('<Q', e.read(lengths + 37 * 8, 8))[0]
        assert count == 13
        name = e.pointer(pointers + 37 * 8)
        kind_names.append(dict(index=37, bytes=count, payload=e.read(name, count).decode()))
    return dict(original_sha256=digest(original), symbols_sha256=digest(candidate),
        original_windows=len(o.windows), candidate_windows=len(c.windows),
        bodies=bodies, helpers=helpers, formatter_tables=formatter_tables, kind_names=kind_names,
        references=references, summary=dict(references=len(references),
            distinct_data_roots=2, typed_equal=sum(r['equal'] for r in references),
            new_instruction_matches=0, new_raw_local_matches=0,
            compiler_executed=False, target_executed=False, whole_core_identity_proven=False),
        scope='Three formerly unresolved references on the exact sell-quote candidate; no automatic update of parent inventories, transitive/indirect closure, allocation extent, runtime or whole-file claim.')


def generate():
    return analyze((R / ORIGINAL).read_bytes(), gzip.decompress((R / SYMBOLS).read_bytes()),
                   json.loads((R / COHORT).read_bytes()))


if __name__ == '__main__':
    print(json.dumps(generate(), indent=2))
