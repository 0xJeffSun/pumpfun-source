# layout-pump progress log

Lane: `layout-pump` (raw matches and whole-ELF layout for main Pump). Branch
`claude/layout-pump-20261027`. Scratch: `SP/lanes/layout-pump/out`, targets:
`SP/lanes/layout-pump/target` (SP = the session scratchpad).

## State (newest first)

### 2026-10-27 — Round22 full evidence committed; Round23 baseline building
- **Round22: 123 raw → 135 raw**, 711 normalized, 0 lost. Two complete builds
  identical (`076584d4…`/`590c932d…`) = relink. 44-suite corpus: 10,468 cases,
  10,464 log cases, 0 mismatches (single validator pass).
- Round20/21 repackaged as v3 relink-only evidence (132 / 135 raw).
- Round22 recovered the `burn` callers: windows 0x180cc0 and 0x192c20
  (identified earlier by `tools/archive_identify.py`) now match.
- Round23 published (712 normalized, 123 raw). Its archived primary source was
  extracted to `out/r23-packet/` with `git archive` and its baseline is building
  in `out/builds/r23-baseline` (the worktree was not rebased while Round22
  builds/runtime re-hashed `programs/pump`).

### 2026-10-27 — v3 generator, Round22 (newest) builds + runtime running
- v3 adds region-restricted skeleton-equal counterparts (pins `type_id` bodies
  whose only difference is the TypeId constant). Same-object preference also
  applies to counterpart choice.
- **Round22: 123 raw → 135 raw** (711 normalized, 0 lost) by relink; Round21
  123 → 135, Round20 120 → 132 (relink-only evidence, packaged by
  `tools/package_round.py`). Twelve gained windows, identical on all rounds.
- Round22 baseline build reproduces published `3e0c22f4…`/`fc1f5bea…`. Ordered
  relink candidate `076584d4…`/`590c932d…`; two real builds running
  (`out/builds/r22-v3-first`, `-second`), 44-suite corpus running on
  `wt/work/layout-runtime/r22-v3` (2 workers).
- To finish: `tools/package_round.py --round round22 --frontier
  repro/pump/main-contract-round22-20261027 --baseline-build out/builds/r22-baseline
  --layout out/layouts/r22-v3 --ordered-builds out/builds/r22-v3-first
  out/builds/r22-v3-second --runtime-summary <summary> --runtime-adapter-dir
  wt/work/layout-runtime/r22-v3`, fill README PENDING-* fields, write_manifest,
  verify, test_scope, commit.

### 2026-10-27 — Round21 checkpoint committed; Round22 next
- Generator v2 (same-object preference for identical copies) replaces v1 (same
  raw; v1 took 26 copies from other objects). Round21 ordered candidate
  `f69c5682…` / unstripped `476c6765…`: two complete builds identical, equal
  to the relink. **Round21: 123 raw → 130 raw**, 708 normalized, 0 lost.
- Runtime: 44 suites / 10,468 cases / 10,464 log cases / 0 mismatches on
  `f69c5682…` (validator copies under gitignored `wt/work/`, adapter records
  in `round21/runtime/`). The tokenkeg suite needs `build-attempt.json` next to
  the validator build record.
- `verify.py` (offline) and `test_scope.py` (7 negative controls) pass.
- origin/main moved to Round22 (711 normalized, 123 raw); branch fast-forwarded.

### 2026-10-27 — Round21 ordered layout, real builds running
- origin/main moved Round18 → Round20 → Round21 during the session; the branch
  was fast-forwarded (no lane commits existed yet). Maintained `programs/pump`
  equals the Round21 archived primary source.
- Round21 passthrough baseline rebuilt by `tools/build.py` reproduces the
  published hashes exactly (candidate `092bae26…`, unstripped `5239ba7e…`).
- Generator (`tools/derive_layout.py`) unchanged from Round20 → ordered script
  `round21/ordered.ld` (922 qualified selectors). Relink measurement:
  **Round21: 123 raw → 130 raw**, 708 normalized kept, zero raw/normalized loss.
  Repo tool `work/pump-reserve-byte-recovery/inventory_current.py` (copied
  unmodified, sha256 `06c47748…`) agrees: raw 130, normalized 708.
- Translation proof (`tools/translation.py`) passes: 922 sections, 10,680
  direct calls, 116 lddw `.text` pointers, 158 data pointers, 5,763
  relocations, entry point; every other allocated byte equal.
- Pending: two real ordered builds (dependency-reuse + empty target), the
  44-suite captured-loader runtime corpus on the built candidate, packet commit.

### Round20 (superseded base, same generator)
- Passthrough build reproduced Round20 exactly (`e434fb02…` / `41edcce6…`)
  twice (fresh target, dependency reuse).
- **Round20: 120 raw → 127 raw**, 705 normalized kept, zero loss. Gains:
  0x18a4d8, 0x18a888, 0x1a2340, 0x1b3220, 0x1b38c0, 0x1b4088, 0x1b40d0.

## Key facts for a continuation agent
- Raw equality of a body needs (a) the same call displacements and (b) the same
  absolute data addresses. Candidate `.text` is ~110 KB smaller than the
  original, so `.rodata` starts earlier and every data operand differs. Only
  call-only windows (no data operands) can become raw through ordering today.
- Ceiling with every unmatched slot size-neutral: 328 raw on Round20. Actual
  limit is set by unmatched windows that change net size between callers and
  callees (`residuals.json.gz` lists them as `call_only_blockers`).
- Do not use filler/packing orders that put unrelated functions in unmatched
  slots to equalize distances: rejected as gaming the local metric.
- Build hook: `RUSTC_WRAPPER=tools/rustc_wrapper.py` adds `-C linker=tools/linker.py`
  to the root crate's cdylib rustc only (Cargo never sees it, metadata/hash
  unchanged). linker.py swaps rustc's temporary default script for the ordered
  one (checked: SDK default + expanded `.text` input list only) and records a map.
- Fast trials: `tools/relink.py --build-dir <build> --script <ld>` repeats the
  recorded link (bit-identical to the build when given the default script).

## Re-applying to a new round
```sh
python3 SP/sbf_lock.py --slots 6 --name sbf -- python3 tools/build.py --output OUT/base --target-dir TGT
python3 tools/derive_layout.py --windows-from repro/pump/<round>/inventory.json.gz \
  --candidate OUT/base/unstripped.so --map OUT/base/link/link.map --output-dir OUT/layout
python3 SP/sbf_lock.py --slots 6 --name sbf -- python3 tools/build.py --output OUT/ordered \
  --target-dir TGT --linker-script OUT/layout/ordered.ld
python3 tools/measure.py --candidate OUT/ordered/unstripped.so --windows-from repro/pump/<round>/inventory.json.gz
```
