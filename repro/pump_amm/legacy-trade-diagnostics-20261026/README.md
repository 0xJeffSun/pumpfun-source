# Legacy PumpSwap trade diagnostics

`source.patch` changes only `legacy_buy.rs` and `legacy_sell.rs`. It restores
numeric operand order and plain errors supported by the captured program, and
adds the missing positive net-curve guard in exact-quote buys. The proposed
source files and their baseline bytes are retained alongside the patch.
The parent produced candidate `dac4b7c…` with this patch. Both complete legacy
suites pass all non-log comparisons, and independent verification confirms all
169 compared-value witnesses are corrected. Eight receipt-mutation checks pass.
`verified-summary.json` binds the actual candidate, receipts, build and checks.
There remain 101 full-log mismatches described below; this is not perfection.

The exact-quote distinction matters: original `buy.rs:733` rejects a zero
net-curve amount before the output calculation. Original `buy.rs:776` compares
final base output with the user's minimum. Amount 3 reaches the first gate with
0/0 diagnostics; amount 4 passes that gate with curve amount 1, then fails the
second with output 0/minimum 1. The added guard tests `curve > 0`, **before**
`curve.saturating_sub(1)`; it does not reject the valid intermediate value 1.
At `0x3b928` the original branches on a nonzero value to `0x3ba28`, bypassing the
error block that stores line 733 and error 6040.

Other corrections preserve the existing predicates:

- Buy slippage emits limit first and total required quote second.
- Sell reserve bounds emit the real quote reserve first and quote after LP fees
  second; sell slippage emits received quote first and the minimum second.
- Zero-amount and exact-quote intermediate guards restore numeric values.
- Ten existing key-equality checks across transfer, pool-v2, cashback and
  buyback-destination handling retain their predicates and emit plain errors.

`original-guards.asm` and `original-sites.json` retain 4,240 checked bytes and
17 original source/error-construction sites. Existing self-transfer evidence
is also retained in `../error-recovery-next/original-guard.asm`. These are local
instruction observations, not complete function/callee equivalence.

## Complete legacy corpus and known residuals

The pinned `739ebefb…` baseline contains all 1,011 legacy buy/exact-quote cases
and 575 legacy sell cases. `verify_evidence.py` independently verifies all 3,172
raw signature fields and exact non-log comparisons. It finds:

| Baseline discrepancy | Rows |
|---|---:|
| Compared-value diagnostics addressed by this patch | 169 |
| Missing error source (`occurred` versus `thrown in`) | 99 |
| Truthful panic source-coordinate differences | 6 |
| Account-owned-by-wrong-program error-origin differences | 2 |

The two account-origin rows are sell 262/264. Original error 3007 is caused
by the actual token-account owner's public key; the current source emits a
source-line error instead. These are retained semantic diagnostic differences,
not excluded from comparisons. The 99 missing source errors require separately
attributed changes to arithmetic and remaining-account `.ok_or` sites.
The six panic rows have equal messages and differ only in source locations.
No other success-log difference was found in this bounded scan.

On the corrected output, 945/1,011 buy rows and 540/575 sell rows have complete
log equality under the exact coordinate/compute exclusions. All 3,172 signature
fields verify independently. The 99 missing-origin rows and two account-origin
rows remain explicitly listed in the parent's `verification-02.json`.

The preliminary `log-triage.json` uses broad masks only to locate residuals;
it is never used as acceptance evidence. `verify.py` uses exact source pairs,
retains all values/messages, and distinguishes the two exact-quote gates.

## Reproduction

```sh
work/test-env/bin/python -B repro/pump_amm/legacy-trade-diagnostics-20261026/verify_evidence.py
```

After a genuine source build, `run.py --candidate <ELF> --source <source-root>
--build-record <build-comparison.json> --output <new-directory>` runs both
complete existing suites, then checks every signed input, pre/post account
state, CPI, event, return value and log. If the same candidate already has both
runtime receipts, use `verify.py --runtime <directory>` with those arguments
and `--output <new-verification.json>` instead of repeating execution.

The verifier requires all 169 compared-value witnesses to be corrected and
reports every other remaining full-log difference. Known source-less errors
must reproduce their complete prior candidate logs; account-origin residuals
must retain their exact prior behavior apart from the truthful shifted source
line. Unexplained changes fail verification. A passing bounded correction with
remaining error-origin rows is explicitly not perfect reconstruction.
