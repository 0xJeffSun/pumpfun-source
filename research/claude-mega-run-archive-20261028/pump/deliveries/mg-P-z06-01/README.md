# mg-P-z06-01: +0x6a1e0 (quote_control::state::control_entry), 963/1035 normalized, 165 raw, base L13

Only file changed: `src/quote_control/state.rs` (line-neutral; every Source site stays on its line: 145, 146, 158).

## What changed
- line 145: `let header = data.get(..108).ok_or_else(|| error!(PumpError::InvalidQuoteControl))?;` (was `require!(data.len() >= 108, ..)`)
- line 146: `require!(header[..8] == *QuoteControl::DISCRIMINATOR, PumpError::InvalidQuoteControl);` (was `data[..8] == CONTROL_DISC`)
- lines 148/158: `let end = QuoteControl::space(count)?;` + `let entries = data.get(108..end).ok_or_else(..)?;` (two statements)
  became ONE statement on line 158: `let entries = data.get(108..QuoteControl::space(count)?).ok_or_else(|| error!(PumpError::InvalidQuoteControl))?;`
- the now-unused fn-local `CONTROL_DISC` const line became a layout-pad line (no codegen effect; sha identical with/without it).

## Binary evidence
- r5-z06 had reached a 4-slot residual (145/146 forms from its qs_c5b variant): the sret pointer reload sat after the 158
  `Error::from` call instead of right after the 158 `Display::fmt` call (+ swapped r1/r2 loads).
- IR proof (llc on the extracted post-opt function, 0.1 s/try): routing the `space()` error exit and the 158 error exit
  through ONE block with phis for the Error payload before the store into the return slot gives a byte-identical
  function (sacmp MATCH); no branch-weight / block-order / llc-option change does. In source this is one temporary scope:
  both `?` exits of a single statement share one drop/return join (same mechanism as r5-z07's 0x82af8 finding).
  `space(count).and_then(..)` builds the join but keeps the space() Result temp alive over the 158 error (frame +0x10);
  a `match` form gives 1712 B. The nested `?` inside the range bound is the only form tried that matches.
- Behaviour: identical checks and error codes in the same order (len>=108 -> 6xxx InvalidQuoteControl at 145,
  discriminator at 146, space() overflow error, range check at 158).

## Port check (02:20)
- Same state.rs change on base L14 (965): lane src = L14 + state.rs -> 966/1035, +0x6a1e0, no losses (res/l14port, sha 8c66a4b25c0a52f6). Merges cleanly with L14's validate_new_mint line 78.
