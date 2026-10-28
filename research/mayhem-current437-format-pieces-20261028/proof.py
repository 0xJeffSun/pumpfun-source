"""Counted formatter pieces for the two qualified437 Anchor log bodies.

ProgramErrorWithOrigin::log and AnchorError::log each build a fmt::Arguments
value and pass it to alloc::fmt::format::format_inner. The piece-array pointer
and the piece count are immediate stack stores. format_inner then uses that
count as the trip count of a 16-byte stride, reading each piece length from
the descriptor. Lengths come from those stored words and from the vendored
format literals, never from a NUL scan.

A source literal that ends in a placeholder splits into a trailing empty
piece. These images omit that empty piece: the stored count equals the
non-empty pieces, and an empty piece in any other position is rejected.
Direct sol_log_ calls for the bare "Left:" and "Right:" literals are separate
counted strings in the same bodies.
"""
from pathlib import Path
import gzip, hashlib, importlib.util, json, struct, tarfile
if not __debug__:
    raise RuntimeError('Assertions are required')

P = Path(__file__).resolve().parent
PRIOR = 'research/mayhem-current437-unicode-tables-20261028'
ARCHIVE = 'research/mayhem-current437-composition-20261028/source.tar.gz'
PROGRAM = 621536
ANCHOR = 623240
FORMAT_INNER = 669936
FORMAT_CANDIDATE = 603616
sha = lambda b: hashlib.sha256(b).hexdigest()

def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    loaded = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(loaded)
    return loaded

def prior(root):
    return module('format_pieces_prior', root / PRIOR / 'proof.py')

def readers(root):
    """Reuse the unchanged qualified437 window reader without copying it."""
    unicode = prior(root)
    kind = unicode.prior(root)
    program = kind.prior(root)
    names = program.prior(root).prior(root)
    data = names.base_reader(root)
    prefix, records, _literal = data.readers(root / names.BASE, root)
    return prefix, records, data

# owner, lddw offset, Arguments base slot, count-store offset, piece count, arg count, flow
# flow is ('ja', jump offset, setup offset) or ('fall', setup offset).
SITES = (
    (PROGRAM, 56, -64, 240, 4, 3, ('ja', 256, 920)),
    (PROGRAM, 336, -64, 568, 5, 4, ('ja', 584, 920)),
    (PROGRAM, 624, -64, 904, 6, 5, ('fall', 920)),
    (PROGRAM, 1232, -168, 1336, 1, 1, ('fall', 1352)),
    (PROGRAM, 1472, -168, 1560, 1, 1, ('fall', 1576)),
    (ANCHOR, 24, -64, 208, 4, 3, ('ja', 224, 808)),
    (ANCHOR, 272, -64, 504, 5, 4, ('ja', 520, 808)),
    (ANCHOR, 528, -64, 792, 6, 5, ('fall', 808)),
    (ANCHOR, 1120, -168, 1224, 1, 1, ('fall', 1240)),
    (ANCHOR, 1360, -168, 1448, 1, 1, ('fall', 1464)),
)
DIRECT = (
    (PROGRAM, 1072, 5),
    (PROGRAM, 1128, 6),
    (ANCHOR, 960, 5),
    (ANCHOR, 1016, 6),
)
# format_inner prologue: load pieces.len at +8, then sum each descriptor length
# at +8 while advancing 16 bytes. Offset 104 loads args.len at +24.
WALK = (
    (0xbf, 3, 2, 0, 0),
    (0x79, 5, 3, 8, 0),
    (0x15, 5, 0, 36, 0),
    (0x79, 4, 3, 0, 0),
    (0xb7, 6, 0, 0, 0),
    (0xbf, 0, 4, 0, 0),
    (0x07, 0, 0, 0, 8),
    (0x79, 2, 0, 0, 0),
    (0x0f, 2, 6, 0, 0),
    (0x07, 0, 0, 0, 16),
)

def insn(image, pc):
    op, reg, off, imm = struct.unpack_from('<BBhi', image.b, pc)
    return op, reg & 15, reg >> 4, off, imm

def pointer_immediate(image, pc):
    op, dst, src, off, imm = insn(image, pc)
    cont, high = struct.unpack_from('<II', image.b, pc + 8)
    assert (op, dst, src, off, cont) == (0x18, 1, 0, 0, 0)
    rel = image.rel.get(pc, {})
    assert rel.get('type') == 8 and rel.get('symbol_index') == 0
    assert not any(pc < at < pc + 16 for at in image.rel)
    return (imm & 0xffffffff) | (high << 32)

