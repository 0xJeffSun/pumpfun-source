# PumpSwap AMM union composite 5: 769 -> 773/785 normalized, raw 163, layout layer raw 247

Follow-up to [`research/claude-amm-union4-20261028`](../claude-amm-union4-20261028/README.md) (merged as #464,
Linux 769/785, 160 raw source-only, 175 raw with its layout layer). It composes three fz-run lane windows and the merged
contributor packet [`research/amm-mint-scanner-raw-20261028`](../amm-mint-scanner-raw-20261028/README.md) (#480), and it
regenerates the **separately labeled layout layer** (a linker order **generated from the original program's layout**).

This is a research packet: the maintained `programs/` tree and `repro/status.json` are untouched.

| Linux v1.44 build (authenticated recipe) | normalized | raw |
|---|---:|---:|
| parent `research/claude-amm-union4-20261028` (symbols `576eb629…`) | 769/785 | 160 |
| **this candidate, source only** (symbols `bcfb3acd…`, stripped `ae44111a…`) | **773/785** | **163** |
| this candidate **+ generated layout layer** (stripped `d532617a…`) | 773/785 | 247 |

- **Source-only result:** +4 normalized windows (`0x2288 0xfb08 0x50f00 0xf28b8`), +3 raw (`0xf28a8 0xf28b8 0x111360`),
  with zero normalized and zero raw losses against the parent.
- **Layout layer:** same 773 normalized set; raw 163 -> 247 with no raw loss against the source-only image. The mint
  scanner `0xf28b8` now has its original size, so the generated order puts many later `.text` windows at their original
  addresses. Against the parent's layout layer (175 raw) this gains 73 raw windows and **loses one, `0x4fac0`**
  (`amm_hop`'s out-of-line `quote_reserves`; normalized-equal in both, raw differs only under the layout layer).
- **Native macOS build** of the same tree: 768/154 (it differs from Linux only in 5 sysroot TypeId windows and raw layout).
- **Runtime:** the 25 maintained suites report 17,462 cases / 0 mismatches for both images; the five incentive
  error-order controls (`negative/`) agree 5/5 for both images.
- **Still open:** 12 windows are unmatched (`measurement.json` `unmatched`), and whole-ELF identity is still false.

## What changed (`composition.json`, `source.patch`, `source-changes.json`)

Five files change against the parent archive.

- **s17 `0xfb08 0x50f00`** (lane fz-A-small-r1-02): multi-hop flags `from_iter`. `lib.rs` line 26 re-exports
  `multi_hop_swap::execute`, so `execute` is standalone and `from_iter` stays out of line. The flags closure captures `buy`
  (`let buy = !sell;`, `match (buy, j == 0, j + 1 == count)`). The second window is `trade_v2::estimate_buy_quote`:
  - a block-scoped `amounts` array feeds `total_quote`;
  - `require_gt!(quote, 0, ..)` moves inside the `if required > available` branch (in the else path `quote == estimate`,
    which line 328 already requires to be > 0, so errors are unchanged);
  - the function ends with `return Ok((quote, AppliedFees{..}))`.
- **s17 `0x2288`** (lane fz-A-srf-r1-01): anchor `Error::with_account_name::<String>`, whose only caller is
  `set_reserved_fee_recipients`. The RentExempt check is written `if unlikely(!rent.is_exempt(..))` with the stable
  branch-hint idiom (`#[inline] #[cold] fn cold() {}` and `#[inline] fn unlikely(b: bool) -> bool { if b { cold(); } b }`,
  as in hashbrown/five8), appended after the handler. The error block becomes cold, so LLVM keeps `alloc::fmt::format`
  and `with_account_name<String>` out of line there while the Executable site stays inlined, as in the original.
  `unlikely(b)` returns `b`: no behavior change.
- **s18 `0xf28b8`** (contributor PR #480, merged): `research/amm-mint-scanner-raw-20261028/source.patch` applied unchanged
  to `crates/native-transfer-fee/src/lib.rs` (raw-identical 1,192-byte mint extension scanner). That packet built the
  function standalone; this packet builds and measures it inside the whole program. It is the same file as mega-run lane
  fz-A-vol-r1-01 (checked byte-equal).

Each step was kept only with zero normalized and zero raw losses natively, then rebuilt with the Linux recipe.
Errors, checks, events and CPI order are unchanged on the 25-suite replay and the error-order controls.

## Positioning devices (all of them, these steps)

- **fz-A-small-r1-02:** blank lines inside `estimate_buy_quote` keep `require_gt!` at `trade_v2.rs` lines 328 and 346.
  One blank line after the function was removed, so every later `trade_v2.rs` line is unchanged. The `lib.rs` line 26
  re-export is changed in place. No `#[inline]` attributes or file moves.
- **fz-A-srf-r1-01:** the `cold`/`unlikely` **branch-hint helper** listed above. It is a codegen hint, not dead code;
  reviewers should judge whether it meets the admission bar. Line-neutral (helpers appended after the handler).
- **PR #480:** none. Its own packet lists its source-shape choices (completion label, `#[inline]` step helper, macro checks).

Devices from earlier steps are listed in the parent packets. `source-changes.json` has per-file layout counts.

## Layout layer (`layout/`, mega-run rule 4b)

**`layout/ordered.ld` is generated from the original deployed program's layout. It is not evidence of historical build
provenance.** Same method as the parent:

1. `tools/lbuild-raw.sh` builds the root crate through `lwrap-lin.sh`. The output is byte-identical to the source-only
   build, and the link map is saved.
2. `tools/lay.py --mode order` writes the order: `.text` input sections in original window order, `.rodata`/`.data.rel.ro`
   atoms in bound original-address order, no padding, no address assignments.
3. The program is relinked with that script.

`verify.py` regenerates `ordered.ld` from the source-only build plus the saved link map and requires the same bytes.

## Builds, runtime, verify

- **Builds:** `builds/a` and `builds/b` (source only) and `layout/builds/a` and `layout/builds/b` use the parent recipe
  (pinned `solana-verifiable-build` image, recorded mounts and cargo command; `tools/lbuild.sh`, `tools/lbuild-raw.sh`).
  Each pair is byte-identical. Only the two workspace crates recompile. The existing
  `admin_update_token_incentives` stack-frame diagnostic remains, as in the parent; this is not a warning-free build.
- **Runtime (reported):** `runtime/` and `layout/runtime/` each report 25 suites, **17,462 cases, 35,074 transactions,
  35,418 signatures, 0 mismatches**, bound to the respective stripped image and to the repository harness hashes. As in
  the parent, the per-case receipts are not included, so the verifier checks the reported totals and input hashes only.
- **Error-order controls (`negative/`):** the PR434/PR464 producer and fixture, byte-identical, re-run for both images with a
  fresh VM per execution: 5/5 pairs agree for each image (20 signed executions).

```sh
python3 -I -B research/claude-amm-union5-20261028/verify.py
python3 -I -B research/claude-amm-union5-20261028/negative/verify.py --signatures   # needs solders
python3 -I -B research/claude-amm-union5-20261028/test_verify.py
```

`verify.py` uses the standard library only. It checks:

- exact packet membership and hashes (rejecting symlinks and special files first);
- the source archive against the staged build inputs, and `source.patch` rebuilt from the parent archive;
- both build pairs;
- the source-only, layout and parent measurements, recomputed against `evidence/original/pump_amm/deployed.so`;
- the regenerated `ordered.ld`;
- both reported runtime summaries against the repository harness hashes;
- the five-pair error-order record for each image.

## Limits

Still open:

- whole-ELF identity;
- 12 unmatched windows: `0x19138 0x2ba60 0x2e720 0x351a8 0x3a5a0 0x3dbc0 0x40a08 0x45940 0x4c750 0x54a20 0x6d408 0x6db20`;
- the layout-layer raw loss of `0x4fac0` against the parent's layout layer;
- the merged constant-pool order, which needs source-order work.

Normalized equality masks address and call operands; it is not raw identity. The positioning devices and the generated
layout reproduce original line numbers and addresses. They are not claims about the original file layout or build process.
The runtime evidence is synthetic local execution, not a whole-program equivalence proof.
