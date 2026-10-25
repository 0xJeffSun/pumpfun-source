"""Read-only complete-function comparison of the AMM GlobalConfig exit."""
from pathlib import Path
import hashlib
import json
from elf_analysis import Elf, REPO

WORK = Path(__file__).resolve().parent
BUILD = WORK / 'build'
original = Elf(REPO / 'evidence/original/pump_amm/deployed.so')
candidate = Elf(BUILD / 'artifacts/pump_amm_recovered.so')
symbols = Elf(BUILD / 'target/sbf-solana-solana/release/pump_amm_recovered.so')
assert candidate.b[candidate.lo:candidate.hi] == symbols.b[symbols.lo:symbols.hi]
digest = lambda b: hashlib.sha256(b).hexdigest()
original_ranges = {}
for index, start in enumerate(original.entries):
    end = original.entries[index + 1] if index + 1 < len(original.entries) else original.hi
    original_ranges.setdefault((end - start, digest(original.normalized[start:end])), []).append(start)
functions = {}
for fn in symbols.funcs:
    functions.setdefault((fn['start'], fn['size']), []).append(fn['name'])
rows = []
for (start, length), names in sorted(functions.items()):
    normalized_hash = digest(candidate.normalized[start:start + length])
    hits = [at for at in original_ranges.get((length, normalized_hash), [])
            if original.pattern(at, length) == candidate.pattern(start, length)]
    rows.append({'names': names, 'start': start, 'bytes': length,
                 'normalized_sha256': normalized_hash,
                 'raw_sha256': digest(candidate.b[start:start + length]),
                 'relocations': candidate.pattern(start, length), 'matches': hits})
by_start = {row['start']: row for row in rows}
selected = [row for row in rows if 0x4f00 in row['matches']]
assert len(selected) == 1, selected
row = selected[0]
assert row['bytes'] == 1648
assert any('exit_with_expected_owner' in name for name in row['names'])
calls = []
for call in candidate.callsites(row['start'], row['bytes']):
    target = by_start.get(call['target'])
    reference = original.calls.get(0x4f00 + call['offset'])
    matches = target['matches'] if target else []
    calls.append({'offset': call['offset'], 'candidate_target': call['target'],
                  'candidate_target_names': target['names'] if target else [],
                  'original_target': reference, 'bounded_target_matches': matches,
                  'target_has_matching_full_body': reference in matches})
report = {'scope': 'Read-only in-memory comparison of complete inferred-entry-bounded bodies. Masks only actual relocation immediates and relative internal call offsets; no executable edits. This does not prove transitive rodata equality or historical full-source identity.',
          'original': original.identity(), 'candidate': candidate.identity(),
          'symbols': symbols.identity(), 'original_start': 0x4f00, 'original_end': 0x5570,
          'selected_function': row, 'direct_target_checks': calls,
          'all_direct_targets_have_matching_full_bodies': all(c['target_has_matching_full_body'] for c in calls),
          'all_function_summary': {'total': len(rows), 'any_bounded_match': sum(bool(r['matches']) for r in rows)},
          'full_byte_equality': original.b == candidate.b}
(WORK / 'function-match.json').write_text(json.dumps(report, indent=2) + '\n')
print(json.dumps({key: report[key] for key in ['candidate', 'selected_function', 'all_direct_targets_have_matching_full_bodies', 'all_function_summary', 'full_byte_equality']}, indent=2))
