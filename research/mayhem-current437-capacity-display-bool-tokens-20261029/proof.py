"""Counted capacity/Display/bool-token literal bytes, descriptors and text sites on qualified437.

Only fixed pointer/length immediates, 16-byte counted descriptors and the
classic lddw/mov text sites are read. NUL bytes, the following byte and
adjacent strings are not bounds. The 4-byte word between counted `code` and
`Kind` literals is left open. No binary middle table, digit table or
placeholder is claimed. Only static bytes are inspected.
"""
from pathlib import Path
import gzip, hashlib, importlib.util, json, struct
if not __debug__:
    raise RuntimeError('Assertions are required')

P = Path(__file__).resolve().parent
PRIOR = 'research/mayhem-current437-bounded-error-strings-20261029'
COMPOSITION = 'mayhem-current437-composition-20261028'
sha = lambda data: hashlib.sha256(data).hexdigest()

# (original_ptr, length, text) -- each string is bounded by its descriptor or
# text-site immediate, never by a NUL byte or a neighbour.
STRINGS = (
    (708538, 17, 'capacity overflow'),
    (708555, 49, 'Unable to find a viable program address bump seed'),
    (708604, 27, 'failed to fill whole buffer'),
    (708631, 2, '()'),
    (708633, 55, 'a Display implementation returned an error unexpectedly'),
    (708716, 4, 'pool'),
    (708720, 4, 'code'),
    (708728, 4, 'Kind'),
    (708732, 4, 'kind'),
    (708748, 4, 'Some'),
    (708756, 4, ' <= '),
    (708768, 4, 'Pool'),
    (708776, 4, 'None'),
    (708792, 4, '    '),
    (708796, 4, 'mint'),
    (708800, 29, 'Invalid bool representation: '),
    (708829, 5, 'Error'),
)

# Candidate addresses in the same order.
CANDIDATE_STRINGS = (
    688821, 688838, 688887, 688914, 688916, 688996, 689000, 689008, 689012,
    689028, 689036, 689048, 689056, 689072, 689076, 689080, 689109,
)

# Assigned .rodata union (exclusive ends). Seventeen bounded strings only.
# The word at [708724, 708728) between `code` and `Kind` stays open.
RODATA_SPANS = (
    (708538, 708688),
    (708716, 708724),
    (708728, 708736),
    (708748, 708752),
    (708756, 708760),
    (708768, 708772),
    (708776, 708780),
    (708792, 708834),
)

# (original_desc_off, original_ptr, length, candidate_desc_off, candidate_ptr)
DESCRIPTORS = (
    (725480, 708538, 17, 705920, 688821),
    (725496, 708555, 49, 705936, 688838),
    (725536, 708604, 27, 705976, 688887),
    (725688, 708800, 29, 706128, 689080),
    (732872, 708756, 4, 713312, 689036),
)

# (original_pc, candidate_pc, original_ptr, candidate_ptr, length, length_register)
TEXT_SITES = (
    (32192, 32192, 708631, 688914, 2, 3),
    (15568, 15568, 708633, 688916, 55, 2),
    (36128, 36128, 708829, 689109, 5, 3),
    (647160, 580840, 708748, 689028, 4, 3),
    (647224, 580904, 708776, 689056, 4, 3),
    (585064, 518744, 708768, 689048, 4, 4),
    (668264, 601944, 708728, 689008, 4, 4),
    (667344, 601024, 708732, 689012, 4, 3),
    (291976, 229712, 708716, 688996, 4, 4),
    (667584, 601264, 708720, 689000, 4, 3),
    (235832, 212512, 708796, 689076, 4, 4),
    (675576, 609256, 708792, 689072, 4, 3),
)

def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    loaded = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(loaded)
    return loaded

def prior_proof(root):
    return module('capacity_bool_prior', root / PRIOR / 'proof.py')

def names_proof(root):
    """Walk the prior chain to the ProgramError Debug-names summary owner."""
    return prior_proof(root).prior(root).prior(root)

def readers(root):
    """Reuse the unchanged qualified437 reader chain without copying it."""
    names = names_proof(root)
    return names.prior_proof(root).format_proof(root).readers(root)

def baseline_summary(root, original, candidate):
    names = names_proof(root)
    return names.inspect(names.P, original, candidate, root)['summary']

