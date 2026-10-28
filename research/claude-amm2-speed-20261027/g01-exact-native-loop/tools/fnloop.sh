#!/bin/bash
# usage: fnloop.sh <lane> <source-root containing programs/pump-amm> <out-dir (new)> [<symbol-substring> <original-window-addr>]...
# Function-level loop on the EXACT toolchain: stage -> root-crate rustc --emit=llvm-ir only (one sbf slot, ~8 s of CPU; no link,
# strip or measure) -> for each (symbol, window) pair: extract that function, llc it with the target's codegen options and compare
# with the ORIGINAL window under measure.py's normalization (fnllc.py check). Keeps <out>/ir/pump_amm_recovered.ll for IR-level
# what-if edits: `fnllc.py check <edited.ll> <symbol> --orig <addr>` needs no slot at all (< 1 s).
# Confirm any real gain with native_exact_build.sh (full measure) and linux_build.py.
set -euo pipefail
SP=/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/d810a7ff-a81e-46b2-bacd-4cd9cadc52cb/scratchpad
T=$SP/shared/tools; lane=$1; L=$SP/lanes/$lane; SRC=$(cd "$2" && pwd); OUT=$3; shift 3
[ -e "$OUT" ] && { echo "output exists: $OUT"; exit 2; }
mkdir -p "$OUT"; OUT=$(cd "$OUT" && pwd)
MAINCK=$(cat $SP/shared/frontier/MAIN 2>/dev/null || echo optional-context-recovery-20261027)
RECIPE=${RECIPE:-$L/wt/repro/pump_amm/$MAINCK/workspace_recipe_v2.py}
TGT=${TARGET_DIR:-$L/target/xfn}
[ -e "$TGT" ] || cp -c -R $SP/shared/caches/xnative-v144 "$TGT"
python3 -B "$RECIPE" stage --source-root "$SRC" --output "$OUT/ws" > "$OUT/stage.json"
python3 $T/sync_registry.py --cargo-home $L/cargo-home --lock "$OUT/ws/Cargo.lock" >/dev/null
python3 $T/rustc_replay.py plan "$lane" "$OUT/ws" "$OUT/rootcmd.json" --exact --target-dir "$TGT" >/dev/null
t0=$(date +%s)
python3 $T/rustc_replay.py run "$OUT/rootcmd.json" --ws "$OUT/ws" --out-dir "$OUT/ir" --emit=llvm-ir --lock > "$OUT/rustc.log" 2>&1 || { tail -20 "$OUT/rustc.log"; exit 1; }
echo "ir: $OUT/ir/pump_amm_recovered.ll ($(( $(date +%s)-t0 ))s incl. lock wait)"
while [ $# -ge 2 ]; do
  python3 $T/fnllc.py check "$OUT/ir/pump_amm_recovered.ll" "$1" --orig "$2" --work "$OUT/fn-$2" || true
  shift 2
done
