# Sequential checked subtraction recovery

A public non-inlined sub_three helper performs two sequential checked u64 subtractions and reports Overflow at trade_v3.rs:294. It reproduces the original 576-byte body at 0x80488. The existing nested subtraction of quote, protocol fee and creator fee in V3 sell uses it. All operands were already computed, and both intermediate overflow checks retain their order.

The Linux research frontier rises from 784 to 785 / 1,035, retaining every earlier match. A fresh repeated build produces identical stripped and unstripped artifacts. The helper has a closed bounded direct-call graph: 23 matching function pairs and 81 edges. Data/readonly bindings, indirect calls and whole ELF identity remain outside this check.

The unmatched exact-quote body is reflowed to make room at the recovered source coordinate, preserving later helper coordinates. Two source comments are removed during that reflow; executable tokens otherwise change only for the helper and its one call. Historical formatting is not proven. Maintained source/checkpoint unchanged. No executable bytes enter compilation and no linked output is edited.

The exact 785 candidate passes 301 focused sell, 352 exact-quote and 372 configured-fee cases (1,025 total) with zero diagnostic mismatches. Its own reports and captured-loader receipts are retained under runtime/. This does not establish a full 44-suite qualification and does not reuse earlier binaries' runtime results.
