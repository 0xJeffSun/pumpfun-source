"""A register-preserving block graph, separate from whole-window matching."""
from pathlib import Path
from collections import Counter, defaultdict
import argparse, gzip, hashlib, importlib.util, json, struct, tempfile

P = Path(__file__).resolve().parent
R = P.parents[1]
sha = lambda data: hashlib.sha256(data).hexdigest()


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec); spec.loader.exec_module(result)
    return result


def key(w):
    return [w['end'] - w['start'], w['normalized_sha256'], w['normalization_pattern']]


def instructions(e, start, end):
    while start < end:
        op, regs, offset, immediate = struct.unpack_from('<BBhi', e.b, start)
        yield start, op, regs, offset, immediate
        start += 16 if op == 0x18 else 8


def pointer(e, p):
    assert e.rel[p]['type'] == 8
    zero, target = struct.unpack_from('<II', e.b, p)
    assert zero == 0
    return target


def terminal_chain(e, start, windows):
    """Only accept branch-free, exit-free tails ending in the abort import."""
    seen = set(); result = []
    while True:
        assert start not in seen; seen.add(start)
        body = windows[start]
        assert not body['branches'] and not body['exits'] and not body['indirect']
        last = body['end'] - 8
        step = {'start': start, 'shape': key(body)}
        if last in e.rel and e.rel[last]['type'] == 10:
            assert e.rel[last]['symbol'] == 'abort'
            assert [x['relocation']['symbol'] for x in body['external']] == ['custom_panic', 'abort']
            step['terminal_external'] = 'abort'; result.append(step)
            return result
        assert len(body['direct']) == 1 and body['direct'][0]['pc'] == last and not body['external']
        step['tail_offset'] = last - start; result.append(step)
        start = body['direct'][0]['target']


def graph(e, body, windows, terminal):
    lo, hi = body['start'], body['end']; leaders = {lo}
    for branch in body['branches']:
        assert lo <= branch['target'] < hi
        leaders.add(branch['target'])
        if branch['pc'] + 8 < hi: leaders.add(branch['pc'] + 8)
    for exit in body['exits']:
        if exit['pc'] + 8 < hi: leaders.add(exit['pc'] + 8)
    cuts = sorted(leaders) + [hi]; result = {}
    for start, end in zip(cuts, cuts[1:]):
        raw, pattern = e.norm(start, end); normalized = bytearray(raw)
        calls, refs = [], []
        for pc, op, regs, off, imm in instructions(e, start, end):
            last = pc, op, off
            if op == 0x85 and regs == 0x10 and not (pc in e.rel and e.rel[pc]['type'] == 10):
                target = pc + 8 + imm * 8
                calls.append([pc - start, key(windows[target])])
            if op & 7 in (5, 6) and op not in (0x85, 0x95, 0x8d):
                # This graph-only comparison excludes local branch offsets.
                # The normal whole-window inventory continues to retain them.
                normalized[pc - start + 2:pc - start + 4] = b'\0\0'
            if op == 0x18 and pc in e.rel and e.rel[pc]['type'] == 8:
                refs.append([pc - start, struct.unpack_from('<I', e.b, pc + 4)[0]])
        pc, op, off = last; edges = []
        terminal_call = any(x['pc'] == pc and x['target'] == terminal for x in body['direct'])
        if op == 0x95 or terminal_call:
            pass
        elif op & 7 in (5, 6) and op not in (0x85, 0x8d):
            edges.append(['taken', pc + 8 + off * 8])
            if op != 0x05 and end < hi: edges.append(['fallthrough', end])
        elif end < hi:
            edges.append(['fallthrough', end])
        fingerprint = sha(json.dumps([normalized.hex(), pattern, calls], sort_keys=True).encode())
        result[start] = {'start': start, 'end': end, 'fingerprint': fingerprint,
                         'edges': edges, 'data': refs, 'terminal_call': terminal_call}
    return result


def data_value(e, p, original, windows):
    if original == 0xad080:
        return {'kind': 'MayhemError_discriminant', 'bytes': e.b[p:p + 4].hex()}
    if original in (0xad59b, 0xad4f4, 0xad019):
        length = {0xad59b: 58, 0xad4f4: 43, 0xad019: 55}[original]
        return {'kind': 'counted_literal', 'length': length, 'value': e.b[p:p + length].decode()}
    if original in (0xb1460, 0xb1478, 0xb1288):
        text = pointer(e, p); length, line, column = struct.unpack_from('<QII', e.b, p + 8)
        assert 0 < length < 300 and 0 < line < 100000 and 0 < column < 10000
        path = e.b[text:text + length].decode(); assert path.endswith('.rs\0')
        return {'kind': 'Source', 'descriptor_bytes': 24, 'path': path, 'line': line, 'column': column}
    assert original in (0xb1238, 0xb13c0, 0xb1268)
    size, code = (48, {0, 24, 32, 40}) if original == 0xb1238 else (32, {24})
    fields = [[i, key(windows[pointer(e, p + i)])] if i in code else
              [i, struct.unpack_from('<Q', e.b, p + i)[0]] for i in range(0, size, 8)]
    return {'kind': 'fmt_vtable', 'bytes': size, 'fields': fields}


