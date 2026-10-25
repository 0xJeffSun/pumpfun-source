#!/usr/bin/env python3
"""Exhaustive static window inventory. Never executes or changes ELF bytes."""
from pathlib import Path
import collections
import hashlib
import json
import re
import struct

from elf_reader import Elf
from dependency_reader import dependencies

W = Path(__file__).resolve().parent
sha = lambda b: hashlib.sha256(b).hexdigest()
read = lambda p: json.loads(p.read_text())


def identity(e):
    return dict(sha256=sha(e.b), bytes=len(e.b), text_start=e.lo,
                text_end=e.hi, text_bytes=e.hi-e.lo,
                text_sha256=sha(e.b[e.lo:e.hi]))


def pattern_key(e, start, size):
    return (size, sha(e.normalized[start:start+size]),
            json.dumps(e.pattern(start, size), sort_keys=True))


def window(e, start, end):
    return dict(start=start, end=end, bytes=end-start,
                raw_sha256=sha(e.b[start:end]),
                normalized_sha256=sha(e.normalized[start:end]),
                relocation_pattern=e.pattern(start, end-start),
                dependencies=dependencies(e, start, end))


def catalogue(candidate, symbols):
    O = Elf(W/'inputs/original.so')
    C, S = Elf(candidate), Elf(symbols)
    assert C.lo == S.lo and C.hi == S.hi
    assert C.b[C.lo:C.hi] == S.b[S.lo:S.hi]
    assert C.relocations == S.relocations
    original = []
    strict = collections.defaultdict(list)
    all_windows = collections.defaultdict(list)
    for i, start in enumerate(O.entries):
        end = O.entries[i+1] if i+1 < len(O.entries) else O.hi
        row = window(O, start, end)
        row['entry_bounded'] = i+1 < len(O.entries)
        row['boundary_basis'] = ('next inferred direct-call/relocation/symbol entry'
                                 if row['entry_bounded'] else 'terminal text end; no next inferred entry')
        row['historical_function_name'] = None
        k = pattern_key(O, start, end-start)
        all_windows[k].append(start)
        if row['entry_bounded']:
            strict[k].append(start)
        original.append(row)
    assert original[0]['start'] == O.lo
    assert sum(r['bytes'] for r in original) == O.hi-O.lo
    om = {r['start']: r for r in original}
    groups = collections.defaultdict(set)
    for f in S.funcs:
        if f['size'] >= 8:
            groups[f['start'], f['size']].add(f['name'])
    candidates = []
    for (start, size), names in sorted(groups.items()):
        row = window(C, start, start+size)
        row['names'] = sorted(names)
        row['name_basis'] = 'current candidate symbol ELF only; no name assigned to original'
        row['matches'] = [dict(start=o, raw_equal=C.b[start:start+size] == O.b[o:o+size],
                               normalized_equal=True, size_equal=True, relocation_pattern_equal=True)
                          for o in strict[pattern_key(C, start, size)]]
        row['terminal_matches_excluded_from_strict_index'] = [
            dict(start=o, end=o+size, bytes=size, raw_equal=C.b[start:start+size] == O.b[o:o+size],
                 normalized_equal=True, relocation_pattern_equal=True,
                 reason='terminal original window; text boundary only')
            for o in all_windows[pattern_key(C, start, size)] if not om[o]['entry_bounded']]
        candidates.append(row)
    assert candidates[0]['start'] == C.lo and candidates[-1]['end'] == C.hi
    assert all(a['end'] == b['start'] for a, b in zip(candidates, candidates[1:]))
    assert sum(r['bytes'] for r in candidates) == C.hi-C.lo
    cm = {r['start']: r for r in candidates}
    unique = {r['start']: r['matches'][0]['start'] for r in candidates if len(r['matches']) == 1}

    # Matching dimension inventories retain all size-only alternatives. Size alone
    # never establishes correspondence. The terminal is included only in these
    # explicitly supplemental lists, never in the inherited strict match index.
    for rows, other in [(candidates, original), (original, candidates)]:
        sizes = collections.defaultdict(list)
        norms = collections.defaultdict(list)
        raws = collections.defaultdict(list)
        for r in other:
            sizes[r['bytes']].append(r['start'])
            norms[r['bytes'], r['normalized_sha256']].append(r['start'])
            raws[r['bytes'], r['raw_sha256']].append(r['start'])
        for r in rows:
            r['same_size_other_starts_not_correspondence'] = sizes[r['bytes']]
            r['normalized_bytes_equal_other_starts_including_terminal'] = norms[r['bytes'], r['normalized_sha256']]
            r['raw_bytes_equal_other_starts_including_terminal'] = raws[r['bytes'], r['raw_sha256']]

    call_residuals = []
    for row in candidates:
        for pair in row['matches']:
            od = {d['offset']: d for d in om[pair['start']]['dependencies']['direct']}
            assert set(od) == {d['offset'] for d in row['dependencies']['direct']}
            calls = []
            for d in row['dependencies']['direct']:
                o = od[d['offset']]
                target = cm.get(d['target'])
                possible = [m['start'] for m in target['matches']] if target else []
                terminal = [m for m in target['terminal_matches_excluded_from_strict_index']
                            if m['start'] == o['target']] if target else []
                supported = o['target'] in possible
                conflict = d['target'] in unique and unique[d['target']] != o['target']
                status = ('immediate_target_window_pattern_supported' if supported else
                          'terminal_boundary_only_match' if terminal else
                          'unique_target_pattern_points_elsewhere' if conflict else
                          'immediate_target_window_unresolved')
                p = dict(offset=d['offset'], candidate_call=d, original_call=o,
                         candidate_target_names=target['names'] if target else [],
                         possible_original_targets=possible,
                         target_body_supported=supported, unique_contradiction=conflict,
                         terminal_target_matches=terminal, status=status,
                         transitive_closure_proven=False)
                calls.append(p)
                if not supported:
                    call_residuals.append(dict(candidate_window=row['start'], original_window=pair['start'], **p))
            pair['calls'] = calls
            pair['all_direct_bodies_supported'] = all(p['target_body_supported'] for p in calls)
            pair['unique_calls_consistent'] = not any(p['unique_contradiction'] for p in calls)
        row['status'] = ('normalized_call_consistent' if any(p['unique_calls_consistent'] for p in row['matches'])
                         else 'call_conflict' if row['matches'] else 'unmatched')
        row['strict_match_ambiguous'] = len(row['matches']) > 1
        row['transitive_data_equivalence_proven'] = False
        for d in row['dependencies']['direct']:
            t = cm.get(d['target'])
            d['target_symbol_window_start'] = t['start'] if t else None
            d['target_candidate_names'] = t['names'] if t else []

    for row in original:
        row['candidate_matches'] = []
        for c in candidates:
            for p in c['matches']:
                if p['start'] == row['start']:
                    row['candidate_matches'].append(dict(
                        candidate_start=c['start'], candidate_end=c['end'], candidate_bytes=c['bytes'],
                        candidate_names=c['names'], raw_equal=p['raw_equal'], normalized_equal=True,
                        size_equal=True, relocation_pattern_equal=True,
                        unique_calls_consistent=p['unique_calls_consistent'],
                        all_direct_bodies_supported=p['all_direct_bodies_supported'],
                        unresolved_call_offsets=[q['offset'] for q in p['calls'] if not q['target_body_supported']]))
        row['status'] = ('mapped_pattern' if any(p['unique_calls_consistent'] for p in row['candidate_matches'])
                         else 'call_conflict' if row['candidate_matches'] else 'unattributed')
        row['strict_match_ambiguous'] = len(row['candidate_matches']) > 1
        row['transitive_data_equivalence_proven'] = False
    for row in original:
        for d in row['dependencies']['direct']:
            target = om.get(d['target'])
            d['target_inferred_window_start'] = target['start'] if target else None
            d['target_candidate_patterns'] = [p['candidate_start'] for p in target['candidate_matches']] if target else []
            d['target_consistent_candidate_patterns'] = [p['candidate_start'] for p in target['candidate_matches'] if p['unique_calls_consistent']] if target else []
            d['transitive_closure_proven'] = False

    summary = dict(
        candidate_ranges=len(candidates), candidate_text_bytes=C.hi-C.lo,
        original_ranges=len(original), original_text_bytes=O.hi-O.lo,
        candidate_ranges_at_least_16=sum(r['bytes'] >= 16 for r in candidates),
        candidate_status=dict(collections.Counter(r['status'] for r in candidates)),
        original_status=dict(collections.Counter(r['status'] for r in original)),
        raw_equal_candidate_ranges=sum(any(p['raw_equal'] for p in r['matches']) for r in candidates),
        all_direct_supported_candidate_ranges=sum(any(p['all_direct_bodies_supported'] for p in r['matches']) for r in candidates),
        ambiguous_candidate_ranges=sum(r['strict_match_ambiguous'] for r in candidates),
        ambiguous_original_ranges=sum(r['strict_match_ambiguous'] for r in original),
        strict_pairs=sum(len(r['matches']) for r in candidates),
        immediate_call_pairs=sum(len(p['calls']) for r in candidates for p in r['matches']),
        immediate_call_residuals=len(call_residuals),
        immediate_call_residual_status=dict(collections.Counter(r['status'] for r in call_residuals)),
        terminal_supplemental_pairs=sum(len(r['terminal_matches_excluded_from_strict_index']) for r in candidates),
        candidate_indirect_calls=sum(len(r['dependencies']['indirect']) for r in candidates),
        original_indirect_calls=sum(len(r['dependencies']['indirect']) for r in original),
        candidate_relocated_targets=sum(len(r['dependencies']['relocated_targets']) for r in candidates),
        original_relocated_targets=sum(len(r['dependencies']['relocated_targets']) for r in original))
    consistent_pairs = [(r, p) for r in candidates for p in r['matches'] if p['unique_calls_consistent']]
    summary['consistent_pairs'] = len(consistent_pairs)
    summary['residual_calls_within_consistent_pairs'] = sum(not q['target_body_supported'] for r, p in consistent_pairs for q in p['calls'])
    summary['consistent_candidate_ranges_without_all_immediate_targets'] = sum(
        r['status'] == 'normalized_call_consistent' and not any(p['all_direct_bodies_supported'] for p in r['matches']) for r in candidates)
    return dict(inputs=dict(original=identity(O), candidate=identity(C), symbols=identity(S)),
                summary=summary, candidate_rows=candidates, original_rows=original,
                immediate_call_residuals=call_residuals,
                limits=[
                    'Every original inferred row and every candidate symbol window is retained.',
                    'Offsets are ELF file offsets and ends are exclusive; text addresses equal file offsets in these inputs.',
                    'Original windows are inferred metadata intervals, not debug-symbol functions or historical names.',
                    'Size-only alternatives never establish correspondence; all ambiguity is retained.',
                    'Strict matching uses equal size, normalized bytes and relocation pattern; no next-entry terminal window enters that index.',
                    'Normalization masks only signed internal call immediates and relocated call/LDDW immediates in memory.',
                    'Unique-call consistency means no unique immediate-target contradiction; it is weaker than all direct target windows supported.',
                    'No recursive or whole-program code/data/behavior equivalence is claimed.',
                    'Pointer extents, indirect calls and external syscall semantics remain unresolved.',
                    'No compilation, execution, new fixture, source change, compiler search or business-logic proposal.'])


