#!/bin/bash
# rustc -Clinker wrapper for the PumpSwap layout recipe.
#
# It forwards every argument to the SDK rust-lld unchanged, except that the
# single SDK linker script (-T/--script) is replaced by ORDERED when ORDERED is
# non-empty. It records the incoming and effective arguments and keeps a copy of
# the transient link inputs (root objects, symbols.o, version script) so the same
# link can be repeated offline. No object, section or output byte is edited.
set -euo pipefail
REAL='/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-linux-v144-20261027/sdk/rust/lib/rustlib/x86_64-unknown-linux-gnu/bin/rust-lld'
ORDERED='/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/d810a7ff-a81e-46b2-bacd-4cd9cadc52cb/scratchpad/lanes/layout/out/builds/ocr-data-1/ordered.ld'
KIT='/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/d810a7ff-a81e-46b2-bacd-4cd9cadc52cb/scratchpad/lanes/layout/out/builds/ocr-data-1/link'
mkdir -p "$KIT/inputs"
printf '%s\n' "$@" > "$KIT/incoming-args.txt"
args=("$@")
n=0
for ((i = 0; i < ${#args[@]}; i++)); do
  a="${args[i]}"
  if [[ "$a" == "-T" || "$a" == "--script" ]]; then
    cp "${args[i+1]}" "$KIT/sdk-default.ld"
    if [[ -n "$ORDERED" ]]; then args[i+1]="$ORDERED"; fi
    n=$((n + 1))
  elif [[ "$a" == --script=* ]]; then
    cp "${a#--script=}" "$KIT/sdk-default.ld"
    if [[ -n "$ORDERED" ]]; then args[i]="--script=$ORDERED"; fi
    n=$((n + 1))
  fi
done
if [[ $n -ne 1 ]]; then
  echo "link-wrapper: expected exactly one linker script argument, saw $n" >&2
  exit 97
fi
for a in "${args[@]}"; do
  case "$a" in
    --version-script=*) cp "${a#--version-script=}" "$KIT/inputs/version-script" ;;
    *.o) if [[ -f "$a" ]]; then cp "$a" "$KIT/inputs/"; fi ;;
  esac
done
printf '%s\n' "${args[@]}" > "$KIT/effective-args.txt"
exec "$REAL" "${args[@]}"
