#!/usr/bin/env python3
"""Rank unmatched windows by how many raw matches the ordered layout would gain if each became size-neutral.

Model (exact for call-only bodies under the generator's layout): an assigned
window without data operands is raw-equal when every call reaches the callee's
assigned instance and the unmatched windows between caller and callee add no
net size. An unmatched window contributes (placed counterpart size - original
size), or minus its size when nothing is placed. Greedy selection reports the
cumulative gain of closing blockers in order. Data-referencing bodies are
excluded: they also need data addresses to agree.
"""
import sys
sys.dont_write_bytecode = True  # keep the packet free of __pycache__
import argparse, bisect, gzip, json, sys
from pathlib import Path
import correspond as C

def compute(plan, windows, candidate, top=25):
    """Pricing for one plan; pure function of the plan, windows and default-layout ELF."""
    orig = C.Image(C.ROOT / 'evidence/original/pump/deployed.so', windows)
    rows = [s for s in plan['sections'] if s['original'] is not None]
    assigned = {s['original']: s for s in rows if s['normalized_equal']}
    inst = {(s['owner'], s['section']): s['original'] for s in assigned.values()}
    delta = {o: -orig.funcs[o]['bytes'] for o in orig.order if o not in assigned}
    for s in rows:
        if not s['normalized_equal']:
            delta[s['original']] = s['bytes'] - s['original_bytes']
    U = sorted(o for o, d in delta.items() if d)
    cand = C.Image(candidate)
    inv = {s['candidate']: s['original'] for s in assigned.values()}
    # calls must reach the assigned instance of the original callee
    instance_ok = {o: all(inv.get(u) == t for t, u in zip(orig.funcs[o]['calls'], cand.funcs[s['candidate']]['calls']))
                   for o, s in assigned.items()}
    # candidate call targets in plan identity: need the candidate callee's section for each call slot
    def raw_set(neutral):
        ok = set()
        for o, s in assigned.items():
            of = orig.funcs[o]
            if of['data']:
                continue
            if any(t not in assigned for t in of['calls']) or not instance_ok[o]:
                continue
            good = True
            for t in of['calls']:
                lo, hi = sorted((o, t))
                if sum(delta[u] for u in U[bisect.bisect_right(U, lo):bisect.bisect_left(U, hi)] if u not in neutral):
                    good = False; break
            if good:
                ok.add(o)
        return ok
    base = raw_set(set())
    chosen, cur, steps = set(), base, []
    cand_blockers = [u for u in U]
    for _ in range(top):
        best = None
        for u in cand_blockers:
            if u in chosen: continue
            g = len(raw_set(chosen | {u})) - len(cur)
            if best is None or g > best[0]: best = (g, u)
        if not best or best[0] <= 0:
            # no single window helps; try pairs among the most-crossed blockers is too costly: stop
            break
        chosen.add(best[1]); cur = raw_set(chosen)
        steps.append({'window': best[1], 'bytes': orig.funcs[best[1]]['bytes'], 'net_size_change_now': delta[best[1]], 'gain': best[0], 'cumulative_call_only_raw': len(cur)})
    all_neutral = raw_set(set(U))
    regions = []
    for name, lo in [('dependency region from the allocator shim', 0x17bc38), ('from __rust_dealloc', 0x1570b8)]:
        S = {u for u in U if u >= lo}
        regions.append({'region': name, 'start': lo, 'windows': sorted(S), 'bytes': sum(orig.funcs[u]['bytes'] for u in S),
                        'raw_if_neutral': len(raw_set(S)), 'gain': len(raw_set(S)) - len(base)})
    return {'scope': __doc__.split('\n')[0], 'call_only_raw_now': len(base), 'call_only_raw_if_all_neutral': len(all_neutral),
            'size_changing_unmatched_windows': len(U), 'regions': regions, 'greedy': steps}


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--plan', type=Path, required=True)
    ap.add_argument('--windows-from', type=Path, required=True)
    ap.add_argument('--candidate', type=Path, required=True, help='default-layout unstripped ELF the plan was derived from')
    ap.add_argument('--top', type=int, default=25)
    ap.add_argument('--output', type=Path)
    a = ap.parse_args()
    rd = lambda p: json.loads(gzip.decompress(p.read_bytes()) if p.read_bytes()[:2] == b'\x1f\x8b' else p.read_bytes())
    plan = rd(a.plan); ref = rd(a.windows_from)
    windows = [{'start': w['start'], 'bytes': w['bytes']} for w in ref['windows']]
    result = compute(plan, windows, a.candidate, a.top)
    if a.output: a.output.write_text(json.dumps(result, indent=1) + '\n')
    print(json.dumps({k: result[k] for k in ['call_only_raw_now', 'call_only_raw_if_all_neutral', 'size_changing_unmatched_windows']}))
    for r in regions: print(r['region'], len(r['windows']), 'windows', r['bytes'], 'bytes ->', r['raw_if_neutral'], '(+%d)' % r['gain'])
    for s in steps: print(hex(s['window']), s['bytes'], s['net_size_change_now'], '+%d' % s['gain'], s['cumulative_call_only_raw'])

if __name__ == '__main__':
    main()