def union(intervals):
    out = []
    for start, end in sorted(map(tuple, intervals)):
        if out and start <= out[-1][1]:
            out[-1][1] = max(end, out[-1][1])
        else:
            out.append([start, end])
    return out

def measure(intervals):
    return sum(end - start for start, end in intervals)

def images(root, original, candidate):
    """Reuse the qualified437 readers and ELF pair without copying them."""
    chain = readers(root)
    original_elf, candidate_elf = chain[0].elves(original, candidate)
    return chain[0], original_elf, candidate_elf

def candidate_bytes(root):
    return readers(root)[2].inputs(root, COMPOSITION)

def rodata_bytes(image, address, length):
    assert 0 < length <= 256
    sections = [
        section for section in image.sections
        if section['name'] == '.rodata' and section['type'] != 8 and section['flags'] & 2
        and section['address'] <= address and address + length <= section['address'] + section['size']
    ]
    assert len(sections) == 1
    assert not any(address <= reloc < address + length for reloc in image.rel)
    section = sections[0]
    at = section['offset'] + address - section['address']
    return image.b[at:at + length]

def descriptor(image, offset, pointer, length):
    sections = [
        section for section in image.sections
        if section['name'] == '.data.rel.ro' and section['type'] != 8
        and section['address'] <= offset and offset + 16 <= section['address'] + section['size']
    ]
    assert len(sections) == 1
    assert sorted(reloc for reloc in image.rel if offset <= reloc < offset + 16) == [offset]
    reloc = image.rel[offset]
    assert reloc['type'] == 8 and reloc['symbol_index'] == 0
    low, high, stored = struct.unpack('<IIQ', image.b[offset:offset + 16])
    assert low == 0 and high == pointer and stored == length
    return image.b[offset:offset + 16]

def text_site(image, pc, pointer, length, length_register):
    assert image.lo <= pc and pc + 24 <= image.hi
    assert sorted(reloc for reloc in image.rel if pc <= reloc < pc + 24) == [pc]
    reloc = image.rel[pc]
    assert reloc['type'] == 8 and reloc['symbol_index'] == 0
    opcode, register, branch, immediate = struct.unpack_from('<BBhi', image.b, pc)
    assert opcode == 0x18 and branch == 0
    continuation, high = struct.unpack_from('<II', image.b, pc + 8)
    assert continuation == 0
    assert ((immediate & 0xffffffff) | (high << 32)) == pointer
    assert struct.unpack_from('<BBhi', image.b, pc + 16) == (0xb7, length_register, 0, length)
    return image.b[pc:pc + 24]

def verify_strings(original_elf, candidate_elf):
    rows = []
    for index, ((pointer, length, text), candidate_pointer) in enumerate(
        zip(STRINGS, CANDIDATE_STRINGS)
    ):
        expected = text.encode()
        assert len(expected) == length
        original = rodata_bytes(original_elf, pointer, length)
        candidate = rodata_bytes(candidate_elf, candidate_pointer, length)
        assert original == expected and candidate == expected
        assert original == candidate
        rows.append(dict(
            index=index,
            original_ptr=pointer,
            candidate_ptr=candidate_pointer,
            length=length,
            text=text,
            original_bytes_hex=original.hex(),
            candidate_bytes_hex=candidate.hex(),
        ))
    return rows

def verify_descriptors(original_elf, candidate_elf):
    rows = []
    for original_offset, original_ptr, length, candidate_offset, candidate_ptr in DESCRIPTORS:
        original = descriptor(original_elf, original_offset, original_ptr, length)
        candidate = descriptor(candidate_elf, candidate_offset, candidate_ptr, length)
        rows.append(dict(
            original_offset=original_offset,
            candidate_offset=candidate_offset,
            original_ptr=original_ptr,
            candidate_ptr=candidate_ptr,
            length=length,
            original_bytes_hex=original.hex(),
            candidate_bytes_hex=candidate.hex(),
        ))
    return rows

