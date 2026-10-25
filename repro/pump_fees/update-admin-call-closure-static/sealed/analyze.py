"""Bounded, read-only ELF call/data closure; never executes or edits a program."""
from pathlib import Path
import bisect
import collections
import gzip
import hashlib
import json
import shutil
import struct
import sys

W = Path(__file__).resolve().parent
R = W.parents[1]
sha = lambda b: hashlib.sha256(b).hexdigest()
paths = {
    'original.so': 'evidence/original/pump_fees/deployed.so',
    'candidate.so': 'repro/pump_fees/readme-provenance-v144/pump_fees_candidate.so',
    'symbol-source.so': 'repro/pump_fees/fee-config-serialization-v144/symbol-source.so',
    'accepted-functions.json.gz': 'repro/pump_fees/fee-config-serialization-v144/function-matches.json.gz',
    'accepted-bodies.json': 'repro/pump_fees/fee-config-serialization-v144/static/body-analysis.json',
    'source-sha256.json': 'repro/pump_fees/readme-provenance-v144/source-sha256.json',
    'source-snapshot.tar.gz': 'repro/pump_fees/readme-provenance-v144/source-snapshot.tar.gz',
    'whole-file-identity.json': 'repro/pump_fees/readme-provenance-v144/whole-file-identity.json',
    'elf_reader.py': 'repro/pump_fees/framework-matching/elf_reader.py',
}
inputs = {p: sha((R / p).read_bytes()) for p in paths.values()}
assert inputs[paths['original.so']] == '4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e'
assert inputs[paths['candidate.so']] == 'a9c4ea9e47356a91bf9bd97318746a7c207b873e32485d7786853f048d7d4afa'
source = json.loads((R / paths['source-sha256.json']).read_text())
for p, digest in source.items():
    assert sha((R / p).read_bytes()) == digest, p
inputs.update(source)
frozen = W / 'inputs'
frozen.mkdir(exist_ok=True)
for name, p in paths.items():
    if (frozen / name).exists():
        assert (frozen / name).read_bytes() == (R / p).read_bytes(), name
    else:
        shutil.copyfile(R / p, frozen / name)
for p in source:
    target = frozen / 'current-source' / p
    target.parent.mkdir(parents=True, exist_ok=True)
    if target.exists():
        assert target.read_bytes() == (R / p).read_bytes(), p
    else:
        shutil.copyfile(R / p, target)
(W / 'input-sha256.json').write_text(json.dumps(inputs, indent=2) + '\n')
sys.path.insert(0, str(frozen))
from elf_reader import Elf
O, C, S = [Elf((frozen / p).resolve()) for p in ['original.so', 'candidate.so', 'symbol-source.so']]
assert C.b[C.lo:C.hi] == S.b[S.lo:S.hi]
M = json.loads(gzip.decompress((frozen / 'accepted-functions.json.gz').read_bytes()))
F = {f['start']: f for f in M['functions']}
def inferred_length(e, start):
    i = bisect.bisect_left(e.entries, start)
    assert i < len(e.entries) and e.entries[i] == start, start
    return (e.entries[i + 1] if i + 1 < len(e.entries) else e.hi) - start
def names(c):
    return F.get(c, {}).get('names', [])
def section(e, address, length=1):
    for name, s in e.secs.items():
        if s[1] != 8 and s[3] <= address and address + length <= s[3] + s[5]:
            return name, s[4] + address - s[3]
    return None
def data(e, address, length):
    s = section(e, address, length)
    return e.b[s[1]:s[1] + length] if s else None
def lddw(e, pc):
    assert e.b[pc] == 0x18
    return struct.unpack_from('<I', e.b, pc + 4)[0] | struct.unpack_from('<I', e.b, pc + 12)[0] << 32
def signed_call(e, pc):
    assert e.b[pc:pc+2] == b'\x85\x10' and e.relocations.get(pc, {}).get('type') != 10
    immediate = struct.unpack_from('<i', e.b, pc + 4)[0]
    target = pc + 8 + immediate * 8
    assert e.calls[pc] == target
    return {'pc': pc, 'raw_hex': e.b[pc:pc+8].hex(), 'signed_immediate': immediate, 'target': target}
