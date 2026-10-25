"""Read-only quote-control full-body comparisons using actual ELF relocations."""
from pathlib import Path
import hashlib
import json
from elf_analysis import Elf, REPO

W = Path(__file__).resolve().parent
original = Elf(REPO / 'evidence/original/pump/deployed.so')
candidate = Elf(W / 'build/artifacts/pump_recovered.so')
symbols = Elf(W / 'build/target/sbf-solana-solana/release/pump_recovered.so')
assert candidate.b[candidate.lo:candidate.hi] == symbols.b[symbols.lo:symbols.hi]
sha = lambda data: hashlib.sha256(data).hexdigest()
original_ranges = {}
for index, start in enumerate(original.entries):
    end = original.entries[index + 1] if index + 1 < len(original.entries) else original.hi
    original_ranges.setdefault((end - start, sha(original.normalized[start:end])), []).append(start)
functions = {}
for fn in symbols.funcs:
    functions.setdefault((fn['start'], fn['size']), []).append(fn['name'])
rows = []
for (start, length), names in sorted(functions.items()):
    hits = [at for at in original_ranges.get((length, sha(candidate.normalized[start:start + length])), [])
            if original.pattern(at, length) == candidate.pattern(start, length)]
    rows.append({'names': names, 'start': start, 'bytes': length,
                 'normalized_sha256': sha(candidate.normalized[start:start + length]),
                 'raw_sha256': sha(candidate.b[start:start + length]),
                 'relocations': candidate.pattern(start, length), 'matches': hits})
by_start = {row['start']: row for row in rows}
selected = [r for r in rows if any('quote_control' in name or 'QuoteControl' in name for name in r['names'])]
for row in selected:
    row['direct_target_checks'] = []
    for match in row['matches']:
        checks = []
        for call in candidate.callsites(row['start'], row['bytes']):
            target = by_start.get(call['target'])
            reference = original.calls.get(match + call['offset'])
            matches = target['matches'] if target else []
            checks.append({'offset': call['offset'], 'candidate_target': call['target'],
                           'original_target': reference,
                           'target_has_matching_full_body': reference in matches})
        row['direct_target_checks'].append({'original_start': match, 'checks': checks,
                                          'all_direct_targets_match': all(c['target_has_matching_full_body'] for c in checks)})
report = {'scope': 'Read-only complete inferred-entry-bounded function comparison. Masks only actual relocation immediates and relative internal calls. This is not a full-source, transitive-rodata, or executable identity claim.',
          'original': original.identity(), 'candidate': candidate.identity(), 'symbols': symbols.identity(),
          'helper_sha256': sha((W / 'elf_analysis.py').read_bytes()),
          'matcher_sha256': sha(Path(__file__).read_bytes()),
          'functions': selected,
          'summary': {'selected_functions': len(selected),
                      'bounded_body_matches': sum(bool(r['matches']) for r in selected),
                      'full_byte_equality': original.b == candidate.b}}
(W / 'strict-functions.json').write_text(json.dumps(report, indent=2) + '\n')
print(json.dumps(report['summary']))
