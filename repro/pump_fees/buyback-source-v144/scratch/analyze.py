#!/usr/bin/env python3
"""Read-only entry/call/relocation comparisons. No executable bytes are written."""
from pathlib import Path
import difflib, gzip, hashlib, json, struct, sys

ROOT = next(p for p in Path(__file__).resolve().parents if (p / 'evidence/original/pump_fees/deployed.so').is_file())
WORK = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT / 'repro/pump_fees/framework-matching'))
from elf_reader import Elf

sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
ORIGINAL = Elf(ROOT / 'evidence/original/pump_fees/deployed.so')
TARGETS = [
    ('revoke_fee_sharing_authority', 659640, 520, 640464, 56),
    ('transfer_fee_sharing_authority', 660160, 520, 640568, 56),
    ('initialize_buyback', 120216, 600, 650064, 576),
    ('update_buyback_authority', 96896, 696, 652592, 704),
    ('update_buyback_claim_rate_limit', 97592, 640, 654336, 528),
]

def location(elf, start, size):
    out = []
    for rel in elf.pattern(start, size):
        at = start + rel['offset']
        if rel['type'] != 8 or elf.b[at] != 0x18:
            continue
        ptr = struct.unpack_from('<I', elf.b, at + 4)[0] | (struct.unpack_from('<I', elf.b, at + 12)[0] << 32)
        if not elf.b[ptr:ptr + 80].startswith(b'programs/pump-fees/'):
            continue
        line_instruction = struct.unpack_from('<BBhi', elf.b, at + 40)
        length_instruction = struct.unpack_from('<BBhi', elf.b, at + 48)
        assert line_instruction[:3] == (0x62, 0x0a, -248)
        assert length_instruction[:3] == (0x7a, 0x0a, -256)
        length = length_instruction[3]
        out.append({'filename_relocation_offset': rel['offset'], 'filename_address': ptr,
                    'filename_bytes': length, 'filename': elf.b[ptr:ptr + length].decode(),
                    'line_instruction_offset': rel['offset'] + 40, 'line': line_instruction[3],
                    'length_instruction_offset': rel['offset'] + 48})
    assert len(out) == 1, (start, out)
    return out[0]

def phase(name, candidate, symbols, matches):
    elf = Elf(candidate)
    syms = Elf(symbols)
    with (gzip.open(matches, 'rt') if matches.suffix == '.gz' else matches.open()) as stream:
        match_data = json.load(stream)
    indexed = {f['start']: f for f in match_data['functions']}
    rows = []
    for handler, original_start, original_size, wrapper, wrapper_call in TARGETS:
        assert ORIGINAL.calls[wrapper + wrapper_call] == original_start
        assert ORIGINAL.entries[ORIGINAL.entries.index(original_start) + 1] == original_start + original_size
        f = next(f for f in syms.funcs if f['name'].startswith('_ZN19pump_fees_candidate19pump_fees_candidate') and handler in f['name'])
        start, size = f['start'], f['size']
        a = [elf.normalized[p:p+8] for p in range(start, start + size, 8)]
        b = [ORIGINAL.normalized[p:p+8] for p in range(original_start, original_start + original_size, 8)]
        opcodes = [{'kind': tag, 'candidate_offsets': [i*8, j*8], 'original_offsets': [k*8, l*8],
                    'candidate_hex': [v.hex() for v in a[i:j]], 'original_hex': [v.hex() for v in b[k:l]]}
                   for tag, i, j, k, l in difflib.SequenceMatcher(None, a, b, autojunk=False).get_opcodes() if tag != 'equal']
        call_rows = []
        for call in elf.callsites(start, size):
            target = indexed.get(call['target'], {})
            bounded = [m for m in target.get('matches', []) if m['entry_bounded'] and m.get('mapped_calls_consistent')]
            call_rows.append({**call, 'names': target.get('names', []),
                              'bounded_call_consistent_original_targets': [m['start'] for m in bounded],
                              'original_same_offset_target': ORIGINAL.calls.get(original_start + call['offset'])})
        same_size = size == original_size
        rows.append({'handler': handler,
                     'candidate': {**f, 'raw_sha256': hashlib.sha256(elf.b[start:start+size]).hexdigest(), 'location': location(elf, start, size)},
                     'original': {'start': original_start, 'size': original_size,
                                  'raw_sha256': hashlib.sha256(ORIGINAL.b[original_start:original_start+original_size]).hexdigest(),
                                  'wrapper': wrapper, 'wrapper_call_offset': wrapper_call,
                                  'entry_boundary_confirmed': True, 'location': location(ORIGINAL, original_start, original_size)},
                     'same_size': same_size, 'normalized_equal': a == b,
                     'same_offset_instruction_differences': [i*8 for i, (x, y) in enumerate(zip(a,b)) if x != y] if same_size else None,
                     'alignment_deltas': opcodes,
                     'candidate_relocations': elf.pattern(start, size), 'original_relocations': ORIGINAL.pattern(original_start, original_size),
                     'relocation_pattern_equal': elf.pattern(start, size) == ORIGINAL.pattern(original_start, original_size),
                     'calls': call_rows, 'original_calls': ORIGINAL.callsites(original_start, original_size)})
    result = {'phase': name, 'original': ORIGINAL.identity(), 'candidate': elf.identity(),
              'symbols': {'path': str(symbols.relative_to(ROOT)), 'sha256': sha(symbols)},
              'matcher': {'path': str(matches.relative_to(ROOT)), 'sha256': sha(matches), 'summary': match_data['summary']},
              'normalization': 'Only R8 LDDW address immediates, R10 syscall immediates, and non-R10 internal direct-call immediates. No bytes written. Source line and filename length remain unnormalized. Rodata contents are not recursively equated.',
              'rows': rows}
    (WORK / (name + '-analysis.json')).write_text(json.dumps(result, indent=2) + '\n')
    print(name, [(r['handler'], r['candidate']['size'], r['original']['size'], r['same_offset_instruction_differences']) for r in rows])

