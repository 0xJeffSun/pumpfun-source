# amm2 lane `integrate` — progress / continuation notes

Composition engine for the PumpSwap AMM (`pump_amm`). Combines every verified gain on top of main's newest AMM
checkpoint, publishes each combined candidate as a packet `gNN-c<normalized>/`, and writes
`SP/shared/frontier/current.json` for the other lanes. SP = the amm2 session scratchpad (see LANE-RULES.md).

## Base (restart 2026-10-27 11:50)
- main `repro/pump_amm/event-decoder-recovery-20261027` (origin/main 0cc61d636), candidate `0881a95d…`,
  647 normalized / 148 raw / 138 unmatched (Linux v1.44).
- Canonical source `repro/pump_amm/event-decoder-recovery-20261027/results/canonical-source/programs/pump-amm`.
- Its Cargo.lock pins `solana-program-entrypoint 2.2.1` (was 2.3.0 on 623/638): copy
  `SP/shared/registry/solana-program-entrypoint-2.2.1.crate` into the lane cargo-home before building.
- Native baseline of that source (my recipe, `out/native-u0`): 642 normalized / 139 raw / 143 unmatched.

## Composition ledger on 647 (patch id -> status, counts)
| step | patch id | status | native (norm/raw) | Linux (norm/raw/unmatched) |
| --- | --- | --- | --- | --- |
| u0 | frontier 647 | base | 642/139 | 647/148/138 (control rebuild running) |
| u1 | amm-lo@dda784ddc (admin toggles, disable, deposit/withdraw placement, legacy_buy.rs -> instructions/swap/buy.rs after 647's BuyEvent block, get_buyback_accounts 116/121, derive 133) | included via u1b | 663/139 (+21, 0 lost) | |
| u1b | u1 + 623 inline reserve arithmetic restored in legacy buy, placed at buy.rs 382-404 (closures 387/391/395/404) | included | 667/139 (+4, 0 lost) | |
| u2b | u1b + amm-hi@d92fefba8 maintained-source gains | included (g01) | 675/139 (+8, 0 lost) | 2 builds running; native runtime 25/17,462/0 |
| (u2) | u1 + amm-hi (no arithmetic restore) | superseded by u2b | 671/139 | |
| — | amm-mid@b49edd851 (0x52c58) | superseded: 0x52c58 already matched in 647 | | |
| — | amm-hi helper-crate patch | kept out (DIRECTIVES 07:30) | | |
| — | layout-amm text order | layout lane owns re-generation on the composition | | |
| — | amm2 lane packets | none published yet (12:00) | | |

Notes:
- 647 already contains Codex's own `instructions/swap/buy.rs` (BuyEvent only) and replaced legacy buy's inline
  reserve arithmetic with `Pool::{available,effective}_quote_reserves` calls; that removes the four buy.rs
  Overflow closures amm-lo matched, hence variant u1b.
- Older 638-based composition (superseded, not published): `out/comp2/t{0..3}`; Linux t3 = 672/128/113 (`43c35c4e…`).
- 623-based g01-c648 (superseded, never PR'd): `out/stale/g01-c648-on-623`.

## Working trees
- `SP/lanes/integrate/out/comp3/<step>/programs/pump-amm` — composed source after each step (647 base).
- `SP/lanes/integrate/out/patches/` — exact patch inputs (per-file splits of the 638-based steps).
- `SP/lanes/integrate/out/tools/{mergebuy,restore_arith,splitdiff,pack,tokproof}.py` — composition helpers.
