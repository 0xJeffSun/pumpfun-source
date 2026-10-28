# Original-relative comparison adapted from the Extend packet. Explicit checks remain active under Python -O.
"""Check original-relative references and unchanged parent code for a native build."""
import bisect, struct
w = None

def check(original, parent, candidate):
    if not w is not None:
        raise AssertionError('comparison check')
    ow, pw, cw = [w.windows(x) for x in [original, parent, candidate]]
    if not (len(ow) == 585 and len(pw) == len(cw) == 586):
        raise AssertionError('comparison check')
    if not w.m.section_data(original, '.rodata') == w.m.section_data(candidate, '.rodata'):
        raise AssertionError('readonly payload')
    if not len(w.m.section_data(candidate, '.rodata')) == 21079:
        raise AssertionError('comparison check')
    old_matches = {i for i, (a, b) in enumerate(zip(ow, pw)) if a['signature'] == b['signature']}
    matches = {i for i, (a, b) in enumerate(zip(ow, cw)) if a['signature'] == b['signature']}
    if not (len(old_matches) == 582 and old_matches <= matches):
        raise AssertionError('comparison check')
    if not {ow[i]['address'] for i in matches - old_matches} == {120816}:
        raise AssertionError('comparison check')
    changed = [i for i, (a, b) in enumerate(zip(pw, cw)) if a['signature'] != b['signature']]
    if not changed == [next((i for i, r in enumerate(ow) if r['address'] == 120816))]:
        raise AssertionError('comparison check')
    sweep = next((i for i, r in enumerate(ow) if r['address'] == 120816))
    if not cw[sweep]['bytes'] == ow[sweep]['bytes'] == 6960:
        raise AssertionError('comparison check')
    for i, (a, b) in enumerate(zip(pw, cw)):
        if i != sweep:
            if not a['bytes'] == b['bytes']:
                raise AssertionError('comparison check')
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
        if not (i >= 0 and address < windows[which][i]['address'] + windows[which][i]['bytes']):
            raise AssertionError(address)
        return cw[i]['address'] + address - windows[which][i]['address']
    counts = {'original_matched_calls': 0, 'original_matched_code_pointers': 0, 'original_matched_data_pointers': 0, 'original_data_fields': 0, 'unchanged_parent_calls': 0, 'unchanged_parent_pointers': 0}
    original_data = layouts[0]['.data.rel.ro']
    if not original_data['size'] == layouts[2]['.data.rel.ro']['size']:
        raise AssertionError('comparison check')
    left_data = bytearray(w.m.section_data(original, '.data.rel.ro'))
    right_data = bytearray(w.m.section_data(candidate, '.data.rel.ro'))
    original_fields = set()
    for at, kind in rels[0].items():
        if kind & 4294967295 != 8 or not original_data['address'] <= at < original_data['address'] + original_data['size']:
            continue
        target = struct.unpack('<II', w.m.at_address(original, at, 8))[1]
        new_at = layouts[2]['.data.rel.ro']['address'] + at - original_data['address']
        actual = struct.unpack('<II', w.m.at_address(candidate, new_at, 8))[1]
        if not translated(0, target) == actual:
            raise AssertionError(('original data field', at, target, actual))
        relative = at - original_data['address']
        original_fields.add(relative)
        left_data[relative:relative + 8] = right_data[relative:relative + 8] = bytes(8)
        counts['original_data_fields'] += 1
    if not counts['original_data_fields'] == 379:
        raise AssertionError('comparison check')
    new_data = layouts[2]['.data.rel.ro']
    if not original_fields == {at - new_data['address'] for at, kind in rels[2].items() if kind & 4294967295 == 8 and new_data['address'] <= at < new_data['address'] + new_data['size']}:
        raise AssertionError('comparison check')
    if not left_data == right_data:
        raise AssertionError('comparison check')
    for i in sorted(matches):
        a, b = (ow[i], cw[i])
        for x, y in zip(w.m.instructions(original, a['address'], a['bytes']), w.m.instructions(candidate, b['address'], b['bytes'])):
            kind = rels[0].get(a['address'] + x['offset'], 0) & 4294967295
            if kind in [8, 10]:
                if not rels[2].get(b['address'] + y['offset'], 0) & 4294967295 == kind:
                    raise AssertionError('comparison check')
            if 'call_target' in x and kind != 10:
                if not translated(0, x['call_target']) == y['call_target']:
                    raise AssertionError(('original call', a['address'], x['offset']))
                counts['original_matched_calls'] += 1
            if kind == 8:
                if not translated(0, x['lddw_value']) == y['lddw_value']:
                    raise AssertionError(('original pointer', a['address'], x['offset']))
                key = 'original_matched_code_pointers' if x['lddw_value'] < layouts[0]['.rodata']['address'] else 'original_matched_data_pointers'
                counts[key] += 1
    for i, (a, b) in enumerate(zip(pw, cw)):
        if i == sweep:
            continue
        for x, y in zip(w.m.instructions(parent, a['address'], a['bytes']), w.m.instructions(candidate, b['address'], b['bytes'])):
            kind = rels[1].get(a['address'] + x['offset'], 0) & 4294967295
            if kind in [8, 10]:
                if not rels[2].get(b['address'] + y['offset'], 0) & 4294967295 == kind:
                    raise AssertionError('comparison check')
            if 'call_target' in x and kind != 10:
                if not translated(1, x['call_target']) == y['call_target']:
                    raise AssertionError(('parent call', a['address'], x['offset']))
                counts['unchanged_parent_calls'] += 1
            if kind == 8:
                if not translated(1, x['lddw_value']) == y['lddw_value']:
                    raise AssertionError(('parent pointer', a['address'], x['offset']))
                counts['unchanged_parent_pointers'] += 1
    old_raw = {f['address'] for f in ow if f['raw_sha256'] in {v['raw_sha256'] for v in pw}}
    new_raw = {f['address'] for f in ow if f['raw_sha256'] in {v['raw_sha256'] for v in cw}}
    if not old_raw <= new_raw:
        raise AssertionError(('raw regressions', sorted(old_raw - new_raw)))
    return dict(normalized_matches=len(matches), raw_matches=len(new_raw), raw_lost=sorted(old_raw - new_raw), gained_original=[ow[i]['address'] for i in matches - old_matches], unchanged_compiled_functions=585, rodata_bytes=21079, counts=counts, remaining_original_functions=[f['address'] for i, f in enumerate(ow) if i not in matches], whole_elf_equal=False, whole_capture_equal=False)
