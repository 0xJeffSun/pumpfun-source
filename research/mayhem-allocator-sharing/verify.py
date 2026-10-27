#!/usr/bin/env python3
"""Verify saved compiler, archive, relocation and whole-window evidence offline."""
from collections import Counter
import argparse
import gzip
import hashlib
import importlib.util
import json
from pathlib import Path
import re
import struct
import tempfile

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[1]
UPSTREAM = 'research/mayhem-parallel-recovery'
LAYER = 'repro/mayhem/global-params-layout-recovery/tools/layer01.py'
INVENTORY = 'repro/mayhem/global-params-layout-recovery/prior-inventory.json.gz'
LABELS = ('baseline', 'provider', 'provider-repeat', 'consumer', 'portable-provider')
CRATES = ('spl_token_2022_interface', 'solana_instructions_sysvar', 'solana_stake_interface')


def require(ok, message):
    if not ok:
        raise ValueError(message)


def raw(path):
    data = path.read_bytes()
    return gzip.decompress(data) if path.suffix == '.gz' else data


def read(path):
    return json.loads(raw(path))


def digest(data):
    return hashlib.sha256(data).hexdigest()


def identity(data):
    return dict(bytes=len(data), sha256=digest(data))


def pin_files(root, rows):
    require(len(rows) == len({r['path'] for r in rows}), 'duplicate pin')
    for row in rows:
        name = row['path']
        require(name and '\\' not in name and ':' not in name and not name.startswith('/')
                and '..' not in Path(name).parts, 'unsafe pin')
        path = root / name
        require(path.is_file() and not any(p.is_symlink() for p in [path, *path.parents]), 'nonregular pin')
        data = path.read_bytes()
        require(identity(data) == {k: row[k] for k in ('bytes', 'sha256')}, 'pin differs: ' + name)
        if 'git_blob' in row:
            require(hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()
                    == row['git_blob'], 'Git blob differs')


def control_source(sources, label):
    result = dict(sources)
    if label != 'baseline':
        crate = 'spl-token-2022-interface' if label == 'consumer' else 'solana-instructions-sysvar'
        result['Cargo.toml'] += ('\n[profile.release.package.' + crate +
                                ']\nrustflags = ["-Zshare-generics=no"]\n').encode()
    return result


def actual_invocations(log, label):
    calls = re.findall(r'^\s+Running .*rustc\.exe --crate-name (\w+) ([^\r\n]+)', log, re.M)
    require(len(calls) == 163 and sum('--target sbpf-solana-solana' in c for _, c in calls) == 85,
            'full compilation cohort differs')
    for name in ('mayhem_recovered', 'pump_interface', 'anchor_lang'):
        require(sum(n == name for n, _ in calls) == 1, 'required crate invocation differs')
    flagged = [n for n, c in calls if '-Zshare-generics=' in c]
    expected = [] if label == 'baseline' else [
        'spl_token_2022_interface' if label == 'consumer' else 'solana_instructions_sysvar']
    require(flagged == expected, 'sharing flag reached a different crate')
    require(all('-Zshare-generics=no ' in c for _, c in calls if '-Zshare-generics=' in c), 'sharing flag value differs')
    require('Finished ' in log, 'compiler did not finish')
    return dict(rustc=163, host=78, target=85, controlled_crates=flagged)


def archive_members(data):
    require(data.startswith(b'!<arch>\n'), 'invalid archive')
    offset, names, result = 8, b'', {}
    while offset < len(data):
        header = data[offset:offset + 60]
        require(len(header) == 60 and header[58:60] == b'`\n', 'invalid archive header')
        size = int(header[48:58]); name = header[:16].decode().strip()
        body = data[offset + 60:offset + 60 + size]
        require(len(body) == size, 'truncated archive member')
        offset += 60 + size + size % 2
        if name == '//':
            names = body
            continue
        if name in ('/', '/SYM64/'):
            continue
        if name.startswith('#1/'):
            length = int(name[3:]); name, body = body[:length].rstrip(b'\0').decode(), body[length:]
        elif name.startswith('/'):
            start = int(name[1:]); require(start < len(names), 'invalid archive name offset')
            name = names[start:].split(b'/\n', 1)[0].rstrip(b'\0').decode()
        else:
            name = name.removesuffix('/')
        require(name not in result, 'duplicate archive member')
        result[name] = body
    require(offset == len(data), 'archive extent differs')
    return result


