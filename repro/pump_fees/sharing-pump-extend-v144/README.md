# First Pump extension typed CPI checkpoint

This single pinned v1.44 build (existing v1.52 strip) changes only sharing.rs first Pump extension call and its Fees-local IDL user writable field from the 4baf baseline. Candidate 6c87132fd95d0e2d4f1ba416667f1084e6a60937280639c473caeae8483e1887 (855,624 bytes); symbols f113b695d6216853bdd9e6ba1bafac1a05c5492ffff0ef0330f0116426af5890.

Full emitted helper 3712B, metadata 1072B, and AccountInfo constructor 1400B match their full original windows under call/relocation normalization. All 30 immediate calls have supported target bodies. Recursive target semantics and whole original executable equality remain unproved. The remaining three manual CPIs are unchanged.

All 17,461 unchanged comparisons and the separate ten-step sequence pass. Saved checks verify 17,204 signatures in 8,644 baseline/sequence fields, plus 80 signatures in 40 focused fields; historical messages are checked separately. Existing sharing logs reach the first Pump extension in 26 cases. All 6,523 raw log differences remain; the 11-row retained diagnostic checker passes. No fixture was added.

The exact 26 source bindings, full original/current inventories and helper bodies, source proposal and Anchor generator/context evidence, raw diagnostics and saved receipts are retained. Initial preparation console wording said only sharing.rs changed; machine gates correctly record both sharing.rs and idls/pump.json, with no other delta.

Run `python3 -B verify.py --runtime-signatures` to reverify this exact cache-free packet, static full-helper matches and saved signatures without compiling or executing target transactions. Archives contain initial-source-review/, runner-repo/ plus validation-layer/, and runtime/ plus saved-verification/. The manifest enforces the exact complete file set.
