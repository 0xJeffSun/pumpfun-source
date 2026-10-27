#!/bin/bash
set -e
printf '%s\n' "$@" > /work/next605/qualified-replaced-link-args.txt
args=("$@")
for ((i=0; i<${#args[@]}; i++)); do
  if [[ "${args[i]}" == "-T" || "${args[i]}" == "--script" ]]; then
    cp "${args[i+1]}" /work/next605/sdk-default.ld
    args[i+1]=/work/next605/qualified-replaced/ordered.ld
  elif [[ "${args[i]}" == --script=* ]]; then
    cp "${args[i]#--script=}" /work/next605/sdk-default.ld
    args[i]=--script=/work/next605/qualified-replaced/ordered.ld
  fi
done
printf '%s\n' "${args[@]}" > /work/next605/qualified-replaced-effective-args.txt
exec /work/sdk/rust/lib/rustlib/x86_64-unknown-linux-gnu/bin/rust-lld "${args[@]}"
