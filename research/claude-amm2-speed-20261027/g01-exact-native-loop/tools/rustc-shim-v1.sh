#!/bin/bash
# rustc shim for exact native reproduction of the authenticated Linux v1.44 SBPF build.
# Cargo mixes the `host:` line of `rustc -vV` into every crate's -C metadata hash (dev-channel rustc),
# which feeds StableCrateId -> symbol hashes -> function order. Report the Linux build host so cargo
# derives the same -C metadata values as the Linux container; every other invocation is passed through
# unchanged to the real (Darwin) compiler, whose sysroot holds the official Linux sbpf target rlibs.
REAL="$(cd "$(dirname "$0")/.." && pwd)/rust/bin/rustc"
if [ "$#" -eq 1 ] && [ "$1" = "-vV" ]; then
  out="$("$REAL" -vV)" || exit $?
  printf '%s\n' "$out" | sed 's/^host: .*/host: x86_64-unknown-linux-gnu/'
  exit 0
fi
exec "$REAL" "$@"