def fat_record(e, address):
    loc = section(e, address, 24)
    if not loc or e.relocations.get(loc[1], {}).get('type') != 8:
        return None
    encoded, length, line, column = struct.unpack_from('<QQII', e.b, loc[1])
    pointer = encoded >> 32
    if not 0 < length <= 512:
        return None
    value = data(e, pointer, length)
    if value is None:
        return None
    try:
        text = value.decode('utf-8')
    except UnicodeDecodeError:
        return None
    if not all(ch.isprintable() or ch in '\n\t' for ch in text):
        return None
    record = {'address': address, 'relocation_type': 8, 'encoded_pointer': encoded,
              'decoded_pointer': pointer, 'length': length, 'text': text, 'pointee_sha256': sha(value)}
    if text.endswith('.rs') and 0 < line < 1000000 and 0 < column < 10000:
        record.update(kind='source_location_record', line=line, column=column)
    else:
        record.update(kind='pointer_length_record_prefix', extent_unproven=True)
    return record

MAX_DEPTH = 4
queue = collections.deque([(373808, 634776, 0)])
seen = set()
nodes, edges, references = [], [], []
while queue:
    c, o, depth = queue.popleft()
    if (c, o) in seen:
        continue
    seen.add((c, o))
    assert len(seen) <= 128, 'Bounded diagnostic node budget exceeded'
    n = F[c]['bytes'] if c in F else inferred_length(C, c)
    on = inferred_length(O, o)
    symbolic = c in F
    if symbolic:
        assert any(f['start'] == c and f['size'] == n for f in S.funcs)
    normalized = n == on and C.normalized[c:c+n] == O.normalized[o:o+on]
    patterns = C.pattern(c, n) == O.pattern(o, on)
    matched = normalized and patterns
    row = {'candidate': c, 'original': o, 'depth': depth, 'candidate_names': names(c),
           'candidate_bytes': n, 'original_bytes': on, 'candidate_symbol_bound': symbolic,
           'candidate_raw_sha256': sha(C.b[c:c+n]), 'original_raw_sha256': sha(O.b[o:o+on]),
           'raw_equal': C.b[c:c+n] == O.b[o:o+on], 'normalized_equal': normalized,
           'relocation_patterns_equal': patterns, 'matched_body': matched,
           'candidate_relocations': C.pattern(c, n), 'original_relocations': O.pattern(o, on)}
    nodes.append(row)
    if not matched:
        row['stop_reason'] = 'Unmatched complete body; no speculative internal alignment or traversal.'
        continue
    for relocation in C.pattern(c, n):
        offset = relocation['offset']
        if relocation['type'] != 8 or C.b[c+offset] != 0x18:
            continue
        ca, oa = lddw(C, c+offset), lddw(O, o+offset)
        reference = {'candidate_function': c, 'original_function': o, 'instruction_offset': offset,
                     'candidate_pc': c+offset, 'original_pc': o+offset,
                     'candidate_raw_instruction': C.b[c+offset:c+offset+16].hex(),
                     'original_raw_instruction': O.b[o+offset:o+offset+16].hex(),
                     'relocation_type': 8, 'candidate_address': ca, 'original_address': oa,
                     'candidate_section': section(C, ca)[0] if section(C, ca) else None,
                     'original_section': section(O, oa)[0] if section(O, oa) else None,
                     'extent_proven': False}
        if reference['candidate_section'] == '.text' or reference['original_section'] == '.text':
            reference['kind'] = 'relocated_code_pointer'
            reference['limit'] = 'Recorded code-address target; indirect reachability is not inferred.'
            references.append(reference)
            continue
        # Only a literal pointer + immediately adjacent length register followed
        # directly by a call is labeled a bounded argument span. No arbitrary
        # printable prefix is substituted for an object's real extent.
        pc = c + offset
        pointer_reg = C.b[pc + 1] & 15
        op, regs, _, immediate = struct.unpack_from('<BBhi', C.b, pc + 16)
        if op == 0xb7 and regs == pointer_reg + 1 and 0 < immediate <= 1024 and C.b[pc+24] == 0x85:
            cb, ob = data(C, ca, immediate), data(O, oa, immediate)
            if cb is not None and ob is not None:
                reference.update(kind='direct_pointer_length_call_argument', bytes=immediate,
                    candidate_data_hex=cb.hex(), original_data_hex=ob.hex(), data_equal=cb == ob,
                    candidate_data_sha256=sha(cb), original_data_sha256=sha(ob),
                    candidate_call_pc=pc+24, original_call_pc=o+offset+24,
                    extent_proven=True)
        if not reference['extent_proven']:
            cr, origin = fat_record(C, ca), fat_record(O, oa)
            if cr and origin:
                reference.update(kind='relocated_pointer_length_record', candidate_record=cr, original_record=origin,
                                 pointee_equal=cr['length'] == origin['length'] and cr['pointee_sha256'] == origin['pointee_sha256'])
                if cr['kind'] == origin['kind'] == 'source_location_record':
                    reference.update(source_coordinates_equal=(cr['text'], cr['line'], cr['column']) == (origin['text'], origin['line'], origin['column']))
            else:
                reference['kind'] = 'target_extent_unresolved'
        references.append(reference)
    calls = C.callsites(c, n)
    row['direct_call_count'] = len(calls)
    row['external_calls'] = [r for r in C.pattern(c, n) if r['type'] == 10]
    row['indirect_call_offsets'] = [pc-c for pc in range(c, c+n, 8) if C.b[pc] == 0x8d]
    if depth == MAX_DEPTH:
        row['stop_reason'] = 'Depth bound reached; outgoing edges recorded but descendants not traversed.'
    for call in calls:
        cc, oc = signed_call(C, c+call['offset']), signed_call(O, o+call['offset'])
        edges.append({'parent_candidate': c, 'parent_original': o, 'offset': call['offset'],
                      'depth': depth, 'candidate': cc, 'original': oc,
                      'traversed': depth < MAX_DEPTH})
        if depth < MAX_DEPTH:
            queue.append((cc['target'], oc['target'], depth+1))