def verify_text_sites(original_elf, candidate_elf):
    by_pointer = {pointer: (length, text) for pointer, length, text in STRINGS}
    by_pointer.update({
        pointer: (length, text)
        for pointer, (__pointer, length, text) in zip(CANDIDATE_STRINGS, STRINGS)
    })
    rows = []
    for original_pc, candidate_pc, original_ptr, candidate_ptr, length, register in TEXT_SITES:
        assert by_pointer[original_ptr] == by_pointer[candidate_ptr]
        assert by_pointer[original_ptr][0] == length
        original = text_site(original_elf, original_pc, original_ptr, length, register)
        candidate = text_site(candidate_elf, candidate_pc, candidate_ptr, length, register)
        assert rodata_bytes(original_elf, original_ptr, length) == rodata_bytes(
            candidate_elf, candidate_ptr, length
        )
        rows.append(dict(
            original_pc=original_pc,
            candidate_pc=candidate_pc,
            original_ptr=original_ptr,
            candidate_ptr=candidate_ptr,
            length=length,
            length_register=register,
            original_bytes_hex=original.hex(),
            candidate_bytes_hex=candidate.hex(),
        ))
    return rows


def verify_images(original_elf, candidate_elf):
    return dict(
        strings=verify_strings(original_elf, candidate_elf),
        descriptors=verify_descriptors(original_elf, candidate_elf),
        text_sites=verify_text_sites(original_elf, candidate_elf),
    )

def inspect(packet, original, candidate, root):
    before = baseline_summary(root, original, candidate)
    prefix, original_elf, candidate_elf = images(root, original, candidate)
    del prefix
    observations = verify_images(original_elf, candidate_elf)
    string_intervals = union(
        (row['original_ptr'], row['original_ptr'] + row['length'])
        for row in observations['strings']
    )
    descriptor_intervals = union(
        (row['original_offset'], row['original_offset'] + 16)
        for row in observations['descriptors']
    )
    assert string_intervals == [list(span) for span in RODATA_SPANS]
    assert measure(string_intervals) == 224
    assert len(descriptor_intervals) == 4 and measure(descriptor_intervals) == 80
    summary = dict(
        normalized_windows=before['normalized_windows'],
        raw_windows=before['raw_windows'],
        extended_windows=before['extended_windows'],
        extended_pairs=before['extended_pairs'],
        rejected_pairs=before['rejected_pairs'],
        string_count=len(observations['strings']),
        descriptor_count=len(observations['descriptors']),
        text_site_count=len(observations['text_sites']),
        string_bytes=measure(string_intervals),
        literal_bytes=measure(string_intervals),
        descriptor_bytes=measure(descriptor_intervals),
    )
    return dict(summary=summary, observations=observations)

def coverage_delta(root, report):
    previous_path = root / PRIOR / 'coverage-delta.json'
    previous_bytes = previous_path.read_bytes()
    before = json.loads(previous_bytes)
    added = {
        '.rodata': [tuple(span) for span in RODATA_SPANS],
        '.data.rel.ro': [
            (row['original_offset'], row['original_offset'] + 16)
            for row in report['observations']['descriptors']
        ],
    }

    def finish(section, raw, mapped, previous):
        raw_intervals = union(raw)
        mapped_intervals = union(mapped)
        covered = union(raw_intervals + mapped_intervals)
        covered_bytes = measure(covered)
        raw_bytes = measure(raw_intervals)
        return dict(
            section=section['section'],
            total_bytes=section['total_bytes'],
            raw_intervals=raw_intervals,
            mapped_intervals=mapped_intervals,
            covered_intervals=covered,
            raw_equal_bytes=raw_bytes,
            pointer_only_bytes=covered_bytes - raw_bytes,
            covered_bytes=covered_bytes,
            new_bytes=covered_bytes - previous,
        )

    sections = []
    for section in before['sections']:
        raw = list(section['raw_intervals'])
        mapped = list(section['mapped_intervals'])
        raw = raw + added.get(section['section'], [])
        sections.append(finish(section, raw, mapped, section['covered_bytes']))
    return dict(
        scope='Counted capacity/Display/bool-token string bytes, 16-byte descriptors and classic lddw/mov text immediates only. No binary middle table, digit table, placeholder, NUL or adjacency bound, and no relocation-table credit.',
        baseline_delta_sha256=sha(previous_bytes),
        baseline_payload_bytes=before['payload_covered_bytes'],
        baseline_rodata_bytes=next(
            section['covered_bytes'] for section in before['sections'] if section['section'] == '.rodata'
        ),
        baseline_data_rel_ro_bytes=next(
            section['covered_bytes'] for section in before['sections'] if section['section'] == '.data.rel.ro'
        ),
        sections=sections,
        new_payload_bytes=sum(section['new_bytes'] for section in sections),
        payload_covered_bytes=sum(section['covered_bytes'] for section in sections),
        payload_total_bytes=before['payload_total_bytes'],
    )

