"""Audit the partial v3 buy-cost recovery using the unchanged sealed tools."""
import argparse
import ast
from collections import Counter, defaultdict
import gzip
import hashlib
import json
from pathlib import Path
import struct
import sys

if not __debug__:
    raise SystemExit('Run verification without -O')

TARGET, CALLBACK = 0x80df8, 0x81640
FILENAME = b'programs/pump/src/trade_v3.rs'


def digest(data):
    return hashlib.sha256(data).hexdigest()


def require(condition, message):
    if not condition:
        raise ValueError(message)


def analyze(original_path, parent_path, proposal_path, inventory_path, tools_directory):
    tools = Path(tools_directory).resolve()
    namespace = {'struct': struct}
    for name, wanted in (('pump_compare_function_bytes.py', {'body', 'normalize'}),
                         ('pump_quote_control_function_match.py', {'sections'}),
                         ('sealed-parent-verify.py', {'elf_functions'})):
        path = tools / name
        nodes = [node for node in ast.parse(path.read_bytes()).body
                 if isinstance(node, ast.FunctionDef) and node.name in wanted]
        require({node.name for node in nodes} == wanted, 'Canonical function missing from ' + name)
        exec(compile(ast.Module(body=nodes, type_ignores=[]), str(path), 'exec'), namespace)
    body, normalize, sections = (namespace[name] for name in ('body', 'normalize', 'sections'))
    inventory_data = Path(inventory_path).read_bytes()
    inventory = json.loads(gzip.decompress(inventory_data) if inventory_data[:2] == b'\x1f\x8b' else inventory_data)
    files = {key: Path(path).read_bytes() for key, path in
             (('original', original_path), ('parent', parent_path), ('proposal', proposal_path))}
    blobs = {key: gzip.decompress(raw) if raw[:2] == b'\x1f\x8b' else raw for key, raw in files.items()}
    require(digest(blobs['original']) == inventory['original_sha256'], 'Original does not match the sealed inventory')
    require(len(inventory['windows']) == 1035, 'Expected the sealed 1035-window inventory')
    sects = {key: sections(blob) for key, blob in blobs.items()}
    originals = {row['start']: row for row in inventory['windows']}
    require(len(originals) == 1035, 'Duplicate original windows')
    for row in originals.values():
        require(row['bytes'] == row['end'] - row['start'] and
                digest(body(blobs['original'], sects['original'], row['start'], row['bytes'])) == row['raw_sha256'],
                'Sealed original window differs')
    functions = {key: namespace['elf_functions'](blob) for key, blob in blobs.items() if key != 'original'}

    def function(key, start, size, symbol=None):
        raw = body(blobs[key], sects[key], start, size)
        normalized, operands = normalize(raw, start, sects[key])
        return dict(start=start, bytes=size, symbol=symbol, raw_sha256=digest(raw),
                    normalized_sha256=digest(normalized), operands=operands), raw, normalized

    def named(key, fragment):
        matches = [row for row in functions[key] if fragment in row[2]]
        require(len(matches) == 1, 'Expected one function for ' + fragment)
        return function(key, *matches[0])

    capacities = {}
    for key in blobs:
        spans = [(row['start'], row['bytes']) for row in originals.values()] if key == 'original' else sorted({row[:2] for row in functions[key]})
        raw, normalized = Counter(), Counter()
        for start, size in spans:
            description, _, _ = function(key, start, size)
            raw[(size, description['raw_sha256'])] += 1
            normalized[(size, description['normalized_sha256'])] += 1
        capacities[key] = dict(raw=raw, normalized=normalized)
    coverage = {key: {kind: capacities['original'][kind] & capacities[key][kind]
                      for kind in ('raw', 'normalized')} for key in ('parent', 'proposal')}
    global_counts = {key: dict(total=1035, raw=sum(value['raw'].values()),
                              normalized=sum(value['normalized'].values()),
                              unmatched=1035 - sum(value['normalized'].values())) for key, value in coverage.items()}
    require(all(value == dict(total=1035, raw=168, normalized=1018, unmatched=17) for value in global_counts.values()), 'Unexpected injective global counts')
    require(all(not coverage['parent'][kind] - coverage['proposal'][kind] for kind in ('raw', 'normalized')), 'Proposal loses sealed parent capacity')

    def source_sites(key, description, raw):
        found = []
        for offset in range(40, len(raw) - 7, 8):
            op, regs, displacement, line = struct.unpack_from('<BBhi', raw, offset)
            if op != 0x62 or regs != 0x0a or not 1 <= line <= 2000:
                continue
            begin = offset - 40
            load, store, length = raw[begin:begin + 16], raw[begin + 16:begin + 24], raw[offset + 8:offset + 16]
            if len(length) != 8 or load[0] != 0x18 or store[0] != 0x7b or length[0] != 0x7a:
                continue
            register = load[1] & 15
            if store[1] != register << 4 | 10 or length[1] != 10:
                continue
            if struct.unpack_from('<h', store, 2)[0] != displacement - 16 or struct.unpack_from('<h', length, 2)[0] != displacement - 8:
                continue
            pointer = struct.unpack_from('<I', load, 4)[0] | struct.unpack_from('<I', load, 12)[0] << 32
            length_value = struct.unpack_from('<i', length, 4)[0]
            if length_value != len(FILENAME):
                continue
            matching = [s for s in sects[key].values() if s['addr'] > 0 and s['addr'] <= pointer and pointer + length_value <= s['addr'] + s['size']]
            filenames = [blobs[key][pointer - s['addr'] + s['offset']:pointer - s['addr'] + s['offset'] + length_value] for s in matching]
            if FILENAME not in filenames:
                continue
            found.append(dict(line=line, filename=FILENAME.decode(), filename_bytes=length_value,
                              line_instruction_offset=offset, line_instruction_address=description['start'] + offset,
                              line_instruction_hex=raw[offset:offset + 8].hex(),
                              filename_operand_offset=begin, filename_pointer=pointer,
                              filename_load_hex=load.hex(), filename_store_hex=store.hex(),
                              filename_length_instruction_hex=length.hex()))
        return found

    original, original_raw, original_normalized = function('original', TARGET, originals[TARGET]['bytes'])
    parent, parent_raw, parent_normalized = named('parent', '12v3_buy_costs17')
    proposal, proposal_raw, proposal_normalized = named('proposal', '12v3_buy_costs17')
    require((original['bytes'], parent['bytes'], proposal['bytes']) == (2120, 1160, 2056), 'Unexpected cost body sizes')
    indexes = {}
    for key in functions:
        indexes[key] = defaultdict(list)
        for row in functions[key]:
            indexes[key][row[0]].append(row)

    def callees(key, description):
        result = []
        for operand in description['operands']:
            if operand['kind'] != 'direct-call':
                continue
            target = operand['target']
            if key == 'original':
                require(target in originals, 'Original call target is not a sealed function boundary')
                callee, raw, _ = function(key, target, originals[target]['bytes'])
            else:
                matches = indexes[key][target]
                require(len(matches) == 1, 'Candidate call target lacks a unique function symbol')
                callee, raw, _ = function(key, *matches[0])
            callee.pop('operands')
            result.append(dict(call_offset=operand['offset'], call_address=description['start'] + operand['offset'],
                               target=target, callee=callee, source_sites=source_sites(key, callee, raw)))
        return result

    calls = {key: callees(key, value) for key, value in (('original', original), ('parent', parent), ('proposal', proposal))}
    signature = lambda row: (row['callee']['bytes'], row['callee']['normalized_sha256'])
    original_counts = Counter(map(signature, calls['original']))
    proposal_counts = Counter(map(signature, calls['proposal']))
    require([len(calls[key]) for key in ('original', 'parent', 'proposal')] == [17, 13, 17], 'Unexpected emitted call counts')
    require(original_counts == proposal_counts, 'Original and proposal direct callees differ')
    available = defaultdict(list)
    for row in calls['proposal']:
        available[signature(row)].append(row)
    paired = []
    for row in calls['original']:
        other = available[signature(row)].pop(0)
        paired.append(dict(original_call_offset=row['call_offset'], original_target=row['target'],
                           proposal_call_offset=other['call_offset'], proposal_target=other['target'],
                           proposal_symbol=other['callee']['symbol'], bytes=row['callee']['bytes'],
                           normalized_sha256=row['callee']['normalized_sha256']))
    callback, callback_raw, _ = function('original', CALLBACK, originals[CALLBACK]['bytes'])
    callback_signature = (callback['bytes'], callback['normalized_sha256'])
    matched_callbacks = {key: [row for row in calls[key] if signature(row) == callback_signature] for key in calls}
    require(callback['bytes'] == 520 and all(len(rows) == 1 for rows in matched_callbacks.values()), 'Expected the retained 520-byte callback in every image')
    sites = {'original': source_sites('original', original, original_raw), 'proposal': source_sites('proposal', proposal, proposal_raw)}
    require({row['line'] for row in sites['original']} == {371, 375} == {row['line'] for row in sites['proposal']}, 'Source 371/375 operands not observed')
    parent_add = [row for row in calls['parent'] if row['callee']['symbol'] and '5trade3add17' in row['callee']['symbol']]
    require(len(parent_add) == 2 and all({site['line'] for site in row['source_sites']} == {390} for row in parent_add), 'Parent add Source 390 not observed')

    arithmetic = {signature(row) for row in calls['proposal'] if row['callee']['symbol'] and
                  any(fragment in row['callee']['symbol'] for fragment in ('__multi3', '__udivti3', '5trade4add317', '14pre_fee_amount17'))}
    arithmetic_sequences = {key: [signature(row) for row in calls[key] if signature(row) in arithmetic] for key in calls}
    require(arithmetic_sequences['original'] == arithmetic_sequences['proposal'] and len(arithmetic_sequences['original']) == 7, 'Arithmetic direct-call order differs')
    for description in (original, parent, proposal):
        description.pop('operands')
    require(original_normalized != proposal_normalized and original_raw != proposal_raw, 'Partial packet must not claim full helper equality')
    return dict(scope='Partial source-site and checked-arithmetic recovery. Full v3_buy_costs body remains unmatched; direct-callee equality is canonical-normalized, not raw or whole-program identity.',
                tools_sha256={name: digest((tools / name).read_bytes()) for name in
                              ('pump_compare_function_bytes.py', 'pump_quote_control_function_match.py', 'sealed-parent-verify.py')},
                input_sha256={key: digest(blob) for key, blob in blobs.items()} | {'sealed_inventory': digest(inventory_data)},
                input_file_sha256={key: digest(raw) for key, raw in files.items()},
                original_windows=1035, bodies=dict(original=original, parent=parent, proposal=proposal),
                injective_global_counts=global_counts, normalized_capacity_losses=[], raw_capacity_losses=[],
                whole_helper_raw_equal=False, whole_helper_normalized_equal=False,
                emitted_direct_calls=calls, direct_callee_normalized_multiset_equal=True,
                callee_pairs_by_multiset=paired,
                normalized_callee_occurrences_matched=17, direct_call_order_equal=[signature(row) for row in calls['original']] == [signature(row) for row in calls['proposal']],
                arithmetic_call_sequences=arithmetic_sequences, source_sites=sites,
                parent_shared_add_source_sites=parent_add,
                gross_up_error_callback=dict(original=callback, original_source_sites=source_sites('original', callback, callback_raw),
                                            emitted_calls=matched_callbacks, normalized_equal=True))


def main():
    parser = argparse.ArgumentParser(__doc__)
    for name in ('original', 'parent', 'proposal'):
        parser.add_argument('--' + name, type=Path, required=True)
    parser.add_argument('--original-inventory', '--windows', type=Path, required=True)
    parser.add_argument('--tools-directory', '--tool-directory', type=Path, required=True)
    parser.add_argument('--output', type=Path)
    args = parser.parse_args()
    result = analyze(args.original, args.parent, args.proposal, args.original_inventory, args.tools_directory)
    text = json.dumps(result, indent=2) + '\n'
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(text)
    else:
        print(text, end='')


if __name__ == '__main__':
    main()
