#!/bin/bash
# Fleet B variant of wait_events.sh: blocks until EVENTS.log gains lines naming a fleet-B lane (or fleet B),
# or the time limit passes; prints only those lines (cut to 400 chars) and saves the offset.
# Usage: wait_events_b.sh <max_seconds> [offset_file]
MR=/Users/shawwalters/Documents/Codex/2026-10-24/mega-run
LOG=$MR/EVENTS.log
MAX=${1:-1800}
OFF=${2:-$MR/state/.events_offset_B}
PAT='mg-P-v3a|mg-P-v3b|mg-P-big|mg-P-cto2|mg-P-mig|mg-P-cash|mg-A-sp4|[Ff]leet[ -]B'
[ -f "$OFF" ] || wc -l < "$LOG" | tr -d ' ' > "$OFF"
start=$(cat "$OFF")
end=$((SECONDS + MAX))
while [ $SECONDS -lt $end ]; do
  now=$(wc -l < "$LOG" | tr -d ' ')
  if [ "$now" -gt "$start" ] && tail -n +"$((start + 1))" "$LOG" | head -n "$((now - start))" | grep -v 'fleet-B coordinator' | grep -Eq "$PAT"; then
    sleep 20   # let a burst of lines land together
    now=$(wc -l < "$LOG" | tr -d ' ')
    tail -n +"$((start + 1))" "$LOG" | head -n "$((now - start))" | grep -E "$PAT" | grep -v 'fleet-B coordinator' | cut -c1-400
    echo "$now" > "$OFF"
    exit 0
  fi
  sleep 20
done
echo "(no fleet-B events in ${MAX}s; $(date +%H:%M))"
