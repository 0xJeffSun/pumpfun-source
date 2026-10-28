#!/usr/bin/env python3
"""Tally EVENTS.log WIN lines against the open-window lists (state/*-remaining.json). Prints one block per contract."""
import json, re

MR = '/Users/shawwalters/Documents/Codex/2026-10-24/mega-run'
pump_open = set(json.load(open(f'{MR}/state/pump-remaining.json'))['remaining'])
amm_open = set(json.load(open(f'{MR}/state/amm-remaining.json'))['remaining_union'])
mayhem_open = {'O0083', 'O0084'}
won = {'pump': {}, 'amm': {}, 'mayhem': {}}
bases = {}
for line in open(f'{MR}/EVENTS.log'):
    m = re.match(r'(\d\d:\d\d) WIN (\w+) (\S+) (.*)', line)
    if m:
        t, c, lane, rest = m.groups()
        for w in re.findall(r'0x[0-9a-f]+|O00\d\d', rest.split('total=')[0]):
            won.setdefault(c, {}).setdefault(w, (t, lane))
    m = re.match(r'(\d\d:\d\d) BASE (\w+) (\S+) (\S+)', line)
    if m:
        bases[m.group(2)] = f'{m.group(3)} {m.group(4)} ({m.group(1)})'
for c, open_set in (('mayhem', mayhem_open), ('pump', pump_open), ('amm', amm_open)):
    gained = set(won.get(c, {}))
    closed = sorted(gained & open_set)
    other = sorted(gained - open_set)
    print(f"{c}: newest base {bases.get(c, '-')}; lane wins on open windows {len(closed)}/{len(open_set)} "
          f"-> {len(open_set) - len(closed)} still open; ports of known wins {len(other)}")
    if closed:
        print('   closed:', ' '.join(f"{w}({won[c][w][1]})" for w in closed))
