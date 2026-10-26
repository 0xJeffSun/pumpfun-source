# pump_fees — restructured source tree (structural-fidelity reference)

_2026-10-26. A COMPILING snapshot of the pump_fees reconstruction source reorganized toward the
recovered original module tree (see `../../source-maps/` and `../RESTRUCTURE-MAP.md`). This is a
**reference artifact**, not active program source: it is not byte-closing, and the reconciliation
policy would revert a restructured active source from `main`, so it lives here under `repro/`._

## What's materialized here (compiles with v1.44, `--offline --locked`)
The clean "already-delegated" relocations are done — their bodies are preserved and their panic-`Location`
paths now point at the recovered original files:
- `instructions/withdraw.rs` (was `withdrawal.rs`)
- `instructions/buyback/mod.rs` (was `buyback.rs`)
- `instructions/fee_sharing/create_donation_fee_pda.rs` (was `donation.rs`)
- `instructions/fee_sharing/admin_cto_sharing_config.rs` (was `sharing_admin.rs`)
- `instructions/fee_sharing/create_fee_sharing_config.rs` (pre-existing)

Oracle check (`verify_source_map.py pump_fees <build> original-source-maps.json`) after this restructure:
`admin_cto_sharing_config.rs` and `create_fee_sharing_config.rs` moved MISSING → PARTIAL (path correct;
`(line,col)` not yet positioned). That is the intended, measurable structural progress.

## What remains (mechanical, per `../RESTRUCTURE-MAP.md`)
- Splits: `social.rs` → `create_social_fee_pda.rs` + `claim_social_fee_pda.rs`; `sharing_update.rs` →
  `update_fee_shares.rs` + `update_fee_shares_v2.rs`; merge `sharing.rs`'s `create_sharing` into
  `create_fee_sharing_config.rs`.
- Inline admin handlers → `instructions/admin/*.rs` (structural-only; these regress body byte-match, so
  do them for organization, not byte-closing).
- Per-file line positioning so each `Location` lands on the original line (the step that would turn
  PARTIAL → MATCH). Needs the authentic source for exactness.

## Why it stops short of byte-identity
Established across this review: the compiler is correct and bodies are ~99.5% right; the residual is
file-layout + `Location` metadata + global ordering, which requires the authentic source + `Cargo.lock`.
This tree mirrors the original's organization and is the scaffold to drop that source into if it surfaces.
