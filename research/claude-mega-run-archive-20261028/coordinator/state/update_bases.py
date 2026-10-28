#!/usr/bin/env python3
"""Rewrite the auto block at the top of BASES.md from the newest BASE line per contract in EVENTS.log; print it."""
import re, time

MR = '/Users/shawwalters/Documents/Codex/2026-10-24/mega-run'
START, END = '<!-- auto-newest:start -->', '<!-- auto-newest:end -->'


def newest():
    out = {}
    for line in open(f'{MR}/EVENTS.log'):
        m = re.match(r'(\d\d:\d\d) BASE (\w+) (\S+) (.*)', line.strip())
        if m:
            key = m.group(2) + ('-layout' if 'layout' in m.group(3) else '')  # layout layers listed separately
            out[key] = (m.group(1), m.group(3), m.group(4))
    return out


def path_of(rest):
    m = re.search(r'path=(\S+)', rest)
    return m.group(1) if m else ''


def main():
    n = newest()
    lines = [START, f'## Newest composites (auto from EVENTS.log, {time.strftime("%H:%M")}) — start new work here',
             'Running lanes may stay on the base they started from; integrators compose deliveries made on any listed base.']
    for c in ('mayhem', 'pump', 'pump-layout', 'amm', 'amm-layout'):
        if c in n:
            t, name, rest = n[c]
            counts = rest.split(' path=')[0]
            extra = ''
            fm = re.search(r'frontier(?:\(native\))?=(\S+)', rest)
            if fm:
                extra = f'; native frontier `{fm.group(1)}`'
            label = c.replace('-layout', ' layout layer (packets/raw only; lanes copy the source-only base above)')
            lines.append(f'- **{label}: {name}** {counts} ({t}) `{path_of(rest)}`{extra}')
    lines.append(END)
    block = '\n'.join(lines)
    s = open(f'{MR}/BASES.md').read()
    if START in s:
        s = re.sub(re.escape(START) + r'.*?' + re.escape(END), block, s, flags=re.S)
    else:
        head, sep, rest = s.partition('\n\n')
        s = head + '\n\n' + block + '\n\n' + rest
    open(f'{MR}/BASES.md', 'w').write(s)
    print(block)


if __name__ == '__main__':
    main()
