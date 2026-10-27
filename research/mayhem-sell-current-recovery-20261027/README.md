# Sell quote on the qualified current Mayhem source

This packet composes the [Sell quote recovery](../mayhem-sell-retained-recovery/README.md)
with the [qualified Legacy Buy ownership source](../mayhem-current-ownership-composition-20261027/README.md),
which already includes the complete current initializer. The source-recovery
credit for O0093 belongs to that Sell quote PR; this is independent composition,
qualification and fresh execution evidence.

The result has **431/441 normalized windows: 100 raw-local, 331 normalized-only
and ten unmatched**. It retains every prior raw and normalized match, positive
immediate-call observation and Source profile. Matched windows cover
**597,536/706,744 original text bytes**; **109,208 bytes remain unmatched**.
The complete meaningful ELF still differs from the captured original.

O0093 is a complete 1,120-byte / 140-slot normalized match. All ten actual
immediate callee shapes match at their original relative offsets, and all ten
ordered typed references agree, including four Source records, three unwrap
messages and three Debug vtables with matching immediate formatter bodies.
The incoming SellPumpSwap call is checked separately; its whole handler remains
unmatched. This is not a proof of recursive or indirect code/data equivalence.

The 960-byte initializer still matches all 120 slots and its immediate typed
references. The 13,784-byte partial Legacy Buy body remains exactly the same
normalized body as the qualified ownership parent; it still differs from the
13,848-byte original. No independent gains are summed or silently dropped.

## Source and ordinary builds

Only `src/state.rs` and the SellPumpSwap call argument change among the 67
parent inputs. The exact inherited initializer, root namespace and generated
program references remain. The public quote patch keeps the early checked
basis-points call as a bounds rejection, then recomputes the value after cap
selection. Moving the rejection later changes error precedence. The compiler
eliminates the later redundant check, and the final original-relative body
uses the existing masks without new exceptions. No dummy machine operation,
assembly replacement, output patch or padding is used.

Two actual Rust root compilations reproduce both complete artifacts:

- stripped: `7acb628e142bcc74534249dcefa04162331f4630ced4bc035c051ea7bf1b12fc`
- symbols: `8674c1feff4f220aa0b9450c1b9b255d4047d23b0dd5354cc92e69988cb28c57`

The retained Cargo-derived command, source maps, tool/dependency bindings,
linker scripts and compiler logs document the exact recipe. It reuses pinned
current dependencies and the earlier qualified whole-section order. It is an
incremental mixed-host/target root build, not a clean all-dependency build or
proof of the original historical toolchain. Standard `llvm-objcopy --strip-all`
is the only post-link operation. The two allocated images are compared.

## Fresh local execution

All **6,636 trade pairs / 13,272 signed records** pass on this exact artifact,
including all 1,239 AMM Sell cases. All checked outcomes and non-compute logs
agree. A separate **69 initializer pairs / 168 signed records** also pass,
including ten genuine Pump CPI creation successes, with equal raw initializer
logs. These reuse established cases and are not new unique scenarios.

The verifier rechecks signatures, program-account hashes, states, errors,
events, CPI fields and retained comparison predicates. Runtime evidence from
the native 431/84 source packet and older parents remains bound to their own
artifacts; it is not retagged as execution of this 431/100 composition.
Finite local tests do not establish exhaustive behavior or live-chain acceptance.

```sh
python -B research/mayhem-sell-current-recovery-20261027/verify.py
python -B research/mayhem-sell-current-recovery-20261027/test_verify.py
```

These are saved-evidence checks, not compiler or VM execution. Current selected
programs are unchanged; this is the latest qualified research frontier. The
per-window inventory records each original window once. Ten complete bodies,
full transitive data/call closure, original build provenance and whole-ELF
identity remain open.

Trade receipts use lossless XZ compression; the verifier reads them directly with the Python standard library. The underlying signed records are unchanged.

Browse the [complete 441-row TSV](inventory.tsv), [full counterpart inventory](inventory.json), or [ten remaining bodies](remaining.md).
