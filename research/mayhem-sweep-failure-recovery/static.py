"""Bounded evidence for the live sweep failure paths; not complete handler equality."""
from collections import Counter
import hashlib
import importlib.util
import json
from pathlib import Path
import struct

ROOT = Path(__file__).resolve().parents[2]
PARENT = ROOT / 'research/mayhem-trade-origins-validator'
PATH = b'programs/mayhem-program/src/instructions/fee_recipients.rs'


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


def key(w):
    return (w['end'] - w['start'], w['normalized_sha256'],
            json.dumps(w['normalization_pattern'], sort_keys=True))


def functions(elf):
    return {s['value']: elf.window(s['value'], s['value'] + s['size'])
            for s in elf.symbols if s['info'] & 15 == 2 and s['size'] >= 8
            and elf.lo <= s['value'] < elf.hi}


def source(elf, window, line, column):
    found = []
    for ref in window['data_references']:
        at = ref['target']
        if at not in elf.rel or elf.rel[at]['type'] != 8:
            continue
        zero, ptr, size, ln, col = struct.unpack_from('<IIQII', elf.b, at)
        if (zero, size, ln, col) == (0, len(PATH)+1, line, column) and elf.b[ptr:ptr+size] == PATH+b'\0':
            found.append(ref)
    assert len(found) == 1, (line, column, found)
    return found[0]


def anchor(elf, window, line):
    found = []
    for ref in window['data_references']:
        if elf.b[ref['target']:ref['target']+len(PATH)] != PATH:
            continue
        at = ref['pc']
        op, regs, _, _ = struct.unpack_from('<BBhi', elf.b, at)
        if op != 0x18:
            continue
        for p in range(at+16, min(at+40, window['end']), 8):
            op, r, off, _ = struct.unpack_from('<BBhi', elf.b, p)
            if op == 0x7b and r & 15 == 10 and r >> 4 == regs & 15:
                break
        else:
            continue
        bound = next((c['pc'] for c in window['direct'] if c['pc'] > p), None)
        if bound is None:
            continue
        values = {}
        for pc in range(max(window['start'], at-64), bound, 8):
            op, r, offset, imm = struct.unpack_from('<BBhi', elf.b, pc)
            if r & 15 == 10 and op == 0x7a and offset == off+8:
                values['filename_bytes'] = imm
            if r & 15 == 10 and op == 0x62 and offset == off+16:
                values.update(line=imm, line_store_pc=pc)
        if values.get('filename_bytes') == len(PATH) and values.get('line') == line:
            found.append(dict(pc=at, path=PATH.decode(), **values))
    assert len(found) == 1, (line, found)
    return found[0]


def panic(elf, window, line, col, register, windows):
    ref = source(elf, window, line, col)
    pc = ref['pc']
    insn = lambda p: struct.unpack_from('<BBhi', elf.b, p)
    assert insn(pc)[:3] == (0x18, 1, 0)
    assert insn(pc+16)[:3] == (0x85, 0x10, 0)
    target = pc+24+insn(pc+16)[3]*8
    branches = [b for b in window['branches'] if b['target'] == pc]
    assert len(branches) == 1
    guard = branches[0]['pc']
    assert insn(guard)[:2] == (0xad, register) and insn(guard)[3] == 0
    callee = windows[target]
    assert len(callee['data_references']) == 1
    descriptor = callee['data_references'][0]['target']
    assert elf.rel[descriptor]['type'] == 8
    zero, pointer, size = struct.unpack_from('<IIQ', elf.b, descriptor)
    assert zero == 0 and size == 33 and elf.b[pointer:pointer+size] == b'attempt to subtract with overflow'
    chain = module('sweep_terminal', ROOT/'research/mayhem-sweep-branch-layout/analysis.py').terminal_chain(elf, target, windows)
    return dict(source_pc=pc, source_address=ref['target'], line=line, column=col,
                guard_pc=guard, balance_register=register,
                panic_target=target, descriptor_address=descriptor, message_address=pointer,
                terminal_chain=chain)


def inspect(symbols):
    reader = module('sweep_reader', PARENT/'reader.py')
    original = reader.Elf(ROOT/'evidence/original/mayhem/deployed.so')
    candidate = reader.Elf(Path(symbols).resolve())
    rows = json.loads((PARENT/'audit.json').read_bytes())['rows']
    ow = {r['id']: original.window(r['start'], r['end']) for r in rows}
    original_functions = {w['start']: w for w in ow.values()}
    cw = functions(candidate)
    result = []
    for role, handler_id, wrapper_id, error_line, line, col, reg in (
            ('admin', 'O0075', 'O0170', 399, 358, 37, 8),
            ('trader', 'O0076', 'O0169', 431, 284, 17, 6)):
        handler, wrapper = ow[handler_id], ow[wrapper_id]
        wrappers = [w for w in cw.values() if key(w) == key(wrapper)]
        assert wrappers
        calls = [i for i,c in enumerate(wrapper['direct']) if c['target'] == handler['start']]
        assert len(calls) == 1
        call = calls[0]
        targets = {w['direct'][call]['target'] for w in wrappers}
        assert len(targets) == 1
        live = cw[targets.pop()]
        a = panic(original, handler, line, col, reg, original_functions)
        b = panic(candidate, live, line, col, reg, cw)
        assert [x['shape'] for x in a['terminal_chain']] == [x['shape'] for x in b['terminal_chain']]
        result.append(dict(role=role, original_id=handler_id, wrapper_id=wrapper_id,
            wrapper_equal=True, handler_call_pc=wrappers[0]['direct'][call]['pc'],
            original_bytes=handler['end']-handler['start'], candidate_start=live['start'],
            candidate_bytes=live['end']-live['start'], whole_handler_equal=key(handler)==key(live),
            original_panic=a, candidate_panic=b,
            original_error=anchor(original,handler,error_line), candidate_error=anchor(candidate,live,error_line),
            original_event_source=source(original,handler,13,1), candidate_event_source=source(candidate,live,13,1)))
    return result


def inherited(symbols):
    previous = module('sweep_sizing', ROOT/'research/mayhem-sizing-panic-recovery/static.py')
    return dict(sizing=previous.inspect(symbols), **previous.inherited(symbols))
