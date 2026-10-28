# Checked pretrade market-cap recovery

The existing market-cap calculation keeps its supply selection and u128 arithmetic, expresses the denominator check through checked_div, and reports DivisionByZero from lib.rs:2481. This recovers the original 760-byte body at 0xa08f8, including its normal/error block order and referenced source filename. Calls retain the same curve and mint arguments.

Native Linux research matches rise from 785 to 786 / 1,035 while retaining every earlier match. Fresh repeated builds produce identical stripped/unstripped artifacts. The helper has a closed bounded direct-call graph of 28 matching pairs and 95 edges; data, indirect calls and whole ELF identity remain outside this check.

The source proposal does not establish historical formatting or compiler provenance. Maintained source/checkpoint unchanged. Original executable bytes remain comparison evidence and do not enter compilation; no linked output is edited. Retains full source snapshots, native artifacts, compiler records, proposal patch and independent verifier.

The exact 786 candidate passes 352 focused exact-quote and 372 configured-fee cases (724 total) with zero diagnostic mismatches. Its own reports and captured-loader receipts are retained under runtime/. These do not establish a full 44-suite qualification and no older runtime output is reassigned.
