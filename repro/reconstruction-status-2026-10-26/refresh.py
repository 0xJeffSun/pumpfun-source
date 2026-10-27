#!/usr/bin/env python3
"""Recompute the post-burn-recovery inventory; never changes selected checkpoints."""
import argparse
import collections
import csv
import gzip
import hashlib
import importlib.util
import io
import json
from pathlib import Path
import tempfile

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
INPUTS = {}
REVISION = '8d223468ecf3a0be208c144df666faa104c8d8e9'
FEES = 'research/fees-current-558-integration'
RELAY = 'repro/donation-relay/linked-elf-reproduction'


def read(name):
    raw = (ROOT / name).read_bytes()
    INPUTS[name] = hashlib.sha256(raw).hexdigest()
    return raw


def load(name):
    raw = read(name)
    return json.loads(gzip.decompress(raw) if name.endswith('.gz') else raw)


def module(name, path):
    read(path)
    spec = importlib.util.spec_from_file_location(name, ROOT / path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


def name(symbol):
    """Display-only decoding, never used to choose a match."""
    s = symbol.removeprefix('_')
    if not s.startswith('ZN'):
        return symbol
    s, parts = s[2:], []
    while s and s[0].isdigit():
        n = 0
        while n < len(s) and s[n].isdigit():
            n += 1
        length, s = int(s[:n]), s[n:]
        parts.append(s[:length])
        s = s[length:]
    if parts and parts[-1].startswith('h') and len(parts[-1]) == 17:
        parts.pop()
    result = '::'.join(parts) or symbol
    for old, new in {'$LT$': '<', '$GT$': '>', '$u20$': ' ', '$RF$': '&', '$C$': ',', '$LP$': '(', '$RP$': ')', '$u27$': "'", '..': '::'}.items():
        result = result.replace(old, new)
    return result


def row(program, original, raw, normalized, source):
    return dict(program=program, variant='research', original_start=original['address'],
                original_end=original['address'] + original['bytes'], bytes=original['bytes'],
                disposition='raw_body_equal' if raw else 'normalized_body_only' if normalized else 'no_complete_body_match',
                candidate_names=sorted({name(c['name']) for c in raw + normalized if c.get('name')}),
                raw_candidate_names=sorted({name(c['name']) for c in raw if c.get('name')}),
                raw_candidate_starts=sorted({c['address'] for c in raw}),
                normalized_candidate_starts=sorted({c['address'] for c in normalized}),
                source_status='unique_structural_pair' if len(normalized) == 1 and original.get('unique') else 'ambiguous_or_unattributed',
                source_ledger=source)


def generate():
    INPUTS.clear()
    read(str(Path(__file__).relative_to(ROOT)))
    read('scripts/analyze.py')
    baseline = load('repro/reconstruction-audit-2026-10-26/audit.json')
    selected = {(r['program'], r['original_start']): r for r in baseline['windows'] if r['variant'] == 'selected'}
    reader = csv.DictReader(io.StringIO(read('repro/reconstruction-audit-2026-10-26/functions.tsv').decode()), delimiter='\t')
    rows = []
    for r in reader:
        if r['variant'] != 'selected' or r['program'] == 'donation_relay':
            continue
        for key in ('original_start', 'original_end', 'bytes'):
            r[key] = int(r[key])
        for key in ('candidate_names', 'raw_candidate_starts', 'normalized_candidate_starts'):
            r[key] = json.loads(r[key])
        r['raw_candidate_names'] = selected[r['program'], r['original_start']]['raw_candidate_names']
        rows.append(r)
    assert len(rows) == 2846

    wm = module('status_fee_windows', 'research/fees-composed-frontier188/window_map.py')
    read('research/fees-composed-frontier188/elf_helpers.py')
    original = read('evidence/original/pump_fees/deployed.so')
    symbols = gzip.decompress(read(FEES + '/artifacts/candidate-symbols.so.gz'))
    candidate = gzip.decompress(read(FEES + '/artifacts/candidate-candidate.so.gz'))
    ow, cw = wm.windows(original), wm.windows(symbols)
    comparison = wm.compare(ow, cw)
    saved = load(FEES + '/summary.json')
    assert len(comparison['unique_pairs']) == saved['unique_pairs'] == 411
    assert len(comparison['unmatched_original']) == 27
    assert sum(o['signature'] in {c['signature'] for c in cw} for o in ow) == saved['normalized'] == 558
    build = load(FEES + '/builds/candidate/result.json')['artifacts']
    assert hashlib.sha256(candidate).hexdigest() == build['candidate.so']['sha256']
    assert hashlib.sha256(symbols).hexdigest() == build['symbols.so']['sha256']
    raw_index, normalized_index = collections.defaultdict(list), collections.defaultdict(list)
    for c in cw:
        raw_index[c['raw_sha256']].append(c)
        normalized_index[c['signature']].append(c)
    unique = {r['original']['address'] for r in comparison['unique_pairs']}
    for o in ow:
        o['unique'] = o['address'] in unique
        rows.append(row('pump_fees_research', o, raw_index[o['raw_sha256']], normalized_index[o['signature']], FEES + '/summary.json'))
    fees_meta = dict(candidate_sha256=hashlib.sha256(candidate).hexdigest(), candidate_bytes=len(candidate),
                     whole_capture_equal=candidate == original,
                     raw_file_equals_original_elf_extent=candidate == original[:wm.m.elf_layout(original)['elf_extent']],
                     unique_structural_pairs=411, ambiguous_original_windows=sum(len(g['original']) for g in comparison['ambiguous']),
                     candidate_windows=len(cw))

    attribution_path = 'research/fees-refreshed-call-attribution'
    attribution_module = module('status_fee_attribution', attribution_path + '/attribute.py')
    for filename in ['window_map.py', 'elf_helpers.py', 'input-provenance.json']:
        read(attribution_path + '/' + filename)
    provenance = dict(files={key: dict(path='../../' + FEES + '/artifacts/candidate-' + suffix + '.so.gz',
                                      bytes=len(data), sha256=hashlib.sha256(data).hexdigest())
                             for key, suffix, data in [('candidate', 'candidate', candidate), ('symbols', 'symbols', symbols)]})
    attribution = attribution_module.analyze(provenance)
    assert attribution['candidate_sha256'] == fees_meta['candidate_sha256']
    attributed = {pair['original']['address']: pair['candidate']['address'] for pair in attribution['newly_attributed_pairs']}
    assert len(attributed) == 69 and attribution['graph_attributed_pairs'] == 480
    for record in rows:
        record['call_attributed_candidate_starts'] = []
        if record['program'] == 'pump_fees_research' and record['original_start'] in attributed:
            address = attributed[record['original_start']]
            assert address in record['normalized_candidate_starts']
            record['call_attributed_candidate_starts'] = [address]
            record['source_status'] = 'call_attributed_duplicate_pair'
    fees_meta.update(additional_call_attributed_pairs=69, total_attributed_pairs=480,
                     remaining_unattributed_duplicate_windows=78)

    parser = module('status_relay_windows', 'repro/donation-relay/swap-receipt-coordinate-recovery/analyze.py')
    relay_artifacts = load(RELAY + '/metadata.json')['variants']['recovered']['artifacts']
    with tempfile.TemporaryDirectory() as temp:
        d = Path(temp)
        for output, path, compressed in [
            ('original.so', 'evidence/dependencies/donation_relay/deployed.so', False),
            ('candidate.so', RELAY + '/' + relay_artifacts['candidate']['path'], True),
            ('unstripped.so', RELAY + '/' + relay_artifacts['symbols']['path'], True),
            ('original-windows.json', 'repro/donation-relay/swap-receipt-coordinate-recovery/original-windows.json', False),
        ]:
            raw = read(path)
            (d / output).write_bytes(gzip.decompress(raw) if compressed else raw)
        exact_original = (d / 'original.so').read_bytes()
        exact_candidate = (d / 'candidate.so').read_bytes()
        assert exact_candidate == exact_original[:818280] and len(exact_candidate) == 818280
        assert len(exact_original) == 830448 and not any(exact_original[818280:])
        analysis = parser.analyze(d)
    assert analysis['comparison-summary.json'] == load(RELAY + '/analysis/recovered/comparison-summary.json')
    assert analysis['match-ledger.json'] == load(RELAY + '/analysis/recovered/match-ledger.json')
    loader_receipt = load(RELAY + '/loader-receipt.json')
    assert loader_receipt['elf_sha256'] == hashlib.sha256(exact_candidate).hexdigest()
    assert loader_receipt['payload_sha256'] == hashlib.sha256(exact_original).hexdigest()
    assert loader_receipt['whole_original_payload_equal'] and loader_receipt['transactions'] == 912
    relay_runtime = load(RELAY + '/runtime.json.gz')
    assert relay_runtime['candidate_sha256'] == hashlib.sha256(exact_candidate).hexdigest()
    assert relay_runtime['case_count'] == 536 and not relay_runtime['failures']
    current_relay = load('repro/donation-relay/current.json')
    selected_relay = load('programs/donation-relay/source-selected.json')
    transition = load('repro/donation-relay/canonical-exact-selection/transition.json')
    assert current_relay['meaningful_elf_equal'] and current_relay['loader_payload_equal']
    assert read(current_relay['candidate_artifact']) == exact_candidate
    assert selected_relay['source_inputs'] == transition['new']['source']['files']
    for name, digest in selected_relay['source_inputs'].items():
        assert hashlib.sha256(read('programs/donation-relay/' + name)).hexdigest() == digest
    canonical_rows = []
    multiplicity = collections.Counter(o['normalized_sha256'] for o in analysis['original-function-ledger.json'])
    for o, r in zip(analysis['original-function-ledger.json'], analysis['match-ledger.json']):
        c = analysis['candidate-function-ledger.json']
        convert = lambda indices: [dict(address=c[i]['start'], name=n) for i in indices for n in (c[i]['names'] or [''])]
        record = row('donation_relay_research', dict(address=o['start'], bytes=o['bytes'], unique=multiplicity[o['normalized_sha256']] == 1 and len(r['normalized_candidate_indices']) == 1),
                     convert(r['raw_candidate_indices']), convert(r['normalized_candidate_indices']), RELAY + '/analysis/recovered/match-ledger.json')
        rows.append(record)
        canonical_rows.append(dict(record, program='donation_relay', variant='selected', source_ledger='repro/donation-relay/canonical-exact-selection/transition.json'))
    rows[2846:2846] = canonical_rows
    for record in rows:
        record.setdefault('call_attributed_candidate_starts', [])
    counts = {}
    for program in dict.fromkeys(r['program'] for r in rows):
        group = [r for r in rows if r['program'] == program]
        counts[program] = dict(windows=len(group), dispositions=dict(collections.Counter(r['disposition'] for r in group)),
                               body_bytes=sum(r['bytes'] for r in group),
                               unmatched_body_bytes=sum(r['bytes'] for r in group if r['disposition'] == 'no_complete_body_match'))
    assert len(rows) == 4415
    report = dict(snapshot=REVISION, selected_snapshot=baseline['audited_revision'], canonical_relay_selection=current_relay, counts=counts,
                  fees=fees_meta, relay=dict(analysis['comparison-summary.json'], meaningful_elf_equal=True, meaningful_elf_bytes=818280, allocation_tail_bytes=12168, reconstructed_linker_layout=True, historical_recipe_verified=False, loader_payload_equal=True, loader_transactions=912, verified_replay_records=536, static_parser_runtime_fields_are_not_execution_results=True),
                  selected_handler_dispositions=dict(collections.Counter(r['selected_status'] for r in baseline['handlers'])),
                  input_sha256=dict(sorted(INPUTS.items())),
                  scope='Local body equality and separately scoped normalized windows; no semantic-perfection, transitive identity, selection promotion or effort-percentage claim.')
    fields = list(rows[0])
    output = io.StringIO(newline='')
    writer = csv.DictWriter(output, fields, delimiter='\t', lineterminator='\n')
    writer.writeheader()
    for r in rows:
        writer.writerow({k: json.dumps(v) if isinstance(v, list) else v for k, v in r.items()})
    generated = {'fees-call-attribution.json': json.dumps(attribution, indent=2, sort_keys=True) + '\n', 'functions.tsv': output.getvalue(), 'status.json': json.dumps(report, indent=2, sort_keys=True) + '\n'}
    overview = ['# Current function-window inventory', '', f'Evidence snapshot: `{REVISION}`. Core selected inputs retain `{baseline["audited_revision"]}` bindings. Canonical Relay now selects the exact 60-input reconstruction; the older Relay selection remains in the historical audit. Research rows remain separately labeled alternatives.', '',
                '| Program / build | Windows | Exact local bytes | Normalized only | No complete match | Opaque |',
                '| --- | ---: | ---: | ---: | ---: | ---: |']
    for program, c in counts.items():
        d = c['dispositions']
        overview.append(f'| {program} | {c["windows"]} | {d.get("raw_body_equal", 0)} | {d.get("normalized_body_only", 0)} | {d.get("no_complete_body_match", 0)} | {d.get("opaque_unassessed", 0)} |')
    fees_extra = attribution['graph_attributed_pairs'] - attribution['body_unique_pairs']
    overview += ['', f'Fees has {attribution["body_unique_pairs"]} body-unique pairs plus {fees_extra} additional call-attributed duplicate pairs ({attribution["graph_attributed_pairs"]} correspondences); {fees_meta["remaining_unattributed_duplicate_windows"]} duplicate windows remain unattributed. These are not {fees_extra} additional body matches. Rows count inferred original windows, not unique source functions or effort. Raw matches may be duplicate/ambiguous and do not establish referenced data or transitive callees. The Fees matcher and Relay matcher use separately documented masks; do not add their counts into a source-completion score.', '',
                 '- [Comprehensive review: all handlers, unresolved text size and closure criteria](review.md)',
                 '- [Every window, symbol candidate, match address and evidence path](functions.tsv)',
                 '- [Every exact local body match](raw-body-matches.md)',
                 '- [Every unmatched or opaque window](remaining-windows.md)',
                 '- [All 150 public-handler dispositions](../reconstruction-audit-2026-10-26/handlers.md)',
                 '- [Counts, candidate hashes and input hashes](status.json)', '',
                 'Verify: `python3 -B repro/reconstruction-status-2026-10-26/refresh.py --check`. This re-reads binaries and checks the declared masks; it does not compile or execute target programs. Also run the parent audit and both owning research verifiers to check source bindings, retained runtime receipts and selected artifacts.']
    generated['README.md'] = '\n'.join(overview) + '\n'
    for filename, title, predicate in [
        ('raw-body-matches.md', 'Every exact local body match', lambda r: r['disposition'] == 'raw_body_equal'),
        ('remaining-windows.md', 'Every unmatched or opaque window', lambda r: r['disposition'] in ('no_complete_body_match', 'opaque_unassessed')),
    ]:
        lines = ['# ' + title, '', 'Snapshot and limitations: [inventory](README.md). Addresses are decimal virtual addresses. Candidate names are display labels, not authenticated original symbols. An empty label does not prove the source is absent.', '', '| Program / build | Original start | Bytes | Status | Candidate label(s) |', '| --- | ---: | ---: | --- | --- |']
        for r in rows:
            if predicate(r):
                names = r['raw_candidate_names'] if filename == 'raw-body-matches.md' else r['candidate_names']
                labels = '; '.join(names).replace('|', '\\|').replace('\n', ' ')
                lines.append(f'| {r["program"]} | {r["original_start"]} | {r["bytes"]} | {r["disposition"]} | {labels} |')
        generated[filename] = '\n'.join(lines) + '\n'
    return generated


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--check', action='store_true')
    args = ap.parse_args()
    for filename, value in generate().items():
        path = HERE / filename
        if args.check:
            assert path.read_text() == value, filename
        else:
            path.write_text(value)
    print('PASS: 4,415 window rows; 3,338 selected plus 585 Fees and 492 Relay research rows; complete byte-match and remaining-window inventories')


if __name__ == '__main__':
    main()