def section_bytes(image, address, length, name):
    hits = [s for s in image.sections if s['name'] == name and s['type'] != 8 and s['address'] <= address and address + length <= s['address'] + s['size']]
    assert len(hits) == 1, (name, address, length)
    sec = hits[0]
    off = sec['offset'] + address - sec['address']
    return image.b[off:off + length]

def rust_literals(text):
    """Decode the quoted literals actually present in the vendored log bodies."""
    out = []
    i = 0
    while i < len(text):
        if text[i] != '"':
            i += 1
            continue
        buf = []
        i += 1
        while True:
            assert i < len(text)
            ch = text[i]
            i += 1
            if ch == '"':
                break
            if ch == '\\':
                assert i < len(text)
                nxt = text[i]
                i += 1
                # Rust ignores a backslash-newline and the following indentation.
                if nxt == '\n':
                    while i < len(text) and text[i] in ' \t':
                        i += 1
                    continue
                raise AssertionError('unexpected string escape')
            buf.append(ch)
        out.append(''.join(buf))
    return out

def static_pieces(parts):
    """Drop only a single trailing empty piece left by a final placeholder."""
    assert all(part != '' for part in parts[:-1]), parts
    if parts and parts[-1] == '':
        return parts[:-1]
    return parts

def split_format(literal):
    parts = []
    buf = []
    args = 0
    i = 0
    while i < len(literal):
        if literal.startswith('{:?}', i) or literal.startswith('{}', i):
            parts.append(''.join(buf))
            buf = []
            args += 1
            i += 4 if literal.startswith('{:?}', i) else 2
            continue
        assert literal[i] not in '{}', literal
        buf.append(literal[i])
        i += 1
    parts.append(''.join(buf))
    return static_pieces(parts), args, literal

def source_context(packet, root):
    provenance = json.loads((packet / 'source-context/provenance.json').read_bytes())
    with tarfile.open(root / ARCHIVE) as archive:
        raw = archive.extractfile(provenance['path']).read()
        toml = archive.extractfile('vendor/anchor-lang/Cargo.toml').read().decode()
        lock = archive.extractfile('Cargo.lock').read().decode()
    assert sha(raw) == provenance['error_rs_sha256']
    assert 'version = "1.0.0"' in toml
    assert 'name = "anchor-lang"\nversion = "1.0.0"' in lock
    source = raw.decode()
    groups = {}
    for key, filename in ((PROGRAM, 'program-error-with-origin-log.rs'), (ANCHOR, 'anchor-error-log.rs')):
        excerpt = (packet / 'source-context' / filename).read_text()
        assert excerpt in source
        assert excerpt.startswith('impl ')
        groups[key] = []
        for literal in rust_literals(excerpt):
            pieces, args, text = split_format(literal)
            groups[key].append(dict(pieces=pieces, args=args, literal=text))
    assert [len(item['pieces']) for item in groups[PROGRAM] if item['args']] == [4, 6, 5, 1, 1]
    assert [len(item['pieces']) for item in groups[ANCHOR] if item['args']] == [4, 6, 5, 1, 1]
    for group in groups.values():
        bare = [item for item in group if item['args'] == 0]
        assert [item['pieces'] for item in bare] == [['Left:'], ['Right:']]
    return dict(groups=groups, error_rs_sha256=provenance['error_rs_sha256'], anchor_lang_version='1.0.0', scope=provenance['scope'])

def expect_stdw(image, pc, slot, immediate):
    assert insn(image, pc) == (0x7a, 10, 0, slot, immediate)

def call_setup(image, window, base_slot, setup_off):
    """r1 receives the output slot and r2 receives the Arguments base, then format_inner."""
    output = -88 if base_slot == -64 else -64
    assert base_slot in (-64, -168)
    pc = window['start'] + setup_off
    assert insn(image, pc) == (0xbf, 1, 10, 0, 0)
    assert insn(image, pc + 8) == (0x07, 1, 0, 0, output)
    assert insn(image, pc + 16) == (0xbf, 2, 10, 0, 0)
    assert insn(image, pc + 24) == (0x07, 2, 0, 0, base_slot)
    op, dst, src, off, imm = insn(image, pc + 32)
    assert (op, dst, src, off) == (0x85, 0, 1, 0) and pc + 32 not in image.rel
    return pc + 40 + imm * 8