def prior_projection_check(fresh):
    """Require the new generic method to reproduce every comparable prior row."""
    old = read(W/'inputs/prior/catalog.json')
    for a, b in zip(fresh['candidate_rows'], old['candidate_rows'], strict=True):
        for field in ['start', 'end', 'bytes', 'names', 'raw_sha256', 'status']:
            assert a[field] == b[field], ('prior candidate', a['start'], field)
        assert len(a['matches']) == len(b['matches'])
        for p, q in zip(a['matches'], b['matches'], strict=True):
            for field in ['start', 'raw_equal', 'all_direct_bodies_supported', 'unique_calls_consistent']:
                assert p[field] == q[field], ('prior match', a['start'], field)
            assert len(p['calls']) == len(q['calls'])
            for x, y in zip(p['calls'], q['calls'], strict=True):
                for f in ['offset', 'possible_original_targets', 'target_body_supported', 'unique_contradiction']:
                    assert x[f] == y[f]
                assert x['candidate_call']['target'] == y['candidate_target']
                assert x['original_call']['target'] == y['original_target']
    for a, b in zip(fresh['original_rows'], old['original_rows'], strict=True):
        for field in ['start', 'end', 'bytes', 'entry_bounded', 'raw_sha256', 'status']:
            assert a[field] == b[field], ('prior original', a['start'], field)
        assert [(p['candidate_start'], p['raw_equal'], p['unique_calls_consistent']) for p in a['candidate_matches']] == [
            (p['candidate_start'], p['raw_equal'], p['unique_calls_consistent']) for p in b['candidate_matches']]
    return dict(prior_all_candidate_rows_reproduced=len(old['candidate_rows']),
                prior_all_original_rows_reproduced=len(old['original_rows']),
                prior_all_pair_and_immediate_call_results_reproduced=True,
                unused_prior_fields=['published_call_consistent (separate older whole-text matcher convention)',
                                     'baseline_correspondences (historical source-name leads)',
                                     'leads (no similarity/source proposal generated here)'])


