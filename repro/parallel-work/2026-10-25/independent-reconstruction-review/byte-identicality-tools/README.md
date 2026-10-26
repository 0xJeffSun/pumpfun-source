# Byte-identicality diff tooling

- `analyze_fn.py <fn-name-substr>` — align one pump_fees candidate function to the original and show frame-masked diffs (see BYTE-IDENTICALITY-DEEP-DIVE.md for method).
- `scan_closable.py` — batch-classify all own functions diffs (frame-store vs logic-const vs structural).

Inputs: /tmp/fees_orig.text, /tmp/fees_cand_u.text, /tmp/cand_syms.txt (extract per the deep-dive doc).
