"""Counted MayhemError Display messages on the qualified437 images.

Display::fmt is a binary search over the enum tag. Each source discriminant
loads one relocated .rodata pointer and one immediate length, then callx's
the formatter slot captured in the prologue. The immediate is the bound.
NUL bytes, the following byte, and tags outside 0..=19 are not evidence.
"""
from pathlib import Path
import gzip, hashlib, importlib.util, json, re, struct, tarfile
if not __debug__:
    raise RuntimeError('Assertions are required')

P = Path(__file__).resolve().parent
FORMAT = 'research/mayhem-current437-format-pieces-20261028'
ACCOUNTS = 'research/mayhem-current437-account-names-20261028'
ARCHIVE = 'research/mayhem-current437-composition-20261028/source.tar.gz'
OWNER = 196056
# Five instructions. r1 stays the formatter data; r4 stays the unresolved slot.
PROLOGUE = (
    (0xbf, 0x13, 0, 0),   # r3 = self
    (0x79, 0x21, 0, 0),   # r1 = formatter data at +0
    (0x79, 0x22, 8, 0),   # r2 = formatter vtable at +8
    (0x79, 0x24, 24, 0),  # r4 = vtable slot +24
    (0x61, 0x32, 0, 0),   # r2 = tag at self+0
)
CALL = (0x8d, 0, 0, 4)
EXIT = (0x95, 0, 0, 0)
JUMPS = {
    0x15: lambda tag, imm: tag == imm,
    0x55: lambda tag, imm: tag != imm,
    0x65: lambda tag, imm: tag > imm,   # jsgt, signed
    0xd5: lambda tag, imm: tag <= imm,  # jsle, signed
}
sha = lambda data: hashlib.sha256(data).hexdigest()

def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    loaded = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(loaded)
    return loaded

def format_proof(root):
    return module('mayhem_error_format_prior', root / FORMAT / 'proof.py')

def account_proof(root):
    return module('mayhem_error_account_prior', root / ACCOUNTS / 'proof.py')

def union(intervals):
    """Merge half-open intervals. Abutting spans become one covered range."""
    out = []
    for start, end in sorted(map(tuple, intervals)):
        if out and start <= out[-1][1]:
            out[-1][1] = max(end, out[-1][1])
        else:
            out.append([start, end])
    return out

def measure(intervals):
    return sum(end - start for start, end in intervals)

def source_context(packet, root):
    """The sealed program source is the label source. Tags are the explicit discriminants."""
    with tarfile.open(root / ARCHIVE) as archive:
        lib = archive.extractfile('src/lib.rs').read().decode()
    marker = '#[error_code]\npub enum MayhemError {'
    start = lib.index(marker)
    end = lib.index('\n}\n', start)
    excerpt = lib[start:end + 3]
    assert excerpt.endswith('}\n')
    assert (packet / 'source-context/mayhem-error.rs').read_text() == excerpt
    assert lib.count(marker) == 1
    found = re.findall(r'#\[msg\("([^"]*)"\)\]\s*(\w+)\s*=\s*(\d+)', excerpt)
    assert [int(tag) for _msg, _name, tag in found] == list(range(20))
    variants = [dict(observed_tag=tag, name=name, message=msg) for tag, (msg, name, _raw) in enumerate(found)]
    return dict(
        lib_rs_sha256=sha(lib.encode()),
        excerpt_sha256=sha(excerpt.encode()),
        variants=variants,
        tag_scope='Explicit discriminants 0..=19 from this enum. Not a stable Rust ABI, and not the integers the binary search can fall through.',
    )

def counted(image, pointer, length):
    """Bytes named by the immediate. The interval must sit in allocatable .rodata and contain no relocation."""
    assert 0 < length <= 256
    sections = [
        section for section in image.sections
        if section['name'] == '.rodata' and section['type'] != 8 and section['flags'] & 2
        and section['address'] <= pointer and pointer + length <= section['address'] + section['size']
    ]
    assert len(sections) == 1
    assert not any(pointer <= reloc < pointer + length for reloc in image.rel)
    section = sections[0]
    at = section['offset'] + pointer - section['address']
    return image.b[at:at + length]

def instruction_starts(image, window):
    """lddw consumes the following word. That word is not its own instruction."""
    starts = []
    pc = window['start']
    while pc < window['end']:
        starts.append(pc - window['start'])
        op = image.b[pc]
        pc += 16 if op == 0x18 else 8
    return starts

