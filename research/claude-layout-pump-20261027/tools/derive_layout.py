#!/usr/bin/env python3
"""Derive an ordered `.text` linker script from the original window order.

Source-agnostic: the only inputs are the original ELF, the fixed original
window boundaries, and the unstripped ELF plus lld map of a default-layout
(passthrough) build of whatever source is current. Re-run it for each new
maintained-source round.

Placement policy (all deterministic; no original byte is a linker input):
  1. every original window with a normalized-equal candidate body gets that
     candidate section (call-consistent, injective correspondence);
  2. an unmatched original window gets an unassigned candidate counterpart when
     there is direct evidence: a matched caller calls it from the same call
     slot, or a same-size body differs in at most half of its instruction slots
     or only in immediates (identical opcode/register/offset skeleton);
  3. sections are emitted in original window order; candidate sections with no
     original counterpart follow in their default order (they cannot be placed
     faithfully, so they are kept out of the matched regions).
The script is the SDK default with only the `.text` input list expanded into
qualified object/archive-member selectors and the original catch-all kept.
"""
import sys
sys.dont_write_bytecode = True  # keep the packet free of __pycache__
import argparse
import collections
import gzip
import hashlib
import json
import struct
from pathlib import Path

import correspond as C
import layout_script
import mapfile

HERE = Path(__file__).resolve().parent
sha = lambda b: hashlib.sha256(b).hexdigest()


def read(p):
    b = Path(p).read_bytes()
    return json.loads(gzip.decompress(b) if b[:2] == b'\x1f\x8b' else b)


