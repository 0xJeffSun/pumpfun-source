#!/bin/bash
set -e
printf '%s\n' "$@" > /work/next622/sharing578-composed-order-repeat-link-args.txt
args=("$@")
for ((i=0; i<${#args[@]}; i++)); do
  if [[ "${args[i]}" == "-T" || "${args[i]}" == "--script" ]]; then
    cp "${args[i+1]}" /work/next622/sdk-default.ld
    args[i+1]=/work/next622/sharing578-composed-order-repeat/ordered.ld
  elif [[ "${args[i]}" == --script=* ]]; then
    cp "${args[i]#--script=}" /work/next622/sdk-default.ld
    args[i]=--script=/work/next622/sharing578-composed-order-repeat/ordered.ld
  fi
done
printf '%s\n' "${args[@]}" > /work/next622/sharing578-composed-order-repeat-effective-args.txt
exec /work/sdk/rust/lib/rustlib/x86_64-unknown-linux-gnu/bin/rust-lld "${args[@]}"
