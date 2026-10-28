"""Bounded static register/stack trace of one formatting dispatch route.

This is not a target VM execution. Allocation success and a successful prefix
write are explicit contracts. The numeric-conversion result stays opaque and
must not influence this route. Stop at the selected second writer dispatch.
"""
from pathlib import Path
import importlib.util
import json
import struct

P = Path(__file__).resolve().parent
R = P.parents[1]
spec = importlib.util.spec_from_file_location('format_code_reference', R / 'research/mayhem-current434-code-reference-closure-20261027/proof.py')
proof = importlib.util.module_from_spec(spec)
spec.loader.exec_module(proof)

ROLES = {
    'anchor_program_error_log': 621536,
    'format_inner': 669936,
    'fmt_write': 678096,
    'program_error_debug': 618552,
    'formatter_write_str': 682144,
    'string_write_str': 670520,
    'program_error_into_u64': 615616,
    'allocator': 536976,
    'allocator_marker': 538096,
}
MASK = (1 << 64) - 1


def signed64(value):
    return value - (1 << 64) if value & (1 << 63) else value


class Trace:
    def __init__(self, image, starts, side, tag=1):
        self.image = image
        self.starts = starts
        self.roles = {address: name for name, addresses in starts.items() for address in addresses}
        self.side = side
        self.reg = [None] * 11
        self.reg[1] = 1 << 40
        self.reg[10] = 3 << 40
        self.mem = {}
        self.events = []
        self.data_reads = []
        self.steps = []
        self.frames = []
        self.role = 'anchor_program_error_log'
        self.pc = starts[self.role][0]
        self.start = self.pc
        self.write(1 << 40, 8, 2)  # Selected origin/branch discriminator.
        self.write((1 << 40) + 32, 4, tag)
        self.write((1 << 40) + 36, 4, 0)

    def raw(self, address, size):
        for section in self.image.sections:
            if section['type'] != 8 and section['address'] <= address and address + size <= section['address'] + section['size']:
                at = section['offset'] + address - section['address']
                return self.image.b[at:at + size]
        raise AssertionError(('unmapped ELF read', address, size))

    def read(self, address, size):
        assert isinstance(address, int), ('opaque address', address)
        if address >= 1 << 40:
            assert all(address + n in self.mem for n in range(size)), ('uninitialized selected memory', address, size)
            values = [self.mem[address + n] for n in range(size)]
            return None if any(x is None for x in values) else int.from_bytes(bytes(values), 'little')
        raw = self.raw(address, size)
        record = dict(caller=self.role, offset=self.pc-self.start, address=address, size=size)
        if size == 8 and address in self.image.rel:
            assert self.image.rel[address]['type'] == 8 and raw[:4] == bytes(4)
            value = int.from_bytes(raw[4:], 'little')
            record.update(relocated=True, target=value)
        else:
            value = int.from_bytes(raw, 'little')
            record.update(relocated=False, value=value)
        self.data_reads.append(record)
        return value

    def write(self, address, size, value):
        assert isinstance(address, int) and address >= 1 << 40
        if value is None:
            for n in range(size):
                self.mem[address+n] = None
            return
        assert isinstance(value, int)
        for n, byte in enumerate((value % (1 << (size * 8))).to_bytes(size, 'little')):
            self.mem[address + n] = byte

    def call(self, target, next_pc, offset, indirect):
        name = self.roles.get(target)
        assert name, ('unexpected call target', self.role, offset, target)
        event = dict(caller=self.role, offset=offset, callee=name, target=target, indirect=indirect)
        if name == 'program_error_into_u64':
            event['contract'] = 'Result opaque; no numeric value is used before the stop point.'
            self.reg[0] = None
            self.reg[1:6] = [None] * 5
        elif name == 'allocator':
            event['contract'] = 'Allocation succeeds; its returned pointer is not dereferenced before the stop point.'
            event['requested_size'] = self.reg[1]
            event['alignment'] = self.reg[2]
            self.reg[0] = 4 << 40
            self.reg[1:6] = [None] * 5
        elif name == 'string_write_str':
            assert indirect
            ptr, length = self.reg[2:4]
            event.update(string_pointer=ptr, length=length, string_hex=self.raw(ptr, length).hex())
            self.events.append(event)
            if self.role == 'formatter_write_str':
                return True
            assert self.role == 'fmt_write' and offset == 672
            event['contract'] = 'Prefix writer returns Ok; all 24 String metadata bytes become opaque.'
            self.write(self.reg[1], 24, None)
            self.reg[0] = 0
            self.reg[1:6] = [None] * 5
            self.pc = next_pc
            return False
        else:
            self.events.append(event)
            self.frames.append((next_pc, self.start, self.role, self.reg[10], self.reg[6:10]))
            self.reg[10] -= 65536
            self.role = name
            self.pc = target
            self.start = target
            return False
        self.events.append(event)
        self.pc = next_pc
        return False

    def run(self):
        for _ in range(1000):
            offset = self.pc - self.start
            op, rr, off, imm = struct.unpack('<BBhi', self.raw(self.pc, 8))
            d, s = rr & 15, rr >> 4
            self.steps.append([self.role, offset])
            n = self.pc + 8
            if op == 0x18:
                if self.pc in self.image.rel:
                    assert self.image.rel[self.pc]['type'] == 8
                self.reg[d] = imm & 0xffffffff | int.from_bytes(self.raw(self.pc + 12, 4), 'little') << 32
                n += 8
            elif op == 0xbf:
                self.reg[d] = self.reg[s]
            elif op == 0xb7:
                self.reg[d] = imm & MASK
            elif op in (0x79, 0x61, 0x69, 0x71):
                self.reg[d] = self.read(self.reg[s] + off, {0x79: 8, 0x61: 4, 0x69: 2, 0x71: 1}[op])
            elif op in (0x7b, 0x63, 0x6b, 0x73):
                self.write(self.reg[d] + off, {0x7b: 8, 0x63: 4, 0x6b: 2, 0x73: 1}[op], self.reg[s])
            elif op in (0x7a, 0x62, 0x6a, 0x72):
                self.write(self.reg[d] + off, {0x7a: 8, 0x62: 4, 0x6a: 2, 0x72: 1}[op], imm)
            elif op in (0x07, 0x0f, 0x67, 0x27, 0x57):
                assert isinstance(self.reg[d], int), ('opaque arithmetic', self.role, offset)
                if op == 0x07:
                    self.reg[d] = (self.reg[d] + imm) & MASK
                elif op == 0x0f:
                    assert isinstance(self.reg[s], int)
                    self.reg[d] = (self.reg[d] + self.reg[s]) & MASK
                elif op == 0x67:
                    assert 0 <= imm < 64
                    self.reg[d] = (self.reg[d] << imm) & MASK
                elif op == 0x27:
                    self.reg[d] = (self.reg[d] * imm) & MASK
                else:
                    self.reg[d] &= imm & MASK
            elif op in (0x05, 0x15, 0x55, 0x25, 0x65, 0x75, 0xd5, 0x5d, 0x3d):
                value = self.reg[d]
                if op == 0x05:
                    taken = True
                else:
                    rhs = self.reg[s] if op in (0x5d, 0x3d) else imm & MASK
                    assert isinstance(value, int) and isinstance(rhs, int)
                    taken = {0x15: value == rhs, 0x55: value != rhs, 0x25: value > rhs,
                             0x65: signed64(value) > signed64(rhs),
                             0x75: signed64(value) >= signed64(rhs),
                             0xd5: signed64(value) <= signed64(rhs),
                             0x5d: value != rhs, 0x3d: value >= rhs}[op]
                if taken:
                    n += off * 8
            elif op in (0x85, 0x8d):
                if op == 0x85:
                    assert rr == 0x10 and self.pc not in self.image.rel
                    target = self.pc + 8 + imm * 8
                else:
                    assert rr == 0 and off == 0
                    target = self.reg[imm]
                if self.call(target, n, offset, op == 0x8d):
                    return dict(side=self.side, steps=self.steps, events=self.events, data_reads=self.data_reads)
                continue
            elif op == 0x95:
                assert self.frames
                n, self.start, self.role, self.reg[10], saved = self.frames.pop()
                self.reg[6:10] = saved
            else:
                raise AssertionError(('unsupported instruction', self.role, offset, hex(op)))
            self.pc = n
        raise AssertionError('selected route exceeded step bound')


