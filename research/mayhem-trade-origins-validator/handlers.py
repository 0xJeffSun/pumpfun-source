"""Bind the three partial handlers through dispatch and verify their observed origins."""
from collections import Counter, defaultdict
import json
import struct


def inspect(original, candidate, rows):
    key = lambda w: (w['end'] - w['start'], w['normalized_sha256'],
                     json.dumps(w['normalization_pattern'], sort_keys=True))
    ow = {r['start']: original.window(r['start'], r['end']) for r in rows}
    cw = {s['value']: candidate.window(s['value'], s['value'] + s['size'])
          for s in candidate.symbols if s['info'] & 15 == 2 and s['size'] >= 8
          and candidate.lo <= s['value'] < candidate.hi}
    names = defaultdict(set)
    for s in candidate.symbols:
        names[s['value']].add(s['name'])

    def bind(start, wrapper, name):
        w = ow[wrapper]
        positions = [i for i, call in enumerate(w['direct']) if call['target'] == start]
        assert len(positions) == 1
        targets = {z['direct'][positions[0]]['target'] for z in cw.values()
                   if key(z) == key(w) and any(name in n for n in
                       names[z['direct'][positions[0]]['target']])}
        assert len(targets) == 1
        return cw[targets.pop()]

    def sources(image, window):
        result = []
        for ref in window['data_references']:
            p = ref['target']
            if p not in image.rel or image.rel[p]['type'] != 8:
                continue
            try:
                zero, payload = struct.unpack_from('<II', image.b, p)
                n, line, column = struct.unpack_from('<QII', image.b, p + 8)
                if zero or not (1 <= n < 300 and 1 <= line < 100000 and 1 <= column < 10000):
                    continue
                name = image.b[payload:payload+n].decode()
                if name.endswith('.rs\0'):
                    result.append({'offset': ref['offset'], 'path': name[:-1],
                                   'line': line, 'column': column})
            except (UnicodeError, struct.error):
                continue
        return result

    def anchor(image, window, name):
        name = name.encode()
        result = []
        start, end = window['start'], window['end']
        for ref in window['data_references']:
            if image.b[ref['target']:ref['target']+len(name)] != name:
                continue
            at = start + ref['offset']
            op, regs, _, _ = struct.unpack_from('<BBhi', image.b, at)
            if op != 0x18:
                continue
            store = None
            for p in range(at + 16, min(at + 40, end), 8):
                op, r, off, _ = struct.unpack_from('<BBhi', image.b, p)
                if op == 0x7b and r & 15 == 10 and r >> 4 == regs & 15:
                    store = (p, off)
                    break
            if store is None:
                continue
            bound = next((start+c['offset'] for c in window['direct']
                          if start+c['offset'] > store[0]), None)
            if bound is None:
                continue
            values = {}
            for p in range(max(start, at-64), bound, 8):
                op, regs, off, imm = struct.unpack_from('<BBhi', image.b, p)
                if regs & 15 == 10:
                    if op == 0x7a and off == store[1] + 8:
                        values['filename_bytes'] = imm
                    elif op == 0x62 and off == store[1] + 16:
                        values['line'] = imm
            if values.get('filename_bytes') == len(name) and 'line' in values:
                result.append({'offset': ref['offset'], 'path': name.decode(), **values})
        return result

    roles = [('buy', 113672, 529400, 'legacy_buy_handler', 13680, 50),
             ('sell', 127520, 528568, 'legacy_sell_handler', 13008, 50),
             ('sell_v2', 159160, 530232, 'sell_v2_handler', 17936, 48)]
    result = {}
    for role, start, wrapper, name, size, count in roles:
        a, b = ow[start], bind(start, wrapper, name)
        assert b['end'] - b['start'] == size and len(b['direct']) == count
        assert key(a) != key(b)
        assert Counter(key(ow[x['target']]) for x in a['direct']) == Counter(
            key(cw[x['target']]) for x in b['direct'])
        so, sc = sources(original, a), sources(candidate, b)
        source_key = lambda x: (x['path'], x['line'], x['column'])
        assert len(so) == len(sc) == 7 and Counter(map(source_key, so)) == Counter(map(source_key, sc))
        path = 'programs/mayhem-program/src/instructions/pump_interface' + ('_v2' if role == 'sell_v2' else '') + '.rs'
        ao, ac = anchor(original, a, path), anchor(candidate, b, path)
        origin_key = lambda x: (x['path'], x['line'], x['filename_bytes'])
        assert len(ao) == len(ac) == 1 and Counter(map(origin_key, ao)) == Counter(map(origin_key, ac))
        result[role] = {'original_start': start, 'candidate_start': b['start'],
                        'original_bytes': a['end']-start, 'candidate_bytes': size,
                        'whole_original_body_equal': False, 'calls': count,
                        'all_original_callee_shapes': True, 'original_sources': so,
                        'candidate_sources': sc, 'original_CPI_origins': ao,
                        'candidate_CPI_origins': ac}
    return result
