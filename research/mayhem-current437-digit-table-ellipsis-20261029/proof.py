"""Counted decimal digit-table and ellipsis .rodata bytes on qualified437.

Claims three static intervals inside the leftover gap after format-crumbs #889:

- `[723444, 723447)` — early format crumb space-brace-newline bounded by lddw + mov-imm length 3
  at pc+24 (equal rigor to classic text sites; length is not at pc+16).
- `[723458, 723658)` — 100 two-digit ASCII pairs `00`..`99` (200 bytes). Length comes
  from an index-table equal-rigor bound: `(n % 100) << 1` with and-mask, base pointer
  add, and byte loads — the same discipline as
  `research/mayhem-current437-bounded-index-tables-20261029/`.
- `[723658, 723663)` — `[...]` bounded by lddw of the pointer plus mov-imm length 5
  in the same block.

`[723439, 723444)` stays open (conditional length 2/3). Do not reclaim #889's
`[723447, 723458)`. NUL and adjacency are not bounds. No descriptor credit.
Only static bytes are inspected.
"""
from pathlib import Path
import gzip, hashlib, importlib.util, json, struct
if not __debug__:
    raise RuntimeError('Assertions are required')

P = Path(__file__).resolve().parent
PRIOR = 'research/mayhem-current437-option-seeds-paths-20261029'
OPTION_SEEDS_DELTA = 'research/mayhem-current437-option-seeds-paths-20261029/coverage-delta.json'
OPTION_SEEDS_SHA = 'e8f6c7f03f18b6e8ce94d778cc9c4aaa56de798ad5a634412e8cf79ce9dedf2d'
INDEX_TABLES_DELTA = 'research/mayhem-current437-bounded-index-tables-20261029/coverage-delta.json'
INDEX_TABLES_SHA = 'f6efa470f1d18bcec99cab2c95ecf1fc650fe5606bcdbc73956986779e7cb282'
# Prefer tip-of-main index-tables union as coverage baseline (superset of option-seeds).
MERGE = ((INDEX_TABLES_DELTA, INDEX_TABLES_SHA),)
sha = lambda data: hashlib.sha256(data).hexdigest()

# Classic / near-classic counted strings (ptr + imm length).
STRINGS = (
    (723444, 3, ' {\n'),
    (723658, 5, '[...]'),
)
CANDIDATE_STRINGS = (
    703884,
    704098,
)

DIGIT_TABLE = b''.join(f'{index:02d}'.encode() for index in range(100))
DIGIT_ORIGINAL = 723458
DIGIT_CANDIDATE = 703898
DIGIT_LENGTH = 200
assert len(DIGIT_TABLE) == DIGIT_LENGTH

# Assigned .rodata unions (exclusive ends).
RODATA_SPANS = (
    (723444, 723447),
    (723458, 723663),
)

DESCRIPTORS = ()

# (original_pc, candidate_pc, original_ptr, candidate_ptr, length, length_register, length_at)
# length_at is byte offset from lddw pc to the mov-imm length instruction.
TEXT_SITES = (
    (676448, 610128, 723444, 703884, 3, 3, 24),
    (687688, 621368, 723658, 704098, 5, 7, 32),
)

# (original_pc, candidate_pc, and_mask) — sites with explicit %100 * 2 digit indexing.
INDEX_SITES = (
    (693432, 627112, 254),
    (693816, 627496, 254),
    (694848, 628528, 65534),
    (695696, 629376, 65534),
)


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    loaded = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(loaded)
    return loaded


def prior_proof(root):
    return module('digit_table_ellipsis_prior', root / PRIOR / 'proof.py')


def readers(root):
    return prior_proof(root).readers(root)


def images(root, original, candidate):
    return prior_proof(root).images(root, original, candidate)


def candidate_bytes(root):
    return prior_proof(root).candidate_bytes(root)


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


def text_site(image, pc, pointer, length, length_register, length_at):
    assert length_at in (16, 24, 32)
    assert image.lo <= pc and pc + length_at + 8 <= image.hi
    assert sorted(reloc for reloc in image.rel if pc <= reloc < pc + 16) == [pc]
    reloc = image.rel[pc]
    assert reloc['type'] == 8 and reloc['symbol_index'] == 0
    opcode, register, branch, immediate = struct.unpack_from('<BBhi', image.b, pc)
    assert opcode == 0x18 and branch == 0
    continuation, high = struct.unpack_from('<II', image.b, pc + 8)
    assert continuation == 0
    assert ((immediate & 0xffffffff) | (high << 32)) == pointer
    assert struct.unpack_from('<BBhi', image.b, pc + length_at) == (
        0xb7, length_register, 0, length
    )
    return image.b[pc:pc + length_at + 8]


