#!/usr/bin/env python3
"""Recompute the FeeConfig source gain and audit its retained local receipts.

This does not compile or execute the program. See README.md for the native build
and runtime commands, and for the bounds of the saved evidence.
"""
import argparse
from collections import Counter
from functools import lru_cache
import gzip
import hashlib
import importlib.util
import io
import json
from pathlib import Path, PurePosixPath
import struct
import sys
import tarfile

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
ORIGINAL = '7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
TARGET = 0x1159d8
GAIN = 'a766d779aa831d9e7ba0ee2b620609023e0becc0ed2f3c1ee90c4ea07628cbbf'
SOURCE = 'programs/pump/src/trade_types.rs'


def sha(blob):
    return hashlib.sha256(blob).hexdigest()


def read(name):
    blob = (HERE / name).read_bytes()
    return gzip.decompress(blob) if name.endswith('.gz') else blob


def record(name):
    return json.loads(read(name))


def module(name, file):
    spec = importlib.util.spec_from_file_location(name, HERE / file)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


def sources(label):
    with tarfile.open(fileobj=io.BytesIO(read('sources/' + label + '.tar.gz'))) as archive:
        result = {}
        for entry in archive.getmembers():
            path = PurePosixPath(entry.name)
            assert entry.isfile() and not path.is_absolute() and '..' not in path.parts
            assert entry.name not in result
            result[entry.name] = archive.extractfile(entry).read()
    assert len(result) == 60
    return result


def check_builds():
    pins = record('toolchain-pins.json')
    checked = record('toolchain-check.json')
    assert checked['target'] == pins['target'] == 'sbf-solana-solana'
    for key in ('sdk_binary_sha256', 'target_library_sha256'):
        assert checked[key] == pins[key]
    assert len(checked['target_library_sha256']) == 25
    assert checked['wrapper_sha256'] == pins['physical_wrapper_sha256']
    assert checked['build_home_files'] == []
    inputs = {label: sources(label) for label in ('baseline780', 'candidate')}
    before, after = inputs.values()
    assert before.keys() == after.keys()
    assert [p for p in before if before[p] != after[p]] == [SOURCE]
    assert after[SOURCE] == read('proposed/src/trade_types.rs')
    pins = record('parent-sourcefronts-pins.json')['source_sha256']
    assert {p: sha(b) for p, b in before.items()} == pins
    assert pins == record('public-inputs.json')['materialized_source']
    images, launches = {}, {}
    for label in ('baseline780', 'candidate', 'repeat'):
        prefix = 'builds/' + label + '/'
        launch, result = record(prefix + 'launch.json'), record(prefix + 'result.json')
        source = inputs['candidate' if label == 'repeat' else label]
        assert launch['inputs'] == {p: sha(b) for p, b in source.items()}
        assert result['returncode'] == 0 and result['source_unchanged']
        assert result['dependencies_unchanged']
        roots = [line for line in read(prefix + 'build.log.gz').decode().splitlines()
                 if line.strip().startswith('Running `') and '--crate-name pump_recovered ' in line]
        assert len(roots) == 1, (label, 'expected actual root compilation')
        assert len(launch['dependencies']) == 355
        assert launch['command'][launch['command'].index('--target') + 1] == 'sbf-solana-solana'
        assert launch['command'][launch['command'].index('--network') + 1] == 'none'
        assert launch['tools'] == {name: checked['sdk_binary_sha256'][path] for name, path in
                                   [('rustc', 'rust/bin/rustc'), ('cargo', 'rust/bin/cargo'),
                                    ('objcopy', 'llvm/bin/llvm-objcopy')]}
        images[label] = {}
        for name in ('symbols', 'candidate'):
            blob = read(prefix + name + '.so.gz')
            assert sha(blob) == result[name + '_sha256']
            images[label][name] = blob
        launches[label] = launch
    for label in ('candidate', 'repeat'):
        for field in ('dependencies', 'tools'):
            assert launches[label][field] == launches['baseline780'][field]
    assert images['repeat'] == images['candidate']
    assert not record('excluded-cache-hit/qualification.json')['valid_source_build']
    assert b'Fresh pump-recovered' in read('excluded-cache-hit/build.log.gz')
    return images, launches['candidate']['inputs']


