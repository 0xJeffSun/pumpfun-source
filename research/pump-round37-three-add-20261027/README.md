# Three-operand checked sum recovery

A public, non-inlined sum_three helper performs two sequential checked u64 additions and reports Overflow at trade_v3.rs:285. It reproduces the original 656-byte body at 0x801f8. Eight nested additions of already-computed values in the two V3 buy paths use this helper. Calls that contain fallible argument expressions are left intact so their evaluation order does not change.

The Linux research frontier rises from 783 to 784 / 1,035, retaining every earlier match. A fresh repeated build produces identical stripped and unstripped artifacts. The first repeat could not finish because the workspace filled; generated caches from completed trials were cleared, and a fresh second repeat succeeded. The original failed attempt remains local and is not counted as a successful build.

The helper has a closed bounded direct-call graph: 23 matching function pairs, 81 edges. Data/readonly bindings, indirect calls and whole ELF identity remain outside that check. Its placement reflows the tail of the unmatched buy body while preserving all later source coordinates; historical formatting is not proven. Maintained source/checkpoint unchanged. No executable bytes are injected and no linked output is edited.

The exact 784 candidate passes 352 focused exact-quote and 372 configured-fee cases (724 total) with zero diagnostic mismatches. Both reports and captured-loader receipts are retained under runtime/. These are this binary's own results; they do not establish a full 44-suite qualification.
