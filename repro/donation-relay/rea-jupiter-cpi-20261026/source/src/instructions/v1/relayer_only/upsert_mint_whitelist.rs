// Whitelist account constraints recovered from parser156/closure157.
// The captured closure encodes this filename and derive line 8.
// Earlier historical source text is unknown.
// All signer/PDA/owner/space/rent checks remain actual Anchor checks.
// The payer uses its real transaction signature and permissions.
// No historical relayer key or privileged signature is replaced.

#[derive(Accounts)]
pub struct UpsertMintWhitelistV1<'info> {
    #[account(init_if_needed, payer=signer, space=1037, seeds=[b"mint_whitelist_v1".as_ref()], bump, rent_exempt=enforce)]
    pub mint_whitelist: Account<'info,MintWhitelistV1>,
    #[account(mut, address=Pubkey::new_from_array(crate::codec::constants::RELAYER))]
    pub signer: Signer<'info>,
    pub system_program: Program<'info,System>,
}
