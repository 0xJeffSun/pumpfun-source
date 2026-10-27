"""Recompute partial-window, call, Source and CFG facts. No compiler or VM."""
from pathlib import Path
from collections import Counter, defaultdict
import difflib
import gzip
import hashlib
import importlib.util
import json
import struct
import tempfile

P = Path(__file__).resolve().parent
sha = lambda b: hashlib.sha256(b).hexdigest()


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    value = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(value)
    return value


def raw(path):
    data = path.read_bytes()
    return gzip.decompress(data) if path.suffix == '.gz' else data


def key(window):
    return (window['end'] - window['start'], window['normalized_sha256'],
            json.dumps(window['normalization_pattern'], sort_keys=True))


def windows(elf):
    return {s['value']: elf.window(s['value'], s['value'] + s['size'])
            for s in elf.symbols if s['info'] & 15 == 2 and s['size'] >= 8
            and elf.lo <= s['value'] < elf.hi}


def named(elf, table, marker):
    matches = {s['value'] for s in elf.symbols if s['info'] & 15 == 2 and marker in s['name']}
    assert len(matches) == 1, (marker, matches)
    return table[matches.pop()]


def sources(elf, window):
    result = []
    for ref in window['data_references']:
        p = ref['target']
        if p not in elf.rel or elf.rel[p]['type'] != 8:
            continue
        try:
            zero, text = struct.unpack_from('<II', elf.b, p)
            size, line, column = struct.unpack_from('<QII', elf.b, p + 8)
            if zero or not (1 < size < 300 and 0 < line < 100000 and 0 < column < 10000):
                continue
            name = elf.b[text:text + size].decode()
            if name.endswith('.rs\0'):
                result.append(dict(offset=ref['offset'], path=name[:-1], line=line, column=column))
        except (UnicodeError, struct.error):
            pass
    return result


def origins(elf, window, path):
    result = []
    path = path.encode()
    for ref in window['data_references']:
        if elf.b[ref['target']:ref['target'] + len(path)] != path:
            continue
        at = ref['pc']
        register = elf.b[at + 1] & 15
        store = None
        for q in range(at + 16, at + 40, 8):
            op, regs, off, imm = struct.unpack_from('<BBhi', elf.b, q)
            if op == 0x7b and regs & 15 == 10 and regs >> 4 == register:
                store = (q, off)
                break
        if store is None:
            continue
        end = next(x['pc'] for x in window['direct'] if x['pc'] > store[0])
        item = dict(offset=ref['offset'], path=path.decode())
        for q in range(max(window['start'], at - 64), end, 8):
            op, regs, off, imm = struct.unpack_from('<BBhi', elf.b, q)
            if regs & 15 == 10 and op == 0x7a and off == store[1] + 8:
                item['filename_bytes'] = imm
            if regs & 15 == 10 and op == 0x62 and off == store[1] + 16:
                item['line'] = imm
        if set(item) == {'offset', 'path', 'filename_bytes', 'line'}:
            result.append(item)
    return result


def source_key(rows):
    return sorted((x['path'], x['line'], x['column']) for x in rows)


def origin_key(rows):
    return sorted((x['path'], x['line'], x['filename_bytes']) for x in rows)


