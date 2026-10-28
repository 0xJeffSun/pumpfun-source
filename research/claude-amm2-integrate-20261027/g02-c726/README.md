# g02 — placement g02 + integrate g01 + pool g01 composed on the 651 AMM frontier

Base checkpoint: `repro/pump_amm/optional-context-recovery-20261027` (origin/main `b855ede02`), candidate
`97bd5553c199cd24fb2d07034c365527bee5b138bf5dd7a0aa3099186aad2643` (651 normalized / 148 raw / 134 unmatched).
`source.patch` applies to its `results/canonical-source/` tree with `git apply` or `patch -p1 -E` (run from the
directory that contains `programs/`; it deletes `src/legacy_buy.rs`, `src/legacy_sell.rs` and `src/boost_burn.rs`);
`source/` holds every changed and new file in full.

| Authenticated Linux v1.44 SBPF | Normalized | Raw | Unmatched | Matched original text bytes |
| --- | ---: | ---: | ---: | ---: |
| Base `97bd5553…` | 651/785 | 148 | 134 | 816,800 |
| **This composition `4e58c4713979…`** | **726/785** | **148** | **59** | **896,608** |

**+75 normalized windows (+79,808 original text bytes), none lost, raw unchanged at 148.** Whole-ELF equality is
still false. Two Linux builds (`builds/a`, `builds/b`) produced identical stripped and unstripped ELFs
(`4e58c47139798d743c325c8ee9c3a98f4fd7cc4ceba2d6a5763e66899c4efd25` / `5d7209406468232971e9df2ac5c749457da0b4cfe5cbfb9dc331346ac0541763`) with every dependency artifact unchanged; the exact native build of the same tree
(SP/shared/tools/native_exact_build.sh, speed lane PR #318) produced the same bytes. Full runtime replay with the base
checkpoint's `replay_parallel.py`, all 25 maintained suites: **17,462 cases, 35,074 transactions, 0 mismatches**
(`runtime-summary.json`, `runtime-suites.json`).

## Composition ledger (`ledger.json`, `exact-steps.txt`)

Every step was built with the exact native toolchain (bytes equal to the authenticated Linux build) and kept only because
it loses no normalized or raw window against the previous step.

| step | input | exact native result |
| --- | --- | --- |
| w0 | 651 canonical source | 651/148/134 (`97bd5553…`, = the checkpoint) |
| w1 | placement g02 `667e5417b` (PR #315): source-coordinate solver on 651 + legacy sell module path | 693/148/92: +42 |
| w2 | integrate g01-c680 `e0a8f2a21` (PR #319): amm-lo `dda784ddc` + amm-hi `d92fefba8` | 723/148/62: +30 |
| w3 | pool g01 `d4f38ce26` (PR #314): boost module merge, create_pool closure, liquidity placement | 726/148/59: +3 |
| — | placement solver rerun on w3 with w3's own unstripped build | 0 files changed, 0 predicted gains (every placeable site already placed) |

Rebase notes (details per step in `ledger.json`):
- placement g02 is 651-based and applies unchanged.
- g01's hunks all apply on top of it. Its one-line `legacy_sell.rs` path change goes into the merged
  `instructions/swap/sell.rs`. amm-hi's `pub use trade::{execute_buy, execute_buy_exact_quote, execute_sell};` is dropped:
  651 moved those handlers into `instructions/swap/trade_v2.rs` and matches the three V2 dispatch wrappers
  (`0xe8ae8 0xe8f10 0xe9338`) by itself, and the re-export no longer compiles there (E0364). g01 alone on 651 gives
  681/148/104: the same 30 windows.
- pool g01: its deposit/withdraw placement is amm-lo's, already present byte-for-byte. Its `instructions/boost.rs` and
  `instructions/create_pool.rs` are taken whole; neither file changed between 647 and 651. `boost_burn.rs` is deleted,
  and its three `lib.rs` edits are redone by hand. amm-hi's boost-harvest change is applied again inside the merged
  `boost.rs` with the same line count, so pool's placed lines stay (import line → blank; two harvest lines → a two-line
  `harvest_to_mint` call). Pool's `create_pool.rs` replaces placement's whitespace-only one. Both place `0x2e468`;
  pool's also closes `0x2e260`.
- Not composed: layout g02 (PR #316, linker input-section order). It is generated from one candidate build, so the
  layout lane regenerates it on this tree. Also not composed: speed g01 (tooling, used here) and amm-mid (superseded since 647).

## Newly matched original windows (75) by source packet

| from | windows | kind (per the source packet's own accounting) |
| --- | --- | --- |
| placement g02 (42) | `0x11e70` `0x123a0` `0x12840` `0x12b08` `0x13190` `0x13d30` `0x2e468` `0x3d8d0` `0x446a0` `0x448a8` `0x44cc8` `0x44ed0` `0x450d8` `0x4bf30` `0x4c138` `0x4c340` `0x4c548` `0x4ea90` `0x4efb8` `0x4f1d8` `0x4ff18` `0x50ca8` `0x516e0` `0x52070` `0x57e20` `0x61630` `0x61898` `0x61b00` `0x61d68` `0x62688` `0x62c40` `0x62e68` `0x63778` `0x6b780` `0x6ba68` `0x6bcd0` `0x6bf50` `0x6c328` `0x6c768` `0x6d128` `0xd44e0` `0xd4f90` | placement-dependent (whitespace placement, impl-fn reorder, legacy sell module path); `0x123a0` also needs the `base_for_buy` copy (code); see that packet's README for its split |
| integrate g01 (30) | `0x17960` `0x1b510` `0x1b7c0` `0x1bb00` `0x31710` `0x31918` `0x31b20` `0x31d28` `0x31f30` `0x32138` `0x32340` `0x32548` `0x34370` `0x34578` `0x34780` `0x34988` `0x34b90` `0x34d98` `0x34fa0` `0x37150` `0x39d80` `0x39f88` `0x3a190` `0x3a398` `0x74900` `0x74e30` `0xaf3b0` `0xe9b90` `0xe9fc0` `0xf6eb0` | 8 code-only → 5 here (`0x17960 0x74e30 0xf6eb0 0xe9b90 0xe9fc0`; the 3 V2 wrappers are in 651); 5 moved-file + line; 16 whitespace-only; 4 restored code + placement |
| pool g01 (3 new) | `0x1ecd8` `0x22c80` `0x2e260` | `0x1ecd8` placement only; `0x22c80` module structure + placement; `0x2e260` code shape + placement |

Placement framing (repository precedent `repro/donation-relay/source-location-recovery`): these source layouts
reproduce measured coordinates, not the unknown historical comments, whitespace or exact source organization. No
original executable bytes enter the compiler; no generated executable is patched. `token-stream-proof.{txt,json}`
accounts for every changed token of the composed tree against the 651 source (whitespace-only files; items moved with
identical tokens; each remaining code difference listed). `coordinate-provenance.json` covers all 56 gained windows
that carry an original Location: the repository's decoded original Source record (base `remaining-work.json`
`historical_source_hint`) and the original instruction whose immediate stores that line (56/56 found). The input
packets carry their own solver reports and proofs (placement `solve-report*.json`, pool `placement/`).

## Rebuild

```sh
B=repro/pump_amm/optional-context-recovery-20261027/results
cp -R $B/canonical-source /tmp/g02 && cd /tmp/g02
git apply <repo>/research/claude-amm2-integrate-20261027/g02-c726/source.patch
# build with the base checkpoint's workspace_recipe_v2.py stage + the authenticated Linux v1.44 image;
# builds/a/build-record.json records the container command, environment, mounts and dependency hashes.
gunzip -k candidate.so.gz unstripped.so.gz && shasum -a 256 -c SHA256SUMS
python3 repro/pump_amm/focused-diagnostics-20261026/measure.py --candidate candidate.so --symbols unstripped.so --output m.json
```

## Residuals

The remaining 59 windows are the base `remaining-work.json` partition minus the 75 above. Open leads noticed while
composing: `0xb3460` (`buy.rs:409` Overflow closure, identical to `0x39d80` but for the line; the legacy buy handler
`0x376b0` has the 405/409 sites); the legacy buy/sell handler bodies; layout regeneration on this tree.
