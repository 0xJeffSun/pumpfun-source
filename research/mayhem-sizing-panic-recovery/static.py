"""Bind the typed sizing panic to the live BuyV2 handler and its complete entry wrapper."""
import importlib.util
import json
from pathlib import Path
import struct

ROOT = Path(__file__).resolve().parents[2]
PARENT = ROOT / 'research/mayhem-trade-origins-validator'
SPECS = [('buy_v2', 'O0083', 'O0189', 378, 89)]


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


def key(window):
    return (window['end'] - window['start'], window['normalized_sha256'],
            json.dumps(window['normalization_pattern'], sort_keys=True))


def functions(elf):
    return {s['value']: elf.window(s['value'], s['value'] + s['size'])
            for s in elf.symbols if s['info'] & 15 == 2 and s['size'] >= 8
            and elf.lo <= s['value'] < elf.hi}


def source_refs(elf, window, line, column):
    refs = []
    for ref in window['data_references']:
        at = ref['target']
        if at not in elf.rel or elf.rel[at]['type'] != 8:
            continue
        zero, pointer, length, ln, col = struct.unpack_from('<IIQII', elf.b, at)
        path = b'programs/mayhem-program/src/state.rs\0'
        if zero == 0 and (length, ln, col) == (len(path), line, column) and elf.b[pointer:pointer + length] == path:
            refs.append(ref)
    return refs


def panic(elf, window, line, column):
    refs = source_refs(elf, window, line, column)
    assert len(refs) == 1, (line, column, refs)
    pc = refs[0]['pc']
    read = lambda offset: struct.unpack_from('<BBhi', elf.b, pc + offset)
    # A typed u32 error is passed by reference to Result::unwrap's panic path.
    store = read(-64)
    assert store[0:2] == (0x62, 0x0a) and store[3] == 9
    assert read(-56) == (0xbf, 0xa3, 0, 0)
    assert read(-48) == (0x07, 0x03, 0, store[2])
    assert read(-40)[0:3] == (0x18, 0x01, 0)
    assert read(-24) == (0xb7, 0x02, 0, 43)
    assert read(-16)[0:3] == (0x18, 0x04, 0)
    assert read(0)[0:3] == (0x18, 0x05, 0)
    assert read(16)[0:3] == (0x85, 0x10, 0)
    pointer = lambda offset: struct.unpack_from('<I', elf.b, pc + offset + 4)[0] | (struct.unpack_from('<I', elf.b, pc + offset + 12)[0] << 32)
    message = pointer(-40)
    assert elf.b[message:message + 43] == b'called `Result::unwrap()` on an `Err` value'
    table = pointer(-16)
    drop, size, align, debug = struct.unpack_from('<QQQQ', elf.b, table)
    assert (drop, size, align) == (0, 4, 4) and debug & 0xffffffff == 0
    assert table + 24 in elf.rel and elf.rel[table + 24]['type'] == 8
    return dict(source_pc=pc, source_address=refs[0]['target'], line=line, column=column,
                error_variant=9, stack_offset=store[2], message_bytes=43,
                debug_vtable_address=table, debug_target=debug >> 32,
                panic_target=pc + 24 + read(16)[3] * 8,
                instruction_block_sha256=__import__('hashlib').sha256(elf.b[pc - 64:pc + 24]).hexdigest())


def inspect(symbols):
    reader = module('sizing_reader', PARENT / 'reader.py')
    original = reader.Elf(ROOT / 'evidence/original/mayhem/deployed.so')
    candidate = reader.Elf(Path(symbols).resolve())
    rows = json.loads((PARENT / 'audit.json').read_bytes())['rows']
    originals = {r['id']: original.window(r['start'], r['end']) for r in rows}
    original_functions = {w['start']: w for w in originals.values()}
    candidates = functions(candidate)
    result = []
    for name, handler_id, wrapper_id, line, column in SPECS:
        wrapper, handler = originals[wrapper_id], originals[handler_id]
        wrappers = [w for w in candidates.values() if key(w) == key(wrapper)]
        assert wrappers
        call = next(i for i, edge in enumerate(wrapper['direct']) if edge['target'] == handler['start'])
        targets = {w['direct'][call]['target'] for w in wrappers}
        assert len(targets) == 1
        target_address = targets.pop()
        assert target_address in candidates
        target = candidates[target_address]
        # Both builds inline the shared Rust sizing helper in the live handler.
        a, b = panic(original, handler, line, column), panic(candidate, target, line, column)
        for field in ('panic_target', 'debug_target'):
            assert key(original_functions[a[field]]) == key(candidates[b[field]]), field
        result.append(dict(instruction=name, original_id=handler_id, wrapper_id=wrapper_id,
                           wrapper_normalized_equal=True, candidate_handler=target['start'],
                           handler_normalized_equal=key(handler) == key(target),
                           handler_call_pc=wrappers[0]['direct'][call]['pc'], sizing_inlined=True,
                           original=a, candidate=b,
                           panic_callee_normalized_equal=True, debug_callee_normalized_equal=True))
    return result


def inherited(symbols):
    """Recheck the immediate validator closure and three recovered trade origins."""
    reader = module('sizing_inherited_reader', PARENT / 'reader.py')
    original = reader.Elf(ROOT / 'evidence/original/mayhem/deployed.so')
    candidate = reader.Elf(Path(symbols).resolve())
    rows = json.loads((PARENT / 'audit.json').read_bytes())['rows']
    originals = {r['start']: original.window(r['start'], r['end']) for r in rows}
    return dict(
        validator=module('sizing_validator', PARENT / 'validator.py').inspect(
            original, candidate, originals, functions(candidate)),
        handlers=module('sizing_handlers', PARENT / 'handlers.py').inspect(
            original, candidate, rows),
    )
