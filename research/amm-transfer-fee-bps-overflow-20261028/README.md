# PumpSwap transfer-fee diagnostics above the SPL-valid basis-point maximum

## Problem

Merged PR #427's 216-case matrix restored the four transfer-fee error
coordinates (original lines 32, 49, 57, 67) and proved the line-32 and
line-67 diagnostics at runtime, but its README states the remaining gap
plainly: lines 49 and 57 are "statically recovered complete bodies but are
not directly triggered as new error diagnostics by this 216-case matrix."

The matrix sweeps basis points only up to the SPL-valid maximum, 10000.
The decoder (`crates/native-transfer-fee`) reads the fee schedule's basis
points as a raw `u16` and never caps them at 10000, so a Token-2022 mint
whose fee entry carries bps 10001..65535 decodes successfully and reaches
the fee arithmetic. That input class was untested at runtime.

## Cases

Six fresh-VM triples (original / #424 control / #427 candidate), 18 signed
executions, built from the #427 matrix fixtures (withdraw case 170, deposit
case 155) with only the quote-mint TLV fee entry changed: both the older
and the newer schedule carry the case's bps and maximum fee. The payer is a
fresh deterministic keypair (seed byte 77) replacing the template payer
everywhere it appears; the clock is slot 100, epoch 0, as in the #427 matrix.
`producer.py` generated these receipts on the author's machine; as committed it expects a
checkout at `~/workspace/pumpfun-sparse` and the #424/#427 `candidate.so.gz` images gunzipped
into `~/workspace/slop-verify`, so it does not run from this packet unmodified.

| Case | Instruction | bps | Amount | Original | Control | Candidate |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| withdraw-bps-65535-amount-1000000 | withdraw | 65535 | 1,000,000 | **57** | 28 | **57** |
| withdraw-bps-10001-amount-1000000 | withdraw | 10001 | 1,000,000 | **57** | 28 | **57** |
| deposit-bps-65535-amount-1000000 | deposit | 65535 | 1,000,000 | **67** | 35 | **67** |
| deposit-bps-10001-amount-1000000 | deposit | 10001 | 1,000,000 | **67** | 35 | **67** |
| withdraw-bps-65535-amount-1-success | withdraw | 65535 | 1 | success | success | success |
| withdraw-bps-10001-amount-1-success | withdraw | 10001 | 1 | success | success | success |

Lines are `programs/pump-amm/src/utils/transfer_fee.rs` `AnchorError`
sites, error 6023 (`Overflow`) throughout. `verify.py` rechecks every
receipt independently: signature validity, the patched TLV bps/max in the
before snapshot, the diagnostic line per image, and rollback except the
payer's 5000-lamport fee on failures.

## Result

- **Line 57 is now triggered at runtime.** A withdraw with a bps-10001 (or
  65535) quote mint and amount 1,000,000 computes a fee above the amount
  (`ceil(1,000,000 x 10001 / 10000) = 1,000,100`), so `amount_after_fee`'s
  `checked_sub` fails and both the original and the #427 candidate report
  line 57. The #424 control reports line 28, exactly the pre-fix coordinate
  from PR #427. The #427 fix therefore covers this input class too; no
  source change is needed or claimed here.
- The deposit path under the same malformed bps reports line 67 on the
  original and candidate (control: 35), confirming the gross-up path agrees
  as well.
- The amount-1 controls succeed on all three images: bps above 10000 is
  not blanket-rejected; the trigger is amount-dependent, as the fee must
  exceed the amount (withdraw) or make the gross-up unsolvable (deposit).

## Limits

- **Line 49 (`calculate_fee` overflow) is still untriggered.** Reaching it
  needs a fee input above ~2.81 x 10^18 with bps 65535, and the withdraw and
  deposit paths fail earlier (error 6024, identical on both images) at such
  amounts in these pool fixtures. A swap-path or rebalanced-pool fixture may
  reach it; that is left open, not claimed.
- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- No live transaction was submitted. All executions are offline LiteSVM
  replays with normally signed transactions.
