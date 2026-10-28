#!/usr/bin/env python3
"""Classify why each normalized-but-not-raw original window still differs.

For every original window with a normalized-equal candidate body, compare the
raw 8-byte instruction slots with the *placed* counterpart (the body the order
plan put in that window's slot, else the nearest normalized-equal body) and
label each differing slot:

  call:size      direct call whose target corresponds, but the original
                 windows between caller and callee are not size-exact in the
                 candidate (the blocking windows are listed)
  call:target    direct call whose candidate target is not the counterpart of
                 the original target window (sharing/specialization difference)
  lddw:<sec>     relocated 64-bit immediate into .rodata / .data.rel.ro / .text;
                 split into `shift-only` (same offset within the section, only
                 the section base differs) and `offset` (relative data order or
                 different data object)
  other          anything else (should not occur for normalized-equal bodies)

Outputs JSON with per-window labels, blocker frequencies and summary counts.
"""
import argparse, collections, json, struct, sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from plan import Plan, Elf, ROOT, parse_map, selector_owner  # noqa: E402


def sec_bounds(e):
    out = {}
    for name in ('.text', '.rodata', '.data.rel.ro'):
        s = e.secs.get(name)
        if s:
            out[name] = (s[3], s[3] + s[5])
    return out


def which(bounds, addr):
    for n, (lo, hi) in bounds.items():
        if lo <= addr < hi:
            return n
    return 'other'


def diagnose(plan, cand_symbols, cand_map):
    o, W = plan.o, plan.W
    s = Elf(Path(cand_symbols))
    ob, cb = sec_bounds(o), sec_bounds(s)
    # placed address of each plan section in the measured artifact, by (object, section)
    placed = {(selector_owner(r['owner']), r['section']): r['vma'] for r in parse_map(cand_map)}
    new_addr = {i: placed[(selector_owner(r['owner']), r['section'])] for i, r in enumerate(plan.sections)}
    assert len(set(new_addr.values())) == len(new_addr)
    at_addr = {a: i for i, a in new_addr.items()}
    inv = {}
    for w, c in plan.A.items():
        inv.setdefault(c, w)
    slot_delta = {}
    for w, (st, en) in enumerate(W):
        c = plan.A.get(w)
        slot_delta[w] = (plan.sections[c]['size'] if c is not None else 0) - (en - st)
    out, summary, blockers = [], collections.Counter(), collections.Counter()
    for w, (st, en) in enumerate(W):
        size = en - st
        c = plan.A.get(w)
        if c is None or plan.wkey[w] != plan.ckey[c]:
            alts = plan.C[w]
            if not alts:
                continue
            c = alts[0]
        p = new_addr[c]
        ob_, cb_ = o.b[st:en], s.b[p:p + size]
        if ob_ == cb_:
            continue
        labels, blocking = collections.Counter(), set()
        for k in range(0, size, 8):
            if ob_[k:k + 8] == cb_[k:k + 8]:
                continue
            op = ob_[k]
            if op == 0x85 and (st + k) in o.calls:
                to = o.calls[st + k]
                tc = s.calls.get(p + k)
                tw = plan.win_of(to)
                # which plan section is at tc?
                ci = at_addr.get(tc)
                if ci is None or plan.A.get(tw) != ci:
                    labels['call:target'] += 1
                else:
                    labels['call:size'] += 1
                    # forward: windows strictly between caller and callee;
                    # backward: callee up to (not including) the caller
                    rng = range(w + 1, tw) if tw > w else range(tw, w)
                    for x in rng:
                        if slot_delta[x]:
                            blocking.add(x)
            elif op == 0x18:
                vo = struct.unpack_from('<I', ob_, k + 4)[0] | (struct.unpack_from('<I', ob_, k + 12)[0] << 32)
                vc = struct.unpack_from('<I', cb_, k + 4)[0] | (struct.unpack_from('<I', cb_, k + 12)[0] << 32)
                so, sc = which(ob, vo), which(cb, vc)
                if so == sc and so in ob and vo - ob[so][0] == vc - cb[sc][0]:
                    labels['lddw:%s:shift-only' % so] += 1
                else:
                    labels['lddw:%s:offset' % so] += 1
            elif k >= 8 and ob_[k - 8] == 0x18:
                continue  # second half of lddw, counted with the first
            else:
                labels['other'] += 1
        kinds = sorted(labels)
        tag = '+'.join(sorted(set(x if not x.startswith('lddw') else x for x in kinds)))
        summary[tag] += 1
        for x in blocking:
            blockers[x] += 1
        out.append({'window': w, 'original_start': hex(st), 'size': size, 'labels': dict(labels),
                    'blocking_windows': sorted(hex(W[x][0]) for x in blocking)})
    return {'summary': dict(summary.most_common()),
            'blockers': [{'window': w, 'original_start': hex(W[w][0]), 'original_size': W[w][1] - W[w][0],
                          'slot_delta': slot_delta[w], 'blocked_bodies': n, 'basis': plan.basis.get(w)}
                         for w, n in blockers.most_common()],
            'windows': out}


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument('--original', type=Path, default=ROOT / 'evidence/original/pump_amm/deployed.so')
    p.add_argument('--plan-symbols', type=Path, required=True, help='default-layout symbol artifact used for the plan')
    p.add_argument('--plan-map', type=Path, required=True)
    p.add_argument('--symbols', type=Path, required=True, help='reordered symbol artifact to diagnose')
    p.add_argument('--map', type=Path, required=True, help='linker map of the reordered artifact')
    p.add_argument('--output', type=Path, required=True)
    a = p.parse_args()
    pl = Plan(a.original, a.plan_symbols, a.plan_map)
    pl.assign()
    r = diagnose(pl, a.symbols, a.map)
    a.output.write_text(json.dumps(r, indent=1) + '\n')
    print(json.dumps(r['summary'], indent=1))
    print('top blockers:', json.dumps(r['blockers'][:25]))


if __name__ == '__main__':
    main()
