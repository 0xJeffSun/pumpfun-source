"""Recompute the @NAME@ whole-window claims from saved ELF bytes (parent: @PARENT_LABEL@).

Uses the existing, hash-pinned reader and normalizer. No compiler or VM runs.
"""
from pathlib import Path
from collections import Counter
import gzip, hashlib, importlib.util, json, struct, tempfile

if not __debug__:
    raise RuntimeError('assertions are required')
sha = lambda b: hashlib.sha256(b).hexdigest()
# ---- claims (generated) ----
@CONFIG@
# ----------------------------
PINS = {
    'evidence/original/mayhem/deployed.so': 'a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb',
    'research/mayhem-current-macro-call-closure-20261027/reader.py': '7be3a56418587fdc05178529428ab18df40a252fbd46431ceb98e9107fe414b1',
    'research/mayhem-current-macro-call-closure-20261027/verify.py': '7d7b017bee67fd65c39ee6a1551ff650002c19e3d3a170ccb375bc08110b7f90',
    'research/mayhem-current-macro-call-closure-20261027/original-windows.json': '58f3eca2439d73824e55d5272cabb653b42e07c4b5d422ef329045eb037ed682',
    **PARENT_IMAGE_PINS,
}


def elf_sections(b):
    shoff, = struct.unpack_from('<Q', b, 0x28); shentsize, shnum, shstrndx = struct.unpack_from('<HHH', b, 0x3a)
    hs = [struct.unpack_from('<IIQQQQIIQQ', b, shoff + i * shentsize) for i in range(shnum)]
    base = hs[shstrndx][4]
    return [(b[base + h[0]:b.index(b'\0', base + h[0])].decode(), h[1], h[3], h[4], h[5]) for h in hs]


def whole_elf_detail(c, o):
    """Byte comparison of the candidate with the original's first len(candidate) bytes, per section."""
    cs, os_ = elf_sections(c), elf_sections(o)
    per = {}
    for a, b in zip(cs, os_):
        if a[1] != 8:
            n = sum(x != y for x, y in zip(c[a[3]:a[3] + a[4]], o[b[3]:b[3] + b[4]])) + abs(a[4] - b[4])
            if n: per[a[0]] = n
    tail = o[len(c):]
    return dict(meaningful_prefix_differing_bytes=sum(x != y for x, y in zip(c, o)) + max(0, len(c) - len(o)),
                original_tail_bytes=len(tail), original_tail_zero=not any(tail), section_headers_equal=cs == os_,
                differing_bytes_by_section=per)


def module(name, path):
    s = importlib.util.spec_from_file_location(name, path)
    m = importlib.util.module_from_spec(s); s.loader.exec_module(m); return m


