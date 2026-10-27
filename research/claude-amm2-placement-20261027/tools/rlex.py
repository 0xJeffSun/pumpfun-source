#!/usr/bin/env python3
"""Small Rust lexer for whitespace-only edit verification.

tokens(text) -> list of Tok(kind, text, start, end, line, col)   (whitespace is not emitted;
comments ARE emitted so that a placement can never drop or alter one).
stream(text) -> comparable sequence: (kind, text, joint) where joint is set for punctuation
immediately followed by punctuation (proc-macro Spacing::Joint), the only whitespace-sensitive
property of a Rust token stream.
usage: rlex.py <a.rs> <b.rs>   -> exit 0 iff the token streams are identical
"""
import sys
from collections import namedtuple

Tok = namedtuple('Tok', 'kind text start end line col')
PUNCT = set('+-*/%^!&|=<>@.,;:#$?~')
DELIM = set('()[]{}')
MULTI = ['<<=', '>>=', '...', '..=', '::', '->', '=>', '==', '!=', '<=', '>=', '&&', '||', '+=', '-=', '*=',
         '/=', '%=', '^=', '&=', '|=', '<<', '>>', '..']


class LexError(Exception):
    pass


def _ident_start(c):
    return c == '_' or c.isalpha()


def _ident_cont(c):
    return c == '_' or c.isalnum()


def tokens(src):
    out = []
    i, n = 0, len(src)
    line, lstart = 1, 0

    def emit(kind, a, b):
        out.append(Tok(kind, src[a:b], a, b, line_of(a), a - line_start(a) + 1))

    # line bookkeeping via precomputed newline offsets
    nl = [k for k, c in enumerate(src) if c == '\n']
    import bisect

    def line_of(a):
        return bisect.bisect_right(nl, a - 1) + 1 if a > 0 else 1

    def line_start(a):
        k = bisect.bisect_right(nl, a - 1)
        return nl[k - 1] + 1 if k > 0 else 0

    while i < n:
        c = src[i]
        if c in ' \t\r\n':
            i += 1; continue
        if src.startswith('//', i):
            j = src.find('\n', i)
            j = n if j < 0 else j
            emit('comment', i, j); i = j; continue
        if src.startswith('/*', i):
            depth, j = 1, i + 2
            while j < n and depth:
                if src.startswith('/*', j):
                    depth += 1; j += 2
                elif src.startswith('*/', j):
                    depth -= 1; j += 2
                else:
                    j += 1
            if depth:
                raise LexError(f'unterminated block comment at {i}')
            emit('comment', i, j); i = j; continue
        # raw strings / byte / c strings
        m = None
        for pfx in ('br', 'cr', 'r'):
            if src.startswith(pfx, i) and i + len(pfx) < n and src[i + len(pfx)] in '#"':
                j = i + len(pfx); h = 0
                while j < n and src[j] == '#':
                    h += 1; j += 1
                if j < n and src[j] == '"':
                    end = src.find('"' + '#' * h, j + 1)
                    if end < 0:
                        raise LexError(f'unterminated raw string at {i}')
                    m = end + 1 + h
                break
        if m:
            emit('str', i, m); i = m; continue
        if c == '"' or (c in 'bc' and i + 1 < n and src[i + 1] == '"'):
            j = i + (1 if c == '"' else 2)
            while j < n and src[j] != '"':
                j += 2 if src[j] == '\\' else 1
            if j >= n:
                raise LexError(f'unterminated string at {i}')
            emit('str', i, j + 1); i = j + 1; continue
        if c == "'" or (c == 'b' and i + 1 < n and src[i + 1] == "'"):
            j = i + (1 if c == "'" else 2)
            # char literal?
            if j < n and src[j] == '\\':
                k = src.find("'", j + 2)
                if src[j + 1] == 'u':
                    k = src.find("'", src.find('}', j))
                emit('char', i, k + 1); i = k + 1; continue
            if j + 1 < n and src[j + 1] == "'" and src[j] != "'":
                emit('char', i, j + 2); i = j + 2; continue
            if c == "'" and j < n and (_ident_start(src[j])):
                k = j
                while k < n and _ident_cont(src[k]):
                    k += 1
                emit('lifetime', i, k); i = k; continue
            # multi-byte char literal (non-ascii)
            k = src.find("'", j)
            emit('char', i, k + 1); i = k + 1; continue
        if src.startswith('r#', i) and i + 2 < n and _ident_start(src[i + 2]):
            j = i + 2
            while j < n and _ident_cont(src[j]):
                j += 1
            emit('ident', i, j); i = j; continue
        if _ident_start(c):
            j = i
            while j < n and _ident_cont(src[j]):
                j += 1
            emit('ident', i, j); i = j; continue
        if c.isdigit():
            j = i + 1
            if c == '0' and j < n and src[j] in 'xob':
                j += 1
                while j < n and (src[j].isalnum() or src[j] == '_'):
                    j += 1
            else:
                while j < n and (src[j].isdigit() or src[j] == '_'):
                    j += 1
                if j + 1 < n and src[j] == '.' and src[j + 1].isdigit():
                    j += 1
                    while j < n and (src[j].isdigit() or src[j] == '_'):
                        j += 1
                if j < n and src[j] in 'eE' and j + 1 < n and (src[j + 1].isdigit() or src[j + 1] in '+-'):
                    j += 2
                    while j < n and (src[j].isdigit() or src[j] == '_'):
                        j += 1
                while j < n and (src[j].isalnum() or src[j] == '_'):
                    j += 1
            emit('num', i, j); i = j; continue
        if c in DELIM:
            emit('delim', i, i + 1); i += 1; continue
        if c in PUNCT:
            for mm in MULTI:
                if src.startswith(mm, i):
                    emit('punct', i, i + len(mm)); i += len(mm); break
            else:
                emit('punct', i, i + 1); i += 1
            continue
        raise LexError(f'unexpected character {c!r} at offset {i}')
    return out


def stream(src):
    t = tokens(src)
    out = []
    for k, x in enumerate(t):
        joint = x.kind == 'punct' and x.end < len(src) and src[x.end] in PUNCT
        out.append((x.kind, x.text, joint))
    return out


def same_stream(a, b):
    sa, sb = stream(a), stream(b)
    if sa == sb:
        return True, None
    for k, (x, y) in enumerate(zip(sa, sb)):
        if x != y:
            return False, (k, x, y)
    return False, (min(len(sa), len(sb)), 'length', (len(sa), len(sb)))


if __name__ == '__main__':
    a = open(sys.argv[1]).read(); b = open(sys.argv[2]).read()
    ok, where = same_stream(a, b)
    print('token streams identical' if ok else f'token streams DIFFER at {where}')
    sys.exit(0 if ok else 1)
