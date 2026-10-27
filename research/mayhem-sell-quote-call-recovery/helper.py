"""Recompute the partial quote-helper correspondence; no target execution."""
from pathlib import Path
from collections import Counter
import hashlib, importlib.util, json, struct, sys

P = Path(__file__).resolve().parent
R = P.parents[1]


def inspect(symbols):
    spec = importlib.util.spec_from_file_location('quote_elf', R / 'repro/mayhem/global-params-layout-recovery/tools/layer01.py')
    elf = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(elf)
    original = elf.Elf(R / 'evidence/original/mayhem/deployed.so')
    candidate = elf.Elf(Path(symbols).resolve())
    rows = json.loads((R / 'research/mayhem-full-curve-recovery/audit.json').read_bytes())['rows']
    ow = {r['start']: original.window(r['start'], r['end']) for r in rows}
    cw = {s['value']: candidate.window(s['value'], s['value'] + s['size'])
          for s in candidate.symbols if s['info'] & 15 == 2 and s['size'] >= 8 and candidate.lo <= s['value'] < candidate.hi}
    key = lambda w: [w['end'] - w['start'], w['normalized_sha256'], json.dumps(w['normalization_pattern'], sort_keys=True)]
    helpers = {(s['value'], s['size']) for s in candidate.symbols if '10sell_quote17' in s['name']}
    assert len(helpers) == 1
    address, size = helpers.pop()
    before, after = ow[186552], cw[address]

    def data(e, body, windows):
        result = []
        for ref in body['data_references']:
            p = ref['target']
            if e.b[p:p + 6] == b'called':
                result.append({'kind': 'literal', 'bytes': 43, 'value': e.b[p:p + 43].decode()})
            elif p in e.rel:
                assert e.rel[p]['type'] == 8
                zero, text = struct.unpack_from('<II', e.b, p)
                length, line, column = struct.unpack_from('<QII', e.b, p + 8)
                assert zero == 0 and 0 < length < 300 and 0 < line < 100000 and 0 < column < 10000
                path = e.b[text:text + length].decode()
                assert path.endswith('.rs\0')
                result.append({'kind': 'panic_source', 'path': path, 'line': line, 'column': column})
            else:
                # These are the two Result::unwrap Debug vtables. The first
                # 24 bytes are drop/size/alignment; the next pointer is fmt.
                assert p + 24 in e.rel and e.rel[p + 24]['type'] == 8
                fmt = struct.unpack_from('<I', e.b, p + 28)[0]
                assert fmt in windows
                result.append({'kind': 'debug_vtable', 'scalar_header': e.b[p:p + 24].hex(), 'format_body': key(windows[fmt])})
        return result

    calls = lambda body, windows: Counter(json.dumps(key(windows[x['target']])) for x in body['direct'])
    od, cd = data(original, before, ow), data(candidate, after, cw)
    canon = lambda value: Counter(json.dumps(x, sort_keys=True) for x in value)
    # The already-matched entry wrapper identifies the live SellPumpSwap
    # handler without guessing its mangled name or function address.
    wrapper = ow[531896]
    candidates = [w for w in cw.values() if key(w) == key(wrapper)]
    assert len(candidates) == 1
    at = next(i for i, x in enumerate(wrapper['direct']) if x['target'] == 95848)
    handler = candidates[0]['direct'][at]['target']
    quote_calls = [x for x in cw[handler]['direct'] if x['target'] == address]
    assert len(quote_calls) == 1
    return {'symbols_sha256': hashlib.sha256(candidate.b).hexdigest(),
            'original_bytes': 1120, 'candidate_bytes': size,
            'whole_body_normalized_equal': key(before) == key(after),
            'direct_callee_multiset_equal': calls(before, ow) == calls(after, cw),
            'original_direct_calls': len(before['direct']), 'candidate_direct_calls': len(after['direct']),
            'typed_data_multiset_equal': canon(od) == canon(cd),
            'original_data': od, 'candidate_data': cd,
            'caller': {'original_handler': 95848, 'candidate_handler': handler,
                       'original_call_offset': 1944, 'candidate_call_offset': quote_calls[0]['offset'], 'actual_calls': 1},
            'scope': 'Partial body: callee and typed-data multisets agree, but instruction-site correspondence, transitive closure and whole-body identity remain unproved.'}


if __name__ == '__main__':
    Path(sys.argv[2]).write_text(json.dumps(inspect(sys.argv[1]), indent=2) + '\n')