def check_measurement(w, original, images):
    expected = record('measurement.json')
    original_windows = w.windows(original)
    assert len(original_windows) == 1035
    original_counts = [Counter(f[key] for f in original_windows)
                       for key in ('signature', 'raw_sha256')]
    matched, maps = {}, {}
    for label, saved in [('baseline780', 'baseline780'), ('candidate', 'local-feeconfig-rebuilt')]:
        blob = images[label]['symbols']
        functions = w.windows(blob)
        maps[label] = {f['address']: f for f in functions}
        counts = [Counter(f[key] for f in functions) for key in ('signature', 'raw_sha256')]
        matched[label] = [a & b for a, b in zip(original_counts, counts)]
        row = expected[saved]
        assert row['symbols_sha256'] == sha(blob)
        assert row['candidate_sha256'] == sha(images[label]['candidate'])
        assert [sum(c.values()) for c in matched[label]] == [row['normalized_injective'], row['raw_injective']]
        targets = [f for f in functions if f['name'] and 'pump_fees..accounts..FeeConfig' in f['name']
                   and 'try_deserialize_unchecked' in f['name']]
        assert targets == [row['target']]
        target = targets[0]
        calls = [{'offset': r['offset'], 'callee': maps[label][r['call_target']]}
                 for r in w.m.instructions(blob, target['address'], target['bytes']) if 'call_target' in r]
        assert calls == row['calls']
    before, after = matched['baseline780'], matched['candidate']
    assert [sum(c.values()) for c in before] == [780, 121]
    assert [sum(c.values()) for c in after] == [781, 121]
    gain, loss = after[0] - before[0], before[0] - after[0]
    assert gain == {GAIN: 1} and not loss
    assert after[1] == before[1]
    assert expected['delta']['gained'] == gain and not expected['delta']['lost']
    originals = {f['address']: f for f in original_windows}
    assert originals[TARGET] == expected['delta']['gained_originals'][0]
    assert originals[TARGET]['bytes'] == 1176 and originals[TARGET]['instructions'] == 142
    boundary = record('caller-boundary.json')
    for label, blob, table in [('original', original, originals),
                               ('baseline780', images['baseline780']['symbols'], maps['baseline780']),
                               ('candidate', images['candidate']['symbols'], maps['candidate'])]:
        row = boundary[label]
        assert row['symbols_sha256'] == sha(blob)
        for target in row['targets']:
            assert target == table[target['address']]
        target_addresses = {f['address'] for f in row['targets']}
        actual_calls = []
        for f in table.values():
            for instruction in w.m.instructions(blob, f['address'], f['bytes']):
                if instruction.get('call_target') in target_addresses:
                    actual_calls.append(dict(caller=f, offset=instruction['offset'],
                                             callee=table[instruction['call_target']]))
        assert actual_calls == row['incoming_calls']
        call = row['wrapper_final_call']
        assert call['wrapper'] == table[call['wrapper']['address']]
        wrapper = call['wrapper']
        assert wrapper['signature'] == originals[0x1156f0]['signature'] and wrapper['bytes'] == 744
        instruction = next(r for r in w.m.instructions(blob, wrapper['address'], 744) if r['offset'] == 728)
        assert instruction['opcode'] == 0x85 and table[instruction['call_target']] == call['callee']
    assert boundary['candidate']['wrapper_final_call']['callee']['signature'] == GAIN
    assert boundary['baseline780']['wrapper_final_call']['callee']['signature'] != GAIN
    check_retained_calls(w, [original, images['baseline780']['symbols'], images['candidate']['symbols']],
                         [originals, maps['baseline780'], maps['candidate']])
    return [originals, maps['candidate']]


