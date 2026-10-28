# Curve protocol/creator fee accrual recovery

A public non-inlined accrue_fees method computes buyback fees using the existing mayhem branch and checked split, then checks and updates protocol_fees followed by creator_fee. Its lib.rs:2550/2554 errors and arithmetic reproduce the original 1,456-byte body at 0xa1bd8.

V3 sell, buy and exact-quote buy use the method at their existing fee-field assignment points. Earlier arithmetic checks, event values and buyback splits remain. First-fill and post-complete fees are accrued separately, preserving per-fill buyback rounding. Thus this recovers the method body, not the enclosing handlers; method checks are redundant after the retained earlier checks.

The Linux research frontier rises from 788 to 789 / 1,035, retaining every earlier match. Fresh repeated builds produce identical stripped/unstripped artifacts. The method has a closed bounded direct-call graph of 30 matching function pairs and 102 edges; readonly/data bindings, indirect calls and whole ELF identity remain outside that check.

Full sources, native artifacts, compiler records, source proposal and independent verifier are retained. Maintained source/checkpoint unchanged. No original executable bytes enter compilation and no linked output is edited.

The exact 789 candidate passes 301 focused sell, 352 exact-quote and 372 configured-fee cases (1,025 total) with zero diagnostic mismatches. Its own reports and captured-loader receipts are retained under runtime/. This is not a full 44-suite qualification and older binaries' runtime outputs are not reused.
