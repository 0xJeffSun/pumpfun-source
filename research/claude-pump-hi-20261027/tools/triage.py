#!/usr/bin/env python3
"""Static triage of unmatched main-Pump windows against a candidate build.

Analysis only. Uses the frontier packet's own normalizer (pump_compare_function_bytes)
so "normalized equal" means exactly what the repository inventory means.

For every unmatched original window in a range it reports:
  * caller-derived counterparts: candidate functions reached from the same call slot
    of a normalized-matched caller (orig target <-> cand target);
  * callee-derived counterparts: candidate functions whose mapped callee list equals
    or overlaps the original window's callee list;
  * instruction-level similarity (difflib over normalized 8-byte slots) to the best
    counterpart, with size delta.
"""
import argparse, bisect, difflib, gzip, json, re, struct, subprocess, sys
from collections import defaultdict
from pathlib import Path

HERE = Path(__file__).resolve()
ROOT = next(p for p in HERE.parents if (p / 'evidence/original/pump/deployed.so').is_file())
OBJDUMP = str(Path.home() / '.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump')


def read(p):
    b = Path(p).read_bytes()
    return json.loads(gzip.decompress(b) if b[:2] == b'\x1f\x8b' else b)


def load_tools(packet):
    sys.path.insert(0, str(packet / 'inputs/scripts'))
    from pump_compare_function_bytes import normalize, body
    from pump_quote_control_function_match import sections
    return normalize, body, sections


def symbols(path):
    out = subprocess.check_output([OBJDUMP, '-t', str(path)], text=True)
    funcs = {}
    for line in out.splitlines():
        m = re.match(r'^([0-9a-f]+) .* F \.text\s+([0-9a-f]+)\s+(?:\.hidden\s+)?(\S+)$', line)
        if m:
            a, s, n = int(m.group(1), 16), int(m.group(2), 16), m.group(3)
            if s:
                funcs.setdefault(a, (s, n))
    return funcs


def slots(norm):
    return [norm[i:i + 8] for i in range(0, len(norm), 8)]


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--packet', type=Path, required=True)
    ap.add_argument('--candidate', type=Path, help='unstripped candidate (default packet/unstripped.so)')
    ap.add_argument('--inventory', type=Path, help='default packet/inventory.json.gz')
    ap.add_argument('--lo', type=lambda s: int(s, 0), default=0)
    ap.add_argument('--hi', type=lambda s: int(s, 0), default=1 << 40)
    ap.add_argument('--output', type=Path, required=True)
    a = ap.parse_args()
    normalize, body, sections = load_tools(a.packet)
    cand_path = a.candidate or a.packet / 'unstripped.so'
    iv = read(a.inventory or a.packet / 'inventory.json.gz')
    ob = (ROOT / 'evidence/original/pump/deployed.so').read_bytes()
    cb = cand_path.read_bytes()
    osec, csec = sections(ob), sections(cb)
    funcs = symbols(cand_path)
    cstarts = sorted(funcs)

    windows = {w['start']: w for w in iv['windows']}
    # normalized forms
    onorm = {}
    for s, w in windows.items():
        raw = body(ob, osec, s, w['bytes'])
        onorm[s] = normalize(raw, s, osec)
    cnorm = {}
    for s, (n, name) in funcs.items():
        try:
            raw = body(cb, csec, s, n)
        except AssertionError:
            continue
        cnorm[s] = normalize(raw, s, csec)

    matched = {s: [c['start'] for c in w['normalized_matches']] for s, w in windows.items() if w['normalized_matches']}
    o2c = defaultdict(set)   # orig target -> candidate targets (caller-derived)
    for s, cs in matched.items():
        oo = [x for x in onorm[s][1] if x['kind'] == 'direct-call']
        for c in cs:
            if c not in cnorm:
                continue
            co = [x for x in cnorm[c][1] if x['kind'] == 'direct-call']
            co_by_off = {x['offset']: x['target'] for x in co}
            for x in oo:
                t = co_by_off.get(x['offset'])
                if t is not None:
                    o2c[x['target']].add(t)
    # matched mapping for callee signatures
    c2o = defaultdict(set)
    for s, cs in matched.items():
        for c in cs:
            c2o[c].add(s)
    for o, cs in o2c.items():
        for c in cs:
            c2o[c].add(o)

    def callee_sig_orig(s):
        return [x['target'] for x in onorm[s][1] if x['kind'] == 'direct-call']

    def callee_sig_cand(c):
        return [x['target'] for x in cnorm[c][1] if x['kind'] == 'direct-call']

    # index candidate functions by mapped-callee multiset
    rows = []
    for s, w in sorted(windows.items()):
        if w['normalized_matches'] or not (a.lo <= s <= a.hi):
            continue
        ocallees = callee_sig_orig(s)
        cands = {}
        for c in o2c.get(s, ()):
            cands[c] = 'caller'
        # callee-derived: candidate functions that call the counterparts of our callees
        ocounter = [o2c.get(t, set()) | ({c for c, os in c2o.items() if t in os}) for t in ocallees]
        want = [frozenset(x) for x in ocounter if x]
        if want and len(cands) < 4:
            score = defaultdict(int)
            for c in cnorm:
                cc = set(callee_sig_cand(c))
                hit = sum(1 for x in want if x & cc)
                if hit:
                    score[c] = hit
            best = sorted(score.items(), key=lambda kv: (-kv[1], abs(funcs[kv[0]][0] - w['bytes'])))[:6]
            for c, h in best:
                if h >= max(1, int(0.5 * len(want))):
                    cands.setdefault(c, f'callee{h}/{len(want)}')
        on = slots(onorm[s][0])
        res = []
        for c, why in cands.items():
            cn = slots(cnorm[c][0])
            sm = difflib.SequenceMatcher(None, on, cn, autojunk=False)
            ratio = sm.ratio()
            res.append({'cand_start': c, 'cand_bytes': funcs[c][0], 'symbol': funcs[c][1], 'why': why,
                        'ratio': round(ratio, 4), 'size_delta': funcs[c][0] - w['bytes'],
                        'equal_slots': sum(b.size for b in sm.get_matching_blocks())})
        res.sort(key=lambda r: -r['ratio'])
        rows.append({'start': s, 'hex': hex(s), 'bytes': w['bytes'], 'n_callees': len(ocallees),
                     'callees_mapped': sum(1 for x in ocounter if x), 'counterparts': res[:5]})
    a.output.write_text(json.dumps(rows, indent=1) + '\n')
    for r in rows:
        best = r['counterparts'][0] if r['counterparts'] else None
        if best:
            sym = re.sub(r'17h[0-9a-f]{16}E$', '', best['symbol'])[-80:]
            print(f"{r['hex']:>9} {r['bytes']:6d} best={best['ratio']:.3f} d={best['size_delta']:+6d} {best['why']:<10} {sym}")
        else:
            print(f"{r['hex']:>9} {r['bytes']:6d} no counterpart (callees {r['callees_mapped']}/{r['n_callees']})")


if __name__ == '__main__':
    main()
