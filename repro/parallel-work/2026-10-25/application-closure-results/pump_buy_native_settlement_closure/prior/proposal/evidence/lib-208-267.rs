pub enum PumpError {
    #[msg("The given account is not authorized to execute this instruction.")]
    NotAuthorized,
    #[msg("The program is already initialized.")]
    AlreadyInitialized,
    #[msg("slippage: Too much SOL required to buy the given amount of tokens.")]
    TooMuchSolRequired,
    #[msg("slippage: Too little SOL received to sell the given amount of tokens.")]
    TooLittleSolReceived,
    #[msg("The mint does not match the bonding curve.")]
    MintDoesNotMatchBondingCurve,
    #[msg("The bonding curve has completed and liquidity migrated to raydium.")]
    BondingCurveComplete,
    #[msg("The bonding curve has not completed.")]
    BondingCurveNotComplete,
    #[msg("The program is not initialized.")]
    NotInitialized,
    #[msg("Withdraw too frequent")]
    WithdrawTooFrequent,
    #[msg("new_size should be > current_size")]
    NewSizeShouldBeGreaterThanCurrentSize,
    #[msg("Account type not supported")]
    AccountTypeNotSupported,
    #[msg("initial_real_token_reserves should be less than token_total_supply")]
    InitialRealTokenReservesShouldBeLessThanTokenTotalSupply,
    #[msg("initial_virtual_token_reserves should be greater than initial_real_token_reserves")]
    InitialVirtualTokenReservesShouldBeGreaterThanInitialRealTokenReserves,
    #[msg("fee_basis_points greater than maximum")]
    FeeBasisPointsGreaterThanMaximum,
    #[msg("Withdraw authority cannot be set to System Program ID")]
    AllZerosWithdrawAuthority,
    #[msg("pool_migration_fee should be less than final_real_sol_reserves")]
    PoolMigrationFeeShouldBeLessThanFinalRealSolReserves,
    #[msg("pool_migration_fee should be greater than creator_fee + MAX_MIGRATE_FEES")]
    PoolMigrationFeeShouldBeGreaterThanCreatorFeePlusMaxMigrateFees,
    #[msg("Migrate instruction is disabled")]
    DisabledWithdraw,
    #[msg("Migrate instruction is disabled")]
    DisabledMigrate,
    #[msg("Invalid creator pubkey")]
    InvalidCreator,
    #[msg("Buy zero amount")]
    BuyZeroAmount,
    #[msg("Not enough tokens to buy")]
    NotEnoughTokensToBuy,
    #[msg("Sell zero amount")]
    SellZeroAmount,
    #[msg("Not enough tokens to sell")]
    NotEnoughTokensToSell,
    #[msg("Overflow")]
    Overflow,
    #[msg("Truncation")]
    Truncation,
    #[msg("Division by zero")]
    DivisionByZero,
    #[msg("Not enough remaining accounts")]
    NotEnoughRemainingAccounts,
    #[msg("All fee recipients should be non-zero")]
    AllFeeRecipientsShouldBeNonZero,
    #[msg("Unsorted or not unique fee recipients")]