phase('baseline', ROOT/'repro/pump_fees/declared-programs-v144/pump_fees_candidate.so', ROOT/'repro/pump_fees/declared-programs-v144/symbol-source.so', ROOT/'repro/pump_fees/declared-programs-v144/function-matches.json.gz')
for name in ['macro', 'macro-box', 'typed-macro-box']:
    build = WORK / (name + '-build')
    matches = WORK / (name + '-function-matches.json')
    if matches.exists():
        phase(name, build/'artifacts/pump_fees_candidate.so', build/'target/sbf-solana-solana/release/pump_fees_candidate.so', matches)

typed = WORK/'typed-macro-box-build/artifacts/pump_fees_candidate.so'
if typed.exists():
    elf = Elf(typed)
    match_data = json.loads((WORK/'typed-macro-box-function-matches.json').read_text())
    indexed = {f['start']:f for f in match_data['functions']}
    rows = []
    left, right = elf.callsites(1008,1864), ORIGINAL.callsites(2312,1864)
    assert len(left) == len(right) == 12
    for a,b in zip(left,right):
        assert a['offset'] == b['offset']
        target = indexed[a['target']]
        allowed = [m['start'] for m in target['matches'] if m['entry_bounded'] and m.get('mapped_calls_consistent')]
        assert b['target'] in allowed
        rows.append({'offset':a['offset'],'candidate_target':a['target'],'original_target':b['target'],
                     'candidate_names':target['names'],'all_bounded_consistent_matches':allowed,
                     'observed_original_target_in_match_set':True})
    assert elf.normalized[1008:2872] == ORIGINAL.normalized[2312:4176]
    (WORK/'with-values-calls.json').write_text(json.dumps({
        'candidate':elf.identity(),'original':ORIGINAL.identity(),'candidate_start':1008,'original_start':2312,
        'bytes':1864,'normalized_body_equal':True,'raw_body_equal':elf.b[1008:2872] == ORIGINAL.b[2312:4176],
        'relocations_equal':elf.pattern(1008,1864) == ORIGINAL.pattern(2312,1864),'direct_calls':rows,
        'ambiguous_match_note':'String::push has two normalized original matches; the observed original call explicitly resolves to 53288. Both are retained; no uniqueness claim.'},indent=2)+'\n')
