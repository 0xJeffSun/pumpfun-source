#!/usr/bin/env python3
"""Whitespace-only placement proof with a Rust-style lexer: comments, (raw/byte) strings, chars, lifetimes, identifiers,
numbers, delimiters and punctuation (with rustc's 'joint' flag for a non-delimiter punct directly followed by punctuation) must be identical.
usage: tokproof.py <label> <before.rs> <after.rs> [<label> <before> <after> ...]  -> JSON on stdout"""
import hashlib, json, re, sys
TOK = re.compile(r'''
  (?P<lc>//[^\n]*)
 |(?P<bc>/\*(?:.|\n)*?\*/)
 |(?P<raw>b?r(?P<h>\#*)"(?:.|\n)*?"(?P=h))
 |(?P<str>b?"(?:\\.|[^"\\])*")
 |(?P<chr>b?'(?:\\.|[^'\\])')
 |(?P<life>'[A-Za-z_][A-Za-z0-9_]*)
 |(?P<num>[0-9][0-9A-Za-z_]*(?:\.[0-9][0-9A-Za-z_]*)?)
 |(?P<id>[A-Za-z_][A-Za-z0-9_]*)
 |(?P<ws>\s+)
 |(?P<p>.)''', re.X)
def lex(s):
    toks = []
    for m in TOK.finditer(s):
        k = m.lastgroup
        if k == 'ws':
            if toks and toks[-1][0] == 'p': toks[-1] = ('p', toks[-1][1], False)
            continue
        if toks and toks[-1][0] == 'p' and len(toks[-1]) == 3 and toks[-1][2] is None:
            toks[-1] = ('p', toks[-1][1], k == 'p')
        g = m.group()
        toks.append((('d', g) if g in '()[]{}' else ('p', g, None)) if k == 'p' else (k, g))
    return toks
out = []
a = sys.argv[1:]
for i in range(0, len(a), 3):
    label, b, c = a[i:i + 3]
    sb, sc = open(b).read(), open(c).read()
    tb, tc = lex(sb), lex(sc)
    out.append({'file': label,
                'before_sha256': hashlib.sha256(sb.encode()).hexdigest(),
                'after_sha256': hashlib.sha256(sc.encode()).hexdigest(),
                'tokens': len(tc),
                'token_stream_sha256': hashlib.sha256(repr(tc).encode()).hexdigest(),
                'token_streams_identical': tb == tc,
                'lines_before': sb.count('\n') + 1, 'lines_after': sc.count('\n') + 1})
json.dump(out, sys.stdout, indent=1)
ok = all(r['token_streams_identical'] for r in out)
print('\nALL TOKEN STREAMS IDENTICAL' if ok else '\nMISMATCH', file=sys.stderr)
sys.exit(0 if ok else 1)