def compare(current, prior):
    check = prior_projection_check(prior)
    rows = []
    for c, p in zip(current['original_rows'], prior['original_rows'], strict=True):
        assert all(c[k] == p[k] for k in ['start', 'end', 'bytes', 'raw_sha256', 'normalized_sha256'])
        def outcome(r):
            return dict(status=r['status'], candidate_matches=r['candidate_matches'],
                        ambiguous=r['strict_match_ambiguous'],
                        raw_equal_any=any(m['raw_equal'] for m in r['candidate_matches']),
                        all_direct_bodies_supported_any=any(m['all_direct_bodies_supported'] for m in r['candidate_matches']))
        before, after = outcome(p), outcome(c)
        rows.append(dict(original_start=c['start'], original_end=c['end'], original_bytes=c['bytes'],
                         original_raw_sha256=c['raw_sha256'], prior=before, current=after,
                         status_transition=before['status']+' -> '+after['status'],
                         raw_equal_change=before['raw_equal_any'] != after['raw_equal_any'],
                         immediate_support_change=before['all_direct_bodies_supported_any'] != after['all_direct_bodies_supported_any']))
    return dict(prior_candidate=prior['inputs']['candidate'], current_candidate=current['inputs']['candidate'],
                original=current['inputs']['original'], prior_method_reproduction=check,
                prior_summary=prior['summary'], current_summary=current['summary'],
                transitions=dict(collections.Counter(r['status_transition'] for r in rows)),
                changed_status_original_starts=[r['original_start'] for r in rows if r['prior']['status'] != r['current']['status']],
                original_rows=rows,
                limits=['Same original row denominator; same strict matching method freshly applied to both candidates.',
                        'Source moves and layout changes can change addresses, inlining and boundary matches; no semantic recovery percentage.',
                        'Candidate names belong only to their own symbol ELF; no original name is inferred from size or shape.'])


