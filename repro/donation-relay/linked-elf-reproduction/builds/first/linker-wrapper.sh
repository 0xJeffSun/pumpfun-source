#!/bin/bash
set -e
printf '%s\n' "$@" > /work/section-order-unquoted/link-args.txt
args=("$@")
for ((i=0; i<${#args[@]}; i++)); do
  if [[ "${args[i]}" == "-T" || "${args[i]}" == "--script" ]]; then
    cp "${args[i+1]}" /work/section-order-unquoted/default.ld
    args[i+1]=/work/section-order-unquoted/ordered.ld
  elif [[ "${args[i]}" == --script=* ]]; then
    cp "${args[i]#--script=}" /work/section-order-unquoted/default.ld
    args[i]=--script=/work/section-order-unquoted/ordered.ld
  fi
done
printf '%s\n' "${args[@]}" > /work/section-order-unquoted/effective-args.txt
exec /sdk/rust/lib/rustlib/x86_64-unknown-linux-gnu/bin/rust-lld "${args[@]}"
