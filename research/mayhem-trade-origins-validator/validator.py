"""Read-only typed reference checks for the recovered quote validator window."""
import json
import struct


def inspect(original, candidate, original_windows, candidate_windows):
    key = lambda w: (w['end'] - w['start'], w['normalized_sha256'],
                     json.dumps(w['normalization_pattern'], sort_keys=True))
    before = original_windows[188864]
    matches = [w for w in candidate_windows.values() if key(w) == key(before)]
    assert len(matches) == 1
    after = matches[0]

    def method(left, right):
        if left == 0 or right == 0:
            assert left == right == 0
            return {'null': True}
        a, b = original_windows[left], candidate_windows[right]
        assert key(a) == key(b)
        calls = []
        assert len(a['direct']) == len(b['direct'])
        for x, y in zip(a['direct'], b['direct']):
            assert x['offset'] == y['offset']
            assert key(original_windows[x['target']]) == key(candidate_windows[y['target']])
            calls.append({'offset': x['offset'], 'original': x['target'], 'candidate': y['target']})
        return {'original': left, 'candidate': right, 'bytes': a['end'] - left,
                'immediate_callees': calls}

    def pointer(image, site):
        assert image.rel[site]['type'] == 8
        zero, value = struct.unpack_from('<II', image.b, site)
        assert zero == 0
        return value

    def source(left, right):
        a, b = pointer(original, left), pointer(candidate, right)
        n, line, column = struct.unpack_from('<QII', original.b, left + 8)
        assert (n, line, column) == struct.unpack_from('<QII', candidate.b, right + 8)
        value = original.b[a:a+n]
        assert value == candidate.b[b:b+n] and value.endswith(b'.rs\0')
        return {'path': value[:-1].decode(), 'line': line, 'column': column, 'bytes': 24}

    def table(left, right):
        fields = []
        for offset in (0, 8, 16, 24):
            if offset in (8, 16):
                value = struct.unpack_from('<Q', original.b, left + offset)[0]
                assert value == struct.unpack_from('<Q', candidate.b, right + offset)[0]
                fields.append({'offset': offset, 'scalar': value})
            else:
                a = struct.unpack_from('<Q', original.b, left + offset)[0]
                b = struct.unpack_from('<Q', candidate.b, right + offset)[0]
                if a or b:
                    a, b = pointer(original, left + offset), pointer(candidate, right + offset)
                fields.append({'offset': offset, **method(a, b)})
        return {'bytes': 32, 'fields': fields}

    methods = method(before['start'], after['start'])
    a = {r['offset']: r for r in before['data_references']}
    b = {r['offset']: r for r in after['data_references']}
    scalars = {248: (4, 4), 384: (4, 4), 752: (4, 3), 888: (4, 3)}
    strings = {512: 36, 1016: 36, 1152: 43, 1232: 55}
    tables = {296, 800, 1176, 1256}
    sources = {1192, 1272}
    assert a.keys() == b.keys() == scalars.keys() | strings.keys() | tables | sources
    data = []
    for offset in a:
        left, right = a[offset]['target'], b[offset]['target']
        if offset in scalars:
            n, value = scalars[offset]
            assert struct.unpack_from('<I', original.b, left)[0] == value
            assert original.b[left:left+n] == candidate.b[right:right+n]
            detail = {'kind': 'MayhemError discriminant', 'bytes': n, 'value': value}
        elif offset in strings:
            n = strings[offset]
            value = original.b[left:left+n]
            assert value == candidate.b[right:right+n]
            detail = {'kind': 'string', 'bytes': n, 'value': value.decode()}
        elif offset in tables:
            detail = {'kind': 'vtable', **table(left, right)}
        else:
            detail = {'kind': 'Source', **source(left, right)}
        data.append({'instruction_offset': offset, 'original_target': left,
                     'candidate_target': right, **detail})
    return {'window': 'O0095', 'original_start': before['start'],
            'candidate_start': after['start'], 'bytes': before['end'] - before['start'],
            'normalized_equal': True, 'calls': methods['immediate_callees'],
            'typed_data_references': data,
            'scope': 'Complete validator body under the stated normalization; every immediate call and all fourteen typed data references. Selected vtable methods include one immediate callee layer. No unbounded transitive or whole-program identity claim.'}
