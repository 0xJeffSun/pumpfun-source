"""Check actual constructor/vtable/caller and allocator-provider relationships."""
from collections import defaultdict
import json
import struct


def inspect(original, before, after, rows):
    key = lambda w: (w['end'] - w['start'], w['normalized_sha256'],
                     json.dumps(w['normalization_pattern'], sort_keys=True))

    def windows(e):
        return {s['value']: e.window(s['value'], s['value'] + s['size'])
                for s in e.symbols if s['info'] & 15 == 2 and s['size'] >= 8
                and e.lo <= s['value'] < e.hi}

    ow = {r['start']: original.window(r['start'], r['end']) for r in rows}
    bw, cw = windows(before), windows(after)
    by_id = {r['id']: r['start'] for r in rows}
    constructor = ow[by_id['O0232']]
    old = [w for w in bw.values() if key(w) == key(constructor)]
    new = [w for w in cw.values() if key(w) == key(constructor)]
    assert len(old) == 2 and len(new) == 1
    target = new[0]

    def method(a, b):
        assert key(ow[a]) == key(cw[b])
        calls = []
        for x, y in zip(ow[a]['direct'], cw[b]['direct']):
            assert x['offset'] == y['offset']
            assert key(ow[x['target']]) == key(cw[y['target']])
            calls.append(dict(offset=x['offset'], original=x['target'], candidate=y['target']))
        return dict(original=a, candidate=b, bytes=ow[a]['end'] - a,
                    immediate_callees=calls)

    def ptr(e, address):
        assert e.rel[address]['type'] == 8
        low, value = struct.unpack_from('<II', e.b, address)
        assert low == 0
        return value

    checked = method(constructor['start'], target['start'])
    assert len(checked['immediate_callees']) == 4
    assert len(constructor['data_references']) == len(target['data_references']) == 1
    a, b = constructor['data_references'][0], target['data_references'][0]
    assert a['offset'] == b['offset'] == 120
    fields = []
    for offset in range(0, 88, 8):
        if offset in (8, 16):
            x = struct.unpack_from('<Q', original.b, a['target'] + offset)[0]
            y = struct.unpack_from('<Q', after.b, b['target'] + offset)[0]
            assert x == y
            fields.append(dict(offset=offset, scalar=x))
        elif offset == 40:
            x, y = ptr(original, a['target'] + offset), ptr(after, b['target'] + offset)
            nested = []
            for sub in (0, 8, 16, 24):
                if sub in (8, 16):
                    left = struct.unpack_from('<Q', original.b, x + sub)[0]
                    assert left == struct.unpack_from('<Q', after.b, y + sub)[0]
                    nested.append(dict(offset=sub, scalar=left))
                else:
                    nested.append(dict(offset=sub, **method(ptr(original, x + sub), ptr(after, y + sub))))
            fields.append(dict(offset=offset, supertrait_bytes=32, fields=nested))
        else:
            fields.append(dict(offset=offset, **method(ptr(original, a['target'] + offset), ptr(after, b['target'] + offset))))
    callers = []
    for row in rows:
        original_body = ow[row['start']]
        sites = [d for d in original_body['direct'] if d['target'] == constructor['start']]
        if not sites:
            continue
        counterparts = [w for w in cw.values() if key(w) == key(original_body)]
        witnesses = []
        for site in sites:
            supported = [w['start'] for w in counterparts if any(
                d['offset'] == site['offset'] and d['target'] == target['start'] for d in w['direct'])]
            assert supported
            witnesses.append(dict(offset=site['offset'], candidate_callers=sorted(supported)))
        callers.append(dict(original_id=row['id'], witnesses=witnesses))
    assert len(callers) == 9
    grow = ow[by_id['O0246']]
    old_grow = [w['start'] for w in bw.values() if key(w) == key(grow)]
    new_grow = [w['start'] for w in cw.values() if key(w) == key(grow)]
    assert len(old_grow) == 3 and len(new_grow) == 2
    large_finish = ow[by_id['O0209']]
    finishes = [w['start'] for w in cw.values() if key(w) == key(large_finish)]
    assert len(finishes) == 1
    reserve = ow[by_id['O0210']]
    reserves = []
    for w in cw.values():
        if key(w) != key(reserve):
            continue
        for x, y in zip(reserve['direct'], w['direct']):
            if x['target'] == large_finish['start']:
                reserves.append(dict(caller=w['start'], offset=x['offset'],
                                     target=y['target'], target_bytes=cw[y['target']]['end'] - y['target'],
                                     required_shape_equal=key(cw[y['target']]) == key(large_finish)))
    assert reserves and not any(r['required_shape_equal'] for r in reserves)
    return dict(constructor=checked, old_constructor_count=2, new_constructor_count=1,
                table_bytes=88, table_fields=fields, original_caller_groups=callers,
                account_meta_grow_one_before=sorted(old_grow), account_meta_grow_one_after=sorted(new_grow),
                required_328_byte_finish_grow_counterparts=finishes,
                unresolved_reserve_children=reserves,
                scope='Selected constructor methods and immediate callees only; no unbounded transitive proof. A sysvar grow_one copy and missing 328-byte reserve consumer remain.')
