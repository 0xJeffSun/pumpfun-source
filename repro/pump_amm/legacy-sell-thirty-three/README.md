# PumpSwap legacy sell main-path checkpoint

This main-path candidate adds the legacy `sell` instruction to the validated 32-body
AMM source. It has 33 instruction bodies out of 38. The complete previous 21 suites
(14,635 cases) and a new 559-case legacy sell suite pass against the captured original.
These are bounded local comparisons with synthetic test-owned state, verified ordinary
signatures, and actual captured SPL Token, Token-2022, Associated Token and Fees CPIs.
The new suite compares full watched account bytes, lamports and owners, exact inner
instructions and event bytes, errors, return data, and serialized signed transactions.
Diagnostic logs and compute-unit usage are not required to match.

Legacy sell was recovered separately from the v2 handler. It performs the actual
`get_fees_with_quote_mint` CPI; prices gross base input; checks real quote reserves;
pays the user, protocol and creator vault directly; and leaves the pool's existing
accrued fee and virtual reserve fields unchanged. A positive creator payout consumes
a `pool-v2` remaining account. Cashback instead consumes its ATA and accumulator,
creates missing accounts through actual System and ATA CPIs, pays the cashback and
updates its accumulator before checking `pool-v2`. Buyback account identity validation
also occurs when its fee is zero or the pool is in Mayhem mode. Positive buyback
payouts create a missing ATA idempotently; its event field records net tokens received.

Cases cover amount/slippage/arithmetic boundaries, every fixed and extra account's
identity or relevant writability, typed fee config ownership/layout, token layouts and
owners, token transfer fees, quote mint families, canonical/noncanonical pool authority,
creator configuration, cashback creation/prefunding/layout/overflow, Mayhem and holder
flags, real-reserve boundaries, pool layouts, pool-v2 identity, and self transfers.
Injected invalid state does not establish real-world reachability, and finite cases do
not prove exhaustive equivalence or recovery of historical source.

Build 05 uses a clean isolated v1.44 build with the unchanged AMM32 compatibility lock.
The 15 build inputs, compiler identities, graph pins/checksums, test closure and runtime
inputs are hashed. Neither original executable bytes nor captured dependencies are
compiler inputs. Whole-file and parsed-ELF-extent comparisons remain false; no executable
bytes or headers were edited. `independent-comparisons.json` independently checks the
build helper's comparison and preserves the preceding AMM32 output identity.

Four unsuccessful drafts are preserved. Build 01 had 15 mismatches in 251 cases; build
02 failed compilation because the Owners trait was not in scope; build 03 had 24
mismatches in an expanded 459-case suite; build 04 had two zero-buyback ATA differences
in 559 cases. Each source snapshot is verified against its build record, with exact
harness snapshots and runtime receipts where a binary ran. Original-only probes and
static disassembly excerpts are under `recovery-evidence`. An initial Mayhem fixture
used the wrong global offset; both that experiment and the corrected version remain.

The clean main-path build is whole-file identical to scratch build 05: 963,600 bytes,
SHA-256 `043bedfd0fbf56fe4d5e39b69b713a24f5bbbe34e350c8a45b96919abfd368ca`.
`main-scratch-identity.json` binds both complete build input maps and executable hashes.
The 21 existing suite receipts are reused by this explicit identity. The maintained
legacy harness was also replayed from `/tmp` against the identical scratch executable;
all 559 cases are byte-for-byte equal to its original scratch receipts. That replay
is a portability verification, not 559 additional unique cases. No main-build runtime
transactions are claimed. The preserved `scratch-build/` directory holds the original
build/source/test snapshots and actual executed regression command records.

`source-snapshot.tar.gz` now uses main repository-relative paths. The maintained test
closure and its exact hashes are in `test-snapshot.tar.gz` and `test-source-sha256.json`;
the original scratch closure is preserved separately. Imported harness dependencies,
captured fixtures and runtime ELF inputs are frozen by their hashes and snapshots.
`replay-commands.json` contains commands for reproducing all 22 suites against this
artifact. To rebuild, prepare a fresh locked Cargo cache from the pinned archives and
run `scripts/build_partial_candidate.py` with manifest `programs/pump-amm/Cargo.toml`,
program `pump_amm`, artifact `pump_amm_recovered.so`, tools version `v1.44` and a fresh
output directory. The original ELF is used only for a post-build comparison.

The maintained source and harness are `programs/pump-amm/src/legacy_sell.rs` and
`scripts/pump_amm_legacy_sell_differential.py`. The latter resolves its repository root
from its own path, normalizes imported fixture readers to that root, and resolves
candidate/output arguments against the invoking directory before normalization.

Five IDL instructions remain missing: `boost_buy_and_burn`, `buy`, `buy_exact_quote_in`,
`create_config`, and `multi_hop_swap`. Historical source/toolchain attribution and full
ELF identity remain unresolved. This work does not change the separate frozen security
scan or the previous compiler/cashback recovery packages.