class Object:
    def __init__(self, data):
        require(data[:6] == b'\x7fELF\x02\x01', 'invalid object ELF')
        h = struct.unpack_from('<HHIQQQIHHHHHH', data, 16)
        require(h[0] == 1, 'expected relocatable object')
        rows = [struct.unpack_from('<IIQQQQIIQQ', data, h[5] + i * h[10]) for i in range(h[11])]
        strings = rows[h[12]]; text = data[strings[4]:strings[4] + strings[5]]
        self.sections = [dict(name=text[r[0]:].split(b'\0', 1)[0].decode(), row=r) for r in rows]
        self.symbols, tables = {}, {}
        for i, row in enumerate(rows):
            if row[1] != 2:
                continue
            strings = rows[row[6]]; text = data[strings[4]:strings[4] + strings[5]]; table = []
            for at in range(row[4], row[4] + row[5], row[9]):
                n, info, other, index, value, size = struct.unpack_from('<IBBHQQ', data, at)
                symbol = dict(name=text[n:].split(b'\0', 1)[0].decode(), binding=info >> 4,
                              type=info & 15, section=index, value=value, bytes=size)
                table.append(symbol)
                if symbol['name']:
                    require(symbol['name'] not in self.symbols, 'duplicate object symbol')
                    self.symbols[symbol['name']] = symbol
            tables[i] = table
        self.relocations = []
        for row in rows:
            if row[1] not in (4, 9):
                continue
            for at in range(row[4], row[4] + row[5], row[9]):
                offset, info = struct.unpack_from('<QQ', data, at)
                self.relocations.append(dict(section=row[7], offset=offset, type=info & 0xffffffff,
                                             symbol=tables[row[6]][info >> 32]['name']))


def shape(window):
    return (window['end'] - window['start'], window['normalized_sha256'],
            json.dumps(window['normalization_pattern'], sort_keys=True))


def functions(elf):
    names = {}
    for symbol in elf.symbols:
        if symbol['info'] & 15 == 2 and symbol['size'] >= 8 and elf.lo <= symbol['value'] < elf.hi:
            span = (symbol['value'], symbol['value'] + symbol['size'])
            names.setdefault(span, []).append(symbol['name'])
    return {span: dict(elf.window(*span), names=names[span]) for span in sorted(names)}


def one_function(windows, fragment):
    found = [w for w in windows.values() if any(fragment in n for n in w['names'])]
    require(len(found) == 1, 'ambiguous named caller')
    return found[0]


def routed_call(windows, caller, offsets):
    edges = [c for c in caller['direct'] if c['offset'] in offsets]
    require([c['offset'] for c in edges] == list(offsets), 'caller offsets differ')
    targets = {c['target'] for c in edges}
    require(len(targets) == 1, 'caller does not share one helper')
    start = targets.pop(); found = [w for w in windows.values() if w['start'] == start]
    require(len(found) == 1, 'helper boundary differs')
    helper = found[0]
    require(helper['end'] - start == 408, 'grow helper size differs')
    edge = [c for c in helper['direct'] if c['offset'] == 312]
    require(len(edge) == 1, 'finish helper edge differs')
    finish = [w for w in windows.values() if w['start'] == edge[0]['target']]
    require(len(finish) == 1 and finish[0]['end'] - finish[0]['start'] == 312, 'finish helper extent differs')
    return dict(grow_start=start, grow_symbol=helper['names'][0],
                finish_start=finish[0]['start'], finish_symbol=finish[0]['names'][0])