def trace(image, window, tag):
    """Walk one discriminant. Reject every tag the source enum does not declare."""
    assert 0 <= tag <= 19, tag
    assert window['end'] - window['start'] == 832
    visited = []
    for index, expected in enumerate(PROLOGUE):
        offset = index * 8
        assert struct.unpack_from('<BBhi', image.b, window['start'] + offset) == expected
        visited.append(offset)
    pc = window['start'] + len(PROLOGUE) * 8
    pointer = None
    length = None
    pointer_offset = None
    length_offset = None
    # The body is 104 words. A real arm reaches callx well before that.
    for _ in range(104):
        relative = pc - window['start']
        assert window['start'] <= pc < window['end'] and pc % 8 == 0 and relative not in visited
        visited.append(relative)
        op, reg, off, imm = struct.unpack_from('<BBhi', image.b, pc)
        nxt = pc + 8
        if op in JUMPS:
            # Comparisons read the tag in r2 and happen before either arm write.
            assert reg == 2 and pointer is None and length is None
            if JUMPS[op](tag, imm):
                nxt = pc + 8 + off * 8
        elif op == 0x18:
            assert (reg, off) == (2, 0) and pointer is None
            assert image.rel.get(pc, {}).get('type') == 8 and image.rel[pc]['symbol_index'] == 0
            assert not any(pc < reloc < pc + 16 for reloc in image.rel)
            continuation, high = struct.unpack_from('<II', image.b, pc + 8)
            assert continuation == 0
            pointer = (imm & 0xffffffff) | (high << 32)
            pointer_offset = relative
            nxt = pc + 16
        elif op == 0xb7:
            assert (reg, off) == (3, 0) and pointer is not None and length is None and 0 < imm <= 256
            length = imm
            length_offset = relative
        elif op == 0x05:
            # Tag 8 jumps from its pointer load to the length mov shared with tag 19.
            assert (reg, imm) == (0, 0) and pointer is not None
            nxt = pc + 8 + off * 8
        elif op == 0x8d:
            assert (op, reg, off, imm) == CALL and length is not None and pc == window['end'] - 16
            assert struct.unpack_from('<BBhi', image.b, pc + 8) == EXIT
            visited.append(relative + 8)
            return dict(
                pointer=pointer,
                length=length,
                bytes_hex=counted(image, pointer, length).hex(),
                pointer_offset=pointer_offset,
                length_offset=length_offset,
                call_offset=relative,
                exit_offset=relative + 8,
                path_offsets=visited,
                formatter_data_offset=0,
                formatter_vtable_offset=8,
                unresolved_writer_slot=24,
                formatter_data_register=1,
                callback_register=4,
                scope='Stops at callx r4. No callback target, output, or runtime claim.',
            )
        else:
            raise AssertionError(f'outside Display grammar at {relative}: {op:#x}')
        pc = nxt
    raise AssertionError('no counted callx')

def images(root, original, candidate):
    prefix, records, data = format_proof(root).readers(root)
    # `data` is unused here; readers() is how this chain exposes the ELF helper.
    del data
    original_elf, candidate_elf = prefix.elves(original, candidate)
    rows = json.loads((prefix.M / 'original-windows.json').read_bytes())
    row = next(item for item in rows if item['start'] == OWNER)
    assert row['id'] == 'O0097' and row['bytes'] == 832
    original_windows = {item['start']: original_elf.window(item['start'], item['start'] + item['bytes']) for item in rows}
    candidate_windows, symbols = prefix.q.tables(candidate_elf)
    return dict(prefix=prefix, records=records, original_elf=original_elf, candidate_elf=candidate_elf, original_windows=original_windows, candidate_windows=candidate_windows, symbols=symbols)

