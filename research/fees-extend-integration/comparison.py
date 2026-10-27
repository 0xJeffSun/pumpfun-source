"""Check original-relative references and unchanged parent code for a native build."""
import bisect, struct

# The verifier supplies its authenticated decoder module, also for isolated tests.
w = None

def check(original, parent, candidate):
    assert w is not None
    ow, pw, cw = [w.windows(x) for x in [original, parent, candidate]]
    assert len(ow) == 585 and len(pw) == len(cw) == 586
    assert w.m.section_data(original, '.rodata') == w.m.section_data(candidate, '.rodata'), 'readonly payload'
    assert len(w.m.section_data(candidate, '.rodata')) == 21079
    old_matches = {i for i, (a, b) in enumerate(zip(ow, pw)) if a['signature'] == b['signature']}
    matches = {i for i, (a, b) in enumerate(zip(ow, cw)) if a['signature'] == b['signature']}
    assert len(old_matches) == 581 and old_matches <= matches
    assert {ow[i]['address'] for i in matches - old_matches} == {76384}
    changed = [i for i, (a, b) in enumerate(zip(pw, cw)) if a['signature'] != b['signature']]
    assert changed == [127]
    assert cw[127]['bytes'] == ow[127]['bytes'] == 6312
    for i, (a, b) in enumerate(zip(pw, cw)):
        if i != 127: assert a['bytes'] == b['bytes']

    layouts = [{s['name']: s for s in w.m.elf_layout(x)['sections']} for x in [original, parent, candidate]]
    windows = [ow, pw, cw]
    starts = [[f['address'] for f in rows] for rows in windows]
    rels = [dict(w.m.relocations(x)) for x in [original, parent, candidate]]
    def translated(which, address):
        for name in ['.rodata', '.data.rel.ro']:
            section = layouts[which][name]
            if section['address'] <= address < section['address'] + section['size']:
                return layouts[2][name]['address'] + address - section['address']
        i = bisect.bisect_right(starts[which], address) - 1
        assert i >= 0 and address < windows[which][i]['address'] + windows[which][i]['bytes'], address
        return cw[i]['address'] + address - windows[which][i]['address']

    counts = {'original_matched_calls': 0, 'original_matched_code_pointers': 0,
              'original_matched_data_pointers': 0, 'original_data_fields': 0,
              'unchanged_parent_calls': 0, 'unchanged_parent_pointers': 0}
    original_data = layouts[0]['.data.rel.ro']
    assert original_data['size'] == layouts[2]['.data.rel.ro']['size']
    left_data = bytearray(w.m.section_data(original, '.data.rel.ro'))
    right_data = bytearray(w.m.section_data(candidate, '.data.rel.ro'))
    original_fields = set()
    for at, kind in rels[0].items():
        if kind & 0xffffffff != 8 or not original_data['address'] <= at < original_data['address'] + original_data['size']: continue
        target = struct.unpack('<II', w.m.at_address(original, at, 8))[1]
        new_at = layouts[2]['.data.rel.ro']['address'] + at - original_data['address']
        actual = struct.unpack('<II', w.m.at_address(candidate, new_at, 8))[1]
        assert translated(0, target) == actual, ('original data field', at, target, actual)
        relative = at - original_data['address']
        original_fields.add(relative)
        left_data[relative:relative + 8] = right_data[relative:relative + 8] = bytes(8)
        counts['original_data_fields'] += 1
    assert counts['original_data_fields'] == 379
    new_data = layouts[2]['.data.rel.ro']
    assert original_fields == {at - new_data['address'] for at, kind in rels[2].items()
                               if kind & 0xffffffff == 8 and new_data['address'] <= at < new_data['address'] + new_data['size']}
    assert left_data == right_data

    for i in sorted(matches):
        a, b = ow[i], cw[i]
        for x, y in zip(w.m.instructions(original, a['address'], a['bytes']), w.m.instructions(candidate, b['address'], b['bytes'])):
            kind = rels[0].get(a['address'] + x['offset'], 0) & 0xffffffff
            if kind in [8, 10]: assert rels[2].get(b['address'] + y['offset'], 0) & 0xffffffff == kind
            if 'call_target' in x and kind != 10:
                assert translated(0, x['call_target']) == y['call_target'], ('original call', a['address'], x['offset'])
                counts['original_matched_calls'] += 1
            if kind == 8:
                assert translated(0, x['lddw_value']) == y['lddw_value'], ('original pointer', a['address'], x['offset'])
                key = 'original_matched_code_pointers' if x['lddw_value'] < layouts[0]['.rodata']['address'] else 'original_matched_data_pointers'
                counts[key] += 1

    for i, (a, b) in enumerate(zip(pw, cw)):
        if i == 127: continue
        for x, y in zip(w.m.instructions(parent, a['address'], a['bytes']), w.m.instructions(candidate, b['address'], b['bytes'])):
            kind = rels[1].get(a['address'] + x['offset'], 0) & 0xffffffff
            if kind in [8, 10]: assert rels[2].get(b['address'] + y['offset'], 0) & 0xffffffff == kind
            if 'call_target' in x and kind != 10:
                assert translated(1, x['call_target']) == y['call_target'], ('parent call', a['address'], x['offset'])
                counts['unchanged_parent_calls'] += 1
            if kind == 8:
                assert translated(1, x['lddw_value']) == y['lddw_value'], ('parent pointer', a['address'], x['offset'])
                counts['unchanged_parent_pointers'] += 1
    old_raw = {f['address'] for f in ow if f['raw_sha256'] in {v['raw_sha256'] for v in pw}}
    new_raw = {f['address'] for f in ow if f['raw_sha256'] in {v['raw_sha256'] for v in cw}}
    assert old_raw <= new_raw, ('raw regressions', sorted(old_raw-new_raw))
    return dict(normalized_matches=len(matches), raw_matches=len(new_raw), raw_lost=sorted(old_raw - new_raw),
                gained_original=[ow[i]['address'] for i in matches - old_matches],
                unchanged_compiled_functions=585, rodata_bytes=21079, counts=counts,
                remaining_original_functions=[f['address'] for i, f in enumerate(ow) if i not in matches],
                whole_elf_equal=False, whole_capture_equal=False)
