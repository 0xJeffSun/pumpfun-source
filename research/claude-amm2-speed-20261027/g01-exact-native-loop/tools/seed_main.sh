#!/bin/bash
# usage: seed_main.sh <lane> [checkpoint-name]   (default: SP/shared/frontier/MAIN)
# Builds the checkpoint's canonical source once in each flavor (exact, then plain native) so every lane's baseline build of that
# checkpoint is a shared-cache hit (~6 s, no slot). Prints the exact result next to the checkpoint's authenticated Linux sha256.
set -euo pipefail
SP=/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/d810a7ff-a81e-46b2-bacd-4cd9cadc52cb/scratchpad
lane=$1; L=$SP/lanes/$lane; CK=${2:-$(cat $SP/shared/frontier/MAIN)}
P=$L/wt/repro/pump_amm/$CK; [ -d "$P" ] || git -C $L/wt sparse-checkout add repro/pump_amm/$CK
O=$L/out/seed-$CK-$(date +%H%M%S)
export RECIPE=$P/workspace_recipe_v2.py
bash $SP/shared/tools/native_exact_build.sh $lane $P/results/canonical-source $O-exact | grep -E 'timing|normalized|raw_matches'
bash $SP/shared/tools/native_build.sh $lane $P/results/canonical-source $O-plain | grep -E 'timing|normalized|raw_matches'
echo "exact candidate: $(shasum -a 256 $O-exact/candidate.so | cut -c1-64)"
echo "linux candidate: $(shasum -a 256 $P/results/build/candidate.so 2>/dev/null | cut -c1-64)"