def check_retained_calls(w, blobs, maps):
    saved = record('retained-calls.json')
    assert saved['input_sha256'] == list(map(sha, blobs))
    groups = []
    for table in maps:
        groups.append({})
        for f in table.values():
            groups[-1].setdefault(f['signature'], []).append(f)
    rels = [dict(w.m.relocations(b)) for b in blobs]
    symbols = [w.dynamic_symbols(b) for b in blobs]

    def calls(k, f):
        result = []
        for insn in w.m.instructions(blobs[k], f['address'], f['bytes']):
            if insn['opcode'] != 0x85:
                continue
            info = rels[k].get(f['address'] + insn['offset'], 0)
            if info & 0xffffffff == 10:
                destination = dict(kind='import', name=symbols[k][info >> 32]['name'])
            else:
                child = maps[k][insn['call_target']]
                destination = dict(kind='direct', signature=child['signature'], bytes=child['bytes'])
            result.append((insn['offset'], destination))
        return result

    roots = sites = before_equal = after_equal = 0
    improved, ambiguous = [], []
    for sig, originals in groups[0].items():
        baseline, candidate = groups[1].get(sig, []), groups[2].get(sig, [])
        if not baseline:
            continue
        assert candidate
        counts = list(map(len, (originals, baseline, candidate)))
        if counts != [1, 1, 1]:
            ambiguous.append(dict(signature=sig, counts=counts))
            continue
        functions = [originals[0], baseline[0], candidate[0]]
        roots += 1
        edges = [calls(k, f) for k, f in enumerate(functions)]
        assert len(edges[0]) == len(edges[1]) == len(edges[2])
        for a, b, c in zip(*edges):
            assert a[0] == b[0] == c[0]
            old, new = a[1] == b[1], a[1] == c[1]
            sites += 1
            before_equal += old
            after_equal += new
            assert not old or new, 'previously matching direct edge regressed'
            assert old or new or b == c, 'unresolved direct edge changed'
            if new and not old:
                improved.append(dict(parents=[f['address'] for f in functions], offset=a[0],
                                     original=a[1], baseline=b[1], candidate=c[1],
                                     before_equal=False, after_equal=True))
    assert (roots, sites, before_equal, after_equal) == (567, 6125, 6082, 6083)
    assert improved == saved['improved'] and len(improved) == 1
    assert not saved['regressed'] and not saved['changed_unmatched']
    assert ambiguous == saved['ambiguous_groups_excluded'] and len(ambiguous) == 60
    assert [saved[key] for key in ('unambiguous_original_roots', 'direct_import_sites',
                                   'before_equal', 'after_equal')] == [roots, sites, before_equal, after_equal]


