last='    crate::utils::token::transfer_checked_to_account_info(a.quote_token_program.as_ref(), &a.quote_mint, &a.user_quote_token_account, a.buyback_fee_recipient.as_ref(), a.user.as_ref(), buyback_fee)?;\n'
c='    if a.user_volume_accumulator.user == Pubkey::default() { %s }\n'
V={
 'ra': last+c%'a.user_volume_accumulator.user.as_mut().copy_from_slice(a.user.key().as_ref());',
 'rb': last+c%'a.user_volume_accumulator.user = Pubkey::new_from_array(a.user.key().to_bytes());',
 'rc': last+c%'a.user_volume_accumulator.user.clone_from(&a.user.key());',
 'rd': last+c%'a.user_volume_accumulator.user.as_mut().copy_from_slice(&a.user.key.to_bytes());',
 're': last+'    let user = a.user.key();\n'+c%'a.user_volume_accumulator.user = user;',
 'rf': last+'    let acc = &mut **a.user_volume_accumulator;\n    if acc.user == Pubkey::default() { acc.user = a.user.key(); }\n',
 'rg': last+'    let acc: &mut UserVolumeAccumulator = &mut a.user_volume_accumulator;\n    if acc.user == Pubkey::default() { acc.user.as_mut().copy_from_slice(a.user.key.as_ref()); }\n',
 'rh': last+c%'a.user_volume_accumulator.user = a.user.key.clone();',
 'ri': last+'    let user = a.user.key;\n'+c%'a.user_volume_accumulator.user = *user;',
}
