# fz-P-mig1-r1-01 (pump, base L31 990/1035 raw 166 -> 991/1035 raw 166)

Gain: 0x3e550 set_fee_recipients (fee_recipient.rs, Source sites 47/60/78), 5664 B, now byte-equal (normalized) to the original.
Losses: none (normalized and raw). runtime_valid true, no stack warnings. Identity recipe via mg-P-int/tools/nbuild.py.

Change (one line, line-neutral, src/fee_recipient.rs:49):
    let fee_recipients:[Pubkey;8]=fee_recipients.try_into().unwrap();
 -> let fee_recipients:[Pubkey;8]=fee_recipients.try_into().map_err(|_|PumpError::NotEnoughRemainingAccounts)?;

Behavior: the Vec is built from remaining_accounts[..8] after require_gte!(len, 8), so the conversion to [Pubkey;8]
cannot fail; the compiled window is identical to the original's, so behavior equals the original by construction.
The unwrap form kept a Vec Debug/unwrap_failed panic path that the original does not have (block order 0.39 vs 1.0).
synthetic_layout: true only because the L31 base carries the labelled layout-pad line layout; this delivery adds no pads.
