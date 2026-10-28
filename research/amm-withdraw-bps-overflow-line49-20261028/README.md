# PumpSwap withdraw transfer-fee diagnostics at line 49 (calculate_fee overflow)

## Problem

The bps-overflow family (`research/amm-transfer-fee-bps-overflow-20261028`,
PR #450, merged; `research/amm-trade-v2-bps-overflow-20261028`, PR #468)
left one row open: line 49, the `calculate_fee` overflow itself. Lines 57
and 67 fire whenever the fee exceeds the amount or the gross-up is
unsolvable, but line 49 needs a fee input above `u64::MAX * 10000 / bps`
(about 2.81 x 10^18 at bps 65535). Ordinary fixtures cannot supply it:
pool quote reserves are ~1.2 x 10^11, and a huge user-specified transfer
fails first inside the Token-2022 program, whose own fee computation
overflows on the same input.

Withdraw supplies it. The handler derives `quote_amount` from the pool
quote vault balance and the burned LP share *before* any token transfer,
so maxing the vault (u64::MAX) and burning the full LP supply makes
`quote_amount` about u64::MAX, and `amount_after_fee`'s inner
`calculate_fee` overflows at line 49.

## Cases

Four fresh-VM triples (original / #424 control / #427 candidate), 12 signed
executions, built on the repository's own liquidity differential harness
(`scripts/pump_amm_liquidity_differential.py`) and its `transferfee` mint
override. The clock is slot 100, epoch 0. `producer.py` reproduces every
receipt from the repository files.

| Case | bps | Amount (LP burned) | Original | Control | Candidate |
| --- | ---: | ---: | ---: | ---: | ---: |
| withdraw-bps-65535-vault-max | 65535 | 4,194,352,106,721 | **49** | 22 | **49** |
| withdraw-bps-10001-vault-max | 10001 | 4,194,352,106,721 | **49** | 22 | **49** |
| withdraw-bps-100-vault-max-agreement | 100 | 4,194,352,106,721 | 14 | 14 | 14 |
| withdraw-no-patch-vault-max-agreement | — | 4,194,352,106,721 | 1 | 1 | 1 |

Lines are `programs/pump-amm/src/utils/transfer_fee.rs` `AnchorError`
sites, error 6023 (`Overflow`) for the diagnostic cases. `verify.py`
rechecks every receipt independently: signature validity, the patched TLV
bps/max in the before snapshot, the maxed vault balance, the diagnostic
line per image, and rollback except the payer's 5000-lamport fee.

## Result

- **Line 49 is now triggered.** A withdraw with a bps-10001 (or 65535)
  quote mint and a maxed vault reports line 49 on the original and the
  #427 candidate (control: 22). With the family complete (49 / 57 / 67),
  every `transfer_fee.rs` arithmetic site is now covered by a runtime
  diagnostic case.
- The agreement cases pin the divergence to the fee math: with valid bps
  the fee computation succeeds and the later quote transfer overflows
  identically (14) on all images; with no fee extension the flow reaches
  the LP burn identically (1) on all images. The maxed vault alone does
  not diverge anything.

## Limits

- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- The maxed vault is a synthetic boundary condition, not a mainnet pool
  state: it isolates the arithmetic site, the same way the earlier packets
  isolated theirs. No live transaction was submitted. All executions are
  offline LiteSVM replays with normally signed transactions.
