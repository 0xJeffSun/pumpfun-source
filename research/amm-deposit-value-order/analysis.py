"""Recompute bounded deposit body, immediate-call and unchanged-data evidence."""
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
TARGET, SIZE = 0x2FB38, 7128
SOURCE = b'programs/pump-amm/src/instructions/liquidity/deposit.rs'


def digest(data):
    return hashlib.sha256(data).hexdigest()


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


reader = module('deposit_elf_reader', HERE / 'elf_reader.py')


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
    return size, digest(elf.normalized[start:start + size]), json.dumps(elf.pattern(start, size), sort_keys=True)


def capacity(elf, spans, raw=False):
    return Counter((size, digest(elf.b[start:start + size])) if raw else signature(elf, start, size)
                   for start, size in spans)


def recompute(original=None, images=None):
    evidence = json.loads((HERE / 'evidence.json').read_text())
    original = original if original is not None else (ROOT / 'evidence/original/pump_amm/deployed.so').read_bytes()
    if images is None:
        images = {name: {kind: gzip.decompress((HERE / spec[kind]).read_bytes())
                         for kind in ('candidate', 'symbols')}
                  for name, spec in evidence['builds'].items()}
    assert digest(original) == evidence['original_sha256']
    o = image(original)
    ow = windows(o)
    oc, raw_original = capacity(o, ow), capacity(o, ow, True)
    assert len(ow) == 785 and dict(ow)[TARGET] == SIZE
    variants, covered, raw_covered, elfs = {}, {}, {}, {}
    for name in ('parent', 'control', 'proposal', 'repeat'):
        candidate = image(images[name]['candidate'])
        symbols = image(images[name]['symbols'])
        assert candidate.b[candidate.lo:candidate.hi] == symbols.b[symbols.lo:symbols.hi]
        assert candidate.pattern(candidate.lo, candidate.hi - candidate.lo) == symbols.pattern(symbols.lo, symbols.hi - symbols.lo)
        spans = functions(symbols)
        covered[name] = oc & capacity(symbols, spans)
        raw_covered[name] = raw_original & capacity(symbols, spans, True)
        variants[name] = dict(normalized=sum(covered[name].values()), raw=sum(raw_covered[name].values()),
                              unmatched=785 - sum(covered[name].values()))
        elfs[name] = symbols
    assert variants['parent'] == variants['control'] == dict(normalized=726, raw=148, unmatched=59)
    assert variants['proposal'] == variants['repeat'] == dict(normalized=727, raw=148, unmatched=58)
    for name in ('parent', 'control'):
        assert not covered[name] - covered['proposal']
        assert not raw_covered[name] - raw_covered['proposal']
    gained = covered['proposal'] - covered['parent']
    assert sum(gained.values()) == 1 and gained[signature(o, TARGET, SIZE)] == 1
    c, control = elfs['proposal'], elfs['control']
    matches = [(at, size) for at, size in functions(c) if signature(c, at, size) == signature(o, TARGET, SIZE)]
    assert len(matches) == 1
    start, size = matches[0]
    assert size == SIZE and c.normalized[start:start + size] == o.normalized[TARGET:TARGET + SIZE]
    assert c.pattern(start, size) == o.pattern(TARGET, SIZE)
    near = next(f for f in control.funcs if f['start'] == start and f['size'] == SIZE)
    mismatched_slots = [offset for offset in range(0, SIZE, 8)
                        if control.normalized[start + offset:start + offset + 8] != o.normalized[TARGET + offset:TARGET + offset + 8]]
    assert near and mismatched_slots == [0x1228, 0x1230]
    a, b = images['control']['candidate'], images['proposal']['candidate']
    assert len(a) == len(b) == 1307208
    differences = [i for i, (x, y) in enumerate(zip(a, b)) if x != y]
    expected = [start + offset + byte for offset in (0x1228, 0x1230) for byte in (1, 2, 3)]
    assert differences == expected
    assert all(c.lo <= offset < c.hi for offset in differences)
    assert images['proposal'] == images['repeat']
    original_by_start, candidate_by_start = dict(ow), {}
    for at, length in functions(c):
        assert at not in candidate_by_start or candidate_by_start[at] == length
        candidate_by_start[at] = length
    left = {r['offset']: r['target'] for r in o.callsites(TARGET, SIZE)}
    right = {r['offset']: r['target'] for r in c.callsites(start, SIZE)}
    assert left.keys() == right.keys() and len(left) == 55
    calls = []
    for offset, old in sorted(left.items()):
        new = right[offset]
        old_size, new_size = original_by_start[old], candidate_by_start[new]
        calls.append(dict(offset=offset, original_target=old, candidate_target=new,
                          original_bytes=old_size, candidate_bytes=new_size,
                          normalized_equal=signature(o, old, old_size) == signature(c, new, new_size)))
    unmatched = [r for r in calls if not r['normalized_equal']]
    assert [(r['offset'], r['original_target']) for r in unmatched] == [(2208, 0x74128), (2608, 0x74B80)]
    references = []
    assert len(SOURCE) == 55
    for offset in (760, 1496, 1880, 3936):
        values = []
        for elf, at in ((o, TARGET + offset), (c, start + offset)):
            assert elf.b[at] == 0x18 and elf.relocations[at]['type'] == 8
            pointer = struct.unpack_from('<I', elf.b, at + 4)[0] | struct.unpack_from('<I', elf.b, at + 12)[0] << 32
            value = elf.b[pointer:pointer + len(SOURCE)]
            assert value == SOURCE
            values.append(pointer)
        references.append(dict(offset=offset, original_pointer=values[0], candidate_pointer=values[1], value=SOURCE.decode()))
    assert images['proposal']['candidate'] != original
    shoff = struct.unpack_from('<Q', original, 40)[0]
    shsize, shcount = struct.unpack_from('<HH', original, 58)
    extent = max([shoff + shsize * shcount] + [s[4] + s[5] for s in o.raw if s[1] != 8])
    assert images['proposal']['candidate'] != original[:extent]
    return dict(variants=variants, gained_original_windows=[TARGET], lost_normalized_windows=[], lost_raw_windows=[],
                target=dict(original=TARGET, candidate=start, bytes=SIZE, normalized_equal=True,
                            raw_local_equal=original[TARGET:TARGET + SIZE] == c.b[start:start + SIZE]),
                control_mismatched_slots=mismatched_slots, changed_file_byte_positions=differences,
                all_other_candidate_bytes_identical=True, source_references=references,
                immediate_calls=calls, matched_immediate_callees=53, unmatched_immediate_callees=unmatched,
                whole_capture_equal=False, whole_elf_equal=False)


if __name__ == '__main__':
    print(json.dumps(recompute(), indent=2))
