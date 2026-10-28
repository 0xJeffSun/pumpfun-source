#!/usr/bin/env python3
"""Raw-priority ledger: greedy order of unmatched-window (slot) closures that make call-only windows raw.

Input: a tools/diagnose.py JSON of an ORDERED build (per-window labels + blocking_windows). For call-only
normalized-but-not-raw windows it repeatedly picks the set of still-open slots that completes the most windows per
slot, and prints the cumulative raw gain. Data-immediate windows additionally need the original .text size."""
import json, sys, collections
d = json.load(open(sys.argv[1]))
calls_only = [w for w in d['windows'] if all(l.startswith('call') for l in w['labels'])]
sets = [frozenset(w['blocking_windows']) for w in calls_only]
print('call-only windows', len(sets), 'with no blocker listed', sum(1 for s in sets if not s))
closed = set(); done = 0; steps = []
remaining = [s for s in sets if s]
for step in range(25):
    # pick the group of slots that completes the most windows per slot closed
    best = None
    cand = collections.Counter()
    for s in remaining:
        need = s - closed
        if need: cand[frozenset(need)] += 1
    # evaluate each needed-set as a closure option: windows completed if we close it
    for need, _ in cand.most_common(300):
        newly = sum(1 for s in remaining if (s - closed) <= need)
        score = newly / len(need)
        if best is None or score > best[0] or (score == best[0] and newly > best[1]):
            best = (score, newly, need)
    if not best: break
    closed |= best[2]
    remaining2 = [s for s in remaining if not (s - closed) <= set()]
    done += len(remaining) - len(remaining2); remaining = remaining2
    steps.append((sorted(best[2]), best[1], done, len(closed)))
for st in steps[:15]: print('close', ' '.join(st[0])[:150], '-> +%d (cum %d raw, %d slots)' % (st[1], st[2], st[3]))
