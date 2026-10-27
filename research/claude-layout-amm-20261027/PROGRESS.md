# layout-amm progress log

Lane: `layout-amm` (claude), branch `claude/layout-amm-20261027`.
Scratch: `SP/lanes/layout-amm/{out,target,cache}` where
`SP=/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/bf960843-6806-451b-a211-62c8b228d301/scratchpad`.

## Baseline
- Frontier `repro/pump_amm/native-fee-cpi-recovery-20261027` (origin/main 9f951808a):
  candidate `a4b978ee…`, symbols `784592ce…`; 785 windows, 599 normalized, 125 raw, 186 unmatched.
- (Earlier frontier structural-tlv `5c1e8b18…` was 586/124; superseded before any work was committed.)

## Environment (how to resume)
- Lane copies: `SP/lanes/layout-amm/cache/cargo-home` (copy of REPO/work/amm-pubkey-provenance-final-20261027/cargo-home),
  `SP/lanes/layout-amm/target/linux` (copy of REPO/work/amm-workspace-current-20261027/target; all 732 dependency
  artifacts match the frontier record). Frontier source copy: `SP/lanes/layout-amm/out/src/nfc`.
- `tools/build_linux.py` mounts those copies at the frontier's container paths (fresh fingerprints), SDK read-only from
  REPO/work/amm-linux-v144-20261027/sdk, takes sbf (6) then podman (2) locks. ~3–5 min incl. lock waits.
- `tools/relink.py` re-links a captured kit natively with Mac rust-lld v1.44 (identical output to Linux lld, verified
  twice: default and text-order-v1). Iterate with `SP/lanes/layout-amm/out/iter.sh <name>` (plan → relink → measure → compare).
- Runtime: `PYTHONDONTWRITEBYTECODE=1 REPO/work/test-env/bin/python -B repro/pump_amm/native-fee-cpi-recovery-20261027/replay_parallel.py
  --candidate <so> --output <dir>` from the worktree (needs sparse dirs pool-serialization-thirty-seven, owner6048-v144,
  research/imported-lab). Takes ~2 min.

## Verified gains
1. text-order-v1 (commit: see git log) — qualified `.text` input-section order from `tools/plan.py`
   (unique + graph/locality + call-graph assignment). 125 → 166 raw, 599 normalized kept, 0 lost.
   Linux build == native relink (`1e6402d1…` / `e3ca12ec…`). Runtime 17,462/17,462 pass.

## Negative / neutral controls
- plan v0 (no object-locality scoring): 125 → 156 raw (finish_grow copies placed in the wrong rlib regions;
  e.g. 0xfcb60 left empty). Superseded by locality scoring (+10).
- Same-object gap fill (unplaced window between two placed sections of one dependency member): no case applies
  on this checkpoint.

## Open next steps
- Data order (.rodata / .data.rel.ro relative offsets) for composition once text size matches.
- Repeat Linux build of the final layout for a two-build identity record.
- Watch origin/main for a newer AMM frontier and re-run the generator on it.