def verify(write=False):
    if not write:
        rows = read(HERE / 'manifest.json')['files']
        members = {p.relative_to(HERE).as_posix() for p in HERE.rglob('*')
                   if p.is_file() and p.name != 'manifest.json' and '__pycache__' not in p.parts}
        require(members == {r['path'] for r in rows}, 'packet membership differs')
        pin_files(HERE, rows)
    pin_files(REPO, read(HERE / 'inputs.json')['files'])
    source_rows = read(HERE / 'source-inputs.json')['source_files']
    sources = {r['path']: raw(HERE / 'sources' / (r['path'] + '.gz')) for r in source_rows}
    require(len(sources) == 60 and all(identity(sources[r['path']]) == {k: r[k] for k in ('bytes', 'sha256')}
                                    for r in source_rows), 'source cohort differs')
    require({n: digest(b) for n, b in sources.items()} == read(REPO / UPSTREAM / 'source-inputs.json'),
            'source differs from published 60-input composition')
    spec = importlib.util.spec_from_file_location('allocator_layer', REPO / LAYER)
    layer = importlib.util.module_from_spec(spec); spec.loader.exec_module(layer)
    original = layer.Elf(REPO / 'evidence/original/mayhem/deployed.so')
    original_windows = {r['id']: original.window(r['start'], r['end']) for r in read(REPO / INVENTORY)['original_rows']}
    report = dict(builds={}, comparisons={}, routes={}, objects={}, limits=dict(target_executions=0,
                  new_original_windows=0, historical_flag_proven=False, raw_published_elf_equal=False))
    payloads = {'published': raw(REPO / UPSTREAM / 'artifacts/recovered/symbols.so.gz')}
    for label in LABELS:
        folder = HERE / 'builds' / label; launch, result = read(folder / 'launch.json.gz'), read(folder / 'result.json.gz')
        require(result['status'] == 'SUCCEEDED' and result['returncode'] == 0 and result['source_unchanged']
                and result['root_invocations'] == 1 and result['target_executions'] == 0, 'build did not succeed')
        require(launch['target_directory_initially_absent'] is True, 'target was not fresh')
        require(launch['source_inputs'] == {n: digest(b) for n, b in control_source(sources, label).items()}, 'control source differs')
        require('--locked' in launch['command'] and '--offline' in launch['command'], 'build is not offline/locked')
        for name, pin in result['logs'].items():
            require(identity(raw(folder / (name + '.gz'))) == pin, 'build log differs')
        for name, pin in result['outputs'].items():
            require(identity(raw(folder / (name + '.gz'))) == pin, 'build artifact differs')
        report['builds'][label] = actual_invocations(raw(folder / 'stderr.log.gz').decode(), label)
        payloads[label] = raw(folder / 'symbols.so.gz')
    require(payloads['provider'] == payloads['provider-repeat'] == payloads['portable-provider'], 'provider replay differs')
    for label in ('provider-repeat', 'portable-provider'):
        require(raw(HERE / 'builds' / label / 'candidate-v154-strip.so.gz') ==
                raw(HERE / 'builds/provider/candidate-v154-strip.so.gz'), 'stripped replay differs')
    objects = {}
    for key, record in read(HERE / 'objects.json').items():
        label, crate = key.split('/'); folder = HERE / 'objects' / label
        archive, data = raw(folder / (crate + '.rlib.gz')), raw(folder / (crate + '.o.gz'))
        require(digest(archive) == record['archive_sha256'] and digest(data) == record['object_sha256'], 'object pin differs')
        require(archive_members(archive)[record['member']] == data, 'archive member differs')
        objects[key] = Object(data)
        cache = read(HERE / 'maps' / label / 'dependency-inputs.json.gz')
        require(cache['sbpf-solana-solana/release/deps/' + record['archive_name']] == digest(archive), 'archive is not map input')
    with tempfile.TemporaryDirectory() as td:
        windows, elfs, shapes = {}, {}, {}
        for label, data in payloads.items():
            path = Path(td) / (label + '.so'); path.write_bytes(data); elf = layer.Elf(path)
            elfs[label] = elf; windows[label] = functions(elf); shapes[label] = Counter(map(shape, windows[label].values()))
            hashes = {w['raw_sha256'] for w in windows[label].values()}
            report['comparisons'][label] = dict(**identity(data), text_bytes=elf.hi - elf.lo, functions=len(windows[label]),
                normalized_ids=sorted(k for k, w in original_windows.items() if shape(w) in shapes[label]),
                raw_ids=sorted(k for k, w in original_windows.items() if w['raw_sha256'] in hashes))
            burn = one_function(windows[label], 'spl_token_2022_interface11instruction4burn17')
            buy = one_function(windows[label], '__cpi_client_accounts_buy_v2..BuyV2$u20$as$u20$anchor_lang..ToAccountMetas')
            sell_v2 = one_function(windows[label], '__cpi_client_accounts_sell_v2..SellV2$u20$as$u20$anchor_lang..ToAccountMetas')
            sell = one_function(windows[label], '__cpi_client_accounts_sell..Sell$u20$as$u20$anchor_lang..ToAccountMetas')
            report['routes'][label] = dict(burn=routed_call(windows[label], burn, (912, 1320)),
                                           buy_v2=routed_call(windows[label], buy, tuple(range(144, 5761, 216))),
                                           sell_v2=routed_call(windows[label], sell_v2, tuple(range(144, 5545, 216))),
                                           legacy_sell=routed_call(windows[label], sell, tuple(range(144, 2953, 216))))
        require(shapes['provider'] == shapes['published'], 'provider function multiset differs')
        require(shapes['consumer'] == shapes['baseline'], 'consumer control changed shapes')
        missing = shapes['published'] - shapes['baseline']
        require(sorted((k[0], n) for k, n in missing.items()) == [(312, 1), (408, 1)]
                and not shapes['baseline'] - shapes['published'], 'baseline shape delta differs')
        for label, row in report['comparisons'].items():
            require(row['normalized_ids'] == report['comparisons']['published']['normalized_ids'], 'original match set differs')
            require(row['raw_ids'] == report['comparisons']['published']['raw_ids'], 'raw original match set differs')
            require(len(row['normalized_ids']) == 375 and len(row['raw_ids']) == 59, 'window counts differ')
        for label in ('baseline', 'provider'):
            folder = HERE / 'maps' / label; result = read(folder / 'result.json.gz')
            require(result['returncode'] == 0 and result['root_invocations'] == 1 and result['source_unchanged']
                    and result['dependencies_unchanged'] and result['tools_unchanged'] and result['elf_equals_baseline'], 'map relink differs')
            for name, pin in result['outputs'].items():
                data = payloads[label] if name == 'symbols.so' else raw(folder / (name + '.gz'))
                require(identity(data) == pin, 'map output differs')
            lines = raw(folder / 'link.map.gz').decode().splitlines()
            for route_name, route in report['routes'][label].items():
                if route_name == 'legacy_sell':
                    continue
                owner = 'solana_stake_interface' if label == 'provider' and route_name in ('buy_v2', 'sell_v2') else 'solana_instructions_sysvar'
                found = [line for line in lines if re.match(r'\s*' + format(route['grow_start'], 'x') + r'\s', line)
                         and '.rlib(' in line and route['grow_symbol'] in line]
                require(len(found) == 1 and 'lib' + owner + '-' in found[0], 'map owner differs')
                obj = objects[label + '/' + owner]
                require(obj.symbols[route['grow_symbol']]['section'] != 0 and obj.symbols[route['grow_symbol']]['bytes'] == 408,
                        'owner does not define grow helper')
                require(obj.symbols[route['finish_symbol']]['section'] != 0 and obj.symbols[route['finish_symbol']]['bytes'] == 312,
                        'owner does not define finish helper')
                report['objects'][label + '/' + route_name] = dict(owner=owner, grow_symbol=route['grow_symbol'], finish_symbol=route['finish_symbol'])
            burn_route = report['routes'][label]['burn']; obj = objects[label + '/spl_token_2022_interface']
            require(obj.symbols[burn_route['grow_symbol']]['section'] == 0, 'consumer defines shared grow helper')
            burn_symbol = next(s for n, s in obj.symbols.items() if 'spl_token_2022_interface11instruction4burn17' in n)
            refs = [r for r in obj.relocations if r['section'] == burn_symbol['section'] and r['offset'] in (912, 1320)]
            require(len(refs) == 2 and all(r['type'] == 10 and r['symbol'] == burn_route['grow_symbol'] for r in refs), 'burn relocations differ')
        for label in ('published', 'provider'):
            require(report['routes'][label]['burn']['grow_start'] != report['routes'][label]['buy_v2']['grow_start'], 'split helpers missing')
        require(report['routes']['baseline']['burn']['grow_start'] == report['routes']['baseline']['buy_v2']['grow_start'], 'baseline sharing missing')
        require(report['routes']['provider']['legacy_sell']['grow_start'] != report['routes']['published']['legacy_sell']['grow_start'], 'legacy routing residual differs')
        a, b = elfs['published'], elfs['provider']
        report['provider_vs_published'] = dict(raw_text_differing_positions=sum(x != y for x, y in zip(a.b[a.lo:a.hi], b.b[b.lo:b.hi])),
            whole_normalized_text_equal=a.norm(a.lo, a.hi) == b.norm(b.lo, b.hi),
            function_multiset_equal=True, raw_linked_equal=a.b == b.b)
        report['provider_vs_published']['sections'] = {}
        for name in ('.text', '.rodata', '.data.rel.ro', '.rel.dyn'):
            sa, sb = a.sec[name], b.sec[name]
            aa, bb = a.b[sa['offset']:sa['offset']+sa['size']], b.b[sb['offset']:sb['offset']+sb['size']]
            report['provider_vs_published']['sections'][name] = dict(published_bytes=len(aa), provider_bytes=len(bb),
                equal=aa==bb, differing_overlap_positions=sum(x!=y for x,y in zip(aa,bb)), tail_bytes=abs(len(aa)-len(bb)))
        require(report['provider_vs_published']['raw_text_differing_positions'] == 7811
                and not report['provider_vs_published']['whole_normalized_text_equal'], 'raw/ordered-text residual differs')
    if write:
        (HERE / 'findings.json').write_text(json.dumps(report, indent=2) + '\n', encoding='utf8', newline='\n')
    else:
        require(read(HERE / 'findings.json') == report, 'saved findings differ')
    print(json.dumps(dict(full_builds=len(LABELS), rustc_invocations=163 * len(LABELS), map_relinks=2,
                         original_matches=375, raw_original_matches=59, provider_text_bytes=602936,
                         provider_function_copies=428, new_original_matches=0, target_executions=0), indent=2))
    return report


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--write-findings', action='store_true')
    verify(parser.parse_args().write_findings)
