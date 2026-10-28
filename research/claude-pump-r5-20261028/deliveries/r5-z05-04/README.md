# r5-z05-04 (base L12, 907 -> 918 normalized, raw 165)

Gains: 0x58668, 0x60a80, 0x61348, 0x617e8, 0x62170, 0x63940, 0x64358, 0x645f8, 0x64888, 0x65238, 0x65eb0.
No losses; runtime_valid; no stack warnings. Cumulative over r5-z05-03 (see 01..03 READMEs).

New in 04: pump_quote.rs vault_amount (0x64888, :365 :366 :371 :372 :378):
- owner check `require!([&anchor_spl::token::ID, &anchor_spl::token_2022::ID].iter().any(|id| owner == *id), InvalidQuotePool)`:
  the unrolled any() gives the original's block order (error block inline after the two memcmps) while folding the
  reference array to the direct token::ID / token_2022::ID constants (a `[Pubkey; 2]` array or `contains` materialises a
  64-byte constant instead; plain `||` places the error cold).
- `if data.len() == 165 { return Ok(amount) }` followed by `require_eq!(data[165], 2u8, InvalidQuotePool)` at :378 (the
  `if len != 165 { require_eq! }` form places the data[165] check cold).
Behaviour identical to the original (same checks, order and error codes/values).
