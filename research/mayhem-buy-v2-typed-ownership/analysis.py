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
    wm = module('buy_v2_packet_windows', P / 'window_map.py')
    ref = module('buy_v2_packet_reference', P / 'quote_reference.py')
    original = (ROOT / 'evidence/original/mayhem/deployed.so').read_bytes()
    ow = wm.windows(original)
    labels = json.loads((P / 'source-inputs.json').read_bytes())
    images, observations = {}, {}
    for label in labels:
        d = P / 'builds' / label
        candidate, symbols = [gzip.decompress((d / (name + '.so.gz')).read_bytes()) for name in ['candidate', 'symbols']]
        images[label] = candidate, symbols
        cw = wm.windows(symbols)
        wrapper = [r for r in cw if r['name'] and '9__private8__global6buy_v217h' in r['name']]
        assert len(wrapper) == 1
        wrapper = wrapper[0]
        prior = [r for r in ow if r['signature'] == wrapper['signature']]
        assert len(prior) == 1
        prior = prior[0]
        oc, cc = ref.calls(wm, original, prior, ow), ref.calls(wm, symbols, wrapper, cw)
        sites = [i for i, c in enumerate(oc) if c.get('target') == 140512]
        assert len(sites) == 1
        i = sites[0]
        assert oc[i]['offset'] == cc[i]['offset'] == 760
        old = next(r for r in ow if r['address'] == 140512)
        new = next(r for r in cw if r['address'] == cc[i]['target'])
        assert new['name'] and '6buy_v27handler17h' in new['name']
        assert new['bytes'] == new['symbol_bytes']
        oc, cc = ref.calls(wm, original, old, ow), ref.calls(wm, symbols, new, cw)
        seq = difflib.SequenceMatcher(a=list(map(ref.identity, oc)), b=list(map(ref.identity, cc)), autojunk=False)
        before, after = collections.Counter(map(ref.identity, oc)), collections.Counter(map(ref.identity, cc))
        row = ref.observe(wm, original, ow, candidate, symbols)
        row['buy_v2'] = dict(original=old, candidate=new, original_wrapper=prior,
            candidate_wrapper=wrapper, entry_call_offset=760,
            original_calls=oc, candidate_calls=cc,
            complete_equal=old['signature'] == new['signature'],
            callee_multiset_equal=before == after,
            ordered_matching=sum(x.size for x in seq.get_matching_blocks()),
            call_order=[list(x) for x in seq.get_opcodes()], original_source=source_origin(wm, original, old),
            candidate_source=source_origin(wm, symbols, new))
        observations[label] = row
    parent = observations['parent']
    assert parent['matched_windows'] == 432 and len(parent['raw_local_windows']) == 84
    assert len(parent['positive_immediate_edges']) == 4383
    for row in observations.values():
        assert row['matched_original'] == parent['matched_original']
        assert row['raw_local_windows'] == parent['raw_local_windows']
        assert row['positive_immediate_edges'] == parent['positive_immediate_edges']
        assert not row['whole_file_equal'] and not row['meaningful_elf_equal']
        assert not row['buy_v2']['complete_equal']
        assert len(row['buy_v2']['original_calls']) == 49
        before, after = row['buy_v2']['original_source'], row['buy_v2']['candidate_source']
        assert (before['filename_bytes'], before['line']) == (61, 376)
        assert (after['filename_bytes'], after['line']) == (50, 101)
        assert before['filename'] != after['filename']
    assert images['parent'] == images['inline-adapter']
    assert images['proposed'] == images['repeat']
    assert [len(observations[n]['buy_v2']['candidate_calls']) for n in ['parent', 'typed-price', 'explicit-clone', 'proposed']] == [78, 48, 51, 49]
    for label in ['proposed', 'repeat']:
        row = observations[label]['buy_v2']
        assert row['candidate']['bytes'] == 17376 and row['original']['bytes'] == 18648
        assert row['callee_multiset_equal'] and row['ordered_matching'] == 46
    return observations
