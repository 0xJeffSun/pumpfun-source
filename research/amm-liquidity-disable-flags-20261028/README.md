# PumpSwap liquidity disable flags: bit 2 gates deposit, bit 4 gates withdraw

## Problem

The global config's `disable_flags` byte (offset 56) gates each
instruction by bit: 1 create, 2 deposit, 4 withdraw, 8 buy, 16 sell.
Bit 2 gates deposit (6018 DisabledDeposit) and bit 4 gates withdraw
(6019 DisabledWithdraw). Bits 32, 64 and 128 gate nothing, and the
create bit (1) does not touch withdraw, so a config that sets only
an unused or unrelated bit leaves liquidity fully live. The gate is
checked before any reserve math, and the failure is a clean rollback
with a named error.

## Cases

Six fresh-VM triples (original / #424 control / #427 candidate), 18
signed executions: `deposit` with LP amount 10^9 and limits
u64::MAX, and `withdraw` with LP amount 10^9 and limits 0, on the
repository's own liquidity differential harness
(`scripts/pump_amm_liquidity_differential.py`), with the config's
`disable_flags` byte patched per case. The clock is slot 100, epoch
0. `producer.py` reproduces every receipt from the repository files.

| Case | Flags | Result |
| --- | ---: | --- |
| deposit-flags0-baseline | 0 | base spent 160,619,895,224, quote spent 29,312,410, LP gained 1,000,000,000 |
| deposit-flags2-disabled | 2 | 6018 DisabledDeposit |
| deposit-flags128-unused | 128 | base spent 160,619,895,224, quote spent 29,312,410, LP gained 1,000,000,000 |
| withdraw-flags0-baseline | 0 | base gained 160,619,895,223, quote gained 29,312,409, LP burned 1,000,000,000 |
| withdraw-flags4-disabled | 4 | 6019 DisabledWithdraw |
| withdraw-flags1-create-bit | 1 | base gained 160,619,895,223, quote gained 29,312,409, LP burned 1,000,000,000 |

All three images behave identically in every case. `verify.py`
rechecks every receipt independently: signature validity, the
amounts against the recorded observations, the error code and log
fragment, the recorded error site (6018 at `deposit.rs:56`
original vs `:5` control/candidate; 6019 at `withdraw.rs:57` vs
`:5`), rollback on the failures, and agreement of amounts across
images. Receipts are stored as parts
(`runtime/raw-transactions-part1/2.jsonl.gz`) to stay under
GitHub's 25MB web-upload limit; `verify.py` reads them in order.

## Result

- **The bit map is exact**: 2 gates deposit only, 4 gates withdraw
  only; the other liquidity instruction is untouched by each bit.
- **Unused and unrelated bits are inert**: flags 128 and the
  create bit 1 produce byte-identical success to flags 0.
- **Deposit/withdraw rounding is asymmetric by one**: deposit
  spends 160,619,895,224 base for 10^9 LP while withdraw returns
  160,619,895,223 base for the same 10^9 LP (ceil on deposit, floor
  on withdraw) — the same one-unit asymmetry in quote
  (29,312,410 vs 29,312,409).

## Limits

- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- The trade bits (8 and 16) and the create bit (1) on create itself are
  pinned by the companion trade packet and the create differential
  tests; this packet covers liquidity only. No live transaction was
  submitted. All executions are offline LiteSVM replays with normally
  signed transactions.
