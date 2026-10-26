"""Index every catalogued original window without executing or decoding a body.

This queue preserves the owning ledger's scope and classifications. Windows are
inferred boundaries where indicated; they are not a count of recovered functions.
"""
import argparse
import gzip
import hashlib
import json
from pathlib import Path


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def read(path):
    raw = path.read_bytes()
    return json.loads(gzip.decompress(raw) if raw[:2] == b'\x1f\x8b' else raw)


def windows(program, document):
    if program == 'pump':
        return document['after']['original_windows'], '/after/original_windows'
    if program == 'pump_amm':
        return document['original'], '/original'
    if program in ('pump_fees', 'mayhem'):
        return document['original_rows'], '/original_rows'
    assert program == 'donation_relay' and isinstance(document, list)
    return document, ''


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--repo', type=Path, required=True)
    parser.add_argument('--index', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    root = args.repo.resolve()
    index = read(args.index)
    suffixes = {
        'pump': 'full-before-after-inventory.json.gz',
        'pump_amm': 'residual-ledger.json.gz',
        'pump_fees': 'full-function-inventory.json',
        'mayhem': 'complete-inventory.json.gz',
        'donation_relay': 'match-ledger.json',
    }
    tasks = []
    counts = {}
    statuses = ('status', 'scope', 'semantic_status', 'category',
                'residual_category', 'open_obligations',
                'transitive_data_equivalence_proven')
    matches = ('candidate_matches', 'call_consistent_candidates',
               'fresh_normalized_matches', 'normalized_candidate_indices',
               'raw_candidate_indices')
    for program, suffix in suffixes.items():
        binding = index['programs'][program]
        assert digest(root / binding['original_path']) == binding['original_sha256']
        assert digest(root / binding['candidate_path']) == binding['candidate_sha256']
        ledgers = [row for row in binding['full_ledger_files']
                   if row['path'].endswith('/' + suffix)]
        assert len(ledgers) == 1, (program, ledgers)
        ledger = ledgers[0]
        assert digest(root / ledger['path']) == ledger['sha256']
        rows, pointer = windows(program, read(root / ledger['path']))
        counts[program] = len(rows)
        for number, row in enumerate(rows):
            start, end = row['start'], row['end']
            assert isinstance(start, int) and isinstance(end, int) and start < end
            tasks.append({
                'id': f'{program}:original:{start}:{end}',
                'program': program,
                'original_start': start,
                'original_end': end,
                'ledger_path': ledger['path'],
                'ledger_sha256': ledger['sha256'],
                'ledger_json_pointer': pointer + '/' + str(number),
                'original_classification': {key: row[key] for key in statuses if key in row},
                'local_match_evidence': {key: row[key] for key in matches if key in row},
                'acceptance': 'Whole-program byte identity remains unresolved. Local '
                              'matches do not close transitive calls/data, provenance or security.',
                'execution_policy': 'Preserve the originating ledger scope and all stopped '
                                    'execution exclusions. This inventory grants no new execution scope.',
            })
    result = {
        'scope': 'Every original window in the five authenticated current ledgers, '
                 'including matched, unmatched, ambiguous and opaque rows. '
                 'Window boundaries are not proof of historical function boundaries. '
                 'Non-text and uncatalogued regions remain in the complete byte-range ledger.',
        'index_sha256': digest(args.index),
        'window_counts': counts,
        'total_window_records': len(tasks),
        'target_executions': 0,
        'completion_percentage': None,
        'tasks': tasks,
    }
    with args.output.open('xb') as stream:
        stream.write(gzip.compress((json.dumps(result, separators=(',', ':')) + '\n').encode(), mtime=0))
    print(json.dumps({key: result[key] for key in
                      ('window_counts', 'total_window_records', 'target_executions')}))


if __name__ == '__main__':
    main()
