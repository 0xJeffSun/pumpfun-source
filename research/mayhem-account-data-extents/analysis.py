"""Resolve bounded reads in the existing account cohort, without new masks."""
from pathlib import Path
import argparse, collections, gzip, hashlib, importlib.util, json, struct, subprocess, sys, tempfile

P = Path(__file__).resolve().parent
R = P.parents[1]
PARENT = R / 'research/mayhem-sell-quote-call-recovery'
sha = lambda data: hashlib.sha256(data).hexdigest()


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


LITERALS = {
    0xad019: b'a Display implementation returned an error unexpectedly',
    0xadaf4: b'system_program', 0xadb89: b'token_program',
    0xadb96: b'associated_token_program', 0xad5d5: b'fee-recipient',
    0xadc37: b'fee_recipient', 0xadc44: b'fee_recipient_ata',
    0xadb0f: b'global_params', 0xadaef: b'admin', 0xadc2e: b'wsol_mint',
    0xadc8d: b'pool_base_token_account', 0xadca4: b'pool_quote_token_account',
    0xadcd2: b'protocol_fee_recipient_token_account', 0xadd20: b'coin_creator_vault_ata',
    0xade4f: b'associated_base_bonding_curve', 0xadbc9: b'mayhem_token_vault',
    0xad697: b'programs/mayhem-program/src/state.rs', 0xadc0e: b'mayhem-state',
    0xae0ec: b'Instruction: UpdateGlobalParams',
    0xae10b: b'Instruction: InitializeMayhemState',
}
# (pointer-store offset, following slice-length store offset), both relative
# to the already matched body. These are actual writes to adjacent stack slots.
STACK_SLICES = {('O0116', 2848): (2864, 2896), ('O0147', 480): (496, 528),
                ('O0147', 1552): (1568, 1848), ('O0147', 3392): (3408, 3560),
                ('O0147', 4088): (4104, 4256)}