def changed_window_evidence(current, prior, comparison):
    """Record exact changed slots for prior symbol correspondences, not source hypotheses."""
    O = Elf(W/'inputs/original.so')
    C = Elf(W/'inputs/current/pump_fees_candidate.so')
    canonical = lambda n: re.sub(r'17h[0-9a-f]{16}E$', 'E', n)
    names = collections.defaultdict(list)
    for r in current['candidate_rows']:
        for n in {canonical(n) for n in r['names']}:
            names[n].append(r)
    cm = {r['start']: r for r in current['candidate_rows']}
    om = {r['start']: r for r in current['original_rows']}
    output = []
    for r in comparison['original_rows']:
        if r['prior']['status'] == r['current']['status']:
            continue
        candidates = {p['candidate_start']: cm[p['candidate_start']] for p in r['current']['candidate_matches']}
        for p in r['prior']['candidate_matches']:
            for n in p['candidate_names']:
                for c in names[canonical(n)]:
                    candidates[c['start']] = c
        pairs = []
        for c in candidates.values():
            a, b, n = c['start'], r['original_start'], c['bytes']
            same_size = n == r['original_bytes']
            differences = [dict(offset=i, candidate_raw_hex=C.b[a+i:a+i+8].hex(),
                                original_raw_hex=O.b[b+i:b+i+8].hex(),
                                candidate_normalized_hex=C.normalized[a+i:a+i+8].hex(),
                                original_normalized_hex=O.normalized[b+i:b+i+8].hex())
                           for i in range(0, n, 8) if C.normalized[a+i:a+i+8] != O.normalized[b+i:b+i+8]] if same_size else None
            od = {d['offset']: d for d in om[b]['dependencies']['direct']}
            calls = []
            for call in c['dependencies']['direct']:
                other = od.get(call['offset'])
                target = cm.get(call['target'])
                possible = [p['start'] for p in target['matches']] if target else []
                calls.append(dict(candidate=call, original=other, possible_original_targets=possible,
                                  target_pattern_supported=other is not None and other['target'] in possible))
            pairs.append(dict(candidate_start=a, candidate_bytes=n, candidate_names=c['names'],
                              correspondence_basis='current strict pattern or prior match followed by same candidate symbol spelling ignoring Rust hash; never historical function-name proof',
                              size_equal=same_size, relocation_pattern_equal=C.pattern(a,n) == O.pattern(b,r['original_bytes']),
                              normalized_differences=differences, direct_calls=calls,
                              all_immediate_call_patterns_supported=bool(same_size) and len(calls) == len(od) and all(p['target_pattern_supported'] for p in calls),
                              data_extents_and_semantics_proven=False))
        output.append(dict(original_start=r['original_start'], original_end=r['original_end'], original_bytes=r['original_bytes'],
                           status_transition=r['status_transition'], candidate_comparisons=pairs))
    return dict(rows=output, limits=['No original function names are assigned.',
                                    'Symbol-spelling correspondence is labeled and does not establish source or semantic identity.',
                                    'Changed immediates are recorded without source-operation or business-logic inference.'])


