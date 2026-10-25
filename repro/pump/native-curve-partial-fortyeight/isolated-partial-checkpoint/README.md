# Isolated Pump partial native/legacy curve-run checkpoint

This is a main42-based PARTIAL `multi_hop_curve_swap` candidate. The clean pinned v1.44 build is 1,461,472 bytes, SHA-256 `ca1fa48c953cd6643b88e8c10122a2a3b1b224e65a6be2099a58786587e68c85`. Full original-byte equality is false.

All 56 fixed-scope comparisons pass, with 112 independently verified ordinary outer signatures. Fifty comparisons reach the Pump CPI, 11 succeed, and six stop in captured AMM before Pump. A separate repeat from `/tmp` produces byte-identical receipts and adds no unique cases. State, errors, events, inner CPI bytes and return data are compared. Every side uses a fresh VM, exactly one chosen Pump ELF, and the actual captured AMM's PDA signing. State is synthetic and local.

Accepted scope is one native curve per Pump CPI, flag 3, legacy Tokenkeg 82/165-byte layouts and an ordinary 166-byte curve. Multi-curve, mixed endpoint flags, non-native/nested quote paths, Token-2022, holder rewards and synthetic completion remain unsupported. This does not increment the fully recovered handler count. Existing sell_v2 limitations remain unchanged.

`integration.patch` contains only the new module and minimal main42 lib insertion. All other 30 baseline inputs are unchanged; the 32 actual build inputs and source snapshot are bound. `source/lib.rs` is a baseline42 scratch file and must not overwrite main48. Root must merge the minimal insertion, then clean-build and run all existing suites before promotion.

The package retains every earlier compiler attempt, negative receipt and invalid cached-harness diagnostic. That invalid diagnostic contributes no passing cases. `RECOVERY_NOTES.md` explains the exact boundary/order corrections. Compiler selection and lock compatibility are not historical provenance proof. No main source, central documentation, live state or stopped recovery lane was changed.
