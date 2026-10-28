#!/usr/bin/env python3
"""irsum.py <fn.ll> : one line per block label / call / load-store of interest, demangled-ish names shortened."""
import re, sys
for i, l in enumerate(open(sys.argv[1]).read().split('\n'), 1):
    s = l.strip()
    if re.match(r'^[\w.$-]+:', s) or ' call ' in s or s.startswith('call ') or ' invoke ' in s or s.startswith('br ') or s.startswith('switch') or s.startswith('ret'):
        s = re.sub(r'@"?_ZN[\w$.]*?((?:\d+[A-Za-z_$.][\w$.]*?)+)17h[0-9a-f]{16}E"?', lambda m: '@' + re.sub(r'\d+', '::', m.group(1)).strip(':')[-60:], s)
        s = re.sub(r'!dbg !\d+|, !prof !\d+|, !noalias !\d+|, !alias.scope !\d+', '', s)
        print(i, s[:180])
