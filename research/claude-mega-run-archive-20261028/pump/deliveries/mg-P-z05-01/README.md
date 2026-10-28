# mg-P-z05-01 (base L21, 979 -> 980 normalized, raw 165)

Gain: 0x62aa0 `pump_quote::convert` (2704 B) now byte-identical (normalized). 0 losses, 0 raw losses, no stack warnings.

Change (src/pump_quote.rs only, line-neutral; no Source site moves):
- line 147: `if output <= rt as u128 { return Ok(output); }` -> `if output > rt as u128 {`
- line 224: `Ok(rt as u128)` -> `Ok(rt as u128) } else { Ok(output) }`
Same semantics (output <= rt returns output; otherwise the completion/pool-leg path).

Binary evidence: the only residual on L21 was the line-199 checked_sub branch (`jlt r6,r1,+1; ja +0x27` vs the original's
`jge r6,r1,+0x27`). IR proof first: in the post-opt IR the `return Ok(output)` block (bb5) sat between the checked_sub test
block and its two targets, so ISel could not fall through into the error block. Moving that block in the IR to before the
test block (or to the function end) and running llc gave a byte match. In source that order comes from the if/else form:
rustc creates a 2-way switchInt's value-0 (false) target first, so the `else { Ok(output) }` block is created before the
then-block and its error/continue targets.
