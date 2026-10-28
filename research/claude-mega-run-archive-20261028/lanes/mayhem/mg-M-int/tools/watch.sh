#!/bin/zsh
# Emits: new Mayhem lines in EVENTS.log (not my own), and PR state changes (state, mergeable, fail count, done flag).
MR=/Users/shawwalters/Documents/Codex/2026-10-24/mega-run
( tail -n0 -F $MR/EVENTS.log 2>/dev/null | grep --line-buffered -i -E 'mayhem|mg-M-' | grep --line-buffered -v 'mg-M-int' ) &
prev=""
while true; do
  cur=""
  for n in "$@"; do
    s=$(gh pr view $n --repo lalalune/pumpfun-source --json state,mergeable --jq '"\(.state) \(.mergeable)"' 2>/dev/null || echo "ERR")
    ch=$(gh pr checks $n --repo lalalune/pumpfun-source 2>/dev/null | awk -F'\t' '{print $2}')
    f=$(echo "$ch" | grep -c -E '^fail'); p=$(echo "$ch" | grep -c -E '^pending')
    d=$([ "$p" = 0 ] && echo done || echo running)
    cur="$cur PR#$n $s fail=$f $d"
  done
  if [ "$cur" != "$prev" ]; then echo "$(date +%H:%M)$cur"; prev="$cur"; fi
  sleep 120
done