def index_site(image, pc, pointer, and_mask):
    """Prove one (n%100)<<1 digit-table access ending at lddw pc."""
    assert image.lo <= pc - 64 and pc + 40 <= image.hi
    assert sorted(reloc for reloc in image.rel if pc <= reloc < pc + 16) == [pc]
    reloc = image.rel[pc]
    assert reloc['type'] == 8 and reloc['symbol_index'] == 0
    opcode, register, branch, immediate = struct.unpack_from('<BBhi', image.b, pc)
    assert opcode == 0x18 and branch == 0
    continuation, high = struct.unpack_from('<II', image.b, pc + 8)
    assert continuation == 0
    assert ((immediate & 0xffffffff) | (high << 32)) == pointer
    # Walk the 96 bytes before pc for %100 * 2 shape.
    window = image.b[pc - 96:pc]
    div100 = mul100 = lsh1 = masked = False
    for at in range(0, 96, 8):
        op, regs, off, imm = struct.unpack_from('<BBhi', window, at)
        if op == 0x37 and imm == 100:
            div100 = True
        if op == 0x27 and imm == 100:
            mul100 = True
        if op == 0x67 and imm == 1:
            lsh1 = True
        if op == 0x57 and imm == and_mask:
            masked = True
    assert div100 and mul100 and lsh1 and masked
    # After lddw: add then at least one ldxB.
    after = image.b[pc + 16:pc + 48]
    assert struct.unpack_from('<BBhi', after, 0)[0] == 0x0f
    assert any(after[i] == 0x71 for i in range(0, len(after), 8))
    return dict(pointer=pointer, and_mask=and_mask, bytes_hex=image.b[pc:pc + 24].hex())


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


def verify_digit_table(original_elf, candidate_elf):
    original = rodata_bytes(original_elf, DIGIT_ORIGINAL, DIGIT_LENGTH)
    candidate = rodata_bytes(candidate_elf, DIGIT_CANDIDATE, DIGIT_LENGTH)
    assert original == DIGIT_TABLE and candidate == DIGIT_TABLE
    rows = []
    for original_pc, candidate_pc, and_mask in INDEX_SITES:
        original_row = index_site(original_elf, original_pc, DIGIT_ORIGINAL, and_mask)
        candidate_row = index_site(candidate_elf, candidate_pc, DIGIT_CANDIDATE, and_mask)
        rows.append(dict(
            original_pc=original_pc,
            candidate_pc=candidate_pc,
            and_mask=and_mask,
            original=original_row,
            candidate=candidate_row,
        ))
    return dict(
        original_ptr=DIGIT_ORIGINAL,
        candidate_ptr=DIGIT_CANDIDATE,
        length=DIGIT_LENGTH,
        original_bytes_hex=original.hex(),
        candidate_bytes_hex=candidate.hex(),
        index_sites=rows,
    )


def verify_descriptors(original_elf, candidate_elf):
    del original_elf, candidate_elf
    assert DESCRIPTORS == ()
    return []


def verify_text_sites(original_elf, candidate_elf):
    by_pointer = {pointer: (length, text) for pointer, length, text in STRINGS}
    by_pointer.update({
        pointer: (length, text)
        for pointer, (__pointer, length, text) in zip(CANDIDATE_STRINGS, STRINGS)
    })
    rows = []
    for (
        original_pc, candidate_pc, original_ptr, candidate_ptr, length, register, length_at
    ) in TEXT_SITES:
        assert by_pointer[original_ptr] == by_pointer[candidate_ptr]
        assert by_pointer[original_ptr][0] == length
        original = text_site(
            original_elf, original_pc, original_ptr, length, register, length_at
        )
        candidate = text_site(
            candidate_elf, candidate_pc, candidate_ptr, length, register, length_at
        )
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
            length_at=length_at,
            original_bytes_hex=original.hex(),
            candidate_bytes_hex=candidate.hex(),
        ))
    return rows


def verify_images(original_elf, candidate_elf):
    return dict(
        strings=verify_strings(original_elf, candidate_elf),
        descriptors=verify_descriptors(original_elf, candidate_elf),
        text_sites=verify_text_sites(original_elf, candidate_elf),
        digit_table=verify_digit_table(original_elf, candidate_elf),
    )


def inspect(packet, original, candidate, root):
    before = prior_proof(root).inspect(root / PRIOR, original, candidate, root)
    prefix, original_elf, candidate_elf = images(root, original, candidate)
    del prefix
    observations = verify_images(original_elf, candidate_elf)
    literal_intervals = union(
        [(row['original_ptr'], row['original_ptr'] + row['length']) for row in observations['strings']]
        + [(observations['digit_table']['original_ptr'], observations['digit_table']['original_ptr'] + observations['digit_table']['length'])]
    )
    descriptor_intervals = union(
        (row['original_offset'], row['original_offset'] + 16)
        for row in observations['descriptors']
    )
    assert literal_intervals == [list(span) for span in RODATA_SPANS]
    assert measure(literal_intervals) == 208
    assert descriptor_intervals == []
    summary = dict(
        normalized_windows=before['summary']['normalized_windows'],
        raw_windows=before['summary']['raw_windows'],
        extended_windows=before['summary']['extended_windows'],
        extended_pairs=before['summary']['extended_pairs'],
        rejected_pairs=before['summary']['rejected_pairs'],
        string_count=len(observations['strings']),
        descriptor_count=len(observations['descriptors']),
        text_site_count=len(observations['text_sites']),
        index_site_count=len(observations['digit_table']['index_sites']),
        literal_bytes=measure(literal_intervals),
        descriptor_bytes=measure(descriptor_intervals),
    )
    return dict(summary=summary, observations=observations)


