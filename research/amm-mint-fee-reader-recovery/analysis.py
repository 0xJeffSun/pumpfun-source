"""Recompute the mint reader body and its bounded call/data comparisons."""
from collections import Counter
from pathlib import Path
import gzip
import hashlib
import importlib.util
import json
import struct

if not __debug__:
    raise SystemExit('Verification requires Python without -O')

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
TARGET, CANDIDATE, SIZE = 0x74128, 0x29980, 1312
ORIGINAL_SHA256 = '6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7'
READER_SHA256 = '247700e9930d5e53daf93a50888ae1e5429f74ccb19155e7a205f72ee21d5883'
SOURCE = b'programs/pump-amm/src/utils/transfer_fee.rs'
PANIC_SOURCE = b'/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/string.rs'
DISPLAY_ERROR = b'a Display implementation returned an error unexpectedly'
TOKEN_2022_ID = bytes.fromhex('06ddf6e1ee758fde18425dbce46ccddab61afc4d83b90d27febdf928d8a18bfc')
REFERENCE_OFFSETS = (24, 248, 296, 392, 440, 464, 480, 992)


def digest(data):
    return hashlib.sha256(data).hexdigest()


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


assert digest((HERE / 'elf_reader.py').read_bytes()) == READER_SHA256
reader = module('mint_fee_reader_elf', HERE / 'elf_reader.py')


class Bytes:
    def __init__(self, data):
        self.data = data

    def read_bytes(self):
        return self.data


def image(data):
    return reader.Elf(Bytes(data))


def windows(elf):
    starts = sorted(set(elf.entries) | {elf.lo})
    return [(start, stop - start) for start, stop in zip(starts, starts[1:] + [elf.hi])]


def functions(elf):
    return sorted({(f['start'], f['size']) for f in elf.funcs})


def signature(elf, start, size):
    assert elf.lo <= start < start + size <= elf.hi
    return size, digest(elf.normalized[start:start + size]), json.dumps(elf.pattern(start, size), sort_keys=True)


def capacity(elf, spans, raw=False):
    return Counter((size, digest(elf.b[start:start + size])) if raw else signature(elf, start, size)
                   for start, size in spans)


def function_sizes(spans):
    result = {}
    for start, size in spans:
        assert start not in result or result[start] == size
        result[start] = size
    return result


def data(elf, at, size):
    assert size > 0 and 0 <= at < at + size <= len(elf.b)
    assert any(s[1] != 8 and s[2] & 2 and s[4] <= at < at + size <= s[4] + s[5]
               for s in elf.raw)
    return elf.b[at:at + size]


def instruction_pointer(elf, at):
    assert elf.b[at] == 0x18
    assert elf.relocations[at] == dict(type=8, symbol='')
    return struct.unpack_from('<I', elf.b, at + 4)[0] | struct.unpack_from('<I', elf.b, at + 12)[0] << 32


def data_pointer(elf, at):
    assert elf.relocations[at] == dict(type=8, symbol='')
    word, = struct.unpack('<Q', data(elf, at, 8))
    # R_BPF_64_RELATIVE data words store this file's pointer in the high limb.
    assert word & 0xffffffff == 0
    return word >> 32


def pointed_function(o, c, old, new, old_sizes, new_sizes):
    old_size, new_size = old_sizes[old], new_sizes[new]
    assert signature(o, old, old_size) == signature(c, new, new_size)
    return dict(original_target=old, candidate_target=new,
                original_bytes=old_size, candidate_bytes=new_size, normalized_equal=True)


