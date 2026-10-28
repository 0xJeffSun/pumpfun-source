"""[mg-P-raw] tiny legacy-mangling demangler (path segments, $LT$ etc. decoded, hash dropped)."""
import re
REPL = [('$LT$', '<'), ('$GT$', '>'), ('$u20$', ' '), ('$u27$', "'"), ('$RF$', '&'), ('$BP$', '*'), ('$C$', ','), ('$u7b$', '{'),
        ('$u7d$', '}'), ('$u5b$', '['), ('$u5d$', ']'), ('$u3b$', ';'), ('$u2b$', '+'), ('$u22$', '"'), ('..', '::'), ('$SP$', '@')]


def dem(n, keep_hash=False):
    if not n.startswith('_ZN'): return n
    s, i, out = n[3:], 0, []
    while i < len(s) and s[i].isdigit():
        j = i
        while s[j].isdigit(): j += 1
        L = int(s[j - (j - i):j]) if False else int(s[i:j]); seg = s[j:j + L]; i = j + L
        if seg.startswith('_$'): seg = seg[1:]
        for a, b in REPL: seg = seg.replace(a, b)
        out.append(seg)
    if out and re.fullmatch(r'h[0-9a-f]{16}', out[-1]) and not keep_hash: out = out[:-1]
    return '::'.join(out)
