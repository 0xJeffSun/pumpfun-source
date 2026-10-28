last='    crate::utils::token::transfer_checked_to_account_info(a.quote_token_program.as_ref(), &a.quote_mint, &a.user_quote_token_account, a.buyback_fee_recipient.as_ref(), a.user.as_ref(), buyback_fee)?;\n'
lastif='    if let Err(e) = crate::utils::token::transfer_checked_to_account_info(a.quote_token_program.as_ref(), &a.quote_mint, &a.user_quote_token_account, a.buyback_fee_recipient.as_ref(), a.user.as_ref(), buyback_fee) { return Err(e); }\n'
V={
 'qa': last+'    if a.user_volume_accumulator.user == Pubkey::default() { a.user_volume_accumulator.user.as_mut().copy_from_slice(a.user.key.as_ref()); }\n',
 'qb': lastif+'    if a.user_volume_accumulator.user == Pubkey::default() { a.user_volume_accumulator.user = a.user.key(); }\n',
 'qc': last+'    let acc = &mut a.user_volume_accumulator;\n    if acc.user == Pubkey::default() { acc.user = a.user.key(); }\n',
 'qd': last+'    let acc = &mut a.user_volume_accumulator;\n    if acc.user == Pubkey::default() { acc.user = *a.user.key; }\n',
 'qe': last+'    if a.user_volume_accumulator.user == Pubkey::default() { a.user_volume_accumulator.user = a.user.key(); }\n',
}
