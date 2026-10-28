#!/usr/bin/env python3
"""Multiplex helper.  mux(name, base_variant_fn, variants:{tag:text_with___X}, call_old, call_fmt, cond)
- base_variant_fn(name) -> dir of a full (non-multiplexed) variant tree that already contains `call_old` in FILE.
- each variant text uses '__X' as the unique-name placeholder (replaced by '_<tag>').
- the call `call_old` (exact text, appears once in FILE) is replaced by
  `match <cond> {101=>call_fmt.format(X='_tagA')?,...,_=>call_old}`.
Variant texts are appended at the end of FILE (no Source sites expected; if they have sites, lines differ)."""
import sys
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z04/tools')
def mux(d, file, variants, call_old, call_tmpl, cond):
    p = d + '/src/' + file; s = open(p).read()
    assert s.count(call_old) == 1, s.count(call_old)
    arms = ''.join(f"{101+i}=>{{{call_tmpl.replace('__X', '_' + t)}}}" for i, t in enumerate(variants))
    s = s.replace(call_old, f"match {cond} {{{arms}_=>{{{call_old}}}}}", 1)
    if not s.endswith('\n'): s += '\n'
    for t, text in variants.items(): s += text.replace('__X', '_' + t) + '\n'
    open(p, 'w').write(s)
    return d
