# PumpSwap lane amm-hi (original windows 0x73ef0 … 0xf6eb0) — in progress

Review status: this is an unpromoted historical-baseline proposal. The candidate ELF is not included in this packet, so this review cannot independently recompute its claimed function matches. Rebase and full artifact validation are still required.

**Status: native-verified only.** All counts below come from native macOS v1.44
builds. The Linux v1.44 recipe confirmation and the runtime suites are still
pending; until they run, treat these as research results, not a selected
checkpoint. `PROGRESS.md` is the lane's full working record.

The baseline is `repro/pump_amm/native-fee-cpi-recovery-20261027` (Linux candidate
`a4b978ee…`, 599/785 normalized, 125 raw). A native build of the same source
gives 594 normalized / 118 raw. The difference is five 56-byte `type_id` windows
whose TypeId hashes depend on host `-C metadata`, plus a few tail raw matches.
None of those is in this lane's range, so native builds are valid for iterating
on it.

| Step | Windows gained | Native normalized | Change |
| --- | ---: | --- | --- |
| Gain 1 | 6 | 594 → 600 | Source-coordinate placement only (`#[program]` on lib.rs:36; derives and `error!` sites on their original lines); code unchanged |
| Gain 2 | 6 | 600 → 606 | `SweepFees` seeds use the ATA program-id constant; shared sweep / v2 trade handlers publicly reachable so they keep external linkage (no argument promotion) |
| Gain 3 | 2 | 606 → 608 | Boost vault Token-2022 harvest routed through an `anchor_spl` helper (`harvest_withheld_tokens_to_mint`) |

Raw matches are unchanged at 118 and no window is lost (`tools/cmpmeas.py`).

## Contents

| Path | What it holds |
| --- | --- |
| `source.patch` | The changes against the baseline maintained source |
| `sources/` | The changed files in full |
| `builds/` | Build records and measurements |
| `tools/` | Lane tooling: `nbuild.py`, `cmpmeas.py`, `wdiff.py`, `nearmiss.py`, `origins.py` |

Maintained `programs/pump-amm` is not changed by this packet.

Next steps for this lane:
1. Re-apply the patch on the newest AMM checkpoint (`account-context-recovery-20261027`).
2. Re-measure there.
3. Confirm with the Linux recipe and the runtime suites.
