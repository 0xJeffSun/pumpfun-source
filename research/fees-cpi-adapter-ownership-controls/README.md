# Fees CPI adapter ownership: two four-byte residuals

The current source constructs the CPI account aggregate before calling each
adapter. The original adapters construct it internally from individual owned
account arguments. Moving that construction into the helper restores the
legacy adapter's 936-byte size. Cloning the program into the CPI accounts and
moving the original into `CpiContext` then reproduces every instruction except
four load/store displacement bytes, after the existing call masks.

For V2, tracing the actual copy operands establishes this argument order:
program, mint, bonding curve, sharing config, creator vault, creator-vault quote
account, quote mint, quote-token program, associated-token program, system
program, event authority, payer, remaining accounts. Applying it restores the
1,224-byte size and leaves the same four-byte copy-scheduling residual.

| Original window | Prior helper size | Closest helper size | Unmasked differing bytes |
| --- | ---: | ---: | ---: |
| 235304, legacy distribution adapter | 480 | 936 | 4 |
| 236240, V2 distribution adapter | 488 | 1224 | 4 |

The remaining bytes are at offsets 586/602/610/626 and 706/722/730/746,
respectively. Each is a load/store displacement in the three-word Vec transfer.
All direct callee bodies at the corresponding call sites match. Calls still
have relocated operands; this is **not raw byte equality or a complete normalized
match**.

The verifier symbolically checks the six-instruction copy blocks. Both blocks
load all three words before writing and place each word in the same destination
slot. Temporary registers are overwritten before their next use. That proves
only this local copy equivalence under valid memory access; it does not prove
whole-function behavior, the historical recipe, or identity of every callee's
transitive data.

Thirteen actual compiler controls are retained: reproduced control, individual
arguments, corrected clone destination, literal/context-constructor variants,
public helper placement, both adapters, V2 argument order, field order,
`mem::take`, and typed CPI return forwarding. None gains or loses a complete
window: every variant remains at 553/585 normalized, 118 raw-local and 32 unmatched
on the pinned pre-AdminCto source. Literal construction and `mem::take` worsen
instruction agreement. `new_with_signer` and field-order changes reproduce the
closest legacy artifact unchanged. Returning the generated `Return<Event>`
produces the same stripped candidate as the argument-order control. No experiment
is promoted to the current inventory, which separately advances through AdminCto.

The argument-order prototype freshly passes 417 sharing-update cases with the
unchanged suite predicates. This is bounded execution, not perfect reconstruction.
All source maps, actual build commands/logs/results and artifacts are retained;
locked dependencies are reused from the existing v1.44 cache. The controller
paths are host-specific locators. No assembly or binary patching is used.

```sh
python3 -B research/fees-cpi-adapter-ownership-controls/verify.py
python3 -I -B research/fees-cpi-adapter-ownership-controls/test_scope.py
```

Verification does not compile or execute a target. Further work must explain the
original Vec copy ordering without broadening the masks or calling these helpers
byte-identical. The control hash/source map is the published instruction-visibility
frontier; it is not silently rebased onto the newer AdminCto composition.
