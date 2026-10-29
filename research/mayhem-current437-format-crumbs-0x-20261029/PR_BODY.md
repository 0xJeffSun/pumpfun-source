## Summary

Count **11** previously uncovered `.rodata` bytes in leftover gap `[723439, 723663)`: seven format crumbs / `0x` prefix bounded only by classic `lddw`+`mov` text-site immediates (18 proof sites). Early crumbs and the digit/`[...]` table stay open.

## Coverage

- Baseline (option-seeds-paths): 21,451 / 26,180 payload
- After: 21,462 / 26,180 (+11 `.rodata`)
- Added union: `[723447, 723458)`

## Still open in assigned gap

- `[723439, 723447)` — no classic text-site length at `pc+16`
- `[723458, 723663)` — digit table / `[...]` (no full-span length bound)

## Verification

Four local checks green (`verify` / `test_verify` / `verify_evidence` / `test_tooling`) with `PYTHONDONTWRITEBYTECODE=1 python3.12 -B`.

## Attribution

provider=OpenCode model=opencode/deepseek-v4.1-flash-free client=opencode CLI 1.19.5