def inspect(images=None, tag=1):
    assert 1 <= tag <= 25
    o, c = proof.elves(*(images or proof.inputs()))
    rows = json.loads((proof.M / 'original-windows.json').read_text())
    ow = {r['start']: o.window(r['start'], r['start'] + r['bytes']) for r in rows}
    cw, _ = proof.matcher.tables(c)
    groups, _, closed, _ = proof.matcher.relation(ow, cw)
    starts = {'original': {name: [address] for name, address in ROLES.items()},
              'candidate': {name: groups[proof.matcher.key(ow[address])] for name, address in ROLES.items()}}
    assert len(starts['candidate']['anchor_program_error_log']) == 1
    # This scalar conversion has no memory operations or calls, only forward
    # branches ending at its sole exit. Its result may safely remain opaque.
    scalar_contracts = []
    for e, windows, address in [(o, ow, ROLES['program_error_into_u64']),
                                (c, cw, starts['candidate']['program_error_into_u64'][0])]:
        w = windows[address]
        assert not (w['direct'] or w['indirect'] or w['external'] or w['data_references'])
        assert len(w['exits']) == 1 and w['exits'][0]['pc'] == w['end']-8
        assert all(x['pc'] < x['target'] < w['end'] for x in w['branches'])
        assert {e.b[a] for a in range(address,w['end'],8)} <= {0,0x05,0x15,0x18,0x55,0x65,0x67,0x77,0x95,0xbf,0xd5}
        scalar_contracts.append(dict(start=address,bytes=w['end']-address,forward_branches=len(w['branches']),memory_operations=0,calls=0))
    traces = [Trace(e, starts[side], side, tag).run() for side, e in [('original', o), ('candidate', c)]]
    normalized = []
    for t in traces:
        normalized.append([[x['caller'], x['offset'], x['callee'], x['indirect'], x.get('length'), x.get('string_hex'), x.get('requested_size'), x.get('alignment')] for x in t['events']])
    assert normalized[0] == normalized[1]
    assert traces[0]['steps'] == traces[1]['steps']
    left_reads, right_reads = traces[0]['data_reads'], traces[1]['data_reads']
    assert len(left_reads) == len(right_reads)
    for x, y in zip(left_reads, right_reads):
        assert (x['caller'],x['offset'],x['size'],x['relocated']) == (y['caller'],y['offset'],y['size'],y['relocated'])
        if x['relocated']:
            if x['target'] in ow:
                assert (x['target'], y['target']) in closed
            else:
                # The one data pointer is consumed as the explicitly counted
                # prefix. Its bytes are checked by the writer event below.
                assert x['caller'] == 'fmt_write' and x['offset'] == 656
        else:
            assert x['value'] == y['value']
    indirect = [x for x in traces[0]['events'] if x['indirect']]
    assert [(x['caller'], x['offset'], x['callee']) for x in indirect] == [
        ('fmt_write', 672, 'string_write_str'),
        ('fmt_write', 720, 'program_error_debug'),
        ('formatter_write_str', 32, 'string_write_str')]
    if tag == 1:
        assert bytes.fromhex(indirect[-1]['string_hex']) == b'InvalidArgument'
    for left, right in zip(traces[0]['events'], traces[1]['events']):
        assert (left['target'], right['target']) in closed
    return dict(original_sha256=proof.sha(o.b), candidate_symbols_sha256=proof.sha(c.b),
                traces=traces, normalized_events=normalized[0],
                scalar_conversion_contracts=scalar_contracts,
                tag=tag,
                explicit_contracts=[f'Origin discriminator is 2; nested ProgramError tag is {tag}.',
                                    'Allocation succeeds; the selected prefix write returns Ok, preserving readonly data and unrelated stack memory.',
                                    'Prefix writing may change all 24 String metadata bytes and its owned buffer; metadata is explicitly made opaque.',
                                    'The ProgramError-to-u64 return is opaque and never used before the stop point.'],
                selected_indirect_dispatches=3,
                scope='A bounded static register/stack trace to the second String writer dispatch. '
                      'No target VM execution, full String writer behavior, complete formatting, general tag domain, '
                      'arbitrary indirect closure, panic-host behavior, or whole-ELF identity is established.')