def inspect(packet, original, candidate, root):
    before = format_proof(root).inspect(root / FORMAT, original, candidate, root)
    initial = {tuple(pair) for pair in before['active_pairs']}
    bundle = images(root, original, candidate)
    context = source_context(packet, root)
    prefix, records = bundle['prefix'], bundle['records']
    original_elf, candidate_elf = bundle['original_elf'], bundle['candidate_elf']
    original_windows, candidate_windows = bundle['original_windows'], bundle['candidate_windows']
    symbols = bundle['symbols']
    edges = {}
    for left_at, right_at in sorted(initial):
        left, right = original_windows[left_at], candidate_windows[right_at]
        edges[left_at, right_at] = [(item['target'], other['target']) for item, other in zip(left['direct'], right['direct'])]
        by_offset = {item['offset']: item for item in right['data_references']}
        for item in left['data_references']:
            other = by_offset[item['offset']]
            if item['kind'] == 'code':
                edges[left_at, right_at].append((item['target'], other['target']))
            prefix_row = prefix.prefix(original_elf, original_windows, item['target'])
            if prefix_row:
                other_prefix = prefix.prefix(candidate_elf, candidate_windows, other['target'])
                assert other_prefix is not None
                edges[left_at, right_at].extend((src, dst) for src, dst in zip(prefix_row['targets'], other_prefix['targets']) if src is not None)
            extended = records.record48(prefix, original_elf, original_windows, item['target'])
            if extended:
                other_record = records.record48(prefix, candidate_elf, candidate_windows, other['target'])
                assert other_record is not None
                edges[left_at, right_at].extend((src, dst) for src, dst in zip(extended['targets'], other_record['targets']) if src is not None)
    owner_pairs = [pair for pair in sorted(initial) if pair[0] == OWNER]
    bad = set()
    observations = []
    covered = []
    # A length immediate is part of the normalized body, so that mutation drops
    # the pair inside the prior relation. inspect must still return.
    if owner_pairs:
        assert len(owner_pairs) == 1
        left_at, right_at = owner_pairs[0]
        assert any('MayhemError' in name and 'Display' in name for name in symbols[right_at])
        left, right = original_windows[left_at], candidate_windows[right_at]
        assert left['direct'] == [] and [item['offset'] for item in left['indirect']] == [816]
        assert right['direct'] == [] and [item['offset'] for item in right['indirect']] == [816]
        seen = set()
        for variant in context['variants']:
            original_path = trace(original_elf, left, variant['observed_tag'])
            candidate_path = trace(candidate_elf, right, variant['observed_tag'])
            message = variant['message'].encode()
            same = (
                original_path['length'] == candidate_path['length'] == len(message)
                and original_path['bytes_hex'] == candidate_path['bytes_hex'] == message.hex()
                and original_path['path_offsets'] == candidate_path['path_offsets']
                and original_path['pointer_offset'] == candidate_path['pointer_offset']
                and original_path['length_offset'] == candidate_path['length_offset']
                and original_path['call_offset'] == candidate_path['call_offset']
            )
            if not same:
                bad.add((left_at, right_at))
            observations.append(dict(
                observed_tag=variant['observed_tag'],
                name=variant['name'],
                message=variant['message'],
                original_owner=left_at,
                candidate_owner=right_at,
                original=original_path,
                candidate=candidate_path,
                bytes_and_count_equal=same,
            ))
            seen.update(original_path['path_offsets'])
        starts = instruction_starts(original_elf, left)
        assert starts == instruction_starts(candidate_elf, right)
        assert seen == set(starts)
        pointer_offsets = {row['original']['pointer_offset'] for row in observations}
        length_groups = {}
        for row in observations:
            length_groups.setdefault(row['original']['length_offset'], set()).add(row['original']['length'])
        # Twenty pointer loads, nineteen length movs: tags 8 and 19 share one.
        assert len(pointer_offsets) == 20 and len(length_groups) == 19
        assert all(len(lengths) == 1 for lengths in length_groups.values())
        covered.append(dict(
            original_owner=left_at,
            candidate_owner=right_at,
            instruction_starts=starts,
            visited_instruction_offsets=sorted(seen),
            untraced_instruction_offsets=[],
            shared_length_offsets=sorted(offset for offset, lengths in length_groups.items() if sum(row['original']['length_offset'] == offset for row in observations) > 1),
        ))
    active = initial - bad
    rounds = []
    while True:
        lost = {pair for pair in active if any(target not in active for target in edges[pair])}
        if not lost:
            break
        active -= lost
        rounds.append(len(lost))
    for row in observations:
        row['owner_closed'] = (row['original_owner'], row['candidate_owner']) in active
    spans = sorted({(row['original']['pointer'], row['original']['length']) for row in observations})
    for (start, length), (nxt, _nlen) in zip(spans, spans[1:]):
        assert start + length <= nxt
    merged = union((start, start + length) for start, length in spans)
    if owner_pairs:
        assert merged == [[709128, 709160], [710600, 710616], [710924, 711407]]
        assert sum(length for _start, length in spans) == 531
    return dict(
        summary=dict(
            normalized_windows=before['summary']['normalized_windows'],
            raw_windows=before['summary']['raw_windows'],
            base_windows=before['summary']['extended_windows'],
            base_pairs=len(initial),
            extended_windows=len({start for start, _end in active}),
            extended_pairs=len(active),
            static_variants=len(context['variants']),
            owner_pairs=len(owner_pairs),
            literal_spans=len(spans),
            literal_bytes=sum(length for _start, length in spans),
            rejected_pairs=len(initial - active),
            pruning_rounds=rounds,
        ),
        source_context=dict(lib_rs_sha256=context['lib_rs_sha256'], excerpt_sha256=context['excerpt_sha256'], tag_scope=context['tag_scope']),
        active_pairs=[list(pair) for pair in sorted(active)],
        observations=observations,
        path_coverage=covered,
    )