summary = {'root': 'accepted update_admin dispatcher', 'candidate_root': 373808, 'original_root': 634776,
           'maximum_direct_call_depth': MAX_DEPTH, 'node_budget': 128, 'visited_pairs': len(nodes),
           'matching_normalized_bodies': sum(n['matched_body'] for n in nodes),
           'raw_equal_bodies': sum(n['raw_equal'] for n in nodes),
           'unmatched_bodies': [n for n in nodes if not n['matched_body']],
           'depth_boundary_pairs': [[n['candidate'], n['original']] for n in nodes if n['depth'] == MAX_DEPTH and n.get('direct_call_count')],
           'external_call_sites': sum(len(n.get('external_calls', [])) for n in nodes),
           'indirect_call_sites': sum(len(n.get('indirect_call_offsets', [])) for n in nodes),
           'relocated_references': len(references),
           'relocated_data_references': sum(r['kind'] != 'relocated_code_pointer' for r in references),
           'relocated_code_pointer_references': sum(r['kind'] == 'relocated_code_pointer' for r in references),
           'bounded_direct_argument_spans': sum(r['extent_proven'] for r in references),
           'differing_bounded_argument_spans': [r for r in references if r.get('data_equal') is False],
           'decoded_pointer_length_record_pairs': sum(r['kind'] == 'relocated_pointer_length_record' for r in references),
           'source_coordinate_difference_pairs': [r for r in references if r.get('source_coordinates_equal') is False]}
report = {'scope': 'Read-only bounded direct-call and actual-relocation data analysis. No execution, builds, program edits, initializer traversal, binary rewriting or source/optimizer variants.',
          'inputs_sha256': inputs, 'analysis_script_sha256': sha(Path(__file__).read_bytes()),
          'candidate_symbol_text_equal': True, 'summary': summary, 'nodes': nodes, 'edges': edges,
          'relocation_targets': references,
          'limitations': ['Four direct-call edges deep only; unmatched bodies and depth-bound descendants are not semantically aligned.',
                          'External syscalls and indirect targets are recorded boundaries, not recursively proved.',
                          'Only concrete pointer/length argument spans are byte-equality checks; unresolved object extents are not claimed equal.',
                          'Matched normalized bodies do not prove transitive data, historical source spelling, or runtime equivalence.']}
for p, digest in inputs.items():
    assert sha((R / p).read_bytes()) == digest, p
(W / 'closure.json').write_text(json.dumps(report, indent=2) + '\n')
print(json.dumps(summary, indent=2))
