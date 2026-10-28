#!/bin/bash
# ctx.sh PC [BEFORE] [AFTER] : original disassembly around PC (hex, no 0x)
L=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-v3a
pc=$(printf "%x" $1); b=${2:-12}; a=${3:-4}
grep -n -E "^ +$pc:" $L/orig.dis | head -1 | cut -d: -f1 | { read n; sed -n "$((n-b)),$((n+a))p" $L/orig.dis | sed -E 's/^ +//; s/\t+/ /g'; }
