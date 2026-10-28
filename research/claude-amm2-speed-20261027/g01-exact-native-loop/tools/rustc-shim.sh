#!/bin/bash
# rustc shim (v2) for exact native reproduction of the authenticated Linux v1.44 SBPF build (speed lane).
# Cargo derives every crate's -C metadata from (a) the `host:` line of `rustc -vV` (dev-channel rustc) and (b) the host
# dependency graph, whose platform-conditional edges it evaluates with the host `--print=cfg`. On aarch64-apple-darwin the
# host graph gains cpufeatures -> libc (absent on x86_64 Linux), which changes the metadata of cpufeatures, sha2, anchor-syn,
# every Anchor/SPL proc macro, then anchor-lang/anchor-spl/spl-* and the root crate -> different symbol hashes and layout.
# This shim makes cargo see the Linux host in both places:
#   1. `rustc -vV`: host line reported as x86_64-unknown-linux-gnu;
#   2. the host target-info probe (`rustc - --crate-name ___ ... --print=cfg`, no --target): file-names/sysroot/split-debuginfo
#      come from the real compiler, the cfg section from `--print=cfg --target x86_64-unknown-linux-gnu`;
#   3. the host-only build of cpufeatures still runs on aarch64 macOS, whose code path needs libc: it gets
#      `--extern libc=<hostdeps/liblibc-*.rlib>` (a host-only proc-macro helper; nothing of it reaches the SBPF program).
# Every other invocation is passed through unchanged to the real Darwin compiler, whose sysroot holds the official Linux
# sbpf target rlibs.
D="$(cd "$(dirname "$0")/.." && pwd)"; REAL="$D/rust/bin/rustc"; HD="$D/hostdeps"
if [ "$#" -eq 1 ] && [ "$1" = "-vV" ]; then
  out="$("$REAL" -vV)" || exit $?
  printf '%s\n' "$out" | sed 's/^host: .*/host: x86_64-unknown-linux-gnu/'
  exit 0
fi
probe=0; target=0; cpuf=0; prev=
for a in "$@"; do
  case "$a" in
    --print=cfg) [ "$prev" != "" ] || true; probe=$((probe|1));;
    ___) probe=$((probe|2));;
    --target|--target=*) target=1;;
    cpufeatures) [ "$prev" = "--crate-name" ] && cpuf=1;;
  esac
  prev="$a"
done
if [ $probe -eq 3 ] && [ $target -eq 0 ]; then
  out="$("$REAL" "$@")" || exit $?
  cfg="$("$REAL" - --crate-name ___ --print=cfg --target x86_64-unknown-linux-gnu < /dev/null)" || exit $?
  printf '%s\n' "$out" | sed -n '1,/^___$/p'
  printf '%s\n' "$cfg"
  [ -n "${SHIM_LOG:-}" ] && echo "probe-spliced $*" >> "$SHIM_LOG"
  exit 0
fi
if [ $cpuf -eq 1 ] && [ $target -eq 0 ]; then
  [ -n "${SHIM_LOG:-}" ] && echo "cpufeatures+libc $*" >> "$SHIM_LOG"
  exec "$REAL" "$@" --extern libc="$(ls "$HD"/liblibc-*.rlib | head -1)" -L dependency="$HD"
fi
if [ $target -eq 0 ]; then exec "$REAL" "$@" -L dependency="$HD"; fi
exec "$REAL" "$@"
