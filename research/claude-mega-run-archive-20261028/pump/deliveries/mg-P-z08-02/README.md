# mg-P-z08-02 (base L15, 972 -> 974, raw 165, 0 losses) = mg-P-z08-01 + 0x89258

Gains: 0x1367c0 set_params (see mg-P-z08-01) and 0x89258 `legacy_sell::fee_cpi::trade_fees` (2288 B, normalized match).

## Change for 0x89258 (src/fee_cpi.rs, line count unchanged; the file has no Source sites)
The fee-rate tail of trade_fees is written exactly like the matched util/fee.rs `get_fees` (0x89ec8):
```rust
let (protocol_fee_bps, creator_fee_bps) = (fees.protocol_fee_bps, fees.creator_fee_bps);
let creator_fee_bps = if global.creator_fee_configurable && curve.creator_fee_bps != 0 { curve.creator_fee_bps } else { creator_fee_bps };
let protocol_fee = fee(quote_amount, protocol_fee_bps)?;
let creator_fee = if curve.creator != Pubkey::default() { fee(quote_amount, creator_fee_bps)? } else { 0 };
return Ok((protocol_fee, creator_fee, protocol_fee_bps, creator_fee_bps));
```
Evidence: the only residue of the L15 form (`let mut creator_fee_bps = ..; if .. { creator_fee_bps = .. }`) was the protocol-fee
`?` branch shape (`jeq r1,2,+1; ja err` vs original `jne r1,2,err`). On post-opt IR (llc), moving the creator-bps test
blocks before (or after) the fee-call join block gives a byte match: rustc creates the join (value-0 switch target) before
the test block when there is no else arm, so ISel saw the wrong fall-through. An if/else expression on `fees.creator_fee_bps`
fixes the order but SimplifyCFG speculates the curve load into selects (0.47); destructuring the rates into a tuple first
(as get_fees does with get_fee_basis_points' tuple) keeps the branches and the right block order. The explicit
`return Ok(..)` is required (tail `Ok(..)` = 0.90).
Behaviour: identical values (creator bps override only when configurable and curve bps non-zero; creator fee only when
the curve has a creator).