def references(o, c, old_sizes, new_sizes):
    """Check each root LDDW target using its actual typed record extent."""
    expected = [dict(offset=offset, type=8, symbol='') for offset in REFERENCE_OFFSETS]
    assert o.pattern(TARGET, SIZE) == c.pattern(CANDIDATE, SIZE) == expected
    result = []
    for offset in REFERENCE_OFFSETS:
        old = instruction_pointer(o, TARGET + offset)
        new = instruction_pointer(c, CANDIDATE + offset)
        record = dict(offset=offset, original_pointer=old, candidate_pointer=new)
        if offset in (24, 248, 392, 440, 992):
            kind, value = {
                24: ('token_2022_program_id', TOKEN_2022_ID),
                248: ('pump_amm_error_discriminant', struct.pack('<I', 7)),
                392: ('pump_amm_error_discriminant', struct.pack('<I', 7)),
                440: ('display_error_message', DISPLAY_ERROR),
                992: ('transfer_fee_source_path', SOURCE),
            }[offset]
            assert data(o, old, len(value)) == data(c, new, len(value)) == value
            assert not any(old <= at < old + len(value) for at in o.relocations)
            assert not any(new <= at < new + len(value) for at in c.relocations)
            record.update(kind=kind, bytes=len(value), sha256=digest(value))
            if offset in (248, 392):
                record['value'] = 7
            elif offset != 24:
                record['value'] = value.decode()
        elif offset in (296, 464):
            # fmt::Write has three method slots; fmt::Debug has one.
            methods = ((24, 'write_str'), (32, 'write_char'), (40, 'write_fmt')) if offset == 296 else ((24, 'fmt'),)
            extent = 48 if offset == 296 else 32
            old_words = struct.unpack('<' + 'Q' * (extent // 8), data(o, old, extent))
            new_words = struct.unpack('<' + 'Q' * (extent // 8), data(c, new, extent))
            size_align = (24, 8) if offset == 296 else (0, 1)
            assert old_words[1:3] == new_words[1:3] == size_align
            slots = ((0, 'drop_in_place'),) + methods
            assert [at - old for at in sorted(o.relocations) if old <= at < old + extent] == [slot for slot, _ in slots]
            assert [at - new for at in sorted(c.relocations) if new <= at < new + extent] == [slot for slot, _ in slots]
            targets = []
            for slot, name in slots:
                target = pointed_function(o, c, data_pointer(o, old + slot), data_pointer(c, new + slot), old_sizes, new_sizes)
                targets.append(dict(slot=slot, method=name, **target))
            record.update(kind='fmt_write_vtable' if offset == 296 else 'fmt_error_debug_vtable',
                          bytes=extent, value_size=size_align[0], value_align=size_align[1], functions=targets)
        else:
            assert offset == 480
            # core::panic::Location: filename slice followed by u32 line/column.
            old_filename, new_filename = data_pointer(o, old), data_pointer(c, new)
            old_tail = struct.unpack('<QII', data(o, old + 8, 16))
            new_tail = struct.unpack('<QII', data(c, new + 8, 16))
            assert old_tail == new_tail == (84, 2559, 14)
            assert len(PANIC_SOURCE) == 84
            assert data(o, old_filename, 84) == data(c, new_filename, 84) == PANIC_SOURCE
            assert [at - old for at in o.relocations if old <= at < old + 24] == [0]
            assert [at - new for at in c.relocations if new <= at < new + 24] == [0]
            record.update(kind='panic_source_location', bytes=24,
                          original_filename_pointer=old_filename, candidate_filename_pointer=new_filename,
                          filename_bytes=84, filename=PANIC_SOURCE.decode(), line=2559, column=14)
        result.append(record)
    assert len(SOURCE) == 43 and len(DISPLAY_ERROR) == 55
    return result


def recompute(original=None, images=None):
    original = original if original is not None else (ROOT / 'evidence/original/pump_amm/deployed.so').read_bytes()
    if images is None:
        evidence = json.loads((HERE / 'evidence.json').read_text())
        assert evidence['original_sha256'] == ORIGINAL_SHA256
        images = {name: {kind: gzip.decompress((HERE / evidence['builds'][name][kind]).read_bytes())
                         for kind in ('candidate', 'symbols')}
                  for name in ('parent', 'proposal', 'repeat')}
    assert digest(original) == ORIGINAL_SHA256
    assert set(images) == {'parent', 'proposal', 'repeat'}
    o = image(original)
    original_windows = windows(o)
    old_sizes = function_sizes(original_windows)
    assert len(original_windows) == 785 and old_sizes[TARGET] == SIZE
    normalized_original = capacity(o, original_windows)
    raw_original = capacity(o, original_windows, True)
    variants, covered, raw_covered, elfs, stripped = {}, {}, {}, {}, {}
    for name in ('parent', 'proposal', 'repeat'):
        assert set(images[name]) == {'candidate', 'symbols'}
        candidate, symbols = (image(images[name][kind]) for kind in ('candidate', 'symbols'))
        assert candidate.lo == symbols.lo and candidate.hi == symbols.hi
        assert candidate.b[candidate.lo:candidate.hi] == symbols.b[symbols.lo:symbols.hi]
        assert candidate.pattern(candidate.lo, candidate.hi - candidate.lo) == symbols.pattern(symbols.lo, symbols.hi - symbols.lo)
        spans = functions(symbols)
        covered[name] = normalized_original & capacity(symbols, spans)
        raw_covered[name] = raw_original & capacity(symbols, spans, True)
        variants[name] = dict(normalized=sum(covered[name].values()), raw=sum(raw_covered[name].values()),
                              unmatched=785 - sum(covered[name].values()))
        elfs[name], stripped[name] = symbols, candidate
    assert variants['parent'] == dict(normalized=730, raw=148, unmatched=55)
    assert variants['proposal'] == variants['repeat'] == dict(normalized=731, raw=148, unmatched=54)
    assert not covered['parent'] - covered['proposal']
    assert not raw_covered['parent'] - raw_covered['proposal']
    assert covered['proposal'] == covered['repeat'] and raw_covered['proposal'] == raw_covered['repeat']
    gained = covered['proposal'] - covered['parent']
    assert sum(gained.values()) == 1 and gained[signature(o, TARGET, SIZE)] == 1
    assert images['proposal'] == images['repeat']
    c = elfs['proposal']
    spans = functions(c)
    new_sizes = function_sizes(spans)
    matches = [(at, size) for at, size in spans if signature(c, at, size) == signature(o, TARGET, SIZE)]
    assert matches == [(CANDIDATE, SIZE)]
    assert c.normalized[CANDIDATE:CANDIDATE + SIZE] == o.normalized[TARGET:TARGET + SIZE]
    assert c.pattern(CANDIDATE, SIZE) == o.pattern(TARGET, SIZE)
    left = {r['offset']: r['target'] for r in o.callsites(TARGET, SIZE)}
    right = {r['offset']: r['target'] for r in c.callsites(CANDIDATE, SIZE)}
    assert left.keys() == right.keys() and len(left) == 10
    calls = []
    for offset, old in sorted(left.items()):
        new = right[offset]
        old_size, new_size = old_sizes[old], new_sizes[new]
        calls.append(dict(offset=offset, original_target=old, candidate_target=new,
                          original_bytes=old_size, candidate_bytes=new_size,
                          normalized_equal=signature(o, old, old_size) == signature(c, new, new_size)))
    unmatched = [r for r in calls if not r['normalized_equal']]
    assert unmatched == [dict(offset=200, original_target=0xf31d8, candidate_target=0x2ac50,
                              original_bytes=664, candidate_bytes=456, normalized_equal=False)]
    data_references = references(o, c, old_sizes, new_sizes)
    assert references(o, stripped['proposal'], old_sizes, new_sizes) == data_references
    assert images['proposal']['candidate'] != original
    shoff = struct.unpack_from('<Q', original, 40)[0]
    shsize, shcount = struct.unpack_from('<HH', original, 58)
    extent = max([shoff + shsize * shcount] + [s[4] + s[5] for s in o.raw if s[1] != 8])
    assert images['proposal']['candidate'] != original[:extent]
    return dict(variants=variants, gained_original_windows=[TARGET], lost_normalized_windows=[], lost_raw_windows=[],
                target=dict(original=TARGET, candidate=CANDIDATE, bytes=SIZE, normalized_equal=True,
                            raw_local_equal=original[TARGET:TARGET + SIZE] == c.b[CANDIDATE:CANDIDATE + SIZE]),
                repeat_artifacts_equal=True, data_references=data_references,
                immediate_calls=calls, matched_immediate_callees=9, unmatched_immediate_callees=unmatched,
                whole_capture_equal=False, whole_elf_equal=False,
                limits=dict(normalization='Direct-call displacement and relocated pointer values only; relocation kind, symbol, and offset retained.',
                            decoder_body_equal=False, call_graph_closed=False, historical_source_syntax_proven=False))


if __name__ == '__main__':
    print(json.dumps(recompute(), indent=2))
