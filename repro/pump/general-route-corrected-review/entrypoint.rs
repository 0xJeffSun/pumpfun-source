    pub fn multi_hop_curve_swap<'info>(ctx:Context<'_,'_,'info,'info,MultiHopCurve<'info>>,amount_in:u64,hop_fees:Vec<u8>)->Result<CurveRunResult>{multi_hop_curve::execute(ctx,amount_in,hop_fees)}