def pieces_at(image, array, count):
    rows = []
    for index in range(count):
        addr = array + index * 16
        rels = [at for at in image.rel if addr <= at < addr + 16]
        assert rels == [addr]
        rel = image.rel[addr]
        assert rel['type'] == 8 and rel['symbol_index'] == 0
        word = struct.unpack('<Q', section_bytes(image, addr, 8, '.data.rel.ro'))[0]
        length = struct.unpack('<Q', section_bytes(image, addr + 8, 8, '.data.rel.ro'))[0]
        assert word & 0xffffffff == 0 and 0 < length < 256
        ptr = word >> 32
        assert not any(ptr <= at < ptr + length for at in image.rel)
        rows.append(dict(descriptor=addr, pointer=ptr, length=length, bytes_hex=section_bytes(image, ptr, length, '.rodata').hex()))
    return rows

def read_site(image, window, site):
    _owner, lddw_off, base, count_off, count, args, flow = site
    assert window['end'] - window['start'] in (1704, 1592)
    array = pointer_immediate(image, window['start'] + lddw_off)
    assert insn(image, window['start'] + lddw_off + 16) == (0x7b, 10, 1, base, 0)
    # Arguments is pointer, piece count, args pointer, arg count, then a zero word.
    expect_stdw(image, window['start'] + count_off - 8, base + 32, 0)
    expect_stdw(image, window['start'] + count_off, base + 8, count)
    expect_stdw(image, window['start'] + count_off + 8, base + 24, args)
    if flow[0] == 'ja':
        _kind, jump_off, setup = flow
        assert jump_off == count_off + 16
        op, dst, src, off, imm = insn(image, window['start'] + jump_off)
        assert (op, dst, src, imm) == (0x05, 0, 0, 0)
        assert window['start'] + jump_off + 8 + off * 8 == window['start'] + setup
    else:
        setup = flow[1]
        assert count_off + 16 == setup
    target = call_setup(image, window, base, setup)
    return dict(array=array, count=count, args=args, base_slot=base, lddw_offset=lddw_off, count_offset=count_off, setup_offset=setup, call_target=target, pieces=pieces_at(image, array, count))

def read_direct(image, window, site):
    _owner, lddw_off, length = site
    pc = window['start'] + lddw_off
    ptr = pointer_immediate(image, pc)
    assert insn(image, pc + 16) == (0xb7, 2, 0, 0, length)
    op, dst, src, off, imm = insn(image, pc + 24)
    rel = image.rel.get(pc + 24, {})
    assert (op, dst, src, off) == (0x85, 0, 1, 0) and rel.get('type') == 10 and rel.get('symbol') == 'sol_log_'
    assert not any(ptr <= at < ptr + length for at in image.rel)
    return dict(pointer=ptr, length=length, lddw_offset=lddw_off, bytes_hex=section_bytes(image, ptr, length, '.rodata').hex())

def consumer(image, window):
    assert window['end'] - window['start'] == 584
    for index, expected in enumerate(WALK):
        assert insn(image, window['start'] + index * 8) == expected
    assert insn(image, window['start'] + 104) == (0x79, 5, 3, 24, 0)
    return dict(start=window['start'], bytes=584, piece_count_offset=8, piece_stride=16, piece_length_offset=8, argument_count_offset=24)

def match_template(strings, args, templates, bare):
    hits = [item for item in templates if item['args'] == args and item['pieces'] == strings and (item['args'] == 0) == bare]
    return hits

