"""Interval execution of the actual initializer instructions, under explicit ABI contracts.

This is a bounded subroutine analysis, not an sBPF VM or a whole-program proof.
No instructions, registers, branches, stack offsets or scalar operands are masked.
"""
from dataclasses import dataclass
import copy
import struct

MOD = 1 << 64
HALF = 1 << 63
TOP = HALF - 1
STACK, CONTEXT, FRAME, INFO, LAMPORTS, DATA, KEY, OWNER = [i << 32 for i in range(1, 9)]


@dataclass(frozen=True)
class Affine:
    variable: str
    addend: int = 0


@dataclass(frozen=True)
class Byte:
    value: object
    index: int


@dataclass(frozen=True)
class Blob:
    values: tuple


def plus(a, b):
    if isinstance(a, int) and isinstance(b, int):
        return (a + b) % MOD
    if isinstance(a, int):
        a, b = b, a
    assert isinstance(a, Affine) and isinstance(b, int), ('unsupported sum', a, b)
    return Affine(a.variable, (a.addend + b) % MOD)


def octets(value, size):
    if isinstance(value, int):
        return list((value % (1 << (8 * size))).to_bytes(size, 'little'))
    if isinstance(value, Blob):
        assert len(value.values) == size
        return list(value.values)
    assert isinstance(value, Affine) and size == 8
    return [Byte(value, i) for i in range(size)]


def store(memory, address, value, size):
    assert isinstance(address, int)
    for i, byte in enumerate(octets(value, size)):
        memory[address + i] = byte


def load(memory, address, size):
    assert isinstance(address, int)
    values = tuple(memory[address + i] for i in range(size))
    if all(isinstance(x, int) for x in values):
        return int.from_bytes(bytes(values), 'little')
    if (size == 8 and isinstance(values[0], Byte)
            and all(x == Byte(values[0].value, i) for i, x in enumerate(values))):
        return values[0].value
    return Blob(values)


def value_at(value, coordinate, signed=False):
    raw = ((coordinate + value.addend) if isinstance(value, Affine) else value) % MOD
    assert isinstance(raw, int)
    return raw - MOD if signed and raw >= HALF else raw


def compare(a, b, relation):
    return {'eq': a == b, 'ne': a != b, 'ge': a >= b, 'lt': a < b}[relation]


