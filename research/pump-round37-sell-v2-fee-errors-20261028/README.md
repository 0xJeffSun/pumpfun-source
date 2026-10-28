# sell_v2 fee subtraction error callbacks

Separate protocol-fee, creator-fee and token-transfer-fee subtraction errors into callbacks carrying the original sell_v2.rs:366/368/386 coordinates. Checked arithmetic and evaluation order are preserved. The original 520-byte callbacks at 0x6f8e0, 0x6fae8 and 0x6fcf0 now match after normalization; the whole sell_v2 handler remains unmatched. Callback names/formatting are reconstruction choices, not claims about original source spelling.

The research frontier reaches 798 / 1,035 with all 795 prior matches retained. Fresh repeated builds reproduce both ELF artifacts. The existing 206-case sell_v2 suite passes against this exact candidate, including token quotes, transfer-fee schedules/caps and reward flags. All paired diagnostics agree. The three callback roots have a closed bounded direct-call graph of 25 matching pairs and 89 edges.

Compiled sources, compiler records, source-only patch, native artifacts, test harness/fixture snapshots and captured-loader receipts are archived. Maintained Round37 checkpoint unchanged. No original executable bytes enter compilation or output editing. Whole original ELF equality remains false.
