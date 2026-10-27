// Preserve the independently observed call boundary; original annotation unknown.
#[inline(never)]
fn check_relayer(signer:&Signer<'_>) -> Result<()> {
    let key=signer.key();let expected=Pubkey::new_from_array(crate::codec::constants::RELAYER);
    if key!=expected {
        return Err(anchor_lang::error::Error::from(anchor_lang::error::AnchorError {
            error_name:crate::business_error_codes::ErrorCode::SignerIsNotRelayer.name(),error_code_number:crate::business_error_codes::ErrorCode::SignerIsNotRelayer.into(),error_msg:crate::business_error_codes::ErrorCode::SignerIsNotRelayer.to_string(),
            error_origin:Some(anchor_lang::error::ErrorOrigin::Source(anchor_lang::error::Source {
                filename:"programs/contracts/src/tools/checks.rs",line:80})),
            compared_values:None,
        }).with_pubkeys((key,expected)));
    }
    Ok(())
}
// Preserve the independently observed call boundary; original annotation unknown.
#[inline(never)]
fn upsert_whitelist(whitelist:&mut MintWhitelistV1,mints:Vec<Pubkey>,bump:u8)->Result<()> {
    if !(mints.len()<=32) {
        return Err(anchor_lang::error::AnchorError {
            error_name:crate::business_error_codes::ErrorCode::InvalidMintWhitelist.name(),error_code_number:crate::business_error_codes::ErrorCode::InvalidMintWhitelist.into(),error_msg:crate::business_error_codes::ErrorCode::InvalidMintWhitelist.to_string(),
            error_origin:Some(anchor_lang::error::ErrorOrigin::Source(anchor_lang::error::Source {
                filename:"programs/contracts/src/instructions/v1/relayer_only/upsert_mint_whitelist.rs",line:33})),
            compared_values:None,
        }.into());
    }
    whitelist.mints=mints;whitelist.bump=bump;Ok(())
}