def inspect(root, packet, candidate=None, symbols=None):
    root, packet = Path(root), Path(packet)
    for name, digest in PINS.items():
        assert sha((root / name).read_bytes()) == digest, name
    macro = root / 'research/mayhem-current-macro-call-closure-20261027'
    reader = module('mg_reader', macro / 'reader.py')
    q = module('mg_matcher', macro / 'verify.py')
    rows = json.loads((macro / 'original-windows.json').read_bytes()); assert len(rows) == 441
    o = reader.Elf(root / 'evidence/original/mayhem/deployed.so')
    ow = {r['start']: o.window(r['start'], r['start'] + r['bytes']) for r in rows}
    ids = {r['id']: r for r in rows}
    images = {
        'parent': tuple(gzip.decompress((root / PARENT_IMAGES[n]).read_bytes()) for n in ['candidate', 'symbols']),
        'candidate': (candidate if candidate is not None else gzip.decompress((packet / 'builds/candidate.so.gz').read_bytes()),
                      symbols if symbols is not None else gzip.decompress((packet / 'builds/symbols.so.gz').read_bytes())),
    }
    result = {}; details = {}
    with tempfile.TemporaryDirectory(prefix='mg-elf-') as td:
        for label, (executable, symbol_image) in images.items():
            p = Path(td) / (label + '.so'); p.write_bytes(symbol_image); e = reader.Elf(p)
            q.verify_image_pair(reader, e, executable, Path(td) / (label + '-stripped.so'))
            windows, names = q.tables(e); groups, pairs, closed, rounds = q.relation(ow, windows)
            inv = []; edges = set(); sources = set(); profiles = {}
            for row in rows:
                a = row['start']; w = ow[a]; hits = groups[q.key(w)]
                raw = any(windows[c]['raw_sha256'] == w['raw_sha256'] for c in hits)
                profiles[a] = [q.profile(e, windows[c]) for c in hits]
                inv.append(dict(id=row['id'], bytes=row['bytes'], status='raw' if raw else 'normalized' if hits else 'unmatched',
                                direct_closed=any((a, c) in closed for c in hits)))
                for call in w['direct']:
                    if call['target'] in ow and any(any(x['offset'] == call['offset'] and x['target'] in windows and q.key(windows[x['target']]) == q.key(ow[call['target']])
                                                        for x in windows[c]['direct']) for c in hits):
                        edges.add((row['id'], call['offset']))
                for ref in w['data_references']:
                    value = q.source(o, ref['target'])
                    if value and any(p.get(str(ref['offset'])) == value for p in profiles[a]):
                        sources.add((row['id'], ref['offset']))
            result[label] = dict(counts=dict(Counter(x['status'] for x in inv)), direct_closed=sum(x['direct_closed'] for x in inv),
                                 positive_edges=len(edges), positive_Source=len(sources), unmatched=[x['id'] for x in inv if x['status'] == 'unmatched'],
                                 matched_text=sum(x['bytes'] for x in inv if x['status'] != 'unmatched'))
            details[label] = dict(inventory=inv, edges=edges, sources=sources, profiles=profiles)
            if label == 'candidate':
                for gid, (start, size) in GAINS.items():
                    w = ow[start]; hits = groups[q.key(w)]
                    assert ids[gid]['start'] == start and w['end'] - w['start'] == size and hits, gid
                    assert all(q.profile(o, w) == q.profile(e, windows[c]) for c in hits), gid
                    assert any((start, c) in closed for c in hits) or not GAINS_CLOSED, (gid, 'gained body direct-call closure')
                    result[gid] = dict(bytes=size, normalized_equal=True, raw_equal=any(windows[c]['raw_sha256'] == w['raw_sha256'] for c in hits),
                                       direct_closed=any((start, c) in closed for c in hits), original_normalized_sha256=w['normalized_sha256'],
                                       candidate_starts=hits, ordered_call_offsets=[x['offset'] for x in w['direct']], Source_sites=sorted(q.profile(o, w)))
        b, c = details['parent'], details['candidate']; delta = {}
        for name, pred in [('body', lambda x: x['status'] != 'unmatched'), ('raw', lambda x: x['status'] == 'raw'), ('closed', lambda x: x['direct_closed'])]:
            old = {x['id'] for x in b['inventory'] if pred(x)}; new = {x['id'] for x in c['inventory'] if pred(x)}
            assert old <= new, (name, sorted(old - new)); delta[name] = dict(gains=sorted(new - old), losses=sorted(old - new))
        assert delta['body']['gains'] == sorted(GAINS) and delta['raw']['gains'] == RAW_GAINS
        assert b['edges'] <= c['edges'] and b['sources'] <= c['sources']
        assert all(p in c['profiles'][a] for a, ps in b['profiles'].items() for p in ps)
        result['delta'] = delta
    assert result['parent']['counts'] == PARENT_COUNTS and result['candidate']['counts'] == CANDIDATE_COUNTS
    assert result['parent']['unmatched'] == PARENT_UNMATCHED and result['candidate']['unmatched'] == CANDIDATE_UNMATCHED
    original = (root / 'evidence/original/mayhem/deployed.so').read_bytes(); stripped = images['candidate'][0]
    result['whole_elf'] = dict(candidate_sha256=sha(stripped), original_sha256=sha(original), candidate_bytes=len(stripped),
                               original_bytes=len(original), equal=stripped == original, **whole_elf_detail(stripped, original))
    result['scope'] = ('Whole local normalized windows, raw local bytes, ordered direct-call closure, positive direct calls and Source profiles. '
                       'Not whole-ELF identity unless whole_elf.equal is true, arbitrary data/indirect calls, or signed runtime qualification.')
    return result