def merged_priors(root):
    out = []
    for path, digest in MERGE:
        data = (root / path).read_bytes()
        assert sha(data) == digest
        out.append(json.loads(data))
    return out


def coverage_delta(root, report):
    del report
    priors = merged_priors(root)
    added = {
        '.rodata': [tuple(span) for span in RODATA_SPANS],
        '.data.rel.ro': [],
    }
    added_mapped = {'.rodata': [], '.data.rel.ro': []}
    sections = []
    baseline = {}
    for name in ('.rodata', '.data.rel.ro'):
        rows = [next(item for item in prior['sections'] if item['section'] == name) for prior in priors]
        totals = {row['total_bytes'] for row in rows}
        assert len(totals) == 1
        total_bytes = totals.pop()
        raw = union([interval for row in rows for interval in row['raw_intervals']] + added[name])
        mapped = union(
            [interval for row in rows for interval in row['mapped_intervals']] + added_mapped[name]
        )
        covered = union(raw + mapped)
        previous = measure(union([interval for row in rows for interval in row['covered_intervals']]))
        baseline[name] = previous
        covered_bytes = measure(covered)
        sections.append(dict(
            section=name,
            total_bytes=total_bytes,
            raw_intervals=raw,
            mapped_intervals=mapped,
            covered_intervals=covered,
            raw_equal_bytes=measure(raw),
            pointer_only_bytes=covered_bytes - measure(raw),
            covered_bytes=covered_bytes,
            new_bytes=covered_bytes - previous,
        ))
    scope = (
        'Counted static .rodata decimal digit-table bytes (index-bounded %100 * 2), '
        'ellipsis `[...]` (ptr + imm length 5), and one early format crumb '
        '`(ptr + imm length 3 at pc+24)`. No descriptor or relocation-table credit; '
        'NUL and adjacency are not bounds. `[723439, 723444)` and #889 '
        '`[723447, 723458)` are left untouched.'
    )
    return dict(
        scope=scope,
        prior_index_tables_delta_sha256=INDEX_TABLES_SHA,
        prior_option_seeds_paths_delta_sha256=OPTION_SEEDS_SHA,
        baseline_payload_bytes=sum(baseline.values()),
        baseline_rodata_bytes=baseline['.rodata'],
        baseline_data_rel_ro_bytes=baseline['.data.rel.ro'],
        sections=sections,
        new_payload_bytes=sum(section['new_bytes'] for section in sections),
        payload_covered_bytes=sum(section['covered_bytes'] for section in sections),
        payload_total_bytes=sum(section['total_bytes'] for section in sections),
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
    assert inventory(packet) == json.loads((packet / 'manifest.json').read_bytes()), (
        'packet inventory differs'
    )
    pinned = json.loads((packet / 'inputs.json').read_bytes())
    for path, digest in pinned.items():
        relative = Path(path)
        assert not relative.is_absolute() and '..' not in relative.parts
        assert sha((root / relative).read_bytes()) == digest, path
    for path in (root / PRIOR).rglob('*'):
        if path.is_file() and '__pycache__' not in path.parts and path.suffix != '.pyc':
            assert str(path.relative_to(root)) in pinned, path
    # Pin the MERGE baseline packet files too.
    for path in (root / 'research/mayhem-current437-bounded-index-tables-20261029').rglob('*'):
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
    assert delta == json.loads((packet / 'coverage-delta.json').read_bytes()), (
        'coverage delta differs'
    )
    summary = dict(report['summary'])
    summary['new_payload_bytes'] = delta['new_payload_bytes']
    assert (
        summary['normalized_windows'],
        summary['raw_windows'],
        summary['extended_windows'],
        summary['extended_pairs'],
    ) == (437, 141, 431, 581)
    assert (
        summary['string_count'],
        summary['descriptor_count'],
        summary['text_site_count'],
        summary['index_site_count'],
    ) == (2, 0, 2, 4)
    assert (summary['literal_bytes'], summary['descriptor_bytes'], summary['new_payload_bytes']) == (
        208, 0, 208
    )
    assert summary['rejected_pairs'] == 0
    assert (
        delta['baseline_payload_bytes'],
        delta['payload_covered_bytes'],
        delta['payload_total_bytes'],
    ) == (21796, 22004, 26180)
    assert (delta['baseline_rodata_bytes'], delta['baseline_data_rel_ro_bytes']) == (14972, 6824)
    assert all(
        row['original_bytes_hex'] == row['candidate_bytes_hex']
        for row in report['observations']['strings']
    )
    assert (
        report['observations']['digit_table']['original_bytes_hex']
        == report['observations']['digit_table']['candidate_bytes_hex']
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
