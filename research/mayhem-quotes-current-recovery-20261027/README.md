# Both AMM quotes on the qualified current Mayhem source

This packet composes the [Buy quote recovery](../mayhem-buy-retained-recovery/README.md)
with the [qualified Sell quote and Legacy Buy ownership source](../mayhem-sell-current-recovery-20261027/README.md).
Source-recovery credit for O0092 belongs to the Buy quote PR; this packet supplies
independent composition, repeat builds and fresh execution evidence.

The result has **432/441 normalized windows: 100 raw-local, 332 normalized-only
and nine unmatched**. Every prior raw and normalized match, positive immediate
call observation and Source profile remains. Matched windows cover
**598,792/706,744 original text bytes**; **107,952 bytes remain unmatched**.
The complete meaningful ELF still differs from the captured original.

O0092 is a complete 1,256-byte / 157-slot normalized match. O0093 retains its
complete 1,120-byte / 140-slot match. Each quote has ten immediate callees at
matching relative offsets and ten ordered typed references, including Source
records, unwrap messages and Debug vtables. These checks do not establish full
transitive or indirect code/data equivalence. Both calling handlers remain
unmatched.

The 960-byte initializer still matches all 120 slots and its immediate typed
references. The 13,784-byte partial Legacy Buy body remains exactly the same
normalized body as the qualified parent; it still differs from the 13,848-byte
original. Independent raw-match counts from other compiler contexts are not added.

## Source and ordinary builds

Only `src/state.rs` and the BuyPumpSwap call argument change among the 67 parent
inputs. The Buy quote uses the checked retained-basis-points helper for early
bounds rejection, selects its cap by reference, and recomputes retained basis
points after cap selection. This preserves error precedence and reproduces the
original normalized body with the existing masks. No dummy machine operation,
assembly replacement, output patch or padding is used.

Two actual Rust root compilations reproduce both complete artifacts:

- stripped: `73dff97e65535ce7d2552ba6f29f94fe0e08ebd414a51871a81c6cba2d7d6168`
- symbols: `440b92811753dd9af1468f6bf2d0e9139309984de3519a8f9a937babfdb6c903`

The retained Cargo-derived command, source maps, tool/dependency bindings,
linker scripts and compiler logs document the exact recipe. It reuses pinned
current dependencies and the earlier qualified whole-section order. This is an
incremental mixed-host/target root build, not a clean all-dependency build or
proof of the original historical toolchain. Standard `llvm-objcopy --strip-all`
is the only post-link operation. Both allocated images are compared.

## Fresh local execution

All **6,636 trade pairs / 13,272 signed records** pass on this exact artifact,
including the 1,257 AMM Buy and 1,239 AMM Sell cases. All checked outcomes and
non-compute logs agree. A separate **69 initializer pairs / 168 signed records**
also pass, including ten genuine Pump CPI creation successes, with equal raw
initializer logs. These reuse established cases and are not new unique scenarios.

The verifier rechecks signatures, program-account hashes, states, errors,
events, CPI fields and retained comparison predicates. Earlier runtime evidence
keeps its original artifact binding. Finite local tests do not establish
exhaustive behavior or live-chain acceptance.

```sh
python -B research/mayhem-quotes-current-recovery-20261027/verify.py
python -B research/mayhem-quotes-current-recovery-20261027/test_verify.py
```

These are saved-evidence checks, not compiler or VM execution. Current selected
programs are unchanged; this is the latest qualified research frontier. Trade
receipts use lossless XZ compression read by the Python standard library.

Browse the [complete 441-row TSV](inventory.tsv), [full counterpart inventory](inventory.json),
or [nine remaining bodies](remaining.md). Full transitive data/call closure,
original build provenance and whole-ELF identity remain open.
