"""Recompute complete windows and bounded BuyV2 caller observations; no target execution."""
if not __debug__:
    raise RuntimeError('Evidence assertions require ordinary Python')
from pathlib import Path
import collections
import difflib
import gzip
import hashlib
import importlib.util
import json
import sys

P = Path(__file__).resolve().parent
ROOT = P.parents[1]
sys.dont_write_bytecode = True
sha = lambda b: hashlib.sha256(b).hexdigest()


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


def source_origin(wm, image, row):
    code = wm.m.instructions(image, row['address'], row['bytes'])
    relocations = dict(wm.m.relocations(image))
    found = []
    for i, ins in enumerate(code):
        if ins['opcode'] != 0x18 or relocations.get(row['address'] + ins['offset'], 0) & 0xffffffff != 8:
            continue
        target = ins['lddw_value']
        wanted = b'programs/mayhem-program/src/instructions/'
        try:
            prefix = wm.m.at_address(image, target, len(wanted))
        except StopIteration:
            continue
        if prefix != wanted:
            continue
        tail = code[i + 1:i + 8]
        pointer = tail[0]
        assert pointer['opcode'] == 0x7b and pointer['source'] == ins['destination']
        assert pointer['destination'] == 10
        slot = pointer['displacement']
        # The same typed fields are stored in a different instruction order
        # in the older require! control. Bind widths and frame destinations.
        def field(opcode, offset):
            rows = [x for x in tail[1:] if x['opcode'] == opcode and x['destination'] == 10 and x['displacement'] == slot + offset]
            assert len(rows) == 1
            return rows[0]['immediate']
        assert field(0x62, 144) == 6008 and field(0x72, 72) == 2
        length, line = field(0x7a, 8), field(0x62, 16)
        text = wm.m.at_address(image, target, length).decode()
        assert text.endswith('.rs')
        found.append(dict(instruction_offset=ins['offset'], filename_pointer=target,
                          filename=text, filename_bytes=length, line=line))
    assert len(found) == 1
    return found[0]


def measure():
    wm = module('context_windows', P / 'window_map.py')
    ref = module('context_calls', P / 'quote_reference.py')
    original = (ROOT / 'evidence/original/mayhem/deployed.so').read_bytes()
    ow = wm.windows(original)
    observations, images = {}, {}
    opcodes = [0x61, 0x63, 0x71, 0x73]
    for label in json.loads((P / 'source-inputs.json').read_bytes()):
        d = P / 'builds' / label
        candidate, symbols = [gzip.decompress((d / (name + '.so.gz')).read_bytes()) for name in ['candidate', 'symbols']]
        images[label] = candidate, symbols
        cw = wm.windows(symbols)
        wrapper = [r for r in cw if r['name'] and '9__private8__global6buy_v217h' in r['name']]
        assert len(wrapper) == 1
        wrapper = wrapper[0]
        previous = [r for r in ow if r['signature'] == wrapper['signature']]
        assert len(previous) == 1
        previous = previous[0]
        oc, cc = ref.calls(wm, original, previous, ow), ref.calls(wm, symbols, wrapper, cw)
        sites = [i for i, c in enumerate(oc) if c.get('target') == 140512]
        assert len(sites) == 1
        i = sites[0]
        assert oc[i]['offset'] == cc[i]['offset'] == 760
        before = next(r for r in ow if r['address'] == 140512)
        after = next(r for r in cw if r['address'] == cc[i]['target'])
        assert after['name'] and '6buy_v27handler17h' in after['name']
        assert after['bytes'] == after['symbol_bytes']
        oc, cc = ref.calls(wm, original, before, ow), ref.calls(wm, symbols, after, cw)
        sequence = difflib.SequenceMatcher(a=list(map(ref.identity, oc)), b=list(map(ref.identity, cc)), autojunk=False)
        row = ref.observe(wm, original, ow, candidate, symbols)
        code = [wm.m.instructions(image, body['address'], body['bytes']) for image, body in [(original, before), (symbols, after)]]
        histograms = [collections.Counter(x['opcode'] for x in instructions) for instructions in code]
        row['buy_v2'] = dict(original=before, candidate=after, original_wrapper=previous,
            candidate_wrapper=wrapper, entry_call_offset=760, original_calls=oc, candidate_calls=cc,
            complete_equal=before['signature'] == after['signature'],
            callee_multiset_equal=collections.Counter(map(ref.identity, oc)) == collections.Counter(map(ref.identity, cc)),
            ordered_matching=sum(x.size for x in sequence.get_matching_blocks()),
            call_order=[list(x) for x in sequence.get_opcodes()],
            original_source=source_origin(wm, original, before), candidate_source=source_origin(wm, symbols, after),
            original_selected_opcode_counts={hex(op): histograms[0][op] for op in opcodes},
            candidate_selected_opcode_counts={hex(op): histograms[1][op] for op in opcodes})
        observations[label] = row
    parent = observations['parent']
    for label, row in observations.items():
        assert row['matched_windows'] == 432 and len(row['raw_local_windows']) == 84
        assert len(row['positive_immediate_edges']) == 4383
        assert row['matched_original'] == parent['matched_original']
        assert row['raw_local_windows'] == parent['raw_local_windows']
        assert row['positive_immediate_edges'] == parent['positive_immediate_edges']
        assert not row['whole_file_equal'] and not row['meaningful_elf_equal']
        body = row['buy_v2']
        assert not body['complete_equal'] and body['callee_multiset_equal']
        assert len(body['original_calls']) == len(body['candidate_calls']) == 49
        assert (body['original_source']['filename_bytes'], body['original_source']['line']) == (61, 376)
        assert (body['candidate_source']['filename_bytes'], body['candidate_source']['line']) == (50, 101)
        if label == 'parent':
            assert all(body['original_selected_opcode_counts'][hex(op)] - body['candidate_selected_opcode_counts'][hex(op)] == 27 for op in opcodes)
        else:
            assert body['original_selected_opcode_counts'] == body['candidate_selected_opcode_counts']
    assert images['direct'] == images['repeat']
    assert observations['direct']['buy_v2']['candidate']['bytes'] == 18376
    assert observations['direct']['buy_v2']['ordered_matching'] == 46
    assert observations['local-flags']['buy_v2']['ordered_matching'] == 39
    assert observations['pre-cpi-flags']['buy_v2']['ordered_matching'] == 39
    return observations