def run():
    current = catalogue(W/'inputs/current/pump_fees_candidate.so', W/'inputs/current/symbols.so')
    prior = catalogue(W/'inputs/prior/candidate.so', W/'inputs/prior/symbols.so')
    assert current['inputs']['candidate']['sha256'] == '8f89dbeb0eaef9490a518a97adb50dd8cbf0a21984a2bfca343d6ff5c2fe6c8e'
    assert prior['inputs']['candidate']['sha256'] == 'e501ca2c744373e5653a5ac7e25a3fd20f6058765808b888c3605fd03adba60f'
    assert current['inputs']['original']['sha256'] == '4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e'
    comparison = compare(current, prior)
    changed = changed_window_evidence(current, prior, comparison)
    residuals = dict(candidate_rows=[r for r in current['candidate_rows'] if r['status'] != 'normalized_call_consistent'],
                     original_rows=[r for r in current['original_rows'] if r['status'] != 'mapped_pattern'],
                     immediate_call_residuals=current['immediate_call_residuals'],
                     limits=current['limits'])
    return {'catalog.json': current, 'prior-same-method-summary.json': prior['summary'],
            'comparison.json': comparison, 'residuals.json': residuals,
            'changed-window-evidence.json': changed}


if __name__ == '__main__':
    results = run()
    for filename, content in results.items():
        (W/filename).write_text(json.dumps(content, indent=2)+'\n')
    print(json.dumps(results['catalog.json']['summary'], indent=2))
    print(json.dumps(results['comparison.json']['transitions'], indent=2))
