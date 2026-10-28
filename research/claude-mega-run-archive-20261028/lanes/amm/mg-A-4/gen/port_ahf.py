import sys
p=sys.argv[1]
s=open(p).read().split('\n')
# lines are 1-based; apply_hop_fees occupies 201..221
assert s[200].startswith('#[inline(never)] pub fn apply_hop_fees'), s[200]
assert s[221].startswith('fn vault_for_mint'), s[221]
new='''#[inline(never)] pub fn apply_hop_fees(context: HopFeeContext, amount: u64) -> Result<crate::curve::fees::AppliedFees> {
    crate::curve::fees::select_and_apply_v2(
        context.pool, context.global_config, &context.accounts.fee_config,
        *context.fee_config_len, *context.base_supply, *context.base_reserve,
        *context.quote_reserve, amount,
    )
    .map(|fees| gate_fees(fees, *context.gates))
}

/// Zero the fee legs this hop does not charge.
fn gate_fees(fees: crate::curve::fees::AppliedFees, gates: HopFeeGates) -> crate::curve::fees::AppliedFees {
    crate::curve::fees::AppliedFees {
        lp_fee_bps: if gates.lp { fees.lp_fee_bps } else { 0 },
        protocol_fee_bps: if gates.protocol { fees.protocol_fee_bps } else { 0 },
        creator_fee_bps: if gates.creator { fees.creator_fee_bps } else { 0 },
        lp_fee: if gates.lp { fees.lp_fee } else { 0 },
        protocol_fee: if gates.protocol { fees.protocol_fee } else { 0 },
        creator_fee: if gates.creator { fees.creator_fee } else { 0 },
    }
}

'''.split('\n')[:-1]
assert len(new)==21, len(new)
s[200:221]=new
open(p,'w').write('\n'.join(s))
