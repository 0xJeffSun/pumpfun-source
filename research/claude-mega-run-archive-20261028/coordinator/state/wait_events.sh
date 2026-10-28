#!/bin/bash
# Usage: wait_events.sh <max_seconds> <offset_file>
# Blocks until EVENTS.log has lines past the saved offset (or the time limit passes), prints the new lines, saves the offset.
MR=/Users/shawwalters/Documents/Codex/2026-10-24/mega-run
LOG=$MR/EVENTS.log
MAX=${1:-540}
OFF=${2:-$MR/state/.events_offset}
[ -f "$OFF" ] || wc -l < "$LOG" | tr -d ' ' > "$OFF"
start=$(cat "$OFF")
end=$((SECONDS + MAX))
while [ $SECONDS -lt $end ]; do
  now=$(wc -l < "$LOG" | tr -d ' ')
  if [ "$now" -gt "$start" ]; then
    sleep 20   # let a burst of lines land together
    now=$(wc -l < "$LOG" | tr -d ' ')
    tail -n +"$((start + 1))" "$LOG" | head -n "$((now - start))"
    echo "$now" > "$OFF"
    exit 0
  fi
  sleep 15
done
echo "(no new events in ${MAX}s; $(date +%H:%M))"