def inspect(packet, original, candidate, root):
    unicode = prior(root)
    before = unicode.inspect(root / PRIOR, original, candidate, root)
    initial = {tuple(pair) for pair in before['active_pairs']}
    prefix, records, _data = readers(root)
    context = source_context(packet, root)
    original_image, candidate_image = prefix.elves(original, candidate)
    rows = json.loads((prefix.M / 'original-windows.json').read_bytes())
    original_windows = {row['start']: original_image.window(row['start'], row['start'] + row['bytes']) for row in rows}
    candidate_windows, symbols = prefix.q.tables(candidate_image)
    edges = {}
    for left_at, right_at in sorted(initial):
        left, right = original_windows[left_at], candidate_windows[right_at]
        edges[left_at, right_at] = [(x['target'], y['target']) for x, y in zip(left['direct'], right['direct'])]
        by_offset = {item['offset']: item for item in right['data_references']}
        for item in left['data_references']:
            other = by_offset[item['offset']]
            if item['kind'] == 'code':
                edges[left_at, right_at].append((item['target'], other['target']))
            prefix_row = prefix.prefix(original_image, original_windows, item['target'])
            if prefix_row:
                other_prefix = prefix.prefix(candidate_image, candidate_windows, other['target'])
                assert other_prefix is not None
                edges[left_at, right_at].extend((src, dst) for src, dst in zip(prefix_row['targets'], other_prefix['targets']) if src is not None)
            extended = records.record48(prefix, original_image, original_windows, item['target'])
            if extended:
                other_record = records.record48(prefix, candidate_image, candidate_windows, other['target'])
                assert other_record is not None
                edges[left_at, right_at].extend((src, dst) for src, dst in zip(extended['targets'], other_record['targets']) if src is not None)
    owners = {start: pair for pair in sorted(initial) if (start := pair[0]) in (PROGRAM, ANCHOR)}
    assert set(owners) == {PROGRAM, ANCHOR}
    assert (FORMAT_INNER, FORMAT_CANDIDATE) in initial
    assert any('format12format_inner' in name for name in symbols[FORMAT_CANDIDATE])
    bad = set()
    observations = []
    direct_rows = []
    for site in SITES:
        left_at = site[0]
        right_at = owners[left_at][1]
        marker = 'ProgramErrorWithOrigin3log' if left_at == PROGRAM else 'AnchorError3log'
        assert any(marker in name for name in symbols[right_at])
        left = read_site(original_image, original_windows[left_at], site)
        right = read_site(candidate_image, candidate_windows[right_at], site)
        assert (left['call_target'], right['call_target']) == (FORMAT_INNER, FORMAT_CANDIDATE)
        strings = [bytes.fromhex(piece['bytes_hex']).decode() for piece in left['pieces']]
        hits = match_template(strings, left['args'], context['groups'][left_at], bare=False)
        same = [piece['bytes_hex'] for piece in left['pieces']] == [piece['bytes_hex'] for piece in right['pieces']]
        same = same and [(piece['length'], piece['descriptor'] - left['array']) for piece in left['pieces']] == [(piece['length'], piece['descriptor'] - right['array']) for piece in right['pieces']]
        good = len(hits) == 1 and same
        if not good:
            bad.add((left_at, right_at))
        observations.append(dict(owner=left_at, candidate_owner=right_at, literal=hits[0]['literal'] if len(hits) == 1 else None, count=left['count'], args=left['args'], original=left, candidate=right, bytes_and_count_equal=good))
    for site in DIRECT:
        left_at = site[0]
        right_at = owners[left_at][1]
        left = read_direct(original_image, original_windows[left_at], site)
        right = read_direct(candidate_image, candidate_windows[right_at], site)
        text = bytes.fromhex(left['bytes_hex']).decode()
        hits = match_template([text], 0, context['groups'][left_at], bare=True)
        good = len(hits) == 1 and left['bytes_hex'] == right['bytes_hex'] and left['length'] == right['length']
        if not good:
            bad.add((left_at, right_at))
        direct_rows.append(dict(owner=left_at, candidate_owner=right_at, literal=hits[0]['literal'] if len(hits) == 1 else None, original=left, candidate=right, bytes_and_count_equal=good))
    active = initial - bad
    rounds = []
    while True:
        lost = {pair for pair in active if any(target not in active for target in edges[pair])}
        if not lost:
            break
        active -= lost
        rounds.append(len(lost))
    for row in observations + direct_rows:
        row['owner_closed'] = (row['owner'], row['candidate_owner']) in active
    spans = sorted({(piece['pointer'], piece['length']) for row in observations for piece in row['original']['pieces']})
    spans.extend((row['original']['pointer'], row['original']['length']) for row in direct_rows)
    spans = sorted(set(spans))
    for (start, length), (nxt, _nlen) in zip(spans, spans[1:]):
        assert start + length <= nxt
    descriptors = sorted({piece['descriptor'] for row in observations for piece in row['original']['pieces']})
    for start, nxt in zip(descriptors, descriptors[1:]):
        assert nxt >= start + 16
    literal_bytes = sum(length for start, length in spans)
    return dict(
        summary=dict(
            normalized_windows=before['summary']['normalized_windows'],
            raw_windows=before['summary']['raw_windows'],
            base_windows=before['summary']['extended_windows'],
            base_pairs=len(initial),
            extended_windows=len({start for start, _end in active}),
            extended_pairs=len(active),
            owner_pairs=len(owners),
            piece_sites=len(observations),
            direct_sites=len(direct_rows),
            literal_spans=len(spans),
            literal_bytes=literal_bytes,
            descriptor_records=len(descriptors),
            descriptor_bytes=16 * len(descriptors),
            rejected_pairs=len(initial - active),
            pruning_rounds=rounds,
        ),
        source_context=dict(error_rs_sha256=context['error_rs_sha256'], anchor_lang_version=context['anchor_lang_version'], scope=context['scope']),
        active_pairs=[list(pair) for pair in sorted(active)],
        observations=observations,
        direct_observations=direct_rows,
        consumer_paths=[dict(original=consumer(original_image, original_windows[FORMAT_INNER]), candidate=consumer(candidate_image, candidate_windows[FORMAT_CANDIDATE]))],
    )