def check_closure(w, blobs, maps):
    saved = record('closure.json')
    assert saved['input_sha256'] == list(map(sha, blobs))
    relocations = [dict(w.m.relocations(b)) for b in blobs]
    symbols = [w.dynamic_symbols(b) for b in blobs]
    candidate = next(f for f in maps[1].values() if f['signature'] == GAIN)
    assert saved['root'] == [TARGET, candidate['address']]
    pending, seen = [tuple(saved['root'])], set()
    nodes, edges, indirect, pointers = [], [], [], []

    def call(k, f, instruction):
        info = relocations[k].get(f['address'] + instruction['offset'], 0)
        if info & 0xffffffff == 10:
            return {'kind': 'import', 'name': symbols[k][info >> 32]['name']}
        child = maps[k][instruction['call_target']]
        return dict(kind='direct', **{key: child[key] for key in ('address', 'bytes', 'signature', 'name')})

    def data_record(k, address):
        raw = w.m.at_address(blobs[k], address, 24)
        pointer, length = struct.unpack_from('<QQ', raw)
        assert relocations[k].get(address) == 8 and pointer & 0xffffffff == 0 and length < 1024
        offset = pointer >> 32
        assert any(s['type'] != 8 and s['offset'] <= offset and offset + length <= s['offset'] + s['size']
                   for s in w.m.elf_layout(blobs[k])['sections'])
        text = blobs[k][offset:offset + length]
        return dict(address=address, record_hex=raw.hex(), encoded_pointer=pointer,
                    relocation_info=8, string_file_offset=offset, length=length,
                    text_hex=text.hex(), text=text.decode(), tail_hex=raw[16:].hex())

    while pending:
        a, b = pending.pop()
        if (a, b) in seen:
            continue
        seen.add((a, b))
        fa, fb = maps[0][a], maps[1][b]
        assert fa['signature'] == fb['signature'], (a, b)
        nodes.append({'original': fa, 'candidate': fb})
        rows = [w.m.instructions(blob, f['address'], f['bytes']) for blob, f in zip(blobs, (fa, fb))]
        assert len(rows[0]) == len(rows[1])
        for x, y in zip(*rows):
            assert (x['offset'], x['opcode']) == (y['offset'], y['opcode'])
            if x['opcode'] == 0x85:
                ca, cb = call(0, fa, x), call(1, fb, y)
                assert ca['kind'] == cb['kind']
                key = 'name' if ca['kind'] == 'import' else 'signature'
                assert ca[key] == cb[key]
                edges.append(dict(parent=[a, b], offset=x['offset'], original=ca, candidate=cb, equal=True))
                if ca['kind'] == 'direct':
                    pending.append((ca['address'], cb['address']))
            elif x['opcode'] == 0x8d:
                indirect.append(dict(parent=[a, b], offset=x['offset'], original=x, candidate=y))
        if a == TARGET:
            assert fa['cfg']['outside_successors'] == [] and fa['cfg']['reachable_instructions'] == 142
            for offset, kind in fa['annotations']:
                assert kind == 'opaque_relocated_pointer'
                values = [data_record(k, next(r['lddw_value'] for r in rows[k] if r['offset'] == offset))
                          for k in (0, 1)]
                assert all(values[0][key] == values[1][key] for key in ('text_hex', 'tail_hex', 'length'))
                pointers.append(dict(offset=offset, original=values[0], candidate=values[1]))
    assert (len(nodes), len(edges), len(indirect)) == (32, 53, 7)
    assert not saved['open_pairs']
    assert nodes == saved['matched_pairs'] and edges == saved['edges']
    assert indirect == saved['indirect_sites'] and pointers == saved['root_pointer_records']
    assert [(p['offset'], p['original']['text'], p['original']['tail_hex']) for p in pointers] == [
        (40, 'programs/pump/src/lib.rs', struct.pack('<II', 84, 1).hex()),
        (952, 'failed to fill whole buffer', (37).to_bytes(8, 'little').hex())]