class Audit:
    def __init__(self, original, candidate):
        self.o, self.c = original, candidate
        rows = json.loads((R / 'research/mayhem-full-curve-recovery/audit.json').read_bytes())['rows']
        self.ow = {r['start']: original.window(r['start'], r['end']) for r in rows}
        self.cw = {s['value']: candidate.window(s['value'], s['value'] + s['size'])
                   for s in candidate.symbols if s['info'] & 15 == 2 and s['size'] >= 8 and candidate.lo <= s['value'] < candidate.hi}

    @staticmethod
    def key(window):
        return [window['end'] - window['start'], window['normalized_sha256'],
                json.dumps(window['normalization_pattern'], sort_keys=True)]

    @staticmethod
    def insn(e, pc):
        return struct.unpack_from('<BBhi', e.b, pc)

    @staticmethod
    def pointer(e, address):
        assert e.rel[address]['type'] == 8
        zero, value = struct.unpack_from('<II', e.b, address)
        assert zero == 0
        return value

    def stack_count(self, e, start, ref, stores):
        pointer_at, length_at = (start + n for n in stores)
        _, register, _, _ = self.insn(e, start + ref)
        op, regs, slot, _ = self.insn(e, pointer_at)
        assert op == 0x7b and regs == ((register & 15) << 4) | 10
        op, regs, following, length = self.insn(e, length_at)
        assert op == 0x7a and regs == 10 and following == slot + 8 and length >= 0
        return length

    def call_count(self, e, start, end, ref):
        """Follow only unconditional local control flow to a consuming call."""
        _, regs, _, _ = self.insn(e, start + ref)
        pointer_reg = regs & 15
        assert pointer_reg in (1, 3)
        length = None; pc = start + ref + 16; seen = set()
        for _ in range(40):
            assert start <= pc < end and pc not in seen
            seen.add(pc)
            op, regs, off, imm = self.insn(e, pc)
            if op == 0x85:
                assert length is not None
                return length, pc - start
            if op == 0x05:
                pc += 8 + off * 8
                continue
            assert op & 7 not in (5, 6), 'conditional path before count/call'
            if op == 0xb7 and regs == pointer_reg + 1:
                length = imm
            elif op & 7 in (0, 1, 4, 7):
                assert regs & 15 != pointer_reg, 'literal pointer overwritten'
                assert regs & 15 != pointer_reg + 1, 'nonconstant length'
            pc += 16 if op == 0x18 else 8
        raise AssertionError('no bounded consuming call')

    def slice_value(self, e, address):
        payload = self.pointer(e, address)
        length = struct.unpack_from('<Q', e.b, address + 8)[0]
        assert 0 < length < 256
        return {'descriptor_bytes': 16, 'payload_bytes': length,
                'payload_hex': e.b[payload:payload + length].hex()}

    def vtable(self, e, address, width, pointers):
        windows = self.ow if e is self.o else self.cw
        result = []
        for offset in range(0, width, 8):
            if offset in pointers:
                target = self.pointer(e, address + offset)
                assert target in windows
                result.append({'offset': offset, 'code_shape': self.key(windows[target])})
            else:
                result.append({'offset': offset, 'scalar': struct.unpack_from('<Q', e.b, address + offset)[0]})
        return result

    def close(self, proof, ref):
        p, q, offset = ref['original'], ref['candidate'], ref['offset']
        a, b = proof['original'], proof['candidate']
        if p in LITERALS:
            expected = LITERALS[p]
            if (proof['id'], offset) in STACK_SLICES:
                stores = STACK_SLICES[proof['id'], offset]
                lengths = [self.stack_count(e, at, offset, stores) for e, at in ((self.o, a), (self.c, b))]
                witness = {'kind': 'adjacent_stack_slice_fields', 'pointer_store': stores[0], 'length_store': stores[1]}
            else:
                records = [self.call_count(e, at, (self.ow if e is self.o else self.cw)[at]['end'], offset)
                           for e, at in ((self.o, a), (self.c, b))]
                lengths = [x[0] for x in records]
                assert records[0] == records[1]
                witness = {'kind': 'constant_count_at_consuming_call', 'call_offset': records[0][1]}
            assert lengths == [len(expected), len(expected)]
            actual = [e.b[at:at + len(expected)] for e, at in ((self.o, p), (self.c, q))]
            return {'kind': 'counted_literal', 'bytes': len(expected), 'expected': expected.decode(),
                    'witness': witness, 'equal': actual == [expected, expected]}
        if p in (0xb1238, 0xb1268):
            width, slots = (48, {0, 24, 32, 40}) if p == 0xb1238 else (32, {24})
            x, y = self.vtable(self.o, p, width, slots), self.vtable(self.c, q, width, slots)
            return {'kind': 'fmt_Write_vtable' if width == 48 else 'fmt_Debug_vtable',
                    'bytes': width, 'original_fields': x, 'candidate_fields': y, 'equal': x == y}
        if p == 0xadeed:
            # Instruction::new_with_bytes holds argument r2 in r9, then copies
            # the four words at offsets 0/8/16/24 into Instruction.program_id.
            calls = []
            for e, at, windows in ((self.o, a, self.ow), (self.c, b, self.cw)):
                call = next(x for x in windows[at]['direct'] if x['offset'] == offset + 32)
                body = windows[call['target']]
                assert self.insn(e, body['start'] + 8) == (0xbf, 0x29, 0, 0)
                for delta, word in ((216, 0), (232, 8), (248, 16), (264, 24)):
                    assert self.insn(e, body['start'] + delta) == (0x79, 0x91, word, 0)
                calls.append(self.key(body))
            assert calls[0] == calls[1]
            return {'kind': 'Instruction_program_id', 'bytes': 32, 'consumer_shape': calls[0],
                    'equal': self.o.b[p:p + 32] == self.c.b[q:q + 32]}
        if p == 0xad084:
            shapes = []
            for e, at, windows in ((self.o, a, self.ow), (self.c, b, self.cw)):
                call = next(x for x in windows[at]['direct'] if x['offset'] == offset + 16)
                body = windows[call['target']]
                argument = self.insn(e, at + offset)[1] & 15
                assert argument in (1, 2)
                assert self.insn(e, body['start']) == (0x61, argument * 17, 0, 0)
                shapes.append(self.key(body))
            assert shapes[0] == shapes[1]
            return {'kind': 'ErrorCode_discriminant', 'bytes': 4,
                    'value': struct.unpack_from('<I', self.o.b, p)[0],
                    'equal': self.o.b[p:p + 4] == self.c.b[q:q + 4]}
        if p == 0xa9458:
            return {'kind': 'format_function_pointer', 'original_shape': self.key(self.ow[p]),
                    'candidate_shape': self.key(self.cw[q]), 'equal': self.key(self.ow[p]) == self.key(self.cw[q])}
        if p == 0xb13b0:
            values = []
            for e, at, base in ((self.o, p, a), (self.c, q, b)):
                assert self.insn(e, base + offset)[:2] == (0x18, 4)
                assert self.insn(e, base + offset + 16) == (0xb7, 5, 0, 1)
                inner, count = self.pointer(e, at), struct.unpack_from('<Q', e.b, at + 8)[0]
                assert count == 2
                slices = [self.slice_value(e, inner + 16 * i) for i in range(count)]
                assert [x['payload_hex'] for x in slices] == [b'__event_authority'.hex(), b'\xfc'.hex()]
                values.append({'outer_descriptor_bytes': 16, 'inner_descriptor_bytes': 32, 'slices': slices})
            return {'kind': 'invoke_signed_static_seed_graph', 'original': values[0], 'candidate': values[1], 'equal': values[0] == values[1]}
        if p in (0xb11f8, 0xb1950, 0xb1320):
            count = 2 if p == 0xb1320 else 1
            if p == 0xb1950:
                for e, base in ((self.o, a), (self.c, b)):
                    assert self.insn(e, base + offset)[:2] == (0x18, 1)
                    assert self.insn(e, base + offset + 16) == (0xb7, 2, 0, count)
                witness = {'kind': 'PDA_syscall_slice_count', 'count': count}
            else:
                stores = (offset + 16, offset + (104 if count == 2 else 32))
                assert [self.stack_count(e, base, offset, stores) for e, base in ((self.o, a), (self.c, b))] == [count, count]
                witness = {'kind': 'format_argument_piece_count', 'count': count, 'pointer_store': stores[0], 'length_store': stores[1]}
            values = [[self.slice_value(e, at + i * 16) for i in range(count)] for e, at in ((self.o, p), (self.c, q))]
            return {'kind': 'string_slice_array', 'descriptor_bytes': 16 * count, 'witness': witness,
                    'original': values[0], 'candidate': values[1], 'equal': values[0] == values[1]}
        return {'kind': 'unresolved', 'equal': None,
                'reason': 'Tagged std::io error representation or empty formatting prefix is outside this bounded schema.'}