def coverage_delta(root, report):
    prior_path = root / PRIOR / 'coverage-delta.json'
    before = json.loads(prior_path.read_bytes())

    def union(intervals):
        out = []
        for start, end in sorted(map(tuple, intervals)):
            if out and start <= out[-1][1]:
                out[-1][1] = max(end, out[-1][1])
            else:
                out.append([start, end])
        return out

    strings = [(piece['pointer'], piece['pointer'] + piece['length']) for row in report['observations'] for piece in row['original']['pieces']]
    strings += [(row['original']['pointer'], row['original']['pointer'] + row['original']['length']) for row in report['direct_observations']]
    raw_fields = []
    mapped_fields = []
    for row in report['observations']:
        for piece in row['original']['pieces']:
            addr = piece['descriptor']
            raw_fields += [(addr, addr + 4), (addr + 8, addr + 16)]
            mapped_fields.append((addr + 4, addr + 8))
    sections = []
    for section in before['sections']:
        row = dict(section)
        if section['section'] == '.rodata':
            row['raw_intervals'] = union(section['raw_intervals'] + strings)
            row['mapped_intervals'] = section['mapped_intervals']
        elif section['section'] == '.data.rel.ro':
            row['raw_intervals'] = union(section['raw_intervals'] + raw_fields)
            row['mapped_intervals'] = union(section['mapped_intervals'] + mapped_fields)
        else:
            raise AssertionError(section['section'])
        covered = union(row['raw_intervals'] + row['mapped_intervals'])
        row['covered_intervals'] = covered
        row['raw_equal_bytes'] = sum(end - start for start, end in row['raw_intervals'])
        row['covered_bytes'] = sum(end - start for start, end in covered)
        row['pointer_only_bytes'] = row['covered_bytes'] - row['raw_equal_bytes']
        row['new_bytes'] = row['covered_bytes'] - section['covered_bytes']
        sections.append(row)
    return dict(
        scope='Counted format pieces, their 16-byte descriptors, and two direct sol_log literals. No allocation extents.',
        prior_unicode_delta_sha256=sha(prior_path.read_bytes()),
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
    for path, digest in json.loads((packet / 'inputs.json').read_bytes()).items():
        relative = Path(path)
        assert not relative.is_absolute() and '..' not in relative.parts
        assert sha((root / relative).read_bytes()) == digest, path
    previous = prior(root)
    previous.check(root / PRIOR, root)
    _prefix, _records, data = readers(root)
    report = inspect(packet, (root / 'evidence/original/mayhem/deployed.so').read_bytes(), data.inputs(root, 'mayhem-current437-composition-20261028'), root)
    assert report == json.loads(gzip.decompress((packet / 'observations.json.gz').read_bytes())), 'fresh observations differ'
    delta = coverage_delta(root, report)
    assert delta == json.loads((packet / 'coverage-delta.json').read_bytes()), 'coverage delta differs'
    summary = report['summary']
    assert (summary['normalized_windows'], summary['raw_windows'], summary['extended_windows'], summary['extended_pairs']) == (437, 141, 431, 581)
    assert (summary['owner_pairs'], summary['piece_sites'], summary['direct_sites'], summary['literal_spans'], summary['literal_bytes'], summary['descriptor_records'], summary['rejected_pairs']) == (2, 10, 4, 15, 250, 32, 0)
    assert (delta['new_payload_bytes'], delta['payload_covered_bytes'], delta['payload_total_bytes']) == (762, 17440, 26180)
    assert all(row['owner_closed'] and row['bytes_and_count_equal'] for row in report['observations'] + report['direct_observations'])
    return summary
