# PumpSwap liquidity at the extremes: huge deposits, full drain, owed fees

## Problem

Liquidity at the extremes behaves in three distinct ways. A
deposit of 10^17 LP succeeds when fully funded, moving about
1.6e19 base and 2.9e18 quote. A deposit of 2e17 LP fails
Truncation (6024) because the computed base amount no longer fits
u64. And a withdraw of the full LP supply drains the base vault to
exactly 0 but leaves exactly 125,882 quote in the vault — precisely
the pool's recorded protocol fees (2,488) plus creator fees
(123,394), which withdraw does not distribute: the withdrawable
quote is the vault balance minus the owed fees.

## Cases

Four fresh-VM triples (original / #424 control / #427 candidate),
12 signed executions: `deposit` with LP amounts 10^17 and 2e17 and
limits u64::MAX (user funded with u64::MAX base and quote), and
`withdraw` with LP amounts equal to the full supply and supply
minus one and limits 0 (user funded with the full supply), on the
repository's own liquidity differential harness
(`scripts/pump_amm_liquidity_differential.py`). The clock is slot
100, epoch 0. `producer.py` generated these receipts on the author's machine; as committed it expects a
checkout at `~/workspace/pumpfun-sparse` and the #424/#427 `candidate.so.gz` images gunzipped
into `~/workspace/slop-verify`, so it does not run from this packet unmodified.

| Case | Result |
| --- | --- |
| deposit-huge-fit | base spent 16,061,989,522,367,916,709, quote spent 2,931,240,909,436,080, LP gained 100,000,000,000,000,000 |
| deposit-huge-overflow | 6024 Truncation |
| withdraw-full-drain | base gained 673,696,395,912,745, quote gained 122,946,564,838, LP burned 4,194,352,106,721, vault base left 0, vault quote left 125,882 |
| withdraw-near-drain | base gained 673,696,395,912,584, quote gained 122,946,564,837, LP burned 4,194,352,106,720, vault base left 161, vault quote left 125,883 |

All three images behave identically in every case. `verify.py`
rechecks every receipt independently: signature validity, the
amounts and vault leftovers against the recorded observations, the
error code and log fragment, the recorded error site (6024 at
`deposit.rs:77` original vs `:14` control/candidate), rollback on
the failure, and agreement of amounts across images. Receipts are
stored as parts (`runtime/raw-transactions-part1/2.jsonl.gz`) to
stay under GitHub's 25MB web-upload limit; `verify.py` reads them
in order.

## Result

- **The deposit ceiling is a u64 conversion, not a balance check**:
  2e17 LP fails Truncation before any transfer, while 1e17 LP
  succeeds.
- **Withdraw never distributes owed fees**: the full drain leaves
  exactly protocol plus creator fees in the quote vault, and the
  near drain leaves that same 125,882 plus one unit of rounding
  dust per side (161 base, 1 quote).

## Limits

- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- The funding levels are synthetic boundary conditions, not mainnet
  wallet states: they isolate the conversion ceiling and the drain
  behaviour. No live transaction was submitted. All executions are
  offline LiteSVM replays with normally signed transactions.
