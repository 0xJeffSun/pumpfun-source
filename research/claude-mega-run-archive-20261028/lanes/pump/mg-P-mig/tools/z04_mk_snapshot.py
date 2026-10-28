#!/usr/bin/env python3
"""Variant maker. make(name, edits, base=SRC, appends=None) -> variant dir W/lanes/mg-P-z04/v/<name>.
edits: [(file, old, new)] exact single replacement (asserted). appends: {file: [(target_line_or_None, text)]}:
pads the file with blank lines so `text`'s FIRST line lands on target_line (None = append directly)."""
import os, shutil, subprocess
L = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04'
SRC = L + '/src'
def make(name, edits=(), base=SRC, appends=None):
    d = L + '/v/' + name
    if os.path.exists(d): shutil.rmtree(d)
    subprocess.run(['cp', '-c', '-R', base, d], check=True)
    for f, old, new in edits:
        p = d + '/src/' + f; s = open(p).read()
        assert s.count(old) == 1, (name, f, s.count(old), old[:80])
        s = s.replace(old, new, 1); open(p, 'w').write(s)
    for f, items in (appends or {}).items():
        p = d + '/src/' + f; s = open(p).read()
        if not s.endswith('\n'): s += '\n'
        for tgt, text in items:
            n = s.count('\n')  # lines so far; next line number = n+1
            if tgt is not None:
                assert tgt >= n + 1, (name, f, tgt, n + 1)
                s += '\n' * (tgt - (n + 1))
            s += text if text.endswith('\n') else text + '\n'
        open(p, 'w').write(s)
    return d
def line_of(path, needle):
    for i, l in enumerate(open(path).read().split('\n'), 1):
        if needle in l: return i