def slots(b):
    return struct.unpack('<%dQ' % (len(b) // 8), b)


def region_owners(orig, assign, owner_of, o):
    """Objects of the nearest assigned windows before and after original window o."""
    i = orig.order.index(o)
    owners = set()
    for rng in (range(i - 1, -1, -1), range(i + 1, len(orig.order))):
        for j in rng:
            if orig.order[j] in assign:
                owners.add(owner_of[assign[orig.order[j]]])
                break
    return owners


DEFAULT_POLICY = {'owner_preference': True, 'skeleton_rule': True, 'counterparts': True, 'extras': 'end'}


def counterparts(orig, cand, assign, owner_of, skeleton_rule=True):
    """Evidence-backed counterparts for unmatched original windows."""
    inv = {c: o for o, c in assign.items()}
    free = [c for c in cand.order if c not in inv]
    unmatched = [o for o in orig.order if o not in assign]
    by_size = collections.defaultdict(list)
    for c in free:
        by_size[cand.funcs[c]['bytes']].append(c)
    pairs = []
    for o in unmatched:
        on = slots(orig.funcs[o]['norm'])
        owners = region_owners(orig, assign, owner_of, o)
        for c in by_size.get(orig.funcs[o]['bytes'], []):
            cn = slots(cand.funcs[c]['norm'])
            d = sum(a != b for a, b in zip(on, cn))
            # same instruction skeleton (opcode, registers, offset) in every slot: only immediates
            # differ; accepted only from the object that owns this region of the original
            skeleton = skeleton_rule and all(a & 0xffffffff == b & 0xffffffff for a, b in zip(on, cn)) and owner_of[c] in owners
            if 2 * d <= len(on) or skeleton:
                pairs.append((owner_of[c] not in owners, d / len(on), d, o, c))
    fills, used, basis = {}, set(), {}
    for _, frac, d, o, c in sorted(pairs):
        if o in fills or c in used:
            continue
        fills[o], basis[o] = c, f'same-size body, {d} differing slots'
        if 2 * d > len(slots(orig.funcs[o]['norm'])):
            basis[o] += ' (identical instruction skeleton; immediates differ)'
        used.add(c)
    votes = collections.defaultdict(collections.Counter)
    for o, c in assign.items():
        for t, u in zip(orig.funcs[o]['calls'], cand.funcs[c]['calls']):
            if t in orig.funcs and t not in assign and u not in inv:
                votes[t][u] += 1
    for t in sorted(votes, key=lambda t: (-sum(votes[t].values()), t)):
        if t in fills:
            continue
        for u, n in sorted(votes[t].items(), key=lambda kv: (-kv[1], kv[0])):
            if u not in used:
                fills[t], basis[t] = u, f'called from {n} matched caller slot(s)'
                used.add(u)
                break
    return fills, basis


def plan(original, windows, candidate, link_map, policy=None):
    """Return (ordered sections, counts). `policy` overrides DEFAULT_POLICY (used only by controls)."""
    pol = {**DEFAULT_POLICY, **(policy or {})}
    orig = C.Image(original, windows)
    cand = C.Image(candidate)
    records = {r['address']: r for r in mapfile.parse(link_map) if r['out'] == '.text'}
    assert sorted(records) == cand.order, 'map input sections must tile the candidate functions'
    owner_of = {a: mapfile.owner_pattern(r) for a, r in records.items()}
    assign, basis, dom = C.derive(orig, cand, owner_of if pol['owner_preference'] else None)
    fills, fill_basis = counterparts(orig, cand, assign, owner_of, pol['skeleton_rule']) if pol['counterparts'] else ({}, {})
    rows, placed = [], set()
    for o in orig.order:
        if o in assign:
            c, why = assign[o], basis[o]
        elif o in fills:
            c, why = fills[o], 'counterpart: ' + fill_basis[o]
        else:
            continue
        placed.add(c)
        rows.append((o, c, why))
    extras = [c for c in cand.order if c not in placed]
    sequence = rows + [(None, c, 'no original counterpart (kept after placed sections)') for c in extras]
    if pol['extras'] == 'in_place':
        # control: keep each unplaced section right after its nearest preceding placed neighbour in
        # the default layout instead of after all placed sections
        slot_of = {c: i for i, (o, c, why) in enumerate(rows)}
        after = collections.defaultdict(list)
        prev = None
        for c in cand.order:
            if c in slot_of:
                prev = slot_of[c]
            elif c not in placed:
                after[prev].append(c)
        sequence = [(None, c, 'no original counterpart (kept beside its default-layout neighbour)') for c in after[None]]
        for i, row in enumerate(rows):
            sequence.append(row)
            sequence += [(None, c, 'no original counterpart (kept beside its default-layout neighbour)') for c in after[i]]
    ordered = []
    for o, c, why in sequence:
        r = records[c]
        ordered.append({'original': o, 'original_bytes': orig.funcs[o]['bytes'] if o is not None else None,
                        'candidate': c, 'bytes': r['size'], 'owner': mapfile.owner_pattern(r),
                        'section': r['section'], 'symbol': cand.funcs[c]['names'][0], 'basis': why,
                        'normalized_equal': o is not None and orig.funcs[o]['norm'] == cand.funcs[c]['norm']})
    counts = {'original_windows': len(orig.order), 'candidate_sections': len(cand.order),
              'normalized_assignments': len(assign), 'counterpart_placements': len(rows) - len(assign),
              'unplaced_original_windows': len(orig.order) - len(rows), 'trailing_unplaced_sections': len(extras),
              'basis': dict(collections.Counter(x['basis'].split(':')[0] for x in ordered))}
    return ordered, counts


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--original', type=Path, default=C.ROOT / 'evidence/original/pump/deployed.so')
    ap.add_argument('--windows-from', type=Path, required=True, help='any frontier inventory.json.gz (fixed window boundaries)')
    ap.add_argument('--candidate', type=Path, required=True, help='unstripped ELF of a default-layout build')
    ap.add_argument('--map', type=Path, required=True, help='lld map of that same build')
    ap.add_argument('--output-dir', type=Path, required=True)
    a = ap.parse_args()
    windows = [{'start': w['start'], 'bytes': w['bytes']} for w in read(a.windows_from)['windows']]
    ordered, counts = plan(a.original, windows, a.candidate, a.map)
    default = (HERE / 'default.ld').read_text()
    script = layout_script.render(default, [layout_script.selector(x['owner'], x['section']) for x in ordered])
    assert layout_script.check_script(default, script) == len(ordered)
    a.output_dir.mkdir(parents=True, exist_ok=True)
    (a.output_dir / 'ordered.ld').write_text(script)
    record = {'scope': __doc__.split('\n')[0], 'inputs': {
        'original_sha256': sha(a.original.read_bytes()), 'windows_from_sha256': sha(a.windows_from.read_bytes()),
        'candidate_sha256': sha(a.candidate.read_bytes()), 'map_sha256': sha(a.map.read_bytes()),
        'default_script_sha256': sha(default.encode()),
        'generator_sha256': {p.name: sha(p.read_bytes()) for p in sorted(HERE.glob('*.py'))}},
        'counts': counts, 'ordered_script_sha256': sha(script.encode()), 'sections': ordered}
    (a.output_dir / 'plan.json').write_text(json.dumps(record, indent=1) + '\n')
    print(json.dumps(counts, indent=1))


if __name__ == '__main__':
    main()
