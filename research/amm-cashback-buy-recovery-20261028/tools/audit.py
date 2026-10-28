"""Read-only body, direct-edge, and panic-data audit using the unchanged ELF reader."""
import bisect
import hashlib
import struct
from elf_reader import Elf


def audit(original_path, candidate_path):
    original, candidate = Elf(original_path), Elf(candidate_path)
    start, size = 0x351A8, 8104
    function = next(f for f in candidate.funcs if '19distribute_cashback' in f['name'])
    digest = lambda b: hashlib.sha256(b).hexdigest()

    def window(at):
        index = bisect.bisect_right(original.entries, at) - 1
        begin = original.entries[index]
        end = (original.entries + [original.hi])[index + 1]
        return begin, end - begin

    def compare(left, right):
        begin, length = window(left)
        assert begin == left
        functions = [f for f in candidate.funcs if f['start'] == right and f['size'] == length]
        pattern_equal = original.pattern(left, length) == candidate.pattern(right, length)
        same = original.normalized[left:left + length] == candidate.normalized[right:right + length]
        matched = functions if same and pattern_equal else []
        return dict(original=hex(left), candidate=hex(right), bytes=length,
                    candidate_symbols=sorted(set(f['name'] for f in matched)),
                    normalized_sha256_original=digest(original.normalized[left:left + length]),
                    normalized_sha256_candidate=digest(candidate.normalized[right:right + length]),
                    pattern_equal=pattern_equal, match=bool(matched))

    left = original.callsites(start, size)
    right = candidate.callsites(function['start'], size)
    assert [r['offset'] for r in left] == [r['offset'] for r in right]
    outgoing = [dict(offset=a['offset'], **compare(a['target'], b['target'])) for a, b in zip(left, right)]
    original_incoming = [(at, target) for at, target in original.calls.items() if target == start]
    candidate_incoming = [(at, target) for at, target in candidate.calls.items() if target == function['start']]
    incoming = []
    for at, _ in original_incoming:
        begin, length = window(at)
        offset = at - begin
        callers = []
        for call, _ in candidate_incoming:
            for f in candidate.funcs:
                if f['start'] <= call < f['start'] + f['size'] and f['size'] == length and call - f['start'] == offset:
                    result = compare(begin, f['start'])
                    if result['match']:
                        callers.append(result)
        incoming.append(dict(original_callsite=hex(at), offset=offset, candidate_callers=callers, match=bool(callers)))
    callproof = dict(original_sha256=digest(original.b), candidate_symbols_sha256=digest(candidate.b),
                     function_original=hex(start), function_candidate=hex(function['start']), function_bytes=size,
                     body_match=original.normalized[start:start + size] == candidate.normalized[function['start']:function['start'] + size]
                     and original.pattern(start, size) == candidate.pattern(function['start'], size),
                     original_outgoing=len(left), candidate_outgoing=len(right), outgoing=outgoing,
                     original_incoming=len(original_incoming), candidate_incoming=len(candidate_incoming), incoming=incoming)

    def pointer(elf, at):
        return struct.unpack_from('<I', elf.b, at + 4)[0] | (struct.unpack_from('<I', elf.b, at + 12)[0] << 32)

    def location(elf, at):
        if not 0 <= at < len(elf.b) - 24:
            return None
        name, length, line, column = struct.unpack_from('<QQII', elf.b, at)
        # SBF ELF data pointers at R_BPF_64_RELATIVE sites store the addend in
        # the high word, as documented by the official reader's data path.
        if not 0 <= name < len(elf.b):
            name >>= 32
        if not (0 < length < 512 and 0 <= name < len(elf.b) - length and 0 < line < 100000 and 0 < column < 10000):
            return None
        try:
            filename = elf.b[name:name + length].decode()
        except UnicodeDecodeError:
            return None
        if not filename.endswith('.rs') or not all(31 < ord(c) < 127 for c in filename):
            return None
        return dict(pointer=hex(at), file=filename, line=line, column=column)

    locations = []
    for at, relocation in sorted(original.relocations.items()):
        if not start <= at < start + size or relocation['type'] != 8 or original.b[at] != 0x18:
            continue
        offset = at - start
        a = location(original, pointer(original, at))
        b = location(candidate, pointer(candidate, function['start'] + offset))
        if a or b:
            same = a is not None and b is not None and {k: v for k, v in a.items() if k != 'pointer'} == {k: v for k, v in b.items() if k != 'pointer'}
            locations.append(dict(offset=offset, original=a, candidate=b, match=same))
    panic = dict(original_sha256=digest(original.b), candidate_symbols_sha256=digest(candidate.b),
                 function_original=hex(start), function_candidate=hex(function['start']), function_bytes=size,
                 locations=locations, mismatches=[r['offset'] for r in locations if not r['match']])
    return callproof, panic
