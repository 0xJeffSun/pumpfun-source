# AMM formatting-vtable and EOF-descriptor proof

This bounded proof addresses concrete relocated data rather than treating every
data reference as unknown. It uses the frozen diagnostic-parity candidate
`fe3c75511a1499b496649313dc57a8fce0cacc88ceb23406a59be522dae458bf`.

The original 48-byte object at `0x1221e0` is used as the String formatter's
`fmt::Write` table. Its complete contents are checked against every corresponding
reference in the body-match relation: a drop-function pointer, size 24,
alignment 8, and the three function pointers identified by the candidate symbols
as `write_str`, `write_char`, and `write_fmt`. Pointer decoding uses the actual
SBF data relocations; scalar bytes and all four target pairs are checked.

The corresponding table at candidate `0x11f5f8` is verified for 27 references.
All four function bodies match under the established normalization, including
their internal direct-call closure. Four alternative table references remain
unresolved: their actual function targets fail the same strict body/closure
check. They are not silently accepted based on matching size/alignment or
similar symbol names. Requiring the verified table removes four alternative
body-pairs and leaves 1,266 direct-closed pairs across the same 480 original
windows.

The `fmt::Write::write_fmt` wrapper at original `0x8998` explicitly supplies
that table to `core::fmt::write`. The latter's three writer-method indirect
sites load the method at table offset 24. Under this table instantiation those
sites select the verified `write_str` targets. Its two argument-formatter
callback sites remain unresolved, and the proof does not assume that arbitrary
callbacks preserve the formatter's internal fields. These are conditional
resolutions, not a global elimination of indirect calls.

Separately, the full 24-byte EOF descriptor at original `0x1221c8` is checked at
31 corresponding references. Its relocated message pointer, length 27 and
numeric field 37 agree. The exact 27 message bytes are `failed to fill whole
buffer`. The proof does not infer the layout or contents of adjacent objects.

`results.json` retains each source reference, scalar and target comparison.
Run `work/test-env/bin/python -B repro/pump_amm/format-vtable-audit-20261027/verify.py`
to authenticate and recompute it, including the prerequisite closure audit.
No executable or maintained source is modified.