def inventory(packet):
    return {
        str(path.relative_to(packet)): sha(path.read_bytes())
        for path in sorted(packet.rglob('*'))
        if path.is_file()
        and path.name != 'manifest.json'
        and '__pycache__' not in path.parts
        and path.suffix != '.pyc'
    }

def check(packet, root):
    paths = list(packet.rglob('*'))
    assert not any(path.is_symlink() for path in paths), 'packet symlink'
    assert all(path.is_file() or path.is_dir() for path in paths), 'packet special file'
    assert inventory(packet) == json.loads((packet / 'manifest.json').read_bytes()), 'packet inventory differs'
    pinned = json.loads((packet / 'inputs.json').read_bytes())
    for path, digest in pinned.items():
        relative = Path(path)
        assert not relative.is_absolute() and '..' not in relative.parts
        assert sha((root / relative).read_bytes()) == digest, path
    for path in (root / PRIOR).rglob('*'):
        if path.is_file() and '__pycache__' not in path.parts and path.suffix != '.pyc':
            assert str(path.relative_to(root)) in pinned, path
    prior_proof(root).check(root / PRIOR, root)
    original = (root / 'evidence/original/mayhem/deployed.so').read_bytes()
    candidate = candidate_bytes(root)
    report = inspect(packet, original, candidate, root)
    assert report == json.loads(
        gzip.decompress((packet / 'observations.json.gz').read_bytes())
    ), 'fresh observations differ'
    delta = coverage_delta(root, report)
    assert delta == json.loads((packet / 'coverage-delta.json').read_bytes()), 'coverage delta differs'
    summary = dict(report['summary'])
    summary['new_payload_bytes'] = delta['new_payload_bytes']
    assert (summary['normalized_windows'], summary['raw_windows'], summary['extended_windows'], summary['extended_pairs']) == (437, 141, 431, 581)
    assert (summary['string_count'], summary['descriptor_count'], summary['text_site_count']) == (17, 5, 12)
    assert (summary['string_bytes'], summary['literal_bytes'], summary['descriptor_bytes'], summary['new_payload_bytes']) == (224, 224, 80, 304)
    assert summary['rejected_pairs'] == 0
    assert (delta['baseline_payload_bytes'], delta['payload_covered_bytes'], delta['payload_total_bytes']) == (20747, 21051, 26180)
    assert (delta['baseline_rodata_bytes'], delta['baseline_data_rel_ro_bytes']) == (14035, 6712)
    by_section = {section['section']: section for section in delta['sections']}
    assert (by_section['.rodata']['new_bytes'], by_section['.rodata']['covered_bytes'], by_section['.rodata']['total_bytes']) == (224, 14259, 18396)
    assert (by_section['.data.rel.ro']['new_bytes'], by_section['.data.rel.ro']['covered_bytes'], by_section['.data.rel.ro']['total_bytes']) == (80, 6792, 7784)
    assert all(
        row['original_bytes_hex'] == row['candidate_bytes_hex']
        for row in report['observations']['strings']
    )
    return summary

def seal(packet=None, root=None):
    packet = packet or P
    root = root or next(
        parent for parent in packet.parents
        if (parent / 'evidence/original/mayhem/deployed.so').is_file()
    )
    original = (root / 'evidence/original/mayhem/deployed.so').read_bytes()
    report = inspect(packet, original, candidate_bytes(root), root)
    (packet / 'observations.json.gz').write_bytes(
        gzip.compress(json.dumps(report, separators=(',', ':')).encode(), mtime=0)
    )
    delta = coverage_delta(root, report)
    (packet / 'coverage-delta.json').write_text(json.dumps(delta, indent=2) + '\n')
    (packet / 'manifest.json').write_text(json.dumps(inventory(packet), indent=2) + '\n')
    summary = dict(report['summary'])
    summary['new_payload_bytes'] = delta['new_payload_bytes']
    return summary

if __name__ == '__main__':
    print(json.dumps(seal(), indent=2))
