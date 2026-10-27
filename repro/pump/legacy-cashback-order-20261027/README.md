# Main Pump legacy cashback payment order

This source correction places legacy-buy cashback accounting immediately after
its cashback payment, before later payments to the curve and fee recipients.
Only `legacy_buy.rs` changes relative to the preceding earned-counter checkpoint.
Both legacy `buy` and `buy_exact_sol_in` retain their observed Anchor Overflow
error behavior. **44 suites / 10,468 cases** pass; full byte identity is unfinished.

Six cases in the new 14-case corpus differed before this correction. Four exact
counter boundaries returned the right error but emitted later payment CPIs
before failure. Two overlapping counter/curve-balance failures returned the
wrong error. The recovered order fixes both, preserving pre-evaluation of the
protocol-fee subtraction. The remaining cases cover successful boundaries,
failure of the initial cashback payment, and transaction admission failure.
Two successful original transactions independently calibrate earned increments.

`before.json.gz` and `after.json.gz` retain signed synthetic transactions,
initial/final accounts, errors, events, inner instructions, return data and logs.
Two zero-payer cases fail at transaction admission and do not execute Pump.
Panic text and Anchor error name/number/message are compared; natural source
coordinates and compute-unit totals are retained but not claimed equal.

`recovered/` is a fresh isolated canonical build; `repeat/` is an independent
clean build of the same source contents. Both binaries reproduce exactly. An
earlier shared-target build returned a stale scratch artifact; its hash was
rejected before regression testing and is recorded in
`rejected-cache-collision.json`. It is not accepted evidence. New parallel work
uses isolated target directories.

The two existing 280-byte cashback helpers still match their captured bodies
after narrow call/address normalization. Their earlier all-input proof limits
remain: valid disjoint memory and terminal panic abstraction, excluding callers
and full panic internals. The legacy caller itself has no complete native-body
or all-input equivalence proof.

The full corpus and paired-log diagnostic audit are retained. This candidate
still has 548 narrowly normalized and 112 raw local matches among 1,035 inferred
original windows, leaving 487 unmatched by that comparison. Counts do not prove
callee/data equality or whole-program semantic coverage. Full ELF, compiler
provenance, parser/ABI and remaining handler reconstruction continue in parallel.
A newer paired-log audit, which also checks Anchor Left/Right values, found
684 mismatches in the preceding 43-suite receipts. Those values were outside
the earlier diagnostic assertion scope and are being corrected by parallel
workers. Additional new transfer-fee and account-validation counterexamples
also remain in that work queue. The 44-suite pass is not complete behavioral
equivalence. Only the main Pump contract is in scope.

Verify this frozen checkpoint with:

```sh
work/test-env/bin/python repro/pump/legacy-cashback-order-20261027/verify.py
```
