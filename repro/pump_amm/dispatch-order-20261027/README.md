# Original AMM dispatcher order

The original entry dispatcher at `0xdbc98` and the current candidate dispatcher
are both 6,104 bytes. Their early instruction comparisons use the same 38
captured IDL discriminators in different orders. `evidence.json` records every
original/candidate comparison offset, discriminator and instruction name.

`recover.py` reorders only the 38 `#[program]` method declarations to the order
observed in the original executable. It preserves every method signature/body
byte-for-byte, records their SHA-256 digests, and keeps all source before the
first method and after the program module unchanged. The existing separator
whitespace is retained by position. No line-number padding or compiler directives
are added.

The isolated source is in `work/amm-dispatch-order-20261027/source`, and
`source.patch` is based on the frozen diagnostic-parity source. This is a
source-structure recovery trial, not a compiled or runtime-validated improvement.
A real build and fresh measurements are required before adoption. The method
order inferred from compiled comparisons does not establish historical source
line locations.

`recover.py --source SOURCE --output-source NEW_SOURCE` can apply the recovered
ordering to another isolated source containing the same 38 methods. It refuses
to overwrite an existing output directory.