def coverage_delta(root, report):
    """Baseline is the format-piece chain unioned with the account-name intervals, then these strings."""
    format_path = root / FORMAT / 'coverage-delta.json'
    account_path = root / ACCOUNTS / 'coverage-delta.json'
    before = json.loads(format_path.read_bytes())
    account = json.loads(account_path.read_bytes())
    added = [(row['original']['pointer'], row['original']['pointer'] + row['original']['length']) for row in report['observations']]

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
    baseline_payload = 0
    baseline_by_section = {}
    for section in before['sections']:
        raw = list(section['raw_intervals'])
        mapped = list(section['mapped_intervals'])
        if section['section'] == '.rodata':
            # Account names were published against the inventory only. Union them; do not add the totals.
            raw = raw + account['covered_intervals_after']
        baseline = finish(section, raw, mapped, section['covered_bytes'])
        baseline_by_section[section['section']] = baseline['covered_bytes']
        baseline_payload += baseline['covered_bytes']
        if section['section'] == '.rodata':
            raw = raw + added
        sections.append(finish(section, raw, mapped, baseline['covered_bytes']))
    return dict(
        scope='Counted MayhemError Display message bytes only. No allocation extents, no relocation-table credit, and no tags outside 0..=19.',
        prior_format_pieces_delta_sha256=sha(format_path.read_bytes()),
        prior_account_names_delta_sha256=sha(account_path.read_bytes()),
        baseline_payload_bytes=baseline_payload,
        baseline_rodata_bytes=baseline_by_section['.rodata'],
        baseline_data_rel_ro_bytes=baseline_by_section['.data.rel.ro'],
        sections=sections,
        new_payload_bytes=sum(section['new_bytes'] for section in sections),
        payload_covered_bytes=sum(section['covered_bytes'] for section in sections),
        payload_total_bytes=before['payload_total_bytes'],
    )

def check(packet, root):
    paths = list(packet.rglob('*'))
    assert not any(path.is_symlink() for path in paths), 'packet symlink'
    assert all(path.is_file() or path.is_dir() for path in paths), 'packet special file'
    found = {str(path.relative_to(packet)): sha(path.read_bytes()) for path in paths if path.is_file() and path != packet / 'manifest.json'}
    assert found == json.loads((packet / 'manifest.json').read_bytes()), 'packet inventory differs'
    pinned = json.loads((packet / 'inputs.json').read_bytes())
    for path, digest in pinned.items():
        relative = Path(path)
        assert not relative.is_absolute() and '..' not in relative.parts
        assert sha((root / relative).read_bytes()) == digest, path
    for prior in (FORMAT, ACCOUNTS):
        for path in (root / prior).rglob('*'):
            if path.is_file():
                assert str(path.relative_to(root)) in pinned, path
    format_proof(root).check(root / FORMAT, root)
    account_proof(root).check(root / ACCOUNTS, root)
    original = (root / 'evidence/original/mayhem/deployed.so').read_bytes()
    candidate = format_proof(root).readers(root)[2].inputs(root, 'mayhem-current437-composition-20261028')
    report = inspect(packet, original, candidate, root)
    assert report == json.loads(gzip.decompress((packet / 'observations.json.gz').read_bytes())), 'fresh observations differ'
    delta = coverage_delta(root, report)
    assert delta == json.loads((packet / 'coverage-delta.json').read_bytes()), 'coverage delta differs'
    summary = report['summary']
    assert (summary['normalized_windows'], summary['raw_windows'], summary['extended_windows'], summary['extended_pairs']) == (437, 141, 431, 581)
    assert (summary['static_variants'], summary['owner_pairs'], summary['literal_spans'], summary['literal_bytes'], summary['rejected_pairs']) == (20, 1, 20, 531, 0)
    # 18,214 is the format-piece chain union the account-name bytes. 531 of these strings were still open.
    assert (delta['baseline_payload_bytes'], delta['new_payload_bytes'], delta['payload_covered_bytes'], delta['payload_total_bytes']) == (18214, 531, 18745, 26180)
    by_section = {section['section']: section for section in delta['sections']}
    assert (by_section['.rodata']['new_bytes'], by_section['.rodata']['covered_bytes'], by_section['.rodata']['total_bytes']) == (531, 12289, 18396)
    assert (by_section['.data.rel.ro']['new_bytes'], by_section['.data.rel.ro']['covered_bytes'], by_section['.data.rel.ro']['total_bytes']) == (0, 6456, 7784)
    assert all(row['owner_closed'] and row['bytes_and_count_equal'] for row in report['observations'])
    assert len({row['candidate_owner'] for row in report['observations']}) == 1
    return summary
