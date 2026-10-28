#!/usr/bin/env python3
"""gen.py: build variant trees for migrate_v2::execute (0x49888).
make_variant(name, exec_lines, base=L27 src) -> W/lanes/mg-P-mig/v/<name>
exec_lines: list of (target_line_or_None, text). Lines with a target are padded (blank lines) to land exactly there.
The new execute replaces L27 lines 110..349 (block keeps its 240-line extent); L27 helper fns at 48..86
(call/create_associated_account/move_lamports/quote_extensions/quote_account_size) are blanked; the MigrateV2Error
enum (351..356) is blanked; z04's R1 helpers (create_token_account_v2, init_pump_amm_boost_v2 @653 (require 658),
quote_token_account_size (error 747)) are appended exactly as z04's v_r1.py lays them out."""
import os, shutil, subprocess, sys
W = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
L = W + '/lanes/mg-P-mig'
BASE = L + '/src'
sys.path.insert(0, L + '/tools')
import z04_r1_snapshot as z
MV = 'migrate_v2.rs'

def place(entries, first_line, last_line):
    out = []; ln = first_line
    for tgt, text in entries:
        tl = text.split('\n')
        if tgt is not None:
            assert tgt >= ln, ('overshoot', tgt, ln, text[:60])
            out += [''] * (tgt - ln); ln = tgt
        out += tl; ln += len(tl)
    assert ln - 1 <= last_line, ('block too long', ln - 1, last_line)
    out += [''] * (last_line - (ln - 1))
    return out

def make_variant(name, exec_lines, base=BASE, extra=None, helpers=True, tail=None):
    d = L + '/v/' + name
    if os.path.exists(d): shutil.rmtree(d)
    subprocess.run(['cp', '-c', '-R', base, d], check=True)
    p = d + '/src/' + MV
    lines = open(p).read().split('\n')
    assert lines[109].startswith('pub fn execute'), lines[109][:40]
    assert lines[348] == '}', repr(lines[348])
    assert lines[86] == '#[inline(never)]' and lines[87].startswith('pub fn required_quote_account_len')
    for i in range(47, 86): lines[i] = ''            # lines 48..86
    for i in range(350, 356): lines[i] = ''          # lines 351..356 (MigrateV2Error)
    blk = place(exec_lines, 110, 349)
    lines[109:349] = blk
    s = '\n'.join(lines)
    if extra:
        for old, new in extra:
            assert s.count(old) == 1, (old[:60], s.count(old)); s = s.replace(old, new, 1)
    if helpers:
        if not s.endswith('\n'): s += '\n'
        s += z.ATA_FN
        n = s.count('\n')
        s += '\n' * (658 - 5 - (n + 1)); s += z.BOOST_FN
        n = s.count('\n')
        s += '\n' * (747 - 2 - (n + 1)); s += z.SIZE_FN
    if tail: s += tail
    open(p, 'w').write(s)
    return d
