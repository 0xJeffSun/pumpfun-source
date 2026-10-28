FILE = 'migrate.rs'; START = 'pub fn init_pump_amm_boost<'; NAME = 'init_pump_amm_boost'
CALLER_FILE = 'migrate.rs'; CALL = ' init_pump_amm_boost(&ctx)?;'; COND = 'a.global.pool_migration_fee'
OLD_SEEDS = "  let signer_seeds:&[&[&[u8]]]=&[&[b\"pool-authority\",&a.mint.key().to_bytes(),&[ctx.bumps.pool_authority]]];\n  pump_amm::cpi::init_boost(CpiContext::new_with_signer("
CL = "  let init=move |signer_seeds:&[&[&[u8]];1]|pump_amm::cpi::init_boost(CpiContext::new_with_signer("
END_OLD = "program:a.pump_amm.to_account_info()},signer_seeds))\n  }"
VARIANTS = {
 'b1': [(OLD_SEEDS, CL), (END_OLD, "program:a.pump_amm.to_account_info()},signer_seeds));\n  init(&[&[b\"pool-authority\",a.mint.key().as_ref(),&[ctx.bumps.pool_authority]]])\n  }")],
 'b2': [(" let a=&ctx.accounts;\n", " let bump=ctx.bumps.pool_authority;let a=&ctx.accounts;\n"), (OLD_SEEDS, CL), (END_OLD, "program:a.pump_amm.to_account_info()},signer_seeds));\n  init(&[&[b\"pool-authority\",a.mint.key().as_ref(),&[bump]]])\n  }")],
 'b4': [(OLD_SEEDS, CL), (END_OLD, "program:a.pump_amm.to_account_info()},signer_seeds));\n  init(&[&[b\"pool-authority\",&a.mint.key().to_bytes(),&[ctx.bumps.pool_authority]]])\n  }")],
}