def generate():
    elf = module('account_extent_elf', R / 'repro/mayhem/global-params-layout-recovery/tools/layer01.py')
    with tempfile.TemporaryDirectory() as directory:
        t = Path(directory)
        for kind in ('symbols', 'candidate'):
            (t / (kind + '.so')).write_bytes(gzip.decompress((PARENT / f'artifacts/recovered/{kind}.so.gz').read_bytes()))
        base = t / 'cohort.json'
        subprocess.run([sys.executable, '-B', str(R / 'research/mayhem-source-data-recovery/account_data.py'),
                        str(t / 'symbols.so'), str(t / 'candidate.so'), str(base)], check=True, capture_output=True)
        cohort = json.loads(base.read_bytes())
        original = elf.Elf(R / 'evidence/original/mayhem/deployed.so')
        candidate = elf.Elf(t / 'symbols.so')
        audit = Audit(original, candidate)
        result = []
        for proof in cohort['proofs']:
            for ref in proof['data']:
                if ref['equal'] is not None:
                    continue
                closed = audit.close(proof, ref)
                result.append({'id': proof['id'], 'original_body': proof['original'], 'candidate_body': proof['candidate'],
                               'offset': ref['offset'], 'original_target': ref['original'], 'candidate_target': ref['candidate'], **closed})
    counts = collections.Counter(str(row['equal']) for row in result)
    report = {'candidate_sha256': cohort['candidate_sha256'], 'symbols_sha256': cohort['symbols_sha256'],
              'original_sha256': cohort['original_sha256'], 'baseline': cohort['summary'],
              'summary': {'references_reexamined': len(result), 'new_typed_equal': counts['True'],
                          'new_typed_different': counts['False'], 'still_unresolved': counts['None'],
                          'total_typed_equal': cohort['summary']['typed_equal'] + counts['True'],
                          'total_typed_different': cohort['summary']['typed_different'] + counts['False']},
              'scope': 'Bounded read widths and typed pointer graphs for the existing 156-reference account cohort. No new function match, arbitrary allocation extent, raw pointer-address equality or whole-program data/transitive/indirect identity is claimed.',
              'references': result}
    return {'prior-cohort.json': (json.dumps(cohort, indent=2) + '\n').encode(),
            'audit.json': (json.dumps(report, indent=2) + '\n').encode()}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(); parser.add_argument('--check', action='store_true'); args = parser.parse_args()
    generated = generate()
    for name, data in generated.items():
        if args.check:
            assert (P / name).read_bytes() == data, name
        else:
            (P / name).write_bytes(data)
    print(json.loads(generated['audit.json'])['summary'])
