#!/bin/bash
# usage: variant.sh <name> <patch-file> [base-stage-dir] [compare-measure.json]
# Copies a staged workspace, applies a unified diff (paths relative to programs/pump-amm/src),
# builds natively, measures, and reports gains/losses versus the comparison measurement.
set -euo pipefail
L=/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/bf960843-6806-451b-a211-62c8b228d301/scratchpad/lanes/amm-mid
NAME=$1; PATCH=$(cd "$(dirname "$2")" && pwd)/$(basename "$2"); BASE=${3:-$L/stage/base}; CMP=${4:-$L/out/native-base/measure.json}
S=$L/stage/$NAME; O=$L/out/$NAME
rm -rf "$S" "$O"; cp -R "$BASE" "$S"
( cd "$S/programs/pump-amm/src" && patch -p1 --no-backup-if-mismatch < "$PATCH" > /dev/null ) || { echo "PATCH FAILED"; exit 2; }
"$L/tools/native_build.sh" "$S" "$O" > "$O.buildout" 2>&1 || { cat "$O.buildout" | tail -30; exit 3; }
cd "$L/wt" && python3 repro/pump_amm/focused-diagnostics-20261026/measure.py --candidate "$O/candidate.so" --symbols "$O/unstripped.so" --output "$O/measure.json" > /dev/null
python3 - "$CMP" "$O/measure.json" <<'EOF'
import json, sys
a = json.load(open(sys.argv[1])); b = json.load(open(sys.argv[2]))
an = {r['start'] for r in a['rows'] if r['matches']}; bn = {r['start'] for r in b['rows'] if r['matches']}
ar = {r['start'] for r in a['rows'] if r['raw_match']}; br = {r['start'] for r in b['rows'] if r['raw_match']}
print('norm %d -> %d  raw %d -> %d' % (len(an), len(bn), len(ar), len(br)))
print('  gained norm', [hex(x) for x in sorted(bn - an)], ' lost norm', [hex(x) for x in sorted(an - bn)])
print('  gained raw', [hex(x) for x in sorted(br - ar)], ' lost raw', [hex(x) for x in sorted(ar - br)])
EOF
