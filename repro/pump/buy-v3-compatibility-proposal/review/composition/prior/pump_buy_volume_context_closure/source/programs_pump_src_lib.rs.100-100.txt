    pub fn buy_v3(ctx: Context<SellV3>, amount:u64,max_sol_cost:u64,partial_fill:OptionBool)->Result<()>{let _ = partial_fill;trade::buy(ctx,amount,max_sol_cost)}
