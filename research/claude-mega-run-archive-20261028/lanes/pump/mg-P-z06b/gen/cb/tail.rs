pub fn check_bonding_curve_v2<'info>(remaining_accounts:&[AccountInfo<'info>],mint:&Pubkey)->Result<()>{
    require!(!remaining_accounts.is_empty(),PumpError::InvalidBondingCurveV2);let bonding_curve_v2=&remaining_accounts[0];
    let (expected,_)=Pubkey::find_program_address(&[b"bonding-curve-v2",mint.as_ref()],&crate::ID);
// layout-pad(5): aligns the next Source site with the original line




    require!(bonding_curve_v2.key()==expected,PumpError::InvalidBondingCurveV2);
    Ok(())
}
// layout-pad(8): aligns the next Source site with the original line







pub fn buyback_fee_recipient<'a,'info>(remaining_accounts:&'a [AccountInfo<'info>],global:&Global,index:usize)->Result<&'a AccountInfo<'info>>{
    require!(index<remaining_accounts.len(),PumpError::BuybackFeeRecipientMissing);let account=&remaining_accounts[index];
    let result=global.validate_buyback_fee_recipient(&account.key());result.map(|_|account)

}
