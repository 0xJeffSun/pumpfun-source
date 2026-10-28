#!/usr/bin/env python3
"""irw.py <in.ll> <fn_substr> <orig_start> <symregex> <tag> <json list of [br_regex, wt, wf]>: run irt4.sh with weights."""
import sys, os, subprocess, json
ll, fn, st, rx, tag, br = sys.argv[1:7]
env = dict(os.environ, FN=fn, BR=br)
r = subprocess.run(['/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z03/tools/irt4.sh', ll, tag, st, rx], env=env, capture_output=True, text=True)
print(tag, (r.stdout.strip() or r.stderr.strip()[-300:]))
