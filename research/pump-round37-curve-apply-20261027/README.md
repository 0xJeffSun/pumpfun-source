# Checked curve reserve-update methods

Public non-inlined BondingCurve apply_buy and apply_sell methods perform the four observed checked reserve updates in order. Their Overflow locations in lib.rs reproduce the original buy body at 0xa0bf0 (2,032 bytes) and sell body at 0xa13e0 (2,040 bytes). V3 buy, exact-quote buy and sell call the methods at their existing reserve-assignment points.

Earlier arithmetic checks and event-value calculations remain in the handlers. These guard the existing error/CPI order and make the new methods' repeated checks redundant on reachable successful paths. This recovers the two method bodies, not the enclosing handlers or the historical source structure.

The Linux research frontier rises from 786 to 788 / 1,035, retaining every earlier match. Fresh repeated builds produce identical stripped/unstripped artifacts. Both method roots have a closed bounded direct-call graph of 24 matching function pairs and 103 edges. Readonly/data, indirect calls and whole ELF identity remain outside this check.

Retains full source snapshots, native outputs, compiler records, exact proposal patch and independent verifier. Maintained source/checkpoint unchanged. Original executable bytes do not enter compilation and linked output is not edited.

The exact 788 candidate passes 301 focused sell, 352 exact-quote and 372 configured-fee cases (1,025 total) with zero diagnostic mismatches. Its own reports and captured-loader receipts are retained under runtime/. This is not a full 44-suite qualification and earlier binaries' runtime results are not reused.
