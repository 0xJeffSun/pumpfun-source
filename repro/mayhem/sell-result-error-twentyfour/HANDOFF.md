# SellPumpSwap typed-result error scratch acceptance

One pinned v1.52 scratch build succeeded, with no compiler/backend error. The only Cargo/Rust source delta from accepted typed-buy baseline `dda5554a...` is the reviewed `.ok_or(PumpSwapError::PumpSwapCpiMathOverflow)` in SellPumpSwap's sizing division. No main source or publication was changed by this worker.

New stripped candidate:668640 bytes, SHA256 `7d416f848f03e46d9a514f4c505a8e903cdb908f52280bb961254eed90aebe1f`. New unstripped candidate SHA256: `948a1a13f9ff947c8a544db7a2241c95e09618c9bb3613d4d2ab900d986329d8`.

All21 unchanged permitted baseline suites passed9595 functional comparisons:9589 flat cases plus six calls in three two-step burns. There are no functional mismatches or new unique cases.19190 is the recorded/derived signed-execution count, not independent signature proof for every administrative receipt. All15 unchanged receipt verifiers passed.58 flat diagnostic-difference rows and three known second-burn source-location rows remain; no mismatch array was emptied or comparison rule broadened.

The existing SellPumpSwap zero-effective-quote cases now omit the extra Option-unwrap message, while source-location differences remain. Static checking independently confirms the new equality branch writes variant11 and calls Result unwrap with the same Debug name and size4/alignment4 vtable. The already accepted typed-buy behavior remains in this baseline and was replayed unchanged.

The source-domain proof is in `source-domain-invariant.md`: with current admitted u64 balances and vt>0, the selected output is below vs for vs>0 and equals zero when vs=0. The raw original strict guard and current subtraction-underflow branch remain structurally different; no complete helper, all-input, formatter or original ELF equivalence is claimed.

Full before/after inventories retain441 original windows,410 grouped candidate windows (504 aliases),184 admitted original bodies and257 opaque original windows;172 candidate windows match admitted originals using the unchanged normalizer. Complete every-byte mismatch ranges, sections, relocation records and available call/data/branch rows are retained. No cross-method percentage or original initializer decoding occurred.

Before/after scratch gates preserve main baseline/source, helpers, runtime inputs, tools, compiler/SDK identity and215 locked registry source packages. Full build warnings and expected runtime rejections remain in their logs/receipts. No infrastructure/target-build failure occurred. Source proposal, complete receipts, unchanged verifiers and static methods are packaged for review, not automatically promoted.
