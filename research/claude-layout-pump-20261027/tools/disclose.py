"""Disclosure statistics for one layout plan (the correspondence is a hypothesis).

The function correspondence behind a layout is not authenticated original
attribution. These figures state how much of it rests on what evidence, so
they are recorded per round and recomputed by verify.py.
"""
import sys
sys.dont_write_bytecode = True  # keep the packet free of __pycache__
import collections


def disclose(sections, baseline_inventory):
    rows = [s for s in sections if s['original'] is not None]
    assigned = [s for s in rows if s['normalized_equal']]
    counterparts = [s for s in rows if not s['normalized_equal']]
    normalized = {w['start'] for w in baseline_inventory['windows'] if w['normalized_matches']}
    unassigned = sorted(normalized - {s['original'] for s in assigned})
    # owners of the nearest placed neighbours, in original order
    def region(i):
        owners = set()
        for rng in (range(i - 1, -1, -1), range(i + 1, len(rows))):
            for j in rng:
                if rows[j]['normalized_equal'] and rows[j]['basis'] == 'unique normalized body':
                    owners.add(rows[j]['owner'])
                    break
        return owners
    outside = [{'original': s['original'], 'owner': s['owner'], 'symbol': s['symbol'], 'basis': s['basis']}
               for i, s in enumerate(rows) if s['normalized_equal'] and s['owner'] not in region(i)]
    return {
        'normalized_windows': len(normalized),
        'injective_assignments': len(assigned),
        'normalized_windows_without_assignment': unassigned,
        'assignment_basis': dict(sorted(collections.Counter(s['basis'] for s in assigned).items())),
        'counterpart_placements': len(counterparts),
        'counterparts_size_mismatched': sum(s['bytes'] != s['original_bytes'] for s in counterparts),
        'counterpart_basis': dict(sorted(collections.Counter(s['basis'].split(',')[0] for s in counterparts).items())),
        'position_fallback_placements': [{'original': s['original'], 'owner': s['owner'], 'symbol': s['symbol']}
                                         for s in assigned if s['basis'] == 'nearest equal body'],
        'assigned_outside_neighbouring_objects': len(outside),
        'trailing_unplaced_sections': sum(s['original'] is None for s in sections),
    }
