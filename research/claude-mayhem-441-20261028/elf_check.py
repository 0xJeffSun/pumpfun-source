"""Recompute the claude-mayhem-441-20261028 whole-window claims from saved ELF bytes (parent: claude-mayhem-439 (PR #423)).

Uses the existing, hash-pinned reader and normalizer. No compiler or VM runs.
"""
from pathlib import Path
from collections import Counter
import gzip, hashlib, importlib.util, json, struct, tempfile

if not __debug__:
    raise RuntimeError('assertions are required')
sha = lambda b: hashlib.sha256(b).hexdigest()
# ---- claims (generated) ----
PARENT_IMAGES = {"candidate": "research/claude-mayhem-439-20261028/builds/candidate.so.gz", "symbols": "research/claude-mayhem-439-20261028/builds/symbols.so.gz"}
PARENT_IMAGE_PINS = {"research/claude-mayhem-439-20261028/builds/candidate.so.gz": "b406a688d618af0994fc7a45ce6a0f80bbe8ca4452657830edf1b4ee96c4180e", "research/claude-mayhem-439-20261028/builds/symbols.so.gz": "933abbf43b656e6aad42c99984ed997b4133ef0373aa6cd78050e9c2c705a5c1"}
GAINS = {"O0083": [140512, 18648], "O0084": [159160, 18096]}
GAINS_CLOSED = True
RAW_GAINS = ["O0000", "O0001", "O0002", "O0003", "O0004", "O0005", "O0006", "O0007", "O0008", "O0009", "O0010", "O0011", "O0012", "O0013", "O0014", "O0015", "O0016", "O0017", "O0018", "O0019", "O0020", "O0021", "O0022", "O0023", "O0024", "O0025", "O0026", "O0027", "O0028", "O0029", "O0030", "O0031", "O0032", "O0033", "O0034", "O0035", "O0036", "O0037", "O0039", "O0040", "O0041", "O0043", "O0044", "O0046", "O0047", "O0048", "O0049", "O0051", "O0052", "O0053", "O0054", "O0055", "O0056", "O0057", "O0058", "O0059", "O0060", "O0061", "O0062", "O0063", "O0064", "O0065", "O0066", "O0067", "O0068", "O0069", "O0070", "O0071", "O0072", "O0073", "O0074", "O0075", "O0076", "O0077", "O0078", "O0079", "O0080", "O0081", "O0082", "O0083", "O0084", "O0085", "O0086", "O0087", "O0088", "O0089", "O0090", "O0091", "O0092", "O0093", "O0094", "O0095", "O0096", "O0097", "O0098", "O0099", "O0100", "O0101", "O0102", "O0103", "O0104", "O0105", "O0106", "O0107", "O0108", "O0109", "O0110", "O0111", "O0112", "O0113", "O0114", "O0115", "O0116", "O0117", "O0118", "O0119", "O0120", "O0121", "O0122", "O0123", "O0124", "O0125", "O0126", "O0127", "O0128", "O0129", "O0130", "O0131", "O0132", "O0133", "O0134", "O0135", "O0136", "O0137", "O0138", "O0139", "O0140", "O0141", "O0142", "O0143", "O0144", "O0145", "O0146", "O0147", "O0148", "O0149", "O0150", "O0151", "O0152", "O0153", "O0154", "O0155", "O0156", "O0157", "O0158", "O0159", "O0160", "O0161", "O0162", "O0163", "O0164", "O0165", "O0167", "O0168", "O0169", "O0170", "O0171", "O0172", "O0173", "O0174", "O0175", "O0176", "O0177", "O0178", "O0179", "O0180", "O0181", "O0182", "O0183", "O0184", "O0185", "O0186", "O0187", "O0188", "O0189", "O0190", "O0191", "O0192", "O0193", "O0202", "O0203", "O0205", "O0206", "O0210", "O0211", "O0212", "O0213", "O0214", "O0215", "O0216", "O0218", "O0220", "O0221", "O0226", "O0231", "O0232", "O0238", "O0239", "O0240", "O0241", "O0242", "O0243", "O0244", "O0247", "O0248", "O0249", "O0250", "O0251", "O0257", "O0260", "O0264", "O0266", "O0267", "O0270", "O0276", "O0277", "O0284", "O0285", "O0286", "O0290", "O0291", "O0292", "O0293", "O0294", "O0302", "O0303", "O0304", "O0305", "O0306", "O0307", "O0310", "O0311", "O0314", "O0317", "O0318", "O0320", "O0323", "O0325", "O0328", "O0329", "O0340", "O0342", "O0345", "O0349", "O0351", "O0353", "O0355", "O0356", "O0357", "O0364", "O0367", "O0368", "O0369", "O0370", "O0371", "O0374", "O0375", "O0376", "O0377", "O0378", "O0379", "O0380", "O0381", "O0382", "O0389", "O0391", "O0392", "O0400", "O0401", "O0402", "O0403", "O0404", "O0405", "O0406", "O0407", "O0408", "O0409", "O0410", "O0411", "O0412", "O0413", "O0414", "O0417", "O0419", "O0422", "O0423", "O0424", "O0425", "O0433", "O0440"]
PARENT_COUNTS = {"raw": 141, "normalized": 298, "unmatched": 2}
CANDIDATE_COUNTS = {"raw": 441}
PARENT_UNMATCHED = ["O0083", "O0084"]
CANDIDATE_UNMATCHED = []
SHIPPED_FILES = ["src/instructions/burn.rs", "src/instructions/buy_v2.rs", "src/instructions/extend_account.rs", "src/instructions/pump_interface_v2.rs", "src/lib.rs", "src/state.rs"]
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