def check_runtime(candidate, inputs):
    report = record('runtime/report.json.gz')
    assert report['candidate_sha256'] == candidate and report['original_sha256'] == ORIGINAL
    assert report['loader_profile'] == 'captured-upgradeable'
    assert report['validation_only_source_sha256'] is None and report['workers'] == 3
    prefix = 'work/pump-feeconfig-recovery-20261028/source/'
    assert report['compiled_source_sha256'] == {prefix + p: h for p, h in inputs.items()}
    adapter = record('runtime/build-comparison.json')
    assert adapter['source_sha256'] == adapter['source_after_sha256'] == report['compiled_source_sha256']
    binding = adapter['binding_adaptation']
    assert binding['actual_launch_sha256'] == sha(read('builds/candidate/launch.json'))
    assert binding['actual_result_sha256'] == sha(read('builds/candidate/result.json'))
    assert adapter['comparison'] == {'candidate_sha256': candidate, 'original_sha256': ORIGINAL}
    expected = record('runtime/harness-inputs.json')
    assert report['script_sha256'] == expected['script_sha256']
    suites = report['suites']
    assert len(suites) == 44 and set(suites) == set(expected['case_counts'])
    assert report['case_count'] == sum(expected['case_counts'].values()) == 10468
    assert not report['mismatches']
    for name, suite in suites.items():
        assert suite == record('runtime/suites/' + name + '.json.gz')
        assert suite['case_count'] == expected['case_counts'][name]
        assert not suite.get('mismatches', suite.get('failures', [])), name
        if isinstance(suite.get('cases'), list):
            for case in suite['cases']:
                if isinstance(case, dict):
                    assert not case.get('different_fields', []), name
                    assert not case.get('mismatches', []), name
                    if isinstance(case.get('match'), bool):
                        assert case['match'], name
        if name == 'quote_control':
            assert len(suite['results']) == suite['cases'] == suite['case_count']
            assert all(r['matches'] and not r['different_fields'] for r in suite['results'])
            assert {candidate, ORIGINAL} <= set(suite['bound_inputs_sha256'].values())
        elif name == 'tokenkeg_two_curve':
            assert suite['candidate_sha256'] == candidate and suite['inputs_unchanged']
            assert suite['provenance']['repository_inputs']['evidence/original/pump/deployed.so'] == ORIGINAL
            assert len(suite['cases']) == 20 and suite['verified_outer_signatures'] == 40
            assert suite['original_successes'] == 16 and suite['original_pump_cpi_cases'] == 18
            assert all(r['candidate'] is not None and not r['mismatches'] for r in suite['cases'])
        elif name == 'multi_hop_curve_partial':
            assert suite['candidate_sha256'] == candidate and suite['original_pump_sha256'] == ORIGINAL
            assert suite['passed'] == len(suite['cases']) == 56
            assert all(not r['mismatches'] for r in suite['cases'])
        else:
            assert len(suite['cases']) == suite['case_count']
            assert suite.get('candidate_sha256', suite.get('provenance', {}).get(expected['candidate_path'])) == candidate
            assert suite.get('original_sha256', suite.get('provenance', {}).get(expected['original_path'])) == ORIGINAL
        receipt = read('runtime/suites/' + name + '.loader.json.gz')
        row = report['loader_receipts'][name]
        assert sha(receipt) == row['sha256']
        loaded = json.loads(receipt)
        assert len(loaded['loads']) == row['load_count'] > 0
        assert {v['elf_sha256'] for v in loaded['loads']} == {candidate, ORIGINAL}
        assert loaded['input_sha256'] == expected['loader_inputs_sha256']
        for load in loaded['loads']:
            assert load['program_bytes'] == 36 and load['programdata_bytes'] == 10485760
            assert load['program_owner'] == 'BPFLoaderUpgradeab1e11111111111111111111111'
            assert load['elf_prefix_unchanged'] and load['zero_allocation_tail']
            assert load['program_sha256'] == expected['program_sha256']
            assert load['header_sha256'] == expected['header_sha256']
    diagnostics = module('diagnostic_audit', 'support/diagnostic_audit.py').audit(suites)
    assert diagnostics == report['diagnostics'] and not diagnostics['mismatches']
    assert diagnostics['log_bearing_cases'] == 10464


def main():
    if not __debug__:
        raise SystemExit('Run without -O: this evidence verifier requires assertions.')
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--original', type=Path, default=ROOT / 'evidence/original/pump/deployed.so')
    args = parser.parse_args()
    manifest = record('MANIFEST.json')
    actual = {p.relative_to(HERE).as_posix(): sha(p.read_bytes()) for p in HERE.rglob('*')
              if p.is_file() and p != HERE / 'MANIFEST.json'}
    assert actual == manifest['files'], 'packet inventory/hash mismatch'
    original = args.original.read_bytes()
    assert sha(original) == ORIGINAL
    images, inputs = check_builds()
    w = module('windows', 'support/window_map.py')
    w.m.elf_layout = lru_cache(maxsize=4)(w.m.elf_layout)
    w.m.relocations = lru_cache(maxsize=4)(w.m.relocations)
    maps = check_measurement(w, original, images)
    check_closure(w, [original, images['candidate']['symbols']], maps)
    check_runtime(sha(images['candidate']['candidate']), inputs)
    print('PASS: 780 -> 781 normalized; 121 raw retained; one gain, zero losses; '
          '32 body pairs / 53 direct edges; two root data records; identical repeat; '
          '44 suites / 10468 cases / 10464 diagnostic pairs. Indirect and whole-ELF identity remain open.')


if __name__ == '__main__':
    main()