def partition(domains, left, right, relation, signed):
    """Exact affine comparisons: split every modular/sign jump and equality root.

    Within a cell both operands and their difference are linear. The explicit
    zero-root split makes endpoint checks sufficient even for equality tests.
    """
    variables = {x.variable for x in [left, right] if isinstance(x, Affine)}
    assert len(variables) <= 1, ('unsupported mixed-variable comparison', left, right)
    if not variables:
        return [(compare(value_at(left, 0, signed), value_at(right, 0, signed), relation), domains)]
    variable, = variables
    low, high = domains[variable]
    cuts = {low, high + 1}
    for value in [left, right]:
        if not isinstance(value, Affine):
            continue
        for period in range((low + value.addend) // MOD - 1,
                            (high + value.addend) // MOD + 2):
            for point in [period * MOD - value.addend,
                          period * MOD + HALF - value.addend]:
                if low < point <= high:
                    cuts.add(point)
    first = sorted(cuts)
    for start, stop in zip(first, first[1:]):
        slope = int(isinstance(left, Affine)) - int(isinstance(right, Affine))
        delta = value_at(left, start, signed) - value_at(right, start, signed)
        if slope:
            root = start - delta // slope
            for point in [root, root + 1]:
                if start < point < stop:
                    cuts.add(point)
    points = sorted(cuts)
    result = []
    for start, stop in zip(points, points[1:]):
        decision = compare(value_at(left, start, signed), value_at(right, start, signed), relation)
        assert decision == compare(value_at(left, stop - 1, signed), value_at(right, stop - 1, signed), relation)
        narrowed = dict(domains)
        narrowed[variable] = (start, stop - 1)
        result.append((decision, narrowed))
    assert sum(x[1][variable][1] - x[1][variable][0] + 1 for x in result) == high - low + 1
    return result


def identical_under_domains(actual, expected, domains):
    if actual == expected:
        return True
    if isinstance(actual, (Affine, int)) and isinstance(expected, (Affine, int)):
        return all(decision for decision, _ in partition(domains, actual, expected, 'eq', False))
    if isinstance(actual, Blob) and isinstance(expected, Blob):
        return actual == expected
    return False


def location(reader, image, address):
    pointer, count, line, column = struct.unpack('<QQII', reader.at_address(image, address, 24))
    assert dict(reader.relocations(image))[address] & 0xffffffff == 8
    assert pointer & 0xffffffff == 0
    pointer >>= 32
    assert count == 37
    filename = reader.at_address(image, pointer, count).decode()
    assert filename == 'programs/mayhem-program/src/state.rs\x00'
    return filename[:-1], line, column


def call_contracts(wm, image, window, catalog):
    """Bind immediate callees and typed panic arguments before abstracting calls."""
    by_address = {row['address']: row for row in catalog}
    roles = {
        'afed571664bd055c83723a72fdd8d2746938f3fd7b624742d7cbe93a9f88892a': 'clock',
        'bc9ca4af224157f2480139efb309c8ed27807ebb8f14e444347f0ad7946ce69f': 'overflow',
        '67250da54ce05dbc58f75a96d3ae64ac261265e086262b0c1e64b1154f2aa59c': 'drop_lamports',
        '892e1037fd24b40ab953504337762f85ee89f286da6db0385e068df6849b019c': 'drop_data',
        'c79782bd89533c754a9bd812012b5ae09f8126681e6aa6d0cc6f54c274e89941': 'unwrap',
    }
    relocations = dict(wm.m.relocations(image))
    dynamic = wm.dynamic_symbols(image)
    result = {}
    for row in wm.m.instructions(image, window['address'], window['bytes']):
        if row['opcode'] != 0x85:
            continue
        info = relocations.get(window['address'] + row['offset'], 0)
        if info & 0xffffffff == 10:
            assert dynamic[info >> 32]['name'] == 'abort'
            result[row['offset']] = 'abort'
        else:
            callee = by_address[row['call_target']]
            result[row['offset']] = roles[callee['signature']]
            if result[row['offset']] == 'overflow':
                instructions = wm.m.instructions(image, callee['address'], callee['bytes'])
                pointers = [x['lddw_value'] for x in instructions if x['opcode'] == 0x18]
                assert len(pointers) == 1
                pointer, count = struct.unpack('<QQ', wm.m.at_address(image, pointers[0], 16))
                assert relocations[pointers[0]] & 0xffffffff == 8
                assert pointer & 0xffffffff == 0 and count == 28
                assert wm.m.at_address(image, pointer >> 32, count) == b'attempt to add with overflow'
    assert sorted(result.values()) == sorted([*roles.values(), 'abort'])
    return result


def initial(hours):
    memory = {FRAME + i: ('initial_state', i) for i in range(352, 450)}
    store(memory, CONTEXT + 8, FRAME, 8)
    store(memory, FRAME + 88, INFO, 8)
    store(memory, FRAME + 708, hours, 1)
    for offset, value in [(0, KEY), (8, LAMPORTS), (16, DATA), (24, OWNER), (32, 1234)]:
        store(memory, INFO + offset, value, 8)
    for offset in [40, 41, 42]:
        store(memory, INFO + offset, 1, 1)
    store(memory, LAMPORTS, Affine('lamports'), 8)
    store(memory, DATA, Affine('data'), 8)
    for i in range(32):
        memory[KEY + i] = ('mint_key', i)
    registers = [('undefined_register', i) for i in range(11)]
    registers[1], registers[10] = CONTEXT, STACK
    return dict(registers=registers, memory=memory, pc=0,
                domains=dict(now=(-HALF, TOP), lamports=(1, MOD - 1), data=(1, MOD - 1)),
                visited=[], calls=[])


def expected_kind(domains, hours, clock_error):
    if domains['lamports'] == (MOD - 1, MOD - 1):
        return 'abort_lamports'
    assert domains['lamports'][1] <= MOD - 2
    if domains['data'] == (MOD - 1, MOD - 1):
        return 'abort_data'
    assert domains['data'][1] <= MOD - 2
    if clock_error:
        return 'unwrap'
    if domains['now'][0] > TOP - hours * 3600:
        return 'overflow'
    assert domains['now'][1] <= TOP - hours * 3600
    return 'return'


def check_terminal(state, kind, hours, clock_error):
    domains, memory = state['domains'], state['memory']
    expected = expected_kind(domains, hours, clock_error)
    assert kind == expected, (kind, expected, domains)
    wanted = initial(hours)['memory']
    if kind == 'return':
        assert state['registers'][0] == 2
        for offset, value, size in [(416, Affine('now'), 8),
                                    (424, Affine('now', hours * 3600), 8),
                                    (432, Affine('now'), 8),
                                    (384, 0, 8), (392, 0, 8), (400, 0, 8), (408, 0, 8),
                                    (440, 0, 8), (448, 0, 2)]:
            store(wanted, FRAME + offset, value, size)
        for i in range(32):
            wanted[FRAME + 352 + i] = ('mint_key', i)
    else:
        store(wanted, LAMPORTS, Affine('lamports', 1), 8)
        if kind != 'abort_lamports':
            store(wanted, DATA, Affine('data', 1), 8)
        if kind == 'overflow':
            store(wanted, FRAME + 416, Affine('now'), 8)
    # Compare all non-stack memory, including untouched state/padding and inputs.
    actual = {k: v for k, v in memory.items() if not STACK - 4096 <= k < STACK}
    assert actual.keys() == wanted.keys()
    # Singleton affine domains can turn a symbolic overflowed Rc count into zero.
    for key in actual:
        a, b = actual[key], wanted[key]
        if a == b:
            continue
        assert isinstance(a, Byte) and isinstance(b, Byte) and a.index == b.index
        assert identical_under_domains(a.value, b.value, domains), (key, a, b, domains)
    assert all(x not in state['calls'] for x in ['drop_lamports', 'drop_data'])
    return expected


def execute(wm, image, window, catalog, hours, clock_error):
    instructions = {x['offset']: x for x in wm.m.instructions(image, window['address'], window['bytes'])}
    calls = call_contracts(wm, image, window, catalog)
    pending = [initial(hours)]
    terminals = []
    visited_all = set()
    while pending:
        state = pending.pop()
        while True:
            pc = state['pc']
            assert pc not in state['visited'], 'unexpected loop'
            state['visited'].append(pc)
            visited_all.add(pc)
            row = instructions[pc]
            op, dst, src, imm, disp = [row[k] for k in ['opcode', 'destination', 'source', 'immediate', 'displacement']]
            regs, memory = state['registers'], state['memory']
            next_pc = pc + len(bytes.fromhex(row['raw']))
            if op in [0x79, 0x61, 0x71]:
                regs[dst] = load(memory, regs[src] + disp, {0x79: 8, 0x61: 4, 0x71: 1}[op])
            elif op in [0x7b, 0x73]:
                store(memory, regs[dst] + disp, regs[src], {0x7b: 8, 0x73: 1}[op])
            elif op in [0x7a, 0x6a]:
                store(memory, regs[dst] + disp, imm, {0x7a: 8, 0x6a: 2}[op])
            elif op == 0xbf:
                regs[dst] = regs[src]
            elif op == 0xb7:
                regs[dst] = imm % MOD
            elif op == 0x18:
                regs[dst] = row['lddw_value']
            elif op in [0x07, 0x0f]:
                regs[dst] = plus(regs[dst], imm if op == 0x07 else regs[src])
            elif op in [0x27, 0xaf, 0x57]:
                right = regs[src] if op == 0xaf else imm
                assert isinstance(regs[dst], int) and isinstance(right, int)
                if op == 0x27:
                    regs[dst] = regs[dst] * right % MOD
                elif op == 0xaf:
                    regs[dst] ^= right
                else:
                    regs[dst] &= right
            elif op == 0x05:
                next_pc = pc + 8 + 8 * disp
            elif op in [0x15, 0x55, 0x75, 0x7d, 0xcd]:
                right = regs[src] if op in [0x7d, 0xcd] else imm % MOD
                relation = {0x15: 'eq', 0x55: 'ne', 0x75: 'ge', 0x7d: 'ge', 0xcd: 'lt'}[op]
                alternatives = partition(state['domains'], regs[dst], right, relation, op in [0x75, 0x7d, 0xcd])
                for decision, domains in alternatives:
                    successor = copy.deepcopy(state)
                    successor['domains'] = domains
                    successor['pc'] = pc + 8 + 8 * disp if decision else next_pc
                    assert successor['pc'] in instructions
                    pending.append(successor)
                break
            elif op == 0x85:
                role = calls[pc]
                state['calls'].append(role)
                if role == 'clock':
                    pointer = regs[1]
                    for i in range(48):
                        memory[pointer + i] = 0
                    store(memory, pointer, int(clock_error), 4)
                    if clock_error:
                        for i in range(8):
                            memory[pointer + 4 + i] = ('clock_error', i)
                    else:
                        store(memory, pointer + 40, Affine('now'), 8)
                    for i in range(6):
                        regs[i] = ('clobbered_by_clock', i)
                else:
                    assert role not in ['drop_lamports', 'drop_data'], 'valid Rc reached drop_slow'
                    if role == 'overflow':
                        assert location(wm.m, image, regs[1]) == ('programs/mayhem-program/src/state.rs', 532, 32)
                    elif role == 'unwrap':
                        assert wm.m.at_address(image, regs[1], regs[2]) == b'called `Result::unwrap()` on an `Err` value'
                        assert load(memory, regs[3], 8) == Blob(tuple(('clock_error', i) for i in range(8)))
                        drop, size, alignment, method = struct.unpack('<QQQQ', wm.m.at_address(image, regs[4], 32))
                        assert (drop, size, alignment) == (0, 8, 4)
                        assert dict(wm.m.relocations(image))[regs[4] + 24] & 0xffffffff == 8
                        assert method & 0xffffffff == 0
                        formatter = next(x for x in catalog if x['address'] == method >> 32)
                        assert formatter['signature'] == '01b94f497ea24fffe334fd24f773fac62541ad12525c9a50a1b080db95c26b3b'
                        assert location(wm.m, image, regs[5]) == ('programs/mayhem-program/src/state.rs', 531, 43)
                    kind = role
                    if role == 'abort':
                        kind = 'abort_lamports' if state['domains']['lamports'] == (MOD - 1, MOD - 1) else 'abort_data'
                    terminals.append((check_terminal(state, kind, hours, clock_error), state['domains']))
                    break
            elif op == 0x95:
                terminals.append((check_terminal(state, 'return', hours, clock_error), state['domains']))
                break
            else:
                raise AssertionError(('unsupported instruction', row))
            assert next_pc in instructions
            state['pc'] = next_pc
    # Every branching step partitions its parent box exactly. No path is discarded.
    weight = lambda d: (d['now'][1] - d['now'][0] + 1) * (d['lamports'][1] - d['lamports'][0] + 1) * (d['data'][1] - d['data'][0] + 1)
    assert sum(weight(d) for _, d in terminals) == MOD * (MOD - 1) ** 2
    return terminals, visited_all


def prove(wm, image, window, catalog):
    totals, leaves, visited = {}, 0, set()
    for hours in range(256):
        for clock_error in [False, True]:
            terminal, reached = execute(wm, image, window, catalog, hours, clock_error)
            visited.update(reached)
            leaves += len(terminal)
            for kind, domains in terminal:
                weight = 1
                for low, high in domains.values():
                    weight *= high - low + 1
                totals[kind] = totals.get(kind, 0) + weight
    valid_rc = (MOD - 2) ** 2
    summed_delays = 3600 * 255 * 256 // 2
    assert totals == dict(abort_lamports=512 * MOD * (MOD - 1),
                          abort_data=512 * MOD * (MOD - 2),
                          unwrap=256 * MOD * valid_rc,
                          overflow=summed_delays * valid_rc,
                          **{'return': (256 * MOD - summed_delays) * valid_rc})
    return dict(duration_values=256, clock_outcomes=2, terminal_cells=leaves,
                concrete_integer_tuples=256 * 2 * MOD * (MOD - 1) ** 2,
                outcomes=totals, visited_instruction_offsets=sorted(visited))
