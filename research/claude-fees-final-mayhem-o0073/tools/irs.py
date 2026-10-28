#!/usr/bin/env python3
"""Block-level IR surgery for validate_sweep (lane fees-final, O0073).

Loads a rustc-emitted module, splits validate_sweep into basic blocks, lets a caller
reorder / replace blocks, writes the edited module to fees-final/llc/LABEL.ll, runs llc
(same flags as rustc's codegen) and compares the section with the original O0073 window.
"""
import re, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import o73  # noqa: E402

FF = o73.FF
PAT = r'FeeRecipient14validate_sweep'


def load(ll):
    s = open(ll).read()
    m = re.search(r'\ndefine[^\n]*' + PAT + r'[^\n]*\n', s)
    st = m.start() + 1; en = s.find('\n}\n', st) + 2
    return s, st, en


def split(body):
    """-> (header_line, [(label, [lines])...], closing)"""
    lines = body.rstrip('\n').split('\n')
    head, close = lines[0], lines[-1]
    assert close == '}'
    blocks = []; cur = None
    for l in lines[1:-1]:
        m = re.match(r'^("[^"]+"|[A-Za-z0-9_.$-]+):', l)
        if m:
            cur = (m.group(1), [l]); blocks.append(cur)
        elif cur is None:
            raise SystemExit('line before first label: ' + l)
        else:
            cur[1].append(l)
    return head, blocks, close


def join(head, blocks, close):
    out = [head]
    for _, ls in blocks:
        # strip trailing blank lines then add exactly one separator
        while ls and ls[-1] == '':
            ls = ls[:-1]
        out += ls + ['']
    out = out[:-1] + [close]
    return '\n'.join(out) + '\n'


def order(blocks, names):
    d = dict(blocks)
    assert sorted(names) == sorted(d), (sorted(names), sorted(d))
    return [(n, d[n]) for n in names]


def run(ll_in, label, edit_blocks, extra=()):
    s, st, en = load(ll_in)
    head, blocks, close = split(s[st:en])
    nb = edit_blocks(blocks)
    body = join(head, nb, close)
    body = re.sub(r'%(\d+)\b', lambda m: '%v' + m.group(1), body)  # numbered values must be ordered; name them
    out = f'{FF}/llc/{label}.ll'
    open(out, 'w').write(s[:st] + body + s[en:])
    print(f'[{label}]', end=' '); sys.stdout.flush()
    return o73.llc(out, label, extra)


def names(ll_in):
    s, st, en = load(ll_in)
    return [n for n, _ in split(s[st:en])[1]]


if __name__ == '__main__':
    print(names(sys.argv[1]))