def compare(root):
    root = Path(root).resolve()
    reader = module('trade_reader', P/'reader.py')
    progress = module('trade_progress', P/'progress.py')
    cfg = module('trade_cfg', P/'cfg.py')
    original = reader.Elf(root/'evidence/original/mayhem/deployed.so')
    rows = json.loads(raw(P/'inputs/parent-audit.json.gz'))['rows']
    ow = {r['start']: original.window(r['start'], r['end']) for r in rows}
    identifiers = defaultdict(list)
    for row in rows:
        identifiers[key(ow[row['start']])].append(row['id'])
    specs = [('O0081', 113672, 'legacy_buy_handler'), ('O0082', 127520, 'legacy_sell_handler'),
             ('O0083', 140512, 'buy_v2_handler'), ('O0084', 159160, 'sell_v2_handler')]
    answer = {'original_sha256': sha(original.b), 'roles': {}}
    with tempfile.TemporaryDirectory(prefix='trade-partial-analysis-') as td:
        temp = Path(td)
        images = {}
        for role in ['baseline', 'q18', 'q22', 'q28']:
            path = temp/(role+'.so')
            path.write_bytes(raw(P/f'artifacts/{role}/symbols.so.gz'))
            images[role] = reader.Elf(path)
        for role, image in images.items():
            table = windows(image)
            stats = progress.compare(original.b, images['baseline'].b, image.b)
            report = {'preservation': stats, 'handlers': {}}
            for identifier, start, marker in specs:
                if identifier == 'O0083' and role != 'q18':
                    marker = 'instructions6buy_v27handler17'
                before, after = ow[start], named(image, table, marker)
                aa = original.norm(before['start'], before['end'])[0]
                bb = image.norm(after['start'], after['end'])[0]
                sequence = difflib.SequenceMatcher(None, [aa[i:i+8] for i in range(0, len(aa), 8)],
                                                  [bb[i:i+8] for i in range(0, len(bb), 8)], autojunk=False)
                def calls(window, lookup):
                    return [dict(offset=d['offset'], target=d['target'],
                                 ids=sorted(identifiers.get(key(lookup[d['target']]), [])),
                                 shape=key(lookup[d['target']])) for d in window['direct']]
                ac, bc = calls(before, ow), calls(after, table)
                source_path = 'programs/mayhem-program/src/instructions/' + ('pump_interface_v2.rs' if identifier in ['O0083', 'O0084'] else 'pump_interface.rs')
                os, cs = sources(original, before), sources(image, after)
                oo, co = origins(original, before, source_path), origins(image, after, source_path)
                facts = dict(original_bytes=len(aa), candidate_bytes=len(bb),
                             normalized_equal=key(before) == key(after),
                             ordered_matching_slots=sum(x.size for x in sequence.get_matching_blocks()),
                             diagnostic_note='Aligned normalized 8-byte slots are not a completion percentage or acceptance metric.',
                             original_calls=[{k:v for k,v in x.items() if k != 'shape'} for x in ac],
                             candidate_calls=[{k:v for k,v in x.items() if k != 'shape'} for x in bc],
                             callee_shape_multiset_equal=Counter(x['shape'] for x in ac) == Counter(x['shape'] for x in bc),
                             original_Source=os, candidate_Source=cs,
                             Source_coordinates_equal=source_key(os) == source_key(cs),
                             original_CPI_origins=oo, candidate_CPI_origins=co,
                             CPI_origins_equal=origin_key(oo) == origin_key(co))
                if role == 'q18' and identifier in ['O0083', 'O0084']:
                    cpi_shape = key(ow[543848 if identifier == 'O0083' else 549744])
                    conversion_shape = key(ow[620712])
                    probes = {}
                    for label, elf, win, lookup in [('original', original, before, ow), ('candidate', image, after, table)]:
                        cpi = next(d['pc'] for d in win['direct'] if key(lookup[d['target']]) == cpi_shape)
                        conversion = next(d['pc'] for d in win['direct'] if d['pc'] > cpi and key(lookup[d['target']]) == conversion_shape)
                        probes[label] = dict(cpi_offset=cpi-win['start'], conversion_offset=conversion-win['start'],
                                             after_cpi_prefix16=elf.b[cpi+8:cpi+24].hex(),
                                             after_conversion40=elf.b[conversion+8:conversion+48].hex())
                    facts['ownership'] = probes
                    facts['post_conversion_bytes_equal'] = probes['original']['after_conversion40'] == probes['candidate']['after_conversion40']
                    facts['retained_CPI_tag_payload_prefix_equal'] = probes['original']['after_cpi_prefix16'] == probes['candidate']['after_cpi_prefix16']
                report['handlers'][identifier] = facts
            answer['roles'][role] = report
        q22 = images['q22']; q22w = named(q22, windows(q22), 'legacy_sell_handler')
        bump = {}
        for label, elf, win in [('original', original, ow[127520]), ('candidate', q22, q22w)]:
            hits = []
            for pc in range(win['start'], win['end'], 8):
                op, regs, off, imm = struct.unpack_from('<BBhi', elf.b, pc)
                if op == 0x71 and off == 0x22:
                    hits.append(pc)
            assert len(hits) == 1
            alloc = next(d['offset'] for d in win['direct'] if key((ow if label == 'original' else windows(elf))[d['target']]) == key(ow[666616]))
            bump[label] = dict(read_offset=hits[0]-win['start'], read_bytes=elf.b[hits[0]:hits[0]+8].hex(), first_allocator_offset=alloc,
                               distance_to_allocator=alloc-(hits[0]-win['start']))
        answer['late_bump'] = bump
        q28 = images['q28']; q28w = named(q28, windows(q28), 'legacy_sell_handler')
        ai, ab = cfg.cfg(original, ow[127520]['start'], ow[127520]['end'])
        bi, bb = cfg.cfg(q28, q28w['start'], q28w['end'])
        oc = next(d['offset'] for d in ow[127520]['direct'] if key(ow[d['target']]) == key(ow[651216]))
        cc = next(d['offset'] for d in q28w['direct'] if key(windows(q28)[d['target']]) == key(ow[651216]))
        old = next(v for v in ab.values() if v['start'] <= oc < v['end'])
        new = next(v for v in bb.values() if v['start'] <= cc < v['end'])
        differences = []
        for index, (x, y) in enumerate(zip(old['ins'], new['ins'])):
            fields = {k: [x[k], y[k]] for k in ['op','dst','src','offset','imm'] if x[k] != y[k]}
            if fields:
                differences.append(dict(index=index, original_pc=x['at'], candidate_pc=y['at'], fields=fields))
        answer['clock_block'] = dict(original_blocks=len(ab), candidate_blocks=len(bb), original_call_offset=oc, candidate_call_offset=cc,
                                     original_instructions=len(old['ins']), candidate_instructions=len(new['ins']),
                                     opcode_sequence_equal=[x['op'] for x in old['ins']] == [x['op'] for x in new['ins']],
                                     differences=differences,
                                     scope='Call-anchored pre-Clock diagnostic only. Relocated call immediates and four 8-byte stack-slot shifts remain; no block-byte identity claim.')
    answer['scope'] = 'No new complete window. Body, direct-callee multiset, Source coordinates and selected ownership/CFG facts are separate claims; full transitive data and whole ELF equality are not established.'
    return answer