def generate():
    elf = module('sweep_graph_elf', R / 'repro/mayhem/global-params-layout-recovery/tools/layer01.py')
    o = elf.Elf(R / 'evidence/original/mayhem/deployed.so')
    with tempfile.TemporaryDirectory() as directory:
        path = Path(directory) / 'symbols.so'
        symbols = gzip.decompress((P / 'builds/control/symbols.so.gz').read_bytes()); path.write_bytes(symbols)
        c = elf.Elf(path)
        path = Path(directory) / 'parent.so'
        path.write_bytes(gzip.decompress((R / 'research/mayhem-source-data-recovery/artifacts/recovered/symbols.so.gz').read_bytes()))
        parent = elf.Elf(path)
        rows = json.loads((R / 'research/mayhem-full-curve-recovery/audit.json').read_bytes())['rows']
        ow = {r['start']: o.window(r['start'], r['end']) for r in rows}
        def named(e):
            return {s['name']: e.window(s['value'], s['value'] + s['size']) for s in e.symbols
                    if s['info'] & 15 == 2 and s['size'] >= 8 and e.lo <= s['value'] < e.hi}
        names = named(c); prior = named(parent)
        assert names.keys() == prior.keys()
        changed = [n for n in names if key(names[n]) != key(prior[n])]
        assert len(changed) == 1 and '14validate_sweep' in changed[0]
        cw = {s['value']: c.window(s['value'], s['value'] + s['size']) for s in c.symbols
              if s['info'] & 15 == 2 and s['size'] >= 8 and c.lo <= s['value'] < c.hi}
        pw = {s['value']: parent.window(s['value'], s['value'] + s['size']) for s in parent.symbols
              if s['info'] & 15 == 2 and s['size'] >= 8 and parent.lo <= s['value'] < parent.hi}
        original, control = ow[65472], names[changed[0]]
        prior_control = prior[changed[0]]
        assert len(pw) == len(cw)
        assert Counter(json.dumps(key(w), sort_keys=True) for p, w in pw.items() if p != prior_control['start']) == Counter(json.dumps(key(w), sort_keys=True) for p, w in cw.items() if p != control['start'])
        assert original['end'] - original['start'] == control['end'] - control['start'] == 912
        sink_o = next(x['target'] for x in original['direct'] if x['offset'] == 728)
        sink_c = next(x['target'] for x in control['direct'] if x['offset'] == 704)
        chains = [terminal_chain(e, sink, ws) for e, sink, ws in ((o, sink_o, ow), (c, sink_c, cw))]
        assert [{k: v for k, v in row.items() if k != 'start'} for row in chains[0]] == [{k: v for k, v in row.items() if k != 'start'} for row in chains[1]]
        og, cg = graph(o, original, ow, sink_o), graph(c, control, cw, sink_c)
        by = [defaultdict(list), defaultdict(list)]
        for i, g in enumerate((og, cg)):
            for address, node in g.items(): by[i][node['fingerprint']].append(address)
        assert set(by[0]) == set(by[1]) and all(len(v) == len(by[1][k]) == 1 for k, v in by[0].items())
        mapping = {v[0]: by[1][k][0] for k, v in by[0].items()}
        blocks, data = [], []
        for start, other in sorted(mapping.items()):
            a, b = og[start], cg[other]
            assert [[kind, mapping[target]] for kind, target in a['edges']] == b['edges']
            assert [x[0] for x in a['data']] == [x[0] for x in b['data']]
            blocks.append({'original_offset': start - 65472, 'candidate_offset': other - control['start'],
                           'bytes': a['end'] - start, 'fingerprint': a['fingerprint'], 'terminal_call': a['terminal_call']})
            for x, y in zip(a['data'], b['data']):
                left, right = data_value(o, x[1], x[1], ow), data_value(c, y[1], x[1], cw)
                assert left == right
                data.append({'original_offset': start + x[0] - 65472,
                             'candidate_offset': other + y[0] - control['start'], 'value': left})
        # Also check the message descriptor used by the terminal panic wrapper.
        values = []
        for e, ws, sink in ((o, ow, sink_o), (c, cw, sink_c)):
            ref = ws[sink]['data_references']; assert len(ref) == 1
            p = ref[0]['target']; text = pointer(e, p); length = struct.unpack_from('<Q', e.b, p + 8)[0]
            assert length == 28
            values.append(e.b[text:text + length].decode())
        assert values == ['attempt to add with overflow'] * 2
        a, ap = o.norm(original['start'], original['end']); b, bp = c.norm(control['start'], control['end'])
        report = {'original_sha256': sha(o.b), 'symbols_sha256': sha(c.b),
                  'named_functions': len(names), 'unchanged_named_function_shapes': len(names) - 1,
                  'function_extents': len(cw), 'unchanged_function_extents': len(cw) - 1,
                  'whole_helper_normalized_equal': a == b and ap == bp,
                  'same_offset_instruction_differences': sum(a[i:i + 8] != b[i:i + 8] for i in range(0, len(a), 8)),
                  'basic_blocks': blocks, 'mapped_data': data, 'terminal_chains': chains,
                  'panic_message': values[0],
                  'scope': 'Graph-only branch offsets are replaced by explicit mapped edges. The branch-free tail to the abort import is terminal under the declared SBF abort ABI; other calls conservatively retain return edges. Registers, operations, constants, callee shapes and eleven typed data references must match. This does not change whole-window normalization or establish complete program semantics.'}
    return {'analysis.json': (json.dumps(report, indent=2) + '\n').encode()}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(); parser.add_argument('--check', action='store_true'); args = parser.parse_args()
    generated = generate()
    for name, data in generated.items():
        if args.check: assert (P / name).read_bytes() == data
        else: (P / name).write_bytes(data)
    report = json.loads(generated['analysis.json'])
    print({k: report[k] for k in ('named_functions', 'unchanged_named_function_shapes', 'whole_helper_normalized_equal', 'same_offset_instruction_differences')})
